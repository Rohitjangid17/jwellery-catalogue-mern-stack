import "./src/config/env.config.js";

import app from "./src/app.js";
import connectDatabase from "./src/config/database.config.js";

const PORT = process.env.PORT || 5000;

connectDatabase();

export default app;
