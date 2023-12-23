const response = require('../../../helpers/response.helper');
const models = require('../../../models/index');

class CommonController {
  /**
   * @name countryList
   * @description For Get Country List.
   * @param req,res
   * @returns {Json} success
   */
  async countryList(req, res) {
    try {
      const countrData = await models.Countries.scope([
        'defaultScope',
        'active',
      ]).findAll();
      return response.successResponse(
        req,
        res,
        'admin.backend_login_succss',
        countrData,
        200
      );
    } catch (error) {
      return response.errorResponse(req, res, error.message, {}, 500);
    }
  }
}
module.exports = new CommonController();
