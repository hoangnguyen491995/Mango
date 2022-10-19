import { Upload } from "antd";

import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useEffect, useState } from "react";
import AddGalleryCustomer from "./AddGalleryCustomer";
import { GetCustomerGallery } from "services/Customers/GetCustomerGallery";
import { ImageGallery } from "../DataStructures/DataInterfaces";
import AlbumsPhotos from "./AlbumsPhotos";
export interface IImageFile {
  image: string | File;

  name: string;
  preview?: {
    img: string;
    scale: number;
    width: number;
    height: number;
    borderRadius: number;
  };
}
const BASE_UAT_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function GalleryFamily({ customerId }) {
  const getCustomerGallery = new GetCustomerGallery();
  const [imageUpload, setImageUpload] = useState<RcFile>();
  const [reload, setReload] = useState<boolean>();
  const [imageUpload2, setImageUpload2] = useState<UploadFile[]>([]);
  // const [imageUpload3, setImageUpload3] = useState<UploadFile[]>([]);
  // const [imageUpload4, setImageUpload4] = useState<UploadFile[]>([]);
  // const [imageUpload5, setImageUpload5] = useState<UploadFile[]>([]);
  // const [imageUpload6, setImageUpload6] = useState<UploadFile[]>([]);
  const [listCustomerGallery, setListCustomerGallery] = useState<
    ImageGallery[]
  >([]);
  const [countEmpty, setCountEmpty] = useState<Number>(6);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalVisibleAlBums, setIsModalVisibleAlBums] = useState<boolean>(false);
  const [fileImage, setFileImage] = useState<IImageFile>({
    image: "",
    name: "",
    preview: undefined,
  });

  useEffect(() => {
    try {
      getCustomerGallery.getCustomerGallery(customerId, 6).then((res) => {
        if (res.status === 200) {
          // console.log(res.data.data);

        //   setListCustomerGallery(res.data.data);
          setReload(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [customerId, reload]);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModalAlBums = () => {
    setIsModalVisibleAlBums(true);
  };
  const handleOkAlBums = () => {
    setIsModalVisibleAlBums(false);
  };
  const handleCancelAlBums = () => {
    setIsModalVisibleAlBums(false);
  };

  const onChange1: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setImageUpload(newFileList[0].originFileObj as RcFile);
    showModal();

    if (!newFileList[0].url && !newFileList[0].preview) {
      newFileList[0].preview = await getBase64(
        newFileList[0].originFileObj as RcFile
      );
      const base64Image =
        newFileList[0].url || (newFileList[0].preview as string);
      setFileImage((prev) => ({
        ...prev,
        image: base64Image,
        name: newFileList[0].name,
      }));
    }
  };


  useEffect(() => {
    let lengthData = listCustomerGallery.length;
    let listEmty: Number = 6 - lengthData;
    setCountEmpty(listEmty);
  }, [listCustomerGallery]);

  return (
    <div className="flex justify-between">
      {" "}
      {listCustomerGallery.map((e, index) => (
        <div className="upload-img customer-gallery-list-item mr-3" key={index} 
        // onClick={showModalAlBums}
        >
          <img
            className="mr-1 "
            src={BASE_UAT_URL + e.imageUrl}
            alt="+ upload"
          />
        </div>
      ))}
      {[...Array(countEmpty)].map((e, index) => (
        <Upload
          key={index}
          maxCount={1}
          showUploadList={false}
        //   onChange={onChange1}
          // onPreview={onPreview}
        >
          {imageUpload2.length < 1 && (
            <div className="upload-img customer-gallery-list-item">
              {index == 0 ? (
                <span className="customer-gallery-list-item-plus">
                  {" "}
                  UPLOAD IMAGE
                </span>
              ) : (
                <img
                  className="mr-1 h-6 w-6"
                  src="/assets/imgs/Clients/upload.svg"
                  alt="+ upload"
                />
              )}
            </div>
          )}
        </Upload>
      ))}
      {/* <AddGalleryCustomer
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        fileImage={fileImage}
        setReload={setReload}
        customerId={customerId}
        imageUpload={imageUpload}
      />
      <AlbumsPhotos
        visible={isModalVisibleAlBums}
        onOk={handleOkAlBums}
        onCancel={handleCancelAlBums}
        fileImage={fileImage}
        setReload={setReload}
        customerId={customerId}
        imageUpload={imageUpload}
      /> */}
    </div>
  );
}

export default GalleryFamily;
