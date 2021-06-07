import { httpService } from './http.service';

const USER_URL = 'user/';
const AUTH_URL = 'auth/';

export const userService = {
    getLoggedUser,
    signup,
    login,
    logout,
    getById,
};

function getById(id) {
    return httpService.get(USER_URL + id);
}

function getLoggedUser() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    // console.log('loggedInUser:', loggedInUser);
    if (loggedInUser) return JSON.parse(loggedInUser);
    return null;
    // const user = JSON.parse(sessionStorage.getItem('login'));
    // return user;
}

async function signup(user) {
    console.log('user:', user)
    try {
        user.createdAt = Date.now();
        const updatedUser = await httpService.post(AUTH_URL + 'signup', user);
        console.log('updatedUser:', updatedUser)
        sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        return updatedUser;
    } catch (err) {
        console.log(err);
    }
}

async function login(user) {
    console.log('user:', user);
    const userFromBack = await httpService.post(AUTH_URL + 'login', user);
    console.log('userFromBack:', userFromBack);
    sessionStorage.setItem('login', JSON.stringify(userFromBack));
    return userFromBack;
}
function logout() {
    sessionStorage.clear();
    return httpService.post(AUTH_URL + 'logout');
}
