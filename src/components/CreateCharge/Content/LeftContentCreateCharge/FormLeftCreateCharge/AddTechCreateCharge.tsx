import { theme } from "tailwind.config";
import { BiX } from "react-icons/bi";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { CreateCharge$ } from "src/redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { GetTicketDetailForCheckout } from "services/CreateCharge/GetTicketDetailForCheckout";
import ModalModifyTime from "./ModalModifyPriceLeftCreateCharge";
import { DeleteVoidItem } from "services/CreateCharge/DeleteVoidItem";
import { DeleteListItem } from "services/CreateCharge/VoidListItemByEmployee";
import { VoidExtraItem } from "services/CreateCharge/VoidExtraItem";
import { messageSuccess, messageWarning } from "src/components/MessageAlert";
import { GetCheckOutApptID } from "services/CreateCharge/GetCheckOutByAppointment";

interface ICheckInApptCateList {
  customerID: number;
  trnDesc: string;
  itemPrice: number;
  employeeName: string;
  trnSeq: number;
}
interface IDeleteVoiItem {}

function AddTechCreateCharge() {
  const dispatch = useDispatch();
  const deleteListItem = new DeleteListItem();
  const [dataListTicketDetail, setDataListTicketDetail] = useState<any>();

  const getTicketDetailForCheckout = new GetTicketDetailForCheckout();
  const appID = useSelector(CreateCharge$);

  const [render, setRender] = useState<boolean>(true);

  // const [dataCheckOutApptID, setDataCheckOutApptID] = useState("");
  // console.log("dataCheckOutApptID get checkNo", dataCheckOutApptID?.checkNo);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     getCheckOutApptID
  //       .getCheckOutApptID(appID.IDCheckoutCreateCharge)
  //       .then((res) => setDataCheckOutApptID(res.data));
  //   };
  //   fetchData().catch(console.error);
  // }, [appID.IDCheckoutCreateCharge]);
  useEffect(() => {
    const fetchData = async () => {
      getTicketDetailForCheckout
        .getTicketDetailForCheckout(appID.IDItemInTiket, appID.IDItemInTiket)
        .then((res) => {
          // console.log(res);
          setDataListTicketDetail(res.data?.model);
        });

      // let trnSeq =
      //   dataListTicketDetail?.newFormatListTickets[0].listTicketDetail[0]
      //     .tickets[0].trnSeq;
      // if (trnSeq == undefined || trnSeq == null) {
      //   dispatch(CreateChargeSlice.actions.showLeftClearTech("cleartech"));
      //   console.log(1);
      // } else {
      //   console.log(2);
      //   dispatch(CreateChargeSlice.actions.showLeftClearTech(""));
      //   dispatch(CreateChargeSlice.actions.ShowTrnSeq(trnSeq));
      // }
    };
    fetchData().catch(console.error);
  }, [appID.ID, render, appID.RenderAddTechLeft]);

  const [dataPostCategory, setDataPostCategory] = useState<
    Array<IDeleteVoiItem>
  >([]);
  const deleteVoiItem = new DeleteVoidItem();
  const voidExtraItem = new VoidExtraItem();
  let rvcNo = 5;
  const showClearAddTech = (employeeId: number) => {
    dispatch(CreateChargeSlice.actions.showFormRightTech(1000));

    const fetchData = async () => {
      deleteListItem
        .deleteListItem(
          rvcNo,
          employeeId,
          appID.IDItemInTiket.iteminfo.checkNo,
          appID.IDItemInTiket.iteminfo.originalAppointmentID
        )
        .then((res) => {
          setRender(!render);
        });
    };
    fetchData().catch(console.error);
  };

  return (
    <div className="overflow-auto  flex flex-col justify-start items-center">
      {dataListTicketDetail?.newFormatListTickets.map((posts) => {
        return (
          <div
            className="border-b-[1px] w-[97%] space-y-[1px]"
            key={posts.employeeId}
          >
            <div
              className={`flex justify-start 2xl:text-[18px] xl:text-[16px] md:text-[14px] text-[12px] py-2 pl-[10px]`}
              style={{
                background: `${theme.extend.colors["mango-gray-2"]}`,
              }}
            >
              <span className=" 2xl:text-[20px] xl:text-[15px] text-[12px] font-bold  mr-2 text-[#505050]">
                {appID.IDItemInTiket.iteminfo.customerName != null
                  ? appID.IDItemInTiket.iteminfo.customerName
                  : posts.customerName}
              </span>
              <span className="mr-2">|</span>
              <span className="text-[#505050] 2xl:text-[18px] xl:text-[13px] text-[12px]">
                #{posts.originalAppointmentID}
              </span>
            </div>
            {posts?.listTicketDetail.map((post, index) => {
              return (
                <div
                  key={index}
                  className="pt-4 pb-4"
                  style={{
                    background: `${theme.extend.colors["mango-gray-1"]}`,
                  }}
                >
                  <Row className=" flex justify-center items-center">
                    <Col span={16}>
                      <div className="flex ml-[10px] items-center">
                        <img
                          onClick={() => {
                            showClearAddTech(post.employeeId);
                          }}
                          className="2xl:w-[25px] 2xl:h-[25px] xl:w-[21px] xl:h-[21px] w-[18px] h-[18px] mr-2"
                          src={`${process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO}/Content/mango/General Assets/SVG/CheckOut/New24px-cancel-service-01.svg
                        `}
                        />
                        <span
                          className="font-bold ml-2 2xl:text-[16px] xl:text-[13px]
                          text-[11px] text-[#505050]"
                        >
                          {post?.tickets[0].employeeName.toUpperCase() ==
                          "NEXT AVAILABLE"
                            ? "ADD TECH"
                            : post?.tickets[0].employeeName.toUpperCase()}
                        </span>
                        <img src="" alt="" />
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="flex justify-between mr-2 items-center border-gray-500 ">
                        <div
                          className="w-[100px] h-[30px] border-[1px] rounded 
                           flex justify-center items-center "
                          style={{ backgroundColor: "#fff" }}
                        >
                          <span className="xl:text-[14px] md:text-[12px] text-[11px]">
                            S:{post?.tickets[0].stringISTime.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div
                            className=" text-zinc-500 border-2 flex justify-center items-center rounded-full 
                          2xl:h-[30px] 2xl:w-[30px] w-[24px] h-[24px] border-zinc-500"
                          >
                            <span
                              className="font-bold   
                          rounded-full border-current 2xl:text-[20px] text-[13px] text-[#505050]  "
                            >
                              P
                            </span>
                          </div>
                          <img
                            className="w-[25px] h-[25px]"
                            src={`${process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO}/Content/image/Checkout/FontAw/ellipsis-vertical.svg`}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {post.tickets.map((post) => {
                    return (
                      <Row
                        onClick={() => {
                          dispatch(
                            CreateChargeSlice.actions.ShowTrnSeq(post.orgTrnSeq)
                          );
                        }}
                        className="pt-[8px] flex justify-center items-center"
                        justify="space-between"
                        key={post.orgTrnSeq}
                      >
                        {/* <ModalChangeList /> */}
                        <Col span={16} className="">
                          <div className="flex ml-2 items-center">
                            <BiX
                              onClick={() => {
                                setRender(!render);
                                const fetchData = async () => {
                                  deleteVoiItem
                                    .deleteVoidItem(
                                      post.orgTrnSeq,
                                      appID.IDItemInTiket.iteminfo.checkNo
                                    )
                                    .then((res) => {
                                      dispatch(
                                        CreateChargeSlice.actions.showLeftAddTech(
                                          {
                                            showform: "AddTechLeft",
                                            IdRender: Math.random(),
                                          }
                                        )
                                      );
                                    });
                                };
                                fetchData().catch();
                                dispatch(
                                  CreateChargeSlice.actions.showFormRightTech(
                                    1000
                                  )
                                );
                              }}
                              style={{
                                color: "#f28500",
                              }}
                              className="2xl:w-[26px] 2xl:h-[26px] xl:w-[21px] xl:h-[21px] w-[18px] h-[18px] "
                            />
                            <div className="flex flex-col items-start justify-center">
                              <span className="2xl:text-[16px] xl:text-[13px] text-[12px] font-semibold ml-2 text-[#505050]">
                                {post.trnDesc}
                              </span>
                              {post.childExtra?.trnDesc == undefined ? null : (
                                <div className="flex justify-center items-center">
                                  <BiX
                                    onClick={() => {
                                      const fetchData = async () => {
                                        setRender(!render);
                                        voidExtraItem
                                          .voidExtraItem(
                                            post.childExtra?.trnSeq,
                                            rvcNo
                                          )
                                          .then((res) => {
                                            dispatch(
                                              CreateChargeSlice.actions.showLeftAddTech(
                                                {
                                                  showform: "AddTechLeft",
                                                  IdRender: Math.random(),
                                                }
                                              )
                                            );
                                            dispatch(
                                              CreateChargeSlice.actions.showFormRightTech(
                                                1000
                                              )
                                            );
                                          });
                                      };
                                      fetchData().catch();
                                    }}
                                    style={{
                                      color: "#ff4d7f",
                                    }}
                                    className="2xl:w-[26px] 2xl:h-[26px] xl:w-[21px] xl:h-[21px] w-[18px] h-[18px]"
                                  />
                                  <span className="text-[#ff4d7f] 2xl:text-[12px] xl:text-[11px] text-[9px] font-semibold">
                                    {post.childExtra?.trnDesc}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="flex justify-between mt-[5px] items-center">
                            <ModalModifyTime props={post.duration} />
                            <div className="flex flex-col justify-end items-end mr-4 ">
                              <span className="font-bold  2xl:text-lg xl:text-[15px] text-[12px] text-[#505050]">
                                ${post.itemPrice}.00
                              </span>
                              {post.childExtra?.baseSub == undefined ? null : (
                                <span className="text-[#ff4d7f] 2xl:text-[12px] xl:text-[11px] text-[9px] font-semibold">
                                  {post.childExtra?.baseSub}.00
                                </span>
                              )}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export default AddTechCreateCharge;
// childExtra
// TrnDesc
