// responseHelper.js
module.exports = {
  wrongUserCreds: (res, msg, errCode) => {
    return res.status(403).json({
      msg: msg,
      status: "failed",
      errorCode: errCode,
    });
  },
  serverError: (res, error) => {
    return res.status(500).json({
      msg: "Server error",
      serverMessage: error,
    });
  },
};
