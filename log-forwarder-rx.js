var readline = require('readline');
var Rx = require('rx');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var rlOn = Rx.Observable.fromCallback(rl.on);

rlOn("line").subscribe((line) => {
    console.log("RX: " + line);
})

rlOn("close").subscribe(() => {
    console.log("RX_CLOSE");
})

console.log("RX_AWS_REGION", process.env.AWS_REGION)
