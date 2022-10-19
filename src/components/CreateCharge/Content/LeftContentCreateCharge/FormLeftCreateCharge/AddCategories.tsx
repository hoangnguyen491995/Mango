import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCategory } from "services/CreateCharge/DeleteCategoryPerson";
import { GetCheckInApptCateList } from "services/CreateCharge/GetCheckInApptCateList";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { CreateCharge$ } from "src/redux/selector";
import { IListForClientCheckin } from "./FormSearchCategories";

interface ICheckInApptCateList {
  aptID: number;
  cateID: number;
  categoryName: string;
  cusID: number;
  personID: number;
}
function AddCategoris() {
  const IdCreatecharge = useSelector(CreateCharge$);
  const [render, setRender] = useState<boolean>(true);
  const [dataPostCategory, setDataPostCategory] = useState<
    Array<IListForClientCheckin>
  >([]);
  const [dataInApptCateList, setDataInApptCateList] = useState<
    Array<ICheckInApptCateList>
  >([]);
  const getCheckInApptCateList = new GetCheckInApptCateList();
  let rvcNo = 5;
  let Id = IdCreatecharge.IDCheckoutCreateCharge;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      getCheckInApptCateList
        .getCheckInApptCateList(Id, rvcNo)
        .then((res) => setDataInApptCateList(res.data));
    };
    fetchData().catch(console.error);
  }, [render]);
  const deleteCategory = new DeleteCategory();

  useEffect(() => {
    dispatch(
      CreateChargeSlice.actions.dispatchlistCategoryLeft({
        dataInApptCateList,
      })
    );
  }, [dataInApptCateList]);

  return (
    <div className="max-h-[80px] overflow-auto flex flex-col justify-start items-start mx-[2px] ">
      {dataInApptCateList != undefined &&
        dataInApptCateList.map((post: ICheckInApptCateList) => {
          return (
            <div
              className="flex justify-start items-start mt-[2px]"
              key={post.aptID}
            >
              <img
                className="xl:w-[24px] xl:h-[24px] w-[20px] h-[20px]"
                src={`${process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO}/Content/checkout/X_Symbol_Orange.svg`}
                alt=""
                onClick={() => {
                  setRender(!render);
                  const fetchData = async () => {
                    deleteCategory
                      .deleteCategory(post.personID, rvcNo)
                      .then((res) => setDataPostCategory(res.data));
                  };
                  fetchData().catch(console.error);
                }}
              />
              <span className="xl:text-xs text-[10px] font-semibold border-[1px] p-[3px] border-current ">
                {post.categoryName}
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default AddCategoris;
