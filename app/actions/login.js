import * as types from './types';
// Somewhere like a Redux middleware or Flux action:
import { browserHistory } from 'react-router';

export function receiveLogin( token) {
	return {
		type: types.RECIEVE_LOGIN,
		token
	};
}


export function loginUser(email, password) {
	const body = 'email=' + encodeURIComponent(email) +
		'&password=' + encodeURIComponent(password);
	const config = {
		 headers: new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		}),
		method: 'POST',
		body: body
	};
	return dispatch => {
		return fetch(' https://stage-api.welltory.com/api2/api-token-auth/', config)
			.then(response => {
				console.log(response);
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' +
					response.status);
					return;
				}

				// Examine the text in the response
				response.json().then(function(data) {
					localStorage.setItem('token', data.token);
					dispatch(receiveLogin(data.token));
					browserHistory.push('/');
				});
			});
	};
}
