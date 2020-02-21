var express = require('express');
var router = express.Router();
var sqs = require('../queueSub')
/* GET home page. */
router.get('/', function(req, res, next) {
  sqs.publish("holi")
  res.json({ title: 'Express' });
});

module.exports = router;
