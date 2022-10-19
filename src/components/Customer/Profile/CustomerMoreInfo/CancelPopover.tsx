import { Popover } from "antd";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import {DeleteCustomerMoreInfo} from 'services/Customers/DeleteCustomerMoreInfo'
import { messageSuccess } from "src/components/MessageAlert";

function CancelPopover({customerId, id, setReload}) {
  const [open, setOpen] = useState(false);
  const deleteCustomerMoreInfo = new DeleteCustomerMoreInfo()
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleNoButton = () => {
    setOpen(false);
  };
  const handleCancelIcon = () => {
    showPopconfirm();
  };

  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleYesButton = () => {
    try {
        deleteCustomerMoreInfo.deleteCustomerMoreInfo(id, customerId).then((res) => {
          if (res.status === 200) {
            messageSuccess(res.data.data);
            setReload(true)
          }
        });

      } catch (err) {
        console.log(err);
      }
      setOpen(false);
  }

  
  const contentConfirmCacel = (
    <div className="h-40 w-56 text-base text-center bg-mango-primary-orange text-white p-3 popover-confirm-cancel">
      <div className="flex justify-end cursor-pointer" onClick={handleNoButton}>
        <svg
          fill="currentColor"
          stroke-width="4"
          viewBox="0 0 512 512"
          height="1.2em"
          width="1.2em"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
        >
          <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
        </svg>
      </div>

      <span className="font-semibold">
        Are You Sure You Want To Erase This Customer Info
      </span>
      <div className="flex justify-between  w-full space-x-8 text-sm mt-3 px-5 ">
        <div className="flex cursor-pointer"
        onClick={handleNoButton}>
          <img
            className="mr-1 h-6 w-6"
            src="/assets/imgs/Clients/24px-02.svg"
            alt="No"
          />
          No
        </div>

        <div className="flex cursor-pointer "
        onClick={handleYesButton}
        >
          <img
            className="mr-1 h-6 w-6"
            src="/assets/imgs/Clients/24px-01.svg"
            alt="No"
          />
          Yes
        </div>
      </div>
    </div>
  );

  return (
    <Popover content={contentConfirmCacel} trigger="click" visible={open}>
      <img
        className="mr-1 h-6 w-6 cursor-pointer"
        src="/assets/imgs/Clients/cancel.svg"
        alt="image cancel"
        onClick={handleCancelIcon}
       
      />
    </Popover>
  );
}

export default CancelPopover;
