import { Input, Skeleton, Spin } from "antd";
import Search from "antd/lib/input/Search";
import { useContext, useEffect, useState } from "react";
import { GetListWithFiltering } from "services/Customers/GetListWithFiltering";
import { GetSearchInfoClient } from "services/SearchClientList/clientList";
import UseSearch from "src/utils/UseSearch";
import { ISearchInforClient } from "../../DataStructures";
import { ShowContent, type } from "../../helper";
import TixContext from "../../TixContext";
import { AddNewClient } from "./AddNewClient";
interface Props {
  showAddNewClient: boolean;
  setShowAddNewClient: Function;
}
const ClientList = ({ showAddNewClient, setShowAddNewClient }: Props) => {
  //tix context

  const tixCT = useContext(TixContext)[0];

  const [valueInput, setValueInput] = useState<string>("");
  const searchValue = UseSearch(valueInput, 500);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getSearchInfoClient = new GetListWithFiltering();
  const [dataSearchInfoClient, setDataSearchInfoClient] = useState<
    Array<ISearchInforClient>
  >([]);

  const handleSearch = (value) => {
    setValueInput(value);
    // console.log(value);
  };

  const handleChangeClient = (itemClient) => {
    tixCT.setIdClientTix(itemClient.customerID);
    tixCT.dataItemTix[tixCT.idAppt].customerID = itemClient.customerID;
    tixCT.dataItemTix[tixCT.idAppt].name = itemClient.customerName;
    tixCT.setShowContent(ShowContent(type.ShowSearchServiceItem));
  };

  const classInput =
    "!border-x-0 !border-t-0  !border-b-mango-border-dark !rounded-none ";
  useEffect(() => {
    setIsLoading(true);
    const param = {
      loadIndex: 100,
      customerName: searchValue,
      sortType: 0,
    };
    getSearchInfoClient.getListWithFiltering(param).then((res) => {
      if (res.status == 200) {
        setDataSearchInfoClient(res.data);
        setIsLoading(false);
      }
    });
  }, [searchValue]);
  return (
    <div className="w-full h-full p-5">
      {!showAddNewClient && (
        <>
          <Search
            value={valueInput}
            bordered={false}
            onChange={(e) => handleSearch(e.target.value)}
            size="large"
            allowClear
            className={
              classInput +
              " w-full  !focus:outline-none !p-0 !m-0 !mb-2 customeInputSearch"
            }
            style={{ borderBottom: "1px solid gray" }}
            placeholder="Search client "
          />
          <button
            className=" text-[#00B2C8]  bg-mango-primary-blue-light font-bold w-full h-8 mt-[10px] hover:bg-cyan-200 !rounded-[1px]"
            onClick={() => setShowAddNewClient(true)}
          >
            + ADD NEW CLIENT ""
          </button>
        </>
      )}
      {showAddNewClient ? (
        <AddNewClient setShowAddNewClient={setShowAddNewClient} />
      ) : isLoading ? (
        <div className="overflow-auto h-[520px] w-full ">
          {[...Array(12)].map((index) => {
            return (
              <div key={index}>
                <button className="w-full bg-white h-12   border-t border-dashed   ">
                  <div className=" flex flex-row justify-between font-bold">
                    <Skeleton
                      active
                      paragraph={{ rows: 1, width: "150px" }}
                      title={false}
                    />
                    <Skeleton
                      active
                      paragraph={{
                        rows: 1,
                        width: "150px",
                        style: { marginLeft: "auto" },
                      }}
                      style={{ width: "150px" }}
                      title={false}
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-auto h-[520px] w-full ">
          {dataSearchInfoClient.map((itemClient: ISearchInforClient, index) => {
            return (
              <div key={index} onClick={() => handleChangeClient(itemClient)}>
                <button className="w-full bg-white h-12 hover:bg-cyan-200   border-t border-dashed   ">
                  <div className=" flex flex-row justify-between font-bold">
                    <span className=" ">{itemClient.customerName}</span>
                    <span className="  ">{itemClient.contactPhone}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ClientList;
