import {API} from '../../backend';

//category API calls projbackend->routes->category

//category create
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//get all categories
export const getAllCategory = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    }) 
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//product API calls projbackend->routes->product

//product create in backend
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: ` Bearer ${token}`
        },
        body: product  
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//get all products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    }) 
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//delete product
export const removeProduct = (userId, token, productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
//get a product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    }) 
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//update product
export const updateProduct = (userId, token, productId, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: ` Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
