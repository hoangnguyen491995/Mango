import { Button, Col, List, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCheckOutApptID } from "services/CreateCharge/GetCheckOutByAppointment";
import { DeleteWaitEmployee } from "services/CreateCharge/VoidWaitEmployee";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { CreateCharge$ } from "src/redux/selector";
import { theme } from "tailwind.config";
import { useAppDispatch, useAppSelector } from "src/redux/hook";

import { GetTicketDetailForCheckout } from "services/CreateCharge/GetTicketDetailForCheckout";

import { Model } from "src/components/CreateCharge/InterfaceCreateCharge";
import { currencyFormat } from "src/helper/General";
import {
  setIdSelectClient,
  setIdSelectTech,
  setIndexTech,
} from "src/components/CreateCharge/createcharge-slice";
interface IGetCheckOutAppt {
  checkNo: any;
  appointmentID: any;
}
function ClearAddTech() {
  const appID = useSelector(CreateCharge$);
  const getTicketDetailForCheckout = new GetTicketDetailForCheckout();
  const [dataListTicketDetail, setDataListTicketDetail] = useState<Model>();
  const [active, setActive] = useState<string>("");

  const [indexAppt, setIndexAppt] = useState<number>(0);

  const dispatch = useDispatch();
  const checkNoTix = useAppSelector((state) => state.createCharge.checkNo);
  const apptId = useAppSelector((state) => state.createCharge.apptId);
  let rvcNo = 5;
  let isStart = true;

  const deleteWaitEmployee = new DeleteWaitEmployee();

  const handleClearTech = (item: any) => {
    const fetchData = async () => {
      deleteWaitEmployee
        .deleteWaitEmployee(item.appointmentID, item.employeeID, rvcNo, isStart)
        .then((res) => {
          dispatch(CreateChargeSlice.actions.showLeftClearTech("cleartech"));
          dispatch(
            CreateChargeSlice.actions.showLeftAddTech({
              showform: "AddTechLeft",
              Id: Math.random(),
              IdRender: Math.random(),
            })
          );
        });
    };
    fetchData().catch(console.error);
  };

  const handleShowFees = (item: any) => {
    // console.log(item);
    // dispatch(CreateChargeSlice.actions.showFormRightTech(5));
    // dispatch(CreateChargeSlice.actions.setShowFormRight("tech"));
  };

  //Call Api get checkNo
  const getCheckOutApptID = new GetCheckOutApptID();
  const [dataCheckOutApptID, setDataCheckOutApptID] =
    useState<IGetCheckOutAppt>();

  useEffect(() => {
    const fetchData = async () => {
      getCheckOutApptID
        .getCheckOutApptID(appID.IDCheckoutCreateCharge)
        .then((res) => setDataCheckOutApptID(res.data));
    };
    fetchData().catch(console.error);
  }, [appID.IDCheckoutCreateCharge]);

  useEffect(() => {
    if (checkNoTix) {
      getTicketDetailForCheckout
        .getTicketDetailForCheckout(apptId, checkNoTix)
        .then((res) => {
          if (res.status == 200) {
            setDataListTicketDetail(res.data?.model);
            // console.log(res.data.model);

            dispatch(
              setIdSelectClient(res.data?.model.listTicket[0].customerID)
            );
          }
        });
    }
  }, [checkNoTix, apptId]);

  return (
    <div>
      <div className="mt-[2px]">
        <Row className="  w-[97%] ml-3" style={{ background: "#ededed" }}>
          <Col span={24}>
            <div
              className={`flex justify-start ml-4 2xl:text-[16px] xl:text-[16px] md:text-[14px] text-[12px] py-2`}
            >
              <span className=" 2xl:text-[20px] xl:text-[13px] text-[12px] font-bold border-r-[1px] mr-2 text-[#505050]">
                {dataListTicketDetail?.customer || "Add Client"}
              </span>
            </div>
          </Col>
        </Row>

        <div className="flex  min-h-0 max-h-96  overflow-y-scroll content-start flex-col flex-wrap justify-start items-start cursor-pointer">
          <div
            className="  w-[99.5%] pl-3 "
            style={{ backgroundColor: "#ffffff" }}
          >
            {dataListTicketDetail?.listTicket[0].lstDetailCategory.map(
              (item, index) => (
                <List.Item
                  key={index}
                  onClick={() => {
                    setIndexAppt(index),
                      dispatch(setIndexTech(index)),
                      dispatch(setIdSelectTech(item.employeeID));
                  }}
                  className={
                    "flex flex-wrap  !border-b-gray-400 !border-solid !border-b cursor-pointer select-none " +
                    (index == indexAppt ? " !bg-gray-100" : " !bg-white")
                  }
                >
                  <div className="flex ml-[10px] mr-[6px] mt-[3px] items-center pb-[4px]">
                    <img
                      onClick={() => handleClearTech(item)}
                      className="w-[25px] h-[25px] mr-4 cursor-pointer"
                      src={`${process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO}/Content/mango/General Assets/SVG/CheckOut/New24px-cancel-service-01.svg`}
                    />
                    <span
                      className={`flex justify-start font-bold py-2 ml-[-8px] text-lg uppercase `}
                      style={{ minWidth: "140px" }}
                    >
                      {item.employeeName}
                    </span>
                    <button
                      onClick={() => handleShowFees(item)}
                      className="px-[10px] py-[8px] rounded-md ml-10"
                      style={{
                        background: `${theme.extend.colors["mango-primary-green"]}`,
                      }}
                    >
                      <span className="text-white text-[18px]">
                        ADD SERVICE
                      </span>
                    </button>
                  </div>
                  {/* List Item Service */}

                  <div className="basis-full flex flex-row ">
                    <Row className="w-full ">
                      <Row
                        className={
                          "hover:!bg-yellow-100 w-full "
                          //  +
                          // (indexItem === tixCT.indexItemService &&
                          //   itemTicket.employeeID === tixCT.idTech &&
                          //   " !bg-yellow-100")
                        }
                        //   key={indexItem}
                        onClick={() => {}}
                      >
                        <Col span={2} className="py-2 w-full ">
                          <Button
                            danger
                            size="small"
                            type="text"
                            className="hover:!bg-orange-400 hover:!text-white"
                            onClick={() => {}}
                          >
                            X
                          </Button>
                        </Col>
                        <Col span={12} className="py-2">
                          <span className="text-sm w-full font-semibold">
                            {item.itemName}
                          </span>
                        </Col>

                        <Col span={4} className=" py-2">
                          <Button
                            size="small"
                            className=" text-center !w-full "
                            onClick={() => {}}
                          >
                            <span
                              className="text-xs text-center !w-full   "
                              title={Number(item.duration) + "m"}
                            >
                              {Number(item.duration)}m
                            </span>
                          </Button>
                        </Col>
                        <Col
                          span={6}
                          className="text-center py-3 text-xs font-bold"
                        >
                          {" "}
                          <span>${currencyFormat(item.itemPrice || 0)}</span>
                        </Col>
                      </Row>
                      {/* ))} */}
                    </Row>
                  </div>
                </List.Item>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClearAddTech;
