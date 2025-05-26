import express, { json } from "express";
import path, { dirname } from "path";

const PORT = process.env.PORT ?? 1234;
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "view/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
