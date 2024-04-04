require('dotenv').config();
const Common = require('../utils/common');
const checkApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === Common.base64DecodeString(process.env.API_KEY)) {
    //req.auth_data = data;
    return next();
  } else {
    res.status(401).json({
      ack: 0,
      msg: 'authentication faild'
    });
  }
};


module.exports = { checkApiKey };
