import {jest} from '@jest/globals';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import { connect, disconnect } from './helper/mongodbMemoryTest.js';
import { fetchJSRLocations, fetchJSRFLocations, fetchJSRLevels } from '../src/controllers/locationController.js';

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = mockObj => axios.get = jest.fn().mockResolvedValue({ __esModule: true, data: mockObj })


describe('Location Routes', () => {

  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test('GET /locations', async () => {
    const jsrLocations = await fetchJSRLocations();
    const jsrfLocations = await fetchJSRFLocations();
    const locations = [...jsrLocations, ...jsrfLocations];
    expect(Array.isArray(jsrLocations)).toBe(true);
    expect(Array.isArray(jsrfLocations)).toBe(true);
    expect(Array.isArray(locations)).toBe(true);
    expect(isValidJson(locations)).toBe(true);

    expect(jsrLocations[0]).toHaveProperty('name')
    expect(jsrLocations[0]).toHaveProperty('description')
    expect(jsrLocations[0]).toHaveProperty('subLocations')
    expect(jsrLocations[0]).toHaveProperty('unlockableCharacters')
    expect(jsrLocations[0]).toHaveProperty('secretCharacter')
  })

  test('GET /levels', async () => {
    const levels = await fetchJSRLevels();
    expect(Array.isArray(levels)).toBe(true);
    expect(isValidJson(levels)).toBe(true);

    expect(levels[0]).toHaveProperty('name')
    expect(levels[0]).toHaveProperty('description')
    expect(levels[0]).toHaveProperty('location')
    expect(levels[0]).toHaveProperty('bossLevel')
    expect(levels[0]).toHaveProperty('chapter')
  })

  /* Unit/Mock Tests */
  test('GET /locations/jsr/:id', async () => {
    const testId = "6445cb96d85986264951f0ae";
    createMock(createJsrLocation(testId));

    const result = await axios.get(`${baseUrl}/locations/jsr/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Benten-cho");
    expect(result.data.gameId).toBe("64285b7918c8a0231136dc5a");
    expect(result.data.description).toBe("Benten-cho is the home turf of the Noise Tanks, a rival tech-savvy gang of the GG's.");
    expect(result.data.unlockableCharacters).toHaveLength(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
  })

  test('GET /levels/:id', async () => {
    const testId = "6445cb9ad85986264951f0eb";
    createMock(createJsrLevel(testId));

    const result = await axios.get(`${baseUrl}/levels/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Noise Reduction");
    expect(result.data.location.name).toBe("Benten-cho");
    expect(result.data.location.id).toBe("6445cb96d85986264951f0ae");
    expect(axios.get).toHaveBeenCalledTimes(1);
  })

  test('GET /locations/jsrf/:id', async () => {
    const testId = "6445cb9cd85986264951f113";
    createMock(createJsrfLocation(testId));

    const result = await axios.get(`${baseUrl}/locations/jsrf/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Dogenzaka Hill");
    expect(result.data.description).toBe("Dogenzaka Hill is the first level in the game after completing the initial tutorial at the Garage.");
    expect(result.data.unlockableCharacters).toHaveLength(2);
    expect(result.data.adjacentLocations).toHaveLength(2);
    expect(result.data.hasMixtape).toBe(true);
    expect(result.data.imageUrl).toBe("https://storage.googleapis.com/jetsetradio-api/jsrf/locations/dogenzaka-hill.webp");
    expect(result.data.secretCharacter.name).toBe('Doom Riders');
    expect(result.data.secretCharacter.id).toBe('643c719b8cabe0dcede868c6');
    expect(axios.get).toHaveBeenCalledTimes(1);
  })

})

/* Helpers */
const createJsrLocation = (testId) => { return {
  "_id" : testId,
  "levels" : [],
  "subLocations" : [ 
      "Subway", 
      "Train Line", 
      "Chinatown", 
      "Highway Zero", 
      "Geckijomae", 
      "Business District"
  ],
  "unlockableCharacters" : [ 
      {
          "name" : "Noise Tanks",
          "id" : "643c71bb8cabe0dcede86902"
      }, 
      {
          "name" : "Mew",
          "id" : "643c71a58cabe0dcede868e5"
      }, 
      {
          "name" : "Cube",
          "id" : "643c71c08cabe0dcede86917"
      }, 
      {
          "name" : "Yo-Yo",
          "id" : "643c71c38cabe0dcede86933"
      }
  ],
  "name" : "Benten-cho",
  "description" : "Benten-cho is the home turf of the Noise Tanks, a rival tech-savvy gang of the GG's.",
  "gameId" : "64285b7918c8a0231136dc5a",
  "secretCharacter" : {
      "name" : "Noise Tanks",
      "id" : "643c71bb8cabe0dcede86902"
  },
  "createdAt" : "2023-04-24T00:21:43.098Z",
  "updatedAt" : "2023-04-24T00:21:43.098Z"
}}

const createJsrLevel = (testId) => { return {
  "_id" : testId,
  "name" : "Noise Reduction",
  "description" : "This is a tag level. You need to tag each member of the Noise Tanks 10 times in order to beat this level.",
  "location" : {
      "name" : "Benten-cho",
      "id" : "6445cb96d85986264951f0ae"
  },
  "bossLevel" : true,
  "chapter" : "1",
  "createdAt" : "2023-04-24T00:21:46.134Z",
  "updatedAt" : "2023-04-24T00:21:46.134Z"
}}

const createJsrfLocation = (testId) => { return {
  "_id" : testId,
  "unlockableCharacters" : [ 
      {
          "name" : "Beat",
          "id" : "643c71a48cabe0dcede868de"
      }, 
      {
          "name" : "Doom Riders",
          "id" : "643c719b8cabe0dcede868c6"
      }
  ],
  "adjacentLocations" : [ 
      {
          "name" : "The Garage",
          "id" : "6445cb9bd85986264951f10f"
      }, 
      {
          "name" : "Shibuya Terminal",
          "id" : "6445cb9cd85986264951f11a"
      }
  ],
  "name" : "Dogenzaka Hill",
  "description" : "Dogenzaka Hill is the first level in the game after completing the initial tutorial at the Garage.",
  "gameId" : "64285b7918c8a0231136dc5d",
  "hasMixtape" : true,
  "imageUrl" : "https://storage.googleapis.com/jetsetradio-api/jsrf/locations/dogenzaka-hill.webp",
  "secretCharacter" : {
      "name" : "Doom Riders",
      "id" : "643c719b8cabe0dcede868c6"
  },
  "createdAt" : "2023-04-24T00:21:48.297Z",
  "updatedAt" : "2023-04-24T00:21:53.824Z"
}}

const isValidJson = (text) => {
  try {
    JSON.parse(JSON.stringify(text));
    return true;
  } catch {
    return false;
  }
}