const AWS = require('./AWS')
const queueurl = 'https://sqs.us-east-1.amazonaws.com/962378977114/COMPRA-USA'
const { Consumer } = require('sqs-consumer');
const SQS = new AWS.SQS()
function publish(message){
 var params = {
   MessageBody: message, /* required */
   QueueUrl: queueurl, /* required */
 };
 return SQS.sendMessage(params).promise()
}

module.exports = {
  publish: publish
}

