import type { PropsWithChildren } from "react";
import type { BackendEnvironment } from "./types";
import * as React from "react";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";
import { useAuth0 } from "@auth0/auth0-react";

export const BackendContext = React.createContext<BackendEnvironment | null>(
  null
);

export default function BackendProvider({ children }: PropsWithChildren) {
  const { loginWithRedirect: login, logout: auth0Logout } = useAuth0();

  const logout = React.useCallback(
    () => auth0Logout({ logoutParams: { returnTo: window.location.origin } }),
    [auth0Logout]
  );

  const saveUser = useMutation(api.users.save);

  const backend = React.useMemo<BackendEnvironment>(
    () => ({
      authentication: {
        login,
        logout,
        saveUser,
      },
    }),
    [login, logout, saveUser]
  );

  return (
    <BackendContext.Provider value={backend}>
      {children}
    </BackendContext.Provider>
  );
}
