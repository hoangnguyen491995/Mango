import React from "react";
import { FaRegEdit, FaClipboardCheck } from "react-icons/fa";
import cc from "classnames";
import { IColorDescription } from "../DataStructures/DataInterfaces";

function DetailColorDescription({ dataFrontTechDes }: any) {
  return (
    <>
      <p className="header-title-notice">COLORS/ICONS DESCRIPTIONS</p>
      <div className="flex w-[450px] descriptiom-details pl-4 pb-4">
        <div className="p-1">
          <span className="title-reception">COLORS</span>
          <div className="w-52 pt-2">
            <div className=" max-w-md bg-white border-r border-mango-gray-3 pb-5 ">
              <div className="flow-root">
                {/* List color */}
                <ul role="list" className="space-y-5 pt-3 hover:cursor-pointer">
                  <li>
                    <div className="flex items-center space-x-1 ">
                      {/* <div className="flex-shrink-0 "> */}
                      <span
                        className={`box-color`}
                        style={{
                          background: `#8B85CA`,
                        }}
                      ></span>
                      {/* </div> */}

                      <span className="box-name-color">Salon Appointment</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-1 ">
                      <span
                        className={`box-color`}
                        style={{
                          background: `#00BED6`,
                        }}
                      ></span>

                      <div className="flex min-w-0">
                        <span className="box-name-color">
                          Appointment Tickets
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-1 ">
                      <span
                        className={`box-color`}
                        style={{
                          background: `#8B85CA`,
                        }}
                      ></span>

                      <div className="flex min-w-0">
                        <span className="box-name-color">Walk in Tickets</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-1 ">
                      <span
                        className={`box-color`}
                        style={{
                          background: `#A7A7A7`,
                        }}
                      ></span>

                      <div className="flex min-w-0">
                        <span className="box-name-color">
                          Servicing Tickets
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-1 ">
                      <span
                        className={`box-color`}
                        style={{
                          background: `#F44C7F33`,
                        }}
                      ></span>

                      <div className="flex min-w-0">
                        <span className="box-name-color">Pending Tickets</span>
                      </div>
                    </div>
                  </li>
                  {dataFrontTechDes.map((data, index) => (
                    <>
                      {data.description != null && (
                        <li key={index}>
                          <div className="flex items-center space-x-1 ">
                            <span
                              className={`box-color `}
                              style={{
                                background: `${data.backGroundColor}`,
                              }}
                            ></span>

                            <div className="flex min-w-0">
                              <span className="box-name-color">
                                {data.description}
                              </span>
                            </div>
                          </div>
                        </li>
                      )}
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="p-1">
          <span className="title-reception">ICONS</span>
          <div className="w-52 pt-2">
            <div className="max-w-md ">
              <div className="flow-root">
                {/* List icon */}
                <ul
                  role="list"
                  className=" pt-3 space-y-5 hover:cursor-pointer"
                >
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 ">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/icon-online-booking-confirm.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Online Booking</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/Ticket-Note.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Ticket Note</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/icon-waiting.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Waiting Tickets</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/In-Servicin-Tickets.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">
                          In Servicing Tickets
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/Done-Servicing-Tickets.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">
                          Done Service Tickets
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/closed_ticket.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Request Tickets</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/Special_service.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Special Tickets</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/party-icon.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Group Tickets</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/combine.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Combine Tickets</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/repay.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Payment Attached</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/reminder.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Reminder</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/confirm.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Comfirm</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/canceled.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">Canceled</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="m-auto w-5 h-5 "
                          src="/assets/imgs/Icon-no-show.svg"
                          alt="Rounded avatar"
                        ></img>
                      </div>
                      <div className="flex min-w-0">
                        <span className="box-name-color">No Show</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailColorDescription;
<img
  className="m-auto w-9 h-9 -p-3"
  src="/assets/imgs/closed_ticket.svg"
  alt="Rounded avatar"
></img>;
