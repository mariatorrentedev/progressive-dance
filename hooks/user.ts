"use-client";
import * as React from "react";
import { useConvexAuth } from "convex/react";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";

// TODO: refactor to use next-auth0 when implementing convex integration.
export default function useUserData() {
  const { isLoading: isAuthLoading, isAuthenticated } = useConvexAuth();

  // Set the currently authenticated user.
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (isAuthLoading) return;
    /**
     * Save the user in the convex db, or get the existing.
     */
    async function createOrUpdateUser() {
      return await useMutation(api.users.save());
    }
    if (isAuthenticated) {
      createOrUpdateUser()
        .then((savedUser) => setUser(savedUser))
        .catch(console.error);
    } else {
      setUser(null);
    }
  }, [isAuthenticated, isAuthLoading]);

  const userData = React.useMemo(
    () => ({
      value: user || null,
      isLoading: user === undefined || isAuthLoading,
    }),
    [user, isAuthLoading]
  );
  return userData;
}
