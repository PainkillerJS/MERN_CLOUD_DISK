import express from "express";

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("qq12333345");
});

app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}`);
});
