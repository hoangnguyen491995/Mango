import { Col, Row } from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import { useEffect } from "react";
const Home = () => {
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

      <div className=" flex  mx-auto " style={{ marginTop: "110px" }}>
        <div className="w-full flex justify-between ">
          <h1 className="text-white font-normal text-2xl text-center my-auto uppercase" >
            {moment().format("MMMM")}
          </h1>

          <p className="text-white font-bold text-center my-auto " style={{ fontSize: "80px" }}>
            {moment().format("DD")}
          </p>

          <h1 className="text-white font-normal text-2xl text-center my-auto uppercase" >

            {moment().format("dddd")}
          </h1>
        </div>
      </div>
    </div>
  </div>
);
};
export default Home;