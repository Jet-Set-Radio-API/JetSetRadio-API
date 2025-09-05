import {jest} from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import {connect, disconnect} from "./helper/mongodbMemoryTest.js";
import {isValidJson} from "./helper/util.js";
import {
  fetchJSRTags,
  fetchJSRFTags,
} from "../src/controllers/graffitiTagController.js";
import {createJsrTag, createJsrfTag} from "./data/graffititags.js";
import {sortObjects} from "../src/utils/utility.js";

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = (mockObj) =>
  (axios.get = jest.fn().mockResolvedValue({__esModule: true, data: mockObj}));

describe("GraffitiTag Routes", () => {
  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test("GET /graffiti-tags", async () => {
    const jsrTags = await fetchJSRTags();
    const jsrfTags = await fetchJSRFTags();
    const tags = [...jsrTags, ...jsrfTags];
    expect(Array.isArray(jsrTags)).toBe(true);
    expect(Array.isArray(jsrfTags)).toBe(true);
    expect(Array.isArray(tags)).toBe(true);
    expect(isValidJson(tags)).toBe(true);

    expect(jsrTags[0]).toHaveProperty("number");
    expect(jsrTags[0]).toHaveProperty("tagName");
    expect(jsrTags[0]).toHaveProperty("tagSubName");
    expect(jsrTags[0]).toHaveProperty("imageUrl");
    expect(jsrfTags[9]).toHaveProperty("tagName");
    expect(jsrfTags[9]).toHaveProperty("gameId");
    expect(jsrfTags[9]).toHaveProperty("imageUrl");
    expect(jsrfTags[9]).toHaveProperty("wikiImageUrl");
  });

  test("GET /graffiti-tags?sortBy=name&orderBy=desc", async () => {
    const req = {query: {sortBy: "name", orderBy: "desc"}};
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const jsrTags = await fetchJSRTags();
    const jsrfTags = await fetchJSRFTags();

    let tags = [];
    if (sortByValue) {
      const allTags = [...jsrTags, ...jsrfTags];
      tags = allTags.sort(sortObjects(sortByValue, sortOrder));
    } else {
      tags = [...jsrTags, ...jsrfTags];
    }
    expect(isValidJson(tags)).toBe(true);
  });

  test("GET /graffiti-tags/jsr?limit=5", async () => {
    const req = {query: {limit: "5"}};
    const tags = await fetchJSRTags(req);
    expect(Array.isArray(tags)).toBe(true);
    expect(isValidJson(tags)).toBe(true);
    expect(tags).toHaveLength(5);
  });

  test("GET /graffiti-tags/jsrf?limit=15", async () => {
    const req = {query: {limit: "15"}};
    const tags = await fetchJSRFTags(req);
    expect(Array.isArray(tags)).toBe(true);
    expect(isValidJson(tags)).toBe(true);
    expect(tags).toHaveLength(15);
  });

  /* Unit/Mock Tests */
  test("GET /graffiti-tags/jsr/:id", async () => {
    const testId = "642f774b24b4bca91d5a6c99";
    createMock(createJsrTag(testId));

    const result = await axios.get(`${baseUrl}/graffiti-tags/jsr/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.tagSubName).toBe("SARU - A Head of the Crowd");
    expect(result.data.size).toBe("XL");
    expect(result.data.imageUrl).toBe(
      "https://storage.googleapis.com/greg-kennedy.com/jsr/U_GRF.0018.png"
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("GET /graffiti-tags/jsrf/:id", async () => {
    const testId = "642f776624b4bca91d5a6f4b";
    createMock(createJsrfTag(testId));

    const result = await axios.get(`${baseUrl}/graffiti-tags/jsrf/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.number).toBe("No. 025");
    expect(result.data.tagName).toBe("Poison Jam");
    expect(result.data.size).toBe("SS");
    expect(result.data.imageUrl).toBe(
      "https://storage.googleapis.com/jetsetradio-api/jsrf/graffiti-tags/025.png"
    );
    expect(result.data.locations[0].name).toBe(
      "Tokyo Underground Sewage Facility"
    );
    expect(result.data.locations[0].id).toBe("6445cb9dd85986264951f134");
    expect(result.data.locations).toHaveLength(2);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
