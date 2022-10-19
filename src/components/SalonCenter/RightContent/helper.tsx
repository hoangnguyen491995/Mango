import { useDispatch, useSelector } from "react-redux";
import { DoneAndActive } from "services/Appointments/DoneAndActive";
import { ReleaseTicket } from "services/Appointments/ReleaseTicket";
import { StartAllServices } from "services/Appointments/StartAllServices";
import { TrackDurAptAll } from "services/Appointments/TrackDurAptAll";
import {
  setApptId,
  setCheckNo,
} from "src/components/CreateCharge/createcharge-slice";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { messageSuccess, messageWarning } from "src/components/MessageAlert";
import { ITixAppt } from "../DataStructures";

import { isChangeDataTech, isChangeDataTix } from "../saloncenter-slice";

const apiStartAllServices = new StartAllServices();
const apiTrackDurAptAll = new TrackDurAptAll();

export const handleStartAllServices = (iteminfo, setVisible, dispatch) => {
  apiTrackDurAptAll
    .trackDurAptAll(iteminfo.originalAppointmentID)
    .then((res) => {
      if (res.status == 200) {
        const param = {
          appointmentID: iteminfo.originalAppointmentID,
          checkNo:
            iteminfo.appointmentStatusID == "8" ||
            iteminfo.highlightMessage != "" ||
            iteminfo.appointmentStatusID == "2"
              ? 0
              : iteminfo.checkNo,
          startWithNoTech: false,
        };
        if (iteminfo.highlightTicket == 2) {
          let content = "";
          let type = "warning";
          type = "warning";
          content = iteminfo.highlightMessage;
          if (type == "warning") {
            messageWarning(content);
          } else {
            messageSuccess(content);
          }
        } else {
          apiStartAllServices.startAllServices(param).then(async (res) => {
            if (res.status == 200) {
              let content = "";
              let type = "warning";

              switch (res.data) {
                case 0:
                  if (iteminfo.highlightMessage) {
                    type = "warning";
                    content = iteminfo.highlightMessage;
                  } else {
                    type = "success";
                    content = "Start Successfull";

                    handleCheckIsChangeDataTixSalonCenter(dispatch);
                    handleCheckIsChangeDataTech(dispatch);
                  }
                  break;
                case 1:
                  type = "warning";
                  content = "Unavailable Service";
                  break;
                case 2:
                  type = "warning";
                  content = "Technician is busy";
                  break;
                case 3:
                  type = "warning";
                  content = "URequest change";
                  break;
                case 4:
                  type = "warning";
                  content = "Select a Tech to Start";
                  setVisible(true);
                  break;
                case 5:
                  type = "warning";
                  content = "Missing customer information";
                  break;
                case 6:
                  type = "warning";
                  content = "Unavailable Service";
                  break;
                case 7:
                  type = "warning";
                  content = "Tech Has Not Clocked In";
                  // setShowAddTech(true);
                  setVisible(true);
                  break;
                case 8:
                  type = "warning";
                  content = "Tickets Are GiftCard";
                  break;
                case 9:
                  type = "warning";
                  content = "Tickets Are Product";
                  break;
                case 10:
                  type = "warning";
                  content = "The staff's timetable is blocked";
                  break;
                case 11:
                  type = "warning";
                  content = "Tech Cant Do Service";
                  break;
                default:
                  type = "warning";
                  content = "Something Wrong";
                  break;
              }
              if (type == "warning") {
                messageWarning(content);
              } else {
                messageSuccess(content);
              }
            }
          });
        }
      }
    });
};
export const handleCheckIsChangeDataTixSalonCenter = (dispatch) => {
  dispatch(isChangeDataTix());
};
export const handleCheckIsChangeDataTech = (dispatch) => {
  dispatch(isChangeDataTech());
};
export interface ITixDataItem {
  originalAppointmentID: number;
  checkNo: number;
  customerID: number;
  appointmentStatusName: null;
}
export const handleRedirectCreateCharge = (
  iteminfo: ITixDataItem,
  e,
  dispatch,
  router
) => {
  e.stopPropagation();
  router.push("/create-Charge");
  dispatch(setApptId(iteminfo.originalAppointmentID));
  dispatch(setCheckNo(iteminfo.checkNo));
  if (iteminfo.customerID != 0 && iteminfo.appointmentStatusName == undefined) {
    dispatch(CreateChargeSlice.actions.setshowFormLeft("detail"));
    dispatch(
      CreateChargeSlice.actions.showLeftAddTech({
        showform: "AddTechLeft",
      })
    );
  } else {
    dispatch(CreateChargeSlice.actions.setshowFormLeft("login"));
    dispatch(
      CreateChargeSlice.actions.showLeftAddTech({
        showform: "AddTechLeft",
      })
    );
  }

  dispatch(
    CreateChargeSlice.actions.setshowIDItemInTiket({
      iteminfo: {
        originalAppointmentID: iteminfo.originalAppointmentID,
        checkNo: iteminfo.checkNo,
        customerID: iteminfo.customerID,
      },
    })
  );
  dispatch(CreateChargeSlice.actions.setshowLeftIdAddClient(true));
};

