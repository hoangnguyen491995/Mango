import { Badge, Button, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { FiSmile } from "react-icons/fi";
import { Tabs } from "antd";
import WaitListAll from "./WaitListAll";
import WaitListWalkIn from "./WaitListWalkIn";
import WaitListAppt from "./WaitListAppt";
import { theme } from "tailwind.config";
import { APIGetTixSalonCenter } from "services/GetTixApptSalonCenter/GetTixAppSalonCenter";
import { useDispatch, useSelector } from "react-redux";
import { WaitlistBooking$ } from "src/redux/selector";
import { WaitListSlice } from "./BookWaitListSlice";

const { TabPane } = Tabs;
export interface IPosts {
  customerType: string;
  customerName: string;
  comments: string;
  appointmentSubject: string;
  startTime: string;
  appointmentStatusID: number;
  groupEmployeeDetail: string;
  bookType: number;
  serviceDate?: string;
  serviceTime?: string;
  checkinTime: string;
  indexNum?: number;
  checkNo: number;
  originalAppointmentID: number;
  customerID: number;
}
const WaitList: React.FC = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [all, setAll] = useState<IPosts[]>([]);
  const [walkIn, setWalkIn] = useState<IPosts[]>([]);
  const [appt, setAppt] = useState<IPosts[]>([]);
  const [keyTab, setKeyTab] = useState(1);
  const allPage: IPosts[] = [];
  const walkInPage: IPosts[] = [];
  const apptPage: IPosts[] = [];
  const dispatch = useDispatch();
  const numberItem = useSelector(WaitlistBooking$);
  const [visible, setVisible] = useState(false);
  const dateWaitList = new APIGetTixSalonCenter();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    const body = {
      Page: 0,
      Quantity: 500,
      RvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
      AppointmentId: "",
      Status: "",
    };
    dateWaitList.GetTixSalonCenter(body).then((res) => {
      if (res.status == 200) {
        setPosts(res.data);
      }
    });
  }, []);
  let numberAll = 0;
  let numberAppt = 0;
  let numberWalkIn = 0;
  useEffect(() => {
    posts.map((post) => {
      if (post.appointmentStatusID == 2) {
        numberAll = numberAll + 1;
        if (post.bookType == 0) {
          numberWalkIn = numberWalkIn + 1;
        } else {
          numberAppt = numberAppt + 1;
        }
      }
      dispatch(
        WaitListSlice.actions.setNumberItem({
          numberAll,
          numberWalkIn,
          numberAppt,
        })
      );
    });
  }, [numberAll, posts]);

  useEffect(() => {
    posts.map((post) => {
      if (post.appointmentStatusID == 2) {
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
          checkNo: post.checkNo,
          originalAppointmentID: post.originalAppointmentID,
          customerID: post.customerID,
        };
        allPage.push(item);
      }
    });
    setAll(allPage);
    posts.map((post) => {
      if (post.appointmentStatusID == 2) {
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
          checkNo: post.checkNo,
          originalAppointmentID: post.originalAppointmentID,
          customerID: post.customerID,
        };
        walkInPage.push(item);
      }
    });
    setWalkIn(walkInPage);
    posts.map((post) => {
      if (post.appointmentStatusID == 2) {
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
          checkNo: post.checkNo,
          originalAppointmentID: post.originalAppointmentID,
          customerID: post.customerID,
        };
        apptPage.push(item);
      }
    });
    setAppt(allPage);
  }, [posts]);

  const onChange = (key) => {
    setKeyTab(key);
  };

  const All = (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <span className="mx-4 w-[26px] font-medium text-base">All</span>
      <Badge
        showZero
        style={{
          marginTop: "5px",
          backgroundColor: `${theme.extend.colors["mango-primary-blue"]}`,
        }}
        size="small"
        count={numberItem.numberAll}
      ></Badge>
    </div>
  );
  const WalkIn = (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <span
        style={{ color: "#8B85CA " }}
        className="w-[60px] font-medium text-base mx-4"
      >
        Walk-in
      </span>
      <Badge
        showZero
        style={{ marginTop: "5px", background: "#8B85CA " }}
        size="small"
        count={numberItem.numberWalkIn}
      ></Badge>
    </div>
  );
  const Appt = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <span
        style={{ color: `${theme.extend.colors["mango-primary-blue"]}` }}
        className="w-[42px] font-medium text-base mx-4"
      >
        Appt
      </span>
      <Badge
        showZero
        style={{
          marginTop: "5px",
          backgroundColor: `${theme.extend.colors["mango-primary-blue"]}`,
        }}
        size="small"
        count={numberItem.numberAppt}
      ></Badge>
    </div>
  );

  return (
    <>
      <div
        onClick={showDrawer}
        style={{
          width: " 55px",
          height: "50px",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
          background: "rgb(67 56 202)",
          border: "none",
          color: "#fff",
        }}
        className="flex flex-col justify-center items-center"
      >
        <FiSmile className="w-[25px] h-[25px]" fontSize="larger" />
        <span>{`(${numberItem.numberAll})`}</span>
      </div>
      <Drawer
        width={"430px"}
        className="font-medium"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <span className="font-bold text-xl">Wait List</span>
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          className="customTabPane"
        >
          <TabPane tab={All} key="1">
            <WaitListAll all={all} />
          </TabPane>
          <TabPane tab={WalkIn} key="2">
            <WaitListWalkIn walkIn={walkIn} />
          </TabPane>
          <TabPane tab={Appt} key="3">
            <WaitListAppt appt={appt} />
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default WaitList;
