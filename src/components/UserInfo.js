class UserInfo {
    constructor({profileName, profileStatus, profileAvatar}) {
      this._profileName = document.querySelector(profileName);
      this._profileStatus = document.querySelector(profileStatus);
      this._profileAvatar = document.querySelector(profileAvatar);
      this.getUserInfo = this.getUserInfo.bind(this);
    }
  
    getUserInfo() {
      this._editChange = {};
      this._editChange.nameInput = this._profileName.textContent;
      this._editChange.statusInput = this._profileStatus.textContent;
      this._editChange.avatarInput = this._profileAvatar.src;
  
      return this._editChange;
    }
    
    setUserInfo(data) {
      this._profileName.textContent = data.name;
      this._profileStatus.textContent = data.about;
      this._profileAvatar.src = data.avatar;
    }
  }
  
  export {UserInfo}