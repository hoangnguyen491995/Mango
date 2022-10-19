import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Footer } from "antd/lib/layout/layout";
import { IShowFullScreen } from "pages/salon-center";
import { ITixAppt } from "../DataStructures";
interface Props {
  showFullScreen: IShowFullScreen;
  setShowFullScreen: Function;
  dataInService: Array<ITixAppt>;
  dataWaitList: Array<ITixAppt>;
  dataPending: Array<ITixAppt>;
}
export const TimelineRightContent = ({
  showFullScreen,
  setShowFullScreen,
  dataInService,
  dataWaitList,
  dataPending,
}: Props) => {
  return (
    <div className={"border-l-2 border-black w-12 h-full "}>
      <div
        className="bg-white h-10 w-10  border-y border-r rounded-r-xl flex border-gray-400 cursor-pointer"
        onClick={() =>
          setShowFullScreen((prev) => ({
            ...prev,
            // showLeftTechFull: false,
            // showCenterInPenFull: false,
            showRightWaitFull: !showFullScreen.showRightWaitFull,
          }))
        }
      >
        <img
          src="/assets/imgs/iconsaloncenter/walkin.svg"
          alt="error"
          className="h-5 w-5 m-auto"
        />
      </div>
      <div>
        <div>
          <strong>Ser</strong>
          <br></br>
          <strong>{dataInService.length}</strong>
          <br></br>
          <span className="border-r border-black border-dashed h-8 w-2"></span>
        </div>
        <div>
          <strong>Wait</strong>
          <br></br>
          <strong>
            {dataWaitList.length}
            {/* <LoadingOutlined /> */}
          </strong>
          <br></br>
          <span className="border-r border-black border-dashed h-8 w-2"></span>
        </div>
        <div className="text-purple-400">
          <strong>W</strong>
          <br></br>
          <strong>
            <LoadingOutlined />
          </strong>
          <br></br>
          <span className="border-r border-black border-dashed h-8 w-2"></span>
        </div>
        <div className="text-mango-sky-crayola">
          <strong>AP</strong>
          <br></br>
          <strong>
            <LoadingOutlined />
          </strong>
        </div>
      </div>
    </div>
  );
};
