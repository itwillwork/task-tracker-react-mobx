import { observable, action, computed } from 'mobx';
import loader from '../utility/loader';
import { makeRequest, TYPES as RQ_TYPES } from '../utility/requestMaker';

const PROJECT_MEMBERS_URL = '/api/projectMember/';

const normalize = res => res.results;

const ProjectMember = class ProjectMember {
	@observable _selectedProjectMembers = loader.initial();
	@observable _addMemberToProjectData = loader.initial();

	mapRole = {
		1: 'Master',
		2: 'Developer'
	};

	get availableRoles() {
		return Object.keys(this.mapRole)
			.reduce((res, key) => {
				res.push({
					key: key,
					label: this.mapRole[key],
				});

				return res;
			}, [])
	}
	constructor() {
		this._selectedProjectMembers = loader.initial();
	}

	@action.bound
	setFetchProjectMembersRequestState(data) {
		this._selectedProjectMembers = data;
	}

	@action
	fetchProjectMembers(id) {
		return makeRequest(RQ_TYPES.GET, PROJECT_MEMBERS_URL, {project: id}, this.setFetchProjectMembersRequestState, normalize);
	}

	@computed
	get selectedProjectMembers() {
		if (!this._selectedProjectMembers.success) {
			return '';
		}

		const membersByRole = this._selectedProjectMembers.data.reduce((res, item) => {
			if (!res[item.role]) {
				res[item.role] = [];
			}
			res[item.role].push(`${item.user.first_name} ${item.user.last_name}`);
			return res;
		}, {});

		return [
			`${this.mapRole[1]}: ${membersByRole[1] ? membersByRole[1].join(', ') : 'нет'}`,
			`${this.mapRole[2]}: ${membersByRole[2] ? membersByRole[2].join(', ') : 'нет'}`
		]
	}



	@action.bound
	setAddToProjectMemberRequestState(data) {
		this._addMemberToProjectData = data;
	}

	@action
	addToProject(selectedProject, { user, role }) {
		const params = {
			"user_id": parseInt(user, 10),
			"project": selectedProject.id,
			"role": parseInt(role, 10)
		};

		return makeRequest(RQ_TYPES.POST, PROJECT_MEMBERS_URL, params, this.setAddToProjectMemberRequestState);
	}
};

export default new ProjectMember;