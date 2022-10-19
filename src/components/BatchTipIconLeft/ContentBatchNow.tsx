import React, { useState } from "react";
import { Radio, Modal, Table, Tag } from "antd";

import { AiOutlinePrinter } from "react-icons/ai";
import CalendarRange from "./CalendarRange";
import TypeDateFilter from "./TypeDateFilter";
import TypeBatchFilter from "./TypeBatchFilter";
import styled from "styled-components";
import SearchIcon from "./SearchIcon";
import BillTicket from "./BillTicket";
import ReceiptTicket from "./ReceiptTicket";

const TableWrap = styled.div`
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding: 9px !important;
  }
`;

const columns = [
  {
    title: "Date",
    dataIndex: "Date",
    key: "Date",
    render: (text) => <a>{text}</a>,
    width: "120px",
  },
  {
    title: "TRANS ID",
    dataIndex: "TRANSID",
    key: "TRANSID",
  },
  {
    title: "ACTION",
    dataIndex: "ACTION",
    key: "ACTION",
  },
  {
    title: "RESULT",
    dataIndex: "RESULT",
    key: "RESULT",
  },
  {
    title: "TYPE",
    dataIndex: "TYPE",
    key: "TYPE",
  },
  {
    title: "ACCOUNT",
    dataIndex: "ACCOUNT",
    key: "ACCOUNT",
  },
  {
    title: "HOLDER NAME",
    dataIndex: "HOLDER NAME",
    key: "HOLDER NAME",
    width: "120px",
  },
  {
    title: "STAFF",
    dataIndex: "STAFF",
    key: "STAFF",
    ellipsis: true,
  },
  {
    title: "TERMINAL",
    dataIndex: "TERMINAL",
    key: "TERMINAL",
  },
  {
    title: "TICKET #",
    dataIndex: "TICKET #",
    key: "TICKET #",
  },
  {
    title: "SETTLE",
    dataIndex: "SETTLE",
    key: "SETTLE",
    render: () => <Radio></Radio>,
  },
  {
    title: "BACTH #",
    dataIndex: "BACTH #",
    key: "BACTH #",
  },
  {
    title: "TIP",
    dataIndex: "TIP",
    key: "TIP",
  },
  {
    title: "TOTAL",
    dataIndex: "TOTAL",
    key: "TOTAL",
  },
];
const data = [
  {
    key: "1",
    Date: "05/04/2022",
    TRANSID: "20009",
    ACTION: "Sale",
    TYPE: "Captured",
  },
  {
    key: "2",
    Date: "John Brown",
    ACTION: "Sale",
    TRANSID: "10001",
    TYPE: "FDGF",
  },
  {
    key: "3",
    Date: "John Brown",
    ACTION: "Void Sale",
    TRANSID: "211",
    TYPE: "FDGF",
  },
  {
    key: "4",
    Date: "John Brown",
    ACTION: "Void Salee",
    TRANSID: "212",
    TYPE: "FDGF",
  },
  {
    key: "5",
    Date: "John Brown",
    ACTION: "Void Sale",
    TRANSID: "121",
    TYPE: "FDGF",
  },
  {
    key: "6",
    Date: "John Brown",
    ACTION: "Sale",
    TRANSID: "121",
    TYPE: "FDGF",
  },
  {
    key: "7",
    Date: "John Brown",
    ACTION: "DFD",
    TRANSID: "12",
    TYPE: "FDGF",
  },
  {
    key: "8",
    Date: "John Brown",
    ACTION: "DFD",
    TRANSID: "121",
    TYPE: "FDGF",
  },
  {
    key: "9",
    Date: "John Brown",
    ACTION: "DFD",
    TRANSID: "121",
    TYPE: "FDGF",
  },
  {
    key: "10",
    Date: "John Brown",
    ACTION: "DFD",
    TRANSID: "121",
    TYPE: "FDGF",
  },
];

