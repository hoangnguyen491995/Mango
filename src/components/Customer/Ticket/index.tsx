import React from "react";

function Ticket({ customerId }) {
  return (
    <div className="flex w-full h-full pl-10  pt-2 bg-mango-bg-gray-light">
      <div className=" w-1/3  pr-4 border-r border-mango-gray-4  ">
        <span className="font-semibold">APPOINTMENTS</span>
        {/* <div>
          <div className="flex w-full">
            <div className="w-2/12">TECH</div>
            <div className="w-1/12">STATUS</div>
            <div className="w-3/12">SERVICE</div>
            <div className="w-2/12" >DATE</div>
            <div className="w-2/12">TIME</div>
            <div className="w-1/12">GUEST</div>
          </div>
          <div></div>
        </div> */}
      </div>
      <div className=" w-1/3 px-4 border-r border-mango-gray-4  ">
      <span className="font-semibold">TICKET HISTORY</span>

      </div>
      <div className=" w-1/3  mx-3">
      <span className="font-semibold">PAYMENT METH</span>
      </div>
    </div>
  );
}

export default Ticket;
