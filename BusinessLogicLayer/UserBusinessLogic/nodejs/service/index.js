const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
debugger;
const UserTable = new AWS.DynamoDB();

exports.createNew = ({ tableName, body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { firstName, email, password, id } = body;
      const params = {
        TableName: tableName,
        Item: {
          firstName: {
            S: firstName,
          },
          email: {
            S: email,
          },
          password: {
            S: password,
          },
          id: {
            S: id,
          },
        },
        ReturnValues: 'ALL_OLD',
      };

      const done = await UserTable.putItem(params).promise();
      if (!done) reject(Error('Item creation error'));
      resolve({ message: 'OK' });
    } catch (err) {
      reject(err);
    }
  });

exports.getAll = ({ tableName }) =>
  new Promise(async (resolve, reject) => {
    try {
      const params = {
        TableName: tableName,
      };

      const { Items } = await UserTable.scan(params).promise();

      resolve(Items);
    } catch (err) {
      reject(err);
    }
  });

exports.getById = ({ tableName, id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const params = {
        TableName: tableName,
        Key: { id: id },
      };

      const { Item } = await UserTable.get(params).promise();

      resolve(Item);
    } catch (err) {
      reject(err);
    }
  });

exports.updateOneExistingItemById = ({ tableName, id, body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { firstName, email } = body;
      const params = {
        TableName: tableName,
        Key: {
          id: id,
        },
        UpdateExpression: 'set firstName = :newFirstName, email = :newEmail',
        ExpressionAttributeValues: {
          ':newFirstName': firstName,
          ':newEmail': email,
        },
        ReturnValues: 'UPDATED_NEW',
      };

      const { Attributes } = await UserTable.update(params).promise();

      resolve(Attributes);
    } catch (err) {
      reject(err);
    }
  });