const ContentBatchNow = ({ visible, onOk, onCancel }) => {
  const [typeFilter, setTypeFilter] = useState("DAY");
  const [typeBatchFilter, setTypeBatchFilter] = useState("All");
  const [isModalBillTicket, setIsModalBillTicket] = useState(false);
  const [isModalReceiptTicket, setIsModalReceiptTicket] = useState(false);

  const hanleOnClickShowModal = () => {
    setIsModalBillTicket(true);
  };
  const handleOnOk = () => {
    setIsModalBillTicket(false);
  };
  const handleOnCancel = () => {
    setIsModalBillTicket(false);
  };

  const hanleOnClickShowModalReceipt = () => {
    setIsModalReceiptTicket(true);
  };
  const handleOnOkReceipt = () => {
    setIsModalReceiptTicket(false);
  };
  const handleOnCancelReceipt = () => {
    setIsModalReceiptTicket(false);
  };
  const handleClickRow = (record, rowIndex) => {
    {
      record.ACTION == "Sale" && hanleOnClickShowModal();
    }
    {
      record.ACTION == "Void Sale" && hanleOnClickShowModalReceipt();
    }
  };
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width="90%"
      bodyStyle={{ minHeight: "80%" }}
      className="modal-add-ticket"
      footer={null}
      style={{
        top: 20,
      }}
    >
      <div>
        <span className="text-3xl font-medium text-mango-primary-blue ">
          Batch Summary
        </span>
        {/* App Name and print table total */}
        <div className="relative pt-2 p">
          <div className="flex border border-gray-200 p-2 rounded-sm shadow-sm">
            <div className="block">
              <p className="text-lg font-medium p-0 m-0">App Name: Clover</p>
              <p className="text-lg font-medium p-0 m-0">Batch #:1</p>
              <p className="text-lg font-medium p-0 m-0">
                Batch date: 03/31/2022
              </p>
            </div>
            {/* table total  */}
            <div className=" ml-36 w-[550px]">
              <table>
                <tr className="border-b border-gray-200 p-1 ">
                  <td className="align-middle text-center text-gray-500 items-center text-base font-medium w-full/2">
                    Transactions
                  </td>
                  <td className="align-middle text-center text-ms font-medium w-full">
                    0
                  </td>
                </tr>
                <tr className="border-b border-gray-200 p-1">
                  <td className=" items-center text-gray-500 text-base font-medium">
                    Sale
                  </td>
                  <td className="align-middle text-center text-ms font-medium w-full">
                    $500
                  </td>
                </tr>
                <tr className="border-b border-gray-200 ">
                  <td className=" items-center text-gray-500 text-base font-medium">
                    Return
                  </td>
                  <td className="align-middle text-center text-ms font-medium w-full">
                    $500
                  </td>
                </tr>
                <tr className="border-b border-gray-200 ">
                  <td className=" items-center text-gray-500 text-base font-medium">
                    Voided
                  </td>
                  <td className="align-middle text-center text-ms font-medium w-full">
                    $500
                  </td>
                </tr>
                <tr className="border-b border-gray-200 ">
                  <td className=" items-center text-gray-500 text-base font-medium">
                    Total
                  </td>
                  <td className="align-middle text-center text-sm font-medium w-full">
                    $5000
                  </td>
                </tr>
              </table>
            </div>
            <div className="absolute bottom-3 right-3">
              <div
                className=" border-2 border-mango-primary-blue bg-white text-cyan-400 flex text-base p-1.5 space-x-2 w-24 
                hover:cursor-pointer mt-5 rounded-md hover:bg-mango-primary-blue hover:text-white hover:border-0 "
              >
                <AiOutlinePrinter className="h-6 w-6" />
                <span>Print</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          {/* Tab table control */}
          <div className="flex  space-x-2 ">
            <CalendarRange typeFilter={typeFilter} />
            <TypeDateFilter setTypeFilter={setTypeFilter} />
            <TypeBatchFilter setTypeBatchFilter={setTypeBatchFilter} />
            <button
              data-dropdown-toggle="dropdown"
              className="border border-gray-400 bg-white w-28 text-lg  text-gray-600 
           hover:text-white hover:bg-mango-primary-blue focus:bg-mango-primary-blue focus:text-white h-9
           rounded-md pl-3   text-center inline-flex items-center "
              type="button"
            >
              Not Batch
            </button>
          </div>
          {/* tannd: add transition for search */}
          <div className="flex space-x-2 hover:cursor-pointer">
            <SearchIcon />
            <div
              className="search-icon border border-mango-primary-blue hover:bg-mango-primary-blue text-white px-3 py-2 rounded-lg 
            relative z-10 shadow-md"
            >
              <img
                className="m-auto w-5 h-5"
                src="/assets/imgs/config.svg"
                alt="Rounded avatar"
              ></img>
            </div>
          </div>
        </div>
        {/* Table Batch */}
        <div className=" pt-2">
          <TableWrap>
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ y: 240 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    handleClickRow(record, rowIndex);
                  },
                };
              }}
            />
          </TableWrap>
        </div>
        {/* Table total batch*/}
        <div>
          <TableWrap>
            <div className="pt-2 total  h-40">
              <div
                className="absolute right-5 bottom-5 border border-gray-300 pt-1 p-2 
                rounded-md shadow-md bg-slate-100 "
              >
                <table>
                  <tr className="border-b border-gray-200 p-1 ">
                    <td className="align-middle text-center text-ms font-medium w-2/12">
                      0
                    </td>
                    <td className=" p-1 text-base font-medium w-1/12">
                      Transactions
                    </td>
                    <td className="align-middle text-center text-ms font-medium  w-1/12">
                      0
                    </td>
                    <td className=" p-1 text-base font-medium w-2/12">Other</td>
                    <td className=" text-ms font-medium w-3/12">TIP</td>
                    <td className="align-middle text-center text-ms font-medium w-3/12">
                      0
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 p-2 ">
                    <td className="align-middle text-center text-ms font-medium w-2/12">
                      0
                    </td>
                    <td className=" p-1 text-base font-medium w-1/12">
                      Captured
                    </td>
                    <td className="align-middle text-center text-ms font-medium  w-1/12">
                      0
                    </td>
                    <td className="p-1 text-base font-medium w-2/12">0</td>
                    <td className=" text-ms font-medium w-3/12">0</td>
                    <td className="align-middle text-center text-ms font-medium w-3/12">
                      0
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 p-2 ">
                    <td className="align-middle text-center text-ms font-medium w-2/12">
                      0
                    </td>
                    <td className=" p-1 text-base font-medium w-1/12">Void</td>
                    <td className="align-middle text-center text-ms font-medium  w-1/12">
                      0
                    </td>
                    <td className="text-centerp-1 text-base font-medium w-2/12">
                      0
                    </td>
                    <td className="text-ms font-medium w-3/12">0</td>
                    <td className="align-middle text-center text-ms font-medium w-3/12">
                      0
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 p-2 ">
                    <td className="align-middle text-center text-ms font-medium w-2/12">
                      0
                    </td>
                    <td className="p-1 text-base font-medium w-1/12">Refund</td>
                    <td className="align-middle text-center text-ms font-medium  w-1/12">
                      0
                    </td>
                    <td className="text-ms font-medium w-3/12">0</td>
                    <td className="p-1 text-base font-medium w-2/12">TIP</td>

                    <td className="align-middle text-center text-ms font-medium w-3/12 text-blue-400">
                      0
                    </td>
                  </tr>
                  <tr className=" p-2 ">
                    <td className=" text-center text-ms font-medium w-2/12"></td>
                    <td className="text-center items-center p-1 text-base font-medium w-1/12"></td>
                    <td className="text-center text-ms font-medium  w-1/12"></td>
                    <td className="text-center items-center p-1 text-base font-medium w-2/12"></td>
                    <td className=" text-ms font-medium w-3/12 text-red-500">
                      TOTAL BATCH
                    </td>
                    <td className="text-center text-ms font-medium w-3/12 text-red-500">
                      $0.00
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </TableWrap>
        </div>
      </div>
      <BillTicket
        checkNo={5000361}
        visible={isModalBillTicket}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
      />
      <ReceiptTicket
        visible={isModalReceiptTicket}
        onOk={handleOnOkReceipt}
        onCancel={handleOnCancelReceipt}
      />
    </Modal>
  );
};

export default ContentBatchNow;
