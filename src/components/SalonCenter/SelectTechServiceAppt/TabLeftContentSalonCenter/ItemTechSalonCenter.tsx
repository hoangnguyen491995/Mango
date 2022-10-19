import { EllipsisOutlined } from "@ant-design/icons";
import { Badge, Button, Image, message, Popover, Tooltip } from "antd";
import moment from "moment";
import { useContext, useState } from "react";
import { AddWaitEmployee } from "services/Appointments/AddWaitEmployee";
import { ChangeEmployeeForCheckOutPopup } from "services/Appointments/ChangeEmployeeForCheckOutPopup";

import { ChangeTechOnPopup } from "services/Employees/ChangeTechOnPopup";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";
import { messageWarning } from "src/components/MessageAlert";

import styled from "styled-components";
import { IItemDataTix } from "..";
import { ITixAppt } from "../../DataStructures";

import SelectTechService from "../SelectTechServiceApptContext";
interface Props {
  tech: ITechSalonCenter;
  itemDataTix: IItemDataTix;
}
const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
export const ItemTechSalonCenter = ({ tech, itemDataTix }: Props) => {
  const apiChangeTechOther = new ChangeTechOnPopup();
  const [checkImage, setCheckImage] = useState<boolean>(false);

  const apiChangeEmployeeForCheckOutPopup =
    new ChangeEmployeeForCheckOutPopup();
  const selectTSContext = useContext(SelectTechService);
  const apiAddWaitEmployee = new AddWaitEmployee();
  const handleChangeTech = (tech: ITechSalonCenter) => {
    if (
      selectTSContext.apptListDetail.listApptDetail[selectTSContext.indexAppt]
        .appointmentDetailID == 0
    ) {
      apiAddWaitEmployee
        .addWaitEmployee(
          itemDataTix.originalAppointmentID,
          tech.employeeID,
          Number(process.env.NEXT_PUBLIC_RVC_NO),
          false
        )
        .then((res) => {
          if (res.status == 200) {
            selectTSContext.setIndexAppt(0);
            selectTSContext.setIsChangeData(!selectTSContext.isChangeData);
          }
        });
    } else {
      const checkListService = selectTSContext.apptListDetail.listApptDetail[
        selectTSContext.indexAppt
      ].listServies.filter((item) => item.itemCode > 0 && item.trnSeq > 0);

      if (checkListService && checkListService.length > 0) {
        const turnGroup = checkListService.reduce(
          (totalGroup, item) => totalGroup + item.trnSeq.toString() + "/",
          ""
        );
        const param = {
          techID: tech.employeeID,
          trn: turnGroup,
          IsResetDuaration: false,
        };
        apiChangeTechOther.changeTechOnPopup(param).then((res) => {
          if (res.status == 200) {
            let content = "";
            let type = "warning";

            switch (res.data) {
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
                break;
            }
            if (type == "warning") {
              messageWarning(content);
            } else
              selectTSContext.setIsChangeData(!selectTSContext.isChangeData);
          }
        });
      } else {
        apiChangeEmployeeForCheckOutPopup
          .changeEmployeeForCheckOutPopup(
            itemDataTix.originalAppointmentID,
            itemDataTix.checkNo,
            tech.employeeID,
            false,
            0
          )
          .then((res) => {
            if (res.status == 200) {
              let content = "";
              let type = "warning";

              switch (res.data) {
                case 1:
                  content = "Void item discount first";
                  break;
                case 2:
                  content = "You Need Void All Bill First!";

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
                  break;
              }
              if (type == "warning") {
                messageWarning(content);
              } else
                selectTSContext.setIsChangeData(!selectTSContext.isChangeData);
            }
          });
      }
    }
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
