import React, { useState, useEffect } from "react";
import { Popover, Select } from "antd";
import TableListView from "./TableListView";

import { IoSearchOutline } from "react-icons/io5";
import { LstItemByFilterLstView } from "services/Appointments/LstItemByFilterLstView";
export interface IListService {
  itemID: number;
  itemName: string;
}
interface Props {
  setListServiceFilter: Function;
  listServiceFilter: string[]
}
const SearchService = ({ setListServiceFilter, listServiceFilter }: Props) => {
  const { Option } = Select;
  const [listService, setListService] = useState<Array<IListService>>([]);
  const apiLstItemByFilterLstView = new LstItemByFilterLstView();
  const children: React.ReactNode[] = [];
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>("");

  // const handleChange = (value: string[]) => {
  //   setListServiceFilter(value);
  // };
  
  const handleSearch = (value) => {
    setValueSearch(value);
  };

  useEffect(() => {
    const param = {
      keyword: "",
      startnumber: 0,
    };
    apiLstItemByFilterLstView
      .lstItemByFilterLstView(param.keyword, param.startnumber)
      .then((res) => {
        if (res.status == 200) {
          setListService(res.data);
        }
      });
  }, []);
  const handlSelectService = (itemName) => {
   
    const isChecked = listServiceFilter.includes(itemName);
    if (isChecked) {
      setListServiceFilter(listServiceFilter.filter((item) => item !== itemName));
    } else {
      if(listServiceFilter.length < 5) {
        setListServiceFilter((prevState) => [...prevState, itemName]);
      }
     
    }
  };

  // listService.map((item, index) =>
  //   children.push(<Option key={item.itemName}>{item.itemName}</Option>)
  // );
  const containerSearchService = (
    <div className="w-[400px] rounded-lg box-search-service p-4 space-y-2">
      <div className="relative flex">
        <input
          className="rounded-l-lg text-ms border-none w-full input-number-send-sms"
          type="search"
          autoComplete="off"
          spellCheck="false"
          placeholder="Searrch service"
          onFocus={() => {
            setIsFocusInput(true);
          }}
          onBlur={() => setIsFocusInput(false)}
          onChange={(e) => handleSearch(e.target.value)}
          value={valueSearch}
        ></input>
        <div
          className="search-icon right-0 bottom-2 mr-2  text-mango-gray-5 rounded-lg cursor-pointer absolute"
          onClick={() => {
            setValueSearch("");
          }}
        >
          {isFocusInput ? (
            <svg
              className=" mb-2 mr-2"
              width="18"
              height="18"
              viewBox="0 0 12 12"
              fill="currentColor"
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
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="listview-service-form space-y-3 ">
        {listService.map((item, index) => {
          if (
            item.itemName.toUpperCase().includes(`${valueSearch.toUpperCase()}`)
          )
            return (
              <div
                key={item.itemName}
                className="box-service-lv"
                onClick={() => handlSelectService(item.itemName)}
              >
                {item.itemName}
              </div>
            );
        })}
      </div>
    </div>
  );
  const handleDeleteServiceSearch = (service)=>{
    setListServiceFilter(listServiceFilter.filter((item) => item !== service));
  }

  return (
    <>
      <Popover
        placement="bottomRight"
        content={containerSearchService}
        trigger="click"
      >
        <button
          className="border-b-2 border-mango-gray-3 bg-mango-gray-1 
         ml-2 py-1 inline-flex items-center h-[40px]"
          type="button"
        >
          <div className="w-[800px]">
            {listServiceFilter.length > 0 ? <div className="flex space-x-2">
              {listServiceFilter.map((service, ixdex)=>{
              return (<div key={ixdex} className="flex   font-semibold text-[13px]
              border border-mango-gray-4 items-center  p-1.5 bg-white uppercase text-mango-gray-5">
                <span>{service}</span>
                <svg
                onClick={()=>handleDeleteServiceSearch(service)}
              className="  text-mango-orange -mt-1"
              width="15"
              height="15"
              viewBox="0 0 12 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 
              0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 
              1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />{" "}
            </svg>
              </div>)
              })}
            </div>

            : <span className=" title-search-lv flex justify-start">SORT BY SERVICE</span>}
          
          </div>
         
          <svg
            className="w-5 h-5 ml-2 items-center justify-center flex text-mango-gray-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 21 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </Popover>
    </>
  );
};
export default SearchService;
