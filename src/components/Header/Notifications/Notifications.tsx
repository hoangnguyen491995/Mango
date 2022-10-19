import React, { useEffect, useState } from "react";
import { Badge, Button, Popover, Row } from "antd";
import { IoNotificationsOutline } from "react-icons/io5";
import ContentNotification from "./ContentNotification";
import { NotifyOnlineBooking } from "services/Appointments/NotifyOnlineBooking";
import { INotify } from "../DataStructures/DataInterfaces";
import moment from "moment";

const emtryMenu = (
  <div className="flex justify-center">
    <div className="block">
      <img
        className="m-auto w-14 h-14  "
        src="/assets/imgs/telescope.svg"
        alt="Rounded avatar"
      ></img>

      <p className="text-xs text-gray-400"> We didn't find any ticket. </p>
    </div>
  </div>
);
const Notifications = () => {
  const [isNotification, setNotification] = useState<boolean>();
  const [statusNotification, setStatusNotification] = useState();
  const [dataNotify, setDataNotify] = useState<INotify[]>([]);
  const [isData, setIsData] = useState<boolean>(false);

  const notifyOnlineBooking = new NotifyOnlineBooking();
  const [reFetchData, setReFetchData] = useState<boolean>(false)

  
  useEffect(() => {
    setNotification(isData);
  }, [isData]);

  useEffect(() => {
    dataNotify.length > 0 ? setIsData(true) : setIsData(false);
  }, [dataNotify]);

  useEffect(() => {
    try {
      notifyOnlineBooking
        .notifyOnlineBooking(process.env.NEXT_PUBLIC_RVC_NO, 20)
        .then((res) => {
          if (res.status === 200) {
            setDataNotify(res.data);
            setReFetchData(false);
            
          }
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  }, [reFetchData]);
  const checkDeclineConfirm = createDate => {
    let currentDateStore = new Date();
    createDate = new Date(createDate);
    return currentDateStore.getTime() < createDate.getTime();
  }

  const menu = (
    <div className="space-y-2 pl-2 w-full h-[250px] overflow-y-auto ">
      {dataNotify.map((data, index) => {
        return  (
          <ContentNotification
            key={index}
            data={data}
            setReFetchData = {setReFetchData}
          
          />
        )
   
      })}
    </div>
  );
  const Notification = (
    <div className="w-[600px] text-2xl verflow-y-scroll  p-1 ">
      {isNotification ? menu : emtryMenu}
      <span className="hidden">{reFetchData}</span>
    </div>
  );
  const titleNotification = (
    <div className="ml-3 text-xl  font-bold">Notifications</div>
  );

  return (
    <Popover
      placement="bottom"
      title={titleNotification}
      content={Notification}
      trigger="click"
    >
      <div className=" cursor-pointer animate__animated animate__wobble animate__faster animate__repeat-2 mt-5">
        <IoNotificationsOutline color="white" className="w-8 h-8 mb-5" />
         <div className="count-notification"> 
        <span className="bell-num">{dataNotify.length}</span>
        </div>
       
      </div>
    </Popover>
  );
};

export default Notifications;
