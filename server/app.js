const express = require('express');
const morgan = require('morgan');
const db = require('../db/index.js');

const app = express();

app.use(morgan('dev'));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// app.use(express.json({ urlencoded: true }));
app.use(express.static('dist'));

// app.get('/api/products', (req, res) => {
//   db.getAll()
//     .then(results => res.send(results))
//     .catch(err => res.send('Failed to get all', err));
// });

app.get('/api/products/id', (req, res) => {
  const productId = req.query.id;
  db.getOneById(productId)
    .then(result => res.send(result))
    .catch(() => res.end());
});

// app.get('/api/products/name', (req, res) => {
//   const productName = req.query.name;
//   db.getOneByName(productName)
//     .then(results => res.send(results))
//     .catch(() => res.end());
// });

// app.post('/api/products', (req, res) => {
//   const product = req.body;
//   db.addNew(product)
//     .then(() => {
//       res.sendStatus(201);
//     })
//     .catch(() => res.end());
// });

// app.patch('/api/products', (req, res) => {
//   const productId = req.body.productID;
//   const product = req.body;
//   delete product._id;
//   db.updateEntry(productId, product)
//     .then(() => res.sendStatus(204))
//     .catch(() => res.end());
// });

// app.delete('/api/products/id', (req, res) => {
//   const productId = req.query.id;
//   db.removeEntry(Number(productId))
//     .then(() => res.sendStatus(204))
//     .catch(() => res.end());
// });

// app.post('/api/products/secret', (req, res) => {
//   const products = req.body;
//   db.massAddNew(products)
//     .then(() => res.end())
//     .catch(() => res.end());
// });

module.exports = app;
