import React, { useEffect, useState, useContext } from "react";
import { Popover, message, Modal } from "antd";
import { CancelNoShow } from "services/Appointments/CancelNoShow";
import { CancelAppointment } from "services/Appointments/CancelAppointment";
import HomeContext from "../HomeContext";
import cc from "classnames";
import { messageSuccess } from "src/components/MessageAlert";
function ModelCancel({ appointmentId }) {
  const cancelNoShow = new CancelNoShow();
  const cancelAppointment = new CancelAppointment();
  const [visiblePopover, setVisiblePopover] = useState(false);
  const bookContext = useContext(HomeContext)[0];

  const handlePopoverChange = (newVisible: boolean) => {
    setVisiblePopover(newVisible);
  };
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const hide = () => {
    setVisiblePopover(false);
  };

  const handleClickNoShow = () => {
    try {
      cancelNoShow
        .postCancelNoShow(appointmentId, 1)
        .then((res) => {
          if (res.status === 200) {
            bookContext.dataInfoCalendar.map((data) => {
              if (data.appointmentId == appointmentId) {
                bookContext.setDataInfoCalendar(
                  bookContext.dataInfoCalendar.filter((item) => item !== data)
                );
              }
            });
            setTimeout(() => {
              messageSuccess("No Show Success");
            }, 1000);
          }
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClickCancel = () => {
    try {
      cancelAppointment
        .postCancelAppointment(appointmentId, 1, 1)
        .then((res) => {
          if (res.status === 200) {
            bookContext.dataInfoCalendar.map((data) => {
              if (data.appointmentId == appointmentId) {
                bookContext.setDataInfoCalendar(
                  bookContext.dataInfoCalendar.filter((item) => item !== data)
                );
              }
            });
            showModal();
            messageSuccess("Cancel Success");
          }
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelList = (
    <div
      className="bg-white customMessage divide-gray-100 w-auto rounded-md border border-mango-gray-2 "
      onClick={hide}
    >
      <ul className="text-base font-medium text-gray-600  ">
        <li
          onClick={handleClickNoShow}
          className="flex px-4 py-2 hover:bg-mango-gray-2  cursor-pointer hover:text-white hover:rounded-t-md "
        >
          <img
            className=" w-7 h-7   "
            src="/assets/imgs/book/Icon_no_show.svg"
            alt="Rounded avatar"
          ></img>
          No Show
        </li>
        <li
          className="flex px-4 py-2  hover:bg-mango-gray-2 cursor-pointer border-t hover:text-white "
          onClick={handleClickCancel}
        >
          <img
            className=" w-7 h-7   "
            src="/assets/imgs/book/canceled.svg"
            alt="Rounded avatar"
          ></img>
          Cancel
        </li>
      </ul>
    </div>
  );
  return (
    <Popover
      overlayClassName="p-0 m-0"
      placement="bottom"
      content={cancelList}
      trigger="click"
      onVisibleChange={handlePopoverChange}
      visible={visiblePopover}
    >
      <div
        className={`flex flex-col items-center justify-end cursor-pointer py-1 hover:bg-mango-gray-1 hover:rounded-md`}
        onClick={() => setVisiblePopover(false)}
      >
        <img
          style={{ width: "27px", height: "30px" }}
          src={`/assets/imgs/book/trash.svg`}
          alt=""
        />
        <span className="pop-text-1">Cancel</span>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
      >
        <p className="text-center text-xl font-medium">
          Choose send SMS or Email for customer?
        </p>
        <div className="flex justify-between mt-2 w-11/12 m-auto">
          <button
            className={cc(
              "inline-flex justify-center w-32  py-1 local-button",
              "font-medium  text-lg text-gray-900 active:bg-cyan-400",
              " bg-mango-primary-orange-2 rounded-md cursor-pointer shadow-md"
            )}
          >
            NONE
          </button>
          <button
            className={cc(
              "inline-flex justify-center w-32  py-1 local-button",
              "font-medium  text-lg text-gray-900 active:bg-cyan-400",
              "bg-mango-primary-orange-1 rounded-md cursor-pointer shadow-md"
            )}
          >
            SMS
          </button>
          <button
            className={cc(
              "inline-flex justify-center w-32  py-1 local-button",
              "font-medium  text-lg text-gray-900 ",
              "bg-mango-primary-blue rounded-md cursor-pointer shadow-md"
            )}
          >
            EMAIL
          </button>
        </div>
      </Modal>
    </Popover>
  );
}

export default ModelCancel;
