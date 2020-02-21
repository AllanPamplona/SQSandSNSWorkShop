const chalk = require('chalk');
const express = require('express');
const router = express.Router();
const publish = require('../SNS');
const purchaseTopic = 'arn:aws:sns:us-east-1:962378977114:exchange';

router.route('/generate').post((req, res) => {
  const messageToPublish = req.body;
  const {
    product,
    distributor,
    clientData: {
      name,
      email,
      cellphone
    }
  } = req.body;
  console.log(chalk.green('Name:'),
  name,
  chalk.yellow('| Email:'),
  email,
  chalk.blue('| Cellphone:'),
  cellphone);
  // Envia a SNS (al exchange)
  publish(messageToPublish, distributor, purchaseTopic);
  res.status(201).send({
    code: 'Success',
    message: `Distributor ${distributor} is processing your order`,
  });
});

module.exports = router;
