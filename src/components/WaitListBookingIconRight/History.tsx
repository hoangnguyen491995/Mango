// @flow
import {
  Badge,
  Button,
  DatePicker,
  DatePickerProps,
  Drawer,
  Empty,
  Input,
  Space,
  Tabs,
  Row,
  Col,
} from "antd";
import styled from "styled-components";
import moment from "moment";
import { useEffect, useState } from "react";
import { APIGetWaitingListHistory } from "services/GetWaitingListHistory/GetWaitingListHistory";
import { theme } from "tailwind.config";
import { ItemTixSalonAppt } from "./ItemTixSalonAppt";
import { SearchOutlined } from "@ant-design/icons";
const InputSearchTicket = styled.div`
  [type="text"]:focus,
  [type="email"]:focus,
  [type="url"]:focus,
  [type="password"]:focus,
  [type="number"]:focus,
  [type="date"]:focus,
  [type="datetime-local"]:focus,
  [type="month"]:focus,
  [type="search"]:focus,
  [type="tel"]:focus,
  [type="time"]:focus,
  [type="week"]:focus,
  [multiple]:focus,
  textarea:focus,
  select:focus {
    --tw-ring-shadow: none;
  }
`;
export interface ICheckinList {
  appointmentID: number;
  checkNo: number | null;
  indexNum: number | null;
  checkinDateTime: Date;
  appointmentSubject: string;
  status: number;
  appointmentStatus: string;
  employeeName: string;
  groupEmployeeDetail: string;
  checkinTime: string;
  inService: string;
  outService: string;
  bookType: number;
  aptStartTime: string;
  customerName: string;
  rating: number;
  customerType: string;
  isCombine: number;
  appointmentCombine: number;
  appointmentParty: number;
}

