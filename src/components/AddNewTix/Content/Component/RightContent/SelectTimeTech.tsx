import { Button, Col, Empty, Row, Spin } from "antd";
import { time } from "console";
import moment from "moment";

import { useContext, useEffect, useState } from "react";
import { GetListTimeByDate } from "services/Customers/GetListTimeByDate";
import { MessagePopup } from "src/components/MessageAlert/MessagePopup";
import { ShowContent, type } from "../../helper";

import TixContext from "../../TixContext";

export interface ListTime {
  time: string;
  isAvailable: boolean;
  isBusy: number;
  isPassedCurrentTime: boolean;
}
const classDontHaveTix = "  bg-white hover:border-cyan-500 hover:bg-cyan-200 ";
const classHaveTix = "  bg-mango-border-medium  ";
const SelectTimeTech: React.FC = () => {
  //data context
  const tixCT = useContext(TixContext)[0];
  const [listTime, setListTime] = useState<Array<ListTime>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMessagePopup, setShowMessagePopup] = useState<boolean>(false);
  const [selectTime, setSelectTime] = useState<ListTime>();
  //call api
  useEffect(() => {
    setIsLoading(true);
    const date = tixCT.startDateTix;
    const dataTimeTech = new GetListTimeByDate();
    dataTimeTech.getListTimeByDate(tixCT.idTech, date).then((res) => {
      if (res.status === 200) {
        setListTime(res.data);
        setIsLoading(false);
      }
    });
  }, [tixCT.idTech]);
  const handleCancelMessagePopup = () => {
    setShowMessagePopup(false);
  };
  const handleSelectTimeTech = (time) => {
    if (tixCT.indexItemService >= 0) {
      const dataFilter = tixCT.dataItemTix[tixCT.idAppt].listWithTech.filter(
        (item) => item.employeeID == tixCT.idTech
      );
      if (dataFilter) {
        if (dataFilter[0].listServiceWithTech.length > 0) {
          dataFilter[0].listServiceWithTech[tixCT.indexItemService].startTime =
            tixCT.startDateTix + " " + (time || selectTime?.time);

          tixCT.setStatusChange(!tixCT.statusChange);
        }
      }
    } else {
      tixCT.dataItemTix[0].aptStartTime =
        tixCT.startDateTix + " " + (time || selectTime?.time);
      tixCT.setStartTimeTix(
        tixCT.startDateTix + " " + (time || selectTime?.time)
      );
      tixCT.setStatusChange(!tixCT.statusChange);
    }

    tixCT.setIndexItemService(-1);
    tixCT.setShowContent(ShowContent(type.ShowSearchServiceItem));
  };
  const handleOkMessagePopup = () => {
    setShowMessagePopup(false);
    handleSelectTimeTech(selectTime?.time);
  };
  const checkPastTime = (date) => {
    if (
      moment(date, "HH:mm:ss A").diff(moment().startOf("day"), "seconds") <
      moment().diff(moment().startOf("day"), "seconds")
    )
      return true;
    return false;
  };
  const handleSelectTime = (time: ListTime) => {
    // console.log(time);
    setSelectTime(time);
    if (time.isBusy > 0 || time.isAvailable) {
      setShowMessagePopup(true);
    } else handleSelectTimeTech(time.time);
  };
  // Classname

  return (
    <div className="w-full h-full p-5 ">
      <p className="text-left font-semibold !h-[20px]">
        SELECT AVAILABLE TIME FOR TECH ""
      </p>
      <MessagePopup
        content={
          selectTime?.isAvailable
            ? "This employee is off this time, would you like to make an appointment?"
            : selectTime?.isBusy +
              " tickets at the same time, would you like to make an appointment?"
        }
        visible={showMessagePopup}
        onCancel={handleCancelMessagePopup}
        onOk={handleOkMessagePopup}
      />
      <Row className=" overflow-auto h-[620px]">
        {!isLoading ? (
          listTime.map((timeTech: ListTime, index) => (
            <Col span={6} className="p-3" key={index}>
              <button
                // disabled={checkPastTime(timeTech.time) || timeTech.isBusy > 0}
                className={
                  "w-full font-medium  border border-mango-border-dark rounded h-8 cursor-pointer  mango-shadow-2 " +
                  (!timeTech.isPassedCurrentTime
                    ? timeTech.isBusy
                      ? classHaveTix
                      : classDontHaveTix
                    : timeTech.isBusy
                    ? "opacity-40" + classHaveTix
                    : "opacity-40" + classDontHaveTix)
                }
                onClick={() => handleSelectTime(timeTech)}
              >
                <span className="text-center truncate font-semibold">
                  {moment(timeTech.time, "HH:mm:ss A").format("hh:mm A")}
                </span>
              </button>
            </Col>
          ))
        ) : (
          <Spin
            spinning={isLoading}
            tip="Loading..."
            className="w-full h-full"
          />
        )}
      </Row>
    </div>
  );
};

export default SelectTimeTech;
