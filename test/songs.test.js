import {jest} from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import {connect, disconnect} from "./helper/mongodbMemoryTest.js";
import {fetchSongs} from "../src/controllers/songController.js";
import {sortObjects} from "../src/utils/utility.js";
import {isValidJson} from "./helper/util.js";
import Constants from "../src/constants/dbConstants.js";
import {createJsrSong, createJsrfSong, createBrcSong} from "./data/songs.js";

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = (mockObj) =>
  (axios.get = jest.fn().mockResolvedValue({__esModule: true, data: mockObj}));
const {JSR_DB, JSRF_DB, BRC_DB} = Constants;
const req = {query: {}};

describe("Songs Routes", () => {
  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test("GET /songs", async () => {
    const songs = await fetchSongs(req, "ALL");
    expect(Array.isArray(songs)).toBe(true);
    expect(isValidJson(songs[0])).toBe(true);
    expect(songs[0]).toHaveProperty("artistId");
    expect(songs[0]).toHaveProperty("audioLink");
    expect(songs[0]).toHaveProperty("gameId");
    expect(songs[0]).toHaveProperty("name");
  });

  test("GET /songs?sortBy=name&orderBy=desc", async () => {
    const req = {query: {sortBy: "name", orderBy: "desc"}};
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    let songs = await fetchSongs(req, "ALL");
    if (sortByValue) {
      songs = songs.sort(sortObjects(sortByValue, sortOrder));
    }
    expect(isValidJson(songs)).toBe(true);
  });

  test("GET /songs/jsr?limit=5", async () => {
    const req = {query: {limit: "5"}};
    const songs = await fetchSongs(req, JSR_DB);
    expect(Array.isArray(songs)).toBe(true);
    expect(isValidJson(songs)).toBe(true);
    expect(songs).toHaveLength(5);
  });

  test("GET /songs/jsrf?limit=15", async () => {
    const req = {query: {limit: "15"}};
    const songs = await fetchSongs(req, JSRF_DB);
    expect(Array.isArray(songs)).toBe(true);
    expect(isValidJson(songs)).toBe(true);
    expect(songs).toHaveLength(15);
  });

  test("GET /songs/brc?limit=8", async () => {
    const req = {query: {limit: "8"}};
    const songs = await fetchSongs(req, JSRF_DB);
    expect(Array.isArray(songs)).toBe(true);
    expect(isValidJson(songs)).toBe(true);
    expect(songs).toHaveLength(8);
  });

  /* Unit/Mock Tests */
  test("GET /songs/jsr/:id", async () => {
    const testId = "642f9bca54abd26ec59b87cd";
    createMock(createJsrSong(testId));

    const result = await axios.get(`${baseUrl}/songs/jsr/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Dunny Boy Williamson Show");
    expect(result.data.gameId).toBe("642f773924b4bca91d5a6c54");
    expect(result.data.audioLink).toBe(
      "https://jetsetradio.live/radio/stations/classic/Deavid Soul - Dunny Boy Williamson Show.mp3"
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("GET /songs/jsrf/:id", async () => {
    const testId = "642f9bd854abd26ec59b885e";
    createMock(createJsrfSong(testId));

    const result = await axios.get(`${baseUrl}/songs/jsrf/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("The Scrappy (The Latch Brothers Remix)");
    expect(result.data.chapters).toStrictEqual(["8", "9", "sewers"]);
    expect(result.data.gameId).toBe("642f773924b4bca91d5a6c57");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("GET /songs/brc/:id", async () => {
    const testId = "68bb2eb8c94ffcab6d8bf6f9";
    createMock(createBrcSong(testId));

    const result = await axios.get(`${baseUrl}/songs/brc/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Big City Life");
    expect(result.data.key).toBe("Big City Life-kidkanevilV");
    expect(result.data.audioLink).toBe(
      "https://drive.google.com/file/d/1Y3TnluLo2k62acc3K6R21isTyTdqptOM/view?usp=drive_link"
    );
    expect(result.data.gameId).toBe("68b8db67cec5d6b573cf624c");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
