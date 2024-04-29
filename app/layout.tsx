"use client";
import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { StyledProgressiveDance } from "./StyledProgressiveDance";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import Parallel from "./@parallel/page";
import Parallel2 from "./@parallel2/page";
import ConvexClientProvider from "./ConvexClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ConvexClientProvider>
          <AppCacheProvider>
            <AppRouterCacheProvider>
              <StyledProgressiveDance>
                {/* Maps root index /app/page.tsx. */}
                {children}
                {/**
                 *
                 * See @https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
                 *
                 * Useful for dynamic sections, without affecting the routing.
                 * ´@´ denominates the slot.
                 *
                 */}
                <Parallel />
                <Parallel2 />
              </StyledProgressiveDance>
            </AppRouterCacheProvider>
          </AppCacheProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
