import { Tooltip } from "antd";
import moment from "moment";
import { useRef, useState } from "react";
import { currencyFormat } from "src/helper/General";
import BillTicket from "../BatchTipIconLeft/BillTicket";
import ContentBatchNow from "../BatchTipIconLeft/ContentBatchNow";
import ReceiptTicket from "../BatchTipIconLeft/ReceiptTicket";
import { ListTicketManager } from "./DataStructures";


interface Props {
  itemData: ListTicketManager;
}
export const ItemTicketManagement = ({ itemData }: Props) => {

  const [showModalClosedTix, setShowModalClosedTix] = useState(false);
  const handleShowModalClosedTix = () => {
    if (itemData.appointmentStatusID == 7) {
      setShowModalClosedTix(true);
    }
  };
  const handleOkShowModalClosedTix = () => {
    setShowModalClosedTix(false);
  };
  const handleCancelShowModalClosedTix = () => {
    setShowModalClosedTix(false);
  };
  const bgRow = (statusId) => {
    switch (statusId) {
      case -1:
        return "bg-mango-border-medium";
      case 9:
        return "bg-mango-primary-orange-1";
      case 7:
        return "bg-white";
      default:
        return "bg-white";
    }
  };
  return (
    <>
      {showModalClosedTix && (
        <BillTicket
          checkNo={itemData.checkNo}
          visible={showModalClosedTix}
          onOk={handleOkShowModalClosedTix}
          onCancel={handleCancelShowModalClosedTix}
        />
      )}

      <div
        className={
          "border-b border-dashed border-black h-6 flex " +
          bgRow(itemData.appointmentStatusID)
        }
      >
        {/* Ticket */}
      
        <div className="w-[10%]">
          <span
            className="hover:text-mango-primary-orange-2 cursor-pointer"
            onClick={handleShowModalClosedTix}
          >
            {itemData.appointmentID}
          </span>
        </div>
        {/*  */}
        <div className="w-[4%]"></div>
        {/* Client */}
        <div
          className={
            "w-[15%] truncate" +
            (itemData.appointmentStatusID != 7 ? " line-through" : "")
          }
        >
          {itemData.customerName}
        </div>
        {/* Tech */}
        <div
          className={
            "w-[9%]" +
            (itemData.appointmentStatusID != 7 ? " line-through" : "")
          }
        >
          {itemData.employeeName}
        </div>
        {/* Service/products */}
        <div className="w-[15%]">
          <Tooltip title={itemData.appointmentSubject || ""}>
            <p
              className={
                "truncate !m-0 !p-0" +
                (itemData.appointmentStatusID != 7 ? " line-through" : "")
              }
            >
              {itemData.appointmentSubject || ""}
            </p>
          </Tooltip>
        </div>
        {itemData.appointmentStatusID != 7 ? (
          <div className="w-[22%]">
            <span className="font-bold ">
              {itemData.appointmentStatusID == -1 && "VOIDED"}
              {itemData.appointmentStatusID == 9 && "CANCELED"}
              {itemData.appointmentStatusID == 0 && "NOT PAYMENT"}
            </span>
          </div>
        ) : (
          <>
            {/* ticket total  */}
            <div className="w-[11%]">
              {" "}
              <span className="text-mango-primary-blue">
                ${currencyFormat(itemData.totalBase) || 0}
              </span>
            </div>
            {/* tip  */}
            <div className="w-[11%]">
              {" "}
              <span
                className={
                  itemData.tipAmount == 0
                    ? "text-mango-primary-blue-2"
                    : "text-mango-primary-orange-1"
                }
              >
                ${currencyFormat(itemData.tipAmount || 0)}
              </span>
            </div>
          </>
        )}

        {/* payment type */}
        <div className="w-[11%]">
          <Tooltip
            title={
              itemData.paymentMode == "not value"
                ? itemData.deleteReason.toUpperCase()
                : itemData.paymentMode
            }
          >
            <p
              className={
                "truncate !m-0 !p-0 w-full " +
                (itemData.paymentMode == "Cash Payment"
                  ? "text-mango-primary-red"
                  : "black font-bold")
              }
            >
              {itemData.paymentMode == "not value"
                ? itemData.deleteReason.toUpperCase()
                : itemData.paymentMode}
            </p>
          </Tooltip>
        </div>
        {/* closed date|time */}
        <div className="w-[14%]">
          <Tooltip
            title={moment(itemData.endTime).format("MM-DD-YYYY | hh:mm A")}
          >
            <p className={"truncate !m-0 !p-0 w-full "}>
              {moment(itemData.endTime).format("MM-DD-YYYY | hh:mm A")}
            </p>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
