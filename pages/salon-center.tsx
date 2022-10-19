import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Row, Timeline } from "antd";
import { useEffect, useState } from "react";
import BatchTipIconLeft from "src/components/BatchTipIconLeft";
import { setPageCurrent } from "src/components/Book/book-slice";
import { TechSalonCenter } from "src/components/SalonCenter/LeftContentSalonCenter";

import { InServiceSalonCenter } from "src/components/SalonCenter/RightContent";
import { useDispatch } from "react-redux";
import { WaitListBookingIconRight } from "src/components/WaitListBookingIconRight";


export interface IShowFullScreen {
  showLeftTechFull: boolean;
  showCenterInPenFull: boolean;
  showRightWaitFull: boolean;
}
const SalonCenters = () => {
  const dispatch = useDispatch();
  const [showFullScreen, setShowFullScreen] = useState<IShowFullScreen>({
    showLeftTechFull: true,
    showCenterInPenFull: true,
    showRightWaitFull: true,
  });
  useEffect(()=>{  dispatch(setPageCurrent("salon-center"))},[])

  return (
    <>
      <div
        className="flex  bg-mango-bg-dark"
        style={{ height: "calc(100% - 70px)", paddingTop: "10px" }}
      >
        <BatchTipIconLeft />
        <WaitListBookingIconRight />
        <TechSalonCenter
          showFullScreen={showFullScreen}
          setShowFullScreen={setShowFullScreen}
        />
        <InServiceSalonCenter
          showFullScreen={showFullScreen}
          setShowFullScreen={setShowFullScreen}
        />
      </div>
    </>
  );
};

export default SalonCenters;
