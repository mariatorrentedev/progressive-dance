import * as React from "react";
import { Button } from "@mui/material";
import Image from "next/image";

export function Logout() {
  return (
    <Button variant="contained" href="/api/auth/logout">
      Log out
    </Button>
  );
}

export function Login() {
  return (
    <Button variant="contained" href="/api/auth/login">
      Login
    </Button>
  );
}

export function SingUp() {
  return <Button href="/api/auth/signup">Sign Up</Button>;
}

// TODO: move and refactor when implementing the UI.
export function Avatar({
  user,
  size = 30,
  withName = false,
}: {
  user: any;
  size?: number;
  withName?: boolean;
}) {
  let firstName = user.name.split(" ")[0];
  if (firstName.indexOf("@") >= 0) {
    firstName = firstName.split("@")[0];
  }
  return (
    <div className="avatar">
      <Image
        src={user.pictureUrl}
        width={size}
        height={size}
        alt={user.name}
        title={user.name}
      />
      {withName && (
        <span className="avatar-name" title={user.name}>
          {firstName}
        </span>
      )}
    </div>
  );
}

export function NullAvatar({
  size = 30,
  withName = true,
}: {
  size?: number;
  withName?: boolean;
}) {
  return (
    <div className="avatar null-avatar" title="Not logged in">
      <div
        className="avatar-ghost"
        style={{ width: size, height: size, fontSize: size - 10 }}
      ></div>
      {withName && (
        <span className="avatar-name" title="Anon">
          Anon
        </span>
      )}
    </div>
  );
}
