// @flow
import { Button, Input, Modal } from "antd";
import Search from "antd/lib/transfer/search";
import * as React from "react";
import styled from "styled-components";
const ButtonCus = styled.button`
  .showText:after {
    content: "EDIT TIP";
    /* color */
  }
`;

type Props = {};
export const EditTip = (props: Props) => {
  const [showText, setShowText] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div
        onClick={showModal}
        className={
          "!bg-orange-500 opacity-80 !rounded-r-md ml-1 absolute bottom-5 !border-none showText cursor-pointer p-2 flex  h-[40px]" +
          (showText ? " w-[110px] " : " w-[42px]")
        }
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
      >
        <img src="/assets/imgs/IconTip.svg" alt="Icon Tip" />
        {showText && (
          <span className="text-white text-sm ml-2 underline">EDIT TIP</span>
        )}
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        footer={null}
      >
        <div className="w-full">
          <p className="text-center text-xl font-bold">ADD/EDIT TIPS</p>
          <Input.Search
            placeholder="Search ID"
            bordered={false}
            className="!w-[50%] flex !ml-[25%]  !focus:outline-none !p-0 !m-0 !mb-2 customeInputSearch"
            style={{ borderBottom: "1px solid gray" }}
          />
        </div>
      </Modal>
    </>
  );
};
