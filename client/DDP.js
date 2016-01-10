import DDP from 'DDP.js'

var location = window.location.href.replace(/^https?\:\/\//i, "");
location = 'ws://' + location + 'websocket'
var options = {
    endpoint: location,
    SocketConstructor: WebSocket
};

// Declare a global DDP reference.
// The `DDP` import reference is read only, so we can't just do DDP = new DDP.
// Using "this.DDP" allows us to use the global name 'DDP' elsewhere in the app.
// Also, doing import * as MyDDP alias should work but I can't get it to work :
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
this.DDP = new DDP(options);

this.DDP.on('connected', function () {
  console.log('DDP connected!');
});
