import { Button, Modal, Col, Row, Menu, Dropdown, Space } from "antd";
import React, { useState } from "react";
import { InputNumber } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Radios from "./Radios";

const ModalRepeat: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [values, setValues] = useState<string>("Day");
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key == "1") {
      setValues("Day");
    } else if (e.key == "2") {
      setValues("Week");
    } else {
      setValues("Month");
    }
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "Day",
          key: "1",
        },
        {
          label: "Week",
          key: "2",
        },
        {
          label: "Month",
          key: "3",
        },
      ]}
    />
  );
  return (
    <>
      <div
        className="w-[70px] hover:bg-mango-primary-blue-light !h-[35px] !px-[10px] !py-[0px]  cursor-pointer leading-[15px] text-[12px] rounded-[4px] items-center flex font-semibold text-mango-primary-blue uppercase "
        onClick={showModal}
      >
        {" "}
        <p className=" !font-bold !text-mango-primary-blue !box-border !m-0 ">
          REPEAT
        </p>
      </div>
      <Modal
        title="Custom recurrence"
        visible={isModalVisible}
        onOk={handleOk}
        okText="Confirm"
        onCancel={handleCancel}
      >
        <Row className=" grid grid-flow-col auto-cols-max  relative ">
          <Col span={8} className="mt-auto mb-auto">
            <h3>Repeat every</h3>
          </Col>
          <Col span={8}>
            <InputNumber size="large" min={1} max={2000} defaultValue={3} />
          </Col>
          <Col span={8}>
            <Dropdown overlay={menu}>
              <Button size="large" className="w-24">
                <Space>
                  {values}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <h3 className="mt-3 mb-3">Ends</h3>
        <Radios setIncreaseDay={values} />
      </Modal>
    </>
  );
};
export default ModalRepeat;
