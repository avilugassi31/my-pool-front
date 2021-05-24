import { userService } from '../../services/user.service';
const INITIAL_STATE = {
    users: [],
    user: {
        username:null,
        password:null,
        fullname:null,
    },
    loggedUser:{
        username:null,
        password:null,
    },
    loggedInUser: userService.getLoggedUser(),
};
export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.users,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        case 'GET_USER':
            return {
                ...state,
                user: action.loggedInUser,
            };
        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.user],
            };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter((user) => user._id !== action.userId),
            };
        case 'UPDATE_USER':
            const { updatedUser } = action;
            return {
                ...state,
                users: state.users.map((user) =>
                    user._id === updatedUser._id ? updatedUser : user
                ),
            };
        default:
            return state;
    }
}
