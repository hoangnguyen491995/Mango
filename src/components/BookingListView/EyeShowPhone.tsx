import React, { useState, useEffect } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { GetPhoneNumberByAptId } from "services/Appointments/GetPhoneNumberByAptId";


function EyeShowPhone({ idAppt, phoneHidden }) {
  const [dataInfoDetail, setDataInfoDetail] = useState();

  const [showPhone, setShowPhone] = useState<boolean>(false);
  const getPhoneNumberByAptId = new GetPhoneNumberByAptId();
  const handleClickEye = () => {
    setShowPhone(!showPhone);
    if (!showPhone) {
      getPhoneNumberByAptId.getPhoneNumberByAptId(idAppt).then((res) => {
        if (res.status === 200) {
          setDataInfoDetail(res.data);
          
        }
      });
    }
  };
  return (
    <div className="flex">
      <span className={`pr-2 number-phone`}>
        {showPhone && dataInfoDetail
          ? dataInfoDetail
          : (phoneHidden !=0 ? phoneHidden : "(XXX)-(XXX)-(XXX)")}
      </span>
      <div
        className={` text-gray-500 icon-eye`}
        onClick={() => handleClickEye()}
      >
        {showPhone ? (
          <IoEye className="h-5 w-5" />
        ) : (
          <IoEyeOff className="h-5 w-5" />
        )}
      </div>
    </div>
  );
}

export default EyeShowPhone;
