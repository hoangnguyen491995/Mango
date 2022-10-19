// @flow
import * as React from "react";
interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  size?: "small" | "middle" | "large" | undefined;
  type?: "primary-blue" | "primary-white" | undefined;
}
export const ButtonUAT: React.FC<ButtonProps> = ({
  children,
  className,
  size,
  type,
  ...props
}) => {
  const typeButton = () => {
    switch (type) {
      case "primary-blue":
        return " bg-mango-primary-blue !border-mango-primary-blue  shadow-mango-shadow-2 hover:shadow-mango-shadow-3 text-white font-bold text-[16px] not-italic ";
      case "primary-white":
        return " bg-white hover:bg-mango-primary-blue  border-mango-border-dark border hover:border-none  shadow-mango-shadow-2 hover:shadow-mango-shadow-3 text-mango-text-medium font-bold text-[16px] hover:text-white not-italic ";
      default:
        return "  ";
    }
  };
  const sizeButton = () => {
    switch (size) {
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
    <div
      className={
        "w-full !rounded-[4px]  cursor-pointer flex items-center justify-center normal-case  " +
        typeButton() +
        sizeButton() +
        className
      }
      {...props}
    >
      {children}
    </div>
  );
};
