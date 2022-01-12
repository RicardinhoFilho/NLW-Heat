import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSessions from "expo-auth-session";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
const TOKEN_STORAGE = "@nlwheat:token";
const USER_STORAGE = "@nlwheat:user";
export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIng, setIsSigningIng] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function signIn() {
    try {
      setIsSigningIng(true);
      const ID = "50471e7648786e160d33";
      const SCOPE = "read:user";
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${ID}&scope=${SCOPE}`;

      const { params } = (await AuthSessions.startAsync({
        authUrl,
      })) as AuthorizationResponse;
      if (params && params.code) {
        const authResponse = await api.post("/authenticate", {
          code: params.code,
        });
        const { user, token } = authResponse.data as AuthResponde;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));

        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }

    setIsSigningIng(false);
  }

  async function signOut() {
    await AsyncStorage.removeItem(TOKEN_STORAGE);
    await AsyncStorage.removeItem(USER_STORAGE);
    setUser(null);
  }

  

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        setUser(JSON.parse(userStorage));
      }
    }
    loadUserStorageData();
    setIsSigningIng(false);
  }, []);

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
