const express = require('express');
const db = require('../db/index.js');

const app = express();
const PORT = 65535;

app.use(express.json({ urlencoded: true }));
app.use(express.static('./dist/'));

app.get('/api/products', (req, res) => {
  db.getAll()
    .then(results => res.send(results))
    .catch(err => res.send('Failed to get all', err));
});

app.get('/api/products/id', (req, res) => {
  const productId = req.query.id;
  db.getOne(productId)
    .then(result => res.send(result))
    .catch(res.end);
});

app.post('/api/products', (req, res) => {
  const product = req.body;
  db.addNew(product)
    .then(() => res.sen())
    .catch(() => res.end());
});

app.patch('/api/products', (req, res) => {
  const productId = req.body.productID;
  const product = req.body;
  delete product._id;
  db.updateEntry(productId, product)
    .then(() => res.end())
    .catch(() => res.end());
});

app.delete('/api/products/id', (req, res) => {
  const productId = req.query.id;
  db.removeEntry(Number(productId))
    .then(() => res.end())
    .catch(() => res.end());
});

app.post('/api/products/secret', (req, res) => {
  const products = req.body;
  db.massAddNew(products)
    .then(() => res.end())
    .catch(() => res.end());
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
