import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Badge, Col, Empty, Row, Skeleton } from "antd";
import { Fragment, useEffect, useState } from "react";
import { GridDropZone, GridItem } from "react-grid-drag";
import Footer from "src/components/Footer";
import { ITixAppt } from "../DataStructures";
import { ItemAppt } from "./ItemAppt";

interface Props {
  dataPending: Array<ITixAppt>;
  isLoading: boolean;
  setShowPendingTicket: Function;
  showPendingTicket: boolean;
  classNameHover: string;
  setItemDataDrag: Function;
}
const listItemPedning = [1, 2, 3];
export const FooterPendingTicket = ({
  dataPending,
  isLoading,
  setShowPendingTicket,
  showPendingTicket,
  classNameHover,
  setItemDataDrag,
}: Props) => {
  const handleShowPendingTicket = () => {
    setShowPendingTicket(!showPendingTicket);
  };
  const flexitem =
    "ml-[-2px] flex  overflow-scroll content-start flex-col  flex-wrap justify-start items-start ";
  const LoadingItem = () => (
    <div className={flexitem} style={{ height: "calc(100% - 55px)" }}>
      {" "}
      <Skeleton
        loading={isLoading}
        className="  !w-[228px] !h-[157px] !mr-[2px] !my-[2px] !ml-[2px] "
        active={true}
      />
    </div>
  );

  return (
    <>
      <div className={"mb-[10px] flex ml-[10px] h-[45px]"}>
        <div
          className="bg-white rounded-b-[10px] border-gray-400  border h-10 w-10 cursor-pointer mango-shadow-1 flex items-center  "
          onClick={handleShowPendingTicket}
        >
          <img
            src="/assets/imgs/pending.svg"
            alt="error"
            className="h-5 w-5 mx-auto"
          />
        </div>
        <h2
          className="ml-[10px] flex my-auto select-none text-[#0F001A] mr-2"
          style={{ font: "normal normal 600 var(--s-20)" }}
        >
          Pending Tickets
        </h2>
        <span
          style={{
            background: "red 0% 0% no-repeat padding-box",
            font: "normal normal bold var(--s-12)",
            // backgroundColor: theme.extend.colors["mango-border-dark"],
          }}
          className="text-white rounded-[4px] opacity-80 px-1 h-4 flex my-auto  "
        >
          {dataPending.length}
        </span>
      </div>
      {isLoading ? (
        <div className={flexitem} style={{ height: "calc(100% - 0px)" }}>
          {listItemPedning.map((index) => (
            <LoadingItem key={index} />
          ))}
        </div>
      ) : (
        showPendingTicket &&
        (dataPending.length ? (
          <div
            style={{ height: "calc(100% - 55px)" }}
            // boxesPerRow={3}
            // rowHeight={160}
            className={flexitem + classNameHover}
          >
            {dataPending.map((iteminfo, index) => (
              <div key={iteminfo.originalAppointmentID}>
                <ItemAppt
                  key={index}
                  iteminfo={iteminfo}
                  setItemDataDrag={setItemDataDrag}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={flexitem + classNameHover}
            style={{ height: "calc(100% - 85px)" }}
          ></div>
        ))
      )}
    </>
  );
};
