import { Request, Response } from "express";
import { CreateMessageService } from "../Services/CreateMessageService";
class CreateMessageController {
  async handle(req: Request, res: Response) {
    try {
      const { message } = req.body;
      const {user_id} = req;
      const createMessageService = await new CreateMessageService();
      const response = await createMessageService.execute(message, user_id)
      console.log(response)
        return res.status(201).json(response);

    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export { CreateMessageController };
