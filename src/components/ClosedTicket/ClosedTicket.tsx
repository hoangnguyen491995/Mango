import {
  Button,
  Calendar,
  Col,
  DatePicker,
  DatePickerProps,
  Image,
  Input,
  List,
  Popover,
  Row,
  Select,
} from "antd";

import moment from "moment";

import React, { useEffect, useState } from "react";

import { GetWorkingEmployeeList } from "services/Employees/GetWorkingEmployeeList";

import { ITechSalonCenter } from "../Book/IterfaceStructures";

import TableListTicket from "./TableListTicket";

export interface ISort {
  typeSort: string;
  typeFilter: string;
  valueFilter: string;
}
export interface ITypeSort {
  sortTicket: string;
  sortClient: string;
  sortService: string;
  sortTech: string;
  sortTicketTotal: string;
  sortTicketTip: string;
  sortPayment: string;
  sortClosedTicket: string;
}
type PickerType = "date" | "week" | "month" | "year";
export const ClosedTicket = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [dataListTech, setListDataLisTech] = useState<Array<ITechSalonCenter>>(
    []
  );
  const [listFilterTech, setListFilterTech] = useState<string>("");
  const [listFilterPayment, setListFilterPayment] = useState<string>("");
  const [listFilterPromo, setListFilterPromo] = useState<string>("");

  const [dateFilterFrom, setDateFilterFrom] = useState<string>(
    moment().format("MM-DD-YYYY")
  );
  const [dateFilterTo, setDateFilterTo] = useState<string>(
    moment().format("MM-DD-YYYY")
  );

  const [type, setType] = useState<PickerType>("date");
  const [typeTicket, setTypeTicket] = useState<string>("CLOSED");
  const [searchClient, setSearchClient] = useState<string>("");

  const { Option } = Select;

  const [sortData, setSortData] = useState<ISort>({
    typeSort: "desc",
    typeFilter: "sortClosedTicket",
    valueFilter: "EndTime desc",
  });

  const getInfoTech = new GetWorkingEmployeeList();

  useEffect(() => {
    const date = moment().format("MM-DD-YYYY");
    getInfoTech.getWorkingEmployeeList(date, 0, 1, false).then((res) => {
      if (res.status == 200) {
        const data: Array<ITechSalonCenter> = res.data.techs.filter(
          (item) => item.employeeID > 9999
        );
        setListDataLisTech(data);
      }
    });
  }, []);

  const handleChangeTech = (value: string[]) => {
    setListFilterTech(value.toString());
  };
  const handleChangePayment = (value: string[]) => {
    setListFilterPayment(value.toString());
  };
  const handleChangePromo = (value: string[]) => {
    setListFilterPromo(value.toString());
  };
  const handleChangeTicketType = (value: string) => {
    setTypeTicket(value);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      switch (type) {
        case "date":
          setDateFilterFrom(date.format("MM/DD/YYYY"));
          setDateFilterTo(date.format("MM/DD/YYYY"));
          break;
        case "week":
          setDateFilterFrom(date.clone().startOf("week").format("MM/DD/YYYY"));
          setDateFilterTo(date.clone().endOf("week").format("MM/DD/YYYY"));
          break;
        case "month":
          setDateFilterFrom(date.clone().startOf("month").format("MM/DD/YYYY"));
          setDateFilterTo(date.clone().endOf("month").format("MM/DD/YYYY"));
          break;
        case "year":
          setDateFilterFrom(date.clone().startOf("year").format("MM/DD/YYYY"));
          setDateFilterTo(date.clone().endOf("year").format("MM/DD/YYYY"));
          break;
        default:
          setDateFilterFrom(date.format("MM/DD/YYYY"));
          setDateFilterTo(date.format("MM/DD/YYYY"));
          break;
      }
    }
  };

  return (
    <div className="w-full h-full bg-white flex">
      {/* Ticket View */}
      <div
        className={
          "border-r border-black relative pt-6 " +
          (collapsed ? " w-[300px]" : "w-[50px]")
        }
      >
        {collapsed ? (
          <>
            <span className="font-bold text-2xl">Ticket View</span>
            <div className="rounded-xl mx-1 h-[400px] customCalendar px-1 ">
              <DatePicker
                onChange={onChangeDate}
                open
                bordered={false}
                picker={type}
                superNextIcon
                superPrevIcon
                size="large"
                // showToday={false}
                dropdownClassName ="customCalendarDropDown"
                className="w-full border border-black "
              />
            </div>
            <div>
              <Select
                value={type}
                onChange={setType}
                className="w-24 text-center"
              >
                <Option value="date">Day</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
                <Option value="year">Year</Option>
              </Select>
            </div>
          </>
        ) : (
          <>
            <Image src="/assets/imgs/assets_19.png" preview={false} />
          </>
        )}
        <div
          className="absolute top-5 -right-5 bg-white border-r z-25 border-black  h-10 w-5 rounded-r-[20px] flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className="border-t-2 w-2 border-black "></span>
        </div>
      </div>

      {/* Ticket Management*/}
      <div
        className="px-8 py-6"
        style={{
          width: collapsed ? "calc( 100% - 300px )" : "calc( 100% - 50px )",
        }}
      >
        {/* Header */}
        <div className="flex justify-between">
          <span className="font-bold text-3xl text-left">
            Ticket Management
          </span>
          <div className="h-12 flex items-center">
            <Input
              placeholder="SEARCH CLIENT/TICKET# "
              className="!mr-2 px-1"
              value={searchClient}
              onChange={(e) => setSearchClient(e.target.value)}
            ></Input>
            <Image
              src="/assets/imgs/search.svg"
              preview={false}
              className="!h-7 !w-7 flex cursor-pointer"
            />
          </div>
        </div>

        {/* List Filter */}
        <div className="flex">
          {/* Filter by Tech */}
          <Image
            src="/assets/imgs/30-pixel-assets_23.png"
            preview={false}
            className="!h-6"
          />
          <div className="w-[20%] border-b border-black rounded-b">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
                textAlign: "left",
              }}
              bordered={false}
              placeholder="STAFF"
              defaultValue={[]}
              onChange={handleChangeTech}
            >
              {dataListTech.map((item, index) => (
                <Option key={item.employeeID}>{item.employeeName}</Option>
              ))}
            </Select>
          </div>

          {/* Filter by  Payment */}
          <Image
            src="/assets/imgs/assets_05.png"
            preview={false}
            className="!h-6"
          />
          <div className="w-[20%] border-b border-black rounded-b">
            <Select
              mode="multiple"
              allowClear
              bordered={false}
              style={{
                width: "100%",
                textAlign: "left",
              }}
              placeholder="PAYMENT"
              defaultValue={[]}
              onChange={handleChangePayment}
            >
              <Option key={"Cash Payment"}>Cash</Option>
              <Option key={"Gift Card Payment"}>Gift Cash</Option>
              <Option key={"Exte%'' and I.PaymentType like ''%400"}>
                C.C External
              </Option>
              <Option key={"min3k"}>C.C Internal</Option>
              <Option key={"] Payment%'' and I.PaymentMode like ''%Pay "}>
                Other
              </Option>
            </Select>
          </div>
          {/* Filter by PROMO */}

          <Image
            src="/assets/imgs/24px-Run-Promotion.svg"
            preview={false}
            className="!h-6 flex items-center mx-auto my-auto"
          />
          <div className="w-[20%] border-b border-black rounded-b">
            <Select
              mode="multiple"
              bordered={false}
              allowClear
              style={{ width: "100%", textAlign: "left" }}
              placeholder="CHOOSE PROMO"
              defaultValue={[]}
              onChange={handleChangePromo}
            >
              <Option key={"REDEEM"}>Redeem Point</Option>
              <Option key="COUPON">Coupon</Option>
              <Option key="DISALL">Discount All</Option>
              <Option key="COMP">COMP</Option>
            </Select>
          </div>
          {/* Filter by Ticket Type */}
          <div>
            <span className="!text-mango-primary-blue ml-1">TICKET TYPE:</span>
            <Select
              defaultValue="CLOSED"
              className="!text-mango-primary-blue customSelectBorder"
              value={typeTicket}
              style={{ width: 150, border: "none !important" }}
              onChange={handleChangeTicketType}
            >
              <Option value="CLOSED">CLOSED</Option>
              <Option value="CANCELED">CANCELED</Option>
              <Option value="VOIDED">VOIDED</Option>
              <Option value="NOT PAYMENT">NOT PAYMENT</Option>
              <Option value="ALL">ALL</Option>
            </Select>
          </div>
        </div>
        {/* Table */}

        <TableListTicket
          listFilterTech={listFilterTech}
          listFilterPayment={listFilterPayment}
          listFilterPromo={listFilterPromo}
          dateFilterFrom={dateFilterFrom}
          dateFilterTo={dateFilterTo}
          sortData={sortData}
          setSortData={setSortData}
          searchClient={searchClient}
          typeTicket={typeTicket}
          type={type}
        />
      </div>
    </div>
  );
};
