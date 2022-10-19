import { Skeleton, Spin, Tabs } from "antd";
import { Badge } from "antd";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import moment from "moment";
import { useEffect, useState } from "react";
import { GetWorkingEmployeeList } from "services/Employees/GetWorkingEmployeeList";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";

import { theme } from "tailwind.config";
import { IItemDataTix } from "..";
import { ITixAppt } from "../../DataStructures";
import { IListApptDetail } from "../DataStructures";
import ListTechSalonCenter from "./ListItemTechSalonCenter";

const { TabPane } = Tabs;

const onChange = (key: string) => {};

interface Props {
  itemDataTix: IItemDataTix;
}
const listItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const flexitem =
  "flex   w-full overflow-scroll content-start flex-wrap flex-col  justify-start items-start h-[600px] pl-6";
const TabLeftContentSalonCenter = ({ itemDataTix }: Props) => {
  const [dataInforTech, setDataInforTech] = useState<Array<ITechSalonCenter>>(
    []
  );
  const getInfoTech = new GetWorkingEmployeeList();
  const [dataReady, setDataReady] = useState<Array<ITechSalonCenter>>([]);
  const [dataBusy, setDataBusy] = useState<Array<ITechSalonCenter>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const date = moment().format("MM-DD-YYYY");
    setLoading(true);
    getInfoTech
      .getWorkingEmployeeList(date, 0, 1, false)
      .then((res) => {
        if (res.status == 200) {
          const data: Array<ITechSalonCenter> = res.data.techs.filter(
            (item) => item.employeeID > 9999
          );

          const dataClockIn = data.filter(
            (item: ITechSalonCenter) =>
              item.isLogIn == true && item.isLogOut == false
          );

          setDataInforTech(dataClockIn);

          const dataReady = dataClockIn.filter(
            (item: ITechSalonCenter) => item.isServing == 0
          );

          const dataBusy = dataClockIn.filter(
            (item: ITechSalonCenter) => item.isServing == 1
          );
          const dataClockOut = data.filter(
            (item: ITechSalonCenter) =>
              (item.isLogIn == true && item.isLogOut == true) ||
              (item.isLogIn == false && item.isLogOut == false)
          );

          setDataReady(dataReady);
          setDataBusy(dataBusy);

          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  const Tech = (
    <div>
      <h2 className="!mx-2 w-[120px] font-bold text-xl text-center">
        Tech
        <Badge
          style={{ backgroundColor: theme.extend.colors["mango-primary-blue"] }}
          offset={[5, 0]}
          count={dataInforTech.length}
        ></Badge>
      </h2>
    </div>
  );
  const Ready = (
    <div>
      <h2 className="!mx-4 w-[120px] font-medium text-base text-center text-mango-primary-green">
        Ready
        <Badge
          style={{
            backgroundColor: theme.extend.colors["mango-primary-green"],
          }}
          offset={[5, 0]}
          count={dataReady.length}
        ></Badge>
      </h2>
    </div>
  );
  const Busy = (
    <div>
      <h2 className="!mx-4 w-[120px] font-medium text-base text-center text-mango-primary-purple">
        Busy
        <Badge
          style={{
            backgroundColor: theme.extend.colors["mango-primary-purple"],
          }}
          offset={[5, 0]}
          count={dataBusy.length}
        ></Badge>
      </h2>
    </div>
  );
  const LoadingComponent = () => (
    <div className="!h-[150px] relative !w-[110px] rounded-md mt-10 mb-4 flex justify-center items-center cursor-pointer select-none mr-2  ">
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

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        centered
        className="customTabPane"
      >
        <TabPane tab={Tech} key="1">
          {loading ? (
            <div className={flexitem}>
              {listItem.map((index) => (
                <LoadingComponent key={index} />
              ))}
            </div>
          ) : (
            <ListTechSalonCenter
              itemData={dataInforTech}
              itemDataTix={itemDataTix}
            />
          )}
        </TabPane>
        <TabPane tab={Ready} key="2">
          {" "}
          {loading ? (
            <div
              className={flexitem}
              style={{
                width: "calc(100% + 0px)",
                height: "calc(100vh - 150px)",
              }}
            >
              {listItem.map((index) => (
                <LoadingComponent key={index} />
              ))}
            </div>
          ) : (
            <ListTechSalonCenter
              itemData={dataReady}
              itemDataTix={itemDataTix}
            />
          )}
        </TabPane>
        <TabPane tab={Busy} key="3">
          {" "}
          {loading ? (
            <div
              className={flexitem}
              style={{
                width: "calc(100% + 0px)",
                height: "calc(100vh - 150px)",
              }}
            >
              {listItem.map((index) => (
                <LoadingComponent key={index} />
              ))}
            </div>
          ) : (
            <ListTechSalonCenter
              itemData={dataBusy}
              itemDataTix={itemDataTix}
            />
          )}
        </TabPane>
      </Tabs>
    </>
  );
};
export default TabLeftContentSalonCenter;
