(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[93737,75443,52415,72263,27136,75089],{84403:function(e,t,n){"use strict";var a=n(97439),l=n(84818),u=n(78709),r=n(16526),s=n(30367),r=n(6274),d=n(54059),c=n(86926),n=u.forwardRef(function(e,t){var n=e.classes,r=e.className,o=e.color,i=void 0===o?"primary":o,o=e.position,o=void 0===o?"fixed":o,e=(0,l.Z)(e,["classes","className","color","position"]);return u.createElement(c.Z,(0,a.Z)({square:!0,component:"header",elevation:4,className:(0,s.Z)(n.root,n["position".concat((0,d.Z)(o))],n["color".concat((0,d.Z)(i))],r,"fixed"===o&&"mui-fixed"),ref:t},e))});t.Z=(0,r.Z)(function(e){var t="light"===e.palette.type?e.palette.grey[100]:e.palette.grey[900];return{root:{display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",zIndex:e.zIndex.appBar,flexShrink:0},positionFixed:{position:"fixed",top:0,left:"auto",right:0,"@media print":{position:"absolute"}},positionAbsolute:{position:"absolute",top:0,left:"auto",right:0},positionSticky:{position:"sticky",top:0,left:"auto",right:0},positionStatic:{position:"static"},positionRelative:{position:"relative"},colorDefault:{backgroundColor:t,color:e.palette.getContrastText(t)},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},colorInherit:{color:"inherit"},colorTransparent:{backgroundColor:"transparent",color:"inherit"}}},{name:"MuiAppBar"})(n)},41533:function(e,t,n){"use strict";var C=n(97439),w=n(84818),P=n(78709),r=n(16526),_=n(30367),k=n(46140),r=n(6274),D=n(54059),M=n(15681),T=n(79587),n=P.forwardRef(function(e,t){var n=e.children,r=e.classes,o=e.className,i=e.color,a=void 0===i?"primary":i,l=e.component,u=void 0===l?"div":l,s=e.disabled,d=void 0!==s&&s,c=e.error,f=void 0!==c&&c,p=e.fullWidth,m=void 0!==p&&p,v=e.focused,h=e.hiddenLabel,y=void 0!==h&&h,b=e.margin,g=void 0===b?"none":b,Z=e.required,i=void 0!==Z&&Z,l=e.size,s=e.variant,c=void 0===s?"standard":s,p=(0,w.Z)(e,["children","classes","className","color","component","disabled","error","fullWidth","focused","hiddenLabel","margin","required","size","variant"]),h=P.useState(function(){var t=!1;return n&&P.Children.forEach(n,function(e){!(0,M.Z)(e,["Input","Select"])||(e=(0,M.Z)(e,["Select"])?e.props.input:e)&&(0,k.B7)(e.props)&&(t=!0)}),t}),b=h[0],Z=h[1],s=P.useState(function(){var t=!1;return n&&P.Children.forEach(n,function(e){(0,M.Z)(e,["Input","Select"])&&(0,k.vd)(e.props,!0)&&(t=!0)}),t}),e=s[0],x=s[1],h=P.useState(!1),s=h[0],E=h[1],h=void 0!==v?v:s;d&&h&&E(!1);v=P.useCallback(function(){x(!0)},[]),s=P.useCallback(function(){x(!1)},[]);return P.createElement(T.Z.Provider,{value:{adornedStart:b,setAdornedStart:Z,color:a,disabled:d,error:f,filled:e,focused:h,fullWidth:m,hiddenLabel:y,margin:("small"===l?"dense":void 0)||g,onBlur:function(){E(!1)},onEmpty:s,onFilled:v,onFocus:function(){E(!0)},registerEffect:void 0,required:i,variant:c}},P.createElement(u,(0,C.Z)({className:(0,_.Z)(r.root,o,"none"!==g&&r["margin".concat((0,D.Z)(g))],m&&r.fullWidth),ref:t},p),n))});t.Z=(0,r.Z)({root:{display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},marginNormal:{marginTop:16,marginBottom:8},marginDense:{marginTop:8,marginBottom:4},fullWidth:{width:"100%"}},{name:"MuiFormControl"})(n)},79587:function(e,t,n){"use strict";n.d(t,{Y:function(){return i}});var r=n(78709),o=r.createContext();function i(){return r.useContext(o)}t.Z=o},26110:function(e,t,n){"use strict";function r(e){var n=e.props,t=e.states,r=e.muiFormControl;return t.reduce(function(e,t){return e[t]=n[t],r&&void 0===n[t]&&(e[t]=r[t]),e},{})}n.d(t,{Z:function(){return r}})},28841:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(78709),o=n(79587);function i(){return r.useContext(o.Z)}},23726:function(e,t,n){"use strict";var u=n(84818),s=n(97439),d=n(78709),r=n(16526),c=n(30367),f=n(26110),p=n(28841),r=n(6274),n=d.forwardRef(function(e,t){var n=e.children,r=e.classes,o=e.className,i=e.component,a=void 0===i?"p":i,l=(e.disabled,e.error,e.filled,e.focused,e.margin,e.required,e.variant,(0,u.Z)(e,["children","classes","className","component","disabled","error","filled","focused","margin","required","variant"])),i=(0,p.Z)(),i=(0,f.Z)({props:e,muiFormControl:i,states:["variant","margin","disabled","error","filled","focused","required"]});return d.createElement(a,(0,s.Z)({className:(0,c.Z)(r.root,("filled"===i.variant||"outlined"===i.variant)&&r.contained,o,i.disabled&&r.disabled,i.error&&r.error,i.filled&&r.filled,i.focused&&r.focused,i.required&&r.required,"dense"===i.margin&&r.marginDense),ref:t},l)," "===n?d.createElement("span",{dangerouslySetInnerHTML:{__html:"&#8203;"}}):n)});t.Z=(0,r.Z)(function(e){return{root:(0,s.Z)({color:e.palette.text.secondary},e.typography.caption,{textAlign:"left",marginTop:3,margin:0,"&$disabled":{color:e.palette.text.disabled},"&$error":{color:e.palette.error.main}}),error:{},disabled:{},marginDense:{marginTop:4},contained:{marginLeft:14,marginRight:14},focused:{},filled:{},required:{}}},{name:"MuiFormHelperText"})(n)},50385:function(e,t,n){"use strict";var u=n(84818),s=n(97439),d=n(78709),r=n(16526),c=n(30367),f=n(26110),p=n(28841),m=n(54059),r=n(6274),n=d.forwardRef(function(e,t){var n=e.children,r=e.classes,o=e.className,i=(e.color,e.component),a=void 0===i?"label":i,l=(e.disabled,e.error,e.filled,e.focused,e.required,(0,u.Z)(e,["children","classes","className","color","component","disabled","error","filled","focused","required"])),i=(0,p.Z)(),i=(0,f.Z)({props:e,muiFormControl:i,states:["color","required","focused","disabled","error","filled"]});return d.createElement(a,(0,s.Z)({className:(0,c.Z)(r.root,r["color".concat((0,m.Z)(i.color||"primary"))],o,i.disabled&&r.disabled,i.error&&r.error,i.filled&&r.filled,i.focused&&r.focused,i.required&&r.required),ref:t},l),n,i.required&&d.createElement("span",{"aria-hidden":!0,className:(0,c.Z)(r.asterisk,i.error&&r.error)}," ","*"))});t.Z=(0,r.Z)(function(e){return{root:(0,s.Z)({color:e.palette.text.secondary},e.typography.body1,{lineHeight:1,padding:0,"&$focused":{color:e.palette.primary.main},"&$disabled":{color:e.palette.text.disabled},"&$error":{color:e.palette.error.main}}),colorSecondary:{"&$focused":{color:e.palette.secondary.main}},focused:{},disabled:{},error:{},filled:{},required:{},asterisk:{"&$error":{color:e.palette.error.main}}}},{name:"MuiFormLabel"})(n)},64349:function(e,t,n){"use strict";var x=n(97439),E=n(35313),C=n(84818),w=n(78709),P=(n(16526),n(30765)),_=n(58626),k=n(13117),D=n(70198);function M(e){return"scale(".concat(e,", ").concat(Math.pow(e,2),")")}var T={entering:{opacity:1,transform:M(1)},entered:{opacity:1,transform:"none"}},n=w.forwardRef(function(e,t){var n=e.children,r=e.disableStrictModeCompat,o=void 0!==r&&r,i=e.in,a=e.onEnter,l=e.onEntered,u=e.onEntering,s=e.onExit,d=e.onExited,c=e.onExiting,f=e.style,p=e.timeout,m=void 0===p?"auto":p,r=e.TransitionComponent,p=void 0===r?P.ZP:r,r=(0,C.Z)(e,["children","disableStrictModeCompat","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"]),v=w.useRef(),h=w.useRef(),y=(0,_.Z)(),b=y.unstable_strictMode&&!o,g=w.useRef(null),e=(0,D.Z)(n.ref,t),Z=(0,D.Z)(b?g:void 0,e),o=function(n){return function(e,t){n&&(e=b?[g.current,e]:[e,t],e=(t=(0,E.Z)(e,2))[0],void 0===(t=t[1])?n(e):n(e,t))}},t=o(u),e=o(function(e,t){(0,k.n)(e);var n,r=(0,k.C)({style:f,timeout:m},{mode:"enter"}),o=r.duration,r=r.delay;"auto"===m?(n=y.transitions.getAutoHeightDuration(e.clientHeight),h.current=n):n=o,e.style.transition=[y.transitions.create("opacity",{duration:n,delay:r}),y.transitions.create("transform",{duration:.666*n,delay:r})].join(","),a&&a(e,t)}),u=o(l),l=o(c),c=o(function(e){var t,n=(0,k.C)({style:f,timeout:m},{mode:"exit"}),r=n.duration,n=n.delay;"auto"===m?(t=y.transitions.getAutoHeightDuration(e.clientHeight),h.current=t):t=r,e.style.transition=[y.transitions.create("opacity",{duration:t,delay:n}),y.transitions.create("transform",{duration:.666*t,delay:n||.333*t})].join(","),e.style.opacity="0",e.style.transform=M(.75),s&&s(e)}),d=o(d);return w.useEffect(function(){return function(){clearTimeout(v.current)}},[]),w.createElement(p,(0,x.Z)({appear:!0,in:i,nodeRef:b?g:void 0,onEnter:e,onEntered:u,onEntering:t,onExit:c,onExited:d,onExiting:l,addEndListener:function(e,t){"auto"===m&&(v.current=setTimeout(b?e:t,h.current||0))},timeout:"auto"===m?null:m},r),function(e,t){return w.cloneElement(n,(0,x.Z)({style:(0,x.Z)({opacity:0,transform:M(.75),visibility:"exited"!==e||i?void 0:"hidden"},T[e],f,n.props.style),ref:Z},t))})});n.muiSupportAuto=!0,t.Z=n},46140:function(e,t,n){"use strict";function r(e){return null!=e&&!(Array.isArray(e)&&0===e.length)}function o(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];return e&&(r(e.value)&&""!==e.value||t&&r(e.defaultValue)&&""!==e.defaultValue)}function i(e){return e.startAdornment}n.d(t,{vd:function(){return o},B7:function(){return i}})},50390:function(e,t,n){"use strict";var u=n(97439),s=n(84818),d=n(78709),r=n(16526),c=n(30367),f=n(26110),p=n(28841),r=n(6274),m=n(50385),n=d.forwardRef(function(e,t){var n=e.classes,r=e.className,o=e.disableAnimation,i=void 0!==o&&o,a=(e.margin,e.shrink),l=(e.variant,(0,s.Z)(e,["classes","className","disableAnimation","margin","shrink","variant"])),o=(0,p.Z)(),a=a;void 0===a&&o&&(a=o.filled||o.focused||o.adornedStart);e=(0,f.Z)({props:e,muiFormControl:o,states:["margin","variant"]});return d.createElement(m.Z,(0,u.Z)({"data-shrink":a,className:(0,c.Z)(n.root,r,o&&n.formControl,!i&&n.animated,a&&n.shrink,"dense"===e.margin&&n.marginDense,{filled:n.filled,outlined:n.outlined}[e.variant]),classes:{focused:n.focused,disabled:n.disabled,error:n.error,required:n.required,asterisk:n.asterisk},ref:t},l))});t.Z=(0,r.Z)(function(e){return{root:{display:"block",transformOrigin:"top left"},focused:{},disabled:{},error:{},required:{},asterisk:{},formControl:{position:"absolute",left:0,top:0,transform:"translate(0, 24px) scale(1)"},marginDense:{transform:"translate(0, 21px) scale(1)"},shrink:{transform:"translate(0, 1.5px) scale(0.75)",transformOrigin:"top left"},animated:{transition:e.transitions.create(["color","transform"],{duration:e.transitions.duration.shorter,easing:e.transitions.easing.easeOut})},filled:{zIndex:1,pointerEvents:"none",transform:"translate(12px, 20px) scale(1)","&$marginDense":{transform:"translate(12px, 17px) scale(1)"},"&$shrink":{transform:"translate(12px, 10px) scale(0.75)","&$marginDense":{transform:"translate(12px, 7px) scale(0.75)"}}},outlined:{zIndex:1,pointerEvents:"none",transform:"translate(14px, 20px) scale(1)","&$marginDense":{transform:"translate(14px, 12px) scale(1)"},"&$shrink":{transform:"translate(14px, -6px) scale(0.75)"}}}},{name:"MuiInputLabel"})(n)},82159:function(e,t,n){"use strict";var d=n(97439),c=n(84818),f=n(78709),r=n(16526),p=n(30367),r=n(6274),m=n(60339),n=f.forwardRef(function(e,t){var n=e.children,r=e.classes,o=e.className,i=e.component,a=void 0===i?"ul":i,l=e.dense,u=void 0!==l&&l,s=e.disablePadding,i=void 0!==s&&s,l=e.subheader,s=(0,c.Z)(e,["children","classes","className","component","dense","disablePadding","subheader"]),e=f.useMemo(function(){return{dense:u}},[u]);return f.createElement(m.Z.Provider,{value:e},f.createElement(a,(0,d.Z)({className:(0,p.Z)(r.root,o,u&&r.dense,!i&&r.padding,l&&r.subheader),ref:t},s),l,n))});t.Z=(0,r.Z)({root:{listStyle:"none",margin:0,padding:0,position:"relative"},padding:{paddingTop:8,paddingBottom:8},dense:{},subheader:{paddingTop:0}},{name:"MuiList"})(n)},60339:function(e,t,n){"use strict";n=n(78709);t.Z=n.createContext({})},97115:function(e,t,n){"use strict";var s=n(78709),d=n(91169),c=(n(16526),n(17700)),f=n(70198);var p="undefined"!=typeof window?s.useLayoutEffect:s.useEffect;t.Z=s.forwardRef(function(e,t){var n=e.children,r=e.container,o=e.disablePortal,i=void 0!==o&&o,a=e.onRendered,e=s.useState(null),l=e[0],u=e[1],e=(0,f.Z)(s.isValidElement(n)?n.ref:null,t);return p(function(){var e;i||u((e="function"==typeof(e=r)?e():e,d.findDOMNode(e)||document.body))},[r,i]),p(function(){if(l&&!i)return(0,c.Z)(t,l),function(){(0,c.Z)(t,null)}},[t,l,i]),p(function(){a&&(l||i)&&a()},[a,l,i]),i?s.isValidElement(n)?s.cloneElement(n,{ref:e}):n:l&&d.createPortal(n,l)})},82186:function(e,t,n){"use strict";var L=n(97439),A=n(84818),I=n(78709),$=(n(16526),n(30367)),r=n(38932),o=n(91493),i=n(25715),B=n(50390),U=n(41533),W=n(23726),V=n(71871),n=n(6274),H={standard:r.Z,filled:o.Z,outlined:i.Z},i=I.forwardRef(function(e,t){var n=e.autoComplete,r=e.autoFocus,o=void 0!==r&&r,i=e.children,a=e.classes,l=e.className,u=e.color,s=void 0===u?"primary":u,d=e.defaultValue,c=e.disabled,f=void 0!==c&&c,p=e.error,m=void 0!==p&&p,v=e.FormHelperTextProps,h=e.fullWidth,y=void 0!==h&&h,b=e.helperText,g=e.hiddenLabel,Z=e.id,x=e.InputLabelProps,E=e.inputProps,C=e.InputProps,w=e.inputRef,P=e.label,_=e.multiline,k=void 0!==_&&_,D=e.name,M=e.onBlur,T=e.onChange,F=e.onFocus,O=e.placeholder,q=e.required,S=void 0!==q&&q,N=e.rows,r=e.rowsMax,u=e.select,c=void 0!==u&&u,p=e.SelectProps,h=e.type,_=e.value,q=e.variant,u=void 0===q?"standard":q,q=(0,A.Z)(e,["autoComplete","autoFocus","children","classes","className","color","defaultValue","disabled","error","FormHelperTextProps","fullWidth","helperText","hiddenLabel","id","InputLabelProps","inputProps","InputProps","inputRef","label","multiline","name","onBlur","onChange","onFocus","placeholder","required","rows","rowsMax","select","SelectProps","type","value","variant"]);e={};"outlined"===u&&(x&&void 0!==x.shrink&&(e.notched=x.shrink),P&&(j=null!==(R=null==x?void 0:x.required)&&void 0!==R?R:S,e.label=I.createElement(I.Fragment,null,P,j&&" *"))),c&&(p&&p.native||(e.id=void 0),e["aria-describedby"]=void 0);var R=b&&Z?"".concat(Z,"-helper-text"):void 0,j=P&&Z?"".concat(Z,"-label"):void 0,C=I.createElement(H[u],(0,L.Z)({"aria-describedby":R,autoComplete:n,autoFocus:o,defaultValue:d,fullWidth:y,multiline:k,name:D,rows:N,rowsMax:r,type:h,value:_,id:Z,inputRef:w,onBlur:M,onChange:T,onFocus:F,placeholder:O,inputProps:E},e,C));return I.createElement(U.Z,(0,L.Z)({className:(0,$.Z)(a.root,l),disabled:f,error:m,fullWidth:y,hiddenLabel:g,ref:t,required:S,color:s,variant:u},q),P&&I.createElement(B.Z,(0,L.Z)({htmlFor:Z,id:j},x),P),c?I.createElement(V.Z,(0,L.Z)({"aria-describedby":R,id:Z,labelId:j,value:_,input:C},p),i):C,b&&I.createElement(W.Z,(0,L.Z)({id:R},v),b))});t.Z=(0,n.Z)({root:{}},{name:"MuiTextField"})(i)},13117:function(e,t,n){"use strict";n.d(t,{n:function(){return r},C:function(){return o}});var r=function(e){return e.scrollTop};function o(e,t){var n=e.timeout,e=e.style,e=void 0===e?{}:e;return{duration:e.transitionDuration||"number"==typeof n?n:n[t.mode]||0,delay:e.transitionDelay}}},88514:function(e,t,n){"use strict";function r(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(r,o){return null==o?r:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];r.apply(this,t),o.apply(this,t)}},function(){})}n.d(t,{Z:function(){return r}})},15681:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(78709);function o(e,t){return r.isValidElement(e)&&-1!==t.indexOf(e.type.muiName)}},41931:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var i=n(78709);function r(e){var t=e.controlled,n=e.default,e=(e.name,e.state),r=i.useRef(void 0!==t).current,e=i.useState(n),n=e[0],o=e[1];return[r?t:n,i.useCallback(function(e){r||o(e)},[])]}},96450:function(e,t,n){"use strict";var o=n(97439),i=n(78709),a=(n(16526),n(39863)),l=n(9665),u=n(17602);t.Z=function(e){var t=e.children,n=e.theme,r=(0,l.Z)();return e=i.useMemo(function(){var e,t,e=null===r?n:(e=r,"function"!=typeof(t=n)?(0,o.Z)((0,o.Z)({},e),t):t(e));return null!=e&&(e[u.Z]=null!==r),e},[n,r]),i.createElement(a.Z.Provider,{value:e},t)}},14516:function(e,t,n){"use strict";function u(e,t){if(e.length!==t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}n.r(t),t.default=function(n,r){var o;void 0===r&&(r=u);var i,a=[],l=!1;return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return l&&o===this&&r(e,a)||(i=n.apply(this,e),l=!0,o=this,a=e),i}}},91906:function(e,t,n){"use strict";var r=n(45559);Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e};function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=n(78709),n=(l(a),l(n(16526)));function l(e){return e&&e.__esModule?e:{default:e}}(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+r(t));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)})(u,a.Component),o(u,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return a.Children.only(this.props.children)}}]),o=u;function u(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==r(t)&&"function"!=typeof t?e:t}(this,(u.__proto__||Object.getPrototypeOf(u)).apply(this,arguments))}o.propTypes={children:n.default.element.isRequired,contentDidMount:n.default.func.isRequired,contentDidUpdate:n.default.func.isRequired},t.default=o},13229:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContextProvider=t.FrameContext=void 0;var r,o=n(78709),i=(r=o)&&r.__esModule?r:{default:r};var a=void 0,n=void 0;"undefined"!=typeof document&&(a=document),"undefined"!=typeof window&&(n=window);a=t.FrameContext=i.default.createContext({document:a,window:n}),n=a.Provider,a=a.Consumer;t.FrameContextProvider=n,t.FrameContextConsumer=a},5178:function(e,t,n){"use strict";var r=n(45559);Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,r=arguments[t];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e};function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=n(78709),u=p(l),s=p(n(91169)),d=p(n(16526)),c=n(13229),f=p(n(91906));function p(e){return e&&e.__esModule?e:{default:e}}(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+r(t));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)})(m,l.Component),i(m,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var t=this.props.contentDidMount,n=this.props.contentDidUpdate,r=e.defaultView||e.parentView,r=u.default.createElement(f.default,{contentDidMount:t,contentDidUpdate:n},u.default.createElement(c.FrameContextProvider,{value:{document:e,window:r}},u.default.createElement("div",{className:"frame-content"},this.props.children)));e.body.children.length<1&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close());e=this.getMountTarget();return[s.default.createPortal(this.props.head,this.getDoc().head),s.default.createPortal(r,e)]}},{key:"render",value:function(){var t=this,e=o({},this.props,{children:void 0});return delete e.head,delete e.initialContent,delete e.mountTarget,delete e.contentDidMount,delete e.contentDidUpdate,u.default.createElement("iframe",o({},e,{ref:function(e){t.node=e}}),this.renderFrameContents())}}]),i=m;function m(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,m);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==r(t)&&"function"!=typeof t?e:t}(this,(m.__proto__||Object.getPrototypeOf(m)).call(this,e,t));return n.handleLoad=function(){n.forceUpdate()},n._isMounted=!1,n}i.propTypes={style:d.default.object,head:d.default.node,initialContent:d.default.string,mountTarget:d.default.string,contentDidMount:d.default.func,contentDidUpdate:d.default.func,children:d.default.oneOfType([d.default.element,d.default.arrayOf(d.default.element)])},i.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=i},34948:function(e,t,n){"use strict";n(13229);var r,o=n(5178),n=(r=o)&&r.__esModule?r:{default:r};t.ZP=n.default}}]);