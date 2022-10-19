import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { UpdateCustomerMoreInfo } from "services/Customers/UpdateCustomerMoreInfo";
import { messageSuccess } from "src/components/MessageAlert";

const { TextArea } = Input;

function EditMoreInFo({ visible, onOk, onCancel, setReload, customerEdit }) {
  const [title, setTitle] = useState<any>();
  const [description, setDescription] = useState<any>();
  useEffect(() => {
    setTitle(`${customerEdit != undefined ? customerEdit.title : ""}`);
    setDescription(
      `${customerEdit != undefined ? customerEdit.desciption : ""}`
    );
  }, [customerEdit]);

  const updateCustomerMoreInfo = new UpdateCustomerMoreInfo();
  const handleClickSave = () => {
    const body = {
      id: customerEdit.id,
      customerId: customerEdit.customerId,
      title: title,
      desciption: description,
      rvcNo: 5,
      createDate: "",
    };
    try {
      updateCustomerMoreInfo.updateCustomerMoreInfo(body).then((res) => {
        if (res.status === 200) {
          messageSuccess(res.data.data);
          setReload(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
    setTitle(customerEdit.title);
    setDescription(customerEdit.desciption);
    onCancel();
  };

  const hanleCancelClick = () => {
    onCancel();
    setTitle(customerEdit.title);
    setDescription(customerEdit.desciption);
  };
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width="27%"
      bodyStyle={{ minHeight: "80%" }}
      className="modal-add-more-info"
      footer={null}
      style={{
        top: " 50%",
      }}
    >
      <div>
        <span className="text-bold text-xl rounded-lg  w-full flex justify-center text-mango-gray-4">
          EDIT MORE INFOMATION
        </span>
        <div className="pt-5">
          <div className="flex w-full">
            <div className="w-1/4">Title </div>
            <div className="w-3/4">
              <Input
                className="input-title w-full h-5 p-1"
                placeholder="Tilte"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full mt-3">
            <div className="w-1/4">Description </div>
            <div className="w-3/4">
              {" "}
              <TextArea
                className="description-input-area w-full"
                rows={4}
                placeholder="Description"
                maxLength={1000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />{" "}
            </div>
          </div>
          <div>
            <div className="flex justify-between w-full space-x-2 text-sm mt-5">
              <button
                className="w-1/2  h-10 text-center bg-mango-gray-2 rounded-md text-white hover:text-mango-gray-6 mx-10"
                onClick={hanleCancelClick}
              >
                CANCEL
              </button>
              <button
                className="w-1/2 h-10 bg-mango-primary-blue  rounded-md text-white hover:text-mango-gray-6 mx-10"
                onClick={handleClickSave}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditMoreInFo;
