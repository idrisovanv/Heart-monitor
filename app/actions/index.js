import * as types from './types';
import { browserHistory } from 'react-router';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function setLogin(username) {
    return{
        type: types.SET_LOGIN,
        username
    };
}

export function setData(data) {
    return{
        type: types.SET_DATA,
        data
    };
}
export function logoutUser() {
    localStorage.removeItem('token');
    browserHistory.push('/login');
    return {
        type: types.LOGOUT
    };
}

export function getUserByToken(token) {
    const config = {
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'JWT ' + token
        }),
        method: 'GET'
    };
    return dispatch => {
        return fetch(' https://stage-api.welltory.com/api2/profile/', config)
            .then(response => {
                console.log(response);
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function(data) {
                    dispatch(setLogin(data.username));
                });
            })
            .catch((err) => {
                console.log('Fetch Error :-S', err);
                dispatch(logoutUser());
            });
    };
}
export function getDataByToken(token, sort) {
    const config = {
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'JWT ' + token
        }),
        method: 'GET'
    };
    const url = new URL('https://stage-api.welltory.com/api2/data/rr/');
    const params = {sort_by: sort};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return dispatch => {
        return fetch(url, config)
            .then(response => {
                console.log(response);
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function(data) {
                    dispatch(setData(data.result));
                });
            })
            .catch((err) =>{
                console.log('Fetch Error :-S', err);
                dispatch(logoutUser());
            });
    };
}
