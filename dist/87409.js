(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[87409],{5344:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var d=n(97439),u=n(84818),m=n(78709),p=(n(16526),n(30367)),f=n(30732),o=n(23763),a=(0,o.Z)(m.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),t=(0,o.Z)(m.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),r=n(70621),o=(0,o.Z)(m.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),v=n(54059),n=n(6274),h=m.createElement(t,null),g=m.createElement(a,null),b=m.createElement(o,null),o=m.forwardRef(function(e,t){var n=e.checkedIcon,o=void 0===n?h:n,a=e.classes,r=e.color,i=void 0===r?"secondary":r,c=e.icon,l=void 0===c?g:c,s=e.indeterminate,n=void 0!==s&&s,r=e.indeterminateIcon,c=void 0===r?b:r,s=e.inputProps,r=e.size,r=void 0===r?"medium":r,e=(0,u.Z)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]),l=n?c:l,o=n?c:o;return m.createElement(f.Z,(0,d.Z)({type:"checkbox",classes:{root:(0,p.Z)(a.root,a["color".concat((0,v.Z)(i))],n&&a.indeterminate),checked:a.checked,disabled:a.disabled},color:i,inputProps:(0,d.Z)({"data-indeterminate":n},s),icon:m.cloneElement(l,{fontSize:void 0===l.props.fontSize&&"small"===r?r:l.props.fontSize}),checkedIcon:m.cloneElement(o,{fontSize:void 0===o.props.fontSize&&"small"===r?r:o.props.fontSize}),ref:t},e))}),i=(0,n.Z)(function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,r.U1)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,r.U1)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}},{name:"MuiCheckbox"})(o)},79587:function(e,t,n){"use strict";n.d(t,{Y:function(){return r}});var o=n(78709),a=o.createContext();function r(){return o.useContext(a)}t.Z=a},26110:function(e,t,n){"use strict";function o(e){var n=e.props,t=e.states,o=e.muiFormControl;return t.reduce(function(e,t){return e[t]=n[t],o&&void 0===n[t]&&(e[t]=o[t]),e},{})}n.d(t,{Z:function(){return o}})},28841:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var o=n(78709),a=n(79587);function r(){return o.useContext(a.Z)}},64349:function(e,t,n){"use strict";var E=n(97439),k=n(35313),x=n(84818),C=n(78709),w=(n(16526),n(30765)),N=n(58626),S=n(13117),R=n(70198);function P(e){return"scale(".concat(e,", ").concat(Math.pow(e,2),")")}var I={entering:{opacity:1,transform:P(1)},entered:{opacity:1,transform:"none"}},n=C.forwardRef(function(e,t){var n=e.children,o=e.disableStrictModeCompat,a=void 0!==o&&o,r=e.in,i=e.onEnter,c=e.onEntered,l=e.onEntering,s=e.onExit,d=e.onExited,u=e.onExiting,m=e.style,p=e.timeout,f=void 0===p?"auto":p,o=e.TransitionComponent,p=void 0===o?w.ZP:o,o=(0,x.Z)(e,["children","disableStrictModeCompat","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"]),v=C.useRef(),h=C.useRef(),g=(0,N.Z)(),b=g.unstable_strictMode&&!a,Z=C.useRef(null),e=(0,R.Z)(n.ref,t),y=(0,R.Z)(b?Z:void 0,e),a=function(n){return function(e,t){n&&(e=b?[Z.current,e]:[e,t],e=(t=(0,k.Z)(e,2))[0],void 0===(t=t[1])?n(e):n(e,t))}},t=a(l),e=a(function(e,t){(0,S.n)(e);var n,o=(0,S.C)({style:m,timeout:f},{mode:"enter"}),a=o.duration,o=o.delay;"auto"===f?(n=g.transitions.getAutoHeightDuration(e.clientHeight),h.current=n):n=a,e.style.transition=[g.transitions.create("opacity",{duration:n,delay:o}),g.transitions.create("transform",{duration:.666*n,delay:o})].join(","),i&&i(e,t)}),l=a(c),c=a(u),u=a(function(e){var t,n=(0,S.C)({style:m,timeout:f},{mode:"exit"}),o=n.duration,n=n.delay;"auto"===f?(t=g.transitions.getAutoHeightDuration(e.clientHeight),h.current=t):t=o,e.style.transition=[g.transitions.create("opacity",{duration:t,delay:n}),g.transitions.create("transform",{duration:.666*t,delay:n||.333*t})].join(","),e.style.opacity="0",e.style.transform=P(.75),s&&s(e)}),d=a(d);return C.useEffect(function(){return function(){clearTimeout(v.current)}},[]),C.createElement(p,(0,E.Z)({appear:!0,in:r,nodeRef:b?Z:void 0,onEnter:e,onEntered:l,onEntering:t,onExit:u,onExited:d,onExiting:c,addEndListener:function(e,t){"auto"===f&&(v.current=setTimeout(b?e:t,h.current||0))},timeout:"auto"===f?null:f},o),function(e,t){return C.cloneElement(n,(0,E.Z)({style:(0,E.Z)({opacity:0,transform:P(.75),visibility:"exited"!==e||r?void 0:"hidden"},I[e],m,n.props.style),ref:y},t))})});n.muiSupportAuto=!0,t.Z=n},48258:function(e,t,n){"use strict";var d=n(97439),u=n(84818),m=n(78709),o=n(16526),p=n(30367),o=n(6274),a=n(70621),f=n(85552),v=n(54059),n=m.forwardRef(function(e,t){var n=e.edge,o=void 0!==n&&n,a=e.children,r=e.classes,i=e.className,c=e.color,l=void 0===c?"default":c,s=e.disabled,n=void 0!==s&&s,c=e.disableFocusRipple,s=void 0!==c&&c,c=e.size,c=void 0===c?"medium":c,e=(0,u.Z)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return m.createElement(f.Z,(0,d.Z)({className:(0,p.Z)(r.root,i,"default"!==l&&r["color".concat((0,v.Z)(l))],n&&r.disabled,"small"===c&&r["size".concat((0,v.Z)(c))],{start:r.edgeStart,end:r.edgeEnd}[o]),centerRipple:!0,focusRipple:!s,disabled:n,ref:t},e),m.createElement("span",{className:r.label},a))});t.Z=(0,o.Z)(function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:(0,a.U1)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,a.U1)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,a.U1)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}},{name:"MuiIconButton"})(n)},46140:function(e,t,n){"use strict";function o(e){return null!=e&&!(Array.isArray(e)&&0===e.length)}function a(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];return e&&(o(e.value)&&""!==e.value||t&&o(e.defaultValue)&&""!==e.defaultValue)}function r(e){return e.startAdornment}n.d(t,{vd:function(){return a},B7:function(){return r}})},82159:function(e,t,n){"use strict";var d=n(97439),u=n(84818),m=n(78709),o=n(16526),p=n(30367),o=n(6274),f=n(60339),n=m.forwardRef(function(e,t){var n=e.children,o=e.classes,a=e.className,r=e.component,i=void 0===r?"ul":r,c=e.dense,l=void 0!==c&&c,s=e.disablePadding,r=void 0!==s&&s,c=e.subheader,s=(0,u.Z)(e,["children","classes","className","component","dense","disablePadding","subheader"]),e=m.useMemo(function(){return{dense:l}},[l]);return m.createElement(f.Z.Provider,{value:e},m.createElement(i,(0,d.Z)({className:(0,p.Z)(o.root,a,l&&o.dense,!r&&o.padding,c&&o.subheader),ref:t},s),c,n))});t.Z=(0,o.Z)({root:{listStyle:"none",margin:0,padding:0,position:"relative"},padding:{paddingTop:8,paddingBottom:8},dense:{},subheader:{paddingTop:0}},{name:"MuiList"})(n)},60339:function(e,t,n){"use strict";n=n(78709);t.Z=n.createContext({})},45201:function(e,t,n){"use strict";var r=n(97439),i=n(84818),c=n(78709),o=n(16526),l=n(30367),o=n(6274),s=n(32754),d={variant:"body"},n=c.forwardRef(function(e,t){var n=e.classes,o=e.className,a=e.component,a=void 0===a?"tbody":a,e=(0,i.Z)(e,["classes","className","component"]);return c.createElement(s.Z.Provider,{value:d},c.createElement(a,(0,r.Z)({className:(0,l.Z)(n.root,o),ref:t,role:"tbody"===a?null:"rowgroup"},e)))});t.Z=(0,o.Z)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(n)},24918:function(e,t,n){"use strict";var l=n(97439),s=n(84818),d=n(78709),o=n(16526),u=n(30367),o=n(6274),m=n(32754),a=n(70621),n=d.forwardRef(function(e,t){var n=e.classes,o=e.className,a=e.component,r=void 0===a?"tr":a,i=e.hover,c=void 0!==i&&i,a=e.selected,i=void 0!==a&&a,a=(0,s.Z)(e,["classes","className","component","hover","selected"]),e=d.useContext(m.Z);return d.createElement(r,(0,l.Z)({ref:t,className:(0,u.Z)(n.root,o,e&&{head:n.head,footer:n.footer}[e.variant],c&&n.hover,i&&n.selected),role:"tr"===r?null:"row"},a))});t.Z=(0,o.Z)(function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:(0,a.U1)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}},{name:"MuiTableRow"})(n)},52108:function(e,t,n){"use strict";var s=n(84818),d=n(97439),u=n(78709),o=n(16526),m=n(30367),o=n(6274),p=n(68847),n=u.forwardRef(function(e,t){var n=e.classes,o=e.className,a=e.component,r=void 0===a?"table":a,a=e.padding,i=void 0===a?"default":a,a=e.size,c=void 0===a?"medium":a,a=e.stickyHeader,l=void 0!==a&&a,a=(0,s.Z)(e,["classes","className","component","padding","size","stickyHeader"]),e=u.useMemo(function(){return{padding:i,size:c,stickyHeader:l}},[i,c,l]);return u.createElement(p.Z.Provider,{value:e},u.createElement(r,(0,d.Z)({role:"table"===r?null:"table",ref:t,className:(0,m.Z)(n.root,o,l&&n.stickyHeader)},a)))});t.Z=(0,o.Z)(function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":(0,d.Z)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}},{name:"MuiTable"})(n)},95272:function(e,t,n){"use strict";var c=n(97439),l=n(84818),o=n(93535),s=n(78709),a=n(16526),d=n(30367),a=n(6274),n=s.forwardRef(function(e,t){var n=e.classes,o=e.className,a=e.component,r=void 0===a?"div":a,i=e.disableGutters,a=void 0!==i&&i,i=e.variant,i=void 0===i?"regular":i,e=(0,l.Z)(e,["classes","className","component","disableGutters","variant"]);return s.createElement(r,(0,c.Z)({className:(0,d.Z)(n.root,n[i],o,!a&&n.gutters),ref:t},e))});t.Z=(0,a.Z)(function(e){return{root:{position:"relative",display:"flex",alignItems:"center"},gutters:(0,o.Z)({paddingLeft:e.spacing(2),paddingRight:e.spacing(2)},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),regular:e.mixins.toolbar,dense:{minHeight:48}}},{name:"MuiToolbar"})(n)},30732:function(e,t,n){"use strict";var N=n(97439),S=n(35313),R=n(84818),P=n(78709),o=n(16526),I=n(30367),z=n(41931),B=n(28841),o=n(6274),M=n(48258),n=P.forwardRef(function(e,t){var n=e.autoFocus,o=e.checked,a=e.checkedIcon,r=e.classes,i=e.className,c=e.defaultChecked,l=e.disabled,s=e.icon,d=e.id,u=e.inputProps,m=e.inputRef,p=e.name,f=e.onBlur,v=e.onChange,h=e.onFocus,g=e.readOnly,b=e.required,Z=e.tabIndex,y=e.type,E=e.value,k=(0,R.Z)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),x=(0,z.Z)({controlled:o,default:Boolean(c),name:"SwitchBase",state:"checked"}),e=(0,S.Z)(x,2),x=e[0],C=e[1],w=(0,B.Z)(),e=l;w&&void 0===e&&(e=w.disabled);l="checkbox"===y||"radio"===y;return P.createElement(M.Z,(0,N.Z)({component:"span",className:(0,I.Z)(r.root,i,x&&r.checked,e&&r.disabled),disabled:e,tabIndex:null,role:void 0,onFocus:function(e){h&&h(e),w&&w.onFocus&&w.onFocus(e)},onBlur:function(e){f&&f(e),w&&w.onBlur&&w.onBlur(e)},ref:t},k),P.createElement("input",(0,N.Z)({autoFocus:n,checked:o,defaultChecked:c,className:r.input,disabled:e,id:l&&d,name:p,onChange:function(e){var t=e.target.checked;C(t),v&&v(e,t)},readOnly:g,ref:m,required:b,tabIndex:Z,type:y,value:E},u)),x?a:s)});t.Z=(0,o.Z)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(n)},15681:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var o=n(78709);function a(e,t){return o.isValidElement(e)&&-1!==t.indexOf(e.type.muiName)}},63752:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var a=n(78709);function o(e){var t=a.useState(e),n=t[0],o=t[1],e=e||n;return a.useEffect(function(){null==n&&o("mui-".concat(Math.round(1e5*Math.random())))},[n]),e}},41931:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(78709);function o(e){var t=e.controlled,n=e.default,e=(e.name,e.state),o=r.useRef(void 0!==t).current,e=r.useState(n),n=e[0],a=e[1];return[o?t:n,r.useCallback(function(e){o||a(e)},[])]}},33649:function(e,t,n){"use strict";n.r(t);var o=n(61432),v=n.n(o),h=n(17725),g=n(65129),b=n(52108),Z=n(45201),y=n(24918),E=n(55572),k=n(5344),x=n(96282),C=n(69469),w=n(28344),N=n(78709),S=n(58913),o=n(55110),R=n(47467),P=(0,n(32986).ZP)(function(){return Promise.all([n.e(33395),n.e(64297),n.e(52091)]).then(n.bind(n,52091))});t.default=(0,o.EN)(function(n){var e=(0,S.I0)(),t=(0,S.v9)(function(e){return e.eCommerceApp.products.data}),o=(0,S.v9)(function(e){return e.eCommerceApp.products.searchText}),a=(0,N.useState)([]),r=(d=v()(a,2))[0],i=d[1],c=(0,N.useState)(t),l=(a=v()(c,2))[0],s=a[1],d=(0,N.useState)(0),a=(c=v()(d,2))[0],u=c[1],d=(0,N.useState)(10),d=(c=v()(d,2))[0],m=c[1],c=(0,N.useState)({direction:"asc",id:null}),p=(c=v()(c,2))[0],f=c[1];return(0,N.useEffect)(function(){e(R.Xp())},[e]),(0,N.useEffect)(function(){0!==o.length?(s(g.Z.filter(t,function(e){return e.name.toLowerCase().includes(o.toLowerCase())})),u(0)):s(t)},[t,o]),N.createElement("div",{className:"w-full flex flex-col"},N.createElement(h.Z,{className:"flex-grow overflow-x-auto"},N.createElement(b.Z,{className:"min-w-xl","aria-labelledby":"tableTitle"},N.createElement(P,{numSelected:r.length,order:p,onSelectAllClick:function(e){e.target.checked?i(l.map(function(e){return e.id})):i([])},onRequestSort:function(e,t){var n="desc";p.id===t&&"desc"===p.direction&&(n="asc"),f({direction:n,id:t})},rowCount:l.length}),N.createElement(Z.Z,null,g.Z.orderBy(l,[function(e){return"categories"!==p.id?e[p.id]:e.categories[0]}],[p.direction]).slice(a*d,a*d+d).map(function(a){var e=-1!==r.indexOf(a.id);return N.createElement(y.Z,{className:"h-64 cursor-pointer",hover:!0,role:"checkbox","aria-checked":e,tabIndex:-1,key:a.id,selected:e,onClick:function(e){var t;t=a,n.history.push("/apps/e-commerce/products/".concat(t.id,"/").concat(t.handle))}},N.createElement(E.Z,{className:"w-64 text-center",padding:"none"},N.createElement(k.Z,{checked:e,onClick:function(e){return e.stopPropagation()},onChange:function(e){return t=a.id,n=r.indexOf(t),o=[],-1===n?o=o.concat(r,t):0===n?o=o.concat(r.slice(1)):n===r.length-1?o=o.concat(r.slice(0,-1)):0<n&&(o=o.concat(r.slice(0,n),r.slice(n+1))),void i(o);var t,n,o}})),N.createElement(E.Z,{className:"w-52",component:"th",scope:"row",padding:"none"},0<a.images.length&&a.featuredImageId?N.createElement("img",{className:"w-full block rounded",src:g.Z.find(a.images,{id:a.featuredImageId}).url,alt:a.name}):N.createElement("img",{className:"w-full block rounded",src:"assets/images/ecommerce/product-image-placeholder.png",alt:a.name})),N.createElement(E.Z,{component:"th",scope:"row"},a.name),N.createElement(E.Z,{className:"truncate",component:"th",scope:"row"},a.categories.join(", ")),N.createElement(E.Z,{component:"th",scope:"row",align:"right"},N.createElement("span",null,"$"),a.priceTaxIncl),N.createElement(E.Z,{component:"th",scope:"row",align:"right"},a.quantity,N.createElement("i",{className:(0,w.Z)("inline-block w-8 h-8 rounded mx-8",a.quantity<=5&&"bg-red-500",5<a.quantity&&a.quantity<=25&&"bg-orange",25<a.quantity&&"bg-green")})),N.createElement(E.Z,{component:"th",scope:"row",align:"right"},a.active?N.createElement(x.Z,{className:"text-green text-20"},"check_circle"):N.createElement(x.Z,{className:"text-red text-20"},"remove_circle")))})))),N.createElement(C.Z,{className:"overflow-hidden",component:"div",count:l.length,rowsPerPage:d,page:a,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onChangePage:function(e,t){u(t)},onChangeRowsPerPage:function(e){m(e.target.value)}}))})}}]);