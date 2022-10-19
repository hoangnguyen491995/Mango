import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Create } from "services/CheckOut/Create";
import { GetCheckOut } from "services/CreateCharge/CheckOutCreateAndChange";
import { GetCheckOutApptID } from "services/CreateCharge/GetCheckOutByAppointment";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import CenterCreateCharge from "./Content/CenterContentCreateCharge";
import LeftCreateCharge from "./Content/LeftContentCreateCharge";
import RightCreateCharge from "./Content/RightContentCreateCharge";
import createchargeSlice, { setApptId, setCheckNo } from "./createcharge-slice";
import { CreateChargeSlice } from "./CreateChargeSlice";

interface IGetCheckOut {}

function CreateChargeContent() {
  const dispatch = useDispatch();


  const apiCreate = new Create();
  const getCheckOut = new GetCheckOut();
  const apiGetCheckOutApptID = new GetCheckOutApptID();
  const apptId = useAppSelector((state) => state.createCharge.apptId);
  const [dataCheckOut, setDataCheckOut] = useState<Array<IGetCheckOut>>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   getCheckOut.getCheckOut().then((res) => {
    //     setDataCheckOut(res.data);
    //     dispatch(CreateChargeSlice.actions.setIDCheckoutCreateCharge(res.data));
    //   });
    // };
    // fetchData().catch(console.error);

    // const param = {
    //   IsLoginRequired: 0,
    //   PassCode: 1111,
    // };
    // apiCreate.create(param.IsLoginRequired, param.PassCode).then((res) => {
    //   if (res.status == 200) {
    //     setIdNewTix(res.data);
    //   }
    // });
  }, []);
  useEffect(() => {
    if (apptId == 0) {
      const param = {
        IsLoginRequired: 0,
        PassCode: 1111,
      };
      0;
      apiCreate.create(param.IsLoginRequired, param.PassCode).then((res) => {
        if (res.status == 200) {
          dispatch(setApptId(res.data));
          apiGetCheckOutApptID.getCheckOutApptID(res.data).then((res) => {
            if (res.status == 200) {
              dispatch(setCheckNo(res.data.checkNo));
            }
          });
        }
      });
    }
  }, []);

  return (
    <div className="flex h-full bg-white">
      <div className="w-[43%] ">
        <LeftCreateCharge />
      </div>
      <div className="w-[16%] border-x-[1px] border-zinc-800 h-full">
        <CenterCreateCharge />
      </div>
      <div className="w-[41%] ">
        <RightCreateCharge dataCheckOut={dataCheckOut} />
      </div>
    </div>
  );
}
export default CreateChargeContent;
