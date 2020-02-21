const AWS = require("/AWS")
const topicARN = "arn:aws:sns:us-east-1:962378977114:Compra"

function sendTopic(message){
  // Create publish parameters
  var params = {
    Message: message, /* required */
    TopicArn: topicARN
  };

  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

  // Handle promise's fulfilled/rejected states
  return publishTextPromise
}

module.exports = {
  sendTopic: sendTopic
}
