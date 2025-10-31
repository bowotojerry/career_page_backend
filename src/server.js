require("dotenv").config();
const app = require("./app");  // Fix the path to be relative to current directory
const logger = require("./utils/logger");

const APP_PORT = process.env.APP_PORT || 5000;

const server = app.listen(APP_PORT, () => {
  logger.info(`App is running on port:${APP_PORT}`);
});
