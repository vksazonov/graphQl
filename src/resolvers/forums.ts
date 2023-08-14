"use strict"
import { forumsFromServer } from "../api/forum";
import { Forum } from "../types/Forum";
import { findUser } from "./users";

export const forums: Forum[] = forumsFromServer;

export const findForum = (id: string) => {
  return forums.find(forum => forum.id === id)
}

export const getJoinedForumsResolver = (parent: any, { id }: { id: string }) => {
  const user = findUser(id);

  if (user) {
    return forums.filter(forum => forum.users.includes(user));
  }
};

export const getAllNonPrivateForums = () => {
  const nonPrivateForums = forums.filter(forum => !forum.private)
  return nonPrivateForums;
};

export const joinForumByIdResolver = (parent: any, { forumId, userId }: { forumId: string, userId: string }) => {
  const forum = findForum(forumId);
  const user = findUser(userId);

  if (user) {
    if (forum?.private) {
      forum.requests.push(user)
    }
    forum?.users.push(user);
  }
  return forum
};

export const getForumMembersResolver = (parent: any, {forumId}: { forumId: string }) => {
  const forum = findForum(forumId);

  return forum?.users
};

export const createForumResolver = (
  parent: any,
  { name, userId, private: isPrivate }: { name: string; userId: string; private: boolean }
) => {
  const user = findUser(userId);

  if (user) {
    const newForum = createNewForum(name, isPrivate, user);

    forums.push(newForum);

    return newForum;
  }
};

const createNewForum = (name: string, isPrivate: boolean, admin: any) => {
  return {
    id: (forums.length + 1).toString(),
    name,
    private: isPrivate,
    admin,
    users: [admin],
    messages: [],
    requests: [],
  };
};