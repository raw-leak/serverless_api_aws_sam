const User = require('/opt/nodejs/service');
const tableName = process.env.USER_TABLE;

exports.handler = async (event) => {
  let response;
  const body = JSON.parse(event.body);

  try {
    const createdUserBody = await User.createNew({ tableName, body });

    response = {
      statusCode: 201,
      body: JSON.stringify(createdUserBody),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  return response;
};
