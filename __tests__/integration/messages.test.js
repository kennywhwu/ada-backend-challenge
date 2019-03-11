process.env.NODE_ENV === "test";
const request = require("supertest");

const app = require("../../app");
const db = require("../../db");

beforeAll(async () => {
  await db.query(`DELETE FROM messages`);
});

afterAll(async () => {
  await db.query(`DELETE FROM messages`);
});

describe("POST /messages", async () => {
  test("Creates a new message", async () => {
    const response = await request(app)
      .post("/messages")
      .send({
        conversation_id: 1,
        sender: "test",
        message: "This is a test message",
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body.message.message).toEqual("This is a test message");
    await request(app)
      .post("/messages")
      .send({
        conversation_id: 1,
        sender: "test1",
        message: "This is another test message",
      });
    await request(app)
      .post("/messages")
      .send({
        conversation_id: 2,
        sender: "test",
        message: "This is yet another test message",
      });
  });
});

describe("GET /messages", async () => {
  test("Retrieves entire list of messages", async () => {
    const response = await request(app).get("/messages");
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });
});

describe("GET /messages/:conversation_id", async () => {
  test("Retrieves all messages under specified conversation id", async () => {
    const response = await request(app).get("/messages/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body.conversation_id).toEqual(1);
    expect(response.body.messages.length).toEqual(2);
  });

  test("Cannot find nonexistent conversation_id", async () => {
    // const response = await request(app).get("/messages/10");
    // console.log(response.body);
    // expect(response.error.statusCode).toEqual(404);
    // expect(response.body.message).toEqual("Conversation 10 does not exist");
  });
});
