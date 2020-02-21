const createError = require('http-errors');
const express = require('express');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const AWS = require('./AWS');
const orderRouter = require('./routes/orderRouter');
const app = express();
const sqsConsumer = require('./sqsConsumer');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/order', orderRouter);

app.use((req, res, next) => {
  next(createError(404));
});

/**
 * Error handler
 */
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({error: 'error'});
});

/**
 * Función para recibir tus propias órdenes de compra y despacharlas
 * a la cadena de envío, debe verificar si la orden es para sí mismo, si no,
 * debe enviarla a otro distribuidor
 * 
 * TIP: Usar la función de chaoticShipping para enviar el paquete de manera aleatoria
 * @param {*} payload 
 */
function purchaseReceiver(payload) {
  console.log(chalk.yellow("Mensaje recibido:"), payload);
  const order = JSON.parse(payload.body); 
  console.log('Estamos preparando su producto para enviarlo a donde lo solicitó');
  //Realizar lógica aquí
}

/**
 * Función para recibir un paquete que no es para ti
 * @param {*} payload 
 */
function chaoticShipping(payload) {
  // Escribir aquí la función para enviar de manera aleatoria a alguna cola
  // Países disponibles: ['espana', 'ecuador', 'japon', 'usa', 'noruega', 'china']
}


const purchaseQueue = 'https://sqs.us-east-1.amazonaws.com/962378977114/COMPRA-USA'
const deliveryQueue = 'https://sqs.us-east-1.amazonaws.com/962378977114/SEND_USA';
const purchaseConsumer = sqsConsumer(purchaseReceiver, purchaseQueue);
const deliveryConsumer = sqsConsumer(chaoticShipping, deliveryQueue);

purchaseConsumer.on('error', (err) => {
  console.error(err.message);
});
deliveryConsumer.on('error', (err) => {
  console.error(err.message);
});
 
purchaseConsumer.on('processing_error', (err) => {
  console.error(err.message);
});
deliveryConsumer.on('processing_error', (err) => {
  console.error(err.message);
});

purchaseConsumer.start(); 
deliveryConsumer.start();


module.exports = app;
