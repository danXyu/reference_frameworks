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
