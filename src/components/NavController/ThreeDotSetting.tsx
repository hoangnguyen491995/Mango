import React, { useState, useContext, useEffect } from "react";
import { Popover, Switch, Radio } from "antd";
import cc from "classnames";
import HomeContext from "../Book/HomeContext";
import { GetDataWeekTotal } from "services/Appointments/GetDataWeekTotal";
import { useAppSelector } from "src/redux/hook";
import ModalShare from "../BookingListView/ModalShare";

interface IDataTotalRemind {
  toDay: string;
  thisWeek: string;
  nextWeek: string;
  all: string;
}

function ThreeDotSetting() {
  const [isRemind, setIsRemind] = useState<boolean>(false);
  const getDataWeekTotal = new GetDataWeekTotal();
  const bookContext = useContext(HomeContext)[0];
  const onChange = (checked) => {
    bookContext.setNoShowRadio(checked);
  };
  const onChangeClosed = (checked) => {
    bookContext.setIsCloseRadio(checked);
  };
  const [dataTotalRemind, setDataTotalRemind] = useState<IDataTotalRemind>();
  const viewTypeCalendar = useAppSelector((state) => state.book.viewTypeCalendar);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  useEffect(() => {
    try {
      getDataWeekTotal.getDataWeekTotal().then((res) => {
        if (res.status === 200) {
          setDataTotalRemind(res.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  
  };

  const handleShareItem = ()=>{
    showModal()
  }

  const threeDotSetting = (
    <div className="rounded-md  w-[280px]  wrap-booking-header-add reminder-popover  ">
      <div className=" bg-white divide-y divide-gray-100 rounded-md">
        <ul className="w-full">
          <li
            className="py-3 px-1 flex items-center  hover:bg-mango-gray-1 border-b 
          border-dashed border-mango-gray-3 cursor-pointer "
          >
            <div className="w-14 text-center">
              <Switch
                className="!min-w-[37px] "
                size="default"
                defaultChecked
                onChange={onChangeClosed}
              />
            </div>
            <span className="  truncate">CLOSED</span>
          </li>
          <li
            className="py-3 px-1 flex  hover:bg-mango-gray-1 border-b 
          border-dashed border-mango-gray-3 items-center  cursor-pointer "
          >
            <div className="w-14 text-center">
              <Switch
                className="!min-w-[37px]"
                size="default"
                defaultChecked
                onChange={onChange}
              />
            </div>
            <span className="truncate">NO SHOW, CANCELED</span>
          </li>
          {viewTypeCalendar == "LIST" && <li
            onClick={handleShareItem}
            className="w-full py-3 px-1 flex  hover:bg-mango-gray-1 border-b 
            border-dashed border-mango-gray-3 items-center cursor-pointer "
          >
            <img
                 className="w-14 h-6 "
                src="/assets/imgs/book/00_30px_435.svg"
                alt="arrow-down"
              ></img>
            <span>SHARE</span>
           
          </li>}
          <li
            onClick={() => setIsRemind(!isRemind)}
            className="w-full py-3 px-1 flex  hover:bg-mango-gray-1 cursor-pointer "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="w-14 h-6"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
              <path
                d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0
             .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0
              .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093
               6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0
             3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 
             1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"
              />{" "}
            </svg>
            <span>REMINDERS</span>
            <div className="">
              {isRemind ? (
                <img
                className="w-5 h-5 "
                src="/assets/imgs/book/arrow-up.png"
                alt="arrow-down"
              ></img>
                
              ) : (
                <img
                className="w-5 h-5 "
                src="/assets/imgs/book/arrow-down.png"
                alt="up-down"
              ></img>
              )}
            </div>
          </li>
        </ul>
      </div>
      

      {isRemind && (
        <div className="py-1 h-auto items-center  border-t-[1.5px] wrap-booking-header-add border-dashed border-mango-gray-3 ">
          <ul className="space-y-1 ">
            <li
              className="pl-14 mx-auto px-1 hover:bg-cyan-100 cursor-pointer  items-center flex content-center;
             "
            >
              <div className="w-full border-b items-center border-dashed border-mango-gray-3 py-2">
                <span> DAY ({dataTotalRemind?.toDay || 0})</span>
               
              </div>
            </li>
            <li className="pl-14 px-1  hover:bg-cyan-100 cursor-pointer">
              <div className="w-full border-b border-dashed border-mango-gray-3 py-2">
              <span> THIS DAY ({dataTotalRemind?.thisWeek || 0})</span>
              </div>
            </li>
            <li className="pl-14  px-1   hover:bg-cyan-100 cursor-pointer">
              <div className="w-full border-b border-dashed border-mango-gray-3 py-2">
              <span> NEXT DAY ({dataTotalRemind?.toDay || 0})</span>
              </div>
            </li>
            <li className="pl-14 py-2 px-1   hover:bg-cyan-100 cursor-pointer ">
             <div className=""><span> REMAIN ({dataTotalRemind?.all || 0}) </span></div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
  return (
    <Popover
      overlayClassName="p-0 m-0"
      placement="bottomRight"
      content={threeDotSetting}
      trigger="click"

    >
      <div
        className={cc(
          "border border-gray-400 flex  text-mango-gray-5 justify-center rounded-[4px] hover:bg-mango-primary-blue",
          " active:border-mango-primary-blue hover:cursor-pointer hover:text-white bg-white h-[45px]  w-[45px] ",
          "focus:outline-none  items-center  focus:bg-mango-primary-blue hover:border-mango-primary-blue",
          "  focus:text-white focus:font-bold "
        )}
        style={{ boxShadow: "0px 0px 15px #0000004d" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="w-7 h-7 m-1.5 md:w-6 md:h-6"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
        <ModalShare
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
       
      />
      </div>
    </Popover>
    
  );
}

export default ThreeDotSetting;
