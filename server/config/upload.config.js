class FolderPath {
  getUserImagePath() {
    return 'user/profile_image/{user_id}/';
  }

  getFolderConfig() {
    return {
      profile_image: {
        file_path: 'user/profile_image/{user_id}/',
        replace: '{user_id}',
        type: 'user',
      },
    };
  }
}
module.exports = new FolderPath();
