// @flow
import { Modal, Row, Space } from "antd";
import React, {
  useContext,
  ChangeEvent,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { useAppSelector } from "src/redux/hook";
type Props = {};
const classButtonNumber = " hover:bg-[#ffffff80] bg-[#ffffff4d]  text-[3rem]  ";
const classButton =
  " text-white border-none rounded-[50%]  text-center w-[100px] h-[100px] pt-3  cursor-pointer flex item-center justify-center ";
export const PermissionLogin = (props: Props) => {
  const showPermission = useAppSelector(
    (state) => state.authenticate.showPermission
  );
  const [valueInput, setValueInput] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(showPermission);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setIsModalOpen(showPermission);
  }, [showPermission]);
  return (
    <Modal
      visible={isModalOpen}
      footer={null}
      closable={false}
      className="customModalPermission"
    >
      <div className="bg-[#80808000] ">
        <div
          style={{ textAlign: "center", background: "rgba(128, 128, 128,0)" }}
        >
          <input
            className="outline-none bg-[#80808000] w-full text-[5em] text-white text-center border-none"
            type="password"
            value={valueInput}
            name={classButton + classButtonNumber}
            maxLength={4}
          />

          <Space className="flex flex-col mt-4" size={"large"}>
            <Row>
              <Space size={"large"}>
                <div className={classButton + classButtonNumber}>1</div>
                <div className={classButton + classButtonNumber}>2</div>
                <div className={classButton + classButtonNumber}>3</div>
              </Space>
            </Row>

            <Row>
              <Space size={"large"}>
                <div className={classButton + classButtonNumber}>4</div>
                <div className={classButton + classButtonNumber}>5</div>
                <div className={classButton + classButtonNumber}>6</div>
              </Space>
            </Row>

            <Row>
              <Space size={"large"}>
                <div className={classButton + classButtonNumber}>7</div>
                <div className={classButton + classButtonNumber}>8</div>
                <div className={classButton + classButtonNumber}>9</div>
              </Space>
            </Row>
            <Row>
              <Space size={"large"}>
                <div className={classButton + " text-[30px] cursor-pointer "}>
                  Clear
                </div>
                <div className={classButton + classButtonNumber}>0</div>
                <div
                  className={classButton + " text-[30px] cursor-pointer "}
                  onClick={handleCancel}
                >
                  Cancel
                </div>
              </Space>
            </Row>
          </Space>
        </div>
      </div>
    </Modal>
  );
};
