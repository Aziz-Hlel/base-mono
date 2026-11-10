import type { DevicePreferredLanguage } from '@base-monorepo-v2/contracts/enums/index';
import {
  MessagingErrorCode,
  type FidMulticastMessage,
  type Messaging,
  type TopicMessage,
} from 'firebase-admin/messaging';
import logger from './logger';

// The device is gone: safe to delete. Firebase can report a dead fid with either code.
const UNREGISTERED_CODES = new Set<string>([
  MessagingErrorCode.INSTALLATION_ID_NOT_REGISTERED,
  MessagingErrorCode.REGISTRATION_TOKEN_NOT_REGISTERED,
]);

// Resending the same request can't succeed, but the device may be fine: never delete on these.
// INVALID_ARGUMENT belongs here because FCM also returns it for bad payloads.
const REJECTED_CODES = new Set<string>([
  MessagingErrorCode.INVALID_ARGUMENT,
  MessagingErrorCode.INVALID_RECIPIENT,
  MessagingErrorCode.INVALID_PAYLOAD,
  MessagingErrorCode.INVALID_DATA_PAYLOAD_KEY,
  MessagingErrorCode.PAYLOAD_SIZE_LIMIT_EXCEEDED,
  MessagingErrorCode.INVALID_OPTIONS,
  MessagingErrorCode.INVALID_REGISTRATION_TOKEN,
  MessagingErrorCode.MISMATCHED_CREDENTIAL,
  MessagingErrorCode.INVALID_PACKAGE_NAME,
  MessagingErrorCode.THIRD_PARTY_AUTH_ERROR,
  MessagingErrorCode.AUTHENTICATION_ERROR,
]);

export type PushParams = {
  fids: string[];
  title: Record<DevicePreferredLanguage, string>;
  body: Record<DevicePreferredLanguage, string>;
  imgUrl: string;
  videoUrl: string;
};

/** Every fid passed to `push` ends up in exactly one of these. */
export type PushResult = {
  sentCount: number;
  /** The device no longer exists. Delete these. */
  unregisteredFids: string[];
  /** Temporary failure (rate limit, FCM down, network). Send to these again later. */
  retryableFids: string[];
  /** Permanent failure (bad payload, bad credentials). Don't resend, don't delete. */
  rejectedFids: string[];
};

export type TopicPushResult = 'sent' | 'retryable' | 'rejected';

// Firebase codes look like 'messaging/invalid-argument'. Network errors may have no code.
const getErrorCode = (error: unknown): string | undefined => {
  const code = (error as { code?: unknown } | null | undefined)?.code;
  return typeof code === 'string' ? code.split('/').pop() : undefined;
};

const isRejected = (error: unknown): boolean => REJECTED_CODES.has(getErrorCode(error) ?? '');

const isUnregistered = (error: unknown): boolean =>
  UNREGISTERED_CODES.has(getErrorCode(error) ?? '');

/**
 * Sends to FCM and reports what happened. It never retries and never touches the database:
 * the caller decides what to do with each outcome.
 */
export class NotificationProvider {
  constructor(private readonly fcm: Pick<Messaging, 'sendEachForMulticast' | 'send'>) {}
  private static MAX_FIDS_PER_REQUEST = 500;

  /** Accepts any number of fids. Resolves with the outcome of every fid and doesn't reject. */
  async push(message: FidMulticastMessage): Promise<PushResult> {
    const result: PushResult = {
      sentCount: 0,
      unregisteredFids: [],
      retryableFids: [],
      rejectedFids: [],
    };

    for (
      let start = 0;
      start < message.fids.length;
      start += NotificationProvider.MAX_FIDS_PER_REQUEST
    ) {
      const fids = message.fids.slice(start, start + NotificationProvider.MAX_FIDS_PER_REQUEST);
      await this.pushChunk({ ...message, fids }, result);
    }

    return result;
  }

  async pushTopic(message: TopicMessage): Promise<TopicPushResult> {
    try {
      await this.fcm.send(message);
      return 'sent';
    } catch (error) {
      logger.error(error, `[FCM] Failed to send to topic '${message.topic}'`);
      return isRejected(error) ? 'rejected' : 'retryable';
    }
  }

  private async pushChunk(message: FidMulticastMessage, result: PushResult): Promise<void> {
    try {
      const { responses } = await this.fcm.sendEachForMulticast(message);

      message.fids.forEach((fid, idx) => {
        const response = responses[idx];
        if (response?.success) {
          result.sentCount++;
        } else if (isUnregistered(response?.error)) {
          result.unregisteredFids.push(fid);
        } else if (isRejected(response?.error)) {
          logger.error(response?.error, `[FCM] Rejected send to fid ${fid}`);
          result.rejectedFids.push(fid);
        } else {
          logger.warn(response?.error, `[FCM] Temporary send failure for fid ${fid}`);
          result.retryableFids.push(fid);
        }
      });
    } catch (error) {
      // The whole request failed, which says nothing about any one device, so nothing is pruned.
      logger.error(error, `[FCM] Request failed for ${message.fids.length} fids`);
      const bucket = isRejected(error) ? result.rejectedFids : result.retryableFids;
      bucket.push(...message.fids);
    }
  }
}
