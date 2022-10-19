// // @flow
// import { Button, Col, List, Row } from "antd";
// import Item from "antd/lib/list/Item";
// import moment from "moment";
// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { DeleteVoidItem } from "services/CreateCharge/DeleteVoidItem";
// import { GetTicketDetailForCheckout } from "services/CreateCharge/GetTicketDetailForCheckout";
// import { DeleteListItem } from "services/CreateCharge/VoidListItemByEmployee";
// import { ItemService } from "src/components/SalonCenter/SelectTechServiceAppt/ItemService";
// import { currencyFormat } from "src/helper/General";
// import { useAppSelector } from "src/redux/hook";
// import { theme } from "tailwind.config";
// import {
//   setApptId,
//   setIdSelectClient,
//   setIdSelectTech,
//   setIndexAppt,
//   setIndexTech,
//   setIsChangeData,
//   setListItemApptTickets,
// } from "../../createcharge-slice";
// import { CreateChargeSlice } from "../../CreateChargeSlice";
// import {
//   IGetTicketDetailForCheckout,
//   ListTicket,
//   ListTicketDetail,
//   Ticket,
// } from "../../InterfaceCreateCharge";
// import ModalChangePriceRight from "../RightContentCreateCharge/FormRightCreateCharge.tsx/FormServiceRightCreatecharge/ModalChangePriceRight";
// import ModalChangePriceLeft from "./FormLeftCreateCharge/ModalChangePriceLeft";

// export const ItemApptCreateCharge = () => {
//   const [listItemAppt, setListItemAppt] =
//     useState<IGetTicketDetailForCheckout>();
//   const dispatch = useDispatch();
//   const getTicketDetailForCheckout = new GetTicketDetailForCheckout();
//   const isListItemTickets = useAppSelector(
//     (state) => state.createCharge.isListItemTickets
//   );
//   const redux = useAppSelector((state) => state.createCharge);
//   const checkNoTix = useAppSelector((state) => state.createCharge.checkNo);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const apptId = useAppSelector((state) => state.createCharge.apptId);
//   const indexAppt = useAppSelector((state) => state.createCharge.indexAppt);
//   const [indexItemService, setIndexItemService] = useState<number>(0);
//   const apideleteVoidItem = new DeleteVoidItem();
//   const apiDeleteListItem = new DeleteListItem();
//   const isChangeData = useAppSelector(
//     (state) => state.createCharge.isChangeData
//   );
//   useEffect(() => {
//     if (apptId && checkNoTix)
//       getTicketDetailForCheckout
//         .getTicketDetailForCheckout(apptId, checkNoTix)
//         .then((res) => {
//           if (res.status == 200) {
//             setListItemAppt(res.data);
//             dispatch(
//               setIdSelectClient(res.data?.model.listTicket[0].customerID)
//             );
//             // dispatch(
//             //   setIdSelectClient(res.data?.model.listTicket[0].customerID)
//             // );
//           }
//         });
//   }, [isChangeData]); //isChangeData,checkNoTix]

//   const handleVoidItemService = (itemService: Ticket) => {
//     apideleteVoidItem
//       .deleteVoidItem(itemService.orgTrnSeq + "/", itemService.checkNo)
//       .then((res) => {
//         if (res.status == 200) {
//           dispatch(setIsChangeData());
//           // dispatch(
//           //   CreateChargeSlice.actions.showLeftAddTech({
//           //     showform: "AddTechLeft",
//           //     IdRender: Math.random(),
//           //   })
//           // );
//         }
//       });
//   };
//   const handleVoidListItemService = (itemService: ListTicketDetail) => {
//     const param = {
//       rvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
//       employeeID: itemService.employeeId,
//       IDcheckNo: checkNoTix,
//       ApptID: apptId,
//     };
//     apiDeleteListItem
//       .deleteListItem(
//         param.rvcNo,
//         param.employeeID,
//         param.IDcheckNo,
//         param.ApptID
//       )
//       .then((res) => {
//         if (res.status == 200) {
//           dispatch(setIsChangeData());
//           // dispatch(
//           //   CreateChargeSlice.actions.showLeftAddTech({
//           //     showform: "AddTechLeft",
//           //     IdRender: Math.random(),
//           //   })
//           // );
//         }
//       });
//   };
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [valueTime, setValueTime] = useState<string>("");
//   const handleShowModal = () => {
//     // console.log("isModalVisible", isModalVisible);
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setShowModal((pre) => !pre);
//   };

