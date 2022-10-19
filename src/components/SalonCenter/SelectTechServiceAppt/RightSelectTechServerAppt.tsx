import { Button, Col, message, Radio, RadioChangeEvent, Row } from "antd";
import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDetailInfoTixSalonPopup } from "services/Appointments/DetailInfoTixSalonPopup";
import { StartAService } from "services/Appointments/StartAService";
import { VoidItem } from "services/Appointments/VoidItem";
import { messageSuccess, messageWarning } from "src/components/MessageAlert";
import {
  isChangeDataTechSalonCenter$,
  isChangeDataTixSalonCenter$,
} from "src/redux/selector";
import { IItemDataTix } from ".";
import { ITixAppt } from "../DataStructures";
import {
  handleCheckIsChangeDataTech,
  handleCheckIsChangeDataTixSalonCenter,
  handleStartAllServices,
} from "../RightContent/helper";
import { IDetailTixSalonCenter, IListApptDetail } from "./DataStructures";
import SelectTechService from "./SelectTechServiceApptContext";
interface Props {
  loadDetail: number;
  onCancel: any;
  itemDataTix: IItemDataTix;
}
export const RightSelectTechServerAppt = ({
  loadDetail,
  onCancel,
  itemDataTix,
}: Props) => {
  const [indexAppt, setIndexAppt] = useState<number>(0);
  const [dataListTixSalonCenter, setDataListTixSalonCenter] =
    useState<IDetailTixSalonCenter>();
  const [isAddNew, setIsAddNew] = useState<boolean>(false);
  const dataDetailTixSalonCenter = new GetDetailInfoTixSalonPopup();
  const apiStartAService = new StartAService();
  const selectTSContext = useContext(SelectTechService);

  const checkActice = (index) => {
    return index == indexAppt
      ? "!border-black !border-2 !bg-mango-primary-blue-light "
      : "!border-mango-border-dark !border-2 !bg-white ";
  };
  const handleClickAppt = (itemApptDetail: IListApptDetail) =>
    selectTSContext.setApptDetail(itemApptDetail);
  const handleAddTech = () => {
    setIsAddNew(true);
    dataListTixSalonCenter?.listApptDetail.push({
      appointmentDetailID: 0,
      employeeID: 0,
      employeeName: "",
      isCategory: false,
      isRequestTech: false,
      listServies: [],
    });
  };
  const setVisibleEditAppt = () => {};
  const handleStartAService = (idDetailAppt) => {
    apiStartAService
      .startAService(idDetailAppt, itemDataTix.originalAppointmentID)
      .then((res) => {
        if (res.status == 200) {
          let type = "warning";
          let content = "";
          switch (res.data) {
            case 0:
              type = "success";
              content = "Start Successfull";
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
            handleCheckIsChangeDataTixSalonCenter(dispatch);
            handleCheckIsChangeDataTech(dispatch);
            onCancel();
          }
        }
      });
  };
  const dispatch = useDispatch();
  const isChangeDataTix = useSelector(isChangeDataTixSalonCenter$);
  const isChangeDataTech = useSelector(isChangeDataTechSalonCenter$);
  const apiVoidItem = new VoidItem();
  const handleVoidItem = (itemApptDetail: IListApptDetail) => {
    const sum = itemApptDetail.listServies.reduce((totalSum, item) => {
      return totalSum + item.trnSeq + "/";
    }, "");

    apiVoidItem.voidItem(sum, itemDataTix.checkNo).then((res) => {
      if (res.status == 200) {
        let content = "";
        let type = "warning";
        switch (res.data) {
          case 0:
            content = "Something wrong";
            break;
          case 2:
            content = "Return Salon";
            break;
          case 3:
            content = "Please void Discount bill or payment after void Item";
            break;
          case 4:
            content = "Please void Item Discount after void Item";
            break;
          case 5:
            content = "Can't remove clast item in ticket ";
            break;
          case 1:
            content = "Void Item Successful";
            type = "success";
          default:
            break;
        }
        if (type == "warning") {
          messageWarning(content);
        } else {
          messageSuccess(content);
        }

        selectTSContext.setIsChangeData(!selectTSContext.isChangeData);
        // if (res.data != 1)
        // {
        //     content = "False at "+sum+", result:"+strresult;
        //     return result;
        // }
      }
    });
  };
  useEffect(() => {
    dataDetailTixSalonCenter
      .getDetailInfoTixSalonPopup(
        itemDataTix.checkNo,
        itemDataTix.appointmentStatusID,
        itemDataTix.originalAppointmentID,
        loadDetail
      )
      .then((res) => {
        if (res.status == 200) {
          setDataListTixSalonCenter(res.data);
          selectTSContext.setApptListDetail(res.data);
        }
      });
    selectTSContext.setIndexAppt(0);
  }, [selectTSContext.isChangeData]);
  const handleChangeAppt = ({ target: { value } }: RadioChangeEvent) => {
    setIndexAppt(value);
    selectTSContext.setIndexAppt(value);
  };
  return (
    <Col className="pl-6 flex flex-col h-full" span={8}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <Row>
          <Col>
            <div
              className={
                "h-8 w-8 flex items-center flex-col justify-center rounded-r-2xl mr-2 " +
                (dataListTixSalonCenter?.bookType
                  ? "bg-mango-primary-blue"
                  : "bg-mango-primary-purple")
              }
            >
              <span className="text-white font-bold text-sm">
                {dataListTixSalonCenter?.indexNum}
              </span>
            </div>
          </Col>
          <Col>
            <h2
              className="p-0 m-0  capitalize"
              style={{ font: "normal normal bold var(--s-18)" }}
            >
              {dataListTixSalonCenter?.clientName}
            </h2>
            <p
              className="p-0 m-0"
              style={{ font: "normal normal 600 var(--s-14)" }}
            >
              X:{" "}
              {dataListTixSalonCenter?.checkinTime &&
                dataListTixSalonCenter?.checkinTime}
            </p>
            <p
              className="text-mango-primary-orange p-0 m-0"
              style={{ font: "normal normal 700 var(--s-12)" }}
            >
              #
              {itemDataTix.originalAppointmentID &&
                itemDataTix.originalAppointmentID.toString()}
            </p>
          </Col>
        </Row>
        {/* Content List Service */}
        <div className="mt-4 w-full p-3 h-full  overflow-auto ">
          {/* List Serivce */}{" "}
          <div className="w-full">
            <Radio.Group
              defaultValue={selectTSContext.indexAppt}
              onChange={handleChangeAppt}
              className="flex !w-full "
            >
              {dataListTixSalonCenter?.listApptDetail.map(
                (itemApptDetail: IListApptDetail, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        className="relative top-3 -left-3 cursor-pointer h-full z-10"
                        // remove Appt Detail
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVoidItem(itemApptDetail);
                        }}
                      >
                        <img
                          src="/assets/imgs/button-close.svg"
                          className="h-6 w-6"
                        ></img>
                      </div>
                      <Radio.Button
                        value={index}
                        className={
                          " !rounded-md !w-full !h-full   shadow-md cursor-pointer z-0 " +
                          checkActice(index)
                        }
                        onChange={(e) => {
                          e.stopPropagation();

                          handleClickAppt(itemApptDetail);
                        }}
                      >
                        <div className="flex border-b border-b-dashed justify-between h-12 items-center">
                          <h2 className="font-bold flex items-center">
                            {itemApptDetail.employeeName.toUpperCase() ||
                              "NEXT AVAILABLE"}
                          </h2>

                          {itemApptDetail.listServies.filter(
                            (itemService) =>
                              itemService.itemCode && itemService.itemCode > 0
                          ).length > 0 ? (
                            <Button
                              className="border-black border !rounded-md !font-bold !shadow-md"
                              onClick={() =>
                                handleStartAService(
                                  itemApptDetail.appointmentDetailID
                                )
                              }
                            >
                              START
                            </Button>
                          ) : (
                            <></>
                          )}
                        </div>
                        {itemApptDetail.listServies.filter(
                          (itemService) =>
                            itemService.itemCode &&
                            itemService.itemCode > 0 &&
                            itemService.trnSeq > 0
                        ).length <= 0 ? (
                          <Button type="text">
                            <span className="!underline !text-mango-primary-pink !font-bold">
                              ADD SERVICE
                            </span>
                          </Button>
                        ) : (
                          itemApptDetail.listServies.map(
                            (itemService, index) => (
                              <Row justify="space-between" key={index}>
                                <Col span={10}>
                                  <h2>{itemService.itemName}</h2>{" "}
                                </Col>
                                <Col span={4}>
                                  <h2>{itemService.duration} Mins</h2>
                                </Col>
                                <Col span={10}>
                                  {" "}
                                  <h2 className="text-right">
                                    ${itemService.amount}
                                  </h2>
                                </Col>
                              </Row>
                            )
                          )
                        )}
                      </Radio.Button>
                    </Fragment>
                  );
                }
              )}
            </Radio.Group>
          </div>
          <div>
            {!isAddNew && (
              <Button type="text" className="my-4" onClick={handleAddTech}>
                <span className="!underline !text-mango-primary-blue !font-bold">
                  ADD TECH
                </span>
              </Button>
            )}
          </div>
        </div>

        <Row gutter={[8, 8]} className="w-full items-end " align="bottom">
          <Col span={12}>
            <Button
              className="!bg-white !border-black !w-full !rounded-md !font-bold"
              onClick={() => {
                handleCheckIsChangeDataTixSalonCenter(dispatch);
                onCancel();
              }}
            >
              EXIT
            </Button>
          </Col>

          <Col span={12}>
            <Button
              className="!bg-mango-primary-blue !text-white !w-full !rounded-md !font-bold"
              onClick={() => {
                handleStartAllServices(
                  itemDataTix,
                  setVisibleEditAppt,
                  dispatch
                );
                onCancel();
              }}
            >
              START ALL
            </Button>
          </Col>
        </Row>
      </div>
    </Col>
  );
};
