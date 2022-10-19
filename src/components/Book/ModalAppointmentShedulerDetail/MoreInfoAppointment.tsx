import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { RiPhoneFill } from "react-icons/ri";
import { GetForAptSchedulerDetail } from "services/GetAppointmentShedulerDetail/GetForAptSchedulerDetail";
import { theme } from "tailwind.config";
import Router from 'next/router'
import EyeShowPhone from "src/components/BookingListView/EyeShowPhone";
import moment from "moment";
import { currencyFormat } from "src/helper/General";
import { useDispatch } from "react-redux";
import { setPageCurrent } from "../book-slice";

interface IForAptSchedulerDetail {
  customerID:       number;
  firstName:        string;
  lastName:         string;
  contactPhone:     string;
  email:            string;
  rewardsPoint:     number;
  visitCountByYear: number;
  totalSpentByYear: number;
  fristVist:        Date;
  lastVist:         Date;
  favouritePolish:  string;
  favouriteTechs1:  string;
  favouriteTechs2:  string;
  favouriteTechs3:  string;
  imageFileName:    null | string;
  notes:            string;
  rvcNo:            number;
  rating:           number;
  isNew:            number;
  joinDate:         Date;
  customerName:     string;
}
let Img = process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO;

function MoreInfoAppointment(props) {

  let Group = 0; 
  const dispatch = useDispatch();
  const getForAptSchedulerDetail = new GetForAptSchedulerDetail();
  const [dataForAptSchedulerDetail, setDataForAptSchedulerDetail] =
    useState<IForAptSchedulerDetail>();
  useEffect(() => {
    const fetchData = async () => {
      getForAptSchedulerDetail
        .getForAptSchedulerDetail(props.appointmentId, Group)
        .then((res) => {setDataForAptSchedulerDetail(res.data.infoCustomers)
        });
    };
    fetchData().catch(console.error);
  }, []);

  const handleClickMoreInfo = (customerID) =>{
    Router.push(`/Customer/${customerID}`)
    dispatch(setPageCurrent(""))
  }

  return (
    <div>
      <div className="border-r-[1px] w-full">
        <Row>
          <Col span={5} className="mt-[8px]">
            <img
              src={`${Img}/Content/image/Apt/39_Cus.svg
              `}
              alt=""
              className="w-[55px] h-[50px]"
            />
          </Col>
          <Col span={19} className="pl-[5px]">
            <div className="w-[180px] truncate">
              <span className="font-bold opacity-90 text-base cursor-default ">
                {dataForAptSchedulerDetail?.customerName == undefined
                  ? " Non Infor"
                  : dataForAptSchedulerDetail?.customerName}
              </span>
              <div>
                <div className="flex ">
                  <RiPhoneFill
                    style={{ width: "18px", height: "18px" }}
                    className="mr-[5px] "
                  />
                   <p className=" pr-[5px] text-xs  uppercase pop-text cursor-default">
                            {props.customerPhone == "" ||
                            props.customerPhone == null ? (
                              "Client No Phone"
                            ) : (
                              <EyeShowPhone
                                idAppt={props.appointmentID}
                                phoneHidden={props.customerPhone}
                              />
                            )}
                          </p>
                 
                </div>
              </div>
              <span>Unknown</span>
            </div>
          </Col>
        </Row>
        <Row className="mr-4 mt-2">
          <Col span={24}>
            <div className="flex justify-between cursor-default">
              <span>First Visit </span>
              <span className="font-semibold">
                {dataForAptSchedulerDetail?.fristVist == undefined
                  ? "Unknown"
                  : moment(dataForAptSchedulerDetail?.fristVist).format("MM/DD/yyyy")}
              </span>
            </div>
            <div className="flex justify-between mt-[6px] ">
              <span>Last Visit</span>
              <span className="font-semibold">
                {dataForAptSchedulerDetail?.lastVist == undefined
                  ? "Unknown"
                  :  moment(dataForAptSchedulerDetail?.lastVist).format("MM/DD/yyyy")
                  }
              </span>
            </div>
            <div className="flex justify-between mt-[6px]  ">
              <span>Total YTD</span>
              <span className="font-semibold"> {currencyFormat(dataForAptSchedulerDetail?.totalSpentByYear || 0 ) }</span>
            </div>
            <div className="flex justify-between mt-[6px] ">
              <span>Reward Points</span>
              <span className="font-semibold">
                {dataForAptSchedulerDetail?.rewardsPoint == undefined
                  ? "0.0"
                  : dataForAptSchedulerDetail?.rewardsPoint}{" "}
              </span>
            </div>
            <div className="flex justify-between mt-[6px] ">
              <span>Favorite Polish</span>
              <span className="font-semibold">
                {dataForAptSchedulerDetail?.favouritePolish == undefined
                  ? "Unknown"
                  : dataForAptSchedulerDetail?.favouritePolish}
              </span>
            </div>
            <div className="flex justify-between mt-[6px] ">
              <span>Favorite Techs</span>
              <span className="font-semibold">
                {dataForAptSchedulerDetail?.favouriteTechs1 == undefined
                  ? "Unknown"
                  : dataForAptSchedulerDetail?.favouriteTechs1}
              </span>
            </div>
          </Col>
          <button
            className="border-[1px] py-[12px] w-[90%] rounded font-medium mt-[10px] ml-[12px]"
            style={{
              color: `${theme.extend.colors["mango-primary-blue"]}`,
              borderColor: `${theme.extend.colors["mango-primary-blue"]}`,
            }}
            onClick ={()=> handleClickMoreInfo(dataForAptSchedulerDetail?.customerID)}
          >
            MORE INFO{" "}
          </button>
        </Row>
      </div>
    </div>
  );
}
export default MoreInfoAppointment;
