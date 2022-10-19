import React, { useEffect, useState } from "react";
import { Popover } from "antd";
interface Props {
  setTypeBatchFilter: Function;
}

interface datas {
  key: number;
  value: string;
}
const data: datas[] = [
  { key: 1, value: "all" },
  { key: 2, value: "a1" },
  { key: 3, value: "a2" },
  { key: 4, value: "a3" },
  { key: 5, value: "a4" },
];
function TypeBatchFilter({ setTypeBatchFilter }: Props) {
  const [selectedValue, setSelectedValue] = useState("All");
  useEffect(() => {
    setTypeBatchFilter(selectedValue);
  }, [selectedValue]);

  const dayType = (
    <div className=" bg-white divide-y divide-gray-100  w-44  h-60">
      <ul className="text-lg font-medium text-gray-600 ">
        {data.map((option) => (
          <li
            key={option.key}
            onClick={() => {
              setSelectedValue(() => option.value);
            }}
            className="block px-4 py-1.5 hover:bg-mango-primary-blue hover:text-white "
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <Popover
      overlayClassName="p-0 m-0"
      placement="bottom"
      content={dayType}
      trigger="click"
    >
      <button
        data-dropdown-toggle="dropdown"
        className="border border-gray-400 bg-white text-lg font-medium text-gray-600 px-2 
          hover:text-white hover:bg-mango-primary-blue focus:bg-mango-primary-blue focus:text-white  rounded-md  
           text-center inline-flex items-center h-9 "
        type="button"
      >
      
        <span className="w-[100px]">{selectedValue}</span>
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
export default TypeBatchFilter;
