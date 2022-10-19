import { Skeleton, Tabs } from "antd";
import { Badge } from "antd";
import { useEffect, useState } from "react";
import TechTabLeftSalonCenter, { IInforTech } from "./TechTabLeftSalonCenter";

import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";
import { GetWorkingEmployeeList } from "services/Employees/GetWorkingEmployeeList";
import moment from "moment";
import { theme } from "tailwind.config";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import { useSelector } from "react-redux";
import { isChangeDataTechSalonCenter$ } from "src/redux/selector";
import styled from "styled-components";

const { TabPane } = Tabs;
interface Props {
  setHeight: Function;
  height: boolean;
  isReadyBusy: boolean;
  valueSearch: string;
  dataInforTech: Array<ITechSalonCenter>;
  dataBusy: Array<ITechSalonCenter>;
  dataReady: Array<ITechSalonCenter>;
}

const TabBorder = styled.div`
  ::after {
    content: "";
    position: absolute;
    width: 1px;
    height: var(--px-18);
    background: #707070 0% 0% no-repeat padding-box;
    right: -5px;
  }
`;
const flexitem =
  "flex  overflow-x-scroll content-start flex-col flex-wrap  justify-start items-start pt-3";

const TabLeftContentSalonCenter = ({
  isReadyBusy,
  setHeight,
  height,
  valueSearch,
  dataInforTech,
  dataBusy,
  dataReady,
}: Props) => {
  const [indexTab, setIndexTab] = useState<string>("1");
  const [loading, setLoading] = useState(false);
  const Tech = (
    <TabBorder>
      <span
        className="w-[120px] text-[#0F001A] mr-2"
        style={{ font: "normal normal 600 var(--s-20)" }}
      >
        Tech
      </span>
      <span
        style={{
          background:
            (indexTab == "1" ? "#00BED680" : "#D1D1D180") +
            " 0% 0% no-repeat padding-box",
          font: "normal normal bold var(--s-12)",
          // backgroundColor: theme.extend.colors["mango-border-dark"],
        }}
        className="text-mango-text-medium rounded-[4px] opacity-80 px-1 "
      >
        {dataInforTech.length}
      </span>
    </TabBorder>
  );
  const Ready = (
    <TabBorder>
      <span
        className="w-[120px] text-[#0F001A] mr-2"
        style={{
          font: "normal normal 600 var(--s-14)",
          color:
            indexTab == "2"
              ? "#94D500"
              : theme.extend.colors["mango-text-dark"],
        }}
      >
        {isReadyBusy ? "Ready" : "Clock In"}
      </span>
      <span
        style={{
          background:
            (indexTab == "2" ? "#94D500 " : "#D1D1D180") +
            " 0% 0% no-repeat padding-box",
          font: "normal normal bold var(--s-12)",
        }}
        className="text-mango-text-medium rounded-[4px] opacity-80 px-1 "
      >
        {dataReady.length}
      </span>
    </TabBorder>
  );
  const Busy = (
    <div>
      <span
        className="w-[120px] text-[#0F001A] mr-2"
        style={{ font: "normal normal 600 var(--s-14)" }}
      >
        {isReadyBusy ? "Busy" : "Clock Out"}
      </span>
      <span
        style={{
          background: "#D1D1D180 0% 0% no-repeat padding-box",
          font: "normal normal bold var(--s-12)",
          // backgroundColor: theme.extend.colors["mango-border-dark"],
        }}
        className="text-mango-text-medium rounded-[4px] opacity-80 px-1 "
      >
        {dataBusy.length}
      </span>
    </div>
  );

  const LoadingComponent = () => (
    <div className="!h-[170px] relative !w-[110px] rounded-md mt-4 mb-4 flex justify-center items-center cursor-pointer select-none mr-2  ">
      <SkeletonAvatar
        className=" absolute inset-x-0 left-0 -top-7 "
        style={{
          width: "80px",
          height: "80px",
        }}
      />
      <Skeleton
        loading={true}
        className="!w-4/5 mt-14"
        active={true}
        title={false}
        paragraph={{ width: "100%", rows: 3 }}
      />
    </div>
  );
  const onChange = (key: string) => {
    setIndexTab(key);
  };
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      className="w-full h-full customTabPane "
    >
      <TabPane
        tab={Tech}
        key="1"
        className="absolute left-[-0px] h-full  "
        // style={{ width: "calc(100% + 60px)" }}
      >
        {loading ? (
          <div
            className={flexitem}
            style={{ width: "calc(100% + 0px)", height: "calc(100vh - 150px)" }}
          >
            {[...Array(16)].map((index) => (
              <LoadingComponent key={index} />
            ))}
          </div>
        ) : (
          <TechTabLeftSalonCenter
            dataItem={dataInforTech}
            setHeight={setHeight}
            height={height}
          />
        )}
      </TabPane>
      <TabPane
        tab={Ready}
        key="2"
        className="absolute left-[-0px] h-full  "
        // style={{ width: "calc(100% + 60px)" }}
      >
        {" "}
        {loading ? (
          <div
            className={flexitem}
            style={{ width: "calc(100% + 0px)", height: "calc(100vh - 150px)" }}
          >
            {[...Array(16)].map((index) => (
              <LoadingComponent key={index} />
            ))}
          </div>
        ) : (
          <TechTabLeftSalonCenter
            dataItem={dataReady}
            setHeight={setHeight}
            height={height}
          />
        )}
      </TabPane>
      <TabPane
        tab={Busy}
        key="3"
        className="absolute left-[-0px] h-full  "
        // style={{ width: "calc(100% + 60px)" }}
      >
        {" "}
        {loading ? (
          <div
            className={flexitem}
            style={{ width: "calc(100% + 0px)", height: "calc(100vh - 150px)" }}
          >
            {[...Array(16)].map((index) => (
              <LoadingComponent key={index} />
            ))}
          </div>
        ) : (
          <TechTabLeftSalonCenter
            dataItem={dataBusy}
            setHeight={setHeight}
            height={height}
          />
        )}
      </TabPane>
    </Tabs>
  );
};
export default TabLeftContentSalonCenter;
