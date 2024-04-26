"use client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

{
  /*
   * We only care to render this on the client side
   * See @ https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-client-components-in-nextjs
   */
}
export function StyledProgressiveDance({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  {
    /*Inject a theme in the app using React Context.*/
  }
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
