import React from "react";
import { Popover } from "antd";
import {
  IoBagHandleOutline,
  IoGiftOutline,
  IoHomeOutline,
  IoAppsOutline,
  IoHelpBuoyOutline,
  IoSettingsOutline,
  IoPersonCircleOutline,
  IoAppsSharp,
  IoCalendarOutline,
} from "react-icons/io5";

import { FaPhoneSquareAlt } from "react-icons/fa";
import Link from "next/link";
import Router from "next/router";

function ServerSignal({ setVisibleClockInTech }) {
  const [openedCollapse, setOpenedCollapse] = React.useState("");
  const handleClickClient = () => {
    Router.push(`/client`);
  };
  const serverSignal = (
    <div className="w-[350px] p-2 mt-1">
      <div className="grid grid-cols-3 gap-3 divide-y w-auto h-auto border-none  whitespace-nowrap text-center ">
        <Link href={"/ticket-management"}>
          <a
            className=" text-gray-900 hover:text-gray-900 title-menu hover:bg-gray-100 hover:rounded-md p-2"
            onClick={() => {
              setOpenedCollapse("");
            }}
          >
            <div className="px-auto">
              <img
                className="m-auto w-[30px] h-[30px] -p-1"
                src="/assets/imgs/closed_ticket.svg"
                alt="closed ticket"
              ></img>
            </div>
            Closed Tickets
          </a>
        </Link>
        <a
          className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3"
          onClick={() => {
            setOpenedCollapse("");
          }}
        >
          <div className="px-auto ">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/salon_profile.svg"
              alt="salon profile"
            ></img>
          </div>
          Reports
        </a>
        <a
          className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3"
          onClick={() => {
            setOpenedCollapse("");
          }}
        >
          <div className="px-auto ">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/book/payroll.svg"
              alt="payroll"
            ></img>
          </div>
          Run Payroll
        </a>
        <a
          className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3"
          onClick={() => {
            setOpenedCollapse("");
            handleClickClient();
          }}
        >
          <div className="px-auto">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/client.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          Client
        </a>
        <a className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3">
          <div className="px-auto">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/Configuration.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          Config
        </a>
        <a
          className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3"
          onClick={() => {
            setOpenedCollapse("");
          }}
        >
          <div className="px-auto ">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/salon_exchange.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          Salon Profile
        </a>
        <a className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3">
          <div className="px-auto ">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/menu.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          Menu
        </a>
        <a className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3">
          <div className="px-auto ">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/employee.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          Employee
        </a>
        <a className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md pt-3">
          <div className="px-auto">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/work_schedule.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          Work Schedule
        </a>
        <a
          className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3"
          onClick={() => setVisibleClockInTech(true)}
        >
          <div className="px-auto   ">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/clock_in_tech.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          <span className="w-16 whitespace-pre-line">Manage Attendance</span>
        </a>

        <a
          className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3"
          onClick={() => {
            setOpenedCollapse("");
          }}
        >
          <div className="px-auto">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/gift_card.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          Gift Card
        </a>
        <a
          className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3"
          onClick={() => {
            setOpenedCollapse("");
          }}
        >
          <div className="px-auto">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/marketing.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          Marketing
        </a>
        <a className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3">
          <div className="px-auto   ">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/Clock-In-Out.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          <span className="w-16 whitespace-pre-line">Clock in/out</span>
        </a>
        <a
          className="text-mango-gray-5  hover:text-gray-900 title-menu border-none hover:bg-gray-100 hover:rounded-md p-3"
          onClick={() => {
            openedCollapse == "help"
              ? setOpenedCollapse("")
              : setOpenedCollapse("help");
          }}
        >
          <div className="px-auto">
            <img
              className="m-auto w-[30px] h-[30px] -p-1"
              src="/assets/imgs/need_help.svg"
              alt="Rounded avatar"
            ></img>
          </div>
          Need Help
        </a>
      </div>
    </div>
  );
  return (
    <Popover
      placement="bottom"
      content={serverSignal}
      trigger="click"
      className="  hover:cursor-pointer"
    >
      <img
        className=" w-[26px] h-[26px] ml-3 "
        src="/assets/imgs/menu_seting.svg"
        alt=""
      ></img>
    </Popover>
  );
}
export default ServerSignal;
