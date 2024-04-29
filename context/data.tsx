import * as React from "react";
import type { Context, PropsWithChildren } from "react";
import type { AppData } from "./types";
import { useUserData } from "../hooks";

export const DataContext = React.createContext(null) as Context<AppData | null>;

export default function DataProvider({ children }: PropsWithChildren) {
  const user = useUserData();

  const data = React.useMemo<AppData>(
    () => ({
      user,
    }),
    [user]
  );
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
