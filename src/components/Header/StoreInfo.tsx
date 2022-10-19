import React, { useState } from "react";
import { Popover } from "antd";
import cc from "classnames";
import { BlobOptions } from "buffer";

function StoreInfo() {
  const [isClick, setIsClick] = useState<boolean>(false);

  const storeInfo = (
    <div className=" p-2 w-72 h-auto  border  border-dashed  border-gray-300 rounded-md" >
      
      <div className=" w-full  ">
        <div className="text-center w-full store-info">
          <img
            className="mx-auto mt-3 w-24 h-24 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Rounded avatar"
          ></img>
          <p className="p-0 m-0 text-xl text-gray-500 font-medium store-name">
            NUS STORE
          </p>
          <p className="p-0 m-0 text-sm text-gray-500 font-medium  address-line">
            Tân Ninh, 123, Long An
          </p>
          <p className="p-0 m-0 text-sm text-gray-500 font-medium  version-app">
            VERSION Mango 2.4.3
          </p>
        </div>
        <div className="flex ustify-center grid-cols-3 gap-3 text-center pt-2">
          <button
            onClick={() => setIsClick(false)}
            className={cc(
              " justify-center w-20  py-1",
              "font-medium  text-lg text-gray-900 active:bg-cyan-400",
              "bg-white rounded-md border border-gray-300 hover:cursor-pointer shadow-md",
              "focus:outline-none  focus:bg-cyan-400 focus:text-white focus:font-bold "
            )}
          >
            Mango
          </button>
          <button
            onClick={() => setIsClick(true)}
            className={cc(
              "justify-center w-20  py-1  ",
              "font-medium  text-lg text-gray-900 active:bg-cyan-400",
              "bg-white rounded-md border border-gray-300 hover:cursor-pointer shadow-md",
              "focus:outline-none  focus:bg-cyan-400 focus:text-white focus:font-bold"
            )}
          >
            MI
          </button>
          <button
            onClick={() => setIsClick(true)}
            className={cc(
              "inline-flex justify-center w-20  py-1 local-button",
              "font-medium  text-lg text-gray-900 active:bg-cyan-400",
              "bg-white rounded-md border border-gray-300 hover:cursor-pointer shadow-md",
              "focus:outline-none  focus:bg-cyan-400 focus:text-white focus:font-bold"
            )}
          >
            Local
          </button>
        </div>
        {isClick && (
          <div className="flex pt-4 signal-ip  ">
            <p className="w-3/4 mb-2 text-[15px]  border-b border-gray-400 ">
              172.29.65.111
            </p>
            <span
              className={cc(
                "inline-flex items-center font-medium",
                "w-1/4 py-1 justify-center text-lg",
                "font-medium text-center text-gray-900",
                "bg-white rounded-md  hover:cursor-pointer shadow-md "
              )}
            >
              Access
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Popover placement="bottom" content={storeInfo} trigger="click">
      <div className="flex">
       <div className="border-r border-dashed border-white h-10"></div>
      <img
        className="w-11  ml-3 h-11 rounded-full"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        alt="Rounded avatar"
      ></img>
       <div className="border-r border-dashed border-white h-10 ml-3 "></div>
       </div>
    </Popover>
  );
}

export default StoreInfo;
