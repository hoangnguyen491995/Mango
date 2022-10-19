import { message } from "antd";
import Item from "antd/lib/list/Item";
import moment from "moment";
import { useContext } from "react";
import { messageWarning } from "src/components/MessageAlert";
import {
  IItemService,
  ListServiceWithTech,
  ListWithTech,
} from "../../DataStructures";
import { checkAssignEmp, convert12HToSec, convertSecTo12H } from "../../helper";
import TixContext from "../../TixContext";

interface Props {
  item: IItemService;
}
export const ItemService = ({ item }: Props) => {
  const tixCT = useContext(TixContext)[0];

  const handleClickItemService = async (item: IItemService) => {
    const resultCheckAssign = await checkAssignEmp(item.itemID, tixCT.idTech);

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
          .add(item.duration, "minutes")
          .format("MM-DD-YYYY hh:mm A");

        dataFilter.listServiceWithTech.push({
          isChangeTime: false,
          isRequestTech: true,
          itemID: item.itemID,
          itemName: item.itemName,
          itemPrice: item.basePrice,
          itemDur: item.duration || 0,
          idParty: 0,
          startTime: dataStartTimeStr,
          endTime: dataEndTimeStr,
          isCategoryBook: false,
        });
        tixCT.setStatusChange(!tixCT.statusChange);
      }
    } else messageWarning(resultCheckAssign);

    tixCT.setIdItemService(item.itemID);
  };
  //url background
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO + "/Content/mango/";
  const UAT_BASE_URL =
    process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO + "/Content/mango/";
  return (
    <div
      className="cursor-pointer select-none p-3 "
      onClick={() => handleClickItemService(item)}
    >
      <div
        className={
          "bg-cyan-300 w-[105px] h-[80px] flex justify-center items-center px-[1px]   relative hover:bg-opacity-80 border border-gray mango-shadow " +
          (item.styleBackgroundPrice == 2
            ? "border-solid rounded"
            : "border-dashed")
        }
        style={{
          backgroundImage:
            "url(" +
            BASE_URL +
            item.backgroudColor +
            "),url(" +
            UAT_BASE_URL +
            item.backgroudColor +
            ")",
          borderColor: item.boderColor,
          backgroundSize: "100%",
        }}
      >
        <p
          className="font-bold text-ellipsis overflow-hidden  text-center text-xs leading-[15px]"
          style={{
            WebkitLineClamp: "3",
            whiteSpace: "break-spaces",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.itemName.toUpperCase()}
        </p>
        <div className="border-solid border absolute border-mango-text-dark bg-white w-4/5 rounded -bottom-2 h-6">
          <p className="text-center font-bold h-full truncate text-xs flex items-center justify-center ">
            ${item.basePrice}
          </p>
        </div>
      </div>
    </div>
  );
};
