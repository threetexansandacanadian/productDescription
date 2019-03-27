const express = require('express');
const app = express();
const PORT = 65535;

app.get('/api/products', (req, res) => {
  res.send('You\'ve reached api/products');
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});