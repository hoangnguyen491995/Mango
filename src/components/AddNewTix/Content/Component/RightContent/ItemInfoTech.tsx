import { Col, Image, message, Row } from "antd";
import { resolve } from "path";
import { useContext, useState } from "react";
import { APIEmpAssignSer } from "services/EmpAssignSer/EmpAssignSer";
import { messageWarning } from "src/components/MessageAlert";
import { checkAssignEmp, ShowContent, type } from "../../helper";
import TixContext from "../../TixContext";

const ItemInfoTech = ({ tech }) => {
  const tixCT = useContext(TixContext)[0];
  const [checkImage, setCheckImage] = useState<boolean>(false);
  const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
  const handleChangeTech = async (tech) => {

    //lấy danh sách ticket theo  employee id
    const dataFilter = tixCT.dataItemTix[tixCT.idAppt].listWithTech.filter(
      (item) => item.employeeID === tixCT.idTech
    );
    //check đã tồn tại emp
    const checkHaveEmp = tixCT.dataItemTix[tixCT.idAppt].listWithTech.filter(
      (item) => item.employeeID === tech.employeeID
    );
    if (tixCT.idTech > 0) {
      //Change tech
      if (dataFilter) {
        if (checkHaveEmp.length <= 0) {
          const checkAssign = async () => {
            return await Promise.all(
              dataFilter[0].listServiceWithTech.map(
                async (itemService: any) => {
                  const result = await checkAssignEmp(
                    itemService.itemID,
                    tech.employeeID
                  ).then((res) => res);
                  return result;
                }
              )
            );
          };
          const result = await checkAssign();
          //result check emp cant make service
          const resultFail = result.some((item) => item != "success");
          if (!resultFail) {
            dataFilter[0].employeeID = tech.employeeID;
            dataFilter[0].employeeNickName = tech.nickName;
            tixCT.setIdTech(tech.employeeID);
            tixCT.setStatusChange(!tixCT.statusChange);
            tixCT.setShowContent(ShowContent(type.ShowSearchServiceItem));
          } else messageWarning(result.find((item) => item != "success"));
        }
      }
    } else {
      //Thêm mới tech
      if (dataFilter) {
        if (checkHaveEmp.length <= 0) {
          tixCT.dataItemTix[tixCT.idAppt].listWithTech.push({
            employeeID: tech.employeeID,
            employeeNickName: tech.nickName,
            isRequestTech: false,
            listServiceWithTech: [],
          });

          tixCT.setStatusChange(!tixCT.statusChange);
          tixCT.setShowContent(ShowContent(type.ShowSearchServiceItem));
          tixCT.setIdTech(tech.employeeID);
        }
      }
    }
  };

  return (
    <Row>
      <Col
        key={tech.employeeID}
        className={
          "relative h-[96px] w-[106px] rounded-md mt-7 mb-4 mango-shadow flex justify-center items-center cursor-pointer select-none"
        }
        style={{
          background: `${tech.backGroundColor}`,
        }}
        onClick={() => handleChangeTech(tech)}
      >
        {checkImage ? (
          <p className=" text-lg flex justify-center items-center  font-bold absolute inset-x-0 inset-y-0 left-5 -top-7 rounded-full w-[65px] h-[60px] shadow-md bg-gray-200">
            {tech.nickName.slice(0, 1).toUpperCase()}
          </p>
        ) : (
          <>
            <img
              className="absolute inset-x-0 inset-y-0 left-5 -top-7 rounded-full w-[65px] h-[60px] shadow-md bg-gray-200 flex justify-center items-center"
              src={
                tech.employeeID == 9999
                  ? "/assets/imgs/employee.svg"
                  : DOMAIN_URL + "/Upload/employee/" + tech.imageFileName
              }
              onError={() => setCheckImage(true)}
              alt="error"
            />
          </>
        )}

        <div
          className={`font-semibold text-center mt-20 h-full truncate ${
            tech.backGroundColor === "#FFFFFF" ? "text-black" : "text-white"
          }    `}
        >
          <p className="mb-0 truncate w-full px-[4px]">
            {tech.nickName.toUpperCase()}
          </p>
          <p>{tech.lockIn}</p>
        </div>
      </Col>
    </Row>
  );
};
export default ItemInfoTech;
