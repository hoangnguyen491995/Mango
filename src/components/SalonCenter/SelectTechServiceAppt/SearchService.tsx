import { Col, Empty, message, Row } from "antd";
import Search from "antd/lib/input/Search";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { APIItemService } from "services/ItemService/ItemService";
import { APISearchAllItemService } from "services/SearchAllItemService/SearchAllItemService";
import { IItemService } from "src/components/AddNewTix/Content/DataStructures";
import { groupBy } from "src/components/AddNewTix/Content/helper";
import { IItemDataTix } from ".";
import { ITixAppt } from "../DataStructures";

import { IListApptDetail } from "./DataStructures";
import { ItemService } from "./ItemService";
import SelectTechService from "./SelectTechServiceApptContext";

interface Props {
  itemDataTix: IItemDataTix;
}
const SearchService = ({ itemDataTix }: Props) => {
  //
  const [searchServiceValue, setSearchServiceValue] = useState<string>("");
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = useState<Array<IItemService>>([]);
  const [dataSearchAll, setDataSearchAll] = useState<Array<any>>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const dataItemService = new APIItemService();
  const dataSearchAllItemService = new APISearchAllItemService();
  const selectTSContext = useContext(SelectTechService);
  useEffect(() => {
    setFocusInput(false);
    dataItemService.ItemService(selectTSContext.idCategory).then((res) => {
      setDataSearch(res.data);
    });
  }, [selectTSContext.idCategory]);

  //function

  const handleFocusSearchService = () => {
    setFocusInput(true);

    if (dataSearchAll.length <= 0) {
      dataSearchAllItemService.SearchAllItemService().then((res) => {
        const dataFilter = groupBy(res.data, (item) => item.tabName);
        setDataSearchAll(Array.from(dataFilter));
      });
    }
  };
  const handleUnFocusSearchService = () => {};
  const onSearch = (value: string) => {
    setSearchServiceValue(value);
  };

  //classname
  //url background

  return (
    <>
      <div className="pl-6">
        <h2 className="text-center">SELECT SERVICE FOR TECH</h2>
        <Search
          placeholder="Search Service"
          size="large"
          className="w-full !border-b-2 !focus:outline-none"
          onFocus={handleFocusSearchService}
          onBlur={handleUnFocusSearchService}
          onChange={(e) => onSearch(e.target.value)}
          bordered={false}
          allowClear
          defaultValue=""
          onSearch={onSearch}
        />
        {/* OpenItem */}
        {/* {tixCT.showContent.showOpenItem ? (
          <Openitems />
        ) :  */}
        {focusInput ? (
          //Search all item service
          <div className="overflow-auto h-[600px]">
            {dataSearchAll.length > 0 ? (
              dataSearchAll.map((itemList, ix) => {
                return (
                  <div key={ix}>
                    <h1 className="font-700 text-cyan-500 border-b-2  ">
                      {itemList[0]}
                    </h1>
                    <Row>
                      {itemList[1].map((item: IItemService, index) => {
                        if (
                          item.itemName
                            .toUpperCase()
                            .includes(searchServiceValue.toUpperCase())
                        ) {
                          return (
                            <ItemService
                              item={item}
                              key={index}
                              itemDataTix={itemDataTix}
                            />
                          );
                        }
                      })}
                    </Row>
                  </div>
                );
              })
            ) : (
              <Empty className="flex-1" />
            )}
          </div>
        ) : (
          // Search theo id service
          <div className="p-3 text-center overflow-auto flex max-h-[620px]">
            {dataSearch.length > 0 ? (
              dataSearch.map((itemList: any, ix) => {
                {
                  return (
                    <div
                      className={
                        "p-3 " + (dataSearch.length == 1 && "flex flex-wrap")
                      }
                      key={ix}
                    >
                      <h3 className="h-7 w-full">{itemList[0].columnName}</h3>
                      {itemList.map((item: IItemService, index) => {
                        return (
                          <ItemService
                            item={item}
                            key={index}
                            itemDataTix={itemDataTix}
                          />
                        );
                      })}
                    </div>
                  );
                }
              })
            ) : (
              <Empty className="flex-1" />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchService;
