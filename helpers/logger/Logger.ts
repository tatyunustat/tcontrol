import * as winston from "winston";

const file = new winston.transports.File({
  filename: "error.log",
  level: "error",
  handleExceptions: true,
});

export default winston.createLogger({
    level: 'error',
    transports: [
      file
    ]
  });