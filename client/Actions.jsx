// action creators are functions that take a param and return
// an 'action' that is consumed by a reducer. This may seem like
// unneeded boilerplate  but it's **really** nice to have a file
// with *all* possible ways to mutate the state of the app.

Actions = {};
// Player data has changed.
Actions.playerChanged = function playersChanged(player) {
  return {
    type: 'PLAYER_CHANGED',
    player: player
  };
};

Actions.playerAdded = function playersChanged(player) {
  return {
    type: 'PLAYER_ADDED',
    player: player
  };
};

Actions.updateScore = function updateScore(playerId, playerName) {
  Meteor.call('players.update-score', playerId, function(err,res){
    if(err){
      Store.dispatch(Actions.updateScoreFailed(playerId, playerName));
    }else{
      Store.dispatch(Actions.updateScoreOk(playerId, playerName));
    }
  });
  return {
    type: 'UPDATE_SCORE',
    playerId: playerId
  };
};

Actions.updateScoreFailed = function updateScoreFailed(playerId, playerName) {
  return {
    type: 'UPDATE_SCORE_FAILED',
    playerId: playerId,
    playerName: playerName
  };
}

Actions.updateScoreOk = function updateScoreOk(playerId, playerName) {
  return {
    type: 'UPDATE_SCORE_OK',
    playerId: playerId,
    playerName: playerName
  };
}

Actions.selectPlayer = function selectPlayer(playerId, playerName) {
  return {
    type: 'SELECT_PLAYER',
    playerId: playerId,
    playerName: playerName
  };
};

