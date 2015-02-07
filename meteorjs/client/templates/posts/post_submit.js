Template.postSubmit.created = function () {
  Session.set('postSubmitErrors', {});
};

Template.postSubmit.events({
  'submit form': function (e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validatePost(post);
    if (errors.title || errors.url) {
      return Session.set('postSubmitErrors', errors);
    }

    // The callback is automatically defined as having (error, result) format.
    Meteor.call('postInsert', post, function (error, result) {
      if (error) {
        return throwError(error.reason);
      }

      // show this result but route anyway
      if (result.postExists) {
        throwError('This link has already been posted');
      }

      Router.go('postPage', {_id: result._id});
    });
  }
});

Template.postSubmit.helpers({
  errorMessage: function (field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});