export const handleRedirectCreateChargeCheckOut = (
  iteminfo: ITixDataItem,
  e,
  dispatch,
  isPayBil,
  router
) => {
  e.stopPropagation();
  router.push("/create-Charge");
  dispatch(setApptId(iteminfo.originalAppointmentID));
  dispatch(setCheckNo(iteminfo.checkNo));
  if (iteminfo.appointmentStatusName == undefined) {
    dispatch(CreateChargeSlice.actions.setshowFormLeft("detail"));
    dispatch(
      CreateChargeSlice.actions.showLeftAddTech({
        showform: "AddTechLeft",
      })
    );
  } else {
    dispatch(CreateChargeSlice.actions.setshowFormLeft("login"));
    dispatch(
      CreateChargeSlice.actions.showLeftAddTech({
        showform: "AddTechLeft",
      })
    );
  }

  dispatch(
    CreateChargeSlice.actions.setshowIDItemInTiket({
      iteminfo: {
        originalAppointmentID: iteminfo.originalAppointmentID,
        checkNo: iteminfo.checkNo,
        customerID: iteminfo.customerID,
      },
    })
  );
  dispatch(CreateChargeSlice.actions.setshowLeftIdAddClient(true));
};

const apiDoneAndActive = new DoneAndActive();
export const handleDoneAndActive = (iteminfo: ITixDataItem, dispatch) => {
  const param = {
    CheckNo: iteminfo.checkNo,
    AptID: iteminfo.originalAppointmentID,
  };
  apiDoneAndActive.doneAndActive(param).then((res) => {
    if (res.status == 200) {
      messageSuccess("Done");
      handleCheckIsChangeDataTixSalonCenter(dispatch);
      handleCheckIsChangeDataTech(dispatch);
      // setIsChangeData(!isChangeData);
    }
  });
};
export const handleBacktoStatus = (iteminfo, setVisible, dispatch) => {
  const apiBackToStatus = new ReleaseTicket();
  switch (iteminfo.appointmentStatusID) {
    case "3":
      apiBackToStatus.releaseTicket(iteminfo.checkNo).then((res) => {
        if (res.status == 200) {
          handleCheckIsChangeDataTixSalonCenter(dispatch);
          handleCheckIsChangeDataTech(dispatch);
        }
      });
      break;
    case "8":
      apiTrackDurAptAll
        .trackDurAptAll(iteminfo.originalAppointmentID)
        .then((res) => {
          if (res.status == 200) {
            handleStartAllServices(iteminfo, setVisible, dispatch);
          }
        });
      break;
    default:
      break;
  }
};
export const bgTixAppt = (iteminfo: ITixAppt) => {
  let bgTix = "";
  let bgNumber = "";
  switch (iteminfo.appointmentStatusID) {
    case "3":
      bgTix = "#f1f1f1";
      bgNumber = "#A7A7A7";
      break;
    case "8":
      bgTix = "#f0e1e5";
      bgNumber = "#A7A7A7";
      break;
    case "2":
      bgTix = iteminfo.bookType == 0 ? " #E6E5F3" : " #DAF5F9";
      bgNumber = iteminfo.bookType == 0 ? "#8B85CA" : " #00BED6";
      break;
    default:
      bgTix = "white";
      break;
  }
  if (iteminfo.highlightTicket == 0 && iteminfo.appointmentStatusID != "8") {
    bgTix = "white";
  }
  return { bgTix, bgNumber };
};
export const statusAppt = (iteminfo: ITixAppt) => {
  const result =
    (iteminfo.employeeID < 10000 && iteminfo.appointmentStatusID) ||
    iteminfo.groupEmployeeDetails.length == 0
      ? -1
      : parseInt(iteminfo.statusOffer);
  return result;
};
