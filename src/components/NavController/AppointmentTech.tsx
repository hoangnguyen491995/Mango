import React, { useState, useEffect, useContext } from "react";
import UseSearch from "src/utils/UseSearch";
import { Popover } from "antd";
import styled from "styled-components";
import { Radio, Space } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { Console } from "console";
import { GetInfoTech } from "services/Employees/GetInfoTech";
import { GetWorkingEmployeeList } from "services/Employees/GetWorkingEmployeeList";
import HomeContext from "src/components/Book/HomeContext";

import { IResourceMap } from "src/components/Book/IterfaceStructures";

import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";
import ModalAppointmentShedulerDetail from "../Book/ModalAppointmentShedulerDetail";

function AppointmentTech() {
  const [listTechSelected, setListTechSelected] = useState<
    Array<ITechSalonCenter>
  >([]);

  const getInfoTech = new GetInfoTech();
  const getWorkingEmployeeList = new GetWorkingEmployeeList();
  const [isFilterByTech, setIsFilterByTech] = useState<boolean>(false);
  const [value, setValue] = useState("ALL STAFF");
  const [isDataSearch, setIsDataSearch] = useState<boolean>();
  const [countTech, setCountTech] = useState<number>();
  const bookContext = useContext(HomeContext)[0];
  const [searchTechValue, setSearchValue] = useState<string>("");
  const searchValue = UseSearch(searchTechValue, 500);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [isData, setIssData] = useState(false);
  useEffect(() => {
    setCurrentDate(bookContext.dateCurent);
  }, [bookContext.dateCurent]);
  const date = `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()} `;
  useEffect(() => {
    bookContext.setLoadingCalendar(true);
    try {
      getWorkingEmployeeList
        .getWorkingEmployeeList(date, 0, 1, bookContext.orderBy)
        .then((res) => {
          if (res.status === 200) {
            bookContext.setDataInforTech(res.data.techs);
            bookContext.setListResources(res.data.techs);
            bookContext.setLoadingCalendar(false);
          }
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
      bookContext.setLoadingCalendar(false);
    }
  }, [
    date,
    bookContext.countSalonAPPT,
    bookContext.orderBy,
    bookContext.viewTypeCalendar,
  ]);

  useEffect(() => {
    let count: number = 0;
    bookContext.dataInforTech.map((tech) => {
      if (tech.employeeID < 10000) {
        count += 1;
      }
    });
    bookContext.setCountSalonAPPT(count);
  }, [bookContext.dataInforTech]);

  useEffect(() => {
    bookContext.setListResources(bookContext.dataInforTech);
    bookContext.setDataInforShow(bookContext.dataInforTech);
    bookContext.dataInforTech.length > 0 ? setIssData(true) : setIssData(false);
  }, [bookContext.dataInforTech]);

  useEffect(() => {
    setIsDataSearch(isData);
  }, [isData]);

  useEffect(() => {
    isData && setCountTech(bookContext.listResources.length);
  }, [bookContext.listResources]);

  useEffect(() => {
    if (isFilterByTech) {
      bookContext.setListResources(listTechSelected);
    }
    if (listTechSelected.length < 1 && isFilterByTech) {
      bookContext.setListResources(bookContext.dataInforTech);
    }
  }, [listTechSelected]);

  // Checked all and working
  const handleChangeTypeTech = (e) => {
    setValue(e.target.value);
    if (e.target.value == "ALL STAFF") {
      bookContext.setListResources(bookContext.dataInforTech);
      setIsFilterByTech(false);
      setListTechSelected(listTechSelected.filter((item) => item !== item));
      bookContext.setDataInforShow(bookContext.dataInforTech);
    }
    if (e.target.value == "WORKING STAFF") {
      setIsFilterByTech(false);
      const listWorking: ITechSalonCenter[] = [];
      setListTechSelected(listTechSelected.filter((item) => item !== item));
      bookContext.dataInforTech.map((tech) => {
        if (tech.lockIn != "" && tech.lockIn != null) {
          listWorking.push(tech);
        }
      });
      bookContext.setDataInforShow(listWorking);
      bookContext.setListResources(listWorking);
    }
  };

  // selct tech
  const handleSelectTech = (tech) => {
    setIsFilterByTech(true);
    if (value != "SPECIFIC STAFF") {
      setValue("SPECIFIC STAFF");
    }
  };

  const handleOnClickTech = (tech) => {
    setIsFilterByTech(true);
    const isChecked = listTechSelected.includes(tech);
    if (isChecked) {
      setListTechSelected(listTechSelected.filter((item) => item !== tech));
    } else {
      setListTechSelected((prevState) => [...prevState, tech]);
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const appointmentTech = (
    <div className=" bg-white  divide-gray-100 rounded-b-md  appoiment-tech w-[250px]">
      <Radio.Group onChange={handleChangeTypeTech} value={value}>
        <Space>
          <div
            className="w-full space-y-1  "
            style={{ boxShadow: "0px 4px 5px 0px rgb(0 0 0 / 10%)" }}
          >
            <Radio
              value={"ALL STAFF"}
              className="w-full block justify-between hover:border-mango-primary-blue-hover 
              hover:bg-mango-primary-blue-light  flex-row-reverse  tech-option-text"
            >
              <div className="py-4 w-48 ">
                <span>ALL STAFF </span>
              </div>
            </Radio>
            <Radio
              value={"WORKING STAFF"}
              className="w-full block justify-between hover:border-mango-primary-blue-hover 
                hover:bg-mango-primary-blue-light 
                flex-row-reverse  tech-option-text"
            >
              <div className="py-4 w-48 ">
                <span>WORKING STAFF</span>
              </div>
            </Radio>
          </div>
        </Space>
      </Radio.Group>

      {isDataSearch && (
        <div className="w-[250px] h-[300px] overflow-y-auto overflow-x-hidden border-t-2 rounded-b-md   ">
          <div className="w-[250px] space-y-1 pr-2 rounded-b-md ">
            {bookContext.dataInforShow.map((tech, index) => {
              if (
                tech.employeeName
                  .toUpperCase()
                  .includes(`${searchValue.toUpperCase()}`)
              )
                if (tech.employeeID > 9999)
                  return (
                    <Radio
                      onClick={() => handleOnClickTech(tech)}
                      // onChange={() => setValue("SPECIFIC STAFF")}
                      onChange={() => handleSelectTech(tech)}
                      // value ={tech.nickName}
                      checked={listTechSelected.includes(tech)}
                      key={index}
                      className="w-full block justify-between radio-selected-tech
                      hover:bg-mango-primary-blue-light  flex-row-reverse "
                    >
                      <div className="py-3 w-48 tech-option-list-item-text flex justify-start items-center text-center">
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background:
                              tech.backGroundColor == "#FFFFFF" ||
                              tech.backGroundColor == ""
                                ? "#94D50020"
                                : `${tech.backGroundColor + "20"}`,
                            color:
                              tech.backGroundColor == "#FFFFFF" ||
                              tech.backGroundColor == ""
                                ? "#94D500"
                                : tech.backGroundColor,
                          }}
                          className={
                            "text-lg  font-bold  rounded-full w-[35px] h-[35px] shadow-sm "
                          }
                        >
                          {tech.employeeID > 9999
                            ? tech.employeeName.slice(0, 1).toUpperCase()
                            : "NA"}
                        </span>
                        <span className="ml-2">{tech.employeeName}</span>
                      </div>
                    </Radio>
                  );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const title = (
    <div>
      <div className="relative w-full ">
        <input
          value={searchTechValue}
          onChange={handleSearch}
          type="search"
          className="block w-full z-20 text-base border-none active:border-none focus:border-none "
          placeholder="Search tech name"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2 text-sm font-medium "
        >
          <IoSearchOutline className="w-5 h-5 " color="grey" />
        </button>
      </div>
    </div>
  );

  return (
    <Popover
      placement="bottom"
      title={title}
      content={appointmentTech}
      trigger="click"
    >
      <button
        className="border border-gray-400 bg-white text-sm font-semibold  h-[45px] text-mango-gray-5
         hover:bg-mango-primary-blue focus:bg-mango-primary-blue focus:text-white  rounded-md pl-2.5 py-2.5  
          text-center hover:text-white inline-flex items-center hover:border-mango-primary-blue pr-2"
        type="button"
        style={{ boxShadow: "0px 0px 15px #0000004d" }}
      >
        <span className="w-full">
          {value} ({countTech})
        </span>
        <svg
          className="w-6 h-6 items-center justify-center flex"
         
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
export default AppointmentTech;
