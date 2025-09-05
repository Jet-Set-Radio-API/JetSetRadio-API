import {jest} from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import {connect, disconnect} from "./helper/mongodbMemoryTest.js";
import {isValidJson} from "./helper/util.js";
import {fetchCollectibles} from "../src/controllers/collectibleController.js";
import {sortObjects} from "../src/utils/utility.js";
import {createBrcCollectible} from "./data/collectibles.js";

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = (mockObj) =>
  (axios.get = jest.fn().mockResolvedValue({__esModule: true, data: mockObj}));
const req = {query: {}};

describe("Location Routes", () => {
  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */

  test("GET /collectibles", async () => {
    const collectibles = await fetchCollectibles(req, "ALL");
    expect(Array.isArray(collectibles)).toBe(true);
    expect(isValidJson(collectibles)).toBe(true);

    expect(collectibles[0]).toHaveProperty("name");
    expect(collectibles[0]).toHaveProperty("description");
    expect(collectibles[0]).toHaveProperty("key");
    expect(collectibles[0]).toHaveProperty("character");
    expect(collectibles[0]).toHaveProperty("type");
    expect(collectibles[0]).toHaveProperty("unlockedByDefault");
    expect(collectibles[0]).toHaveProperty("gallery");
    expect(collectibles[0]).toHaveProperty("gameId");
  });

  test("GET /collectibles?sortBy=name&orderBy=desc", async () => {
    const req = {query: {sortBy: "name", orderBy: "desc"}};
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    let collectibles = await fetchCollectibles(req, "ALL");
    if (sortByValue) {
      collectibles = collectibles.sort(sortObjects(sortByValue, sortOrder));
    }
    expect(isValidJson(collectibles)).toBe(true);
  });

  /* Unit/Mock Tests */
  test("GET /collectibles/:id", async () => {
    const testId = "68bb2c34813c6317bbd07cab";
    createMock(createBrcCollectible(testId));

    const result = await axios.get(`${baseUrl}/collectibles/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Spring");
    expect(result.data.key).toBe("Spring-Red");
    expect(result.data.type).toBe("Outfit");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
