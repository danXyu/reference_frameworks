//Meteor.subscribe('posts');
if (Meteor.isClient) {
  Session.set('pageTitle', 'Microscope');
}

Meteor.startup(function () {
  Tracker.autorun(function () {
    // So this statement isn't reactive, but become so because it's inside an autorun.
    console.log('There are ' + Posts.find().count() + ' posts');
    // Means that Posts (the reactive datasource), will call this function whenever it changes.
  });
});

/* Notes! */

// Reactivity is limited to specific areas of the code called computations.
// The computation is a block of code that runs every time one of its reactive data sources changes.

// This is the code to create a reactive computation with dependency.
// You essential transform a non-reactive variable into a reactive function.

// var _currentLikeCount = 0;
// var _currentLikeCountListeners = new Tracker.Dependency();
// currentLikeCount = function() {
//   _currentLikeCountListeners.depend();
//   return _currentLikeCount;
// }

// Meteor.setInterval(function() {
//   var postId;
//   if (Meteor.user() && postId = Session.get('currentPostId')) {
//     getFacebookLikeCount(Meteor.user(), Posts.find(postId),
//       function(err, count) {
//         if (!err && count !== _currentLikeCount) {
//           _currentLikeCount = count;
//           _currentLikeCountListeners.changed();
//         }
//       });
//   }
// }, 5 * 1000);

// Or just use 'reactive-var' package