import "dotenv/config";
import express, { response } from "express";
import { GITHUB_CLIENT_ID } from "./Keys/gitHub";
import { router } from "./routes";

const app = express();
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

app.listen(4000, () => console.log("Serve is running in pot 4000"));
