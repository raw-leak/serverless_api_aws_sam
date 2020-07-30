const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

  const body = JSON.stringify({
    token,
  });

  response = {
    statusCode: 200,
    body,
  };

  return response;
};
