import { Input, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { IImageFile } from "./Gallery";
import { AddGallery } from "services/Customers/AddGallery";
import { messageSuccess } from "src/components/MessageAlert";

const { TextArea } = Input;
function AddGalleryCustomer({
  visible,
  onOk,
  onCancel,
  fileImage,
  customerId,
  setReload,
  imageUpload,
}) {
  const [imageShow, setImageShow] = useState<IImageFile>({
    image: "",
    name: "",
    preview: undefined,
  });
  const [textDescription, setTextDescription] = useState("");
  const addGallery = new AddGallery();
  const a = null;
  useEffect(() => {
    setImageShow(fileImage);
  }, [fileImage]);
  const handleSaveButton = () => {
    var data = new FormData();
    data.append("customerId", customerId);
    data.append("imageFiles", imageUpload);
    data.append("appointmentId", "");
    data.append("descriptions", textDescription);

    try {
      addGallery.addGallery(data).then((res) => {
        if (res.status === 200) {
          messageSuccess("Add Gallery Success");
          setReload(true);
          onOk();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      //   onCancel={onCancel}
      width="18%"
      bodyStyle={{ minHeight: "70%" }}
      className="modal-add-more-info"
      closable={false}
      footer={null}
      style={{
        top: " 30%",
      }}
    >
      <div>
        <div className="flex justify-between">
          <span className="text-bold text-xl rounded-lg  w-full flex justify-center text-mango-gray-4 ">
            ADD GALLERY
          </span>
          <div className="rounded-full bg-mango-gray-1 h-7 w-7 text-mango-gray-4 hover:text-white
           flex justify-center items-center hover:bg-mango-gray-2"  
          onClick={() => onCancel()}>
           
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
               4.646 5.354a.5.5 0 0 1 0-.708z" />{" "}
            </svg>
          </div>
        </div>

        <div className="flex">
          <div className="h-28 w-28 image-descriptions pt-2">
            <img className="mr-1 h-20 w-20" src={`${imageShow.image}`} alt="" />
          </div>
          <div className="h-full">
            <div className="text-sm font-thin text-mango-gray-3">
              # Description
            </div>

            <TextArea
              className="text-description-input-area font-thin "
              rows={3}
              placeholder="Notes"
              maxLength={300}
              value={textDescription}
              onChange={(e) => setTextDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end -mt-3 px-5 ">
          <button
            className="text-white  bg-mango-primary-blue h-8 w-32 rounded-md"
            onClick={handleSaveButton}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddGalleryCustomer;
