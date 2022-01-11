import express from "express";
import mongoose from "mongoose";

import router from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use("/auth", router);

const PORT = process.env.PORT;
const CONNECT = process.env.CONNECT || "";

async function startServer() {
  try {
    await mongoose.connect(CONNECT);
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startServer();
