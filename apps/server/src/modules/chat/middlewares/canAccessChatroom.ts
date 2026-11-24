import prisma from '@/db';
import { ForbiddenException, NotFoundException } from '@/exceptions';
import isAdmin from '@/middlewares/app/utils/isAdmin';
import type { AuthRequest } from '@/types/api/authRequest';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import { ChatroomType } from '@base-monorepo-v2/db/prisma';
import type { NextFunction, Response } from 'express';
import z from 'zod';

// Members of the room can access it. Admins can also access support rooms,
// since any admin may answer a support conversation.
const canAccessChatroom = (chatroomIdKey: string = 'chatroomId') => {
  return async (req: AuthRequest, _: Response, next: NextFunction) => {
    if (isAdmin(req)) return next();

    const chatroomId = z.uuid().parse(req.params[chatroomIdKey]);
    const profileId = req.user.id;

    const chatroom = await prisma.chatroom.findUnique({
      where: { id: chatroomId },
      select: {
        type: true,
        members: { where: { profileId }, select: { profileId: true } },
      },
    });

    if (!chatroom) {
      throw new NotFoundException(`Chatroom with id ${chatroomId} not found`, {
        code: ERROR_CODES.CHATROOM.NOT_FOUND,
      });
    }

    if (chatroom.members.length > 0) return next();

    if (chatroom.type === ChatroomType.SUPPORT && isAdmin(req)) return next();

    throw new ForbiddenException('You are not a member of this chatroom');
  };
};

export default canAccessChatroom;