//   const handleCancel = () => {
//     setShowModal((pre) => !pre);
//   };
//   // console.log(
//   //   "listItemAppt?.model.newFormatListTickets",
//   //   listItemAppt?.model?.newFormatListTickets[0]?.listTicketDetail[0]?.tickets
//   // );
//   console.log(
//     "🚀 ~ file: ItemApptCreateCharge.tsx ~ line 39 ~ ItemApptCreateCharge ~ redux",
//     redux
//   );

//   return (
//     <div className="h-3/4">
//       <Row className="p-4">
//         <Col span={12}>
//           <div className="flex justify-start ">
//             <span className="mr-[2px] 2xl:text-[16px] xl:text-[16px] md:text-[14px] text-[12px] mt-[5px]">
//               Opened By
//             </span>
//             <span className="text-sm  ml-[3px]">
//               <Button
//                 style={{ borderRadius: "6px" }}
//                 className=""
//                 onClick={() => {
//                   dispatch(CreateChargeSlice.actions.showFormRightTech(0));
//                 }}
//               >
//                 <span className=" 2xl:text-[16px] xl:text-[16px] md:text-[14px] text-[12px] ">
//                   {listItemAppt?.techName || "NEXT AVAILABLE"}
//                 </span>
//               </Button>
//             </span>
//           </div>
//         </Col>
//         <Col span={12}>
//           <div className="justify-end flex">
//             <span
//               className={` mr-[5px]  2xl:text-[16px] xl:text-[15px] md:text-[14px] text-[12px] text-[#505050]`}
//             >
//               Date{" "}
//             </span>
//             <span
//               className={`font-bold mr-[8px] 2xl:text-[16px] xl:text-[15px] md:text-[14px] text-[12px] text-[#505050]`}
//             >
//               {moment().format("L")}
//             </span>
//             <span
//               className={`mr-[5px] 2xl:text-[16px] xl:text-[15px] md:text-[14px] text-[12px] text-[#505050]`}
//             >
//               Time
//             </span>
//             <span
//               className={`font-bold 2xl:text-[16px] xl:text-[15px] md:text-[14px] text-[12px] text-[#505050]`}
//             >
//               {" "}
//               {moment().format("LT")}
//             </span>
//           </div>
//         </Col>
//       </Row>
//       {/* List Group Appt */}
//       <List
//         dataSource={listItemAppt?.model.newFormatListTickets}
//         className="!px-4 overflow-scroll "
//         style={{ height: "calc(100vh - 420px)" }}
//         renderItem={(itemAppt, indexItemAppt) => (
//           <div
//             onClick={() => {
//               dispatch(setIndexAppt(indexItemAppt));
//               dispatch(setApptId(itemAppt.originalAppointmentID));
//             }}
//           >
//             {/* Add Client */}
//             <div className="flex justify-center cursor-pointer ">
//               <Row
//                 className={
//                   " w-full " +
//                   (indexItemAppt == indexAppt
//                     ? "bg-mango-primary-blue text-white "
//                     : "bg-slate-200  text-black")
//                 }
//               >
//                 <Col
//                   span={12}
//                   className={`flex justify-start ml-4 2xl:text-[16px] xl:text-[16px] md:text-[14px] text-[12px] py-2`}
//                 >
//                   <span className=" 2xl:text-[18px] xl:text-[13px] text-[12px] font-bold  mr-2  ">
//                     {itemAppt.customerName || "Add Client"}
//                   </span>

//                   <span className="2xl:text-[18px] xl:text-[13px] text-[12px]">
//                     #{itemAppt.originalAppointmentID}
//                   </span>
//                 </Col>
//                 <Col span={6}></Col>
//                 <Col></Col>
//               </Row>
//             </div>

