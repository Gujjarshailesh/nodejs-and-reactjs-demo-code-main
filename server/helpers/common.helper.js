const i18next = require('i18next');
const models = require('../models/index');
const jwt = require('../middleware/jwt.helper');

/**
 *
 * @param Optional
 * @returns Unique no
 * This function is used for generate unique Id
 */

const generateUniqueId = (length = 13, uniqueCharType = 'BOTH') => {
  let result = '';

  let characters = '0123456789';

  if (uniqueCharType !== 'NUMBER_ONLY') {
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  }

  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 *
 * @param data objet
 * @returns object
 * Remove Null Data From Json Obj and set ''
 */
const removeNullDataInResponse = (userData) => {
  userData = JSON.stringify(userData, (key, value) =>
    value === null ? '' : value
  );
  return JSON.parse(userData);
};
const getUserDataById = async (user_id) => {
  const getUserData = await models.Users.findOne({
    where: {
      user_id,
    },
  });
  let userData = {};
  if (getUserData) {
    userData = {
      profile_image: await getUserData.profile_image.then((dataUrl) => dataUrl),
      is_email_verified: getUserData.is_email_verified,
      admin_status: getUserData.admin_status,
      user_status: getUserData.user_status,
      profile_setup: getUserData.profile_setup,
      user_id: getUserData.user_id,
      first_name: getUserData.first_name,
      last_name: getUserData.last_name,
      email: getUserData.email,
      country_id: getUserData.country_id,
      phone: getUserData.phone,
      dob: getUserData.dob,
      organization_id: getUserData.organization_id,
      facebook_id: getUserData.facebook_id,
      gmail_id: getUserData.gmail_id,
      timezone_id: getUserData.timezone_id,
    };
  }

  return userData;
};

/**
 *
 * @param keyword: name of key which we want to get
 * @returns Translation from lang folder file message
 * This function is being used to get message from translation file
 */
const translationTextMessage = (keyword) => {
  const text = i18next.t(keyword) ? i18next.t(keyword) : keyword;
  return text;
};
// Generate access token and store in user details.
const generateAccessToken = async (user) => {
  const payload = jwt.generateUserTokenPayload(user);
  const accessToken = await jwt.accessToken(payload);
  const isSaved = true;
  return { isSaved, accessToken };
};
// Generate Refresh token and store in user details.
const generateRefreshToken = async (payload_data) => {
  const payload = {
    user: payload_data,
    created_at: new Date(),
  };
  const refreshToken = await jwt.refreshToken(payload);
  const isSaved = true;
  return { isSaved, refreshToken };
};

const checkObjectValue = async (obj) =>
  Object.keys(obj).filter((k) => {
    if (obj[k] === '' || obj[k] === undefined || obj[k] === null) {
      return k;
    }
    return '';
  });
const objectValueChange = async (obj) => {
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] === 'boolean') {
      obj[item] = obj[item] ? 1 : 0;
    }
  });
  return obj;
};
module.exports = {
  generateUniqueId,
  removeNullDataInResponse,
  getUserDataById,
  translationTextMessage,
  generateAccessToken,
  generateRefreshToken,
  checkObjectValue,
  objectValueChange,
};
