import {apiConfig} from "./utils.js";

class Api {
    constructor(config) {
        this._baseUrl = config.baseUrlAdress;
        this._autorisationToken = config.autorisationToken;
        this._profileUrl = `${this._baseUrl}users/me`;
        this._profileAvatarUrl = `${this._profileUrl}/avatar`;
        this._cardsUrl = `${this._baseUrl}cards`;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    _fetchGetRequest(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                authorization: this._autorisationToken,
            }
        })
        .then(response => this._checkResponse(response));
    }

    _fetchPostRequest(url, method, bodyData) {
        return fetch(url, {
            method: method,
            headers: {
                authorization: this._autorisationToken,
                'Content-Type': 'application/json'
            },
            body: bodyData
        })
        .then(response => this._checkResponse(response));
    }

    _fetchDeleteRequest(url, id) {
        return fetch(`${url}/${id}`,  {
            method: 'DELETE',
            headers: {
                authorization: this._autorisationToken,
            }
        })
        .then(response => this._checkResponse(response));
    }

    _fetchChangeLikesState(url, id, method) {
        return fetch(`${url}/${id}/likes`, {
            method: method,
            headers: {
                authorization: this._autorisationToken
            }
        })
        .then(response => this._checkResponse(response));
    }

    _transformDataToJSON(inputValues) {
        return JSON.stringify(inputValues);
    }
    
    getProfileData() {
        return this._fetchGetRequest(this._profileUrl);
    }

    getCards() {
        return this._fetchGetRequest(this._cardsUrl);
    }

    postNewCard(inputValues) {
        const bodyData = this._transformDataToJSON(inputValues);
        return this._fetchPostRequest(this._cardsUrl, 'POST', bodyData);
    }

    postProfileData(inputValues) {
        const bodyData = this._transformDataToJSON(inputValues);
        return this._fetchPostRequest(this._profileUrl, 'PATCH', bodyData);
    }

    postAvatar(inputValues) {
        const bodyData = this._transformDataToJSON(inputValues);
        return this._fetchPostRequest(this._profileAvatarUrl, 'PATCH', bodyData);
    }

    postLike(cardId) {
        return this._fetchChangeLikesState(this._cardsUrl, cardId, 'PUT');
    }

    deleteLike(cardId) {
        return this._fetchChangeLikesState(this._cardsUrl, cardId, 'DELETE');
    }

    deleteCard(cardId) {
        return this._fetchDeleteRequest(this._cardsUrl, cardId);
    }
}

const api = new Api(apiConfig);

export default api;