import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { ReactNode } from "react";
import { Poppins } from "next/font/google";
const FONT = Poppins({ subsets: ["latin"], weight: "500" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}+ </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
