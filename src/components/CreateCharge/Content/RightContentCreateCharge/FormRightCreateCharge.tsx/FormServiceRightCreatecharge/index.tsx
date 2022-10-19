import { Badge, Col, Row } from "antd";
import { CgArrowLeft } from "react-icons/cg";
import { HiOutlineSearch } from "react-icons/hi";
import { theme } from "tailwind.config";
import { Tabs } from "antd";
import OpenTicketAll from "./FormServiceAll";
import OpenTicketInService from "./FormServiceInService";
import OpenTicketInWaitList from "./FormServiceWaitList";
import { IPosts } from "src/components/WaitListBookingIconRight/WaitList";
import { useEffect, useState } from "react";
import { APIGetTixSalonCenter } from "services/GetTixApptSalonCenter/GetTixAppSalonCenter";
import { useDispatch, useSelector } from "react-redux";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { CreateCharge$ } from "src/redux/selector";

const { TabPane } = Tabs;
const onChange = (key: string) => {
  console.log(key);
};
function Service() {
  const showForm = useSelector(CreateCharge$);
  const allPage: IPosts[] = [];
  const dateWaitList = new APIGetTixSalonCenter();
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [all, setAll] = useState<IPosts[]>([]);

  useEffect(() => {
    const body = {
      Page: 0,
      Quantity: 500,
      RvcNo: 5,
      AppointmentId: "",
      Status: "",
    };
    dateWaitList.GetTixSalonCenter(body).then((res) => {
      if (res.status == 200) {
        setPosts(res.data);
      }
    });
  }, []);
  useEffect(() => {
    posts.map((post) => {
      const item = {
        customerType: post.customerType,
        customerName: post.customerName,
        comments: post.comments,
        appointmentSubject: post.appointmentSubject,
        startTime: post.startTime,
        appointmentStatusID: post.appointmentStatusID,
        groupEmployeeDetail: post.groupEmployeeDetail,
        bookType: post.bookType,
        serviceDate: post.serviceDate,
        serviceTime: post.serviceTime,
        checkinTime: post.checkinTime,
        indexNum: post.indexNum,
        checkNo: post.checkNo,
        originalAppointmentID: post.originalAppointmentID,
        customerID: post.customerID,
      };
      allPage.push(item);
    });
    setAll(allPage);
  }, [posts]);
  const dispatch = useDispatch();
  const handleShowTech = () => {
    dispatch(CreateChargeSlice.actions.setShowFormRight("tech"));
  };
  const Tab1 = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <span className="font-bold text-base text-[#505050]">
        All
        <Badge
          showZero
          style={{
            marginLeft: "5px",
            backgroundColor: `${theme.extend.colors["mango-primary-blue"]}`,
          }}
          size="small"
          count="1"
        ></Badge>
      </span>
    </div>
  );
  const Tab2 = (
    <div className="w-full">
      <span className=" text-base font-bold text-[#505050]">
        In Service/Pending
        <Badge
          showZero
          style={{
            marginLeft: "5px",
            backgroundColor: `${theme.extend.colors["mango-primary-blue"]}`,
          }}
          size="small"
          count="1"
        ></Badge>
      </span>
    </div>
  );
  const Tab3 = (
    <div className="w-full">
      <span className="font-bold text-base text-[#505050]">
        Wait List
        <Badge
          showZero
          style={{
            marginLeft: "5px",
            backgroundColor: `${theme.extend.colors["mango-primary-blue"]}`,
          }}
          size="small"
          count="5"
        ></Badge>
      </span>
    </div>
  );
  return (
    <div>
      <Row className="mt-2 mx-4">
        <Col span={24}>
          <div className="flex justify-between">
            <div className="flex mt-[8px]" onClick={handleShowTech}>
              <CgArrowLeft
                style={{
                  width: "30px",
                  height: "30px",
                  color: `${theme.extend.colors["mango-gray-5"]}`,
                }}
              />
              <span
                className="mt-[3px] ml-[2px] font-bold"
                style={{
                  color: `${theme.extend.colors["mango-gray-5"]}`,
                }}
              >
                BACK
              </span>
            </div>
            
            <div className="relative">
              <input
                type="text"
                className=" w-[270px] h-[45px] border rounded-md border-slate-400 outline-none placeholder:text-xs"
                placeholder="Search Name/Phone/tix/Index"
              />
              <HiOutlineSearch
                style={{
                  width: "28px",
                  height: "28px",
                  color: `${theme.extend.colors["mango-gray-300"]}`,
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                }}
              />
            </div>
          </div>
        </Col>
        <Col span={24} className="flex w-full justify-between items-center">
          <Tabs defaultActiveKey="1" onChange={onChange} centered>
            <TabPane tab={Tab1} key="1">
              <OpenTicketAll all1={all} />
            </TabPane>
            <TabPane tab={Tab2} key="2">
              <OpenTicketInService all2={all} />
            </TabPane>
            <TabPane tab={Tab3} key="3">
              <OpenTicketInWaitList all3={all} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}
export default Service;
