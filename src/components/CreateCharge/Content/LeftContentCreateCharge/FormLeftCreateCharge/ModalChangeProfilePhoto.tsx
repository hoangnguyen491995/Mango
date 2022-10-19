import { Col, Modal, Row, Upload } from "antd";
import React, { useState } from "react";

function ModalChangeProfilePhoto(props) {
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
      <div
        onClick={showModal}
        className="2xl:w-[50px] 2xl:h-[50px] xl:w-[40px] xl:h-[40px] w-[35px] h-[35px] rounded-full flex justify-center items-center "
        style={{
          background: "#FFCD00",
        }}
      >
        <span className="text-white  xl:text-xl text-md ">
          {props.props != null ? props.props.trim().slice(0, 1) : "N"}
        </span>
      </div>
      <Modal
        width="498px"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Row className="items-center justify-center">
            <Col className=" text-2xl font-bold text-slate-600 items-center justify-center">
              CHANGE PROFILE PHOTO
            </Col>
          </Row>
        </div>
        <span className=" text-slate-600">
          {" "}
          You can select a JPG/JPEG/PNG file with a maximum 5MB size
        </span>
      </Modal>
      <Upload></Upload>
    </>
  );
}

export default ModalChangeProfilePhoto;
