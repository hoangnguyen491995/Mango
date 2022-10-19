// @flow
import { Col, message, Row } from "antd";
import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import * as React from "react";
type Props = {};
export const TitleBarApp = (props: Props) => {
  const [isMaxRes, setIsMaxRes] = React.useState<boolean>(true);

  //
  React.useEffect(() => {});
  const handleHidden = () => {
    ipcRenderer.send("hideRes");
  };
  const handleMinRes = () => {
    ipcRenderer.send("minMaxRes");
    setIsMaxRes(false);
  };
  const handleMaxRes = () => {
    ipcRenderer.send("minMaxRes");
    setIsMaxRes(true);
  };

  const handleClose = () => {
    ipcRenderer.send("closeApp");
  };
  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <Row
          justify="space-between"
          className="bg-mango-primary-blue h-8 w-full  sticky top-0 z-1002"
          style={{ WebkitUserSelect: "none" }}
        >
          <Col
            className="draggable  h-8 "
            style={{ WebkitUserSelect: "none", width: "calc(100% - 144px)" }}
          ></Col>
          <Col className="h-8 w-36">
            <Row justify="space-between">
              <Col
                className="hover:bg-gray-200 flex h-8 w-12"
                onClick={handleHidden}
              >
                <div className="m-auto">
                  <div>
                    <img src="/assets/iconstitlebar/min-k-15.png" />
                  </div>
                </div>
              </Col>
              {isMaxRes ? (
                <Col
                  className="hover:bg-gray-200  flex w-12 "
                  onClick={handleMinRes}
                >
                  <div className=" hover:bg-regrayd-300  m-auto ">
                    <img src="/assets/iconstitlebar/restore-k-15.png" />
                  </div>
                </Col>
              ) : (
                <Col
                  className="hover:bg-gray-200  flex w-12"
                  onClick={handleMaxRes}
                >
                  <div className="  m-auto ">
                    <img src="/assets/iconstitlebar/max-k-15.png" />
                  </div>
                </Col>
              )}

              <Col className="hover:bg-red-500 flex w-12" onClick={handleClose}>
                <div className="  m-auto">
                  <img
                    src="/assets/iconstitlebar/close-k-15.png"
                    className="my-auto"
                  />{" "}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};
