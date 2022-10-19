import React, {
  Fragment,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from "react";
import {
  Calendar,
  Views,
  momentLocalizer,

  //} from "3rd_lib/react-big-calendar/lib";
  //import { Modal, message } from "antd";
  //import withDragAndDrop from "3rd_lib/react-big-calendar/lib/addons/dragAndDrop/withDragAndDrop";
} from "3rd_lib/react-calendar/lib";
import { Modal, message, Spin, Skeleton, Space } from "antd";
import withDragAndDrop from "3rd_lib/react-calendar/lib/addons/dragAndDrop/withDragAndDrop";

import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListView from "src/components/BookingListView";
import { GetListForScheduleByDateBooking } from "services/Appointments/GetListForScheduleByDateBooking";
// import { GetInfoTech } from "services/Employees/GetInfoTech";
import { ChangeAppointmentSchedule } from "services/Appointments/ChangeAppointmentSchedule";
import axios from "axios";
import { format } from "date-fns";
import {
  IEvents,
  IResourceMap,
  IInforTech,
  IListEvents,
  ICountIntervalTime,
} from "./IterfaceStructures";
import HomeContext from "src/components/Book/HomeContext";
import { DateTimeFormat } from "src/helper/General";
import ModalAppointmentShedulerDetail from "./ModalAppointmentShedulerDetail";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "src/redux/hook";
import { messageSuccess } from "src/components/MessageAlert";

import { AddNewBooking$ } from "src/redux/selector";
import { ConfirmBooking } from "src/redux/reducer";
import {
  clearDataCopyTicket,
  set_ListElm_Title,
  clickCancelCopy,
  addDataNewPosition,
  setPageCurrent,
} from "src/components/Book/book-slice";
import { ConfirmCopy } from "services/Appointments/ConfirmCopy";
//------------------------------------ Issues----------------------------
// kéo ra khỏi calender bị mất ticket
// Đổi màu background trên dòng timeline
// Drag and drop column resource

const DragAndDropCalendar = withDragAndDrop(Calendar);

// update color border when move ticket and map with color resourceMap

export default function Book() {
  const events: IEvents[] = [];
  const resourceMap: IResourceMap[] = [];
  const listBookingOnline: IEvents[] = [];
  const listBookingOffline: IEvents[] = [];
  const [isCopyConvert, setIsCopyConvert] = useState<boolean>(false);
  const [listBackupEvents, setListBackupEvents] = useState<IEvents[]>([]);
  const [countTimeInterval, setCountTimeInterval] = useState<
    ICountIntervalTime[]
  >([]);
  const [typeView, setTypeView] = useState(Views.DAY);
  const [myEvents, setMyEvents] = useState<IEvents[]>([]);
  const [myResourceMap, setMyResourceMap] = useState(resourceMap);
  const [_doc, set_Doc] = useState<Document>();
  const [dateShow, setDateShow] = useState<Date>(new Date());

  // const [dataInforTech, setDataInforTech] = useState<Array<IInforTech>>([]);
  // const getInfoTech = new GetInfoTech();
  const changeAppointmentSchedule = new ChangeAppointmentSchedule();
  const bookContext = useContext(HomeContext)[0];
  const useRefCalendar = useRef(null);
  const confirmCopy = new ConfirmCopy();
  // --------------------------assignment events---------------------------

  // const [dataInfoCalendar, setDataInfoCalendar] = useState<Array<IEvents>>(
  //   []
  // );
  const isConfirmBooking$ = useSelector(AddNewBooking$);

  const listForScheduleByDateBooking = new GetListForScheduleByDateBooking();

  const dispatch = useDispatch();
  const isCopyTicketRedux = useAppSelector((state) => state.book.isCopyTicket);
  const pasteTicket = useAppSelector((state) => state.book.pasteTicket);
  const isCancelCopy = useAppSelector((state) => state.book.isCancelCopy);
  const viewTypeCalendar = useAppSelector((state) => state.book.viewTypeCalendar);
  useEffect(() => {
    const monthShow = bookContext.dateCurent.getMonth() + 1;

    viewTypeCalendar == "DAY" &&
      bookContext.setDateWeekView({
        start: `${monthShow}/${bookContext.dateCurent.getDate()}/${bookContext.dateCurent.getFullYear()}`,
        end: `${monthShow}/${bookContext.dateCurent.getDate()}/${bookContext.dateCurent.getFullYear()} `,
        today: `${monthShow}/${bookContext.dateCurent.getDate()}/${bookContext.dateCurent.getFullYear()}`,
      });

    viewTypeCalendar == "WEEK" &&
      bookContext.setDateWeekView({
        start: moment(bookContext.dateCurent)
          .clone()
          .startOf("week")
          .format("MM-DD-YYYY"),
        end: moment(bookContext.dateCurent)
          .clone()
          .endOf("week")
          .format("MM-DD-YYYY"),
        today: moment(bookContext.dateCurent).format("MM-DD-YYYY"),
      });
  }, [bookContext.dateCurent, viewTypeCalendar]);

  useEffect(() => {
    bookContext.setLoadingCalendar(true);
    let InterActive = viewTypeCalendar == "WEEK" ? 0: 1
    try {
      bookContext.dateWeekView.start != "" &&
        listForScheduleByDateBooking
          .getListForScheduleByDateBooking(
            bookContext.dateWeekView.start,
            bookContext.dateWeekView.end,
            1,
            InterActive
          )
          .then((res) => {
            if (res.status === 200) {
           
              setMyEvents(res.data.eventShedulers);
              bookContext.setDataInfoCalendar(res.data.eventShedulers);
              setCountTimeInterval(res.data.countHours);
              bookContext.setLoadingCalendar(false);
              viewTypeCalendar == "WEEK" && setMyResourceMap(res.data.header);
              bookContext.setCalendarStartTime(`${bookContext.dateWeekView.today} ${res.data.calendarStartTime}`);
              bookContext.setCalendarEndTime(`${bookContext.dateWeekView.today} ${res.data.calendarEndTime}`)
            }
          });
    } catch (err) {
      console.log(err);
      bookContext.setLoadingCalendar(false);
    }
    dispatch(ConfirmBooking.actions.setAddNewBooking(false));
  }, [isConfirmBooking$, bookContext.countSalonAPPT, bookContext.dateWeekView, pasteTicket]);

  useEffect(() => {
    bookContext.dataInfoCalendar.map((data) => {
      if (data.isBookOnline == true) {
        listBookingOnline.push(data);
      }
    });
    bookContext.dataInfoCalendar.map((data) => {
      if (data.isBookOnline == false) {
        listBookingOffline.push(data);
      }
    });

    bookContext.filterTypeTicket == "BOOK ONLINE"
      ? setMyEvents(listBookingOnline)
      : bookContext.filterTypeTicket == "BOOK OFFLINE"
      ? setMyEvents(listBookingOffline)
      : setMyEvents(bookContext.dataInfoCalendar);
  }, [bookContext.filterTypeTicket]);

  useEffect(() => {
    setMyEvents(bookContext.dataInfoCalendar);
  }, [bookContext.dataInfoCalendar]);

  useEffect(() => {
    if (bookContext.noShowRadio == false) {
      myEvents.forEach((x) => {
        if (x.ticketstatus != 4 && x.ticketstatus != 9) {
          events.push(x);
        }
      });

      setMyEvents(events);
    } else {
      setMyEvents(bookContext.dataInfoCalendar);
    }
  }, [bookContext.noShowRadio]);

  useEffect(() => {
    if (bookContext.isClosedRadio == false) {
      myEvents.forEach((x) => {
        if (x.ticketstatus != 7 ) {
          events.push(x);
        }
      });

      setMyEvents(events);
    } else {
      setMyEvents(bookContext.dataInfoCalendar);
    }
  }, [bookContext.isClosedRadio]);


  useEffect(()=>{  dispatch(setPageCurrent("book"))},[])

  // ------------------assignment resouce---------------------------

  useEffect(() => {
    if (bookContext.listResources) {
      bookContext.listResources.map((tech) => {
        let count: number = 0;
        myEvents.forEach((x) => {
          if (tech.employeeID == x.resourceId) {
            count += 1;
          }
        });
        const item = {
          resourceId: tech.employeeID,
          resourceTitle: tech.employeeName,
          imageFileName: tech.imageFileName,
          backGroundColor:
            (tech.backGroundColor == "#FFFFFF" ||   tech.backGroundColor == "")
              ? "#94D500"
              : tech.backGroundColor,
          count: count,
          listShiftModel: tech.listShiftModel,
          type: tech.type,
          lockIn: tech.lockIn,
        };
        resourceMap.push(item);
      });
      viewTypeCalendar == "DAY" && setMyResourceMap(resourceMap);


      if (viewTypeCalendar == "WEEK"){
        bookContext.listResources.map((tech) => {
          bookContext.dataInfoCalendar.forEach((x) => {
            if (tech.employeeID == x.employeeID) {
              events.push(x);
            }
          });     
        });
        setMyEvents(events)
      }
    }
  }, [bookContext.listResources, viewTypeCalendar]);

  useEffect(() => {
    setTimeout(() => {
      // bookContext.set_ListElm_Salon_Appt_Header(
      //   document.querySelectorAll(".rbc-salon-appointment-header")
      // );
      bookContext.set_ListElm_Salon_Appt(
        document.querySelectorAll(".rbc-salon-appointment")
      );

      bookContext.set_ListElm(document.querySelectorAll(".rbc-day-slot"));
      bookContext.set_ListElm_Title(
        document.querySelectorAll(".rbc-time-header-content")
      );
      bookContext.set_ListElm_Time_Slot(
        document.querySelectorAll(".rbc-timeslot-group")
      );
    }, 200);
  }, [myResourceMap, myEvents, viewTypeCalendar]);

  // --------------------------------------
  const updateColor = () => {

    myEvents &&
      resourceMap &&
      myEvents.forEach((x) => {
        //let check = resourceMap.filter((y) => x.resourceId == y.resourceId);
        let check = resourceMap.find((y) => {
          return x.resourceId == y.resourceId;
        });

        if (check) {
          x.colorBorder = check.backGroundColor;
        }
      });
    return 1;
  };

 
  useEffect(() => {  
    isCancelCopy == false && setListBackupEvents(myEvents) 
      setIsCopyConvert(isCopyTicketRedux)
  }, [isCopyTicketRedux]);

  useEffect(() => {
    isCancelCopy== true &&  setMyEvents(listBackupEvents) 
    dispatch(clickCancelCopy(false))
  }, [isCancelCopy]);

  const confirmOnMoveEvent = (
    eventId: string | number,
    oldColor: string,
    { event, start, end, resourceId, isAllDay: droppedOnAllDaySlot = false }
  ) => {
    //save old color

      Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined />,
        content: "Are you sure to update this ticket?",
        okText: "Confirm",
        cancelText: "Cancel",
        onOk: () => {
          let elementTicket = document.getElementById( event.appointmentId+ "-ticket-" +resourceId);
          if (elementTicket) {
            elementTicket.style.borderColor = `${oldColor}`;
          }
          const param = {
            ticket: event.appointmentId,
            group: 0,
            startResource: event.resourceId,
            endResource: resourceId,
            endChangeTime: moment(start).format("hh:mm A"),
            endChangeTimeC: moment(end).format("hh:mm A"),
            currentDate: moment(start).format("MM/DD/yyyy"),
            appointmentDetailId: event.appointmentDetailId,
            changeAllTech: 1,
            rvcNo: 5,
            isChangeTime: 0,
            changeDur: 0,
            endResourceName: event.employeeName,
          };
  
          try {
            changeAppointmentSchedule
              .changeAppointmentSchedule(param)
              .then((res) => {
                if (res.status === 200) {
                 
                   
                    messageSuccess(res.data);
                
  
                  if (
                    res.data == `${event.employeeName} can not make this service`
                  ) {
                    setMyEvents(myEvents);
                  }
                }
              })
              .catch(console.error);
          } catch (err) {
            console.log(err);
          }
        },
        onCancel: () => {
          setMyEvents(myEvents);
          // setMyEvents(events);
        },
      });
    
    
  };

  // Set type view date
  useEffect(() => {
    {
      viewTypeCalendar == "DAY" && setTypeView(Views.DAY);
    }
    {
      viewTypeCalendar == "WEEK" && setTypeView(Views.WEEK);
    }
  }, [viewTypeCalendar]);

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }) => {
      // -----------------------------------

      let oldColor = "";
      let toDestResourceMap = myResourceMap.find((x) => {
        return x.resourceId == resourceId;
      });

      if (toDestResourceMap) {
        oldColor = toDestResourceMap.backGroundColor;
      }
      if (isCopyTicketRedux == false) {
        confirmOnMoveEvent(event.id, oldColor, {
          event,
          start,
          end,
          resourceId,
          isAllDay: (droppedOnAllDaySlot = false),
        });
      }
      
      const paramCopyTicket = {
        rvcNo: 5,
        fromAppointmentID: event.appointmentId,
        fromAppointmentStatus: event.appointmentStatusId,
        serviceDate:
          moment(start).format("MM/DD/yyyy") +
          " " +
          moment(start).format("hh:mm A"),
        toEmployeeID: resourceId,
        toEmployeeName: ""+resourceId,
        createBy: "",
      };
 
      
        dispatch(addDataNewPosition(paramCopyTicket));
      setPositon({
        event,
        start,
        end,
        resourceId,
        isAllDay: (droppedOnAllDaySlot = false),
      });
    },
    [myEvents, isCopyTicketRedux]
  );
  const setPositon = ({
    event,
    start,
    end,
    resourceId,
    isAllDay: droppedOnAllDaySlot = false,
  }) => {
    const { allDay } = event;
    if (!allDay && droppedOnAllDaySlot) {
      event.allDay = true;
    }

    setMyEvents((prev: any) => {
      const existing = prev.find((ev) => ev.id === event.id) ?? {};
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...existing, start, end, resourceId, allDay }];
    });
  };

  useEffect(() => {
    set_Doc(document);
    updateColor();
  }, []);

  useEffect(() => {}, [
    _doc,
    countTimeInterval,
    bookContext.calendarStartTime,
    bookContext.calendarEndTime,
  ]);
  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev: any) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents, bookContext.dateCurent]
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2022, 7, 18, 13, 0, 0),
      scrollToTime: new Date(2021, 1, 1),
    }),
    []
  );

  const handleClickTicket = (data) => {
    // hanleOnClickShowModal();
    // setPositionX(data.positionX);
    // setPositionY(data.positionY);
    // setAppointmentIdClick(data.appointmentId);
  };

  return (
    <div className=" w-full h-full overflow-auto">
      {viewTypeCalendar == "LIST" ? (
        bookContext.loadingList ? (
          <div className="w-full h-full pb-28 flex items-center justify-center">
            <Spin
              spinning={bookContext.loadingList}
              size="large"
              tip={<h2 className="text-mango-primary-blue">Loading...</h2>}
            ></Spin>
          </div>
        ) : (
          <ListView />
        )
      ) : bookContext.loadingCalendar ? (
        <div role="status" className="p-1 w-full h-full rounded  shadow  ">
          <div className="w-full h-24 bg-gray-100 animate-pulsee"></div>
          <div className="flex items-baseline mt-[2px] space-x-[2px] ">
            <div className={`w-[900px] h-[80vh] bg-gray-200 hid`}> {isCopyTicketRedux} </div>
            {[...Array(9)].map((index) => (
              <div
                key={index}
                className="w-full h-[80vh]  bg-gray-100  space-y-[2px] "
              >
                {[...Array(29)].map((index) => (
                  <div
                    key={index}
                    className="w-full h-[25px] bg-gray-200  "
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="height600 overflow-x-auto w-auto bg-mango-gray-1">
            <DragAndDropCalendar
              ref={useRefCalendar}
              defaultView={Views.DAY}
              events={myEvents}
              localizer={momentLocalizer(moment)}
              onEventDrop={(payload) => {
                moveEvent(payload);
              }}
              handleClickTicketFunc={(data) => {
                handleClickTicket(data);
             
                
              }}
              countEventsInHourSlot={countTimeInterval}
              onEventResize={resizeEvent}
              resizable
              resourceIdAccessor="resourceId"
              resources={myResourceMap}
              resourceTitleAccessor="resourceTitle"
              scrollToTime={scrollToTime}
              calendarStartTime={new Date(`${bookContext.calendarStartTime}`)}
              calendarEndTime={new Date(`${bookContext.calendarEndTime}`)}
              viewCalendar={typeView}
              selectable
              showMultiDayTimes={true}
              step={15}
              date={bookContext.dateCurent}
              // view={typeView}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}
