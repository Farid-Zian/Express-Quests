const request = require("supertest");

const app = require("../src/app");

app.get("/api/users", (req, res) => {
	res.status(200).json(users);
});

describe("GET /api/users", () => {
	it("should return all users", async () => {
		const response = await request(app).get("/api/users");

		expect(response.headers["content-type"]).toMatch(/json/);

		expect(response.status).toEqual(200);
	});
});

describe("GET /api/users/:id", () => {
	it("should return one user", async () => {
		const response = await request(app).get("/api/users/1");

		expect(response.headers["content-type"]).toMatch(/json/);

		expect(response.status).toEqual(200);
	});

	it("should return no user", async () => {
		const response = await request(app).get("/api/users/0");

		expect(response.status).toEqual(404);
	});
});

describe("POST /api/users", () => {
	it("should return created users", async () => {
		const newUsers = {
			firstname: "Farid",
			lastname: "ZIAN",
			email: "Farid.ZIAN@exemple.com",
			city: "LILLE",
			language: "French",
		};

		const response = await request(app).post("/api/users").send(newUsers);

		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toEqual(201);
		expect(response.body).toHaveProperty("id");
		expect(typeof response.body.id).toBe("number");

		const [result] = await database.query(
			"SELECT * FROM users WHERE id=?",
			response.body.id
		);

		const [usersInDatabase] = result;

		expect(usersInDatabase).toHaveProperty("id");

		expect(usersInDatabase).toHaveProperty("firstname");
		expect(usersInDatabase.firstname).toStrictEqual(newUsers.firstname);

		expect(usersInDatabase).toHaveProperty("lastname");
		expect(usersInDatabase.lastname).toStrictEqual(newUsers.lastname);

		expect(usersInDatabase).toHaveProperty("email");
		expect(usersInDatabase.email).toStrictEqual(newUsers.email);

		expect(usersInDatabase).toHaveProperty("city");
		expect(usersInDatabase.city).toStrictEqual(newUsers.city);

		expect(usersInDatabase).toHaveProperty("language");
		expect(usersInDatabase.language).toStrictEqual(newUsers.language);
	});

	it("should return an error", async () => {
		const usersWithMissingProps = { firstname: "Farid" };

		const response = await request(app)
			.post("/api/users")
			.send(usersWithMissingProps);

		expect(response.status).toEqual(422);
	});
});


