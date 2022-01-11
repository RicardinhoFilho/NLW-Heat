import React, { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSessions from "expo-auth-session";

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  ĩd: string;
  avatar_url: string;
  name: string;
  login: string;
};

type AuthResponde = {
  token: string;
  user: User;
};

type AuthorizationResponse = {
  params: {
    code?: string;
  };
};

type AuthContextData = {
  user: User | null;
  isSigningIng: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIng, setIsSigningIng] = useState(false);
  const [user, setUser] = useState<User | null>(null);


  async function signIn() {
    const ID = "50471e7648786e160d33";
    const SCOPE = "read:user";
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${ID}&scope=${SCOPE}`;

    const {params} = await AuthSessions.startAsync({authUrl}) as AuthorizationResponse;
    console.log(params)

  }

  async function signOut() {}

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isSigningIng,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
