import { Popover } from "antd";
import React, { useState } from "react";
import Content from "../AddNewTix/Content";
import { useAppSelector } from "src/redux/hook";
import { useDispatch } from "react-redux";
import { vissibleModel, closeModel } from "src/components/Book/book-slice";

function ButtonNewTicket() {
  const openModel = useAppSelector((state) => state.book.openModel);
  const timeNewBook = useAppSelector((state) => state.book.timeNewBook);
  const dispatch = useDispatch();
  // const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <button
        className="border border-pink-600 bg-white  text-sm font-semibold text-pink-600 hover:text-white 
        hover:border-none hover:bg-mango-primary-blue rounded-[4px] pl-1  text-center w-[102px] h-[45px]
         inline-flex items-center"
        onClick={() => {
          dispatch(vissibleModel({ 
             customerId: 9999,
            dateTime: "", 
            techName:  "NEXT AVAILABLE"}));
           
        }}
        type="button"
        style={{ boxShadow: "0px 0px 15px #0000004d" }}
      >
        ADD NEW
        <svg
          className="w-6 h-6 md:w-5 md:h-5"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 15 15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 
          1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          ></path>
        </svg>
      </button>
      <Content
        visible={openModel}
        onOk={() => {
          dispatch(closeModel());
        }}
        onCancel={() => {
          dispatch(closeModel());
        }}
        isAddNew
        dataAddNew={{
          customerId: 0,
          customerName: "NON INFO",
          timeAdd: timeNewBook.dateTime,
          techName: timeNewBook.employeeName,
          techId: timeNewBook.customerId,
          appointmentId: 0,
          groupId: 0,
        }}
      />
    </>
  );
}

export default ButtonNewTicket;
