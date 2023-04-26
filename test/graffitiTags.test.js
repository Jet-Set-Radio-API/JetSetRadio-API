import {jest} from '@jest/globals';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import { connect, disconnect } from './helper/mongodbMemoryTest.js';
import { fetchJSRTags, fetchJSRFTags } from '../src/controllers/graffitiTagController.js';

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = mockObj => axios.get = jest.fn().mockResolvedValue({ __esModule: true, data: mockObj })


describe('GraffitiTag Routes', () => {

  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test('GET /graffiti-tags', async () => {
    const jsrTags = await fetchJSRTags();
    const jsrfTags = await fetchJSRFTags();
    const tags = [...jsrTags, ...jsrfTags];
    expect(Array.isArray(jsrTags)).toBe(true);
    expect(Array.isArray(jsrfTags)).toBe(true);
    expect(Array.isArray(tags)).toBe(true);
    expect(isValidJson(tags)).toBe(true);

    expect(jsrTags[0]).toHaveProperty('number');
    expect(jsrTags[0]).toHaveProperty('tagName');
    expect(jsrTags[0]).toHaveProperty('tagSubName');
    expect(jsrTags[0]).toHaveProperty('imageUrl');
    expect(jsrfTags[9]).toHaveProperty('tagName');
    expect(jsrfTags[9]).toHaveProperty('gameId');
    expect(jsrfTags[9]).toHaveProperty('imageUrl');
    expect(jsrfTags[9]).toHaveProperty('wikiImageUrl');
    expect(jsrfTags[9]).toHaveProperty('level');
  })

  /* Unit/Mock Tests */
  test('GET /graffiti-tags/jsr/:id', async () => {
    const testId = "642f774b24b4bca91d5a6c99";
    createMock(createJsrTag(testId));

    const result = await axios.get(`${baseUrl}/graffiti-tags/jsr/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.tagSubName).toBe("SARU - A Head of the Crowd");
    expect(result.data.size).toBe("XL");
    expect(result.data.imageUrl).toBe("https://storage.googleapis.com/greg-kennedy.com/jsr/U_GRF.0018.png");
    expect(axios.get).toHaveBeenCalledTimes(1);
  })

  test('GET /graffiti-tags/jsrf/:id', async () => {
    const testId = "642f776624b4bca91d5a6f4b";
    createMock(createJsrfTag(testId));

    const result = await axios.get(`${baseUrl}/graffiti-tags/jsrf/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.number).toBe("No. 025");
    expect(result.data.level).toBe("Tokyo Underground Sewage Facility/the bottom point of Sewage Facility");
    expect(result.data.imageUrl).toBe("https://storage.googleapis.com/jetsetradio-api/jsrf/graffiti-tags/025.png");
    expect(axios.get).toHaveBeenCalledTimes(1);
  })


  /* Helper Objects */
  const createJsrTag = (testId) => { return {
    "_id" : testId,
    "number" : "0018",
    "tagName" : "SARU",
    "tagSubName" : "SARU - A Head of the Crowd",
    "size" : "XL",
    "gameId" : "642f773924b4bca91d5a6c54",
    "imageUrl" : "https://storage.googleapis.com/greg-kennedy.com/jsr/U_GRF.0018.png",
    "createdAt" : "2023-04-07T01:52:11.751Z",
    "updatedAt" : "2023-04-07T01:52:11.751Z"
}}

  const createJsrfTag = (testId) => {return {
    "_id" : testId,
    "number" : "No. 025",
    "tagName" : "Poison Jam",
    "level" : "Tokyo Underground Sewage Facility/the bottom point of Sewage Facility",
    "location" : "Test Runs (Unlock Poison Jam as a playable character)",
    "size" : "SS",
    "gameId" : "642f773924b4bca91d5a6c57",
    "wikiImageUrl" : "https://static.wikia.nocookie.net/jetsetradio/images/e/e8/No._025.png/revision/latest/scale-to-width-down/80?cb=20170220220832",
    "imageUrl" : "https://storage.googleapis.com/jetsetradio-api/jsrf/graffiti-tags/025.png",
    "createdAt" : "2023-04-07T01:52:38.343Z",
    "updatedAt" : "2023-04-07T01:52:38.343Z"
}}

  const isValidJson = (text) => {
    try {
      JSON.parse(JSON.stringify(text));
      return true;
    } catch {
      return false;
    }
  }

})