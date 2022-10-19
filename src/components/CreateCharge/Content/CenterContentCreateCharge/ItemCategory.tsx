import { Col, Empty, Radio, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { APIListCategory } from "services/ListCategory/ListCategory";
import { APIListCategoryGroup } from "services/ListCategoryGroup/ListCategoryGroup";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import {
  IGroup,
  IListCategories,
  IModel,
} from "src/components/AddNewTix/Content/DataStructures";
import { CreateChargeSlice } from "../../CreateChargeSlice";
import ModalExtra from "./ModalCenterCreatecharge/ModalExtra";
import ModalGiftCard from "./ModalCenterCreatecharge/ModalGiftCard";
import OpenitemsCreateCharge from "./ModalCenterCreatecharge/ModalOpenItemsCreateCharge";

interface Props {
  dataCategories: IListCategories;
}

export const ItemCategory = ({ dataCategories }: Props) => {
  //data context
  const dispatch = useDispatch();
  //Call api
  const [dataService, setDataService] = useState<Array<IModel>>(
    dataCategories.category
  );
  const [typeService, setTypeService] = useState<Array<IGroup>>(
    dataCategories.categoryStypeBasic
  );

  const [borderColor, setBorderColor] = useState("#fff");
  const dataListCategoryGroup = new APIListCategoryGroup();
  const dataListCategory = new APIListCategory();
  useEffect(() => {
    if (typeService.length <= 0) {
      dataListCategoryGroup.ListCategoryGroup().then((res) => {
        if (res.status === 200) {
          setTypeService(res.data);
        }
      });
    }
    if (dataService.length <= 0) {
      dataListCategory.ListCategory().then((res) => {
        if (res.status === 200) {
          setDataService(res.data);
          // tixCT.setIdService(res.data[0].categoryID);
        }
      });
    }
  }, []);

  const handleSetIdService = (item) => {
    setBorderColor("#555");
  };
  const handleErrorImage = (e) => {
    e.currentTarget.src = "/assets/imgs/default_service.jpg";
  };
  //base url image
  const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
  const BASE_URL = DOMAIN_URL + "/Upload/categories/";

  const widthScroll: number = 0;
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
  const navigationBtn = "h-16 hover:opacity-60 hover:bg-white rounded";

  // console.log("center", dataService);

  return (
    <>
      {typeService.length > 0 && dataService.length > 0 && (
        <>
          <Radio.Group
            defaultValue={dataService[0].categoryID}
            className="w-full h-full"
          >
            <div className="overflow-hidden flex " id="navAddNewTix">
              {typeService.map((type, ix) => {
                return (
                  <Col

                    style={{ minWidth: "100%", minHeight: "120vh" }}

                    key={ix}
                  >
                    <Row className="h-8 mb-6">
                      <Col span={24}>
                        <div className="flex ">
                          <button
                            onClick={handleClickPrev}
                            className={navigationBtn}
                          >
                            <IoChevronBack
                              style={{ color: "#505050" }}
                              className="xl:w-[25px] xl:h-[25px] md:w-[20px] md:h-[20px] w-[14px] h-[14px]"
                            />
                          </button>
                          <div className="w-full md:mt-[20px] mt-[25px] ">
                            <p
                              style={{ color: "#505050" }}
                              className="text-center font-semibold xl:text-[16px] md:text-[14px] text-[10px] "
                            >
                              {type.columnName.toUpperCase()}
                            </p>
                          </div>
                          <button
                            onClick={handleClickNext}
                            className={navigationBtn}
                          >
                            <IoChevronForward
                              style={{ color: "#505050" }}
                              className="xl:w-[25px] xl:h-[25px] md:w-[20px] md:h-[20px] w-[14px] h-[14px]"
                            />
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <div
                      className="overflow-auto  h-full"
                      style={{ height: "calc( 100vh - 360px )" }}
                    >
                      <Row className="flex items-center justify-evenly ">
                        {dataService.length > 0 ? (
                          dataService
                            .filter((typeItem) => typeItem.groupID === type.id)
                            .map((item) => {
                              if (
                                item.categoryName.toString().toUpperCase() !=
                                "GIFT CARD"
                              ) {
                                return (
                                  <Tooltip
                                    placement="bottom"
                                    title={item.categoryName}
                                    key={item.categoryID}
                                  >
                                    <Col
                                      className={`2xl:w-[40%] xl:w-[42%] md:w-[45%]
                                       w-[48%] 2xl:h-[110px] item-catetory 
                                      select-none mt-[8px] relative border-[1px] rounded-xl `}
                                      onClick={() => handleSetIdService(item)}
                                    >
                                      <Radio.Button
                                        value={item.categoryID}
                                        className="bg-white h-full !rounded-lg !pt-2 !shadow-md
                                         cursor-pointer text-center select-none"
                                        onClick={() => {
                                          dispatch(
                                            CreateChargeSlice.actions.showFormRightTech(
                                              5
                                            )
                                          );
                                          dispatch(
                                            CreateChargeSlice.actions.showFormRightTechItem(
                                              {
                                                item: item.categoryID,
                                                CategoryName: item.categoryName,
                                              }
                                            )
                                          );
                                          dispatch(
                                            CreateChargeSlice.actions.setShowFormRight(
                                              "tech"
                                            )
                                          );
                                        }}
                                      >
                                        <div className="flex flex-col justify-center items-center">
                                          <img
                                            className=" 2xl:w-[60px]"
                                            src={BASE_URL + item.imageFileName}
                                            onError={(e) => handleErrorImage(e)}
                                            alt="error"
                                          />
                                          <span
                                            className="w-11/12 truncate font-semibold pt-1
                                           2xl:text-[13px] xl:text-[11px] md:text-[10px] text-[8px]"
                                          >
                                            {item.categoryName.toUpperCase()}
                                          </span>
                                        </div>
                                        <span
                                          style={{
                                            backgroundColor: `${item.color}`,
                                          }}
                                          className={`xl:w-[10px] xl:h-[10px] w-[7px] h-[7px]
                                           absolute rounded-full top-[6px] right-[6px]`}
                                        ></span>
                                      </Radio.Button>
                                    </Col>
                                  </Tooltip>
                                );
                              } else if (
                                item.categoryName.toString().toUpperCase() ==
                                "GIFT CARD"
                              ) {
                                return (
                                  <div
                                    className="mt-4 cursor-pointer "
                                    key={item.categoryID}
                                  >
                                    {/* <ModalGiftCard props={item.imageFileName} /> */}
                                  </div>
                                );
                              }
                            })
                        ) : (
                          <Empty className="mr-auto ml-auto flex-1" />
                        )}
                      </Row>
                    </div>
                  </Col>
                );
              })}
            </div>
          </Radio.Group>
        </>
      )}
    </>
  );
};
