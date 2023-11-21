module.exports = {
  created: (res, msg) => {
    return res.status(201).json({
      status: "success",
      msg: msg,
    });
  },
  forbidden: (res, msg, errCode) => {
    return res.status(403).json({
      status: "failed",
      errorCode: errCode,
      msg: msg,
    });
  },
  serverError: (res, error) => {
    return res.status(500).json({
      status: "failed",
      msg: "Server error",
      serverMessage: error,
    });
  },
};
