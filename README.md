# redux-ddp

Example Leaderboard application demonstrating use of DDP messages to populate a Redux store.

Demo App here : http://reduxddp.meteor.com/

When DDP messages arrive, a Redux action is called and the Redux Store will
be updated accordingly.

### Managing local state
Minimongo is not used to store the remote database driven state.  The Store contains a players collection which is a key value store ( very similar to minimongo ), where each key is the document _id.  I find that using key value objects for a collection inside a Store is much easier to deal with than using an Array.  Thanks to @sikanhe for showing me this idea.Thanks to @AdamBrodzinski, this was originally a fork of his great Flux examples.

### Optimistic UI
The server method `'players.update-score'` intentionally errors 1/3 of the time.  This demonstrates a basic way to do optimistic UI.  Changes to the local data are represented on the client as soon as the UI event happens.  If the server method fails, the local Store will be updated and the UI change will be seen as reverted.

DDP package used : https://github.com/mondora/ddp.js/

DDP subscription and message :
```
// Subscribe to the players collection.
DDP.sub('players');

/*
Handle a player added message.
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
  Store.dispatch(Actions.playerAdded(player));
});
```

![Image of App](https://cloud.githubusercontent.com/assets/1656829/12219193/2b2d3b68-b6ed-11e5-9072-9eb3e6144fd1.png)




# Installation Issues
The react libraries used are all installed via npm.

This project is using Meteor 1.3 beta.

issue : Invariant Violation: addComponentAsRefTo(...)

cause : duplicate React.js files

resolution : find and delete the duplicate React.js , detailed explanation here
https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375#.wu7438ajq

Questions, comments ? please email me at dave@smoothtalker.biz .
