import { Col, message, Modal, Popover, Row, Switch, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetListCancelReasonForTicket } from "services/Appointments/GetListCancelReasonForTicket";
import { GetTicketDetailForCheckoutPopup } from "services/Appointments/GetTicketDetailForCheckoutPopup";

import { RequestEmployee } from "services/Appointments/RequestEmployee";
import { VoidCancel } from "services/Appointments/VoidCancel";
import { GetTicketPayment } from "services/CheckOut/GetTicketPayment";

import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { messageSuccess } from "src/components/MessageAlert";
import {
  isChangeDataTechSalonCenter$,
  isChangeDataTixSalonCenter$,
} from "src/redux/selector";

import {
  IGetListCancelReasonForTicket,
  IGetTicketPayment,
  ILstDetailTicket,
  ITixAppt,
  ITixDetail,
  RDAptDetail,
} from "../../DataStructures";

import ListTechnicians from "./TabLeftContentSalonCenter";
import {
  handleCheckIsChangeDataTixSalonCenter,
  handleDoneAndActive,
  handleRedirectCreateCharge,
  handleStartAllServices,
} from "../helper";
import { ClientInfo } from "./ClientInfo";
import { currencyFormat } from "src/helper/General";
interface IDataType {
  key: string;
  tech: string;
  rq: boolean;
  empid: number;
  service: string;
  dur: number;
  price: string;
  status: RDAptDetail;
}
interface Props {
  visible: boolean;
  onOk: any;
  onCancel: any;
  iteminfo: ITixAppt;
}
export interface IItemInfoAppt {
  clientId: number;
  apptId: number;
  apptStatusId: number;
  checkNo: number;
}

