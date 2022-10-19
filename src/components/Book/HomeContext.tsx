import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  IDateFromToListView,
  IDateFromToWeekView,
  IResourceMap,
  IListEvents,
  IEvents,
} from "src/components/Book/IterfaceStructures";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";

const HomeContext = React.createContext<any[]>([]);

export const BookContextProvider = ({ children }) => {
  // Change width for calendar
  const [_listElm, set_ListElm] = useState<NodeListOf<Element>>();
  const [_listElm_Title, set_ListElm_Title] = useState<NodeListOf<Element>>();
  const [_listElm_Time_Slot, set_ListElm_Time_Slot] =
    useState<NodeListOf<Element>>();
  const [_listElm_Salon_Appt, set_ListElm_Salon_Appt] =
    useState<NodeListOf<Element>>();
  // const [_listElm_Salon_Appt_Header, set_ListElm_Salon_Appt_Header] = useState<NodeListOf<Element>>();
  const [valueSlideCalendar, setValueSlideCalendar] = useState(25);
  const [valueSlideTech, setValueSlideTech] = useState(140);
  const [valueSlideSalon, setValueSlideSalon] = useState(140);
  // count salon appoiment
  const [countSalonAPPT, setCountSalonAPPT] = useState<number>(0);
  const [orderBy, setOrderby] = useState<boolean>(false);
  const [isAddNewSaLonAPPT, setIsAddNewSaLonAPPT] = useState<boolean>(false);

  // get daatetime for calendar
  // const [viewTypeCalendar, setViewTypeCalendar] = useState();
  const [dateStartView, setDateStartView] = useState<Date>();
  const [dateEndView, setDateEndView] = useState();

  const [dateCurent, setDateCurrent] = useState<Date>(new Date());
  const [dateListView, setDateListView] = useState<IDateFromToListView>({
    start: "",
    end: "",
  });
  const [dateWeekView, setDateWeekView] = useState<IDateFromToWeekView>({
    start: "",
    end: "",
    today: "",
  });
  const [typeListView, setTypeListView] = useState<boolean>(true);
  // const [typeDate, setTypeDatte] = useState("DATE");

  //  state appointment tech
  const [dataInforTech, setDataInforTech] = useState<Array<IResourceMap>>([]);
  const [dataInforShow, setDataInforShow] = useState<Array<IResourceMap>>([]);
  const [listResources, setListResources] = useState<Array<IResourceMap>>([]);
  const [calendarStartTime, setCalendarStartTime] = useState<any>(
    moment().clone().startOf("day")
  );
  const [calendarEndTime, setCalendarEndTime] = useState<any>(
    moment().clone().endOf("day")
  );
  const [loadingCalendar, setLoadingCalendar] = useState(false);

  const [loadingList, setLoadingList] = useState(false);
  //  state appointment tech
  const [filterTypeTicket, setFilterTypeTicket] = useState("ALL BOOK");
  const [noShowRadio, setNoShowRadio] = useState(true);
  const [isClosedRadio, setIsCloseRadio] = useState(true);

  const [dataInfoCalendar, setDataInfoCalendar] = useState<Array<IEvents>>([]);

  // rebook
  const [techId, setTechId] = useState(9999);
  const [techName, setTechName] = useState();

  return (
    <HomeContext.Provider
      value={[
        {
          _listElm,
          set_ListElm,
          _listElm_Title,
          set_ListElm_Title,
          _listElm_Time_Slot,
          set_ListElm_Time_Slot,
          // viewTypeCalendar,
          // setViewTypeCalendar,
          dateStartView,
          setDateStartView,
          dateEndView,
          setDateEndView,
          dateCurent,
          setDateCurrent,
          dataInforTech,
          setDataInforTech,
          dataInforShow,
          setDataInforShow,
          listResources,

          setListResources,
          filterTypeTicket,
          setFilterTypeTicket,
          dateListView,
          setDateListView,
          typeListView,
          setTypeListView,
          valueSlideCalendar,
          setValueSlideCalendar,
          valueSlideTech,
          setValueSlideTech,
          valueSlideSalon,
          setValueSlideSalon,
          countSalonAPPT,
          setCountSalonAPPT,
          orderBy,
          setOrderby,
          set_ListElm_Salon_Appt,
          _listElm_Salon_Appt,
          calendarStartTime,
          setCalendarStartTime,
          calendarEndTime,
          setCalendarEndTime,
          // _listElm_Salon_Appt_Header,
          // set_ListElm_Salon_Appt_Header,
          isAddNewSaLonAPPT,
          setIsAddNewSaLonAPPT,
          loadingCalendar,
          setLoadingCalendar,

          loadingList,
          setLoadingList,
          dateWeekView,
          setDateWeekView,
          dataInfoCalendar,
          setDataInfoCalendar,
          techId,
          setTechId,
          techName,
          setTechName,
          noShowRadio,
          setNoShowRadio,
          setIsCloseRadio, 
          isClosedRadio,
        },
      ]}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;
