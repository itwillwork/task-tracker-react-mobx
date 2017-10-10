import formatDate from './formatDate';

describe("formatDate utility", () => {
	it("formatted", () => {
		expect(formatDate(new Date(2017, 9, 3))).toBe("3 октября 2017");
	});

});



