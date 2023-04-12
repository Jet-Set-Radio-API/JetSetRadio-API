import {jest} from '@jest/globals';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import { connect, disconnect } from './helper/mongodbMemoryTest.js';
import { fetchJSRSongs, fetchJSRFSongs } from '../src/controllers/songController.js';

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = mockObj => axios.get = jest.fn().mockResolvedValue({ __esModule: true, data: mockObj })


describe('Songs Routes', () => {

  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test('GET /songs', async () => {
    const jsrSongs = await fetchJSRSongs();
    const jsrfSongs = await fetchJSRFSongs();
    const songs = [...jsrSongs, ...jsrSongs];
    expect(Array.isArray(jsrSongs)).toBe(true);
    expect(Array.isArray(jsrfSongs)).toBe(true);
    expect(Array.isArray(songs)).toBe(true);
    expect(isValidJson(songs[0])).toBe(true);
    expect(songs[0]).toHaveProperty('artistId');
    expect(songs[0]).toHaveProperty('audioLink');
    expect(songs[0]).toHaveProperty('gameId');
    expect(songs[0]).toHaveProperty('name');
    expect(songs[0]).toHaveProperty('shortName');
  })

  /* Unit/Mock Tests */
  test('GET /songs/jsr/:id', async () => {
    const testId = "642f9bca54abd26ec59b87cd";
    createMock(createJsrSong(testId));

    const result = await axios.get(`${baseUrl}/songs/jsr/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Dunny Boy Williamson Show");
    expect(result.data.gameId).toBe("642f773924b4bca91d5a6c54");
    expect(result.data.audioLink).toBe("https://jetsetradio.live/radio/stations/classic/Deavid Soul - Dunny Boy Williamson Show.mp3");
    expect(axios.get).toHaveBeenCalledTimes(1);
  })

  test('GET /songs/jsrf/:id', async () => {
    const testId = "642f9bd854abd26ec59b885e";
    createMock(createJsrfSong(testId));

    const result = await axios.get(`${baseUrl}/songs/jsrf/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("The Scrappy (The Latch Brothers Remix)");
    expect(result.data.chapters).toStrictEqual(["8", "9", "sewers"]);
    expect(result.data.gameId).toBe("642f773924b4bca91d5a6c57");
    expect(axios.get).toHaveBeenCalledTimes(1);
  })


  /* Helper Objects */
  const createJsrSong = (testId) => { return {
    "_id": testId,
    "artistId": "642f97e8ce2153e34bcd3774",
    "audioLink": "https://jetsetradio.live/radio/stations/classic/Deavid Soul - Dunny Boy Williamson Show.mp3",
    "createdAt": "2023-04-07T04:27:54.124Z",
    "gameId": "642f773924b4bca91d5a6c54",
    "name": "Dunny Boy Williamson Show",
    "shortName": "Dunny Boy Williamson Show",
    "updatedAt": "2023-04-07T04:27:54.124Z"
  }}

  const createJsrfSong = (testId) => {return {
    "_id" : testId,
    "chapters" : [ 
        "8", 
        "9", 
        "sewers"
    ],
    "name" : "The Scrappy (The Latch Brothers Remix)",
    "shortName" : "The Scrappy",
    "gameId" : "642f773924b4bca91d5a6c57",
    "artistId" : "642f778024b4bca91d5a70b5",
    "audioLink" : "https://jetsetradio.live/radio/stations/future/BS 2000 - The Scrappy (The Latch Brothers Remix).mp3",
    "createdAt" : "2023-04-07T04:28:08.839Z",
    "updatedAt" : "2023-04-07T04:28:08.839Z"
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