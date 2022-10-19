import { Col, Image, message, Row, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { APIEmpAssignSer } from "services/EmpAssignSer/EmpAssignSer";
import { GetInfoTech } from "services/techList/techList";
import { ImageExists } from "src/utils/ImageError";
import TixContext from "../../TixContext";
import ItemInfoTech from "./ItemInfoTech";


interface InforTech {
  employeeID: number;
  nickName: string;
  imageFileName: string;
  backGroundColor: string;
  lockInd: string;
}
const SelectTech = () => {
  //Tix context
  const tixCT = useContext(TixContext)[0];
  const [dataInforTech, setDataInforTech] = useState<Array<InforTech>>([]);

  const getInfoTech = new GetInfoTech();

  useEffect(() => {
    getInfoTech.getInfoTech().then((res) => {
      if (res.status == 200) setDataInforTech(res.data);
    });
  }, []);
  const salonEmp = {
    employeeID: 9999,
    nickName: "NEXT AVAILABLE",
    imageFileName: "",
    backGroundColor: "#FFFFFF",
    lockInd: "",
  };
  return (
    <div className="p-5">
      <p className=" font-semibold ">ADD TECH</p>

      <Space className="w-full h-[635px] overflow-auto flex flex-row flex-wrap content-start justify-start !px-2">
        <ItemInfoTech tech={salonEmp} />
        {dataInforTech.length > 0 &&
          dataInforTech.map((tech: InforTech) => (
            <ItemInfoTech tech={tech} key={tech.employeeID} />
          ))}
      </Space>
    </div>
  );
};
export default SelectTech;
