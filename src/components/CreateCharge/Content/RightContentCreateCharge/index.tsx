import { useDispatch, useSelector } from "react-redux";
import { CreateCharge$ } from "src/redux/selector";
import { CreateChargeSlice } from "../../CreateChargeSlice";
import PayBill from "./FooterRight";
import Service from "./FormRightCreateCharge.tsx/FormServiceRightCreatecharge";
import TechRightCreateCharge from "./FormRightCreateCharge.tsx/FormTechRightCreateCharge";

function RightCreateCharge({ dataCheckOut }) {
  const showForm = useSelector(CreateCharge$);
  const dispatch = useDispatch();
  const handleSetTickets = () => {
    dispatch(CreateChargeSlice.actions.setShowFormRight("service"));
  };
  return (
    <div className="w-full flex flex-col relative h-full ">
      <div className="overflow-auto">
        {showForm.showFormRight == "tech" && (
          <TechRightCreateCharge dataCheckOut={dataCheckOut} />
        )}
        {showForm.showFormRight == "service" && <Service />}
      </div>
      <div className="absolute bottom-16 left-2 w-full">
        <PayBill />
      </div>
    </div>
  );
}
export default RightCreateCharge;
