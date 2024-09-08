import sinon from 'sinon';
import { redis } from '../src/utils/redis.js';
import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import Product from '../src/models/product.model.js';

describe('Product Controller', function () {
  let sandbox;

  this.beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  this.afterEach(() => {
    sandbox.restore();
  });

  describe('GET /featured', function () {
    it('Should get featured products from cache', async function () {
      sandbox.stub(redis, 'get').resolves(
        JSON.stringify([
          {
            _id: '60d5f60f2f6c4c1d3d8e4c9b',
            name: 'test',
            description: 'test description',
            price: 100,
            image: '',
            category: 'test',
            isFeatured: true,
          },
        ])
      );

      const res = await request(app).get('/api/products/featured');

      expect(res.status).to.equal(200);
      expect(res.body.result).to.be.an('array');
    });

    it('Should get featured products database and cache them', async function () {
      sandbox.stub(redis, 'get').resolves(null);

      sandbox.stub(Product, 'find').returns({
        lean: () =>
          Promise.resolve([
            {
              _id: '60d5f60f2f6c4c1d3d8e4c9b',
              name: 'test',
              description: 'test description',
              price: 100,
              image: '',
              category: 'test',
              isFeatured: true,
            },
          ]),
      });

      sandbox.stub(redis, 'set').resolves();

      const res = await request(app).get('/api/products/featured');

      expect(res.status).to.equal(200);
      expect(res.body.result).to.be.an('array');
    });
  });

  describe('GET /recommendations', function () {
    it('Should get recommended products', async function () {
      sandbox.stub(Product, 'aggregate').resolves([
        {
          _id: '60d5f60f2f6c4c1d3d8e4c9b',
          name: 'test',
          description: 'test description',
          price: 100,
          image: '',
        },
      ]);

      const res = await request(app).get('/api/products/recommendations');

      expect(res.status).to.be.equal(200);
      expect(res.body.result).to.be.an('array');
    });
  });

  describe('GET /products/category/:category', function () {
    it('Should get products by category', async function () {
      sandbox.stub(Product, 'find').resolves([
        {
          _id: '60d5f60f2f6c4c1d3d8e4c9b',
          name: 'test',
          description: 'test description',
          price: 100,
          image: '',
          category: 'test',
        },
      ]);

      const res = await request(app).get('/api/products/category/:test');

      expect(res.status).to.equal(200);
      expect(res.body.result).to.be.an('array');
    });
  });
});
