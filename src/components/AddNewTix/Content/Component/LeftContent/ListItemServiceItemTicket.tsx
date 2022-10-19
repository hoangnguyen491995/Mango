import { Button, Col, List, Row } from "antd";
import Item from "antd/lib/list/Item";
import moment from "moment";
import { RemoveIcon } from "public/assets/imgs/removeIcon";
import { useContext, useEffect, useState } from "react";
import { IoHeartCircleOutline } from "react-icons/io5";
import { ButtonUAT } from "src/components/UATDesign/ButtonUAT";
import { currencyFormat } from "src/helper/General";
import { IListTicket, ListWithTech } from "../../DataStructures";

import {
  changeStartallsametime,
  changeStartOOAT,
  ShowContent,
  type,
} from "../../helper";
import TixContext from "../../TixContext";

export const ListItemServiceItemTicket = ({ indexAppt }) => {
  //data context
  const tixCT = useContext(TixContext)[0];
  //hook
  const [statusStartTix, setStatusStartTix] = useState<boolean>(
    tixCT.dataItemTix[tixCT.idAppt].isStartAllSameTime || false
  );
  const handleShowDuration = () => {
    tixCT.setShowContent(ShowContent(type.ShowSelectDuration));
  };
  const TotalDuration = () => {
    const totalDur = tixCT.dataItemTix[indexAppt].listWithTech.reduce(
      (totalDur, item) => {
        const totalItemDur = item.listServiceWithTech.reduce(
          (tatalItemDur, item) => {
            return tatalItemDur + item.itemDur;
          },
          0
        );
        return totalDur + totalItemDur;
      },
      0
    );
    tixCT.dataItemTix[tixCT.idAppt].totalDuration = totalDur;
    return totalDur;
  };
  const TotalPrice = () => {
    const totalPrice = tixCT.dataItemTix[indexAppt].listWithTech.reduce(
      (totalPrice, item) => {
        const totalItemPrice = item.listServiceWithTech.reduce(
          (totalItemPrice, item) => {
            return totalItemPrice + item.itemPrice;
          },
          0
        );
        return totalPrice + totalItemPrice;
      },
      0
    );
    return currencyFormat(totalPrice);
  };
  const handleChangeStatusTimeTix = () => {
    setStatusStartTix(!statusStartTix);
    tixCT.dataItemTix[tixCT.idAppt].isStartAllSameTime = !statusStartTix;
    if (tixCT.dataItemTix[tixCT.idAppt].isStartAllSameTime) {
      changeStartallsametime(
        tixCT.idAppt,
        tixCT.dataItemTix,
        tixCT.startDateTix,
        tixCT.startTimeTix,
        tixCT.idTech
      );
    } else
      changeStartOOAT(
        tixCT.idAppt,
        tixCT.dataItemTix,
        tixCT.startDateTix,
        tixCT.startTimeTix,
        tixCT.idTech
      );
    tixCT.setStatusChange(!tixCT.statusChange);
  };
  const handleRemoveItemService = (indexTicket, indexItem) => {
    tixCT.dataItemTix[tixCT.idAppt].listWithTech[
      indexTicket
    ].listServiceWithTech.splice(indexItem, 1);
    tixCT.setStatusChange(!tixCT.statusChange);
  };
  const handleRemoveTech = (indexTicket) => {
    tixCT.dataItemTix[tixCT.idAppt].listWithTech.splice(indexTicket, 1);
    if (tixCT.dataItemTix[tixCT.idAppt].listWithTech.length === 0) {
      tixCT.dataItemTix[tixCT.idAppt].listWithTech.push({
        employeeID: 9999,
        employeeNickName: "NEXT AVAILABLE",
        isRequestTech: false,
        listServiceWithTech: [],
      });
    }
    tixCT.setIdTech(tixCT.dataItemTix[tixCT.idAppt].listWithTech[0].employeeID);
    tixCT.setStatusChange(!tixCT.statusChange);
  };
  const handleClickItemTix = (EmployeeID) => {
    tixCT.setIdTech(EmployeeID);
  };
  const handleChangeAppt = () => {
    tixCT.setIdAppt(indexAppt);
  };
  useEffect(() => {
    changeStartOOAT(
      tixCT.idAppt,
      tixCT.dataItemTix,
      tixCT.startDateTix,
      tixCT.startTimeTix,
      tixCT.idTech
    );
    changeStartallsametime(
      tixCT.idAppt,
      tixCT.dataItemTix,
      tixCT.startDateTix,
      tixCT.startTimeTix,
      tixCT.idTech
    );
    tixCT.setStatusChange(!tixCT.statusChange);
  }, [tixCT.startTimeTix]);
  return (
    <div onClick={handleChangeAppt} className="shadow-md ">
      <div
        className={
          "cursor-pointer h-10 flex  " +
          (indexAppt == tixCT.idAppt ? "bg-mango-primary-blue " : "bg-gray-300")
        }
      >
        <div className=" pl-2 flex-[2] my-auto ">
          <div
            className="w-full  !h-[30px] !rounded-[4px] hover:mango-shadow !text-left   hover:!bg-white  !text-ellipsis !overflow-hidden !font-semibold !text-white !text-xs hover:!text-black "
            title={
              tixCT.dataItemTix[indexAppt].customerID > 0
                ? tixCT.dataItemTix[indexAppt].name
                : "NON INFO"
            }
            onClick={() => {
              tixCT.dataItemTix[indexAppt].customerID > 0
                ? (tixCT.setShowContent(ShowContent(type.ShowInfoClient)),
                  tixCT.setIdClientTix(tixCT.dataItemTix[indexAppt].customerID))
                : tixCT.setShowContent(ShowContent(type.ShowSearchClient));
            }}
          >
            {tixCT.dataItemTix[indexAppt].customerID > 0
              ? tixCT.dataItemTix[indexAppt].name
              : " "}
          </div>
        </div>
        <div className=" flex-[2] my-auto ">
          <div
            className="w-fit min-[80px] mx-auto !text-ellipsis flex items-center justify-center bg-white border  !overflow-hidden !font-semibold  !text-xs !p-1 !rounded-[4px] mango-shadow !h-[25px]"
            onClick={handleChangeStatusTimeTix}
          >
            {statusStartTix ? "Start OAAT" : "Start All Same Time"}
          </div>
        </div>
        <div className=" flex-[1] my-auto">
          <div
            className="w-full min-[80px] mx-auto !text-ellipsis flex items-center justify-center bg-white border  !overflow-hidden !font-semibold  !text-xs !p-1 !rounded-[4px] mango-shadow !h-[25px]"
            onClick={handleShowDuration}
          >
            {TotalDuration()} m
          </div>
        </div>
        <div className=" flex-[1] pr-[10px] my-auto">
          {tixCT.dataItemTix[indexAppt].listWithTech.length > 0 && (
            <p className="flex text-white items-center my-auto justify-end h-full text-xs font-bold">
              ${TotalPrice()}
            </p>
          )}
        </div>
      </div>

      {/* List Service */}
      <List
        className="flex-1 overflow-auto max-h-[300px]  "
        bordered
        dataSource={tixCT.dataItemTix[indexAppt].listWithTech}
        renderItem={(itemTicket: ListWithTech, indexTicket) => (
          <Item
            onClick={() => {
              handleClickItemTix(itemTicket.employeeID);
            }}
            className={
              "flex flex-wrap  !border-b-gray-400 !border-dashed !border-b cursor-pointer select-none !pl-4 !pr-1  " +
              (itemTicket.employeeID === tixCT.idTech
                ? " !bg-gray-100"
                : " !bg-white")
            }
          >
            <div
              className="basis-full  flex flex-row  "
              onClick={() => {
                tixCT.setIdTech(itemTicket.employeeID);
              }}
            >
              <img
                src="/assets/imgs/New24px-cancel-service-01.svg"
                onClick={() => handleRemoveTech(indexTicket)}
              />

              <Button
                size="small"
                className="!border-none !bg-transparent hover:!ml-2 hover:!bg-mango-primary-blue-hover hover:!text-black !rounded"
                onClick={() => {
                  tixCT.setShowContent(ShowContent(type.ShowSelectTech));
                }}
              >
                <span className="font-extrabold ">
                  {itemTicket.employeeNickName
                    ? itemTicket.employeeNickName.toUpperCase()
                    : "NEXT AVAILABLE"}
                </span>
              </Button>
              {itemTicket.employeeID > 9999 && (
                <Button
                  size="small"
                  type="text"
                  shape="circle"
                  onClick={() => {
                    const isRequestTech =
                      !tixCT.dataItemTix[tixCT.idAppt].listWithTech[indexTicket]
                        .isRequestTech;
                    tixCT.dataItemTix[tixCT.idAppt].listWithTech[
                      indexTicket
                    ].isRequestTech = isRequestTech;

                    tixCT.setStatusChange(!tixCT.statusChange);
                  }}
                >
                  <img
                    src={
                      "/assets/imgs/" +
                      (itemTicket.isRequestTech
                        ? "heart.svg"
                        : "heartDisable.svg")
                    }
                    className="w-full h-full !shadow-md rounded-full !p-0 !m-0 "
                  />
                </Button>
              )}
            </div>
            <div className="basis-full flex flex-row">
              {itemTicket.listServiceWithTech.length <= 0 ? (
                <Button
                  size="small"
                  className="my-3 !font-bold !text-mango-primary-blue !border-none hover:!bg-mango-primary-blue-hover ml-9 !px-8"
                  onClick={() => {
                    tixCT.setShowContent(
                      ShowContent(type.ShowSearchServiceItem)
                    );
                  }}
                >
                  + ADD SERVICE
                </Button>
              ) : (
                // List Service
                <Row className="w-full items-center !h-full ">
                  {itemTicket.listServiceWithTech.map((itemItem, indexItem) => (
                    <div
                      className={
                        "hover:!bg-[#ffcd0060] w-full !h-[30px] flex rounded-[4px] my-1  " +
                        (indexItem === tixCT.indexItemService &&
                          itemTicket.employeeID === tixCT.idTech &&
                          " !bg-[#ffcd00]")
                      }
                      key={indexItem}
                      onClick={() => {
                        tixCT.setIndexItemService(indexItem);
                      }}
                    >
                      <div className=" flex-[0.5] ">
                        <div
                          onClick={() =>
                            handleRemoveItemService(indexTicket, indexItem)
                          }
                          className="w-[45px] h-[30px] rounded-[4px]  pt-[2px] hover:!bg-mango-primary-orange  text-[#f28500] hover:text-white !flex !items-center justify-center"
                        >
                          <RemoveIcon className="h-4 " fill="currentcolor" />
                        </div>
                      </div>
                      <div className=" flex-[2] ">
                        <span className="text-sm w-full font-semibold !flex !items-center !h-full ml-1">
                          {itemItem.itemName}
                        </span>
                      </div>
                      <div className=" flex-[2] ">
                        <p
                          className="text-mango-primary-blue text-[12px] font-bold !text-ellipsis !mx-1 !flex !items-center !justify-center !h-full !overflow-hidden    !p-0 !rounded-md hover:mango-shadow  text-center !w-fit-content  hover:!bg-cyan-100"
                          onClick={() => {
                            tixCT.setShowContent(
                              ShowContent(type.ShowSelectTimeTix)
                            );
                          }}
                        >
                          AS {moment(itemItem.startTime).format("hh:mm A")}
                        </p>
                      </div>
                      <div className=" flex-1 !py-[6px] ">
                        <p
                          style={{ font: "normal normal 700 var(--s-11)" }}
                          className=" text-center !w-[70px] !h-full !rounded-[4px] !bg-white border  !border-mango-primary-blue mango-shadow-1 !m-0   "
                          onClick={() => {
                            tixCT.setDurValue(itemItem.itemDur);
                            tixCT.setShowContent(
                              ShowContent(type.ShowSelectDuration)
                            );
                          }}
                          title={Number(itemItem.itemDur) + "m"}
                        >
                          {Number(itemItem.itemDur)}m
                        </p>
                      </div>
                      <div className=" flex-1 !pr-[10px] text-right ">
                        {" "}
                        <p className="flex items-center justify-end h-full text-xs font-bold">
                          ${currencyFormat(itemItem.itemPrice)}
                        </p>
                      </div>
                    </div>
                  ))}
                </Row>
              )}
            </div>
          </Item>
        )}
      />
    </div>
  );
};
