import {Router} from "express";
import { AuthenticateUserController } from "./Controller/AuthenticateUserController";
import { CreateMessageController } from "./Controller/CreateMessageController";
import { GetLast3MessagesController } from "./Controller/GetLast3MessagesController";
import { ProfileUserProfileController } from "./Controller/ProfileUserProfileController";
import { ensureAuthenticated } from "./Middlewares/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuthenticated,new CreateMessageController().handle);

router.get("/messages/last3",new GetLast3MessagesController().handle);

router.get("/profile", ensureAuthenticated, new ProfileUserProfileController().handle);

export {router};