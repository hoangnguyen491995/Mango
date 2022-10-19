import { useSelector } from "react-redux";
import { CreateCharge$ } from "src/redux/selector";
import { API_MANGO_IMG } from "src/utils/constant";
import ModalScanGiftCard from "./ModalScanGiftCardCode";

function GiftCardPayment() {

  const ChangePrice = useSelector(CreateCharge$)
  
  return (
    <div className="mt-8 mb-4 ">
      <span className=" text-[#00bed6] font-bold  xl:text-[16px] text-[12px] xl:my-4 my-2 ">
        GIFT CARD PAYMENT
      </span>
      <div
        className=" 2xl:w-[280px] xl:w-[240px] w-[210px] xl:h-[35px] h-[30px] border-[1px]
       flex justify-center items-center border-dotted border-slate-500 mt-4 "
      >
        <span className=" font-semibold text-[#505050] mr-2  xl:text-[15px] text-[11px]  ">
          BALANCE
        </span>
        <span className="text-[#f28523] font-bold xl:text-[15px] text-[11px]">
          $0.00
        </span>
      </div>
      <div className="flex justify-between items-center border-b-[1px] mt-4 pb-[2px] border-slate-300 ">
        <img
          className="2xl:w-[24px] 2xl:h-[24px] xl:h-[21px] xl:w-[21px] w-[18px] h-[18px]"
          src={`${API_MANGO_IMG}/Content/image/design/payment/credit/24px_25-01.svg`}
          alt=""
        />
        <span className="text-slate-500  2xl:text-[14px] xl:text-[12px] text-[10px]">
          SWIPE/TYPE NUMBER
        </span>
        <span className=" text-[#00bed6]   2xl:text-[14px] xl:text-[12px] text-[10px] font-semibold">
          <ModalScanGiftCard />
        </span>
      </div>
      <div
        className="flex items-center border-b-[1px] xl:mt-8 mt-4 pb-[2px]
       border-slate-300 w-[50%] justify-start  "
      >
        <img
          className="2xl:w-[24px] 2xl:h-[24px] xl:h-[21px] xl:w-[21px] w-[18px] h-[18px] mr-4"
          src={`${API_MANGO_IMG}/Content/image/design/payment/credit/30px-424-01.svg`}
          alt=""
        />
        <span className="text-slate-500 2xl:text-[14px] xl:text-[12px] text-[10px]">
          ${ChangePrice.TotalPrice}
        </span>
      </div>
      <div className="flex items-center  xl:mt-8 mt-4 pb-[2px] justify-start  ">
        <img
          className="2xl:w-[24px] 2xl:h-[24px] xl:h-[21px] xl:w-[21px] w-[18px] h-[18px] mr-4"
          src={`${API_MANGO_IMG}/Content/image/design/payment/credit/24px-49-01.svg`}
          alt=""
        />
        <span className="text-slate-500  2xl:text-[14px] xl:text-[12px] text-[10px]">
          ORIGINAL AMOUNT
        </span>
      </div>
      <div className="flex items-center  xl:mt-8 mt-4 pb-[2px] justify-start  ">
        <img
          className="2xl:w-[24px] 2xl:h-[24px] xl:h-[21px] xl:w-[21px] w-[18px] h-[18px] mr-4"
          src={`${API_MANGO_IMG}/Content/image/design/payment/credit/24px_133-01.svg`}
          alt=""
        />
        <span className="text-slate-500  2xl:text-[14px] xl:text-[12px] text-[10px]">
          PURCHSE DATE
        </span>
      </div>
      <div className="flex items-center  xl:mt-8 mt-4 pb-[2px] justify-start">
        <img
          className="2xl:w-[24px] 2xl:h-[24px] xl:h-[21px] xl:w-[21px] w-[18px] h-[18px] mr-4"
          src={`${API_MANGO_IMG}/Content/image/design/payment/credit/27x25px-Expiry-date-01.svg`}
          alt=""
        />
        <span className="text-slate-500  2xl:text-[14px] xl:text-[12px] text-[10px]">
          EXPIRY DATE{" "}
        </span>
      </div>
      <div className="w-full flex justify-center">
        <div
          className=" w-[96%] mt-6 xl:h-[38px] h-[28px] rounded flex justify-center items-center"
          style={{ backgroundColor: "#f89b21" }}
        >
          <span className="text-[#fff]  xl:text-[18px] text-[14px]">
            PROCESS
          </span>
        </div>
      </div>
    </div>
  );
}

export default GiftCardPayment;
