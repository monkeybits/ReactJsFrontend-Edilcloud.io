(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[20024],{70888:function(e,r,t){"use strict";var f=t(78709),m=t(91169),p=(t(16526),t(48999)),v=t(70198),Z=t(45819);function h(e){return e.substring(2).toLowerCase()}r.Z=function(e){var n=e.children,a=void 0!==(r=e.disableReactTree)&&r,t=void 0===(r=e.mouseEvent)?"onClick":r,o=e.onClickAway,i=void 0===(r=e.touchEvent)?"onTouchEnd":r,s=f.useRef(!1),l=f.useRef(null),c=f.useRef(!1),u=f.useRef(!1);f.useEffect(function(){return c.current=!0,function(){c.current=!1}},[]);var e=f.useCallback(function(e){l.current=m.findDOMNode(e)},[]),r=(0,v.Z)(n.ref,e),d=(0,Z.Z)(function(e){var r,t=u.current;u.current=!1,!c.current||!l.current||(r=e,document.documentElement.clientWidth<r.clientX||document.documentElement.clientHeight<r.clientY)||(s.current?s.current=!1:(e.composedPath?-1<e.composedPath().indexOf(l.current):!(0,p.Z)(l.current).documentElement.contains(e.target)||l.current.contains(e.target))||!a&&t||o(e))}),e=function(t){return function(e){u.current=!0;var r=n.props[t];r&&r(e)}},r={ref:r};return!1!==i&&(r[i]=e(i)),f.useEffect(function(){if(!1!==i){var e=h(i),r=(0,p.Z)(l.current),t=function(){s.current=!0};return r.addEventListener(e,d),r.addEventListener("touchmove",t),function(){r.removeEventListener(e,d),r.removeEventListener("touchmove",t)}}},[d,i]),!1!==t&&(r[t]=e(t)),f.useEffect(function(){if(!1!==t){var e=h(t),r=(0,p.Z)(l.current);return r.addEventListener(e,d),function(){r.removeEventListener(e,d)}}},[d,t]),f.createElement(f.Fragment,null,f.cloneElement(n,r))}},41533:function(e,r,t){"use strict";var C=t(97439),y=t(84818),N=t(78709),n=t(16526),q=t(30367),A=t(46140),n=t(6274),L=t(54059),w=t(15681),S=t(79587),t=N.forwardRef(function(e,r){var t=e.children,n=e.classes,a=e.className,o=e.color,i=void 0===o?"primary":o,s=e.component,l=void 0===s?"div":s,c=e.disabled,u=void 0!==c&&c,d=e.error,f=void 0!==d&&d,m=e.fullWidth,p=void 0!==m&&m,v=e.focused,Z=e.hiddenLabel,h=void 0!==Z&&Z,b=e.margin,g=void 0===b?"none":b,E=e.required,o=void 0!==E&&E,s=e.size,c=e.variant,d=void 0===c?"standard":c,m=(0,y.Z)(e,["children","classes","className","color","component","disabled","error","fullWidth","focused","hiddenLabel","margin","required","size","variant"]),Z=N.useState(function(){var r=!1;return t&&N.Children.forEach(t,function(e){!(0,w.Z)(e,["Input","Select"])||(e=(0,w.Z)(e,["Select"])?e.props.input:e)&&(0,A.B7)(e.props)&&(r=!0)}),r}),b=Z[0],E=Z[1],c=N.useState(function(){var r=!1;return t&&N.Children.forEach(t,function(e){(0,w.Z)(e,["Input","Select"])&&(0,A.vd)(e.props,!0)&&(r=!0)}),r}),e=c[0],x=c[1],Z=N.useState(!1),c=Z[0],k=Z[1],Z=void 0!==v?v:c;u&&Z&&k(!1);v=N.useCallback(function(){x(!0)},[]),c=N.useCallback(function(){x(!1)},[]);return N.createElement(S.Z.Provider,{value:{adornedStart:b,setAdornedStart:E,color:i,disabled:u,error:f,filled:e,focused:Z,fullWidth:p,hiddenLabel:h,margin:("small"===s?"dense":void 0)||g,onBlur:function(){k(!1)},onEmpty:c,onFilled:v,onFocus:function(){k(!0)},registerEffect:void 0,required:o,variant:d}},N.createElement(l,(0,C.Z)({className:(0,q.Z)(n.root,a,"none"!==g&&n["margin".concat((0,L.Z)(g))],p&&n.fullWidth),ref:r},m),t))});r.Z=(0,n.Z)({root:{display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},marginNormal:{marginTop:16,marginBottom:8},marginDense:{marginTop:8,marginBottom:4},fullWidth:{width:"100%"}},{name:"MuiFormControl"})(t)},79587:function(e,r,t){"use strict";t.d(r,{Y:function(){return o}});var n=t(78709),a=n.createContext();function o(){return n.useContext(a)}r.Z=a},26110:function(e,r,t){"use strict";function n(e){var t=e.props,r=e.states,n=e.muiFormControl;return r.reduce(function(e,r){return e[r]=t[r],n&&void 0===t[r]&&(e[r]=n[r]),e},{})}t.d(r,{Z:function(){return n}})},28841:function(e,r,t){"use strict";t.d(r,{Z:function(){return o}});var n=t(78709),a=t(79587);function o(){return n.useContext(a.Z)}},50385:function(e,r,t){"use strict";var l=t(84818),c=t(97439),u=t(78709),n=t(16526),d=t(30367),f=t(26110),m=t(28841),p=t(54059),n=t(6274),t=u.forwardRef(function(e,r){var t=e.children,n=e.classes,a=e.className,o=(e.color,e.component),i=void 0===o?"label":o,s=(e.disabled,e.error,e.filled,e.focused,e.required,(0,l.Z)(e,["children","classes","className","color","component","disabled","error","filled","focused","required"])),o=(0,m.Z)(),o=(0,f.Z)({props:e,muiFormControl:o,states:["color","required","focused","disabled","error","filled"]});return u.createElement(i,(0,c.Z)({className:(0,d.Z)(n.root,n["color".concat((0,p.Z)(o.color||"primary"))],a,o.disabled&&n.disabled,o.error&&n.error,o.filled&&n.filled,o.focused&&n.focused,o.required&&n.required),ref:r},s),t,o.required&&u.createElement("span",{"aria-hidden":!0,className:(0,d.Z)(n.asterisk,o.error&&n.error)}," ","*"))});r.Z=(0,n.Z)(function(e){return{root:(0,c.Z)({color:e.palette.text.secondary},e.typography.body1,{lineHeight:1,padding:0,"&$focused":{color:e.palette.primary.main},"&$disabled":{color:e.palette.text.disabled},"&$error":{color:e.palette.error.main}}),colorSecondary:{"&$focused":{color:e.palette.secondary.main}},focused:{},disabled:{},error:{},filled:{},required:{},asterisk:{"&$error":{color:e.palette.error.main}}}},{name:"MuiFormLabel"})(t)},46140:function(e,r,t){"use strict";function n(e){return null!=e&&!(Array.isArray(e)&&0===e.length)}function a(e){var r=1<arguments.length&&void 0!==arguments[1]&&arguments[1];return e&&(n(e.value)&&""!==e.value||r&&n(e.defaultValue)&&""!==e.defaultValue)}function o(e){return e.startAdornment}t.d(r,{vd:function(){return a},B7:function(){return o}})},50390:function(e,r,t){"use strict";var l=t(97439),c=t(84818),u=t(78709),n=t(16526),d=t(30367),f=t(26110),m=t(28841),n=t(6274),p=t(50385),t=u.forwardRef(function(e,r){var t=e.classes,n=e.className,a=e.disableAnimation,o=void 0!==a&&a,i=(e.margin,e.shrink),s=(e.variant,(0,c.Z)(e,["classes","className","disableAnimation","margin","shrink","variant"])),a=(0,m.Z)(),i=i;void 0===i&&a&&(i=a.filled||a.focused||a.adornedStart);e=(0,f.Z)({props:e,muiFormControl:a,states:["margin","variant"]});return u.createElement(p.Z,(0,l.Z)({"data-shrink":i,className:(0,d.Z)(t.root,n,a&&t.formControl,!o&&t.animated,i&&t.shrink,"dense"===e.margin&&t.marginDense,{filled:t.filled,outlined:t.outlined}[e.variant]),classes:{focused:t.focused,disabled:t.disabled,error:t.error,required:t.required,asterisk:t.asterisk},ref:r},s))});r.Z=(0,n.Z)(function(e){return{root:{display:"block",transformOrigin:"top left"},focused:{},disabled:{},error:{},required:{},asterisk:{},formControl:{position:"absolute",left:0,top:0,transform:"translate(0, 24px) scale(1)"},marginDense:{transform:"translate(0, 21px) scale(1)"},shrink:{transform:"translate(0, 1.5px) scale(0.75)",transformOrigin:"top left"},animated:{transition:e.transitions.create(["color","transform"],{duration:e.transitions.duration.shorter,easing:e.transitions.easing.easeOut})},filled:{zIndex:1,pointerEvents:"none",transform:"translate(12px, 20px) scale(1)","&$marginDense":{transform:"translate(12px, 17px) scale(1)"},"&$shrink":{transform:"translate(12px, 10px) scale(0.75)","&$marginDense":{transform:"translate(12px, 7px) scale(0.75)"}}},outlined:{zIndex:1,pointerEvents:"none",transform:"translate(14px, 20px) scale(1)","&$marginDense":{transform:"translate(14px, 12px) scale(1)"},"&$shrink":{transform:"translate(14px, -6px) scale(0.75)"}}}},{name:"MuiInputLabel"})(t)},60339:function(e,r,t){"use strict";t=t(78709);r.Z=t.createContext({})},15681:function(e,r,t){"use strict";t.d(r,{Z:function(){return a}});var n=t(78709);function a(e,r){return n.isValidElement(e)&&-1!==r.indexOf(e.type.muiName)}},49435:function(e,r,t){"use strict";t.r(r);var n=t(61432),u=t.n(n),d=t(35923),f=t(94678),m=t(70888),p=t(82186),v=t(92571),Z=t(48258),h=t(96282),b=t(13786),n=t(40962),a=t(389),g=t(28344),E=t(78709),x=t(58913),k=t(89673),C=(0,n.Z)(function(e){return{card:{backgroundColor:(0,a.darken)(e.palette.background.default,"light"===e.palette.type?.02:.4)}}});r.default=function(e){var r=(0,x.I0)(),t=(0,x.v9)(function(e){return e.scrumboardApp.board}),n=C(e),a=(0,E.useState)(!1),o=(e=u()(a,2))[0],i=e[1],s=(a=(0,d.cI)({title:""})).form,e=a.handleChange,l=a.resetForm;function c(){i(!1)}return(0,E.useEffect)(function(){o||l()},[o,l]),E.createElement("div",null,E.createElement(f.Z,{className:(0,g.Z)(n.card,"w-320 mx-8 sm:mx-12"),square:!0},o?E.createElement(m.Z,{onClickAway:c},E.createElement("form",{className:"p-16",onSubmit:function(e){e.preventDefault(),r(k.Bl(t.id,s.title)),c()}},E.createElement(p.Z,{className:"mb-16",required:!0,fullWidth:!0,variant:"outlined",label:"List title",autoFocus:!0,name:"title",value:s.title,onChange:e,InputProps:{endAdornment:E.createElement(v.Z,{position:"end"},E.createElement(Z.Z,{onClick:c},E.createElement(h.Z,{className:"text-18"},"close")))}}),E.createElement("div",{className:"flex justify-between items-center"},E.createElement(b.Z,{variant:"contained",color:"secondary",type:"submit",disabled:0===s.title.length},"Add")))):E.createElement(b.Z,{onClick:function(){i(!0)},classes:{root:"normal-case font-600 w-full rounded-none h-64",label:"justify-start"}},E.createElement(h.Z,{className:"text-32 text-red"},"add_circle"),E.createElement("span",{className:"mx-8"},"Add a list"))))}}}]);