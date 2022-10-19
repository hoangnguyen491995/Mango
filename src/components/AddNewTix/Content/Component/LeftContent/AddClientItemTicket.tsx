import { Button } from "antd";
import { useContext } from "react";
import { ShowContent, type } from "../../helper";
import TixContext from "../../TixContext";

type Props = {};
export const AddClientItemTicket = (props: Props) => {
  //data context
  const tixCT = useContext(TixContext)[0];
  return (
    <>
      {/* Add client */}
      {(tixCT.dataItemTix[tixCT.idAppt] &&
        tixCT.dataItemTix[tixCT.idAppt].customerID > 0) ||
      tixCT.idAppt > 0 ? (
        <div className="w-full mt-3 mb-3"></div>
      ) : (
        <Button
          size="large"
          className="w-full mb-4 !bg-mango-primary-blue-light !border-none hover:!bg-mango-primary-blue-hover !shadow-md !rounded-md"
          onClick={() => {
            tixCT.setShowContent(ShowContent(type.ShowSearchClient));
          }}
        >
          <span className="text-cyan-500 font-bold">+ ADD CLIENT</span>
        </Button>
      )}
    </>
  );
};
