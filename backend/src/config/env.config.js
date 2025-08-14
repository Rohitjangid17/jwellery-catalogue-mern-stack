import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const mode = process.env.NODE_ENV || "development";
const envPath = path.resolve(process.cwd(), `.env.${mode}`);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}
