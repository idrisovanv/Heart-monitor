import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const filter = (state = 'timeStart', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};

const token = (state = '', action) => {
    switch (action.type) {
        case types.RECIEVE_LOGIN:
            return action.token;
        case types.LOGOUT:
            return '';
        default:
            return state;
    }
};

const username = (state = '', action) => {
    switch (action.type) {
        case types.SET_LOGIN:
            return action.username;
        default:
            return state;
    }
};

const data = (state = [], action) => {
    switch (action.type) {
        case types.SET_DATA:
            return action.data;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    username,
    data,
    token,
    filter,
    routing
});

export default rootReducer;
