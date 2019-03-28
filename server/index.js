const express = require('express');
const db = require('../db/index.js');
const app = express();
const PORT = 65535;

app.use(express.json({urlencoded: true}));
app.use(express.static('./dist/'))

app.get('/api/products', (req, res) => {
  db.getAll((err, data) => {
    if (err) {
      console.log('SERVER: Failed to get data', err);
      res.send('Failed to get');
    } else {
      res.send(data);
    }
  });
});

app.get('/api/products/id', (req, res) => {
  const productId = req.query.id;
  console.log(productId)
  res.send('Papa dapa gapa')
})

app.post('/api/products', (req, res) => {
  const product = req.body;
  db.addNew(product, (err) => {
    if (err) {
      console.log('SERVER: Failed to post data', err); 
      res.send('Failed to post');
    } else {
      res.send('Success');
    }
  });
});

app.patch('/api/products', (req, res) => {
  const productId = req.body.id;
  const product = req.body.product;
  db.updateEntry(productId, product, (err) => {
    if (err) {
      console.log('SERVER: Failed to update item', err);
      res.send('Failed to update');
    } else {
      res.send('Update');
    }
  });
});

app.delete('/api/products', (req, res) => {
  const id = req.body.id;
  db.removeEntry(id, (err) => {
    if (err) {
      console.log('SERVER: Failed to delete item', err);
      res.send('Failed to delete');
    } else {
      res.send('Deleted');
    }
  });
});


app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});