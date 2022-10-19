import { Row, Col, Button, Input } from "antd";
import moment from "moment";
import * as React from "react";
import { useState, useContext } from "react";

import { messageWarning } from "src/components/MessageAlert";
import styled from "styled-components";
import { KeyNumberTypeDot } from "../KeyNumber/KeyNumberTypeDot";

const classInput =
  " border max-w-[280px] h-[100px] shadow-lg rounded-md text-center cursor-pointer pt-4 mb-4 ";
const OpenItemGlobal = ({
  bgHeader,
  onConfirm,
  setValueObject,
  setCustomNameItem,
  customNameItem,
  valueObject,
  classBtnConfirm,
}) => {
  const [indexValue, setIndexValue] = React.useState<number>(0);
  const hanleShowValue = (id: number) => {
    setIndexValue(id);
  };
  const handleChangeValue = (value) => {
    let ids = [...valueObject];
    ids[indexValue] = value;
    setValueObject(ids);
  };

  return (
    <div className="w-full h-full ">
      <Row
        justify="space-around"
        className={
          bgHeader
            ? "bg-[#D1D1D133] h-[110px] border-b-[2px] border-mango-border-dark p-5"
            : " h-[45px]  "
        }
      >
        <h3 className="justify-center text-center font-bold !m-0 !p-0 text-[24px] leading-[37px] text-mango-text-medium flex items-center">
          OPEN ITEMS
        </h3>
        <div
          className={" w-full " + (bgHeader ? " h-[40px] " : " h-[30px]")}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Col span={3}>
            <p className="font-semibold h-full flex items-center">Name</p>
          </Col>
          <Col span={21}>
            <div className="border-b border-mango-border-dark">
              <Input
                bordered={false}
                onChange={(e) => setCustomNameItem(e.target.value)}
                value={customNameItem}
                className=" !placeholder:text-mango-text-light focus-auto w-4/5 h-full border-b-2 "
                placeholder={customNameItem}
              ></Input>
            </div>
          </Col>
        </div>
      </Row>
      <Row className="mt-[15px] p-5 ">
        <Col span={12} className=" borderRightOpenItem pr-5">
          <div
            className={
              classInput +
              (indexValue == 0
                ? "  border-mango-primary-blue !bg-mango-primary-blue-hover border-2  "
                : " border-mango-border-dark ")
            }
            onClick={() => hanleShowValue(0)}
          >
            <p className="font-bold text-xl flex items-center  justify-center my-auto">
              PRICE
            </p>
            <p
              className={
                "text-xl text-center  font-bold truncate " +
                (Number(valueObject[0]) == 0
                  ? "text-mango-text-light  "
                  : " text-mango-primary-orange-2 ")
              }
            >
              ${Number(valueObject[0])}
            </p>
          </div>
          <div
            className={
              classInput +
              (indexValue == 1
                ? " border-mango-primary-blue !bg-mango-primary-blue-hover border-2 "
                : " border-mango-border-dark")
            }
            onClick={() => hanleShowValue(1)}
          >
            <p className="font-bold text-xl flex items-center  justify-center my-auto">
              DURATION
            </p>
            <p
              className={
                "text-xl text-center  font-bold truncate " +
                (Number(valueObject[1]) == 0
                  ? "text-mango-text-light  "
                  : " text-mango-primary-orange-2 ")
              }
            >
              {Number(valueObject[1])} min
            </p>
          </div>
          <div
            className={
              classInput +
              (indexValue == 2
                ? " border-mango-primary-blue !bg-mango-primary-blue-hover border-2   "
                : " border-mango-border-dark")
            }
            onClick={() => hanleShowValue(2)}
          >
            <p className="font-bold text-xl flex items-center  justify-center my-auto">
              PRODUCT CHARGE
            </p>
            <p
              className={
                "text-xl text-center  font-bold truncate " +
                (Number(valueObject[2]) == 0
                  ? "text-mango-text-light  "
                  : " text-mango-primary-orange-2 ")
              }
            >
              ${Number(valueObject[2])}
            </p>
          </div>
          <div
            className={
              classInput +
              (indexValue == 3
                ? " border-mango-primary-blue !bg-mango-primary-blue-hover  !border-2  "
                : " border-mango-border-dark")
            }
            onClick={() => hanleShowValue(3)}
          >
            <p className="font-bold text-xl flex items-center  justify-center my-auto">
              TURN
            </p>
            <p
              className={
                "text-xl text-center font-bold truncate " +
                (Number(valueObject[3]) == 0
                  ? "text-mango-text-light  "
                  : " text-mango-primary-orange-2 ")
              }
            >
              {Number(valueObject[3])}
            </p>
          </div>
        </Col>
        <Col span={12}>
          <div className="mx-auto w-full h-full py-[12px] ml-[10px] ">
            <KeyNumberTypeDot
              title={customNameItem}
              confirmValue={handleChangeValue}
              sizeKey="h-20 w-20"
              value={valueObject[indexValue]}
              show={indexValue}
            />
          </div>
        </Col>
        <div className={classBtnConfirm} onClick={onConfirm}>
          CONFIRM
        </div>
      </Row>
    </div>
  );
};
export default OpenItemGlobal;
