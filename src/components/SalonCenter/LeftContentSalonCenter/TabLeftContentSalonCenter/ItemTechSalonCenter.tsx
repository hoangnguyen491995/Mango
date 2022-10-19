// @flow
import { EllipsisOutlined } from "@ant-design/icons";
import { Badge, Button, Image, Popover, Skeleton, Tooltip } from "antd";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import moment from "moment";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";
import { ChangeImagePhoto } from "src/components/ChangeImagePhoto/ChangeImagePhoto";
import axios from "axios";

interface Props {
  tech: ITechSalonCenter;
  setHeight: Function;
  height: boolean;
}
const classPrintTech =
  "flex justify-between items-center w-[180px] !border-b !border-dashed  h-[60px] !py-3 !my-0 hover:bg-mango-bg-dark px-3 cursor-pointer";
const ItemTechSalonCenter = ({ tech, setHeight, height }: Props) => {
  const [checkImage, setCheckImage] = useState<boolean>(false);
  const [visibleChangeImage, setVisibleChangeImage] = useState<boolean>(false);
  const [infoTechChangeImage, setInfoTechChangeImage] =
    useState<ITechSalonCenter>();
  const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;

  const handleShowChangeImage = async () => {
    const imgPos = document.getElementById("imgbase64-" + tech.employeeID);
    setVisibleChangeImage(true);

    // if (imgPos) {
    //   html2canvas(imgPos).then((canvas) => {
    //     const base64Canvas = canvas.toDataURL();
    //     console.log(base64Canvas);
    //     // setVisibleChangeImage(true);
    //   });
    // }
  };
  const handleOnOkChangeImage = () => {
    setVisibleChangeImage(false);
  };
  const handleOnCancelChangeImage = () => {
    setVisibleChangeImage(false);
  };

  const imgAvatar = DOMAIN_URL + "/Upload/employee/" + tech.imageFileName;
  return (
    <>
      {infoTechChangeImage && (
        <ChangeImagePhoto
          visible={visibleChangeImage}
          onOk={handleOnOkChangeImage}
          onCancel={handleOnCancelChangeImage}
          infoTechChangeImage={infoTechChangeImage}
        />
      )}
      <div
        key={tech.employeeID}
        className={
          (height ? "h-[165px]" : "h-[100px]") +
          " relative w-[118px] rounded-[5px] mt-10 mb-4  mango-shadow flex justify-center items-center cursor-pointer select-none mx-1 " +
          (tech.isServing == 1 && " busy-tech ")
        }
        style={{
          background: tech.backGroundColor,
        }}
      >
        <div className="flex justify-center items-center w-full px-1 pt-6">
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
              <img
                id={"imgbase64-" + tech.employeeID}
                className="hover:opacity-80 rounded-[50%] w-[80px] h-[80px] shadow-md bg-gray-200 flex justify-center items-center"
                src={imgAvatar}
                onError={(e) => {
                  (e.currentTarget.onerror = null), setCheckImage(true);
                }}
                // preview={false}
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
                    ? "text-mango-text-medium"
                    : "text-white")
                }
              >
                {tech.employeeName.toUpperCase()}
              </p>
            </Tooltip>
            <p
              className={
                "font-semibold text-[12px] leading-[19.5px] text-center h-4  m-0 p-0 " +
                (tech.backGroundColor === "#FFFFFF"
                  ? "text-mango-text-medium"
                  : "text-white")
              }
            >
              {tech.lockIn && moment(tech.lockIn).format("hh:mm:ss A")}
            </p>
            {height && (
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
            )}

            <Popover
              trigger={"click"}
              placement="right"
              content={
                <>
                  <div
                    className={classPrintTech}
                    onClick={() => {
                      handleShowChangeImage(), setInfoTechChangeImage(tech);
                    }}
                  >
                    <Image src="/assets/imgs/user.png" preview={false} />
                    Change Photo
                  </div>
                  <div className={classPrintTech}>
                    <Image src="/assets/imgs/Print.png" preview={false} />
                    Print Report
                  </div>
                </>
              }
            >
              <div className="hover:bg-mango-border-dark w-[30%] flex mx-auto h-[30px] rounded-md opacity-80 bottom-0 left-[35%] absolute z-10">
                <span
                  className="mx-auto flex items-center "
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color:
                      tech.backGroundColor == "#FFFFFF" ? "black" : "white",
                  }}
                >
                  ...
                </span>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemTechSalonCenter;
