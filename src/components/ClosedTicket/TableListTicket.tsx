import { Spin, Tooltip } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { ShowCategoryForm } from "services/Admin/ShowCategoryForm";
import { currencyFormat } from "src/helper/General";
import UseSearch from "src/utils/UseSearch";
import { ISort } from "./ClosedTicket";
import { IDetailClosedTicket } from "./DataStructures";
import { ItemTicketManagement } from "./ItemTicketManagement";

interface Props {
  dateFilterFrom: string;
  dateFilterTo: string;
  searchClient: string;
  setSortData: Function;
  sortData: ISort;
  typeTicket: string;
  listFilterTech: string;
  listFilterPayment: string;
  listFilterPromo: string;
  type: string;
}

const TableListTicket = ({
  setSortData,
  sortData,
  searchClient,
  typeTicket,
  dateFilterFrom,
  dateFilterTo,
  listFilterTech,
  listFilterPayment,
  listFilterPromo,
  type,
}: Props) => {
  const [isLoadingDataTable, setIsLoadingDataTable] = useState<boolean>(false);

  const valueSearchClient: string = UseSearch(searchClient, 500);
  const apiShowCategoryForm = new ShowCategoryForm();
  const [listDataClosedTicket, setListDataClosedTicket] =
    useState<IDetailClosedTicket>();
  useEffect(() => {
    setIsLoadingDataTable(true);
    let type = "7";
    switch (typeTicket) {
      case "CLOSED":
        type = "7";
        break;
      case "ALL":
        type = "7,9,-1";
        break;
      case "CANCELED":
        type = "9";
        break;
      case "VOIDED":
        type = "-1";
        break;
      case "NOT PAYMENT":
        type = "0";
        break;
      default:
        type = "7";
        break;
    }

    const body = {
      FromDate: moment(dateFilterFrom).format("MM/DD/YYYY"),
      ToDate: moment(dateFilterTo).format("MM/DD/YYYY"),
      TicketNum: valueSearchClient.toLowerCase(),
      CustomerNum: "",
      EmployeeID: listFilterTech,
      Payment: listFilterPayment || "".trim(),
      Promo: listFilterPromo || "".trim(),
      Type: type,
      LastRow: 0,
      OrderBy: sortData.valueFilter,
    };
    apiShowCategoryForm
      .showCategoryForm(
        body.FromDate,
        body.ToDate,
        body.TicketNum,
        body.CustomerNum,
        body.EmployeeID,
        body.Payment,
        body.Promo,
        body.Type,
        body.LastRow,
        body.OrderBy
      )
      .then((res) => {
        if (res.status == 200) {
          setListDataClosedTicket(res.data);
          setIsLoadingDataTable(false);
        }
      })
      .catch(() => setIsLoadingDataTable(false));
  }, [
    typeTicket,
    listFilterTech,
    listFilterPayment,
    listFilterPromo,
    valueSearchClient,
    JSON.stringify(sortData),
    dateFilterFrom,
    dateFilterTo,
    type,
  ]);

  const handleSort = (typeFilter, typeSort, valueFilter) => {
    setSortData({
      typeSort: typeSort,
      typeFilter: typeFilter,
      valueFilter: valueFilter,
    });
  };
  const handleShowButtonSort = (typeFilter, typeSort) => {
    if (sortData.typeFilter == typeFilter && sortData.typeSort == typeSort) {
      return "";
    } else return " opacity-25";
  };
  return (
    <div
      className="w-full select-none "
      style={{ height: "calc(100vh - 280px)" }}
    >
      <div className=" border-b border-black h-12 w-full flex items-center font-bold">
        <div className=" w-[10%] ">
          <div className="flex justify-center">
            <span>TICKET</span>
            <div className={"ml-1 "}>
              <img
                src="/assets/imgs/TicketManagment/sort-up.png"
                className={
                  "h-3 w-3 " + handleShowButtonSort("sortTicket", "inc")
                }
                data-order="A.AppointmentID"
                onClick={() =>
                  handleSort("sortTicket", "inc", "A.AppointmentID")
                }
              />
              <img
                src="/assets/imgs/TicketManagment/sort-down.png"
                className={
                  " h-3 w-3 " + handleShowButtonSort("sortTicket", "desc")
                }
                data-order="A.AppointmentID desc"
                onClick={() =>
                  handleSort("sortTicket", "desc", "A.AppointmentID desc")
                }
              />
            </div>
          </div>
        </div>
        <div className=" w-[4%] ">
          {" "}
          <img
            src="/assets/imgs/TicketManagment/30-pixel-assets_09.png"
            className="h-5 mx-auto "
          />
        </div>
        <div className=" w-[15%] ">
          <div className="flex justify-center">
            CLIENT{" "}
            <div className={"ml-1 "}>
              <img
                src="/assets/imgs/TicketManagment/sort-up.png"
                className={
                  " h-3 w-3 " + handleShowButtonSort("sortClient", "inc")
                }
                data-order="CustomerName"
                onClick={() => handleSort("sortClient", "inc", "CustomerName")}
              />
              <img
                src="/assets/imgs/TicketManagment/sort-down.png"
                className={
                  " h-3 w-3 " + handleShowButtonSort("sortClient", "desc")
                }
                data-order="CustomerName desc"
                onClick={() =>
                  handleSort("sortClient", "desc", "CustomerName desc")
                }
              />
            </div>
          </div>
        </div>
        <div className=" w-[9%] ">
          <div className="flex justify-center">
            TECH
            <div className={"ml-1 "}>
              <img
                src="/assets/imgs/TicketManagment/sort-up.png"
                className={
                  " h-3 w-3 " + handleShowButtonSort("sortTech", "inc")
                }
                data-order="EmployeeName"
                onClick={() => handleSort("sortTech", "inc", "EmployeeName")}
              />
              <img
                src="/assets/imgs/TicketManagment/sort-down.png"
                className={
                  "h-3 w-3 " + handleShowButtonSort("sortTech", "desc")
                }
                data-order="EmployeeName desc"
                onClick={() =>
                  handleSort("sortTech", "desc", "EmployeeName desc")
                }
              />
            </div>
          </div>
        </div>
        <div className=" w-[15%] ">
          <div className="flex justify-center">
            SERVICES/PRODUCTS
            <div className={"ml-1 "}>
              <img
                src="/assets/imgs/TicketManagment/sort-up.png"
                className={
                  " h-3 w-3 " + handleShowButtonSort("sortService", "inc")
                }
                data-order="AppointmentSubject"
                onClick={() =>
                  handleSort("sortService", "inc", "AppointmentSubject")
                }
              />
              <img
                src="/assets/imgs/TicketManagment/sort-down.png"
                className={
                  " h-3 w-3 " + handleShowButtonSort("sortService", "desc")
                }
                data-order="AppointmentSubject desc"
                onClick={() =>
                  handleSort("sortService", "desc", "AppointmentSubject desc")
                }
              />
            </div>
          </div>
        </div>
        <div className=" w-[11%] ">
          <div className="flex justify-center">
            TICKET TOTAL
            <div className={"ml-1 "}>
              <img
                src="/assets/imgs/TicketManagment/sort-up.png"
                className={
                  " h-3 w-3 " + handleShowButtonSort("sortTicketTotal", "inc")
                }
                data-order="I.TotalBase"
                onClick={() =>
                  handleSort("sortTicketTotal", "inc", "I.TotalBase")
                }
              />
              <img
                src="/assets/imgs/TicketManagment/sort-down.png"
                className={
                  "h-3 w-3 " + handleShowButtonSort("sortTicketTotal", "desc")
                }
                data-order="I.TotalBase desc"
                onClick={() =>
                  handleSort("sortTicketTotal", "desc", "I.TotalBase desc")
                }
              />
            </div>
          </div>
        </div>
        <div className=" w-[11%] ">
          <div className="flex justify-center">
            TIP{" "}
            <div className={"ml-1 "}>
              <img
                src="/assets/imgs/TicketManagment/sort-up.png"
                className={
                  "h-3 w-3 " + handleShowButtonSort("sortTicketTip", "inc")
                }
                data-order="TipAmount"
                onClick={() => handleSort("sortTicketTip", "inc", "TipAmount")}
              />
              <img
                src="/assets/imgs/TicketManagment/sort-down.png"
                className={
                  "h-3 w-3 " + handleShowButtonSort("sortTicketTip", "desc")
                }
                data-order="TipAmount desc"
                onClick={() =>
                  handleSort("sortTicketTip", "desc", "TipAmount desc")
                }
              />
            </div>
          </div>
        </div>
        <div className=" w-[11%] ">
          <div className="flex justify-center">
            PAYMENT TYPE
            <div className={"ml-1 "}>
              <img
                src="/assets/imgs/TicketManagment/sort-up.png"
                className={
                  "h-3 w-3 " + handleShowButtonSort("sortPayment", "inc")
                }
                data-order="PaymentMode"
                onClick={() => handleSort("sortPayment", "inc", "PaymentMode")}
              />
              <img
                src="/assets/imgs/TicketManagment/sort-down.png"
                className={
                  "h-3 w-3 " + handleShowButtonSort("sortPayment", "desc")
                }
                data-order="PaymentMode desc"
                onClick={() =>
                  handleSort("sortPayment", "desc", "PaymentMode desc")
                }
              />
            </div>
          </div>
        </div>
        <div className=" w-[14%] ">
          <div className="flex justify-center">
            CLOSED DATE | TIME{" "}
            <div className={"ml-1 "}>
              <img
                src="/assets/imgs/TicketManagment/sort-up.png"
                className={
                  "h-3 w-3 " + handleShowButtonSort("sortClosedTicket", "inc")
                }
                data-order="EndTime"
                onClick={() => handleSort("sortClosedTicket", "inc", "EndTime")}
              />
              <img
                src="/assets/imgs/TicketManagment/sort-down.png"
                className={
                  "h-3 w-3 " + handleShowButtonSort("sortClosedTicket", "desc")
                }
                data-order="EndTime desc"
                onClick={() =>
                  handleSort("sortClosedTicket", "desc", "EndTime desc")
                }
              />
            </div>
          </div>
        </div>
      </div>

      {isLoadingDataTable ? (
        <Spin
          spinning={isLoadingDataTable}
          className="w-full h-full overflow-auto !mt-24"
        />
      ) : (
        <div className="  w-full h-full overflow-auto ">
          {listDataClosedTicket &&
            listDataClosedTicket.listTicketManager.map((itemData, index) => (
              <ItemTicketManagement itemData={itemData} key={index} />
            ))}
        </div>
      )}
    </div>
  );
};
export default TableListTicket;
