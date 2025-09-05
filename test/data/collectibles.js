export const createBrcCollectible = (testId, type) => {
  return {
    _id: testId,
    name: "Spring",
    key: "Spring-Red",
    description: "",
    type: "Outfit",
    character: {
      name: "Red",
      id: "68b8db67cec5d6b573cf6255",
    },
    unlockedByDefault: true,
    gallery: [
      {
        name: "asset",
        image:
          "https://static.wikia.nocookie.net/bomb-rush-cyberfunk/images/a/a3/Red_Spring_Ref.png/revision/latest/scale-to-width-down/1000?cb=20240331024105",
      },
    ],
    gameId: "68b8db67cec5d6b573cf624c",
  };
};
