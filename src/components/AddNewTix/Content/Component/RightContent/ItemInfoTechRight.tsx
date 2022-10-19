import { Badge, Col } from "antd";
import { useState } from "react";
import { API_MANGO_IMG, API_MANGO_TECH_IMG } from "src/utils/constant";
import { theme } from "tailwind.config";
import moment from "moment";
import { AddWaitEmployee } from "services/Appointments/AddWaitEmployee";
import { CreateCharge$ } from "src/redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { setIsChangeData } from "src/components/CreateCharge/createcharge-slice";
import { useAppSelector } from "src/redux/hook";
interface IGetCheckOut {}
const ItemInfoTechRight = ({ post, dataCheckOut }) => {
  const [checkImage, setCheckImage] = useState<boolean>(false);
  const showForm = useSelector(CreateCharge$);
  const dispatch = useDispatch();
  // console.log("post", post);

  let rvcNo = 5;
  let isStart = false;
  const addWaitEmployee = new AddWaitEmployee();
  const apptId = useAppSelector((state) => state.createCharge.apptId);
  const handleAddTech = (employeeID: number) => {
    const fetchData = async () => {
      addWaitEmployee
        .addWaitEmployee(apptId, employeeID, rvcNo, isStart)
        .then((res) => {
          dispatch(setIsChangeData());
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

  return (
    <Col
      key={post.employeeID}
      onClick={() => {
        handleAddTech(post.employeeID);
      }}
      className={
        ` relative h-[118px] w-[105px] rounded-md mt-7 mb-4 shadow-2xl flex justify-center items-center cursor-pointer select-none ml-2  ` +
        (post.isServing == 1 && " busy-tech ")
      }
      style={{
        border: `2px solid ${post.borderColor} `,
        backgroundColor: `${post.backGroundColor}`,
      }}
    >
      {/* 6b6b6b */}
      <div
        className={"absolute inset-x-0 inset-y-0 left-3 -top-7 "}
        style={{ height: "70px" }}
      >
        <div
          className={
            "hover:opacity-80 text-lg font-bold  rounded-full w-[80px] h-[80px] shadow-md  flex justify-center items-center -top-0 absolute bg-gray-200 " +
            (post.isServing === 1 && " busy-img ")
          }
        >
          {checkImage ? (
            <p
              className={
                " text-lg flex justify-center items-center  font-bold absolute inset-x-0 inset-y-0  rounded-full w-[80px] h-[80px] shadow-md "
              }
              style={{ color: "#94d514" }}
            >
              {post.employeeName.slice(0, 1).toUpperCase()}
            </p>
          ) : (
            <div>
              <img
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={
                  " hover:opacity-80 rounded-full w-[80px] h-[80px]  " +
                  (post.imageFileName == "Content/mango/camera.svg"
                    ? "mt-8 bg-white"
                    : post.rowIndex < 999
                    ? "mt-8"
                    : "")
                }
                src={
                  post.imageFileName == "Content/mango/camera.svg"
                    ? `${API_MANGO_IMG}/${post.imageFileName}`
                    : `${API_MANGO_TECH_IMG}/${post.imageFileName}`
                }
                onError={() => setCheckImage(true)}
                alt=""
              />
              {post.imageFileName == "Content/mango/camera.svg" && (
                <Badge
                  showZero
                  style={{
                    background: `${theme.extend.colors["mango-primary-green"]}`,
                    color: "#fff",
                    position: "absolute",
                    bottom: "15px",
                    left: "15px",
                  }}
                  count={0}
                  offset={[10, 10]}
                ></Badge>
              )}
              {post.rowIndex && post.rowIndex < 999 && (
                <Badge
                  showZero
                  style={{
                    background: `${theme.extend.colors["mango-primary-green"]}`,
                    color: "#fff",
                    position: "absolute",
                    bottom: "15px",
                    left: "15px",
                  }}
                  count={0}
                  offset={[10, 10]}
                ></Badge>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="font-semibold">
        {post.imageFileName == "Content/mango/camera.svg" ? (
          <p
            className="mb-0 px-[4px] "
            style={{ fontSize: "12px", marginTop: "25px" }}
          >
            NONE TECH 
          </p>
        ) : (
          <div>
            <p
              className="mb-0 truncate w-full px-[4px]"
              style={{ fontSize: "13px", marginTop: "40px" }}
            >
              {post.employeeName.toUpperCase()}
            </p>
            <p
              className={
                " font-semibold text-center h-4 text-xs m-0 p-0 " +
                (post.backGroundColor === "#FFFFFF"
                  ? "text-black"
                  : "text-white")
              }
            >
              {post.lockIn && moment(post.lockIn).format("hh:mm:ss A")}
            </p>
          </div>
        )}
      </div>
    </Col>
  );
};
export default ItemInfoTechRight;
