import {jest} from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import {connect, disconnect} from "./helper/mongodbMemoryTest.js";
import {isValidJson} from "./helper/util.js";
import {fetchGames} from "../src/controllers/gameController.js";
import {createGame} from "./data/games.js";

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = (mockObj) =>
  (axios.get = jest.fn().mockResolvedValue({__esModule: true, data: mockObj}));

describe("Games Routes", () => {
  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test("GET /games", async () => {
    const games = await fetchGames();
    expect(Array.isArray(games)).toBe(true);
    expect(isValidJson(games)).toBe(true);
    expect(games[0]).toHaveProperty("name");
    expect(games[0]).toHaveProperty("publishers");
    expect(games[0]).toHaveProperty("developers");
    expect(games[0]).toHaveProperty("platforms");
    expect(games[0]).toHaveProperty("releaseDates");
  });

  /* Unit/Mock Tests */
  test("GET /games/:id", async () => {
    const testId = "642f773924b4bca91d5a6c57";
    createMock(createGame(testId));

    const result = await axios.get(`${baseUrl}/games/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data._id).toBe("642f773924b4bca91d5a6c57");
    expect(result.data.name).toBe("Jet Set Radio Future");
    expect(result.data.genre).toBe("Platform/Sports");
    expect(result.data.releaseDates).toHaveLength(3);
    expect(result.data.assets).toHaveLength(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
