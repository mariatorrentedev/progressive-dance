import Link from "next/link";
import * as Auth from "./Auth";
import { Stack } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";

//TODO: refactor when implementing UI.
export function Header() {
  const { user } = useUser();
  return (
    <Stack
      component="header"
      justifyContent="space-between"
      direction="row"
      alignItems="center"
      margin={1}
    >
      <Link href="/">
        <h1>Home</h1>
      </Link>

      {!user ? (
        <div>
          <Auth.SingUp />
          <Auth.Login />
        </div>
      ) : (
        <Auth.Logout />
      )}
    </Stack>
  );
}
