import { Col, message, Row } from "antd";
import { resolve } from "path";
import { useContext, useState } from "react";
import { APIEmpAssignSer } from "services/EmpAssignSer/EmpAssignSer";
import {
  checkAssignEmp,
  ShowContent,
  type,
} from "src/components/AddNewTix/Content/helper";
// import TixContext from "../../TixContext";
import HomeContext from "src/components/Book/HomeContext";

function ItemInfoTech({ tech }) {
  // const tixCT = useContext(TixContext)[0];
  const [checkImage, setCheckImage] = useState<boolean>(false);
  const bookContext = useContext(HomeContext)[0];

  const BASE_UAT_URL = process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO;
  const handleOnClickTech = (event) =>{
    bookContext.setTechId(tech.employeeID);
    bookContext.setTechName(tech.nickName);
    event = event.target.closest(".tech-box");
    // let b = e.target.closest(".rbc-event-service");
 
    let current = Array.from(document.getElementsByClassName("activeClick") as HTMLCollectionOf<HTMLElement>);
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" activeClick", "");
      current[0].style.boxShadow = "none";
    }
    if (event) {
      event.style.boxShadow = `#00bed6 0px 0px 0px 3px`;
      
      event.classList.add("activeClick");
    }
  }

  return (
    <Row>
      <Col
        key={tech.employeeID}
        className={`relative h-[100px] w-[115px] rounded-md  
            visible mt-10  shadow-md flex justify-center items-center 
        cursor-pointer select-none hover:opacity-80 tech-box hover:cursor-move `}
        style={{
          background: `${tech.backGroundColor}`,
          boxShadow: "0px 0px 15px #0000004d",
        }}
        onClick={(e) => {
          handleOnClickTech(e);
        }}
      >
        {checkImage ? (
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className=" text-lg  font-bold absolute inset-x-0 inset-y-0 mx-auto 
            -top-10 rounded-full w-[90px] h-[90px] shadow-md bg-gray-200"
          >
            {tech.nickName.slice(0, 1).toUpperCase()}
          </p>
        ) : (
          <img
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="absolute inset-x-0 inset-y-0 mx-auto  -top-7 rounded-full w-[75px] h-[75px] shadow-md bg-gray-200"
            src={
              tech.employeeID == 9999
                ? "/assets/imgs/employee.svg"
                : BASE_UAT_URL + "/Upload/Employee/" + tech.imageFileName
            }
            onError={() => setCheckImage(true)}
            alt="error"
          />
        )}

        <div
          className={`font-semibold text-center  h-full truncate text-tech-name ${
            tech.backGroundColor === "#FFFFFF" ? "text-black" : "text-white"
          }    `}
        >
          <p className="mb-0 truncate w-full px-[4px]">
            {tech.nickName.toUpperCase()}
          </p>
          <p className="text-xs">{tech.lockIn}</p>
        </div>
      </Col>
    </Row>
  );
}
export default ItemInfoTech;
