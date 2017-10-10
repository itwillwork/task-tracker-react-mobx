import Member from './Member';

describe("Member", () => {
	it("creates new member", () => {
		const member = new Member(null, {
			role: 1,
			user: {
				first_name: 'first',
				last_name: 'last',
			}
		});
		expect(member.role).toBe(1);
		expect(member.moniker).toBe("first last");
	});

});



