import { Checkbox, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCheckInAppointment } from "services/CreateCharge/AddToCheckInAppointment";
import { GetListForClientCheckin } from "services/CreateCharge/GetListForClientCheckin";
import { CreateChargeSlice } from "src/components/CreateCharge/CreateChargeSlice";
import { CreateCharge$ } from "src/redux/selector";
import { theme } from "tailwind.config";
import { HiCheck } from "react-icons/hi";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import React from "react";
import { GetCheckInApptCateList } from "services/CreateCharge/GetCheckInApptCateList";
import ItemSearchCategory from "./ItemSearchCategory";

// const onChange = (e: CheckboxChangeEvent) => {
//   console.log(`checked = ${e.target.checked}`);
// };
export interface IListForClientCheckin {
  categoryCode: string;
  categoryID: number;
  categoryName: string;
  isSelect: boolean;
  isActive: boolean;
}
interface ICheckInApptCateList {
  aptID: number;
  cateID: number;
  categoryName: string;
  cusID: number;
  personID: number;
}
function SearchCategories() {
  debugger;
  const IdCreatecharge = useSelector(CreateCharge$);
  const [check, setCheck] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(true);
  const [active, setActive] = useState<number>();
  let Id = IdCreatecharge.IDCheckoutCreateCharge;
  const listCategory = IdCreatecharge.listCategoryLeft;
  // useEffect(() => {
  //   console.log(listCategory);
  // }, [listCategory]);
  const dispatch = useDispatch();
  const [dataListForClientCheckin, setListForClientCheckin] = useState<
    Array<IListForClientCheckin>
  >([]);
  const [dataInApptCateList, setDataInApptCateList] = useState<
    Array<ICheckInApptCateList>
  >([]);
  // console.log(dataInApptCateList);

  // const newArr = dataListForClientCheckin.map((item, index) => {
  //   return { ...item, isSelect: false };
  // });
  // console.log(newArr);
  const getListForClientCheckin = new GetListForClientCheckin();
  const getCheckInApptCateList = new GetCheckInApptCateList();
  let rvcNo = 5;
  useEffect(() => {
    const fetchData = async () => {
      await getListForClientCheckin
        .getListForClientCheckin(rvcNo)
        .then((res) => setListForClientCheckin(res.data));
    };
    fetchData().catch(console.error);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      getCheckInApptCateList
        .getCheckInApptCateList(Id, rvcNo)
        .then((res) => setDataInApptCateList(res.data));
    };
    fetchData().catch(console.error);
  }, [render]);
  const handleShowDetail = () => {
    dispatch(CreateChargeSlice.actions.setshowFormLeft("detail"));
  };
  const addCate = (posts: any) => {
    console.log("posts", posts);
    const fetchData = async () => {
      addToCheckInAppointment
        .addToCheckInAppointment(AptID, CusID, posts.categoryID)
        .then((res) => setDataPostCategory(res.data));
    };
    fetchData().catch(console.error);
    setActive(posts.categoryID);
    setRender(!render);
    // if (newArr.length > 0) {
    //   newArr.map((item, index) => {
    //     if (item.categoryID !== posts.categoryID)
    //       item.isSelect = !item.isSelect;
    //     console.log(item);
    //     return item;
    //   });
    // }
  };
  // console.log(newArr);
  // console.log("dataListForClientCheckin", dataListForClientCheckin);
  const [dataPostCategory, setDataPostCategory] = useState<
    Array<IListForClientCheckin>
  >([]);
  const addToCheckInAppointment = new AddToCheckInAppointment();
  let CusID = IdCreatecharge.IdClientDetail;
  let AptID = IdCreatecharge.IDCheckoutCreateCharge;
  console.log(listCategory.dataInApptCateList);
  console.log("dataListForClientCheckin", dataListForClientCheckin);
  return (
    <div className=" w-full h-[277px]">
      <div className="border-b-[1px] border-current relative ">
        <img
          onClick={handleShowDetail}
          className="w-[25px] h-[25px]  absolute right-[2px] top-2 cursor-pointer "
          src={`${process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO}/Content/checkout/X_Symbol.svg`}
          alt=""
        />
        <input
          type="text"
          placeholder="Search Categories"
          className="w-full border-none outline-none rounded-lg"
        />
      </div>
      <div className="overflow-auto h-[220px]">
        <Row className=" flex justify-start">
          {dataListForClientCheckin?.length > 0 &&
            dataListForClientCheckin.map((posts: IListForClientCheckin) => {
              return listCategory.dataInApptCateList.length > 0 ? (
                listCategory.dataInApptCateList.map((item, index) => {
                  return item.cateID == posts.categoryID ? (
                    <ItemSearchCategory posts={posts} selected={true} />
                  ) : (
                    <ItemSearchCategory posts={posts} selected={false} />
                  );
                })
              ) : (
                <ItemSearchCategory posts={posts} selected={false} />
              );
            })}
        </Row>
      </div>
    </div>
  );
}

export default SearchCategories;
