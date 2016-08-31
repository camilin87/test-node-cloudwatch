var AWS = require('aws-sdk');

// console.log("AWS_ACCESS_KEY_ID", process.env.AWS_ACCESS_KEY_ID);
// console.log("AWS_SECRET_ACCESS_KEY", process.env.AWS_SECRET_ACCESS_KEY);

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: 'secret'
});

console.log("logging something hell yeah!", new Date());

