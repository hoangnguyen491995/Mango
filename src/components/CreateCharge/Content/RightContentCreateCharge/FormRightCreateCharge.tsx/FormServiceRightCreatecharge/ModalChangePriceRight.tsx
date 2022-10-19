import { Col, Modal, Row } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { theme } from "tailwind.config";
import styled from "styled-components";
import { BiX } from "react-icons/bi";
import { CreateCharge$ } from "src/redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
const InputDuration = styled.input`
  height: 50px;
  border: none;
  color: #f28500;
  font-size: 22px;
  outline: none;
  font-weight: 600;
`;
const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."];

function ModalChangePriceRight({ props }) {
  console.log("props", props);
  const dispatch = useDispatch();
  const showForm = useSelector(CreateCharge$);
  // console.log("id", showForm);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueTime, setValueTime] = useState<string>("");
  const showModal = (e) => {
    setIsModalVisible(true);
    setValueTime(e.target.value);
    // console.log(e.target.value);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [duration, setDuration] = useState<string>(props);
  // console.log("duration", duration);
  const durationRef = useRef(null);
  const handleKeyNumber = (item: string) => {
    setDuration(valueTime);
    switch (item) {
      case "C":
        setDuration("");
        break;
      case ".":
        setDuration(duration + item);

        break;

      default:
        setDuration(duration + item);
        break;
    }
  };
  const [showTime, setShowTime] = useState<boolean>(true);
  useEffect(() => {}, [showTime]);
  const classnameKeyBtn = `rounded-full mx-auto block `;
  const handleChangeTime = () => {
    setShowTime(false);
    setIsModalVisible(false);
  };
  return (
    <>
      <div
        onClick={showModal}
        className="w-[82px] h-[18px] border-[1px] border-dashed border-slate-500 rounded flex items-center justify-center bg-white "
      >
        <span className="text-[11px] font-semibold">
          $<span>{showTime ? props : String(duration)}aaaaaaaaaa</span>
        </span>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        footer={null}
        width={330}
        closeIcon
        className="modal-change-price-right"
      >
        <div className="w-[230px] flex flex-col justify-center items-center">
          <span
            className="text-xl font-semibold "
            style={{ color: `${theme.extend.colors["mango-border-dark"]}` }}
          >
            CHANGE PRICE
          </span>
          <div style={{ width: "110%" }}>
            <div>
              <div className=" flex flex-col content-center items-center text-xs">
                <InputDuration
                  value={`${String(duration)}`}
                  ref={durationRef}
                  readOnly
                  className="placeholder:text-xl text-center border-none w-full text-xs"
                />
              </div>
              <Row justify="space-around">
                {keyCalc.map((item, index) => {
                  return (
                    <Col
                      span={7}
                      key={index}
                      className=" border-black   mt-[10px] mr-2 py-[11px] rounded-full w-[75px] h-[75px] "
                      style={{
                        border: "1.5px solid #A7A7A7",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => handleKeyNumber(item)}
                    >
                      <button className={classnameKeyBtn}>
                        <span className="font-bold text-2xl text-[#505050]">
                          {item}
                        </span>
                      </button>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-[2px]">
          {/* <BiX
            className="text-xl"
            style={{ color: `${theme.extend.colors["mango-border-dark"]}` }}
          /> */}
          <button
            onClick={handleChangeTime}
            className="bg-[#f7941c] py-[12px] px-[38px] rounded mt-7 btn-confirm-modal-price "
            style={{ marginBottom: "-25px" }}
          >
            <span
              onClick={() => {
                dispatch(CreateChargeSlice.actions.setchangePrice(duration));
              }}
              className="text-white text-[16px] font-semibold"
            >
              CONFIRM
            </span>
          </button>
        </div>
      </Modal>
    </>
  );
}
export default ModalChangePriceRight;
