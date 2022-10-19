import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Popover, Row, Select, SelectProps, Space } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  isChangeDataTechSalonCenter$,
  isChangeDataTixSalonCenter$,
} from "src/redux/selector";

import styled from "styled-components";
import { IGroupEmployeeDetail, ITixAppt } from "../DataStructures";
import { SelectTechServiceAppt } from "../SelectTechServiceAppt";
import {
  bgTixAppt,
  handleDoneAndActive,
  handleRedirectCreateCharge,
  handleStartAllServices,
  statusAppt,
} from "./helper";
import { MenuUpdateStatus } from "./MenuUpdateStatus";
import { TicketDetail } from "./TicketDetail";

interface Props {
  iteminfo: ITixAppt;
  setItemDataDrag: Function;
}
const ItemTix = styled.div`
  ::after {
    content: "${(props) => props.defaultValue == 1 && props.title}";
  }
`;

export const ItemAppt = ({ iteminfo, setItemDataDrag }: Props) => {
  const [visibleSelectTech, setVisibleSelectTech] = useState<boolean>(false);
  const [showAddTech, setShowAddTech] = useState<boolean>(false);

  const dispatch = useDispatch();
  // Action Show Detail Appt
  const handleOnOk = () => {
    setVisibleSelectTech(true);
  };
  const handleOnCancel = () => {
    setVisibleSelectTech(false);
  };
  //Action Add Tech
  const handleOnOkAddTech = () => {
    setShowAddTech(true);
  };
  const handleOnCancelAddTech = () => {
    setShowAddTech(false);
  };

  const handleShowTicketDetail = (e) => {
    e.stopPropagation();
    setVisibleSelectTech(true);
  };

  //classname

  const handleClickAddTech = () => {
    setShowAddTech(true);
  };
  const classNameBtnStatus =
    "h-[35px] w-[35px] hover:opacity-50 shadow-md rounded-full";
  const router = useRouter();
  const [hideItem, setHideItem] = useState<boolean>(false);
  const handleDragStart = () => {
    setItemDataDrag(iteminfo);
    setHideItem(true);
  };

  return (
    <>
      {iteminfo ? (
        <>
          {visibleSelectTech && (
            <TicketDetail
              iteminfo={iteminfo}
              visible={visibleSelectTech}
              onOk={handleOnOk}
              onCancel={handleOnCancel}
            />
          )}
          {showAddTech && (
            <SelectTechServiceAppt
              visible={showAddTech}
              onOk={handleOnOkAddTech}
              onCancel={handleOnCancelAddTech}
              itemData={iteminfo}
              loadDetail={1}
            />
          )}
          {/* Item Appt */}
          <div
            className={
              "relative w-[228px] h-[157px] mr-[8px] mt-[4px] ml-[2px] " +
              (hideItem && " cursor-move")
            }
            id={iteminfo.originalAppointmentID.toString()}
            title={iteminfo.appointmentStatusID}
            onDragStart={handleDragStart}
            onDragEnd={() => setHideItem(false)}
            onClick={(e) => {
              e.stopPropagation();
              handleRedirectCreateCharge(iteminfo, e, dispatch, router);
            }}
            style={{
              transition: hideItem ? "0.01s" : "1",
              transform: hideItem ? "translateX(-9999px)" : "none",
            }}
            draggable
          >
            {(iteminfo.isGroup == 1 || iteminfo.isCombine == 1) && (
              <>
                <div
                  className={
                    "w-[228px] h-[157px] border-gray-400 border-2  shadow-md rounded-[8px] pt-[18px] cursor-pointer select-none bg-white absolute top-2 left-0"
                  }
                  style={{
                    borderColor: bgTixAppt(iteminfo).bgNumber,
                    backgroundColor: bgTixAppt(iteminfo).bgTix,
                  }}
                >
                  <Row
                    justify="space-between"
                    className="border-b border-b-mango-gray-300 pb-1"
                  >
                    <Col span={4}>
                      <div
                        className={
                          "h-[34px] rounded-r-full flex items-center p-2 "
                        }
                        style={{
                          backgroundColor: bgTixAppt(iteminfo).bgNumber,
                        }}
                      ></div>
                    </Col>
                    <Col span={14}></Col>
                  </Row>
                </div>
                <div
                  className={
                    "w-[228px] h-[157px] border-gray-400 border-2  shadow-md rounded-md py-3  cursor-pointer select-none bg-white absolute top-1 left-1"
                  }
                  style={{
                    borderColor: bgTixAppt(iteminfo).bgNumber,
                    backgroundColor: bgTixAppt(iteminfo).bgTix,
                  }}
                >
                  <Row
                    justify="space-between"
                    className="border-b border-b-mango-gray-300 pb-1"
                  >
                    <Col span={4}>
                      <div
                        className={" h-8 rounded-r-full flex items-center p-2"}
                        style={{
                          backgroundColor: bgTixAppt(iteminfo).bgNumber,
                        }}
                      >
                        <span className="font-bold text-white mx-auto">
                          {iteminfo.indexNum}
                        </span>
                      </div>
                    </Col>
                    <Col span={14}></Col>
                  </Row>
                </div>
              </>
            )}
            <ItemTix
              className={
                " w-[228px] h-[157px] border-gray-400 border-2 shadow-md rounded-[8px] pt-[18px] select-none absolute top-0  left-2 cursor-move highlight-box " +
                (iteminfo.highlightMessage &&
                  iteminfo.highlightTicket == 1 &&
                  " itemTicket-status ")
              }
              style={{
                borderColor: bgTixAppt(iteminfo).bgNumber,
                backgroundColor: bgTixAppt(iteminfo).bgTix,
              }}
              defaultValue={iteminfo.highlightTicket}
              title={iteminfo.highlightMessage}
            >
              <div className="w-full h-[136px]">
                <Row
                  justify="space-between"
                  className="border-b border-b-mango-gray-300 pb-2"
                >
                  <Col className="w-[30px]">
                    <div
                      className={"h-8 rounded-r-full flex items-center "}
                      style={{
                        backgroundColor: bgTixAppt(iteminfo).bgNumber,
                      }}
                    >
                      <span className="font-bold text-white mx-auto">
                        {iteminfo.indexNum}
                      </span>
                    </div>
                  </Col>
                  <Col
                    span={16}
                    className="hover:bg-gray-200 hover:rounded-md text-left relative"
                    onClick={handleShowTicketDetail}
                  >
                    <div className="w-[85%] absolute z-10 cursor-pointer">
                      <p className="underline font-semibold truncate mb-0 p-0 m-0 h-[19px] text-sm capitalize">
                        {iteminfo.customerName}
                      </p>
                      <span className=" text-left text-xs p-0 m-0">
                        {iteminfo.customerType}
                      </span>
                    </div>
                    {/* Group */}
                    {iteminfo.isGroup != 0 && (
                      <div className="flex absolute right-0 top-[10px]">
                        <span className="text-[12px] text-mango-red-300 mr-1 h-[12px]">
                          ({iteminfo.totalPartyByAptStatus})
                        </span>
                        <img
                          src="/assets/imgs/party-icon.svg"
                          className="h-4"
                        />
                      </div>
                    )}
                  </Col>
                  <Col span={4} onClick={(e) => e.stopPropagation()}>
                    <MenuUpdateStatus
                      iteminfo={iteminfo}
                      setVisibleSelectTech={setVisibleSelectTech}
                    />
                  </Col>
                </Row>
                <Row className=" h-[50px]">
                  <Row className="text-[10px] font-bold leading-4 ml-2 pt-auto h-[25px]">
                    {iteminfo.appointmentStatusID == "2" &&
                      iteminfo.bookType == 1 && (
                        <p className="mr-2">
                          <span className="text-mango-primary-blue">Appt:</span>
                          {iteminfo.startTime.slice(-8, -3)}
                        </p>
                      )}
                    {iteminfo.appointmentStatusID == "2" && (
                      <p className="mr-2">
                        X: {iteminfo.checkinTime.slice(-8, -3)}
                      </p>
                    )}
                    {iteminfo.appointmentStatusID == "3" &&
                      iteminfo.inService && (
                        <p className="mr-2">
                          S: {iteminfo.inService.slice(-8, -3)}
                        </p>
                      )}
                    {iteminfo.appointmentStatusID == "8" && (
                      <p className="mr-2">
                        D: {iteminfo.checkinTime.slice(-8, -3)}
                      </p>
                    )}

                    <ClockCircleOutlined
                      className="mt-1 mr-1"
                      style={{ fontSize: "8px" }}
                    />
                    <span
                      className={
                        (iteminfo.appointmentStatusID == "3"
                          ? "text-mango-primary-blue"
                          : "text-black") + " w-[70px] truncate"
                      }
                    >
                      {moment(iteminfo.startTime)
                        .local()
                        .startOf("seconds")
                        .fromNow()}
                    </span>
                  </Row>
                  <Row
                    className="font-bold text-xs w-full text-left "
                    justify="space-between"
                  >
                    <Col
                      span={18}
                      className="max-h-[35px] flex flex-1 flex-row flex-wrap content-start items-start my-[1px] overflow-hidden pl-2 "
                    >
                      <span
                        className=" overflow-hidden text-[12px] font-semibold "
                        style={{
                          WebkitLineClamp: "2",
                          whiteSpace: "break-spaces",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {iteminfo.appointmentSubject}
                      </span>
                    </Col>
                    <Col>
                      {iteminfo.rePay == 1 && (
                        <img
                          src="/assets/imgs/repay.svg"
                          alt="repay"
                          className="h-5 w-5"
                        />
                      )}
                      {iteminfo.appointmentStatusID == "8" && (
                        <img
                          src="/assets/imgs/24-pixel-assets_11.svg"
                          className="h-5 w-5"
                          alt="done"
                        />
                      )}
                    </Col>
                  </Row>
                </Row>
                <Row justify="space-between">
                  <div
                    className="px-[2px] overflow-hidden"
                    style={{ maxWidth: "calc(100% - 45px)" }}
                  >
                    <div className="flex ">
                      {iteminfo.groupEmployeeDetails.length > 0 ? (
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <Popover
                            className="  z-50 !w-[180px]"
                            placement="bottom"
                            trigger={"hover"}
                            content={
                              <>
                                {/* <Space direction="vertical" className="mx-4">
                                  {iteminfo.groupEmployeeDetails.map(
                                    (item, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className={
                                            "max-w-[120px] min-w-[35px] rounded-md h-[30px] truncate mt-2 shadow-md flex px-1  overflow-y-hidden  "
                                          }
                                          style={{
                                            border:
                                              item.color == "#FFFFFF" ||
                                              !item.color
                                                ? "1px solid #94D500"
                                                : "1px solid " + item.color,
                                            backgroundColor:
                                              item.color == "#FFFFFF" ||
                                              !item.color
                                                ? "#FFFFFF"
                                                : item.color,
                                          }}
                                        >
                                          {item.name && (
                                            <span
                                              title={item.name.toUpperCase()}
                                              className={
                                                "font-bold my-auto text-center w-full truncate  " +
                                                (item.color == "#FFFFFF"
                                                  ? "text-black"
                                                  : "text-white")
                                              }
                                            >
                                              {item.name.toUpperCase()}
                                            </span>
                                          )}

                                          {item.isRequest && (
                                            <img
                                              src={`assets/imgs/RQ.svg`}
                                              className="my-auto"
                                            />
                                          )}
                                        </div>
                                      );
                                    }
                                  )}{" "}
                                </Space> */}
                              </>
                            }
                          >
                            <div className="flex">
                              {iteminfo.groupEmployeeDetails.map(
                                (item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className={
                                        "max-w-[120px] min-w-[35px] rounded-md h-[30px] truncate mt-2 shadow-md mr-1 flex px-1 overflow-y-hidden"
                                      }
                                      style={{
                                        border:
                                          item.color == "#FFFFFF" || !item.color
                                            ? "1px solid #94D500"
                                            : "1px solid " + item.color,
                                        backgroundColor:
                                          item.color == "#FFFFFF" || !item.color
                                            ? "#FFFFFF"
                                            : item.color,
                                      }}
                                    >
                                      {item.name && (
                                        <span
                                          title={item.name.toUpperCase()}
                                          className={
                                            "font-bold my-auto text-center w-full truncate  " +
                                            (item.color == "#FFFFFF"
                                              ? "text-black"
                                              : "text-white")
                                          }
                                        >
                                          {item.name.toUpperCase()}
                                        </span>
                                      )}

                                      {item.isRequest && (
                                        <img
                                          src={`/assets/imgs/RQ.svg`}
                                          className="my-auto"
                                        />
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </Popover>
                        </Space>
                      ) : (
                        <div
                          className={
                            "max-w-[120px] min-w-[35px] rounded-md h-[30px] truncate mt-2 shadow-md mr-1 flex px-2 border border-solid border-[#94D500] bg-white"
                          }
                        >
                          <span
                            className={"font-bold my-auto text-black truncate"}
                          >
                            NEXT AVAILABLE
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="text-left mt-auto absolute z-10 right-[5px] bottom-[2px] cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {statusAppt(iteminfo) == 2 && (
                      <img
                        onClick={() =>
                          handleStartAllServices(
                            iteminfo,
                            setShowAddTech,
                            dispatch
                          )
                        }
                        src="/assets/imgs/start-one.svg"
                        className={classNameBtnStatus}
                      />
                    )}
                    {statusAppt(iteminfo) == -1 &&
                      iteminfo.appointmentStatusID != "8" && (
                        <img
                          onClick={handleClickAddTech}
                          src="/assets/imgs/addTechStart.svg"
                          className={classNameBtnStatus}
                        />
                      )}
                    {statusAppt(iteminfo) == 3 && (
                      <img
                        onClick={() => handleDoneAndActive(iteminfo, dispatch)}
                        src="/assets/imgs/done.svg"
                        className={classNameBtnStatus}
                      />
                    )}
                  </div>
                </Row>
              </div>
            </ItemTix>
          </div>
        </>
      ) : (
        <Card
          loading={true}
          className="  w-[228px] h-[157px]  border-gray-400 border bg-white m-1
        shadow-md rounded-md py-3  cursor-pointer select-none"
        />
      )}
    </>
  );
};
