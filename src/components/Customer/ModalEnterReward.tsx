import React, { useEffect, useState } from "react";
import { Modal } from "antd";
function ModalEnterReward({ visible, onOk, onCancel, setPointReward }) {
  const [valuePointReward, valueSetPointReward] = useState<string>('');
  
  // const updateCustomerMoreInfo = new UpdateCustomerMoreInfo();

  const hanleJoinPointString = (e) => {
    if(valuePointReward.length > 12)
    {
        valueSetPointReward('')
    }
    else{
        valueSetPointReward(valuePointReward.concat(e))
    }
  };
  const handleClearPoint = () =>{
    valueSetPointReward('')
  }
  const handleOkButton = () =>{
    setPointReward(valuePointReward);
    onOk()
  }
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width="280px"
      bodyStyle={{ minHeight: "30%" }}
      className="modal-enter-point-reward"
      footer={null}
      mask={false}
      style={{
        top: " 13%",
      }}
    >
      <div className="rounded-md">
        <div className="box-value-point-reward pt-1 pl-1">{valuePointReward.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>

        <div className="space-y-3 pt-5">
          <div className="flex row-span-3 justify-between px-5">
            <div className="node-number" onClick={()=>hanleJoinPointString(1)}>1</div>
            <div className="node-number" onClick={()=>hanleJoinPointString(2)}>2</div>
            <div className="node-number" onClick={()=>hanleJoinPointString(3)}>3</div>
          </div>
          <div className="flex row-span-3 justify-between px-5">
            <div className="node-number" onClick={()=>hanleJoinPointString(4)}>4</div>
            <div className="node-number" onClick={()=>hanleJoinPointString(5)}>5</div>
            <div className="node-number" onClick={()=>hanleJoinPointString(6)}>6</div>
          </div>
          <div className="flex row-span-3 justify-between px-5">
            <div className="node-number" onClick={()=>hanleJoinPointString(7)}>7</div>
            <div className="node-number" onClick={()=>hanleJoinPointString(8)}>8</div>
            <div className="node-number" onClick={()=>hanleJoinPointString(9)}>9</div>
          </div>
          <div className="flex row-span-3 justify-between px-5">
            <div className="node-number font-bold" onClick={handleClearPoint}>C</div>
            <div className="node-number" onClick={()=>hanleJoinPointString(0)} >0</div>
            <div className="node-number"></div>
          </div>
        </div>
        <div className="flex justify-center cursor-pointer text-white
         bg-mango-primary-orange mt-4 rounded-md h-8 pt-1" onClick={handleOkButton}>OK</div>
      </div>
    </Modal>
  );
}

export default ModalEnterReward;
