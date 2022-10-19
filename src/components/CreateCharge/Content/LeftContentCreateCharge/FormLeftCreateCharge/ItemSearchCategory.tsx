import { Checkbox, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCheckInAppointment } from "services/CreateCharge/AddToCheckInAppointment";
import { CreateCharge$ } from "src/redux/selector";
import { theme } from "tailwind.config";
import { HiCheck } from "react-icons/hi";
import React from "react";
import { GetCheckInApptCateList } from "services/CreateCharge/GetCheckInApptCateList";

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
function ItemSearchCategory({ posts, selected }) {
  console.log("selected", selected);
  const IdCreatecharge = useSelector(CreateCharge$);
  const [check, setCheck] = useState<boolean>(false);
  const [activeclick, setActiveClick] = useState<boolean>(false);

  const [dataInApptCateList, setDataInApptCateList] = useState<
    Array<ICheckInApptCateList>
  >([]);

  const addCate = (posts: any) => {
    console.log("posts", posts);
    const fetchData = async () => {
      addToCheckInAppointment
        .addToCheckInAppointment(AptID, CusID, posts.categoryID)
        .then((res) => setDataPostCategory(res.data));
    };
    fetchData().catch(console.error);
    setActiveClick(!activeclick);
  };

  const [dataPostCategory, setDataPostCategory] = useState<
    Array<IListForClientCheckin>
  >([]);
  const addToCheckInAppointment = new AddToCheckInAppointment();
  let CusID = IdCreatecharge.IdClientDetail;
  let AptID = IdCreatecharge.IDCheckoutCreateCharge;

  return (
    <Col
      onClick={() => addCate(posts)}
      key={posts.categoryID}
      className={
        "m-[1%] relative w-[135px] border-[1px] border-current mt-[6px] shadow-xl  rounded-md hover:bg-slate-300   mb-2 h-[58px] flex justify-center items-center  cursor-pointer " +
        (activeclick || selected ? "activeCate " : "")
      }
    >
      <div className="flex justify-center items-center w-[90%] h-[100%] ">
        <span className="font-semibold " style={{ fontSize: "13px" }}>
          {posts.categoryName}
        </span>
        {activeclick || selected ? (
          <div
            className="absolute  rounded-full z-100"
            style={{ top: "-16px", left: "105px", width: "35px" }}
          >
            <img
              src={`/assets/imgs/ImageIcon/check-blue.svg`}
              alt="zzz"
              style={{ width: "100%" }}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* {listCategory.length > 0 &&
        listCategory.map((post, index) => {
          if (post.categoryName == posts.categoryName) {
            setCheck(!check);
            return (
              <div
                key={index}
                className="absolute top-[-6px] right-[-6px]
                             rounded-full bg-white text-[#00BED64D]"
                style={{
                  border: `1px solid ${theme.extend.colors["mango-primary-blue"]}`,
                }}
              >
                <HiCheck
                  style={{
                    color: `${theme.extend.colors["mango-primary-blue"]}`,
                  }}
                />
              </div>
            );
          }
        })} */}
    </Col>
  );
}

export default ItemSearchCategory;
