import * as dotEnv from "dotenv";
dotEnv.config();
import config from "./config";

import app from "./server";

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost/${config.port}`);
});
