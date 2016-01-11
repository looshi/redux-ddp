// action creators are functions that take a param and return
// an 'action' that is consumed by a reducer. This may seem like
// unneeded boilerplate  but it's **really** nice to have a file
// with *all* possible ways to mutate the state of the app.

Actions = {};
// Player data has changed.
Actions.playerChanged = function playersChanged(player) {
  return {type: 'PLAYER_CHANGED', player};
};

Actions.playerAdded = function playersChanged(player) {
  return {type: 'PLAYER_ADDED', player};
};

Actions.updateScore = function updateScore(player) {
  Meteor.call('players.update-score', player._id, function(err, res){
    if(err){
      // The server error returns the true score.
      let score = err.details.score;
      Store.dispatch(Actions.updateScoreFailed(player, score));
    }else{
      Store.dispatch(Actions.updateScoreOk(player));
    }
  });
  return {type: 'UPDATE_SCORE', player};
};

Actions.updateScoreFailed = function updateScoreFailed(player, score) {
  return {type: 'UPDATE_SCORE_FAILED', player, score};
}

Actions.updateScoreOk = function updateScoreOk(player) {
  return {type: 'UPDATE_SCORE_OK', player};
}

Actions.selectPlayer = function selectPlayer(player) {
  return {type: 'SELECT_PLAYER', player};
};

Actions.deletePlayer = function deletePlayer(player) {
  Meteor.call('players.delete', player._id);
  return {type: 'DELETE_PLAYER', player};
};

Actions.playerDeleted = function playerDeleted(_id) {
  return {
    type: 'PLAYER_DELETED',
    player: {_id: _id}
  };
};

// Regenerates player data randomly.
Actions.resetPlayers = function resetPlayers() {
  Meteor.call('players.reset');
  return { type: 'RESET_PLAYERS' };
};

// Log DDP messages
Actions.logDDP = function logDDP(message) {
  return {
    type: 'LOG_DDP',
    message: message
  };
};
