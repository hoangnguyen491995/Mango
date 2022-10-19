import { Col, Modal } from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { GetServiceDetailForEdit } from "services/Appointments/GetServiceDetailForEdit";
import { IDataAddNewTix } from ".";
import SelectService from "./Component/CenterContent";
import LeftContent from "./Component/LeftContent";
import { RightContent } from "./Component/RightContent";
import { getTimeNearest12H } from "./helper";
import TixContext from "./TixContext";
interface Props {
  visible: boolean;
  onOk: any;
  onCancel: any;
  isAddNew: boolean;
  dataAddNew: IDataAddNewTix;
}
const AddNewTix = ({
  visible,
  onOk,
  onCancel,
  isAddNew,
  dataAddNew,
}: Props) => {
  const tixCT = useContext(TixContext)[0];
  const apiGetApptEdit = new GetServiceDetailForEdit();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAddNew) {
      const timeStartAppt =
        dataAddNew.timeAdd != "" && dataAddNew.timeAdd
          ? dataAddNew.timeAdd
          : moment().format("MM-DD-YYYY") + " " + getTimeNearest12H();
      tixCT.setDataItemTix([
        {
          appointmentID: 0,
          isChangeTime: false,
          isStartAllSameTime: false,
          idParty: 0,
          phone: "Client No Phone",
          customerID: dataAddNew.customerId || 0,
          date:
            moment(dataAddNew.timeAdd).format("MM-DD-YYYY") ||
            moment().format("MM-DD-YYYY"),
          totalDuration: 0,
          aptStartTime: timeStartAppt,
          name: dataAddNew.customerName || "NON INFO",
          note: "",
          email: null,
          listWithTech: [
            {
              employeeID: dataAddNew.techId || 9999,
              employeeNickName: dataAddNew.techName || "NEXT AVAILABLE",
              isRequestTech: false,
              listServiceWithTech: [],
            },
          ],
        },
      ]);
    } else {
      if (dataAddNew.appointmentId != 0 && visible) {
        setIsLoading(true);
        apiGetApptEdit
          .getServiceDetailForEdit(dataAddNew.appointmentId, dataAddNew.groupId)
          .then((res) => {
            if (res.status == 200) {
              tixCT.setDataItemTix(res.data);
              setIsLoading(false);
            }
          })
          .catch((e) => setIsLoading(false));
      }
    }
  }, [visible]);

  // console.log(tixCT);

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      width={"80%"}
      className="modal-add-ticket "
      centered
      confirmLoading={isLoading}
      footer={null}
      closable={false}
      maskClosable={true}
    >
      <div className="flex h-[700px] mt-[2px] ml-[1px]">
        <Col className="flex-[2] p-5 flex flex-col flex-nowrap justify-between">
          <LeftContent onOk={onOk} onCancel={onCancel} />
        </Col>
        <Col className="border-solid border-r-2 border-l-2  border-inherit w-[220px]  ">
          <SelectService />
        </Col>
        <Col className="flex-[2] ">
          <RightContent isAddNew={isAddNew} />
        </Col>
      </div>
    </Modal>
  );
};
export default AddNewTix;
