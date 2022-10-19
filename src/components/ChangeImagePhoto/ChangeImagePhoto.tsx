import { UploadOutlined } from "@ant-design/icons";
import React, {
  useContext,
  ChangeEvent,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  Button,
  Image,
  message,
  Modal,
  Popover,
  Upload,
  UploadProps,
} from "antd";
import AvatarEditor, { type Position } from "react-avatar-editor";
import { ITechSalonCenter } from "../Book/IterfaceStructures";
import { RcFile } from "antd/lib/upload";

import { UpdateImageTech } from "services/Employees/UpdateImageTech";
import { messageSuccess } from "../MessageAlert";
import ListLibrary from "./ListLibrary";
import { handleCheckIsChangeDataTech } from "../SalonCenter/RightContent/helper";
import { useDispatch } from "react-redux";
import { UploadCamera } from "./UploadCamera";
type State = {
  image: string | File;

  scale: number;
  rotate: number;
  borderRadius: number;
  name: string;
  preview?: {
    img: string;
    scale: number;
    width: number;
    height: number;
    borderRadius: number;
  };
  width: number;
  height: number;
  disableCanvasRotation: boolean;
  isTransparent: boolean;
  backgroundColor?: string;
};
interface Props {
  visible: boolean;
  onOk: any;
  onCancel: any;
  infoTechChangeImage: ITechSalonCenter;
}

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
export const ChangeImagePhoto = ({
  visible,
  onOk,
  onCancel,
  infoTechChangeImage,
}: Props) => {
  const editor = React.createRef<AvatarEditor>();

  const apiUpdateImageTech = new UpdateImageTech();
  const [showLib, setShowLib] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [fileImage, setFileImage] = useState<State>({} as State);
  const [showImage, setShowImage] = useState<boolean>(true);
  const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(e.target.value);
    setFileImage((prev) => ({
      ...prev,
      scale: scale,
    }));
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    // Change Image
    setShowImage(true);
    if (!newFileList[0].url && !newFileList[0].preview) {
      newFileList[0].preview = await getBase64(
        newFileList[0].originFileObj as RcFile
      );
      const base64Image =
        newFileList[0].url || (newFileList[0].preview as string);
      setFileImage((prev) => ({
        ...prev,
        image: base64Image,
        name: newFileList[0].name,
      }));
    }
  };

  const handleSaveImage = () => {
    // Done

    const img = editor.current;

    if (img) {
      const getImage = img.getImageScaledToCanvas().toDataURL();
      setFileImage((prev) => ({
        ...prev,
        preview: {
          img,
          scale: fileImage.scale,
          width: fileImage.width,
          height: fileImage.height,
          borderRadius: fileImage.borderRadius,
        },
      }));
      var data = new FormData();
      data.append("EmpID", infoTechChangeImage.employeeID.toString());
      data.append("FromLibrary", "false");
      data.append("ImageName", fileImage.name);
      data.append("Base64Full", fileImage.image);
      data.append("Base64Crop", getImage);
      apiUpdateImageTech.updateImageTech(data).then((res) => {
        if (res.status == 200) {
          messageSuccess("Updated");
          handleCheckIsChangeDataTech(dispatch);
          onCancel();
        }
      });
    }
  };

  function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  const logCallback = (e: any) => {
    switch (e) {
      case "onLoadFailed":
        setShowImage(false);
        break;
      case "onImageReady":
        setShowImage(true);
        setFileImage((prev) => ({
          ...prev,
          image: editor.current.getImageScaledToCanvas().toDataURL(),
        }));
        break;
      default:
        break;
    }
  };
 
  const showAvatarEditor = () => {
    return (
      showImage && (
        <>
          <AvatarEditor
            ref={editor}
            onLoadFailure={logCallback.bind(this, "onLoadFailed")}
            onLoadSuccess={logCallback.bind(this, "onLoadSuccess")}
            onImageReady={logCallback.bind(this, "onImageReady")}
            image={fileImage.image}
            width={fileImage.width}
            height={fileImage.height}
            borderRadius={fileImage.borderRadius}
            scale={fileImage.scale}
            rotate={0}
            crossOrigin={"anonymous"}
          />

          <div className="w-full flex py-3">
            <input
              name="scale"
              type="range"
              onChange={handleScale}
              className="mx-auto w-[300px] "
              min={1}
              max={2.5}
              step={0.0001}
              defaultValue={1}
            />
          </div>
        </>
      )
    );
  };
  useEffect(() => {
    if (visible) {
      setFileImage({
        image:
          DOMAIN_URL +
          "/Upload/employee/" +
          infoTechChangeImage.imageFileName +
          "?" +
          Date.now(),
        scale: 1,
        rotate: 0,
        borderRadius: 9999,
        name: infoTechChangeImage.imageFileName || "",
        preview: undefined,
        width: 420,
        height: 420,
        disableCanvasRotation: false,
        isTransparent: false,
        backgroundColor: undefined,
      });

      showAvatarEditor();
    }
  }, [visible]);

  return (
    <Modal visible={visible} footer={null} onCancel={onCancel} centered>
      <div className="w-[500px] pr-6">
        <h4 className="text-3xl text-mango-text-light">Change profile photo</h4>
        <span className="text-mango-text-light">
          You can select a JPG/JPEG/PNG file with a maximum 5MB size.
        </span>
        {/* {showImage && ( */}
        <>{showAvatarEditor()}</>

        {/* )} */}

        <div className="flex justify-between">
          <Upload maxCount={1} showUploadList={false} onChange={handleChange}>
            <Button className="!bg-mango-primary-orange !text-white !rounded-md !border-none mango-shadow !w-[115px]">
              Browser
            </Button>
          </Upload>
          <ListLibrary
            setFileImage={setFileImage}
            setShowImage={setShowImage}
          />
          <UploadCamera setFileImage={setFileImage} />

          <Button
            className="!bg-mango-primary-blue !text-white !rounded-md !border-none mango-shadow !w-[115px]"
            onClick={handleSaveImage}
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
