import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

/**
 * Server-side features from the Auth0 Next.js SDK, it automatically creates some routes.
 *
 * `/login`, `/callback`, `/logout` and `/me`
 */
export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/dashboard",
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/dashboard",
  }),
});
