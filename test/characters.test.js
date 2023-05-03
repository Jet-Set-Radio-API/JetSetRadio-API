import {jest} from '@jest/globals';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import { connect, disconnect } from './helper/mongodbMemoryTest.js';
import { fetchJSRCharacters, fetchJSRFCharacters } from '../src/controllers/characterController.js';
import { sortObjects } from '../src/utils/utility.js';

const baseUrl = `${process.env.BASE_URL}/v1/api`;
const createMock = mockObj => axios.get = jest.fn().mockResolvedValue({ __esModule: true, data: mockObj })


describe('Character Routes', () => {

  beforeAll(connect);
  afterAll(disconnect);
  afterEach(() => jest.clearAllMocks());

  /* API/Integration Tests */
  test('GET /characters', async () => {
    const jsrCharacters = await fetchJSRCharacters();
    const jsrfCharacters = await fetchJSRFCharacters();
    const characters = [...jsrCharacters, ...jsrfCharacters];
    expect(Array.isArray(jsrCharacters)).toBe(true);
    expect(Array.isArray(jsrfCharacters)).toBe(true);
    expect(Array.isArray(characters)).toBe(true);
    expect(isValidJson(characters)).toBe(true);

    expect(jsrCharacters[0]).toHaveProperty('name')
    expect(jsrCharacters[0]).toHaveProperty('descriptions')
    expect(jsrCharacters[0]).toHaveProperty('heroImage')
    expect(jsrCharacters[0]).toHaveProperty('wikiPage')
  })

  test('GET /characters?sortBy=name&orderBy=desc', async () => {
    const req = {query: { sortBy: 'name', orderBy: 'desc' }};
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : 'asc';
    const jsrCharacters = await fetchJSRCharacters();
    const jsrfCharacters = await fetchJSRFCharacters();

    let characters = [];
    if (sortByValue) {
      const allCharacters = [...jsrCharacters, ...jsrfCharacters];
      characters = allCharacters.sort(sortObjects(sortByValue, sortOrder));
    } else {
      characters = [...jsrCharacters, ...jsrfCharacters];
    }
    expect(isValidJson(characters)).toBe(true);
  })

  test('GET /characters/jsr?limit=5', async () => {
    const req = {query: { limit: '5' }};
    const jsrCharacters = await fetchJSRCharacters(req);
    expect(Array.isArray(jsrCharacters)).toBe(true);
    expect(isValidJson(jsrCharacters)).toBe(true);
    expect(jsrCharacters).toHaveLength(5);
  })

  test('GET /characters/jsrf?limit=15', async () => {
    const req = {query: { limit: '15' }};
    const jsrCharacters = await fetchJSRCharacters(req);
    expect(Array.isArray(jsrCharacters)).toBe(true);
    expect(isValidJson(jsrCharacters)).toBe(true);
    expect(jsrCharacters).toHaveLength(15);
  })

  /* Unit/Mock Tests */
  test('GET /characters/jsr/:id', async () => {
    const testId = "643c6663092314f05f4da407";
    createMock(createJsrCharacter(testId));

    const result = await axios.get(`${baseUrl}/characters/jsr/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Slate");
    expect(result.data.age).toBe("19");
    expect(result.data.wikiPage).toBe("https://jetsetradio.fandom.com/wiki/Slate");
    expect(result.data.gallery).toHaveLength(4);
    expect(axios.get).toHaveBeenCalledTimes(1);
  })

  test('GET /characters/jsrf/:id', async () => {
    const testId = "643c6664092314f05f4da461";
    createMock(createJsrfCharacter(testId));

    const result = await axios.get(`${baseUrl}/characters/jsrf/${testId}`);
    expect(isValidJson(result.data)).toBe(true);
    expect(result.data.name).toBe("Love Shockers");
    expect(result.data.descriptions).toHaveLength(9);
    expect(result.data.gallery).toHaveLength(5);
    expect(result.data.wikiPage).toBe("https://jetsetradio.fandom.com/wiki/Love_Shockers");
    expect(result.data.heroImage).toBe("https://static.wikia.nocookie.net/jetsetradio/images/a/aa/Loveshockers.png/revision/latest?cb=20211011173518");
    expect(result.data.stats).toHaveProperty('stamina');
    expect(axios.get).toHaveBeenCalledTimes(1);
  })


  /* Helper Objects */
  const createJsrCharacter = (testId) => { return {
    "_id" : testId,
    "aliases" : [],
    "descriptions" : [ 
        "Slate is a very distinguishable character. His most prominent features are his tall stature (the official Jet Set Radio Guidebook states that he is 6 feet tall) and oblong nose (resembling the famous graffiti character Kilroy). He is virtually bald, save for what look like three brown braids that stick straight up from the very top of his head. He wears an orange jacket with a high collar that masks the lower half of his face, and goggles on his forehead. He has gray pants with lighter stripes, matching striped gloves, and blue skates with yellow wheels.", 
        "Slate's small graffiti. Illegible, warped-looking yellow shapes with purple borders.", 
        "Slate's large graffiti. Blue letters in perspective, with a lighter blue glow around them.", 
        "Slate's extra-large graffiti. Black and white stylized letters.", 
        "Slate's only appearance in this racing game is on an unlockable sticker, obtained from freezing an opponent with the ice powerup from at least 100 meters away."
    ],
    "graffitiTrademarks" : [],
    "gallery" : [ 
        {
            "photo" : "https://static.wikia.nocookie.net/jetsetradio/images/d/d8/GarageSlate.jpg/revision/latest/scale-to-width-down/185?cb=20160330170129",
            "description" : "Slate leaning against the pinball table in the Garage in Jet Set Radio HD."
        }, 
        {
            "photo" : "https://static.wikia.nocookie.net/jetsetradio/images/e/ed/StickerSlate.png/revision/latest/scale-to-width-down/185?cb=20160330170216",
            "description" : "Slate on a sticker in Sonic & All-Stars Racing Transformed."
        }, 
        {
            "photo" : "https://static.wikia.nocookie.net/jetsetradio/images/0/0e/Slate_logo_jsr.gif/revision/latest?cb=20211011165424",
            "description" : "Slate's logo in Jet Set Radio."
        }, 
        {
            "photo" : "https://static.wikia.nocookie.net/jetsetradio/images/8/87/Jsr_gba_manual5.jpg/revision/latest/scale-to-width-down/185?cb=20211011172103",
            "description" : "Slate's description for Jet Set Radio GBA."
        }
    ],
    "name" : "Slate",
    "gender" : "Male",
    "age" : "19",
    "height" : "185 cm (6 ft 0.8 in)",
    "trait" : "Aloof",
    "likes" : "Puzzles",
    "debut" : "Rival Challenge (JSR)",
    "heroImage" : "https://static.wikia.nocookie.net/jetsetradio/images/9/97/Slate.png/revision/latest?cb=20220104203110",
    "wikiPage" : "https://jetsetradio.fandom.com/wiki/Slate",
    "gameId" : "64285b7918c8a0231136dc5a",
    "createdAt" : "2023-04-16T21:19:32.652Z",
    "updatedAt" : "2023-04-16T21:19:34.870Z",
    "stats" : {
        "power" : "18",
        "technique" : "10",
        "graffiti" : "14"
    }
}}

  const createJsrfCharacter = (testId) => {return {
    "_id" : testId,
    "aliases" : [],
    "descriptions" : [ 
        "In Jet Set Radio, the Love Shockers appear without warning in the Shibuya-Cho district (which belongs to the GG's) and begin taking it over, prompting the GG's to rush around and retake their territory from the group. On their defeat in the first chapter of Jet Set Radio, one of the downed Love Shockers holds out a badge for the Golden Rhinos.", 
        "In Jet Set Radio Future, they first appear in chapter 5 as part of Death Ball at the future site of the Rokkaku Expo Stadium in the third round. Like the Doom Riders and The Immortals, the Love Shockers will speak to the GGs during the first couple moments of the round. The GGs end up winning against them, but not long before the Rokkaku Police enforcement barge into the stadium, thus halting the round and sending everyone into panic, supposedly making the Love Shockers run off to Hikage street.", 
        "Anytime during or after the pursuit of Clutch in chapter 7, the player can go back to Hikage street, which activates a Flag Battle. This Flag Battle is entirely optional and isn't downright required to be won in order to unlock their gang as long as the player has completed all Street Challenges and collected all Graffiti Souls prior to proceeding to chapter 5.", 
        "Love Shocker's small graffiti where it says \"Love Shock\".", 
        "Love Shocker's large graffiti.", 
        "Love Shocker's extra large graffiti. It features a broken heart with an arrow between it.", 
        "Successfully complete all Shibuya-Cho Story levels with a \"Jet\" rank to unlock the Love Shockers gang.", 
        "The Love Shockers can be unlocked as a playable character by earning a Jet ranking on all of the Test Runs on Hikage Street.", 
        "In Sonic & Sega All-Stars Racing, a Love Shocker makes a cameo appearance in all of the Jet Set Radio Future stages. They are shown on the sides and cheering as they watch the race."
    ],
    "gallery" : [ 
        {
            "photo" : "https://static.wikia.nocookie.net/jetsetradio/images/c/ce/Love_Shocker_Faces.png/revision/latest/scale-to-width-down/185?cb=20200512180522",
            "description" : "Textures used for the Love Shockers' heads and scarves."
        }, 
        {
            "photo" : "https://static.wikia.nocookie.net/jetsetradio/images/c/ca/Love_Shocker_Clothes.png/revision/latest/scale-to-width-down/185?cb=20200512180602",
            "description" : "Textures used for the Love Shockers' clothing."
        }, 
        {
            "photo" : "https://static.wikia.nocookie.net/jetsetradio/images/d/dd/Love_shockers_the_rude_awakening_art.png/revision/latest/scale-to-width-down/152?cb=20211010201427",
            "description" : "Art from the Jet Set Radio Documentary: The Rude Awakening."
        }, 
        {
            "photo" : "https://static.wikia.nocookie.net/jetsetradio/images/a/a4/Love_shockers_logo_jsr.gif/revision/latest?cb=20211011173049",
            "description" : "Love Shockers logo in Jet Set Radio."
        }, 
        {
            "photo" : "https://static.wikia.nocookie.net/jetsetradio/images/e/e6/Love_shockers_logo_jsrf.png/revision/latest/scale-to-width-down/185?cb=20211012124811",
            "description" : "Love Shockers logo in Jet Set Radio Future."
        }
    ],
    "name" : "Love Shockers",
    "heroImage" : "https://static.wikia.nocookie.net/jetsetradio/images/a/aa/Loveshockers.png/revision/latest?cb=20211011173518",
    "wikiPage" : "https://jetsetradio.fandom.com/wiki/Love_Shockers",
    "gameId" : "64285b7918c8a0231136dc5d",
    "createdAt" : "2023-04-16T21:19:33.440Z",
    "updatedAt" : "2023-04-16T21:19:39.630Z",
    "stats" : {
        "stamina" : "7",
        "gStamina" : "7",
        "sprayCans" : "30",
        "graffiti" : "16",
        "acceleration" : "22",
        "cornering" : "25",
        "grind" : "16"
    }
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