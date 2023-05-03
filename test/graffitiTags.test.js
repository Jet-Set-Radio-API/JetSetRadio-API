import {jest} from '@jest/globals';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import { connect, disconnect } from './helper/mongodbMemoryTest.js';
import { fetchJSRTags, fetchJSRFTags } from '../src/controllers/graffitiTagController.js';
import { sortObjects } from '../src/utils/utility.js';

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
  })

  test('GET /graffiti-tags?sortBy=name&orderBy=desc', async () => {
    const req = {query: { sortBy: 'name', orderBy: 'desc' }};
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : 'asc';
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
  })

  test('GET /graffiti-tags/jsr?limit=5', async () => {
    const req = {query: { limit: '5' }};
    const tags = await fetchJSRTags(req);
    expect(Array.isArray(tags)).toBe(true);
    expect(isValidJson(tags)).toBe(true);
    expect(tags).toHaveLength(5);
  })

  test('GET /graffiti-tags/jsrf?limit=15', async () => {
    const req = {query: { limit: '15' }};
    const tags = await fetchJSRFTags(req);
    expect(Array.isArray(tags)).toBe(true);
    expect(isValidJson(tags)).toBe(true);
    expect(tags).toHaveLength(15);
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
    expect(result.data.tagName).toBe("Poison Jam");
    expect(result.data.size).toBe("SS");
    expect(result.data.imageUrl).toBe("https://storage.googleapis.com/jetsetradio-api/jsrf/graffiti-tags/025.png");
    expect(result.data.locations[0].name).toBe('Tokyo Underground Sewage Facility');
    expect(result.data.locations[0].id).toBe('6445cb9dd85986264951f134');
    expect(result.data.locations).toHaveLength(2);
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
    "_id" : "6430ea8f11948a6df41bcf22",
    "number" : "No. 025",
    "tagName" : "Poison Jam",
    "size" : "SS",
    "wikiImageUrl" : "https://static.wikia.nocookie.net/jetsetradio/images/e/e8/No._025.png/revision/latest/scale-to-width-down/80?cb=20170220220832",
    "imageUrl" : "https://storage.googleapis.com/jetsetradio-api/jsrf/graffiti-tags/025.png",
    "gameId" : "64285b7918c8a0231136dc5d",
    "createdAt" : "2023-04-08T04:16:16.114Z",
    "updatedAt" : "2023-04-24T04:23:33.147Z",
    "graffitiSoulLocation" : "Test Runs (Unlock Poison Jam as a playable character)",
    "locations" : [ 
        {
            "name" : "Tokyo Underground Sewage Facility",
            "id" : "6445cb9dd85986264951f134"
        }, 
        {
            "name" : "Bottom Point of Sewage Facility",
            "id" : "6445cb9ed85986264951f13b"
        }
    ]
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