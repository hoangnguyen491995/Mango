import { Col, Empty, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { APIListCategory } from "services/ListCategory/ListCategory";
import { IListCategories } from "src/components/AddNewTix/Content/DataStructures";
import { ItemCategory } from "./ItemCategory";
import Discount from "./ModalCenterCreatecharge/ModalDisCount";
import ModalExtra from "./ModalCenterCreatecharge/ModalExtra";
import OpenitemsCreateCharge from "./ModalCenterCreatecharge/ModalOpenItemsCreateCharge";
import ModalRedeem from "./ModalCenterCreatecharge/ModalRedeem";
export interface ISearchInforClient {
  categoryCode: string;
  categoryID: number;
  categoryName: string;
  color: string;
  groupID: number;
  imageFileName: string;
  isCombo: boolean;
  isFee: boolean;
  isGiftCard: boolean;
  isPackage: boolean;
  isService: boolean;
  isSubscription: boolean;
}
function CenterCreateCharge() {
  const [dataCategories, setDataCategories] = useState<IListCategories>();
  const getListCategory = new APIListCategory();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      getListCategory.ListCategory().then((res) => setDataCategories(res.data));
    };
    fetchData().catch(console.error);
  }, []);
  // console.log("center", dataCategories);

  return (
    <div className="h-full flex flex-col justify-between relative">
      {/* Header */}
      <Row
        justify="space-evenly"
        className="mt-2 pb-4 border-b-[1px] border-dashed border-slate-600 h-[120px]"
      >
        <Col span={10}>
          <OpenitemsCreateCharge />
        </Col>
        <Col span={10}>
          <ModalExtra />
        </Col>
      </Row>

      {/*List category */}
      <div className="h-full bg-mango-bg-dark">
        {dataCategories ? (
          <>
            <ItemCategory dataCategories={dataCategories} />
          </>
        ) : (
          <Empty />
        )}
      </div>
      {/* footer */}

      <Row
        className="bg-slate-50 absolute bottom-0 h-[180px] w-full z-25"
        justify="space-between"
      >
        <Col span={12} className="border-r-[1px] border-dashed border-black">
          <Discount />
        </Col>
        <Col span={12}>
          <ModalRedeem />
        </Col>
      </Row>
    </div>
  );
}
export default CenterCreateCharge;
