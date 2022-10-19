import React, { useState } from "react";
import { Modal } from "antd";

const ReceiptTicket = ({ visible, onOk, onCancel}) => {
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width="430px"
      bodyStyle={{ minHeight: "70%" }}
      className="modal-add-ticket "
      footer={null}
    >
      <div>
        <div>
          <div>
            <div className="text-center w-full store-info ">
              <div>
                <div className="text-base text-mango-gray-300 store-name">
                  [DEMO MODE]
                </div>
                <div className="text-xl text-mango-sky-crayola font-medium store-name">
                  NUS STORE
                </div>
                <div className="text-base text-gray-500 address-line">
                  Tân Ninh, 123, Long An
                </div>
                <div className=" text-base text-gray-500   address-line">
                  (032) 889-5902
                </div>
                <div className="text-base text-mango-pink version-app">
                  Welcome to Nail & Spa store
                </div>
                <div className="text-lg text-mango-gray-300 font-medium store-name">
                  Transaction Voided
                </div>
              </div>
            </div>
            <div className="overflow-y-scroll h-[450px] p-3 shadow-md">
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  Date:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  05.22.2022
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  Time:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  06 : 00 PM
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  Ticket:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  10000001
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  Register:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  a9286
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  Maerchant ID:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  REF#:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">CT#:</div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  EXP#:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  CARD#:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  CARD NAME#:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  ENTRY:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">
                  APP NAME:
                </div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">AID:</div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">TVR:</div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-ms text-mango-black pt-1 ">TSI:</div>
                <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                  $6.00
                </div>
              </div>

              <div className="mt-4 border-t border-dashed border-mango-gray-300">
                <div className="flex">
                  <div className="w-3/4 text-ms text-mango-black pt-1 ">
                    IAD:
                  </div>
                  <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                    $6.00
                  </div>
                </div>
                <div className="flex">
                  <div className="w-3/4 text-ms text-mango-black pt-1 ">
                    ARC:
                  </div>
                  <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                    $6.00
                  </div>
                </div>
                <div className="flex">
                  <div className="w-3/4 text-ms text-mango-black pt-1 ">
                    AC:
                  </div>
                  <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                    $6.00
                  </div>
                </div>
                <div className="flex">
                  <div className="w-3/4 text-ms text-mango-black pt-1 ">
                    ATC:
                  </div>
                  <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                    $6.00
                  </div>
                </div>
              </div>
              <div className="mt-4 border-t border-dashed border-mango-gray-300">
                <div className="flex">
                  <div className="w-3/4 text-ms text-mango-black pt-1 ">
                    AUTH CODE:
                  </div>
                  <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                    $6.00
                  </div>
                </div>
                <div className="flex">
                  <div className="w-3/4 text-ms text-mango-black pt-1 ">
                    TRAN ID:
                  </div>
                  <div className="w-1/4 text-right text-ms  text-mango-gray-300 ">
                    $6.00
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1 ">
              <div className="flex">
                <div className="w-3/4 text-base font-medium text-mango-black pt-1 ">
                  Sub total:
                </div>
                <div className="w-1/4  text-base font-medium text-mango-black ">
                  $6.00000
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-base font-medium text-mango-black pt-1 ">
                  TIP:
                </div>
                <div className="w-1/4  text-base font-medium text-mango-black ">
                  $6.00000
                </div>
              </div>
              <div className="flex">
                <div className="w-3/4 text-base font-medium text-mango-black pt-1 ">
                  Total:
                </div>
                <div className="w-1/4  text-base font-medium text-mango-black ">
                  $6.0000
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="text-ms text-ms italic text-center ">
                Signature Verified
              </div>
            </div>
          </div>
          <div className=" relative px-6 pt-5 h-14">
            <button
              className={` absolute w-32 h-8 text-base font-medium  text-white bg-mango-sky-crayola shadow-xl rounded-lg
                       hover:bg-sky-400 right-0  `}
            >
              PRINT
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReceiptTicket;
