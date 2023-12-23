const express = require('express');

const router = express.Router();
const commonController = require('../../controllers/backend/common/admin.common.controller');

router.get('/country-code-list', commonController.countryList);

module.exports = router;
