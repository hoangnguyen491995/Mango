import { Col, Row } from "antd";
import { theme } from "tailwind.config";
import { RiPhoneFill } from "react-icons/ri";
import { GoEyeClosed, GoEye } from "react-icons/go";

import { MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import ModalProfileNote from "./ModalProfileNotes";
import { useDispatch, useSelector } from "react-redux";
import { CreateChargeSlice } from "../../../CreateChargeSlice";
import ModalChangeProfilePhoto from "./ModalChangeProfilePhoto";
import AddCategoris from "./AddCategories";
import { CreateCharge$ } from "src/redux/selector";
import { GetInfoForDetail } from "services/CreateCharge/GetInfoForDetail";
import { GetPointEarn } from "services/CreateCharge/GetPointEarn";
import Router, { useRouter } from "next/router";
import { UpdatePointEarnStatus } from "services/Employees/UpdatePointEarnStatus";
import { useAppSelector } from "src/redux/hook";
interface IIGetInforDetail {
  customerID: number;
  firstName: string;
  lastName: string;
  contactPhone: string;
  email: string;
  title: null;
  address: null;
  notes: string;
  lastNotes: string;
  customerName: string;
  totalSpentByYear: number;
  imageFileName: null;
  visitCount: null;
  fristVist: Date;
  lastVist: Date;
  favouritePolish: string;
  notesApp: null;
  coupon: string;
  point: number;
  memberStatus: string;
  ratingDate: null;
  rewardsMember: null;
  isClientVerify: null;
  memberID: string;
  verification: null;
  isVerifyPhoneWithMango: boolean;
  isChangePhoneWhenReward: null;
  isChangePhone: null;
  visitCountByYear: number;
  isBlackList: boolean;
  isVip: null;
  totalAmount: null;
  isRewardActive: string;
  pointEarn: number;
  isVoidEarnPoint: boolean;
}

function ModalClientDetail() {
  const appID = useSelector(CreateCharge$);

  const [isVoidRewardPoint, setIsVoidRewardPoint] = useState<boolean>(true);
  const [showPhone, setShowPhone] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleShowDetail = () => {
    dispatch(CreateChargeSlice.actions.setshowFormLeft("login"));
  };
  const handleShowSearch = () => {
    dispatch(CreateChargeSlice.actions.setshowFormLeft("search"));
  };
  const [dataInforDetail, setDataInforDetail] = useState<IIGetInforDetail>();
  const apiUpdatePointEarnStatus = new UpdatePointEarnStatus();
  let rdCusID = 0;
  const getInfoForDetail = new GetInfoForDetail();
  const goToDetailInfor = () => {
    router.push(`/Customer/${dataInforDetail?.customerID}`);
  };
  console.log("dataInforDetail", dataInforDetail);
  useEffect(() => {
    const fetchData = async () => {
      getInfoForDetail
        .getInfoForDetail(
          appID.IDItemInTiket.iteminfo.customerID,
          rdCusID,
          appID.IDItemInTiket.iteminfo.originalAppointmentID
        )
        .then((res) => {
          console.log(res);
          setDataInforDetail(res.data);
        });
    };
    fetchData().catch(console.error);
  }, [
    appID.IDItemInTiket.iteminfo.customerID,
    appID.IDItemInTiket.iteminfo.originalAppointmentID,
  ]);

  const [dataTotalPoints, setDataTotalPoints] = useState<number>(0);
  const getPointEarn = new GetPointEarn();
  useEffect(() => {
    if (isVoidRewardPoint) {
      getPointEarn
        .getPointEarn(
          appID.IDItemInTiket.iteminfo.originalAppointmentID,
          appID.IDItemInTiket.iteminfo.customerID,
          Number(process.env.NEXT_PUBLIC_RVC_NO)
        )
        .then((res) => setDataTotalPoints(res.data));
    }
  }, [isVoidRewardPoint]);
  // console.log("total points", dataTotalPoints);
  const handleShowPhone = () => {
    setShowPhone((showPhone) => !showPhone);
  };
  // console.log(dataInforDetail?.contactPhone);
  const customPhoneStart = dataInforDetail?.contactPhone?.slice(0, 3);
  const customePhoneMid = dataInforDetail?.contactPhone?.slice(3, 6);
  const customePhoneEnd = dataInforDetail?.contactPhone?.slice(6, 10);

  const customeHideStart = "(XXX)";
  const customeHideMid = "XXX";
  const note = dataInforDetail?.notesApp;
  const customerID = dataInforDetail?.customerID;
  const apptId = useAppSelector((state) => state.createCharge.apptId);
  const handleUpdateRewardPoints = () => {
    const body = {
      appointmentID: apptId,
      status: isVoidRewardPoint,
    };
    apiUpdatePointEarnStatus.updatePointEarnStatus(body).then((res) => {
      if (res.status == 200) {
        setDataTotalPoints(0);
        setIsVoidRewardPoint(!isVoidRewardPoint);
      }
    });
  };
  return (
    <div
      className="content-center items-center h-[275px]
     truncate rounded-lg xl:mx-[8px] mx-[4px]"
    >
      <img
        onClick={handleShowDetail}
        className="w-[25px] h-[25px] cursor-pointer"
        src={`${process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO}/Content/checkout/X_Symbol.svg`}
        alt=""
      />
      <Row className="">
        <Col
          span={14}
          className="border-b-[1px] border-dotted border-current justify-start "
        >
          <Row className="border-b-[1px] border-dotted border-current">
            <Col span={5}>
              <ModalChangeProfilePhoto props={dataInforDetail?.customerName} />
            </Col>
            <Col span={19} className="mb-[2px]">
              <Row>
                <Col span={24}>
                  <div className="flex justify-start">
                    <span
                      className=" font-semibold 2xl:text-[20px] xl:text-[16px]
                     text-[15px] ml-[2px] truncate text-[#505050]"
                    >
                      {dataInforDetail?.customerName}
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="flex justify-start ">
                    <RiPhoneFill
                      className=" xl:w-[18px] xl:h-[18px] min-w-[15px] min-h-[15px] "
                      style={{
                        marginTop: "2px",
                        color: "#505050",
                      }}
                    />
                    <span
                      className="2xl:text-[15px] xl:text-[13px] text-[11px] mr-3  "
                      style={{ minWidth: "125px" }}
                    >
                      {dataInforDetail?.contactPhone === ""
                        ? "Client No Phone"
                        : showPhone && dataInforDetail?.contactPhone !== ""
                        ? `(${customPhoneStart}) ${customePhoneMid} ${customePhoneEnd}`
                        : `${customeHideStart} ${customeHideMid} ${customePhoneEnd}`}
                      {/* {`(${customPhoneStart}) ${customePhoneMid} ${customePhoneEnd}`}
                      {`${customeHideStart} ${customeHideMid} ${customePhoneEnd}`} */}

                      {/* {dataInforDetail?.contactPhone != ""
                        ? dataInforDetail?.contactPhone
                        : "Client No Phone"} */}
                    </span>
                    {!showPhone && dataInforDetail?.contactPhone !== "" ? (
                      <GoEyeClosed
                        className=" xl:w-[18px] xl:h-[18px] min-w-[15px] min-h-[15px] cursor-pointer "
                        style={{
                          marginLeft: "2px",
                          marginTop: "2px",
                          color: "#505050",
                        }}
                        onClick={() => handleShowPhone()}
                      />
                    ) : (
                      <GoEye
                        className=" xl:w-[18px] xl:h-[18px] min-w-[15px] min-h-[15px] cursor-pointer "
                        style={{
                          marginLeft: "2px",
                          marginTop: "2px",
                          color: "#505050",
                        }}
                        onClick={() => handleShowPhone()}
                      />
                    )}
                  </div>
                </Col>
                <Col>
                  <span
                    style={{
                      color: `${theme.extend.colors["mango-primary-red"]}`,
                    }}
                    className="mr-8 2xl:text-[15px] xl:text-[13px] text-[11px] "
                  >
                    {dataInforDetail?.memberStatus}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className=" flex justify-between">
                <span className="2xl:text-[15px] xl:text-[13px] text-[11px]">
                  Last Visit :
                </span>
                <span className="font-semibold text-[#505050] 2xl:text-[15px] xl:text-[13px] text-[11px]">
                  {dataInforDetail?.lastVist != undefined
                    ? dataInforDetail?.lastVist.toString().split("T")[0]
                    : ""}
                </span>
              </div>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={24}>
              <div className=" flex justify-between">
                <span className="2xl:text-[15px] xl:text-[13px] text-[11px]">
                  Total Points :
                </span>
                <span className=" text-[#505050] font-semibold 2xl:text-[15px] xl:text-[13px] text-[11px]">
                  {dataInforDetail?.point}.00
                </span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={10} className="border-b-[1px] border-dotted border-current ">
          <Row justify="space-between">
            <Col span={16} className="text-sm mt-2 ">
              <div className="flex justify-start  ">
                <span className="font-semibold text-[#505050]">CATE</span>

                <MdAdd
                  onClick={handleShowSearch}
                  style={{
                    color: `${theme.extend.colors["mango-primary-blue"]}`,
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </Col>
            <Col span={8} className=" ">
              <div className="flex justify-end items-end cursor-pointer">
                <img
                  className="w-[26px] h-[26px]"
                  src={`${process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO}/Content/image/Checkout/FontAw/ellipsis.svg`}
                  alt=""
                  onClick={goToDetailInfor}
                />
              </div>
            </Col>
          </Row>
          {/* Add Categories */}
          <Row className="mt-[2px] ml-[2px]">
            <Col span={24}>
              <AddCategoris />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Row className="py-2 border-b-[1px] border-dotted border-current">
            <Col span={12} className="mt-[3px]">
              <div className="flex justify-start ">
                <span className="font-semibold text-[#505050] ">
                  Earning Points
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div className="flex justify-end ">
                <span
                  style={{ color: `${theme.extend.colors["mango-orange"]}` }}
                  className="mt-[4px] mr-4"
                >
                  {dataTotalPoints}
                </span>
                <button
                  onClick={handleUpdateRewardPoints}
                  style={{
                    background: ` ${
                      isVoidRewardPoint == false
                        ? theme.extend.colors["mango-primary-green"]
                        : "#fff"
                    }`,
                    color: `${isVoidRewardPoint == false ? "#fff" : "#555"}`,
                    width: "75px",
                    height: "32px",
                  }}
                  className=" rounded-md border-[1px] border-current font-semibold"
                >
                  {isVoidRewardPoint ? "VOID" : "ADD"}
                </button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-[5px]">
        <Col span={24}>
          <div className="flex">
            <img
              className="w-[28px] h-[28px] "
              src="/assets/imgs/ticket_note.svg"
              alt=""
            />
            <input
              className="w-full border-b-[1px] border-current ml-2"
              type="text h-[15px]"
              defaultValue={
                dataInforDetail?.notesApp != null
                  ? dataInforDetail?.notesApp
                  : ""
              }
            />
          </div>
        </Col>
      </Row>
      <div className="flex font-semibold justify-between mt-[8px] ">
        <span>Last note:</span>
        <span style={{ backgroundColor: "#fccfe6" }}>
          {dataInforDetail?.lastNotes}
        </span>
        <ModalProfileNote note={note} customerID={customerID} />
      </div>
    </div>
  );
}
export default ModalClientDetail;
