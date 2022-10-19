// @flow
import { Button, Col, Row } from "antd";
import { useRef, useState } from "react";

import styled from "styled-components";

const InputDuration = styled.input`
  height: 50px;
  border: none;
  color: #f28500;
  font-size: 30px;
  outline: none;
`;
interface Props {
  title: string | " ";
  sizeKey: string;
  confirmValue: Function;
}
const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "<"];
const InputExtra = styled.input`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  font: normal normal 800 var(--s-30);

  outline: none;
`;
export const KeyNumber = (props: Props) => {
  const [duration, setDuration] = useState<string>("0");
  const durationRef = useRef(null);
  const handleConfirm = () => {
    props.confirmValue(Number(duration));
  };
  const handleKeyNumber = (item: string) => {
    switch (item) {
      case "C":
        setDuration("0");
        break;
      case "<":
        setDuration(duration.slice(0, duration.length - 1));
        break;
      default:
        setDuration(duration + item);
        break;
    }
  };
  const handleChangeDuration = (value: string) => {
    setDuration(value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"));
  };
  //classname key button
  const classnameKeyBtn = ` rounded-full hover:border hover:border-solid hover:bg-cyan-200 mx-auto block ${props.sizeKey}`;
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* <h2 className="text-center">{props.title}</h2> */}
      <InputExtra
        onChange={(e) => handleChangeDuration(e.target.value)}
        placeholder={props.title}
        value={Number(duration) || props.title}
        ref={durationRef}
        className={
          Number(duration) > 0 ? " text-[#f28500] " : "text-mango-text-light"
        }
      ></InputExtra>

      <Row justify="space-around">
        {keyCalc.map((item, index) => {
          return (
            <Col span={8} key={index}>
              <button
                className={classnameKeyBtn}
                onClick={() => handleKeyNumber(item)}
              >
                <span className="font-bold text-4xl">{item}</span>
              </button>
            </Col>
          );
        })}
      </Row>

      <div className="mt-auto">
        <Button
          size="large"
          type="primary"
          className="w-full !bg-mango-primary-blue !border-mango-primary-blue !rounded-md !font-bold !text-xl "
          onClick={handleConfirm}
        >
          CONFIRM
        </Button>
      </div>
    </div>
  );
};
