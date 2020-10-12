export class API { 
    constructor(token) {
        this._token = token;
    }

    ///Информация о пользователе должна подгружаться с сервера. 
    //Чтобы осуществить это, сделайте GET-запрос на URL (cohortId замените на идентификатор вашей группы)
    getUserProfile(){
        return fetch(`${this._token.generalURL}/users/me`,{
            method:"GET",
            headers: this._token.headers
        })
        .then((res) =>{
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    setUserProfile(name, about) {
        return fetch(`${this._token.generalURL}/users/me`, {
          method: 'PATCH',
          headers: this._token.headers,
          body: JSON.stringify({
            name: name,
            about: about
          })
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
      }
}