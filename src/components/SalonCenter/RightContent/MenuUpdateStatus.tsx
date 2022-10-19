// @flow
import { MoreOutlined } from "@ant-design/icons";
import { Checkbox, InputNumber, Popover } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetListCancelReasonForTicket } from "services/Appointments/GetListCancelReasonForTicket";
import { ListStatusMessage } from "services/Appointments/ListStatusMessage";
import { ReleaseTicket } from "services/Appointments/ReleaseTicket";
import { TrackDurAptAll } from "services/Appointments/TrackDurAptAll";
import { UpdateStatusMessage } from "services/Appointments/UpdateStatusMessage";
import { VoidCancel } from "services/Appointments/VoidCancel";
import { messageSuccess } from "src/components/MessageAlert";
import {
  isChangeDataTechSalonCenter$,
  isChangeDataTixSalonCenter$,
} from "src/redux/selector";
import { IGetListCancelReasonForTicket, ITixAppt } from "../DataStructures";
import { IListStatusMessage } from "../SelectTechServiceAppt/DataStructures";
import {
  handleBacktoStatus,
  handleCheckIsChangeDataTech,
  handleCheckIsChangeDataTixSalonCenter,
  handleStartAllServices,
} from "./helper";
interface Props {
  iteminfo: ITixAppt;
  setVisibleSelectTech: Function;
}
const classNamePopover =
  "hover:text-mango-sky-crayola cursor-pointer font-[600] py-3  !border-dashed p-5 text-[#505050] ";
