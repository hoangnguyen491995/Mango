import { Row, Col, Modal } from "antd";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddItemAppointment } from "services/CreateCharge/AddItemToAppointmentInCheckOut";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import OpenItemGlobal from "src/components/OpenItem/OpenItemGlobal";
import { CreateCharge$ } from "src/redux/selector";
import { theme } from "tailwind.config";
import { KeyNumberCreateCharge } from "./OpenItemrightCreatecharge";

function OpenitemsCreateCharge() {
  const [customNameItem, setCustomNameItem] = useState<string>("Custom Price");
  const [valueObject, setValueObject] = useState<Array<string>>([
    "0",
    "0",
    "0",
    "0",
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dispatch = useDispatch();
  const showForm = useSelector(CreateCharge$);
  const AddItemToAppointment = new AddItemAppointment();
  const handleOnConfirm = () => {
    const fetchData = async () => {
      AddItemToAppointment.addItemAppointment({
        appointmentId: showForm.IDItemInTiket.iteminfo.originalAppointmentID,
        itemCode: -1,
        itemDuration: String(valueObject[2]),
        customPrice: String(valueObject[0]),
        packID: 0,
        customerID: 0,
        lstDetailComBo: "",
        isChangePrice: false,
        techAddNew: 0,
        prodCharge: String(valueObject[1]),
        name: "",
        turn: String(valueObject[3]),
        byPass: false,
        byPassUser: -1,
      }).then((res) => {
        handleCancel();
        dispatch(
          CreateChargeSlice.actions.showLeftAddTech({
            showform: "AddTechLeft",
            Id: Math.random(),
            IdRender: Math.random(),
          })
        );
        dispatch(CreateChargeSlice.actions.showLeftClearTech(""));
      });
    };
    fetchData().catch(console.error);
  };
  return (
    <>
      <Row onClick={showModal} className="bg-white rounded-lg shadow-md">
        <button className="mr-auto ml-auto">
          <img src="/assets/imgs/open_item.svg" />
        </button>
        <p
          className="font-bold w-full text-center truncate 
        2xl:text-[14px] md:text-xs sm:text-xs mt-[2px] "
        >
          OPEN ITEM
        </p>
      </Row>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="modal-add-ticket"
        width={600}
      >
        <div className="h-[676px] w-[600px] ">
          <OpenItemGlobal
            bgHeader
            onConfirm={handleOnConfirm}
            valueObject={valueObject}
            setValueObject={setValueObject}
            customNameItem={customNameItem}
            setCustomNameItem={setCustomNameItem}
            classBtnConfirm={
              "text-lg w-[100%] !mt-auto flex items-center justify-center !mx-auto !h-[50px] !rounded-[4px] !bg-mango-primary-blue !border-mango-primary-blue mango-shadow font-bold text-center text-white cursor-pointer "
            }
          />
        </div>
      </Modal>
    </>
  );
}

export default OpenitemsCreateCharge;
