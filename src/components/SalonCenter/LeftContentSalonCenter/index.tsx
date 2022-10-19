import { Col, Row } from "antd";
import { FaWrench } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { useEffect, useState } from "react";

import MenuSalonCenter from "./MenuSalonCenter";
import { TimelineLeftContent } from "./TimelineLeftContent";
import { useSelector } from "react-redux";
import {
  isChangeDataTechSalonCenter$,
  LeftTabTechSalonCenter$,
} from "src/redux/selector";
import TabLeftContentSalonCenter from "./TabLeftContentSalonCenter";
import UseSearch from "src/utils/UseSearch";
import { IShowFullScreen } from "pages/salon-center";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";
import moment from "moment";
import { GetWorkingEmployeeList } from "services/Employees/GetWorkingEmployeeList";
import { ChangeImagePhoto } from "src/components/ChangeImagePhoto/ChangeImagePhoto";
import { useAppSelector } from "src/redux/hook";

interface Props {
  showFullScreen: IShowFullScreen;
  setShowFullScreen: Function;
}

export const TechSalonCenter = ({
  showFullScreen,
  setShowFullScreen,
}: Props) => {
  const [isReadyBusy, setIsReadyBusy] = useState<boolean>(false);
  const [height, setHeight] = useState<boolean>(true);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [dataInforTech, setDataInforTech] = useState<Array<ITechSalonCenter>>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [listDataTech, setListDataTech] = useState<Array<ITechSalonCenter>>([]);
  const [dataReady, setDataReady] = useState<Array<ITechSalonCenter>>([]);
  const [dataBusy, setDataBusy] = useState<Array<ITechSalonCenter>>([]);
  const [valueSearchTech, setValueSearchTech] = useState<string>("");
  const valueSearch = UseSearch(valueSearchTech, 300);

  const handleinput = () => {
    setShowInput(!showInput);
  };
  const handleSearchTech = (value) => {
    setValueSearchTech(value);
  };
  const getInfoTech = new GetWorkingEmployeeList();

  const isChangeDataTech = useAppSelector(
    (state) => state.saloncenter.isChangeTech
  );
  useEffect(() => {
    const date = moment().format("MM-DD-YYYY");
    setLoading(true);
    getInfoTech
      .getWorkingEmployeeList(
        date,
        Number(process.env.NEXT_PUBLIC_RVC_NO),
        1,
        false
      )
      .then((res) => {
        if (res.status == 200) {
          const data: Array<ITechSalonCenter> = res.data.techs.filter(
            (item: ITechSalonCenter) => item.employeeID > 9999
          );
          setListDataTech(data);
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [isChangeDataTech]);

  useEffect(() => {
    const dataListTech = listDataTech.filter((item) =>
      item.employeeName.toUpperCase().includes(valueSearch.toUpperCase())
    );

    const dataClockIn = dataListTech.filter(
      (item: ITechSalonCenter) => item.isLogIn == true && item.isLogOut == false
    );
    const dataClockOut = dataListTech.filter(
      (item: ITechSalonCenter) =>
        (item.isLogIn == true && item.isLogOut == true) ||
        (item.isLogIn == false && item.isLogOut == false)
    );
    if (isReadyBusy) {
      setDataInforTech(dataClockIn);
    } else {
      setDataInforTech(dataListTech);
    }

    const dataReady = dataClockIn.filter(
      (item: ITechSalonCenter) => item.isServing == 0
    );

    const dataBusy = dataClockIn.filter(
      (item: ITechSalonCenter) => item.isServing == 1
    );
 
    if (isReadyBusy) {
      setDataReady(dataReady);
      setDataBusy(dataBusy);
    } else {
      setDataReady(dataClockIn);
      setDataBusy(dataClockOut);
    }
  }, [valueSearch, JSON.stringify(listDataTech), isReadyBusy]);

  return (
    <>
      {showFullScreen.showLeftTechFull ? (
        <div
          className={
            "animate__animated animate__fadeInLeft h-full select-none flex relative " +
            (!showFullScreen.showCenterInPenFull &&
            !showFullScreen.showRightWaitFull
              ? " w-full "
              : " ")
          }
        >
          <div className="flex w-full h-full">
            <div className="mr-4">
              <div
                className="bg-white h-10 w-[39px]   border-y border-r rounded-r-[10px] flex border-gray-400 cursor-pointer mango-shadow-1"
                onClick={() =>
                  setShowFullScreen((prev) => ({
                    ...prev,
                    showLeftTechFull: false,
                  }))
                }
              >
                <img
                  src="/assets/imgs/30-pixel-assets_23.png"
                  alt="setting"
                  className="h-5 w-5 flex m-auto"
                />
              </div>
            </div>

            <TabLeftContentSalonCenter
              dataInforTech={dataInforTech}
              dataReady={dataReady}
              dataBusy={dataBusy}
              valueSearch={valueSearch}
              isReadyBusy={isReadyBusy}
              height={height}
              setHeight={setHeight}
            />

            <div className=" w-14 flex pt-[13px] animate__animated animate__fadeInLeft">
              <img
                src="/assets/imgs/search-tech.svg"
                onClick={handleinput}
                className={"w-[17px] h-[17px] cursor-pointer mt-[2px] mr-[2px]"}
              />
              {showInput && (
                <input
                  value={valueSearchTech}
                  onChange={(e) => handleSearchTech(e.target.value)}
                  className="w-[220px] h-[40px] absolute right-[46px] -top-2 border-b-4 border-cyan-400 outline-none b-none shadow-md auto-focus pl-1 mr-2"
                  placeholder="Search tech name "
                />
              )}

              <MenuSalonCenter
                setShowFullScreen={setShowFullScreen}
                showFullScreen={showFullScreen}
                height={height}
                setHeight={setHeight}
                setIsReadyBusy={setIsReadyBusy}
                isReadyBusy={isReadyBusy}
              />
            </div>
          </div>
        </div>
      ) : (
        <TimelineLeftContent
          dataInforTech={dataInforTech}
          dataReady={dataReady}
          dataBusy={dataBusy}
          setShowFullScreen={setShowFullScreen}
          showFullScreen={showFullScreen}
        />
      )}
    </>
  );
};
