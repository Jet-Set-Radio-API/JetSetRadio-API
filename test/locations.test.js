import {jest} from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import {connect, disconnect} from "./helper/mongodbMemoryTest.js";
import {isValidJson} from "./helper/util.js";
import {
  createJsrLevel,
  createJsrLocation,
  createJsrfLocation,
  createBRCLocation,
} from "./data/locations.js";
import {
  fetchLocations,
  fetchJSRLevels,
} from "../src/controllers/locationController.js";
import {sortObjects} from "../src/utils/utility.js";
import Constants from "../src/constants/dbConstants.js";

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = (mockObj) =>
  (axios.get = jest.fn().mockResolvedValue({__esModule: true, data: mockObj}));
const {JSR_DB, JSRF_DB, BRC_DB} = Constants;
const req = {query: {}};

describe("Location Routes", () => {
  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */

  test("GET /locations", async () => {
    const locations = await fetchLocations(req, "ALL");
    expect(Array.isArray(locations)).toBe(true);
    expect(isValidJson(locations)).toBe(true);

    expect(locations[0]).toHaveProperty("name");
    expect(locations[0]).toHaveProperty("description");
    expect(locations[0]).toHaveProperty("subLocations");
    expect(locations[0]).toHaveProperty("unlockableCharacters");
    expect(locations[0]).toHaveProperty("secretCharacter");
  });

  test("GET /levels", async () => {
    const levels = await fetchJSRLevels(req);
    expect(Array.isArray(levels)).toBe(true);
    expect(isValidJson(levels)).toBe(true);

    expect(levels[0]).toHaveProperty("name");
    expect(levels[0]).toHaveProperty("description");
    expect(levels[0]).toHaveProperty("location");
    expect(levels[0]).toHaveProperty("bossLevel");
    expect(levels[0]).toHaveProperty("chapter");
  });

  test("GET /locations?sortBy=name&orderBy=desc", async () => {
    const req = {query: {sortBy: "name", orderBy: "desc"}};
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const jsrLocations = await fetchLocations(req, JSR_DB);
    const jsrfLocations = await fetchLocations(req, JSRF_DB);

    let locations = [];
    if (sortByValue) {
      const allLocations = [...jsrLocations, ...jsrfLocations];
      locations = allLocations.sort(sortObjects(sortByValue, sortOrder));
    } else {
      tags = [...jsrLocations, ...jsrfLocations];
    }
    expect(isValidJson(locations)).toBe(true);
  });

  test("GET /locations/jsr?limit=2", async () => {
    const req = {query: {limit: "2"}};
    const locations = await fetchLocations(req, JSR_DB);
    expect(Array.isArray(locations)).toBe(true);
    expect(isValidJson(locations)).toBe(true);
    expect(locations).toHaveLength(2);
  });

  test("GET /locations/jsrf?limit=15", async () => {
    const req = {query: {limit: "15"}};
    const locations = await fetchLocations(req, JSRF_DB);
    expect(Array.isArray(locations)).toBe(true);
    expect(isValidJson(locations)).toBe(true);
    expect(locations).toHaveLength(15);
  });

  test("GET /locations/brc?limit=3", async () => {
    const req = {query: {limit: "3"}};
    const locations = await fetchLocations(req, BRC_DB);
    expect(Array.isArray(locations)).toBe(true);
    expect(isValidJson(locations)).toBe(true);
    const location = locations[0];
    expect(location).toHaveProperty("name");
    expect(location).toHaveProperty("adjacentLocations");
    expect(location).toHaveProperty("cypherSpots");
    expect(location).toHaveProperty("collectablesCount");
    expect(location).toHaveProperty("maxRep");
    expect(location).toHaveProperty("mapCard");
    expect(location).toHaveProperty("taxiStop");
    expect(locations).toHaveLength(3);
  });

  /* Unit/Mock Tests */
  test("GET /locations/jsr/:id", async () => {
    const testId = "6445cb96d85986264951f0ae";
    createMock(createJsrLocation(testId));

    const result = await axios.get(`${baseUrl}/locations/jsr/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Benten-cho");
    expect(result.data.gameId).toBe("64285b7918c8a0231136dc5a");
    expect(result.data.description).toBe(
      "Benten-cho is the home turf of the Noise Tanks, a rival tech-savvy gang of the GG's."
    );
    expect(result.data.unlockableCharacters).toHaveLength(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("GET /levels/:id", async () => {
    const testId = "6445cb9ad85986264951f0eb";
    createMock(createJsrLevel(testId));

    const result = await axios.get(`${baseUrl}/levels/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Noise Reduction");
    expect(result.data.location.name).toBe("Benten-cho");
    expect(result.data.location.id).toBe("6445cb96d85986264951f0ae");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("GET /locations/jsrf/:id", async () => {
    const testId = "6445cb9cd85986264951f113";
    createMock(createJsrfLocation(testId));

    const result = await axios.get(`${baseUrl}/locations/jsrf/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Dogenzaka Hill");
    expect(result.data.description).toBe(
      "Dogenzaka Hill is the first level in the game after completing the initial tutorial at the Garage."
    );
    expect(result.data.unlockableCharacters).toHaveLength(2);
    expect(result.data.adjacentLocations).toHaveLength(2);
    expect(result.data.hasMixtape).toBe(true);
    expect(result.data.imageUrl).toBe(
      "https://storage.googleapis.com/jetsetradio-api/jsrf/locations/dogenzaka-hill.webp"
    );
    expect(result.data.secretCharacter.name).toBe("Doom Riders");
    expect(result.data.secretCharacter.id).toBe("643c719b8cabe0dcede868c6");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("GET /locations/brc/:id", async () => {
    const testId = "68bb2c34813c6317bbd07cab";
    createMock(createBRCLocation(testId));

    const result = await axios.get(`${baseUrl}/locations/brc/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Versum Hill");
    expect(result.data.description).toBe(
      "One of New Amsterdam’s five boroughs; rooftop and alley routes."
    );
    expect(result.data.unlockableCharacters).toHaveLength(3);
    expect(result.data.adjacentLocations).toHaveLength(2);
    expect(result.data.mapCard).toBe(
      "The map card for Versum Hill is found between two billboards, over the street that leads into Millennium Square. You can either use the billboards to wallride to it, or otherwise just jump off the rail near it. This is only available after beating the Franks."
    );
    expect(result.data.imageUrl).toBe(
      "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/1/12/VersumHill1.jpg/revision/latest/scale-to-width-down/1000?cb=20240811205909"
    );
    expect(result.data.collectablesCount).toBe("22");
    expect(result.data.maxRep).toBe("282");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
