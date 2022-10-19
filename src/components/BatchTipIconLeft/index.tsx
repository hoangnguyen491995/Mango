// @flow
import * as React from "react";
import { Button } from "antd";
import BatchNow from "./BatchNow";
import { EditTip } from "./EditTip";
type Props = {};
const BatchTipIconLeft = (props: Props) => {
  return (
    <div className=" fixed left-0 z-50 top-0 bottom-2 max-h-screen h-auto">
      <div
        className="button-style-left-salon-center cursor-pointer"
        style={{ background: "#f44c7f" }}
      >
        <div
          className="button-left-salon-center"
          style={{ marginTop: "666px" }}
        >
          <Button
            style={{
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              border: "none",
            }}
          >
            {/* <img
            className="ml-[2px] fill-white"
            src="/assets/imgs/icon-turn-tracker.svg"
            alt="Icon  "
          /> */}
          </Button>
        </div>
      </div>

      <BatchNow />
      <EditTip />
    </div>
  );
};
export default BatchTipIconLeft;
