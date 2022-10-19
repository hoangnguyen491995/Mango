

import { SelectTechServiceProvider } from "./SelectTechServiceApptContext";
import { SelectTechServiceModal } from "./SelectTechServiceModal";
// import TabLeftContentSalonCenter from "../LeftContentSalonCenter/TabLeftContentSalonCenter";
export interface IItemDataTix {
  originalAppointmentID: number;
  checkNo: number;
  appointmentStatusID: string;
}
interface Props {
  visible: boolean;
  onOk: any;
  onCancel: any;
  loadDetail: number;
  itemData: IItemDataTix;
}
export const SelectTechServiceAppt = ({
  visible,
  onOk,
  onCancel,
  loadDetail,
  itemData,
}: Props) => {
  return (
    <SelectTechServiceProvider>
      <SelectTechServiceModal
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        loadDetail={loadDetail}
        itemData={itemData}
      />
    </SelectTechServiceProvider>
  );
};
