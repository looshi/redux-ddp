var subId = DDP.sub('players');
DDP.on('ready', function (message) {
  if (message.id === subId) {
      console.log('players ready');
  }
});

/*
Added Message :
  collection: "players"
  id: "eL98BZxEgh9BDWQMb"
  msg: "added"
  fields:
    name: "Carl Friedrich Gauss"
    score: 40
*/
DDP.on('added', function (message) {
  if(message.collection !== 'players'){return}
  var player = message.fields;
  player._id = message.id;
  Store.dispatch(Actions.logDDP(message));
  Store.dispatch(Actions.playerAdded(player));
});

/*
Changed Message :
  collection: "players"
  id: "Rwcf25ngxdXx4rHKY"
  msg: "changed"
  fields:
    _id: "Rwcf25ngxdXx4rHKY"
    score: 40
*/
DDP.on('changed', function (message) {
  if(message.collection !== 'players'){return}
  var player = message.fields;
  player._id = message.id;
  Store.dispatch(Actions.logDDP(message));
  Store.dispatch(Actions.playerChanged(player));
});

/*
Removed Message :
  collection: "players"
  id: "4oYBYf7q8N2XqjinF"
  msg: "removed"
*/
DDP.on('removed', function (message) {
  if(message.collection !== 'players'){return}
  Store.dispatch(Actions.logDDP(message));
  Store.dispatch(Actions.playerDeleted(message.id));
});
