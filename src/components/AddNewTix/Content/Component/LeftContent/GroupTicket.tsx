// @flow
import { Alert, Button, message, Row } from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { APIFastRegister } from "services/FastRegisterCustomer/FastRegisterCustomer";
import { messageWarning } from "src/components/MessageAlert";
import { IRegisterCustomer, IResultFastRegister } from "../../DataStructures";
import { getTimeNearest12H } from "../../helper";
import TixContext, { ItemTicketdata } from "../../TixContext";

type Props = {};
export const GroupTicket = (props: Props) => {
  //data context
  const tixCT = useContext(TixContext)[0];
  const [count, setCount] = useState<number>(tixCT.dataItemTix.length);
  const d = new Date();
  const getDay = d.getDate();
  const getMonth = d.getMonth() + 1;
  const getYear = d.getFullYear();
  const inc = () => {
    if (tixCT.dataItemTix[0].customerID > 0) {
      setCount(count + 1);
      tixCT.setDataItemTix((cur) => [
        ...cur,
        {
          appointmentID: 0,
          name: tixCT.dataItemTix[0].name,
          date: moment().format("MM-DD-YYYY"),
          customerID: tixCT.dataItemTix[0].customerID,
          phone: "Client No Phone",
          isStartAllSameTime: false,
          aptStartTime: tixCT.dataItemTix[0].aptStartTime,
          totalDuration: 0,
          note: "",
          listWithTech: [
            {
              employeeID: 9999,
              employeeNickName: "NEXT AVAILABLE",
              isRequestTech: false,
              listServiceWithTech: [],
            },
          ],
        },
      ]);
      tixCT.setStatusChange(!tixCT.statusChange);
    } else {
      messageWarning("No Client Found To Create A Group");
    }
  };

  const dec = () => {
    count > 1 && setCount(count - 1);
    if (tixCT.dataItemTix.length !== 1) {
      tixCT.dataItemTix.splice(tixCT.dataItemTix.length - 1, 1);
    }
    tixCT.setIdAppt(0);
    tixCT.setStatusChange(!tixCT.statusChange);
  };
  const handleFastRegister = async (name) => {
    const body: IRegisterCustomer = {
      date: "string",
      empId: 0,
      gender: true,
      firstName: name,
      lastName: "G" + count,
      phone: "string",
      sex: "string",
      portalCode: "string",
      isKid: true,
      rvcNo: 5,
    };
    const dataRegister = new APIFastRegister();
    const result = dataRegister.FastRegister(body).then((res) => res);
    return (await result).data;
  };
  const handleIncGroup = async () => {
    if (tixCT.dataItemTix[0].customerID > 0 && tixCT.dataItemTix.length === 1) {
      setCount(count + 1);
      const result: IResultFastRegister = await handleFastRegister(
        tixCT.dataItemTix[0].name
      );
      // console.log(result);

      tixCT.setDataItemTix((cur) => [
        ...cur,
        {
          appointmentID: 0,
          name: result.cus.firstName + " " + result.cus.lastName,
          date: moment().format("MM-DD-YYYY"),
          customerID: result.id,
          phone: "Client No Phone",
          isStartAllSameTime: false,
          aptStartTime: tixCT.dataItemTix[0].aptStartTime,
          totalDuration: 0,
          note: "",
          listWithTech: [
            {
              employeeID: 9999,
              employeeNickName: "NEXT AVAILABLE",
              isRequestTech: false,
              listServiceWithTech: [],
            },
          ],
        },
      ]);
      tixCT.setStatusChange(!tixCT.statusChange);
    } else {
      messageWarning("No Client Found To Create A Group");
    }
  };
  return (
    <Row>
      <div
        onClick={handleIncGroup}
        className=" hover:bg-mango-primary-blue-light !h-[35px] !px-[10px] !py-[0px]  cursor-pointer leading-[15px] text-[12px] rounded-[4px] items-center flex font-semibold text-mango-primary-blue uppercase "
      >
        <p className=" !font-bold !text-mango-primary-blue !box-border !m-0 ">
          {" "}
          GROUP
        </p>
      </div>
      {count > 1 && (
        <div className="flex border border-gray-400 rounded-md shadow-md mt-3 ">
          <button
            className="text-2xl font-bold  w-10 text-gray-900 hover:bg-slate-300   "
            onClick={dec}
          >
            -
          </button>

          <span className="text-xl font-bold w-10 text-gray-900 text-center ">
            {count}
          </span>

          <button
            className="text-2xl font-bold w-10 text-gray-900 hover:bg-slate-300"
            onClick={inc}
          >
            +
          </button>
        </div>
      )}
    </Row>
  );
};