type Props = {};
export const History = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const { TabPane } = Tabs;
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [positionIcon, setPositionIcon] = useState(false);
  const [date, setDate] = useState<string>(moment().format("MM-DD-YYYY"));
  const [dataListCheckin, setDataListCheckin] = useState<Array<ICheckinList>>(
    []
  );
  const [dataListOpen, setDataListOpen] = useState<Array<ICheckinList>>([]);
  const [dataListClosed, setDataListClosed] = useState<Array<ICheckinList>>([]);
  const [valueSearch, setValueSearch] = useState<string>("");
  const dataCheckinList = new APIGetWaitingListHistory();
  //Function
  const showDrawer = () => {
    setVisible(!visible);
    setPositionIcon(!positionIcon);
  };

  const onClose = () => {
    setVisible(false);
    setPositionIcon(false);
  };

  const customFormat: DatePickerProps["format"] = (value) => {
    return `${moment(value).format("ddd, DD MMM, YYYY")}`;
  };

  const onChange: DatePickerProps["onChange"] = (date) => {
    // console.log(moment(date, "MM-DD-YYYY"));
    setDate(moment(date).format("MM-DD-YYYY"));
    moment(date).format("ddd, DD MMM, YYYY");
  };
  useEffect(() => {
    dataCheckinList.GetWaitingListHistory(date).then((res) => {
      if (res.status == 200) {
        const dataFilterCheckIn = res.data.filter(
          (item: ICheckinList) => item.status != 4
        );
        setDataListCheckin(dataFilterCheckIn);
        setDataListOpen(
          dataFilterCheckIn.filter((item: ICheckinList) => item.status != 7)
        );
        setDataListClosed(
          dataFilterCheckIn.filter((item: ICheckinList) => item.status == 7)
        );
      }
    });
  }, [date]);
  const handleSearch = (value) => {
    setValueSearch(value);
  };

  return (
    <>
      <div className="flex">
        <div
          className={
            "!bg-orange-500 !rounded-l-md !border-none !p-4 cursor-pointer "
            // (positionIcon && "relative right-[500px]")
          }
          // style={{ zIndex: "1001", transition: "0.3s" }}
          onClick={showDrawer}
        >
          <img src="/assets/imgs/Iconhistory.svg" alt="Icon History" />
        </div>
        <Drawer
          placement={"right"}
          width={520}
          onClose={onClose}
          visible={visible}
          extra={<Space></Space>}
          className="drawer-checkin-list"
        >
          <div className="title-drawer-checkin">
            <span className="text-[#505050] text-[22px] font-bold ">
              Check-in List
            </span>
          </div>
          <Row gutter={24} className="mb-7" style={{ marginTop: "-10px" }}>
            <Col span={8}>
              <DatePicker
                className="w-[150px] customTextColor !font-bold cursor-pointer dp-checkin-list"
                onChange={onChange}
                defaultValue={moment()}
                format={customFormat}
                suffixIcon={false}
                allowClear={false}
                style={{
                  height: "45px",
                  width: "155px",
                  cursor: "pointer",
                  paddingLeft: "7px",
                }}
              />
            </Col>
            <Col span={16}>
              {/* <Input
                size="large"
                onChange={(e) => handleSearch(e.target.value)}
                value={valueSearch}
                placeholder="Search tix, client name"
                allowClear={true}
              /> */}
              <InputSearchTicket>
                <div
                  className="lg:flex  justify-center items-center  pr-2  
          h-[45px]    rounded bg-white relative"
                  style={{ border: "1px solid #ccc", width: "95%" }}
                >
                  <input
                    className=" rounded-l-lg text-ms border-none w-full"
                    type="search"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Search tix, client name"
                    onFocus={() => {
                      setIsFocusInput(true);
                    }}
                    onBlur={() => setIsFocusInput(false)}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={valueSearch}
                  ></input>
                  <div className="search-icon  text-gray-800  rounded-lg ">
                    {isFocusInput ? (
                      <svg
                        className=" mb-2 mr-2"
                        width="20"
                        height="20"
                        viewBox="0 0 12 12"
                        fill="gray"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 
              0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 
              1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                        />{" "}
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998
           12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925
            15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025
             12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1
              6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637
               1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                          stroke="gray"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </InputSearchTicket>
            </Col>
          </Row>

          <Tabs
            defaultActiveKey="1"
            className="overflow-hidden customTabPane !mt-2"
          >
            <TabPane
              tab={
                <>
                  <h2 className="!mx-4">
                    All{" "}
                    <Badge
                      style={{
                        backgroundColor:
                          theme.extend.colors["mango-border-dark"],
                      }}
                      count={dataListCheckin.length}
                      offset={[10, 0]}
                    ></Badge>
                  </h2>
                </>
              }
              key="1"
              className="h-[720px] overflow-auto"
            >
              {dataListCheckin.length > 0 ? (
                dataListCheckin
                  .filter((item) =>
                    item.customerName
                      .toUpperCase()
                      .includes(valueSearch.toUpperCase())
                  )
                  .map((item, index) => (
                    <ItemTixSalonAppt key={index} item={item} index={index} />
                  ))
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane
              tab={
                <>
                  <h2 className="!mx-4">
                    Open
                    <Badge
                      style={{
                        backgroundColor:
                          theme.extend.colors["mango-border-dark"],
                      }}
                      count={dataListOpen.length}
                      offset={[10, 0]}
                    ></Badge>
                  </h2>
                </>
              }
              key="2"
            >
              {dataListOpen.length > 0 ? (
                dataListOpen
                  .filter((item) =>
                    item.customerName
                      .toUpperCase()
                      .includes(valueSearch.toUpperCase())
                  )
                  .map((item, index) => (
                    <ItemTixSalonAppt key={index} item={item} index={index} />
                  ))
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane
              tab={
                <>
                  <h2 className="!mx-4">
                    Closed
                    <Badge
                      style={{
                        backgroundColor:
                          theme.extend.colors["mango-border-dark"],
                      }}
                      count={dataListClosed.length}
                      offset={[10, 0]}
                    ></Badge>
                  </h2>
                </>
              }
              key="3"
            >
              {dataListClosed.length > 0 ? (
                dataListClosed
                  .filter((item) =>
                    item.customerName
                      .toUpperCase()
                      .includes(valueSearch.toUpperCase())
                  )
                  .map((item, index) => (
                    <ItemTixSalonAppt key={index} item={item} index={index} />
                  ))
              ) : (
                <Empty />
              )}
            </TabPane>
          </Tabs>
        </Drawer>
      </div>
    </>
  );
};
