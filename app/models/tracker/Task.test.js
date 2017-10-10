import Task from './Task';
import fetchCommentsMock from "../../../__mocks__/fetchComments";

describe("Task", () => {
	let task = null;

	it("creates new task", () => {
		task = new Task(null, {
			id: "123",
			text: "text",
			description: 'desription',
			created_at: null,
			last_modified: null,
			status: null,
			author: {
				first_name: 'Петух',
				last_name: 'Пушистый',
			},
			assign_to: {
				first_name: 'Петух',
				last_name: 'Пушистый',
			}
		});

		expect(task.id).toBe(123);
		expect(task.text).toBe("text");
		expect(task.description).toBe("desription");
		expect(task.author).toBe("Петух Пушистый");
		expect(task.assignToUser).toBe("Петух Пушистый");
	});

	it("fetch comments empty response", () => {
		task._updateFetchCommentsRequestStatus({
			success: true,
			data: []
		});

		expect(task._comments.data.length).toBe(0);
	});

	it("fetch comments", () => {
		task._updateFetchCommentsRequestStatus({
			success: true,
			data: fetchCommentsMock
		});

		expect(task.comments.data[0].author).toBe("Гребень Цветной");
		expect(task.comments.data[0].text).toBe("sdfsdfsdfsdfsdf");

		expect(task.comments.data[1].author).toBe("Гребень Цветной");
		expect(task.comments.data[1].text).toBe("sdf");


	});
});



