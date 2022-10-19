import React, { useEffect, useState } from "react";

interface IProps {
  resource: number;
  nickName: string;
  border: string;
  imageFileName: string;
  backGroundColor: string;
  color: string;
}

function ImageTech({
  resource,
  nickName,
  border,
  imageFileName,
  backGroundColor,
  color,
}: IProps) {
  const [checkFailImage, setCheckFailImage] = useState<boolean>(false);
  const bgTech = backGroundColor == "#FFFFFF" || backGroundColor == "" ? "#93D500" : backGroundColor;
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO;

  return (
    <>
      <div className="mr-2  items-center h-full flex">
        {checkFailImage ? (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: bgTech || "#94D500",
            }}
            className={
              "text-lg  font-bold  rounded-full w-[45px] h-[45px] shadow-md "
            }
          >
            {resource > 9999 ? nickName.slice(0, 1).toUpperCase() : "NA"}
          </span>
        ) : (
          <>
            <img
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={" rounded-full w-[45px] h-[45px] shadow-md " + bgTech}
              src={BASE_URL + "/Upload/Employee/" + imageFileName}
              onError={() => setCheckFailImage(true)}
              alt="error"
            />
          </>
        )}
      </div>
      {resource != 9999 && (
        <span className={"text-[" + color + "]"}>{nickName.toUpperCase()}</span>
      )}
    </>
  );
}

export default ImageTech;
