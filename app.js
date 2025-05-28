import express, { json } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ?? 1234;
const app = express();

app.use(express.static("view"));

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "view/indextp.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
