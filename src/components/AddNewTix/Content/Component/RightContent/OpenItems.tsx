import { Row, Col, Button, Input } from "antd";
import moment from "moment";
import * as React from "react";
import { useState, useContext } from "react";

import { messageWarning } from "src/components/MessageAlert";
import OpenItemGlobal from "src/components/OpenItem/OpenItemGlobal";
import styled from "styled-components";
import { ListServiceWithTech } from "../../DataStructures";
import { checkAssignEmp } from "../../helper";
import TixContext from "../../TixContext";

interface State {
  index: number;
  valueType: string;
}
interface TypeValue {
  price: string;
  duration: string;
  productCharge: string;
  turn: string;
}
const Openitems = () => {
  const tixCT = useContext(TixContext)[0];

  const [customNameItem, setCustomNameItem] = useState<string>("Custom Price");
  const [valueObject, setValueObject] = useState<Array<string>>([
    "0",
    "0",
    "0",
    "0",
  ]);

  const handleAddOpenItem = async () => {
    const resultCheckAssign = await checkAssignEmp(
      tixCT.customPriceID,
      tixCT.idTech
    );

    if (resultCheckAssign == "success") {
      const dataFilter = tixCT.dataItemTix[tixCT.idAppt].listWithTech.filter(
        (item) => item.employeeID === tixCT.idTech
      )[0];
      if (dataFilter) {
        //Get item service cuối cùng của tech
        const dataLastTime: ListServiceWithTech =
          dataFilter.listServiceWithTech[
            dataFilter.listServiceWithTech.length - 1
          ];
        var dataStartTime = tixCT.startTimeTix;
        if (dataLastTime) {
          // Nếu tồn tại item service cuối cùng
          dataStartTime = dataLastTime.endTime;
        }
        const dataStartTimeStr = dataStartTime;
        const dataEndTimeStr = moment(dataStartTimeStr)
          .add(valueObject[1], "minutes")
          .format("MM-DD-YYYY hh:mm A");

        dataFilter.listServiceWithTech.push({
          isChangeTime: false,
          isRequestTech: true,
          itemID: tixCT.customPriceID,
          itemName: customNameItem,
          itemPrice: Number(valueObject[0]),
          itemDur: Number(valueObject[1]) || 0,
          idParty: 0,
          startTime: dataStartTimeStr,
          endTime: dataEndTimeStr,
          isCategoryBook: false,
        });
        tixCT.setStatusChange(!tixCT.statusChange);
      }
    } else messageWarning(resultCheckAssign);

    tixCT.setIdItemService(tixCT.customPriceID);
  };

  return (
    <div className="w-full h-[580px] ">
      <OpenItemGlobal
        bgHeader={false}
        onConfirm={handleAddOpenItem}
        valueObject={valueObject}
        setValueObject={setValueObject}
        customNameItem={customNameItem}
        setCustomNameItem={setCustomNameItem}
        classBtnConfirm={
          "w-[80%] !mt-auto flex items-center justify-center !mx-auto !h-[40px] !rounded-[4px] !bg-mango-primary-blue !border-mango-primary-blue mango-shadow font-bold text-center text-white"
        }
      />
    </div>
  );
};
export default Openitems;
