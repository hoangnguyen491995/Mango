import { Modal, Row } from "antd";
import React, { useState } from "react";
import { theme } from "tailwind.config";
import type { RadioChangeEvent } from "antd";
import { Radio, Space } from "antd";
import FormKeyNumber from "../../FormKeyNumber";
const classTab =
  "flex w-[168px] h-[48px] items-center justify-center border-b-[3px]  text-[25px] text-[#505050] font-bold ml-[15px] cursor-pointer ";
const Discount: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [radioSelected, setRadioSelected] = useState(2);
  const [value, setValue] = useState<string>("");
  const [isPercent, setIsPercent] = useState<boolean>(true);
  const [isCurrency, setIsCurrency] = useState<boolean>(false);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onClickPercent = () => {
    setIsPercent(true);
    setIsCurrency(false);
    setValue("0");
  };

  const onClickCurrency = () => {
    setIsCurrency(true);
    setIsPercent(false);
    setValue("0");
  };
  const handleChangeRadio = (value) => {
    setRadioSelected(value);
  };
  return (
    <>
      <Row onClick={showModal}>
        <button className="mr-auto ml-auto">
          <img
            className="w-[80px] h-[80px] "
            src="/assets/imgs/Discount.svg"
            alt=""
          />
        </button>
        <p className="font-bold w-full text-center truncate 2xl:text-[14px] md:text-xs sm:text-xs ">
          {" "}
          Discount
        </p>
      </Row>
      <Modal
        footer={null}
        width="580px"
        visible={isModalVisible}
        onOk={handleOk}
        className="modal-add-ticket "
        onCancel={handleCancel}
      >
        <div
          className="h-[134px] items-center flex justify-center"
          style={{ background: "#D1D1D133 0% 0% no-repeat padding-box" }}
        >
          <div>
            <span className="text-2xl my-[10px] font-bold flex justify-center items-center text-[#505050]">
              {" "}
              DISCOUNT
            </span>
            <div className="flex flex-nowrap flex-row justify-center">
              {isPercent ? (
                <div
                  className={
                    classTab + " border-[#00bed6] " + (isPercent && " bg-white")
                  }
                  onClick={onClickPercent}
                >
                  %
                </div>
              ) : (
                <div
                  className={classTab + " border-[#A7A7A7]"}
                  onClick={onClickPercent}
                >
                  %
                </div>
              )}
              {isCurrency ? (
                <div
                  className={
                    classTab +
                    " border-[#00bed6] " +
                    (isCurrency && " bg-white ")
                  }
                  onClick={onClickCurrency}
                >
                  $
                </div>
              ) : (
                <div
                  className={classTab + " border-[#A7A7A7]"}
                  onClick={onClickCurrency}
                >
                  $
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className="flex flex-nowrap flex-row justify-between ">
            <div className="w-1/2 border-r border-black mt-[20px] mb-1">
              <div className="h-[250px] overflow-scroll flex flex-wrap"></div>
              <div className="border-t">
                <Space direction="vertical">
                  <div
                    className="flex cursor-pointer my-2"
                    onClick={() => handleChangeRadio(1)}
                  >
                    <img
                      src={
                        "/assets/imgs/RadioButton/" +
                        (radioSelected == 1 ? "24px-04.svg" : "24px-03.svg")
                      }
                      className="w-[25px]"
                    />

                    <span
                      className="ml-2"
                      style={{
                        font: "normal normal normal 20px/24px Montserrat",
                      }}
                    >
                      On salon
                    </span>
                  </div>
                  <div
                    className="flex cursor-pointer my-2"
                    onClick={() => handleChangeRadio(2)}
                  >
                    <img
                      src={
                        "/assets/imgs/RadioButton/" +
                        (radioSelected == 2 ? "24px-04.svg" : "24px-03.svg")
                      }
                      className="w-[25px]"
                    />
                    <span
                      className="ml-2"
                      style={{
                        font: "normal normal normal 20px/24px Montserrat",
                      }}
                    >
                      On Salon/ Tech
                    </span>
                  </div>
                  <div
                    className="flex cursor-pointer my-2"
                    onClick={() => handleChangeRadio(3)}
                  >
                    <img
                      src={
                        "/assets/imgs/RadioButton/" +
                        (radioSelected == 3 ? "24px-04.svg" : "24px-03.svg")
                      }
                      className="w-[25px]"
                    />
                    <span
                      className=" ml-2"
                      style={{
                        font: "normal normal normal 20px/24px Montserrat",
                      }}
                    >
                      On Tech
                    </span>
                  </div>
                </Space>
              </div>
            </div>
            <div className="flex flex-row justify-center w-1/2 mt-[40px]">
              <FormKeyNumber
                defaultValue={"0"}
                type={"discount"}
                defaultColor={"text-[#F89D20]"}
                isPercent={isPercent}
                isCurrency={isCurrency}
                setValue={setValue}
                value={value}
              />
            </div>
          </div>
          <div>
            <button
              className="w-full mt-4 rounded py-[7px] font-bold text-2xl"
              style={{
                background: `${theme.extend.colors["mango-primary-blue"]}`,
                color: "#fff",
              }}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Discount;
