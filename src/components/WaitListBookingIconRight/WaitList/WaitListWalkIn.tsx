import { Col, Row } from "antd";
import { BiAlarmExclamation } from "react-icons/bi";
import { CgFolderAdd } from "react-icons/cg";
import { IPosts } from ".";
import { useState, useEffect } from "react";
import { API_MANGO_IMG } from "src/utils/constant";
import moment from "moment";
import { theme } from "tailwind.config";

const WaitListWalkIn = ({ walkIn }: any) => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  useEffect(() => {
    setPosts(walkIn as IPosts[]);
  }, [walkIn]);

  return (
    <div className="">
      <div>
        {posts.length > 0 &&
          posts.map((post: IPosts, index: number) => {
            if (post.bookType == 0) {
              return (
                <div
                  style={{ borderColor: "#8B85CA" }}
                  key={index}
                  className="mt-[5px]  border-l-[6px] leading-6 tracking-normal"
                >
                  <div className="ml-2 mb-2 border-b-[1px] py-2">
                    <Row>
                      <Col span={10}>
                        <span className="text-base">{post.customerName}</span>
                        <br />
                        <span
                          style={{
                            color: `${theme.extend.colors["mango-red-300"]}`,
                          }}
                        >
                          {post.customerType}
                        </span>
                      </Col>
                      <Col span={5}> </Col>
                      <Col span={4}>
                        <span className="text-xs text-stone-600">
                          {" "}
                          X:{post.checkinTime.split(" ")[1].split(":")[0]}:
                          {post.checkinTime.split(" ")[1].split(":")[1]}{" "}
                        </span>
                      </Col>
                      <Col span={5} style={{ display: "flex" }}>
                        <BiAlarmExclamation className="mt-[4px]" />
                        <span
                          style={{
                            color: `${theme.extend.colors["mango-primary-blue"]}`,
                          }}
                        >
                          {moment(`${post.startTime.slice(0, 10)}`, "YYYYMMDD")
                            .fromNow()
                            .slice(0, 7)}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18} className="truncate">
                        <span className="truncate text-stone-600">
                          {post.appointmentSubject == null
                            ? "..."
                            : post.appointmentSubject}
                        </span>
                      </Col>
                      <Col span={6}>
                        <img
                          className="ml-[35px] -mt-[20px]"
                          src={`${API_MANGO_IMG}/Content/image/MangoTech/addBook.svg`}
                          alt=""
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={20}>
                        {post.groupEmployeeDetail == "" ? (
                          <button className="shadow-md mt-2 max-w-[150px] px-4 rounded-md h-[30px] truncate  border border-green-300">
                            <span> NEXT AVAILABE </span>
                          </button>
                        ) : (
                          <div>
                            <button
                              className="max-w-[110px] px-4 rounded-md h-[30px] truncate mt-2 shadow-md mr-[2px]"
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
                                <div className="flex content-center justify-center ">
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
                                className="max-w-[110px] px-4 rounded-md h-[30px] truncate mt-2 shadow-md"
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
                      </Col>
                      <Col span={3}>
                        {post.groupEmployeeDetail == "" ? (
                          <img
                            className="-mt-2 ml-[2px] hover:opacity-40"
                            src={`${API_MANGO_IMG}/Content/image/MangoTech/addTechStart.svg`}
                            alt=""
                          />
                        ) : (
                          <img
                            className="-mt-2 ml-[2px] hover:opacity-40"
                            src={`${API_MANGO_IMG}/Content/image/MangoTech/start-one.svg`}
                            alt=""
                          />
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default WaitListWalkIn;
