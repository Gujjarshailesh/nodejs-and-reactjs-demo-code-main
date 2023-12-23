const express = require('express');
const { validate } = require('express-validation');
const jwt = require('../../middleware/jwt.helper');

const router = express.Router();
const userController = require('../../controllers/backend/user/admin.user.controller');
const userValidator = require('../../controllers/backend/user/admin.user.validation');

router.get('/get-profile', jwt.verifyAccessToken, userController.getUserProfle);
router.post(
  '/edit-profile',
  jwt.verifyAccessToken,
  validate(userValidator.editProfileValidation(), {}, {}),
  userController.editProfile
);

router.put(
  '/add-new-email',
  jwt.verifyAccessToken,
  validate(userValidator.editEmailValidation(), {}, {}),
  userController.addnewEmail
);

router.put(
  '/verify-new-email',
  jwt.verifyAccessToken,
  validate(userValidator.verifyNewEmailValidation(), {}, {}),
  userController.verifyNewEmail
);
router.put(
  '/verify-resend-email',
  jwt.verifyAccessToken,
  validate(userValidator.resendEmailValidation(), {}, {}),
  userController.resendOTP
);
router.post(
  '/upload-image',
  jwt.verifyAccessToken,
  userController.userImageUpload
);

router.put(
  '/change-password',
  jwt.verifyAccessToken,
  validate(userValidator.changePasswordValidation(), {}, {}),
  userController.changePassword
);

module.exports = router;
