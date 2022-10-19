import { Rate } from "antd";
import moment from "moment";
import Router from "next/router";
import React from "react";
import Content from "../AddNewTix/Content";
import { ItemListView } from "./ItemListView";

function ListView({ clientList, isLoading }) {
  return (
    <div>
      <div className="flex pl-[40px] pr-[40px] m-[10px] justify-between ">
        <div className="w-2/3 text-sm text-mango-gray-5 text-left cursor-default font-semibold ">
          CLIENT
        </div>
        <div className="w-2/3 text-sm text-mango-gray-5 text-leftcursor-default  font-semibold ">
          PHONE
        </div>
        <div className="w-2/3 text-sm text-mango-gray-5 cursor-default font-semibold">
          RATING REVIEW
        </div>
        <div className="w-2/3 text-sm text-mango-gray-5 cursor-default font-semibold">
          BIRTHDAY
        </div>
        <div className="w-2/3 text-sm text-mango-gray-5  cursor-default font-semibold ">
          FAVORITE TECHS
        </div>
        <div className="w-2/3 text-sm text-mango-gray-5 cursor-default  font-semibold ">
          LAST VISIT
        </div>
        <div className="w-2/3 text-sm text-mango-gray-5 cursor-default font-semibold ">
          REWARD POINTS
        </div>
        <div className="w-2/3 text-sm text-mango-gray-5 cursor-default font-semibold ">
          YTD
        </div>
        <div className="w-2/3 text-sm text-mango-gray-5 text-left font-semibold "></div>
      </div>
      <div className="overflow-y-scroll h-[88vh] w-[100vw] pt-3 mt-[10px] pl-[20px] pr-[20px] space-y-[20px] ">
        {isLoading ? (
          <div role="status" className="p-1 w-full h-full rounded  shadow  ">
            <div className="space-y-4 pt-1">
              {[...Array(12)].map((index) => (
                <div className="w-full h-16  bg-gray-100 rounded-md animate-pulsee"></div>
              ))}
            </div>
          </div>
        ) : (
          clientList.map((iteminfo, index) => (
            <ItemListView iteminfo={iteminfo} key={index} />
          ))
        )}
      </div>{" "}
    </div>
  );
}

export default ListView;
