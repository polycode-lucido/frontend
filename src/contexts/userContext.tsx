import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import React from "react";
import User from "../models/user.model";

export interface UserContextData {
  user: User | undefined;
  tokens: { access?: string; refresh: string } | undefined;
  setTokens: (tokens: UserContextData["tokens"]) => void;
}

export const UserContext = React.createContext<UserContextData>({
  user: undefined,
  tokens: undefined,
  setTokens: () => {return},
});

const useAuthContext = () => {
  const [refresh, setRefresh] = useLocalStorage("refreshToken", "");
  const [access, setAccess] = useLocalStorage("accessToken", "");
  const [tokens, setTokens] = React.useState<UserContextData["tokens"]>({
    access,
    refresh,
  });
  const [user, setUser] = React.useState<UserContextData["user"] | undefined>(
    undefined
  );

  const fetchNewAccessToken = async () => {
    const access = await axios.get(`http://localhost:3000/auth/token`, {
      headers: {
        Authorization: `Bearer ${refresh}`,
      },
    });
    setAccess(access.data.accessToken);
    setTokens({ access: access.data.accessToken, refresh });
  };

  React.useEffect(() => {
    (async () => {
      const exp = timeBeforeExpiration(access);
      if ((refresh && !access) || (refresh && exp && exp < 0)) {
        await fetchNewAccessToken();
      }
      else if ( user !== undefined ) {
        setUser(undefined);
      }
    })();
  }, [refresh]);

  React.useEffect(() => {
    (async () => {
      if (access) {
        const user = await axios.get(`http://localhost:3000/user/me`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        const exp = timeBeforeExpiration(access);
        setTokens({ access, refresh });
        setUser(user.data);
        if (exp) {
          const clear = setTimeout(fetchNewAccessToken, exp * 1000);
          return () => clearTimeout(clear);
        }
      }
    })();
  }, [access]);

  const setTokenWrapper = (tokens: UserContextData["tokens"]) => {
    if (!tokens) {
      window.localStorage.removeItem("refreshToken");
      window.localStorage.removeItem("accessToken");
      setTokens(undefined);
      setUser(undefined);
    }
    else {
      setTokens(tokens);
      if ( tokens.access )
        setAccess(tokens.access);
      setRefresh(tokens.refresh);
    }
  };

  return { user, tokens, setTokens: setTokenWrapper } as const;
};

export default function UserContextProvider(props: {
  children: React.ReactNode;
}) {
  const context = useAuthContext();
  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = React.useState<string>(() => {
    const item = window.localStorage.getItem(key);
    return item ? item : initialValue;
  });
  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue] as const;
};

const timeBeforeExpiration = (token: string) => {
  if (!token) return null;
  const decodedToken = jwtDecode<JwtPayload>(token);
  if (decodedToken.exp) {
    return decodedToken.exp - Math.floor(Date.now() / 1000);
  }
};
