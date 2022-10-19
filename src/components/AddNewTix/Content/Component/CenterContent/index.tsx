import {
  Col,
  Empty,
  Layout,
  message,
  Radio,
  Row,
  Skeleton,
  Space,
  Spin,
  Tooltip,
} from "antd";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import SkeletonButton from "antd/lib/skeleton/Button";
import SkeletonImage from "antd/lib/skeleton/Image";
import { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { APIListCategory } from "services/ListCategory/ListCategory";
import { APIListCategoryGroup } from "services/ListCategoryGroup/ListCategoryGroup";
import { messageWarning } from "src/components/MessageAlert";
import { IGroup, IListCategories, IModel } from "../../DataStructures";
import { checkAssignEmp, ShowContent, type } from "../../helper";
import TixContext from "../../TixContext";

//base url image
const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
const BASE_URL = DOMAIN_URL + "/Upload/categories/";
const widthScroll: number = 0;
const SelectService = () => {
  const tixCT = useContext(TixContext)[0];
  const dataListCategories = new APIListCategory();

  const [dataCategories, setDataCategories] = useState<IListCategories>();
  const [dataService, setDataService] = useState<Array<IModel>>([]);
  const [typeService, setTypeService] = useState<Array<IGroup>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //Pre Next
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
    if (dataCategories) {
      const resultCheckAssign = await checkAssignEmp(
        dataCategories.openId,
        tixCT.idTech
      );
      if (resultCheckAssign == "success") {
        tixCT.setCustomPriceId(dataCategories.openId);
        tixCT.setShowContent(ShowContent(type.ShowOpenItem));
      } else messageWarning(resultCheckAssign);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    dataListCategories.ListCategory().then((res) => {
      if (res.status === 200) {
        setDataCategories(res.data);
        setDataService(res.data.category);
        setTypeService(res.data.categoryStypeBasic);
        tixCT.setIdService(res.data.category[0].categoryID);
        setIsLoading(false);
      }
    });
  }, []);
  //classname
  const navigationBtn =
    "h-10 w-8 hover:opacity-60 hover:bg-white rounded bg-white ";

  const handleSetIdService = (item) => {
    tixCT.setIdService(item.categoryID);
    tixCT.setShowContent(ShowContent(type.ShowSearchServiceItem));
  };
  const handleErrorImage = (e) => {
    e.currentTarget.src = "/assets/imgs/default_service.jpg";
  };
  return (
    <Layout className="!bg-mango-bg-dark h-full relative">
      <Row justify="space-between" className="h-26 pt-2 ">
        <Col>
          <button onClick={handleClickPrev} className={navigationBtn}>
            <IoChevronBack color="black" className="h-1/2 w-full " />
          </button>
        </Col>

        <Row className="bg-white rounded-lg mango-shadow h-[90px] w-[100px] my-2 p-2">
          <button className="mx-auto" onClick={handleCheckOpenItem}>
            <img
              src="/assets/imgs/open_item.svg"
              className="h-[55px] w-[55px]"
            />
          </button>
          <p className="font-semibold w-full text-center truncate ">
            OPEN ITEM
          </p>
        </Row>

        <Col>
          <button onClick={handleClickNext} className={navigationBtn}>
            <IoChevronForward color="black" className="h-1/2 w-full" />
          </button>
        </Col>
      </Row>
      {!isLoading && dataCategories ? (
        <>
          {typeService.length > 0 && dataService.length > 0 && (
            <Radio.Group
              className="customRadioButton"
              defaultValue={tixCT.idService}
            >
              <div
                className="overflow-auto h-[580px] flex justify-start"
                id="navAddNewTix"
              >
                {typeService.map((type, ix) => {
                  return (
                    <Col style={{ minWidth: "100%" }} key={ix}>
                      <div className="w-full">
                        <p className="text-center text-xl font-bold">
                          {type.columnName.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <h1 className="text-center">
                          {type.columnName.toUpperCase()}
                        </h1>
                        <Row>
                          {dataService.length > 0 ? (
                            dataService
                              .filter(
                                (typeItem) =>
                                  typeItem.groupID === type.id &&
                                  typeItem.isService &&
                                  !typeItem.isGiftCard
                              )
                              .map((item) => {
                                return (
                                  <Tooltip
                                    placement="bottom"
                                    title={item.categoryName}
                                    key={item.categoryID}
                                  >
                                    <Col
                                      className="w-1/2 px-2 item-catetory select-none "
                                      onClick={() => handleSetIdService(item)}
                                    >
                                      <Radio.Button
                                        value={item.categoryID}
                                        className="bg-white !w-[90px] !h-[85px] !p-1  !rounded-lg   !shadow-md cursor-pointer text-center select-none"
                                      >
                                        <img
                                          className="flex-1 mx-auto h-12"
                                          src={BASE_URL + item.imageFileName}
                                          onError={(e) => handleErrorImage(e)}
                                          alt="error"
                                        />
                                        <p className="truncate text-center font-semibold pt-1 !text-mango-text-dark text-[12px]">
                                          {item.categoryName.toUpperCase()}
                                        </p>
                                      </Radio.Button>
                                    </Col>
                                  </Tooltip>
                                );
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
          )}
        </>
      ) : (
        <>
          <div className="w-full px-[28%] mt-2">
            <Skeleton
              paragraph={{ rows: 1, width: "100px" }}
              title={false}
              active
            />{" "}
          </div>

          <Row className="mt-4">
            {[...Array(6)].map((index) => {
              return (
                <Col key={index} className="w-1/2 px-2  select-none ">
                  <div className="bg-white !w-[90px] !h-[85px] my-3 !p-1  !rounded-lg   !shadow-md cursor-pointer text-center select-none">
                    <SkeletonButton
                      shape="circle"
                      className="!h-[55px] !w-[55px] mb-1"
                      active
                    />
                    <Skeleton
                      paragraph={{ rows: 1, width: "100%" }}
                      title={false}
                      active
                      className="!h-3"
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Layout>
  );
};

export default SelectService;
