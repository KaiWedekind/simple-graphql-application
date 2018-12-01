import { PubSub } from 'apollo-server-express';
import authors from './authors';

const pubsub = new PubSub();

const AUTHOR_CREATED = 'author_created';

export default {
  Query: {
    hello: () => 'Hello world!',
    getAuthors: () => authors
  },

  Mutation: {
    createAuthor: (parent, args) => {
      const newAuthor = {
        id: authors.length + 1,
        info: {
          ...args,
          createdAt: new Date().getTime()
        }
      }
      authors.push(newAuthor);
      pubsub.publish(AUTHOR_CREATED, { authorCreated: newAuthor })
      return newAuthor;
    }
  },

  Subscription: {
    authorCreated: {
      subscribe: () => pubsub.asyncIterator([AUTHOR_CREATED])
    }
  }
};
