(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[5203],{79587:function(e,t,n){"use strict";n.d(t,{Y:function(){return o}});var a=n(78709),r=a.createContext();function o(){return a.useContext(r)}t.Z=r},28841:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var a=n(78709),r=n(79587);function o(){return a.useContext(r.Z)}},73772:function(e,t,n){"use strict";var o=n(97439),i=n(84818),s=n(78709),a=n(16526),c=n(30367),a=n(6274),l=n(60339),n=s.forwardRef(function(e,t){var n=e.classes,a=e.className,r=(0,i.Z)(e,["classes","className"]),e=s.useContext(l.Z);return s.createElement("div",(0,o.Z)({className:(0,c.Z)(n.root,a,"flex-start"===e.alignItems&&n.alignItemsFlexStart),ref:t},r))});t.Z=(0,a.Z)(function(e){return{root:{minWidth:56,color:e.palette.action.active,flexShrink:0,display:"inline-flex"},alignItemsFlexStart:{marginTop:8}}},{name:"MuiListItemIcon"})(n)},248:function(e,t,n){"use strict";var r=n(97439),o=n(84818),i=n(78709),a=n(16526),s=n(30367),a=n(6274),n=i.forwardRef(function(e,t){var n=e.classes,a=e.className,e=(0,o.Z)(e,["classes","className"]);return i.createElement("div",(0,r.Z)({className:(0,s.Z)(n.root,a),ref:t},e))});n.muiName="ListItemSecondaryAction",t.Z=(0,a.Z)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(n)},88325:function(e,t,n){"use strict";var m=n(97439),p=n(84818),f=n(78709),a=n(16526),g=n(30367),a=n(6274),h=n(92466),b=n(60339),n=f.forwardRef(function(e,t){var n=e.children,a=e.classes,r=e.className,o=e.disableTypography,i=void 0!==o&&o,s=e.inset,c=void 0!==s&&s,l=e.primary,d=e.primaryTypographyProps,u=e.secondary,o=e.secondaryTypographyProps,s=(0,p.Z)(e,["children","classes","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"]),e=f.useContext(b.Z).dense,n=null!=l?l:n;null==n||n.type===h.Z||i||(n=f.createElement(h.Z,(0,m.Z)({variant:e?"body2":"body1",className:a.primary,component:"span",display:"block"},d),n));return null==u||u.type===h.Z||i||(u=f.createElement(h.Z,(0,m.Z)({variant:"body2",className:a.secondary,color:"textSecondary",display:"block"},o),u)),f.createElement("div",(0,m.Z)({className:(0,g.Z)(a.root,r,e&&a.dense,c&&a.inset,n&&u&&a.multiline),ref:t},s),n,u)});t.Z=(0,a.Z)({root:{flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},multiline:{marginTop:6,marginBottom:6},dense:{},inset:{paddingLeft:56},primary:{},secondary:{}},{name:"MuiListItemText"})(n)},96569:function(e,t,n){"use strict";var k=n(97439),C=n(84818),x=n(78709),a=n(16526),E=n(30367),a=n(6274),N=n(85552),w=n(15681),I=n(70198),$=n(60339),S=n(91169),B="undefined"==typeof window?x.useEffect:x.useLayoutEffect,n=x.forwardRef(function(e,t){var n=e.alignItems,a=void 0===n?"center":n,r=e.autoFocus,o=void 0!==r&&r,i=e.button,s=void 0!==i&&i,c=e.children,l=e.classes,d=e.className,u=e.component,m=e.ContainerComponent,p=void 0===m?"li":m,f=e.ContainerProps,g=(f=void 0===f?{}:f).className,h=(0,C.Z)(f,["className"]),b=e.dense,y=void 0!==b&&b,v=e.disabled,n=void 0!==v&&v,r=e.disableGutters,i=void 0!==r&&r,m=e.divider,f=void 0!==m&&m,b=e.focusVisibleClassName,v=e.selected,r=void 0!==v&&v,m=(0,C.Z)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),v=x.useContext($.Z),e={dense:y||v.dense||!1,alignItems:a},Z=x.useRef(null);B(function(){o&&Z.current&&Z.current.focus()},[o]);y=x.Children.toArray(c),v=y.length&&(0,w.Z)(y[y.length-1],["ListItemSecondaryAction"]),c=x.useCallback(function(e){Z.current=S.findDOMNode(e)},[]),t=(0,I.Z)(c,t),n=(0,k.Z)({className:(0,E.Z)(l.root,d,e.dense&&l.dense,!i&&l.gutters,f&&l.divider,n&&l.disabled,s&&l.button,"center"!==a&&l.alignItemsFlexStart,v&&l.secondaryAction,r&&l.selected),disabled:n},m),m=u||"li";return s&&(n.component=u||"div",n.focusVisibleClassName=(0,E.Z)(l.focusVisible,b),m=N.Z),v?(m=n.component||u?m:"div","li"===p&&("li"===m?m="div":"li"===n.component&&(n.component="div")),x.createElement($.Z.Provider,{value:e},x.createElement(p,(0,k.Z)({className:(0,E.Z)(l.container,g),ref:t},h),x.createElement(m,n,y),y.pop()))):x.createElement($.Z.Provider,{value:e},x.createElement(m,(0,k.Z)({ref:t},n),y))});t.Z=(0,a.Z)(function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}},{name:"MuiListItem"})(n)},82159:function(e,t,n){"use strict";var d=n(97439),u=n(84818),m=n(78709),a=n(16526),p=n(30367),a=n(6274),f=n(60339),n=m.forwardRef(function(e,t){var n=e.children,a=e.classes,r=e.className,o=e.component,i=void 0===o?"ul":o,s=e.dense,c=void 0!==s&&s,l=e.disablePadding,o=void 0!==l&&l,s=e.subheader,l=(0,u.Z)(e,["children","classes","className","component","dense","disablePadding","subheader"]),e=m.useMemo(function(){return{dense:c}},[c]);return m.createElement(f.Z.Provider,{value:e},m.createElement(i,(0,d.Z)({className:(0,p.Z)(a.root,r,c&&a.dense,!o&&a.padding,s&&a.subheader),ref:t},l),s,n))});t.Z=(0,a.Z)({root:{listStyle:"none",margin:0,padding:0,position:"relative"},padding:{paddingTop:8,paddingBottom:8},dense:{},subheader:{paddingTop:0}},{name:"MuiList"})(n)},60339:function(e,t,n){"use strict";n=n(78709);t.Z=n.createContext({})},55964:function(e,t,n){"use strict";var c=n(97439),l=n(84818),d=n(78709),a=n(16526),u=n(30367),a=n(6274),r=n(70621),m=n(54059),p=n(30732),n=d.forwardRef(function(e,t){var n=e.classes,a=e.className,r=e.color,o=void 0===r?"secondary":r,i=e.edge,s=void 0!==i&&i,r=e.size,i=void 0===r?"medium":r,r=(0,l.Z)(e,["classes","className","color","edge","size"]),e=d.createElement("span",{className:n.thumb});return d.createElement("span",{className:(0,u.Z)(n.root,a,{start:n.edgeStart,end:n.edgeEnd}[s],"small"===i&&n["size".concat((0,m.Z)(i))])},d.createElement(p.Z,(0,c.Z)({type:"checkbox",icon:e,checkedIcon:e,classes:{root:(0,u.Z)(n.switchBase,n["color".concat((0,m.Z)(o))]),input:n.input,checked:n.checked,disabled:n.disabled},ref:t},r)),d.createElement("span",{className:n.track}))});t.Z=(0,a.Z)(function(e){return{root:{display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},edgeStart:{marginLeft:-8},edgeEnd:{marginRight:-8},switchBase:{position:"absolute",top:0,left:0,zIndex:1,color:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[400],transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),"&$checked":{transform:"translateX(20px)"},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{opacity:.5},"&$disabled + $track":{opacity:"light"===e.palette.type?.12:.1}},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,r.U1)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.primary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,r.U1)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.secondary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},sizeSmall:{width:40,height:24,padding:7,"& $thumb":{width:16,height:16},"& $switchBase":{padding:4,"&$checked":{transform:"translateX(16px)"}}},checked:{},disabled:{},input:{left:"-100%",width:"300%"},thumb:{boxShadow:e.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"},track:{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white,opacity:"light"===e.palette.type?.38:.3}}},{name:"MuiSwitch"})(n)},30732:function(e,t,n){"use strict";var w=n(97439),I=n(35313),$=n(84818),S=n(78709),a=n(16526),B=n(30367),R=n(41931),P=n(28841),a=n(6274),F=n(48258),n=S.forwardRef(function(e,t){var n=e.autoFocus,a=e.checked,r=e.checkedIcon,o=e.classes,i=e.className,s=e.defaultChecked,c=e.disabled,l=e.icon,d=e.id,u=e.inputProps,m=e.inputRef,p=e.name,f=e.onBlur,g=e.onChange,h=e.onFocus,b=e.readOnly,y=e.required,v=e.tabIndex,Z=e.type,k=e.value,C=(0,$.Z)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),x=(0,R.Z)({controlled:a,default:Boolean(s),name:"SwitchBase",state:"checked"}),e=(0,I.Z)(x,2),x=e[0],E=e[1],N=(0,P.Z)(),e=c;N&&void 0===e&&(e=N.disabled);c="checkbox"===Z||"radio"===Z;return S.createElement(F.Z,(0,w.Z)({component:"span",className:(0,B.Z)(o.root,i,x&&o.checked,e&&o.disabled),disabled:e,tabIndex:null,role:void 0,onFocus:function(e){h&&h(e),N&&N.onFocus&&N.onFocus(e)},onBlur:function(e){f&&f(e),N&&N.onBlur&&N.onBlur(e)},ref:t},C),S.createElement("input",(0,w.Z)({autoFocus:n,checked:a,defaultChecked:s,className:o.input,disabled:e,id:c&&d,name:p,onChange:function(e){var t=e.target.checked;E(t),g&&g(e,t)},readOnly:b,ref:m,required:y,tabIndex:v,type:Z,value:k},u)),x?r:l)});t.Z=(0,a.Z)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(n)},15681:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var a=n(78709);function r(e,t){return a.isValidElement(e)&&-1!==t.indexOf(e.type.muiName)}},41931:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var o=n(78709);function a(e){var t=e.controlled,n=e.default,e=(e.name,e.state),a=o.useRef(void 0!==t).current,e=o.useState(n),n=e[0],r=e[1];return[a?t:n,o.useCallback(function(e){a||r(e)},[])]}},5203:function(e,t,n){"use strict";n.r(t);var a=n(84403),r=n(95272),o=n(82159),i=n(96569),s=n(73772),c=n(96282),l=n(88325),d=n(248),u=n(55964),m=n(89673),p=n(78709),f=n(58913);t.default=function(e){var t=(0,f.I0)(),n=(0,f.v9)(function(e){return e.scrumboardApp.board});return p.createElement("div",null,p.createElement(a.Z,{position:"static"},p.createElement(r.Z,{className:"flex w-full justify-center"},"Settings")),p.createElement(o.Z,{className:"py-16",dense:!0},p.createElement(i.Z,{button:!0,onClick:function(){return t(m.xn({cardCoverImages:!n.settings.cardCoverImages}))}},p.createElement(s.Z,{className:"min-w-40"},p.createElement(c.Z,null,"photo")),p.createElement(l.Z,{primary:"Card Cover Images"}),p.createElement(d.Z,null,p.createElement(u.Z,{onChange:function(){return t(m.xn({cardCoverImages:!n.settings.cardCoverImages}))},checked:n.settings.cardCoverImages}))),p.createElement(i.Z,{button:!0,onClick:function(){return t(m.xn({subscribed:!n.settings.subscribed}))}},p.createElement(s.Z,{className:"min-w-40"},p.createElement(c.Z,null,"remove_red_eye")),p.createElement(l.Z,{primary:"Subscribe"}),p.createElement(d.Z,null,p.createElement(u.Z,{onChange:function(){return t(m.xn({subscribed:!n.settings.subscribed}))},checked:n.settings.subscribed}))),p.createElement(i.Z,{button:!0,onClick:function(){return t(m.hr(n))}},p.createElement(s.Z,{className:"min-w-40"},p.createElement(c.Z,null,"file_copy")),p.createElement(l.Z,{primary:"Copy Board"})),p.createElement(i.Z,{button:!0,onClick:function(){return t(m.L1(n.id))}},p.createElement(s.Z,{className:"min-w-40"},p.createElement(c.Z,null,"delete")),p.createElement(l.Z,{primary:"Delete Board"}))))}}}]);