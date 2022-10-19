import { Button, Col, Drawer, Row } from "antd";
import React, { useEffect, useState } from "react";
import { GetInfoTodayBooking } from "services/TodayBookingList/TodayBookingList";
import Content from "src/components/AddNewTix/Content";
import { API_MANGO_IMG } from "src/utils/constant";
import ModalClient from "./ModalTodayBooking";
interface IInforTodayBooking {
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
const TodayBooking: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [showAddNew, setShowAddNew] = useState<boolean>(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const getInfoTodayBooking = new GetInfoTodayBooking();
  const [dataInforTodayBooking, setDataInforTodayBooking] = useState<
    Array<IInforTodayBooking>
  >([]);
  const day = new Date();
  const getDay = day.getDate();
  const getMonth = day.getMonth();
  const getYear = day.getFullYear();
  const dateStart = getMonth + 1 + "-" + getDay + "-" + getYear;
  // console.log(dateStart);

  useEffect(() => {
    getInfoTodayBooking
      .getInfoTodayBooking(dateStart)
      .then((res) => setDataInforTodayBooking(res.data));
  }, []);

  return (
    <>
      <Button
        style={{
          background: "rgb(244 63 94)",
          width: "55px",
          height: "45px",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
          border: "none",
        }}
        onClick={showDrawer}
      >
        <img className="ml-[2px] " src="/assets/imgs/clock.svg" alt="Icon  " />
      </Button>
      <Drawer
        width={"330px"}
        title=""
        placement="right"
        onClose={onClose}
        visible={visible}
        className="drawer-today-bookings"
      >
        <Row className=" flex items-center justify-between">
          <Col span={16}>
            <h2 className=" text-[#505050] text-[1.4rem] font-semibold ">
              Today bookings
            </h2>
          </Col>
          <Col span={8}>
            <div
              className="flex items-center justify-center w-[80px] cursor-pointer"
              style={{
                border: "1px solid black",
                borderRadius: "4px",
                marginTop: "-8px",
              }}
              onClick={() => setShowAddNew(true)}
            >
              <span className="text-[11px] font-[600]">ADD NEW + </span>
            </div>
            <Content
              visible={showAddNew}
              onOk={() => setShowAddNew(false)}
              onCancel={() => setShowAddNew(false)}
              isAddNew
              dataAddNew={{
                customerId: 0,
                customerName: "NON INFO",
                timeAdd: "",
                techName: "NEXT AVAILABLE",
                techId: 9999,
                appointmentId: 0,
                groupId: 0,
              }}
            />
          </Col>
        </Row>
        {dataInforTodayBooking &&
          dataInforTodayBooking.map(
            (post: IInforTodayBooking, index: number) => {
              // console.log("post", post);
              return (
                <div
                  key={index}
                  className="mt-3"
                  onClick={() => {
                    setIsShowModal(true);
                  }}
                >
                  <ModalClient
                    aptEndTime={post.aptEndTime}
                    aptStartTime={post.aptStartTime}
                    borderStyle={post.borderStyle}
                    employeeName={post.employeeName}
                    itemName={post.itemName}
                    firstName={post.firstName}
                    statusName={post.statusName}
                    isVIP={post.isVIP}
                    isMember={post.isMember}
                  />
                </div>
              );
            }
          )}
      </Drawer>
    </>
  );
};
export default TodayBooking;
