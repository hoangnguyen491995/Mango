import { Col, Modal, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CreateCharge$ } from "src/redux/selector";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { UpdatePreTip } from "services/CreateCharge/AddUpdatePreTip";
import { GetSlipTip } from "services/CreateCharge/GetSlipTip";
import styled from "styled-components";
import { PropBill } from "./ModalMore";
import { DetailBillTicket } from "src/components/BatchTipIconLeft/DetailBillTicket";
interface ITipTech {
  employeeName: string;
  otherTip: number;
  percentage: number;
  tip: number;
  tipAmount: number;
  total: number;
}
interface IGetSlipTip {
  listOfferAmount;
  listPercentOfferAmout;
  lstTip;
}
const InputDuration = styled.input`
  height: 50px;
  border: none;
  color: #f28500;
  outline: none;
`;
interface Props {
  props: PropBill;
}
const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."];
const PrintBill = () => {
  const [duration, setDuration] = useState<string>("$0.00");
  const durationRef = useRef(null);
  const [valueTime, setValueTime] = useState<string>("0");

  const handleKeyNumber = (item: string) => {
    setDuration(valueTime);
    switch (item) {
      case "C":
        setDuration("");
        break;
      default:
        setDuration(duration + item);
        break;
    }
  };
  const [isPrint, setIsPrint] = useState<boolean>(false);
  const printContent = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const ChangePrice = useSelector(CreateCharge$);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showRight, setShowRight] = useState<boolean>(true);
  const [even, setEven] = useState<number>(1);
  const [price, setPrice] = useState<string>("");
  const showModal = () => {
    ChangePrice.IDItemInTiket.iteminfo &&
      ChangePrice.IDItemInTiket.iteminfo.checkNo &&
      setIsModalVisible(true);
    console.log("aas", isModalVisible);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setShowRight(true);
      setEven(1);
    }, 100);
  };
  const handleSaveTip = () => {
    if (ChangePrice.setPriceModalManageTip != 0) {
      setIsModalVisible(false);
      dispatch(
        CreateChargeSlice.actions.setPriceModalManageTipDue(
          ChangePrice.setPriceModalManageTip
        )
      );
    }
  };

  const updatePreTip = new UpdatePreTip();
  // const handleChangePrice = (state) => {
  //   console.log(state);

  //   setPrice(state);
  // };

  const [datagetByCategory, setDatagetByCategory] = useState<IGetSlipTip>();
  const getSlipTip = new GetSlipTip();

  useEffect(() => {
    const fetchData = async () => {
      getSlipTip
        .getSlipTip(ChangePrice.IDItemInTiket.iteminfo.checkNo)
        .then((res) => {
          setDatagetByCategory(res.data.modelTip);
        });
    };
    fetchData().catch(console.error);
  }, []);
  let listPrice = [
    {
      price: 3,
    },
    {
      price: 5,
    },
    {
      price: 7,
    },
    {
      price: 10,
    },
    {
      price: 15,
    },
    {
      price: 20,
    },
  ];
  const showDetailBill = () => {
    return (
      ChangePrice.IDItemInTiket.iteminfo &&
      ChangePrice.IDItemInTiket.iteminfo.checkNo && (
        <DetailBillTicket
          checkNo={ChangePrice.IDItemInTiket.iteminfo.checkNo}
          printContent={printContent}
          isPrint={isPrint}
        />
      )
    );
  };
  return (
    <>
      <div>
        <span
          className="flex mt-[3px] hover:text-orange-300 cursor-pointer text-[16px]"
          onClick={showModal}
        >
          Print Bill
        </span>
      </div>

      <Modal
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ minWidth: `${even == 3 ? "1350px" : "1000px"}` }}
      >
        <div className="flex flex-col justify-center items-center mb-4">
          <div className="flex">
            <span className="text-[#94d500] xl:text-[26px] text-[20px] font-bold mr-[8px]">
              FULL PAYMENT RECEICED
            </span>
            <img src="/assets/imgs/Check.svg" alt="" />
          </div>
          <div className="flex mt-4">
            <div className="w-[410px] border-[1px] border-neutral-500">
              {showDetailBill()}
            </div>
            <div className="w-[540px] ">
              <div className="flex flex-col h-[650px] justify-between ">
                <div>
                  <div className="flex flex-col justify-center items-center  ">
                    <div className="border-b-2 w-11/12 flex justify-center border-dashed border-stone-500 pb-[6px] mt-6">
                      <span className="text-[22px] text-[#505050] font-bold mr-6">
                        TOTAL TIP
                      </span>
                      <span className="text-2xl font-bold text-[#505050]">
                        ${ChangePrice.tip}.00
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex justify-center items-center ">
                      <div className="flex justify-start mt-[12px]">
                        <span className="text-[16px] text-[#505050] font-semibold ml-6 mr-8">
                          CREDIT TIP
                        </span>
                        <span className="text-[18px] text-[#505050] font-bold">
                          $0
                        </span>
                      </div>
                    </div>
                    <div className="flex mr-6">
                      <div className="flex mt-[12px] bg-[#a7a7a74d] rounded h-[35px] justify-center items-center px-[5px]">
                        <span className="text-[16px] text-[#505050] font-semibold  mr-6">
                          OTHER TIP
                        </span>
                        <span className="text-[18px] text-[#505050] font-bold mr-2">
                          ${ChangePrice.tip}.00
                        </span>
                        <img
                          className="w-[25px] h-[25px]"
                          src="/assets/imgs/edit.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 ">
                    <div className="flex mt-4 border-[1px] border-stone-400 rounded-3xl w-[80%] justify-center items-center">
                      <div
                        className={`${
                          even == 1 ? "bg-[#00bed64d]" : ""
                        }  h-[35px] flex justify-center items-center rounded-l-3xl w-4/12`}
                        onClick={() => setEven(1)}
                      >
                        <span
                          className={`text-[18px] text-[#505050] font-semibold ${
                            even !== 1 ? "text-[#d1d1d1]" : ""
                          } `}
                        >
                          EVEN
                        </span>
                      </div>
                      <div
                        className={`${
                          even == 2 ? "bg-[#00bed64d]" : ""
                        }   h-[35px] border-l-[1px] border-stone-400 flex justify-center items-center w-4/12`}
                        onClick={() => setEven(2)}
                      >
                        <span
                          className={` text-[18px] text-[#505050] font-semibold ${
                            even !== 2 ? "text-[#d1d1d1]" : ""
                          } `}
                        >
                          PERCENTAGE
                        </span>
                      </div>
                      <div
                        className={`${
                          even == 3 ? "bg-[#00bed64d]" : ""
                        }   h-[35px] flex justify-center items-center border-l-[1px]
                         border-stone-400  rounded-r-3xl w-4/12`}
                        onClick={() => {
                          if (
                            datagetByCategory?.lstTip[0]?.employeeName.toUpperCase() !=
                            undefined
                          ) {
                            setEven(3);
                          }
                          setShowRight(false);
                        }}
                      >
                        <span
                          className={`text-[18px] text-[#505050] font-semibold ${
                            even !== 3 ? "text-[#d1d1d1]" : ""
                          } `}
                        >
                          CUSTOM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="">
                      {datagetByCategory?.lstTip.map(
                        (post: ITipTech, index) => {
                          // console.log("post tip", post);
                          return (
                            <div
                              key={index}
                              className="flex mt-8 justify-between mx-20 "
                            >
                              <span className="text-[20px] text-[#505050] font-bold">
                                {post.employeeName.toUpperCase()}
                              </span>

                              <span className=" text-[20px] text-[#505050] font-bold ">
                                {Math.round(
                                  (post.percentage / 100) *
                                    Number(ChangePrice.tip) *
                                    100
                                ) / 100}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <div className="flex w-[92%] justify-around ml-4">
                    <div
                      className="flex justify-center items-center h-[45px] rounded w-full
                     border-[1px] border-stone-400 ml-2 mr-4 hover:bg-[#d1d1d1] shadow-xl"
                    >
                      <span className=" font-bold text-xl text-[#505050]">
                        SEND RECEIPT
                      </span>
                    </div>
                    <div
                      className="flex justify-center items-center h-[45px]  rounded w-full
                     hover:opacity-20 border-stone-400 border-[1px] shadow-xl"
                    >
                      <span className=" font-bold  text-xl text-[#505050] ">
                        PRINT
                      </span>
                    </div>
                  </div>
                  <div className="flex w-[92%] justify-around ml-4 mt-[12px]">
                    <div
                      className="flex justify-center items-center h-[45px] rounded w-full 
                    border-[1px] border-stone-400 ml-2 mr-4 hover:bg-[#d1d1d1] shadow-xl"
                    >
                      <span className=" font-bold text-xl text-[#505050]">
                        EDIT
                      </span>
                    </div>
                    <div
                      className="flex justify-center items-center h-[45px]
                     bg-[#fdb714] rounded w-full hover:opacity-20 shadow-xl "
                    >
                      <span className=" font-bold text-white text-xl">
                        {" "}
                        CLOSE TICKET{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {even == 3 && (
              <div
                className="w-[350px] border-l-[1px] border-neutral-500
             flex flex-col justify-center items-center  "
              >
                <div>
                  <div className="mb-10">
                    <span className=" xl:text-[24px] text-[20px] font-bold  text-[#505050] ">
                      ADD TIP TO "
                      {datagetByCategory?.lstTip[0]?.employeeName.toUpperCase()}
                      "
                    </span>
                  </div>
                </div>
                <Row className="w-full justify-evenly">
                  {listPrice.map((post) => {
                    return (
                      <Col span={7}>
                        <div
                          className="w-full border-[1px] rounded flex justify-center shadow-xl
                                  items-center h-[38px] border-stone-400 mt-[12px] ml-[15px]"
                        >
                          <div className="mb-[5px] w-[95%] flex truncate justify-center items-center">
                            <span className=" font-bold text-[17px] text-[#505050] mt-[4px] ">
                              ${post.price}
                            </span>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
                <div className="px-[18px] flex-col flex  items-center mt-4 mb-10">
                  <div className=" flex flex-col content-center items-center ">
                    <InputDuration
                      placeholder="0"
                      value={String(duration)}
                      ref={durationRef}
                      className=" text-center border-none w-full
                        2xl:text-[22px] md:text-[18px] text-[18px] font-bold "
                    />
                  </div>
                  <Row
                    justify="space-around"
                    className=" xl:w-[85%] w-[70%] mt-6"
                  >
                    {keyCalc.map((item, index) => {
                      return (
                        <div key={index} className="m-[2px]">
                          <div
                            onClick={() => handleKeyNumber(item)}
                            className="border-[2px] border-stone-400 flex justify-center 
                            items-center mt-[5px] hover:shadow-md rounded-full w-[65px] h-[65px]"
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
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PrintBill;
//fdb714
