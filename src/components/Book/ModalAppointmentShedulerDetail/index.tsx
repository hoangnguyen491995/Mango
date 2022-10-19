import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Col, Row, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { RiPhoneFill } from "react-icons/ri";
import { GetInfoShedulerDetail } from "services/GetAppointmentShedulerDetail/GetAppointmentShedulerDetail";
import theme from "../../../../tailwind.config";
import HomeContext from "src/components/Book/HomeContext";
import MoreInfoAppointment from "./MoreInfoAppointment";
import { PostInfoCheckIn } from "services/GetAppointmentShedulerDetail/CheckInAppointmentShedulerDetail";
import Content from "src/components/AddNewTix/Content";
import { group } from "console";
import ModelCancel from "./ModelCancel";
import ModalRebook from "./Rebook/ModalRebook";
import { SendConfirmSMS } from "services/Appointments/SendConfirmSMS";
import { messageSuccess } from "src/components/MessageAlert";
import { SelectTechServiceModal } from "src/components/SalonCenter/SelectTechServiceAppt/SelectTechServiceModal";
import EyeShowPhone from "src/components/BookingListView/EyeShowPhone";
import { IItemDataTix } from "src/components/SalonCenter/SelectTechServiceAppt";
import { useDispatch, useSelector } from "react-redux";
import { ComingUpAppointment } from "services/Appointments/ComingUpAppointment";
import { CheckIn } from "services/Appointments/CheckIn";

import {
  handleDeclineOnlineBooking,
  handleComfirmOnlineBooking,
  handleDoneAService,
} from "src/helper/General";

import {
  handleRedirectCreateCharge,
  ITixDataItem,
  handleDoneAndActive,
  handleRedirectCreateChargeCheckOut,
  handleStartAllServices,
} from "src/components/SalonCenter/RightContent/helper";
import {
  isChangeDataTechSalonCenter$,
  isChangeDataTixSalonCenter$,
} from "src/redux/selector";

import {
  AppointmentServiceDetail,
  IInforShedulerDetail,
} from "../IterfaceStructures";
import moment from "moment";
import Item from "antd/lib/list/Item";
import {
  addCount,
  turnOnIsCopy,
  closeModel,
} from "src/components/Book/book-slice";
import { useAppSelector } from "src/redux/hook";

