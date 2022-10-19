import { Modal, Row, Col } from "antd";
import React, { useState } from "react";
import { theme } from "tailwind.config";
import FormKeyNumber from "../../FormKeyNumber";
import { messageWarning } from "src/components/MessageAlert";

import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { AddExtraPrice } from "services/CreateCharge/AddExtraPrice";

function ModalExtra() {
  const [value, setValue] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let prices = [1, 5, 10, 20, 50, 60];

  const apiAddExtraPrice = new AddExtraPrice();
  const handleAddExtraPrice = () => {
    messageWarning("Item Already Have Extra");
    // apiAddExtraPrice.addExtraPrice(1, 2, 3).then((res) => {
    //   if (res.status == 200) {
    //     messageWarning("Item Already Have Extra");
    //   }
    // });
  };

  return (
    <>
      <Row
        onClick={showModal}
        className="bg-white 
      rounded-lg shadow-md "
      >
        <button className="mr-auto ml-auto">
          <img src="/assets/imgs/extra.svg" />
        </button>
        <p
          className="font-bold w-full text-center truncate
         2xl:text-[14px] md:text-xs sm:text-xs mt-[2px]  "
        >
          EXTRA
        </p>
      </Row>
      <Modal
        width="492px"
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="w-full h-[55px] border-b-[2px] border-[#d1d1d1]">
          <span className="flex text-[#505050] text-[24px] font-bold justify-center opacity-100">
            EXTRA
          </span>
        </div>
        <div className="flex flex-nowrap flex-row justify-between h-[500px]">
          <div className="flex flex-col w-[196px] border-r border-black">
            <div className="h-full flex flex-col justify-evenly">
              {prices.map((item, index) => {
                return (
                  <div
                    key={index}
                    // onClick={() => {
                    //   handleAddExtra(item);
                    // }}
                    className="flex justify-center items-center font-bold text-[25px] text-[#505050] border
                    border-[#A7A7A7] shadow-[0px_2px_6px_#A7A7A7] m-[6px] w-[146px] h-[50px] rounded bg-white
                    hover:bg-[#00bed6] hover:border-[#00bed6]"
                  >
                    ${item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col h-full w-[295px]">
            <div className="flex flex-row justify-center">
              <FormKeyNumber
                defaultValue={"$0"}
                type={"extra"}
                defaultColor={"text-[#F89D20]"}
                isPercent={false}
                isCurrency={false}
                setValue={setValue}
                value={value}
              />
            </div>
            <div className="flex justify-center cursor-pointer">
              <button
                className="flex w-[265px] h-[50px] bg-[#00BED6] text-[25px] font-semibold items-center p-[4px] text-center 
            rounded-[5px] justify-center"
                onClick={() => handleAddExtraPrice()}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalExtra;
