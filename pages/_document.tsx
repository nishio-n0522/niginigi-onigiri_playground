import {
  DocumentHeadTags,
  documentGetInitialProps,
  DocumentHeadTagsProps,
} from "@mui/material-nextjs/v13-pagesRouter";
import { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default function Document(props: DocumentHeadTagsProps) {
  return (
    <Html lang="ja">
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

Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
