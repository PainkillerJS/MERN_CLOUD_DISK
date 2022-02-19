import express from "express";
import fileLoader from "express-fileupload";
import mongoose from "mongoose";

import authRouter from "./routes/auth.routes";
import fileRouter from "./routes/file.routes";
import CORS from "./middlewares/CORS";

const app = express();

app.use(CORS);
app.use(fileLoader({}));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const PORT = process.env.PORT || 5000;
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