//             {/*List  Item Appt   */}

//             {itemAppt.listTicketDetail.length >= 0 ? (
//               <List
//                 className="flex-1 overflow-auto max-h-[300px] "
//                 bordered={false}
//               >
//                 {itemAppt.listTicketDetail.map(
//                   (itemDetailAppt: ListTicketDetail, indexTicket) => (
//                     <Item
//                       onClick={() => {
//                         setIndexItemService(indexTicket),
//                           dispatch(setIndexTech(indexTicket)),
//                           dispatch(setIdSelectTech(itemDetailAppt.employeeId));
//                       }}
//                       className={
//                         "flex flex-wrap  cursor-pointer select-none  !border-b !border-mango-border-dark" +
//                         (indexItemService == indexTicket
//                           ? " !bg-mango-bg-dark"
//                           : " !bg-white")
//                       }
//                     >
//                       {/* Add Tech */}

//                       <Row className="basis-full  flex flex-row ">
//                         <Col span={24}>
//                           <div className=" flex">
//                             <img
//                               onClick={() =>
//                                 handleVoidListItemService(itemDetailAppt)
//                               }
//                               src="/assets/imgs/New24px-cancel-service-01.svg"
//                               className="h-6 ml-2"
//                             />
//                             <span
//                               onClick={() => {
//                                 dispatch(
//                                   CreateChargeSlice.actions.setShowFormRight(
//                                     "tech"
//                                   )
//                                 );
//                                 dispatch(
//                                   CreateChargeSlice.actions.showFormRightTech(0)
//                                 );
//                               }}
//                               className={
//                                 "text-lg ml-6 font-bold 2xl:text-[18px] xl:text-[15px] md:text-[14px] text-[12px] cursor-pointer" +
//                                 (itemDetailAppt.tickets[0].employeeID > 9999
//                                   ? " text-black "
//                                   : " text-mango-primary-blue")
//                               }
//                             >
//                               {itemDetailAppt.tickets[0].employeeID > 9999
//                                 ? itemDetailAppt.tickets[0].employeeName.toUpperCase()
//                                 : "ADD TECH"}
//                             </span>
//                             {/* {itemDetailAppt.tickets[0].employeeID > 9999 && (
//                               <>
//                               <img
//                                 src={
//                                   "/assets/imgs/" +
//                                   (itemDetailAppt.tickets[0].isRequestTech
//                                     ? "heart.svg"
//                                     : "heartDisable.svg")

//                                 }
//                               />
//                               <span>
//                                 {itemDetailAppt.tickets[0].employeeID > 9999
//                                   ? itemDetailAppt.tickets[0].employeeName.toUpperCase()
//                                   : "ADD TECH"}
//                               </span></>)} */}
//                               {itemDetailAppt.tickets[0].employeeID > 9999 && (
//                                 <>
//                                 <img
//                                   src={
//                                     "/assets/imgs/" +
//                                     (itemDetailAppt.tickets[0].isRequestTech
//                                       ? "heart.svg"
//                                       : "heartDisable.svg")
//                                   }
//                                   className="w-6 h-6   !p-0 !ml-3 "
//                                 />
//                                 <span>
//                                 {itemDetailAppt.tickets[0].employeeID > 9999
//                                   ? itemDetailAppt.tickets[0].employeeName.toUpperCase()
//                                   : "ADD TECH"}
//                               </span>
//                               </>
//                               )}
//                             {/* </div> */}
//                             {itemDetailAppt.tickets[0].orgAppointment ==
//                               null && (
//                               <button className="px-[10px] py-[8px] rounded-md ml-10 bg-mango-primary-green hover:opacity-80">
//                                 <span className="text-white text-[18px]">
//                                   ADD SERVICE
//                                 </span>
//                               </button>
//                             )}
//                           </div>
//                         </Col>
//                       </Row>
//                       {/* List Item Service  */}
//                       <div className="basis-full flex flex-row pr-4">
//                         {itemDetailAppt.tickets.length > 0 && (
//                           <Row className="w-full ">
//                             {itemDetailAppt.tickets
//                               .filter((item) => item.orgAppointment != null)
//                               .map((itemService, indexItem) => {
//                                 return (
//                                   <div
//                                     className={
//                                       "hover:!bg-yellow-100 w-full flex h-[50px] "
//                                       //  +
//                                       // (indexItem === tixCT.indexItemService &&
//                                       //   itemTicket.employeeID === tixCT.idTech &&
//                                       //   " !bg-yellow-100")
//                                     }
//                                     key={indexItem}
//                                   >
//                                     <Col span={2} className="py-2 w-full ">
//                                       <Button
//                                         danger
//                                         size="small"
//                                         type="text"
//                                         className="hover:!bg-orange-400 hover:!text-white"
//                                         onClick={() =>
//                                           handleVoidItemService(itemService)
//                                         }
//                                       >
//                                       <p>
//                                         {Number(itemService.duration)}m
//                                       </p>
//                                       </Button>

