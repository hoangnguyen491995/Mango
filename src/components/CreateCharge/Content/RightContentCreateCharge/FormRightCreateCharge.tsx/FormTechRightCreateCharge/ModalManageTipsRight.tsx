import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GetSlipTip } from "services/CreateCharge/GetSlipTip";
import { CreateCharge$ } from "src/redux/selector";
import styled from "styled-components";

const InputDuration = styled.input`
  height: 50px;
  border: none;
  color: #f28500;
  outline: none;
`;
const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."];
interface IGetSlipTip {
  listOfferAmount;
  listPercentOfferAmout;
}
function ModalManageTipsRight({ changePrice }) {

  const [price, setPrice] = useState<number>(1);
  const [valueTime, setValueTime] = useState<string>("0");
  const [duration, setDuration] = useState<string>("$0.00");
  const showForm = useSelector(CreateCharge$);

  const durationRef = useRef(null);

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

  const [datagetByCategory, setDatagetByCategory] = useState<IGetSlipTip>();

  const getSlipTip = new GetSlipTip()

  useEffect(() => {
    const fetchData = async () => {
      getSlipTip
        .getSlipTip(showForm.IDItemInTiket.iteminfo.checkNo)
        .then((res) => {
          setDatagetByCategory(res.data.modelTip);
        });
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className="border-l-[1px] border-stone-400">
      <div className="flex flex-col justify-center items-center">
        <span className="text-2xl font-bold text-[#505050]">
          EDIT OTHER TIP
        </span>
      </div>
      <div className="flex justify-center mt-10">
        <div
          onClick={() => {
            setPrice(1);
          }}
          className={`w-[48%] border-2 flex justify-center items-center ${
            price == 1 ? `bg-[#00bed6]` : ""
          }  `}
        >
          <span
            className={`font-bold  text-xl ${
              price == 1 ? "text-white" : "text-[#505050]"
            }  `}
          >
            $
          </span>
        </div>
        <div
          onClick={() => setPrice(2)}
          className={`w-[48%] border-2 flex justify-center items-center ${
            price == 2 ? `bg-[#00bed6]` : ""
          } `}
        >
          <span
            className={`font-bold  text-xl ${
              price == 2 ? "text-white" : "text-[#505050]"
            }  `}
          >
            %
          </span>
        </div>
      </div>
      {price == 1 && (
        <Row>
          {datagetByCategory?.listOfferAmount.map((post) => {
            return (
              <Col span={7} key={post.id}>
                <div
                  onClick={() => {
                    changePrice(post);
                    setDuration(post);
                  }}
                  className="w-full border-[1px] rounded flex 
                  justify-center items-center h-[38px] border-stone-400 mt-[12px] ml-[15px]"
                >
                  <span className="font-bold text-xl">${post}</span>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
      {price == 2 && (
        <Row>
          {datagetByCategory?.listPercentOfferAmout.map((post) => {
            return (
              <Col span={7}>
                <div
                  className="w-full border-[1px] rounded flex
                 justify-center items-center h-[38px] border-stone-400 mt-[12px] ml-[15px] "
                >
                  <div
                    className="mb-[5px] w-[95%] flex items-end truncate"
                    onClick={() => {
                      changePrice(post.offerAmount);
                      setDuration(post.offerAmount);
                    }}
                  >
                    <span className="font-bold text-xl ">
                      {post.offerPercent}
                    </span>
                    <span className=" font-bold text-md text-[#505050] mb-[2px]">
                      (${post.offerAmount})
                    </span>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
      <div className="px-[18px] flex-col flex justify-center items-center">
        <div className=" flex flex-col content-center items-center ">
          <InputDuration
            placeholder="0"
            value={String(duration)}
            ref={durationRef}
            className="placeholder:text-xl text-center border-none w-full
           2xl:text-[25px] md:text-[20px] text-[18px] font-bold "
          />
        </div>
        <Row justify="space-around" className=" xl:w-[85%] w-[70%]">
          {keyCalc.map((item, index) => {
            return (
              <div key={index} className="m-2">
                <div
                  onClick={() => handleKeyNumber(item)}
                  className="border-[2px] border-stone-400 flex justify-center items-center 
              hover:shadow-md rounded-full 2xl:w-[73px] 2xl:h-[73px]
               xl:h-[62px] xl:w-[62px] w-[48px] h-[48px] "
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
        <div
          onClick={() => {
            changePrice(String(duration));
          }}
          className="flex justify-center items-center h-[38px] bg-[#f28500] rounded mt-16 w-full "
        >
          <span className="text-white text-xl font-semibold ">ADD TIP</span>
        </div>
      </div>
    </div>
  );
}

export default ModalManageTipsRight;
