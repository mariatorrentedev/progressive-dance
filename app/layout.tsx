"use client";
import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { StyledProgressiveDance } from "./StyledProgressiveDance";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Header } from "../components/Header";
import ConvexProvider from "./ConvexProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <UserProvider>
          <ConvexProvider>
            <AppCacheProvider>
              <AppRouterCacheProvider>
                <StyledProgressiveDance>
                  <Header />
                  {children}
                </StyledProgressiveDance>
              </AppRouterCacheProvider>
            </AppCacheProvider>
          </ConvexProvider>
        </UserProvider>
      </body>
    </html>
  );
}
