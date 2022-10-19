import { Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import ModalManageTipsRight from "./ModalManageTipsRight";
import { API_MANGO_IMG } from "src/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { CreateCharge$ } from "src/redux/selector";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { UpdatePreTip } from "services/CreateCharge/AddUpdatePreTip";
import { GetSlipTip } from "services/CreateCharge/GetSlipTip";

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

const ManageTips: React.FC = () => {
  const dispatch = useDispatch();
  const ChangePrice = useSelector(CreateCharge$);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showRight, setShowRight] = useState<boolean>(true);
  const [even, setEven] = useState<number>(1);
  const [price, setPrice] = useState<string>("");
  const showModal = () => {
    setIsModalVisible(true);
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
  const handleChangePrice = (state) => {
    console.log(state);

    setPrice(state);
  };

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

  return (
    <>
      <div
        onClick={showModal}
        className=" rounded w-[45%] py-[4px] mr-[4px]"
        style={{ backgroundColor: "#f89d21" }}
      >
        <span className="font-semibold text-white text-[12px] 2xl:text-[18px]">
          TIP
        </span>
      </div>
      <Modal
        style={{ minWidth: `${showRight ? "930px" : "400px"}` }}
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon
      >
        <Row>
          <div
            className={`  ${
              showRight ? "w-[60%]" : "w-[100%] h-[650px]"
            } relative`}
          >
            <div
              onClick={handleCancel}
              className="absolute w-[27px] h-[27px] bg-[#FFFFFFCC] rounded-full flex justify-center items-center shadow-md top-[-40px] left-[-38px]"
            >
              <img
                className="w-[13px] h-[13px]"
                src={`${API_MANGO_IMG}/Content/image/cancel.svg`}
                alt=""
              />
            </div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex flex-col justify-center items-center ">
                  <span className="text-2xl font-bold text-[#505050] ">
                    MANAGE TIPS
                  </span>
                  <div className="border-b-2 w-11/12 flex justify-center border-dashed border-stone-500 pb-[6px] mt-6">
                    <span className="text-[22px] text-[#505050] font-semibold mr-6">
                      TOTAL TIP
                    </span>
                    <span className="text-2xl font-bold text-[#505050]">
                      ${price == "" ? ChangePrice.TotalPrice : price}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex justify-center items-center ">
                    <div className="flex justify-start mt-[12px]">
                      <span className="text-[16px] text-[#505050] font-semibold ml-6 mr-8">
                        CREDIT TIP
                      </span>
                      <span className="text-[18px] text-[#505050] font-bold   ">
                        $0
                      </span>
                    </div>
                  </div>
                  <div className="flex mr-6">
                    <div className="flex mt-[12px] bg-[#a7a7a74d] rounded h-[35px] justify-center items-center px-[5px] ">
                      <span className="text-[16px] text-[#505050] font-semibold  mr-6">
                        OTHER TIP
                      </span>
                      <span className="text-[18px] text-[#505050] font-bold mr-2 ">
                        ${price == "" ? ChangePrice.TotalPrice : price}
                      </span>
                      <img
                        className="w-[25px] h-[25px]"
                        src="/assets/imgs/edit.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center ">
                  <div className="flex mt-4 border-[1px] border-stone-400 rounded-3xl w-[80%] justify-center items-center ">
                    <div></div>
                    <div
                      className={`${
                        even == 1 ? "bg-[#00bed64d]" : ""
                      }  h-[35px] flex justify-center items-center rounded-l-3xl  w-4/12 `}
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
                      }   h-[35px] border-l-[1px] border-stone-400 flex justify-center items-center w-4/12 `}
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
                      }   h-[35px] flex justify-center items-center border-l-[1px] border-stone-400  rounded-r-3xl w-4/12`}
                      onClick={() => {
                        setEven(3);
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
                  <div>
                    {datagetByCategory?.lstTip.map((post: ITipTech, index) => {
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
                    })}
                  </div>
                </div>
              </div>

              <div className="flex w-[95%] justify-around">
                <div
                  onClick={() => {
                    setIsModalVisible(false);
                  }}
                  className="flex justify-center items-center h-[45px] rounded w-full border-[1px] border-stone-400 ml-2 mr-4 hover:bg-[#d1d1d1]"
                >
                  <span className=" font-bold text-xl text-[#505050]">
                    CANCEL{" "}
                  </span>
                </div>
                <div
                  onClick={() => {
                    if (price != "") {
                      const fetchData = async () => {
                        updatePreTip
                          .updatePreTip(
                            ChangePrice.IDItemInTiket.iteminfo.checkNo,
                            price,
                            0
                          )
                          .then((res) => {
                            dispatch(
                              CreateChargeSlice.actions.showLeftAddTech({
                                showform: "AddTechLeft",
                                IdRender: Math.random(),
                              })
                            );
                          });
                      };
                      fetchData().catch(console.error);
                      setIsModalVisible(false);
                    }
                  }}
                  className="flex justify-center items-center h-[45px] bg-[#00bed6] opacity-50 rounded w-full hover:opacity-20"
                >
                  <span className=" font-bold text-white text-xl">SAVE</span>
                </div>
              </div>
            </div>
          </div>
          {showRight && (
            <div className="w-[40%]">
              <ModalManageTipsRight changePrice={handleChangePrice} />
            </div>
          )}
        </Row>
      </Modal>
    </>
  );
};
export default ManageTips;
