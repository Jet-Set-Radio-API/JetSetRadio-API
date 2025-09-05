import {jest} from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import {connect, disconnect} from "./helper/mongodbMemoryTest.js";
import {isValidJson} from "./helper/util.js";
import {createArtist} from "./data/artists.js";
import {
  fetchArtists,
  fetchSongsByArtistId,
} from "../src/controllers/artistController.js";

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = (mockObj) =>
  (axios.get = jest.fn().mockResolvedValue({__esModule: true, data: mockObj}));

describe("Artists Routes", () => {
  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test("GET /artists", async () => {
    const artists = await fetchArtists();
    expect(Array.isArray(artists)).toBe(true);
    expect(isValidJson(artists)).toBe(true);
    expect(artists[0]).toHaveProperty("_id");
    expect(artists[0]).toHaveProperty("gameIds");
    expect(artists[0]).toHaveProperty("name");
    expect(artists[0]).toHaveProperty("createdAt");
    expect(artists[0]).toHaveProperty("updatedAt");

    const artist = artists.find((artist) => artist.name === "Guitar Vader");
    if (artist && artist._id) {
      const songsByArtist = await fetchSongsByArtistId(artist._id);
      expect(Array.isArray(songsByArtist)).toBe(true);
      expect(isValidJson(songsByArtist)).toBe(true);
      expect(songsByArtist[0]).toHaveProperty("artistId");
      expect(songsByArtist[0].artistId).toStrictEqual(artist._id);
      expect(songsByArtist[0]).toHaveProperty("audioLink");
      expect(songsByArtist[0]).toHaveProperty("gameId");
      expect(songsByArtist[0]).toHaveProperty("name");
    }
  });

  /* Unit/Mock Tests */
  test("GET /artists/:id", async () => {
    const testId = "642f778224b4bca91d5a70d2";
    createMock(createArtist(testId));

    const result = await axios.get(`${baseUrl}/artists/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data._id).toBe(testId);
    expect(result.data.gameIds).toHaveLength(2);
    expect(result.data.name).toBe("Guitar Vader");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
