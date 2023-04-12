import {jest} from '@jest/globals';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import { connect, disconnect } from './helper/mongodbMemoryTest.js';
import { fetchGames } from '../src/controllers/gameController.js';

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = mockObj => axios.get = jest.fn().mockResolvedValue({ __esModule: true, data: mockObj })


describe('Games Routes', () => {

  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test('GET /games', async () => {
    const games = await fetchGames();
    expect(Array.isArray(games)).toBe(true);
    expect(isValidJson(games)).toBe(true);
    expect(games[0]).toHaveProperty('name');
    expect(games[0]).toHaveProperty('publishers');
    expect(games[0]).toHaveProperty('developers');
    expect(games[0]).toHaveProperty('platforms');
    expect(games[0]).toHaveProperty('releaseDates');
  })

  /* Unit/Mock Tests */
  test('GET /games/:id', async () => {
    const testId = "642f773924b4bca91d5a6c57";
    createMock(createGame(testId));

    const result = await axios.get(`${baseUrl}/games/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data._id).toBe("642f773924b4bca91d5a6c57");
    expect(result.data.name).toBe("Jet Set Radio Future");
    expect(result.data.genre).toBe("Platform/Sports");
    expect(result.data.releaseDates).toHaveLength(3);
    expect(result.data.assets).toHaveLength(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
  })


  /* Helper Objects */
  const createGame = (testId) => { return {
    "_id" : testId,
    "aliases" : [],
    "developers" : ["Smilebit"],
    "publishers" : ["Sega"],
    "platforms" : ["Xbox"],
    "releaseDates" : [ 
        { "country" : "JP", "date" : "February 22, 2002" }, 
        { "country" : "US", "date" : "February 25, 2002" }, 
        { "country" : "EU", "date" : "March 24, 2002" }
    ],
    "assets" : [ 
        { "country" : "US", "images" : {
                "frontCover" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/us/front-cover.webp",
                "backCover" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/us/back-cover.webp",
                "disc" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/us/disc.webp"
            }
        }, 
        { "country" : "JP", "images" : {
                "frontCover" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/jp/front-cover.webp",
                "backCover" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/jp/back-cover.webp",
                "disc" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/jp/disc.webp"
            }
        }, 
        { "country" : "EU", "images" : {
                "frontCover" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/eu/front-cover.webp",
                "backCover" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/eu/back-cover.webp",
                "disc" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/eu/disc.webp"
            }
        }, 
        { "country" : "DE", "images" : {
                "frontCover" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/de/front-cover.webp",
                "backCover" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/de/back-cover.webp",
                "disc" : "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/de/disc.webp"
            }
        }
    ],
    "name" : "Jet Set Radio Future",
    "intro" : "Jet Set Radio Future (JSRF) is the sequel to Jet Set Radio (also known as Jet Grind Radio in America), and a sort of re-imagining of that game.",
    "description" : "Jet Set Radio Future is set in Tokyo-To, Japan, in 2024, where a street gang known as the GG's is fighting for control over the streets against rival gangs, as well as the large and powerful corporation known as the Rokkaku Group, led by Gouji Rokkaku. The Rokkaku Group is attempting to seize control of Tokyo by force and convert it into a totalitarian police state.",
    "genre" : "Platform/Sports",
    "createdAt" : "2023-04-07T01:51:53.511Z",
    "updatedAt" : "2023-04-07T01:51:53.511Z"
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