"use strict"

import { usersFromServer } from '../api/user';
import { User } from '../types/User';
import { findForum } from './forums';

export const users: User[] = usersFromServer;

export const findUser = (id: string) => {
  return users.find(user => user.id === id)
}

export const getAllUsersResolver = () => {
  return users
};

export const getUserByIdResolver = (parent: any, { id }: { id: string }) => {
  return findUser(id);
};

export const acceptRequestResolver = (parent: any, { forumId, userId }: { forumId: string, userId: string }) => {
  const forum = findForum(forumId);
  const user = findUser(userId);

  if (user && forum?.requests.includes(user)) {
    const index = forum?.requests.indexOf(user)
    forum.users.push(user);
    forum.requests.splice(index, 1)
  }

  return forum;
};

export const refuseRequestResolver = (parent: any, { forumId, userId }: { forumId: string, userId: string }) => {
  const forum = findForum(forumId);
  const user = findUser(userId);

  if (user && forum?.requests.includes(user)) {
    const index = forum?.requests.indexOf(user)
    forum.requests.splice(index, 1)
  }

  return forum;
};

export const createUserResolver = (parent: any, {username, picture, age}: {
  username: string,
  picture: string,
  age: number,
}) => {
  const newUser = {
    id: (users.length + 1).toString(),
    username,
    picture,
    age,
  }
users.push(newUser);

return newUser;
};
