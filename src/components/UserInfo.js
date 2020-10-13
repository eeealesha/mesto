
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__subtitle");
const profilePic = profile.querySelector(".profile__picture")
//Создайте класс UserInfo
//Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
export class UserInfo {
    //Принимает в конструктор объект с селекторами двух элементов: 
    //элемента имени пользователя и элемента информации о себе.
    constructor({ name, info }) {
        
        this._name = name;
        this._info = info;
        console.log(this._name)
    }
    //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
        return {   
            name: this._name.textContent,
            info: this._info.textContent
        }
    }
    //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo(newName, newInfo) {
        profileName.textContent = newName;
        profileJob.textContent = newInfo;
    }

    setUserImg(newImg) {
        profilePic.src = newImg;
    }
}