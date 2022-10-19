import { ClockCircleOutlined } from "@ant-design/icons";
import { Col, Input, Popover, Row, Space } from "antd";
import Search from "antd/lib/input/Search";
import moment from "moment";
import { useEffect, useState, useContext } from "react";
import { GetServiceDetailForEdit } from "services/Appointments/GetServiceDetailForEdit";
import { APIGetTixSalonCenter } from "services/GetTixApptSalonCenter/GetTixAppSalonCenter";
import { ITixAppt } from "src/components/SalonCenter/DataStructures";
import { bgTixAppt } from "src/components/SalonCenter/RightContent/helper";
import TixContext from "../../TixContext";
const classInput =
    "!border-x-0 !border-t-0  !border-b-mango-border-dark !rounded-none ";
const WalkedInList = ({ indexTab }) => {
  const apiAPIGetTixSalonCenter = new APIGetTixSalonCenter();
  const [dataListTixSalonCenter, setDataListTixSalonCenter] = useState<
    Array<ITixAppt>
  >([]);
  const tixCT = useContext(TixContext)[0];
  useEffect(() => {
    if (indexTab == 2) {
      const body = {
        Page: 0,
        Quantity: 500,
        RvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
        AppointmentId: "",
        Status: "2",
      };
      apiAPIGetTixSalonCenter.GetTixSalonCenter(body).then((res) => {
        if (res.status == 200) {
          setDataListTixSalonCenter(
            res.data.filter((item) => item.bookType == 0)
          );
        }
      });
    }
  }, [indexTab]);
  const apiGetApptEdit = new GetServiceDetailForEdit();
  const handleClickAppt = (itemAppt: ITixAppt) => {
    apiGetApptEdit
      .getServiceDetailForEdit(itemAppt.originalAppointmentID, itemAppt.idParty)
      .then((res) => {
        if (res.status == 200) {
          tixCT.setDataItemTix(res.data);
          tixCT.setStatusChange(tixCT.statusChange);
        }
      });
  };
  return (
    <div className="h-[580px] p-5">
      <Search
        allowClear
        bordered={false}
        size="large"
        className={
          classInput +
          " w-full  !focus:outline-none !p-0 !m-0 !mb-2 customeInputSearch"
        }

        style={{ borderBottom: "1px solid black" }}
        placeholder="Search Walked-in List"
      />
      <div className="overflow-scroll h-[580px] w-full ">
        {dataListTixSalonCenter.map((itemAppt, index) => {
          return (
            <div
              className={"relative  h-[100px]  mt-[4px] cursor-pointer "}
              style={{ width: "calc(100% - 20px)" }}
              id={itemAppt.originalAppointmentID.toString()}
              title={itemAppt.appointmentStatusID}
              onClick={() => handleClickAppt(itemAppt)}
            >
              <div
                className={
                  "w-full h-full border-gray-400 border-l-8 shadow-md border-y-2 border-r-2 select-none absolute top-0  left-2 "
                }
                style={{
                  borderColor: bgTixAppt(itemAppt).bgNumber,
                }}
                defaultValue={itemAppt.highlightTicket}
                title={itemAppt.highlightMessage}
              >
                <div className="h-[100px] px-4 ">
                  <div className="h-[40px] flex justify-between">
                    {/* Customer Name */}
                    <div className=" text-left   flex">
                      <div className="w-[85%] absolute z-10 cursor-pointer">
                        <p className="underline font-semibold truncate mb-0 p-0 m-0 h-[19px] text-sm capitalize">
                          {itemAppt.customerName}
                        </p>
                        <span className=" text-left text-xs p-0 m-0 text-mango-primary-red">
                          {itemAppt.customerType.toUpperCase()}
                        </span>
                      </div>
                      {/* Group */}
                      {itemAppt.isGroup != 0 && (
                        <div className="flex absolute right-0 top-[10px]">
                          <span className="text-[12px] text-mango-red-300 mr-1 h-[12px]">
                            ({itemAppt.totalPartyByAptStatus})
                          </span>
                          <img
                            src="/assets/imgs/party-icon.svg"
                            className="h-4"
                          />
                        </div>
                      )}
                    </div>

                    {/* Time */}
                    <div className=" flex text-[10px] font-bold leading-4 ml-2 pt-auto h-[25px]">
                      {itemAppt.appointmentStatusID == "2" &&
                        itemAppt.bookType == 1 && (
                          <p className="mr-2">
                            <span className="text-mango-primary-blue">
                              Appt:
                            </span>
                            {itemAppt.startTime.slice(-8, -3)}
                          </p>
                        )}
                      {itemAppt.appointmentStatusID == "2" && (
                        <p className="mr-2">
                          X: {itemAppt.checkinTime.slice(-8, -3)}
                        </p>
                      )}

                      <ClockCircleOutlined
                        className="mt-1 mr-1"
                        style={{ fontSize: "8px" }}
                      />
                      <span
                        className={
                          (itemAppt.appointmentStatusID == "3"
                            ? "text-mango-primary-blue"
                            : "text-black") + " w-[70px] truncate"
                        }
                      >
                        {moment(itemAppt.startTime)
                          .local()
                          .startOf("seconds")
                          .fromNow()}
                      </span>
                    </div>
                  </div>

                  <div
                    className="px-[2px] overflow-hidden h-[50px]"
                    style={{ maxWidth: "calc(100% - 45px)" }}
                  >
                    <p className=" overflow-hidden text-[12px] font-semibold h-[20px] truncate m-0">
                      {itemAppt.appointmentSubject}
                    </p>
                    <div className="flex items-center h-[20px]">
                      {itemAppt.groupEmployeeDetails.length > 0 ? (
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <Popover
                            className="  z-50 !w-[180px]"
                            placement="bottom"
                            trigger={"hover"}
                            content={<></>}
                          >
                            <div className="flex">
                              {itemAppt.groupEmployeeDetails.map(
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WalkedInList;
