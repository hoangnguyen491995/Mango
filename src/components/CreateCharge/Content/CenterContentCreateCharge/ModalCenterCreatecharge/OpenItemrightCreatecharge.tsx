// @flow
import { Col, Row } from "antd";
import { useEffect, useRef, useState } from "react";
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
  show: number;
  value: string;
  confirmValue: Function;
}
const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."];

export const KeyNumberCreateCharge = (props: Props) => {

  const [duration, setDuration] = useState<string>("");
  const durationRef = useRef(null);

  useEffect(() => {
    setDuration(props.value);
  }, [props.show])
  
  const handleKeyNumber = (item: string) => {
    switch (item) {
      case "C":
        setDuration("");
        props.confirmValue("");
        break;
      default:
        setDuration(duration + item);
        props.confirmValue(duration + item);
        break;
    }
  };

  return (
    <div className="w-full h-full flex flex-col ml-2 mt-2 2xl:mt-4">
      <InputDuration
        placeholder="Custom Amount"
        value={String(duration)}
        ref={durationRef}
        readOnly
        className="text-center border-none w-full placeholder:text-[18px] placeholder:text-zinc-400 placeholder:font-normal"
      />
      <Row justify="space-around" className="mt-2">
        {keyCalc.map((item, index) => {
          return (
            <Col span={5} key={index} className="m-2">
              <div className=" border-[1px] border-gray-400 flex justify-center items-center hover:shadow-md 2xl:w-[65px] w-[50px] xl:w-[50px] rounded-full 2xl:h-[65px] h-[50px] xl:h-[50px] ">
                <button
                  className="text-[#505050]"
                  onClick={() => handleKeyNumber(item)}
                >
                  <span className="font-semibold xl:text-3xl md:text-2xl text-2xl">
                    {item}
                  </span>
                </button>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
