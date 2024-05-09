"use client";
import { ReactNode } from "react";
import { ConvexReactClient, ConvexProviderWithAuth } from "convex/react";
import { useNextAuth0Provider } from "../hooks";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithAuth client={convex} useAuth={useNextAuth0Provider}>
      {children}
    </ConvexProviderWithAuth>
  );
}
