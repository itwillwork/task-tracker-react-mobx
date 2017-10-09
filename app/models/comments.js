import { observable, action, computed } from 'mobx';
import loader from '../utility/loader';
import { makeRequest, TYPES as RQ_TYPES } from '../utility/requestMaker';
import formatDate from "../utility/formatDate";

const TASK_URL = '/api/comment/';

const normalize = res => res.results;

const Comments = class Comments {
	@observable _taskComments = loader.initial();
	@observable _addProject = loader.initial();

	@action.bound
	updateFetchTaskCommentsStatus(data) {
		this._taskComments = data;
	}

	@action
	fetchTaskComments(taskId, projectId) {
		const query = {
			task: taskId,
			task__project: projectId,
		};

		return makeRequest(RQ_TYPES.GET, TASK_URL, {}, this.updateFetchTaskCommentsStatus, normalize);
	}

	@computed
	get taskComments() {
		if (!this._taskComments.success) {
			return this._taskComments;
		}

		const data = this._taskComments.data.map(comment => ({
			text: comment.text,
			created: formatDate(new Date(comment.created_at)),
			author: `${comment.author.first_name} ${comment.author.last_name}`,
		}));

		return {
			...this._taskComments,
			data,
		};
	}

	@action.bound
	updateAddProjectStatus(data) {
		this._addProject = data;
	}

	@action
	addProject(data) {
		return makeRequest(RQ_TYPES.POST, PROJECTS_URL, data, this.updateAddProjectStatus);
	}

	@computed
	get addProjectRequest() {
		return this._addProject;
	}
};

export default new Comments();