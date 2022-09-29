import * as dotEnv from "dotenv";
dotEnv.config();

import app from "./server";

app.listen(5000, () => {
  console.log("Server is running on http://localhost/5000");
});
