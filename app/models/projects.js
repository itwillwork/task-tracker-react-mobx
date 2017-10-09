import { observable, action, computed } from 'mobx';
import loader from '../utility/loader';
import { makeRequest, TYPES as RQ_TYPES } from '../utility/requestMaker';
import formatDate from "../utility/formatDate";

const PROJECTS_URL = '/api/projects/';

const normalize = res => res.results;

const Projects = class Projects {
	@observable _userProjects = loader.initial();
	@observable _selectedProjectId = null;
	@observable _addProject = loader.initial();

	@action
	selectProject(id) {
		this._selectedProjectId = id;
	}

	@action.bound
	_updateFetchUserProjectsStatus(data) {
		this._userProjects = data;
	}

	@action
	fetchUserProjects(params) {
		return makeRequest(RQ_TYPES.GET, PROJECTS_URL, {}, this._updateFetchUserProjectsStatus, normalize);
	}

	@computed
	get userProjects() {
		return this._userProjects;
	}

	@computed
	get selected() {
		if (!this._userProjects.success || !this._selectedProjectId) {
			return {}
		}

		const selected = this._userProjects.data.filter(item => item.id === this._selectedProjectId)[0];

		return {
			id: parseInt(selected.id, 10),
			name: selected.name,
			created: formatDate(new Date(selected.created_at)),
			author: `${selected.author.first_name} ${selected.author.last_name}`
		}
	}

	@action.bound
	_updateAddProjectStatus(data) {
		this._addProject = data;
	}

	@action
	addProject(data) {
		return makeRequest(RQ_TYPES.POST, PROJECTS_URL, data, this._updateAddProjectStatus);
	}

	@computed
	get addProjectRequest() {
		return this._addProject;
	}
};

export default new Projects();