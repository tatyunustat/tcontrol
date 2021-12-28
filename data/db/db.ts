import { Dialect, Sequelize } from "sequelize";
import Logger from "../../helpers/logger/Logger";
const DATABASE_NAME: string = "trendyol_case";
const USER_NAME: string = "root";
const HOST_NAME: string = "mysql_image";
const DATABASE: Dialect = "mysql";

export const sequelize: Sequelize = new Sequelize(
  DATABASE_NAME,
  USER_NAME,
  "admin",
  {
    host: HOST_NAME,
    dialect: DATABASE,
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully..");
  })
  .catch((err) => {
    Logger.error(JSON.stringify(err));
    console.error("Unable to connect to the database:", err);
  });
