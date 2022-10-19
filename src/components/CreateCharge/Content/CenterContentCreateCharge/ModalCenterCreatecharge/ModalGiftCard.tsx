import { Col, Row } from "antd";

import { theme } from "tailwind.config";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Modal } from "antd";
import React, { useState } from "react";

import { Typography } from "antd";

const { Title } = Typography;

import {
  API_MANGO_IMG,
  DOMAIN_URL,
  IMG_CREATE_CHARGE,
} from "src/utils/constant";
import ModalInputMount from "./ModalInputMount";
import { IModel } from "src/components/AddNewTix/Content/DataStructures";
import { RefreshIcon } from "public/assets/imgs/refreshIcon";
interface Props {
  props: IModel;
  onOk: any;
  visible: boolean;
  onCancel: any;
}
function ModalGiftCard({ props }) {
  let listPrice = [
    {
      id: 1,
      price: "15",
    },
    {
      id: 2,
      price: "20",
    },
    {
      id: 3,
      price: "25",
    },
    {
      id: 4,
      price: "50",
    },
    {
      id: 5,
      price: "100",
    },
  ];
  const handlePrice = () => {};
  const [showPassWord, setShowPassWord] = useState<boolean>(true);
  const [typeInput, setTypeInput] = useState<string>("password");

  let classAmount =
    "text-mango-text-medium w-[90%] h-[80px] rounded-md border flex-col flex bg-white justify-center items-center shadow-mango-shadow-2 border-mango-border-medium font-bold text-base hover:bg-mango-primary-blue hover:text-white cursor-pointer";

  const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
  const BASE_URL = DOMAIN_URL + "/Upload/categories/";
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
  // console.log(BASE_URL + props);

  return (
    <>
      <div
        onClick={showModal}
        className="flex-col flex justify-center items-center text-current border-[1px]
         rounded-xl 2xl:w-[120px] xl:[90px] md:w-[45%] w-[48%] 2xl:h-[110px] bg-white shadow-md "
      >
        <img className=" 2xl:w-[60px] " src={BASE_URL + props} alt="error" />
        <span
          className="w-11/12 truncate font-semibold pt-1 2xl:text-[13px]
         xl:text-[11px] md:text-[10px] text-[8px]"
        >
          GIFT CARD
        </span>
      </div>
      <Modal
        footer={null}
        closable={true}
        width="34%"
        style={{ minWidth: "500px" }}
        visible={isModalVisible}
        className="modal-add-ticket "
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="p-5">
          <Row className="flex justify-center">
            <div className="text-[22px] text-[#00bed6] text-center font-semibold">
              GIFT CARD
            </div>
          </Row>
          <Row className="flex justify-center items-center mt-2">
            <Col span={3}>
              <div className=" flex justify-end mr-2">
                <span className="text-base ">Code</span>
              </div>
            </Col>
            <Col span={14}>
              <div
                className=" w-full h-[36px] rounded-md flex 
                border shadow border-inherit text-mango-primary-blue cursor-pointer "
              >
                <RefreshIcon className="h-6 w-6 m-[6px] text-mango-primary-blue" />
                <input
                  type={typeInput}
                  className="w-full pl-2 h-[34px] !outline-none !border-none text-[26px] leading-[1.5rem]"
                ></input>
                {!showPassWord ? (
                  <AiFillEye
                    className=""
                    style={{
                      width: "34px",
                      height: "34px",
                      color: `${theme.extend.colors["mango-gray-5"]}`,
                    }}
                    onClick={() => {
                      setTypeInput("password");
                      setShowPassWord(!showPassWord);
                    }}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className=""
                    style={{
                      width: "34px",
                      height: "34px",
                      color: `${theme.extend.colors["mango-gray-5"]}`,
                    }}
                    onClick={() => {
                      setTypeInput("text");
                      setShowPassWord(!showPassWord);
                    }}
                  />
                )}
              </div>
            </Col>
            {/* handle */}
          </Row>{" "}
          <div className="bg-mango-bg-dark rounded-[16px]">
            <Col span={24} className="mt-4">
              <div
                className="w-full h-[320px]  rounded-lg
             flex-col flex  items-center text-current"
              >
                <span
                  className="font-bold text-xl text-inherit mt-2"
                  style={{ color: `${theme.extend.colors["mango-gray-4"]}` }}
                >
                  SCAN YOUR QR CODE
                </span>
                <img
                  src="/assets/imgs/flip-camera-icon-37772.png"
                  className="h-8"
                />
                <div className="w-[240px] h-2 mx-auto flex">
                  <div className="bg-[#ffcd00] !h-[10px] mt-[6px] !w-[10px] rounded-full"></div>
                  <p className="text-[#ffcd00] !h-[10px] ml-10">
                    Requesting camera
                  </p>
                </div>
                <div
                  className=" w-[42%] h-[60%] bg-white mt-8
               border-r-[7px] rounded-r-lg border-current cursor-pointer"
                >
                  <img className="w-full h-full " src={IMG_CREATE_CHARGE} />
                </div>
              </div>
            </Col>
            <Row justify="space-between">
              <Col span={24} className="mb-2">
                <div className="flex justify-start">
                  <span className="text-base ">Amount</span>
                </div>
              </Col>
              {listPrice.map((post) => {
                return (
                  <Col key={post.id} span={4}>
                    <div className={classAmount}>
                      <span>${post.price}.00</span>
                    </div>
                  </Col>
                );
              })}
              <Col span={4}>
                <ModalInputMount props={handlePrice} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className="flex py-2 justify-center">
                  <div className="w-1/2 flex">
                    <img
                      className="w-[30px] h-[30px]"
                      src="/assets/imgs/27x25px-Expiry-date-01.svg"
                      alt=""
                    />
                    <span className="mt-[5px] text-sm ml-2 font-bold">
                      Expiration Date
                    </span>
                  </div>
                  <span className="mt-[5px] text-sm   font-bold  item-center w-1/2">
                    {" "}
                    Unset
                  </span>
                </div>
              </Col>
            </Row>
            <Col span={24}>
              <button
                className="w-full mt-2 rounded font-bold  py-[11px]"
                style={{
                  background: `${theme.extend.colors["mango-primary-blue"]}`,
                  color: "#fff",
                }}
              >
                CONFIRM
              </button>
            </Col>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalGiftCard;
