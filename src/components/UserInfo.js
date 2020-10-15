export class UserInfo {
  constructor({
    profileNameSelector,
    profileAboutSelector,
    profilePictureSelector,
  }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profilePictureSelector);
    this.getUserInfo = this.getUserInfo.bind(this);
  }
  // Публичный метод получения информации о пользователе
  getUserInfo() {
    this._userInfo = {};
    this._userInfo.nameInput = this._profileName.textContent;
    this._userInfo.statusInput = this._profileAbout.textContent;
    this._userInfo.avatarInput = this._profileAvatar.src;

    return this._userInfo;
  }
  // Публичный метод установки новых данных о пользователе
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }
}
