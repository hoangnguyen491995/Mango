import React, { useState, useEffect, useContext } from "react";
import ImageTech from "./ImageTech";
import styled from "styled-components";
import EyeShowPhone from "./EyeShowPhone";

import { IItem, IListEvents } from "./DataStructures";
import { GetListAppointmentForListView } from "services/Appointments/GetListAppointmentForListView";
import HomeContext from "../Book/HomeContext";

import moment from "moment";
import { Badge } from "antd";
import  ItemTicket from "./ItemTicket";

const TableWrap = styled.div`
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding: 9px !important;
  }
`;
interface Props {
  listServiceFilter: string[];
}
const TableListView = ({ listServiceFilter }: Props) => {
  const bookContext = useContext(HomeContext)[0];
  const [dataInfo, setDataInfo] = useState<IListEvents>();
  const listForScheduleByDate = new GetListAppointmentForListView();
  const [curPage, setCurPage] = useState<string>("1");
  const [isClickItem, setIsClickItem] = useState<boolean>(false)
  const [appoimentIdClick, setAppoimentIdClick] = useState<number>(0)

  // console.log(bookContext);
  useEffect(() => {
    // const EmployeeId = "";

    const sum = bookContext.typeListView ? "1" : "0";
    // const TakeAppt = "";
    const dateFrom = moment(bookContext.dateListView.start).format(
      "MM-DD-YYYY"
    );
    const PageSize = "500";
    const dateTo = moment(bookContext.dateListView.end).format("MM-DD-YYYY");
console.log("listServiceFiltera", listServiceFilter);

    try {
      listForScheduleByDate
        .getListAppointmentForListView(
          dateFrom,
          dateTo,
          sum,
          listServiceFilter,
          curPage,
          PageSize
        )
        .then((res) => {
          if (res.status === 200) {
            setDataInfo(res.data);

          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [bookContext.dateListView, bookContext.typeListView,listServiceFilter.length]);

  return (
    <div className="px-1 mt-5">
      <div className="space-y-2 ">
        <div className="flex px-3 ui-listview-box ">
          <div className="w-1/12 box-header-listview pl-3">
            TICKET(#)
            <Badge count={dataInfo?.totalItems} overflowCount={999}></Badge>
          </div>
          <div className="w-[12%]  box-header-listview">
            TECH
          </div>
          <div className="w-1/12 box-header-listview">
            REQUEST
          </div>
          <div className="w-[20%] box-header-listview">
            SERVICE(#)
            <Badge count={dataInfo?.toTalServices} overflowCount={999}></Badge>
          </div>
          <div className="w-1/12 box-header-listview">
            DUR
          </div>
          <div className="w-1/12 box-header-listview">
            CLIENT
          </div>
          <div className="w-1/12  box-header-listview">
            PHONE
          </div>
          <div className="w-1/12  box-header-listview">
            DATE
          </div>
          <div className="w-1/12  box-header-listview">
            APP TIME
          </div>
          <div className="w-1/12  box-header-listview">
            STATUS
          </div>
        </div>
      </div>

      <div className={`overflow-y-scroll h-[700px] space-y-1   mt-2 `}>
        {dataInfo?.items.map((info: IItem, index) => (
          <ItemTicket key={index} info={info} 
          setIsClickItem={setIsClickItem}
           isClickItem={isClickItem} 
           setAppoimentIdClick = {setAppoimentIdClick}
           appoimentIdClick = {appoimentIdClick}/>
        ))}
      </div>
    </div>
  );
};

export default TableListView;
