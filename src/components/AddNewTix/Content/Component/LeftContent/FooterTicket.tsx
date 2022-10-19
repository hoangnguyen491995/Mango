import { Button, Col, message, Row } from "antd";
import moment from "moment";
import { useContext } from "react";
import TixContext from "../../TixContext";
import { convert12HToSec, convertSecTo12H } from "../../helper";
import { APIConfirmAddNewTicket } from "services/ConfirmAddNewTicket/ConfirmAddNewTicket";
import { IItem } from "../../DataStructures";

import { useDispatch } from "react-redux";
import { ConfirmBooking } from "src/redux/reducer";
import { messageSuccess, messageWarning } from "src/components/MessageAlert";
import { ButtonUAT } from "src/components/UATDesign/ButtonUAT";

export const FooterTicket = ({ onOk, onCancel }) => {
  const tixCT = useContext(TixContext)[0];

  const dispatch = useDispatch();
  const handleAddGroup = (index) => {
    const dataBooking: Array<IItem> = [];
    const dataGroupName = tixCT.dataItemTix[index].listWithTech
      .reduce((groupName: string, item) => {
        return groupName.concat(item.employeeNickName);
      }, [])
      .join(",");
    const appointmentSubject: Array<string> = [];

    tixCT.dataItemTix[index].listWithTech.map((itemList) => {
      itemList.listServiceWithTech.map((item) => {
        appointmentSubject.push(item.itemName);
        dataBooking.push({
          itemID: item.itemID.toString(),
          itemName: item.itemName.toString(),
          itemPrice: item.itemPrice.toString(),
          duration: item.itemDur.toString(),
          employeeID: itemList.employeeID.toString(),
          employeeName: itemList.employeeNickName.toString(),
          type: "1",
          isCategory: item.isCategoryBook ? "1" : "0",
          isRequestTech: itemList.isRequestTech ? "1" : "0",
          startTime: item.startTime,
          endTime: item.endTime,
          durationItem: item.itemDur.toString(),
          isChangeTime: "0",
        });
      });
    });

    const endStrTime = moment(
      tixCT.dataItemTix[index].listWithTech[0].listServiceWithTech[0].startTime
    )
      .add(tixCT.dataItemTix[index].totalDuration, "minutes")
      .format("MM-DD-YYYY hh:mm A");

    return {
      appointmentID: tixCT.dataItemTix[index].appointmentID.toString(),
      customerID: tixCT.dataItemTix[index].customerID.toString(),
      customerName: tixCT.dataItemTix[index].name || "NON INFO",
      customerPhone: tixCT.dataItemTix[index].phone || "",
      appointmentSubject: appointmentSubject.join(", "),
      serviceDate:
        tixCT.dataItemTix[index].listWithTech[0].listServiceWithTech[0]
          .startTime,
      startTime:
        tixCT.dataItemTix[index].listWithTech[0].listServiceWithTech[0]
          .startTime,
      endTime: endStrTime,
      appointmentStatusID: "1",
      employeeID:
        tixCT.dataItemTix[index].listWithTech[0].employeeID.toString(),
      groupEmployeeName: dataGroupName,
      aptComment: tixCT.dataItemTix[index].note,
      totalAmount: tixCT.dataItemTix[index].totalDuration
        ? tixCT.dataItemTix[index].totalDuration.toString()
        : "0",
      depositAmount: "0",
      crearteBy: "0",
      isBookOnline: "0",
      barcodeTicket: "",
      totalDuration: tixCT.dataItemTix[index].totalDuration
        ? tixCT.dataItemTix[index].totalDuration.toString()
        : "0",
      isParty: "0",
      idParty: "0",
      isStartAllSameTime: tixCT.dataItemTix[index].isStartAllSameTime
        ? "1"
        : "0",
      apptIndex: index.toString(),
      detail: [
        {
          item: dataBooking,
        },
      ],
    };
  };
  const handleConfirm = () => {
    const dataBooking: any = [];
    tixCT.dataItemTix.map((item, index) => {
      if (
        tixCT.dataItemTix[index].listWithTech[0].listServiceWithTech.length <= 0
      ) {
        messageWarning("Please Select Service");
      } else {
        const dataItem = handleAddGroup(index);
        dataBooking.push({ appointment: dataItem });
        const body = {
          root: dataBooking,
        };

        const confirmBooking = new APIConfirmAddNewTicket();
        // console.log("body", body);

        confirmBooking.ConfirmAddNewTicket(body).then((res) => {
          if (res.status == 200) {
            if (res.data.status == 400) {
              messageWarning(res.data.data);
            } else messageSuccess("Successful booking");
            dispatch(ConfirmBooking.actions.setAddNewBooking(true));
          } else {
            message.error("Booking failed");
          }
        });
        tixCT.clearContext();
        onCancel(false);
      }
    });
  };
  const handleCancel = () => {
    tixCT.clearContext();
    onCancel(false);
  };

  return (
    <>
      {/* End show item tix */}
      <div className="flex justify-between mx-[10px]">
        <div className="w-full mr-[5px]">
          <ButtonUAT
            className="  !bg-mango-border-medium !border-mango-border-medium shadow-mango-shadow-2 hover:shadow-mango-shadow-3 text-white font-bold not-italic text-[16px]"
            onClick={handleCancel}
          >
            CANCEL
          </ButtonUAT>
        </div>
        <div className="w-full ml-[5px] ">
          <ButtonUAT type="primary-blue" onClick={handleConfirm}>
            {tixCT.dataItemTix[0].appointmentID == 0 ? "BOOK" : "CONFIRM"}
          </ButtonUAT>
        </div>
      </div>
    </>
  );
};
