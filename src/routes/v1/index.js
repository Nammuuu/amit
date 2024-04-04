const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const firebase = require('./firebase.route')
const adminRoute = require('./admin.route');
const ownerRoute = require('./owner.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },

  {
    path: '/user',
    route: userRoute
  },
  {
    path: '/admin',
    route: adminRoute
  },
  {
    path: '/owner',
    route: ownerRoute
  },
  {
    path: '/firebase',
    route: firebase
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
