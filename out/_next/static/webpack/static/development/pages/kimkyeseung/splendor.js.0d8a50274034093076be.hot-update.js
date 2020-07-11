webpackHotUpdate("static/development/pages/kimkyeseung/splendor.js",{

/***/ "./kimkyeseung/src/components/Token.jsx":
/*!**********************************************!*\
  !*** ./kimkyeseung/src/components/Token.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ \"./node_modules/@babel/runtime/helpers/esm/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\n\n\nvar _this = undefined,\n    _jsxFileName = \"/Users/Kyeseung/Documents/boardgame-study/kimkyeseung/src/components/Token.jsx\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;\n\n\n\nvar StyledToken = styled_components__WEBPACK_IMPORTED_MODULE_4__[\"default\"].div.withConfig({\n  displayName: \"Token__StyledToken\",\n  componentId: \"frxlrb-0\"\n})([\"display:flex;justify-content:space-between;& > .tokenBundle{position:relative;width:120px;height:120px;}& > .count{}\"]);\n_c = StyledToken;\nvar One = styled_components__WEBPACK_IMPORTED_MODULE_4__[\"default\"].div.withConfig({\n  displayName: \"Token__One\",\n  componentId: \"frxlrb-1\"\n})([\"position:absolute;width:100px;height:100px;border-radius:100%;border:12px solid \", \";box-sizing:border-box;background:lightgray;-webkit-box-shadow:1px 1px 2px 0px rgba(0,0,0,0.75);-moz-box-shadow:1px 1px 2px 0px rgba(0,0,0,0.75);box-shadow:1px 1px 2px 0px rgba(0,0,0,0.75);top:\", \";left:\", \";\"], function (_ref) {\n  var color = _ref.color;\n  return color;\n}, function (_ref2) {\n  var index = _ref2.index;\n  return \"\".concat(index, \"px\");\n}, function (_ref3) {\n  var index = _ref3.index;\n  return \"\".concat(index, \"px\");\n});\n_c2 = One;\n\nvar Token = function Token(_ref4) {\n  var color = _ref4.color,\n      count = _ref4.count,\n      props = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_ref4, [\"color\", \"count\"]);\n\n  return __jsx(StyledToken, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    color: color\n  }, props, {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 32,\n      columnNumber: 3\n    }\n  }), __jsx(\"div\", {\n    className: \"tokenBundle\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 33,\n      columnNumber: 5\n    }\n  }, Array(count).fill().map(function (num, i) {\n    return __jsx(One, {\n      key: i,\n      index: i,\n      className: \"token\",\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 34,\n        columnNumber: 44\n      }\n    });\n  })), __jsx(\"div\", {\n    className: \"count\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 36,\n      columnNumber: 5\n    }\n  }, count));\n};\n\n_c3 = Token;\nToken.Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_4__[\"default\"].div.withConfig({\n  displayName: \"Token__Wrapper\",\n  componentId: \"frxlrb-2\"\n})([\"\"]);\nToken.propTypes = {\n  color: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['red', 'green', 'blue', 'yellow', 'black', 'white']).isRequired,\n  count: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Token);\n\nvar _c, _c2, _c3;\n\n$RefreshReg$(_c, \"StyledToken\");\n$RefreshReg$(_c2, \"One\");\n$RefreshReg$(_c3, \"Token\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9raW1reWVzZXVuZy9zcmMvY29tcG9uZW50cy9Ub2tlbi5qc3g/MTQyMSJdLCJuYW1lcyI6WyJTdHlsZWRUb2tlbiIsInN0eWxlZCIsImRpdiIsIk9uZSIsImNvbG9yIiwiaW5kZXgiLCJUb2tlbiIsImNvdW50IiwicHJvcHMiLCJBcnJheSIsImZpbGwiLCJtYXAiLCJudW0iLCJpIiwiV3JhcHBlciIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9uZU9mIiwiaXNSZXF1aXJlZCIsIm51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUEsSUFBTUEsV0FBVyxHQUFHQyx5REFBTSxDQUFDQyxHQUFWO0FBQUE7QUFBQTtBQUFBLDRIQUFqQjtLQUFNRixXO0FBWU4sSUFBTUcsR0FBRyxHQUFHRix5REFBTSxDQUFDQyxHQUFWO0FBQUE7QUFBQTtBQUFBLDZTQUljO0FBQUEsTUFBR0UsS0FBSCxRQUFHQSxLQUFIO0FBQUEsU0FBZUEsS0FBZjtBQUFBLENBSmQsRUFVQTtBQUFBLE1BQUdDLEtBQUgsU0FBR0EsS0FBSDtBQUFBLG1CQUFrQkEsS0FBbEI7QUFBQSxDQVZBLEVBV0M7QUFBQSxNQUFHQSxLQUFILFNBQUdBLEtBQUg7QUFBQSxtQkFBa0JBLEtBQWxCO0FBQUEsQ0FYRCxDQUFUO01BQU1GLEc7O0FBY04sSUFBTUcsS0FBSyxHQUFHLFNBQVJBLEtBQVE7QUFBQSxNQUFHRixLQUFILFNBQUdBLEtBQUg7QUFBQSxNQUFVRyxLQUFWLFNBQVVBLEtBQVY7QUFBQSxNQUFvQkMsS0FBcEI7O0FBQUEsU0FDWixNQUFDLFdBQUQ7QUFBYSxTQUFLLEVBQUVKO0FBQXBCLEtBQStCSSxLQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQ0U7QUFBSyxhQUFTLEVBQUMsYUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dDLEtBQUssQ0FBQ0YsS0FBRCxDQUFMLENBQWFHLElBQWIsR0FBb0JDLEdBQXBCLENBQXdCLFVBQUNDLEdBQUQsRUFBTUMsQ0FBTjtBQUFBLFdBQVksTUFBQyxHQUFEO0FBQUssU0FBRyxFQUFFQSxDQUFWO0FBQWEsV0FBSyxFQUFFQSxDQUFwQjtBQUF1QixlQUFTLEVBQUMsT0FBakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFaO0FBQUEsR0FBeEIsQ0FESCxDQURGLEVBSUU7QUFBSyxhQUFTLEVBQUMsT0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXdCTixLQUF4QixDQUpGLENBRFk7QUFBQSxDQUFkOztNQUFNRCxLO0FBU05BLEtBQUssQ0FBQ1EsT0FBTixHQUFnQmIseURBQU0sQ0FBQ0MsR0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFJQUksS0FBSyxDQUFDUyxTQUFOLEdBQWtCO0FBQ2hCWCxPQUFLLEVBQUVZLGlEQUFTLENBQUNDLEtBQVYsQ0FBZ0IsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixNQUFqQixFQUF5QixRQUF6QixFQUFtQyxPQUFuQyxFQUE0QyxPQUE1QyxDQUFoQixFQUFzRUMsVUFEN0Q7QUFFaEJYLE9BQUssRUFBRVMsaURBQVMsQ0FBQ0c7QUFGRCxDQUFsQjtBQUtlYixvRUFBZiIsImZpbGUiOiIuL2tpbWt5ZXNldW5nL3NyYy9jb21wb25lbnRzL1Rva2VuLmpzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5cbmNvbnN0IFN0eWxlZFRva2VuID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAmID4gLnRva2VuQnVuZGxlIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEyMHB4OyBoZWlnaHQ6IDEyMHB4O1xuICB9IFxuICAmID4gLmNvdW50IHtcblxuICB9XG5gXG5cbmNvbnN0IE9uZSA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4O1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICBib3JkZXI6IDEycHggc29saWQgJHsoeyBjb2xvciB9KSA9PiBjb2xvcn07XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAxcHggMXB4IDJweCAwcHggcmdiYSgwLDAsMCwwLjc1KTtcbiAgLW1vei1ib3gtc2hhZG93OiAxcHggMXB4IDJweCAwcHggcmdiYSgwLDAsMCwwLjc1KTtcbiAgYm94LXNoYWRvdzogMXB4IDFweCAycHggMHB4IHJnYmEoMCwwLDAsMC43NSk7XG4gIHRvcDogJHsoeyBpbmRleCB9KSA9PiBgJHtpbmRleH1weGB9O1xuICBsZWZ0OiAkeyh7IGluZGV4IH0pID0+IGAke2luZGV4fXB4YH07XG5gXG5cbmNvbnN0IFRva2VuID0gKHsgY29sb3IsIGNvdW50LCAuLi5wcm9wcyB9KSA9PiAoXG4gIDxTdHlsZWRUb2tlbiBjb2xvcj17Y29sb3J9IHsuLi5wcm9wc30+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJ0b2tlbkJ1bmRsZVwiPlxuICAgICAge0FycmF5KGNvdW50KS5maWxsKCkubWFwKChudW0sIGkpID0+IDxPbmUga2V5PXtpfSBpbmRleD17aX0gY2xhc3NOYW1lPVwidG9rZW5cIj48L09uZT4pfVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY291bnRcIj57Y291bnR9PC9kaXY+XG4gIDwvU3R5bGVkVG9rZW4+XG4pXG5cblRva2VuLldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuXG5gXG5cblRva2VuLnByb3BUeXBlcyA9IHtcbiAgY29sb3I6IFByb3BUeXBlcy5vbmVPZihbJ3JlZCcsICdncmVlbicsICdibHVlJywgJ3llbGxvdycsICdibGFjaycsICd3aGl0ZSddKS5pc1JlcXVpcmVkLFxuICBjb3VudDogUHJvcFR5cGVzLm51bWJlclxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2tlblxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./kimkyeseung/src/components/Token.jsx\n");

/***/ })

})