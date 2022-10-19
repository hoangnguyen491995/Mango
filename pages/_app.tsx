import React, { FC, useState } from "react";
import { AppProps } from "next/app";
import Layout from "src/components/Layout";
import GlobalBaseStyle from "src/styles/GlobalBaseStyle";

import "src/i18n";
import "src/styles/customizeStyle.css";
import "src/styles/index.css";
import "src/styles/sweetAlert.css";
//import "tailwindcss/tailwind.css";

import "animate.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { Modal } from "antd";
import { PermissionLogin } from "src/components/Authenticate/PermissionLogin";

const WrappedApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <PermissionLogin></PermissionLogin>
        <GlobalBaseStyle />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default WrappedApp;
