import type { DocumentHeadTagsProps } from "@mui/material-nextjs/v14-pagesRouter";
import type { DocumentProps, DocumentContext } from "next/document";
import {
  DocumentHeadTags,
  documentGetInitialProps,
} from "@mui/material-nextjs/v14-pagesRouter";
import { Html, Head, Main, NextScript } from "next/document";

/**
 * See @https://nextjs.org/docs/pages/building-your-application/routing/custom-document and
 * @https://mui.com/material-ui/integrations/nextjs/ needed for Material UI(MUI) integration.
 */
export default function MyDocument(
  props: DocumentProps & DocumentHeadTagsProps
) {
  return (
    <Html lang="en">
      {/*Not the same as next/head. Should only be used for any <head> code that is common for ALL pages.*/}
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
