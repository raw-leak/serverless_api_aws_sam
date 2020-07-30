const dynamodb = require('aws-sdk/clients/dynamodb');
const User = new dynamodb.DocumentClient();

exports.createNew = ({ tableName, body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, email, password } = body;
      const params = {
        TableName: tableName,
        Item: { name, email, password },
      };

      const response = await User.put(params).promise();

      resolve(response);
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

      const { Items } = await User.scan(params).promise();

      resolve(Items);
    } catch (err) {
      reject(err);
    }
  });
