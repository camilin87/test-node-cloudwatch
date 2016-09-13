# test-node-cloudwatch  
Test project to forward logs to cloudwatch using [aws-cloudwatch-forwarder](https://www.npmjs.com/package/aws-cloudwatch-forwarder)  

## Setup  

1. Get a pair of credentials that [can forward logs to CloudWatch](https://www.tddapps.com/2016/07/01/configure-AWS-cloudwatch-for-log-forwarders/)  

2. Save then in the `.env` file  

    ```
    AWS_REGION='us-east-1'
    AWS_ACCESS_KEY_ID='XXXXXXXXXXXXXXX'
    AWS_SECRET_ACCESS_KEY='XXXXXXXXXXXXXXX'
    FC_AWS_LOG_GROUP_NAME='test-node-cloudwatch'
    FCG_RETRY_COUNT=3
    ```

3. Delete existing group names that match our criteria  

    ```sh
    aws logs describe-log-groups --log-group-name-prefix "test-node-cloudwatch"
    aws logs delete-log-group --log-group-name "test-node-cloudwatch"
    aws logs describe-log-groups --log-group-name-prefix "test-node-cloudwatch"
    ```

## Execution  

Run `npm run redirect2` to forward a command line output to Cloudwatch  

Run `npm run http2` to forward a web server output to Cloudwatch  
