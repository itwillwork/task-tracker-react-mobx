import { observable, action, computed, autorun } from 'mobx';
import loader from '../../utility/loader';
import { makeRequest, TYPES as RQ_TYPES } from '../../utility/requestMaker';

const PROJECTS_URL = '/api/projects/';

const normalize = res => res.results;

import Project from './Project';

export default class Tracker {
	@observable _projects = loader.initial();
	@observable _addProject = loader.initial();
	@observable _selectedProjectId = null;

	constructor() {
		autorun(() => console.log(this.selectedProject));
	}

	@action.bound
	select(id) {
		this._selectedProjectId = id;

		if (!this.selectedProject.tasks.success) {
			this.selectedProjectById.fetchTasks();
		}

		if (!this.selectedProject.members) {
			this.selectedProjectById.fetchMembers();
		}
	}

	@action.bound
	_updateFetchProjectsRequestStatus(data) {
		if (!data.success) {
			this._projects = data;
		} else {
			this._projects = {
				...data,
				data: data.data.map(item => new Project(this, item)),
			}
		}
	}

	@action.bound
	fetchProjects() {
		return makeRequest(RQ_TYPES.GET, PROJECTS_URL, {}, this._updateFetchProjectsRequestStatus, normalize);
	}

	@computed
	get projects() {
		return this._projects;
	}

	@computed
	get selectedProjectById() {
		return this._projects.data.filter(item => item.id === this._selectedProjectId)[0];
	}

	@computed
	get selectedProject() {
		if (!this._projects.success || !this._selectedProjectId) {
			return {}
		}

		return this.selectedProjectById;
	}

	@computed
	get selectedProjectId() {
		return this._selectedProjectId;
	}

	@computed
	get selectedTask() {
		return this.selectedProject.selected || {};
	}

	@action.bound
	_updateAddProjectStatus(data) {
		this._addProject = data;

		if (data.success) {
			this.fetchUserProjects();
		}
	}

	@action.bound
	addProject(data) {
		return makeRequest(RQ_TYPES.POST, PROJECTS_URL, data, this._updateAddProjectStatus);
	}

	@computed
	get addProjectRequestStatus() {
		return this._addProject;
	}
};