import React, { Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {  FormGroup, FormControl, Form, Col, Button, ControlLabel } from 'react-bootstrap';
import {loginUser} from '../actions/login';
import { connect } from 'react-redux';

class Login extends Component {
	handleClick(event)    {
		event.preventDefault();
		const { dispatch } = this.props;
		const username = ReactDOM.findDOMNode(this.refs.email).value;
		const password = ReactDOM.findDOMNode(this.refs.password).value;
		dispatch(loginUser(username, password));
	}

	render() {
		return (
			<div className="login-form">
				<h2>Авторизация</h2>
				<Form horizontal>
					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl type="email" ref="email" placeholder="Email" />
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={2}>
							Пароль
						</Col>
						<Col sm={10}>
							<FormControl type="password" ref="password" placeholder="Пароль" />
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type="submit" onClick={(event) => this.handleClick(event) }>
								Войти
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</div>
		);
	}


}

Login.propTypes = {
	dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		filter: state.token
	};
}

export default connect(mapStateToProps)(Login);
