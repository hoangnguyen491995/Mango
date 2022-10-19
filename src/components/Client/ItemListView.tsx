// @flow
import { Rate } from "antd";
import moment from "moment";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { currencyFormat } from "src/helper/General";
import index from ".";
import Content from "../AddNewTix/Content";
import { IClient } from "./InterfaceStructures";
type Props = {
  iteminfo: IClient;
};
export const ItemListView = ({ iteminfo }: Props) => {
  const [showAddNewTix, setShowAddNewTix] = useState<boolean>(false);
  const handleOkAddNew = () => {
    setShowAddNewTix(false);
  };
  const handleCancelAddNew = () => {
    setShowAddNewTix(false);
  };

  const handleClickClientItem = (e, customerID) => {
    e.stopPropagation();
    Router.push(`/Customer/${customerID}`);
  };
  const currencyFormat = (num) => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <>
      <Content
        visible={showAddNewTix}
        onOk={handleOkAddNew}
        onCancel={handleCancelAddNew}
        isAddNew
        dataAddNew={{
          customerId: iteminfo.customerID,
          customerName: iteminfo.customerName,
          timeAdd: "",
          techName:"NEXT AVAILABLE",
          techId: 9999,
          appointmentId: 0,
          groupId: 0,
        }}
      />

      <div
        className="flex h-[70px] mr-[5px] rounded-[8px] items-center pl-[20px] pr-[10px]
   cursor-pointer bg-white justify-start client-item shadow-sm "
        onClick={(e) => handleClickClientItem(e, iteminfo.customerID)}
      >
        <div className="flex w-2/3  justify-start">
          <div className="items-center flex ">
            <span
              className="flex font-bold rounded-full w-[40px] h-[40px] shadow-md justify-center
           items-center  bg-[#FFCD00] text-white  text-[20px]"
            >
              {iteminfo.customerName == ""
                ? ""
                : iteminfo.customerName.slice(0, 1).toUpperCase()}
            </span>
          </div>
          <div className="p-[10px]">
            <div className=" text-bold text-[18px] text-left truncate w-[140px]">
              {iteminfo.customerName.toUpperCase()}
            </div>
            <div className="text-[#F44C7F] text-value text-left text-[14px]">
              {iteminfo.customerType}
            </div>
          </div>
        </div>
        <div className="w-2/3 text-value flex">
          {iteminfo.contactPhone ? iteminfo.contactPhone : "N/A"}{" "}
          <img
            src="/assets/imgs/37_HidePass.svg"
            className="h-[20px] w-[30px]"
          ></img>
        </div>
        <div className="w-2/3 ">
          <Rate disabled value={5 || 0} style={{ color: "#acacac" }}></Rate>
        </div>
        <div className="w-2/3 text-value">
          {iteminfo.birthday ? moment(iteminfo.birthday).format("LL") : "N/A"}
        </div>
        <div className="w-2/3 text-value">
          {iteminfo.favouriteTech ? iteminfo.favouriteTech : "''"}
        </div>
        <div className="w-2/3 text-value">
          {iteminfo.lastVisit == null
            ? "N/A"
            : moment(iteminfo.lastVisit).format("LL")}
        </div>
        <div className="w-2/3 text-lg text-value text-[#93D500]">
          {iteminfo.rewardsPoint}
        </div>
        <div className="w-2/3 text-bold">
          {currencyFormat(iteminfo.totalSpentByYear)}
        </div>
        <div className="w-2/3 flex">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAddNewTix(true);
            }}
            className="border-2 border-mango-gray-5 bg-white text-[15px] button-client text-mango-gray-5
                  hover:border-mango-primary-blue hover:bg-mango-primary-blue-hover rounded-[4px] p-1 text-center h-[40px]
                  inline-flex items-center"
            type="button"
          >
            BOOK APPT
          </button>
          <button
            className="border-2 border-mango-gray-5 bg-white text-[15px] button-client text-mango-gray-5
                  hover:border-[#00BED6] hover:bg-[#00BED64D] rounded-[4px] p-1  text-center h-[40px]
                  inline-flex items-center ml-1"
            type="button"
          >
            CHECK IN
          </button>
        </div>
      </div>
    </>
  );
};
