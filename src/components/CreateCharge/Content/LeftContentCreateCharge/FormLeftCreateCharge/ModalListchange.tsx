import { Button, Popover } from "antd";
import React from "react";

const content = (
  <div className="w-[200px]  flex flex-col justify-center items-center">
    <p className="pt-4 ">CHANGE TECH</p>
    <p className="pt-2">CHANGE ITEM</p>
    <p className="pt-2"> CHANGE PRICE</p>
    <p className="pt-2">DISCOUNT ITEM</p>
  </div>
);

const ModalChangeList: React.FC = () => (
  <div className="demo">
    <div>
      <Popover placement="right" content={content} trigger="click">
        <Button>kk</Button>
      </Popover>
    </div>
  </div>
);

export default ModalChangeList;
