import { Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { theme } from "tailwind.config";
import ModalScanCoupon from "./ModalScanCouponCode";

const ModalRedeem: React.FC = () => {
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
      <Row onClick={showModal}>
        <button className="mr-auto ml-auto">
          <img
            className="w-[80px] h-[80px]"
            src="/assets/imgs/redeem.svg"
            alt=""
          />
        </button>
        <p className="font-bold w-full text-center truncate 2xl:text-[14px] md:text-xs sm:text-xs">
          Redeem
        </p>
      </Row>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        width={420}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <div className="flex-col flex justify-center items-center text-current">
              <span
                className={`font-bold text-2xl text-inherit `}
                style={{ color: "#505050" }}
              >
                REDEEM
              </span>
              <span className="mt-2 text-base font-medium text-inherit">
                YOU HAVE 0 REWARDS
              </span>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col span={24}>
            <Row className=" flex justify-center content-center items-center">
              <Col span={2}>
                <span
                  className="text-lg px-[10px] py-[2px] rounded"
                  style={{ border: "3px solid #d1d1d1", color: "#D1D1D1" }}
                >
                  x
                </span>
              </Col>
              <Col span={1}></Col>
              <Col span={21}>
                <button
                  className="w-full rounded h-[full] py-4 font-bold text-2xl shadow"
                  style={{
                    border: `2px solid ${theme.extend.colors["mango-green-1"]}`,
                    color: `${theme.extend.colors["mango-green-1"]}`,
                    boxShadow: "0px 3px 10px #0000004d",
                  }}
                >
                  PLEASE SIGN UP!
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-8">
          <Col span={24}>
            <Row className=" flex justify-center content-center items-center">
              <div></div>
              <Col span={2}>
                <span
                  className="text-lg px-[10px] py-[2px] rounded"
                  style={{ border: "3px solid #d1d1d1", color: "#D1D1D1" }}
                >
                  x
                </span>
              </Col>
              <Col span={1}></Col>
              <Col span={21}>
                <ModalScanCoupon />
              </Col>
            </Row>
            <Row>
              <Col span={3}></Col>
              <Col span={21}>
                <div className="mt-2">
                  <button
                    className="w-full mt-6 rounded h-[40px] font-bold text-base"
                    style={{
                      background: `${theme.extend.colors["mango-primary-blue"]}`,
                      color: "#fff",
                    }}
                  >
                    CONFIRM
                  </button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalRedeem;
