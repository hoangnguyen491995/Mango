import { Badge, Col, Row, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CreateCharge$ } from "src/redux/selector";
import { CreateChargeSlice } from "../../../../CreateChargeSlice";
import { theme } from "tailwind.config";
import { memo, useEffect, useState } from "react";
import { IInforTech } from "src/components/SalonCenter/LeftContentSalonCenter/TabLeftContentSalonCenter/TechTabLeftSalonCenter";
import { API_MANGO_IMG, API_MANGO_TECH_IMG } from "src/utils/constant";
import ModalMore from "./ModalMore";
import TotalPrice from "./FormTotalPrice";
import moment from "moment";
import { AddWaitEmployee } from "services/CreateCharge/AddWaitEmployee";
import Ticket from "./FormTicket";
import ItemInfoTechRight from "src/components/AddNewTix/Content/Component/RightContent/ItemInfoTechRight";
import { GetWorkingEmployeeList } from "services/Employees/GetWorkingEmployeeList";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";

const { TabPane } = Tabs;
const onChange = (key: string) => {};
function TechRightCreateCharge({ dataCheckOut }) {
  const showForm = useSelector(CreateCharge$);

  const dispatch = useDispatch();
  const [dataInforTech, setDataInforTech] = useState<Array<IInforTech>>([]);

  const getInfoTech = new GetWorkingEmployeeList();

  const handleSetTickets = () => {
    dispatch(CreateChargeSlice.actions.setShowFormRight("service"));
  };

  useEffect(() => {
    const date = moment().format("MM-DD-YYYY");

    getInfoTech
      .getWorkingEmployeeList(
        date,
        Number(process.env.NEXT_PUBLIC_RVC_NO),
        1,
        false
      )
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.techs.filter(
            (item: ITechSalonCenter) => item.employeeID > 9999
          );
          setDataInforTech(data);
        }
      })
      .catch((e) => {});
  }, []);

  //https://uat-manage.enrichcous.com:4443/Content/mango/camera.svg
  //https://uat-manage.enrichcous.com:4443/Upload/employee/Content/mango/camera.svg
  let ListTech = [
    {
      imageFileName: "Content/mango/camera.svg",
      backGroundColor: "#fff",
      employeeID: 0,
      lockIn: "0",
      nickName: "NON TECH",
      borderColor: theme.extend.colors["mango-primary-green"],
    },
    ...dataInforTech,
  ];

  const All = <div className="font-bold text-base text-[#505050]">All</div>;
  const ClockedIN = (
    <div className="font-bold text-base text-[#505050]">Clocked-In</div>
  );
  const ClockedOut = (
    <div className="font-bold text-base text-[#505050]">Clocked-Out</div>
  );
  const dataClockIn = ListTech.filter((item: any) => {
    // console.log(item);
    return (
      (item.isLogIn == true && item.isLogOut == false) || item.employeeID === 0
    );
  });
  const dataClockOut = ListTech.filter(
    (item: any) =>
      (item.isLogIn == true && item.isLogOut == true) ||
      (item.isLogIn == false && item.isLogOut == false)
  );
  let rvcNo = 5;
  let isStart = false;
  const addWaitEmployee = new AddWaitEmployee();
  const handleAddTech = (employeeID: number) => {
    const fetchData = async () => {
      addWaitEmployee
        .addWaitEmployee(dataCheckOut, employeeID, rvcNo, isStart)
        .then((res) => {
          dispatch(CreateChargeSlice.actions.showLeftClearTech("cleartech"));
          dispatch(
            CreateChargeSlice.actions.showLeftAddTech({
              showform: "AddTechLeft",
              Id: Math.random(),
              IdRender: Math.random(),
            })
          );
        });
    };

    fetchData().catch(console.error);
  };

  return (
    <div className="h-full ">
      <Row>
        <Col span={24} className="">
          <div className="flex justify-between mx-4 mt-2">
            <div
              onClick={handleSetTickets}
              className="w-26 h-12 border rounded-md border-slate-500 flex items-center px-2"
            >
              <div className="flex flex-col px-[3px]">
                <span
                  className="text-xs font-bold"
                  style={{ color: `${theme.extend.colors["mango-gray-5"]}` }}
                >
                  OPENED
                </span>
                <span
                  className="text-xs font-bold"
                  style={{ color: `${theme.extend.colors["mango-gray-5"]}` }}
                >
                  TICKETS
                </span>
              </div>
              <div
                className="w-6 h-6 flex justify-center items-center border rounded-md ml-[2px]"
                style={{
                  background: `${theme.extend.colors["mango-red-bg"]}`,
                }}
              >
                <span
                  className="text-xs font-bold"
                  style={{
                    color: `${theme.extend.colors["mango-primary-red"]}`,
                  }}
                >
                  17
                </span>
              </div>
            </div>
            <div className="flex mr-4 ">
              <div className="flex flex-col justify-end items-center font-bold text-slate-500">
                <img
                  src="/assets/imgs/check_in.svg"
                  className="w-6 h-8 shadow-sm "
                />
                <span style={{ fontSize: "9px", marginTop: "3px" }}>
                  check In
                </span>
              </div>
              <div className="flex flex-col justify-end items-center px-2 mx-2 text-slate-500 font-bold">
                <img src="/assets/imgs/Print.png" className="w-8 h-8" />
                <span style={{ fontSize: "9px", marginTop: "3px" }}>Print</span>
              </div>
              <div className=" font-bold text-slate-500 flex flex-col justify-center items-center cursor-pointer">
                <div>
                  <ModalMore />
                </div>
                <span style={{ fontSize: "9px" }}>More</span>
              </div>
            </div>
          </div>
        </Col>
        <div className="h-full w-full">
          {/* ShowForm */}
          {showForm.showFormRightTech == 1000 && <TotalPrice />}
          {showForm.showFormRightTech == 5 && (
            <Ticket
              props={{
                Id: showForm.IDTechItem.item,
                categoryName: showForm.IDTechItem.CategoryName,
              }}
            />
          )}
          {showForm.showFormRightTech == 0 && (
            <Col span={24} className="flex ">
              <Tabs defaultActiveKey="1" onChange={onChange} centered>
                {/* All */}
                <TabPane
                  tab={All}
                  key="1"
                  className=" flex w-full min-h-[400px] h-[550px] overflow-x-scroll content-start flex-col flex-wrap justify-start items-start"
                >
                  {ListTech.map((post: any, index) => {
                    return (
                      <ItemInfoTechRight
                        dataCheckOut={dataCheckOut}
                        post={post}
                        key={post.employeeID}
                      />
                    );
                  })}
                </TabPane>
                {/* Clocked-In */}
                <TabPane
                  tab={ClockedIN}
                  key="2"
                  className="flex h-[600px] w-full overflow-x-scroll content-start flex-col flex-wrap justify-start items-start "
                >
                  {dataClockIn.map((post: any, index) => {
                    return (
                      <ItemInfoTechRight
                        dataCheckOut={dataCheckOut}
                        post={post}
                        key={post.employeeID}
                      />
                    );
                  })}
                </TabPane>
                {/* Clocked-Out */}

                <TabPane
                  tab={ClockedOut}
                  key="3"
                  className=" flex w-full min-h-[400px] h-[550px] overflow-x-scroll content-start flex-col flex-wrap justify-start items-start"
                >
                  {dataClockOut.map((post: any, index) => {
                    return (
                      <ItemInfoTechRight
                        dataCheckOut={dataCheckOut}
                        post={post}
                        key={post.employeeID}
                      />
                    );
                  })}
                </TabPane>
              </Tabs>
            </Col>
          )}
        </div>
      </Row>
    </div>
  );
}
export default memo(TechRightCreateCharge);
