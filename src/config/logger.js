const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const transport1 = new winston.transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  dirname: 'logs',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxFiles: '3d'
});

const transport2 = new winston.transports.DailyRotateFile({
  level: 'error',
  dirname: 'logs',
  filename: 'application-error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxFiles: '3d'
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    config.env !== 'development'
      ? (transport1, transport2)
      : new winston.transports.Console({
          stderrLevels: ['error']
        })
  ]
});

module.exports = logger;
