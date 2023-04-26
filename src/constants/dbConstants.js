import dotenv from 'dotenv';
dotenv.config();

const Constants = {
  CORE_DB: process.env.CORE_DB,
  JSR_DB: process.env.JSR_DB,
  JSRF_DB: process.env.JSRF_DB,
}

export default Constants;