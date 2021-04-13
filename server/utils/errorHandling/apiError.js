const { ERROR_CODE_NOT_FOUND, ERROR_CODE_CAST_ERROR, ERROR_CODE_INTERNAL_SERVER } = require('../constants');

class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static castError(msg) {
    return new ApiError(ERROR_CODE_CAST_ERROR, msg);
  }

  static notFound(msg) {
    return new ApiError(ERROR_CODE_NOT_FOUND, msg);
  }

  static internalServerError(msg) {
    return new ApiError(ERROR_CODE_INTERNAL_SERVER, msg);
  }
}

module.exports = ApiError;

function apiErrorHandler(err, req, res, next) {
  /* in prod, don't user console.log or console.err because
  it is not async
  */

  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }
  res.status(500).json('something went wrong');
  next();
}

module.exports = apiErrorHandler;
