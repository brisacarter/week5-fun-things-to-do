const request = require("supertest");
const app = require("./index"); // Import app without starting the server

describe("Fun Things To Do App", () => {
  
  test("GET / should return the main fun to-dos list", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Paddleboard");
  });

  test("GET /fun should return the fun to-do list", async () => {
    const response = await request(app).get("/fun");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Fun Things To Do List");
  });

  test("POST / should add an item to the main list", async () => {
    const response = await request(app).post("/").send("newItem=Read a book");
    expect(response.statusCode).toBe(302); // Redirect expected
  });

  test("POST /fun should add an item to the fun list", async () => {
    const response = await request(app)
      .post("/")
      .send("newItem=Watch a movie&list=Fun");
    expect(response.statusCode).toBe(302); // Redirect expected
  });

});
