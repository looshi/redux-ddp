Meteor.methods({

  'players.fetch': function(playerId){
    // Simulates a slow response by sleeping for 1 second.
    Meteor._sleepForMs(1000);
    // Fetch a single player when playerId is given, else fetch all players.
    var options = playerId || {};
    return Players.find(options).fetch();
  },

  'players.update-score': function(playerId){
    // Simulates a slow response by sleeping for 1 second.
    Meteor._sleepForMs(1000);
    // Fail one third of the time.
    if(Math.random()<.33){
      // Send the real score down with the error.
      // Clients can use this information to revert optimistic UI updates.
      var error = new Meteor.Error(500, 'Score error');
      error.details = {score: Players.findOne(playerId).score};
      throw error;
    }
    Players.update({_id: playerId}, {$inc: {score: 5}});
    return Players.findOne(playerId)
  },

  // Delete a single player.
  'players.delete': function(playerId){
    Players.remove({_id: playerId});
  },

  // Reset the Player collection to its default state.
  'players.reset': function(){
    resetPlayers();
  }
});

var resetPlayers = function(){
  Players.remove({});
  console.log( 'Reseting Players... ');
  var names = [
    'Ada Lovelace',
    'Grace Hopper',
    'Marie Curie',
    'Carl Friedrich Gauss',
    'Nikola Tesla',
    'Claude Shannon'];
  names.forEach(function (name) {
    Players.insert({
      name: name,
      score: Math.floor(Random.fraction() * 10) * 5
    });
  });
}
// Run fixtures on server start.
Meteor.startup(function () {
  resetPlayers();
});