export const MenuUpdateStatus = ({ iteminfo, setVisibleSelectTech }: Props) => {
  const [visibleUpdateStatus, setVisibleUpdateStatus] =
    useState<boolean>(false);
  const [visibleChange, setVisibleChange] = useState<boolean>(false);
  const [visibleVoidCancel, setVisibleVoidCancel] = useState<boolean>(false);
  const apiTrackDurAptAll = new TrackDurAptAll();

  const apiListStatusMessage = new ListStatusMessage();
  const apiUpdateStatusMessage = new UpdateStatusMessage();
  const apiVoidCancel = new VoidCancel();
  const [dataListStatusMessage, setDataListStatusMessage] =
    useState<IListStatusMessage>();
  const [dataListVoidCancelMessage, setDataListVoidCancelMessage] = useState<
    IGetListCancelReasonForTicket[]
  >([]);
  const [numberMinsStatus, setNumberMinsStatus] = useState<number>(0);
  const dispatch = useDispatch();

  const handleVisibleUpdateStatus = (newVisible: boolean) => {
    if (newVisible) {
      apiListStatusMessage
        .listStatusMessage(
          Number(process.env.NEXT_PUBLIC_RVC_NO),
          iteminfo.originalAppointmentID
        )
        .then((res) => {
          if (res.status == 200) {
            setDataListStatusMessage(res.data);
          }
        });
    }
    setVisibleUpdateStatus(newVisible);
  };
  const apiGetListCancelReasonForTicket = new GetListCancelReasonForTicket();
  const handleVisibleVoidCancel = (newVisible: boolean) => {
    if (newVisible) {
      apiGetListCancelReasonForTicket
        .getListCancelReasonForTicket(
          iteminfo.checkNo,
          iteminfo.originalAppointmentID,
          iteminfo.appointmentStatusID
        )
        .then((res) => {
          if (res.status == 200) {
            setDataListVoidCancelMessage(res.data);
          }
        });
    }

    setVisibleVoidCancel(newVisible);
  };
  const onChangeStatus = (data, item) => {
    if (dataListStatusMessage) {
      const param = {
        rvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
        appointmentID: iteminfo.originalAppointmentID,
        statusID: item.id,
        value: item.addNum ? numberMinsStatus : 0,
        control: data.checked ? 1 : 3,
      };

      apiUpdateStatusMessage.updateStatusMessage(param).then((res) => {
        if (res.status == 200) {
          handleCheckIsChangeDataTixSalonCenter(dispatch);
        }
      });
    }
    setVisibleChange(false);
    setVisibleUpdateStatus(false);
  };
  const onChangeNumber = (value) => {
    setNumberMinsStatus(value);
  };
  const handleVoidCancelappt = (item) => {
    let isCancel =
      iteminfo.appointmentStatusID == "3" || iteminfo.appointmentStatusID == "8"
        ? false
        : true;
    const param = {
      isCancel: isCancel,
      reasons:
        iteminfo.appointmentStatusID == "3" ||
        iteminfo.appointmentStatusID == "8"
          ? item.voidReasons
          : item.reasons,
      appointmentId: iteminfo.originalAppointmentID,
      checkNo: iteminfo.checkNo,
      partyId: iteminfo.idParty,
      turnControl: "TLT",
    };
    apiVoidCancel.voidCancel(param).then((res) => {
      if (res.status == 200) {
        const content =
          iteminfo.appointmentStatusID == "3" ||
          iteminfo.appointmentStatusID == "8"
            ? "Voided"
            : "Cancel";
        messageSuccess(content);
        handleCheckIsChangeDataTixSalonCenter(dispatch);
      }
    });
  };
  const handleVisibleChange = (newVisible: boolean) => {
    setVisibleChange(newVisible);
  };
  return (
    <Popover
      className="!p-2"
      content={
        <>
          {iteminfo.appointmentStatusID != "3" &&
          iteminfo.appointmentStatusID != "8" ? (
            <></>
          ) : (
            <div
              className={classNamePopover + " !border-b"}
              onClick={() =>
                handleBacktoStatus(iteminfo, setVisibleSelectTech, dispatch)
              }
            >
              {iteminfo.appointmentStatusID == "3" && "Back to Wait List"}
              {iteminfo.appointmentStatusID == "8" && "Back to In Service"}
            </div>
          )}

          <Popover
            trigger="click"
            visible={visibleUpdateStatus}
            onVisibleChange={handleVisibleUpdateStatus}
            
            content={
              <>
                {dataListStatusMessage &&
                  dataListStatusMessage.rdStatusWaiting.map((item, index) => {
                    const checked =
                      dataListStatusMessage.rdStatusDetails.filter(
                        (itemDetail) => itemDetail.status == item.id
                      )[0]
                        ? true
                        : false;
                    return (
                      <div
                        key={index}
                        className={
                          "flex justify-between items-center w-full !border-b !border-dashed  h-[60px] !py-3 !my-0 hover:bg-mango-bg-dark px-3 " +
                          (checked && "bg-mango-bg-dark")
                        }
                      >
                        <Checkbox
                          key={index}
                          className={
                            "hover:text-mango-sky-crayola cursor-pointer font-bold customCheckBox "
                          }
                          style={{
                            font: "normal normal 500 var(--s-14)",
                          }}
                          onChange={(e) => onChangeStatus(e.target, item)}
                          checked={checked}
                        >
                          <img
                            src={
                              "/assets/imgs/iconsaloncenter/" +
                              (checked ? "1_CHECK.svg" : "CHECK.svg")
                            }
                            className=" h-[35px] w-[35px]  inline-block text-left"
                            alt="error"
                          />
                          <span
                            className={checked ? "text-mango-sky-crayola " : ""}
                          >
                            {item.description}
                          </span>
                        </Checkbox>

                        {item.addNum && (
                          <InputNumber
                            type="number"
                            bordered={false}
                            min={0}
                            placeholder="mins"
                            size="large"
                            onChange={onChangeNumber}
                          ></InputNumber>
                        )}
                      </div>
                    );
                  })}
              </>
            }
          >
            <div
              className={classNamePopover + " !border-b"}
              onClick={() => setVisibleUpdateStatus(true)}
            >
              Update Status
            </div>
          </Popover>
          <Popover
            trigger="click"
            visible={visibleVoidCancel}
            onVisibleChange={handleVisibleVoidCancel}
            placement="right"
            content={
              <div className="py-[15px] bg-mango-primary-blue !rounded-md opacity-80">
                <h6 className="bg-mango-primary-blue !m-0 !p-0 text-center !text-white text-lg font-medium leading-[1.2] text-[1rem] ">
                  {iteminfo.appointmentStatusID == "2" ? "CANCEL " : "VOID "}{" "}
                  REASONS ?
                </h6>
                {dataListVoidCancelMessage &&
                  dataListVoidCancelMessage.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          "flex justify-between items-center w-full  h-[45px] !py-2 !my-0  px-3  bg-mango-primary-blue "
                        }
                        onClick={() => handleVoidCancelappt(item)}
                      >
                        <div
                          className={
                            "hover:text-mango-sky-crayola cursor-pointer font-bold customCheckBox hover:!opacity-50 flex "
                          }
                          style={{
                            font: "normal normal 500 var(--s-14)",
                          }}
                        >
                          <div className="rounded-[50%] border border-white w-[24px] h-[24px] flex justify-center items-center">
                            <div className="bg-white w-[12px] h-[12px] rounded-[50%]"></div>
                          </div>
                          <span className="text-white font-bold text-base ml-2 ">
                            {iteminfo.appointmentStatusID == "3" ||
                            iteminfo.appointmentStatusID == "8"
                              ? item.voidReasons
                              : item.reasons}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            }
          >
            <div className={classNamePopover + " !border-b"}>
              {iteminfo.appointmentStatusID == "8" ||
              iteminfo.appointmentStatusID == "3"
                ? "Void"
                : "Cancel"}
            </div>
          </Popover>
        </>
      }
      trigger="click"
      visible={visibleChange}
      placement="right"
      onVisibleChange={handleVisibleChange}
    >
      <MoreOutlined
        className="hover:bg-white !p-0 rounded-full absolute z-10 -top-3 right-2"
        rotate={90}
        style={{ fontSize: "20px" }}
      />
    </Popover>
  );
};
