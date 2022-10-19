import React, { useState, useEffect  } from "react";
import { Popover } from "antd";
interface Props {
    setTypeFilter: Function
  }

function TypeFilter({ setTypeFilter }: Props) {
    const [selectedValue, setSelectedValue] = useState("DAY");
    useEffect(() => {
        setTypeFilter(selectedValue)
    }, [selectedValue])
    
    const dayType = (
      <div className=" bg-white divide-y divide-gray-100  w-44 ">
        <ul className="text-lg font-medium text-gray-600 ">
          <li
            onClick={() => {
              setSelectedValue("DAY");
            }}
            className="block px-3 py-2 hover:bg-mango-primary-blue hover:text-white "
          >
            DAY
          </li>
          <li
            onClick={() => {
              setSelectedValue("WEEK");
            }}
            className="block px-3 py-2 hover:bg-mango-primary-blue border-t hover:text-white "
          >
            WEEK
          </li>
          <li
            onClick={() => {
              setSelectedValue("MONTH");
            }}
            className="block px-3 py-2 hover:bg-mango-primary-blue border-t hover:text-white "
          >
            MONTH
          </li>
          <li
            onClick={() => {
              setSelectedValue("YEAR");
            }}
            className="block px-3 py-2 hover:bg-mango-primary-blue border-t hover:text-white "
          >
            YEAR
          </li>
        </ul>
      </div>
    );
    return (
      
      <Popover
      
        placement="bottom"
        content={dayType}
        trigger="click"
      >
        <button
          data-dropdown-toggle="dropdown"
          className="border border-gray-400 bg-white  text-base font-medium text-gray-600 
           hover:text-white hover:bg-mango-primary-blue focus:bg-mango-primary-blue focus:text-white h-9
           rounded-md px-2   text-center inline-flex items-center "
          type="button"
        >
          <span className='w-16'>{selectedValue}</span>
          <svg
            className="w-4 h-4 ml-2 right-0"
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

export default TypeFilter