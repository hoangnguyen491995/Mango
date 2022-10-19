import { Button, Col, Input, Modal, Row } from "antd";
import React, { useContext, useState } from "react";
import { UpdateNote } from "services/Customers/UpdateNote";
import { messageSuccess } from "src/components/MessageAlert";

const ModalProfileNote = ({ note, customerID }) => {
  // console.log(note);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setvalue] = useState<string>();
  const [show, setShow] = useState<boolean>(false);
  const apiUpdateNote = new UpdateNote();
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setShow(!show);
    setLoading(true);
    const param = {
      note: value,
      customerId: customerID,
    };
    apiUpdateNote.updateNote(param).then((res) => {
      if (res.status == 200) {
        messageSuccess("Update Profile Notes Success");
      }
    });
    setLoading(false);
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleValue = (e: any) => {
    console.log(e.target.value);
    setvalue(e.target.value);
  };

  return (
    <Row>
      <img
        onClick={showModal}
        className="w-[26px] h-[26px] "
        src={`${process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO}/Content/image/Checkout/FontAw/ellipsis.svg`}
        alt=""
      />
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
            style={{
              marginRight: "8px",
              width: "474px",
              height: "46px",
              backgroundColor: "rgb(34 211 238)",
              borderRadius: "6px",
              outline: "none",
              border: "none",
            }}
          >
            GOT IT
          </Button>,
        ]}
      >
        <div className="relative">
          <img
            src="/assets/imgs/info-active.svg"
            className=" mb-2 absolute  -top-2  left-[220px] py-1  "
            alt=""
          />
          <button
            className="   w-[474px] border-b  "
            style={{ height: "42px" }}
          >
            <p className="absolute left-[5px] "> {show && value} </p>
          </button>
          <h2 className="font-bold mt-2  text-xl">PROFILE NOTES</h2>
          <Input
            value={value}
            defaultValue={note}
            onChange={handleValue}
            className="h-[90px] rounded-lg "
            style={{ borderRadius: "8px" }}
          ></Input>
        </div>
      </Modal>
    </Row>
  );
};

export default ModalProfileNote;
