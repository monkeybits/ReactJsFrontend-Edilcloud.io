(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[81982],{81982:function(e,n,t){"use strict";t.r(n);var a=t(61432),l=t.n(a),o=t(48258),r=t(96282),c=t(41713),i=t(82186),d=t(92571),a=t(78279),s=t.n(a),m=t(78709),p=(0,t(32986).ZP)(function(){return t.e(97844).then(t.bind(t,97844))});n.default=function(n){var e=(0,m.useState)(null),e=(a=l()(e,2))[0],t=a[1],a=n.due?s()(n.due).format(s().HTML5_FMT.DATE):"";function u(){t(null)}return m.createElement("div",null,m.createElement(o.Z,{color:"inherit",onClick:function(e){t(e.currentTarget)}},m.createElement(r.Z,null,"today")),m.createElement(p,{state:e,onClose:u},n.due?m.createElement(c.Z,{onClick:function(e){n.onRemoveDue(),u()}},"Remove Due Date"):m.createElement("div",{className:"p-16"},m.createElement(i.Z,{label:"Due date",type:"date",name:"due",value:a,onChange:function(e){n.onDueChange(e),u()},placeholder:" Choose a due date",className:"",InputLabelProps:{shrink:!0},variant:"outlined",InputProps:{endAdornment:m.createElement(d.Z,{position:"end"},m.createElement(r.Z,{color:"action"},"today"))}}))))}}}]);