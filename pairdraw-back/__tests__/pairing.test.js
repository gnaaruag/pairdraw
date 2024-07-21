const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('../routes/pairing.route'); // Adjust the path if necessary
const Pairing = require('../models/pairing.model');

// Load environment variables from .env file
dotenv.config();

// Create a new express application instance
const app = express();

// Set up middleware
app.use(express.json());
app.use('/api', routes);

// Connect to the test database
beforeAll(async () => {
  const uri = process.env.TEST_DB_URI; // Ensure you have a TEST_DB_URI in your .env file
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up the database before each test
beforeEach(async () => {
  await Pairing.deleteMany({});
});

// Disconnect from the database after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Pairing API', () => {
  test('should create a new pair', async () => {
    const response = await request(app)
      .post('/api/new-pair')
      .send({
        pairName: 'Test Pair',
        adminUser: 'admin@test.com',
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Object Created');

    const pairings = await Pairing.find({});
    expect(pairings.length).toBe(1);
    expect(pairings[0].pairName).toBe('Test Pair');
  });

  test('should get all user pairs', async () => {
    const pair1 = new Pairing({
      id: 'pair1',
      pairName: 'Pair 1',
      adminUser: 'admin1@test.com',
    });
    const pair2 = new Pairing({
      id: 'pair2',
      pairName: 'Pair 2',
      adminUser: 'admin2@test.com',
      otherUser: 'user@test.com',
    });

    await pair1.save();
    await pair2.save();

    const response = await request(app)
      .post('/api/get-all-pairs')
      .send({
        user: 'user@test.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].pairName).toBe('Pair 2');
  });

  test('should add user to pair', async () => {
    const pair = new Pairing({
      id: 'pair1',
      pairName: 'Pair 1',
      adminUser: 'admin1@test.com',
    });
    await pair.save();

    const response = await request(app)
      .post('/api/add-to-pair')
      .send({
        pairID: 'pair1',
        user: 'user@test.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.otherUser).toBe('user@test.com');

    const updatedPair = await Pairing.findOne({ id: 'pair1' });
    expect(updatedPair.otherUser).toBe('user@test.com');
  });

  test('should upload an image', async () => {
    const pair = new Pairing({
      id: 'pair1',
      pairName: 'Pair 1',
      adminUser: 'admin1@test.com',
    });
    await pair.save();

    const response = await request(app)
      .post('/api/upload-image')
      .send({
        pairID: 'pair1',
        user: 'admin1@test.com',
        image: 'base64imagestring',
      });

    expect(response.status).toBe(200);
    expect(response.body.imageA).toBe('base64imagestring');

    const updatedPair = await Pairing.findOne({ id: 'pair1' });
    expect(updatedPair.imageA).toBe('base64imagestring');
  });

  test('should send image', async () => {
    const pair = new Pairing({
      id: 'pair1',
      pairName: 'Pair 1',
      adminUser: 'admin1@test.com',
      imageA: 'base64imagestringA',
      imageB: 'base64imagestringB',
    });
    await pair.save();

    const response = await request(app)
      .post('/api/get-image')
      .send({
        pairID: 'pair1',
        user: 'admin1@test.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toBe('base64imagestringB');
  });
});
