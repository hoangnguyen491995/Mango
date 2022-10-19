import { Button, Col, Input, Modal, Row } from "antd";
import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { GetClientNote } from "services/Customers/GetClientNote";
import { UpdateNote } from "services/Customers/UpdateNote";
import { messageSuccess } from "src/components/MessageAlert";
import TixContext from "../../TixContext";
export interface ILastNoteClient {
  noteDate: Date;
  noteContent: string;
  isProfileNote: boolean;
}

const ModalLastNote: React.FC = () => {
  const tixCT = useContext(TixContext)[0];
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [valueLastNote, setValueLastNote] = useState<Array<ILastNoteClient>>();
  const [valueInputLastNote, setValueInputLastNote] = useState<string>("");

  const [valueNote, setValueNote] = useState<string>(tixCT.dataItemTix[0].note);

  const apiUpdateNote = new UpdateNote();
  const apiGetClientNote = new GetClientNote();
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    setValueInputLastNote("");
    const param = {
      note: valueInputLastNote,
      customerId: tixCT.dataItemTix[0].customerID,
    };
    apiUpdateNote.updateNote(param).then((res) => {
      if (res.status == 200) {
        messageSuccess("Updated");
      }
    });
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleValue = (e: any) => {
    setValueInputLastNote(e.target.value);
  };
  const handleNoteAppt = (e: any) => {
    tixCT.dataItemTix.map((item) => (item.note = e));
    setValueNote(e);
  };
  const { TextArea } = Input;
  useEffect(() => {
    if (tixCT.dataItemTix[0].customerID > 0) {
      const param = {
        customerId: tixCT.dataItemTix[0].customerID,
        isCheckOut: false,
      };
      apiGetClientNote
        .getClientNote(param.customerId, param.isCheckOut)
        .then((res) => {
          if (res.status == 200) {
            setValueLastNote(res.data);
          }
        });
    }
  }, [tixCT.dataItemTix[0].customerID, visible]);

  return (
    <>
      <div className="flex ml-[10px] w-full h-10 pr-6">
        <Row className="w-full  ">
          <Col className="">
            <img
              src="/assets/imgs/Note.svg"
              className="w-[25px] h-[25px] flex items-center mt-2"
            />
          </Col>
          <Col>
            <div className="border-b border-mango-border-dark">
              <Input
                value={valueNote}
                bordered={false}
                // style={{ borderBottom: "1px solid gray" }}
                onChange={(e) => handleNoteAppt(e.target.value)}
                className="!border-b !border-x-0 !border-t-0 !border-b-gray-300 !h-8 outline-none !w-full !truncate  "
              />
            </div>
          </Col>
        </Row>

        {tixCT.dataItemTix[0].customerID > 0 && (
          <div className="flex w-full justify-between items-center ml-4 mt-[18px]">
            <p className="font-bold text-[12px] leading-[15px] cursor-pointer truncate items-center flex mr-2 mt-2">
              Last Note:{valueLastNote && valueLastNote[0].noteContent}
            </p>
            <p
              className="text-[35px] text-mango-text-dark hover:!bg-mango-primary-blue-hover !pb-9  !mb-2 rounded-md my-auto h-[35px] cursor-pointer flex items-center "
              onClick={showModal}
            >
              ...
            </p>
          </div>
        )}
      </div>

      <Modal
        visible={visible}
        onOk={handleOk}
        centered
        closable={false}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="w-full ">
          <img
            src="/assets/imgs/info-active.svg"
            className=" mx-auto "
            alt=""
          />
          <div className="w-full border-b border-dashed flex justify-between">
            <div className=" w-1/2 truncate ">
              {" "}
              {valueLastNote && valueLastNote[0].noteContent}{" "}
            </div>
            <div className=" w-1/2 font-medium text-right">
              {" "}
              {moment().format("LL")}
            </div>
          </div>
          <h2 className="font-bold mt-2  text-xl">PROFILE NOTES</h2>
          <TextArea
            rows={4}
            value={valueInputLastNote}
            onChange={handleValue}
            className="h-[90px] rounded-lg "
            style={{ borderRadius: "8px" }}
          ></TextArea>
          <Button
            size="large"
            key="submit"
            type="primary"
            className="!bg-mango-primary-blue !rounded-md !w-full mt-4"
            loading={loading}
            onClick={handleOk}
          >
            GOT IT
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalLastNote;
