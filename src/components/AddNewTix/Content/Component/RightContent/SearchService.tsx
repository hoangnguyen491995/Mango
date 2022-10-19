import { Col, Empty, Input, message, Row } from "antd";
import Search from "antd/lib/input/Search";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { APIItemService } from "services/ItemService/ItemService";
import { APISearchAllItemService } from "services/SearchAllItemService/SearchAllItemService";
import TixContext from "../../TixContext";
import { APIEmpAssignSer } from "services/EmpAssignSer/EmpAssignSer";
import { IItemService } from "../../DataStructures";
import {
  convert12HToSec,
  convertSecTo12H,
  groupBy,
  ShowContent,
  type,
} from "../../helper";
import { ImageExists } from "src/utils/ImageError";
import Openitems from "./OpenItems";
import { ItemService } from "./ItemService";
import { InputSearchUAT } from "src/components/UATDesign/InputSearchUAT";
import InputUAT from "src/components/UATDesign/InputUAT";

const SearchService: FC = () => {
  //data context
  const tixCT = useContext(TixContext)[0];

  //
  const [searchServiceValue, setSearchServiceValue] = useState<string>("");
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = useState<Array<IItemService>>([]);
  const [dataSearchAll, setDataSearchAll] = useState<Array<any>>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const dataItemService = new APIItemService();
  const dataSearchAllItemService = new APISearchAllItemService();
  useEffect(() => {
    setFocusInput(false);
    dataItemService.ItemService(tixCT.idService).then((res) => {
      setDataSearch(res.data);
    });
  }, [tixCT.idService]);

  //function

  const handleFocusSearchService = () => {
    setFocusInput(true);
    tixCT.setShowContent(ShowContent(type.ShowSearchServiceItem));
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

  return (
    <>
      <div className="h-full p-5 ">
        <h2 className="text-left font-semibold h-5">
          SELECT SERVICE FOR TECH ""
        </h2>
        <div className="border-b border-mango-border-dark w-full pb-1">
          <InputSearchUAT
            valueSearch={searchServiceValue}
            setValueSearch={setSearchServiceValue}
            onFocus={() => handleFocusSearchService()}
            onBlur={() => handleUnFocusSearchService()}
            placeholder={"Search Service"}
          />
        </div>

        {/* OpenItem */}
        {tixCT.showContent.showOpenItem ? (
          <Openitems />
        ) : focusInput ? (
          //Search all item service
          <div className="overflow-auto h-[580px]">
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
                          return <ItemService item={item} key={index} />;
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
                  const colLength = dataSearch.length;
                  return (
                    <div
                      className={
                        "p-3 " +
                        (dataSearch.length == 1 && "flex flex-wrap  ") +
                        (colLength == 2 && "w-1/2")
                      }
                      key={ix}
                    >
                      <h3 className="h-7 w-full">{itemList[0].columnName}</h3>
                      {itemList.map((item: IItemService, index) => {
                        return <ItemService item={item} key={index} />;
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
