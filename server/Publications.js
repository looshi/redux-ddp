Meteor.publish('players', function() {
  return Players.find();
});
