import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../Keys/tokenSecret";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      errorCode: "token.invalid",
    });
  }
  //Bearer 89216121n12k124k1k671i1h
  const [, token] = authToken.split(" "); //Separando por espaço terei duas string, irei ignorar o Bearer e pegar somente o token!
  try {
    const { sub } = verify(token, secret) as IPayload;
    req.user_id = sub;
    console.log(req.user_id)
    return next();
  } catch (error) {
    return res.status(401).json({ errorCode: "token.expired" });
  }
}
