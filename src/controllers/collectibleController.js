import {performBRCAction} from "../config/db.js";
import {Actions} from "../config/dbActions.js";
import LOGGER from "../utils/logger.js";
import {sortObjects} from "../utils/utility.js";

const Collectible = "Collectible";

export const getAllCollectibles = async (req, res) => {
  try {
    const sortByValue = req?.query?.sortBy ? req?.query?.sortBy : undefined;
    const sortOrder = req?.query?.orderBy ? req?.query?.orderBy : "asc";
    const brcCollectibles = await fetchBRCCollectibles(req);
    if (sortByValue) {
      const collectibles = [...brcCollectibles];
      return res.send(collectibles.sort(sortObjects(sortByValue, sortOrder)));
    }
    res.send([...brcCollectibles]);
  } catch (err) {
    LOGGER.error(`Could not fetch ALL Collectibles \n${err}`);
  }
};

export const getBRCCollectibles = async (req, res) => {
  try {
    res.send(await fetchBRCTags(req));
  } catch (err) {
    LOGGER.error(`Could not fetch BRC Collectible \n${err}`);
  }
};

export const getBRCCollectibleById = async (req, res) => {
  try {
    const tagId = req?.params?.id;
    res.send(await performBRCAction(Actions.fetchById, Collectible, tagId));
  } catch (err) {
    LOGGER.error(`Could not fetch BRC Collectible With ID: ${tagId} \n${err}`);
  }
};

export const fetchBRCCollectibles = async (req) => {
  if (req?.query) {
    return await performBRCAction(
      Actions.fetchWithQuery,
      Collectible,
      null,
      req?.query
    );
  }
  return await performBRCAction(Actions.fetchAll, Collectible, null);
};
