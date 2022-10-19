import moment from "moment";
import React, { useState } from "react";
import {
  IDataContextAddNewTix,
  IEditAppt,
  IShowRightContent,
} from "./DataStructures";
import { getTimeNearest12H } from "./helper";

export const ItemTicketdata: Array<IEditAppt> = [
  {
    appointmentID: 0,
    isChangeTime: false,
    isStartAllSameTime: false,
    idParty: 0,
    phone: "Client No Phone",
    customerID: 0,
    date: moment().format("MM-DD-YYYY"),
    totalDuration: 0,
    aptStartTime: moment().format("MM-DD-YYYY") + " " + getTimeNearest12H(),
    name: "NON INFO",
    note: "",
    email: null,
    listWithTech: [
      {
        employeeID: 9999,
        employeeNickName: "NEXT AVAILABLE",
        isRequestTech: false,
        listServiceWithTech: [],
      },
    ],
  },
];

const TixContext = React.createContext<IDataContextAddNewTix[]>([]);

export const TixContextProvider = ({ children }) => {
  // Show right content
  const [showContent, setShowContent] = useState<IShowRightContent>({
    showSelectTimeTix: false,
    showSearchServiceItem: false,
    showSelectDuration: false,
    showInfoClient: false,
    showSearchClient: false,
    showSelectTech: false,
    showOpenItem: false,
  });

  //Data
  const [dataItemTix, setDataItemTix] =
    useState<Array<IEditAppt>>(ItemTicketdata);
  const [idAppt, setIdAppt] = useState<number>(0);
  const [startTimeTix, setStartTimeTix] = useState<string>(
    dataItemTix[0].aptStartTime
  );
  const [startDateTix, setStartDateTix] = useState<string>(dataItemTix[0].date);
  const [idClientTix, setIdClientTix] = useState<number>(
    dataItemTix[0].customerID
  );
  const [idService, setIdService] = useState<number>(0);
  const [indexItemService, setIndexItemService] = useState<number>(-1);
  const [durValue, setDurValue] = useState<number>(0);

  const [idItemService, setIdItemService] = useState<number>(0);
  const [idTech, setIdTech] = useState<number>(
    dataItemTix[0].listWithTech[0].employeeID
  );
  const [openItem, setOpenItem] = useState<boolean>(false);
  const [customPriceID,setCustomPriceId]=useState<number>(0)
  const [statusChange, setStatusChange] = useState(false);
  const clearContext = () => {
    setShowContent({
      showSelectTimeTix: false,
      showSearchServiceItem: false,
      showSelectDuration: false,
      showInfoClient: false,
      showSearchClient: false,
      showSelectTech: false,
      showOpenItem: false,
    });
    setStartTimeTix(ItemTicketdata[0].aptStartTime);
    setStartDateTix(ItemTicketdata[0].date);
    setIdClientTix(ItemTicketdata[0].customerID);
    setCustomPriceId(0)
    // setIdService(0);
    setIndexItemService(-1);
    setDurValue(0);
    setIdItemService(0);
    setIdAppt(0);
    setIdTech(
      ItemTicketdata[0].listWithTech[ItemTicketdata[0].listWithTech.length - 1]
        .employeeID || 9999
    );
    setDataItemTix([
      {
        appointmentID: 0,
        isChangeTime: false,
        isStartAllSameTime: false,
        idParty: 0,
        phone: "Client No Phone",
        customerID: 0,
        date: moment().format("MM-DD-YYYY"),
        totalDuration: 0,
        aptStartTime: moment().format("MM-DD-YYYY") + " " + getTimeNearest12H(),
        name: "NON INFO",
        note: "",
        email: null,
        listWithTech: [
          {
            employeeID: 9999,
            employeeNickName: "NEXT AVAILABLE",
            isRequestTech: false,
            listServiceWithTech: [],
          },
        ],
      },
    ]);

    setStatusChange(false);
  };
  return (
    <TixContext.Provider
      value={[
        {
          showContent,
          setShowContent,
          idAppt,
          setIdAppt,
          startTimeTix,
          setStartTimeTix,
          startDateTix,
          setStartDateTix,
          idClientTix,
          setIdClientTix,
          idService,
          setIdService,
          indexItemService,
          setIndexItemService,
          durValue,
          setDurValue,

          idItemService,
          setIdItemService,
          idTech,
          setIdTech,
          dataItemTix,
          setDataItemTix,
          statusChange,
          setStatusChange,
          clearContext,
          openItem,
          setOpenItem,
          customPriceID,
          setCustomPriceId
        },
      ]}
    >
      {children}
    </TixContext.Provider>
  );
};

export default TixContext;
