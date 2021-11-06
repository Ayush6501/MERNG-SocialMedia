const postsResolvers = require('./Posts');
const usersResolvers = require('./Users');
const commentResolvers = require('./Comments');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation,
    },
    Subscription: {
        ...postsResolvers.Subscription,
    }
}
