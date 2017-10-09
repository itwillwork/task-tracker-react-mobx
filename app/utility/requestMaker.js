import loader from './loader';

import Cookie from 'js-cookie';
import { AUTH_TOKEN_KEY } from '../constants';

import qs from 'qs';

export const TYPES = {
	POST: 'POST',
	GET: 'GET',
};

const getHeaders = () => {
	let headers = new Headers({
		'Accept': 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
	});

	let token = Cookie.get(AUTH_TOKEN_KEY);
	if (token) {
		headers.append("Authorization", `Token ${token}`);
	}

	return headers;
};

import { normalize, schema } from 'normalizr';

const reply = res => res;

export const makeRequest = async(
	type,
    url,
    params,
	dispatchRequestState,
	normalize = reply
) => {
	let request;

	dispatchRequestState(loader.begin());

	switch (type) {
		case TYPES.POST:
			request = fetch(url, {
				method: 'POST',
				headers: getHeaders(),
				body: JSON.stringify(params)
			});
			break;
		case TYPES.GET:
			const getParams = Object.keys(params).length
				? '?' + qs.stringify(params)
				: '';

			request = fetch(url + getParams, {
				method: 'GET',
				headers: getHeaders(),
			});
			break;
	}
	const response = await request;

	if (!response.ok) {
		dispatchRequestState(loader.error(await response.json()));
		return Promise.reject(response)
	}

	dispatchRequestState(loader.success(normalize(await response.json())));
	return Promise.resolve(response);
};

