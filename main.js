var os = require("os");
var AWS = require('aws-sdk');
var async = require("async");

console.log("Starting...", new Date());

// console.log("AWS_REGION", process.env.AWS_REGION);
// console.log("AWS_ACCESS_KEY_ID", process.env.AWS_ACCESS_KEY_ID);
// console.log("AWS_SECRET_ACCESS_KEY", process.env.AWS_SECRET_ACCESS_KEY);

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var logGroupName = "test-node-cloudwatch";
var logStreamName = os.hostname();

var cloudwatchlogs = new AWS.CloudWatchLogs();

async.series([
    createLogGroup,
    createLogStream,
    logSomething("sample log line ")
], (err) => {
    if (err){
        console.log(err, err.stack);
        return;
    }

    console.log("Finishing...", new Date());
})

function createLogGroup(callback){
    var params = {
        limit: 0,
        logGroupNamePrefix: logGroupName
    };
    cloudwatchlogs.describeLogGroups(params, function(err, data) {
        if (err) {
            callback();
            return;
        }

        var indexOfExistingGroup = (data.logGroups || []).indexOf((g) => {
            return g.logGroupName === logGroupName;
        });

        if (indexOfExistingGroup >= 0){
            callback(null);
        }
        else{
            createNonExistentLogGroup(callback);
        }
    });
}

function createNonExistentLogGroup(callback) {
    var params = {
        logGroupName: logGroupName
    };
    cloudwatchlogs.createLogGroup(params, handleAwsResult(callback));
}

function createLogStream(callback){
    var params = {
        logGroupName: logGroupName,
        logStreamName: logStreamName
    };
    cloudwatchlogs.createLogStream(params, handleAwsResult(callback));
}

function logSomething(logLine){
    return (callback) => {
        var params = {
            logEvents: [
                {
                  message: logLine,
                  timestamp: new Date().getTime()
                }
            ],
            logGroupName: logGroupName,
            logStreamName: logStreamName,
            sequenceToken: null
        };
        cloudwatchlogs.putLogEvents(params, handleAwsResult(callback));
    }
}

function handleAwsResult(callback){
    return (err, data) => {
        if (err){
            callback(err);
            return;
        }

        console.log(data);
        callback(null);
    }
}
