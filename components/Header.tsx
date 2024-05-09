import type { PropsWithChildren } from "react";
import Link from "next/link";
import * as Auth from "./Auth";
import { useUser } from "@auth0/nextjs-auth0/client";

export function Header({ children }: PropsWithChildren) {
  const { user } = useUser();
  return (
    <header>
      <Link href="/">
        <h1>Home</h1>
      </Link>

      {!user && (
        <>
          <Auth.SingUp />
          <Auth.Login />
        </>
      )}
      {user && (
        <>
          <Auth.Logout />
        </>
      )}
    </header>
  );
}
