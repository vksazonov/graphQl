'use strict'

import { gql } from 'apollo-server-express'

export const schema = gql`
type Query {
  getAllUsers: [User]
  getUserById(id: ID): User!
  getJoinedForums(id: ID): [Forum]
  getAllNonPrivateForums: [Forum]
  watchMessages(forumId: ID, userId: ID): [Message]
  getForumMembers(forumId: ID): [User]
}

type Mutation {
  createForum(name: String!, userId: String!, private: Boolean): Forum
  joinForumById(forumId: ID, userId: ID): Forum
  acceptRequest(forumId: ID, userId: ID): Forum
  refuseRequest(forumId: ID, userId: ID): Forum
  createMessage(text: String!, userId: String!, forumId: String!): Message
  createUser(username: String!, picture: String!, age: Int!): User
}

  type Forum {
    id: ID
    name: String
    private: Boolean
    admin: User
    users: [User]
    messages: [Message] 
    requests: [User]
  }

  type User {
    id: ID
    username: String
    picture: String
    age: Int
  }

  type Message {
    id: ID
    text: String
    sentAt: String
    user: User
  }
`