export const TicketDetail = ({ visible, onOk, onCancel, iteminfo }: Props) => {
  const [dataTicketDetail, setDataTicketDetail] = useState<ITixDetail>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataPayment, setDataPayment] = useState<IGetTicketPayment>();
  const [visibleListTech, setVisibleListTech] = useState<boolean>(false);
  const [dataListVoidCancelMessage, setDataListVoidCancelMessage] = useState<
    IGetListCancelReasonForTicket[]
  >([]);
  const [visibleVoidCancel, setVisibleVoidCancel] = useState<boolean>(false);
  const [isChangeDataClient, setIsChangeDataClient] = useState<boolean>(false);
  const [itemInfoAppt, setItemInfoAppt] = useState<IItemInfoAppt>({
    clientId: iteminfo.customerID,
    apptId: iteminfo.originalAppointmentID,
    apptStatusId: Number(iteminfo.appointmentStatusID),
    checkNo: iteminfo.checkNo,
  });

  const apiGetDetailInfoTixSalonPopup = new GetTicketDetailForCheckoutPopup();
  const apiGetTicketPayment = new GetTicketPayment();
  const dispatch = useDispatch();
  const setVisibleTixDetail = () => {};
  const isChangeDataTix = useSelector(isChangeDataTixSalonCenter$);
  const isChangeDataTech = useSelector(isChangeDataTechSalonCenter$);

  const apiRequestEmployee = new RequestEmployee();
  const StatusItem = (item: ILstDetailTicket) => {
    if (item.isGiftCard == 1) {
      return (
        <img
          src="/assets/imgs/24px-Gift-card.svg"
          className="h-[25px] w-[25px]"
        />
      );
    } else if (item.isProduct == 1 && item.aType == 2) {
      return (
        <img
          src="/assets/imgs/24px-Product.svg"
          alt="product"
          className="h-[25px] w-[25px]"
        />
      );
    } else if (item.isFee == 1) {
      return <img src="/assets/imgs/repay.svg" className="h-[25px] w-[25px]" />;
    } else {
      switch (iteminfo.appointmentStatusID) {
        case "3":
          <button className=" invisable-btn b-t-done-one-sl h-[25px] w-[25px] done-follow-tech"></button>;
          break;
        case "2":
          if (item.trnDesc == "Credit Surcharge") {
            return (
              <img src="/assets/imgs/repay.svg" className="h-[25px] w-[25px]" />
            );
          } else {
            return (
              <button className="invisable-btn b-t-start-one-sl inserviceone h-[25px] w-[25px]"></button>
            );
          }
        case "0":
          if (item.trnDesc == "Credit Surcharge") {
            return (
              <img src="/assets/imgs/repay.svg" className="h-[25px] w-[25px]" />
            );
          } else {
            return (
              <button className="invisable-btn b-t-start-one-sl inserviceone h-[25px] w-[25px]"></button>
            );
          }
        case "8":
          return (
            <img
              className="h-[25px] w-[25px]"
              src="/assets/imgs/book/24-pixel-assets_11.svg"
            />
          );
        default:
          break;
      }
    }
  };
  const status = (item: ILstDetailTicket) => {
    const statusID = iteminfo.appointmentStatusID;
    switch (statusID) {
      case "3":
        if (
          item.employeeID == 0 &&
          item.statusEmployee == "Release" &&
          item.itemCode != null
        ) {
          return (
            <div className="h-5 w-5 border-[1.5px] border-solid border-[#f28500] rounded-[50%] color-[#f28500]  ">
              W
            </div>
          );
        } else {
          return StatusItem(item);
        }
      case "2":
        return StatusItem(item);
      case "0":
        return StatusItem(item);
      case "8":
        return StatusItem(item);
      case "7":
        return StatusItem(item);
      default:
        return;
    }
  };
  const columns: ColumnsType<IDataType> = [
    {
      title: "TECH",
      dataIndex: "tech",
      key: "tech",
      align: "center",

      render: (text) => <h2 className="font-bold">{text}</h2>,
    },

    {
      title: "RQ",
      dataIndex: "rq",
      key: "rq",
      align: "center",
      render: (rq, empId) => (
        <>
          <Switch
            defaultChecked={rq}
            onChange={(checked) => {
              const body = {
                appointmentId: iteminfo.originalAppointmentID,
                employeeId: empId.empid,
                isRequest: checked,
                rvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
              };
              apiRequestEmployee.requestEmployee(body).then((res) => {
                if (res.status == 200) {
                }
              });
            }}
          />
        </>
      ),
    },
    {
      title: "SERVICE",
      key: "service",
      dataIndex: "service",
      align: "center",

      render: (text) => <span>{text}</span>,
    },
    {
      title: "DUR",
      key: "dur",
      dataIndex: "dur",
      align: "center",
      render: (text) => <span className="text-right">{text}</span>,
    },
    {
      title: "PRICE",
      key: "price",
      dataIndex: "price",
      align: "center",
      render: (text) => (
        <span>
          $
          {typeof Number(text) === "number"
            ? currencyFormat(Number(text))
            : Number(text)}
        </span>
      ),
    },
    {
      title: "STATUS",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        return status(text);
      },
    },
  ];

  const data: IDataType[] = [];

  dataTicketDetail?.rdAptDetail.map((item: RDAptDetail, index) => {
    item.itemCode &&
      data.push({
        key: index.toString(),
        tech: item.employeeID > 9999 ? item.employeeName : "NO REQUEST",
        empid: item.employeeID,
        rq: item.isRequestTech,
        service: item.trnDesc || "",
        dur: item.duration,
        price: item.itemPrice.toString(),
        status: item,
      });
  });
  const apiGetListCancelReasonForTicket = new GetListCancelReasonForTicket();
  const handleVisibleVoidCancel = (newVisible: boolean) => {
    if (newVisible) {
      apiGetListCancelReasonForTicket
        .getListCancelReasonForTicket(
          iteminfo.checkNo,
          iteminfo.originalAppointmentID,
          iteminfo.appointmentStatusID
        )
        .then((res) => {
          if (res.status == 200) {
            setDataListVoidCancelMessage(res.data);
          }
        });
    }

    setVisibleVoidCancel(newVisible);
  };

  const apiVoidCancel = new VoidCancel();
  const handleVoidCancelappt = (item) => {
    let isCancel =
      iteminfo.appointmentStatusID == "3" || iteminfo.appointmentStatusID == "8"
        ? false
        : true;
    const param = {
      isCancel: isCancel,
      reasons:
        iteminfo.appointmentStatusID == "3" ||
        iteminfo.appointmentStatusID == "8"
          ? item.voidReasons
          : item.reasons,
      appointmentId: iteminfo.originalAppointmentID,
      checkNo: iteminfo.checkNo,
      partyId: iteminfo.idParty,
      turnControl: "TLT",
    };
    apiVoidCancel.voidCancel(param).then((res) => {
      if (res.status == 200) {
        onCancel(false);
        // setIsChangeData(!isChangeData);
        handleCheckIsChangeDataTixSalonCenter(dispatch);
        const content =
          iteminfo.appointmentStatusID == "3" ||
          iteminfo.appointmentStatusID == "8"
            ? "Voided"
            : "Cancel";
        messageSuccess(content);
      }
    });
  };

  const handleDoneorStart = () => {
    if (iteminfo.appointmentStatusID == "3") {
      handleDoneAndActive(iteminfo, dispatch);
    }
    if (
      iteminfo.appointmentStatusID != "3" &&
      iteminfo.appointmentStatusID != "8"
    ) {
      handleStartAllServices(iteminfo, setVisibleTixDetail, dispatch);
    }
  };

  const router = useRouter();

  const handlePayTicket = (e) => {
    if (dataPayment && dataPayment.items > 0) {
      handleRedirectCreateCharge(iteminfo, e, dispatch, router);
    }
  };
  useEffect(() => {
    setIsLoading(true);

    const bodyDetail = {
      AppointmentID: itemInfoAppt.apptId,
      History: 0,
      AppStatus: itemInfoAppt.apptStatusId,
      Checkno: itemInfoAppt.checkNo,
      CusID: itemInfoAppt.clientId,
      EmpID: iteminfo.employeeID,
      EmpName: iteminfo.employeeName || "NEXT AVAILABLE",
    };

    apiGetDetailInfoTixSalonPopup
      .getTicketDetailForCheckoutPopup(bodyDetail)
      .then((res) => {
        if (res.status == 200) {
          setDataTicketDetail(res.data);
          setIsLoading(false);
        }
      })
      .catch((e) => setIsLoading(false));

    apiGetTicketPayment
      .getTicketPayment(itemInfoAppt.apptId)
      .then((res) => {
        if (res.status == 200) {
          setDataPayment(res.data[0]);
          setIsLoading(false);
        }
      })
      .catch((e) => setIsLoading(false));
  }, [isChangeDataClient]);

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        onCancel(), handleCheckIsChangeDataTixSalonCenter(dispatch);
      }}
      onOk={onOk}
      width={visibleListTech ? "1190px" : "930px"}
      className="select-none"
      centered
      maskClosable={false}
      footer={null}
    >
      <div className="flex">
        {/* Left content */}
        <ClientInfo
          iteminfo={iteminfo}
          itemInfoAppt={itemInfoAppt}
          setItemInfoAppt={setItemInfoAppt}
          setIsChangeDataClient={setIsChangeDataClient}
          isChangeDataClient={isChangeDataClient}
        />
        {/* Right content */}
        <div className={"w-[630px] pl-6  pr-6"}>
          <Row>
            <Col span={14}>
              <Row justify="space-between">
                <Col span={8}>
                  <h2>Ticket</h2>
                </Col>
                <Col span={16}>
                  <span className="text-mango-orange text-left font-bold">
                    #{itemInfoAppt.apptId}
                  </span>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={8}>
                  <h2 className="my-auto">Opened By</h2>
                </Col>
                <Col
                  span={10}
                  className="border rounded-md border-gray-500 text-center mt-auto cursor-pointer hover:bg-cyan-100 hover:border-mango-sky-crayola my-auto"
                  onClick={() => setVisibleListTech(true)}
                >
                  <span className="text-[14px] font-bold uppercase">
                    {dataTicketDetail?.rdAptDetail[0].employeeID
                      ? dataTicketDetail?.rdAptDetail[0].employeeName
                      : "NEXT AVAILABLE"}
                  </span>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={8}>
                  <h2>Date</h2>
                </Col>
                <Col span={16}>
                  <span className="font-bold">
                    {moment(iteminfo.serviceDate).format("MM/DD/YYYY")}
                  </span>
                  <span className="ml-2 text-mango-sky-crayola">
                    APPT: {moment(iteminfo.startTime).format("hh:mm A")}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <Row
                justify="space-around"
                className="text-center "
                style={{ font: "normal normal 500 var(--s-13)" }}
              >
                <Col
                  className="hover:text-yellow-300 cursor-pointer"
                  onClick={handleDoneorStart}
                >
                  {itemInfoAppt.apptStatusId == 3 && (
                    <>
                      <img
                        src="/assets/imgs/done.svg"
                        alt="error"
                        className="mx-auto"
                      />
                      <p>Done All</p>
                    </>
                  )}
                  {itemInfoAppt.apptStatusId != 3 &&
                    itemInfoAppt.apptStatusId != 8 && (
                      <>
                        <img
                          src="/assets/imgs/start-one.svg"
                          alt="error"
                          className="mx-auto"
                        />
                        <p>Start All</p>
                      </>
                    )}
                </Col>
                <Col
                  className="hover:text-yellow-300 cursor-pointer"
                  onClick={(e) => {
                    const param = {
                      originalAppointmentID: itemInfoAppt.apptId,
                      checkNo: itemInfoAppt.checkNo,
                      customerID: itemInfoAppt.clientId,
                      appointmentStatusName: null,
                    };
                    handleRedirectCreateCharge(param, e, dispatch, router);
                  }}
                >
                  <img
                    src="/assets/imgs/020_Pencil13-13.svg"
                    alt="error"
                    className="mx-auto  h-[34px]"
                  />
                  <p>Edit</p>
                </Col>
                <Popover
                  trigger="click"
                  visible={visibleVoidCancel}
                  onVisibleChange={handleVisibleVoidCancel}
                  placement="right"
                  content={
                    <>
                      <h1 className="bg-mango-primary-blue !m-0 !p-0 text-center !text-white text-lg ">
                        VOID REASONS ?
                      </h1>
                      {dataListVoidCancelMessage &&
                        dataListVoidCancelMessage.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                "flex justify-between items-center w-full !border-b !border-dashed  h-[45px] !py-2 !my-0  px-3  bg-mango-primary-blue "
                              }
                              onClick={() => handleVoidCancelappt(item)}
                            >
                              <div
                                className={
                                  "hover:text-mango-sky-crayola cursor-pointer font-bold customCheckBox hover:!opacity-50 flex "
                                }
                                style={{
                                  font: "normal normal 500 var(--s-14)",
                                }}
                              >
                                <div className="rounded-[50%] border border-white w-[24px] h-[24px] flex justify-center items-center">
                                  <div className="bg-white w-[12px] h-[12px] rounded-[50%]"></div>
                                </div>
                                <span className="text-white font-bold text-base ml-2 ">
                                  {iteminfo.appointmentStatusID == "3" ||
                                  iteminfo.appointmentStatusID == "8"
                                    ? item.voidReasons
                                    : item.reasons}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  }
                >
                  <Col className="hover:text-yellow-300 cursor-pointer">
                    <img
                      src="/assets/imgs/trash.svg"
                      alt="error"
                      className="mx-auto h-[34px]"
                    />
                    <p>Delete</p>
                  </Col>
                </Popover>

                <Col className="hover:text-yellow-300 cursor-pointer">
                  <img
                    src="/assets/imgs/Print.png"
                    alt="error"
                    className="mx-auto h-[34px]"
                  />
                  <p>Print</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="space-between">
            <h2 className="text-mango-violet">O Check-In (X)</h2>
            <span className="font-bold flex">
              {moment(iteminfo.checkinTime).format("hh:mm A")}
              <img
                src="/assets/imgs/stopwatch.svg"
                alt="error"
                className="h-2 w-2 flex items-center ml-1 mt-2"
              />
            </span>

            <h2>O Start Time</h2>
            <span className="font-bold flex">
              {moment(iteminfo.checkinTime).format("hh:mm A")}
              <img
                src="/assets/imgs/stopwatch.svg"
                alt="error"
                className="h-2 w-2 flex items-center ml-1 mt-2 "
              />
            </span>
          </Row>
          <Table
            size="small"
            columns={columns}
            dataSource={data}
            pagination={false}
            className="h-[400px] overflow-auto cursor-pointer"
            loading={isLoading}
          ></Table>
          {/* Bill  */}
          <Row className="border-t border-t-black text-lg font-semibold">
            <Col span={12}>
              <Row justify="space-between" className="border-b">
                <Col>Promo</Col>
                <Col className="text-mango-orange">
                  ${Number(dataPayment?.promo).toFixed(2)}
                </Col>
              </Row>
              <Row justify="space-between" className="border-b">
                <Col>Tax(S: 0% + P: 0%)</Col>
                <Col className="text-mango-orange">
                  ${Number(dataPayment?.taxTotal).toFixed(2)}
                </Col>
              </Row>
              <Row justify="space-between">
                <Col>Tip</Col>
                <Col className="text-mango-orange">
                  ${Number(dataPayment?.tip).toFixed(2)}
                </Col>
              </Row>
            </Col>
            <Col span={12} className="pl-6 ">
              <Row justify="space-between" className="border-b">
                <Col className="text-mango-sky-crayola">
                  {dataPayment?.items} Item
                </Col>
                <Col className="text-mango-sky-crayola">
                  ${Number(dataPayment?.subTotalAmount).toFixed(2)}
                </Col>
              </Row>
              <Row justify="space-between" className="border-b">
                <Col>
                  Paid:
                  <span className="text-mango-sky-crayola">
                    {dataPayment?.paymentDesc &&
                      "(" + Number(dataPayment?.paymentDesc).toFixed(2) + ")"}
                  </span>
                </Col>
                <Col className="text-mango-orange">
                  ${Number(dataPayment?.paid).toFixed(2)}
                </Col>
              </Row>
              <Row justify="space-between">
                <Col>Balance</Col>
                <Col className="text-mango-orange">
                  ${Number(dataPayment?.balance).toFixed(2)}
                </Col>
              </Row>
            </Col>
          </Row>
          {/* Button  */}

          {dataPayment?.balance == 0 && dataPayment.items > 0 ? (
            <div className="bg-mango-sky-crayola text-center rounded-md  h-12 ml-auto w-[200px] flex  cursor-pointer hover:opacity-70 mt-2">
              <span className="mt-auto text-2xl text-white m-auto">
                CLOSE BILL
              </span>
            </div>
          ) : (
            <div
              className={
                (dataPayment && dataPayment.items > 0
                  ? "bg-mango-primary-green hover:opacity-70 "
                  : "bg-mango-border-medium cursor-not-allowed ") +
                " text-center rounded-md  h-12 ml-auto w-[200px] flex  cursor-pointer  mt-2"
              }
              onClick={(e) => handlePayTicket(e)}
            >
              <span className="mt-auto text-2xl text-white m-auto">PAY</span>
            </div>
          )}
        </div>
        {visibleListTech && (
          <div className="pl-6 border-l  border-mango-border-medium w-[260px]">
            <div className=" bg-mango-bg-dark  w-full pt-6">
              <div className="flex justify-between">
                <h2
                  className="ml-6 "
                  style={{ font: "normal normal 600 16px/20px Montserrat" }}
                >
                  Technicians
                </h2>
                <img
                  src="/assets/imgs/left-arrow.png"
                  alt="error"
                  className="h-8 w-8 bg-white rounded-[50%] text-[16px] flex items-center justify-center p-1 mango-shadow cursor-pointer hover:bg-mango-bg-dark"
                  onClick={() => setVisibleListTech(false)}
                />
              </div>
              <div>
                <ListTechnicians
                  iteminfo={iteminfo}
                  setIsChangeDataClient={setIsChangeDataClient}
                  isChangeDataClient={isChangeDataClient}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
