var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
    console.log("F: " + line);
})

console.log("F_AWS_REGION", process.env.AWS_REGION)
