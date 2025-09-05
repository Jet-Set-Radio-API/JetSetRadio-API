import dotenv from "dotenv";
dotenv.config();

const Constants = {
  CORE_DB: process.env.CORE_DB,
  JSR_DB: process.env.JSR_DB,
  JSRF_DB: process.env.JSRF_DB,
  BRC_DB: process.env.BRC_DB,
  gameMap: {
    jsr: process.env.JSR_DB,
    jsrf: process.env.JSRF_DB,
    brc: process.env.BRC_DB,
  },
};

export default Constants;
