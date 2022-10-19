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
export const TimelineCenterContent = ({
  showFullScreen,
  setShowFullScreen,
  dataInService,
  dataWaitList,
  dataPending,
}: Props) => {
  return (
    <div className="border-l-2 border-black  w-12 h-full ">
      <div
        className="bg-white h-10 w-10  border-y border-r rounded-r-xl flex border-gray-400 cursor-pointer "
        onClick={() =>
          setShowFullScreen((prev) => ({
            ...prev,
            // showLeftTechFull: false,
            showCenterInPenFull: !showFullScreen.showCenterInPenFull,
            // showRightWaitFull: !showFullScreen.showRightWaitFull,
          }))
        }
      >
        <img
          src="/assets/imgs/inservice.svg"
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
          {/* <span className="border-r border-black border-dashed h-8 w-2"></span> */}
        </div>
        <div>
          {/* <strong>Wait</strong> */}
          <br></br>
          <strong>{/* <LoadingOutlined /> */}</strong>
          <br></br>
          {/* <span className="border-r border-black border-dashed h-8 w-2"></span> */}
        </div>
        <div className="text-purple-400">
          {/* <strong>W</strong> */}
          <br></br>
          <strong>{/* <LoadingOutlined /> */}</strong>
          <br></br>
          {/* <span className="border-r border-black border-dashed h-8 w-2"></span> */}
        </div>
        <div className="text-mango-sky-crayola">
          {/* <strong>AP</strong> */}
          <br></br>
          <strong>{/* <LoadingOutlined /> */}</strong>
        </div>
      </div>

      <div className="bg-white p-2 rounded-b-xl border-gray-400  border h-10 w-10 cursor-pointer mt-96">
        <img
          src="/assets/imgs/pending.svg"
          alt="error"
          className="h-5 w-5 m-auto"
        />
      </div>
      <div>
        <strong>P</strong>
        <br></br>
        {dataPending.length}
        {/* <LoadingOutlined /> */}
      </div>
    </div>
  );
};
