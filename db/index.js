const moongoose = require('mongoose');

moongoose.Promise = global.Promise;
moongoose.connect('mongodb://localhost/productDescription', { useNewUrlParser: true });

const dbSchema = moongoose.Schema({
  name: 'String',
  price: 'Number',
  bulletOne: 'String',
  bulletTwo: 'String',
  bulletThree: 'String',
  sellerName: 'String',
  description: 'String',
  productID: 'Number',
});

const Desc = moongoose.model('Desc', dbSchema);

const addNew = (product) => {
  const newProduct = new Desc(product);
  return newProduct.save();
};

const getOneById = productId => Desc.findOne({ productID: productId });

const getOneByName = productName => Desc.findOne({ name: productName });

const getAll = () => Desc.find();

const updateEntry = (ID, product) => Desc.findOneAndUpdate({ productID: ID }, product);

const removeEntry = productId => Desc.findOneAndDelete({ productID: productId });

const massAddNew = products => Desc.insertMany(products);

module.exports = {
  addNew, getOneById, getOneByName, getAll, updateEntry, removeEntry, massAddNew,
};
