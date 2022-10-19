import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { IPosts } from "src/components/WaitListBookingIconRight/WaitList";
import { API_MANGO_IMG } from "src/utils/constant";
import { theme } from "tailwind.config";

function OpenTicketInService({ all2 }: any) {
  const [posts, setPosts] = useState<IPosts[]>([]);
  useEffect(() => {
    setPosts(all2 as IPosts[]);
  }, [all2]);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex h-[700px] w-full overflow-x-scroll content-start flex-col flex-wrap justify-start items-start">
        {posts.length > 0 &&
          posts.map((post: IPosts, index) => {
            if (
              post.appointmentStatusID == 3 ||
              post.appointmentStatusID == 8
            ) {
              return (
                <Col
                  key={index}
                  className="w-[230px] h-[155px] m-[2px] rounded-md hover:shadow-2xl"
                  style={{
                    border: ` 1px solid   ${
                      post.bookType == 0 ? "#8B85CA " : " #00BED6"
                    }`,
                  }}
                  onClick={(e) => {
                    // console.log("ggrwegewgewfe", post.originalAppointmentID);
                    // console.log('hhhh',post.customerID)

                    if (post.customerID != 0) {
                      dispatch(
                        CreateChargeSlice.actions.setshowFormLeft("detail")
                      );
                      dispatch(
                        CreateChargeSlice.actions.showLeftAddTech({
                          showform: "AddTechLeft",
                        })
                      );
                    } else {
                      dispatch(
                        CreateChargeSlice.actions.setshowFormLeft("login")
                      );
                      dispatch(
                        CreateChargeSlice.actions.showLeftAddTech({
                          showform: "AddTechLeft",
                        })
                      );
                    }
                    dispatch(
                      CreateChargeSlice.actions.setshowIDItemInTiket({
                        iteminfo: {
                          customerID: post.customerID,
                          originalAppointmentID: post.originalAppointmentID,
                          customerName: post.customerName,
                          checkNo: post.checkNo,
                        },
                      })
                    );
                    dispatch(
                      CreateChargeSlice.actions.setShowFormRight("tech")
                    );
                    dispatch(
                      CreateChargeSlice.actions.setshowLeftIdAddClient(true)
                    );
                  }}
                >
                  <Row className="flex flex-col items-center mt-2 mb-[3px]">
                    <Col span={4}>
                      <div
                        style={{
                          background: ` ${
                            post.bookType == 0 ? "#8B85CA " : " #00BED6"
                          }`,
                        }}
                        className="w-[32px] h-[25px] rounded-r-2xl "
                      >
                        <span style={{ color: "#fff", fontWeight: "600" }}>
                          {post.indexNum}
                        </span>
                      </div>
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Col span={24}>
                          <div className="flex justify-start w-10/12 truncate border-b-[1px] border-slate-600">
                            <span
                              style={{ fontSize: "13px" }}
                              className="font-semibold truncate"
                            >
                              {post.customerName}
                            </span>
                          </div>
                        </Col>
                        <Col span={24}>
                          <div className="flex justify-start">
                            <span className=" text-xs">
                              {post.customerType}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className=" border-t-[1px] border-slate-400 ">
                    <Col span={24} className="ml-2 mt-[12px]">
                      <div className="flex justify-start">
                        {post.bookType == 1 && (
                          <span
                            className="text-xs font-semibold mr-2 mt-[4px]"
                            style={{
                              color: `${theme.extend.colors["mango-primary-blue"]}`,
                            }}
                          >
                            Appt:
                          </span>
                        )}
                        <span className="mr-[2px]">x:</span>
                        <span className="mt-[5px]" style={{ fontSize: "10px" }}>
                          {post.checkinTime.split(" ")[1].split(":")[0]}:
                          {post.checkinTime.split(" ")[1].split(":")[1]}{" "}
                        </span>
                      </div>
                    </Col>

                    <Col span={24} className="ml-2 mt-[3px]">
                      <div className="flex justify-start  truncate w-[160px]">
                        {post.appointmentSubject == null ? (
                          <span className="text-stone-600 text-xs font-semibold ">
                            {" "}
                            null
                          </span>
                        ) : (
                          <span className="text-stone-600 text-xs font-semibold truncate">
                            {post.appointmentSubject}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col span={24} className="ml-[3px] mt-[10px]">
                      <div className="flex justify-start ">
                        {post.groupEmployeeDetail == "" ? (
                          <button
                            className="mt-2 w-[120px] rounded-md h-[30px] truncate border"
                            style={{
                              borderColor: `${theme.extend.colors["mango-primary-green"]}`,
                            }}
                          >
                            <span className="text-xs font-bold">
                              {" "}
                              NEXT AVAILABE
                            </span>
                          </button>
                        ) : (
                          <div className="flex  justify-start ">
                            <button
                              className="max-w-[110px] px-4 rounded h-[30px] truncate mt-2 shadow-md mr-[2px] text-white font-semibold"
                              style={{
                                background: `${
                                  post.groupEmployeeDetail.split("|")[2]
                                }`,
                                color: `${
                                  post.groupEmployeeDetail.split("|")[2] ==
                                  "#FFFFFF"
                                    ? "#555"
                                    : "#fff"
                                }`,
                              }}
                            >
                              {post.groupEmployeeDetail
                                .split("|")[1]
                                .includes("*") ? (
                                <div className="flex content-center justify-center">
                                  {post.groupEmployeeDetail
                                    .split("|")[1]
                                    .slice(
                                      0,
                                      post.groupEmployeeDetail.split("|")[1]
                                        .length - 1
                                    )}
                                  <img
                                    className="ml-[3px]"
                                    src={`${API_MANGO_IMG}/Content/image/MangoTech/RQ.svg`}
                                    alt=""
                                  />
                                </div>
                              ) : (
                                post.groupEmployeeDetail.split("|")[1]
                              )}
                            </button>
                            {post.groupEmployeeDetail.split("|")[5] != null ? (
                              <button
                                className="max-w-[100px] px-4 rounded h-[30px] truncate mt-2 shadow-md mr-[2px] text-white font-semibold"
                                style={{
                                  background: `${
                                    post.groupEmployeeDetail.split("|")[5]
                                  }`,
                                  color: `${
                                    post.groupEmployeeDetail.split("|")[5] ==
                                    "#FFFFFF"
                                      ? "#555"
                                      : "#fff"
                                  }`,
                                }}
                              >
                                {post.groupEmployeeDetail
                                  .split("|")[4]
                                  .includes("*") ? (
                                  <div className="flex content-center justify-center ">
                                    {post.groupEmployeeDetail
                                      .split("|")[4]
                                      .slice(
                                        0,
                                        post.groupEmployeeDetail.split("|")[4]
                                          .length - 1
                                      )}
                                    <img
                                      className="ml-[3px]"
                                      src={`${API_MANGO_IMG}/Content/image/MangoTech/RQ.svg`}
                                      alt=""
                                    />
                                  </div>
                                ) : (
                                  post.groupEmployeeDetail.split("|")[4]
                                )}
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        )}{" "}
                      </div>
                    </Col>
                  </Row>
                </Col>
              );
            }
          })}
      </div>
    </div>
  );
}

export default OpenTicketInService;
