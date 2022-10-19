import { Button, Col, Row } from "antd";
import React, { useEffect } from "react";
import moment from "moment";
import { theme } from "tailwind.config";
import AddTechCreateCharge from "./FormLeftCreateCharge/AddTechCreateCharge";
import ModalClientDetail from "./FormLeftCreateCharge/FormClientDetail";
import SearchCategories from "./FormLeftCreateCharge/FormSearchCategories";
import LoginFormCreateCharge from "./FormLeftCreateCharge/FormLoginLeftCreateCharge";
import { useDispatch, useSelector } from "react-redux";
import { CreateCharge$ } from "src/redux/selector";
import AddClientService from "./FormLeftCreateCharge/AddClientWidthService";
import Subtotal from "./FormLeftCreateCharge/Subtotal";
import ClearAddTech from "./FormLeftCreateCharge/FormClearAddTech";
import { CreateChargeSlice } from "../../CreateChargeSlice";
import { ItemApptCreateCharge } from "./ItemApptCreateCharge";

function LeftCreateCharge() {
  const setShow$ = useSelector(CreateCharge$);
  const dispatch = useDispatch();
  useEffect(() => {}, [setShow$.showClearAddTech, setShow$.RenderAddTechLeft]);

  return (
    <div className="pt-4  w-full flex-col flex relative overflow-h-auto h-full">
      {/* {setShow$.showAddTech != "AddTechLeft" && (
          <div className="flex justify-center  ">
            <Row className="  w-[97%] ml-3" style={{ background: "#ededed" }}>
              <Col span={24}>
                <div
                  className={`flex justify-start ml-4 2xl:text-[16px] xl:text-[16px] md:text-[14px] text-[12px] py-2`}
                >
                  <span className=" 2xl:text-[20px] xl:text-[13px] text-[12px] font-bold border-r-[1px] mr-2 text-[#505050]">
                    Add Client
                  </span>
                  {setShow$.showLeftIdAddClient && (
                    <span className="text-[#505050] 2xl:text-[18px] xl:text-[13px] text-[12px]">
                      #{setShow$.IDItemInTiket.iteminfo.originalAppointmentID}
                    </span>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        )} */}
      {/* {setShow$.showAddClient == "AddclientLeft" && <AddClientService />}
        {setShow$.showAddTech == "AddTechLeft" && <AddTechCreateCharge />}
        {setShow$.showClearAddTech == "cleartech" && <ClearAddTech />} */}

      <ItemApptCreateCharge />

      {/* <Row className="mt-1  ">
        <Col span={24}>
          <div className=" flex justify-start">
            <span
              onClick={() => {
                dispatch(CreateChargeSlice.actions.setShowFormRight("tech"));
                dispatch(CreateChargeSlice.actions.showFormRightTech(0));
              }}
              style={{
                color: `${theme.extend.colors["mango-primary-blue"]}`,
              }}
              className="text-lg ml-7 font-semibold 2xl:text-[18px] xl:text-[15px] md:text-[14px] text-[12px] cursor-pointer"
            >
              ADD TECH +
            </span>
          </div>
        </Col>
      </Row> */}

      {/* showFormLogin */}
      <div className="w-full mt-2 min-h-[270px] max-h-[270px] absolute bottom-16 ">
        <div>
          <Row>
            <Col span={13}>
              <div
                className="min-h-[270px] border-[1px] border-solid justify-center items-center border-current rounded-lg"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                {setShow$.showLeftLogin == "detail" && <ModalClientDetail />}
                {setShow$.showLeftLogin == "search" && <SearchCategories />}
                {setShow$.showLeftLogin == "login" && <LoginFormCreateCharge />}
              </div>
            </Col>
            <Col span={11}>
              <Subtotal />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
export default LeftCreateCharge;
