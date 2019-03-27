const moongoose = require('mongoose');
moongoose.Promise = global.Promise;
moongoose.connect('mongodb://localhost/productDescription', {useNewUrlParser: true});

const dbSchema = moongoose.Schema({
  name: 'String',
  price: 'Number',
  bulletOne: 'String',
  bulletTwo: 'String',
  bulletThree: 'String',
  sellerName: 'String',
  description: 'String'
});

const Desc = moongoose.model('Desc', dbSchema);

const addNew = (product, cb) => {
  const newProduct = new Desc(product);
  newProduct.save()
    .then(() => {
      cb(null, 'Success');
    })
    .catch(err => {
      cb(err);
    });
};

const getAll = (cb) => {
  Desc.find()
    .then(results => {
      cb(null, results);
    })
    .catch(err => {
      cb(err);
    });
};

const updateEntry = (productId, product, cb) => {
  Desc.findByIdAndUpdate(productId, product)
    .then(() => {
      cb(null);
    })
    .catch(err => {
      cb(err);
    });
};

module.exports = {addNew, getAll, updateEntry};