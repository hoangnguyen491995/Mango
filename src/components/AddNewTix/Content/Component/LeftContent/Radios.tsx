import { Col, Row } from "antd";
import { Radio, DatePicker, DatePickerProps } from "antd";
import React, { useState } from "react";
import { InputNumber } from "antd";
import moment from "moment";

interface Props {
  setIncreaseDay: string;
}
const Radios = (props: Props) => {
  const convertDate = (date: any) => {
    if (date) {
      let getMonth = date.month() + 1;
      let getDay = date.date() - 1;
      const getYear = date.year();
      switch (props.setIncreaseDay) {
        case "Day":
          getDay = getDay + 1;
          break;
        case "Week":
          getDay = getDay + 7;
          break;
        case "Month":
          getMonth = date.month() + 1;
          break;
        default:
          break;
      }
      const dateFormat = getMonth + "/" + getDay + "/" + getYear;
      return dateFormat;
    }
  };
  const customFormat: DatePickerProps["format"] = (value) =>
    `${convertDate(value)}`;
  const onChange2: DatePickerProps["onChange"] = (date) => {
    convertDate(date);
  };
  // console.log(moment());

  return (
    <Radio.Group defaultValue={1} className="w-full">
      <Radio className="h-12 mt-auto mb-auto" value={1}>
        Never
      </Radio>
      <Row className="h-12">
        <Col span={8} className="mt-auto mb-auto">
          <Radio value={2}>On</Radio>
        </Col>
        <Col span={8}>
          <DatePicker
            size="large"
            className="w-full"
            onChange={onChange2}
            format={customFormat}
            defaultValue={moment()}
            suffixIcon={false}
            allowClear={false}
            // renderExtraFooter={() => "extra footer"}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8} className="mt-auto mb-auto">
          <Radio value={3}>After</Radio>
        </Col>
        <Col span={8}>
          <InputNumber
            size="large"
            defaultValue="1"
            min="0"
            max="1000"
            step="1"
            width="100%"
          />
        </Col>
        <Col span={8}>
          <p>Occurrences</p>
        </Col>
      </Row>
    </Radio.Group>
  );
};
export default Radios;
