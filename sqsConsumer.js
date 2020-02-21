const { Consumer } = require('sqs-consumer');
const queueUrl = 'https://sqs.us-east-1.amazonaws.com/962378977114/COMPRA-USA'
module.exports = function(callBack){
  var module = {}

  module.app = Consumer.create({
    queueUrl: queueUrl,
    handleMessage: callBack
  });
  return module
}
