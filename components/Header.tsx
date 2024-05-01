import type { PropsWithChildren } from "react";
import Link from "next/link";
import { Login } from "./AuthActions";

export function Header({ children }: PropsWithChildren) {
  return (
    <header>
      <Link href="/">
        <h1>Home</h1>
      </Link>
      <Login />
      {children}
    </header>
  );
}
