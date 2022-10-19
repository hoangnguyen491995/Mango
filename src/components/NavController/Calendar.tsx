import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { DatePicker, DatePickerProps, Popover, Space, TimePicker } from "antd";
import styled from "styled-components";
import moment from "moment";
import HomeContext from "../Book/HomeContext";
import { RangeValue } from "rc-picker/lib/interface";
import { RangePickerProps } from "antd/lib/date-picker";
import ReactCalendar from "react-calendar";


interface Props {
  datet: Date;
  setDate: Function;
  typeDate: string;
}
const { RangePicker } = DatePicker;

const PickerWithType = ({
  type,
  size,
  className,
  onChange,
  value,
  defaultValue,
  format,
  suffixIcon,
}) => {
  return (
    <DatePicker
      picker={type}
      className={className}
      size={size}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      format={format}
      suffixIcon={suffixIcon}
    />
  );
};

function Calendar({ datet, setDate, typeDate }: Props) {
  const [type, setType] = useState("time");
  const [dateTime, setDateTime] = useState(moment(datet));
  const bookContext = useContext(HomeContext)[0];
  const currentDate = new Date();
  const [dateRange, setDateRange] = useState<Date>(currentDate);
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const changeDate: DatePickerProps["onChange"] = (date) => {
    setDate(moment(date).toDate());
    hide();
  };

  useEffect(() => {
    let elmBoth = document?.getElementsByClassName(
      "react-calendar__tile--rangeBothEnds"
    )[0];
    if (typeDate == "WEEK") {
      const classes = elmBoth?.classList;
      classes?.remove("react-calendar__tile--rangeStart");
      classes?.remove("react-calendar__tile--rangeEnd");
    }
  }, [dateTime]);

  // set datetime when click increase or descrease
  useEffect(() => {
    setDateTime(moment(datet));
  }, [datet]);
  // get typedate to show
  useEffect(() => {
    setType(typeDate == "DAY" ? "date" : typeDate == "WEEK" ? "week" : "list");
    setDateRange(currentDate)
    setDate(moment(currentDate).toDate());
  }, [typeDate]);

  const handleChangeDateListView = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    bookContext.setDateListView({
      start: moment(value?.[0]).clone().format("MM-DD-YYYY"),
      end: moment(value?.[1]).clone().format("MM-DD-YYYY"),
    });
  };
  const handleOnClickBackMonth = () => {
    setDateRange(moment(dateRange).clone().subtract(1, "M").toDate());
  };
  const handleOnClickNextMonth = () => {
    setDateRange(moment(dateRange).clone().add(1, "M").toDate());
  };

  useEffect(() => {
    bookContext.setDateCurrent(dateTime.toDate());
  }, [dateTime]);

  const addClassNameInWeek = ({ activeStartDate, date, view }) =>
    typeDate == "WEEK" &&
    (moment(dateTime).clone().startOf("week").format("MM/DD/yyyy") <
    moment(date).format("MM/DD/yyyy")
      ? moment(date).format("MM/DD/yyyy") <
        moment(dateTime).clone().endOf("week").format("MM/DD/yyyy")
        ? moment(date).format("MM/DD/yyyy") ==
          moment(dateTime).clone().format("MM/DD/yyyy")
          ? ""
          : " react-calendar__tile--active react-calendar__tile--range"
        : moment(date).format("MM/DD/yyyy") ==
            moment(dateTime).clone().endOf("week").format("MM/DD/yyyy") &&
          "react-calendar__tile--rangeEnd"
      : moment(dateTime).clone().startOf("week").format("MM/DD/yyyy") ==
        moment(date).format("MM/DD/yyyy")
      ? "react-calendar__tile--active react-calendar__tile--rangeStart"
      : null);

  //   ? "date-pass-over"
  //   : null;

  const handleOnClickNextWeek = (number) => {
    switch (number) {
      case 1:
        setDate(moment(currentDate).clone().add(1, "w").toDate());
        bookContext.setDateListView({
          start: moment(currentDate).clone().format("MM-DD-YYYY"),
          end: moment(currentDate).clone().add(1, "w").toDate(),
        });
        break;
      case 2:
        setDate(moment(currentDate).clone().add(2, "w").toDate());
        bookContext.setDateListView({
          start: moment(currentDate).clone().format("MM-DD-YYYY"),
          end: moment(currentDate).clone().add(2, "w").toDate(),
        });
        break;
      case 3:
        setDate(moment(currentDate).clone().add(3, "w").toDate());
        bookContext.setDateListView({
          start: moment(currentDate).clone().format("MM-DD-YYYY"),
          end: moment(currentDate).clone().add(3, "w").toDate(),
        });
        break;
      case 4:
        setDate(moment(currentDate).clone().add(4, "w").toDate());
        bookContext.setDateListView({
          start: moment(currentDate).clone().format("MM-DD-YYYY"),
          end: moment(currentDate).clone().add(4, "w").toDate(),
        });
        break;
      case 5:
        setDate(moment(currentDate).clone().add(5, "w").toDate());
        bookContext.setDateListView({
          start: moment(currentDate).clone().format("MM-DD-YYYY"),
          end: moment(currentDate).clone().add(5, "w").toDate(),
        });
        break;
      case 6:
        setDate(moment(currentDate).clone().add(6, "w").toDate());
        bookContext.setDateListView({
          start: moment(currentDate).clone().format("MM-DD-YYYY"),
          end: moment(currentDate).clone().add(6, "w").toDate(),
        });
        break;
      default:
        break;
    }
  };

  const calendarCustom = (
    <div className="calendar-book flex p-5 min-w-[570px] h-[390px] bg-white rounded-md">
      <div className="w-9/12 mr-3">
        <div className="flex justify-between w-full pl-4 pr-8 ">
          <button
            className={`cursor-pointer  h-[40px] hover:rounded-full w-[40px]
             hover:bg-mango-primary-blue hover:text-white flex justify-center items-center`}
            // disabled={moment(dateRange).month() == moment().month()}
            onClick={handleOnClickBackMonth}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              stroke="currentColor"
              className="bi bi-chevron-left  -ml-1"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                strokeWidth={1}
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 
                0-.708l6-6a.5.5 0 0 1 .708 0z"
              />{" "}
            </svg>
          </button>
          <span className="uppercase text-base font-bold text-mango-gray-5 my-auto">
            {/* {convertDate(dateRange)} */}
            {moment(dateRange).format("MMM YYYY")}
          </span>
          <button
            className={`cursor-pointer  h-[40px] hover:rounded-full w-[40px]
              hover:bg-mango-primary-blue hover:text-white flex justify-center items-center`}
            onClick={handleOnClickNextMonth}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              stroke="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                strokeWidth={1}
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 
                4.646 2.354a.5.5 0 0 1 0-.708z"
              />{" "}
            </svg>
          </button>
        </div>

        <div>
          <div className="title-in-book-calendar flex w-full  px-1 ">
            <div className="w-[45px] text-base font-bold">Su</div>
            <div className="w-[45px] text-base font-bold">Mo</div>
            <div className="w-[45px] text-base font-bold">Tu</div>
            <div className="w-[45px] text-base font-bold">We</div>
            <div className="w-[45px] text-base font-bold">Th</div>
            <div className="w-[45px] text-base font-bold">Fr</div>
            <div className="w-[45px] text-base font-bold">Sa</div>

            {/* <p>
                Current selected date is{" "}
                <b>{moment(dateState).format("MMMM Do YYYY")}</b>
              </p> */}
          </div>
          <div className=" w-[90%] border-t border-mango-gray-3 ml-2 -mt-2.5 calendar-book"></div>
          {type == "list" ? (
            <ReactCalendar
              onChange={handleChangeDateListView}
              calendarType={"US"}
              activeStartDate={dateRange}
              selectRange={true}
              value={[
                moment(bookContext.dateListView.start),
                moment(bookContext.dateListView.end),
              ]}
              defaultValue={[
                moment().clone().startOf("week"),
                moment().clone().endOf("week"),
              ]}
            />
          ) : (
            <ReactCalendar
              value={dateTime.toDate()}
              onChange={changeDate}
              calendarType={"US"}
              defaultValue={dateTime.toDate()}
              activeStartDate={dateRange}
              tileClassName={addClassNameInWeek}
            />
          )}
          {/* <ReactCalendar
            value={dateTime.toDate()}
            onChange={changeDate}
            calendarType={"US"}
            defaultValue={dateTime.toDate()}
            activeStartDate={dateRange}
         
          /> */}
        </div>
      </div>
      <div className="w-3/12 mr-5 space-y-4 mt-3">
        <button
          className="btn-next-week w-full focus:bg-mango-primary-blue hover:border-mango-primary-blue
           hover:bg-mango-primary-blue-hover focus:text-white border border-mango-gray-3 "
          onClick={() => handleOnClickNextWeek(1)}
        >
          1 Week
        </button>
        <button
          className="btn-next-week w-full focus:bg-mango-primary-blue hover:border-mango-primary-blue
             hover:bg-mango-primary-blue-hover focus:text-white border border-mango-gray-3 "
          data-week="0"
          onClick={() => handleOnClickNextWeek(2)}
        >
          2 Week
        </button>
        <button
          className="btn-next-week w-full focus:bg-mango-primary-blue hover:border-mango-primary-blue
         hover:bg-mango-primary-blue-hover focus:text-white border border-mango-gray-3 "
          data-week="0"
          onClick={() => handleOnClickNextWeek(3)}
        >
          3 Week
        </button>
        <button
          className="btn-next-week w-full focus:bg-mango-primary-blue hover:border-mango-primary-blue
             hover:bg-mango-primary-blue-hover focus:text-white border border-mango-gray-3 "
          data-week="0"
          onClick={() => handleOnClickNextWeek(4)}
        >
          4 Week
        </button>
        <button
          className="btn-next-week w-full focus:bg-mango-primary-blue hover:border-mango-primary-blue
            hover:bg-mango-primary-blue-hover focus:text-white border border-mango-gray-3 "
          data-week="0"
          onClick={() => handleOnClickNextWeek(5)}
        >
          5 Week
        </button>
        <button
          className="btn-next-week w-full focus:bg-mango-primary-blue hover:border-mango-primary-blue
 hover:bg-mango-primary-blue-hover focus:text-white border border-mango-gray-3 "
          data-week="0"
          onClick={() => handleOnClickNextWeek(6)}
        >
          6 Week
        </button>
      </div>
    </div>
  );

  return (
   
    <Popover
      overlayClassName="p-0 m-0"
      placement="bottomLeft"
      content={calendarCustom}
      trigger="click"
      visible={open}
      onVisibleChange={handleOpenChange}
    >
      <div
        className="calendar-book-custom border-y border-gray-400  hover:text-white"
        style={{
          boxShadow: "3px 0px 3px 0px #D1D1D1, 3px 0px 4px 0px #F1F1F1",
        }}
      >
        <span className="booking-header-day-filter-date-text">
          {/* {moment(dateTime).clone().format("dddd,  MMM DD, YYYY")} */}
          {typeDate == "DAY" ? (
            <span className="flex">
              {moment(dateTime).clone().format("dddd,  MMM DD, YYYY")}
            </span>
          ) : typeDate == "WEEK" ? (
            <span>
              {moment(dateTime).clone().startOf("week").format("MMM DD") +
                " - " +
                moment(dateTime).clone().endOf("week").format("MMM DD YYYY")}
            </span>
          ) : (
            <span className="flex justify-between items-center text-center">
              {moment(bookContext.dateListView.start).format("dd DD MMM, YY")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="16"
                fill="grey"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 
           .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
              {moment(bookContext.dateListView.end).format("dd DD MMM, YY")}
            </span>
          )}
        </span>
      </div>
    </Popover>
  );
}

export default Calendar;
