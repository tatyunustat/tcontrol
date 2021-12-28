import { ConvertedLink } from "../models/ConvertedLink";
import * as dotenv from "dotenv";
import * as path from "path";
import Logger from "../../helpers/logger/Logger"
dotenv.config({ path: path.join(__dirname + "../config/env/config.env") });

ConvertedLink.sync({ force: true })
  .then((result) =>
    console.log("############# seeding completed #################", result)
  )
  .catch((err) => {
    console.log(err);
    Logger.error(JSON.stringify(err));
  });
