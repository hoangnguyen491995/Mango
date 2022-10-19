import { createContext, useState } from "react";
import { ITixAppt } from "../DataStructures";
import { IDetailTixSalonCenter, IListApptDetail } from "./DataStructures";

interface ISelectTechServiceContext {
  apptDetail: IListApptDetail;
  setApptDetail: Function;
  idCategory: number;
  setIdCategory: Function;

  isChangeData: boolean;
  setIsChangeData: Function;
  indexAppt: number;
  setIndexAppt: Function;
  apptListDetail: IDetailTixSalonCenter;
  setApptListDetail: Function;
}
const SelectTechService = createContext<ISelectTechServiceContext>(
  {} as ISelectTechServiceContext
);
export const SelectTechServiceProvider = ({ children }) => {
  const [idCategory, setIdCategory] = useState<number>(0);
  const [apptDetail, setApptDetail] = useState<IListApptDetail>(
    {} as IListApptDetail
  );
  const [apptListDetail, setApptListDetail] = useState<IDetailTixSalonCenter>(
    {} as IDetailTixSalonCenter
  );
  const [indexAppt, setIndexAppt] = useState<number>(0);

  const [isChangeData, setIsChangeData] = useState<boolean>(false);
  return (
    <SelectTechService.Provider
      value={{
        idCategory,
        setIdCategory,
        apptDetail,
        setApptDetail,
        isChangeData,
        setIsChangeData,
        indexAppt,
        setIndexAppt,
        apptListDetail,
        setApptListDetail,
      }}
    >
      {children}
    </SelectTechService.Provider>
  );
};
export default SelectTechService;
