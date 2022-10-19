import { Input, Modal, Segmented, Upload } from "antd";
import React, { useEffect, useState } from "react";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { IImageFile } from "./Gallery";
import { AddGallery } from "services/Customers/AddGallery";
import { messageSuccess } from "src/components/MessageAlert";
import moment from "moment";
import OpenImage from "./OpenImage";
const BASE_UAT_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
function AlbumsPhotos({
  visible,
  onOk,
  onCancel,
  fileImage,
  customerId,
  setReload,
  imageUpload,
  listCustomerGallery,
  onChange1
}) {

  const [isOpenImage, setIsOpenImage] = useState<boolean>(false)
  const [imageOpened, setImageOpened] = useState<any>({
    url: "", 
    id: 0
  })
   
  const openImage = (e, id) => {
      setImageOpened({url: e,
      id: id})
    setIsOpenImage(true)

  };
  const [sizeImage, setSizeImage] = useState("76")
  const  handleZoomButton =() =>{
    if(sizeImage =="76"){
      setSizeImage("85")

    }
    else{
      setSizeImage("85")

    }
  }
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width="38%"
      bodyStyle={{ minHeight: "70%" }}
      className="albums-gallery-info "
      footer={null}
      closable={false}
      style={{
        top: " 30%",
      }}
    >
     {isOpenImage == false ? <div className="">
        <div className="flex justify-between bg-mango-gray-2 rounded-t-md ">
          <div className=" pt-1 pl-1 text-base font-semibold  text-white cursor-default">
            {moment().format("ll")}
          </div>
          <div
            className="rounded-full -mt-2 -mr-2 bg-mango-gray-1 h-7 w-7 text-mango-gray-4  cursor-pointer
            hover:text-white flex justify-center items-center hover:bg-mango-gray-2"
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
        <div className="flex from-mango-gray-2 bg-gradient-to-b ">
          <div className="pl-8 segmented-albums flex">
            <Segmented options={["All Photos", "Days", "Months", "Years"]} />
            <button className=" ml-5 text-white flex my-auto bg-mango-gray-3 text-xs font-thin
          rounded-full  hover:bg-mango-gray-2 h-7 w-auto  px-2 justify-center items-center">
         
            Search
          </button>
          <button className=" ml-3  flex my-auto bg-mango-gray-3 text-xs  font-thin
          rounded-full text-white hover:bg-mango-gray-2 h-7 w-auto px-2 justify-center items-center"
          onClick={handleZoomButton}>
         
            +/-
          </button>
          <Upload
          className="my-auto"
          maxCount={1}
          showUploadList={false}
          onChange={onChange1}
          // onPreview={onPreview}
        >
         <button className=" ml-3  flex  bg-mango-gray-3 text-xs font-thin
          rounded-full text-white hover:bg-mango-gray-2 h-7 w-auto  px-2 justify-center items-center">
         
            Library +
          </button>
        </Upload>
          
          <button className=" ml-3  flex my-auto bg-mango-gray-3 text-xs  font-thin
          rounded-full text-white hover:bg-mango-gray-2 h-7 px-2 w-auto justify-center items-center">
         
            Camera +
          </button>
          </div>
          <div></div>
        </div>
        <div className="min-h-[300px] flex  ">
          {listCustomerGallery.length > 0 &&
            listCustomerGallery.map((img, index) => (
              <div
                className={`albums-gallery m-1  cursor-pointer`}
                key={index}
                onClick={()=>openImage(img.imageUrl, img.id)}
              >
                <img
                  className="mr-1 "
                  src={BASE_UAT_URL + img.imageUrl}
                  alt=""
                />
              </div>
            ))}
        </div>

        <div className="flex justify-between bg-mango-gray-1 h-9 rounded-b-md px-44  ">
        <button className="text-mango-gray-3 flex my-auto focus:text-mango-primary-blue  
          rounded-full hover:text-white hover:bg-mango-gray-2 h-8 w-24 justify-center items-center" 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-image-fill mr-1"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"
                fill="currentColor"
              ></path>{" "}
            </svg>
            Photos
          </button>
          <button className="text-mango-gray-3 flex my-auto focus:text-mango-primary-blue 
          rounded-full hover:text-white hover:bg-mango-gray-2 h-8 w-24 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search mr-1"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
            </svg>
            Search
          </button>
        </div>
      </div> : <OpenImage imageOpened = {imageOpened} setIsOpenImage={setIsOpenImage} onCancel={onCancel} customerId ={customerId}
  setReload={setReload}/>}
    </Modal>
  );
}

export default AlbumsPhotos;
