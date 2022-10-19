import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSearchInfoClient } from "services/SearchClientList/clientList";
import UseSearch from "src/utils/UseSearch";
import { theme } from "tailwind.config";
import { CreateChargeSlice } from "../../../CreateChargeSlice";
import { CreateCharge$ } from "src/redux/selector";
import { GetCheckOutApptID } from "services/CreateCharge/GetCheckOutByAppointment";
import { FastRegister } from "services/CreateCharge/FastRegister";
interface SearchInforClient {
  customerID: number;
  customerName: string;
  contactPhone: string;
}
interface IGetCheckOutAppt {
  checkNo: number;
}

function LoginFormCreateCharge() {
  const appID = useSelector(CreateCharge$);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [valueSearch, setValueSearch] = useState<string>("");
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showListClient, setShowListClient] = useState<boolean>(false);
  const searchValue = UseSearch(valueSearch, 500);
  const getSearchInfoClient = new GetSearchInfoClient();
  const [dataSearchInfoClient, setDataSearchInfoClient] = useState<
    Array<SearchInforClient>
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      getSearchInfoClient
        .getSearchInfoClient(valueSearch)
        .then((res) => setDataSearchInfoClient(res.data));
    };
    fetchData().catch(console.error);
  }, [searchValue]);

  const dispatch = useDispatch();
  const handleShowDetail = () => {};
  const handleValueSearch = (e) => {
    setValueSearch(e.target.value);
  };
  const handleShowListClient = () => {
    setShowListClient((pre) => !pre);
  };
  // thêm client
  const [dataFastRegister, setDataFastRegister] = useState<Array<FastRegister>>(
    []
  );
  const fastRegister = new FastRegister();
  const onSubmit = (data) => {
    console.log(data);
    const fetchData = async () => {
      fastRegister
        .fastRegister({
          date: "",
          empId: 0,
          gender: true,
          firstName: data.FirstName,
          lastName: data.LastName,
          phone: data.Phone,
          sex: "",
          portalCode: "",
          isKid: true,
          rvcNo: 5,
        })
        .then((res) => {
          setDataFastRegister(res.data);
          dispatch(
            CreateChargeSlice.actions.setshowIDItemInTiket({
              iteminfo: {
                customerID: res.data.id,
                originalAppointmentID: appID.IDCheckoutCreateCharge,
                checkNo: dataCheckOutApptID?.checkNo,
              },
            })
          );
          dispatch(CreateChargeSlice.actions.setshowFormLeft("detail"));
        });
    };
    fetchData().catch(console.error);
  };
  // console.log("appID", appID);
  const handleLogin = () => {
    if (errors.FirstName) {
    }
  };
  //Call Api get checkNo
  const getCheckOutApptID = new GetCheckOutApptID();
  const [dataCheckOutApptID, setDataCheckOutApptID] =
    useState<IGetCheckOutAppt>();
  // console.log("dataCheckOutApptID", dataCheckOutApptID?.checkNo);
  useEffect(() => {
    if (appID.IDCheckoutCreateCharge) {
      const fetchData = async () => {
        getCheckOutApptID
          .getCheckOutApptID(appID.IDCheckoutCreateCharge)
          .then((res) => setDataCheckOutApptID(res.data));
      };
      fetchData().catch(console.error);
    }
  }, [appID.IDCheckoutCreateCharge]);
  // console.log(appID.IDCheckoutCreateCharge);
  // console.log("showListClient", showListClient);
  return (
    <div>
      <div className="border-b-[1px] border-current">
        <input
          value={valueSearch}
          onChange={handleValueSearch}
          className="w-[95%] rounded-t-lg outline-none h-[40px] placeholder:text-slate-400"
          placeholder="Search Name/ Phone "
          onFocus={() => setShowLogin(false)}
          onClick={handleShowListClient}
          id="inputSearchNamePhone"
          style={{ fontSize: "15px", color: "#757575", fontWeight: "bold" }}
        />
      </div>
      {showLogin == false ? (
        <button
          style={{
            color: `${theme.extend.colors["mango-primary-blue"]}`,
          }}
          className="bg-sky-100 w-full h-[30px] font-semibold 2xl:text-[16px] text-[14px] "
          onClick={() => setShowLogin(true)}
        >
          {" "}
          ADD CLIENT{" "}
        </button>
      ) : (
        ""
      )}
      {showLogin && (
        <Row className="mt-2 ">
          <Col span={24}>
            <div className="flex ml-4">
              <p
                className={`font-semibold mt-[2px]`}
                style={{
                  color: `${theme.extend.colors["mango-primary-blue"]}`,
                }}
              >
                NEW ClIENT
              </p>
            </div>
          </Col>
        </Row>
      )}
      {showLogin == true ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col items-center justify-center px-4"
        >
          <div className="flex justify-between">
            <input
              {...register("FirstName", { required: true, max: 10 })}
              placeholder="First Name*"
              id="text"
              className="w-full h-[35px] outline-none placeholder:italic border-b-[1px] py-4 2xl:mr-14 xl:mr-12 mr-6 "
            />
            <input
              {...register("LastName", { required: true })}
              placeholder="Last Name"
              id="text"
              className="w-full h-[35px] outline-none border-b-[1px] py-4"
            />
          </div>

          <input
            {...register("Phone", { required: true })}
            placeholder="Phone"
            className="h-[35px] mt-2 w-full outline-none border-b-[1px] py-4"
            maxLength={10}
          />

          <button
            onClick={handleLogin}
            style={{
              background: `${theme.extend.colors["mango-primary-blue"]}`,
            }}
            className="py-3 font-medium text-white rounded items-center justify-center mt-6 w-full"
          >
            <span style={{ color: "#fff" }}>SAVE</span>
          </button>
        </form>
      ) : (
        <div className="font-semibold text-xl text-zinc-400  max-h-[192px] overflow-auto ">
          {dataSearchInfoClient != null && showListClient ? (
            <div>
              {dataSearchInfoClient.map((post: SearchInforClient) => {
                // console.log(post);
                return (
                  <div key={post.customerID}>
                    <button
                      onClick={() => {
                        dispatch(
                          CreateChargeSlice.actions.setshowFormLeft("detail")
                        );
                        dispatch(
                          CreateChargeSlice.actions.setshowLeftIdAddClient(true)
                        );
                        dispatch(
                          CreateChargeSlice.actions.showLeftAddTech({
                            showform: "AddTechLeft",
                          })
                        );
                        dispatch(
                          CreateChargeSlice.actions.setshowIDItemInTiket({
                            iteminfo: {
                              customerID: post.customerID,
                              originalAppointmentID:
                                appID.IDCheckoutCreateCharge,
                              customerName: post.customerName,
                              checkNo: dataCheckOutApptID?.checkNo,
                            },
                          })
                        );
                      }}
                      className="w-full bg-white h-8 hover:bg-cyan-200 border-t border-dashed "
                    >
                      <Row className=" justify-end flex font-semibold">
                        <Col span={24} className=" text-sm ">
                          <div className="flex justify-between">
                            <span className="truncate ml-2 2xl:text-[14px] text-[12px]">
                              {post.customerName}
                            </span>
                            <span className="truncate mr-2 2xl:text-[14px] text-[12px]">
                              {/* {post.contactPhone !== ""
                                ? post.contactPhone.slice(0, 3)
                                : "client no phone"} */}
                              {/* ({post.contactPhone.slice(0, 3)}){" "}
                              {post.contactPhone.slice(3, 6)} {""}{" "}
                              {post.contactPhone.slice(6, 10)} */}
                              {post?.contactPhone === "Client No Phone"
                                ? "Client No Phone"
                                : post?.contactPhone === ""
                                ? ""
                                : `(${post?.contactPhone.slice(
                                    0,
                                    3
                                  )}) ${post?.contactPhone.slice(
                                    3,
                                    6
                                  )}-${post?.contactPhone.slice(6, 10)}`}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <span> No DATA</span>
          )}
        </div>
      )}
    </div>
  );
}
export default LoginFormCreateCharge;
