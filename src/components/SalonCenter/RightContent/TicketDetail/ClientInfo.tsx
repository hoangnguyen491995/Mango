import {
  Col,
  Input,
  List,
  message,
  Popover,
  Radio,
  Rate,
  Row,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useEffect, useState } from "react";
import { ChangeClientByIDApt } from "services/Appointments/ChangeClientByIDApt";

import { NotifyRemind } from "services/Appointments/NotifyRemind";
import { GetInformationForCheckoutPopup } from "services/Customers/GetInformationForCheckoutPopup";
import { APIGetClientByFilter } from "services/GetListWithFilter/GetListWithFilter";
import { messageSuccess } from "src/components/MessageAlert";
import UseSearch from "src/utils/UseSearch";
import { IItemInfoAppt } from ".";
import {
  IClientInfo,
  IGetInformationForCheckoutPopup,
  ITixAppt,
  RDTrackClientGroupCombine,
} from "../../DataStructures";
import { AddNewClient } from "../AddNewClient";
import { MdArrowBackIos } from "react-icons/md";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { SearchOutlined } from "@ant-design/icons";
interface Props {
  iteminfo: ITixAppt;
  itemInfoAppt: IItemInfoAppt;
  setItemInfoAppt: Function;
  setIsChangeDataClient: Function;
  isChangeDataClient: boolean;
}
export const ClientInfo = ({
  iteminfo,
  itemInfoAppt,
  setItemInfoAppt,
  setIsChangeDataClient,
  isChangeDataClient,
}: Props) => {
  const [valueCustomerId, setValueCustomerId] = useState(0);
  const [dataListRemind, setDataListRemind] = useState<string[]>([]);
  const [dataListClient, setDataListClient] = useState<IClientInfo[]>();
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const [showAddNewClient, setShowAddNewClient] = useState<boolean>(false);
  console.log(
    "🚀 ~ file: ClientInfo.tsx ~ line 52 ~ showAddNewClient",
    showAddNewClient
  );
  const [valueSearch, setValueSearch] = useState<string>("");
  const valueSearchData: string = UseSearch(valueSearch, 500);
  const [visibleRemind, setVisibleRemind] = useState<boolean>(false);
  const [dataClient, setDataClient] =
    useState<IGetInformationForCheckoutPopup>();
  const [dataCustomerId, setDataCustomerId] = useState<number>(
    iteminfo.customerID
  );
  const apiChangeClientByIDApt = new ChangeClientByIDApt();
  const handleChangeTech = (item: IClientInfo) => {
    const dataCustomer = dataClient?.rdTrackClientGroupCombine[valueCustomerId];
    const apt = dataCustomer
      ? dataCustomer.appointmentStatusID
      : iteminfo.originalAppointmentID;

    apiChangeClientByIDApt
      .changeClientByIDApt(apt, item.customerID)
      .then((res) => {
        if (res.status == 200) {
          setDataCustomerId(item.customerID);
        }
      });
  };
  const handleChangeStatusPhone = () => {
    setShowNumber(!showNumber);
  };
  const apiNotifyRemind = new NotifyRemind();
  const handleRemind = (item) => {
    apiNotifyRemind
      .notifyRemind(item, iteminfo.originalAppointmentID, iteminfo.customerID)
      .then((res) => {
        if (res.status == 200) {
          setVisibleRemind(false);
          messageSuccess("Send SMS Successfully ");
        }
      });
  };
  const handleSearchClient = (value) => {
    setValueSearch(value);
  };
  const handleVisibleRemind = (newVisible: boolean) => {
    if (newVisible) {
      const data = [
        "Ready Now",
        "Ready In 5 Minutes",
        "Ready In 10 Minutes",
        "Ready In 20 Minutes",
        "Enter Time",
      ];
      setDataListRemind(data);
    }

    setVisibleRemind(newVisible);
  };
  const apiGetInformationForCheckoutPopup =
    new GetInformationForCheckoutPopup();
  useEffect(() => {
    const dataCustomer = dataClient?.rdTrackClientGroupCombine[valueCustomerId];
    const body = {
      AppointmentID: dataCustomer
        ? dataCustomer.appointmentID
        : iteminfo.originalAppointmentID,
      History: 0,
      AppStatus: dataCustomer
        ? dataCustomer.appointmentStatusID
        : Number(iteminfo.appointmentStatusID),
      Checkno: dataCustomer ? dataCustomer.checkNo : iteminfo.checkNo,
      CusID: dataCustomer ? dataCustomer?.customerID : dataCustomerId,
      IsGroup: iteminfo.isGroup,
      GroupID: iteminfo.idParty,
    };

    apiGetInformationForCheckoutPopup
      .getInformationForCheckoutPopup(body)
      .then((res) => {
        if (res.status == 200) {
          setDataClient(res.data);
        }
      });
  }, [dataCustomerId]);

  const apiFilterClient = new APIGetClientByFilter();
  useEffect(() => {
    const body = {
      loadIndex: 0,
      customerName: valueSearchData,
      sortType: "",
    };
    if (valueSearchData.length > 0)
      apiFilterClient.GetClientByFilter(body).then((res) => {
        if (res.status == 200) {
          setDataListClient(res.data);
        }
      });
  }, [valueSearchData]);
  const handleChangeCustomer = (index) => {
    // setIsChangeDataClient(!isChangeDataClient);
    if (dataClient?.rdTrackClientGroupCombine) {
      const dataCustomer = dataClient?.rdTrackClientGroupCombine[index];
      setItemInfoAppt({
        clientId: dataCustomer.customerID,
        apptId: dataCustomer.appointmentID,
        apptStatusId: dataCustomer.appointmentStatusID,
        checkNo: dataCustomer.checkNo,
      });

      setIsChangeDataClient(!isChangeDataClient);
      setDataCustomerId(dataCustomer.customerID);
      setValueCustomerId(index);
    }
  };
  return (
    <div className="border-r border-mango-border-medium pr-6 font-semibold flex flex-col justify-between w-[300px]">
      <>
        <div>
          <div className="flex items-center justify-between">
            <span
              style={{
                font: "normal normal 600 14px/20px Montserrat",
                color: "#343131",
              }}
            >
              Client Profile
            </span>
            <div
              className="ant-modal-back-button"
              style={{
                borderRadius: "50%",
                border: "1px solid #a7a7a7",
                padding: "5px",
              }}
            >
              <button
                onClick={() => setShowAddNewClient(false)}
                style={{ marginLeft: "9px" }}
              >
                <MdArrowBackIos
                  color="#8c8c8c"
                  fontSize="20px"
                  fontWeight="400"
                />
              </button>
            </div>
          </div>

          <Popover
            trigger={"click"}
            placement="bottomLeft"
            className="w-full "
            visible={valueSearchData.length > 0 && true}
            content={
              dataListClient && (
                <List
                  className="w-[230px] h-[150px] overflow-auto !p-2 select-none"
                  dataSource={dataListClient}
                  renderItem={(item: IClientInfo) => {
                    return (
                      <>
                        <List.Item
                          className="flex justify-between cursor-pointer hover:!bg-mango-bg-dark  "
                          style={{
                            font: "normal normal 600 12px/16px Montserrat",
                          }}
                          onClick={() => handleChangeTech(item)}
                        >
                          <span>{item.customerName}</span>
                          <span>{item.contactPhone}</span>
                        </List.Item>
                      </>
                    );
                  }}
                />
              )
            }
          >
            <div className="flex mt-4">
              <Input
                value={valueSearch}
                placeholder="Quick search (Name/Phone)"
                onChange={(e) => handleSearchClient(e.target.value)}
                allowClear
                bordered={false}
                style={{ borderBottom: "1px solid #ccc" }}
                suffix={<SearchOutlined style={{ color: "#695b5b" }} />}
                id="inputSearch"
              />
              {!showAddNewClient && (
                <img
                  src="/assets/imgs/18x18px-GiftCard-plus-01.svg"
                  alt="add new"
                  className="h-5 cursor-pointer m-auto ml-1"
                  onClick={() => setShowAddNewClient(true)}
                />
              )}
            </div>
          </Popover>
          {showAddNewClient ? (
            <AddNewClient
              setShowAddNewClient={setShowAddNewClient}
              handleChangeTech={handleChangeTech}
            />
          ) : (
            <>
              {" "}
              {dataClient && dataClient.rdTrackClientGroupCombine.length > 0 && (
                <>
                  <div className="text-mango-pink mt-1">
                    Group ({dataClient.rdTrackClientGroupCombine.length})
                  </div>
                  <Radio.Group
                    onChange={(e) => handleChangeCustomer(e.target.value)}
                    defaultValue={valueCustomerId}
                    value={valueCustomerId}
                    size="middle"
                  >
                    {dataClient?.rdTrackClientGroupCombine.map(
                      (item: RDTrackClientGroupCombine, index) => (
                        <Tooltip title={item.clientName} key={index}>
                          <Radio.Button
                            className="max-w-[100px]"
                            key={index}
                            value={index}
                          >
                            <p className="truncate !m-auto !p-0 text-center capitalize">
                              {" "}
                              {item.clientName}
                            </p>
                          </Radio.Button>
                        </Tooltip>
                      )
                    )}
                  </Radio.Group>
                </>
              )}
              {dataClient?.infoCustomers && (
                <>
                  <Row className="border-b-2 mt-4 h-24">
                    <Col span={6} className="flex mt-1">
                      <img
                        src="/assets/imgs/camera.svg"
                        alt="error"
                        className="h-full w-12 m-auto"
                      />
                    </Col>
                    <Col span={18}>
                      <span
                        style={{ font: "normal normal 600 var(--s-14)" }}
                        className="capitalize hover:!text-mango-primary-blue hover:!underline cursor-pointer  "
                        title={
                          "See profile " +
                          dataClient?.infoCustomers.customerName
                        }
                      >
                        {dataClient?.infoCustomers.customerName}
                      </span>
                      <div className="flex">
                        <img
                          src="/assets/imgs/phone-alt.svg"
                          className="h-3 w-3 mt-1"
                          alt="error"
                        />
                        <div className="flex">
                          <span className="mx-2">
                            {!showNumber
                              ? dataClient.infoCustomers.contactPhone && (
                                  <>
                                    (XXX) XXX-
                                    {dataClient?.infoCustomers.contactPhone.slice(
                                      -4
                                    )}
                                  </>
                                )
                              : "(" +
                                dataClient?.infoCustomers.contactPhone.slice(
                                  0,
                                  3
                                ) +
                                ") " +
                                +dataClient?.infoCustomers.contactPhone.slice(
                                  3,
                                  6
                                ) +
                                "-" +
                                +dataClient?.infoCustomers.contactPhone.slice(
                                  -4
                                )}
                          </span>
                          {showNumber ? (
                            <img
                              src="/assets/imgs/37_HidePass.svg"
                              className="h-5 w-5"
                              alt="error"
                              onClick={handleChangeStatusPhone}
                            />
                          ) : (
                            dataClient?.infoCustomers.contactPhone && (
                              <img
                                src="/assets/imgs/34_ShowPass.svg"
                                className="h-5 w-5"
                                alt="error"
                                onClick={handleChangeStatusPhone}
                              />
                            )
                          )}
                        </div>

                        {iteminfo.appointmentStatusID != "3" &&
                          iteminfo.appointmentStatusID != "8" && (
                            <Popover
                              trigger="click"
                              visible={visibleRemind}
                              onVisibleChange={handleVisibleRemind}
                              placement="bottom"
                              content={
                                <>
                                  <h1 className="bg-mango-primary-blue !m-0 !p-0 text-center !text-white text-lg ">
                                    READY STATUS ?
                                  </h1>
                                  {dataListRemind &&
                                    dataListRemind.map((item, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className={
                                            "flex justify-between items-center w-full !border-b !border-dashed  h-[45px] !py-2 !my-0  px-3  bg-mango-primary-blue "
                                          }
                                          onClick={() => handleRemind(item)}
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
                                              {item}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </>
                              }
                            >
                              <img
                                src="/assets/imgs/notification.svg"
                                className="ml-2 h-6 w-6 hover:!text-mango-primary-blue  cursor-pointer "
                                alt="error"
                              />
                            </Popover>
                          )}
                      </div>

                      <Rate value={dataClient.infoCustomers.rating || 0} />
                    </Col>
                  </Row>
                  <Row justify="space-between" className="my-4 ">
                    <span style={{ font: "normal normal 500 var(--s-14)" }}>
                      Ticket #:
                    </span>
                    <span>
                      {dataClient.rdTrackClientGroupCombine.length > 0
                        ? dataClient.rdTrackClientGroupCombine[valueCustomerId]
                            .appointmentID
                        : iteminfo.originalAppointmentID}
                    </span>
                  </Row>
                  <Row className="mb-6">
                    <span style={{ font: "normal normal 500 var(--s-14)" }}>
                      Appointment Time:
                    </span>
                  </Row>
                  <Row justify="space-between" className="mb-4">
                    <span style={{ font: "normal normal 500 var(--s-14)" }}>
                      First Visit :
                    </span>
                    <span>
                      {moment(dataClient?.infoCustomers.fristVist).format(
                        "MMM DD, YYYY"
                      )}
                    </span>
                  </Row>
                  <Row justify="space-between" className="mb-4">
                    <span style={{ font: "normal normal 500 var(--s-14)" }}>
                      Last Visit :
                    </span>
                    <span>
                      {dataClient?.infoCustomers.lastVist
                        ? moment(dataClient?.infoCustomers.lastVist).format(
                            "MMM DD, YYYY"
                          )
                        : "Unknown"}
                    </span>
                  </Row>
                  <div className="border-black border border-dashed w-full text-center p-2 mb-2 mt-10">
                    <p
                      className="text-center "
                      style={{ font: "normal normal 500 var(--s-12)" }}
                    >
                      {dataClient?.redeem}
                    </p>
                    <div
                      className={
                        (!dataClient.redeem.includes("YOU HAVE 0 REWARDS")
                          ? "bg-[#93d500] hover:bg-[#89c600] cursor-pointer "
                          : " bg-mango-border-medium cursor-not-allowed ") +
                        "p-2 font-bold w-full  text-white cursor-pointer rounded-md"
                      }
                      style={{ fontFamily: "'Satisfy', cursive" }}
                    >
                      Redeem now!
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {dataClient?.infoCustomers && !showAddNewClient && (
          <div className=" w-full ">
            <Row className="mb-2">
              <img src="/assets/imgs/Note.svg" className="h-8 w-8" />
              <span>Ticket Note</span>
            </Row>
            <TextArea
              defaultValue={dataClient.infoCustomers.notes}
              className="max-h-28"
            />
          </div>
        )}
      </>
    </div>
  );
};
