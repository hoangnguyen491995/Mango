import { useContext } from "react";
import { AddServiceOnPopup } from "services/Appointments/AddServiceOnPopup";
import { IItemService } from "src/components/AddNewTix/Content/DataStructures";
import { checkAssignEmp } from "src/components/AddNewTix/Content/helper";
import { messageWarning } from "src/components/MessageAlert";
import { IItemDataTix } from ".";
import { ITixAppt } from "../DataStructures";

import SelectTechService from "./SelectTechServiceApptContext";

interface Props {
  item: IItemService;
  itemDataTix: IItemDataTix;
}
export const ItemService = ({ item, itemDataTix }: Props) => {
  const apiAddServiceOnPopup = new AddServiceOnPopup();
  const selectTSContext = useContext(SelectTechService);
  const handleClickItemService = async () => {
    //Add New Service
    const resultCheckAssign = await checkAssignEmp(
      item.itemID,
      selectTSContext.apptDetail.employeeID
    );
    if (resultCheckAssign == "success") {
      
      const param = {
        appointmentID: itemDataTix.originalAppointmentID,
        // ??
        // selectTSContext.apptListDetail.listApptDetail[
        //   selectTSContext.indexAppt || 0
        // ].appointmentDetailID
        itemCode: item.itemID,
        employeeID:
          selectTSContext.apptListDetail.listApptDetail[
            selectTSContext.indexAppt || 0
          ].employeeID,
        customPrice: item.basePrice,
        packID: 0,
        lscombo: "",
        rvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
        itemName: item.itemName,
        itemDuration: item.duration,
      };


      apiAddServiceOnPopup.addServiceOnPopup(param).then((res) => {
        if (res.status == 200) {
          selectTSContext.setIsChangeData(!selectTSContext.isChangeData);
        }
      });
    } else messageWarning(resultCheckAssign);
  };
  //url background
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO + "/Content/mango/";
  const UAT_BASE_URL =
    process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO + "/Content/mango/";
  return (
    <div
      className="cursor-pointer select-none p-3 "
      onClick={handleClickItemService}
    >
      <div
        className={
          "bg-cyan-300 w-24 h-24 flex justify-center items-center p-3  shadow-lg relative hover:bg-opacity-80 border border-gray " +
          (item.styleBackgroundPrice === 1
            ? "border-dashed "
            : "border-solid rounded")
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
          className="font-bold text-ellipsis overflow-hidden p-1 text-center "
          style={{
            WebkitLineClamp: "3",
            whiteSpace: "break-spaces",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.itemName.toUpperCase()}
        </p>
        <div className="border-solid border absolute border-cyan-500 bg-white w-4/5 rounded -bottom-2">
          <p className="text-center font-bold text-cyan-500 h-2">
            ${item.basePrice}
          </p>
        </div>
      </div>
    </div>
  );
};
