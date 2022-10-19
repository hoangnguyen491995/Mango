import { EllipsisOutlined } from "@ant-design/icons";
import { Badge, Button, Image, message, Tooltip } from "antd";
import moment from "moment";
import { useState } from "react";
import { ChangeTechMutiItem } from "services/Appointments/ChangeTechMutiItem";
import { ChangeTechOnPopup } from "services/Employees/ChangeTechOnPopup";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";
import { messageWarning } from "src/components/MessageAlert";

import { API_MANGO_TECH_IMG } from "src/utils/constant";
import { ImageExists } from "src/utils/ImageError";
import styled from "styled-components";
import { LoadingComponent } from ".";
import { ITixAppt } from "../../../DataStructures";

interface Props {
  tech: ITechSalonCenter;
  // dataItemApptDetail: IDetailTixSalonCenter;
  iteminfo: ITixAppt;
  setIsChangeDataClient: Function;
  isChangeDataClient: boolean;
}
const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
export const ItemTechSalonCenter = ({
  tech,
  iteminfo,
  setIsChangeDataClient,
  isChangeDataClient,
}: Props) => {
  const apiChangeTechOther = new ChangeTechOnPopup();
  const [checkImage, setCheckImage] = useState<boolean>(false);

  const apiChangeTechMutiItem = new ChangeTechMutiItem();
  const showMessageAlert = (value) => {
    let content = "";
    let type = "warning";
    switch (value) {
      case 1:
        content = "Void item discount first";
        break;
      case 2:
        content = "You Need Void Discount All Bill First!";
        break;
      case 3:
        content = "Can Not Change";
        break;
      case 4:
        content = "Tech cannot perform service.";
        break;
      case 5:
        content = "Void Tip First!";
        break;
      default:
        type = "success";
        setIsChangeDataClient(!isChangeDataClient);
        break;
    }
    if (type == "warning") {
      messageWarning(content);
    }
  };
  const handleChangeTech = (tech: ITechSalonCenter) => {
    const body = {
      techID: tech.employeeID,
      appointmentID: iteminfo.originalAppointmentID,
      checkno: iteminfo.checkNo,
      isFullTurn: false,
      isResetDuaration: true,
      byPassTech: 0,
      byPass: true,
    };
    apiChangeTechMutiItem.changeTechMutiItem(body).then((res) => {
      if (res.status == 200) {
        showMessageAlert(res.data);
      }
    });
  };

  const imgAvatar = DOMAIN_URL + "/Upload/employee/" + tech.imageFileName;

  return (
    <div
      key={tech.employeeID}
      className={
        "h-[165px] relative w-[110px] rounded-[5px] mt-10 mb-4  mango-shadow flex justify-center items-center cursor-pointer select-none mx-1 " +
        (tech.isServing == 1 && " busy-tech ")
      }
      style={{
        background: tech.backGroundColor,
      }}
      onClick={() => handleChangeTech(tech)}
    >
      <div className="flex justify-center items-center w-full px-1 pt-11">
        <div
          className={
            "hover:opacity-80 text-lg font-bold  rounded-full w-[80px] h-[80px] shadow-md  flex justify-center items-center -top-10 absolute bg-gray-200 " +
            (tech.isServing == 1 && " busy-img ")
          }
        >
          {checkImage ? (
            <div className="hover:opacity-80 rounded-[50%] w-[80px] h-[80px] shadow-md bg-gray-200 flex justify-center items-center">
              <p
                className="m-auto "
                style={{
                  color:
                    tech.backGroundColor == "#FFFFFF"
                      ? "#93D500"
                      : tech.backGroundColor,
                }}
              >
                {tech.employeeName.slice(0, 1).toUpperCase()}
              </p>
            </div>
          ) : (
            <Image
              className="hover:opacity-80 rounded-[50%] w-[80px] h-[80px] shadow-md bg-gray-200 flex justify-center items-center"
              src={imgAvatar}
              onError={(e) => {
                (e.currentTarget.onerror = null), setCheckImage(true);
              }}
              preview={false}
            />
          )}
          {tech.rowIndex && tech.rowIndex < 999 && (
            <Badge
              style={{
                background: "rgb(241 245 249)",
                color: "#555",
                position: "absolute",
              }}
              count={
                <span
                  className="font-bold rounded-full m-auto h-6 w-6 pt-1"
                  style={{
                    color:
                      tech.backGroundColor == "#FFFFFF" ? "#93D500" : "black",
                  }}
                >
                  {tech.rowIndex}
                </span>
              }
              offset={[-5, 25]}
            ></Badge>
          )}
        </div>

        <div className="flex flex-col justify-between h-full  w-full">
          <Tooltip title={tech.employeeName.toUpperCase()}>
            <p
              className={
                "font-semibold text-center truncate w-full h-6 m-0 p-0 " +
                (tech.backGroundColor === "#FFFFFF"
                  ? "text-black"
                  : "text-white")
              }
            >
              {tech.employeeName.toUpperCase()}
            </p>
          </Tooltip>
          <p
            className={
              " font-semibold text-center h-4 text-xs m-0 p-0 " +
              (tech.backGroundColor === "#FFFFFF" ? "text-black" : "text-white")
            }
          >
            {tech.lockIn && moment(tech.lockIn).format("hh:mm:ss A")}
          </p>

          <>
            <div
              className={"h-8"}
              style={{ font: "normal normal 500 var(--s-10)" }}
            >
              <div
                className={
                  " flex text-white justify-between " +
                  (tech.backGroundColor == "#FFFFFF"
                    ? " text-black border-mango-border-light "
                    : " text-white border-mango-border-light")
                }
              >
                {tech.bonusTurn > 0 && (
                  <>
                    <span>B:</span>
                    <span>{tech.bonusTurn}</span>
                  </>
                )}
                {tech.bonusTurn > 0 && (
                  <>
                    <span>A:</span>
                    <span>{tech.adjTurn}</span>
                  </>
                )}
              </div>
              {tech.showTurn == 1 &&
                tech.countTicket !== null &&
                tech.countTicket > 0 && (
                  <div
                    className={
                      "border-t  flex justify-between " +
                      (tech.backGroundColor == "#FFFFFF"
                        ? " text-black border-mango-border-light "
                        : " text-white border-mango-border-light")
                    }
                  >
                    <>
                      {" "}
                      {/* <span>P:</span>
                  <span>{tech.partialTurn}</span> */}
                      <span>T:</span>
                      <span>{tech.turn}</span>
                    </>
                  </div>
                )}
              {tech.showAmount &&
                tech.countTicket !== null &&
                tech.countTicket > 0 && (
                  <div
                    className={
                      "border-t  flex justify-between " +
                      (tech.backGroundColor == "#FFFFFF"
                        ? " text-black border-mango-border-light"
                        : " text-white border-mango-border-light")
                    }
                  >
                    <span>Tix:</span>
                    <span>{tech.countTicket}</span>
                    <span></span>
                    <span className="font-bold">${tech.serviceAmount}</span>
                  </div>
                )}
            </div>
            <div className="h-3">
              {tech.lastTurn && (
                <span
                  className="text-black"
                  style={{ font: "normal normal 500 var(--s-11)" }}
                >
                  Ldt: {moment(tech.lastTurn).format("hh:mm:ss A")}
                </span>
              )}
            </div>
          </>
          <Button className="!w-full absolute z-20 !rounded-md mango-shadow !border-none hover:!bg-mango-primary-blue hover:!text-white !font-bold">
            START
          </Button>
        </div>
      </div>
    </div>
  );
};
