export const createGame = (testId) => {
  return {
    _id: testId,
    aliases: [],
    developers: ["Smilebit"],
    publishers: ["Sega"],
    platforms: ["Xbox"],
    releaseDates: [
      {country: "JP", date: "February 22, 2002"},
      {country: "US", date: "February 25, 2002"},
      {country: "EU", date: "March 24, 2002"},
    ],
    assets: [
      {
        country: "US",
        images: {
          frontCover:
            "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/us/front-cover.webp",
          backCover:
            "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/us/back-cover.webp",
          disc: "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/us/disc.webp",
        },
      },
      {
        country: "JP",
        images: {
          frontCover:
            "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/jp/front-cover.webp",
          backCover:
            "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/jp/back-cover.webp",
          disc: "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/jp/disc.webp",
        },
      },
      {
        country: "EU",
        images: {
          frontCover:
            "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/eu/front-cover.webp",
          backCover:
            "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/eu/back-cover.webp",
          disc: "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/eu/disc.webp",
        },
      },
      {
        country: "DE",
        images: {
          frontCover:
            "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/de/front-cover.webp",
          backCover:
            "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/de/back-cover.webp",
          disc: "https://storage.googleapis.com/jetsetradio-api-core/images/games/jsrf/de/disc.webp",
        },
      },
    ],
    name: "Jet Set Radio Future",
    intro:
      "Jet Set Radio Future (JSRF) is the sequel to Jet Set Radio (also known as Jet Grind Radio in America), and a sort of re-imagining of that game.",
    description:
      "Jet Set Radio Future is set in Tokyo-To, Japan, in 2024, where a street gang known as the GG's is fighting for control over the streets against rival gangs, as well as the large and powerful corporation known as the Rokkaku Group, led by Gouji Rokkaku. The Rokkaku Group is attempting to seize control of Tokyo by force and convert it into a totalitarian police state.",
    genre: "Platform/Sports",
    createdAt: "2023-04-07T01:51:53.511Z",
    updatedAt: "2023-04-07T01:51:53.511Z",
  };
};
