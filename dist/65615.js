(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[65615],{79587:function(e,t,n){"use strict";n.d(t,{Y:function(){return i}});var r=n(78709),o=r.createContext();function i(){return r.useContext(o)}t.Z=o},26110:function(e,t,n){"use strict";function r(e){var n=e.props,t=e.states,r=e.muiFormControl;return t.reduce(function(e,t){return e[t]=n[t],r&&void 0===n[t]&&(e[t]=r[t]),e},{})}n.d(t,{Z:function(){return r}})},48258:function(e,t,n){"use strict";var u=n(97439),d=n(84818),f=n(78709),r=n(16526),m=n(30367),r=n(6274),o=n(70621),p=n(85552),b=n(54059),n=f.forwardRef(function(e,t){var n=e.edge,r=void 0!==n&&n,o=e.children,i=e.classes,a=e.className,l=e.color,c=void 0===l?"default":l,s=e.disabled,n=void 0!==s&&s,l=e.disableFocusRipple,s=void 0!==l&&l,l=e.size,l=void 0===l?"medium":l,e=(0,d.Z)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return f.createElement(p.Z,(0,u.Z)({className:(0,m.Z)(i.root,a,"default"!==c&&i["color".concat((0,b.Z)(c))],n&&i.disabled,"small"===l&&i["size".concat((0,b.Z)(l))],{start:i.edgeStart,end:i.edgeEnd}[r]),centerRipple:!0,focusRipple:!s,disabled:n,ref:t},e),f.createElement("span",{className:i.label},o))});t.Z=(0,r.Z)(function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:(0,o.U1)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,o.U1)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,o.U1)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}},{name:"MuiIconButton"})(n)},46140:function(e,t,n){"use strict";function r(e){return null!=e&&!(Array.isArray(e)&&0===e.length)}function o(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];return e&&(r(e.value)&&""!==e.value||t&&r(e.defaultValue)&&""!==e.defaultValue)}function i(e){return e.startAdornment}n.d(t,{vd:function(){return o},B7:function(){return i}})},38932:function(e,t,n){"use strict";var c=n(97439),s=n(84818),u=n(78709),r=n(16526),d=n(30367),f=n(63604),r=n(6274),n=u.forwardRef(function(e,t){var n=e.disableUnderline,r=e.classes,o=e.fullWidth,i=void 0!==o&&o,a=e.inputComponent,l=void 0===a?"input":a,o=e.multiline,a=void 0!==o&&o,o=e.type,o=void 0===o?"text":o,e=(0,s.Z)(e,["disableUnderline","classes","fullWidth","inputComponent","multiline","type"]);return u.createElement(f.Z,(0,c.Z)({classes:(0,c.Z)({},r,{root:(0,d.Z)(r.root,!n&&r.underline),underline:null}),fullWidth:i,inputComponent:l,multiline:a,ref:t,type:o},e))});n.muiName="Input",t.Z=(0,r.Z)(function(e){var t="light"===e.palette.type?"rgba(0, 0, 0, 0.42)":"rgba(255, 255, 255, 0.7)";return{root:{position:"relative"},formControl:{"label + &":{marginTop:16}},focused:{},disabled:{},colorSecondary:{"&$underline:after":{borderBottomColor:e.palette.secondary.main}},underline:{"&:after":{borderBottom:"2px solid ".concat(e.palette.primary.main),left:0,bottom:0,content:'""',position:"absolute",right:0,transform:"scaleX(0)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shorter,easing:e.transitions.easing.easeOut}),pointerEvents:"none"},"&$focused:after":{transform:"scaleX(1)"},"&$error:after":{borderBottomColor:e.palette.error.main,transform:"scaleX(1)"},"&:before":{borderBottom:"1px solid ".concat(t),left:0,bottom:0,content:'"\\00a0"',position:"absolute",right:0,transition:e.transitions.create("border-bottom-color",{duration:e.transitions.duration.shorter}),pointerEvents:"none"},"&:hover:not($disabled):before":{borderBottom:"2px solid ".concat(e.palette.text.primary),"@media (hover: none)":{borderBottom:"1px solid ".concat(t)}},"&$disabled:before":{borderBottomStyle:"dotted"}},error:{},marginDense:{},multiline:{},fullWidth:{},input:{},inputMarginDense:{},inputMultiline:{},inputTypeSearch:{}}},{name:"MuiInput"})(n)},96450:function(e,t,n){"use strict";var o=n(97439),i=n(78709),a=(n(16526),n(39863)),l=n(9665),c=n(17602);t.Z=function(e){var t=e.children,n=e.theme,r=(0,l.Z)();return e=i.useMemo(function(){var e,t,e=null===r?n:(e=r,"function"!=typeof(t=n)?(0,o.Z)((0,o.Z)({},e),t):t(e));return null!=e&&(e[c.Z]=null!==r),e},[n,r]),i.createElement(a.Z.Provider,{value:e},t)}},63978:function(e,t,n){"use strict";n.d(t,{kJ:function(){return r},fK:function(){return o},_$:function(){return i},V8:function(){return a},F:function(){return l},sw:function(){return c},mZ:function(){return s},Lf:function(){return u},zU:function(){return d},m6:function(){return f},Js:function(){return m},E9:function(){return p},Mw:function(){return b},Lx:function(){return v},ov:function(){return h},F4:function(){return y},kQ:function(){return g},hc:function(){return E},Fe:function(){return x}});var r="[Accessibility] TOGGLE ACCESSIBILITY PANEL",o="[Accessibility] OPEN ACCESSIBILITY PANEL",i="[Accessibility] DOWNLOAD SMARTPHONE APP PANEL",a="[Accessibility] GET DATA",l="[Accessibility] SET MENU OPEN PANEL",c="[Accessibility] IS TEAM",s="[Accessibility] IS PROJECT",u="[Accessibility] IS TASK",d="[Accessibility] IS POST",f="[Accessibility] IS DOWNLOAD APP";function m(){return{type:r}}function p(){return{type:o}}function b(e){return{type:l,payload:e}}function v(e){return{type:c,payload:e}}function h(e){return{type:s,payload:e}}function y(e){return{type:u,payload:e}}function g(e){return{type:d,payload:e}}function E(e){return{type:f,payload:e}}function x(){return{type:i}}},71594:function(e,t,n){"use strict";n.r(t);var i=n(78709),a=n(92466),l=n(48258),c=n(96282),s=n(86926),u=n(38932),d=n(13786),f=n(42401),m=n(96450),p=n(58913),b=n(53369),v=n(17844),h=n(63978);t.default=function(t){var n=(0,p.I0)(),e=(0,p.v9)(function(e){return e.contactsApp.contacts.searchText}),r=(0,p.v9)(function(e){return e.fuse.settings.mainTheme}),o=(0,b.$)("contacts").t;return i.createElement(m.Z,{theme:r},i.createElement("div",{className:"flex flex-1 dashboard-todo-header w-full"},i.createElement("div",{className:"project_list h-auto bg-dark-blue min-h-auto w-full p-16"},i.createElement(a.Z,{className:"sm:flex pt-4 pb-8 text-white mx-0 sm:mx-12",variant:"h6"},o("TEAM")),i.createElement("div",{className:"flex flex-1 items-center justify-between"},i.createElement("div",{className:"flex items-center"},i.createElement(l.Z,{onClick:function(e){return t.pageLayout.current.toggleLeftSidebar()},"aria-label":"open left sidebar"},i.createElement(c.Z,{className:"text-white"},"filter_list"))),i.createElement("div",{className:"flex flex-1 items-center justify-center px-12"},i.createElement(m.Z,{theme:r},i.createElement(f.Z,{animation:"transition.slideDownIn",delay:300},i.createElement(s.Z,{className:"flex items-center w-full max-w-512 px-8 py-4 rounded-8",elevation:1},i.createElement(c.Z,{color:"action"},"search"),i.createElement(u.Z,{placeholder:"Cerca Fase di lavoro o attività",className:"flex flex-1 mx-8",disableUnderline:!0,fullWidth:!0,value:e,inputProps:{"aria-label":"Search"},onChange:function(e){return n(v.setSearchText(e))}}))))),i.createElement(f.Z,{animation:"transition.slideRightIn",delay:300},i.createElement(d.Z,{onClick:function(e){return n(h.Js())},className:"whitespace-no-wrap normal-case",variant:"contained",color:"secondary"},i.createElement("span",{className:"xs:hidden sm:flex"},"Guida")))))))}}}]);