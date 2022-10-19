import { Empty } from "antd";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";
import { ITixAppt } from "../../../DataStructures";

import { ItemTechSalonCenter } from "./ItemTechSalonCenter";

interface Props {
  itemData: Array<ITechSalonCenter>;

  iteminfo: ITixAppt;
  setIsChangeDataClient: Function;
  isChangeDataClient: boolean;
}
const ListTechSalonCenter = ({
  itemData,
  iteminfo,
  setIsChangeDataClient,
  isChangeDataClient,
}: Props) => {
  return (
    <>
      {itemData.length > 0 ? (
        <div className="flex   w-full overflow-scroll content-start flex-wrap flex-col  justify-start items-start h-[600px] pl-6 pt-16">
          {itemData.map((tech: ITechSalonCenter, index) => (
            <ItemTechSalonCenter
              key={index}
              tech={tech}
              iteminfo={iteminfo}
              setIsChangeDataClient={setIsChangeDataClient}
              isChangeDataClient={isChangeDataClient}
            />
          ))}
        </div>
      ) : (
        <Empty className="mx-auto w-full h-[600px]" />
      )}
    </>
  );
};
export default ListTechSalonCenter;
