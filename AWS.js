const AWS = require('aws-sdk')
AWS.config.loadFromPath('./credentials.json');
module.exports =  AWS
