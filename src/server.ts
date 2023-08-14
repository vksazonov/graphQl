import cors from 'cors';
import express from 'express';
import { schema } from './schemes/schema';
import { ApolloServer } from 'apollo-server-express'
import * as userResolvers from './resolvers/users';
import * as forumResolvers from './resolvers/forums';
import * as messageResolver from './resolvers/messages';

const app = express();
const port = 3000

app.use(cors())

const resolvers = {
  Query: {
    getAllUsers: userResolvers.getAllUsersResolver,

    getUserById: userResolvers.getUserByIdResolver,

    getJoinedForums: forumResolvers.getJoinedForumsResolver,

    getAllNonPrivateForums: forumResolvers.getAllNonPrivateForums,

    watchMessages: messageResolver.watchMessagesResolver,

    getForumMembers: forumResolvers.getForumMembersResolver,
  },

  Mutation: {
    createForum: forumResolvers.createForumResolver,

    joinForumById: forumResolvers.joinForumByIdResolver,

    acceptRequest: userResolvers.acceptRequestResolver,

    refuseRequest: userResolvers.refuseRequestResolver,

    createMessage: messageResolver.createMessageResolver,

    createUser: userResolvers.createUserResolver,
  }
}

const server = new ApolloServer({ 
  typeDefs: schema, 
  resolvers,
})

async function startSever() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql'});

  app.listen(port, () => console.log(`Server is running on port http://localhost:${port}/graphql`));
}

startSever();

