import { useContext, useEffect, useState } from "react";
import TixContext from "../../TixContext";
import { ShowInfoClient } from "./ShowInfoClient";
import { KeyNumber } from "../../GlobalComponents/KeyNumber";
import SelectTimeTech from "./SelectTimeTech";
import Clients from "./Clients";
import SearchService from "./SearchService";
import SelectTech from "./SelectTech";
import { ShowContent, type } from "../../helper";

type Props = {};
export const RightContent = ({ isAddNew }) => {
  //data context
  const tixCT = useContext(TixContext)[0];
  const [valueDur, setValueDur] = useState<number>(tixCT.durValue);
  const handleChangeDur = (value) => {
    setValueDur(value);
    tixCT.setShowContent(ShowContent(type.ShowSearchServiceItem));
  };
  useEffect(() => {
    const dataFilter = tixCT.dataItemTix[tixCT.idAppt].listWithTech.filter(
      (item) => item.employeeID === tixCT.idTech
    )[0];
    if (dataFilter && dataFilter.listServiceWithTech.length > 0) {
      if (dataFilter.listServiceWithTech[tixCT.indexItemService]) {
        dataFilter.listServiceWithTech[tixCT.indexItemService].itemDur =
          valueDur;
        tixCT.setDurValue(valueDur);
        tixCT.setStatusChange(!tixCT.statusChange);
      }
    }
  }, [valueDur]);
  return (
    <>
      {tixCT.showContent.showSelectTimeTix ? (
        <SelectTimeTech />
      ) : tixCT.showContent.showSearchClient ? (
        <Clients />
      ) : tixCT.showContent.showSelectTech ? (
        <SelectTech />
      ) : tixCT.showContent.showSearchServiceItem ? (
        <SearchService />
      ) : tixCT.showContent.showSelectDuration ? (
        <div className="w-full h-full p-5 ">
          <span className="text-mango-gray-6 text-[14px] font-semibold text-left !h-5 ">
            SELECT DURATION ""
          </span>
          <div className="w-[60%] mx-auto h-[598px] !mt-10">
            <KeyNumber
              title="DURATION"
              sizeKey="h-28 w-28"
              confirmValue={handleChangeDur}
            />
          </div>
        </div>
      ) : tixCT.showContent.showInfoClient ? (
        <ShowInfoClient isAddNew={isAddNew} />
      ) : tixCT.dataItemTix[tixCT.idAppt].customerID > 0 ? (
        <ShowInfoClient isAddNew={isAddNew} />
      ) : (
        <Clients />
      )}
    </>
  );
};
