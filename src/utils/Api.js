import { apiConfig } from "./utils.js";

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrlAdress;
    this._autorisationToken = config.autorisationToken;
    this._profileUrl = `${this._baseUrl}users/me`;
    this._profileAvatarUrl = `${this._profileUrl}/avatar`;
    this._cardsUrl = `${this._baseUrl}cards`;
  }

  _fetchGetRequest(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        authorization: this._autorisationToken,
      },
    });
  }

  _fetchPostRequest(url, method, bodyData) {
    return fetch(url, {
      method: method,
      headers: {
        authorization: this._autorisationToken,
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
  }

  _fetchDeleteRequest(url, id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._autorisationToken,
      },
    });
  }

  _fetchChangeLikesState(url, id, method) {
    return fetch(`${url}/${id}/likes`, {
      method: method,
      headers: {
        authorization: this._autorisationToken,
      },
    });
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

  postNewCard(requestObj) {
    const bodyData = this._transformDataToJSON(requestObj);
    return this._fetchPostRequest(this._cardsUrl, "POST", bodyData);
  }

  postProfileData(inputValues) {
    const bodyData = this._transformDataToJSON(inputValues);
    return this._fetchPostRequest(this._profileUrl, "PATCH", bodyData);
  }

  setUserInfo(requestObj) {
    const bodyData = this._transformDataToJSON(requestObj);
    return this._fetchPostRequest(this._profileUrl, "PATCH", bodyData);
  }

  postAvatar(requestObj) {
    const bodyData = this._transformDataToJSON(requestObj);
    return this._fetchPostRequest(this._profileAvatarUrl, "PATCH", bodyData);
  }

  toggleLikeStatus(cardId, isLiked) {
    if (!isLiked) {
      return this._fetchChangeLikesState(this._cardsUrl, cardId, "PUT");
    } else {
      return this._fetchChangeLikesState(this._cardsUrl, cardId, "DELETE");
    }
  }

  deleteCard(cardId) {
    return this._fetchDeleteRequest(this._cardsUrl, cardId);
  }
}

const api = new Api(apiConfig);

export default api;
