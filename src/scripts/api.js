const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '1e4597b1-fcad-42dc-915a-cfec5a3ba9ed',
    'Content-Type': 'application/json'
  }
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function request(endpoint, options = {}) {
  const {method = "GET", headers = config.headers, body} = options;
  const requestOptions = {
    method,
    headers,
  };
  if (body) {
    requestOptions.body = JSON.stringify(body);
  };
  return fetch(`${config.baseUrl}${endpoint}`, requestOptions)
    .then(handleResponse);
};

export function getUserProfileInfo() {
  return request('/users/me');
};

export function getInitialCards() {
  return request('/cards');
};

export function delCardFromList(cardId) {
  return request(`/cards/${cardId}`, {
    method: "DELETE"
  });
};

export function likeCard(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT"
  });
};

export function unlikeCard(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE"
  });
};

export function updateProfileInfo(name, about) {
  return request('/users/me', {
    method: "PATCH",
    body: {
      name,
      about
    }
  });
};

export function updateAvatarImage(avatar) {
  return request('/users/me/avatar', {
    method: "PATCH",
    body: {
      avatar
    }
  });
};

export function addNewCard(cardInfo) {
  return request('/cards', {
    method: "POST",
    body: {
      name: cardInfo.name,
      link: cardInfo.link
    }
  });
};