import { userService } from '../../services/user.service';

export function signUp(imgUrl, username, password, fullname) {
    return async (dispatch) => {
        const user = {
            imgUrl,
            username,
            password,
            fullname,
        };
        console.log('user in store', user);
        await userService.signup(user);
        const action = {
            type: 'SET_USER',
            user,
        };
        console.log('action:', action);
        dispatch(action);
    };
}
export function login(user) {
    return async (dispatch) => {
        const loggedUser = {
            username: user.username,
            password: user.password,
        };
        console.log('loggedUser:', loggedUser);
        await userService.login(loggedUser);
        const action = {
            type: 'GET_USER',
            loggedUser,
        };
        dispatch(action);
    };
}
export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout();
            const action = {
                type: 'SET_USER',
                user: null,
            };
            dispatch(action);
        } catch (error) {
            console.log('error:', error);
        }
    };
}
export function loadUser() {
    return (dispatch) => {
        const user = userService.getLoggedUser();
        const action = {
            type: 'SET_USER',
            user,
        };

        dispatch(action);
    };
}
