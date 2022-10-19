import { Row } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { currencyFormat } from "src/helper/General";
import { CreateCharge$ } from "src/redux/selector";
import styled from "styled-components";
import GiftCardPayment from "./FormGiftCardPayment";
import Others from "./FormOthersTotalPrice";
import ManageTips from "./ModalManageTips";

const data = {
  total: 67,
};

const InputDuration = styled.input`
  height: 50px;
  border: none;
  color: #f28500;
  outline: none;
`;
const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."];

function TotalPrice() {
  const ChangePrice = useSelector(CreateCharge$);
  const [valueTime, setValueTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("0");
  const [paymented, setPaymented] = useState<Number>(0)
  const [change, setChange] = useState<Number>(0)
  const [giftCard, setGiftCart] = useState<Number>(0)
  const  [due, setDue] = useState<Number>(0)
  const durationRef = useRef(null);
  const [showForm, setShowForm] = useState<string>("number");

// useEffect(()=>{ 
// }, [duration])

  const handleKeyNumber = (item: string) => {
    setDuration(valueTime);
    switch (item) {
      case "C":
        setDuration("0");
        break;
      case ".":
        setDuration(duration);
        break;
      default:
        setDuration(duration + item);
        break;
    }
  };
  const handleCashButon = () =>{
    let dueCal:number = 0
    let changeCal:number =0
    if(data.total > parseInt(duration)){
      dueCal = data.total - parseInt(duration)
      setDue(dueCal)
      setPaymented(parseInt(duration))
    } else{
      setDue(0)
      changeCal =  parseInt(duration) - data.total
      setChange(changeCal)
      setPaymented(data.total)
    }
    setDuration("0");
  }

  return (
    <>
      <div className="flex mt-8 justify-start">
        <div
          className="w-[28%] flex flex-col h-full
         justify-end items-center mt-2"
        >
          <div
            className=" flex flex-col justify-center relative cursor-pointer
             items-center ml-2 w-10/12 border xl:h-[90px]
             rounded-md 2xl:mt-8 mt-4 py-2 min-w-[75px]  "
            style={{ backgroundColor: "#A8A9AD" }}
          >
            <span
              className="font-semibold text-white
               2xl:text-[20px] text-base
             xl:text-[14px] "
            >
              TOTAL
            </span>
            <span
              className="font-bold text-white
             2xl:text-[22px] text-[15px] xl:text-[17px]"
            >
              {/* ${ChangePrice.TotalPrice} */}${currencyFormat(data.total)}
            </span>
          </div>
          <div
            className="hover:opacity-60  flex justify-center relative
             items-center  ml-2 w-10/12 border cursor-pointer
             xl:h-[50px] rounded-md 2xl:mt-[24px] mt-[15px] 
              py-2 min-w-[75px] "
            style={{ backgroundColor: "#93d500" }}
            onClick={handleCashButon}
          >
            <span
              className="font-semibold text-white 
            2xl:text-[18px] text-[12px] xl:text-[14px]"
            >
              CASH
            </span>
          </div>
          <div
            className="hover:opacity-60 flex  relative cursor-pointer
            justify-center items-center  ml-2 w-10/12 border 
            xl:h-[50px] rounded-md 2xl:mt-[24px] mt-[15px]
              py-2  min-w-[75px] "
            style={{ backgroundColor: "#00bed6" }}
          >
            <span
              className="font-semibold text-white
              2xl:text-[18px] text-[12px] xl:text-[14px]"
            >
              CREDIT
            </span>
          </div>
          <div
            onClick={() => {
              if (showForm == "number") {
                setShowForm("GiftCardPayment");
              } else {
                setShowForm("number");
              }
            }}
            className="hover:opacity-60 flex justify-center  relative cursor-pointer
            items-center  ml-2 w-10/12 border py-2 min-w-[75px]
             xl:h-[50px] rounded-md 2xl:mt-[24px] mt-[15px] "
            style={{ backgroundColor: "#f28500" }}
          >
            <span
              className="font-semibold text-white
              2xl:text-[18px] text-[12px] xl:text-[14px]"
            >
              GIFT CARD
            </span>
          </div>
          <div
            onClick={() => {
              if (showForm == "number") {
                setShowForm("OtherPayments");
              } else {
                setShowForm("number");
              }
            }}
            className="hover:opacity-60 flex justify-center relative
             items-center  ml-2 w-10/12 border cursor-pointer
             xl:h-[50px] rounded-md 2xl:mt-[24px] mt-[15px] 
             py-2 min-w-[75px]"
            style={{ backgroundColor: "#8b85ca" }}
          >
            <span
              className="font-semibold text-white 
            2xl:text-[18px] text-[12px] xl:text-[14px]"
            >
              OTHERS
            </span>
          </div>
        </div>
        <div
          className="border-[1px] rounded-xl 2xl:w-[320px] xl:w-[295px] 
        min-w-[240px] w-[240px] border-stone-400"
        >
          <div className=" flex justify-center items-end">
            {/* show number */}
            {showForm == "number" && (
              <div
                className="2xl:h-[500px] px-2 animate__animated 
                           animate__backInUp flex flex-col item-center justify-center"
              >
                <div className=" flex flex-col content-center items-center">
                  <InputDuration
                    placeholder="0"
                    value={"$" + currencyFormat(parseInt(duration))}
                    ref={durationRef}
                    className="placeholder:text-xl text-center
                     border-none w-full
                     2xl:text-[25px] md:text-[20px] text-[16px] font-bold"
                  />
                </div>
                <Row justify="space-around" className="pb-8 pt-2">
                  {keyCalc.map((item, index) => {
                    return (
                      <div key={index} className="m-2">
                        <div
                          className="border-[1px] border-stone-400 flex justify-center 
                          hover:opacity-50 rounded-full 2xl:w-[70px] 2xl:h-[70px]
                          xl:h-[62px] xl:w-[62px] w-[48px] h-[48px] items-center cursor-pointer "
                          onClick={() => handleKeyNumber(item)}
                        >
                          <button className="text-[#505050]">
                            <span className="font-bold 2xl:text-3xl xl:text-2xl text-xl">
                              {item}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </Row>
              </div>
            )}
            {showForm == "OtherPayments" && <Others />}
            {showForm == "GiftCardPayment" && <GiftCardPayment />}
          </div>
        </div>
        <div className="w-[24%] flex flex-col">
          <div className="flex mt-10">
            <div className="flex w-[10%] border-stone-400 mt-6 "></div>
            <div
              className=" flex flex-col justify-center relative cursor-pointer
               items-center border 2xl:h-[85px] xl:h-[70px] -ml-1
               rounded-md w-full min-w-[75px]" 
              style={{ backgroundColor: "#f44c7f" }}
            >
              <span
                className="font-semibold text-white 2xl:text-[17px] 
              text-[12px] xl:text-[13px] "
              >
                DUE
              </span>
              <span
                className="font-bold text-white 
              2xl:text-[22px] text-[15px] xl:text-[17px] "
              >
                {/* ${ChangePrice.TotalPrice} */}
                ${currencyFormat(due)}

              </span>
            </div>
          </div>
          <span
            className=" font-semibold border-b-[1px] 
           border-stone-400 xl:text-[18px]
            text-[12px] text-[#505050] mt-8 "
          >
            ${currencyFormat(paymented)}
          </span>
          <span
           className=" font-semibold border-b-[1px] 
           border-stone-400 xl:text-[18px]
            text-[12px] text-[#505050] mt-8 "
          >
            $0.00
          </span>
          <span
            className=" font-semibold border-b-[1px] 
            border-stone-400 xl:text-[18px]
             text-[12px] text-[#505050] mt-8 "
          >
            $0.00
          </span>
          <span
           className=" font-semibold border-b-[1px] 
           border-stone-400 xl:text-[18px]
            text-[12px] text-[#505050] mt-8 "
          >
            $0.00
          </span>
          <div className="flex mt-6 justify-center ">
            <ManageTips />
            <div
              className="rounded w-[35%] border-[1px] flex justify-center
             items-center border-stone-400 "
            >
              <span
                className="font-semibol xl:text-[18px]
               text-[12px] text-[#505050] truncate"
              >
                ${ChangePrice.tip}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TotalPrice;
