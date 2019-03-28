const express = require('express');
const db = require('../db/index.js');

const app = express();
const PORT = 65535;

app.use(express.json({ urlencoded: true }));
app.use(express.static('./dist/'));

app.get('/api/products', (req, res) => {
  db.getAll()
    .then(res.send)
    .catch(() => res.send('Failed to get all'));
});

app.get('/api/products/id', (req, res) => {
  const productId = req.query.id;
  db.getOne(productId)
    .then(res.send)
    .catch(res.end);
});

app.post('/api/products', (req, res) => {
  const product = req.body;
  db.addNew(product)
    .then(res.send)
    .catch(res.end);
});

app.patch('/api/products', (req, res) => {
  const productId = req.body.id;
  const { product } = req.body;
  db.updateEntry(productId, product)
    .then(res.send)
    .catch(res.end);
});

app.delete('/api/products', (req, res) => {
  const { id } = req.body;
  db.removeEntry(id)
    .then(res.send)
    .catch(res.end);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
