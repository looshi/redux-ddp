let { incrementScore, selectPlayer, playersChanged } = Actions;
Reducers = {};

let initialInterfaceState = {
  selectedPlayer: {},
  statusMessage: '',
  ddpMessages: []
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
      return merge(state, {selectedPlayer: action.player});

    case 'PLAYER_DELETED':
      // Deselect the current player.
      return merge(state, {selectedPlayer: {}});

    case 'UPDATE_SCORE_OK':
      var message = {code: 200, text : action.player.name + ' saved!'}
      return merge(state, {statusMessage: message});

    case 'UPDATE_SCORE_FAILED':
      var message = {code: 500, text : action.player.name + ' save failed!'}
      return merge(state, {statusMessage: message});

    case 'LOG_DDP':
      // These messages will appear in the Redux debug tool
      // since they are added to the state.
      var messages = state.ddpMessages.concat(action.message);
      return merge(state, {ddpMessages: messages});

    default:
      return state;
  }
}

/*
Reducers.players
Manages changes to the state.players collection.
The state.players collection is stored as an object with _id keys, you can
view the players collection structure in the Redux Dev Tools sidebar.
*/
Reducers.players = function(state = {}, action) {
  switch(action.type) {
    case 'PLAYER_ADDED':
      return {...state, [action.player._id]: action.player};

    case 'PLAYER_DELETED':
      return _.omit(state, action.player._id);

    case 'PLAYER_CHANGED':
      // The remote data has changed.
      var oldPlayer = state[action.player._id];
      return {
        ...state,
        [action.player._id]: merge(oldPlayer, action.player)
      }

    case 'UPDATE_SCORE':
      // Optimistically update the score before the server responds.
      var oldPlayer = state[action.player._id];
      var newPlayer = {score: oldPlayer.score + 5};
      return {
        ...state,
        [action.player._id]: merge(oldPlayer, newPlayer)
      }

    case 'UPDATE_SCORE_FAILED':
      // Overwrite the score to the current db state when the update failed.
      // For now we're sending back the score on
      var oldPlayer = state[action.player._id];
      var newPlayer = {score: action.score};
      return {
        ...state,
        [action.player._id]: merge(oldPlayer, newPlayer)
      }

    default:
      return state;
  }
}
