const {
  removeNullDataInResponse,
  translationTextMessage,
} = require('./common.helper');

const successResponse = (req, res, msg, getData = {}, code = 200) => {
  const responseData = removeNullDataInResponse(getData);
  res.status(code).send({
    message: translationTextMessage(msg),
    data: responseData,
  });
};
const errorResponse = async (req, res, msg, getData = {}, code = 422) => {
  res.status(code).send({
    message: translationTextMessage(msg),
    data: getData,
  });
};
const errorHandler = (error) => {
  const { request, response } = error;
  if (response) {
    const { message } = response.data;
    const { status } = response;
    return {
      message,
      status,
    };
  }
  if (request) {
    // request sent but no response received
    return {
      message: 'server time out',
      status: 503,
    };
  }
  // Something happened in setting up the request that triggered an Error
  return { message: 'opps! something went wrong while setting up request' };
};
module.exports = {
  successResponse,
  errorResponse,
  errorHandler,
};
