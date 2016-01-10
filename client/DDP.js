/*
The ddp package used is named is 'ddp.js' :
https://www.npmjs.com/package/ddp.js
There is another package called 'ddp' which is similar :
https://www.npmjs.com/package/ddp
*/
import DDP from 'ddp.js'

var location = window.location.href.replace(/^https?\:\/\//i, "");
location = 'ws://' + location + 'websocket'
var options = {
    endpoint: location,
    SocketConstructor: WebSocket
};

// Declare a global DDP variable we can use in the app.
// The `DDP` import reference is read only, so we can't just do DDP = new DDP.
// Using "this.DDP" allows us to use the global name 'DDP' elsewhere in the app.
// `import * as MyDDP` alias should work but I can't get it to work :
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
this.DDP = new DDP(options);

this.DDP.on('connected', function () {
  Store.dispatch(Actions.logDDP({message:'connected'}));
});
