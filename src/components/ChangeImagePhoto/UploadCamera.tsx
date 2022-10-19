import { Button, Popover } from "antd";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
interface Props {
  setFileImage: Function;
}
export const UploadCamera = ({ setFileImage }: Props) => {
  const [showCamera, setShowCamera] = useState(false);
  const handleVisibleChangeCamera = (newOpen: boolean) => {
    setShowCamera(newOpen);
  };
  return (
    <Popover
      visible={showCamera}
      trigger="click"
      onVisibleChange={handleVisibleChangeCamera}
      content={
        <div className="border border-black p-4 !rounded-md">
          <Webcam
            audio={false}
            height={500}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <Button
                className="!bg-mango-primary-green !text-white  !mt-4 !rounded-md
                    "
                onClick={() => {
                  const imageSrc = getScreenshot();
                  setShowCamera(false);
                  setFileImage((prev) => ({ ...prev, image: imageSrc }));
                }}
              >
                Capture photo
              </Button>
            )}
          </Webcam>
        </div>
      }
    >
      <Button className="!bg-mango-primary-green !text-white !rounded-md !border-none mango-shadow !w-[115px]">
        Camera
      </Button>
    </Popover>
  );
};
