import { Button, Col, DatePicker, DatePickerProps, Row } from "antd";
import moment from "moment";
import { memo, useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { getTimeNearest12H, ShowContent, type } from "../../helper";
import TixContext from "../../TixContext";

const HeaderTimeTix = styled.div`
  .ant-picker-input input {
    text-align: center;
    font-weight: bold;
    color: #00bed6;
    cursor: pointer;
    border: none;
  }
`;

const HeaderItemTicket = () => {
  //data context
  const tixCT = useContext(TixContext)[0];
  const dateStart = tixCT.startDateTix.split("-");
  const dayStart = Number(dateStart[1]);
  const monthStart = Number(dateStart[0]);
  const yearStart = Number(dateStart[2]);
  const date = new Date(+yearStart, monthStart - 1, +dayStart);
  const [startTimeTix, setStartTimeTix] = useState<string>(
    tixCT.dataItemTix[0].aptStartTime
  );
  const [startDateTix, setStartDateTix] = useState<Date>(date);
  useEffect(() => {
    setStartTimeTix(tixCT.dataItemTix[0].aptStartTime);
  }, [tixCT.dataItemTix[0].aptStartTime]);

  const customFormat: DatePickerProps["format"] = (value) => {
    return moment(value).format("dddd, DD, MMM YYYY");
  };

  const onChange: DatePickerProps["onChange"] = (date) => {
    moment(date).format("dddd, DD, MMM YYYY");
    if (date) {
      const dataDate = date.format("MM-DD-YYYY");
      tixCT.dataItemTix[0].aptStartTime =
        dataDate + " " + moment(startTimeTix).format("hh:mm A");
      tixCT.dataItemTix[0].date = dataDate;
      tixCT.setStartDateTix(dataDate);
    }
  };
  return (
    <>
      <div className="flex justify-between ">
        <div className="flex-[2] mr-[10px]">
          <HeaderTimeTix>
            <DatePicker
              size="large"
              className="w-full h-[45px]  mango-shadow !border-mango-primary-blue !rounded-md"
              onChange={onChange}
              defaultValue={moment(startDateTix)}
              format={customFormat}
              suffixIcon={false}
              allowClear={false}
            />
          </HeaderTimeTix>
        </div>
        <div className="w-full flex-[1] ml-[10px]">
          <Button
            size="large"
            className="w-full !h-[45px] !border-mango-primary-blue mango-shadow !rounded-md"
            onClick={() => {
              tixCT.setShowContent(ShowContent(type.ShowSelectTimeTix));
            }}
          >
            <p className="text-center text-cyan-500 font-bold truncate flex  justify-center my-auto">
              {startTimeTix
                ? moment(startTimeTix).format("hh:mm A")
                : getTimeNearest12H()}
            </p>
          </Button>{" "}
        </div>
      </div>
    </>
  );
};
export default HeaderItemTicket;
