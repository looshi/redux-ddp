# redux-ddp

Example Leaderboard application demonstrating use of DDP messages to populate a Redux store.

When DDP messages arrive, a Redux action is called and the Redux Store will
be updated accordingly.

### Managing local state
Minimongo is not used to store the remote database driven state.  The Store contains a players collection which is a key value store ( very similar to minimongo ), where each key is the document _id.  I find that using key value objects for a collection inside a Store is much easier to deal with than using an Array.  Thanks to @sikanhe for showing me this idea.Thanks to @AdamBrodzinski, this was originally a fork of his great Flux examples.


### Using DDP messages directly

DDP package used : https://github.com/mondora/ddp.js/

The ddp.js makes it pretty easy to work directly with DDP messages.  The app listens to 'added', 'changed', and 'removed' events, and just copies over the properties of the DDP message to the action object.
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

### Optimistic UI
The server method `'players.update-score'` intentionally errors 1/3 of the time.  This makes it a bit easier to see what happens when the UI is updated optimistically.
On an update error, the server will send down an Error object which contains the current data. The client can revert its state based on this information.  This is an overly simplified approach and puts a lot of onus to the server to handle security implications.

I think the more popular and recommended approaches are done only on the client.  The concept is similar to .git rebasing, remove the commit you don't want and replay all the others.  Here is a good explanation and a library for Redux :
https://github.com/mattkrick/redux-optimistic-ui


# Installation Issues
The react libraries used are all installed via npm.

This project is using Meteor 1.3 beta.

issue : Invariant Violation: addComponentAsRefTo(...)

cause : duplicate React.js files

resolution : find and delete the duplicate React.js , detailed explanation here
https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375#.wu7438ajq

Questions, comments ? please email me at dave@smoothtalker.biz .
