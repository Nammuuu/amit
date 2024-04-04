const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
//
var fs = require('fs');
var https = require('https');

if (config.env == 'qa') {
  var certificate = fs.readFileSync('/root/deployment/ssl/6_39_C1.cer', 'utf8');
  var ca = fs.readFileSync('/root/deployment/ssl/00_00_00_02.cer', 'utf8');
  var privateKey = fs.readFileSync('/root/deployment/ssl/new-2023.key', 'utf8');
}
if (config.env == 'production') {
  var certificate = fs.readFileSync('/root/deployment/ssl/E_3E.cer', 'utf8');
  var ca = fs.readFileSync('/root/deployment/ssl/_02.cer', 'utf8');
  var privateKey = fs.readFileSync('/root/deployment/ssl/prod023.key', 'utf8');
}
if (config.env == 'production' || config.env == 'qa') {
  var credentials = { key: privateKey, cert: certificate, ca: ca };

  // your express configuration here

  var server = https.createServer(credentials, app).listen(443);
} else {
  var server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
