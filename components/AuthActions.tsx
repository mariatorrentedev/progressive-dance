import type { BackendEnvironment, User, AppData } from "../context/types";
import * as React from "react";
import NextError from "next/error";
import Image from "next/image";
import { BackendContext } from "../context/backend";
import { DataContext } from "../context/data";

function LogoutButton() {
  const backend = React.useContext<BackendEnvironment | null>(BackendContext);
  const auth = backend?.authentication;

  if (!backend || !auth) {
    return (
      <NextError
        statusCode={500}
        title="No backend context provided!"
        withDarkMode={false}
      />
    );
  }

  return <button onClick={auth.logout}>Log out</button>;
}

function LoginButton() {
  const backend = React.useContext<BackendEnvironment | null>(BackendContext);
  const app = React.useContext<AppData | null>(DataContext);
  return (
    <button
      title="Log in"
      disabled={app?.user.isLoading}
      onClick={backend?.authentication?.login}
    >
      Log in
    </button>
  );
}

export function Avatar({
  user,
  size = 30,
  withName = false,
}: {
  user: User;
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

export function Login() {
  const data = React.useContext<AppData | null>(DataContext);
  const user = data?.user.value;

  return (
    <div id="login">
      {user ? (
        <Avatar user={user} size={38} />
      ) : (
        <NullAvatar withName={false} size={38} />
      )}
      {!user ? (
        data?.user.isLoading ? (
          <p>Loading...</p>
        ) : (
          <LoginButton />
        )
      ) : (
        <LogoutButton />
      )}
    </div>
  );
}
