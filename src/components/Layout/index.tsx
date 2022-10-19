import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "src/components/Header";
import { useRouter } from "next/router";

import { TitleBarApp } from "../TitlteBar/TitleBar";
import { message } from "antd";
import { messageWarning } from "../MessageAlert";
import { useDispatch } from "react-redux";
import { addCount, incremented } from "../Header/header-slice";

const MainWrapper = styled.div`
  text-align: center;
  height: 100%;
`;

// you should todo: mock data or fetch actual api to get menu items
const menuItems = [
  {
    key: "/",
    title: "asdf",
    desc: "ghdfghfdgh",
    pathname: "/",
  },
  {
    key: "/user",
    title: "3423",
    desc: "dsgsdfgsd",
    pathname: "/user",
  },
  {
    key: "/articles",
    title: "dfs",
    desc: "dfgsdfg",
    pathname: "/articles",
  },
];

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    const accessTokens = localStorage.getItem("AccessToken");
    if (accessTokens) {
      (router.pathname == "/workspace" || router.pathname == "/login") &&
        router.push("/home");
    } else if (router.pathname != "/workspace") {
      if (router.pathname != "/login") {
        messageWarning("Logout Device");
      }
      router.push("/login");
    }
  }, []);
  return (
    <>
      <div
        className="h-screen bg-mango-bg-dark"
        style={{ fontFamily: "'Montserrat', sans-serif " }}
      >
        <>
          {/* <TitleBarApp /> */}
          {router.pathname == "/workspace" || router.pathname == "/login" ? (
            <></>
          ) : (
            <Header menuItems={menuItems} />
          )}
          <MainWrapper>{children}</MainWrapper>{" "}
        </>
      </div>
    </>
  );
};

export default Layout;
