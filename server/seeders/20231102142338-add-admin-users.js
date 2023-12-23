const crypto = require('crypto');

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'Admin',
          last_name: 'Technource',
          email: 'admin.technource@yopmail.com',
          password: crypto
            .createHash('md5')
            .update('Admin@123' || '')
            .digest('hex'),
          account_type: 1,
          user_type: 1,
          is_email_verified: 1,
          admin_status: 1,
          user_status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users');
  },
};
