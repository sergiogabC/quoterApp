import express from "express";

import { qRoutes } from "./routes/qRoutes.js";

const PORT = process.env.PORT ?? 1234;
const app = express();

app.use(express.static("view"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use("/", qRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
