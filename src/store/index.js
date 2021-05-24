import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { poolReducer } from './reducers/poolReducer';
import { userReducer } from './reducers/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    poolReducer,
    userReducer,
});

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
