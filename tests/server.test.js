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

describe('Server routes should send a response', () => {
  it('Should Root should respond with status of 200', (done) => {
    request(app).get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Should GET api/products should respond with a status of 200', (done) => {
    request(app).get('/api/products')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Should GET api/products/id should respond with a status of 200', (done) => {
    request(app).get('/api/products/id?id=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Should GET api/products/name should respond with a status of 200', (done) => {
    request(app).get('/api/products/name?name=Maple+Syrup')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Should POST api/products should respond with a status of 201', (done) => {
    request(app).post('/api/products')
      .send(product)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  it('Should PATCH api/products should respond with a status of 204', (done) => {
    request(app).patch('/api/products')
      .send(updatedProduct)
      .then((response) => {
        expect(response.statusCode).toBe(204);
        done();
      });
  });

  it('Should DELETE api/products/id should respond with a status of 204', (done) => {
    request(app).delete('/api/products/id?id=1001')
      .then((response) => {
        expect(response.statusCode).toBe(204);
        done();
      });
  });
});


describe('Get requests should respond with requested data', () => {
  it('Should return an object with the correct shape', (done) => {
    request(app).get('/api/products/id?id=9999')
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.name).toBeDefined();
        expect(response.body.price).toBeDefined();
        expect(response.body.bulletOne).toBeDefined();
        expect(response.body.bulletTwo).toBeDefined();
        expect(response.body.bulletThree).toBeDefined();
        expect(response.body.sellerName).toBeDefined();
        expect(response.body.description).toBeDefined();
        expect(response.body.productID).toBeDefined();
        done();
      });
  });

  it('Should return an object with the correct shape', (done) => {
    request(app).get('/api/products/name?name=Sun+Screen')
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.name).toBeDefined();
        expect(response.body.price).toBeDefined();
        expect(response.body.bulletOne).toBeDefined();
        expect(response.body.bulletTwo).toBeDefined();
        expect(response.body.bulletThree).toBeDefined();
        expect(response.body.sellerName).toBeDefined();
        expect(response.body.description).toBeDefined();
        expect(response.body.productID).toBeDefined();
        done();
      });
  });

  it('Should return an object with the correct values', (done) => {
    request(app).get('/api/products/id?id=100')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Sun Screen');
        expect(response.body.price).toBe(5.99);
        expect(response.body.bulletOne).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.');
        expect(response.body.bulletTwo).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesen.');
        expect(response.body.bulletThree).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        expect(response.body.sellerName).toBe("I'm Out of Company Names");
        expect(response.body.description).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusc.');
        expect(response.body.productID).toBe(100);
        done();
      });
  });

  it('Should return an object with the correct values', (done) => {
    request(app).get('/api/products/name?name=Sun+Screen')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Sun Screen');
        expect(response.body.price).toBe(5.99);
        expect(response.body.bulletOne).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.');
        expect(response.body.bulletTwo).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesen.');
        expect(response.body.bulletThree).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        expect(response.body.sellerName).toBe("I'm Out of Company Names");
        expect(response.body.description).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusc.');
        expect(response.body.productID).toBe(100);
        done();
      });
  });
});
