export class API {
    constructor(token) {
        this._token = token;
    }

    ///Информация о пользователе должна подгружаться с сервера. 
    //Чтобы осуществить это, сделайте GET-запрос на URL (cohortId замените на идентификатор вашей группы)
    getUserProfile() {
        return fetch(`${this._token.generalURL}/users/me`, {
            method: "GET",
            headers: this._token.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            });
    }
    //Отредактированные данные профиля должны сохраняться на сервере. Для этого отправьте запрос методом PATCH:
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
    //Чтобы сменить аватар, отправьте такой PATCH-запрос:
    setUserAvatar(avatar) {
        return fetch(`${this._token.generalURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._token.headers,
            body: JSON.stringify({
                avatar: avatar.link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    //Загружаем данные с сервера
    loadCards() {
        return fetch(`${this._token.generalURL}/cards`, {
            method: 'GET',
            headers: this._token.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    //Ставим лайк на сервер
    cardPutLike(ID) {
        return fetch(`${this._token.generalURL}/cards/likes/${ID}`, {
            method: 'PUT',
            headers: this._token.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    //Убираем лайк на сервер
    cardDeleteLike(ID) {
        return fetch(`${this._token.generalURL}/cards/likes/${ID}`, {
            method: 'DELETE',
            headers: this._token.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    //Добавляем карточку 
    setCard(name, link) {
        console.log(this)
        console.log(name)
        console.log(link)
        return fetch(`${this._token.generalURL}/cards`, {
            method: 'POST',
            headers: this._token.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    //Удаляем карточку
    cardDelete(ID) {
        return fetch(`${this._token.generalURL}/cards/${ID}`, {
            method: 'DELETE',
            headers: this._token.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}