interface InforShedulerDetail {
  appointmentId: number;
}
const ModalAppointmentShedulerDetail = ({
  appointmentId,
}: InforShedulerDetail) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const checkIn = new CheckIn();
  // const [checkIn, setCheckIn] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const [showPhone, setShowPhone] = useState<boolean>(false);
  const bookContext = useContext(HomeContext)[0];
  const [visibleEditAppt, setVisibleEditAppt] = useState<boolean>(false);
  const [visibleRebook, setVisibleRebook] = useState<boolean>(false);
  const [visibleStartOne, setVisibleStartOne] = useState<boolean>(false);
  const [isComfirm, setIsComfirm] = useState<boolean>(false);
  const getInfoShedulerDetail = new GetInfoShedulerDetail();
  const sendConfirmSMS = new SendConfirmSMS();
  const comingUpAppointment = new ComingUpAppointment();
  const [apptClick, setApptClick] = useState<any>();
  const [groupIdClick, setGroupIdClick] = useState<any>();
  const [itemData, setItemData] = useState<IItemDataTix>();
  const isChangeDataTix = useSelector(isChangeDataTixSalonCenter$);
  const isChangeDataTech = useSelector(isChangeDataTechSalonCenter$);
  const [visible, setVisible] = useState<boolean>(false);
  const [reFetchData, setReFetchData] = useState<boolean>(false);
  const [isReload, setIsReload] = useState<boolean>(false);
  const viewTypeCalendar = useAppSelector(
    (state) => state.book.viewTypeCalendar
  );
  const handleCancel = () => {
    setVisible(false);
  };

  const [dataInforShedulerDetail, setDataInforShedulerDetail] =
    useState<IInforShedulerDetail>();

  const handleOkEditAppt = () => {
    setVisibleEditAppt(true);
  };
  const handleCancelEditAppt = () => {
    setVisibleEditAppt(false);
  };

  const handleOkRebook = () => {
    setVisibleRebook(true);
  };
  const handleCancelRebook = () => {
    setVisibleRebook(false);
  };

  const handleOkStartOne = () => {
    setVisibleStartOne(true);
  };
  const handleCancelStartOne = () => {
    setVisibleStartOne(false);
  };

  useEffect(() => {
    getInfoShedulerDetail.getInfoShedulerDetail(appointmentId).then((res) => {
      if (res.status == 200) {
        setDataInforShedulerDetail(res.data);
        setReFetchData(false);
        setIsReload(false);
      }
    });
  }, [appointmentId, isComfirm, reFetchData, isReload]);

  const handleOnclickStartOne = (item: AppointmentServiceDetail) => {
    let itemDataTix = {
      originalAppointmentID: item.originalAppointmentID,
      checkNo: item.checkNo,
      appointmentStatusID: item.appointmentStatusID.toString(),
    };
    setItemData(itemDataTix);
    setVisibleStartOne(true);
  };

  const statusTicket = (item) => {
    let status =
      item.appointmentStatusID == 2
        ? "Waiting"
        : item.appointmentStatusID == 3
        ? "In Servicing"
        : item.appointmentStatusID == 8
        ? "Done"
        : item.appointmentStatusID == 7
        ? "Closed"
        : item.appointmentStatusID == 9
        ? "Cancel"
        : item.appointmentStatusID == 4
        ? "No Show"
        : !(item.isConfirmOB ?? false) &&
          item.appointmentStatusID == 1 &&
          (item.isBookOnline ?? false) &&
          item.startTime != null &&
          new Date(item.startTime) < new Date()
        ? "Expired"
        : "";
    return status;
  };

  const handleClickLikeConfirm = (isProduct, appId) => {
    try {
      // const comeUp = isProduct == true ? 0 : 1;
      isProduct == true && setIsComfirm(!isComfirm);
      comingUpAppointment.comingUpAppointment(appId).then((res) => {
        if (res.status === 200) {
          isProduct == true && isComfirm != true
            ? setIsComfirm(false)
            : setIsComfirm(!isComfirm);

          setIsReload(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const showAptDetails = (item: AppointmentServiceDetail, actIns) => {
    let statusId = item.appointmentStatusID ?? 0;
    // _InfoApoiment
    if (statusId == 3 || actIns == 0) {
      if (
        item.employeeID == 0 &&
        item.statusEmployee == "Released" &&
        item.itemID != null
      ) {
        return <span className="release-tech-pop">W</span>;
      } else {
        if (item.isGiftCard == 1) {
          return (
            <img
              src="/assets/imgs/24px-Gift-card.svg"
              className="img-playserice-popup-salon w-6 h-6"
            />
          );
        } else if (item.isProduct == 1) {
          return (
            <img
              src="/assets/imgs/24px-Product.svg"
              className="img-playserice-popup-salon w-6 h-6"
            />
          );
        } else if (item.isFee == 1) {
          return (
            <img
              src="/assets/imgs/repay.svg"
              className="img-playserice-popup-salon w-6 h-6"
            />
          );
        } else if (statusId != 9) {
          return (
            <div
              data-id={`${item.appointmentDetailID}`}
              data-eid={`${item.employeeID}`}
              className="cursor-pointer invisable-btn b-t-done-one-sl img-playserice-popup-salon done-follow-tech popup-Book w-6 h-6"
              onClick={() =>
                handleDoneAService(
                  item.appointmentDetailID,
                  item.rvcNo,
                  item.employeeID,
                  setReFetchData
                )
              }
            >
              <img className="b-t-done-sl " src="/assets/imgs/done.svg" />
            </div>
          );
        }
      }
    } else if (statusId == 2) {
      if (item.isGiftCard == 1) {
        return (
          <img
            src="/assets/imgs/24px-Gift-card.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else if (item.isProduct == 1) {
        return (
          <img
            src="/assets/imgs/24px-Product.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else if (item.isFee == 1) {
        return (
          <img
            src="/assets/imgs/repay.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else {
        if (item.itemName == "Credit Surcharge") {
          return (
            <img
              src="/assets/imgs/repay.svg"
              className="img-playserice-popup-salon w-6 h-6"
            />
          );
        } else {
          return (
            <div
              data-id={`${item.appointmentDetailID}`}
              data-ori={`${item.appointmentID}`}
              data-eid={`${item.employeeID}`}
              data-emp={`${item.employeeID}`}
              className="invisable-btn b-t-start-one-sl inserviceone img-playserice-popup-salon cursor-pointer"
              onClick={() => handleOnclickStartOne(item)}
            >
              <img
                className="b-t-start-sl w-6 h-6 "
                src="/assets/imgs/start-one.svg"
              />
            </div>
          );
        }
      }
    } else if (statusId == 0) {
      if (item.isGiftCard == 1) {
        return (
          <img
            src="/assets/imgs/24px-Gift-card.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else if (item.isProduct == 1) {
        return (
          <img
            src="/assets/imgs/24px-Product.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else if (item.isFee == 1) {
        return (
          <img
            src="/assets/imgs/repay.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else {
        if (item.itemName == "Credit Surcharge") {
          return (
            <img
              src="/assets/imgs/repay.svg"
              className="img-playserice-popup-salon w-6 h-6"
            />
          );
        } else {
          return (
            <div
              data-id={`${item.appointmentDetailID}`}
              data-ori={`${item.appointmentID}`}
              data-eid={`${item.employeeID}`}
              data-emp={`${item.employeeID}`}
              className="invisable-btn b-t-start-one-sl inserviceone img-playserice-popup-salon cursor-pointer"
              onClick={() => handleOnclickStartOne(item)}
            >
              <img
                className="b-t-start-sl w-6 h-6 "
                src="/assets/imgs/start-one.svg"
              />
            </div>
          );
        }
      }
    } else if (statusId == 8) {
      if (item.isGiftCard == 1) {
        return (
          <img
            src="/assets/imgs/24px-Gift-card.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else if (item.isProduct == 1) {
        return (
          <img
            src="/assets/imgs/24px-Product.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else if (item.isFee == 1) {
        return (
          <img
            src="/assets/imgs/repay.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else {
        return (
          <img
            className="img-playserice-popup-salon w-6 h-6"
            src="/assets/imgs/book/24-pixel-assets_11.svg"
          />
        );
      }
    } else if (statusId == 7) {
      if (item.isGiftCard == 1) {
        return (
          <img
            src="/assets/imgs/24px-Gift-card.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else if (item.isProduct == 1) {
        return (
          <img
            src="/assets/imgs/24px-Product.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      } else if (item.isFee == 1) {
        return (
          <img
            src="/assets/imgs/repay.svg"
            className="img-playserice-popup-salon w-6 h-6"
          />
        );
      }
    }
  };

  const handleClickRemind = (item) => {
    let paramConFirmSMS = {
      id: 0,
      appointmentId: item.appointmentID,
      type: process.env.NEXT_PUBLIC_APPOINTMENT_REMINDER,
      isBody: 0,
      typeGroup: "addguest",
      rvcNo: item.rvcNo,
      idKeyOB: "",
    };

    try {
      bookContext.dateWeekView.start != "" &&
        sendConfirmSMS.sendConfirmSMS(paramConFirmSMS).then((res) => {
          if (res.status === 200) {
            messageSuccess(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnClickPay = (item, e) => {
    const iteminfo: ITixDataItem = {
      originalAppointmentID: item.originalAppointmentID,
      checkNo: item.checkNo,
      customerID: item.customerID,
      appointmentStatusName: null,
    };
    handleRedirectCreateCharge(iteminfo, e, dispatch, router);
  };

  const handleClickStartAll = (item) => {
    const iteminfo: ITixDataItem = {
      originalAppointmentID: item.originalAppointmentID,
      checkNo: item.checkNo,
      customerID: item.customerID,
      appointmentStatusName: null,
    };
    handleStartAllServices(iteminfo, setVisibleStartOne, dispatch);
    setTimeout(() => {
      setIsReload(true);
    }, 500);
  };

  const handleOnClickDoneAll = (item) => {
    const iteminfo: ITixDataItem = {
      originalAppointmentID: item.originalAppointmentID,
      checkNo: item.checkNo,
      customerID: item.customerID,
      appointmentStatusName: null,
    };
    handleDoneAndActive(iteminfo, dispatch);
    setTimeout(() => {
      setIsReload(true);
    }, 500);
  };
  const handleOnClickCheckIn = (item) => {
    try {
      checkIn.checkIn(item.appointmentID).then((res) => {
        if (res.status === 200) {
          messageSuccess("Check-in Successfully");

          setIsReload(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnClickCheckOut = (item, e) => {
    console.log("item", item);
    const iteminfo: ITixDataItem = {
      originalAppointmentID: item.originalAppointmentID,
      checkNo: item.checkNo,
      customerID: item.customerID,
      appointmentStatusName: null,
    };
    console.log(iteminfo);
    handleRedirectCreateChargeCheckOut(iteminfo, e, dispatch, true, router);
  };
  const capitalize = (s: string) => {
    return s && s[0].toUpperCase() + s.slice(1);
  };

  let Img = process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO;
  let Icon = "flex flex-col items-center justify-end";
  return (
    <div className="w-full  z-100 p-3 max-h-[480px]  overflow-auto">
      {dataInforShedulerDetail ? (
        dataInforShedulerDetail.listAppointmentDetail.map(
          (item, index: number) => {
            // console.log("item", item);
            return (
              <div key={index} className="flex mt-2 ">
                {showMoreInfo && (
                  <div className="mr-4 w-[320px] max-h-[300px]">
                    <MoreInfoAppointment
                      customerPhone={item.customerPhone}
                      appointmentId={appointmentId}
                    />
                  </div>
                )}
                <div>
                  <div className="w-[450px]">
                    <Row>
                      <Col span={3}>
                        <img
                          onClick={() => setShowMoreInfo(!showMoreInfo)}
                          className="mt-3 ml-2"
                          style={{ width: "30px", height: "30px" }}
                          src={`/assets/imgs/MangoTech/info.svg`}
                          alt=""
                        />
                      </Col>
                      <Col span={15}>
                        <span className="text-2xl w-[250px] break-word  font-semibold opacity-90 text-mango-gray-6 cursor-pointer">
                          {item.customerName == null
                            ? "NON INFOR"
                            : capitalize(item.customerName)}
                        </span>
                        <div className="flex pt-2 cursor-pointer">
                          <RiPhoneFill
                            style={{ width: "18px", height: "15px" }}
                            className="mr-[5px] mt-1"
                          />
                          <p className=" pr-[5px] text-sm  uppercase pop-text">
                            {item.customerPhone == "" ||
                            item.customerPhone == null ? (
                              "Client No Phone"
                            ) : (
                              <EyeShowPhone
                                idAppt={item.appointmentID}
                                phoneHidden={item.customerPhone}
                              />
                            )}
                          </p>
                          <div
                            onClick={() =>
                              handleClickLikeConfirm(
                                item.isProduct,
                                item.appointmentID
                              )
                            }
                          >
                            {item.isProduct == 1 || isComfirm ? (
                              <img
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  borderLeft: "2px solid #A5A5A5",
                                  paddingLeft: "3px",
                                }}
                                src="/assets/imgs/confirm.svg"
                                alt=""
                              />
                            ) : (
                              <img
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  borderLeft: "2px solid #A5A5A5",
                                  paddingLeft: "3px",
                                }}
                                src={`/assets/imgs/OnlineBook/unconfirm.svg`}
                                alt=""
                              />
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col span={3} className="pt-5 ">
                        {statusTicket(item) != "" && (
                          <div
                            className={`h-[30px] w-[110px] rounded-2xl  text-center flex cursor-default ${
                              statusTicket(item) == "Waiting"
                                ? "border-mango-primary-blue text-mango-primary-blue"
                                : "border-mango-text-dark"
                            }`}
                            style={{
                              boxShadow: "inset 0px 3px 6px #00000040",
                              border: "1px dashed #505050",
                            }}
                          >
                            {" "}
                            <span className="m-auto font-semibold text-mango-gray-5">
                              {statusTicket(item)}
                            </span>
                          </div>
                        )}
                      </Col>
                      <Col span={24} className="-mt-2 cursor-default">
                        <span className="pop-text">
                          Ticket #: {item.appointmentID}
                        </span>
                        <br />
                        <span className="pop-text ">
                          Appointment Time:{" "}
                          {item.aptStartTime != null
                            ? moment(item.startTime).format("hh:mm A")
                            : "null"}
                        </span>
                      </Col>
                    </Row>
                  </div>
                  {/* icons */}
                  <div className="justify-center text-center mt-2 icon-tickets-details">
                    <Row justify="space-evenly">
                      {item.appointmentStatusID == 1 && (
                        <Col span={4}>
                          <div
                            className="flex flex-col items-center cursor-pointer py-1 hover:bg-mango-gray-1 hover:rounded-md"
                            onClick={() => handleClickRemind(item)}
                          >
                            <img
                              className="w-[41px] h-[30px]"
                              src="/assets/imgs/reminder.svg"
                              alt=""
                            />
                            <span className="pop-text-1">Remind</span>
                          </div>
                        </Col>
                      )}
                      {item.appointmentStatusID != 7 && (
                        <Col span={4}>
                          <div
                            className={`${Icon} cursor-pointer py-1 hover:bg-mango-gray-1 hover:rounded-md`}
                            onClick={(e) => handleOnClickCheckOut(item, e)}
                          >
                            <img
                              src={`/assets/imgs/MangoTech/checkout.svg`}
                              alt=""
                              style={{ width: "35px", height: "30px" }}
                            />
                            <span className="pop-text-1">Check-out</span>
                          </div>
                        </Col>
                      )}
                      {item.appointmentStatusID == 1 && item.diff == 1 && (
                        <Col span={4}>
                          <div
                            className={`${Icon} cursor-pointer py-1 hover:bg-mango-gray-1 hover:rounded-md`}
                            onClick={() => handleOnClickCheckIn(item)}
                          >
                            <img
                              src="/assets/imgs/check_in.svg"
                              alt=""
                              style={{ width: "35px", height: "30px" }}
                            />
                            <span className="pop-text-1">check-in</span>
                          </div>
                        </Col>
                      )}
                      <Content
                        visible={visibleEditAppt}
                        onOk={handleOkEditAppt}
                        onCancel={handleCancelEditAppt}
                        isAddNew={false}
                        dataAddNew={{
                          customerId: 0,
                          customerName: "NON INFO",
                          timeAdd: "",
                          techName: "NEXT AVAILABLE",
                          techId: 9999,
                          appointmentId: appointmentId,
                          groupId: groupIdClick || 0,
                        }}
                      />
                      {item.appointmentStatusID != 7 &&
                        item.appointmentStatusID != 9 &&
                        item.appointmentStatusID != 4 &&
                        item.diff >= 0 &&
                        !(
                          item.appointmentStatusID != 1 &&
                          dataInforShedulerDetail.mangoMarketing == "0"
                        ) && (
                          <Col span={4}>
                            <div
                              className={`${Icon} cursor-pointer py-1
                               hover:bg-mango-gray-1 hover:rounded-md`}
                              onClick={() => {
                                if (document) {
                                  let eventDoms = Array.from(
                                    document.getElementsByClassName(
                                      "ant-popover"
                                    ) as HTMLCollectionOf<HTMLElement>
                                  );
                                  if (eventDoms.length > 0) {
                                    for (let i = 0; i < eventDoms.length; i++) {
                                      eventDoms[i].classList.add(
                                        "ant-popover-hidden"
                                      );
                                    }
                                  }
                                }

                                setGroupIdClick(item.idParty);

                                setVisibleEditAppt(true);
                              }}
                            >
                              <img
                                src="/assets/imgs/020_Pencil13-13.svg"
                                alt=""
                                style={{ width: "30px", height: "30px" }}
                              />
                              <span className="pop-text-1">Edit</span>
                            </div>
                          </Col>
                        )}
                      {item.depositAmount <= 0 && (
                        <Col span={4} className=" justify-center text-center ">
                          <div
                            className={`flex flex-col items-center justify-endcursor-pointer py-1
                           hover:bg-mango-gray-1 hover:rounded-md`}
                            onClick={() => {
                              if (document) {
                                let eventDoms = Array.from(
                                  document.getElementsByClassName(
                                    "ant-popover"
                                  ) as HTMLCollectionOf<HTMLElement>
                                );
                                if (eventDoms.length > 0) {
                                  for (let i = 0; i < eventDoms.length; i++) {
                                    eventDoms[i].classList.add(
                                      "ant-popover-hidden"
                                    );
                                  }
                                }
                              }
                              setApptClick(item);

                              setVisibleRebook(true);
                            }}
                          >
                            <img
                              src={`/assets/imgs/book/RP_Icon.svg`}
                              alt=""
                              style={{ width: "36px", height: "30px" }}
                            />
                            <span className="pop-text-1">Rebook</span>
                          </div>
                        </Col>
                      )}
                      <ModalRebook
                        visible={visibleRebook}
                        onOk={handleOkRebook}
                        onCancel={handleCancelRebook}
                        appointment={apptClick}
                      />
                      {(item.depositAmount == 0 ||
                        item.depositAmount == null) &&
                        dataInforShedulerDetail.copyAppointment &&
                        viewTypeCalendar != "LIST" && (
                          <Col span={4}>
                            <div
                              onClick={() => {
                                dispatch(turnOnIsCopy());
                                if (document) {
                                  let eventDoms = Array.from(
                                    document.getElementsByClassName(
                                      "ant-popover"
                                    ) as HTMLCollectionOf<HTMLElement>
                                  );
                                  if (eventDoms.length > 0) {
                                    for (let i = 0; i < eventDoms.length; i++) {
                                      eventDoms[i].classList.add(
                                        "ant-popover-hidden"
                                      );
                                    }
                                  }
                                }
                              }}
                              className={`${Icon} cursor-pointer py-1 hover:bg-mango-gray-1 hover:rounded-md`}
                            >
                              <img
                                src={`/assets/imgs/Coppy.svg`}
                                alt=""
                                style={{ width: "27px", height: "30px" }}
                              />
                              <span className="pop-text-1">Copy</span>
                            </div>
                          </Col>
                        )}
                      {item.appointmentStatusID == 3 && (
                        <Col span={4}>
                          <div
                            className={`${Icon} cursor-pointer py-1 hover:bg-mango-gray-1 hover:rounded-md`}
                            onClick={(e) => handleOnClickPay(item, e)}
                          >
                            <img
                              src={`/assets/imgs/ImageIcon/24px_04.svg`}
                              alt=""
                              style={{ width: "27px", height: "30px" }}
                            />
                            <span className="pop-text-1">Pay</span>
                          </div>
                        </Col>
                      )}

                      {item.appointmentStatusID == 3 && (
                        <Col span={4}>
                          <div
                            className={`${Icon} cursor-pointer py-1 hover:bg-mango-gray-1 hover:rounded-md`}
                            onClick={(e) => handleOnClickDoneAll(item)}
                          >
                            <img
                              src="/assets/imgs/done.svg"
                              alt=""
                              style={{ width: "27px", height: "30px" }}
                            />
                            <span className="pop-text-1">Done All</span>
                          </div>
                        </Col>
                      )}
                      {item.appointmentStatusID != 0 &&
                        item.appointmentStatusID != 3 &&
                        item.appointmentStatusID != 8 &&
                        item.appointmentStatusID == 2 && (
                          <Col span={4}>
                            <div
                              className="flex flex-col items-center cursor-pointer py-1 hover:bg-mango-gray-1 hover:rounded-md"
                              onClick={() => handleClickStartAll(item)}
                            >
                              <img
                                className="w-[41px] h-[30px]"
                                src="/assets/imgs/start-one.svg"
                                alt=""
                              />
                              <span className="pop-text-1">Start All</span>
                            </div>
                          </Col>
                        )}
                      {(item.depositAmount > 0 &&
                        item.appointmentStatusID == 1) ||
                        (item.depositAmount <= 0 &&
                          (item.appointmentStatusID == 1 ||
                            item.appointmentStatusID == 2) && (
                            <Col span={4}>
                              <ModelCancel appointmentId={item.appointmentID} />
                            </Col>
                          ))}
                    </Row>
                  </div>
                  {item.noteAppointment != "" && item.noteAppointment != null && (
                    <div className="info-appointment-note ">
                      <span className="info-appointment-note-icon">
                        <img src="/assets/imgs/book/note_status.svg" />
                      </span>
                      <div className="info-appointment-note-text">
                        <span className="info-appointment-note-text">
                          {item.noteAppointment}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className=" w-full overflow-auto max-h-[200px] overflow-y-auto p-2 cursor-default">
                    <div className=" border-y-[1px] border-slate-600 mt-2 justify-center text-center py-1">
                      <Row
                        className="my-1.5"
                        style={{
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                        justify="space-around"
                      >
                        <Col
                          className="pop-text font-bold opacity-90 text-left pl-1"
                          span={4}
                        >
                          TECH
                        </Col>
                        <Col
                          className="pop-text font-bold opacity-90 "
                          span={7}
                        >
                          SERVICE
                        </Col>
                        <Col
                          className="pop-text font-bold opacity-90 "
                          span={4}
                        >
                          DUR
                        </Col>
                        <Col
                          className="pop-text font-bold opacity-90 "
                          span={7}
                        >
                          PRICE
                        </Col>
                        <Col
                          className="pop-text font-bold opacity-90 "
                          span={1}
                        ></Col>
                      </Row>
                    </div>
                    {item.appointmentServiceDetail.map(
                      (postDetail: AppointmentServiceDetail, index: number) => {
                        return (
                          <div
                            key={index}
                            className="border-dashed border-mango-gray-5 border-b 
                            justify-center text-center row-data-appt-details"
                          >
                            <Row
                              className="py-1.5"
                              style={{
                                justifyContent: "center",
                                alignContent: "center",
                              }}
                              justify="space-around"
                            >
                              <Col
                                span={4}
                                className="truncate pop-text text-sm text-left  "
                              >
                                {postDetail.employeeName}
                              </Col>
                              <Col
                                className="truncate pop-text text-sm "
                                span={7}
                              >
                                {" "}
                                {postDetail.itemName}
                              </Col>
                              <Col
                                span={4}
                                className="font-normal text-sm pop-text "
                              >
                                {postDetail.duration} min{" "}
                              </Col>
                              <Col
                                className="pop-text-price pt-1.5 text-mango-primary-blue"
                                span={7}
                              >
                                ${postDetail.amount}
                              </Col>
                              <Col
                                className="pop-text-price"
                                style={{
                                  color: `${theme.theme.extend.colors["mango-primary-blue"]}`,
                                }}
                                span={2}
                              >
                                {showAptDetails(
                                  postDetail,
                                  dataInforShedulerDetail.actIns
                                )}
                              </Col>
                              {itemData && (
                                <SelectTechServiceModal
                                  visible={visibleStartOne}
                                  onOk={handleOkStartOne}
                                  onCancel={handleCancelStartOne}
                                  loadDetail={1}
                                  itemData={itemData}
                                />
                              )}
                            </Row>
                          </div>
                        );
                      }
                    )}
                  </div>
                  {!(item.isConfirmOB ?? false) &&
                    item.appointmentStatusID == 1 &&
                    (item.isBookOnline ?? false) &&
                    item.startTime != null &&
                    new Date(item.startTime) >= new Date() && (
                      <div className="flex justify-between w-full space-x-2 text-sm ">
                        <button
                          className="w-1/2 h-10 text-center bg-mango-primary-orange rounded-md text-white hover:bg-mango-gray-100 mx-2"
                          onClick={() =>
                            handleDeclineOnlineBooking(
                              item.rvcNo,
                              item.appointmentID,
                              item.employeeID,
                              setReFetchData
                            )
                          }
                        >
                          DECLINE
                        </button>
                        <button
                          className="w-1/2 h-10 bg-mango-primary-blue  rounded-md text-white hover:bg-mango-gray-100 mx-2"
                          onClick={() =>
                            handleComfirmOnlineBooking(
                              item.rvcNo,
                              item.appointmentID,
                              setReFetchData
                            )
                          }
                        >
                          CONFIRM
                        </button>
                      </div>
                    )}
                </div>
              </div>
            );
          }
        )
      ) : (
        <div className="w-[480px]  h-[430px] space-y-2">
          <div className="w-full/2 h-24 bg-gray-100 animate-pulsee"></div>
          <div className="w-full h-24 bg-gray-100 animate-pulsee"></div>
          <div className="w-full h-12 bg-gray-100 animate-pulsee"></div>
          <div className="w-full h-12 bg-gray-100 animate-pulsee"></div>
          <div className="w-full h-12 bg-gray-100 animate-pulsee"></div>
        </div>
      )}
    </div>
  );
};
export default ModalAppointmentShedulerDetail;
