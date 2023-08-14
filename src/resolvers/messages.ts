"use strict"
import { messagesFromServer } from "../api/message";
import { Message } from "../types/Message";
import { findForum } from "./forums";
import { findUser } from "./users";

export const messages: Message[] = messagesFromServer

export const watchMessagesResolver = (parent: any, {forumId, userId }: { forumId: string, userId: string }) => {
  const forum = findForum(forumId);
  const user = findUser(userId);

  if (user && forum?.users.includes(user)) {
       return forum.messages.sort((a, b) => b.sentAt.localeCompare(a.sentAt))
  }
};

export const createMessageResolver = (parent: any, {text, userId, forumId}: {
  text: string, 
  userId: string, 
  forumId: string 
}) => {
  const user = findUser(userId);
  const forum = findForum(forumId);

  if (user 
      && forum 
      && forum.users.includes(user)
    ) {
    const date = new Date
    const newMessage = {
      id: (messages.length + 1).toString(),
      text,
      sentAt: date.toString(),
      user
    };

    forum.messages.push(newMessage)

    return newMessage;
  }
};