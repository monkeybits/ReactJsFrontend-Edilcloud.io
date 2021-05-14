(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[64811],{73772:function(e,t,n){"use strict";var s=n(97439),r=n(84818),i=n(78709),a=n(16526),l=n(30367),a=n(6274),d=n(60339),n=i.forwardRef(function(e,t){var n=e.classes,a=e.className,o=(0,r.Z)(e,["classes","className"]),e=i.useContext(d.Z);return i.createElement("div",(0,s.Z)({className:(0,l.Z)(n.root,a,"flex-start"===e.alignItems&&n.alignItemsFlexStart),ref:t},o))});t.Z=(0,a.Z)(function(e){return{root:{minWidth:56,color:e.palette.action.active,flexShrink:0,display:"inline-flex"},alignItemsFlexStart:{marginTop:8}}},{name:"MuiListItemIcon"})(n)},88325:function(e,t,n){"use strict";var m=n(97439),p=n(84818),f=n(78709),a=n(16526),Z=n(30367),a=n(6274),g=n(92466),b=n(60339),n=f.forwardRef(function(e,t){var n=e.children,a=e.classes,o=e.className,s=e.disableTypography,r=void 0!==s&&s,i=e.inset,l=void 0!==i&&i,d=e.primary,c=e.primaryTypographyProps,u=e.secondary,s=e.secondaryTypographyProps,i=(0,p.Z)(e,["children","classes","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"]),e=f.useContext(b.Z).dense,n=null!=d?d:n;null==n||n.type===g.Z||r||(n=f.createElement(g.Z,(0,m.Z)({variant:e?"body2":"body1",className:a.primary,component:"span",display:"block"},c),n));return null==u||u.type===g.Z||r||(u=f.createElement(g.Z,(0,m.Z)({variant:"body2",className:a.secondary,color:"textSecondary",display:"block"},s),u)),f.createElement("div",(0,m.Z)({className:(0,Z.Z)(a.root,o,e&&a.dense,l&&a.inset,n&&u&&a.multiline),ref:t},i),n,u)});t.Z=(0,a.Z)({root:{flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},multiline:{marginTop:6,marginBottom:6},dense:{},inset:{paddingLeft:56},primary:{},secondary:{}},{name:"MuiListItemText"})(n)},96569:function(e,t,n){"use strict";var C=n(97439),E=n(84818),x=n(78709),a=n(16526),N=n(30367),a=n(6274),I=n(85552),k=n(15681),w=n(70198),T=n(60339),S=n(91169),P="undefined"==typeof window?x.useEffect:x.useLayoutEffect,n=x.forwardRef(function(e,t){var n=e.alignItems,a=void 0===n?"center":n,o=e.autoFocus,s=void 0!==o&&o,r=e.button,i=void 0!==r&&r,l=e.children,d=e.classes,c=e.className,u=e.component,m=e.ContainerComponent,p=void 0===m?"li":m,f=e.ContainerProps,Z=(f=void 0===f?{}:f).className,g=(0,E.Z)(f,["className"]),b=e.dense,v=void 0!==b&&b,y=e.disabled,n=void 0!==y&&y,o=e.disableGutters,r=void 0!==o&&o,m=e.divider,f=void 0!==m&&m,b=e.focusVisibleClassName,y=e.selected,o=void 0!==y&&y,m=(0,E.Z)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),y=x.useContext(T.Z),e={dense:v||y.dense||!1,alignItems:a},h=x.useRef(null);P(function(){s&&h.current&&h.current.focus()},[s]);v=x.Children.toArray(l),y=v.length&&(0,k.Z)(v[v.length-1],["ListItemSecondaryAction"]),l=x.useCallback(function(e){h.current=S.findDOMNode(e)},[]),t=(0,w.Z)(l,t),n=(0,C.Z)({className:(0,N.Z)(d.root,c,e.dense&&d.dense,!r&&d.gutters,f&&d.divider,n&&d.disabled,i&&d.button,"center"!==a&&d.alignItemsFlexStart,y&&d.secondaryAction,o&&d.selected),disabled:n},m),m=u||"li";return i&&(n.component=u||"div",n.focusVisibleClassName=(0,N.Z)(d.focusVisible,b),m=I.Z),y?(m=n.component||u?m:"div","li"===p&&("li"===m?m="div":"li"===n.component&&(n.component="div")),x.createElement(T.Z.Provider,{value:e},x.createElement(p,(0,C.Z)({className:(0,N.Z)(d.container,Z),ref:t},g),x.createElement(m,n,v),v.pop()))):x.createElement(T.Z.Provider,{value:e},x.createElement(m,(0,C.Z)({ref:t},n),v))});t.Z=(0,a.Z)(function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}},{name:"MuiListItem"})(n)},82159:function(e,t,n){"use strict";var c=n(97439),u=n(84818),m=n(78709),a=n(16526),p=n(30367),a=n(6274),f=n(60339),n=m.forwardRef(function(e,t){var n=e.children,a=e.classes,o=e.className,s=e.component,r=void 0===s?"ul":s,i=e.dense,l=void 0!==i&&i,d=e.disablePadding,s=void 0!==d&&d,i=e.subheader,d=(0,u.Z)(e,["children","classes","className","component","dense","disablePadding","subheader"]),e=m.useMemo(function(){return{dense:l}},[l]);return m.createElement(f.Z.Provider,{value:e},m.createElement(r,(0,c.Z)({className:(0,p.Z)(a.root,o,l&&a.dense,!s&&a.padding,i&&a.subheader),ref:t},d),i,n))});t.Z=(0,a.Z)({root:{listStyle:"none",margin:0,padding:0,position:"relative"},padding:{paddingTop:8,paddingBottom:8},dense:{},subheader:{paddingTop:0}},{name:"MuiList"})(n)},60339:function(e,t,n){"use strict";n=n(78709);t.Z=n.createContext({})},41713:function(e,t,n){"use strict";var m=n(84818),a=n(93535),p=n(97439),f=n(78709),o=n(16526),Z=n(30367),o=n(6274),g=n(96569),n=f.forwardRef(function(e,t){var n,a=e.classes,o=e.className,s=e.component,r=void 0===s?"li":s,i=e.disableGutters,l=void 0!==i&&i,d=e.ListItemClasses,c=e.role,u=void 0===c?"menuitem":c,s=e.selected,i=e.tabIndex,c=(0,m.Z)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(n=void 0!==i?i:-1),f.createElement(g.Z,(0,p.Z)({button:!0,role:u,tabIndex:n,component:r,selected:s,disableGutters:l,classes:(0,p.Z)({dense:a.dense},d),className:(0,Z.Z)(a.root,o,s&&a.selected,!l&&a.gutters),ref:t},c))});t.Z=(0,o.Z)(function(e){return{root:(0,p.Z)({},e.typography.body1,(0,a.Z)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:(0,p.Z)({},e.typography.body2,{minHeight:"auto"})}},{name:"MuiMenuItem"})(n)},86235:function(e,t,n){"use strict";n.r(t);var a=n(61432),r=n.n(a),i=n(96282),l=n(48258),d=n(73772),c=n(88325),u=n(30250),m=n(41713),p=n(84677),f=n(78709),Z=n(58913),g=n(20074);t.default=function(e){var t=(0,Z.I0)(),n=e.selectedContactIds,a=(0,f.useState)(null),a=(e=r()(a,2))[0],o=e[1];function s(){o(null)}return f.createElement(f.Fragment,null,f.createElement(l.Z,{className:"p-0","aria-owns":a?"selectedContactsMenu":null,"aria-haspopup":"true",onClick:function(e){o(e.currentTarget)}},f.createElement(i.Z,null,"more_horiz")),f.createElement(u.Z,{id:"selectedContactsMenu",anchorEl:a,open:Boolean(a),onClose:s},f.createElement(p.Z,null,f.createElement(m.Z,{onClick:function(){t(g.tY(n)),s()}},f.createElement(d.Z,{className:"min-w-40"},f.createElement(i.Z,null,"delete")),f.createElement(c.Z,{primary:"Remove"})),f.createElement(m.Z,{onClick:function(){t(g.u2(n)),s()}},f.createElement(d.Z,{className:"min-w-40"},f.createElement(i.Z,null,"star")),f.createElement(c.Z,{primary:"Starred"})),f.createElement(m.Z,{onClick:function(){t(g.Qb(n)),s()}},f.createElement(d.Z,{className:"min-w-40"},f.createElement(i.Z,null,"star_border")),f.createElement(c.Z,{primary:"Unstarred"})))))}}}]);