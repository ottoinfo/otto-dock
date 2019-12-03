/* @flow */

import React from "react";
import { ServerStyleSheet } from "styled-components";
import Document, { Head, Main, NextScript } from "next/document";

export default class extends Document {
  static async getInitialProps({ req, renderPage }: Object) {
    const { html, head, errorHtml, chunks } = renderPage();
    return {
      html,
      head,
      errorHtml,
      chunks
    };
  }

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleElement = sheet.getStyleElement();
    const appEnv: string = process.env.APP_ENV || "production";

    return (
      <html lang="en">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          {styleElement}
        </Head>
        <body>
          {main}
          <NextScript />
        </body>
      </html>
    );
  }
}
