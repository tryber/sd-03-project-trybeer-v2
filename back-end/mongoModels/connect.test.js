const MongoDb = require('mongodb');
const faker = require('faker');
const Model = require('./mongoConnection');

jest.mock('mongodb');

describe('connectTo', () => {
  test('should call collection from db', async () => {
    const coll = faker.helpers.randomize();
    const returned = faker.helpers.randomize();
    const collection = jest.fn();
    const db = jest.fn().mockResolvedValueOnce({ collection });

    collection.mockResolvedValueOnce(returned);

    MongoDb.MongoClient.connect.mockResolvedValueOnce({ db });

    const result = await Model.connectTo(coll);

    expect(MongoDb.MongoClient.connect).toHaveBeenCalledTimes(1);
    expect(db).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(coll);
    expect(result).toBe(returned);
  });
});
