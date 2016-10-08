import React from 'react';
import assert from 'assert';
import Login from '../../app/containers/Login';
import TestUtils from 'react-addons-test-utils';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../app/reducers';


describe('Login component', function(){
	before('render and locate element', function() {
		const store = createStore(rootReducer);
		var renderedComponent = TestUtils.renderIntoDocument(<Provider store={store}>
			<Login/>
		</Provider>);

		var inputComponents = TestUtils.scryRenderedDOMComponentsWithTag(
			renderedComponent,
			'input'
		);
		var buttonComponent = TestUtils.scryRenderedDOMComponentsWithTag(
			renderedComponent,
			'button'
		);

		this.emailElement = inputComponents[0];
		this.passElement = inputComponents[1];
		this.buttonElement = buttonComponent[0];
	});

	it('email <input> should be of type "email"', function() {
		assert(this.emailElement.getAttribute('type') === 'email');
	});
	it('password <input> should be of type "password"', function() {
		assert(this.passElement.getAttribute('type') === 'password');
	});
	it('<button> should be of type "submit"', function() {
		assert(this.buttonElement.getAttribute('type') === 'submit');
	});
});