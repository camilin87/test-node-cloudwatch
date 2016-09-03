var readline = require('readline');
var Rx = require('rx');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var lines = Rx.Observable.fromEvent(rl, 'line')
    .takeUntil(Rx.Observable.fromEvent(rl, 'close'))
    .subscribe(
        (line) => console.log("RX: " + line),
        err => console.log("RX_Error: %s", err),
        () => console.log("RX_COMPLETED")
    );

console.log("RX_AWS_REGION", process.env.AWS_REGION)
