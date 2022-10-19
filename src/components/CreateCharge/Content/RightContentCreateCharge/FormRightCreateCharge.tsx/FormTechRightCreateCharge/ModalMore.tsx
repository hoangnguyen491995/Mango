import { Popover } from "antd";
import React from "react";
import { CgMoreO } from "react-icons/cg";
import { theme } from "tailwind.config";
import { BsArrowClockwise } from "react-icons/bs";
import { AiOutlineStop } from "react-icons/ai";
import PrintBill from "./ModalPRintBill";
import { MdPrint } from "react-icons/md";
let styleIcon = {
  width: "30px",
  height: "38px",
  color: `${theme.extend.colors["mango-gray-4"]}`,
};
export interface PropBill {
  billName: string;
  background: string;
}
function ModalMore() {
  const props = {
    billName: "CLOSE BILL",
    background: "bg-yellow-300",
  };
  const [open, setOpen] = React.useState<boolean>(false);
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const content = (
    <div className="p-[7px]">
      <div className="flex mt-[3px]  cursor-pointer hover:text-orange-300">
        <BsArrowClockwise className="mt-[3px] mr-2 text-[20px]" />
        <span className=" text-[16px] hover:text-orange-300 ">Resfresh</span>
      </div>
      <div className="flex mt-[3px] hover:text-orange-300 cursor-pointer">
        <BsArrowClockwise className="mt-[3px] mr-2 text-[20px]" />
        <span className=" text-[16px]">Resfresh Trans</span>
      </div>
      <div className="flex mt-[3px] hover:text-orange-300 cursor-pointer">
        <BsArrowClockwise className="mt-[3px]  mr-2 text-[20px]" />
        <span className=" text-[16px] ">Cash Discount</span>
      </div>
      <div className="flex mt-[3px] hover:text-orange-300 cursor-pointer">
        <AiOutlineStop className="mt-[3px] mr-2 text-[18px]" />
        <span className=" text-[16px] ">Bonus Turn </span>
      </div>
      <div className="flex mt-[3px] hover:text-orange-300 cursor-pointer service-record">
        <MdPrint className="mt-[3px] mr-2 text-[19px]" />
        <span className=" text-[16px]">Service Record</span>
      </div>
      <div className="flex mt-[3px] hover:text-orange-300 cursor-pointer">
        <div onClick={hide} className="flex">
          <MdPrint className="mt-[3px] mr-2 text-[19px]" />
          <PrintBill />
        </div>
      </div>
      <div className="flex mt-[3px] hover:text-orange-300 cursor-pointer">
        <BsArrowClockwise className="mt-[3px] mr-2 text-[20px]" />
        <span className=" text-[16px] ">Release</span>
      </div>
    </div>
  );

  return (
    <>
      <Popover placement="bottomRight" content={content} trigger="click">
        <CgMoreO style={styleIcon} />
      </Popover>
    </>
  );
}

export default ModalMore;
