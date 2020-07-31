const User = require('/opt/nodejs/service');
const tableName = process.env.USER_TABLE;

exports.handler = async () => {
  let response;
  try {
    const allUsersBody = await User.getAll({ tableName });

    return allUsersBody;
  } catch (err) {
    response = {
      statusCode: 500,
      body: {
        message: err.message,
      },
    };
  }

  return response;
};
