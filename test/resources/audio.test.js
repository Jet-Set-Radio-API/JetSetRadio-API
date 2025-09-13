import {jest} from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import {connect, disconnect} from "../helper/mongodbMemoryTest.js";
import {isValidJson} from "../helper/util.js";
import {createJsrAudio, createJsrfAudio} from "../data/audio.js";

import {fetchAudio} from "../../src/controllers/audioController.js";
import {sortObjects} from "../../src/utils/utility.js";
import Constants from "../../src/constants/dbConstants.js";

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = (mockObj) =>
  (axios.get = jest.fn().mockResolvedValue({__esModule: true, data: mockObj}));
const {JSR_DB, JSRF_DB} = Constants;
const req = {query: {}};

describe("Audio Routes", () => {
  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test("GET /audio", async () => {
    const audio = await fetchAudio(req, "ALL");
    expect(Array.isArray(audio)).toBe(true);
    expect(isValidJson(audio[0])).toBe(true);
    expect(audio[0]).toHaveProperty("category");
    expect(audio[0]).toHaveProperty("speaker");
    expect(audio[0]).toHaveProperty("audioUrl");
    expect(audio[0]).toHaveProperty("source");
    expect(audio[0]).toHaveProperty("gameId");
    expect(audio[0]).toHaveProperty("characterId");
  });

  test("GET /audio?sortBy=name&orderBy=desc", async () => {
    const req = {query: {sortBy: "name", orderBy: "desc"}};
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    let audio = await fetchAudio(req, "ALL");
    if (sortByValue) {
      audio = audio.sort(sortObjects(sortByValue, sortOrder));
    }
    expect(isValidJson(audio)).toBe(true);
  });

  test("GET /audio/jsr?limit=5", async () => {
    const req = {query: {limit: "5"}};
    const audio = await fetchAudio(req, JSR_DB);
    expect(Array.isArray(audio)).toBe(true);
    expect(isValidJson(audio)).toBe(true);
    expect(audio).toHaveLength(5);
  });

  test("GET /audio/jsrf?limit=15", async () => {
    const req = {query: {limit: "15"}};
    const audio = await fetchAudio(req, JSRF_DB);
    expect(Array.isArray(audio)).toBe(true);
    expect(isValidJson(audio)).toBe(true);
    expect(audio).toHaveLength(15);
  });

  /* Unit/Mock Tests */
  test("GET /audio/jsr/:id", async () => {
    const testId = "642f9bca54abd26ec59b87cd";
    createMock(createJsrAudio(testId));

    const result = await axios.get(`${baseUrl}/audio/jsr/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.speaker).toBe("Cube");
    expect(result.data.usage).toBe("Greet");
    expect(result.data.audioUrl).toBe(
      "https://static.wikia.nocookie.net/jetsetradio/images/1/1b/Cube_en_14.wav/revision/latest?cb=20240617181433"
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("GET /audio/jsrf/:id", async () => {
    const testId = "642f9bd854abd26ec59b885e";
    createMock(createJsrfAudio(testId));

    const result = await axios.get(`${baseUrl}/audio/jsrf/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.speaker).toBe("A.KU.MU");
    expect(result.data.audioUrl).toBe(
      "https://static.wikia.nocookie.net/jetsetradio/images/d/d9/Pv_akumu_4.wav/revision/latest?cb=20240618133248"
    );
    expect(result.data.gameId).toBe("64285b7918c8a0231136dc5d");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
