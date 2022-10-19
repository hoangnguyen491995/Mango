// @flow
import { Button, Col, Rate, Row, Space } from "antd";
import moment from "moment";
import * as React from "react";
import { theme } from "tailwind.config";
import { ICheckinList } from "./History";
interface Props {
  item: ICheckinList;
  index: number;
}
export const ItemTixSalonAppt = ({ item, index }: Props) => {
  const orderNum = index + 1;
  const empNameString = item.employeeName.split(",");

  const classNameborder =
    item.status == 2
      ? item.bookType == 0
        ? "mango-primary-purple"
        : "mango-primary-blue"
      : "mango-border-dark";

  return (
    <div
      className={
        "w-full   border-l-8 border-2 hover:shadow-md  rounded-r-md mb-2 py-1 pr-3 cursor-pointer select-none relative"
      }
      style={{
        borderColor: theme.extend.colors[classNameborder],
      }}
    >
      <div
        className="absolute orderNumber-checkin-list"
        style={{
          top: "20px",
          background: theme.extend.colors[classNameborder],
        }}
      >
        {orderNum}
      </div>
      <Row justify="space-between">
        <Col span={2}>
          {/* <div
            className={
              "h-8 rounded-r-full flex items-center p-2 " +
              `bg${classNameborder}`
            }
          >
            <span className="font-bold text-white mx-auto">
              {item.indexNum}
            </span>
          </div> */}
        </Col>
        <Col span={12} className="pl-1 font-bold text-gray-500">
          <Col>{item.customerName}</Col>

          <Col>
            <span className="text-pink-700 mr-1">{item.customerType}</span>
            <Rate value={item.rating} />
          </Col>
          <Col className="w-full">
            <p className=" truncate">{item.appointmentSubject}</p>
          </Col>
        </Col>
        <Col span={10}>
          <p className="font-bold text-gray-500 text-right">
            {moment(item.checkinDateTime).format("L") +
              " " +
              moment(item.checkinDateTime).format("LT")}
          </p>
          <div className="text-right">
            {item.aptStartTime && (
              <>
                {" "}
                <span className="text-cyan-500 font-bold text-xs">Appt:</span>
                <span className="ml-1 text-xs font-bold">
                  {item.aptStartTime}
                </span>
              </>
            )}
          </div>
          <div className="text-right">
            <span className="text-xs text-violet-600">X: </span>
            <span className="ml-1 text-xs font-bold">{item.checkinTime}</span>
          </div>
        </Col>
        <Col span={24} style={{ paddingLeft: "40px", marginTop: "-2px" }}>
          <div className="flex items-center justify-between flex-row-reverse">
            <div>
              <Button
                className={
                  (item.appointmentStatus == "Waiting"
                    ? "!border-mango-primary-blue"
                    : "!border-black  ") +
                  " !rounded-full w-32 !border-dashed !shadow-inner  !flex !ml-auto button-status-checkin-list"
                }
              >
                <span
                  className={
                    (item.appointmentStatus == "Waiting"
                      ? " text-mango-primary-blue "
                      : "text-mango-text-medium ") +
                    " font-bold text-center w-full"
                  }
                >
                  {item.appointmentStatus}
                </span>
              </Button>
            </div>
            <div className="flex">
              {empNameString.length > 1 && (
                <div
                  className="employeeName bg-[#8d8816] text-[#ffffff] font-bold p-1 rounded-md"
                  style={{ border: "1px solid #94D500", marginRight: "3px" }}
                >
                  <span className="text-[12px] ">{empNameString[1]}</span>
                </div>
              )}
              {item.employeeName == " KRIXI" ? (
                <div className="employeeName bg-[#02AD93] text-[#FFFFFF] font-bold p-1 rounded-md">
                  <span className="text-[12px] ">{empNameString[0]}</span>
                </div>
              ) : (
                <div
                  className="employeeName bg-[#ffffff] text-[#505050] font-bold p-1 rounded-md"
                  style={{ border: "1px solid #94D500" }}
                >
                  <span className="text-[12px] ">{empNameString[0]}</span>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
