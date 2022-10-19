"use strict";

var _interopRequireWildcard =
  require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault =
  require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(
  require("@babel/runtime/helpers/slicedToArray")
);

var _react = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

const { BsFileX } = require("react-icons/bs");
var _TimeSlots = require("./utils/TimeSlots");

var _TimeSlotGroup = _interopRequireDefault(require("./TimeSlotGroup"));

var _DayColumn = _interopRequireDefault(require("./DayColumn"));
/**
 * Since the TimeGutter only displays the 'times' of slots in a day, and is separate
 * from the Day Columns themselves, we check to see if the range contains an offset difference
 * and, if so, change the beginning and end 'date' by a day to properly display the slots times
 * used.
 */
function adjustForDST(_ref) {
  var min = _ref.min,
    max = _ref.max,
    localizer = _ref.localizer;

  if (localizer.getTimezoneOffset(min) !== localizer.getTimezoneOffset(max)) {
    return {
      start: localizer.add(min, -1, "day"),
      end: localizer.add(max, -1, "day"),
    };
  }

  return {
    start: min,
    end: max,
  };
}


var TimeGutter = function TimeGutter(_ref2) {
  var min = _ref2.min,
    max = _ref2.max,
    timeslots = _ref2.timeslots,
    step = _ref2.step,
    localizer = _ref2.localizer,
    getNow = _ref2.getNow,
    resource = _ref2.resource,
    components = _ref2.components,
    getters = _ref2.getters,
    gutterRef = _ref2.gutterRef,
    countEventsInHourSlot = _ref2.countEventsInHourSlot;

  var _useMemo = (0, _react.useMemo)(
      function () {
        return adjustForDST({
          min: min,
          max: max,
          localizer: localizer,
        });
      }, // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        min === null || min === void 0 ? void 0 : min.toISOString(),
        max === null || max === void 0 ? void 0 : max.toISOString(),
        localizer,
      ]
    ),
    start = _useMemo.start,
    end = _useMemo.end;

  var _useState = (0, _react.useState)(
      (0, _TimeSlots.getSlotMetrics)({
        min: start,
        max: end,
        timeslots: timeslots,
        step: step,
        localizer: localizer,
      })
    ),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    slotMetrics = _useState2[0],
    setSlotMetrics = _useState2[1];

  (0, _react.useEffect)(
    function () {
      if (slotMetrics) {
        setSlotMetrics(
          slotMetrics.update({
            min: start,
            max: end,
            timeslots: timeslots,
            step: step,
            localizer: localizer,
          })
        );
      }
      /**
       * We don't want this to fire when slotMetrics is updated as it would recursively bomb
       */
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      start === null || start === void 0 ? void 0 : start.toISOString(),
      end === null || end === void 0 ? void 0 : end.toISOString(),
      timeslots,
      step,
    ]
  );
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


  var renderSlot = (0, _react.useCallback)(
    function (value, idx) {
   
      // didn't get the count time in the first time
      let countNow = countEventsInHourSlot.find(
        (x) => x.label == value.getHours()
      );
      if (idx) return null; // don't return the first (0) idx

      var isNow = slotMetrics.dateIsInGroup(getNow(), idx);
      return /*#__PURE__*/ _react.default.createElement(
        "div",
        {
          style: {
            backgroundImage: "none",
            backgroundColor: "#F2F2F7",
            height: "100%"

           },
        },
        /*#__PURE__*/ _react.default.createElement(
          "div",
          {
            className: (0, _clsx.default)("rbc-label", isNow && "rbc-now"),
            style: { display: value.getMinutes() > 1 ? "none" : "flex" },
          },
          localizer.format(value, "timeGutterFormat")
        )
        ,
        /*#__PURE__*/ _react.default.createElement(
          "div",
          {
            style: {
               display: value.getMinutes() > 14 && value.getMinutes() < 30 ? "flex" : "none" ,
               justifyContent: "flex-end",
               width: "100%",
               backgroundImage: "none",
               backgroundColor: "#F2F2F7",
               marginRight : "3px"
 
              },
          },
          /*#__PURE__*/ _react.default.createElement(
            "span",
            {
              style: {
                marginRight : "5px"
               },
              className: "rbc-label-count",         
            },
            countNow !=undefined ? countNow.count : "0"
          )
        )
      );
    },
    [slotMetrics, localizer, getNow]
  );
    let top='';
  
    if (typeof window !== "undefined") {
      let elm = document.querySelectorAll(".rbc-current-time-indicator")[0]
      if(elm){
        top =  window.getComputedStyle(elm).top
      }
    }
   
    
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      id: "timeLeftSection",
      className: "rbc-time-gutter rbc-time-column",
      ref: gutterRef,
    },
    slotMetrics.groups.map(function (grp, idx) {  
      return /*#__PURE__*/ _react.default.createElement(
        _TimeSlotGroup.default,
        {
          key: idx,
          group: grp,
          resource: resource,
          components: components,
          renderSlot: renderSlot,
          getters: getters,
        },    
      );
      
    }),
    slotMetrics.groups.map(function (grp, idx) {
      var isNow = slotMetrics.dateIsInGroup(getNow(), idx);
      var time = formatDate( getNow())
      return isNow &&
      /*#__PURE__*/ _react.default.createElement("div", {
        className: "rbc-current-time-indicator-button",
        style: {
          top: top,
        },  
      },
      time
      );

    })
    
  );
};

var _default = /*#__PURE__*/ _react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/ _react.default.createElement(
    TimeGutter,
    Object.assign(
      {
        gutterRef: ref,
      },
      props
    )
  );
});

exports.default = _default;
