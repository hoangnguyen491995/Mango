import { Col, Empty, Radio, Row, Tooltip } from "antd";
import { useContext, useEffect, useState } from "react";
import { APIListCategory } from "services/ListCategory/ListCategory";
import { APIListCategoryGroup } from "services/ListCategoryGroup/ListCategoryGroup";
import { IGroup, IListCategories, IModel } from "src/components/AddNewTix/Content/DataStructures";
import SelectTechService from "./SelectTechServiceApptContext";



interface Props {
  dataCategories: IListCategories;

}
export const ItemCategory = ({ dataCategories}: Props) => {
  //data context
  const selectTSContext = useContext(SelectTechService);
  //Call api
  const [dataService, setDataService] = useState<Array<IModel>>(
    dataCategories.category
  );
  const [typeService, setTypeService] = useState<Array<IGroup>>(
    dataCategories.categoryStypeBasic
  );
  useEffect(() => {
    setDataService(dataCategories.category);
    setTypeService(dataCategories.categoryStypeBasic);
  }, [dataCategories]);

  const handleSetIdService = (item) => {
    selectTSContext.setIdCategory(item.categoryID);

  };
  const handleErrorImage = (e) => {
    e.currentTarget.src = "/assets/imgs/default_service.jpg";
  };
  //base url image
  const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_API_MANGO;
  const BASE_URL = DOMAIN_URL + "/Upload/categories/";
  return (
    <>
      {typeService.length > 0 && dataService.length > 0 && (
        <Radio.Group defaultValue={dataService[0].categoryID}>
          <div className="overflow-auto h-[605px] flex" id="navAddNewTix">
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
                                  className="w-1/2 p-2 item-catetory select-none "
                                  onClick={() => handleSetIdService(item)}
                                >
                                  <Radio.Button
                                    value={item.categoryID}
                                    className="bg-white h-full !rounded-lg !pt-2  !shadow-md cursor-pointer text-center select-none"
                                  >
                                    <img
                                      className="flex-1 mx-auto h-12"
                                      src={BASE_URL + item.imageFileName}
                                      onError={(e) => handleErrorImage(e)}
                                      alt="error"
                                    />
                                    <p className="truncate text-center font-semibold pt-1">
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
  );
};
