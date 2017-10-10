import { observable, action, computed } from 'mobx';
import loader from '../../utility/loader';
import { makeRequest, TYPES as RQ_TYPES } from '../../utility/requestMaker';

const TASKS_URL = '/api/tasks/';
const PROJECT_MEMBERS_URL = '/api/projectMember/';

const normalize = res => res.results;

import Task from './Task'
import Member, { rolesMap } from './Member';

const Project = class Project {
	id = null;
	name = null;
	created = null;
	author = null;
	store = null;

	@observable _members = loader.initial();
	@observable _addMember = loader.initial();

	@observable _tasks = loader.initial();
	@observable _addTask = loader.initial();

	@observable _selectedTaskId = null;

	constructor(store, data) {
		this.store = store;
		this.id = parseInt(data.id, 10);
		this.name = data.name;
		this.created = new Date(data.created_at);
		this.author = `${data.author.first_name} ${data.author.last_name}`;
	}

	@action.bound
	select(id) {
		this._selectedTaskId = id;

		const selected = this.selected;

		if (!selected.comments.success) {
			this.selected.fetchComments();
		}
	}

	@action.bound
	_updateTaskRequestStatus(data) {
		this._tasks = data;

		if (data.success) {
			this._tasks = {
				...data,
				data: data.data.map(item => new Task(this.store, item)),
			}
		}
	}

	@action
	fetchTasks() {
		const params = {
			project: this.id,
		};

		return makeRequest(RQ_TYPES.GET, TASKS_URL, params, this._updateTaskRequestStatus, normalize);
	}

	@computed
	get tasks() {
		return this._tasks;
	}

	@computed
	get selectedById() {
		return this._tasks.data.filter(item => item.id === this._selectedTaskId)[0];
	}

	@computed
	get selected() {
		if (!this._tasks.success || !this._selectedTaskId) {
			return {}
		}

		return this.selectedById;
	}

	@computed
	get selectedTaskId() {
		return this._selectedTaskId;
	}

	@action.bound
	_updateAddTaskRequestStatus(data) {
		this._addTask = data;
	}

	@action
	addTask(data) {
		return makeRequest(RQ_TYPES.POST, TASKS_URL, data, this._updateAddTaskRequestStatus);
	}

	@computed
	get addTaskRequestStatus() {
		return this._addTask;
	}

	@action.bound
	_updateFetchMembersRequestState(data) {
		this._members = data;

		if (data.success) {
			this._members = {
				...data,
				data: data.data.map(item => new Member(this.store, item)),
			}
		}
	}

	@action
	fetchMembers() {
		return makeRequest(RQ_TYPES.GET, PROJECT_MEMBERS_URL, {project: this.store.selectedProjectId}, this._updateFetchMembersRequestState, normalize);
	}

	@computed
	get members() {
		if (!this._members.success) {
			return '';
		}

		const membersByRole = this._members.data.reduce((res, item) => {
			if (!res[item.role]) {
				res[item.role] = [];
			}
			res[item.role].push(item.moniker);
			return res;
		}, {});

		return [
			`${rolesMap[1]}: ${membersByRole[1] ? membersByRole[1].join(', ') : 'нет'}`,
			`${rolesMap[2]}: ${membersByRole[2] ? membersByRole[2].join(', ') : 'нет'}`
		]
	}

	@action.bound
	_updateAddMemberRequestState(data) {
		this._addMember = data;
	}

	@action
	addMember(selectedProject, { user, role }) {
		const params = {
			"user_id": parseInt(user, 10),
			"project": selectedProject.id,
			"role": parseInt(role, 10)
		};

		return makeRequest(RQ_TYPES.POST, PROJECT_MEMBERS_URL, params, this._updateAddMemberRequestState);
	}

	@computed
	get addMemberRequestStatus() {
		return this._addMember;
	}

};

export default Project;