import axios from "axios";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../Keys/gitHub";
import prismaClient from "../Prisma";
import { sign } from "jsonwebtoken";
import { secret } from "../Keys/tokenSecret";
/*
    Receber code(string)
    Recuperar o acces_token no github
    Verificar se o usuario existe no DB
    --SIM = Gerar Token
    --Não = Criar Usuário e Gerar Token
    Retornar o token com dados do usuario logado

*/

interface IAccesTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccesTokenResponse>(
      url,
      null,
      {
        params: {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );
    // console.log(accessTokenResponse)

    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      secret,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return {token,user};
  }
}

export { AuthenticateUserService };
