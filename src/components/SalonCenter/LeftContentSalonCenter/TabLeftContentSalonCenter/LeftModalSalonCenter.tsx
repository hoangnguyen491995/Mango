import { Col, Row } from "antd";
import { useRef, useState } from "react";
import styled from "styled-components";

const InputDuration = styled.input`
  height: 50px;
  border: none;
  color: #f28500;
  font-size: 30px;
  outline: none;
`;

const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."];

export const KeyNumber = () => {
  const [duration, setDuration] = useState<string>("");
  const durationRef = useRef(null);
  const handleKeyNumber = (item: string) => {
    switch (item) {
      case "C":
        setDuration("");
        break;
      default:
        setDuration(duration + item);
        break;
    }
  };
  //classname key button
  const classnameKeyBtn =`rounded-full mx-auto block  hover:border hover:border-solid `;
  return (
    <div className="w-full h-full flex flex-col ml-4 ">
      <div className="border-b-[1px] border-black">
        <InputDuration
          placeholder="ENTER TURN"
          value={String(duration)}
          ref={durationRef}      
          className="placeholder:text-xl text-center text-black border-none w-full"
        />
      </div>
      <Row justify="space-around">
        {keyCalc.map((item, index) => {
          return (
            <Col span={6} key={index} className="  border mt-[20px] mr-2 py-[22px] rounded-full">
              <button
                className={classnameKeyBtn}
                onClick={() => handleKeyNumber(item)}
              >
                <span className="font-semibold text-4xl text-inherit ">{item}</span>
              </button>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
