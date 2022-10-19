import Home from "pages";
import React from "react";
import Head from "next/head";
import NavControl from "src/components/NavController";
import HomeContext, {
  BookContextProvider,
} from "../src/components/Book/HomeContext";
import BatchTipIconLeft from "src/components/BatchTipIconLeft";
import { WaitListBookingIconRight } from "src/components/WaitListBookingIconRight";
import Book from "src/components/Book";
import WaitList from "src/components/WaitListBookingIconRight/WaitList";

function MainCalendar() {
  return (
    <>
      <Head>
        <title>Booking</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BookContextProvider>
        <NavControl />
        <div className="fixed right-0 top-80 z-1000 flex flex-col">
          <WaitList />
        </div>

        <div className="flex h-full  w-screen">
          {/* <MainCalendar
          /> */}
          <Book></Book>
        </div>

        {/* <ScrollFooter /> */}
      </BookContextProvider>
    </>
  );
}

export default MainCalendar;
