process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const Item = require('../classes/item')

let items = require("../fakeDb")


beforeEach(async () => {
  new Item('milk', 20.20);  
});

afterEach(async () => {
  items = [];
});

describe("GET /items", () => {
  test("Get item list", async () => {
    const response = await request(app).get(`/items`);
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
}); 

describe("GET /items/:name", () => {
  test("Gets a single item", async () => {
    const response = await request(app).get(`/items/milk`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(items[0]);
  }); 

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /items", () => {
  test("Creates new item", async () => {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: "Cheese",
        price: 2.22
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ added: { name: 'Cheese', price: 2.22 } });
  });
});

describe("PATCH /items/:name", () => {
  test("Updates item", async () => {
    const response = await request(app)
      .patch(`/items/milk`)
      .send({
        name: "Super Milk"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ updated: { name: 'Super Milk', price: 20.20 } });
  });


  test("Responds with 404 if can't find item", async () => {
    const response = await request(app).patch(`/items/invalid`);
    expect(response.statusCode).toBe(404);
  });
});


describe("DELETE /items/:name", () => {
  test("Deletes item", async () => {
    const response = await request(app)
      .delete(`/items/milk`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});