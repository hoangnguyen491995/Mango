import { Col, Popover, Row } from "antd";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { RiFileSearchLine } from "react-icons/ri";
import { BsBoxArrowInDownLeft } from "react-icons/bs";
import { TbTextWrapDisabled } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { MenuSalonCenterSlice } from "./MenuSalonCenterSlice";
import { IShowFullScreen } from "pages/salon-center";
interface IProps {
  setHeight: Function;
  height: boolean;
  setIsReadyBusy: Function;
  isReadyBusy: boolean;
  showFullScreen: IShowFullScreen;
  setShowFullScreen: Function;
}
const classNameTabPane =
  "px-2 h-[55px] flex items-center border-dotted  hover:text-sky-500 hover:bg-slate-100";
const spaceText = "text-left pl-2";
function MenuSalonCenter({
  setHeight,
  height,
  setIsReadyBusy,
  isReadyBusy,
  showFullScreen,
  setShowFullScreen,
}: IProps) {
  const dispatch = useDispatch();
  const [size, setSize] = useState<string>("big");
  const [show, setShow] = useState<boolean>(true);

  const handleChangeStatusShowTech = () => {
    setIsReadyBusy(!isReadyBusy);
  };

  const handleChangeSize = () => {
    setHeight(!height);
    if (size == "big") {
      setSize("small");
    } else {
      setSize("big");
    }
    dispatch(MenuSalonCenterSlice.actions.setSizeItem(size));
  };

  const handleShowRightSaloncenter = () => {
    setShowFullScreen((prev) => ({
      ...prev,
      showLeftTechFull: true,
      showCenterInPenFull: false,
      showRightWaitFull: false,
    }));
  };

  const content = (
    <div
      className="h-full w-[200px] rounded"
      style={{ font: "normal normal 600 var(--s-14)" }}
    >
      <div className={" border-b-2  " + classNameTabPane}>
        <button onClick={handleChangeSize} className="w-full h-[35px]">
          <Row>
            <Col span={4} className="pl-2 ">
              {height ? (
                <img src="/assets/imgs/minimize.svg" alt="error" />
              ) : (
                <img src="/assets/imgs/Full-Size.svg" alt="error" />
              )}
            </Col>
            <Col span={20} className={spaceText}>
              {size === "big" ? <span>Minimize</span> : <span>Full Size</span>}
            </Col>
          </Row>
        </button>
      </div>
      <div className={" border-b-2  " + classNameTabPane}>
        <button
          className="w-full h-[35px]"
          onClick={handleShowRightSaloncenter}
        >
          <Row>
            <Col span={4} className="pl-2 ">
              <img
                src="/assets/imgs/Configuration.svg"
                className="h-[20px]"
                alt="error"
              />
            </Col>
            <Col span={20} className={spaceText}>
              <span>AdJust Turn</span>
            </Col>
          </Row>
        </button>
      </div>

      {/* <div className={" border-b-2  " + classNameTabPane}>
        <button className="w-full h-[35px]">
          <Row>
            <Col span={4} className="pl-2 ">
              <RiFileSearchLine className=" w-[25px] h-[25px]" />
            </Col>
            <Col span={20} className={spaceText}>
              <span>Turn Tracker</span>
            </Col>
          </Row>
        </button>
      </div> */}
      <div className={classNameTabPane}>
        <button
          className="w-full h-[35px]"
          onClick={handleChangeStatusShowTech}
        >
          <Row>
            <Col span={4} className="pl-2">
              {isReadyBusy ? (
                <img
                  src="/assets/imgs/icon-Clock-in-Clock-out.svg"
                  className=" flex items-center h-[35px]"
                  alt="error"
                />
              ) : (
                <img
                  src="/assets/imgs/icon-ready-busy.svg"
                  alt="error"
                  className=" flex items-center h-[35px]"
                />
              )}
            </Col>
            <Col span={20} className={spaceText}>
              {isReadyBusy ? (
                <p className="">Show Clocked In/ Clocked out </p>
              ) : (
                <p className="mt-2 ">Show Ready/ Busy </p>
              )}
            </Col>
          </Row>
        </button>
      </div>
    </div>
  );

  return (
    <div className="demo ">
      <Popover placement="bottomRight" content={content} trigger="click">
        <AiOutlineMenu className="w-[20px] h-[20px] cursor-pointer ml-[4px] " />
      </Popover>
    </div>
  );
}

export default MenuSalonCenter;
