import { Empty, Table } from "antd";
import { useEffect, useState } from "react";
import { GetInfoShedulerDetail } from "services/GetAppointmentShedulerDetail/GetAppointmentShedulerDetail";
import { APIListApptByIdClient } from "services/ListApptByIdClient/ListApptByIdClient";
export interface IListTicketbyID {
  appointmentID: number;
  customerID: number;
  serviceDate: string;
  startTime: string;
  endTime: string;
  aptStartTime: string;
  aptEndTime: string;
  firstName: null;
  lastName: null;
  customerName: string;
  contactPhone: null;
  employeeID: null;
  aptEmployeeID: number;
  nickName: string;
  email: null;
  aptComment: null;
  isGroup: boolean;
  appointmentStatusName: string;
  appointmentStatusID: number;
  appointmentSubject: string;
  isBookOnline: null;
}

interface Props {
  idClient: number;
}

export const TableListTicketByIdClient = ({ idClient }: Props) => {
  const [dataListTicketbyId, setDataListTicketbyId] =
    useState<Array<IListTicketbyID>>();
  const dataListTicket = new APIListApptByIdClient();
  useEffect(() => {
    if (idClient != 0) {
      const body = {
        idClient: idClient,
        rvcNo: 0,
      };
      dataListTicket.ListApptByIdClient(body).then((res) => {
        if (res.status == 200) {
          setDataListTicketbyId(res.data);
        }
      });
    }
  }, [idClient]);
  const dataSourceListTicket = dataListTicketbyId?.map(
    (item: IListTicketbyID) => {
      return {
        key: item.appointmentID,
        tech: item.nickName,
        status: item.appointmentStatusName,
        service: item.appointmentSubject,
        date: item.serviceDate,
        time: item.startTime,
      };
    }
  );

  const columns = [
    {
      title: "TECH",
      dataIndex: "tech",
      key: "tech",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "SERVICES",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
    },
  ];
  return (
    <>
      {dataListTicketbyId ? (
        <Table
          dataSource={dataSourceListTicket}
          columns={columns}
          pagination={false}
          className="max-h-60 w-[600px]  bg-white overflow-auto "
        ></Table>
      ) : (
        <Empty />
      )}
    </>
  );
};
