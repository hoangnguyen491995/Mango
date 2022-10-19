import React, { useState, useEffect } from "react";
import {
  IoNotificationsOutline,
  IoSearchOutline,
  IoAppsOutline,
} from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "src/components/Link";
import styled from "styled-components";
import Notifications from "./Notifications/Notifications";
import NoticeDecription from "./ColorDescriptions/NoticeDescription";
import StoreInfo from "./StoreInfo";
import ServerSignal from "./ServerSignal";
import CurrentTime from "./CurrentTime";
import { SearchTicket } from "./SearchTicket";
import { Col, Row, Space } from "antd";
import ClockInTech from "../ClockInTech/ClockInTech";
import { CreateChargeSlice } from "../CreateCharge/CreateChargeSlice";
import { useAppSelector } from "src/redux/hook";
import { useDispatch } from "react-redux";
import { setPageCurrent } from "../Book/book-slice";
import { Logout } from "./Logout/Logout";
import { Create } from "services/CheckOut/Create";
import { setApptId, setCheckNo } from "../CreateCharge/createcharge-slice";
import { GetCheckOutApptID } from "services/CreateCharge/GetCheckOutByAppointment";
import { Route } from "devextreme-react/map";
import { showPermissionModal } from "../Authenticate/authenticate-slice";

const HeaderNav = styled.div``;

interface Props {
  menuItems: MenuGlobal.MenuItem[];
}
const NavMenu = ({ menuItems }) => {
  const [showClockInTech, setShowClockInTech] = useState<boolean>(false);
  const [visibleClockInTech, setVisibleClockInTech] = useState<boolean>(false);
  const apptId = useAppSelector((state) => state.createCharge.apptId);
  const pageCurrent = useAppSelector((state) => state.book.pageCurrent);

  const apiGetCheckOutApptID = new GetCheckOutApptID();

  const [isHome, setIsHome] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleShowClockInTech = () => {
    setVisibleClockInTech(true);
  };
  const handleHideClockInTech = () => {
    setVisibleClockInTech(false);
  };
  const router = useRouter();
  const isElectron = process.env.NEXT_PUBLIC_DOMAIN_API_TITLE_BAR_ELECTRON;
  const isProd: boolean = process.env.NODE_ENV === isElectron;
  const apiCreate = new Create();
  const handleClickBook = () => {
    dispatch(setPageCurrent("book"));
  };

  const handleClickSalonCenter = () => {
    dispatch(setPageCurrent("salon-center"));
  };
  const handleClickCreate = () => {
    const param = {
      IsLoginRequired: 0,
      PassCode: 1111,
    };
    0;
    apiCreate.create(param.IsLoginRequired, param.PassCode).then((res) => {
      if (res.status == 200) {
        dispatch(setApptId(res.data));
        apiGetCheckOutApptID.getCheckOutApptID(res.data).then((res) => {
          if (res.status == 200) {
            dispatch(setCheckNo(res.data.checkNo));
          }
        });
      }
    });
    dispatch(setPageCurrent("create-Charge"));

  };
  const handleShowModalClockInTech = () => {
    dispatch(showPermissionModal());
    // setShowClockInTech(true);
  };
  const handleOnCancelClockInTech = () => {
    setShowClockInTech(false);
  };
  const handleOnOkClockInTech = () => {
    setShowClockInTech(false);
  };
  useEffect(() => {
    console.log("router.pathname", router.pathname);

    if (window) {
      if (
        router.pathname == "/" ||
        router.pathname == "/home" ||
        router.pathname == "/home/"
      ) {
        setIsHome(true);
      } else {
        setIsHome(false);
      }
    }
  }, [router.pathname]);

  return (
    <div className="h-[55px] w-full">
      <div
        className={
          "flex bg-mango-primary-blue border-gray-200 h-[55px] fixed w-full z-20 "
        }
      >
        <div className=" w-1/3 cursor-pointer flex space-x-8 text-center items-center">
          <div className="grid place-items-center pl-8 ">
            <Link
              href="/home"
              className="flex items-center"
              onClick={() => dispatch(setPageCurrent(""))}
            >
              <img
                src="/assets/imgs/mango-apple-icon.png"
                className="mr-3 h-7 pt-1"
                alt="Mango Logo"
              />
            </Link>
            <span className="self-center text-xs font-semibold whitespace-nowrap">
              MANAGE
            </span>
          </div>
          <Notifications />
          <NoticeDecription />
          {/* <Logout /> */}
          <ClockInTech
            onCancel={handleOnCancelClockInTech}
            onOk={handleOnOkClockInTech}
            visible={showClockInTech}
          />
          <img
            onClick={handleShowModalClockInTech}
            className="m-auto w-[30px] h-[30px] !text-white "
            src="/assets/imgs/Clock In- Out.svg"
            alt="Rounded avatar"
          ></img>
        </div>
        <div className="flex w-1/3 space-x-8 text-center items-center ">
          {/* <button>aaa bbb: {count}</button> */}

          <Link href="/book" onClick={(e) => handleClickBook()}>
            <h5
              className={`flex relative mb-1  lg:text-[20px] md:text-base sm:text-sm font-black under-line 
               text-white cursor-pointer ${pageCurrent == "book" && "active"} `}
            >
              Book
            </h5>{" "}
          </Link>
          <Link href="/salon-center" onClick={(e) => handleClickSalonCenter()}>
            <h5
              className={`flex relative mb-1 lg:text-[20px] md:text-base sm:text-sm under-line font-bold 
             text-white cursor-pointer ${pageCurrent == "salon-center" && "active"
                } `}
            >
              Salon Center
            </h5>{" "}
          </Link>
          <Link href="/create-Charge" onClick={(e) => handleClickCreate()}>
            <h5
              className={`flex relative mb-1 lg:text-[20px] md:text-base sm:text-sm font-bold under-line 
             text-white cursor-pointer ${pageCurrent == "create-Charge" && "active"
                } `}
            >
              Create/Charge
            </h5>
          </Link>
        </div>
        <div className="w-1/3 flex justify-center">
          <Row>
            <Space>
              {isHome != true && <SearchTicket />}
              <StoreInfo />
              {/* <IoAppsOutline color="white" className="w-10 h-10" /> */}
              <ServerSignal setVisibleClockInTech={setVisibleClockInTech} />
              {/* <CurrentTime /> */}
            </Space>
          </Row>
        </div>
        <ClockInTech
          onCancel={handleHideClockInTech}
          onOk={handleShowClockInTech}
          visible={visibleClockInTech}
        />
      </div>
    </div>
  );
};
export default NavMenu;
