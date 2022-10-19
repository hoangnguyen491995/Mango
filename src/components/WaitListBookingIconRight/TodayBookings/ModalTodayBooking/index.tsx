import { Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { GoClock } from "react-icons/go";
import { BsCalendarCheckFill } from "react-icons/bs";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { BiLike, BiBook } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoIosBuild } from "react-icons/io";
import moment from "moment";
export interface IProps {
  aptEndTime: string;
  aptStartTime: string;
  borderStyle: string;
  employeeName: string;
  itemName: string;
  firstName: string;
  statusName: string;
  isVIP: boolean;
  isMember: boolean;
}
const ModalClient: React.FC<IProps> = (props) => {
  console.log("props", props);
  const [showPhone, setShowPhone] = useState<boolean>(false);
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
  const hanleShowphone = () => {
    setShowPhone(!showPhone);
  };
  return (
    <>
      <div onClick={showModal} className="mt-0">
        <p
          className="  rounded-3xl w-[80px] justify-center text-center text-[#505050] text-[0.7rem] font-semibold "
          style={{ border: "1px solid #a7a7a7" }}
        >
          {props.aptStartTime && moment(props.aptStartTime).format("hh:mm A")}
        </p>
        <div
          className="border-b-[1px] border-l-4"
          style={{
            borderColor: ` ${props.borderStyle} `,
            borderLeftWidth: "4px",
          }}
        >
          <Row justify="space-around">
            <Col className="ml-[2px] truncate" span={14}>
              <span className=" truncate w-[100px] text-base font-semibold ">
                {props.firstName}
              </span>
              <br />
              {props.isVIP ? (
                <span className=" text-xs ml-[1px]  text-slate-500 ">vip</span>
              ) : props.isMember ? (
                <span className=" text-xs ml-[1px]  text-slate-500 ">
                  {" "}
                  member
                </span>
              ) : (
                <span className=" text-xs ml-[1px]  text-slate-500 ">
                  {" "}
                  null
                </span>
              )}
            </Col>
            <Col span={6}>
              <span className="rounded-3xl w-[80px] justify-center text-center text-[#505050] text-[0.7rem] font-semibold ml-3  ">
                {props.aptEndTime && moment(props.aptEndTime).format("hh:mm A")}
              </span>
              <RiErrorWarningLine
                style={{ width: "25px", height: "25px" }}
                className=" ml-10  text-slate-600"
                fontSize="larger"
              />
            </Col>
            <Col
              className=" mt-1 mr-4 mb-[2px] text-slate-500 truncate  "
              style={{ maxWidth: "130px", marginLeft: "-5px" }}
              span={16}
            >
              {props.itemName}
            </Col>
            <Col span={6}>
              <span className="text-[#a7a7a7] text-[0.8rem] ml-[17px] font-medium ">
                {props.statusName}
              </span>
            </Col>
          </Row>
          <div className=" mb-2 " style={{ marginLeft: "3px" }}>
            <Row>
              <Col className="ml-2 mt-[3px] " span={2}>
                <IoIosBuild
                  style={{ marginBottom: "5px", marginLeft: "5px" }}
                />
              </Col>
              <Col span={19}>
                <span className="mb-2 ml-[2px] font-medium text-xs ">
                  {props.employeeName}
                </span>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <Modal
        width="370px"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2>{props.firstName}</h2>
        <span style={{ display: "flex", flexDirection: "row" }}>
          <FaPhone className="mr-4 mt-[3px]" /> :{" "}
          {showPhone ? "0988988988" : "xxxxxxxxxx"}
          <AiFillEye
            onClick={hanleShowphone}
            fontSize="larger"
            className="ml-2 mt-[2px]"
          />
          <BiLike className="ml-4 mt-[2px]" fontSize="larger" />
        </span>
        <span>Ticket:{props.aptEndTime}</span>
        <br />
        <span>Appointment time: 6.15 PM</span>
        {/* icons */}
        <div className=" justify-center text-center mt-4 ">
          <Row
            style={{ justifyContent: "center", alignContent: "center" }}
            justify="space-around"
          >
            <Col className="border-dotted border-r-2" span={5}>
              <div className="  justify-center  text-center">
                <GoClock
                  className=" ml-[21px]"
                  style={{ justifyContent: "center", alignContent: "center" }}
                  fontSize="larger"
                />
                <span>Remind</span>
              </div>
            </Col>
            <Col span={5} className=" border-dotted border-r-2">
              <BsCalendarCheckFill
                className=" ml-[21px]  justify-center text-center"
                fontSize="larger"
              />
              <span>Check-in</span>
            </Col>
            <Col span={4} className="border-dotted border-r-2">
              <MdOutlineEdit className=" ml-[20px]" fontSize="larger" />
              <span>Edit</span>
            </Col>
            <Col span={5} className="border-dotted border-r-2">
              <BiBook className=" ml-[20px]" fontSize="larger" />
              <span>Rebook</span>
            </Col>
            <Col span={5} className="border-dotted border-r-2">
              <MdDelete className=" ml-[20px]" fontSize="larger" />
              <span>Cancel</span>
            </Col>
          </Row>
        </div>
        <div className="h-[200px] w-full overflow-auto">
          <div className=" border-y-2 mt-2 mb-6 justify-center text-center  ">
            <Row
              style={{ justifyContent: "center", alignContent: "center" }}
              justify="space-around"
            >
              <Col className="font-semibold " span={8}>
                TECH
              </Col>
              <Col className="font-semibold " span={8}>
                SERVICE
              </Col>
              <Col className="font-semibold " span={4}>
                DUR
              </Col>
              <Col className="font-semibold " span={4}>
                PRICE
              </Col>
            </Row>
          </div>
          <div className="border-dotted border-b-2 justify-center text-center">
            <Row
              style={{ justifyContent: "center", alignContent: "center" }}
              justify="space-around"
            >
              <Col span={8}>{props.children}</Col>
              <Col span={8}>Multiple</Col>
              <Col span={4}>155 min</Col>
              <Col className="text-blue-600" span={4}>
                $34.00
              </Col>
            </Row>
          </div>
          <div className="border-dotted border-b-2 justify-center text-center">
            <Row
              style={{ justifyContent: "center", alignContent: "center" }}
              justify="space-around"
            >
              <Col span={8}>{props.aptStartTime}</Col>
              <Col span={8}>Multiple</Col>
              <Col span={4}>155 min</Col>
              <Col className="text-blue-600" span={4}>
                $34.00
              </Col>
            </Row>
          </div>
          <div className="border-dotted border-b-2 justify-center text-center">
            <Row
              style={{ justifyContent: "center", alignContent: "center" }}
              justify="space-around"
            >
              <Col span={8}>{props.aptEndTime}</Col>
              <Col span={8}>Multiple</Col>
              <Col span={4}>155 min</Col>
              <Col className="text-blue-600" span={4}>
                $34.00
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalClient;
