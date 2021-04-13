const {
  ERROR_CODE_NOT_FOUND_404,
  ERROR_CODE_CAST_ERROR_400,
  ERROR_CODE_INTERNAL_SERVER_500,
} = require('../utils/constants');

class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static castError(msg) {
    return new ApiError(ERROR_CODE_CAST_ERROR_400, msg);
  }

  static notFound(msg) {
    return new ApiError(ERROR_CODE_NOT_FOUND_404, msg);
  }

  static internalServerError(msg) {
    return new ApiError(ERROR_CODE_INTERNAL_SERVER_500, msg);
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
  res.status(500).json({ message: 'Internal server error' });
  next();
}

module.exports = apiErrorHandler;
