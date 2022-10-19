import { Badge, Button, message, Space } from "antd";
import moment from "moment";
import { useState } from "react";

import { LoginTechEmpClock } from "services/Employees/LoginTechEmpClock";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";

interface Props {
  tech: ITechSalonCenter;

  handleLoginTechEmpClock: Function;
}

export const ItemTechSalonCenter = ({
  tech,
  handleLoginTechEmpClock,
}: Props) => {
  const [checkImage, setCheckImage] = useState<boolean>(false);

  const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
  const isClockIn = tech.isLogIn == true && tech.isLogOut == false;

  return (
    <>
      <div
        className="m-2 "

        // draggable
        // onDragEnd={() => handleLoginTechEmpClock()}
      >
        <div
          key={tech.employeeID}
          className={`h-[100px] relative w-[118px] rounded-md mt-12 mb-1 mango-shadow flex justify-center items-center cursor-pointer select-none mx-auto `}
          style={{
            background: tech.backGroundColor,
          }}
        >
          <div
            className={
              "flex justify-center items-center w-full  mt-6 " +
              (tech.isServing && " busy-tech ")
            }
          >
            {checkImage ? (
              <div className="absolute  inset-y-0 mx-auto flex -top-12">
                <img
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className={
                    "hover:opacity-80 rounded-full w-[90px] h-[90px] shadow-md bg-[#eff8dc] opacity-50"
                  }
                  src={DOMAIN_URL + "/Upload/employee/" + tech.imageFileName}
                  onError={() => setCheckImage(true)}
                  alt=""
                />
                {tech.rowIndex != 999 && (
                  <Badge
                    style={{
                      background: "rgb(241 245 249)",
                      color: "#555",
                      position: "absolute",
                      bottom: "10px",
                      left: "-1px",
                    }}
                    count={
                      tech.indexNum != 999 && (
                        <span className="rounded-full m-auto h-6 w-6 pl-2 pt-1">
                          {tech.rowIndex}
                        </span>
                      )
                    }
                    offset={[20, 20]}
                  ></Badge>
                )}
              </div>
            ) : (
              <div className="relative  inset-y-0 mx-auto flex -top-12  ">
                <div
                  style={{
                    color:
                      tech.backGroundColor == "#FFFFFF"
                        ? "#93D500"
                        : tech.backGroundColor,
                  }}
                  className={
                    "hover:opacity-80 text-lg font-bold absolute -top-12 left-[14px]  rounded-full w-[90px] h-[90px] shadow-md bg-[#eff8dc]  flex justify-center items-center " +
                    (tech.isServing && " busy-img ")
                  }
                >
                  <p className="h-full mt-auto flex items-center ">
                    {tech.employeeName.slice(0, 1).toUpperCase()}
                  </p>
                  {tech.rowIndex != 999 && (
                    <Badge
                      style={{
                        background: "rgb(241 245 249)",
                        position: "absolute",
                        top: "5px",
                        left: "1px",
                        backgroundColor:
                          tech.backGroundColor == "#FFFFFF"
                            ? "#93D500"
                            : "#FFFFFF",
                        color:
                          tech.backGroundColor == "#FFFFFF"
                            ? "#FFFFFF"
                            : "black",
                      }}
                      count={
                        <div className=" rounded-full m-auto h-6 w-6 p-auto ">
                          <p className="items-center flex w-full h-full justify-center">
                            {tech.rowIndex}
                          </p>
                        </div>
                      }
                      offset={[20, 20]}
                    ></Badge>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col justify-between h-full mt-4  w-full">
              <p
                className={`font-semibold text-center h-2 ${
                  tech.backGroundColor === "#FFFFFF"
                    ? "text-black"
                    : "text-white"
                } mt-[15px]`}
              >
                {tech.employeeName.toUpperCase()}
              </p>
              <p
                className={` font-semibold text-center  ${
                  tech.backGroundColor === "#FFFFFF"
                    ? "text-black"
                    : "text-white"
                } `}
                style={{ font: "normal normal 500 var(--s-12)" }}
              >
                {tech.lockIn && moment(tech.lockIn).format("hh:mm:ss A")}
              </p>
            </div>
          </div>
        </div>
        <Button
          className={
            "!w-full !rounded-md !shadow-md !font-bold hover:!text-white " +
            (!isClockIn
              ? "!border-mango-primary-orange hover:!bg-mango-primary-orange  !text-mango-primary-orange"
              : " !border-mango-primary-blue  hover:!bg-mango-primary-blue !text-mango-primary-blue")
          }
          onClick={() => handleLoginTechEmpClock(tech.employeeID)}
        >
          {isClockIn ? "CLOCK OUT" : "CLOCK IN"}
        </Button>
      </div>
    </>
  );
};
