const User = require('/opt/nodejs/service');
const tableName = process.env.USER_TABLE;

exports.handler = async (event) => {
  let response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const id = event.pathParameters.id;

  try {
    const user = await User.getById({ tableName, id });

    response = {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message,
      }),
    };
  }

  return response;
};
