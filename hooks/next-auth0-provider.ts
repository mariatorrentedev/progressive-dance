import * as React from "react";

type ForceRefreshToken = { forceRefreshToken: boolean };

/**
 * Since there is no integration using the `next/auth0` as with `react/auth0`,
 * we will need to provide the state of our Authentication with convex.
 *
 * See @https://docs.convex.dev/auth/advanced/custom-auth
 *
 */
export default function useNextAuth0Provider() {
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchAccessToken: ({
    forceRefreshToken,
  }: ForceRefreshToken) => Promise<string | null> = React.useCallback(
    async ({ forceRefreshToken }: ForceRefreshToken) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/session", {
          method: "GET",
          cache: forceRefreshToken ? "force-cache" : "default",
        });
        const data = await response.json();

        if (response.ok) {
          return data.idToken;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return React.useMemo(
    () => ({
      isLoading,
      isAuthenticated: !!fetchAccessToken,
      fetchAccessToken,
    }),
    [fetchAccessToken]
  );
}
