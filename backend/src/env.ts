import dotenv from 'dotenv';
dotenv.config();

export const ENV_NAME = process.env.ENV_NAME;
export const PORT = process.env.PORT;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
export const MONGO_URL = process.env.MONGO_URL;
