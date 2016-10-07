import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import FilterableTable from './containers/FilterableTable';
import Login from './containers/Login';

const requireAuth = (nextState, replace, store) => {
	const { token } = store.getState();
	if (!token) {
		replace({
			pathname: '/login'
		});
	}
};

export default (store) => {
	return (
	<Route path="/" component={App}>
		<IndexRoute component={FilterableTable} onEnter={(state, replace) => requireAuth(state, replace, store)}/>
		<Route path="/login" component={Login} />
	</Route>
	);
};
