import * as React from "react";
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
  }: {
    forceRefreshToken: boolean;
  }) => Promise<string | null> = React.useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
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
