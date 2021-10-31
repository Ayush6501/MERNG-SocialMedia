const postsResolvers = require('./Posts');
const usersResolvers = require('./Users');
const commentResolvers = require('./Comments');

module.exports = {
    Post: {
      likeCount: (parent) => {
          return parent.likes.length
      },
      commentCount: (parent) => {
          return parent.comments.length
      }
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
