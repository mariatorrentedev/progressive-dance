"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { StyledProgressiveDance } from "./StyledProgressiveDance";
import * as React from "react";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Header } from "../components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <UserProvider>
          <AppCacheProvider>
            <AppRouterCacheProvider>
              <StyledProgressiveDance>
                <Header />
                {children}
              </StyledProgressiveDance>
            </AppRouterCacheProvider>
          </AppCacheProvider>
        </UserProvider>
      </body>
    </html>
  );
}
