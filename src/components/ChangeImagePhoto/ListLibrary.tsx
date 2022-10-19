import { Button, Popover, Radio, Space } from "antd";
import React, { useContext, ChangeEvent, useState, useEffect } from "react";
import { GetLibrary } from "services/Employees/GetLibrary";
import { getBase64 } from "./ChangeImagePhoto";
interface Props {
  setFileImage: Function;
  setShowImage: Function;
}

const BASE_UAT_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
const ListLibrary = ({ setFileImage, setShowImage }: Props) => {
  const [listLibrary, setListLibrary] = useState<Array<string>>([]);
  const [imageSelect, setImageSelect] = useState<string>("");
  const [showLib, setShowLib] = useState<boolean>(false);
  const apiGetLibrary = new GetLibrary();
  useEffect(() => {
    showLib &&
      apiGetLibrary.getLibrary(false).then((res) => {
        if (res.status == 200) {
          setListLibrary(res.data);
        }
      });
  }, [showLib]);
  const handleVisibleChangeLib = (newOpen: boolean) => {
    setShowLib(newOpen);
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

  const handleChangeImage = (value) => {
    setImageSelect(value);
  };
  const handleDoneImage = () => {
    toDataUrl(BASE_UAT_URL + imageSelect + "?" + Date.now(), (myBase64) => {
      // setShowImage(true);
      setFileImage((prev) => ({
        ...prev,
        image: myBase64,
        preview: {
          ...prev,
          img: myBase64,
        },
      }));
      setShowLib(false);
    });
  };
  return (
    <Popover
      trigger={"click"}
      visible={showLib}
      onVisibleChange={handleVisibleChangeLib}
      content={
        <div className="p-4 w-[390px]">
          <Radio.Group
            defaultValue={0}
            onChange={(e) => handleChangeImage(e.target.value)}
          >
            <Space size={"large"} className=" flex flex-wrap">
              {listLibrary.map((item, index) => (
                <Radio.Button
                  value={item}
                  key={index}
                  className="!h-16 !w-16 !p-0 !rounded-full"
                >
                  <img
                    src={BASE_UAT_URL + item}
                    className="!w-full !h-full cursor-pointer rounded-full hover:opacity-50 object-cover "
                  />
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>

          <Button
            className="!rounded-md mt-4 !ml-56 !bg-mango-primary-blue !text-white !w-32 "
            onClick={handleDoneImage}
          >
            Done
          </Button>
        </div>
      }
    >
      <Button
        className="!bg-mango-primary-orange-1 !text-white !rounded-md !border-none mango-shadow !w-[115px]"
        onClick={() => setShowLib(!showLib)}
      >
        Library
      </Button>
    </Popover>
  );
};
export default ListLibrary;
