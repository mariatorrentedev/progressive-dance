import * as React from "react";
import { useConvexAuth } from "convex/react";
import { BackendContext } from "../context/backend";
import type { BackendEnvironment } from "../context/types";
import type { User } from "../types/user";

export default function useUserData() {
  const backend = React.useContext<BackendEnvironment | null>(BackendContext);
  const { isLoading: isAuthLoading, isAuthenticated } = useConvexAuth();

  // Get the currently authenticated user.
  const [user, setUser] = React.useState<User | null>();

  React.useEffect(() => {
    if (isAuthLoading) return;
    /**
     * Save the user in the convex db, or get the existing.
     */
    async function createOrUpdateUser() {
      return await backend?.authentication.saveUser();
    }
    if (isAuthenticated) {
      createOrUpdateUser()
        .then((savedUser) => setUser(savedUser as User))
        .catch(console.error);
    } else {
      setUser(null);
    }
  }, [backend, isAuthenticated, isAuthLoading]);

  const userData = React.useMemo(
    () => ({
      value: user || null,
      isLoading: user === undefined || isAuthLoading,
    }),
    [user, isAuthLoading]
  );
  return userData;
}
