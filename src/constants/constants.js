import dotenv from 'dotenv';
dotenv.config();

const Constants = {
  Databases: {
    CORE_DB: process.env.CORE_DB,
    JSR_DB: process.env.JSR_DB,
    JSRF_DB: process.env.JSRF_DB,
  },
  Collections: {
    Admin: 'Admin',
    CronJob: 'CronJob',
    Game: 'Game',
    GraffitiTag: 'GraffitiTag',
    Song: 'Song'
  }
}

export default Constants;