import ClientList from "./ClientList";
import WalkedInList from "./WalkedInList";
import { Tabs } from "antd";
import { useContext, useEffect, useState } from "react";
const Clients: React.FC = () => {
  const [indexTab, setIndexTab] = useState<number>(1);
  const [showAddNewClient, setShowAddNewClient] = useState<boolean>(false);
  const onChange = (key) => {
    setIndexTab(key);
  };
  const handleAddNewClient = () => {
    setShowAddNewClient(true);
  };
  return (
    <>
      <div className=" w-full h-full  ">
        {!showAddNewClient && (
          <div className="w-full  flex justify-between cursor-pointer shadow-md  ">
            <div
              className={
                "w-full h-[50px]  border-r-mango-border-dark flex items-center justify-center border-r   " +
                (indexTab == 1 && " border-b-2 border-mango-primary-blue")
              }
              onClick={() => onChange(1)}
            >
              <h2 className="text-mango-primary-blue !mx-4 text-center font-bold mt-2">
                CLIENT LIST
              </h2>
            </div>
            <div
              className={
                "w-full h-[50px] flex items-center justify-center " +
                (indexTab == 2 && " border-b-2 border-mango-primary-purple")
              }
              onClick={() => onChange(2)}
            >
              {" "}
              <h2 className="text-mango-primary-purple !mx-4 text-center font-bold mt-2">
                WALKED-IN LIST
              </h2>
            </div>
          </div>
        )}

        {indexTab == 1 ? (
          <div className="w-full h-full">
            <ClientList
              showAddNewClient={showAddNewClient}
              setShowAddNewClient={setShowAddNewClient}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <WalkedInList indexTab={indexTab} />
          </div>
        )}
      </div>
    </>
  );
};
export default Clients;
