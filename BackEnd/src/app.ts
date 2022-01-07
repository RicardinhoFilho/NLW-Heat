import "dotenv/config";
import express from "express";
import {Server} from "socket.io";
import { GITHUB_CLIENT_ID } from "./Keys/gitHub";
import http from "http";
import { router } from "./routes";
import cors from "cors";

const app = express();
app.use(cors());
const  serverHttp = http.createServer(app);

const io = new Server(serverHttp,{
  cors:{
    origin:"*"
  }
});

io.on("connection", socket=>{
  console.log(`Usuário conectado no socket ${socket.id}`);
});

app.use(express.json());

app.use(router);

app.get("/github", (req, res) => {
  console.log(process.env.GITHUB_CLIENT_ID);
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
  );
});

app.get("/singin/callback", (req, res) => {
  const { code } = req.query;
  console.log(code);
  return res.json(code);
});

export {serverHttp, io}