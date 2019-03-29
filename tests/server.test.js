const request = require('supertest');
const app = require('../server/app.js');

const product = {
  name: 'Sun Screen',
  price: '5.99',
  bulletOne: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
  bulletTwo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesen.',
  bulletThree: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  sellerName: "I'm Out of Company Names",
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusc.',
  productID: '1001',
};

const updatedProduct = {
  name: 'Sun Block',
  price: '9.99',
  bulletOne: 'The best in the buisness',
  bulletTwo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesen.',
  bulletThree: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  sellerName: "I'm Out of Company Names",
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusc.',
  productID: '1001',
};

describe('Test all server routes', () => {
  // beforeEach(() => {
  //   moxios.install();
  // });

  // afterEach(() => {
  //   moxios.uninstall();
  // });

  it('Root should respond with status of 200', (res) => {
    request(app).get('/')
      .expect(200, res);
  });

  it('GET api/products should respond with a status of 200', (response) => {
    request(app).get('/api/products')
      .expect(200, response);
  });

  it('GET api/products/id should respond with a status of 200', (response) => {
    request(app).get('/api/products/id?id=1')
      .expect(200, response);
  });

  it('GET api/products/name should respond with a status of 200', (response) => {
    request(app).get('/api/products/name?name=Maple+Syrup')
      .expect(200, response);
  });

  it('POST api/products should respond with a status of 201', (response) => {
    request(app).post('/api/products')
      .send(product)
      .expect(201, response);
  });

  it('PATCH api/products', (response) => {
    request(app).patch('/api/products')
      .send(updatedProduct)
      .expect(204, response);
  });

  it('DELETE api/products/id?id=1001', (response) => {
    request(app).delete('api/products/id?id=1001')
      .expect(204, response);
  });
});
