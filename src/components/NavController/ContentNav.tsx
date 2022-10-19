import React, { useState, useContext } from "react";
import BookingSetting from "./BookingSetting";
import HomeContext from "src/components/Book/HomeContext";
import DayType from "./DayType";
import AppointmentTech from "./AppointmentTech";
import AppoimentTicket from "./AppoimentTicket";
import ButtonNewTicket from "./ButtonNewTicket";
import ThreeDotSetting from "./ThreeDotSetting";
import DayFilter from "./DayFilter";
import ListViewType from "./ListViewType";
import { useDispatch } from "react-redux"
import { useAppSelector } from "src/redux/hook"
import { clearDataCopyTicket, turnOffCopy, clickCancelCopy, setViewTypeCalendar } from "src/components/Book/book-slice"
function ContentNav() {
  const [typeDate, setTypeDatte] = useState("DAY");
  const bookContext = useContext(HomeContext)[0];
const dispatch = useDispatch()
  // bookContext.setViewTypeCalendar(typeDate);
  dispatch(setViewTypeCalendar(typeDate))
  const isElectron = process.env.NEXT_PUBLIC_DOMAIN_API_TITLE_BAR_ELECTRON;
  const isProd: boolean = process.env.NODE_ENV === isElectron;
  const isCopyTicket = useAppSelector((state) => state.book.isCopyTicket);
  const dataCopyTicket = useAppSelector((state) => state.book.dataCopyTicket);
  const handleCancelButton = () =>{
    document.getElementById("ticket-clone-copied")?.remove();
    dispatch(turnOffCopy());
    dispatch(clickCancelCopy(true));
    dispatch(clearDataCopyTicket())
  }

  return (
    <div
      className={
        "bg-mango-gray-1 border-gray-200 sticky p-2 pt-3 w-full z-20 "
        // +(isProd && " top-[87px]")
      }
    >
      <div className="flex flex-wrap justify-between items-center ">
        <div className="flex items-center lg:space-x-6 md:space-x-1 cursor-pointer">
          <div className="grid place-items-center pl-6 ">
            <BookingSetting />
          </div>
          <DayFilter typeDate={typeDate} />
          <DayType setTypeDatte={setTypeDatte} />
        </div>
        <div className="flex items-center lg:space-x-6 md:space-x-1 cursor-pointer">
          {typeDate == "LIST" ? "" : <AppointmentTech />}
          {typeDate == "LIST" ? <ListViewType /> : <AppoimentTicket />}
          <ButtonNewTicket />
          <ThreeDotSetting />
        </div>
      </div>
      { isCopyTicket == true && <div className="wrap-booking-header-noti-copy-type absolute flex">
        <img
          src="/assets/imgs/book/check.svg"
          
          alt="check"
        />
        <div className="title-copied">
          <div  className="font-semibold text-xl text-mango-gray-5">Appointment Copied</div>
          <h6>Select a slot to paste  </h6>
        </div>
        <button id="destroy-appointment-copy-active" onClick={handleCancelButton}>Cancel</button>
      </div>
}
    </div>
  );
}

export default ContentNav;
