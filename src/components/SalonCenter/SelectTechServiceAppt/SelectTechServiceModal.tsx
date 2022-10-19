import { Col, Modal, Row, Tabs } from "antd";
import { useContext, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isChangeDataTixSalonCenter$ } from "src/redux/selector";
import { IItemDataTix } from ".";
import { ITixAppt } from "../DataStructures";
import { handleCheckIsChangeDataTixSalonCenter } from "../RightContent/helper";
import { RightSelectTechServerAppt } from "./RightSelectTechServerAppt";
import SearchService from "./SearchService";
import SelectCategory from "./SelectCategory";
import SelectTechService from "./SelectTechServiceApptContext";
import TabLeftContentSalonCenter from "./TabLeftContentSalonCenter";

interface Props {
  visible: boolean;
  onOk: any;
  onCancel: any;
  loadDetail: number;
  itemData: IItemDataTix;
}
export const SelectTechServiceModal = ({
  visible,
  onOk,
  onCancel,
  loadDetail,
  itemData,
}: Props) => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const isChangeDataTix = useSelector(isChangeDataTixSalonCenter$);
  const selectTSContext = useContext(SelectTechService);

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={() => {
        handleCheckIsChangeDataTixSalonCenter(dispatch);
        onCancel();
      }}
      width={1400}
      footer={null}
      centered
    >
      <Row className="h-[760px]">
        {/* Left Content Select Tech, Service */}
        <Col className="bg-mango-bg-dark h-full" span={16}>
          <Tabs defaultActiveKey="1" centered size="small">
            <TabPane
              tab={
                <span className="text-mango-primary-blue text-xl font-bold p-0">
                  TECH
                </span>
              }
              key="1"
            >
              <TabLeftContentSalonCenter itemDataTix={itemData} />
            </TabPane>
            <TabPane
              tab={
                <span className="text-mango-primary-blue text-xl font-bold p-0">
                  SERVICE
                </span>
              }
              key="2"
            >
              <Row>
                <Col span={8}>
                  <SelectCategory itemDataTix={itemData} />
                </Col>
                <Col span={16}>
                  <SearchService itemDataTix={itemData} />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
        {/* Right Content Info  */}
        <RightSelectTechServerAppt
          itemDataTix={itemData}
          onCancel={onCancel}
          loadDetail={loadDetail}
        />
      </Row>
    </Modal>
  );
};
