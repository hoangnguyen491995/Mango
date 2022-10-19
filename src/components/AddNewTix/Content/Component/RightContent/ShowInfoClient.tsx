import {
  EyeFilled,
  EyeInvisibleFilled,
  PhoneFilled,
  PhoneOutlined,
} from "@ant-design/icons";
import { Col, Empty, Form, Rate, Row, Space } from "antd";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { SendConfirmSMS } from "services/Appointments/SendConfirmSMS";
import { APIClientInfo } from "services/ClientInfo/ClientInfo";
import { APINoShowTixClient } from "services/NoShowTixClient/NoShowTixClient";
import { messageSuccess } from "src/components/MessageAlert";
import { IInfoClientforMakeAppt } from "../../DataStructures";
import { ShowContent, type } from "../../helper";

import TixContext from "../../TixContext";

const classnameInput =
  "border-b border-dashed w-full h-[20px] focus:border-cyan-500 focus:outline-none focus:border-solid text-[14px] my-[0px] ";
export const ShowInfoClient = ({ isAddNew }) => {
  //data context
  const tixCT = useContext(TixContext)[0];
  const apiSendConfirmSMS = new SendConfirmSMS();
  const [statusShowEyes, setStatusShowEyes] = useState<boolean>(false);
  const [dataClientInfo, setDataClientInfo] =
    useState<IInfoClientforMakeAppt>();
  const [totalAppt, setTotalAppt] = useState<number>(0);
  const [totalNoShow, setTotalNoShow] = useState<number>(0);
  const data = new APIClientInfo();
  const dataNoShow = new APINoShowTixClient();
  useEffect(() => {
    data.ClientInfo(tixCT.dataItemTix[tixCT.idAppt].customerID).then((res) => {
      const dataFilter = res.data;
      if (res.status === 200) {
        setDataClientInfo(dataFilter);
        const ApptBooking = dataFilter.clientInfomations.length;
        setTotalAppt(ApptBooking);
      }
    });
    dataNoShow.NoShowTixClient(tixCT.idClientTix).then((res) => {
      if (res.status === 200) {
        setTotalNoShow(res.data);
      }
    });
  }, [tixCT.idClientTix]);
  const handleRemoveClient = () => {
    //Set sự kiện remove client
    tixCT.setShowContent(ShowContent(type.ShowSearchServiceItem));

    tixCT.dataItemTix[tixCT.idAppt].customerID = 0;
    tixCT.setIdClientTix(0);
  };
  const handleClickMoreInfo = (customerID) => {
    Router.push(`/Customer/${customerID}`);
  };
  const handleSendConfirmSMS = () => {
    const param = {
      id: dataClientInfo?.customer.customerID,
      appointmentId: tixCT.dataItemTix[tixCT.idAppt].appointmentID,
      type: "AppointmentReminder",
      isBody: 0,
      typeGroup: "addguest",
      rvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
      idKeyOB: "",
    };
    apiSendConfirmSMS.sendConfirmSMS(param).then((res) => {
      if (res.status == 200) {
        messageSuccess("Sending SMS And Email Successfull");
      }
    });
  };

  return (
    <>
      {dataClientInfo ? (
        <div className=" font-bold  overflow-auto h-[700px] p-5 ">
          <div className="border-b-2">
            <Row justify="end" className="">
              <Col>
                <button
                  className="h-[30px] w-[140px] font-700 text-orange-400 hover:bg-orange-100 p-1 rounded hover:shadow-md text-[14px] leading-[15px] "
                  onClick={handleRemoveClient}
                >
                  REMOVE CLIENT
                </button>
              </Col>
            </Row>
            <Row className="!pb-0 h-[90px]">
              <Col className="p-4 !pl-0 ">
                <div className="border-full rounded-full h-[55px] w-[55px] max-h-[55px] max-w-[55px] border bg-mango-bg-dark flex cursor-pointer">
                  <span className="w-full text-center text-xl mt-auto mb-auto">
                    NA
                  </span>
                </div>
              </Col>
              <Col md={17}>
                <div>
                  <span className="text-[14px] font-semibold leading-[15px]">
                    {dataClientInfo.customer.customerName}
                  </span>
                </div>
                <div className="flex">
                  <img
                    src="/assets/imgs/phone-alt.svg"
                    alt="error"
                    className="h-4"
                    onClick={() => setStatusShowEyes(!statusShowEyes)}
                  />

                  {statusShowEyes ? (
                    <>
                      <span>
                        {dataClientInfo.customer.contactPhone &&
                          "(" +
                            dataClientInfo.customer.contactPhone.slice(0, 3) +
                            ") " +
                            dataClientInfo.customer.contactPhone.slice(3, 6) +
                            "-" +
                            dataClientInfo.customer.contactPhone.slice(-4)}
                      </span>
                      <img
                        src="/assets/imgs/34_ShowPass.svg"
                        alt="error"
                        className="h-[14px]"
                        onClick={() => setStatusShowEyes(!statusShowEyes)}
                      />
                    </>
                  ) : (
                    <>
                      <span>
                        {dataClientInfo.customer.contactPhone &&
                          "(XXX) XXX-" +
                            dataClientInfo.customer.contactPhone.slice(-4)}
                      </span>

                      <img
                        src="/assets/imgs/37_HidePass.svg"
                        alt="error"
                        className="h-5"
                        onClick={() => setStatusShowEyes(!statusShowEyes)}
                      />
                    </>
                  )}
                </div>
                <div>
                  <span className="text-[#F44C7F] select-none font-medium text-[14px] leading-[15px]">
                    Rewards Point
                  </span>
                </div>
                <Rate
                  style={{
                    height: "15px",
                    fontSize: "16px",
                    margin: "0px",
                    padding: "0px",
                  }}
                  className="!h-[14px] text-[14px] !m-0 !p-0"
                  value={dataClientInfo.customer.rating}
                />
              </Col>
              <Col md={3} className="mt-[29px] ">
                <button className="h-[30px] text-cyan-500   font-700 text-xl hover:bg-cyan-100 w-24 py-2 p-1 rounded decoration-solid select-none text-[14px] font-bold leading-[15px]  ">
                  <span className="border-b-2  border-cyan-500  ">SAVE</span>
                </button>
              </Col>
            </Row>
          </div>
          <div className="">
            <Form>
              <Form.Item label="First Name: " className="!my-3">
                <input
                  className={classnameInput}
                  onChange={() => {}}
                  value={dataClientInfo.customer.firstName || ""}
                />
              </Form.Item>
              <Form.Item label="Last Name: " className="!my-3">
                <input
                  className={classnameInput}
                  onChange={() => {}}
                  value={dataClientInfo.customer.lastName || ""}
                />
              </Form.Item>
              <Form.Item label="Total YTD: " className="!my-3">
                <input
                  readOnly
                  className={classnameInput}
                  value={dataClientInfo.customer.totalSpentByYear || 0}
                />
              </Form.Item>
              <Form.Item label="Reward Points: " className="!my-3">
                <input
                  readOnly
                  className={classnameInput}
                  value={dataClientInfo.customer.rewardsPoint || 0}
                />
              </Form.Item>
              <Form.Item label="Favorite Polish: " className="!my-3">
                <input
                  readOnly
                  className={classnameInput}
                  value={dataClientInfo.customer.favouritePolish || ""}
                />
              </Form.Item>
              <Form.Item label="Favorite Techs: " className="!my-3">
                <input
                  readOnly
                  className={classnameInput}
                  value={dataClientInfo.customer.favouriteTech || ""}
                />
              </Form.Item>
              <Form.Item label="Email: " className=" !p-0">
                <input
                  className={classnameInput}
                  onChange={() => {}}
                  value={dataClientInfo.customer.email || ""}
                />
              </Form.Item>
            </Form>
            <div className="flex w-full">
              <div className="flex justify-between w-full mr-[6px]">
                <span>Total Appt:</span>
                <span>{totalAppt}</span>
              </div>

              <div className="flex justify-between w-full ml-[6px]">
                <span>No Show:</span>
                <span>{totalNoShow}</span>
              </div>
            </div>
            <div className="w-full flex ">
              {!isAddNew && (
                <button
                  className="w-full mr-[6px] mt-4 p-2 border border-black rounded mango-shadow h-10 text-[16px] hover:!border-mango-primary-blue hover:!text-mango-primary-blue"
                  onClick={
                    handleSendConfirmSMS
                    // handleClickMoreInfo(dataClientInfo.customer.customerID)
                  }
                >
                  REMINDER
                </button>
              )}

              <button
                className="w-full ml-[6px] mt-4 p-2 border border-black rounded mango-shadow h-10 text-[16px] hover:!border-mango-primary-blue hover:!text-mango-primary-blue"
                onClick={() =>
                  handleClickMoreInfo(dataClientInfo.customer.customerID)
                }
              >
                MORE INFO
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};
