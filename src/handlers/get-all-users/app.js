const User = require('/opt/nodejs/service');
const tableName = process.env.USER_TABLE;

exports.handler = async (event) => {
  let response;

  try {
    const allUsersBody = await User.getAll({ tableName });

    response = {
      statusCode: 200,
      body: JSON.stringify(allUsersBody),
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
