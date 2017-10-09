import { observable, action, computed } from 'mobx';
import loader from '../utility/loader';
import { makeRequest, TYPES as RQ_TYPES } from '../utility/requestMaker';
import formatDate from "../utility/formatDate";

const PROJECTS_URL = '/api/tasks/';

const normalize = res => res.results;

const Tasks = class Tasks {
	@observable _projectTasks = loader.initial();
	@observable _selectedTaskId = null;
	@observable _addTask = loader.initial();

	@action
	selectTask(id) {
		this._selectedTaskId = id;
	}

	@action.bound
	_updateFetchProjectTaskStatus(data) {
		this._projectTasks = data;
	}

	@action
	fetchProjectTask(selectedProject) {
		const params = {
			project: selectedProject.id,
		};

		return makeRequest(RQ_TYPES.GET, PROJECTS_URL, {}, this._updateFetchProjectTaskStatus, normalize);
	}

	@computed
	get projectTasks() {
		return this._projectTasks;
	}

	@computed
	get selected() {
		if (!this._projectTasks.success || !this._selectedTaskId) {
			return {}
		}

		const selected = this._projectTasks.data.filter(item => item.id === this._selectedTaskId)[0];

		return {
			id: parseInt(selected.id, 10),
			text: selected.text,
			description: selected.description,
			created: formatDate(new Date(selected.created_at)),
			lastModified: formatDate(new Date(selected.last_modified)),
			status: selected.status,
			author: `${selected.author.first_name} ${selected.author.last_name}`,
			assignToUser: `${selected.assign_to.first_name} ${selected.assign_to.last_name}`
		}
	}
	//TODO обозначить внутренние методы через _
	@action.bound
	_updateAddTaskStatus(data) {
		this._addTask = data;
	}

	@action
	addTask(data) {
		console.log('add task', data);
		return makeRequest(RQ_TYPES.POST, PROJECTS_URL, data, this._updateAddTaskStatus);
	}

	@computed
	get addTaskRequest() {
		return this._addTask;
	}
};

export default new Tasks();