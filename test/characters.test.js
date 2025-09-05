import {jest} from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import {connect, disconnect} from "./helper/mongodbMemoryTest.js";
import {isValidJson} from "./helper/util.js";
import {
  createBrcCharacter,
  createJsrCharacter,
  createJsrfCharacter,
} from "./data/characters.js";
import {fetchCharacters} from "../src/controllers/characterController.js";
import {sortObjects} from "../src/utils/utility.js";
import Constants from "../src/constants/dbConstants.js";

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = (mockObj) =>
  (axios.get = jest.fn().mockResolvedValue({__esModule: true, data: mockObj}));
const {JSR_DB, JSRF_DB, BRC_DB} = Constants;
const req = {query: {}};

describe("Character Routes", () => {
  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test("GET /characters", async () => {
    const characters = await fetchCharacters(req, "ALL");
    expect(Array.isArray(characters)).toBe(true);
    expect(isValidJson(characters)).toBe(true);

    expect(characters[0]).toHaveProperty("name");
    expect(characters[0]).toHaveProperty("descriptions");
    expect(characters[0]).toHaveProperty("heroImage");
    expect(characters[0]).toHaveProperty("wikiPage");
  });

  test("GET /characters?sortBy=name&orderBy=desc", async () => {
    const req = {query: {sortBy: "name", orderBy: "desc"}};
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";

    let characters = await fetchCharacters(req, "ALL");
    if (sortByValue) {
      characters = characters.sort(sortObjects(sortByValue, sortOrder));
    }
    expect(isValidJson(characters)).toBe(true);
  });

  test("GET /characters/jsr?limit=5", async () => {
    const req = {query: {limit: "5"}};
    const characters = await fetchCharacters(req, JSR_DB);
    expect(Array.isArray(characters)).toBe(true);
    expect(isValidJson(characters)).toBe(true);
    expect(characters).toHaveLength(5);
  });

  test("GET /characters/jsrf?limit=15", async () => {
    const req = {query: {limit: "15"}};
    const characters = await fetchCharacters(req, JSRF_DB);
    expect(Array.isArray(characters)).toBe(true);
    expect(isValidJson(characters)).toBe(true);
    expect(characters).toHaveLength(15);
  });

  test("GET /characters/brc?limit=15", async () => {
    const req = {query: {limit: "10"}};
    const characters = await fetchCharacters(req, BRC_DB);
    expect(Array.isArray(characters)).toBe(true);
    expect(isValidJson(characters)).toBe(true);
    expect(characters).toHaveLength(10);
  });

  /* Unit/Mock Tests */
  test("GET /characters/jsr/:id", async () => {
    const testId = "643c6663092314f05f4da407";
    createMock(createJsrCharacter(testId));

    const result = await axios.get(`${baseUrl}/characters/jsr/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Slate");
    expect(result.data.age).toBe("19");
    expect(result.data.wikiPage).toBe(
      "https://jetsetradio.fandom.com/wiki/Slate"
    );
    expect(result.data.gallery).toHaveLength(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("GET /characters/jsrf/:id", async () => {
    const testId = "643c6664092314f05f4da461";
    createMock(createJsrfCharacter(testId));

    const result = await axios.get(`${baseUrl}/characters/jsrf/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Love Shockers");
    expect(result.data.descriptions).toHaveLength(9);
    expect(result.data.gallery).toHaveLength(5);
    expect(result.data.wikiPage).toBe(
      "https://jetsetradio.fandom.com/wiki/Love_Shockers"
    );
    expect(result.data.heroImage).toBe(
      "https://static.wikia.nocookie.net/jetsetradio/images/a/aa/Loveshockers.png/revision/latest?cb=20211011173518"
    );
    expect(result.data.stats).toHaveProperty("stamina");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("GET /characters/brc/:id", async () => {
    const testId = "643c6664092314f05f4da461";
    createMock(createBrcCharacter(testId));

    const result = await axios.get(`${baseUrl}/characters/brc/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Coil");
    expect(result.data.description).toBe(
      "Coil is first found under the tower near the Mataan taxi stop. Speak with him and then match his movements with Housedance. He will then leave but promises to contact you again later."
    );
    expect(result.data.gallery).toHaveLength(1);
    expect(result.data.defaultMovestyle).toBe("BMX");
    expect(result.data.unlockedByDefault).toBe(false);
    expect(result.data.isPlayable).toBe(true);
    expect(result.data.wikiPage).toBe(
      "https://bomb-rush-cyberfunk.fandom.com/wiki/Coil"
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
