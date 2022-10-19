import { Popover } from "antd";
import React, { useState } from "react";
import { DeleteGallery } from "services/Customers/DeleteGallery";
import { messageSuccess } from "src/components/MessageAlert";

const BASE_UAT_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;

function OpenImage({ imageOpened, setIsOpenImage, onCancel, customerId, setReload }) {
  const [open, setOpen] = useState(false);
    const deleteGallery = new DeleteGallery()
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const handleConfirmDelete = () =>{
    hide()
    deleteGallery
    try {
        deleteGallery.deleteGallery(customerId, imageOpened.id).then((res) => {
          if (res.status === 200) {
            messageSuccess("Delete Gallery Success");
           
            setReload(true);
            setIsOpenImage(false)
          }
        });
      } catch (err) {
        console.log(err);
      }
  }
  return (
    <div className="">
      <div className="flex justify-between bg-mango-gray-2 h-7 border-b border-x-mango-text-light rounded-t-md ">
        <div
          className=" pt-1 pl-1 text-base font-semibold text-mango-primary-blue hover:text-mango-gray-5"
          onClick={() => setIsOpenImage(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
            stroke="currentColor"
          >
            {" "}
            <path
              fill-rule="evenodd"
              strokeWidth={2}
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />{" "}
          </svg>
        </div>
        <div className="flex">
          <div className="flex justify-center items-center mr-5 space-x-3">
            <Popover
              content={<div className="p-2 cursor-pointer hover:text-mango-gray-4" 
              onClick={handleConfirmDelete}>Confirm Delete Gallerry</div>}
              placement="bottom" 
              trigger="click"
              visible={open}
              onVisibleChange={handleOpenChange}
            >
              <div className="text-mango-primary-blue hover:text-mango-gray-5 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />{" "}
                </svg>
              </div>
            </Popover>

            <div className="text-mango-primary-blue text-base hover:text-mango-gray-5 cursor-pointer">
              Edit
            </div>
          </div>

          <div
            className="rounded-full -mt-2 -mr-2 bg-mango-gray-1 h-7 w-7 text-mango-gray-4 
        hover:text-white flex justify-center items-center hover:bg-mango-gray-2 cursor-pointer"
            onClick={() => onCancel()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeWidth="1"
                d="M4.646 4.646a.5.5 0 0 1 
          .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 
          .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8
           4.646 5.354a.5.5 0 0 1 0-.708z"
              />{" "}
            </svg>
          </div>
        </div>
      </div>

      <div className="min-h-[300px] flex justify-center items-center ">
        <div>
          <img className="mr-1 h-72 " src={BASE_UAT_URL + imageOpened.url} alt="" />
        </div>
      </div>

      <div className="flex justify-between bg-mango-gray-1 h-9 rounded-b-md px-44  "></div>
    </div>
  );
}

export default OpenImage;
