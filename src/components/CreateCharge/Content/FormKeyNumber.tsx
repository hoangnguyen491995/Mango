import React, { useEffect, useState } from "react";

const keyCalc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."];
function FormKeyNumber({
  defaultValue,
  defaultColor,
  type,
  isPercent,
  isCurrency,
  setValue,
  value,
}) {
  const [textColor, setTextColor] = useState<string>(defaultColor);

  useEffect(() => {
    setValue(defaultValue);
    setTextColor(defaultColor);
  }, []);

  const handleKeyNumber = (key: string) => {
    let currentValue = value;
    if (key == "C") {
      setValue(defaultValue);
      setTextColor(defaultColor);
    } else {
      setTextColor("text-[#F89D20]");

      if (value == defaultValue) {
        currentValue = key;
      } else {
        if (key == ".") {
          if (currentValue.includes(".")) {
            currentValue = currentValue.replace(".", "");
          }
        }
        currentValue = currentValue + key;
      }

      if (isPercent) {
        currentValue = currentValue.replace("%", "");
        setValue(currentValue + "%");
      } else if (isCurrency) {
        currentValue = currentValue.replace("$", "");
        setValue("$" + currentValue);
      } else {
        setValue(currentValue);
      }
    }
  };
  return (
    <>
      <div className="w-full">
        {type == "discount" ? (
          <div
            className={`flex w-[131px] justify-center ${textColor} font-semibold bg-white mx-auto text-[20px]`}
          >
            {value}
          </div>
        ) : (
          <div
            className={`flex w-[131px] justify-center ${textColor} font-semibold bg-white mx-auto text-[22px]`}
          >
            {value}
          </div>
        )}
        <div className="flex w-full justify-center">
          <div className="flex justify-center w-full items-center flex-wrap pt-[10px] m-auto">
            {keyCalc.map((item, index) => {
              return (
                <div key={index}>
                  <button
                    className="border-[#A7A7A7] border-[1.5px] w-[65px] h-[65px] rounded-full ml-[10px] mr-[5px] 
                    mb-[15px] cursor-pointer"
                    onClick={() => handleKeyNumber(item)}
                  >
                    <span className="font-semibold text-[#505050] text-[35px]">
                      {item}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default FormKeyNumber;
