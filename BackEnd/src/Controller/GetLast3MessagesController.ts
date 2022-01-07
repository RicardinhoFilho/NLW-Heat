import { Request, Response } from "express";
import { GetLast3MessagesService } from "../Services/GetLast3MessagesService";
class GetLast3MessagesController {
  async handle(req: Request, res: Response) {
    try {
     
        const service = new GetLast3MessagesService();
        const result = await service.execute();

        return res.status(200).json(result);

    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export { GetLast3MessagesController };
