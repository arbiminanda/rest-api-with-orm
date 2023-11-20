const moment = require("moment-timezone");

const convertTimestamp = (timestamp, timezone) => {
  const convertedTimestamp =
    moment(timestamp).tz(timezone).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";
  return convertedTimestamp;
};

module.exports = {
  convertTimestamp,
};
