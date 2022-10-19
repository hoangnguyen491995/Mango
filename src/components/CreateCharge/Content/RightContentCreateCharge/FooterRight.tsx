import { theme } from "tailwind.config";
import { useRouter } from "next/router";
import { CreateChargeSlice } from "../../CreateChargeSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import PrintBill from "./FormRightCreateCharge.tsx/FormTechRightCreateCharge/ModalPRintBill";

function PayBill({}) {
  const [state, setState] = useState<Boolean>(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const props = {
    BillName: "CLOSE BILL",
    background: "bg-yellow-300",
  };
  return (
    <div className="flex justify-between w-full mb-3">
      <div className="flex justify-between ml-4">
        <button
          className="w-[150px] bg-yellow-300 py-[10px] rounded text-white font-bold ml-4"
          onClick={() => {
            router.push("/salon-center");
          }}
        >
          <span className="2xl:text-[18px] xl:text-[15px] text-[10px]">
            CANCEL
          </span>
        </button>
        <button
          className="w-[150px] rounded text-white font-bold mx-2"
          style={{
            background: `${theme.extend.colors["mango-gray-3"]}`,
          }}
        >
          <span className="2xl:text-[18px] xl:text-[15px] text-[10px]">
            SAVE
          </span>
        </button>
      </div>
      {/* <div>
        <button
          className="w-[150px] rounded  py-[10px] text-white font-bold ml-14 min-w-[100px] uppercase"
          style={{
            background: "#F28500",
          }}
        >
          <span className=" 2xl:text-[18px] xl:text-[15px] text-[10px]">
            QUICK CASH
          </span>
        </button>
      </div> */}
      {state ? (
        <button
          className="w-[150px] rounded  py-[10px] text-white font-bold mr-14 min-w-[100px] uppercase"
          style={{
            background: `${theme.extend.colors["mango-primary-green"]}`,
          }}
          onClick={() => {        
            dispatch(CreateChargeSlice.actions.showFormRightTech(1000));
            dispatch(CreateChargeSlice.actions.setShowFormRight("tech"));
          }}
        >
          {" "}
          <span className=" 2xl:text-[18px] xl:text-[15px] text-[10px]">
            PAY BILL
          </span>
        </button>
      ) : (
        <>
          <PrintBill />
          <button className="w-[150px] rounded  py-[10px] text-white font-bold mr-14 min-w-[100px] bg-mango-primary-orange-2">
            <span className=" 2xl:text-[18px] xl:text-[15px] text-[10px] uppercase">
              Close Bill
            </span>
          </button>
        </>
      )}
    </div>
  );
}

export default PayBill;
{
  /* < button className=" bg-yellow-300 w-[150px] rounded  py-[10px] text-white font-bold mr-14 min-w-[100px]">
CLOSE BILL
</button> */
}
