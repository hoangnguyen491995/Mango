import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { Col, Row } from "antd";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700"
            rel="stylesheet"
          />
        </Head>
        <body className="text-gray-800 ">
          
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
