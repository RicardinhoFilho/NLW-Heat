import {Router} from "express";
import { AuthenticateUserController } from "./Controller/AuthenticateUserController";
import { CreateMessageController } from "./Controller/CreateMessageController";
import { ensureAuthenticated } from "./Middlewares/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuthenticated,new CreateMessageController().handle);

export {router};