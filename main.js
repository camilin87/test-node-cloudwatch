var os = require("os");
var AWS = require('aws-sdk');

console.log("Starting...", new Date());

// console.log("AWS_REGION", process.env.AWS_REGION);
// console.log("AWS_ACCESS_KEY_ID", process.env.AWS_ACCESS_KEY_ID);
// console.log("AWS_SECRET_ACCESS_KEY", process.env.AWS_SECRET_ACCESS_KEY);

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var cloudwatchlogs = new AWS.CloudWatchLogs();

var params = {
  logEvents: [
    {
      message: 'Sample Log Line',
      timestamp: new Date().getTime()
    }
  ],
  logGroupName: 'test-node-cloudwatch',
  logStreamName: os.hostname(),
  sequenceToken: null
};


cloudwatchlogs.putLogEvents(params, function(err, data) {
    if (err){
        console.log(err, err.stack); // an error occurred
    }
    else{
        console.log(data);           // successful response
    }
});

console.log("Finishing...", new Date());
