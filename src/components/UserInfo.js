class UserInfo {
    constructor({profileNameSelector, profileAboutSelector, profilePictureSelector}) {
      this._profileName = document.querySelector(profileNameSelector);
      this._profileAbout = document.querySelector(profileAboutSelector);
      this._profileAvatar = document.querySelector(profilePictureSelector);
      this.getUserInfo = this.getUserInfo.bind(this);
    }
  
    getUserInfo() {
      this._editChange = {};
      this._editChange.nameInput = this._profileName.textContent;
      this._editChange.statusInput = this._profileAbout.textContent;
      this._editChange.avatarInput = this._profileAvatar.src;
  
      return this._editChange;
    }
    
    setUserInfo(data) {
      this._profileName.textContent = data.name;
      this._profileAbout.textContent = data.about;
      this._profileAvatar.src = data.avatar;
    }
  }
  
  export {UserInfo}