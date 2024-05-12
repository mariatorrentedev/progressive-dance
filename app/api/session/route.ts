import { NextResponse } from "next/server";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

/**
 * See @https://auth0.github.io/nextjs-auth0/types/session_get_session.GetSession.html
 *
 * Get session from out nextjs-auth0 provider in order to access the idToken.
 *
 * `withApiAuthRequired` usage example in a route, different import from the client side.
 */
export const GET = withApiAuthRequired(async function GET(req) {
  const res = new NextResponse();
  const session = await getSession(req, res);
  return NextResponse.json({ idToken: session?.idToken ?? null }, res);
});
