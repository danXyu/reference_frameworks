Posts = new Meteor.Collection('posts');

Posts.allow({
  update: function (userId, post) { return ownsDocument(userId, post); },
  remove: function (userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function (userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

validatePost = function (post) {
  var errors = {};
  if (!post.title) {
    errors.title = "Please fill in a headline";
  }
  if (!post.url) {
    errors.url =  "Please fill in a URL";
  }
  return errors;
};

Meteor.methods({
  postInsert: function (postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    // if (Meteor.isServer) {
    //   postAttributes.title += "(server)";
    //   Meteor._sleepForMs(5000);
    // } else {
    //   postAttributes.title += "(client)";
    // }

    var errors = validatePost(postAttributes);
    if (errors.title || errors.url) {
      throw new Meteor.error('invalid-post', "You need a title and url for a post");
    }

    // Stop the method call if a post already exists.
    var postSame = Posts.findOne({url: postAttributes.url});
    if (postSame) {
      return {
        postExists: true,
        _id: postSame._id
      };
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});