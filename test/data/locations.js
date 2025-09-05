export const createJsrLevel = (testId) => {
  return {
    _id: testId,
    name: "Noise Reduction",
    description:
      "This is a tag level. You need to tag each member of the Noise Tanks 10 times in order to beat this level.",
    location: {
      name: "Benten-cho",
      id: "6445cb96d85986264951f0ae",
    },
    bossLevel: true,
    chapter: "1",
    createdAt: "2023-04-24T00:21:46.134Z",
    updatedAt: "2023-04-24T00:21:46.134Z",
  };
};

export const createJsrLocation = (testId) => {
  return {
    _id: testId,
    levels: [],
    subLocations: [
      "Subway",
      "Train Line",
      "Chinatown",
      "Highway Zero",
      "Geckijomae",
      "Business District",
    ],
    unlockableCharacters: [
      {
        name: "Noise Tanks",
        id: "643c71bb8cabe0dcede86902",
      },
      {
        name: "Mew",
        id: "643c71a58cabe0dcede868e5",
      },
      {
        name: "Cube",
        id: "643c71c08cabe0dcede86917",
      },
      {
        name: "Yo-Yo",
        id: "643c71c38cabe0dcede86933",
      },
    ],
    name: "Benten-cho",
    description:
      "Benten-cho is the home turf of the Noise Tanks, a rival tech-savvy gang of the GG's.",
    gameId: "64285b7918c8a0231136dc5a",
    secretCharacter: {
      name: "Noise Tanks",
      id: "643c71bb8cabe0dcede86902",
    },
    createdAt: "2023-04-24T00:21:43.098Z",
    updatedAt: "2023-04-24T00:21:43.098Z",
  };
};

export const createJsrfLocation = (testId) => {
  return {
    _id: testId,
    unlockableCharacters: [
      {
        name: "Beat",
        id: "643c71a48cabe0dcede868de",
      },
      {
        name: "Doom Riders",
        id: "643c719b8cabe0dcede868c6",
      },
    ],
    adjacentLocations: [
      {
        name: "The Garage",
        id: "6445cb9bd85986264951f10f",
      },
      {
        name: "Shibuya Terminal",
        id: "6445cb9cd85986264951f11a",
      },
    ],
    name: "Dogenzaka Hill",
    description:
      "Dogenzaka Hill is the first level in the game after completing the initial tutorial at the Garage.",
    gameId: "64285b7918c8a0231136dc5d",
    hasMixtape: true,
    imageUrl:
      "https://storage.googleapis.com/jetsetradio-api/jsrf/locations/dogenzaka-hill.webp",
    secretCharacter: {
      name: "Doom Riders",
      id: "643c719b8cabe0dcede868c6",
    },
    createdAt: "2023-04-24T00:21:48.297Z",
    updatedAt: "2023-04-24T00:21:53.824Z",
  };
};

