import express from "express";
import mongoose from "mongoose";

import authRouter from "./routes/auth.routes";
import fileRouter from "./routes/file.routes";
import CORS from "./middlewares/CORS";

const app = express();

app.use(CORS);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/files", fileRouter);

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
