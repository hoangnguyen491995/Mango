import { useState } from "react";
import { FooterPendingTicket } from "./FooterPending";
import { HeaderInService } from "./HeaderInService";
import { TimelineRightContent } from "./TimelineRightContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isChangeDataTechSalonCenter$,
  isChangeDataTixSalonCenter$,
  LeftTabTechSalonCenter$,
} from "src/redux/selector";
import { APIGetTixSalonCenter } from "services/GetTixApptSalonCenter/GetTixAppSalonCenter";
import { ITixAppt } from "../DataStructures";
import { WaitListService } from "./WaitListService";
import {
  handleBacktoStatus,
  handleDoneAndActive,
  handleStartAllServices,
} from "./helper";
import { useRouter } from "next/router";
import { IShowFullScreen } from "pages/salon-center";
import { TimelineCenterContent } from "./TimelineCenterContent";
import { TicketDetail } from "./TicketDetail";
import { SelectTechServiceAppt } from "../SelectTechServiceAppt";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import { is } from "immer/dist/internal";
interface Props {
  showFullScreen: IShowFullScreen;
  setShowFullScreen: Function;
}
export const InServiceSalonCenter = ({
  showFullScreen,
  setShowFullScreen,
}: Props) => {
  const [dataListTixSalonCenter, setDataListTixSalonCenter] = useState<
    Array<ITixAppt>
  >([]);
  const [dataInservice, setDataInservice] = useState<Array<ITixAppt>>([]);
  const [dataWaitList, setDataWaitList] = useState<Array<ITixAppt>>([]);
  const [dataPending, setDataPending] = useState<Array<ITixAppt>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [itemDataDrag, setItemDataDrag] = useState<ITixAppt>();
  const dispatch = useDispatch();

  const isChangeDataTix = useAppSelector(
    (state) => state.saloncenter.isChangeTix
  );
  const isChangeDataTech = useAppSelector(
    (state) => state.saloncenter.isChangeTech
  );
  useEffect(() => {}, []);
  const [showPendingTicket, setShowPendingTicket] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const APIListAppt = new APIGetTixSalonCenter();
  useEffect(() => {
    // setIsLoading(true);
    const body = {
      Page: 0,
      Quantity: 500,
      RvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
      AppointmentId: "",
      Status: "",
    };
    APIListAppt.GetTixSalonCenter(body).then((res) => {
      if (res.status == 200) {
        setDataListTixSalonCenter(res.data);
        setIsLoading(false);
      }
    });
  }, [isChangeDataTix]);

  const [dragOver, setDragOver] = useState(false);

  const router = useRouter();

  const [areaDropItem, setAreaDropItem] = useState<string>("");

  const handleDragOverStart = (event: React.DragEvent<HTMLDivElement>) => {
    setAreaDropItem(event.currentTarget.id);
  };

  const handleDragOverEnd = () => {
    setDragOver(false);
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleOnOk = () => {
    setVisible(true);
  };
  const handleOnCancel = () => {
    setVisible(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const areaDropItem = event.currentTarget.id;

    switch (itemDataDrag?.appointmentStatusID) {
      case "2":
        if (areaDropItem == "inservice") {
          //Drop waitlist to inservice
          handleStartAllServices(itemDataDrag, setVisible, dispatch);
        }
        break;
      case "3":
        if (areaDropItem == "pendingservice") {
          //Drop inservice to pendingservice
          handleDoneAndActive(itemDataDrag, dispatch);
        } else if (areaDropItem == "waitlistservice") {
          //Drop inservice to waitlist
          handleBacktoStatus(
            itemDataDrag,

            setVisible,
            dispatch
          );
        }
        break;
      case "8":
        if (areaDropItem == "inservice") {
          //Drop pendingservice to inservice
          handleBacktoStatus(
            itemDataDrag,

            setVisible,
            dispatch
          );
        }
        break;
      default:
        break;
    }
    setDragOver(false);
  };

  //Use Effect
  useEffect(() => {
    const waitList = dataListTixSalonCenter.filter(
      (item) => item.appointmentStatusID == "2"
    );
    const inService = dataListTixSalonCenter.filter(
      (item) => item.appointmentStatusID == "3"
    );
    const pendingTix = dataListTixSalonCenter.filter(
      (item) => item.appointmentStatusID == "8"
    );
    setDataWaitList(waitList);
    setDataInservice(inService);
    setDataPending(pendingTix);
  }, [dataListTixSalonCenter]);

  return (
    <>
      {visible && itemDataDrag && (
        <SelectTechServiceAppt
          itemData={itemDataDrag}
          visible={visible}
          onOk={handleOnOk}
          onCancel={handleOnCancel}
          loadDetail={1}
        />
      )}
      <div
        className={
          "flex " +
          (!showFullScreen.showCenterInPenFull &&
          !showFullScreen.showRightWaitFull
            ? " "
            : "w-full")
        }
      >
        {!showFullScreen.showCenterInPenFull ? (
          <TimelineCenterContent
            showFullScreen={showFullScreen}
            setShowFullScreen={setShowFullScreen}
            dataInService={dataInservice}
            dataWaitList={dataWaitList}
            dataPending={dataPending}
          />
        ) : (
          <div
            className={
              "border-l-2 border-black h-full justify-between bg-mango-bg-dark w-full "
            }
          >
            <div
              onDragEnter={handleDragOverStart}
              onDragLeave={handleDragOverEnd}
              onDragOver={enableDropping}
              onDrop={handleDrop}
              id="inservice"
              style={{
                height: showPendingTicket ? "60%" : "calc(100% - 100px)",
              }}
            >
              <HeaderInService
                setItemDataDrag={setItemDataDrag}
                classNameHover={" classInservice"}
                isLoading={isLoading}
                showFullScreen={showFullScreen}
                setShowFullScreen={setShowFullScreen}
                dataInService={dataInservice}
                dataWaitList={dataWaitList}
                configShowColumn={false}
              />
            </div>
            <div
              onDragEnter={handleDragOverStart}
              onDragLeave={handleDragOverEnd}
              onDragOver={enableDropping}
              onDrop={handleDrop}
              className={
                "border-t border-solid border-[#505050] rounded-t-[10px] bg-gray-100  mx-[4px] select-none " +
                (showPendingTicket ? " h-[40%]" : " h-[100px]")
              }
              id="pendingservice"
              style={{ width: "calc(100% - 8px)" }}
            >
              <FooterPendingTicket
                setItemDataDrag={setItemDataDrag}
                classNameHover={" classPending"}
                setShowPendingTicket={setShowPendingTicket}
                showPendingTicket={showPendingTicket}
                dataPending={dataPending}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {!showFullScreen.showRightWaitFull ? (
          <TimelineRightContent
            showFullScreen={showFullScreen}
            setShowFullScreen={setShowFullScreen}
            dataInService={dataInservice}
            dataWaitList={dataWaitList}
            dataPending={dataPending}
          />
        ) : (
          <div
            onDragEnter={handleDragOverStart}
            onDragLeave={handleDragOverEnd}
            onDragOver={enableDropping}
            onDrop={handleDrop}
            id="waitlistservice"
            className="border-l-2 border-black h-full w-full justify-between bg-mango-bg-dark  "
          >
            <WaitListService
              setItemDataDrag={setItemDataDrag}
              classNameHover={" classWaitList"}
              showFullScreen={showFullScreen}
              setShowFullScreen={setShowFullScreen}
              dataInService={dataInservice}
              dataWaitList={dataWaitList}
              configShowColumn={true}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </>
  );
};
