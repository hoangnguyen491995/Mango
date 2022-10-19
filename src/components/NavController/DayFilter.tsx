import React, { useState, useContext } from "react";
import Calendar from "./Calendar";
import cc from "classnames";
import HomeContext from "src/components/Book/HomeContext";
import moment from "moment";

interface Props {
  typeDate: string;
}

function DayFilter({ typeDate }: Props) {
  const current = new Date();
  const bookContext = useContext(HomeContext)[0];
  const [datet, setDate] = useState<Date>(current);
  // bookContext.setDateCurrent(datet);


  const handleOnClickDecrease = () => {
    typeDate == "LIST"
      ? 
          new Date(
            bookContext.setDateListView({
              start: moment(bookContext.dateListView.start).subtract(1, "days"),
              end: moment(bookContext.dateListView.end).subtract(1, "days"),
            })
          
        )
      : setDate(
          new Date(datet.setDate(datet.getDate() - (typeDate == "DAY" ? 1 : 7)))
        );
  };
  const handleOnClickIncrease = () => {
    typeDate == "LIST"
      ? 
          new Date(
            bookContext.setDateListView({
              start: moment(bookContext.dateListView.start).add(1, "days"),
              end: moment(bookContext.dateListView.end).add(1, "days"),
            })
          )
        
      : setDate(
          new Date(datet.setDate(datet.getDate() + (typeDate == "DAY" ? 1 : 7)))
        );
  };
  return (
    <div className="  place-items-center rounded-md lg:flex md:flex sm:hidden"
    style={{boxShadow: "0px 0px 15px #0000004d"}}>
      <div
        className={cc(
          "border border-gray-400 bg-white text-sm font-semibold h-[45px] rounded-l-[4px] hover:bg-mango-primary-blue",
          "active:border-mango-primary-blue hover:cursor-pointer justify-center  hover:text-white text-gray-600",
          "focus:outline-none w-[45px] flex items-center focus:bg-mango-primary-blue focus:text-white focus:font-bold ",
          "hover:border-mango-primary-blue"
        )}
        onClick={handleOnClickDecrease}
       
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          className="w-6 h-6 m-1.5 "
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
      {/* Button today */}
      <button
        className={cc(
          "border-y border-r text-sm  border-gray-400 bg-white h-[45px] w-[75px] justify-center hover:bg-mango-primary-blue",
          " active:border-mango-primary-blue hover:cursor-pointer hover:text-white text-gray-600",
          "focus:outline-none flex items-center font-semibold focus:bg-mango-primary-blue focus:text-white focus:font-bold ",
          "hover:border-mango-primary-blue ")}
        onClick={() => setDate(new Date())}
      >
        TODAY
      </button>
      {/* Calendar */}
      <div className=" bg-white  text-mango-primary-blue  hover:bg-mango-primary-blue 
       hover:cursor-pointer w-[330px] h-[45px] calendar-filter">
        <Calendar datet={datet} setDate={setDate} typeDate={typeDate} />
      </div>
      {/* Button increase day */}
      <div
        className={cc(
          "border border-gray-400 bg-white h-[45px] w-[45px] rounded-r-[4px] hover:bg-mango-primary-blue justify-center ",
          " active:bg-mango-primary-blue hover:cursor-pointer hover:text-white text-mango-gray-5",
          "focus:outline-none flex items-center focus:bg-mango-primary-blue focus:text-white focus:font-bold ",
          "hover:border-mango-primary-blue"
        )}
        onClick={handleOnClickIncrease}
       
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          className="w-6 h-6 m-1.5 "
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"    
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5
             0 0 1 0-.708z"
          />
        </svg>
      </div>
    </div>
  );
}

export default DayFilter;
