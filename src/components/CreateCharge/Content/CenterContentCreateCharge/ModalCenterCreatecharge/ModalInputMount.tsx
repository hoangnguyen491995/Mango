import { Popover, Row } from "antd";
import React, { useRef, useState } from "react";
import { theme } from "tailwind.config";
import styled from "styled-components";

const InputDuration = styled.input`
  height: 50px;
  border: none;
  color: #f28500;
  font-size: 26px;
  outline: none;
  font-weight: 600;
`;
const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."];

function ModalInputMount({ props }) {
  const [state, setState] = useState("");
  const [valueTime, setValueTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const durationRef = useRef(null);
  const handleKeyNumber = (item: string) => {
    switch (item) {
      case "C":
        setDuration("");
        break;
      default:
        setDuration(
          item == "." ? duration.replaceAll(".", "") + item : duration + item
        );
        break;
    }
  };

  const classnameKeyBtn = `rounded-full mx-auto block `;

  const content = (
    <div
      className=" w-[300px] flex flex-col justify-center
     items-center content-center py-4 px-4"
    >
      <div className="ml-[3px]">
        <div style={{ maxWidth: "300px" }}>
          <div>
            <div className=" flex flex-col content-center items-center">
              <InputDuration
                placeholder="Input Amount"
                value={String(
                  "$" + parseFloat(duration == "" ? "0" : duration).toFixed(2)
                )}
                ref={durationRef}
                className="placeholder:text-xl text-center border-none w-full"
              />
            </div>
            <Row justify="space-around">
              {keyCalc.map((item, index) => {
                return (
                  <div key={index} className="m-2">
                    <div
                      onClick={() => handleKeyNumber(item)}
                      className="border-[1px] border-stone-400 flex justify-center 
                  hover:opacity-50 rounded-full 2xl:w-[70px] 2xl:h-[70px]
                  xl:h-[62px] xl:w-[62px] w-[48px] h-[48px] items-center cursor-pointer"
                    >
                      <span className="font-bold 2xl:text-3xl xl:text-2xl text-xl text-[#505050] noselect ">
                        {item}
                      </span>
                    </div>
                  </div>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center content-center w-full">
        <button
          onClick={() => {
            setState(String(duration));
          }}
          className="w-full my-6 mx-[8px] rounded py-[14px] font-bold "
          style={{
            background: `${theme.extend.colors["mango-primary-blue"]}`,
            color: "#fff",
          }}
        >
          ENTER
        </button>
      </div>
    </div>
  );

  return (
    <div className="demo">
      <div>
        <Popover
          placement="rightBottom"
          content={content}
          trigger="click"
          overlayStyle={{ paddingLeft: "50px" }}
        >
          <div className="text-mango-text-medium w-[90%] h-[80px] rounded-md border flex-col flex justify-center items-center bg-white shadow-mango-shadow-2 border-mango-border-medium font-bold text-base hover:bg-mango-primary-blue hover:text-white cursor-pointer">
            <span>OTHER</span>
            <span> AMOUNT</span>
            <span> ${state == "" ? "0.00" : parseFloat(state).toFixed(2)}</span>
          </div>
        </Popover>
      </div>
    </div>
  );
}

export default ModalInputMount;
