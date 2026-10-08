const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

process.env.JWT_SECRET = 'test-secret-for-devlink';
process.env.FRONTEND_URL = 'http://localhost:5173';

const { app } = require('../server');
const User = require('../models/User');
const Project = require('../models/Project');

let mongoServer;
let ownerCookie;
let otherUserCookie;
let projectId;

test.before(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

test.after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});

test.beforeEach(async () => {
  await User.deleteMany({});
  await Project.deleteMany({});
  ownerCookie = undefined;
  otherUserCookie = undefined;
  projectId = undefined;
});

const register = async (username, password = 'password123') => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({ username, password });

  assert.equal(response.status, 201);
  return response;
};

const login = async (username, password = 'password123') =>
  request(app).post('/api/auth/login').send({ username, password });

test('registers a user and creates an authenticated session', async () => {
  const response = await register('alice');

  assert.equal(response.body.username, 'alice');
  assert.match(response.headers['set-cookie'][0], /^token=/);

  const me = await request(app)
    .get('/api/auth/me')
    .set('Cookie', response.headers['set-cookie']);

  assert.equal(me.status, 200);
  assert.ok(me.body.userId);
});

test('rejects invalid credentials', async () => {
  await register('alice');

  const response = await login('alice', 'wrong-password');

  assert.equal(response.status, 401);
  assert.equal(response.body.message, 'Invalid credentials');
});

test('rejects unauthenticated project creation', async () => {
  const response = await request(app)
    .post('/api/projects')
    .send({ title: 'Private Project', description: 'Should be protected' });

  assert.equal(response.status, 401);
});

test('allows the owner to create, update, and delete a project', async () => {
  const registration = await register('alice');
  ownerCookie = registration.headers['set-cookie'];

  const created = await request(app)
    .post('/api/projects')
    .set('Cookie', ownerCookie)
    .send({
      title: 'DevLink',
      description: 'Developer portfolio platform',
      tags: ['React', 'Node.js']
    });

  assert.equal(created.status, 201);
  projectId = created.body._id;

  const updated = await request(app)
    .put('/api/projects/' + projectId)
    .set('Cookie', ownerCookie)
    .send({ title: 'DevLink Updated' });

  assert.equal(updated.status, 200);
  assert.equal(updated.body.title, 'DevLink Updated');

  const deleted = await request(app)
    .delete('/api/projects/' + projectId)
    .set('Cookie', ownerCookie);

  assert.equal(deleted.status, 200);
});

test('prevents another user from modifying or deleting a project', async () => {
  const registration = await register('alice');
  ownerCookie = registration.headers['set-cookie'];

  const created = await request(app)
    .post('/api/projects')
    .set('Cookie', ownerCookie)
    .send({
      title: 'Owner Project',
      description: 'Owned by Alice'
    });

  projectId = created.body._id;

  const other = await register('bob');
  otherUserCookie = other.headers['set-cookie'];

  const update = await request(app)
    .put('/api/projects/' + projectId)
    .set('Cookie', otherUserCookie)
    .send({ title: 'Hijacked Project' });

  assert.equal(update.status, 403);

  const deletion = await request(app)
    .delete('/api/projects/' + projectId)
    .set('Cookie', otherUserCookie);

  assert.equal(deletion.status, 403);
});

test('does not allow clients to change project ownership through updates', async () => {
  const registration = await register('alice');
  ownerCookie = registration.headers['set-cookie'];

  const created = await request(app)
    .post('/api/projects')
    .set('Cookie', ownerCookie)
    .send({
      title: 'Protected Project',
      description: 'Ownership must remain server-controlled'
    });

  projectId = created.body._id;

  const owner = await User.findOne({ username: 'alice' });

  const updated = await request(app)
    .put('/api/projects/' + projectId)
    .set('Cookie', ownerCookie)
    .send({ title: 'Updated', user: new mongoose.Types.ObjectId().toString() });

  assert.equal(updated.status, 200);
  assert.equal(updated.body.user, owner._id.toString());

  const stored = await Project.findById(projectId);
  assert.equal(stored.user.toString(), owner._id.toString());
});
