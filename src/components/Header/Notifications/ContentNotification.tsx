import React, { useEffect, useState } from "react";
import moment from "moment";
import { INotify } from "../DataStructures/DataInterfaces";
import {
  handleDeclineOnlineBooking,
  handleComfirmOnlineBooking,
} from "src/helper/General";
interface IProps {
  data: INotify;
  setReFetchData: Function;
}

function ContentNotification({ data, setReFetchData }: IProps) {
  const [timeNumberCreate, setTimeNumberCreate] = useState<any>();
  const [statusNoti, setStatusNoti] = useState<string>();
  useEffect(() => {
    setTimeNumberCreate(
      moment(data.createDate).local().startOf("seconds").fromNow()
    );

    let status =
      !(data.isConfirmOB ?? false) &&
      data.appointmentStatusID == 1 &&
      (data.isBookOnline ?? false) &&
      data.startTime != null &&
      new Date(data.startTime) < new Date()
        ? "Expired"
        : !(data.isConfirmOB ?? false) &&
          data.appointmentStatusID == 1 &&
          (data.isBookOnline ?? false) &&
          data.startTime != null
        ? "Confirm"
        : "Booked";
    setStatusNoti(status);
  }, [data]);

  return (
    <div className="border-2 w-full h-30  border-white  rounded-full pr-2">
      <div
        id="toast-interactive"
        className="w-full p-2 text-gray-500 bg-white rounded-lg  shadow-md"
        role="alert"
      >
        <div className="flex justify-between ">
          <div className="flex">
            <div className="inline-flex items-center justify-center w-3 h-3 ">
              {/* status dot */}
              <span
                className={` mt-2 w-2.5 h-2.5 ${
                  statusNoti == "Booked"
                    ? "bg-mango-sky-crayola"
                    : statusNoti == "Confirm"
                    ? "bg-violet-600"
                    : "bg-orange-400"
                } rounded-full`}
              ></span>
            </div>
            {/* Notifications detail */}
            <div className="ml-3 text-xs">
              <span className="mb-1 text-sm  text-gray-900 ">
                New Booking from {data.clientName}
              </span>
              <div className="text-sm font-normal">
                <p className="p-0 m-0 text-[13px] text-black">
                  <span className="text-gray-400">Date: </span>
                  {data.strAptStart}
                </p>
                <p className="p-0 w-72 truncate m-0 text-[13px] text-black">
                  <span className="text-gray-400">Service: </span>
                  {data.appointmentSubject}
                </p>
                <p className="text-gray-400 mt-2 mb-0">{timeNumberCreate} </p>
              </div>
            </div>
          </div>
          {/* Button comfirm */}
          <div className="relative ">
            <button
              type="button"
              className=" absolute top-0 right-0 ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400
               hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5
                hover:bg-gray-100 inline-flex h-9 w-9 "
              data-dismiss-target="#toast-interactive"
              aria-label="eye"
              onClick={() => {
                const tixPos = document.getElementById(
                  `${data.appointmentID}-ticket-${data.employeeID}`
                );
                if (tixPos) {
                  tixPos.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }
              }}
            >
              <img
                className="m-auto w-7 h-7   "
                src="/assets/imgs/eye-ticket.svg"
                alt="Rounded avatar"
              ></img>
            </button>
            <div className="absolute bottom-0 right-0">
              {statusNoti == "Confirm" ? (
                <div className="flex grid-cols-2 gap-2 ">
                  <div>
                    <button
                      className={`w-20 h-8 text-xs font-medium  text-gray-900 border border-gray-200  shadow-xl 
                    rounded-lg hover:bg-gray-100 `}
                      onClick={() =>
                        handleDeclineOnlineBooking(
                          data.rvcNo,
                          data.appointmentID,
                          data.aptEmployeeID,
                          setReFetchData
                        )
                      }
                    >
                      DECLINE
                    </button>
                  </div>

                  <div>
                    <button
                      className={`w-[70px] h-8 text-xs font-medium  text-white bg-sky-600  shadow-xl rounded-lg
                       hover:bg-sky-400 `}
                      onClick={() =>
                        handleComfirmOnlineBooking(
                          data.rvcNo,
                          data.appointmentID,
                          setReFetchData
                        )
                      }
                    >
                      CONFIRM
                    </button>
                  </div>
                </div>
              ) : statusNoti == "Booked" ? (
                <div className="flex grid-cols-2 gap-2 ">
                  <div>
                    <button
                      className={`w-[70px] h-8 text-xs font-medium text-sky-400 border-2 border-sky-400  shadow-xl 
                  rounded-lg hover:bg-gray-100 `}
                    >
                      BOOKED
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex grid-cols-2 gap-2 ">
                  <div>
                    <button
                      className={`w-[70px] h-8 text-xs font-medium text-gray-400 border-2 border-gray-400 shadow-xl 
                  rounded-lg hover:bg-gray-100 `}
                    >
                      EXPIRED
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentNotification;
