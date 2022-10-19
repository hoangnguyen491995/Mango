import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Popover, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { LoadTurnTracker } from "services/Employees/LoadTurnTracker";
import { GetWorkingEmployeeList } from "services/Employees/GetWorkingEmployeeList";

const Home = () => {
  const [techs, setTechs] = useState<Array<ITechSalonCenter>>([]);
  const [data, setData] = useState<Array<Item>>([]);
  const [selectType, setSelectType] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface ListShiftModel {
    start: string;
    end: string;
  }

  interface ITechSalonCenter {
    turnType: string;
    rowIndex: number | null;
    turnCode: string | null;
    isManualTurn: number;
    isSale: boolean;
    touchID: string;
    rvcNo: number | null;
    employeeID: number;
    imageFileName: null | string;
    employeeName: string;
    indexNum: number;
    isServing: number;
    servingEnd: Date | null;
    servingStart: Date | null;
    lastTurn: Date | null;
    lastTurnEarn: number;
    id: number;
    currentTicket: number;
    currentGuest: string;
    lockIn: Date | null;
    logInTimeAdjusted: null;
    logInTime: Date | null;
    sizeImage: string;
    takeTurn: number;
    wsid: string;
    serviceAmount: number;
    turn: number;
    adjTurn: number;
    bonusTurn: number;
    partialTurn: number;
    countTicket: number | null;
    techColorID: number;
    backGroundColor: string;
    shadowTechBusy: number;
    alphaAppointmentTech: number;
    isDefault: boolean;
    nextAppointment: string;
    beginTime: string;
    endTime: string;
    isOffSchedule: boolean;
    listShiftModel: ListShiftModel[];
    bookingIndex: number;
    maxIndex: number;
    showTurn: number;
    showAmount: number;
    showNextAppointment: number;
    isLogIn: boolean;
    isLogOut: boolean;
  }

  interface Item {
    rvcNo: number;
    turnID: number;
    appointmentID: number;
    checkNo: number;
    lastChangeTime: Date;
    employeeID: number;
    employeeName: null;
    bonusForTech: number;
    serviceAmount: number;
    tardy: number;
    adjust: number;
    techBonus: number;
    aptRequest: number;
    bonus: number;
    partialApplyTurn: number;
    partial: number;
    turn: number;
    resion: string;
  }



  const [date, setDate] = useState<string>("09/30/2022");
  const [rvcNo, setRvcNo] = useState<number>(5);
  const [switchView, setSwitchView] = useState<number>(1);
  const [orderByDesc, setOrderByDesc] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const apiLoadTurnTracker = new LoadTurnTracker();
  const apiGetWorkingEmployeeList = new GetWorkingEmployeeList();
  useEffect(() => {
    const isManualTurn = 0;
    apiLoadTurnTracker.loadTurnTracker(isManualTurn).then((res) => {
      if (res.status == 200) {
        setData(res.data);
    }
    });
    

    // var config = {
    //   method: "get",
    //   url: "https://backend_bd.enrichcous.com:4443/api/Appointments/GetListTickets?Page=0&Quantity=500&RvcNo=5",
    //   headers: {
    //     Authorization: "Bearer Bearer 6889",
    //   },
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

   
  }, []);
useEffect(()=>
{
    const date = moment().format("MM-DD-YYYY");
    // setLoading(true);
    const param = {
      date: date,
      rvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
      switchView: 1,
      orderByDesc: false,
    };
    apiGetWorkingEmployeeList
      .getWorkingEmployeeList(
        param.date,
        param.rvcNo,
        param.switchView,
        param.orderByDesc
      )
      .then((res) => {
        if (res.status == 200) {
          const data: Array<ITechSalonCenter> = res.data.techs.filter(
            (item) => item.employeeID > 9999
          );

          setTechs(res.data.techs);
       
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
},[])
  const onViewList = () => {
    setSelectType(0);
  };

  const onViewCard = () => {
    setSelectType(1);
    console.log(data);
  };

  const open = () => {
    setIsModalOpen(true);
  };

  const content1 = (
    <div>
      <p className="cursor-pointer">Bonus Turn</p>
      <p className="cursor-pointer">Adjust Turn</p>
    </div>
  );
  const content = (
    <Popover placement="right" content={content1} trigger="click">
      <p className="cursor-pointer">Bonus Turn</p>
      <p className="cursor-pointer">Adjust Turn</p>
    </Popover>
  );
  const text = <span>Title</span>;

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="h-full w-full bg-[#F1F1F1]">
      <Modal title="Basic Modal" visible={isModalOpen}>
        <div className="text-[#262626] font-bold text-[24px]">
          Current turn setting
        </div>
        <div className="flex flex-col "></div>
      </Modal>
      <div className="flex flex-row h-[80px] w-full justify-between pl-[60px] items-center">
        <span className="text-[#505050] font-semibold text-[22px]">
          TURN TRACKER
        </span>
        <div className="items-center flex">
          <button
            className="flex border-[3px] border-[#00BED6] bg-[#00bed64d] rounded-[4px]
               w-[45px] h-[45px] items-center justify-center "
            type="button"
          >
            <img
              src="/image/magnifying-glass-plus.png"
              className="h-[30px] w-[30px]"
            ></img>
          </button>
          <button
            className="flex border-[3px] border-[#F28500] bg-[#F285004D] hover:border-[#00BED6]
             hover:bg-[#00bed64d] rounded-[4px] w-[45px] h-[45px] items-center justify-center"
            type="button"
          >
            <img
              src="/image/magnifying-glass-minus.png"
              className="h-[20px] w-[20px]"
            ></img>
          </button>
          <button
            className="flex border-[3px] border-[#00BED6] bg-[#00bed64d] rounded-[4px]
               w-[45px] h-[45px] items-center justify-center ml-[20px]"
            type="button"
          >
            <img src="/image/Clients/list.svg" className="w-[25px] h-[20px]" />
          </button>
          <button
            className="flex border-2 border-[#A7A7A7] bg-white rounded-[4px]
            w-[45px] h-[45px] items-center justify-center ml-[20px]"
            type="button"
          >
            <img src="/image/Clients/grid.svg" className="w-[25px] h-[20px]" />
          </button>
          <div className="h-[45px] border-r border-[#A7A7A7] border-dashed mx-[30px]"></div>
          <input
            className="text-[#505050] text-[14px] border-2 border-[#A7A7A7] h-[50px] w-[300px] p-[10px] rounded 
            bg-white focus:border-[#00bed6]"
            type="search"
            data-type="search"
            placeholder="Search tech"
          ></input>
          <button
            className="flex flex-col justify-evenly min-w-[100px] h-[60px] bg-[#F285004D] border-2 border-[#F28500]  
            rounded-[4px] mx-[5px] text-[14px] items-center text-[#505050] font-bold"
            type="button"
          >
            <img src="/image/cancel.svg" className="h-[20px] w-[30px]"></img>
            <span>Cancel</span>
          </button>
          <button
            className="flex flex-col justify-evenly min-w-[100px] h-[60px] 
            rounded-[4px] mx-[5px] text-[14px] items-center text-[#A7A7A7] font-bold"
            type="button"
          >
            <img
              src="/image/search-tech.svg"
              className="h-[30px] w-[30px]"
            ></img>
            <span>Search</span>
          </button>
          <button
            className="flex flex-col justify-evenly min-w-[100px] h-[60px] 
            rounded-[4px] mx-[5px] text-[14px] items-center text-[#A7A7A7] font-bold"
            type="button"
            onClick={open}
          >
            <img
              src="/image/MangoTech/noun-deadline-4541656.svg"
              className="h-[30px] w-[30px]"
            ></img>
            <span>Current Turn</span>
          </button>
          <button
            className="flex flex-col justify-evenly min-w-[100px] h-[60px] 
            rounded-[4px] mx-[5px] text-[14px] items-center text-[#A7A7A7] font-bold"
            type="button"
          >
            <img
              src="/image/MangoTech/More Icon.svg"
              className="h-[30px] w-[30px]"
            ></img>
            <span>More</span>
          </button>
        </div>
      </div>
      <div className="w-full">
        {techs
          .filter(
            (item) =>
              item.employeeID > 9999 && item.isLogIn && item.isLogOut == false
          )
          .map((iteminfo, index) => (
            <div className="flex w-full h-[80px] border-[#D1D1D1] border-t">
              <div className="flex bg-white h-full p-[5px] items-center">
                <div className=" min-w-[60px] max-w-[60px]">
                  <img
                    src={
                      "https://backend_bd.enrichcous.com:5600/Upload/employee/" +
                      iteminfo.imageFileName
                    }
                    className="h-[50px] w-[50px]"
                  ></img>
                </div>
                <div className="justify-between h-full w-[115px] flex-nowrap">
                  <div className="h-[15px] mb-[2px]">
                    <span className="text-[#262626] text-[14px] font-bold text-ellipsis uppercase">
                      {iteminfo.employeeName}
                    </span>
                  </div>
                  <div className="flex h-[14px] font-medium text-[11px]">
                    <span className="w-[40px]">Bonus :</span>
                    <span className="font-bold">{iteminfo.bonusTurn}</span>
                  </div>
                  <div className="flex h-[14px] font-medium text-[11px]">
                    <span className="w-[40px]">Adjust :</span>
                    <span className="font-bold">{iteminfo.adjTurn}</span>
                  </div>
                  <div className="flex h-[14px] font-medium text-[11px]">
                    <span className="w-[40px]">Tardy :</span>
                    <span className="font-bold">6</span>
                  </div>
                  <div className="flex h-[14px] font-medium text-[11px]">
                    <span className="w-[40px]">Partial :</span>
                    <span className="font-bold">6</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between h-full w-[115px] flex-nowrap">
                  <div
                    className="w-[100px] h-[20px] flex justify-evenly cursor-pointer bg-[#E8FDFF]
                          text-[#0FA9BC] font-semibold text-[12px] items-center hover:bg-[#AEF8FF] 
                          hover:text-[#505050]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 30.008 30"
                    >
                      <g
                        id="Group_13440"
                        data-name="Group 13440"
                        transform="translate(-1612.042 -436.721)"
                      >
                        <g
                          id="Group_13439"
                          data-name="Group 13439"
                          transform="translate(1613.042 437.721)"
                        >
                          <g
                            id="Group_12620"
                            data-name="Group 12620"
                            transform="translate(0 0)"
                          >
                            <g id="Group_12619" data-name="Group 12619">
                              <path
                                id="Path_8491"
                                data-name="Path 8491"
                                d="M15.663,14.136,21.32,20.9,30.6,10.346"
                                transform="translate(-7.72 -5.465)"
                                fill="none"
                                stroke="#f28500"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <path
                                id="_"
                                data-name=" "
                                d="M15.767,7.855a4.158,4.158,0,0,0-4.158,4.158h0V31.7a4.158,4.158,0,0,0,4.158,
                                4.158h19.69a4.158,4.158,0,0,0,4.16-4.158V12.013a4.158,4.158,0,0,0-4.16-4.158Z"
                                transform="translate(-11.609 -7.855)"
                                fill="none"
                                stroke="#f28500"
                                stroke-width="2"
                              />
                              <path
                                id="_."
                                data-name=" ."
                                d="M22.946,30.751a1.469,1.469,0,1,1,1.47,1.47,1.47,1.47,0,0,1-1.47-1.47ZM33.039,
                                20.66a1.468,1.468,0,1,1,1.468,1.468,1.467,1.467,0,0,1-1.468-1.468Zm-20.184,0a1.468,1.468,
                                0,1,1,1.468,1.468h0A1.467,1.467,0,0,1,12.855,20.66ZM22.946,10.573a1.469,1.469,0,1,1,1.47,
                                1.468h0A1.468,1.468,0,0,1,22.946,10.573Z"
                                transform="translate(-10.414 -6.656)"
                                fill="#f28500"
                                stroke="#f28500"
                                stroke-width="0.5"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    {moment(iteminfo.logInTime).format("LTS")}
                  </div>
                  <div className="h-[15px] flex">
                    <div className="text-[#505050] font-semibold text-[12px] w-[47px]">
                      Service :
                    </div>
                    <span className="text-[#505050] font-semibold text-[12px]">
                      0
                    </span>
                  </div>
                  <div className="h-[15px] flex">
                    <div className="text-[#505050] font-bold text-[14px] w-[50px]">
                      TURN :
                    </div>
                    <span className="text-[#505050] font-bold text-[14px]">
                      0
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-nowrap justify-start items-center min-h-full h-full">
                {data
                  .filter((it) => it.employeeID == iteminfo.employeeID)
                  .map((item, index) => (
                    <div className="h-full w-[110px] border">
                      <div className="flex flex-row m-[5px] rounded-[4px] h-[85%] bg-[#D1D1D1] cursor-pointer">
                        <div className="flex flex-col justify-between">
                          <div className="font-bold text-[11px] text-[#505050]">
                            <span>B: 1</span>
                          </div>
                          <span className="font-medium text-[11px] text-[#505050]">
                            {item.resion}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                <Popover placement="right" content={content} trigger="click">
                  <div
                    className="flex items-end justify-end w-[110px] h-full border"
                    onClick={onViewCard}
                  >
                    <div className="bg-white rounded-full cursor-pointer mr-[5px] mb-[5px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30px"
                        viewBox="0 0 512 512"
                        width="30px"
                      >
                        <g>
                          <path
                            d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 
                            256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 
                            224 224-100.480469 224-224-100.480469-224-224-224zm0 0"
                            data-original="#000000"
                            data-old_color="#000000"
                            fill="none"
                          />
                          <path
                            d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 
                            16 16s-7.167969 16-16 16zm0 0"
                            data-original="#000000"
                            data-old_color="#000000"
                            fill="#F44C7FCC"
                          />
                          <path
                            d="m256 384c-8.832031 0-16-7.167969-16-16v-224c0-8.832031 7.167969-16 16-16s16 7.167969 16 
                            16v224c0 8.832031-7.167969 16-16 16zm0 0"
                            data-original="#000000"
                            data-old_color="#000000"
                            fill="#F44C7FCC"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </Popover>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
