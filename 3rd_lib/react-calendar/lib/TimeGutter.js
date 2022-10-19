import React, { useState, useEffect, useCallback, useMemo } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { getSlotMetrics } from "./utils/TimeSlots";
import TimeSlotGroup from "./TimeSlotGroup";
import { Button } from 'antd';
/**
 * Since the TimeGutter only displays the 'times' of slots in a day, and is separate
 * from the Day Columns themselves, we check to see if the range contains an offset difference
 * and, if so, change the beginning and end 'date' by a day to properly display the slots times
 * used.
 */
function adjustForDST({ min, max, localizer }) {
  if (localizer.getTimezoneOffset(min) !== localizer.getTimezoneOffset(max)) {
    return {
      start: localizer.add(min, -1, "day"),
      end: localizer.add(max, -1, "day"),
    };
  }
  return { start: min, end: max };
}

const TimeGutter = ({
  min,
  max,
  timeslots,
  step,
  localizer,
  getNow,
  resource,
  components,
  getters,
  gutterRef,
  countEventsInHourSlot,
}) => {
  const { timeGutterWrapper: TimeGutterWrapper } = components;
  const { start, end } = useMemo(
    () => adjustForDST({ min, max, localizer }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [min?.toISOString(), max?.toISOString(), localizer]
  );
  const [slotMetrics, setSlotMetrics] = useState(
    getSlotMetrics({
      min: start,
      max: end,
      timeslots,
      step,
      localizer,
    })
  );

  useEffect(() => {
    if (slotMetrics) {
      setSlotMetrics(
        slotMetrics.update({
          min: start,
          max: end,
          timeslots,
          step,
          localizer,
        })
      );
    }
    /**
     * We don't want this to fire when slotMetrics is updated as it would recursively bomb
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start?.toISOString(), end?.toISOString(), timeslots, step]);

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }   
  let topPosition='';
  
      if (typeof window !== "undefined") {
        let elm = document.querySelectorAll(".rbc-current-time-indicator")[0]
        if(elm){
          topPosition =  window.getComputedStyle(elm).top
        }
      }
  
  const renderSlot = useCallback(
    (value, idx) => {
      let countNow = countEventsInHourSlot.find(
        (x) => x.label == value.getHours()
      );
 
      const isNow = slotMetrics.dateIsInGroup(getNow(), idx);

      

      return (
        <div>
          <div
            className={clsx("rbc-label ", isNow && "rbc-now")}
            style={{ display: value.getMinutes() > 1 ? "none" : "flex" }}
          >
            {formatDate(value)}
           
          </div>
          <div
              style={{
                display:
                  value.getMinutes() > 14 && value.getMinutes() < 30
                    ? "flex"
                    : "none",
                justifyContent: "flex-end",
                width: "100%",
                backgroundImage: "none",
                backgroundColor: "#F2F2F7",
                marginRight: "3px",
              }}
            >
              <span
                style={{
                  marginRight: "5px",
                }}
                className="rbc-label-count"
              >
                {countNow != undefined ? countNow.count : "0"}
              </span>
      
            </div>
        </div>
      );
    },
    [slotMetrics, localizer, getNow]
  );

  return (
    <TimeGutterWrapper slotMetrics={slotMetrics}>
      <div id= "timeLeftSection" className="rbc-time-gutter rbc-time-column" ref={gutterRef}>
        {slotMetrics.groups.map((grp, idx) => {
          return (
            <div  key={idx} className="w-full rbc-time-label">
            <TimeSlotGroup
              key={idx}
              group={grp}
              resource={resource}
              components={components}
              renderSlot={renderSlot}
              getters={getters}
            />
           { slotMetrics.dateIsInGroup(getNow(), idx) && 
           <div className= "rbc-current-time-indicator-button"
            style= {{
              top: topPosition,
            }}  >
          {formatDate( getNow())}
        </div>}
            </div>
          );
        })}
      </div>
    </TimeGutterWrapper>
  );
};

TimeGutter.propTypes = {
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  timeslots: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  getNow: PropTypes.func.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object,

  localizer: PropTypes.object.isRequired,
  resource: PropTypes.string,
  gutterRef: PropTypes.any,
};

export default React.forwardRef((props, ref) => (
  <TimeGutter gutterRef={ref} {...props} />
));
