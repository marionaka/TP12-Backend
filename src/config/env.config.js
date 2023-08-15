import dotenv from "dotenv";
import program from "./commander.config.js";

const port = program.opts().p;
const persistence = program.opts().pers;
const environment = program.opts().env;

dotenv.config({ path: `${process.cwd()}/.env/.env` });

export const appConfig = {
  port: port,
  persistence: persistence,
  environment: environment,
  mongoUrl: process.env.MONGO_URL,
  mongoDbName: process.env.MONGO_DBNAME,
  sessionSecret: process.env.SESS_SECRET,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  githubClient: process.env.GITHUB_CLIENT,
  githubSecret: process.env.GITHUB_SECRET,
  gmailUser: process.env.GMAIL_USER,
  gmailAppPass: process.env.GMAIL_APP_PASS,
};
