import { LoadReceipt } from "services/CheckOut/LoadReceipt";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

import moment from "moment";
import { currencyFormat } from "src/helper/General";

import { Spin } from "antd";
import { ILoadReceipt } from "./DataStructures";
export const DetailBillTicket = ({ checkNo, printContent, isPrint }) => {
  const [dataBillTicket, setDataBillTicket] = useState<ILoadReceipt>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiLoadReceipt = new LoadReceipt();
  useEffect(() => {
    setIsLoading(true);
    const param = { checkNo: checkNo, rvcNo: process.env.NEXT_PUBLIC_RVC_NO };
    apiLoadReceipt.loadReceipt(param).then((res) => {
      if (res.status == 200) {
        setDataBillTicket(res.data);
        setIsLoading(false);
      }
    });
  }, [checkNo]);
  useLayoutEffect(() => {}, [isPrint]);
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div className={`px-5 w-[380px]`} ref={printContent}>
        <div className="w-full text-center ">
          {isPrint && (
            <>
              <p className="font-bold text-2xl">
                {dataBillTicket?.storeConfig.storeName}
              </p>
              <h2 className="font-bold">
                {dataBillTicket?.storeConfig.address}
              </h2>
              <h2 className="font-bold mb-4">
                {dataBillTicket?.storeConfig.telephone}
              </h2>{" "}
            </>
          )}
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex">
              <div className="w-1/3 text-base ">Receipt No: </div>
              <span className="w-1/3 text-base font-bold align-middle ">
                #{dataBillTicket?.lstReceipt[0].orgAppointment}
              </span>
            </div>
            <div className="flex">
              <div className="w-1/3 text-base ">Date: </div>
              <span className="w-1/3 text-base align-middle">
                {dataBillTicket?.invoice.status == 7 && (
                  <>
                    <div>
                      {moment(dataBillTicket.invoice.closeTime).format(
                        "MM.DD.YYYY"
                      )}
                    </div>
                  </>
                )}
              </span>
              <span className=" w-1/3 text-base text-right align-middle text-mango-black ">
                {dataBillTicket &&
                  moment(dataBillTicket.invoice.closeTime).format("hh:mm A")}
              </span>
            </div>
            <div className="flex pb-2">
              <div className="w-1/3 text-base ">Customer: </div>
              <span className=" w-2/3 text-base align-middle font-bold ">
                {dataBillTicket?.lstReceipt[0].customerName &&
                  dataBillTicket?.lstReceipt[0].customerName.toUpperCase()}
              </span>
            </div>

            <div className="border-t border-dashed border-mango-gray-300 py-2 ">
              <div className="flex font-bold text-base">
                <div className="w-7/12   text-mango-black ">ITEM/ TECH</div>

                <span className="w-2/12   text-center ">QTY</span>
                <span className="w-3/12   text-right">AMT</span>
              </div>
            </div>
            {/* List chechout */}
            {dataBillTicket?.lstReceipt
              .filter((item) => item.trnCode == 100 && item.type != 8)
              .map((item, index) => (
                <div className="" key={index}>
                  {/* Type Medium checkout */}
                  <div className="w-full text-base font-bold text-mango-black  ">
                    {item.description}
                  </div>
                  {/* Dis checkout */}
                  <div className="flex text-base">
                    <span className="w-7/12  ">{item.employeeName}</span>
                    <span className="w-2/12 text-center ">1</span>
                    <span className="w-3/12  text-right text-bold  text-mango-black ">
                      ${currencyFormat(item.itemPrice || 0)}
                    </span>
                  </div>
                </div>
              ))}

            <div className="space-y-1 border-t border-dashed border-mango-gray-300 ">
              <div className="flex">
                <div className="w-8/12 text-base font-bold text-mango-black pt-2 ">
                  Sub total
                </div>
                <div className="w-4/12 text-right text-base font-bold text-mango-black ">
                  ${currencyFormat(dataBillTicket?.lstReceipt[0].subTotal || 0)}
                </div>
              </div>
              {/* Dis checkout */}
              {(dataBillTicket?.lstReceipt[0].discount ?? 0) != 0 && (
                <div className="flex">
                  <div className="w-8/12 text-base ">DISCOUNT </div>
                  <span className=" w-4/12 text-base  text-right align-middle text-mango-black ">
                    $
                    {currencyFormat(
                      dataBillTicket?.lstReceipt[0].discount ?? 0
                    )}
                  </span>
                </div>
              )}
              {dataBillTicket && dataBillTicket.allFeePayment > 0 ? (
                <>
                  <div className="flex">
                    <div className="w-8/12 text-base ">
                      {dataBillTicket.lstReceipt[0].feeName ?? "FEE"}{" "}
                    </div>
                    <span className=" w-4/12 text-base  text-right align-middle text-mango-black ">
                      ${currencyFormat(dataBillTicket.allFeePayment ?? 0)}
                    </span>
                  </div>
                  {dataBillTicket && dataBillTicket.cashDiscount > 0 && (
                    <div className="flex">
                      <div className="w-8/12 text-base ">CASH DISCOUNT </div>
                      <span className=" w-4/12 text-base  text-right align-middle text-mango-black ">
                        ${currencyFormat(Number(dataBillTicket.cashDiscount ?? 0) * -1)}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                dataBillTicket &&
                dataBillTicket.cashDiscount > 0 && (
                  <>
                    <div className="flex">
                      <div className="w-8/12 text-base ">FEE</div>
                      <span className=" w-4/12 text-base  text-right align-middle text-mango-black ">
                        $ {currencyFormat(dataBillTicket.cashDiscount ?? 0)}
                      </span>
                    </div>

                    <div className="flex">
                      <div className="w-8/12 text-base ">CASH DISCOUNT </div>
                      <span className=" w-4/12 text-base  text-right align-middle text-mango-black ">
                        $
                        {currencyFormat(
                          Number(dataBillTicket.cashDiscount ?? 0) * -1
                        )}
                      </span>
                    </div>
                  </>
                )
              )}{" "}
              {dataBillTicket && dataBillTicket.lstReceipt[0].taxTotal > 0 && (
                <div className="flex">
                  <div className="w-8/12 text-base ">TAX</div>
                  <span className=" w-4/12 text-base  text-right align-middle text-mango-black ">
                    $
                    {currencyFormat(dataBillTicket.lstReceipt[0].taxTotal ?? 0)}
                  </span>
                </div>
              )}
              {dataBillTicket && dataBillTicket.lstReceipt[0].tip > 0 && (
                <div className="flex">
                  <div className="w-8/12 text-base ">TIP</div>
                  <span className=" w-4/12 text-base  text-right align-middle text-mango-black ">
                    ${currencyFormat(dataBillTicket.lstReceipt[0].tip ?? 0)}
                  </span>
                </div>
              )}
              <div className="flex font-bold pb-2">
                <div className="w-8/12 text-base ">AMOUNT DUE </div>
                <span className=" w-4/12 text-base  text-right align-middle text-mango-black ">
                  $
                  {dataBillTicket &&
                    currencyFormat(
                      dataBillTicket.invoice.subTotal +
                        dataBillTicket.invoice.tip +
                        dataBillTicket.invoice.baseSTax
                    )}
                </span>
              </div>
            </div>
            <div className="space-y-1 border-t border-dashed border-mango-gray-300 ">
              <div className=" text-base font-bold text-mango-black pt-2 ">
                PAYMENT
              </div>

              {dataBillTicket?.lstReceipt
                .filter(
                  (item) =>
                    item.trnCode > 110 &&
                    item.trnCode != 800 &&
                    item.itemCode.trim() != "OPAYTIP-MORE" &&
                    item.itemCode.trim() != "OPAYMENT" &&
                    item.itemCode.trim() != "OPAYTIP"
                )
                .map((item, index) => (
                  <div className="flex pb-2" key={index}>
                    <div className="w-8/12 flex ">
                      <div className=" text-base ">
                        {item.description.includes("Gift Card Payment") ? (
                          <span>
                            GCBalance:{currencyFormat(item.sliptAmount ?? 0)}
                          </span>
                        ) : (
                          item.description
                        )}
                      </div>
                      {item.refundRef != "0" && item.refundRef != null && (
                        <a className="text-base align-middle text-mango-sky-crayola">
                          [Show Details]
                        </a>
                      )}
                    </div>
                    <span className=" w-4/12 text-base text-right align-middle text-mango-black ">
                      $
                      {currencyFormat(
                        dataBillTicket.invoice.subTotal +
                          dataBillTicket.invoice.tip +
                          dataBillTicket.invoice.baseSTax
                      )}
                    </span>
                  </div>
                ))}
            </div>
            {dataBillTicket?.lstReceipt[0].memberType != null &&
              dataBillTicket.isRewardActive == "1" &&
              (dataBillTicket.lstReceipt[0].memberType ==
                "NOT A MEMBER Sign Up NOW" ||
              dataBillTicket.lstReceipt[0].memberType == "" ? (
                <div className="w-4/12 text-right text-base font-bold text-mango-black ">
                  {dataBillTicket.lstReceipt[0].pointEarned}
                </div>
              ) : (
                <div className="space-y-2 border-t border-dashed border-mango-gray-300 ">
                  <div className="flex pt-2 ">
                    <div className="w-8/12 text-base font-bold text-mango-black ">
                      REWARD POINTS
                    </div>
                    <div className="w-4/12 text-right text-base font-bold text-mango-black ">
                      {dataBillTicket.lstReceipt[0].memberType.replace(
                        "REWARD POINTS",
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex pb-2">
                    <div className="w-8/12 text-base font-bold text-mango-black ">
                      POINTS EARNED
                    </div>
                    <div className="w-4/12 text-right text-base font-bold text-mango-black ">
                      {dataBillTicket?.lstReceipt[0].pointEarned.replace(
                        "POINTS EARNED",
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {isPrint && (
          <div className="w-full border-t border-dashed border-mango-gray-300">
            <p className="mt-2 font-bold text-center">
              THANK YOU AND SEE YOU AGAIN !!!
            </p>
          </div>
        )}
      </div>
    </Spin>
  );
};
