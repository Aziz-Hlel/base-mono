import { route } from '@/openapi/routeBuilder';
import { chatWithParamsSchema } from '@base-monorepo-v2/contracts/schemas/chat/chat-with-params.req';
import { listMessageParamsSchema } from '@base-monorepo-v2/contracts/schemas/chat/list-message-params.req';
import { listMessageResSchema } from '@base-monorepo-v2/contracts/schemas/chat/list-message.res';
import { messageResSchema } from '@base-monorepo-v2/contracts/schemas/chat/message.res';
import { sendMessageReqSchema } from '@base-monorepo-v2/contracts/schemas/chat/send-message.req';
import { cursorQueryParamsSchema } from '@base-monorepo-v2/contracts/types/Cursor';
import express from 'express';
import { chatService } from './chat.service';
import canAccessChatroom from './middlewares/canAccessChatroom';

const chatRouter = express.Router({ mergeParams: true });

// GET /api/chats/:chatroomId/messages
route()
  .router(chatRouter)
  .method('get')
  .path('/:chatroomId/messages')
  .openapiPath('/api/chats/{chatroomId}/messages')
  .operationId('listChatroomMessages')
  .summary('List chatroom messages')
  .description(
    'Get the messages of a chatroom, newest first, with cursor pagination. Only members of the chatroom can access them; admins can also access support chatrooms.',
  )
  .tags('Chat')
  .define({
    userRoles: [],
    middlewares: [canAccessChatroom('chatroomId')],
    auth: true,
    validate: {
      query: cursorQueryParamsSchema,
      params: listMessageParamsSchema,
    },
    response: listMessageResSchema,
    responses: {
      '200': {
        description: 'Messages fetched successfully',
        schema: listMessageResSchema,
      },
      '403': {
        description: 'Current user is not a member of this chatroom',
      },
      '404': {
        description: 'Chatroom not found',
      },
    },

    controller: async (req, res) => {
      const { chatroomId } = req.params;
      const cursorData = await chatService.listMessagesByCursor(chatroomId, req.query);

      res.json({
        message: 'Messages fetched successfully',
        ...cursorData,
      });
    },
  });

// POST /api/chats/with/:profileId/messages
route()
  .router(chatRouter)
  .method('post')
  .path('/with/:profileId/messages')
  .openapiPath('/api/chats/with/{profileId}/messages')
  .operationId('sendDirectMessage')
  .summary('Send direct message')
  .description(
    'Send a message to a profile. The chatroom between the two profiles is created on the first message. Allowed pairs: doctor and patient, guardian and patient (accepted guardianship), and an admin with anyone.',
  )
  .tags('Chat')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      params: chatWithParamsSchema,
      body: sendMessageReqSchema,
    },
    response: messageResSchema,
    responses: {
      '201': {
        description: 'Message sent successfully',
        schema: messageResSchema,
      },
      '400': {
        description: 'Current user tried to message themselves',
      },
      '403': {
        description: 'Current user is not allowed to chat with this profile',
      },
      '404': {
        description: 'Profile not found',
      },
    },

    controller: async (req, res) => {
      const { profileId } = req.params;
      const data = await chatService.sendDirectMessage(req.user, profileId, req.body);

      res.status(201).json({
        message: 'Message sent successfully',
        data,
      });
    },
  });

export default chatRouter;
