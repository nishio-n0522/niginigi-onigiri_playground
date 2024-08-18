import "@/styles/app.css";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { I18n } from "aws-amplify/utils";
import { translations } from "@aws-amplify/ui-react";

import { Layout } from "@/components/layout";
import customTheme from "../app-config/customTheme";

Amplify.configure(outputs);

I18n.putVocabularies(translations);
I18n.setLanguage("ja");

I18n.putVocabularies({
  ja: {
    Nickname: "ユーザーネーム",
    "Enter your Nickname": "ユーザーネームを入力",
  },
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={customTheme}>
        <Authenticator>
          {({ signOut, user }) => (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Authenticator>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
