import {
  Button,
  Checkbox,
  Empty,
  Modal,
  Popconfirm,
  Radio,
  Space,
  Spin,
} from "antd";

import moment from "moment";
import { useEffect, useState } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-drag";
import { GetWorkingEmployeeList } from "services/Employees/GetWorkingEmployeeList";
import { LoginTechEmpClock } from "services/Employees/LoginTechEmpClock";
import styled from "styled-components";
import { ITechSalonCenter } from "../Book/IterfaceStructures";
import { messageSuccess, messageWarning } from "../MessageAlert";
import { ItemTechSalonCenter } from "./ItemTechSalonCenter";

//API CLOCK OUT ALL đi bụi ( BackEnd chưa có)
//------------------------------------------------------------------------------------------------------------------------
const classContent =
  "flex w-full overflow-auto content-start flex-wrap flex-col  justify-start items-start h-full ";

const ClockInTech = ({ onCancel, onOk, visible }) => {
  // const [dataInforTech, setDataInforTech] = useState<Array<ITechSalonCenter>>(
  //   []
  // );
  const getInfoTech = new GetWorkingEmployeeList();
  const [dataClockIn, setDataClockIn] = useState<Array<ITechSalonCenter>>([]);
  const [dataClockOut, setDataClockOut] = useState<Array<ITechSalonCenter>>([]);
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [showClockOut, setShowCLockOut] = useState<boolean>(false);
  useEffect(() => {
    const date = moment().format("MM-DD-YYYY");
    setLoading(true);
    const param = {
      date: date,
      rvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
      switchView: 1,
      orderByDesc: false,
    };
    getInfoTech
      .getWorkingEmployeeList(
        param.date,
        param.rvcNo,
        param.switchView,
        param.orderByDesc
      )
      .then((res) => {
        if (res.status == 200) {
          const data: Array<ITechSalonCenter> = res.data.techs.filter(
            (item) => item.employeeID > 9999
          );

          const dataClockIn = data.filter(
            (item: ITechSalonCenter) =>
              item.isLogIn == true && item.isLogOut == false
          );

          const dataClockOut = data.filter(
            (item: ITechSalonCenter) =>
              (item.isLogIn == true && item.isLogOut == true) ||
              (item.isLogIn == false && item.isLogOut == false)
          );

          setDataClockIn(dataClockIn);
          setDataClockOut(dataClockOut);
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [isChange, visible]);
  const handleShowClockInTech = () => {
    setShowCLockOut(true);
  };
  const handleHideClockInTech = () => {
    setShowCLockOut(false);
  };
  const handleConfirmClockOut = () => {
    //Confirm Clock Out
    setShowCLockOut(false);
  };
  const onChangeDragTech = (sourceId, sourceIndex, targetIndex, targetId) => {
    let empId = 0;
    if (sourceId == "clockIn") {
      empId = dataClockIn[sourceIndex].employeeID;
    } else {
      empId = dataClockOut[sourceIndex].employeeID;
    }
    handleLoginTechEmpClock(empId);
  };
  const apiLoginTechEmpClock = new LoginTechEmpClock();
  const handleLoginTechEmpClock = (techId) => {
    apiLoginTechEmpClock.loginTechEmpClock(techId).then((res) => {
      if (res.status == 200) {
        if (res.data[0].resuilt == 0) {
          messageWarning(res.data[0].message);
        }
        // else messageSuccess(res.data[0].message);
        setIsChange(!isChange);
      }
    });
  };
  return (
    <>
      <Modal
        onCancel={handleHideClockInTech}
        onOk={handleShowClockInTech}
        visible={showClockOut}
        centered
        className="customBgModal"
        bodyStyle={{
          backgroundColor: "#F28500",
        }}
        width={600}
        title={null}
        footer={null}
        okText={"Yes"}
        cancelText={"No"}
      >
        <div></div>
        <h1 className="text-white text-center">
          Are You Sure You Want To Make These Changes?
        </h1>
        <div defaultValue={"1"} className="w-full flex justify-around">
          <div
            className=" cursor-pointer flex   "
            onClick={handleHideClockInTech}
          >
            <div className="border-[2px] border-white !rounded-full mr-4 w-6 h-6"></div>
            <span className="font-bold text-white">NO</span>
          </div>
          <div className="cursor-pointer flex" onClick={handleConfirmClockOut}>
            <div className="border-[2px] border-white !rounded-full mr-4 w-6 h-6"></div>
            <span className="font-bold text-white">YES</span>
          </div>
        </div>
      </Modal>

      <Modal
        onCancel={onCancel}
        onOk={onOk}
        visible={visible}
        width={"90%"}
        centered
        closable={false}
        footer={null}
      >
        <div className="h-[92vh]">
          {/* Header */}

          <div className="flex w-full ">
            <div className="w-1/2  flex">
              <div className="flex mx-auto">
                <Space align="center">
                  <p className="text-center font-bold text-2xl my-auto">
                    CLOCK IN
                  </p>
                  <p className="text-mango-border-medium font-semibold my-auto">
                    Tech
                  </p>
                  <p className="text-mango-border-medium font-semibold my-auto">
                    Other staff ()
                  </p>
                </Space>
              </div>
            </div>
            <div className="w-1/2 flex">
              <div className="flex mx-auto ">
                <Space align="center">
                  <p className="text-center font-bold text-2xl my-auto">
                    CLOCK OUT
                  </p>
                  <p className="text-mango-border-medium font-semibold my-auto">
                    Tech
                  </p>
                </Space>
              </div>
            </div>
          </div>

          {/* Content */}
          {/* Left Content */}

          <div
            className="flex w-full border-t-2 border-mango-border-dark  mb-4 relative"
            style={{ height: "calc(100% - 100px)" }}
          >
            {/* <GridContextProvider onChange={onChangeDragTech}> */}
            <div
              className={
                classContent + " w-1/2 border-r-2 border-r-mango-border-dark "
              }
              id="clockIn"
              // boxesPerRow={6}
              // rowHeight={200}
            >
              {dataClockIn.map((tech: ITechSalonCenter, index) => (
                <div key={tech.employeeID}>
                  <ItemTechSalonCenter
                    key={index}
                    tech={tech}
                    handleLoginTechEmpClock={handleLoginTechEmpClock}
                  />
                </div>
              ))}
            </div>

            {/* Right Content */}

            <div
              className={classContent + " w-1/2 pl-6"}
              id="clockOut"
              // boxesPerRow={3}
              // rowHeight={200}
            >
              {dataClockOut.map((tech: ITechSalonCenter, index) => (
                <div key={tech.employeeID}>
                  <ItemTechSalonCenter
                    key={index}
                    tech={tech}
                    handleLoginTechEmpClock={handleLoginTechEmpClock}
                  />
                </div>
              ))}
            </div>
            {/* </GridContextProvider> */}
          </div>

          {/* Footer */}
          <div className="flex w-full ">
            <div className="w-1/2  flex pr-6">
              <Button
                className="!bg-mango-primary-blue  !h-12 !px-12 !rounded-md !shadow-md !ml-auto  !w-[300px] !cursor-pointer !flex"
                onClick={() => setShowCLockOut(true)}
              >
                <span className="text-center font-bold text-2xl mx-auto text-white mt-1">
                  CLOCK OUT ALL
                </span>
              </Button>
            </div>
            <div className="w-1/2 flex pl-6">
              <Button
                className="!bg-mango-primary-orange   !h-12 !px-12 !rounded-md !shadow-md !mr-auto !w-[300px] !cursor-pointer !flex"
                onClick={onCancel}
              >
                <span className="text-center font-bold text-2xl text-white mx-auto w-full mt-1">
                  DONE
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ClockInTech;
