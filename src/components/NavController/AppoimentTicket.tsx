import React, { useState, useContext } from "react";

import { Radio, Space, Popover } from "antd";
import HomeContext from "src/components/Book/HomeContext";

function AppoimentTicket() {
  const [visible, setVisible] = useState(false);
  const bookContext = useContext(HomeContext)[0];
  const onChange = (e) => {
    bookContext.setFilterTypeTicket(e.target.value);
  };
  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };
  const appoimentTicket = (
    <div className=" bg-white  divide-gray-100 rounded-md w-40"
    onClick={hide}>
      <Radio.Group onChange={onChange} value={bookContext.filterTypeTicket}>
        <Space>
          <div className="w-full  text-gray-600 text-ms  font-medium">
           
            <Radio
              defaultChecked={true}
              value={"ALL BOOK"}
              className="w-full block justify-between hover:border-mango-primary-blue hover:text-white
               hover:bg-mango-primary-blue focus:bg-mango-primary-blue flex-row-reverse  text-gray-600
               hover:rounded-t-md border-b "
            >
              <div className="py-2 w-28">
                <span >ALL BOOK</span>
              </div>
            </Radio>
            <Radio
              value={"BOOK ONLINE"}
              className="w-full block justify-between hover:border-mango-primary-blue hover:text-white
              hover:bg-mango-primary-blue focus:bg-mango-primary-blue flex-row-reverse  text-gray-600
              border-b "
           >
              <div className="py-2 w-28">
                <span >BOOK ONLINE</span>
              </div>
            </Radio>
            <Radio
              value={"BOOK OFFLINE"}
              className="w-full block justify-between hover:border-mango-primary-blue hover:text-white
              hover:bg-mango-primary-blue focus:bg-mango-primary-blue flex-row-reverse  text-gray-600
              hover:rounded-b-md "
           >
              <div className="py-2 w-28">
                <span>BOOK OFFLINE</span>
              </div>
            </Radio>
          </div>
        </Space>
      </Radio.Group>
    </div>
  );
  return (
    <Popover
      overlayClassName="p-0 m-0"
      placement="bottom"
      content={appoimentTicket}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <button
        data-dropdown-toggle="dropdown"
        className="border border-gray-400 bg-white text-sm font-semibold  text-mango-gray-5
         hover:text-white hover:bg-mango-primary-blue focus:bg-mango-primary-blue  h-[45px] focus:text-white 
          rounded-[4px] w-[150px] text-center inline-flex items-center hover:border-mango-primary-blue pr-2"
          style={{boxShadow: "0px 0px 15px #0000004d"}}
        type="button"
      >
        <span className="w-[130px]">{bookContext.filterTypeTicket}</span>
        <svg
          className="w-6 h-6  items-center justify-center flex"
        
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

export default AppoimentTicket;
