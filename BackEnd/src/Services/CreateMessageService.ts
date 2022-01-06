import prismaClient from "../Prisma";

class CreateMessageService {
  async execute(text: string, user_id: string) {
   

    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });

    console.log(message)

    return message;
  }
}

export { CreateMessageService };
