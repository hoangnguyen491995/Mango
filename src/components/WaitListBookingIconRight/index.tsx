// @flow
import * as React from "react";
import { History } from "./History";
import TodayBooking from "./TodayBookings";
import WaitList from "./WaitList";
type Props = {};
export const WaitListBookingIconRight = (props: Props) => {
  return (
    <div className="fixed right-0 top-80 z-1000 flex flex-col">
     
      <div className="mt-3">
        <TodayBooking />
      </div>
      <div className="mt-3">
        <History />
      </div>
    </div>
  );
};
