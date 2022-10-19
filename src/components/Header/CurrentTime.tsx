import moment from "moment";
import React, { useEffect, useState } from "react";

function CurrentTime() {
  return (
    <div className="h-full m-auto flex px-2">
      <h4 className="flex justify-center items-center font-medium text-white cursor-pointer ">
        {moment().format("ddd hh:mm A")}
      </h4>
    </div>
  );
}
export default CurrentTime;
