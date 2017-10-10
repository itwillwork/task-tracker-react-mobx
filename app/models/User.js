import { observable, action, computed } from 'mobx';
import loader from '../utility/loader';
import { makeRequest, TYPES as RQ_TYPES } from '../utility/requestMaker';

import Cookie from 'js-cookie';
import { AUTH_TOKEN_KEY } from '../constants';

const SIGNIN_URL = '/api/token-auth/';
const SIGNUP_URL = '/api/users/';
const LOGIN_URL = '/api/users/current/';
const LOGOUT_URL = '/api/auth/logout/';

const signupParamsAdapter = (params) => ({
	username: params.username,
	email: params.email,
	first_name: params.firstName,
	last_name: params.lastName,
	avatar: null,
	password: params.password,
});

const signinParamsAdapter = (params) => ({
	username: params.username,
	password: params.password,
});

const User = class User {
	@observable _signin = loader.initial();
	@observable _signup = loader.initial();
	@observable _allUsers = loader.initial();
	@observable _login = loader.initial();
	@observable _logout = loader.initial();

	@computed
	get signinInfo() {
		return this._signin;
	}

	@action.bound
	_setSignInRequestState(data) {
		this._signin = data;
		if (data.success) {
			Cookie.set(AUTH_TOKEN_KEY, data.data.token)
		}
	}

	@action
	signin(params) {
		return makeRequest(RQ_TYPES.POST, SIGNIN_URL, signinParamsAdapter(params), this._setSignInRequestState)
	}

	@computed
	get signupInfo() {
		return this._signup;
	}

	@action.bound
	_setSignUpRequestState(data) {
		this._signup = data;
	}

	@action
	signup(params) {
		return makeRequest(RQ_TYPES.POST, SIGNUP_URL, signupParamsAdapter(params), this._setSignUpRequestState);
	}

	@action.bound
	_setAllUsersRequestState(data) {
		this._allUsers = data;
	}

	@action
	fetchAllUsers() {
		return makeRequest(RQ_TYPES.GET, SIGNUP_URL, {}, this._setAllUsersRequestState);
	}

	@computed
	get allUsers() {
		return this._allUsers;
	}

	@action.bound
	_setLoginRequestState(data) {
		this._login = data;
	}

	@action
	login() {
		return makeRequest(RQ_TYPES.GET, LOGIN_URL, {}, this._setLoginRequestState);
	}

	@computed
	get current() {
		if (!this._login.success) {
			return {}
		}
		const data = this._login.data;

		return {
			name: `${data.first_name} ${data.last_name}`,
			nick: data.username,
		}
	}

	@action.bound
	_setLogoutRequestState(data) {
		this._logout = data;

		// if (data.success || data.error) {
			Cookie.remove(AUTH_TOKEN_KEY);
		// }
	}

	@action
	logout() {
		return makeRequest(RQ_TYPES.GET, LOGOUT_URL, {}, this._setLogoutRequestState);
	}

};

export default User;