import { Col, Empty, Layout, message, Radio, Row, Tooltip } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { APIListCategory } from "services/ListCategory/ListCategory";
import { IListCategories } from "src/components/AddNewTix/Content/DataStructures";
import { IItemDataTix } from ".";
import { ITixAppt } from "../DataStructures";

import { ItemCategory } from "./ItemCategory";
import SelectTechService from "./SelectTechServiceApptContext";

interface Props {
  itemDataTix: IItemDataTix;
}
const SelectCategory = ({ itemDataTix }: Props) => {
  const dataListCategories = new APIListCategory();
  //Pre Next
  const [dataCategories, setDataCategories] = useState<IListCategories>();
  const widthScroll: number = 15;
  const selectTSContext = useContext(SelectTechService);
  const handleClickNext = () => {
    const element = document.getElementById("navAddNewTix");
    const witdhElement = element?.offsetWidth;

    if (witdhElement) {
      element.scrollLeft += witdhElement - widthScroll;
    }
  };
  const handleClickPrev = () => {
    const element = document.getElementById("navAddNewTix");
    const witdhElement = element?.offsetWidth;
    if (witdhElement) {
      element.scrollLeft -= witdhElement - widthScroll;
    }
  };
  const handleCheckOpenItem = async () => {
    // if (dataCategories) {
    //   const resultCheckAssign = await checkAssignEmp(
    //     dataCategories.openId,
    //     tixCT.idTech
    //   );
    //   if (resultCheckAssign == "success") {
    //     tixCT.setShowContent(ShowContent(type.ShowOpenItem));
    //   } else message.warning(resultCheckAssign);
    // }
  };
  useEffect(() => {
    dataListCategories.ListCategory().then((res) => {
      if (res.status === 200) {
        setDataCategories(res.data);
        selectTSContext.setIdCategory(res.data.category[0].categoryID);
      }
    });
  }, []);
  //classname
  const navigationBtn = "h-16 hover:opacity-60 hover:bg-white rounded ";
  return (
    <Layout className="bg-slate-200 ">
      <Row justify="space-between" className="h-24">
        <Col>
          <button onClick={handleClickPrev} className={navigationBtn}>
            <IoChevronBack color="black" className="h-1/2 w-full" />
          </button>
        </Col>
        <Col span={8}>
          <Row className="bg-white rounded-lg shadow-md h-5/6 mt-2  pt-2">
            <button className="mr-auto ml-auto" onClick={handleCheckOpenItem}>
              <img src="/assets/imgs/open_item.svg" className="h-12" />
            </button>
            <p className="font-bold w-full text-center truncate">OPEN ITEM</p>
          </Row>
        </Col>
        <Col>
          <button onClick={handleClickNext} className={navigationBtn}>
            <IoChevronForward color="black" className="h-1/2 w-full" />
          </button>
        </Col>
      </Row>
      {dataCategories ? (
        <ItemCategory dataCategories={dataCategories} />
      ) : (
        <Empty />
      )}
    </Layout>
  );
};

export default SelectCategory;
