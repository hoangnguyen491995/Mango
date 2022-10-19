import CreateChargeContent from "src/components/CreateCharge";
import { useDispatch } from "react-redux";
import { setPageCurrent } from "src/components/Book/book-slice";
import { useEffect } from "react";
type Props = {};

const CreateCharge = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(()=>{  dispatch(setPageCurrent("create-Charge"))},[])
  return (
    <>
      <CreateChargeContent />
    </>
  );
};

export default CreateCharge;
