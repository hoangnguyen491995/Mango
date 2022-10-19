import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetReLoadPayment } from "services/CreateCharge/ReLoadPaymentInfoOFA";
import { CreateCharge$ } from "src/redux/selector";
import { theme } from "tailwind.config";
import { BiX } from "react-icons/bi";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
interface IGetReLoadPayment {
  subTotal: number;
  taxTotal: number;
  totalBase: number;
  totalPreTip: number;
  count: number;
  cashDiscount: number;
  tipAmount: number;
}
function Subtotal() {
  const dispatch = useDispatch();
  const CheckNo = useSelector(CreateCharge$);
  console.log("CheckNo", CheckNo);
  // const CheckNo = 2132121;
  const [dataReLoadPayment, setDataReLoadPayment] =
    useState<IGetReLoadPayment>();
  const getReLoadPayment = new GetReLoadPayment();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     getReLoadPayment
  //       .getReLoadPayment(CheckNo.IDItemInTiket.iteminfo.checkNo)
  //       .then((res) => {
  //         setDataReLoadPayment(res.data?.model);
  //       });
  //   };
  //   fetchData().catch(console.error);
  // }, [CheckNo.IDItemInTiket?.iteminfo?.checkNo, CheckNo.RenderAddTechLeft]);

  useEffect(() => {
    {
      dispatch(
        CreateChargeSlice.actions.setTotalPriceCreateCharge({
          TotalPrice: dataReLoadPayment?.totalBase,
          Tip: dataReLoadPayment?.totalPreTip,
        })
      );
    }
  }, [dataReLoadPayment?.totalBase, dataReLoadPayment?.totalPreTip]);
  const [taxApply, setTaxApply] = useState<boolean>(false);
  const handleTaxApply = () => {
    setTaxApply(!taxApply);
  };
  // console.log("tiptitp9", dataReLoadPayment);
  return (
    <div className="">
      <div
        className="rounded-md h-[277px] border-[1px]
       border-solid border-current flex flex-col justify-between"
      >
        <div className="w-[90%] flex flex-col  ml-[5%] ">
          <div
            className="flex justify-between
           items-center border-b-[1px] border-current py-2"
          >
            <span className=" font-bold text-[#505050] xl:text-[15px] text-[13px]">
              SUBTOTAL ({dataReLoadPayment?.count} Items)
            </span>
            <span
              className=" font-bold xl:text-[15px] text-[13px]"
              style={{
                color: `${theme.extend.colors["mango-primary-blue"]}`,
              }}
            >
              $
              {/* {CheckNo.IDItemInTiket?.iteminfo?.checkNo == undefined
                ? "0"
                : dataReLoadPayment?.subTotal == undefined
                ? "0.00"
                : CheckNo.IDItemInTiket?.iteminfo?.checkNo == undefined
                ? "0"
                : dataReLoadPayment?.subTotal} */}
            </span>
          </div>
          {dataReLoadPayment?.cashDiscount != 0 && (
            <div
              className="flex justify-between items-center
            border-b-[1px] border-stone-400 py-[10px]  "
            >
              <div className="flex justify-center items-center">
                <BiX
                  style={{
                    color: `${theme.extend.colors["mango-orange"]}`,
                  }}
                  className="2xl:w-[26px] 2xl:h-[26px] xl:w-[21px] xl:h-[21px] w-[18px] h-[18px] "
                />
                <span className="  xl:text-[14px] text-[12px] font-semibold">
                  Credit Surchage
                </span>
              </div>
              <span
                className=" xl:text-[15px] text-[13px] font-semibold text-[#505050]"
                style={{
                  color: `${theme.extend.colors["mango-primary-blue"]}`,
                }}
              >
                ${dataReLoadPayment?.cashDiscount}
              </span>
            </div>
          )}
          <div
            className="flex justify-between items-center
            border-b-[1px] border-stone-400 py-[10px] "
          >
            <div className="flex flex-col justify-start items-start ">
              <span className="  xl:text-[14px] text-[12px] font-semibold">
                Tax
              </span>
              {taxApply ? (
                <div
                  className="border-[1px] py-[3px] w-[140px]  border-[#505050] rounded-md"
                  onClick={handleTaxApply}
                >
                  <span className=" xl:text-[14px] text-[12px] font-semibold">
                    Tax Exempt
                  </span>
                </div>
              ) : (
                <div
                  className=" w-[140px] border-[1px]  py-[3px]  border-[#94c83d] rounded-md"
                  onClick={handleTaxApply}
                >
                  <span className=" xl:text-[14px] text-[12px] font-semibold text-[#94c83d]">
                    Tax Apply
                  </span>
                </div>
              )}
            </div>
            <span
              className=" xl:text-[15px] text-[13px] font-semibold"
              style={{
                color: `${theme.extend.colors["mango-primary-blue"]}`,
              }}
            >
              $
              {dataReLoadPayment?.taxTotal == 0 ||
                dataReLoadPayment?.taxTotal == undefined
                ? "0.00"
                : dataReLoadPayment?.taxTotal}
            </span>
          </div>
          {dataReLoadPayment?.totalPreTip != 0 && (
            <div
              className="flex justify-between items-center
           border-b-[1px] border-stone-400 py-[10px]  "
            >
              <span className="  xl:text-[14px] text-[12px] font-semibold">
                Tip
              </span>
              <span
                className=" xl:text-[15px] text-[13px] font-semibold"
                style={{
                  color: `${theme.extend.colors["mango-primary-blue"]}`,
                }}
              >
                ${dataReLoadPayment?.totalPreTip}
              </span>
            </div>
          )}
        </div>
        <div
          className="flex justify-between items-center w-[90%] 
        py-[10px] border-t-[1px] border-current ml-[5%]"
        >
          <span className=" font-bold text-[#505050] xl:text-[15px] text-[13px] ">
            TOTAL
          </span>
          <span className=" font-bold xl:text-[15px] text-[13px] text-[#505050]">
            $
            {dataReLoadPayment?.totalBase == 0 ||
              dataReLoadPayment?.totalBase == undefined
              ? "0.00"
              : dataReLoadPayment?.totalBase}
          </span>
        </div>
      </div>
    </div>
  );
}
export default Subtotal;
