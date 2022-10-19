import { Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IMG_CREATE_CHARGE } from "src/utils/constant";
import { theme } from "tailwind.config";

const ModalScanGiftCard: React.FC = () => {
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

  return (
    <>
      <span onClick={showModal}>SCAN QR</span>
      <Modal
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="24%"
        style={{ minWidth: "400px" }}
      >
        <Row className="">
          <Col span={24}>
            <div className="flex-col flex justify-center items-center text-current">
              <span className="font-bold text-xl text-inherit">
                SCAN GIRTCARD CODE
              </span>
            </div>
          </Col>
        </Row>
        <Row className="flex justify-center content-center items-center mt-2">
          <Col span={3}>
            <span>Code</span>
          </Col>
          <Col span={19}>
            <div className="border rounded-md py-[3px] flex justify-end">
              <IoMdEye
                style={{ width: "28px", height: "28px", marginRight: "10px" }}
              />
            </div>
          </Col>
          <Col span={22} className="mt-4">
            <div className="w-full h-[320px] bg-slate-100 rounded-md flex-col flex justify-center items-center text-current">
              <div className="w-[70%] border-[1px] min-h-[220px] flex flex-col items-center  ">
                <div
                  className="w-[97%] h-[45px] bg-slate-500 flex justify-center content-center mt-[4px]"
                  style={{
                    background: `${theme.extend.colors["mango-red-bg"]}`,
                  }}
                >
                  <div className=" flex flex-col justify-center content-center items-center ">
                    <span
                      style={{ color: `${theme.extend.colors["mango-red-1"]}`}}
                    >
                      NoFoundError:Requested device
                    </span>
                    <span
                      style={{
                        color: `${theme.extend.colors["mango-red-1"]}`,
                      }}
                    >
                      not founnd
                    </span>
                  </div>
                </div>
                <div className=" w-[90%] h-[60%] bg-white mt-8">
                  <img className="w-full h-full" src={IMG_CREATE_CHARGE} />
                </div>
              </div>
            </div>
          </Col>
          <Col span={21}>
            <button
              className="w-full mt-2 rounded py-[4px]  text-[15px]"
              style={{
                background: `${theme.extend.colors["mango-primary-blue"]}`,
                color: "#fff",
              }}
            >
              CONFIRM
            </button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ModalScanGiftCard;
