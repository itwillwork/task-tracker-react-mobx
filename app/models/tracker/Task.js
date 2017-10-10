import { observable, action, computed } from 'mobx';
import loader from '../../utility/loader';
import { makeRequest, TYPES as RQ_TYPES } from '../../utility/requestMaker';

const normalize = res => res.results;

import Comment from './Comment';

const COMMENT_URL = '/api/comment/';

const mapStatus = {
	1: "Новый",
	2: "В работе",
	3: "Сделан",
};

const Task = class Task {
	@observable _comments = loader.initial();

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

};

export default Task;

export { mapStatus };