//                                   </Col>
//                                   <Col
//                                     span={6}
//                                     className="text-right py-3 text-xs font-bold"
//                                   >
//                                     {/* <p onClick={handleShowModal}>
//                                       $
//                                       {currencyFormat(
//                                         itemService.itemPrice || 0
//                                       )}
//                                     </p> */}

//                                     <ModalChangePriceLeft
//                                       props={itemService?.itemPrice}
//                                     />

//                                     {itemService.childTicket && (

//                                         <p className="text-mango-primary-orange text-xs font-semibold !m-0 !p-0 h-6  text-right ">
//                                           {currencyFormat(
//                                             itemService.childTicket.itemPrice ||
//                                               0
//                                           )}
//                                         </p>
//                                       )}
//                                     </Col>
//                                   </div>
//                                 );
//                               })}
//                           </Row>
//                         )}
//                       </div>
//                     </Item>
//                   )
//                 )}
//               </List>
//             ) : (
//               <Row className="mt-1  ">
//                 <Col span={24}>
//                   <div className=" flex justify-start">
//                     <span
//                       onClick={() => {
//                         dispatch(
//                           CreateChargeSlice.actions.setShowFormRight("tech")
//                         );
//                         dispatch(
//                           CreateChargeSlice.actions.showFormRightTech(0)
//                         );
//                       }}
//                       style={{
//                         color: `${theme.extend.colors["mango-primary-blue"]}`,
//                       }}
//                       className="text-lg ml-7 font-semibold 2xl:text-[18px] xl:text-[15px] md:text-[14px] text-[12px] cursor-pointer"
//                     >
//                       ADD TECH +
//                     </span>
//                   </div>
//                 </Col>
//               </Row>
//             )}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// @flow
import { Button, Col, List, Row } from "antd";
import Item from "antd/lib/list/Item";
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DeleteVoidItem } from "services/CreateCharge/DeleteVoidItem";
import { GetTicketDetailForCheckout } from "services/CreateCharge/GetTicketDetailForCheckout";
import { DeleteListItem } from "services/CreateCharge/VoidListItemByEmployee";
import { ItemService } from "src/components/SalonCenter/SelectTechServiceAppt/ItemService";
import { currencyFormat } from "src/helper/General";
import { useAppSelector } from "src/redux/hook";

import { theme } from "tailwind.config";
import {
  setApptId,
  setIdSelectClient,
  setIdSelectTech,
  setIndexAppt,
  setIndexTech,
  setIsChangeData,
} from "../../createcharge-slice";
import { CreateChargeSlice } from "../../CreateChargeSlice";
import {
  IGetTicketDetailForCheckout,
  ListTicket,
  ListTicketDetail,
  Ticket,
} from "../../InterfaceCreateCharge";
import ModalChangePriceLeft from "./FormLeftCreateCharge/ModalChangePriceLeft";

