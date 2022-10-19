import { Popover } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import ModalAppointmentShedulerDetail from "../Book/ModalAppointmentShedulerDetail";
import { IItem } from "./DataStructures";
import EyeShowPhone from "./EyeShowPhone";
import ImageTech from "./ImageTech";
import useOnclickOutside from "react-cool-onclickoutside";

interface Props {
  info: IItem;
  key: number;
}
const ItemTicket = ({
  info,
  key,
  setIsClickItem,
  isClickItem,
  appoimentIdClick,
  setAppoimentIdClick,
}) => {
  const bordeColor = (info) => {
    return info.backGroundColor == "#FFFFFF" || info.backGroundColor == ""
      ? "#93D500"
      : info.backGroundColor;
  };
  const toDate = (dateStr) => {
    // const [day, month, year] = dateStr.split("-");
    return new Date(dateStr);
  };

  const [open, setOpen] = useState(false);

  const ref = useOnclickOutside(
    () => {
      // setIsActive(false)
    },
    { ignoreClass: "ant-popover-inner-content" }
  );

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    setIsClickItem(newOpen);
  };

  const getStatusAppt = (info: IItem) => {
    switch (info.ticketstatus) {
      case 2:
        return "Checked In";
      case 3:
        return "In Service";
      case 8:
        return "Pending";
      case 7:
        return "Closed";
      case 9:
        return "Canceled";
      case 4:
        return "No Show";
      default:
        return "";
    }
  };
  const textColor = (info) => {
    return info.color == "#FFFFFF" || info.color == "" ? "black" : "white";
  };
  return (
    <Popover
      key={key}
      visible={open}
      onVisibleChange={handleOpenChange}
      overlayClassName="p-0 m-0"
      placement={"bottomLeft"}
      content={
        <ModalAppointmentShedulerDetail appointmentId={info.appointmentId} />
      }
      trigger={"click"}
    >
      <div
        style={{
          borderLeftColor: bordeColor(info),
        }}
        className={
          "box-body-listview py-auto flex border-l-[10px] h-[62px]  items-center " +
          " hover:cursor-pointer hover:shadow-md hover:shadow-mango-gray-300 border-mango-gray-1 border " +
          // bordeColor(info) +
          `${
            isClickItem == true
              ? open == true
                ? "bg-white"
                : appoimentIdClick == info.appointmentId
                ? "bg-white"
                : "bg-mango-gray-3 rounded-md"
              : "bg-white"
          }`
        }
        onClick={() => setAppoimentIdClick(info.appointmentId)}
      >
        <div
          className="w-1/12 box-body-listview pl-3"
          style={{ color: textColor(info) }}
        >
          {info.appointmentId}
        </div>
        <div
          className="flex w-[12%] h-full  items-center box-body-listview  "
          style={{ color: textColor(info) }}
        >
          <ImageTech
            resource={info.resource}
            nickName={info.nickName}
            border={info.border}
            imageFileName={info.imageFileName}
            backGroundColor={info.backGroundColor}
            color={info.color}
          />
        </div>
        <div
          className="w-1/12  box-body-listview"
          style={{ color: textColor(info) }}
        >
          {info.isRequestTech == 1 && (
            <svg
              className="justify-between"
              xmlns="http://www.w3.org/2000/svg"
              width="18.042"
              height="18.044"
              viewBox="0 0 18.042 18.044"
            >
              <g
                id="heart"
                transform="translate(-493.87 -570.984)"
                opacity="0.8"
              >
                <g
                  id="like_1_"
                  data-name="like (1)"
                  transform="translate(493.57 571.186)"
                >
                  <path
                    id="Path_8232"
                    data-name="Path 8232"
                    d="M18.142,8.463A8.663,8.663,0,0,0,9.321,0,8.663,8.663,0,0,0,.5,8.463v.015a8.326,8.326,0,0,0,2.768,
       6.156v2.133a.864.864,0,0,0,.864.876.859.859,0,0,0,.456-.131L6.3,16.44a9.057,9.057,0,0,0,3,.51h.013l.17,
       0a8.663,8.663,0,0,0,8.656-8.465V8.463ZM14.759,13.8a7.583,7.583,0,0,1-5.428,2.119H9.3a8.026,8.026,0,0,
       1-2.772-.492.753.753,0,0,0-.662.068L4.3,16.47V14.508a.757.757,0,0,0-.261-.571A7.291,7.291,0,0,1,1.535,
       8.48,7.628,7.628,0,0,1,9.311,1.035h.02a7.628,7.628,0,0,1,7.776,7.44A7.579,7.579,0,0,1,14.759,13.8Zm0,0"
                    transform="translate(0 0)"
                    fill="white"
                    stroke="white"
                    strokeWidth="0.4"
                  />
                  <path
                    id="Path_8233"
                    data-name="Path 8233"
                    d="M139.386,144.184a2.739,2.739,0,0,0-1.711.59,3.266,3.266,0,0,0-.4.368,
      3.252,3.252,0,0,0-.4-.368,2.74,2.74,0,0,0-1.711-.59,2.909,2.909,0,0,0-2.164.943,3.329,3.329,0,0,
      0-.849,2.273c0,1.885,1.445,3.116,3.445,4.821.328.28.7.6,1.087.935a.9.9,0,0,0,1.186,0c.389-.34.76-.656,
      1.087-.935,2-1.7,3.445-2.936,3.445-4.821a3.33,3.33,0,0,0-.849-2.273A2.91,2.91,0,0,0,139.386,144.184Zm-1.235,
      7.094c-.267.228-.564.481-.877.752-.311-.27-.609-.523-.877-.752-1.877-1.6-3.01-2.565-3.01-3.879a1.822,1.822,0,
      0,1,1.775-1.978,1.509,1.509,0,0,1,.954.331,2.381,2.381,0,0,1,.564.655.693.693,0,0,0,1.19,0,2.383,2.383,0,0,1
      ,.564-.654,1.508,1.508,0,0,1,.954-.331,1.822,1.822,0,0,1,1.775,1.978C141.161,148.713,140.028,149.678,138.151,
      151.278Zm0,0"
                    transform="translate(-127.953 -139.97)"
                    fill="white"
                    stroke="#white"
                    strokeWidth="0.4"
                  />
                </g>
                <path
                  id="Path_8236"
                  data-name="Path 8236"
                  d="M197.144,4132.626c.306.6,1.987-1.684,3.08-.377s1.742,3.6-3.177,6.289c-3.741-3.275-4.893-4.016-3.151-6.289l1.625-.737Z"
                  transform="translate(305.919 -3555.373)"
                  fill="white"
                />
              </g>
            </svg>
          )}
        </div>
        <div
          className="w-[20%] box-body-listview  h-11 pr-2 overflow-hidden text-ellipsis flex"
          style={{ color: textColor(info) }}
        >
          <p className="mt-auto">{info.services}</p>
        </div>
        <div
          className="w-1/12  box-body-listview "
          style={{ color: textColor(info) }}
        >
          {info.duration} min
        </div>
        <div
          className="w-1/12  box-body-listview "
          style={{ color: textColor(info) }}
        >
          {info.name}
        </div>
        <div
          className={`flex w-1/12  box-body-listview  show-phone-${key}  items-center`}
          style={{ color: textColor(info) }}
          // onClick={ ()=> setOpen(false)}
        >
          {info.clientPhone == "" || info.clientPhone == null ? (
            "Client No Phone"
          ) : (
            <EyeShowPhone
              idAppt={info.appointmentId}
              phoneHidden={info.clientPhone}
            />
          )}
          {/* <EyeShowPhone idAppt={info.appointmentId} phoneHidden={0} /> */}
        </div>
        <div
          className="w-1/12  box-body-listview "
          style={{ color: textColor(info) }}
        >
          {moment(toDate(info.serviceDateString)).format("ddd, DD MMM YYYY")}
        </div>
        <div
          className="w-1/12  box-body-listview "
          style={{ color: textColor(info) }}
        >
          {info.begins}
        </div>
        <div
          className="w-1/12  box-body-listview  flex mt-4"
          style={{ color: textColor(info) }}
        >
          {getStatusAppt(info) != "" && (
            <p
              className={
                " text-center font-bold py-2.5 text-mango-gray-5 border  border-dashed shadow-lg  rounded-full w-[120px] " +
                (getStatusAppt(info) == "Pending"
                  ? "border-mango-primary-red"
                  : getStatusAppt(info) == "Checked In"
                  ? "border-mango-primary-blue"
                  : "border-mango-text-dark")
              }
              style={{ boxShadow: "inset 0px 3px 6px #00000040" }}
            >
              {getStatusAppt(info)}
            </p>
          )}
        </div>
      </div>
    </Popover>
  );
};

export default ItemTicket;
