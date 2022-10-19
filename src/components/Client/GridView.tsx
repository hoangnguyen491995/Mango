import { Rate } from 'antd'
import moment from 'moment'
import React from 'react'


function GridView({clientList,isLoading}) {
  return (
    <div
    className="overflow-y-auto flex-row max-h-[100vh] max-w-[100vw] justify-center flex flex-start items-center
   overflow-x-hidden flex-wrap"
  >
    {isLoading ? (
       <div role="status" className="p-1 w-full h-full rounded  shadow  ">
       
      

       <div className="flex items-baseline px-8 space-x-4 ">
        
         {[...Array(6)].map((index) => (
           <div
             key={index}
             className="w-full h-[80vh]  bg-gray-100  space-y-3  "
           >
             {[...Array(2)].map((index) => (
               <div
                 key={index}
                 className="w-full h-[400px] bg-gray-200 rounded-md animate-pulsee "
               ></div>
             ))}
           </div>
         ))}
       </div>
     </div>
    ) : (
      clientList.map((iteminfo, index) => (
        <div
        key={index}
          className="border-[#D1D1D1] border-[1px] rounded-[8px] bg-white w-[290px] h-[440px] m-[10px] py-[10px] 
          px-[20px] client-item shadow-sm cursor-pointer justify-evenly flex-col flex"
        >
          <div className="flex">
            <span
              className="flex font-bold rounded-full w-[80px] h-[80px] min-w-[80px] min-h-[80px] shadow-md justify-center
                 items-center bg-[#FFCD00] text-white text-[32px]"
            >
              T
            </span>
            <div className="pl-3 w-full">
              <div className="text-mango-gray-5 font-bold text-xl flex text-left w-full">
              {iteminfo.customerName.toUpperCase()}
              </div>
              <div className='block w-full text-left'>
              <Rate disabled style={{ color: "#7a878e"}}></Rate>
              </div>
              <div className=" w-full text-[#F44C7F]  text-[13px] text-left">
              {iteminfo.customerType}
              </div>
            </div>
          </div>
          <div className="border-b border-[#D1D1D1] flex justify-start items-left min-h-[25px]">
            <span className="flex-[2_1_0%] w-1/3 text-[14px] flex  items-left text-value">
              Phone
            </span>
            <span className="flex-[3_1_0%] w-2/3  text-[14px] text-left ml-5 text-value">
            {iteminfo.contactPhone ? iteminfo.contactPhone : "N/A"}{" "}
            </span>
            <img
              src="/assets/imgs/37_HidePass.svg"
              className="h-[20px] w-[30px]"
            ></img>
          </div>
          <div className="border-b border-[#D1D1D1] flex justify-start items-center min-h-[25px]">
            <span className="flex-[2_1_0%] w-1/3 text-[14px] flex items-left text-value">
              Birthday
            </span>
            <span className="flex-[3_1_0%] w-2/3 text-[14px] text-left text-value ">
            {iteminfo.birthday || "N/A"}
            </span>
          </div>
          <div className="border-b border-[#D1D1D1] flex justify-start items-center min-h-[25px]">
            <span className="flex-[2_1_0%] w-1/3 text-[14px] flex items-left text-value">
              Fav Techs
            </span>
            <span className="flex-[3_1_0%] w-2/3 text-[14px] text-left text-value ">
            {iteminfo.favouriteTech ? iteminfo.favouriteTech : ""}
            </span>
          </div>
          <div className="border-b border-[#D1D1D1] flex justify-start items-center min-h-[25px]">
            <span className="flex-[2_1_0%]  w-1/3 text-[14px] flex items-left text-value">
              YTD
            </span>
            <span className="flex-[3_1_0%] w-2/3 text-[14px] text-left text-value ">
            {iteminfo.totalSpentByYear}
            </span>
          </div>
          <div className="border-b border-[#D1D1D1] flex justify-start items-center min-h-[25px]">
            <span className="flex-[2_1_0%] w-1/3 text-[14px] flex items-left text-value">
              Last Visit
            </span>
            <span className="flex-[3_1_0%] w-2/3 text-[14px] text-left text-value ">
            {iteminfo.lastVisit == null
                ? "N/A"
                : moment(iteminfo.lastVisit).format("LL")}
            </span>
          </div>
          <div className="border-[1px] border-dashed border-[#A7A7A7] flex justify-between items-center p-[10px] my-[10px]">
            <img
              src="/assets/imgs/Clients/reward.svg"
              className="h-[20px] w-[30px]"
            ></img>
            <span className="text-[16px] text-value">
              REWARD POINTS
            </span>
            <span className="text-[16px] font-bold text-[#93D500] ">
              0
            </span>
          </div>
          <div className="flex min-h-[40px] flex-end justify-between">
            <button
              className="border-2 border-[#707070] bg-white text-[16px] text-value
                        hover:border-[#00BED6] hover:bg-[#00BED64D] rounded-[4px] text-center h-full w-[120px]"
              type="button"
            >
              BOOK APPT
            </button>
            <button
              className="border-2 border-[#707070] bg-white text-[16px] text-value
                        hover:border-[#00BED6] hover:bg-[#00BED64D] rounded-[4px] text-center h-full w-[120px]"
              type="button"
            >
              CHECK IN
            </button>
          </div>
        </div>
      ))
    )}
  </div>
  )
}

export default GridView