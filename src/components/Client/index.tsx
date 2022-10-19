import { Input, Popover, Rate } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IClient } from "./InterfaceStructures";
import { GetListClient } from "services/Customers/GetListClient";
import ListView from "./ListView";
import GridView from "./GridView";
import UseSearch from "src/utils/UseSearch";
import { AddNewClient } from "./AddNewClient";

function index() {
  const getListClient = new GetListClient();
  const [clientList, setClientList] = useState<Array<IClient>>([]);
  const [selectType, setSelectType] = useState<number>(0);
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [valueSearch, setValueSearch] = useState<string>("");
  const valueSearchClient = UseSearch(valueSearch, 500);
  const [selectedValue, setSelectedValue] = useState("SORT BY A-Z");
  useEffect(() => {
    try {
      setIsLoading(true);
      let type = 0;
      switch (selectedValue) {
        case "SORT BY A-Z":
          type = 0;
          break;
        case "SORT BY Z-A":
          type = 1;
          break;
        case "NEWEST":
          type = 2;
          break;
        case "OLDEST":
          type = 3;
          break;
        default:
          type = 0;
          break;
      }

      getListClient.getListClient(valueSearchClient, 0, type).then((res) => {
        if (res.status === 200) {
          setClientList(res.data);
          setIsLoading(false);
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, [valueSearchClient, selectedValue]);

  const onViewList = () => {
    setSelectType(0);
  };

  const onViewCard = () => {
    setSelectType(1);
  };
  const handleSearch = (value) => {
    setValueSearch(value);
  };
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };
  const hide = () => {
    setVisible(false);
  };
  
  const content = (
    <div className="rounded-md w-[140px]" onClick={hide}>
      <ul>
        <li
          className="text-value text-center h-12 hover:bg-mango-gray-1 rounded-t-md
         items-center flex justify-center cursor-pointer"
          onClick={() => setSelectedValue("SORT BY A-Z")}
        >
          SORT BY A-Z
        </li>
        <li
          className="text-value text-center h-12 hover:bg-mango-gray-1 
         items-center flex justify-center cursor-pointer"
          onClick={() => setSelectedValue("SORT BY Z-A")}
        >
          SORT BY Z-A
        </li>
        <li
          className="text-value text-center h-12 hover:bg-mango-gray-1 
         items-center flex justify-center cursor-pointer"
          onClick={() => setSelectedValue("NEWEST")}
        >
          NEWEST
        </li>
        <li
          className="text-value text-left h-12 hover:bg-mango-gray-1 rounded-b-md
         items-center flex justify-center cursor-pointer"
          onClick={() => setSelectedValue("OLDEST")}
        >
          OLDEST
        </li>
      </ul>
    </div>
  );
  const text = <span>Title</span>;
  return (
    <div
      className="h-[100%] bg-mango-gray-1"
      style={{
        paddingTop: "10px",
        fontFamily: "sans-serif",
        fontSize: "15px",
        overflow: "hidden",
      }}
    >
      <div className="flex justify-between m-3">
        <div className="ml-2 text-mango-gray-5 text-2xl font-semibold cursor-default">
          Client
        </div>
        <div className="flex">
          <div className="flex items-center lg:space-x-6 md:space-x-1 cursor-pointer">
            <div
              className="flex justify-center items-center focus:outline-0 pr-2  h-[45px] search-input-name-client
             w-[400px] rounded-sm bg-white relative"
            >
              <input
                className=" rounded-sm text-ms border-none w-full"
                type="search"
                autoComplete="off"
                spellCheck="false"
                placeholder="Search name, phone and email"
                onFocus={() => {
                  setIsFocusInput(true);
                }}
                onBlur={() => setIsFocusInput(false)}
                onChange={(e) => handleSearch(e.target.value)}
                value={valueSearch}
              ></input>
              <div className="search-icon  text-gray-800  rounded-lg ">
                {isFocusInput ? (
                  <svg
                    className=" mb-2 mr-2"
                    width="20"
                    height="20"
                    viewBox="0 0 12 12"
                    fill="gray"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 
              0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 
              1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    />{" "}
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998
           12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925
            15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025
             12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1
              6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637
               1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                      stroke="gray"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="flex">
              <button
                className={`flex rounded-[4px]
                   w-[45px] h-[45px] items-center justify-center ${
                     selectType == 0 ? "active-view-client" : ""
                   }`}
                type="button"
                style={{ boxShadow: "0px 0px 15px #0000004d" }}
                onClick={onViewList}
              >
                <img
                  src="/assets/imgs/Clients/list.svg"
                  className="w-[25px] h-[20px]"
                />
              </button>
              <button
                className={`flex border-2 border-[#A7A7A7] bg-white rounded-[4px]
                   w-[45px] h-[45px] items-center justify-center ml-[20px] ${
                     selectType == 1 ? "active-view-client" : ""
                   }`}
                type="button"
                style={{ boxShadow: "0px 0px 15px #0000004d" }}
                onClick={onViewCard}
              >
                <img
                  src="/assets/imgs/Clients/grid.svg"
                  className="w-[25px] h-[20px]"
                />
              </button>
            </div>

            <Popover
              placement="bottom"
              content={content}
              trigger="click"
              onVisibleChange={handleVisibleChange}
              visible={visible}
            >
              <button
                className="border-2  border-mango-gray-3 hover:border-mango-primary-blue  text-mango-gray-5 
                    hover:bg-mango-primary-blue-light rounded-[4px] w-[145px] h-[45px] button-client"
                style={{ boxShadow: "0px 0px 15px #0000004d" }}
              >
                {selectedValue}
              </button>
            </Popover>
           <AddNewClient/>
          </div>
        </div>
      </div>
      {selectType == 0 ? (
        <ListView clientList={clientList} isLoading={isLoading} />
      ) : (
        <GridView clientList={clientList} isLoading={isLoading} />
      )}
    </div>
  );
}

export default index;
