const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test', 'qa').required(),
  PORT: Joi.number().default(3000),
  
  JWT_SECRET: Joi.string().required().description('JWT secret key'),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which reset password token expires'),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which verify email token expires'),
  SMTP_HOST: Joi.string().description('server that will send the emails'),
  SMTP_PORT: Joi.number().description('port to connect to the email server'),
  SMTP_USERNAME: Joi.string().description('username for email server'),
  SMTP_PASSWORD: Joi.string().description('password for email server'),
  EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  CF_PRIVATE_KEY: Joi.string(), // You might want to validate this more specifically
  ADMIN_HOST: Joi.string(),
  CUSTOMER_HOST: Joi.string(),
  DB_USER: Joi.string(),
  DB_PASS: Joi.string(),
  DB_NAME: Joi.string(),
  DB_HOST: Joi.string(),
  DB_DIALECT: Joi.string(),
  SR_USER: Joi.string(),
  SR_PASS: Joi.string(),
  RAZORPAY_API_KEY: Joi.string(),
  RAZORPAY_API_SECRET: Joi.string(),
})
  .unknown()
  .required();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
    ADMIN_HOST: envVars.ADMIN_HOST,
    CUSTOMER_HOST: envVars.CUSTOMER_HOST,
  },
  development: {
    username: envVars.DB_USER,
    password: envVars.DB_PASS,
    database: envVars.DB_NAME,
    host: envVars.DB_HOST,
    dialect: envVars.DB_DIALECT,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: envVars.DB_USER,
    password: envVars.DB_PASS,
    database: envVars.DB_NAME,
    host: envVars.DB_HOST,
    dialect: envVars.DB_DIALECT,
  },
  qa: {
    username: envVars.DB_USER,
    password: envVars.DB_PASS,
    database: envVars.DB_NAME,
    host: envVars.DB_HOST,
    dialect: envVars.DB_DIALECT,
  },
  shipRocket: {
    username: envVars.SR_USER,
    password: envVars.SR_PASS,
  },
  razorPay: {
    keyId: envVars.RAZORPAY_API_KEY,
    keySecret: envVars.RAZORPAY_API_SECRET,
  },
  // Add other configurations as needed
};
