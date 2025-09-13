import {jest} from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import {connect, disconnect} from "./helper/mongodbMemoryTest.js";
import {isValidJson} from "./helper/util.js";
import {
  fetchJSRSouls,
  fetchJSRFSouls,
} from "../src/controllers/graffitiSoulController.js";
import {createJsrSoul, createJsrfSoul} from "./data/graffitiSouls.js";
import {sortObjects} from "../src/utils/utility.js";

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = (mockObj) =>
  (axios.get = jest.fn().mockResolvedValue({__esModule: true, data: mockObj}));

describe("GraffitiSoul Routes", () => {
  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test("GET /graffiti-souls", async () => {
    const jsrSouls = await fetchJSRFSouls();
    const jsrfSouls = await fetchJSRFSouls();
    const souls = [...jsrSouls, ...jsrfSouls];
    expect(Array.isArray(jsrSouls)).toBe(true);
    expect(Array.isArray(jsrfSouls)).toBe(true);
    expect(Array.isArray(souls)).toBe(true);
    expect(isValidJson(souls)).toBe(true);

    expect(jsrSouls[0]).toHaveProperty("number");
    expect(jsrSouls[0]).toHaveProperty("locationId");
    expect(jsrSouls[0]).toHaveProperty("gameId");
    expect(jsrfSouls[9]).toHaveProperty("gameName");
    expect(jsrfSouls[9]).toHaveProperty("locationName");
    expect(jsrfSouls[9]).toHaveProperty("size");
    expect(jsrfSouls[9]).toHaveProperty("graffitiTagId");
  });

  test("GET /graffiti-souls?sortBy=name&orderBy=desc", async () => {
    const req = {query: {sortBy: "name", orderBy: "desc"}};
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const jsrSouls = await fetchJSRSouls();
    const jsrfSouls = await fetchJSRFSouls();

    let souls = [];
    if (sortByValue) {
      const allSouls = [...jsrSouls, ...jsrfSouls];
      souls = allSouls.sort(sortObjects(sortByValue, sortOrder));
    } else {
      souls = [...jsrSouls, ...jsrfSouls];
    }
    expect(isValidJson(souls)).toBe(true);
  });

  test("GET /graffiti-souls/jsr?limit=7", async () => {
    const req = {query: {limit: "7"}};
    const souls = await fetchJSRSouls(req);
    expect(Array.isArray(souls)).toBe(true);
    expect(isValidJson(souls)).toBe(true);
    expect(souls).toHaveLength(7);
  });

  test("GET /graffiti-souls/jsrf?limit=15", async () => {
    const req = {query: {limit: "15"}};
    const souls = await fetchJSRFSouls(req);
    expect(Array.isArray(souls)).toBe(true);
    expect(isValidJson(souls)).toBe(true);
    expect(souls).toHaveLength(15);
  });

  /* Unit/Mock Tests */
  test("GET /graffiti-souls/jsr/:id", async () => {
    const testId = "642f774b24b4bca91d5a6c99";
    createMock(createJsrSoul(testId));

    const result = await axios.get(`${baseUrl}/graffiti-soul/jsr/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.number).toBe("No. 2 - Pop!");
    expect(result.data.locationName).toBe("Shibuya-cho");
    expect(result.data.description).toBe(
      "Automatically unlocks after completing Gum's tutorial."
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("GET /graffiti-souls/jsrf/:id", async () => {
    const testId = "642f776624b4bca91d5a6f4b";
    createMock(createJsrfSoul(testId));

    const result = await axios.get(`${baseUrl}/graffiti-souls/jsrf/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.number).toBe("No. 131 - Megaro");
    expect(result.data.size).toBe("XL");
    expect(result.data.locationName).toBe("Hikage Street");
    expect(result.data.gameId).toBe("64285b7918c8a0231136dc5d");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
