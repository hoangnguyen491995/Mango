import { Skeleton, Spin, Tabs } from "antd";
import { Badge } from "antd";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import moment from "moment";
import { useEffect, useState } from "react";
import { GetWorkingEmployeeList } from "services/Employees/GetWorkingEmployeeList";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";

import { theme } from "tailwind.config";
import { ITixAppt } from "../../../DataStructures";

import ListTechSalonCenter from "./ListItemTechSalonCenter";

const { TabPane } = Tabs;

const onChange = (key: string) => {};

interface Props {
  iteminfo: ITixAppt;
  setIsChangeDataClient: Function;
  isChangeDataClient: boolean;
}
export const LoadingComponent = () => (
  <div className="!h-[150px] relative !w-[110px] rounded-md mt-7 mb-4 flex justify-center items-center cursor-pointer select-none mr-2">
    <SkeletonAvatar
      className=" absolute inset-x-0 left-4 -top-7 "
      style={{
        width: "72px",
        height: "72px",
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
const ListTechnicians = ({
  iteminfo,
  setIsChangeDataClient,
  isChangeDataClient,
}: Props) => {
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

  const listItem = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {loading ? (
        <div className="pt-16 flex   w-full overflow-scroll content-start flex-wrap flex-col  justify-start items-start h-[620px] pl-6">
          {listItem.map((index) => (
            <LoadingComponent key={index} />
          ))}
        </div>
      ) : (
        // <Tabs
        //   defaultActiveKey="1"
        //   // onChange={onChange}
        //   centered
        //   // className="customTabPane"
        // >
          <ListTechSalonCenter
            itemData={dataInforTech}
            iteminfo={iteminfo}
            setIsChangeDataClient={setIsChangeDataClient}
            isChangeDataClient={isChangeDataClient}
          />
        // </Tabs>
      )}
    </>
  );
};
export default ListTechnicians;
