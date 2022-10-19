import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useMemo } from "react";
import EICON from "../public/assets/imgs/BgItemTix/EICON.png";
import moment from "moment";

const Home: NextPage = () => {
  const nameSalon = "NUS STORE";
  return (
    <div className="bg-mango-primary-blue h-full ">
      <div className="!h-56 block w-full"></div>
      <div className="w-1/2 mx-auto flex-col h-full mt-[100px] ">
        <img
          style={{ paddingTop: "110px" }}
          src="/assets/imgs/mangoforsalon.png"
          alt=""
          className="flex  w-full"
        />

        <p
          className="text-white font-bold text-3xl"
          style={{ marginTop: "50px" }}
        >
          Welcome to
          {nameSalon && "   " + nameSalon}
        </p>

        <div className=" flex  mx-auto " style={{ marginTop: "115px" }}>
          <div className="w-full flex justify-between ">
            <h1 className="text-white font-normal text-2xl text-center my-auto uppercase">
              {moment().format("MMMM")}
            </h1>

            <p
              className="text-white font-bold text-center my-auto "
              style={{ fontSize: "80px" }}
            >
              {moment().format("DD")}
            </p>

            <h1 className="text-white font-normal text-2xl text-center my-auto uppercase">
              {moment().format("dddd")}
            </h1>
          </div>
        </div>
        <div
          className="flex items-center justify-center"
          style={{ marginTop: "100px" }}
        >
          <div className="text-[12px] font-bold text-[#505050]">
            Ⓒ 2019 POWER BY
          </div>
          <div style={{ marginLeft: "2px", marginTop: "-5px" }}>
            <img
              src="/assets/imgs/EICON.png"
              alt=""
              className=""
              style={{ width: "100px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
