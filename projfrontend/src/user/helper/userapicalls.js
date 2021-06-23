import {API} from '../../backend';

//get a user
export const getUserById = (userId) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET'
    }) 
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//update user
export const updateUser = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: user,
        })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

//get all purchases
export const userPurchaseList = (userId) => {
    return fetch(`${API}/orders/user/${userId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };