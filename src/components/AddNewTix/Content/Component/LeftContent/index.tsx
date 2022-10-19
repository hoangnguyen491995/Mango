import { Button } from "antd";
import { useContext } from "react";
import TixContext from "../../TixContext";
import HeaderItemTicket from "./HeaderItemTicket";
import { ItemTicket } from "./ItemTicket";
import ModalRepeat from "./ModalRepeat";
import ModalLastNote from "./ModalLastNode";
import { FooterTicket } from "./FooterTicket";
import { GroupTicket } from "./GroupTicket";
import { ShowContent, type } from "../../helper";

const LeftContent = ({ onOk, onCancel }) => {
  //data context
  const tixCT = useContext(TixContext)[0];

  //
  return (
    <>
      <div>
        <HeaderItemTicket />
        <div className="overflow-auto mt-4 ">
          {tixCT.dataItemTix.map((_itemAppt, indexAppt) => {
            return (
              <div key={indexAppt}>
                <ItemTicket indexAppt={indexAppt} />

                <div
                  className="w-[100px] hover:bg-mango-primary-blue-light !h-[35px] !px-[10px] !py-[0px]  cursor-pointer leading-[15px] text-[12px] rounded-[4px] items-center flex font-semibold text-mango-primary-blue uppercase "
                  onClick={() => {
                    tixCT.setIdTech(0);
                    tixCT.setShowContent(ShowContent(type.ShowSelectTech));
                  }}
                >
                  <p className=" !font-extrabold !text-mango-primary-blue !box-border  !m-0  ">
                    + ADD TECH
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full ">
        <ModalRepeat />
        <GroupTicket />
        <ModalLastNote />
        <FooterTicket onOk={onOk} onCancel={onCancel} />
      </div>
    </>
  );
};
export default LeftContent;
