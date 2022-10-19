import React, { useEffect, useState } from "react";
import { Row, Rate, Switch, Col, Tabs, Popover, Modal } from "antd";
import Profile from "./Profile";
import { GetCustomerInformation } from "services/Customers/GetCustomerInformation";
import Content from "src/components/AddNewTix/Content";
import {
  CustomerInformation,
  TechHistory,
} from "./DataStructures/DataInterfaces";
import { GetListFamily } from "services/Customers/GetListFamily";
import { useRouter } from "next/router";
import { CheckIn } from "services/Appointments/CheckIn";
import { useDispatch } from "react-redux";
import { CreateChargeSlice } from "../CreateCharge/CreateChargeSlice";
import ModalEnterReward from "./ModalEnterReward";
import { UpdatePoint } from "services/Customers/UpdatePoint";
import { messageSuccess } from "../MessageAlert";
import { EditCustomerInformation } from "services/Customers/EditCustomerInformation";
import ModelDeleteConfirm from "./ModelDeleteConfirm";
import { GetListServedByCustomerId } from "services/Employees/GetListServedByCustomerId";
import Ticket from "./Ticket"
import { SendSMSChangePasswordClient } from "services/Customers/SendSMSChangePasswordClient";

const { TabPane } = Tabs;
function index({ customerId }) {
  const getCustomerInformation = new GetCustomerInformation();
  const getListFamily = new GetListFamily();
  const [customerInfor, SetCustomerInfor] = useState<CustomerInformation>();
  const [familyMenberInfor, setFamilyMenberInfor] = useState<any>();
  const router = useRouter();
  const updatePoint = new UpdatePoint();
  const sendSMSChangePasswordClient = new SendSMSChangePasswordClient()
  const getListServedByCustomerId = new GetListServedByCustomerId();
  const editCustomerInformation = new EditCustomerInformation();
  const [open, setOpen] = useState(false);
  const [openModelReset, setOpenModelReset] = useState(false);
  const [pointReward, setPointReward] = useState<string>("0");
  const [point, setPoint] = useState<number>();
  const [pointRedeem, setPointRedeem] = useState<number>();
  const [paramData, setParamData] = useState<any>();
  const [reload, setReload] = useState<boolean>();

  const dispatch = useDispatch();

  const onChangeSwitch = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
  };
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalDel, setIsModalDel] = useState<boolean>(false);
  const [techHistory, setTechHistory] = useState<TechHistory[]>([]);
  // reset passwords
  const showModalReset = () => {
    setOpenModelReset(true);
  };
  const handleOkReset = () => {
    setOpenModelReset(false);
  };
  const handleCancelReset = () => {
    setOpenModelReset(false);
  };

  const handleOpenReset = (newOpen: boolean) => {
    setOpenModelReset(newOpen);
  };

  //Modal

  const [isModalAddNewBook, setIsModalAddNewBook] = useState(false);

  const showModal_AddBook = () => {
    setIsModalAddNewBook(true);
  };

  const handleOk_AddBook = () => {
    setIsModalAddNewBook(false);
  };
  const handleCancel_AddBook = () => {
    setIsModalAddNewBook(false);
  };

  //=============

  // edit rewards

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    setOpen(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setOpen(true);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  // delete client
  const showModalDel = () => {
    setIsModalDel(true);
  };
  const handleOkDel = () => {
    setIsModalDel(false);
  };
  const handleCancelDel = () => {
    setIsModalDel(false);
  };

  ////
  const onChange = (key: string) => {};
  useEffect(() => {
    try {
      getCustomerInformation.getCustomerInformation(customerId).then((res) => {
        if (res.status === 200) {
          SetCustomerInfor(res.data);
          setPoint(res.data.rewardsPoint);
          setPointRedeem(res.data.redeem);
        }
      });
      getListFamily.getListFamily(customerId).then((res) => {
        if (res.status === 200) {
          setFamilyMenberInfor(res.data);
        }
        getListServedByCustomerId
          .getListServedByCustomerId(customerId)
          .then((res) => {
            if (res.status === 200) {
              setTechHistory(res.data);
            }
          });
      });
    } catch (err) {
      console.log(err);
    }
  }, [customerId, reload]);
  const handleOnClickCheckIn = () => {
    router.push("/create-Charge");
    dispatch(CreateChargeSlice.actions.setshowFormLeft("login"));
    dispatch(
      CreateChargeSlice.actions.showLeftAddTech({
        showform: "techLeft",
      })
    );
    dispatch(CreateChargeSlice.actions.setshowLeftIdAddClient(false));
    dispatch(CreateChargeSlice.actions.showLeftClearTech(""));
    dispatch(CreateChargeSlice.actions.setShowFormRight("tech"));
    dispatch(CreateChargeSlice.actions.showFormRightTech(0));
  };

  const hide = () => {
    setOpen(false);
  };
  const intoPopover = () => {
    setOpen(true);
  };

  const handleDoneClick = () => {
    try {
      updatePoint.updatePoint(parseInt(pointReward), customerId).then((res) => {
        if (res.status === 200) {
          messageSuccess("Change Point Success");
          setPoint(res.data.point);
          setPointRedeem(res.data.redeem);
          hide();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handelSaveButton = () => {
    try {
      editCustomerInformation.editCustomerInformation(paramData).then((res) => {
        if (res.status === 200) {
          messageSuccess(res.data.data);
          setReload(!reload);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteButton = () => {
    showModalDel();
  };
  const handleSMSReset =() =>{
    sendSMSChangePasswordClient
    try {
      sendSMSChangePasswordClient.sendSMSChangePasswordClient(5,customerId, "sms" ).then((res) => {
        if (res.status === 200) {
          messageSuccess("Send SMS Successfull");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  const handleEmailReset =() =>{
    sendSMSChangePasswordClient
    try {
      sendSMSChangePasswordClient.sendSMSChangePasswordClient(5,customerId, "email" ).then((res) => {
        if (res.status === 200) {
          messageSuccess("Send Email Successfull");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  const contentResetPassword = (
    <div className="w-36 p-2 cursor-pointer -mt-4">
      <div className="flex text-mango-gray-6  p-2 hover:text-mango-primary-blue 
      items-center border-b border-mango-gray-3"
      onClick={handleSMSReset}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="currentColor"
          className="mr-2"
        >
          {" "}
          <g>
            {" "}
            <path fill="none" d="M0 0h24v24H0z" />{" "}
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477
             10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />{" "}
          </g>{" "}
        </svg>
        SMS
      </div>
      <div className="flex text-mango-gray-6 p-2 hover:text-mango-primary-blue items-center"
      onClick={handleEmailReset}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="currentColor"
          className="mr-2"
        >
          {" "}
          <g>
            {" "}
            <path fill="none" d="M0 0h24v24H0z" />{" "}
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />{" "}
          </g>{" "}
        </svg>
        EMAIL
      </div>
    </div>
  );

  const hanldeResetButton = () => {
    showModalReset();
  };

  const contentEditreward = (
    <div
      className="customer-info-edit-reward w-60 space-y-3 p-3 border-2 border-mango-gray-5 rounded-md cursor-default"
      onClick={intoPopover}
    >
      <div className="w-full flex justify-center text-mango-primary-blue text-lg -ml-4 ">
        REWARDS
      </div>
      <div className="w-full flex  relative ">
        <div className="text-center w-10/12">
          <img
            className="mx-auto "
            src="/assets/imgs/Clients/reward.svg"
            alt="reward"
          />
          <input
            value={pointReward}
            className="customer-info-edit-reward-list-reward-input "
            readOnly
          />
        </div>
        <div
          className="w-2/12 bottom-0  right-0 absolute cursor-pointer "
          onClick={showModal}
        >
          <img
            className="w-5 h-5 ml-3"
            src="/assets/imgs/Clients/020_Pencil13-13.svg"
          />
        </div>
      </div>
      <button
        className="customer-info-edit-reward-function-button "
        onClick={handleDoneClick}
      >
        DONE
      </button>
    </div>
  );

  const containerRewardEdit = (
    <div className="pop-containter-reward-point w-52">
      <input className="w-full"> as</input>
      <div></div>
    </div>
  );

  const buttonControll =
    "w-20 h-20 flex flex-col items-center cursor-pointer py-3 hover:bg-red-200 hover:rounded-md";
  return (
    <div>
    
      {customerInfor && (
        <>
          <div className="navigate-more-info flex mt-3 w-full">
            <div className="relative flex justify-start  w-1/3">
              <div className="avatar ml-10 ">
                <img
                  className="w-[90px] h-[90px] rounded-full "
                  src="/assets/imgs/MangoTech/male.svg"
                  alt="male"
                />
              </div>
              <div className="block ml-3 space-y-1">
                <div className="flex">
                  <div className="customer-name cursor-default">
                    {customerInfor.customerName}
                  </div>
                  <div className="ml-2 pt-1 customer-rate">
                    <Rate
                      style={{ color: "#7a878e" }}
                      disabled
                      value={5 || 0}
                    />
                  </div>
                </div>
                <div className="flex">
                  <span className="text-mango-primary-pink font-bold text-xl cursor-default">
                    Reward
                  </span>
                </div>

                <div className="flex">
                  <Switch defaultChecked onChange={onChangeSwitch} />{" "}
                  <span className="text-lg text-center ml-2 cursor-default">
                    Refuse to serve
                  </span>
                </div>

                <img
                  className=" absolute left-0 top-0 w-5 h-5 ml-3 cursor-pointer"
                  src="/assets/imgs/ImageIcon/close.svg"
                  alt="image close"
                  onClick={() => router.back()}
                />
              </div>
            </div>
            <div className="w-1/3 flex justify-center border border-dashed border-mango-gray-5 bg-white h-[70px]  info-rewards">
              <span className="w-full text-rewards cursor-default">
                REWARD POINTS{" "}
                <span className="text-mango-orange text-xl ">{point}</span>{" "}
              </span>
              <img
                className="ml-1"
                src="/assets/imgs/Clients/reward.svg"
                alt="reward"
              />
              <span className="w-full text-rewards cursor-default">
                READY TO REDEEM{" "}
              </span>
              <span className=" flex-wrap w-[160px] rewads-earned cursor-default">
                {pointRedeem}
              </span>
              <Popover
                content={contentEditreward}
                trigger="click"
                visible={open}
                onVisibleChange={handleOpenChange}
                placement="bottom"
              >
                <img
                  className="w-5 h-5 ml-3"
                  src="/assets/imgs/Clients/020_Pencil13-13.svg"
                />
              </Popover>
            </div>

            <div className="w-1/3 flex justify-end">
              <div className=" text-center mt-1 icon-tickets-details">
                <Row justify="space-evenly" className="space-x-5">
                  <Col span={3}>
                    <div
                      className={`${buttonControll}`}
                      onClick={handelSaveButton}
                    >
                      <img
                        className="ml-1 h-8 w-8"
                        src="/assets/imgs/Clients/save.svg"
                        alt="image close"
                      />
                      <span className="pop-text-2">Save</span>
                    </div>
                  </Col>

                  <Col span={3}>
                    <div className="w-24 h-20 flex flex-col items-center cursor-pointer py-3 hover:bg-red-200 hover:rounded-md">
                      <img
                        className="ml-1 h-8 w-8"
                        src="/assets/imgs/Clients/addmore.svg"
                        alt="image close"
                      />
                      <span className="pop-text-2">Add Member</span>
                    </div>
                  </Col>
                  <Col span={3}>
                    <div
                      className={`${buttonControll}`}
                      onClick={(e) => handleOnClickCheckIn()}
                    >
                      <img
                        className="ml-1 h-8 w-8"
                        src="/assets/imgs/check_in.svg"
                        alt="image close"
                      />
                      <span className="pop-text-2">Check in</span>
                    </div>
                  </Col>
                  <Col span={3}>
                    <div
                      className={`${buttonControll}`}
                      onClick={() => {
                        showModal_AddBook();
                     
                      }}
                    >
                      <img
                        className="ml-1 h-8 w-8"
                        src="/assets/imgs/Clients/clock.svg"
                        alt="image close"
                      />
                      <span className="pop-text-2">Book Appt</span>
                    </div>
                  </Col>
                  <Col span={3}>
                    <Popover
                      content={contentResetPassword}
                      trigger="click"
                      visible={openModelReset}
                      onVisibleChange={handleOpenReset}
                      placement="bottom"
                    >
                      <div
                        className={`${buttonControll}`}
                        onClick={hanldeResetButton}
                      >
                        <img
                          className="ml-1 h-8 w-8"
                          src="/assets/imgs/Clients/reset-password.svg"
                          alt="image close"
                        />
                        <span className="pop-text-2">Reset Pass</span>
                      </div>
                    </Popover>
                  </Col>
                  <Col span={3}>
                    <div
                      className={`${buttonControll}`}
                      onClick={handleDeleteButton}
                    >
                      <img
                        className="ml-1 h-8 w-8"
                        src="/assets/imgs/book/trash.svg"
                        alt="image close"
                      />
                      <span className="pop-text-2">Delete</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className=" tab-profile-ticket-rating-sms">
            <Tabs
              defaultActiveKey="1"
              onChange={onChange}
              className="w-full h-full flex justify-center custom-tabpane "
            >
              <TabPane
                tab={"PROFILE"}
                key="1"
                className="absolute left-[-0px] h-full w-full "
              >
                {/* {loading ? ( */}
                <div
                  style={{
                    width: "calc(100% + 0px)",
                    height: "calc(100vh - 150px)",
                  }}
                >
                  <Profile
                    customerInfor={customerInfor}
                    // familyMenberInfor={familyMenberInfor}
                    customerId={customerId}
                    setParamData={setParamData}
                    techHistory={techHistory}
                  />
                </div>
              </TabPane>
              <TabPane
                tab={"TICKET"}
                key="2"
                className="absolute left-[-0px] h-full w-full "
              >
                <Ticket  customerId={customerId}/>
              </TabPane>
              <TabPane
                tab={"RATING REVIEW"}
                key="3"
                className="absolute left-[-0px] h-full w-full"
              >
                {/* {" "}
{loading ? (
  <div
    className={flexitem}
    style={{ width: "calc(100% + 0px)", height: "calc(100vh - 150px)" }}
  >
    {listItem.map((index) => (
      <LoadingComponent key={index} />
    ))}
  </div>
) : (
  <TechTabLeftSalonCenter
    dataItem={dataBusy}
    setHeight={setHeight}
    height={height}
  />
)} */}
              </TabPane>
              <TabPane
                tab={"SMS & EMAIL"}
                key="4"
                className="absolute left-[-0px] h-full w-full"
              >
                {/* {" "}
{loading ? (
  <div
    className={flexitem}
    style={{ width: "calc(100% + 0px)", height: "calc(100vh - 150px)" }}
  >
    {listItem.map((index) => (
      <LoadingComponent key={index} />
    ))}
  </div>
) : (
  <TechTabLeftSalonCenter
    dataItem={dataBusy}
    setHeight={setHeight}
    height={height}
  />
)} */}
              </TabPane>
            </Tabs>
          </div>
          <div>
            {/* tab 1 */}
            <div></div>
            {/* tab 2 */}
            <div></div>
            {/* tab 3 */}
            <div></div>
          </div>
          {/* </form> */}
        
      

      <ModalEnterReward
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        setPointReward={setPointReward}
      />
      <ModelDeleteConfirm
        visible={isModalDel}
        onOk={handleOkDel}
        onCancel={handleCancelDel}
        customerId={customerId}
      />
        <Content
        visible={isModalAddNewBook}
        onOk={handleOk_AddBook}
        onCancel={handleCancel_AddBook}
        isAddNew
        dataAddNew={{
          customerId: customerInfor.customerID ,
          customerName: customerInfor.customerName,
          timeAdd: "",
          techId: 9999,
          techName:  "NEXT AVAILABLE",
          appointmentId: 0,
          groupId: 0,
        }}
      />
      </>
      )}

    </div>
  );
}

export default index;
