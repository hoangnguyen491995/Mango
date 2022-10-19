import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Button, List, Modal, Popover, Space } from "antd";
import { LoadReceipt } from "services/CheckOut/LoadReceipt";
import { ILoadReceipt } from "./DataStructures";
import moment from "moment";
import { currencyFormat } from "src/helper/General";

import ReactToPrint from "react-to-print";
import { DetailBillTicket } from "./DetailBillTicket";
interface Props {
  visible: boolean;
  onOk: any;
  onCancel: any;
  checkNo: number;
}

const BillTicket = ({ visible, onOk, onCancel, checkNo }) => {
  const printContent = useRef<HTMLDivElement>(null);
  const [showSMS, setShowSMS] = useState<boolean>(false);
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const [isPrint, setIsPrint] = useState<boolean>(false);
  // const apiLoadReceipt = new LoadReceipt();
  // useEffect(() => {
  //   const param = { checkNo: checkNo, rvcNo: process.env.NEXT_PUBLIC_RVC_NO };
  //   apiLoadReceipt.loadReceipt(param).then((res) => {
  //     if (res.status == 200) {
  //       setDataBillTicket(res.data);
  //     }
  //   });
  // }, [checkNo]);
  return (
    <>
      <Modal
        visible={visible}
        onOk={onOk}
        mask={true}
        centered
        onCancel={onCancel}
        width="430px"
        className="modal-add-ticket"
        footer={null}
      >
        <DetailBillTicket
          checkNo={checkNo}
          printContent={printContent}
          isPrint={isPrint}
        />
        <div className="flex justify-between space-x-4 mt-1 select-none ">
          <Popover
            placement="left"
            trigger={"click"}
            content={
              <List className="cursor-pointer">
                <Popover
                  placement="top"
                  visible={showSMS}
                  trigger={"click"}
                  content={
                    <div className=" p-2">
                      <p className="text-center text-base">Sending To:</p>
                      <p className="text-center font-bold">Kid No Phone</p>
                      <Space>
                        <Button
                          type="primary"
                          onClick={() => setShowSMS(false)}
                          className="!bg-mango-primary-orange-2 !border-none"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          className="!bg-mango-primary-blue !border-none"
                        >
                          Change
                        </Button>
                        <Button
                          type="primary"
                          className="!bg-mango-primary-green !border-none"
                        >
                          Confirm
                        </Button>
                      </Space>
                    </div>
                  }
                >
                  <List.Item
                    className="!px-4 hover:!bg-mango-bg-dark"
                    onClick={() => setShowSMS(!showSMS)}
                  >
                    <div className="flex">
                      <img
                        src="/assets/imgs/TicketManagment/sms.svg"
                        className="h-6 w-6 mr-2"
                      />
                      SMS
                    </div>
                  </List.Item>
                </Popover>
                <List.Item className=" !px-4 hover:!bg-mango-bg-dark ">
                  <Popover
                    visible={showEmail}
                    placement="top"
                    trigger={"click"}
                    content={
                      <div className=" p-2">
                        <p className="text-center text-base">Sending To:</p>
                        <p className="text-center font-bold"></p>
                        <Space>
                          <Button
                            onClick={() => setShowEmail(false)}
                            type="primary"
                            className="!bg-mango-primary-orange-2 !border-none"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="primary"
                            className="!bg-mango-primary-blue !border-none"
                          >
                            Change
                          </Button>
                          <Button
                            type="primary"
                            className="!bg-mango-primary-green !border-none"
                          >
                            Confirm
                          </Button>
                        </Space>
                      </div>
                    }
                  >
                    <div
                      className="flex"
                      onClick={() => setShowEmail(!showEmail)}
                    >
                      <img
                        src="/assets/imgs/TicketManagment/email.svg"
                        className="h-6 w-6 mr-2"
                      />
                      EMAIL
                    </div>
                  </Popover>
                </List.Item>
                <List.Item className=" !px-4 hover:!bg-mango-bg-dark">
                  <ReactToPrint
                    onAfterPrint={() => {
                      setIsPrint(!isPrint);
                    }}
                    onBeforePrint={() => {
                      setIsPrint(true);
                    }}
                    onBeforeGetContent={() => {
                      setIsPrint(true);
                    }}
                    trigger={() => (
                      <div className="flex">
                        <img
                          src="/assets/imgs/Print.png"
                          className="h-6 w-6 mr-2"
                        />
                        <span>PRINT</span>
                      </div>
                    )}
                    content={() => printContent.current}
                  />
                </List.Item>
              </List>
            }
          >
            <button
              className={`w-1/2 h-8 text-base font-medium  text-white bg-mango-primary-orange-1 shadow-xl rounded-md
                       hover:bg-mango-primary-orange-2 `}
            >
              RECEIPT
            </button>
          </Popover>

          <button
            className={
              "w-1/2 h-8 text-base font-medium  text-white bg-mango-sky-crayola shadow-xl rounded-md hover:bg-sky-400 "
            }
          >
            EDIT TICKET
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BillTicket;