export const createBRCLocation = (testId) => {
  return {
    _id: testId,
    name: "Versum Hill",
    description:
      "One of New Amsterdam’s five boroughs; rooftop and alley routes.",
    unlockableCharacters: [{name: "Rave"}, {name: "Frank"}, {name: "Rietveld"}],
    adjacentLocations: [
      {
        name: "Millennium Square",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/d/dd/VersumHillToMilleniumSquare.jpg/revision/latest/scale-to-width-down/1000?cb=20240811221634",
        unlockTrigger: "",
      },
      {
        name: "Hideout",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/8/80/VersumHillToHideout.jpg/revision/latest/scale-to-width-down/1000?cb=20240811221626",
        unlockTrigger: "",
      },
    ],
    cypherSpots: [
      {
        location: "In the below-ground path at the bottom of the main area.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/f/fb/CypherSpotVersumHill1.png/revision/latest/scale-to-width-down/1000?cb=20240427040816",
      },
      {
        location:
          "In one of the corners of the main area, specifically opposite of the stairs leading up to the basketball court.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/a/a3/CypherSpotVersumHill2.png/revision/latest/scale-to-width-down/1000?cb=20240427040852",
      },
      {
        location:
          "On a slightly raised section of the ground near the borough's taxi stop.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/b/bd/CypherSpotVersumHill3.png/revision/latest/scale-to-width-down/1000?cb=20240427040923",
      },
    ],
    imageUrl:
      "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/1/12/VersumHill1.jpg/revision/latest/scale-to-width-down/1000?cb=20240811205909",
    collectablesCount: "22",
    maxRep: "282",
    graffitiCollectables: [
      "Vom'b",
      "Zona Leste",
      "Pico Pow",
      "JD Vila Formosa",
      "Messenger Mural",
      "Buttercup",
      "Gamex UPA ABL",
      "Headphones On Helmet On",
    ],
    cds: [
      "Precious Thing",
      "Operator",
      "GET ENUF",
      "Bounce Upon A Time",
      "Next To Me",
    ],
    outfits: [
      {
        character: "Red",
        season: "Autumn",
      },
      {
        character: "Red",
        season: "Winter",
      },
      {
        character: "Rave",
        season: "Autumn",
      },
    ],
    moveStyles: [
      "Laser Accuracy",
      "Death Boogie",
      "Sylk",
      "Taiga",
      "Just Swell",
      "Strawberry Missiles",
    ],
    mapCard:
      "The map card for Versum Hill is found between two billboards, over the street that leads into Millennium Square. You can either use the billboards to wallride to it, or otherwise just jump off the rail near it. This is only available after beating the Franks.",
    taxiStop:
      "Versum Hill's taxi stop is located in the main section of this area. Facing the stairs leading up to the basketball court, the stop is on the raised section to the left of this, past a set of shorter stairs.",
    outhouses: [
      {
        location:
          "In a corner of the below-ground path, in the main area of the borough.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/d/d8/OuthouseVersumHill1.png/revision/latest/scale-to-width-down/1000?cb=20240426215910",
      },
      {
        location:
          "At the back of the main area, between the stairs leading to the borough's taxi stop and the stairs leading to the basketball court.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/f/f8/OuthouseVersumHill2.png/revision/latest/scale-to-width-down/1000?cb=20240426220048",
      },
      {
        location:
          "In the underground bazaar. When entering the bazaar, this outhouse is along the right side.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/1/1e/OuthouseVersumHill3.png/revision/latest/scale-to-width-down/1000?cb=20240426220138",
      },
    ],
    roboPosts: [
      {
        location:
          "The first booth can be found along the main road between the entrances to the hideout and Millennium Square. This has 3 mascots, and the prize is the Buttercup graffiti design.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/0/05/RoboPostVersumHill1.png/revision/latest/scale-to-width-down/1000?cb=20240725223942",
      },
      {
        location:
          "The second booth is in the main area of Versum Hill, right near the taxi stop for this area. This has 4 mascots, scattered across this area, and the prize is the Bounce Upon A Time CD.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/6/6b/RoboPostVersumHill2.png/revision/latest/scale-to-width-down/1000?cb=20240725224019",
      },
      {
        location:
          "The last booth is near the basketball court at the top of the hill. This has 6 mascots, all along this area, and the prize is the Operator CD.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/e/e1/RoboPostVersumHill3.png/revision/latest/scale-to-width-down/1000?cb=20240725224437",
      },
    ],
    isBorough: true,
    poloLocations: [
      {
        location:
          "A giant Polo can be found sitting on one of the buildings near the entrance back to the hideout.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/c/c0/PoloVersumHill1.png/revision/latest/scale-to-width-down/1000?cb=20240429182207",
      },
      {
        location:
          "Another Polo can be found behind some glass, further down the road from the big Polo. You have to use your boostpack to break through and get close enough for the photo.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/6/6e/PoloVersumHill2.png/revision/latest/scale-to-width-down/1000?cb=20240429182538",
      },
      {
        location:
          "The last Polo in Versum Hill is in the underground bazaar. Towards the back of the bazaar, near the giant snake statues, there is an opening near the floor. Slide into it to reach a hidden room that contains the Polo.",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/4/40/PoloVersumHill3_1.png/revision/latest/scale-to-width-down/1000?cb=20240429182609",
      },
    ],
    gallery: [
      "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/9/93/KeyArtLogo.png/revision/latest/scale-to-width-down/185?cb=20240522230040",
      "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/c/c1/Versum_hill_grind.jpg/revision/latest/scale-to-width-down/185?cb=20240712161124",
      "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/9/91/VersumHillMapMenu.jpg/revision/latest/scale-to-width-down/185?cb=20240811224028",
      "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/2/2c/VersumHill2.jpg/revision/latest/scale-to-width-down/185?cb=20240811212605",
      "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/d/da/VersumHill3.jpg/revision/latest/scale-to-width-down/185?cb=20240811212611",
    ],
  };
};
