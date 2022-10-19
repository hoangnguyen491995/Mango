import React, { useState, useEffect, useMemo } from "react";
import { Slider } from "antd";

function ScrollFooter() {
  const [widthContent, setWidthContent] = useState<number>();
  const [widthCon, setWidthCon] = useState<number>();
  const [_doc, set_Doc] = useState<Document>();

  const handleCroll = (v) => {
    let timeContent = document.getElementById("timeContent");

    if (timeContent) {
      timeContent.scrollTo(v, 0);
    }
  };

  useEffect(() => {
    set_Doc(document);
  }, []);

  const onClickSetWidth = () => {
    let timeContent = document.getElementById("timeContent");
    if (timeContent) {
      if (widthContent != timeContent.scrollWidth - screen.width) {
        setWidthContent(timeContent.scrollWidth - screen.width);
      }
    }
  };
  const hankeClick = () => {
    let timeContent = document.getElementById("timeContent");

    if (timeContent) {
      timeContent.scrollLeft += 50;
    }
  };

  //   useEffect(() => {

  //       let timeContent = document.getElementById('timeContent');
  //       if(timeContent){
  //         setWidthContent(timeContent.scrollWidth - screen.width)
  //
  //       }

  // }, [widthCon]);
  return (
    <div
      className="absolute w-screen bg-gray-100 bottom-0 z-10 h-11 flex justify-center"
      onMouseEnter={onClickSetWidth}
    >
      <Slider
        className=" w-11/12 bg-c pl-20 justify-center"
        min={0}
        max={widthContent}
        onChange={(v) => {
          handleCroll(v);
        }}
      />
      {/* <button onClick={hankeClick} className="w-20 h-9 border border-gray-400">hghh</button> */}
    </div>
  );
}

export default ScrollFooter;
