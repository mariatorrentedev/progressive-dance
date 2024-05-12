"use-client";
import * as React from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function useUserData() {
  const { isLoading: isAuthLoading, isAuthenticated } = useConvexAuth();

  // Set the currently authenticated user.
  const [user, setUser] = React.useState(null);

  const saveUserMutation = useMutation(api.users.save);

  React.useEffect(() => {
    if (isAuthLoading) return;
    /**
     * Save the user in the convex db, or get the existing.
     */
    async function createOrUpdateUser() {
      try {
        const savedUser = await saveUserMutation(); // Call mutation function directly
        setUser(savedUser);
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }
    if (isAuthenticated) {
      createOrUpdateUser();
    } else {
      setUser(null);
    }
  }, [isAuthenticated, isAuthLoading]);

  const userData = React.useMemo(
    () => ({
      user: user || null,
      isLoading: user === undefined || isAuthLoading,
    }),
    [user, isAuthLoading]
  );
  return userData;
}
