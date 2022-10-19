import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddItemAppointment } from "services/CreateCharge/AddItemToAppointmentInCheckOut";
import { GetCheckOutApptID } from "services/CreateCharge/GetCheckOutByAppointment";
import { GetTicketDetailForCheckout } from "services/CreateCharge/GetTicketDetailForCheckout";
import { GetByCategory } from "services/CreateCharge/HLstItemByCategory";
import { setIsChangeData } from "src/components/CreateCharge/createcharge-slice";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { useAppSelector } from "src/redux/hook";
import { CreateCharge$ } from "src/redux/selector";
import { API_MANGO_IMG } from "src/utils/constant";
import { theme } from "tailwind.config";
import ModalChangePriceRight from "../FormServiceRightCreatecharge/ModalChangePriceRight";
export interface IGetByCategory {
  backgroudColor: string;
  basePrice: number;
  boderColor: string;
  categoryID: number;
  comboModels: [];
  fontColor: string;
  indexColumn: null;
  isCombo: boolean;
  customerPrice: number;
  itemColumns: number;
  itemID: number;
  itemName: string;
  priceColor: string;
  nonDiscountPrice: number;
  columnName: string;
  duration: number;
}
interface IcomboModels {
  itemName: string;
  backgroudColor: string;
  basePrice: 20;
  categoryID: number;
  comboPrice: number;
  boderColor: string;
  fontColor: string;
  priceColor: string;
}
interface IGetCheckOutAppt {
  checkNo: any;
  appointmentID: any;
}
function Ticket({ props }) {
  const [columnName, setColumnName] = useState<string>("");
  const [dataListTicketDetail, setDataListTicketDetail] = useState<any>();

  const dispatch = useDispatch();
  const appID = useSelector(CreateCharge$);

  const showForm = useSelector(CreateCharge$);
  const [datagetByCategory, setDatagetByCategory] = useState<
    Array<IGetByCategory>
  >([]);
  const [dataCheckOutApptID, setDataCheckOutApptID] =
    useState<IGetCheckOutAppt>();
  const getByCategory = new GetByCategory();
  const getCheckOutApptID = new GetCheckOutApptID();
  const getTicketDetailForCheckout = new GetTicketDetailForCheckout();
  useEffect(() => {
    const fetchData = async () => {
      getByCategory.getByCategory(props.Id).then((res) => {
        setDatagetByCategory(res.data.comboViewModels);
      });
    };
    fetchData().catch(console.error);
  }, [props]);
  useEffect(() => {
    const fetchData = async () => {
      getCheckOutApptID
        .getCheckOutApptID(appID.IDCheckoutCreateCharge)
        .then((res) => setDataCheckOutApptID(res.data));
    };
    fetchData().catch(console.error);
  }, [appID.IDCheckoutCreateCharge, dataCheckOutApptID?.appointmentID]);
  useEffect(() => {
    const fetchData = async () => {
      getTicketDetailForCheckout
        .getTicketDetailForCheckout(
          dataCheckOutApptID?.appointmentID,
          dataCheckOutApptID?.checkNo
        )
        .then((res) => {
          setDataListTicketDetail(res.data?.model);
        });
    };
    fetchData().catch(console.error);
  }, [appID.ID, appID.RenderAddTechLeft]);
  const [price, setPrice] = useState(0);

  const AddItemToAppointment = new AddItemAppointment();

  const handleAddTech = (post: any) => {
    // console.log(post.comboModels);
    const newListComboItem = post.comboModels.map((item, index) => {
      // console.log(item.itemID, item.comboPrice, item.basePrice);
      return {
        itemID: item.itemID,
        comboPrice: item.comboPrice,
        basePrice: item.basePrice,
      };
    });
    // console.log("newListComboItem", newListComboItem);

    const fetchData = async () => {
      setPrice(showForm.setchangePrice);
      AddItemToAppointment.addItemAppointment({
        appointmentId: apptId,
        itemCode: post.itemID,
        itemDuration: post?.duration,
        customPrice: 0,
        packID: 0,
        customerID: 0,
        lstDetailComBo: "",
        listComboItem: newListComboItem,
        isChangePrice: false,
        techAddNew: 0,
        prodCharge: 0,
        name: "",
        turn: 0,
        byPass: false,
        byPassUser: -1,
      }).then((res) => {
        if (res.status == 200) {
          dispatch(setIsChangeData());
          dispatch(
            CreateChargeSlice.actions.showLeftAddTech({
              showform: "AddTechLeft",
              NameCategory: post.itemName,
              Price: post.basePrice,
              Id: Math.random(),
              IdRender: Math.random(),
            })
          );
          dispatch(CreateChargeSlice.actions.showLeftClearTech(""));
        }
      });
    };
    fetchData().catch(console.error);
  };

  const apptId = useAppSelector((state) => state.createCharge.apptId);
  const empId = useAppSelector((state) => state.createCharge.idSelectTech);
  const clientId = useAppSelector((state) => state.createCharge.idSelectClient);
  return (
    <>
      {props.categoryName == "COMBOS" ? (
        <Row>
          {datagetByCategory.length > 0 &&
            datagetByCategory.map((post: IGetByCategory, index) => {
              return (
                <div className="flex justify-center" key={index}>
                  <Col
                    key={index}
                    className="w-[220px] h-[240px] border-[1px] rounded-md border-slate-400
                   relative m-4 flex justify-center "
                    onClick={() => handleAddTech(post)}
                  >
                    <div className="absolute top-[-14px] bg-white">
                      <span className="text-[10px] font-semibold ">
                        {post.itemName}
                      </span>
                    </div>
                    <Row className="flex mt-2 justify-center ">
                      {post.comboModels.map((post: IcomboModels, index) => {
                        return (
                          <Col key={index} span={12}>
                            <div
                              className="w-[85px] h-[57px] border-[1px] m-2 rounded border-slate-400
                             flex flex-col justify-center items-center cursor-pointer"
                              style={{
                                backgroundImage: `url(${API_MANGO_IMG}/Content/mango/${post.backgroudColor})`,

                                backgroundSize: "cover",
                                borderColor: `${post.boderColor}`,
                              }}
                            >
                              <span className="text-[9px] w-[90%] font-bold">
                                {post.itemName}
                              </span>
                              <div
                                className="w-[65px] h-[14px] border-[1px] border-dashed border-slate-400 
                            flex justify-center items-center bg-white rounded absolute top-[50px] mt-[7px]"
                              >
                                <span className="text-[8px] font-semibold">
                                  ${post.basePrice}.00
                                </span>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                      <div
                        className="rounded-sm w-[165px] h-[32px] border-[1px] border-dashed border-slate-400 mt-2
                      flex flex-col items-center justify-center bg-white top-[210px] absolute cursor-pointer"
                      >
                        <span
                          className="text-[10px] font-semibold"
                          style={{
                            color: `${theme.extend.colors["mango-primary-blue"]}`,
                          }}
                        >
                          ${post.basePrice}.00
                        </span>
                        <span
                          className="text-[8px] font-semibold line-through"
                          style={{
                            color: `${theme.extend.colors["mango-primary-orange"]}`,
                          }}
                        >
                          ${post.nonDiscountPrice}.00
                        </span>
                      </div>
                    </Row>
                  </Col>
                </div>
              );
            })}
        </Row>
      ) : (
        <div className="m-6">
          <span className=" text-[#505050] font-bold">{columnName}</span>
          {datagetByCategory.length > 0 &&
            datagetByCategory.map((post: IGetByCategory) => {
              // console.log("post", post);
              return (
                <div
                  className=" relative flex flex-col justify-center mt-[1px] cursor-pointer "
                  key={post.itemID}
                >
                  <div
                    onClick={() => {
                      setPrice(showForm.setchangePrice);
                      const param = {
                        appointmentId: apptId,
                        itemCode: post.itemID,
                        itemDuration: post.duration,
                        customPrice: post.basePrice,
                        packID: 0,
                        customerID: clientId,
                        lstDetailComBo: "",
                        listComboItem: [],
                        isChangePrice: false,
                        techAddNew: empId,
                        prodCharge: 0,
                        name: post.itemName,
                        turn: 0,
                        byPass: false,
                        byPassUser: -1,
                      };
                      // console.log(param);

                      AddItemToAppointment.addItemAppointment(param).then(
                        (res) => {
                          dispatch(
                            CreateChargeSlice.actions.showLeftAddTech({
                              showform: "AddTechLeft",
                              NameCategory: post.itemName,
                              Price: post.basePrice,
                              Id: Math.random(),
                              IdRender: Math.random(),
                            })
                          );
                          dispatch(
                            CreateChargeSlice.actions.showLeftClearTech("")
                          );
                          dispatch(setIsChangeData());
                        }
                      );
                    }}
                    style={{
                      backgroundImage: `url( ${API_MANGO_IMG}/Content/mango/${post.backgroudColor})`,
                      backgroundSize: "cover",
                      borderColor: `${post.boderColor}`,
                      border: "1px dashed #999",
                    }}
                    className={`${
                      props == 8 ? " border-dashed" : ""
                    }  w-[100px] h-[70px]  mt-[10px] flex flex-col justify-center
                      items-center rounded cursor-pointer`}
                  >
                    <div className="flex">
                      <span
                        className={
                          `                                                   
                        left-[28px]
                        font-bold text-[12px]` +
                          (post.fontColor === "#ffffff"
                            ? " text-white"
                            : "text-[#505050] ")
                        }
                      >
                        {post.itemName}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-[70px] left-[9px]">
                    {/* <ModalChangePriceRight
                      props={post.basePrice}
                      priceColor={post.priceColor}
                    /> */}
                    <div
                      className={`w-[82px] h-[18px] border-[1px] border-dashed border-slate-500 rounded flex items-center justify-center bg-white `}
                    >
                      <span
                        className={
                          `text-[11px] font-semibold` +
                          (post.priceColor === "#f7941c"
                            ? " text-[#f7941c]"
                            : " text-[#00bed6]")
                        }
                      >
                        ${post.basePrice}.00
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default Ticket;
