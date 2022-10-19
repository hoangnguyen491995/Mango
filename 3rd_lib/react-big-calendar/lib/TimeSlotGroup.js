"use strict";

var _interopRequireWildcard =
  require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault =
  require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(
  require("@babel/runtime/helpers/classCallCheck")
);

var _createClass2 = _interopRequireDefault(
  require("@babel/runtime/helpers/createClass")
);

var _inherits2 = _interopRequireDefault(
  require("@babel/runtime/helpers/inherits")
);

var _createSuper2 = _interopRequireDefault(
  require("@babel/runtime/helpers/createSuper")
);

var _clsx = _interopRequireDefault(require("clsx"));

var _react = _interopRequireWildcard(require("react"));

var _BackgroundWrapper = _interopRequireDefault(require("./BackgroundWrapper"));

var TimeSlotGroup = /*#__PURE__*/ (function (_Component) {
  (0, _inherits2.default)(TimeSlotGroup, _Component);

  var _super = (0, _createSuper2.default)(TimeSlotGroup);


  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  
  function getDate(date) {
    var datet = date.getDate();
    var month = date.getMonth() +1;
    var year = date.getFullYear();
   
    var strTime = month + "/" + datet + "/" + year;
    return strTime;
  }



  function TimeSlotGroup() {
    (0, _classCallCheck2.default)(this, TimeSlotGroup);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(TimeSlotGroup, [
    {
      key: "render",
      value: function render() {
        var _this$props = this.props,
          renderSlot = _this$props.renderSlot,
          startDate = _this$props.group[0],
          endDate = _this$props.group[1],
          resource = _this$props.resource,
          listShiftModel = _this$props.listShiftModel,
          group = _this$props.group,
          getters = _this$props.getters,
          typeTech = _this$props.typeTech,
          _this$props$component = _this$props.components;
        _this$props$component =
          _this$props$component === void 0 ? {} : _this$props$component;

        var _this$props$component2 = _this$props$component.timeSlotWrapper,
          Wrapper =
            _this$props$component2 === void 0
              ? _BackgroundWrapper.default
              : _this$props$component2;
        var groupProps = getters ? getters.slotGroupProp() : {};

        var className = "time-day-off"
        listShiftModel?.map((e) => {
          if ((new Date(`${getDate(startDate)} ${e.start}`)).getTime() <= startDate.getTime() 
          && startDate.getTime() <= (new Date(`${getDate(startDate)} ${e.end}`)).getTime()
          ) {
              if (typeTech === "Salon") {
                className = "time-salon-appointment" 
              } else {
                className = "";
              }                   
          }
        });

        return /*#__PURE__*/ _react.default.createElement(
          "div",
          Object.assign(
            {
              className: `rbc-timeslot-group ${className}`,
              
            },
            groupProps
          ),
          group.map(function (value, idx) {
            var slotProps = getters ? getters.slotProp(value, resource) : {};

            return /*#__PURE__*/ _react.default.createElement(
              Wrapper,
              {
                key: idx,
                value: value,
                resource: resource,
              },
              /*#__PURE__*/ _react.default.createElement(
                "div",
                Object.assign({}, slotProps, {
                  onMouseOver: (e) => {
                    // console.log("startDate", startDate);
                    if (e.target.offsetParent.id != "timeLeftSection") {
                      e.target.textContent = `${formatDate(startDate)}`;
                    }
                  },

                  onMouseOut: (e) => {
                    if (e.target.offsetParent.id != "timeLeftSection")
                      e.target.textContent = ` `;
                  },

                  className: (0, _clsx.default)(
                    "rbc-time-slot",
                    value.getMinutes() == 45 && "rbc-time-slot-begin",
                    slotProps.className
                  ),
                }),
                // formatDate(startDate),
                // "-",
                // formatDate(endDate),
                renderSlot && renderSlot(value, idx)
              )
            );
          })
        );
      },
    },
  ]);
  return TimeSlotGroup;
})(_react.Component);

exports.default = TimeSlotGroup;
