import { LoadingOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { IShowFullScreen } from "pages/salon-center";
import { ITechSalonCenter } from "src/components/Book/IterfaceStructures";
interface Props {
  setShowFullScreen: Function;
  showFullScreen: IShowFullScreen;
  dataInforTech: Array<ITechSalonCenter>;
  dataBusy: Array<ITechSalonCenter>;
  dataReady: Array<ITechSalonCenter>;
}
export const TimelineLeftContent = ({
  setShowFullScreen,
  showFullScreen,
  dataInforTech,
  dataBusy,
  dataReady,
}: Props) => {
  return (
    <Col className=" border-black h-full">
      <div
        className="bg-white h-10 w-10  border-y border-r rounded-r-xl flex border-gray-400 cursor-pointer"
        onClick={() =>
          setShowFullScreen((prev) => ({
            ...prev,
            showLeftTechFull: !showFullScreen.showLeftTechFull,
          }))
        }
      >
        <img
          src="/assets/imgs/30-pixel-assets_23.png"
          alt="setting"
          className="h-5 flex m-auto"
        />
      </div>
      <div>
        <div>
          <div>
            <div>
              <strong>A</strong>
              <br></br>
              <strong>{dataInforTech.length}</strong>
              <br></br>
              <span className="border-r border-black border-dashed h-8 w-2"></span>
            </div>
            <div>
              <strong>R</strong>
              <br></br>
              <strong>
                {/* <LoadingOutlined /> */}
                {dataReady.length}
              </strong>
              <br></br>
              <span className="border-r border-black border-dashed h-8 w-2"></span>
            </div>
            <div className="text-purple-400">
              <strong>B</strong>
              <br></br>
              <strong>
                {/* <LoadingOutlined /> */}
                {dataBusy.length}
              </strong>
              <br></br>
              {/* <span className="border-r border-black border-dashed h-8 w-2"></span> */}
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};
