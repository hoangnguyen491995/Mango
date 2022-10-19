import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { BiAlarmExclamation } from "react-icons/bi";
import { IPosts } from ".";
import { API_MANGO_IMG } from "src/utils/constant";
import moment from "moment";
import { theme } from "tailwind.config";

const WaitListAll = ({ all }: any) => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setPosts(all as IPosts[]);
  }, [all]);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post: IPosts, index: number) => {
          return (
            <div
              key={index}
              style={{
                borderColor: ` ${post.bookType == 0 ? "#8B85CA " : " #00BED6"}`,
              }}
              className={`mt-[5px]  border-l-[6px] leading-6 tracking-normal border-b-color-black   `}
            >
              <div className="ml-2 mb-2 border-b-[1px] py-2 ">
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
                  <Col span={5}></Col>
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
                      {" "}
                      {moment(`${post.startTime.slice(0, 10)}`, "YYYYMMDD")
                        .fromNow()
                        .slice(0, 7)}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={18} className="truncate">
                    <span className="truncate text-stone-600 w-full">
                      {post.appointmentSubject == null
                        ? "..."
                        : post.appointmentSubject}
                    </span>
                  </Col>
                  <Col span={6}>
                    {post.bookType == 0 ? (
                      <img
                        className="ml-8 -mt-[20px]"
                        src={`${API_MANGO_IMG}/Content/image/MangoTech/addBook.svg`}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={20}>
                    {post.groupEmployeeDetail == "" ? (
                      <button className="mt-2 w-[120px] rounded-md h-[30px] truncate border border-green-300">
                        <span> NEXT AVAILABE</span>
                      </button>
                    ) : (
                      <div>
                        <button
                          className=" max-w-[110px] px-4 rounded-md h-[30px] truncate mt-2 shadow-md mr-[2px] "
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
                            className="w-full rounded-md h-[30px] truncate mt-2 shadow-md max-w-[110px] px-4"
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
        })}
    </div>
  );
};

export default WaitListAll;
