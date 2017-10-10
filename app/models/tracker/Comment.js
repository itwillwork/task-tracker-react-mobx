export default class Comment {
	constructor(store, data) {
		this.store = store;

		this.text = data.text;
		this.created = new Date(data.created_at);
		this.author = `${data.author.first_name} ${data.author.last_name}`;
	}
};