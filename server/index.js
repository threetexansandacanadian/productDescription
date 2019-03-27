const express = require('express');
const db = require('../db/index.js');
const app = express();
const PORT = 65535;

app.use(express.json({urlencoded: true}));

app.get('/api/products', (req, res) => {
  db.getAll((err, data) => {
    if (err) {
      console.log('SERVER: Failed to get data', err);
      res.send('Failed');
    } else {
      res.send(data);
    }
  });
});

app.post('/api/products', (req, res) => {
  const product = req.body;
  db.addNew(product, (err) => {
    if (err) {
      console.log('SERVER: Failed to post data', err); 
      res.send('Failed');
    } else {
      res.send('Success');
    }
  });
});



app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});