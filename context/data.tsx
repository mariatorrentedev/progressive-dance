import * as React from "react";
import type { PropsWithChildren } from "react";
import type { AppData } from "./types";
import { useUserData } from "../hooks";

export const DataContext = React.createContext<AppData | null>(null);

export default function DataProvider({ children }: PropsWithChildren) {
  const user = useUserData();

  const data = React.useMemo(
    () => ({
      user,
    }),
    [user]
  );
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
