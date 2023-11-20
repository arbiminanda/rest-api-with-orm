const fs = require("fs");
const { convertTimestamp } = require("../helper/convertTimestamp");

const logRequest = (req, res, next) => {
  const { method, path, query } = req;
  const clientIP =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const date = new Date();
  const timestamp = convertTimestamp(date.toISOString(), "Asia/Jakarta");
  const startTime = date;

  const onBoardPath = path === "/user/login" || path === "/user/register";
  const resetPassPath = path.includes("/user/reset-password");
  const hasJwtToken = query.jwt_token !== undefined;

  res.on("finish", () => {
    const endTime = new Date();
    let logMessage = `Timestamp: ${timestamp}; Request Method: ${method}; Request Path: ${path}; Query Parameters: ${JSON.stringify(
      hasJwtToken ? { ...query, jwt_token: "***" } : query
    )}; Response Status: ${res.statusCode}; Response Time: ${
      endTime - startTime
    }ms; IP Address: ${clientIP}`;

    logMessage += `; Request Body: ${JSON.stringify(
      onBoardPath
        ? { ...req.body, password: "***" }
        : resetPassPath
        ? { ...req.body, new_password: "***" }
        : req.body
    )}`;
    if (req.file) {
      logMessage += `; Files: ${JSON.stringify(req.file)}`;
    }

    const logFilePath = `logs-${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.csv`;
    fs.appendFileSync(logFilePath, logMessage + "\n");
  });
  next();
};

module.exports = logRequest;
