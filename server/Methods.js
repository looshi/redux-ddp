Meteor.methods({

  'players.fetch': function(playerId){
    // Simulates a slow response by sleeping for 1 second.
    Meteor._sleepForMs(1000);
    // Fetch a single player when playerId is given, else fetch all players.
    var options = playerId || {};
    return Players.find(options).fetch();
  },

  'players.update-score': function(playerId, transactionId){
    // Simulates a slow response by sleeping for 1 second.
    Meteor._sleepForMs(1000);
    // Fail one third of the time.
    if(Math.random()<.33){
      var error = {
        message:'Increment Score Error',
        transactionId: transactionId
      }
      throw new Error(error);
    }
    Players.update({_id: playerId}, {$inc: {score: 5}});
    return {
      player: Players.findOne(playerId),
      transactionId: transactionId
    }
  }

})