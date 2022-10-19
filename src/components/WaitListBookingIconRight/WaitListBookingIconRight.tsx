import * as React from "react";
import TodayBooking from "./TodayBookings";
import WaitList from "./WaitList";
type Props = {};
export const ListIconRight = (props: Props) => {
  return (
    <div >     
        <TodayBooking />   
        <WaitList />    
    </div>
  );
};
