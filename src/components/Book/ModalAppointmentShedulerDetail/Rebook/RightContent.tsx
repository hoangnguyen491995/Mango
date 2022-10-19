import React, { useState, useContext, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Col, Empty, DatePickerProps, Row } from "antd";
import { ListTime } from "src/components/AddNewTix/Content/Component/RightContent/SelectTimeTech";
import moment from "moment";
import {
  convert12HToSecSelectTime,
  ShowContent,
  type,
} from "src/components/AddNewTix/Content/helper";
import { GetListTimeByDate } from "services/TimeTech/TimeTech";
import HomeContext from "src/components/Book/HomeContext";
import { ConfirmCopy } from "services/Appointments/ConfirmCopy"
import { messageSuccess } from "src/components/MessageAlert";

import { ListAppointmentDetail } from '../../IterfaceStructures';
interface Iprops {
  onCancel: Function;
  appointment: ListAppointmentDetail
}

function RightContent({ onCancel, appointment }: Iprops) {
  const currentDate = new Date();
  
  const bookContext = useContext(HomeContext)[0];
  const [listTime, setListTime] = useState<Array<ListTime>>([]);
  const [dateRange, setDateRange] = useState<Date>(currentDate);
  const [dateState, setDateState] = useState(currentDate);
  const [timeSelect, setTimeSelect] = useState<string>('');

  const confirmCopy =  new ConfirmCopy()
  const changeDate: DatePickerProps["onChange"] = (date) => {
    setDateState(moment(date).toDate());
  };

  useEffect(() => {
    setDateRange(dateState);
    const dataTimeTech = new GetListTimeByDate();
    dataTimeTech
      .getListTimeByDate(
        bookContext.techId,
        moment(dateState).format("MM/DD/yyyy")
      )
      .then((res) => {
        if (res.status === 200) {
          setListTime(res.data);
          setTimeSelect(res.data[0].time);
          
        }
      });
  }, [bookContext.techId, dateState]);

  const checkPastTime = (date) => {
    //config check thời gian quá khứ

    const timeDate = convert12HToSecSelectTime(date);
    const d = new Date();
    if (timeDate < d.getHours() * 3600 + d.getMinutes() * 60) {
      return true;
    }
    return false;
  };

  const handleSelectTime = (time) => {
    setTimeSelect(time);
  };


  const paramCopyTicket = {
    rvcNo: appointment.rvcNo,
    fromAppointmentID: appointment.appointmentID,
    fromAppointmentStatus: appointment.appointmentStatusID,
    serviceDate: moment(dateState).format("MM/DD/yyyy") + " "+ timeSelect,
    toEmployeeID:  bookContext.techId,
    toEmployeeName: appointment.employeeName,
    createBy: "",
  };



  const handleConfirm = () => {
    try {
      confirmCopy
        .confirmCopy(paramCopyTicket)
        .then((res) => {
          if (res.status === 200) {       
              messageSuccess(res.data.error_message);
          }
        })
    } catch (err) {
      console.log(err);
    }
  };

  const classDontHaveTix =
    "text-mango-gray-4 bg-white hover:border-cyan-500 hover:bg-cyan-200 ";
  const classHaveTix = "text-mango-gray-4  border-black  bg-gray-400 ";

  const convertDate = (date: Date) => {
    const Month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    if (date) {
      // console.log("date", date.getMonth());

      const getMonth = Month[date.getMonth()];

      const getYear = date.getFullYear();
      const dateFormat = getMonth + " " + getYear;
      return dateFormat;
    }
  };
  const handleOnClickBackMonth = () => {
    setDateRange(moment(dateRange).clone().subtract(1, "M").toDate());
  };
  const handleOnClickNextMonth = () => {
    setDateRange(moment(dateRange).clone().add(1, "M").toDate());
  };

  const handleDisabledDate = ({ activeStartDate, date, view }) => {
    return (
      moment(date).format("MM/DD/yyyy") <
        moment(currentDate).format("MM/DD/yyyy") ||
      moment(date).format("MM/DD/yyyy") >
        moment(dateRange).endOf("month").format("MM/DD/yyyy")
    );
  };

  const addClassNameDatePass = ({ activeStartDate, date, view }) =>
    date.getFullYear() <= currentDate.getFullYear() &&
    moment(date).format("MM/DD/yyyy") < moment(currentDate).format("MM/DD/yyyy")
      ? "date-pass-over"
      : null;
  const handleOnClickNone = () => {
    setDateState(currentDate);
  };
  const handleOnClickOneWeek = () => {
    setDateState(moment(currentDate).clone().add(1, "w").toDate());
  };
  const handleOnClickTwoWeeek = () => {
    setDateState(moment(currentDate).clone().add(2, "w").toDate());
  };
  const handleOnClickThreeWeek = () => {
    setDateState(moment(currentDate).clone().add(3, "w").toDate());
  };
  const handleOnClickFourWeek = () => {
    setDateState(moment(currentDate).clone().add(4, "w").toDate());
  };
  const handleOnClickFiveWeek = () => {
    setDateState(moment(currentDate).clone().add(5, "w").toDate());
  };

  return (
    <div>
      <div className="flex">
        <div className="w-4/5">
          <div className="flex justify-between w-full px-3 ">
            <button
              className={`cursor-pointer w-4 ${
                moment(dateRange).month() == moment().month() &&
                "text-mango-gray-2"
              }`}
              disabled={moment(dateRange).month() == moment().month()}
              onClick={handleOnClickBackMonth}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />{" "}
              </svg>
            </button>
            <span className="uppercase text-base font-medium">
              {convertDate(dateRange)}
            </span>
            <button
              className="cursor-pointer w-2"
              onClick={handleOnClickNextMonth}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                strokeWidth={2}
                className="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  stroke="2"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />{" "}
              </svg>
            </button>
          </div>
          <div className=" w-full border-b border-mango-gray-6 "></div>
          <div>
            <div className="title-calendar flex justify-between  ">
              <div className="w-1/7 text-base font-bold">Su</div>
              <div className="w-1/7 text-base font-bold">Mo</div>
              <div className="w-1/7 text-base font-bold">Tu</div>
              <div className="w-1/7 text-base font-bold">We</div>
              <div className="w-1/7 text-base font-bold">Th</div>
              <div className="w-1/7 text-base font-bold">Fe</div>
              <div className="w-1/7 text-base font-bold">Sa</div>

              {/* <p>
                Current selected date is{" "}
                <b>{moment(dateState).format("MMMM Do YYYY")}</b>
              </p> */}
            </div>
            <div className="calendar-rebook">
              <Calendar
                value={dateState}
                onChange={changeDate}
                calendarType={"US"}
                defaultValue={dateState}
                activeStartDate={dateRange}
                tileDisabled={handleDisabledDate}
                tileClassName={addClassNameDatePass}
              />
            </div>
          </div>
        </div>
        <div className="w-1/5 mx-3 space-y-2 mt-4">
          <button
            className="btn-suggest-next-week w-full focus:bg-mango-primary-blue hover:bg-mango-primary-blue-hover focus:text-white "
            data-week="0"
            onClick={handleOnClickNone}
          >
            None
          </button>
          <button
            className="btn-suggest-next-week w-full focus:bg-mango-primary-blue hover:bg-mango-primary-blue-hover focus:text-white "
            data-week="0"
            onClick={handleOnClickOneWeek}
          >
            1 Week
          </button>
          <button
            className="btn-suggest-next-week w-full focus:bg-mango-primary-blue hover:bg-mango-primary-blue-hover focus:text-white "
            data-week="0"
            onClick={handleOnClickTwoWeeek}
          >
            2 Week
          </button>
          <button
            className="btn-suggest-next-week w-full focus:bg-mango-primary-blue hover:bg-mango-primary-blue-hover focus:text-white "
            data-week="0"
            onClick={handleOnClickThreeWeek}
          >
            3 Week
          </button>
          <button
            className="btn-suggest-next-week w-full focus:bg-mango-primary-blue hover:bg-mango-primary-blue-hover focus:text-white "
            data-week="0"
            onClick={handleOnClickFourWeek}
          >
            4 Week
          </button>
          <button
            className="btn-suggest-next-week w-full focus:bg-mango-primary-blue hover:bg-mango-primary-blue-hover focus:text-white "
            data-week="0"
            onClick={handleOnClickFiveWeek}
          >
            5 Week
          </button>
        </div>
      </div>
      <div className="border-t border-mango-gray-6 mt-3"></div>
      <div>
        <div className="text-sm font-medium text-mango-gray-5 py-1 mt-1 uppercase">
          SELECT TIME TO: {bookContext.techName}
        </div>
        <Row className="p-1 overflow-auto h-[120px]">
          {listTime.length > 0 ? (
            listTime.map((time, index) => (
              <Col
                span={6}
                key={index}
                className={`p-1 ${
                  time.isAvailable
                    ? checkPastTime(time.time) && "!hidden"
                    : "!hidden"
                }`}
                onClick = {() => handleSelectTime(time.time)}
              >
                <button
                  className={
                    "w-full border border-mango-primary-blue  rounded h-8 cursor-pointer focus:bg-mango-primary-blue focus:text-white " +
                    (time.isAvailable && !checkPastTime(time.time)
                      ? classDontHaveTix
                      : "hidden")
                  }
                  // onClick={() => handleSelectTime(time)}
                  title={time.isBusy ? "Tickets At The Same Time" : ""}
                >
                  <span className="text-center truncate text-sm">
                    {time.time}
                  </span>
                </button>
              </Col>
            ))
          ) : (
            <Empty />
          )}
        </Row>
      </div>

      <Row className="mt-3" justify="space-between">
        <Col span={11}>
          <Button
            className="w-full !bg-mango-border-medium !h-10 !rounded-md
             !border-mango-border-medium !shadow-md mango-shadow hover:text-mango-gray-6"
            onClick={() => onCancel()}
          >
            <span className="font-bold text-white">CANCEL</span>
          </Button>
        </Col>
        <Col span={11}>
          <Button
            className="w-full !bg-mango-primary-blue !h-10 !rounded-md
             !border-mango-primary-blue mango-shadow hover:text-mango-gray-6"
            type="primary"
            onClick={handleConfirm}
          >
            <span className="font-bold text-white">CONFIRM</span>
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default RightContent;
