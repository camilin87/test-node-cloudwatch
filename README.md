# test-node-cloudwatch  
test how easy is to directly log something to cloudwatch

## Setup  

1. Get a pair of credentials that [can forward logs to CloudWatch](https://www.tddapps.com/2016/07/01/configure-AWS-cloudwatch-for-log-forwarders/)  

2. Save then in the `.env` file  

    ```
    AWS_REGION='us-east-1'
    AWS_ACCESS_KEY_ID='XXXXXXXXXXXXXXX'
    AWS_SECRET_ACCESS_KEY='XXXXXXXXXXXXXXX'
    ```

3. Delete existing group names that match our criteria  

    ```sh
    aws logs describe-log-groups --log-group-name-prefix "test-node-cloudwatch"
    aws logs delete-log-group --log-group-name "test-node-cloudwatch"
    aws logs describe-log-groups --log-group-name-prefix "test-node-cloudwatch"
    ```
