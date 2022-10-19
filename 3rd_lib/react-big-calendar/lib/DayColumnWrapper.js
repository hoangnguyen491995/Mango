"use strict";

const { default: styled } = require("styled-components");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;


var _react = _interopRequireDefault(require("react"));

var DayColumnWrapper = function DayColumnWrapper(_ref) {
  var children = _ref.children,
      className = _ref.className,
      innerRef = _ref.innerRef,     
      id = _ref.id,
      type = _ref.type,
      style = _ref.style;
   return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
    className: className,
    ref: innerRef,
    id: id,
    type: type,
    style: {         
      left : style,
       
     },
    
     
  }, children);
};

var _default = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(DayColumnWrapper, Object.assign({}, props, {
    innerRef: ref
  }));
});

exports.default = _default;