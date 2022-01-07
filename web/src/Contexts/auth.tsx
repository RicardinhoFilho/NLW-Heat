import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../Services/api";

const AuthContext = createContext({} as AuthContextData);

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

type AuthProvider = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut:()=>void;
};

export function AuthPorvider(props: AuthProvider) {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=50471e7648786e160d33&redirect_uri=http://localhost:3000`;
  const [user, setUser] = useState<User | null>(null);
  

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });


    const { token, user } = response.data;
    localStorage.setItem("@doWHile:token", token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }


  function signOut() {
    setUser(null);
    localStorage.removeItem("@doWHile:token");
  }

  useEffect(() => {
    const token = localStorage.getItem("@doWHile:token");
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");
      console.log({ urlWithoutCode, githubCode });
      window.history.pushState({}, "", urlWithoutCode);
      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user ,signOut}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
