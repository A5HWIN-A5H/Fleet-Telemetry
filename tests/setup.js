const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

process.env.JWT_SECRET = 'test_secret_key_for_jest';

let mongoServer;

// 1. Spin up the in-memory server before all tests
beforeAll(async () => {
  process.env.NODE_ENV = 'test'; // Ensure app knows we are testing
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// 2. Wipe the database between every single test run
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

// 3. Disconnect and stop the server after all tests are done
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});