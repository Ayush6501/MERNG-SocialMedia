const postsResolvers = require('./Posts');
const userResolvers = require('./Users');

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    }
}
