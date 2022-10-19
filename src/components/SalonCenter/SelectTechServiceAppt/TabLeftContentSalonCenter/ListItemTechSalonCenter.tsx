import { Empty } from "antd";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";
import { IItemDataTix } from "..";
import { ITixAppt } from "../../DataStructures";
import { IDetailTixSalonCenter, IListApptDetail } from "../DataStructures";
import { ItemTechSalonCenter } from "./ItemTechSalonCenter";

interface Props {
  itemData: Array<ITechSalonCenter>;
  // dataItemApptDetail:IDetailTixSalonCenter
  itemDataTix: IItemDataTix;
}
const ListTechSalonCenter = ({ itemData, itemDataTix }: Props) => {
  return (
    <>
      {itemData.length > 0 ? (
        <div className="flex   w-full overflow-scroll content-start flex-wrap flex-col  justify-start items-start h-[600px] pl-6">
          {itemData.map((tech: ITechSalonCenter, index) => (
            <ItemTechSalonCenter
              key={index}
              tech={tech}
              itemDataTix={itemDataTix}
            />
          ))}
        </div>
      ) : (
        <Empty className="mx-auto w-full h-full" />
      )}
    </>
  );
};
export default ListTechSalonCenter;
