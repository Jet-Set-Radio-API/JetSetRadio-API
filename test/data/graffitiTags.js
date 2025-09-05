export const createJsrTag = (testId) => {
  return {
    _id: testId,
    number: "0018",
    tagName: "SARU",
    tagSubName: "SARU - A Head of the Crowd",
    size: "XL",
    gameId: "642f773924b4bca91d5a6c54",
    imageUrl:
      "https://storage.googleapis.com/greg-kennedy.com/jsr/U_GRF.0018.png",
    createdAt: "2023-04-07T01:52:11.751Z",
    updatedAt: "2023-04-07T01:52:11.751Z",
  };
};

export const createJsrfTag = (testId) => {
  return {
    _id: testId,
    number: "No. 025",
    tagName: "Poison Jam",
    size: "SS",
    wikiImageUrl:
      "https://static.wikia.nocookie.net/jetsetradio/images/e/e8/No._025.png/revision/latest/scale-to-width-down/80?cb=20170220220832",
    imageUrl:
      "https://storage.googleapis.com/jetsetradio-api/jsrf/graffiti-tags/025.png",
    gameId: "64285b7918c8a0231136dc5d",
    createdAt: "2023-04-08T04:16:16.114Z",
    updatedAt: "2023-04-24T04:23:33.147Z",
    graffitiSoulLocation:
      "Test Runs (Unlock Poison Jam as a playable character)",
    locations: [
      {
        name: "Tokyo Underground Sewage Facility",
        id: "6445cb9dd85986264951f134",
      },
      {
        name: "Bottom Point of Sewage Facility",
        id: "6445cb9ed85986264951f13b",
      },
    ],
  };
};
