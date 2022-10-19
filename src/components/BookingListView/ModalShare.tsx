import React, { useEffect, useState, useContext } from "react";
import { Button, Modal } from "antd";
import styled from "styled-components";
import { getFormattedPhoneNum } from "src/helper/General";
import { SendSMSListBook } from "services/Appointments/SendSMSListBook";
import { messageSuccess, messageWarning } from "../MessageAlert";
import moment from "moment";
import HomeContext from "../Book/HomeContext";

const InputSearchTicket = styled.div`
  [type="text"]:focus,
  [type="email"]:focus,
  [type="url"]:focus,
  [type="password"]:focus,
  [type="number"]:focus,
  [type="date"]:focus,
  [type="datetime-local"]:focus,
  [type="month"]:focus,
  [type="search"]:focus,
  [type="tel"]:focus,
  [type="time"]:focus,
  [type="week"]:focus,
  [multiple]:focus,
  textarea:focus,
  select:focus {
    --tw-ring-shadow: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
function ModalShare({ visible, onOk, onCancel }) {
  const [visibleSMS, setVisibleSMS] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const sendSMSListBook = new SendSMSListBook()
  const bookContext = useContext(HomeContext)[0];
  const handleSearch = (value) => {
    const formattedPhoneNumber = getFormattedPhoneNum(value);
    setValueSearch(formattedPhoneNumber);
  };
  const dateFrom = moment(bookContext.dateListView.start).format(
    "MM/DD/YYYY"
  );
  const PageSize = "500";
  const dateTo = moment(bookContext.dateListView.end).format("MM/DD/YYYY");

  const handleSendButton = ()=>{
    try {
      sendSMSListBook
        .sendSMSListBook(valueSearch,dateFrom,  dateTo)
        .then((res) => {
          if (res.status === 200) {
            if(res.data.error_code== 0){
              messageSuccess("Sent SMS");
              setValueSearch("")
              setVisibleSMS(false)
            } else{
              messageWarning("The number phone is not a valid phone number");
            }
           
          }
          else{
            messageWarning("The phone field is required");
          }
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width="25%"
      bodyStyle={{ height: "250px" }}
      className="modal-share-in-list-view"
      footer={null}
      mask={true}
      style={{
        top: " 40%",
      }}
    >
      <div className="rounded-lg text-center space-y-5">
        <div className="w-full   text-mango-gray-5 text-2xl font-bold cursor-default">
          SHARE
        </div>
        {visibleSMS != true ? (
          <>
            <div
              className="w-[95%] py-4  rounded-md border border-mango-gray-3 hover:bg-mango-primary-blue-hover 
        mx-auto hover:border-mango-primary-blue hover:border-2 text-xl text-mango-gray-6 font-semibold cursor-pointer"
              style={{ boxShadow: "0px 0px 15px #00000033" }}
            >
              Export list
            </div>
            <div
              className="w-[95%] py-4 text-xl text-mango-gray-6  rounded-md border border-mango-gray-3 hover:bg-mango-primary-blue-hover 
        mx-auto hover:border-mango-primary-blue hover:border-2 font-semibold cursor-pointer"
              style={{ boxShadow: "0px 0px 15px #00000033" }}
              onClick={() => setVisibleSMS(true)}
            >
              SMS
            </div>
          </>
        ) : (
          <>
            <InputSearchTicket>
              <div
                className={`lg:flex w-[350px] justify-center items-center  mt-6 pr-2  
          h-[50px] md:hidden  sm:hidden rounded-sm mx-auto  bg-white relative border-2 
          ${isFocusInput ? " border-mango-primary-blue" :"border-mango-gray-4"}`}
              >
                <input
                  className="rounded-l-lg text-ms border-none w-full input-number-send-sms"
                  type="search"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Type a phone number"
                  onFocus={() => {
                    setIsFocusInput(true);
                  }}
                  onBlur={() => setIsFocusInput(false)}
                  onChange={(e) => handleSearch(e.target.value)}
                  value={valueSearch}
                ></input>
                <div className="search-icon  text-mango-gray-5 rounded-lg cursor-pointer "
                onClick={()=>{setValueSearch('')}}
                >
                  {isFocusInput ? (
                    <svg
                      className=" mb-2 mr-2"
                      width="28"
                      height="28"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 
              0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 
              1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />{" "}
                    </svg>
                  ) : (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"

                    >
                      <path
                        d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998
           12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925
            15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025
             12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1
              6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637
               1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex justify-center space-x-5 pt-8">
                <Button
                  className="w-[170px]  !h-11 !rounded-md 
              !shadow-md mango-shadow !border !border-mango-gray-3"
                  onClick={() => setVisibleSMS(false)}
                >
                  <span className="font-bold !text-mango-gray-5">CANCEL</span>
                </Button>
                <Button
                  className="w-[170px] !bg-mango-primary-blue !h-11 !rounded-md
             !border-mango-primary-blue mango-shadow hover:text-mango-gray-6"
                  type="primary"
                  onClick={handleSendButton}
                >
                  <span className="font-bold text-white">SEND</span>
                </Button>
              </div>
            </InputSearchTicket>
          </>
        )}
      </div>
    </Modal>
  );
}

export default ModalShare;
