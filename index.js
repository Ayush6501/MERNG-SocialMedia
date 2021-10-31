const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js')
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

// CdlV965XQ3jFtEAt
mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("MONGODB Connected")
        return server.listen({port: 5000})
    })
    .then(res => {
        console.log(`
    🚀  Server is running!
    🔉  Listening on port 5000
    📭  Query at ${res.url}
  `);
    })
