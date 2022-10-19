import React, {useState, useEffect} from "react";
import Search from "antd/lib/input/Search";
import { GetInfoTech } from "services/techList/techList";
import { Space } from "antd";
import ItemInfoTech from './ItemInfoTech';
import UseSearch from "src/utils/UseSearch";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-drag";
import { ListAppointmentDetail } from '../../IterfaceStructures';

interface IProps {
 
  appointment: ListAppointmentDetail
  
}

interface InforTech {
  employeeID: number;
  nickName: string;
  imageFileName: string;
  backGroundColor: string;
  lockInd: string;
}

function LeftContent({appointment}: IProps) {
    const [dataInforTech, setDataInforTech] = useState<Array<InforTech>>([]);
    const [searchTechValue, setSearchValue] = useState<string>("");
    const searchValue = UseSearch(searchTechValue, 500);
  const getInfoTech = new GetInfoTech();
  useEffect(() => {
    getInfoTech.getInfoTech().then((res) => {
      if (res.status == 200) setDataInforTech(res.data);
    });
  }, []);

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(dataInforTech, sourceIndex, targetIndex);
    setDataInforTech(nextState);
  }
  
  const salonEmp = {
    employeeID: appointment.employeeID,
    nickName: appointment.employeeName,
    imageFileName: "",
    backGroundColor: "#FFFFFF",
    lockInd: "",
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

    return (
    <div>
      <div className="text-base font-medium">Copy | Appt to:</div>
      <div className="flex justify-between">
        <span className="text-base font-medium uppercase">{appointment.customerName} | {appointment.customerPhone}</span>
        <span className="text-sm font-medium text-mango-gray-4">
          Original Tech: <span className="text-sm font-bold text-mango-gray-6 uppercase">{appointment.employeeName}</span>
        </span>
      </div>
    <div className="search-tech-antd">
    <Search
          placeholder="Search tech"
          size="large"
          className="w-full !border-b-2 !focus:outline-none"
          value={searchTechValue}
          onChange={handleSearch}
          bordered={false}
          allowClear
          defaultValue=""
        //   onSearch={onSearch}
        />
    </div>
    <div className=" h-[370px]">
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        id="items"
        boxesPerRow={3}
        rowHeight={150}
   
        className="w-full h-full overflow-auto overflow-x-hidden p-3  flex flex-wrap justify-between "
      >
      {/* <Space
        // justify="space-between"
        className="w-full h-[370px] overflow-auto p-3  flex flex-wrap justify-between "
      > */}
        {/* <ItemInfoTech tech={salonEmp} /> */}
        {
          dataInforTech.map((tech: InforTech) => {if (
            tech.nickName
              .toUpperCase()
              .includes(`${searchValue.toUpperCase()}`)
          ) return (
            <GridItem key={tech.employeeID}>
           <ItemInfoTech tech={tech}  />
          </GridItem>
          )
          
          }
        )}
            
      {/* </Space> */}
      </GridDropZone>
    </GridContextProvider>
    </div>
    </div>
  );
}

export default LeftContent;
