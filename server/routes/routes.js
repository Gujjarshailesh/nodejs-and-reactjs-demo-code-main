// This Route file will be use for admin login.
const adminAuthRoute = require('./backend/admin.auth.route');
const adminUserRoute = require('./backend/admin.user.route');
const adminCommonRoute = require('./backend/admin.common.route');

const { HOST_URL_PREFIX } = process.env;
module.exports = (app) => {
  /** Admin Routes */
  app.use(`${HOST_URL_PREFIX}/admin/auth`, adminAuthRoute);
  app.use(`${HOST_URL_PREFIX}/admin/user`, adminUserRoute);
  app.use(`${HOST_URL_PREFIX}/admin/common`, adminCommonRoute);
};
