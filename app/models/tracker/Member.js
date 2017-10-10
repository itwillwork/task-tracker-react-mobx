import { observable, action, computed } from 'mobx';
import loader from '../../utility/loader';
import { makeRequest, TYPES as RQ_TYPES } from '../../utility/requestMaker';

const PROJECT_MEMBERS_URL = '/api/projectMember/';

const normalize = res => res.results;

const rolesMap = {
	1: 'Master',
	2: 'Developer'
};

const getAvailableRoles = () => {
	return Object.keys(rolesMap)
		.reduce((res, key) => {
			res.push({
				key: key,
				label: rolesMap[key],
			});

			return res;
		}, []);
};

export default class Member {
	constructor(store, data) {
		this.store = store;
		this.role = data.role;
		this.moniker = `${data.user.first_name} ${data.user.last_name}`
	}
};

export { rolesMap, getAvailableRoles };