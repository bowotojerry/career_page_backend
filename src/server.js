require("dotenv").config();
const app = require("./app"); 
const logger = require("./utils/logger");

const APP_PORT = process.env.APP_PORT || 5000;

const server = app.listen(APP_PORT, () => {
  logger.info(`App is running on port:${APP_PORT}`);
});
