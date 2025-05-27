const express = require("express");

const PORT = process.env.PORT ?? 1234;
const app = express();

app.get("/", (req, res) => {
  console.log(__dirname);
  res.send("hola");
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