export const ItemApptCreateCharge = () => {
  const [listItemAppt, setListItemAppt] =
    useState<IGetTicketDetailForCheckout>();
  const dispatch = useDispatch();
  const getTicketDetailForCheckout = new GetTicketDetailForCheckout();
  const redux = useAppSelector((state) => state.createCharge);
  console.log(
    "🚀 ~ file: ItemApptCreateCharge.tsx ~ line 460 ~ ItemApptCreateCharge ~ redux",
    redux
  );
  const checkNoTix = useAppSelector((state) => state.createCharge.checkNo);
  const apptId = useAppSelector((state) => state.createCharge.apptId);
  const indexAppt = useAppSelector((state) => state.createCharge.indexAppt);
  const [indexItemService, setIndexItemService] = useState<number>(0);
  const apideleteVoidItem = new DeleteVoidItem();
  const apiDeleteListItem = new DeleteListItem();
  const isChangeData = useAppSelector(
    (state) => state.createCharge.isChangeData
  );
  // console.log("listItemAppt", listItemAppt);
  useEffect(() => {
    if (apptId)
      getTicketDetailForCheckout
        .getTicketDetailForCheckout(apptId, checkNoTix)
        .then((res) => {
          console.log("res", res);
          if (res.status == 200) {
            setListItemAppt(res.data);

            // dispatch(
            //   setIdSelectClient(res.data?.model.listTicket[0].customerID)
            // );
          }
        });
  }, [isChangeData, checkNoTix]);
  const handleVoidItemService = (itemService: Ticket) => {
    apideleteVoidItem
      .deleteVoidItem(itemService.orgTrnSeq + "/", itemService.checkNo)
      .then((res) => {
        if (res.status == 200) {
          dispatch(setIsChangeData());
          // dispatch(
          //   CreateChargeSlice.actions.showLeftAddTech({
          //     showform: "AddTechLeft",
          //     IdRender: Math.random(),
          //   })
          // );
        }
      });
  };
  const handleVoidListItemService = (itemService: ListTicketDetail) => {
    const param = {
      rvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
      employeeID: itemService.employeeId,
      IDcheckNo: checkNoTix,
      ApptID: apptId,
    };
    apiDeleteListItem
      .deleteListItem(
        param.rvcNo,
        param.employeeID,
        param.IDcheckNo,
        param.ApptID
      )
      .then((res) => {
        if (res.status == 200) {
          dispatch(setIsChangeData());
          // dispatch(
          //   CreateChargeSlice.actions.showLeftAddTech({
          //     showform: "AddTechLeft",
          //     IdRender: Math.random(),
          //   })
          // );
        }
      });
  };
  const showModal = () => {
    console.log("showModal");
  };

  return (
    <div className="h-3/4">
      <Row className="p-4">
        <Col span={12}>
          <div className="flex justify-start ">
            <span className="mr-[2px] 2xl:text-[16px] xl:text-[16px] md:text-[14px] text-[12px] mt-[5px]">
              Opened By
            </span>
            <span className="text-sm  ml-[3px]">
              <Button
                style={{ borderRadius: "6px" }}
                className=""
                onClick={() => {
                  dispatch(CreateChargeSlice.actions.showFormRightTech(0));
                }}
              >
                <span className=" 2xl:text-[16px] xl:text-[16px] md:text-[14px] text-[12px] ">
                  {listItemAppt?.techName || "NEXT AVAILABLE"}
                </span>
              </Button>
            </span>
          </div>
        </Col>
        <Col span={12}>
          <div className="justify-end flex">
            <span
              className={` mr-[5px]  2xl:text-[16px] xl:text-[15px] md:text-[14px] text-[12px] text-[#505050]`}
            >
              Date{" "}
            </span>
            <span
              className={`font-bold mr-[8px] 2xl:text-[16px] xl:text-[15px] md:text-[14px] text-[12px] text-[#505050]`}
            >
              {moment().format("L")}
            </span>
            <span
              className={`mr-[5px] 2xl:text-[16px] xl:text-[15px] md:text-[14px] text-[12px] text-[#505050]`}
            >
              Time
            </span>
            <span
              className={`font-bold 2xl:text-[16px] xl:text-[15px] md:text-[14px] text-[12px] text-[#505050]`}
            >
              {" "}
              {moment().format("LT")}
            </span>
          </div>
        </Col>
      </Row>
      {/* List Group Appt */}
      <List
        dataSource={listItemAppt?.model.newFormatListTickets}
        className="!px-4 overflow-scroll "
        style={{ height: "calc(100vh - 420px)" }}
        renderItem={(itemAppt, indexItemAppt) => {
          console.log("itemAppt", itemAppt);
          return (
            <div
              onClick={() => {
                dispatch(setIndexAppt(indexItemAppt));
                dispatch(setApptId(itemAppt.originalAppointmentID));
              }}
            >
              {/* Add Client */}
              <div className="flex justify-center cursor-pointer ">
                <Row
                  className={
                    " w-full " +
                    (indexItemAppt == indexAppt
                      ? "bg-mango-primary-blue text-white "
                      : "bg-slate-200  text-black")
                  }
                >
                  <Col
                    span={12}
                    className={`flex justify-start ml-4 2xl:text-[16px] xl:text-[16px] md:text-[14px] text-[12px] py-2`}
                  >
                    <span className=" 2xl:text-[18px] xl:text-[13px] text-[12px] font-bold  mr-2  ">
                      {itemAppt.customerName || "Add Client"}
                    </span>

                    <span className="2xl:text-[18px] xl:text-[13px] text-[12px]">
                      #{itemAppt.originalAppointmentID}
                    </span>
                  </Col>
                  <Col span={6}></Col>
                  <Col></Col>
                </Row>
              </div>

              {/*List  Item Appt   */}

              {itemAppt.listTicketDetail.length >= 0 ? (
                <List
                  className="flex-1 overflow-auto max-h-[300px] "
                  bordered={false}
                >
                  {itemAppt.listTicketDetail.map(
                    (itemDetailAppt: ListTicketDetail, indexTicket) => (
                      <Item
                        onClick={() => {
                          setIndexItemService(indexTicket),
                            dispatch(setIndexTech(indexTicket)),
                            dispatch(
                              setIdSelectTech(itemDetailAppt.employeeId)
                            );
                        }}
                        className={
                          "flex flex-wrap  cursor-pointer select-none  !border-b !border-mango-border-dark" +
                          (indexItemService == indexTicket
                            ? " !bg-mango-bg-dark"
                            : " !bg-white")
                        }
                      >
                        {/* Add Tech */}

                        <Row className="basis-full  flex flex-row ">
                          <Col span={24}>
                            <div className=" flex">
                              <img
                                onClick={() =>
                                  handleVoidListItemService(itemDetailAppt)
                                }
                                src="/assets/imgs/New24px-cancel-service-01.svg"
                                className="h-6 ml-2"
                              />
                              <div className="w-[200px]  flex justify-start ">
                                <span
                                  onClick={() => {
                                    dispatch(
                                      CreateChargeSlice.actions.setShowFormRight(
                                        "tech"
                                      )
                                    );
                                    dispatch(
                                      CreateChargeSlice.actions.showFormRightTech(
                                        0
                                      )
                                    );
                                  }}
                                  className={
                                    "text-lg ml-6 font-bold 2xl:text-[18px] xl:text-[15px] md:text-[14px] text-[12px] cursor-pointer  text-left " +
                                    (itemDetailAppt.tickets[0].employeeID > 9999
                                      ? " text-black "
                                      : " text-mango-primary-blue")
                                  }
                                >
                                  {itemDetailAppt.tickets[0].employeeID > 9999
                                    ? itemDetailAppt.tickets[0].employeeName.toUpperCase()
                                    : "ADD TECH"}
                                </span>
                                {itemDetailAppt.tickets[0].employeeID >
                                  9999 && (
                                  <img
                                    src={
                                      "/assets/imgs/" +
                                      (itemDetailAppt.tickets[0].isRequestTech
                                        ? "heart.svg"
                                        : "heartDisable.svg")
                                    }
                                    className="w-6 h-6   !p-0 !ml-3 "
                                  />
                                )}
                              </div>
                              {itemDetailAppt.tickets[0].orgAppointment ==
                                null && (
                                <button className="px-[10px] py-[8px] rounded-md ml-10 bg-mango-primary-green hover:opacity-80">
                                  <span className="text-white text-[18px]">
                                    ADD SERVICE
                                  </span>
                                </button>
                              )}
                            </div>
                          </Col>
                        </Row>
                        {/* List Item Service  */}
                        <div className="basis-full flex flex-row pr-4">
                          {itemDetailAppt.tickets.length > 0 && (
                            <Row className="w-full ">
                              {itemDetailAppt.tickets
                                .filter((item) => item.orgAppointment != null)
                                .map((itemService, indexItem) => {
                                  // console.log("itemService", itemService);
                                  return (
                                    <div
                                      className={
                                        "hover:!bg-yellow-100 w-full flex h-[50px] "
                                        //  +
                                        // (indexItem === tixCT.indexItemService &&
                                        //   itemTicket.employeeID === tixCT.idTech &&
                                        //   " !bg-yellow-100")
                                      }
                                      key={indexItem}
                                    >
                                      <Col span={2} className="py-2 w-full ">
                                        <Button
                                          danger
                                          size="small"
                                          type="text"
                                          className="hover:!bg-orange-400 hover:!text-white"
                                          onClick={() =>
                                            handleVoidItemService(itemService)
                                          }
                                        >
                                          X
                                        </Button>
                                      </Col>
                                      <Col span={12} className="py-2">
                                        <div className="flex flex-col">
                                          <p className="text-sm w-full font-semibold !text-left truncate !m-0">
                                            {itemService.trnDesc}
                                          </p>

                                          {itemService.childTicket && (
                                            <div className="flex">
                                              <Button
                                                danger
                                                size="small"
                                                type="text"
                                                className="hover:!bg-orange-400 hover:!text-white text-mango-primary-orange font-bold"
                                                onClick={() => {}}
                                              >
                                                x
                                              </Button>
                                              <p className="text-mango-primary-orange text-xs font-semibold !m-0 h-6 flex items-center">
                                                {
                                                  itemService.childTicket
                                                    .trnDesc
                                                }
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </Col>

                                      <Col span={4} className=" py-2">
                                        {itemService.isService && (
                                          <p
                                            className="text-xs text-center   w-[70px] h-[30px] rounded-[4px] flex items-center justify-center border-mango-primary-blue border bg-white"
                                            title={
                                              Number(itemService.duration) + "m"
                                            }
                                          >
                                            {Number(itemService.duration)}m
                                          </p>
                                        )}
                                      </Col>
                                      <Col
                                        span={6}
                                        className="text-right py-3 text-xs font-bold"
                                      >
                                        {/* <p>
                                        $
                                        {currencyFormat(
                                          itemService.itemPrice || 0
                                        )}
                                      </p>
                                      {itemService.childTicket && (
                                        <p className="text-mango-primary-orange text-xs font-semibold !m-0 !p-0 h-6  text-right ">
                                          {currencyFormat(
                                            itemService.childTicket.itemPrice ||
                                              0
                                          )}
                                        </p>
                                      )} */}

                                        <ModalChangePriceLeft
                                          props={itemService?.itemPrice}
                                          itemService={itemService}
                                        />
                                      </Col>
                                    </div>
                                  );
                                })}
                            </Row>
                          )}
                        </div>
                      </Item>
                    )
                  )}
                </List>
              ) : (
                <Row className="mt-1  ">
                  <Col span={24}>
                    <div className=" flex justify-start">
                      <span
                        onClick={() => {
                          dispatch(
                            CreateChargeSlice.actions.setShowFormRight("tech")
                          );
                          dispatch(
                            CreateChargeSlice.actions.showFormRightTech(0)
                          );
                        }}
                        style={{
                          color: `${theme.extend.colors["mango-primary-blue"]}`,
                        }}
                        className="text-lg ml-7 font-semibold 2xl:text-[18px] xl:text-[15px] md:text-[14px] text-[12px] cursor-pointer"
                      >
                        ADD TECH +
                      </span>
                    </div>
                  </Col>
                </Row>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
