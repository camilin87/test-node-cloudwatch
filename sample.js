var os = require("os");
var AWS = require('aws-sdk');
var async = require("async");
var StdOutFixture = require('fixture-stdout');

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
var nextSequenceToken = {
    value: null
};

var cloudwatchlogs = new AWS.CloudWatchLogs();

async.series([
    createLogGroup,
    createLogStream,
    readNextSequenceToken,
    cofigureStdOutputHooks,
    logSomething("sample log line1"),
    logSomething("sample log line2")
], (err) => {
    if (err){
        console.log(err, err.stack);
        return;
    }

    console.log("Finishing...", new Date());
})

function createLogGroup(callback){
    var params = {
        logGroupNamePrefix: logGroupName
    };
    cloudwatchlogs.describeLogGroups(params, function(err, data) {
        if (err) {
            callback();
            return;
        }

        var groupAlreadyExists = (data.logGroups || []).find((g) => {
            return g.logGroupName === logGroupName;
        });

        if (groupAlreadyExists){
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

function createLogStream(callback) {
    var params = {
        logGroupName: logGroupName,
        logStreamNamePrefix: logStreamName
    };
    cloudwatchlogs.describeLogStreams(params, function(err, data) {
        if (err){
            callback(err);
            return;
        }

        var logStreamAlreadyExists = (data.logStreams || []).find((s) => {
            return s.logStreamName === logStreamName;
        });

        if (logStreamAlreadyExists){
            callback(null);
        }
        else {
            createNonExistentLogStream(callback);
        }
    });
}

function createNonExistentLogStream(callback){
    var params = {
        logGroupName: logGroupName,
        logStreamName: logStreamName
    };
    cloudwatchlogs.createLogStream(params, handleAwsResult(callback));
}

function readNextSequenceToken(callback) {
    var params = {
        logGroupName: logGroupName,
        logStreamNamePrefix: logStreamName
    };
    cloudwatchlogs.describeLogStreams(params, function(err, data) {
        if (err){
            callback(err);
            return;
        }

        nextSequenceToken.value = data.logStreams[0].uploadSequenceToken;
        callback(null);
    });
}

function logSomethingToCloudWatch(logLine){
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
            sequenceToken: nextSequenceToken.value
        };

        cloudwatchlogs.putLogEvents(params, (err, data) => {
            if (err){
                callback(err);
                return;
            }

            nextSequenceToken.value = data.nextSequenceToken;

            callback(null);
        });
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

function cofigureStdOutputHooks(callback) {
    new StdOutFixture().capture(stdWriteHook);
    new StdOutFixture({stream: process.stderr}).capture(stdWriteHook);

    callback(null);
}

function stdWriteHook(string, encoding, fd) {
    logSomethingToCloudWatch(string)((err, data) => {});

    return true;
}

function logSomething(logLine){
    return (callback) => {
        console.log(logLine);
        callback(null);
    }
}
