(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[35215],{73772:function(e,t,a){"use strict";var o=a(97439),i=a(84818),l=a(78709),n=a(16526),c=a(30367),n=a(6274),s=a(60339),a=l.forwardRef(function(e,t){var a=e.classes,n=e.className,r=(0,i.Z)(e,["classes","className"]),e=l.useContext(s.Z);return l.createElement("div",(0,o.Z)({className:(0,c.Z)(a.root,n,"flex-start"===e.alignItems&&a.alignItemsFlexStart),ref:t},r))});t.Z=(0,n.Z)(function(e){return{root:{minWidth:56,color:e.palette.action.active,flexShrink:0,display:"inline-flex"},alignItemsFlexStart:{marginTop:8}}},{name:"MuiListItemIcon"})(a)},88325:function(e,t,a){"use strict";var u=a(97439),p=a(84818),f=a(78709),n=a(16526),g=a(30367),n=a(6274),y=a(92466),Z=a(60339),a=f.forwardRef(function(e,t){var a=e.children,n=e.classes,r=e.className,o=e.disableTypography,i=void 0!==o&&o,l=e.inset,c=void 0!==l&&l,s=e.primary,d=e.primaryTypographyProps,m=e.secondary,o=e.secondaryTypographyProps,l=(0,p.Z)(e,["children","classes","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"]),e=f.useContext(Z.Z).dense,a=null!=s?s:a;null==a||a.type===y.Z||i||(a=f.createElement(y.Z,(0,u.Z)({variant:e?"body2":"body1",className:n.primary,component:"span",display:"block"},d),a));return null==m||m.type===y.Z||i||(m=f.createElement(y.Z,(0,u.Z)({variant:"body2",className:n.secondary,color:"textSecondary",display:"block"},o),m)),f.createElement("div",(0,u.Z)({className:(0,g.Z)(n.root,r,e&&n.dense,c&&n.inset,a&&m&&n.multiline),ref:t},l),a,m)});t.Z=(0,n.Z)({root:{flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},multiline:{marginTop:6,marginBottom:6},dense:{},inset:{paddingLeft:56},primary:{},secondary:{}},{name:"MuiListItemText"})(a)},19684:function(e,t,a){"use strict";var o=a(97439),i=a(84818),l=a(78709),n=a(16526),c=a(30367),n=a(6274),s=a(32754),d={variant:"head"},a=l.forwardRef(function(e,t){var a=e.classes,n=e.className,r=e.component,r=void 0===r?"thead":r,e=(0,i.Z)(e,["classes","className","component"]);return l.createElement(s.Z.Provider,{value:d},l.createElement(r,(0,o.Z)({className:(0,c.Z)(a.root,n),ref:t,role:"thead"===r?null:"rowgroup"},e)))});t.Z=(0,n.Z)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(a)},85404:function(e,t,a){"use strict";a.d(t,{Z:function(){return n}});var s=a(97439),d=a(84818),m=a(78709),u=(a(16526),a(30367)),p=(0,a(23763).Z)(m.createElement("path",{d:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"}),"ArrowDownward"),t=a(6274),f=a(85552),g=a(54059),a=m.forwardRef(function(e,t){var a=e.active,n=void 0!==a&&a,r=e.children,o=e.classes,i=e.className,l=e.direction,c=void 0===l?"asc":l,a=e.hideSortIcon,l=void 0!==a&&a,a=e.IconComponent,a=void 0===a?p:a,e=(0,d.Z)(e,["active","children","classes","className","direction","hideSortIcon","IconComponent"]);return m.createElement(f.Z,(0,s.Z)({className:(0,u.Z)(o.root,i,n&&o.active),component:"span",disableRipple:!0,ref:t},e),r,l&&!n?null:m.createElement(a,{className:(0,u.Z)(o.icon,o["iconDirection".concat((0,g.Z)(c))])}))}),n=(0,t.Z)(function(e){return{root:{cursor:"pointer",display:"inline-flex",justifyContent:"flex-start",flexDirection:"inherit",alignItems:"center","&:focus":{color:e.palette.text.secondary},"&:hover":{color:e.palette.text.secondary,"& $icon":{opacity:.5}},"&$active":{color:e.palette.text.primary,"&& $icon":{opacity:1,color:e.palette.text.secondary}}},active:{},icon:{fontSize:18,marginRight:4,marginLeft:4,opacity:0,transition:e.transitions.create(["opacity","transform"],{duration:e.transitions.duration.shorter}),userSelect:"none"},iconDirectionDesc:{transform:"rotate(0deg)"},iconDirectionAsc:{transform:"rotate(180deg)"}}},{name:"MuiTableSortLabel"})(a)},35215:function(e,t,a){"use strict";a.r(t);var n=a(61432),i=a.n(n),l=a(19684),c=a(24918),s=a(55572),d=a(5344),m=a(48258),u=a(96282),p=a(30250),f=a(84677),g=a(41713),y=a(73772),Z=a(88325),h=a(64297),v=a(85404),n=a(40962),b=a(28344),E=a(78709),x=[{id:"id",align:"left",disablePadding:!1,label:"ID",sort:!0},{id:"reference",align:"left",disablePadding:!1,label:"Reference",sort:!0},{id:"customer",align:"left",disablePadding:!1,label:"Customer",sort:!0},{id:"total",align:"right",disablePadding:!1,label:"Total",sort:!0},{id:"payment",align:"left",disablePadding:!1,label:"Payment",sort:!0},{id:"status",align:"left",disablePadding:!1,label:"Status",sort:!0},{id:"date",align:"left",disablePadding:!1,label:"Date",sort:!0}],N=(0,n.Z)(function(e){return{actionsButtonWrapper:{background:e.palette.background.paper}}});t.default=function(a){var e=N(a),t=(0,E.useState)(null),n=i()(t,2),t=n[0],r=n[1];function o(){r(null)}return E.createElement(l.Z,null,E.createElement(c.Z,{className:"h-64"},E.createElement(s.Z,{padding:"none",className:"relative w-64 text-center"},E.createElement(d.Z,{indeterminate:0<a.numSelected&&a.numSelected<a.rowCount,checked:a.numSelected===a.rowCount,onChange:a.onSelectAllClick}),0<a.numSelected&&E.createElement("div",{className:(0,b.Z)("flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10",e.actionsButtonWrapper)},E.createElement(m.Z,{"aria-owns":t?"selectedOrdersMenu":null,"aria-haspopup":"true",onClick:function(e){r(e.currentTarget)}},E.createElement(u.Z,null,"more_horiz")),E.createElement(p.Z,{id:"selectedOrdersMenu",anchorEl:t,open:Boolean(t),onClose:o},E.createElement(f.Z,null,E.createElement(g.Z,{onClick:function(){o()}},E.createElement(y.Z,{className:"min-w-40"},E.createElement(u.Z,null,"delete")),E.createElement(Z.Z,{primary:"Remove"})))))),x.map(function(e){return E.createElement(s.Z,{key:e.id,align:e.align,padding:e.disablePadding?"none":"default",sortDirection:a.order.id===e.id&&a.order.direction},e.sort&&E.createElement(h.ZP,{title:"Sort",placement:"right"===e.align?"bottom-end":"bottom-start",enterDelay:300},E.createElement(v.Z,{active:a.order.id===e.id,direction:a.order.direction,onClick:(t=e.id,function(e){a.onRequestSort(e,t)})},e.label)));var t},this)))}}}]);