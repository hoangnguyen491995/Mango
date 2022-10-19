import React, { useState, useEffect, useContext } from "react";
import { Popover } from "antd";
import HomeContext from "../Book/HomeContext";
import moment from "moment";

interface Props {
  setTypeDatte: Function;
}
function DayType({ setTypeDatte }: Props) {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("DAY");
  const bookContext = useContext(HomeContext)[0];
  useEffect(() => {
    setTypeDatte(selectedValue);
  }, [selectedValue]);

  const handleSwitchListView = () => {
    bookContext.setDateListView({
      start: moment().clone().startOf("week"),
      end: moment().clone().endOf("week"),
    });
    setSelectedValue("LIST");
  };
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };
  const hide = () => {
    setVisible(false);
  };
  const dayType = (
    <div className="bg-white  divide-gray-100 w-[100px] rounded-md -mt-1"
    onClick={hide}
    >
      <ul className="text-base font-medium text-gray-600  ">
        <li
          onClick={() => {
            setSelectedValue("DAY");
            localStorage.setItem("typeDay", "DAY");
          }}
          
          className="block px-4 py-2 hover:bg-mango-primary-blue cursor-pointer hover:text-white hover:rounded-t-md "
        >
          DAY
        </li>
        <li
          onClick={() => {
            setSelectedValue("WEEK");
            localStorage.setItem("typeDay", "WEEK");
          }}
          className="block px-4 py-2 hover:bg-mango-primary-blue cursor-pointer border-t hover:text-white "
        >
          WEEK

        </li>
        <li
          onClick={handleSwitchListView}
          className="block px-4 py-2 hover:bg-mango-primary-blue border-t cursor-pointer hover:text-white hover:rounded-b-md"
        >
          LIST
        </li>
      </ul>
    </div>
  );
  return (
    <Popover
      overlayClassName="p-0 m-0"
      placement="bottom"
      content={dayType}
      trigger="click"
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      <button
        data-dropdown-toggle="dropdown"
        className="border border-gray-400 bg-white w-[100px] text-sm font-semibold text-mango-gray-5 pl-3
          hover:text-white hover:bg-mango-primary-blue focus:bg-mango-primary-blue focus:text-white  
            text-center inline-flex items-center h-[45px] hover:border-mango-primary-blue rounded-[4px] "
        type="button"
        style={{boxShadow: "0px 3px 5px 3px #D1D1D1, 3px 0px 4px 0px #F1F1F1"}}
      
      >
        
        <span className="w-11 text-sm ">{selectedValue}</span>
        <svg
          className="w-5 h-5 ml-2 items-center justify-center flex"
         
      
          fill="none"
          stroke="currentColor"
          viewBox="0 0 21 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
    </Popover>
  );
}

export default DayType;
