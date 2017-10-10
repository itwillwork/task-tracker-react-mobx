import { observable, action, computed } from 'mobx';
import loader from '../../utility/loader';
import { makeRequest, TYPES as RQ_TYPES } from '../../utility/requestMaker';

const normalize = res => res.results;

import Comment from './Comment';

const COMMENT_URL = '/api/comment/';
const TASKS_URL = '/api/tasks/';

const mapStatus = {
	1: "Новый",
	2: "В работе",
	3: "Сделан",
};

const Task = class Task {
	@observable _comments = loader.initial();
	@observable _addComment = loader.initial();
	@observable _changeStatus = loader.initial();
	@observable _changeAssign = loader.initial();

	store = null;
	id = null;
	text = null;
	description = null;
	created = null;
	lastModified = null;
	status = null;
	author = null;
	assignToUser = null;

	constructor(store, data) {
		this.store = store;
		this.id = parseInt(data.id, 10);
		this.text = data.text;
		this.description = data.description;
		this.created = new Date(data.created_at);
		this.lastModified = new Date(data.last_modified);
		this.status = data.status;
		if (data.author) {
			this.author = `${data.author.first_name} ${data.author.last_name}`;
		}
		if (data.assign_to) {
			this.assignToUser = `${data.assign_to.first_name} ${data.assign_to.last_name}`;
		}
	}

	@action.bound
	_updateFetchCommentsRequestStatus(data) {
		this._comments = data;

		if (data.success) {
			this._comments = {
				...data,
				data: data.data.map(item => new Comment(this.store, item))
			};
		}
	}

	@action
	fetchComments() {
		const params = {
			task: this.id,
			task__project: this.store.selectedProjectId,
		};

		return makeRequest(RQ_TYPES.GET, COMMENT_URL, params, this._updateFetchCommentsRequestStatus, normalize);
	}

	@computed
	get comments() {
		if (!this._comments.success) {
			return this._comments;
		}

		return this._comments;
	}

	@action.bound
	_updateAddCommentRequestStatus(data) {
		this._addComment = data;

		if (data.success) {
			this.fetchComments();
		}
	}

	@action
	addComment(data) {
		const params = {
			...data,
			'task': this.id,
		};
		return makeRequest(RQ_TYPES.POST, COMMENT_URL, params, this._updateAddCommentRequestStatus);
	}

	@computed
	get addCommentRequestStatus() {
		return this._addComment;
	}


	@action.bound
	_updateChangeStatusRequestStatus(data) {
		this._changeStatus = data;

		if (data.success) {
			this.store.fetchTasks();
		}
	}

	@action
	changeStatus(data) {
		const params = {
			...data,
			'id': this.id,
		};
		return makeRequest(RQ_TYPES.POST, TASKS_URL, params, this._updateChangeStatusRequestStatus);
	}

	@computed
	get changeStatusRequestStatus() {
		return this._changeStatus;
	}

	@action.bound
	_updateAssignStatusRequestStatus(data) {
		this._changeAssign = data;

		if (data.success) {
			this.store.fetchTasks();
		}
	}

	@action
	changeAssign(data) {
		const params = {
			...data,
			'id': this.id,
		};
		return makeRequest(RQ_TYPES.POST, TASKS_URL, params, this._updateAssignStatusRequestStatus);
	}

	@computed
	get changeAssignRequestStatus() {
		return this._changeAssign;
	}
};

export default Task;

export { mapStatus };