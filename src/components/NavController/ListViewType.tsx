import React, { useState, useEffect, useContext } from "react";
import { Popover } from "antd";
import HomeContext from "../Book/HomeContext";

function ListViewType() {
  const [selectedValue, setSelectedValue] = useState("TICKET");
  const bookContext = useContext(HomeContext)[0];
  // console.log(bookContext);

  const viewType = (
    <div className="bg-white p-0 m-0 w-[145px] cursor-pointer rounded-md -mt-1">
      <ul className="wrap-booking-header-listview-type-text ">
        <li
          onClick={() => {
            setSelectedValue("TICKET");
            bookContext.setTypeListView(true);
          }}
          className="block px-4 py-2.5  hover:bg-mango-primary-blue hover:text-white rounded-t-md"
        >
          TICKET
        </li>
        <li
          onClick={() => {
            setSelectedValue("SERVICE");
            bookContext.setTypeListView(false);
          }}
          className="block px-4 py-2.5 hover:bg-mango-primary-blue  border-t hover:text-white rounded-b-md "
        >
          SERVICE
        </li>
      </ul>
    </div>
  );
  return (
    <Popover
      overlayClassName="p-0 m-0"
      placement="bottom"
      content={viewType}
      trigger="click"
    >
      <button
        data-dropdown-toggle="dropdown"
        className="border border-gray-400 text-mango-gray-5 bg-white wrap-booking-header-listview-type-text  hover:text-white
           hover:bg-mango-primary-blue focus:bg-mango-primary-blue focus:text-white rounded-md p-2 text-center inline-flex 
           items-center w-[145px] h-[45px] justify-between px-4 hover:border-none"
        type="button"
        style={{boxShadow: "0px 0px 15px #0000004d"}}
      >
        <span className="w-14">{selectedValue}</span>
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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

export default ListViewType;
