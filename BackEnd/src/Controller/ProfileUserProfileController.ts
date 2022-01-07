import { Request, Response } from "express";
import { ProfileUserService } from "../Services/ProfileUserService";
class ProfileUserProfileController {
  async handle(req: Request, res: Response) {
    try {
        const {user_id} = req;
        const service = new ProfileUserService();
        const result = await service.execute(user_id);

        return res.status(200).json(result);

    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export { ProfileUserProfileController };
