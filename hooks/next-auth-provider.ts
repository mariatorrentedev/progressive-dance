import * as React from "react";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

/**
 * Since there is no integration using the `next/auth0` as with `react/auth0`,
 * we will need to provide the state of our Authentication with convex.
 *
 * See @https://docs.convex.dev/auth/advanced/custom-auth
 *
 */
export default async function useNextAuth0Provider() {
  const { user } = await getAccessToken();

  const fetchAccessToken = React.useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      return await getAccessToken({
        refresh: forceRefreshToken,
      });
    },
    [getAccessToken]
  );

  console.log(user, fetchAccessToken);

  return React.useMemo(
    () => ({
      isLoading: !user,
      isAuthenticated: user ?? false,
      // The async function to fetch the ID token
      fetchAccessToken,
    }),
    [user, fetchAccessToken]
  );
}
