import React from "react";

import AddNewTix from "./AddNewTix";

import { TixContextProvider } from "./TixContext";

export interface IDataAddNewTix {
  customerId: number;
  customerName: string;
  timeAdd: string;
  techId: number;
  techName: string;
  appointmentId: number;
  groupId: number;
}
interface Props {
  visible: boolean;
  onOk: any;
  onCancel: any;
  isAddNew: boolean;
  dataAddNew: IDataAddNewTix;
}
const Content = ({ visible, onOk, onCancel, isAddNew, dataAddNew }: Props) => {
  return (
    <TixContextProvider>
      <AddNewTix
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        isAddNew={isAddNew}
        dataAddNew={dataAddNew}
      />
    </TixContextProvider>
  );
};

export default Content;
