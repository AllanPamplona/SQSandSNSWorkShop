const AWS = require('aws-sdk')
AWS.config.loadFromPath('./credentials.json');
const sqs = new AWS.SQS();
const queueurl = 'https://sqs.us-east-1.amazonaws.com/962378977114/COMPRA-CHINA'
const { Consumer } = require('sqs-consumer');
const  sns = new AWS.SNS()
function publish(message){
 var params = {
   MessageBody: message, /* required */
   QueueUrl: queueurl, /* required */
 };
 sqs.sendMessage(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });
}

const app = Consumer.create({
  queueUrl: queueurl,
  handleMessage: async (message) => {
    return new Promise((resolve, reject) => {
      console.log("queue", message)
      resolve()
    })
  }
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();

