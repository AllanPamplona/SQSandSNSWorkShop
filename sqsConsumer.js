const { Consumer } = require('sqs-consumer');

module.exports = (callBack, queueUrl) => {
  return Consumer.create({
    queueUrl: queueUrl,
    handleMessage: callBack
  });
}
