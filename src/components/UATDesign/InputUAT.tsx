// @flow

import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  sizeInputUAT?: "small" | "middle" | "large" | undefined;
}
const InputUAT: React.FC<InputProps> = ({
  className,
  sizeInputUAT,
  ...props
}) => {
  const sizeInput = () => {
    switch (sizeInputUAT) {
      case "small":
        return " !h-[35px] ";
      case "middle":
        return " !h-[40px] ";
      case "large":
        return " !h-[45px] ";
      default:
        return " !h-[40px] ";
    }
  };
  return (
    <input
      className={
        " w-full  text-ms border-b border-mango-border-dark  focus:outline-none   " +
        sizeInput() +
        className
      }
      {...props}
    ></input>
  );
};
export default InputUAT;
