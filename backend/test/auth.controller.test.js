import sinon from 'sinon';
import { expect } from 'chai';
import User from '../src/models/user.model.js';
import jwt from 'jsonwebtoken';
import { redis } from '../src/utils/redis.js';
import request from 'supertest';
import app from '../src/app.js';

describe('Auth Controller', function () {
  let sandbox;

  this.beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  this.afterEach(() => {
    sandbox.restore();
  });

  describe('POST /signup', function () {
    it('Should create a new user and set tokens in cookies', async function () {
      const createdUser = {
        _id: '111',
        name: 'test',
        email: 'test@email.com',
        password: 'test1234',
        role: 'customer',
        cartItems: [],
      };

      sandbox.stub(User, 'findOne').resolves(null);

      sandbox.stub(User, 'create').resolves(createdUser);

      sandbox.stub(jwt, 'sign').callsFake((payload, secret) => {
        if (secret === process.env.ACCESS_TOKEN_SECRET)
          return 'testAccessToken';
        else if (secret === process.env.REFRESH_TOKEN_SECRET)
          return 'testRefreshToken';
      });
      const redisSetStub = sandbox.stub(redis, 'set').resolves();

      const res = await request(app).post('/api/auth/signup').send({
        name: 'test',
        email: 'test@email.com',
        password: 'test1234',
        passwordConfirm: 'test1234',
      });

      expect(res.status).to.equal(201);
      expect(res.body.result.user.email).to.equal('test@email.com');
      expect(res.headers['set-cookie']).to.exist;
      expect(redisSetStub.calledOnce).to.be.true;
    });

    it('Should throw error if user already exists', async function () {
      const existingUser = {
        _id: '111',
        name: 'test',
        email: 'test@email.com',
        password: 'test1234',
        role: 'customer',
        cartItems: [],
      };

      sandbox.stub(User, 'findOne').resolves(existingUser);

      const res = await request(app).post('/api/auth/signup').send({
        name: 'test',
        email: 'test@email.com',
        password: 'test1234',
        passwordConfirm: 'test1234',
      });

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('User already exists');
    });

    it('Should throw a validation error when password is not provided', async function () {
      sandbox.stub(User, 'findOne').resolves(null);

      sandbox.stub(User, 'create').throws({
        name: 'ValidationError',
        message: 'Password is required',
      });

      const res = await request(app).post('/api/auth/signup').send({
        name: 'test',
        email: 'test@email.com',
        passwordConfirm: 'test1234',
      });

      expect(res.status).to.equal(500); // TODO: UPDATE STATUS CODE
      expect(res.body.message).to.include('Password is required');
    });
  });

  describe('POST /login', function () {
    it('Should login an existing user and set tokens in cookies', async function () {
      const existingUser = {
        _id: 111,
        name: 'test',
        email: 'test@gmail.com',
        password: 'test1234',
        role: 'customer',
        cartItems: [],
        checkPassword: sandbox.stub().resolves(true),
      };

      sandbox.stub(User, 'findOne').resolves(existingUser);

      sandbox.stub(jwt, 'sign').callsFake((payload, secret) => {
        if (secret === process.env.ACCESS_TOKEN_SECRET)
          return 'testAccessToken';
        else if (secret === process.env.REFRESH_TOKEN_SECRET)
          return 'testRefreshToken';
      });

      const redisSetStub = sandbox.stub(redis, 'set').resolves();

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@gmail.com', password: 'test1234' });

      expect(res.status).to.equal(200);
      expect(res.body.result.user.email).to.equal('test@gmail.com');
      expect(redisSetStub.calledOnce).to.be.true;
      expect(res.headers['set-cookie']).to.exist;
    });

    it('Should return 401 for invalid credentials', async function () {
      sandbox.stub(User, 'findOne').resolves(null);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@gmail.com', password: 'test1234' });

      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('Invalid email or password');
    });
  });
});
