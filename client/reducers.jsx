let { incrementScore, selectPlayer, playersChanged } = Actions;
Reducers = {};

let initialInterfaceState = {
  selectedId: '',
  selectedPlayerName: '',
  errorMessage: ''
}

/*
  merge
  Helper to *copy* old state and merge new data with it, currently this
  implementation uses underscore's _.extend function.
  http://underscorejs.org/#extend

  Alternatives :
  Object.assign({}, objectA, objectB); ES6
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

  Destructuring Assignment using the Spread ... operator
  {...objectA, ...objectB}; ES7
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/
function merge(objectA, objectB) {
  return _.extend({}, objectA, objectB);
}

// these reducers *must* be pure to use time-travel dev-tools
// never directly mutate the `state` param, use merge instead

Reducers.userInterface = function userInterface(state, action) {
  state = state || initialInterfaceState;

  switch (action.type) {
    case 'SELECT_PLAYER':
      // we happen to be replacing all the reducers state but with merge you
      // could just return the selectedId and it would retain selectedPlayerName
      return merge(state, {
        selectedId: action.playerId,
        selectedPlayerName: action.playerName
      });
    default:
      return state;
  }
}

/*
Reducers.players
Manages changes to the state.players collection.
The state.players collection is stored as an object with _id keys, you can
view the players collection structure in the Redux Dev Tools sidebar.

Optimistic UI
The 'UPDATE_SCORE' action will optimistically update the local state.
If the db update fails, state will be updated later via the UPDATE_SCORE_FAILED.
If the db update succeeds, but the score didn't actually get incremented by 5,
the state will be updated to display the real db score via PLAYERS_CHANGED.
*/
Reducers.players = function(state = {}, action) {
  switch(action.type) {
    default:
      return state;
    case 'UPDATE_SCORE':
      var oldPlayer = state[action.playerId];
      var oldTransactions = oldPlayer.transactions || [];
      var newPlayer = {
        score: oldPlayer.score + 5,
        transactions: [...oldTransactions, action.transactionId],
        saveStatus: 'pending'
      };
      return {
        ...state,
        [action.playerId]: merge(oldPlayer, newPlayer)
      }
    case 'UPDATE_SCORE_FAILED':
      // The server method failed, revert the increment and remove the pending
      // transactionId from the player.transactions array.
      var oldPlayer = state[action.playerId];
      var newTransactions = _.reject(oldPlayer.transactions, (transactionId) =>{
        return transactionId === action.transactionId;
      });
      var newPlayer = {
        score: oldPlayer.score - 5,
        transactions: newTransactions,
        saveStatus: 'failed'
      };
      return {
        ...state,
        [action.playerId]: merge(oldPlayer, newPlayer)
      }
    case 'UPDATE_SCORE_SUCCESS':
      // The server method was succesful! Remove the pending transactionId.
      var oldPlayer = state[action.playerId];
      var newTransactions = _.reject(oldPlayer.transactions, (transactionId) =>{
        return transactionId === action.transactionId;
      });
      var newPlayer = {
        transactions: newTransactions,
        saveStatus: 'ok'
      };
      return {
        ...state,
        [action.playerId]: merge(oldPlayer, newPlayer)
      }
    case 'PLAYERS_CHANGED':
      // The remote data has changed.
      const newPlayers = {};
      action.players.forEach(newPlayer => {
        newPlayers[newPlayer._id] = newPlayer;
      });
      return merge(state, newPlayers);
  }
}
