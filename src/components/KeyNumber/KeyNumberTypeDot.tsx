// @flow
import { Button, Col, Row, Space } from "antd";
import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

const InputDuration = styled.div`
  height: 60px;
  border: none;
  color: #a7a7a7;
  font-size: 24px;
  outline: none;
`;
interface Props {
  title: string | " ";
  sizeKey: string;
  show: number;
  value: string;
  confirmValue: Function;
}
const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."];
export const KeyNumberTypeDot = (props: Props) => {
  const [duration, setDuration] = useState<string>("0");
  const durationRef = useRef(null);
  useEffect(() => {
    setDuration(props.value);
  }, [props.show]);
  const handleKeyNumber = (item: string) => {
    switch (item) {
      case "C":
        setDuration("0");
        props.confirmValue("0");
        break;
      case ".":
        if (duration.includes(".")) {
          setDuration(duration.replace(".", ""));
        } else {
          setDuration(duration + item);
          props.confirmValue(duration + item);
        }

        // setDuration(duration.slice(0, duration.length - 1));
        // props.confirmValue(duration.slice(0, duration.length - 1));
        break;
      default:
        setDuration(duration + item);
        props.confirmValue(duration + item);
        break;
    }
  };
  const showUnit = (show) => {
    switch (show) {
      case 0:
        // Price
        return "$" + Number(duration);
      case 1:
        // Duration
        return Number(duration) + " Min";
      case 2:
        // Product charge
        return "$" + Number(duration);
      case 3:
        // Turn
        return Number(duration);
      default:
        return Number(duration);
    }
  };
  //classname key button
  const classnameKeyBtn = `text-mango-text-medium border border-mango-border-dark  rounded-full hover:border hover:border-solid hover:bg-cyan-200 mx-auto block  ${props.sizeKey}`;
  return (
    <div className="w-full h-full flex flex-col ">
      <InputDuration
        placeholder={props.title}
        ref={durationRef}
        className="text-center text-black border-none w-4/5 mx-auto"
      >
        {duration == "0" ? props.title : showUnit(props.show)}
      </InputDuration>

      <div
        className=" grid w-full h-full justify-center content-center"
        style={{
          gridTemplateRows: "repeat(4 , 70px)",
          gridTemplateColumns: "repeat(3 , 70px)",
          gridAutoFlow: "unset",
          gridGap: "10px",
        }}
      >
        {keyCalc.map((item, index) => {
          return (
            <div
              className={
                "w-full h-full  hover:bg-mango-primary-blue-hover cursor-pointer font-semibold text-[35px] flex items-center justify-center border-[1.5px] rounded-full border-mango-border-dark   "
              }
              style={{ font: "normal normal 700 var(--s-30)" }}
              key={index}
              onClick={() => handleKeyNumber(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
