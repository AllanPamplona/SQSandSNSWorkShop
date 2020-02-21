const AWS = require("./AWS")

function sendTopic(message, distributor, topicArn) {
  // Create publish parameters
  var params = {
    Message: JSON.stringify(message), /* required */
    MessageAttributes: {
      'distributor': {
        DataType: 'String', /* required */
        StringValue: distributor
      },
    },
    TopicArn: topicArn
  };

  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

  // Handle promise's fulfilled/rejected states
  return publishTextPromise
}

module.exports = sendTopic
