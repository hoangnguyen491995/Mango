import { Modal } from 'antd';
import router from 'next/router';
import React from 'react'
import {DeleteClient} from "services/Customers/DeleteClient"
import { messageSuccess } from '../MessageAlert';

const RVC_NO = process.env.NEXT_PUBLIC_RVC_NO;
function ModelDeleteConfirm({visible, onOk, onCancel, customerId}) {
  const deleteClient = new DeleteClient()
    const handleDeleteButton = ()=>{
 
      try {
        deleteClient.deleteClient(5, customerId, "toi").then((res) => {
          if (res.status === 200) {
            messageSuccess("Delete Client Successful");
            return router.push("/client");       
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

  return (
    <Modal
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    width="27%"
    bodyStyle={{ minHeight: "70%" }}
    className="modal-add-more-info"
    footer={null}
  //   closable={false}
    style={{
      top: " 30%",
    }}
  >

    <div>
      <span className="font-semibold text-xl rounded-lg  w-full flex justify-center text-mango-gray-6">
      Do you want to delele this Client
      </span>
      
      <div className="flex justify-end mt-3 ">
          <button className="text-mango-gray-4 h-9 w-32 mr-6 font-semibold text-lg rounded-md hover:bg-mango-gray-100"
          onClick={onCancel}
          >
            Cancel</button>
          <button className="text-white font-semibold bg-mango-primary-blue text-lg h-9 w-32 rounded-md
           hover:bg-mango-primary-blue-hover"
            onClick={handleDeleteButton}>
                Delete
            </button>
        </div>
    </div>
  </Modal>
  );
}

export default ModelDeleteConfirm