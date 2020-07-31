const User = require('/opt/nodejs/service');
const tableName = process.env.USER_TABLE;

exports.handler = async (event) => {
  let response;
  const body = JSON.parse(event.body);
  const id = event.pathParameters.id;

  try {
    const updatedUser = await User.updateOneExistingItemById({
      tableName,
      id,
      body,
    });

    response = {
      statusCode: 200,
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message,
        error: err,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  return response;
};
