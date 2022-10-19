import { Modal, Row, Col } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { theme } from "tailwind.config";
import styled from "styled-components";

const InputDuration = styled.input`
  height: 50px;
  border: none;
  color: #f28500;
  font-size: 24px;
  outline: none;
  font-weight: 600;
`;

const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."];
function ModalModifyTime({ props: props }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (e) => {
    setIsModalVisible(true);
    setValueTime(e.target.value);
    console.log(e.target.value);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [valueTime, setValueTime] = useState<string>("");
  const [duration, setDuration] = useState<string>(props);
  const durationRef = useRef(null);
  const [showTime, setShowTime] = useState<boolean>(true);
  const handleKeyNumber = (item: string) => {
    setShowTime(true);
    setDuration(valueTime);
    switch (item) {
      case "C":
        setDuration("0");
        break;
      default:
        setDuration(duration + item);
        break;
    }
  };
  const handleChangeTime = () => {
    setShowTime(false);
    setIsModalVisible(false);
  };
  const RefTime = useRef("");
  useEffect(() => {}, [showTime]);

  return (
    <>
      <button
        value={valueTime}
        onClick={showModal}
        className="border-current border-[1px] p-[5px] rounded  xl:text-[14px] text-[12px] w-[80px] xl:h-[30px] h-6 "
        style={{
          borderColor: `${theme.extend.colors["mango-primary-blue"]}`,
        }}
      >
        <div className="w-[95%]">
          <span>{showTime ? props : String(duration)}</span>
          <span className=" xl:text-[14px] text-[12px]">min</span>
        </div>
      </button>
      <Modal
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ maxWidth: "280px", borderRadius: "5px" }}
      >
        <div className="w-[230px] flex flex-col justify-center items-center">
          <span className="font-bold text-[17px] text-[#505050]"> MIN </span>
          <div
            style={{ maxWidth: "290px" }}
            className="flex justify-center items-center"
          >
            <div className="w-full h-full flex flex-col justify-center items-center ">
              <InputDuration
                placeholder="Custom Amount"
                value={String(duration)}
                ref={durationRef}
                readOnly
                className="text-center border-none w-full placeholder:text-[18px] placeholder:text-zinc-400 placeholder:font-normal"
              />
              <Row justify="space-around">
                {keyCalc.map((item, index) => {
                  return (
                    <Col span={5} key={index} className="m-2">
                      <div className=" border-[2px] flex justify-center items-center hover:shadow-md w-[55px] rounded-full h-[55px] border-neutral-400">
                        <button
                          className="text-[#505050]"
                          onClick={() => handleKeyNumber(item)}
                        >
                          <span className="font-bold text-[20px]">{item}</span>
                        </button>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
          <div
            className=" mt-[10px] w-full h-[38px] rounded flex justify-center items-center "
            style={{
              backgroundColor: `${theme.extend.colors["mango-primary-blue"]}`,
            }}
          >
            <span
              className=" text-[18px] font-bold text-white"
              onClick={handleChangeTime}
            >
              DONE
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ModalModifyTime;
