const {
  createNew,
} = require('../../../BusinessLogicLayer/UserBusinessLogic/nodejs/service');
const assert = require('chai').assert;
const faker = require('faker');
const testUserTableName = 'user-simple-table-dev';
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const UserTable = new AWS.DynamoDB();

describe('createNew ->', () => {
  let testBody;

  beforeEach(async () => {
    testBody = {
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });

  describe('', async () => {
    it('should return -1 unless present', async () => {
      //Arrange
      const body = testBody;
      const tableName = testUserTableName;

      try {
        //Act
        const response = await createNew({ tableName, body });

        //Assert
        assert.exists(response);
        assert.equal(response.message, 'OK');

        const respDB = await UserTable.scan({
          TableName: tableName,
          FilterExpression: 'email = :emailToFind',
          ExpressionAttributeValues: {
            ":emailToFind": { S: body.email }  
          }
        }).promise();
        // todo
        assert.exists(respDB.Items)
        assert.lengthOf(respDB.Items,1)
        // assert.equal(respDB.Items[0].email,body.email)
        // assert.equal(respDB.Items[0].id,body.id)
        // assert.equal(respDB.Items[0].firstName,body.firstName)
        // assert.equal(respDB.Items[0].password,body.password)
      } catch (err) {
        console.log(err);
        assert.notExists(err);
      }
    });
  });
});
