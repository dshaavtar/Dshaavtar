import { cm as React, r as reactExports, j as jsxRuntimeExports, dm as useOrdersByDeliveryPartner, d4 as useTestOrders, t as useDeliveryOrders, aK as useDPAnalytics, dn as useGetPartnerTips, dp as useGetTotalTipsEarned, dq as useDeliveryShift, da as useGeneratePOSOTP, db as useVerifyPOSOTP, dr as useDPActiveDeliveries, ds as useDPEarningsWithExpenses, dt as useDPEarnings, du as useDPPetrolExpenses, dv as useGenerateDeliveryPaymentQR, dw as useMarkDeliveryPaymentCollected, dx as useAddDPPetrolExpense, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { B as BuzzNotification, L as LineChart, a as Line } from "./BuzzNotification-SbYuHcfI.js";
import { D as DashboardLinkBanner, L as LendingSection, C as CommunitySection } from "./LendingSection-DCcY51Rg.js";
import { Q as QRTimerDisplay } from "./QRTimerDisplay-DIQaJZWT.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { P as Package } from "./package-CosknzeL.js";
import { C as Clock } from "./clock-CO75OdmO.js";
import { Q as QrCode } from "./qr-code-CVNmsjZi.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { X } from "./x-Chksmd6i.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { L as Lock } from "./lock-_3m7dyMM.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { I as IndianRupee } from "./indian-rupee-4FVPRNFh.js";
import { H as HandCoins } from "./hand-coins-D5RW6D6g.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { S as Star } from "./star-DbleSGPY.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { e as filterProps, j as Layer, $ as max, i as isNumber, H as Curve, K as Animate, M as interpolateNumber, I as isNil, a0 as isNan, N as isEqual, Y as hasClipDot, O as LabelList, P as uniqueId, c as isFunction, G as Global, J as getValueByDataKey, Z as getCateCoordinateOfLine, F as Dot, g as generateCategoricalChart, f as formatAxisMap, R as ResponsiveContainer, T as Tooltip } from "./generateCategoricalChart--dgqj_9a.js";
import { a as clsx } from "./utils-2v2HxlWs.js";
import { X as XAxis, Y as YAxis, C as CartesianGrid } from "./YAxis-BEF0I4n4.js";
import { L as LockOpen } from "./lock-open-BwR0r970.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { I as Info } from "./info-BAL4LSDt.js";
import { L as LogOut } from "./log-out-Bs9IUFS8.js";
import { D as DollarSign } from "./dollar-sign-XR0nG9ah.js";
import "./index-DPbSRAbD.js";
import "./index-BtrS4JsN.js";
import "./index-CUcO6jhF.js";
import "./index-yUS8KoxU.js";
import "./index-DYndF6Sn.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./bell-Bilc9tB3.js";
import "./check-CO9wi49t.js";
import "./copy-ox5Tlh0O.js";
import "./rotate-ccw-BCahGsp7.js";
import "./triangle-alert-BhhO8CMW.js";
import "./calendar-DOvJee1H.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
var _excluded = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], _excluded2 = ["key"];
var _Area;
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Area = /* @__PURE__ */ function(_PureComponent) {
  function Area2() {
    var _this;
    _classCallCheck(this, Area2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Area2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: true
    });
    _defineProperty(_this, "id", uniqueId("recharts-area-"));
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    return _this;
  }
  _inherits(Area2, _PureComponent);
  return _createClass(Area2, [{
    key: "renderDots",
    value: function renderDots(needClip, clipDot, clipPathId) {
      var isAnimationActive = this.props.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (isAnimationActive && !isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, dot = _this$props.dot, points = _this$props.points, dataKey = _this$props.dataKey;
      var areaProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread(_objectSpread(_objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, areaProps), customDotProps), {}, {
          index: i,
          cx: entry.x,
          cy: entry.y,
          dataKey,
          value: entry.value,
          payload: entry.payload,
          points
        });
        return Area2.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React.createElement(Layer, _extends({
        className: "recharts-area-dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderHorizontalRect",
    value: function renderHorizontalRect(alpha) {
      var _this$props2 = this.props, baseLine = _this$props2.baseLine, points = _this$props2.points, strokeWidth = _this$props2.strokeWidth;
      var startX = points[0].x;
      var endX = points[points.length - 1].x;
      var width = alpha * Math.abs(startX - endX);
      var maxY = max(points.map(function(entry) {
        return entry.y || 0;
      }));
      if (isNumber(baseLine) && typeof baseLine === "number") {
        maxY = Math.max(baseLine, maxY);
      } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxY = Math.max(max(baseLine.map(function(entry) {
          return entry.y || 0;
        })), maxY);
      }
      if (isNumber(maxY)) {
        return /* @__PURE__ */ React.createElement("rect", {
          x: startX < endX ? startX : startX - width,
          y: 0,
          width,
          height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
        });
      }
      return null;
    }
  }, {
    key: "renderVerticalRect",
    value: function renderVerticalRect(alpha) {
      var _this$props3 = this.props, baseLine = _this$props3.baseLine, points = _this$props3.points, strokeWidth = _this$props3.strokeWidth;
      var startY = points[0].y;
      var endY = points[points.length - 1].y;
      var height = alpha * Math.abs(startY - endY);
      var maxX = max(points.map(function(entry) {
        return entry.x || 0;
      }));
      if (isNumber(baseLine) && typeof baseLine === "number") {
        maxX = Math.max(baseLine, maxX);
      } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxX = Math.max(max(baseLine.map(function(entry) {
          return entry.x || 0;
        })), maxX);
      }
      if (isNumber(maxX)) {
        return /* @__PURE__ */ React.createElement("rect", {
          x: 0,
          y: startY < endY ? startY : startY - height,
          width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
          height: Math.floor(height)
        });
      }
      return null;
    }
  }, {
    key: "renderClipRect",
    value: function renderClipRect(alpha) {
      var layout = this.props.layout;
      if (layout === "vertical") {
        return this.renderVerticalRect(alpha);
      }
      return this.renderHorizontalRect(alpha);
    }
  }, {
    key: "renderAreaStatically",
    value: function renderAreaStatically(points, baseLine, needClip, clipPathId) {
      var _this$props4 = this.props, layout = _this$props4.layout, type = _this$props4.type, stroke = _this$props4.stroke, connectNulls = _this$props4.connectNulls, isRange = _this$props4.isRange;
      _this$props4.ref;
      var others = _objectWithoutProperties(_this$props4, _excluded);
      return /* @__PURE__ */ React.createElement(Layer, {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, /* @__PURE__ */ React.createElement(Curve, _extends({}, filterProps(others, true), {
        points,
        connectNulls,
        type,
        baseLine,
        layout,
        stroke: "none",
        className: "recharts-area-area"
      })), stroke !== "none" && /* @__PURE__ */ React.createElement(Curve, _extends({}, filterProps(this.props, false), {
        className: "recharts-area-curve",
        layout,
        type,
        connectNulls,
        fill: "none",
        points
      })), stroke !== "none" && isRange && /* @__PURE__ */ React.createElement(Curve, _extends({}, filterProps(this.props, false), {
        className: "recharts-area-curve",
        layout,
        type,
        connectNulls,
        fill: "none",
        points: baseLine
      })));
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function renderAreaWithAnimation(needClip, clipPathId) {
      var _this2 = this;
      var _this$props5 = this.props, points = _this$props5.points, baseLine = _this$props5.baseLine, isAnimationActive = _this$props5.isAnimationActive, animationBegin = _this$props5.animationBegin, animationDuration = _this$props5.animationDuration, animationEasing = _this$props5.animationEasing, animationId = _this$props5.animationId;
      var _this$state = this.state, prevPoints = _this$state.prevPoints, prevBaseLine = _this$state.prevBaseLine;
      return /* @__PURE__ */ React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "area-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepPoints = points.map(function(entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            return entry;
          });
          var stepBaseLine;
          if (isNumber(baseLine) && typeof baseLine === "number") {
            var interpolator = interpolateNumber(prevBaseLine, baseLine);
            stepBaseLine = interpolator(t);
          } else if (isNil(baseLine) || isNan(baseLine)) {
            var _interpolator = interpolateNumber(prevBaseLine, 0);
            stepBaseLine = _interpolator(t);
          } else {
            stepBaseLine = baseLine.map(function(entry, index) {
              var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
              if (prevBaseLine[prevPointIndex]) {
                var prev = prevBaseLine[prevPointIndex];
                var interpolatorX = interpolateNumber(prev.x, entry.x);
                var interpolatorY = interpolateNumber(prev.y, entry.y);
                return _objectSpread(_objectSpread({}, entry), {}, {
                  x: interpolatorX(t),
                  y: interpolatorY(t)
                });
              }
              return entry;
            });
          }
          return _this2.renderAreaStatically(stepPoints, stepBaseLine, needClip, clipPathId);
        }
        return /* @__PURE__ */ React.createElement(Layer, null, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
          id: "animationClipPath-".concat(clipPathId)
        }, _this2.renderClipRect(t))), /* @__PURE__ */ React.createElement(Layer, {
          clipPath: "url(#animationClipPath-".concat(clipPathId, ")")
        }, _this2.renderAreaStatically(points, baseLine, needClip, clipPathId)));
      });
    }
  }, {
    key: "renderArea",
    value: function renderArea(needClip, clipPathId) {
      var _this$props6 = this.props, points = _this$props6.points, baseLine = _this$props6.baseLine, isAnimationActive = _this$props6.isAnimationActive;
      var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, prevBaseLine = _this$state2.prevBaseLine, totalLength = _this$state2.totalLength;
      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !isEqual(prevPoints, points) || !isEqual(prevBaseLine, baseLine))) {
        return this.renderAreaWithAnimation(needClip, clipPathId);
      }
      return this.renderAreaStatically(points, baseLine, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _filterProps;
      var _this$props7 = this.props, hide = _this$props7.hide, dot = _this$props7.dot, points = _this$props7.points, className = _this$props7.className, top = _this$props7.top, left = _this$props7.left, xAxis = _this$props7.xAxis, yAxis = _this$props7.yAxis, width = _this$props7.width, height = _this$props7.height, isAnimationActive = _this$props7.isAnimationActive, id = _this$props7.id;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = clsx("recharts-area", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
        r: 3,
        strokeWidth: 2
      }, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
      var _ref3 = hasClipDot(dot) ? dot : {}, _ref3$clipDot = _ref3.clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
      var dotSize = r * 2 + strokeWidth;
      return /* @__PURE__ */ React.createElement(Layer, {
        className: layerClass
      }, needClipX || needClipY ? /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ React.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      })), !clipDot && /* @__PURE__ */ React.createElement("clipPath", {
        id: "clipPath-dots-".concat(clipPathId)
      }, /* @__PURE__ */ React.createElement("rect", {
        x: left - dotSize / 2,
        y: top - dotSize / 2,
        width: width + dotSize,
        height: height + dotSize
      }))) : null, !hasSinglePoint ? this.renderArea(needClip, clipPathId) : null, (dot || hasSinglePoint) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          curBaseLine: nextProps.baseLine,
          prevPoints: prevState.curPoints,
          prevBaseLine: prevState.curBaseLine
        };
      }
      if (nextProps.points !== prevState.curPoints || nextProps.baseLine !== prevState.curBaseLine) {
        return {
          curPoints: nextProps.points,
          curBaseLine: nextProps.baseLine
        };
      }
      return null;
    }
  }]);
}(reactExports.PureComponent);
_Area = Area;
_defineProperty(Area, "displayName", "Area");
_defineProperty(Area, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: false,
  // points of area
  points: [],
  dot: false,
  activeDot: true,
  hide: false,
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
_defineProperty(Area, "getBaseValue", function(props, item, xAxis, yAxis) {
  var layout = props.layout, chartBaseValue = props.baseValue;
  var itemBaseValue = item.props.baseValue;
  var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
  if (isNumber(baseValue) && typeof baseValue === "number") {
    return baseValue;
  }
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var domainMax = Math.max(domain[0], domain[1]);
    var domainMin = Math.min(domain[0], domain[1]);
    if (baseValue === "dataMin") {
      return domainMin;
    }
    if (baseValue === "dataMax") {
      return domainMax;
    }
    return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
  }
  if (baseValue === "dataMin") {
    return domain[0];
  }
  if (baseValue === "dataMax") {
    return domain[1];
  }
  return domain[0];
});
_defineProperty(Area, "getComposedData", function(_ref4) {
  var props = _ref4.props, item = _ref4.item, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, bandSize = _ref4.bandSize, dataKey = _ref4.dataKey, stackedData = _ref4.stackedData, dataStartIndex = _ref4.dataStartIndex, displayedData = _ref4.displayedData, offset = _ref4.offset;
  var layout = props.layout;
  var hasStack = stackedData && stackedData.length;
  var baseValue = _Area.getBaseValue(props, item, xAxis, yAxis);
  var isHorizontalLayout = layout === "horizontal";
  var isRange = false;
  var points = displayedData.map(function(entry, index) {
    var value;
    if (hasStack) {
      value = stackedData[dataStartIndex + index];
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      } else {
        isRange = true;
      }
    }
    var isBreakPoint = value[1] == null || hasStack && getValueByDataKey(entry, dataKey) == null;
    if (isHorizontalLayout) {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isBreakPoint ? null : yAxis.scale(value[1]),
        value,
        payload: entry
      };
    }
    return {
      x: isBreakPoint ? null : xAxis.scale(value[1]),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  var baseLine;
  if (hasStack || isRange) {
    baseLine = points.map(function(entry) {
      var x = Array.isArray(entry.value) ? entry.value[0] : null;
      if (isHorizontalLayout) {
        return {
          x: entry.x,
          y: x != null && entry.y != null ? yAxis.scale(x) : null
        };
      }
      return {
        x: x != null ? xAxis.scale(x) : null,
        y: entry.y
      };
    });
  } else {
    baseLine = isHorizontalLayout ? yAxis.scale(baseValue) : xAxis.scale(baseValue);
  }
  return _objectSpread({
    points,
    baseLine,
    layout,
    isRange
  }, offset);
});
_defineProperty(Area, "renderDotItem", function(option, props) {
  var dotItem;
  if (/* @__PURE__ */ React.isValidElement(option)) {
    dotItem = /* @__PURE__ */ React.cloneElement(option, props);
  } else if (isFunction(option)) {
    dotItem = option(props);
  } else {
    var className = clsx("recharts-area-dot", typeof option !== "boolean" ? option.className : "");
    var key = props.key, rest = _objectWithoutProperties(props, _excluded2);
    dotItem = /* @__PURE__ */ React.createElement(Dot, _extends({}, rest, {
      key,
      className
    }));
  }
  return dotItem;
});
var AreaChart = generateCategoricalChart({
  chartName: "AreaChart",
  GraphicalChild: Area,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
const STATUS_COLORS = {
  assigned: "text-warning border-warning",
  pickedUp: "text-primary border-primary",
  onTheWay: "text-blue-500 border-blue-500",
  delivered: "text-success border-success",
  paymentCollected: "text-success border-success"
};
function DPOrderCard({
  order,
  index,
  generateQR,
  onMarkCollected,
  isMarkingCollected
}) {
  var _a, _b;
  const [activeQR, setActiveQR] = reactExports.useState(null);
  const [generating, setGenerating] = reactExports.useState(false);
  const orderRaw = order;
  const pickupAddr = ((_a = order.merchantAddress) == null ? void 0 : _a.address) ?? orderRaw.pickupAddress ?? "Pickup address N/A";
  const dropoffAddr = ((_b = order.customerAddress) == null ? void 0 : _b.address) ?? orderRaw.dropoffAddress ?? "Dropoff address N/A";
  const items = order.items ?? [];
  const deliveryAmt = Number(order.deliveryCharge ?? 0);
  const statusColor = STATUS_COLORS[order.status] ?? "text-muted-foreground border-border";
  function formatTime(ts) {
    if (!ts) return "—";
    return new Date(Number(ts)).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  async function handleGenerate() {
    setGenerating(true);
    try {
      const qr = await generateQR(order.id, deliveryAmt);
      setActiveQR(qr);
    } catch {
    } finally {
      setGenerating(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `pos-order-card ${order.status === "assigned" ? "pos-order-card-pending" : "pos-order-card-confirmed"}`,
      "data-ocid": `delivery_pos.order.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm font-mono", children: [
                "#",
                String(order.id).slice(-8).toUpperCase()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs capitalize ${statusColor}`,
                  children: order.status
                }
              )
            ] }),
            order.customerName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: order.customerName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm", children: [
              "₹",
              Number(order.totalAmount ?? 0).toLocaleString("en-IN")
            ] }),
            deliveryAmt > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "+₹",
              deliveryAmt,
              " delivery"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0 mt-0.5 text-warning" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Pickup: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: pickupAddr })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0 mt-0.5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Dropoff: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: dropoffAddr })
            ] })
          ] })
        ] }),
        items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3 shrink-0 mt-0.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: items.map(
            (it) => `${it.productName ?? it.title ?? "Item"}${it.quantity && it.quantity > 1 ? ` ×${it.quantity}` : ""}`
          ).join(", ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            formatTime(order.createdAt)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1 text-xs h-8 px-2.5",
                onClick: handleGenerate,
                disabled: generating || deliveryAmt <= 0,
                "data-ocid": `delivery_pos.qr_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5" }),
                  generating ? "..." : "Collect Pay"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "gap-1 text-xs h-8 px-2.5 bg-success hover:bg-success/90 text-success-foreground",
                onClick: () => onMarkCollected(order.id),
                disabled: isMarkingCollected,
                "data-ocid": `delivery_pos.collected_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  "Delivered"
                ]
              }
            )
          ] })
        ] }),
        activeQR && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "dialog",
          {
            open: true,
            className: "fixed inset-0 bg-black/60 z-40 flex items-center justify-center m-0 p-0 border-0 w-screen h-screen max-w-none max-h-none",
            "aria-label": "Payment QR Code",
            "data-ocid": "qr_payment.dialog",
            onKeyDown: (e) => e.key === "Escape" && setActiveQR(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute -top-3 -right-3 z-10 w-8 h-8 bg-card rounded-full flex items-center justify-center border border-border shadow-card hover:bg-muted transition-colors",
                  onClick: () => setActiveQR(null),
                  "aria-label": "Close QR",
                  "data-ocid": "qr_payment.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QRTimerDisplay,
                {
                  qrData: activeQR.qrData,
                  amount: activeQR.amount,
                  expiresAt: activeQR.expiresAt,
                  onExpire: () => {
                  },
                  onRefresh: () => setActiveQR(null)
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
const SESSION_KEY = "wc_dp_session";
function getDPSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return null;
}
function saveDPSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
function clearDPSession() {
  localStorage.removeItem(SESSION_KEY);
}
const TOOLTIP_STYLE = {
  background: "var(--color-card, #1e293b)",
  border: "1px solid var(--color-border, #334155)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "var(--color-card-foreground, #f1f5f9)"
};
function DeliveryOTPLogin({
  onSuccess
}) {
  const [phone, setPhone] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [step, setStep] = reactExports.useState("phone");
  const [devOtp, setDevOtp] = reactExports.useState(null);
  const [resendCountdown, setResendCountdown] = reactExports.useState(0);
  const [error, setError] = reactExports.useState("");
  const generateOTP = useGeneratePOSOTP();
  const verifyOTP = useVerifyPOSOTP();
  reactExports.useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setInterval(() => setResendCountdown((c) => c - 1), 1e3);
    return () => clearInterval(t);
  }, [resendCountdown]);
  async function handleSendOTP() {
    setError("");
    if (!phone.trim()) {
      setError("Please enter your WhatsApp number");
      return;
    }
    try {
      const result = await generateOTP.mutateAsync({
        phone,
        role: "deliveryPartner"
      });
      if (result.otp) setDevOtp(result.otp);
      setStep("otp");
      setResendCountdown(30);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send OTP");
    }
  }
  async function handleVerify() {
    setError("");
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }
    try {
      const result = await verifyOTP.mutateAsync({
        phone,
        otp,
        role: "deliveryPartner"
      });
      if (result.success) {
        const session = {
          phone,
          dpId: result.dpId ?? result.userId ?? `dp_${phone}`,
          name: result.name ?? phone
        };
        saveDPSession(session);
        localStorage.setItem("wc_dp_id", session.dpId);
        onSuccess(session);
      } else {
        setError("OTP verification failed");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid OTP");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-cyan-200 dark:border-cyan-800/50 rounded-2xl p-6",
      "data-ocid": "delivery.pos-login-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5 text-cyan-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Delivery Partner POS Login" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sign in with your WhatsApp number to access POS" })
          ] })
        ] }),
        step === "phone" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dp-pos-phone", children: "WhatsApp Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "dp-pos-phone",
                placeholder: "+91 98765 43210",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && handleSendOTP(),
                "data-ocid": "delivery.pos.phone_input"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-destructive",
              "data-ocid": "delivery.pos.error_state",
              children: error
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full bg-cyan-500 hover:bg-cyan-600 text-white",
              onClick: handleSendOTP,
              disabled: generateOTP.isPending,
              "data-ocid": "delivery.pos.send_otp_button",
              children: generateOTP.isPending ? "Sending OTP…" : "Send OTP via WhatsApp"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
            "OTP sent to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: phone })
          ] }),
          devOtp && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-3",
              "data-ocid": "delivery.pos.dev_otp_info",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary", children: [
                  "Dev Mode — OTP:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold", children: devOtp })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dp-pos-otp", children: "Enter OTP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "dp-pos-otp",
                placeholder: "6-digit OTP",
                value: otp,
                onChange: (e) => setOtp(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && handleVerify(),
                maxLength: 6,
                "data-ocid": "delivery.pos.otp_input"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-destructive",
              "data-ocid": "delivery.pos.error_state",
              children: error
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full bg-cyan-500 hover:bg-cyan-600 text-white",
              onClick: handleVerify,
              disabled: verifyOTP.isPending,
              "data-ocid": "delivery.pos.verify_otp_button",
              children: verifyOTP.isPending ? "Verifying…" : "Verify & Enter POS"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            resendCountdown > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Resend in ",
              resendCountdown,
              "s"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSendOTP,
                className: "text-primary hover:underline",
                "data-ocid": "delivery.pos.resend_button",
                children: "Resend OTP"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setStep("phone");
                  setError("");
                  setOtp("");
                  setDevOtp(null);
                },
                className: "text-muted-foreground hover:text-foreground",
                "data-ocid": "delivery.pos.back_button",
                children: "← Change number"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function DeliveryPOSPanel({
  session,
  onLogout
}) {
  const DP_ID = session.dpId;
  const [activeTab, setActiveTab] = reactExports.useState("deliveries");
  const [acknowledgedIds, setAcknowledgedIds] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [seenTipIds, setSeenTipIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [expenseForm, setExpenseForm] = reactExports.useState({
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    amount: "",
    liters: "",
    notes: ""
  });
  const fromDate = /* @__PURE__ */ new Date();
  fromDate.setDate(fromDate.getDate() - 30);
  fromDate.toISOString().split("T")[0];
  const { data: activeDeliveries = [], isLoading: loadingDeliveries } = useDPActiveDeliveries();
  const { data: earningsData, isLoading: loadingEarnings } = useDPEarningsWithExpenses();
  const { data: dpEarnings } = useDPEarnings();
  const { data: analytics } = useDPAnalytics(DP_ID);
  const { data: allExpenses = [] } = useDPPetrolExpenses();
  const { data: posTips = [], refetch: refetchPosTips } = useGetPartnerTips(DP_ID);
  const { data: posTotalTips = 0, refetch: refetchPosTotalTips } = useGetTotalTipsEarned(DP_ID);
  const posTipIntervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    posTipIntervalRef.current = setInterval(() => {
      refetchPosTips();
      refetchPosTotalTips();
    }, 3e4);
    return () => {
      if (posTipIntervalRef.current) clearInterval(posTipIntervalRef.current);
    };
  }, [refetchPosTips, refetchPosTotalTips]);
  const newPosTipCount = posTips.filter((t) => !seenTipIds.has(t.id)).length;
  const posTodayTips = posTips.filter((t) => {
    const d = new Date(t.createdAt > 1e12 ? t.createdAt / 1e6 : t.createdAt);
    const today = /* @__PURE__ */ new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  });
  const generateQR = useGenerateDeliveryPaymentQR();
  const markCollected = useMarkDeliveryPaymentCollected();
  const addExpense = useAddDPPetrolExpense();
  const deliveriesArr = Array.isArray(activeDeliveries) ? activeDeliveries : [];
  const hasNewOrder = deliveriesArr.filter((d) => {
    const rec = d;
    return rec.status === "assigned" && !acknowledgedIds.has(String(rec.id));
  }).length > 0;
  const completedToday = Number((dpEarnings == null ? void 0 : dpEarnings.completedCount) ?? 0);
  const earnedToday = (earningsData == null ? void 0 : earningsData.totalEarned) ?? 0;
  const netProfit = (earningsData == null ? void 0 : earningsData.netProfit) ?? 0;
  const expenseEntries = (earningsData == null ? void 0 : earningsData.expenseEntries) ?? allExpenses;
  const revenueTrend = ((analytics == null ? void 0 : analytics.revenueTrend) ?? []).map((e) => ({
    period: e.period,
    revenue: Number(e.revenue)
  }));
  async function generateDeliveryQR(orderId, amount) {
    const qr = await generateQR.mutateAsync({
      orderId,
      amount,
      partnerId: DP_ID
    });
    return qr;
  }
  async function handleMarkCollected(orderId) {
    await markCollected.mutateAsync({ orderId, partnerId: DP_ID });
    ue.success("Payment collected & delivery marked complete");
  }
  async function handleAddExpense() {
    if (!expenseForm.amount) {
      ue.error("Enter amount");
      return;
    }
    await addExpense.mutateAsync({
      partnerId: DP_ID,
      date: expenseForm.date,
      amount: Number(expenseForm.amount),
      liters: Number(expenseForm.liters) || 0,
      notes: expenseForm.notes
    });
    setExpenseForm({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      amount: "",
      liters: "",
      notes: ""
    });
    ue.success("Petrol expense logged");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "delivery.pos.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
          "POS — ",
          session.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: session.phone })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onLogout,
          className: "gap-1.5 text-muted-foreground hover:text-destructive",
          "data-ocid": "delivery.pos.logout_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sign Out" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BuzzNotification,
      {
        hasNewOrder,
        onAcknowledge: () => setAcknowledgedIds(
          new Set(
            deliveriesArr.map(
              (d) => String(d.id)
            )
          )
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: loadingEarnings ? ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "earnings-card", "data-ocid": "delivery.pos.earned_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Earned Today" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-success", children: [
          "₹",
          earnedToday.toLocaleString("en-IN")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "earnings-card", "data-ocid": "delivery.pos.net_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3.5 h-3.5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Net Profit" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground", children: [
          "₹",
          netProfit.toLocaleString("en-IN")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "earnings-card",
          "data-ocid": "delivery.pos.completed_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Completed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: completedToday })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "earnings-card", "data-ocid": "delivery.pos.active_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 text-warning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Active" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-warning", children: deliveriesArr.length })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto", "data-ocid": "delivery.pos.tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "deliveries",
            "data-ocid": "delivery.pos.tab.deliveries",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5 mr-1" }),
              "Active Jobs"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "earnings", "data-ocid": "delivery.pos.tab.earnings", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-3.5 h-3.5 mr-1" }),
          "Earnings"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "expenses", "data-ocid": "delivery.pos.tab.expenses", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3.5 h-3.5 mr-1" }),
          "Expenses"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "tips",
            "data-ocid": "delivery.pos.tab.tips",
            onClick: () => setSeenTipIds(new Set(posTips.map((t) => t.id))),
            className: "relative",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5 mr-1" }),
              "Tips",
              newPosTipCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[9px] text-white flex items-center justify-center font-bold", children: newPosTipCount > 9 ? "9+" : newPosTipCount })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsContent,
        {
          value: "tips",
          className: "mt-3 space-y-4",
          "data-ocid": "delivery.pos.tips.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "earnings-card",
                  "data-ocid": "delivery.pos.tips.total_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5 text-success" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total Tips" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-success", children: [
                      "₹",
                      Number(posTotalTips).toLocaleString("en-IN")
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "earnings-card",
                  "data-ocid": "delivery.pos.tips.today_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-warning" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Today" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground", children: [
                      posTodayTips.length,
                      " tips"
                    ] })
                  ]
                }
              )
            ] }),
            posTips.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "py-10 text-center text-muted-foreground",
                "data-ocid": "delivery.pos.tips.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No tips received yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Tips from customers will appear here" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: "Tip History" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs text-muted-foreground font-medium", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs text-muted-foreground font-medium", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs text-muted-foreground font-medium", children: "Order ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-xs text-muted-foreground font-medium", children: "Amount" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: posTips.map((tip, idx) => {
                  const ts = tip.createdAt > 1e12 ? tip.createdAt / 1e6 : tip.createdAt;
                  const dateStr = new Date(ts).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  });
                  const isNew = !seenTipIds.has(tip.id);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: `hover:bg-muted/20 transition-colors ${isNew ? "bg-success/5" : ""}`,
                      "data-ocid": `delivery.pos.tip.item.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-muted-foreground", children: dateStr }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-xs text-foreground", children: [
                          tip.customerName,
                          isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-destructive" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 font-mono text-xs text-muted-foreground", children: [
                          tip.orderId.slice(0, 10),
                          "…"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-right font-bold text-success", children: [
                          "₹",
                          Number(tip.amount).toLocaleString("en-IN")
                        ] })
                      ]
                    },
                    tip.id
                  );
                }) })
              ] }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "deliveries", className: "mt-3 space-y-3", children: loadingDeliveries ? ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, k)) : deliveriesArr.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-12 text-center text-muted-foreground",
          "data-ocid": "delivery.pos.deliveries.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-10 h-10 mb-3 mx-auto opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No active deliveries" })
          ]
        }
      ) : deliveriesArr.map((delivery, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        DPOrderCard,
        {
          order: delivery,
          index: idx + 1,
          generateQR: generateDeliveryQR,
          onMarkCollected: handleMarkCollected,
          isMarkingCollected: generateQR.isPending
        },
        String(delivery.id ?? idx)
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "earnings", className: "mt-3 space-y-4", children: [
        revenueTrend.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-success" }),
            "Revenue Trend"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            LineChart,
            {
              data: revenueTrend,
              margin: { top: 4, right: 4, bottom: 0, left: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "period",
                    tick: { fontSize: 9 },
                    axisLine: false,
                    tickLine: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fontSize: 10 },
                    axisLine: false,
                    tickLine: false,
                    tickFormatter: (v) => `₹${v >= 1e3 ? `${(v / 1e3).toFixed(0)}k` : v}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    formatter: (v) => [
                      `₹${v.toLocaleString("en-IN")}`,
                      "Revenue"
                    ],
                    contentStyle: {
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: 11
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: "revenue",
                    stroke: "#22d3ee",
                    strokeWidth: 2,
                    dot: { r: 3, fill: "#22d3ee", strokeWidth: 0 }
                  }
                )
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border border-border rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Earned (30 days)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-success", children: [
              "₹",
              earnedToday.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Net Profit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground", children: [
              "₹",
              netProfit.toLocaleString("en-IN")
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "expenses", className: "mt-3 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground mb-4", children: "Log Petrol Expense" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exp-date", className: "text-xs", children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "exp-date",
                  type: "date",
                  value: expenseForm.date,
                  onChange: (e) => setExpenseForm((p) => ({ ...p, date: e.target.value })),
                  "data-ocid": "delivery.pos.expense.date_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exp-amount", className: "text-xs", children: "Amount (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "exp-amount",
                  type: "number",
                  placeholder: "Amount",
                  value: expenseForm.amount,
                  onChange: (e) => setExpenseForm((p) => ({ ...p, amount: e.target.value })),
                  "data-ocid": "delivery.pos.expense.amount_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exp-liters", className: "text-xs", children: "Liters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "exp-liters",
                  type: "number",
                  placeholder: "Liters",
                  value: expenseForm.liters,
                  onChange: (e) => setExpenseForm((p) => ({ ...p, liters: e.target.value })),
                  "data-ocid": "delivery.pos.expense.liters_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exp-notes", className: "text-xs", children: "Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "exp-notes",
                  placeholder: "Optional",
                  value: expenseForm.notes,
                  onChange: (e) => setExpenseForm((p) => ({ ...p, notes: e.target.value })),
                  "data-ocid": "delivery.pos.expense.notes_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "mt-3 w-full bg-cyan-500 hover:bg-cyan-600 text-white",
              onClick: handleAddExpense,
              disabled: addExpense.isPending,
              "data-ocid": "delivery.pos.expense.submit_button",
              children: addExpense.isPending ? "Logging…" : "Log Expense"
            }
          )
        ] }),
        expenseEntries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: "Recent Expenses" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: expenseEntries.slice(0, 10).map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 px-4 py-2.5",
              "data-ocid": `delivery.pos.expense.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: e.date }),
                  e.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: e.notes })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-destructive", children: [
                  "-₹",
                  e.amount
                ] }),
                e.liters > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  e.liters,
                  "L"
                ] })
              ]
            },
            `${e.date}-${i}`
          )) })
        ] })
      ] })
    ] })
  ] });
}
function SubscriptionLockGate({ onUnlock }) {
  const [passdigit, setPassdigit] = reactExports.useState("");
  const [qrCountdown, setQrCountdown] = reactExports.useState(120);
  const [timerStarted, setTimerStarted] = reactExports.useState(false);
  function startTimer() {
    if (timerStarted) return;
    setTimerStarted(true);
    const interval = setInterval(() => {
      setQrCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1e3);
  }
  function handleUnlock() {
    if (passdigit.length < 4) {
      ue.error("Enter your 4-digit Passdigit to unlock");
      return;
    }
    onUnlock();
    ue.success("Subscription activated! Dashboard unlocked.");
  }
  const mins = Math.floor(qrCountdown / 60).toString().padStart(2, "0");
  const secs = (qrCountdown % 60).toString().padStart(2, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border border-cyan-200 dark:border-cyan-800/50 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/20 p-6",
      "data-ocid": "delivery.subscription-lock-gate",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6 text-cyan-600 dark:text-cyan-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg", children: "Subscription Required" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Activate your Passdigit subscription to access your delivery dashboard." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-auto bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700", children: "Locked" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-4 h-4 text-cyan-500" }),
              " Enter Passdigit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                maxLength: 6,
                placeholder: "Enter 4–6 digit Passdigit",
                value: passdigit,
                onChange: (e) => setPassdigit(e.target.value),
                className: "mb-3 font-mono tracking-widest",
                "data-ocid": "delivery.passdigit.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full bg-cyan-500 hover:bg-cyan-600 text-white",
                onClick: handleUnlock,
                "data-ocid": "delivery.passdigit.submit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-4 h-4 mr-2" }),
                  " Unlock Dashboard"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4 text-emerald-500" }),
              " Pay via UPI / Scan QR"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-32 h-32 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-border hover:border-cyan-400 transition-colors",
                onClick: startTimer,
                title: "Click to generate QR",
                "data-ocid": "delivery.subscription-qr",
                children: timerStarted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-mono font-bold text-cyan-500", children: [
                    mins,
                    ":",
                    secs
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "QR Valid" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-8 h-8 text-muted-foreground mx-auto" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Click to generate" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "UPI: delivery@localbazar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center font-semibold text-foreground mt-1", children: "₹299/month — Delivery Plan" })
          ] })
        ] })
      ]
    }
  );
}
function DeliveryStatCard({
  title,
  value,
  icon: Icon,
  sublabel,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `bg-card border-l-4 ${highlight ? "border-l-cyan-400" : "border-l-teal-400"} border border-border rounded-xl p-4 shadow-card`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground mt-1", children: value }),
          sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sublabel })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-cyan-600 dark:text-cyan-400" }) })
      ] })
    }
  );
}
function formatElapsed(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
function formatTs(ms) {
  if (!ms) return "—";
  return new Date(ms).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatDuration(startMs, endMs) {
  const mins = Math.floor((endMs - startMs) / 6e4);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
function ShiftStatusCard({ dpId }) {
  const shift = useDeliveryShift(dpId);
  const [elapsed, setElapsed] = reactExports.useState(shift.elapsedMinutes);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [completedShift, setCompletedShift] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!shift.isActive) return;
    const interval = setInterval(() => {
      setElapsed(
        Math.floor((Date.now() - (shift.checkInTime ?? Date.now())) / 6e4)
      );
    }, 6e4);
    setElapsed(shift.elapsedMinutes);
    return () => clearInterval(interval);
  }, [shift.isActive, shift.checkInTime, shift.elapsedMinutes]);
  async function handleStartShift() {
    if (!dpId) return;
    shift.startShift(dpId);
    ue.success("Shift started!");
  }
  function handleEndShift() {
    setShowConfirm(true);
  }
  async function confirmEndShift() {
    if (!shift.currentShift) return;
    const startMs = shift.checkInTime ?? Date.now();
    const endMs = Date.now();
    const orders = Number(
      shift.currentShift.ordersCompleted ?? 0
    );
    const earnings = shift.currentShift.earningsDuringShift ?? 0;
    shift.endShift(shift.currentShift.id);
    setShowConfirm(false);
    setCompletedShift({ startMs, endMs, orders, earnings });
    ue.success("Shift ended");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 shadow-card space-y-4",
      "data-ocid": "delivery.shift.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "w-4 h-4 text-cyan-500" }),
            " Shift Status"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: shift.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200" : "bg-muted text-muted-foreground",
              "data-ocid": "delivery.shift.status_badge",
              children: shift.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                " On Shift"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
                " Off Duty"
              ] })
            }
          )
        ] }),
        shift.isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Checked in at" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: formatTs(shift.checkInTime) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Elapsed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-cyan-600", children: formatElapsed(elapsed) })
          ] })
        ] }),
        completedShift && !shift.isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-lg p-3 text-sm",
            "data-ocid": "delivery.shift.summary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-emerald-700 dark:text-emerald-300 mb-1", children: "Shift Completed ✓" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Start" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatTs(completedShift.startMs) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "End" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatTs(completedShift.endMs) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Duration" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatDuration(completedShift.startMs, completedShift.endMs) })
                ] })
              ] }),
              (completedShift.orders > 0 || completedShift.earnings > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-emerald-200 dark:border-emerald-800/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Orders" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: completedShift.orders })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Earnings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-success", children: [
                    "₹",
                    completedShift.earnings.toLocaleString("en-IN")
                  ] })
                ] })
              ] })
            ]
          }
        ),
        shift.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            className: "w-full",
            onClick: handleEndShift,
            disabled: shift.isEnding,
            "data-ocid": "delivery.shift.end_button",
            children: shift.isEnding ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
              " Ending..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-2" }),
              " End Shift"
            ] })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full bg-cyan-500 hover:bg-cyan-600 text-white",
            onClick: handleStartShift,
            disabled: shift.isStarting || !dpId,
            "data-ocid": "delivery.shift.start_button",
            children: shift.isStarting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }),
              " Starting..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-2" }),
              " Start Shift"
            ] })
          }
        ),
        showConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm",
            "data-ocid": "delivery.shift.confirm_dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-warning flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "End your shift?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Are you sure you want to end your shift? Your check-out time and earnings will be recorded." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    onClick: () => setShowConfirm(false),
                    disabled: shift.isEnding,
                    "data-ocid": "delivery.shift.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "destructive",
                    className: "flex-1",
                    onClick: confirmEndShift,
                    disabled: shift.isEnding,
                    "data-ocid": "delivery.shift.confirm_button",
                    children: shift.isEnding ? "Ending..." : "Yes, End Shift"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function ShiftHistoryTable({ dpId }) {
  const shift = useDeliveryShift(dpId);
  const history = shift.shiftHistory.slice(0, 7);
  if (!dpId) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 shadow-card",
      "data-ocid": "delivery.shift.history",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-cyan-500" }),
          " Shift History",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal ml-1", children: "(last 7 days)" })
        ] }),
        shift.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-lg" }, i)) }) : history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-8 text-center text-muted-foreground text-sm",
            "data-ocid": "delivery.shift.history.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
              "No shift history yet"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs text-muted-foreground border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-medium", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-medium", children: "Check In" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-medium", children: "Check Out" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 pr-4 font-medium", children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium text-right", children: "Orders" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: history.map((s, idx) => {
            const startMs = Number(s.checkInTime) / 1e6;
            const endMs = s.checkOutTime ? Number(s.checkOutTime) / 1e6 : null;
            const date = new Date(startMs).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short"
            });
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50 last:border-0",
                "data-ocid": `delivery.shift.history.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-foreground font-medium", children: date }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: formatTs(startMs) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: endMs ? formatTs(endMs) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-500 text-xs font-medium", children: "Active" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-muted-foreground", children: endMs ? formatDuration(startMs, endMs) : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right font-semibold text-foreground", children: Number(s.ordersCompleted) })
                ]
              },
              s.id
            );
          }) })
        ] }) })
      ]
    }
  );
}
function DeliveryDashboardPage() {
  const [isUnlocked, setIsUnlocked] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [seenMainTipIds, setSeenMainTipIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [posSession, setPosSession] = reactExports.useState(getDPSession);
  const dpPhone = (posSession == null ? void 0 : posSession.phone) ?? "";
  const dpId = posSession == null ? void 0 : posSession.dpId;
  const dpName = (posSession == null ? void 0 : posSession.name) ?? "Partner";
  const {
    data: liveOrdersForDp = [],
    isLoading,
    refetch: refetchDpOrders,
    dataUpdatedAt: dpOrdersUpdatedAt
  } = useOrdersByDeliveryPartner(dpId);
  const [lastRefreshed, setLastRefreshed] = reactExports.useState(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    if (dpOrdersUpdatedAt) setLastRefreshed(new Date(dpOrdersUpdatedAt));
  }, [dpOrdersUpdatedAt]);
  const { data: testOrdersList = [] } = useTestOrders();
  const testOrderIds = new Set(testOrdersList.map((o) => o.id));
  const { isLoading: _isLoading } = useDeliveryOrders();
  const { data: mainAnalytics } = useDPAnalytics(dpId ?? "");
  const { data: mainTips = [], refetch: refetchMainTips } = useGetPartnerTips(dpId);
  const { data: mainTotalTips = 0, refetch: refetchMainTotalTips } = useGetTotalTipsEarned(dpId);
  const tipIntervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    tipIntervalRef.current = setInterval(() => {
      refetchMainTips();
      refetchMainTotalTips();
    }, 3e4);
    return () => {
      if (tipIntervalRef.current) clearInterval(tipIntervalRef.current);
    };
  }, [refetchMainTips, refetchMainTotalTips]);
  const newMainTipCount = mainTips.filter(
    (t) => !seenMainTipIds.has(t.id)
  ).length;
  const mainTodayTips = mainTips.filter((t) => {
    const d = new Date(t.createdAt > 1e12 ? t.createdAt / 1e6 : t.createdAt);
    const today = /* @__PURE__ */ new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  });
  const mainRevenueTrend = ((mainAnalytics == null ? void 0 : mainAnalytics.revenueTrend) ?? []).map((e) => ({
    period: e.period,
    revenue: Number(e.revenue)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "role-header-delivery rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5 text-cyan-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Delivery Partner Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          dpName,
          dpPhone ? ` · 📱 ${dpPhone}` : "",
          " · Active Partner"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-2", children: isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
        " Active"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 mr-1" }),
        " Subscription Required"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DashboardLinkBanner,
      {
        dashboardUrl: `${window.location.origin}/delivery-dashboard`,
        roleLabel: "Delivery Partner",
        accentClass: "border-cyan-300 dark:border-cyan-700/50",
        iconBgClass: "bg-cyan-100 dark:bg-cyan-900/30",
        iconColorClass: "text-cyan-600"
      }
    ),
    !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionLockGate, { onUnlock: () => setIsUnlocked(true) }),
    isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShiftStatusCard, { dpId }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto", "data-ocid": "delivery.tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "overview", "data-ocid": "delivery.tab.overview", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5 mr-1" }),
            "Overview"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "shift", "data-ocid": "delivery.tab.shift", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "w-3.5 h-3.5 mr-1" }),
            "Shift"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "active", "data-ocid": "delivery.tab.active", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-3.5 h-3.5 mr-1" }),
            "Active Jobs"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "completed", "data-ocid": "delivery.tab.completed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 mr-1" }),
            "Completed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "earnings", "data-ocid": "delivery.tab.earnings", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5 mr-1" }),
            "Earnings"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pos", "data-ocid": "delivery.tab.pos", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5 mr-1" }),
            "POS"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "tips",
              "data-ocid": "delivery.tab.tips",
              onClick: () => setSeenMainTipIds(new Set(mainTips.map((t) => t.id))),
              className: "relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5 mr-1" }),
                "Tips",
                newMainTipCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[9px] text-white flex items-center justify-center font-bold", children: newMainTipCount > 9 ? "9+" : newMainTipCount })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "lending", "data-ocid": "delivery.tab.lending", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-3.5 h-3.5 mr-1" }),
            "Lending"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "community", "data-ocid": "delivery.tab.community", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 mr-1" }),
            "Community"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "shift", className: "mt-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShiftStatusCard, { dpId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShiftHistoryTable, { dpId })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "overview", className: "mt-4 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
              "data-ocid": "delivery.stats-grid",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DeliveryStatCard,
                  {
                    title: "Active Today",
                    value: "3",
                    icon: Navigation,
                    sublabel: "2 en route",
                    highlight: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DeliveryStatCard,
                  {
                    title: "Earnings (Month)",
                    value: "₹14,280",
                    icon: IndianRupee,
                    sublabel: "+8% vs last month"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DeliveryStatCard,
                  {
                    title: "Completed",
                    value: "847",
                    icon: CircleCheckBig,
                    sublabel: "Total deliveries"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DeliveryStatCard,
                  {
                    title: "Rating",
                    value: "4.8 ★",
                    icon: Star,
                    sublabel: "From 312 reviews"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "xl:col-span-2 bg-card border border-border rounded-xl p-5 shadow-card",
                "data-ocid": "delivery.live-deliveries",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Live Deliveries" }),
                      dpId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                        "Auto-refreshes every 15s · Last",
                        " ",
                        lastRefreshed.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit"
                        })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "gap-1.5 text-xs",
                          onClick: () => refetchDpOrders(),
                          "data-ocid": "delivery.live-deliveries.refresh_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                            " Refresh"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-xs animate-pulse",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 bg-emerald-500 rounded-full mr-1.5 inline-block" }),
                            "Live"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i)) }) : liveOrdersForDp.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "py-8 text-center",
                      "data-ocid": "delivery.live-deliveries.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: dpId ? "No active deliveries" : "Log in via POS tab to see your live orders" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: liveOrdersForDp.slice(0, 5).map((order, i) => {
                    const o = order;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "p-4 bg-muted/30 rounded-xl border border-border",
                        "data-ocid": `delivery.delivery.item.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-bold text-foreground", children: String(o.id ?? "").slice(0, 14) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                              testOrderIds.has(String(o.id ?? "")) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-semibold", children: "Test Run" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Badge,
                                {
                                  variant: "outline",
                                  className: "text-xs capitalize",
                                  children: String(o.status ?? "pending")
                                }
                              )
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 text-muted-foreground" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: String(
                                o.customerPhone ?? o.customerId ?? "—"
                              ) })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                              "₹",
                              Number(
                                o.totalAmount ?? o.total ?? 0
                              ).toLocaleString("en-IN")
                            ] })
                          ] })
                        ]
                      },
                      String(o.id ?? i)
                    );
                  }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-xl p-5 shadow-card space-y-4",
                "data-ocid": "delivery.performance-card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Performance" }),
                  [
                    {
                      label: "On-time Rate",
                      value: "86.7%",
                      color: "text-emerald-500",
                      pct: 87
                    },
                    {
                      label: "Cancellation Rate",
                      value: "2.1%",
                      color: "text-red-400",
                      pct: 2
                    },
                    {
                      label: "Total Trips",
                      value: "847",
                      color: "text-cyan-500",
                      pct: 100
                    }
                  ].map((metric) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: metric.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-bold ${metric.color}`, children: metric.value })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full bg-cyan-400 rounded-full transition-all",
                        style: { width: `${metric.pct}%` }
                      }
                    ) })
                  ] }, metric.label)),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Deliveries by Type" }),
                    [
                      { type: "Regular", count: 612, pct: 72 },
                      { type: "Shuttle", count: 189, pct: 22 },
                      { type: "Adhoc", count: 46, pct: 6 }
                    ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 mb-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-14", children: t.type }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-full bg-teal-400 rounded-full",
                              style: { width: `${t.pct}%` }
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground w-8 text-right", children: t.count })
                        ]
                      },
                      t.type
                    ))
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 shadow-card",
            "data-ocid": "delivery.active-jobs-section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Active Assigned Jobs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (() => {
                const activeJobs = liveOrdersForDp.filter((o) => {
                  const rec = o;
                  const st = String(rec.status ?? "").toLowerCase();
                  return st !== "delivered" && st !== "completed";
                });
                if (isLoading) {
                  return [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-16 w-full rounded-xl bg-muted/30 animate-pulse"
                    },
                    i
                  ));
                }
                if (activeJobs.length === 0) {
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "py-10 text-center",
                      "data-ocid": "delivery.active.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No active deliveries" })
                      ]
                    }
                  );
                }
                return activeJobs.map((o, i) => {
                  const rec = o;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "p-4 bg-muted/30 rounded-xl border border-border",
                      "data-ocid": `delivery.active.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-bold", children: String(rec.id ?? "").slice(0, 14) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                              "₹",
                              Number(
                                rec.totalAmount ?? rec.total ?? 0
                              ).toLocaleString("en-IN")
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              variant: "outline",
                              className: "text-xs capitalize",
                              children: String(rec.status ?? "pending")
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs space-y-1", children: !!rec.deliveryAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-emerald-500" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: String(rec.deliveryAddress) })
                        ] }) })
                      ]
                    },
                    String(rec.id ?? i)
                  );
                });
              })() })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "completed", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 shadow-card",
            "data-ocid": "delivery.completed-section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Completed Deliveries" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (() => {
                const completedJobs = liveOrdersForDp.filter((o) => {
                  const rec = o;
                  const st = String(rec.status ?? "").toLowerCase();
                  return st === "delivered" || st === "completed";
                });
                if (isLoading) {
                  return [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-12 w-full rounded-xl bg-muted/20 animate-pulse"
                    },
                    i
                  ));
                }
                if (completedJobs.length === 0) {
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "py-10 text-center",
                      "data-ocid": "delivery.completed.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No completed deliveries yet" })
                      ]
                    }
                  );
                }
                return completedJobs.map((o, i) => {
                  const rec = o;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-border",
                      "data-ocid": `delivery.completed.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-bold", children: String(rec.id ?? "").slice(0, 14) }),
                          !!rec.deliveryAddress && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: String(rec.deliveryAddress) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground", children: [
                          "₹",
                          Number(
                            rec.totalAmount ?? rec.total ?? 0
                          ).toLocaleString("en-IN")
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Done" })
                      ]
                    },
                    String(rec.id ?? i)
                  );
                });
              })() })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsContent,
          {
            value: "tips",
            className: "mt-4 space-y-4",
            "data-ocid": "delivery.tips.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-card border border-border rounded-xl p-4 shadow-card",
                    "data-ocid": "delivery.tips.total_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5 text-success" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total Tips Earned" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-success", children: [
                        "₹",
                        Number(mainTotalTips).toLocaleString("en-IN")
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-card border border-border rounded-xl p-4 shadow-card",
                    "data-ocid": "delivery.tips.today_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-warning" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Today" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: mainTodayTips.length }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        "₹",
                        mainTodayTips.reduce((s, t) => s + Number(t.amount), 0).toLocaleString("en-IN"),
                        " ",
                        "today"
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-card border border-border rounded-xl p-4 shadow-card col-span-2 md:col-span-1",
                    "data-ocid": "delivery.tips.alltime_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-primary" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "All Time" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: mainTips.length }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "tips received" })
                    ]
                  }
                )
              ] }),
              mainTips.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card border border-border rounded-xl py-12 text-center",
                  "data-ocid": "delivery.tips.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No tips yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Customers can add a tip when placing orders" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3.5 border-b border-border bg-muted/20 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Tip History" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                    mainTips.length,
                    " tips"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-2.5 text-xs text-muted-foreground font-medium", children: "Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-2.5 text-xs text-muted-foreground font-medium", children: "Customer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-2.5 text-xs text-muted-foreground font-medium", children: "Order ID" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-2.5 text-xs text-muted-foreground font-medium", children: "Amount" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: mainTips.map((tip, idx) => {
                    const ts = tip.createdAt > 1e12 ? tip.createdAt / 1e6 : tip.createdAt;
                    const dateStr = new Date(ts).toLocaleDateString(
                      "en-IN",
                      { day: "2-digit", month: "short", year: "numeric" }
                    );
                    const isNew = !seenMainTipIds.has(tip.id);
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        className: `hover:bg-muted/20 transition-colors ${isNew ? "bg-success/5" : ""}`,
                        "data-ocid": `delivery.tip.item.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-xs text-muted-foreground", children: dateStr }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-xs text-foreground", children: [
                            tip.customerName,
                            isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-destructive" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-mono text-xs text-muted-foreground", children: [
                            tip.orderId.slice(0, 12),
                            "…"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-right font-bold text-success", children: [
                            "₹",
                            Number(tip.amount).toLocaleString("en-IN")
                          ] })
                        ]
                      },
                      tip.id
                    );
                  }) })
                ] }) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "earnings", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 shadow-card",
            "data-ocid": "delivery.earnings-chart",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Earnings Trend" }),
                mainRevenueTrend.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-cyan-500", children: [
                  "Total: ₹",
                  mainRevenueTrend.reduce((s, d) => s + d.revenue, 0).toLocaleString("en-IN")
                ] })
              ] }),
              mainRevenueTrend.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "py-10 text-center",
                  "data-ocid": "delivery.earnings.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No earnings data yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Complete deliveries to see your earnings trend" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                AreaChart,
                {
                  data: mainRevenueTrend,
                  margin: { top: 0, right: 0, left: -20, bottom: 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      XAxis,
                      {
                        dataKey: "period",
                        tick: { fontSize: 10 },
                        tickLine: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      YAxis,
                      {
                        tick: { fontSize: 10 },
                        tickLine: false,
                        axisLine: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        contentStyle: TOOLTIP_STYLE,
                        formatter: (v) => [`₹${v}`, ""]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Area,
                      {
                        type: "monotone",
                        dataKey: "revenue",
                        stroke: "#22d3ee",
                        fill: "#22d3ee33",
                        name: "Revenue"
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pos", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", "data-ocid": "delivery.pos-section", children: !posSession ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          DeliveryOTPLogin,
          {
            onSuccess: (s) => {
              saveDPSession(s);
              setPosSession(s);
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          DeliveryPOSPanel,
          {
            session: posSession,
            onLogout: () => {
              clearDPSession();
              setPosSession(null);
            }
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "lending", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 shadow-card",
            "data-ocid": "delivery.lending-section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "w-4 h-4 text-cyan-500" }),
                " Lending"
              ] }),
              (posSession == null ? void 0 : posSession.phone) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                LendingSection,
                {
                  phone: posSession.phone,
                  accentClass: "bg-cyan-50/50 dark:bg-cyan-950/20"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Log in via POS tab to view your lending items." })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "community", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 shadow-card",
            "data-ocid": "delivery.community-section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
                " Nearby Community"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySection, { city: "Gandhidham", maxItems: 10 })
            ]
          }
        ) })
      ] })
    ] }),
    !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5 opacity-40 pointer-events-none",
          "aria-hidden": true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Subscription-gated Exclusive Offers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-muted rounded-lg animate-pulse" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8 text-destructive mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Activate Passdigit to unlock" })
      ] }) })
    ] })
  ] });
}
export {
  DeliveryDashboardPage as default
};
