import { Badge, Col, Empty, Skeleton, Tabs } from "antd";
import { IShowFullScreen } from "pages/salon-center";
import { Fragment, useEffect, useState } from "react";
import { GridDropZone, GridItem } from "react-grid-drag";
import styled from "styled-components";
import { ITixAppt } from "../DataStructures";
import { ItemAppt } from "./ItemAppt";
interface Props {
  showFullScreen: IShowFullScreen;
  setShowFullScreen: Function;
  dataInService: Array<ITixAppt>;
  dataWaitList: Array<ITixAppt>;
  configShowColumn: boolean;
  isLoading: boolean;
  classNameHover: string;
  setItemDataDrag: Function;
}
const bgTixAppt = (number) => {
  let bgTix = "";
  let bgNumber = "";
  switch (number) {
    case "3":
      bgTix = "#F1F1F1";
      bgNumber = "#A7A7A7";
      break;
    case "8":
      bgTix = "#f0e1e5";
      bgNumber = "#A7A7A7";
      break;
    case "21":
      bgTix = "#E6E5F3";
      bgNumber = "#8B85CA";
      break;
    case "22":
      bgTix = "#DAF5F9";
      bgNumber = "#00BED6";
      break;
    default:
      bgTix = "white";
      break;
  }
  return { bgTix, bgNumber };
};
const listItemInService = [1, 2, 3, 4, 5, 6];
const listWaitList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const ContentTabs = styled.div`
  .ant-tabs-nav {
    margin-left: 50px;
    margin-bottom: 4px;
  }
  .ant-tabs,
  .ant-tabs-content,
  .ant-tabs-content-holder,
  .ant-tabs .ant-tabs-top,
  .ant-tabs-content .ant-tabs {
    height: 100%;
  }
`;
export const WaitListService = ({
  setShowFullScreen,
  dataInService,
  dataWaitList,
  configShowColumn,
  isLoading,
  classNameHover,
  setItemDataDrag,
  showFullScreen,
}: Props) => {
  //hook
  const [showTabWaitList, setShowTabWaitList] =
    useState<boolean>(configShowColumn);
  const [indexTab, setIndexTab] = useState<string>("1");
  const [dataWalkinList, setDataWalkinList] = useState<Array<ITixAppt>>([]);
  const [dataApptList, setDataApptList] = useState<Array<ITixAppt>>([]);

  const { TabPane } = Tabs;

  const handleOnChange = (key: string) => {
    setIndexTab(key);
    if (key == "2") {
      setShowTabWaitList(true);
    }
    if (key == "1") {
      setShowTabWaitList(false);
    }
  };
  useEffect(() => {
    const dataWalkinFilter = dataWaitList.filter((item) => item.bookType == 0);
    const dataApptFilter = dataWaitList.filter((item) => item.bookType == 1);
    setDataApptList(dataApptFilter);
    setDataWalkinList(dataWalkinFilter);
  }, [dataWaitList]);
  // classname
  const flexitem =
    "flex w-full overflow-x-scroll content-start flex-col flex-wrap  justify-start items-start ";

  const LoadingItem = () => (
    <>
      <Skeleton
        loading={isLoading}
        className="  !w-[228px] !h-[157px] !mr-[2px] !my-[2px] !ml-[2px]  "
        active={true}
      />
    </>
  );

  return (
    <div className="bg-gray-100 flex  h-full w-full">
      <Col className="h-full">
        <div
          className="bg-white h-10 w-10  border rounded-r-[10px] flex border-gray-400 cursor-pointer absolute z-50 mango-shadow-1 -left-[1px] "
          onClick={() => {
            setShowFullScreen((prev) => ({
              ...prev,
              showRightWaitFull: !showFullScreen.showRightWaitFull,
            }));
          }}
        >
          <img
            src={"/assets/imgs/iconsaloncenter/walkin.svg"}
            alt="error"
            className="h-5 w-5 m-auto"
          />
        </div>
      </Col>
      <Col className="ml-4 w-full  ">
        <ContentTabs className="h-full bg-mango-bg-dark">
          <Tabs
            defaultActiveKey="1"
            onChange={handleOnChange}
            className="relative left-[-15px] customTabPane !pr-0"
            style={{ width: "calc(100% + 10px )" }}
          >
            {/* Wait List  */}

            <TabPane
              tab={
                <h2 className="!mx-4">
                  <span className=" text-xl font-bold mr-2">Wait List</span>
                  <span
                    style={{
                      background:
                        indexTab == "1"
                          ? bgTixAppt("22").bgNumber
                          : "#D1D1D180 " + " 0% 0% no-repeat padding-box",
                      font: "normal normal bold var(--s-12)",
                      // backgroundColor: theme.extend.colors["mango-border-dark"],
                    }}
                    className="text-mango-text-medium rounded-[4px] opacity-80 px-1 "
                  >
                    {dataWaitList.length}
                  </span>
                </h2>
              }
              className={classNameHover}
              key="1"
            >
              {isLoading ? (
                <div
                  className={flexitem}
                  style={{ height: "calc(100% - 0px)" }}
                >
                  {listWaitList.map((index) => (
                    <LoadingItem key={index} />
                  ))}
                </div>
              ) : dataWaitList.length ? (
                <div
                  id="waitlist"
                  className={flexitem}
                  style={{ height: "calc(100% - 0px)" }}
                >
                  {dataWaitList.map((iteminfo, index) => (
                    <ItemAppt
                      setItemDataDrag={setItemDataDrag}
                      key={iteminfo.originalAppointmentID}
                      iteminfo={iteminfo}
                    />
                  ))}
                </div>
              ) : (
                <Fragment />
              )}
            </TabPane>

            <>
              {/* Walk-In */}
              <TabPane
                tab={
                  <h2 className="!mx-4">
                    <span
                      className={
                        "relative font-semibold mr-2 " +
                        (indexTab == "2"
                          ? "text-mango-purple"
                          : "text-mango-text-dark")
                      }
                    >
                      Walk-In
                    </span>
                    <span
                      style={{
                        background:
                          (indexTab == "2"
                            ? bgTixAppt("21").bgNumber
                            : "#D1D1D180 ") + " 0% 0% no-repeat padding-box",
                        font: "normal normal bold var(--s-12)",
                      }}
                      className="text-mango-text-medium rounded-[4px] opacity-80 px-1 "
                    >
                      {dataWalkinList.length}
                    </span>
                  </h2>
                }
                className={classNameHover}
                key="2"
              >
                {isLoading ? (
                  <div
                    className={flexitem}
                    style={{ height: "calc(100% - 0px)" }}
                  >
                    {listWaitList.map((index) => (
                      <LoadingItem key={index} />
                    ))}
                  </div>
                ) : dataWalkinList.length ? (
                  <div
                    className={flexitem}
                    style={{ height: "calc(100% - 0px)" }}
                  >
                    {dataWalkinList.map((iteminfo, index) => (
                      <ItemAppt
                        setItemDataDrag={setItemDataDrag}
                        key={iteminfo.originalAppointmentID}
                        iteminfo={iteminfo}
                      />
                    ))}
                  </div>
                ) : (
                  <Fragment />
                )}
              </TabPane>
              {/* Appt */}
              <TabPane
                tab={
                  <h2 className="!mx-4">
                    <span
                      className={" font-semibold mr-2 "}
                      style={{
                        color:
                          indexTab == "3" ? bgTixAppt("22").bgNumber : "black",
                      }}
                    >
                      Appt
                    </span>
                    <span
                      style={{
                        background:
                          indexTab == "3"
                            ? bgTixAppt("22").bgNumber
                            : " #D1D1D180 " + " 0% 0% no-repeat padding-box",
                        font: "normal normal bold var(--s-12)",
                        // backgroundColor: theme.extend.colors["mango-border-dark"],
                      }}
                      className="text-mango-text-medium rounded-[4px] opacity-80 px-1 "
                    >
                      {dataApptList.length}
                    </span>
                  </h2>
                }
                className={classNameHover}
                key="3"
              >
                {isLoading ? (
                  <div
                    className={flexitem}
                    style={{ height: "calc(100% - 0px)" }}
                  >
                    {listWaitList.map((index) => (
                      <LoadingItem key={index} />
                    ))}
                  </div>
                ) : dataApptList.length ? (
                  <div
                    className={flexitem}
                    style={{ height: "calc(100% - 0px)" }}
                  >
                    {dataApptList.map((iteminfo, index) => (
                      <ItemAppt
                        setItemDataDrag={setItemDataDrag}
                        key={iteminfo.originalAppointmentID}
                        iteminfo={iteminfo}
                      />
                    ))}
                  </div>
                ) : (
                  <Fragment />
                )}
              </TabPane>
            </>
          </Tabs>
        </ContentTabs>
      </Col>
    </div>
  );
};
