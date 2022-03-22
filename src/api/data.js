import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const endpoints = {
    allBook: '/data/books?sortBy=_createdOn%20desc',
    byId: '/data/catalog/',
    myItems: (userId) => `/data/book?where=_ownerId%3D%22${userId}%22`,
    create: '/data/catalog',
    edit: '/data/catalog/',
    delete: '/data/catalog/',

}

export async function getAllBook() {
    return api.get(endpoints.allBook);
}

export async function getMyBook(userId) {
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function createBook(book) {
    return api.post('/data/books', book);
}
export async function getById(id) {
    return api.get(`/data/books/${id}`)
}
export async function delBook(id) {
    return api.del(`/data/books/${id}`)
}
export async function editBook(id, data) {
    return api.put(`/data/books/${id}`, data)
}


export async function addLike(bookId) {
    return api.post('/data/likes', {bookId});
}

export async function getCountOfLikes(bookId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getMyLike(bookId,userId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}