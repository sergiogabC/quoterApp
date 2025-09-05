import express from "express";

import { qRoutes } from "./routes/qRoutes.js";

const PORT = process.env.PORT ?? 3000;
const HOST = "0.0.0.0";
const app = express();

app.use(express.static("views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use("/", qRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server listening on port http://${HOST}:${PORT}`);
});
