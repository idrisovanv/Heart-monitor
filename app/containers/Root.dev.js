import React, { Component, PropTypes } from 'react';
import { Provider, connect} from 'react-redux';
import DevTools from './DevTools';
import { Router } from 'react-router';
import routes from '../routes';
import {receiveLogin} from '../actions/login';

class Root extends Component {
    componentWillMount() {
        this.props.getToken();
    }
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router history={history}>
                         {routes(store)}
                    </Router>
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    getToken: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        getToken: () => {
            const token = localStorage.getItem('token');
            dispatch(receiveLogin(token));
        }
    };
};

export default connect(
    ()=>{ return {};},
    mapDispatchToProps
)(Root);
