import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log('new connection')
    },
    onDisconnect: (webSocket, context) => {
      console.log('lost connection')
    },
  }
});
 
const app = express();
server.applyMiddleware({
  app,
  path: '/graphql'
});

const port = process.env.PORT || 3500;

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
})
