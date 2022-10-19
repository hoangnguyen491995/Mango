import { useEffect, useState } from "react";
import { Badge, Col, Empty, Row } from "antd";
import { ImageExists } from "src/utils/ImageError";
import { useSelector } from "react-redux";
import { LeftTabTechSalonCenter$ } from "src/redux/selector";
import { Modal } from "antd";
import { KeyNumber } from "./LeftModalSalonCenter";
import { API_MANGO_TECH_IMG } from "src/utils/constant";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";
import moment from "moment";
import ItemTechSalonCenter from "./ItemTechSalonCenter";
import { ChangeImagePhoto } from "src/components/ChangeImagePhoto/ChangeImagePhoto";

export interface IInforTech {
  employeeID: number;
  nickName: string;
  imageFileName: string;
  backGroundColor: string;
  lockIn: string;
  employeeName: string;
  bookingIndex: number;
}
interface Props {
  dataItem: Array<ITechSalonCenter>;
  setHeight: Function;
  height: boolean;
}
const flexitem =
  "flex  overflow-x-scroll content-start flex-col flex-wrap  justify-start items-start ";
const TechTabLeftSalonCenter = ({ dataItem, setHeight, height }: Props) => {
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

  const sizeItem = useSelector(LeftTabTechSalonCenter$);
  // console.log(sizeItem.size);

  return (
    <>
      <div
        className={flexitem}
        style={{ width: "calc(100% + 0px)", height: "calc(100vh - 150px)" }}
      >
        {dataItem.length > 0 ? (
          dataItem.map((tech: ITechSalonCenter, index) => (
            <ItemTechSalonCenter
              key={index}
              tech={tech}
              height={height}
              setHeight={setHeight}
            />
          ))
        ) : (
          <Empty className="mx-auto w-full h-full " />
        )}
      </div>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Row justify="space-around" className="h-[460px] ">
          <Col
            span={6}
            className="border-r-[1px] border-current  "
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span className="font-semibold text-xl ml-[6px]">CHOOSE</span>
            <br />
            <button
              className="font-semibold hover:border hover:border-solid"
              style={{
                width: "80px",
                height: "75px",
                marginTop: "5px",
                borderRadius: "5px",
                backgroundColor: "rgb(134 239 172)",
                margin: "6px",
              }}
            >
              {" "}
              Bonus
            </button>
            <br />
            <button
              className=" font-semibold shadow-md hover:border hover:border-solid   "
              style={{
                width: "80px",
                height: "75px",
                borderRadius: "5px",
                margin: "6px",
              }}
            >
              {" "}
              0.5
            </button>
            <br />
            <button
              className=" font-semibold shadow-md hover:border  "
              style={{
                width: "80px",
                height: "75px",
                borderRadius: "5px",
                margin: "6px",
              }}
            >
              {" "}
              1.5
            </button>
            <br />
            <button
              className=" font-semibold shadow-md hover:border hover:border-solid "
              style={{
                width: "80px",
                height: "75px",
                borderRadius: "5px",
                margin: "6px",
              }}
            >
              2
            </button>
          </Col>
          <Col span={18}>
            <KeyNumber />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default TechTabLeftSalonCenter;
