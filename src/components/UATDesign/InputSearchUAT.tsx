// @flow

import * as React from "react";
interface Props {
  valueSearch: string;
  setValueSearch: Function;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}
export const InputSearchUAT = ({
  valueSearch,
  setValueSearch,
  placeholder,
  onFocus,
  onBlur,
}: Props) => {
  const [isFocusInput, setIsFocusInput] = React.useState<boolean>(false);

  return (
    <div className="relative w-full !p-0">
      <input
        className=" w-full  text-ms border-none !p-0"
        type="search"
        placeholder={placeholder}
        onFocus={(e) => {
          setIsFocusInput(true);
          onFocus === null || onFocus === void 0 ? void 0 : onFocus();
        }}
        onBlur={(e) => {
          setIsFocusInput(false),
            onBlur === null || onBlur === void 0 ? void 0 : onBlur();
        }}
        onChange={(e) => setValueSearch(e.target.value)}
        value={valueSearch}
      ></input>
      <div
        className=" right-0 bottom-2 mr-2  text-mango-gray-5 rounded-lg cursor-pointer absolute"
        onClick={() => {
          setValueSearch("");
        }}
      >
        {isFocusInput ? (
          <svg
            className=" "
            width="18"
            height="18"
            viewBox="4 4 8 8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 
        0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 
        1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />{" "}
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998
     12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925
      15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025
       12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1
        6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637
         1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
