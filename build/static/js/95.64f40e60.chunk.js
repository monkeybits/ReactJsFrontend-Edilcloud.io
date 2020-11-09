(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[95],{1899:function(e,a,t){"use strict";var l=t(0),r=l.createContext();a.a=r},1913:function(e,a,t){"use strict";var l=t(0),r=l.createContext();a.a=r},1968:function(e,a,t){"use strict";var l=t(4),r=t(1),n=t(0),c=(t(3),t(5)),i=t(7),o=t(14),s=t(21),m=t(1913),d=t(1899),u=n.forwardRef((function(e,a){var t,i,s=e.align,u=void 0===s?"inherit":s,p=e.classes,g=e.className,f=e.component,b=e.padding,E=e.scope,h=e.size,v=e.sortDirection,y=e.variant,x=Object(l.a)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),N=n.useContext(m.a),O=n.useContext(d.a),j=O&&"head"===O.variant;f?(i=f,t=j?"columnheader":"cell"):i=j?"th":"td";var w=E;!w&&j&&(w="col");var k=b||(N&&N.padding?N.padding:"default"),S=h||(N&&N.size?N.size:"medium"),T=y||O&&O.variant,C=null;return v&&(C="asc"===v?"ascending":"descending"),n.createElement(i,Object(r.a)({ref:a,className:Object(c.a)(p.root,p[T],g,"inherit"!==u&&p["align".concat(Object(o.a)(u))],"default"!==k&&p["padding".concat(Object(o.a)(k))],"medium"!==S&&p["size".concat(Object(o.a)(S))],"head"===T&&N&&N.stickyHeader&&p.stickyHeader),"aria-sort":C,role:t,scope:w},x))}));a.a=Object(i.a)((function(e){return{root:Object(r.a)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?Object(s.i)(Object(s.d)(e.palette.divider,1),.88):Object(s.a)(Object(s.d)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}}),{name:"MuiTableCell"})(u)},1982:function(e,a,t){"use strict";var l=t(4),r=t(1),n=t(0),c=(t(3),t(5)),i=t(7),o=t(1913),s=n.forwardRef((function(e,a){var t=e.classes,i=e.className,s=e.component,m=void 0===s?"table":s,d=e.padding,u=void 0===d?"default":d,p=e.size,g=void 0===p?"medium":p,f=e.stickyHeader,b=void 0!==f&&f,E=Object(l.a)(e,["classes","className","component","padding","size","stickyHeader"]),h=n.useMemo((function(){return{padding:u,size:g,stickyHeader:b}}),[u,g,b]);return n.createElement(o.a.Provider,{value:h},n.createElement(m,Object(r.a)({role:"table"===m?null:"table",ref:a,className:Object(c.a)(t.root,i,b&&t.stickyHeader)},E)))}));a.a=Object(i.a)((function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":Object(r.a)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}}),{name:"MuiTable"})(s)},1983:function(e,a,t){"use strict";var l=t(1),r=t(4),n=t(0),c=(t(3),t(5)),i=t(7),o=t(1899),s={variant:"head"},m=n.forwardRef((function(e,a){var t=e.classes,i=e.className,m=e.component,d=void 0===m?"thead":m,u=Object(r.a)(e,["classes","className","component"]);return n.createElement(o.a.Provider,{value:s},n.createElement(d,Object(l.a)({className:Object(c.a)(t.root,i),ref:a,role:"thead"===d?null:"rowgroup"},u)))}));a.a=Object(i.a)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(m)},1984:function(e,a,t){"use strict";var l=t(1),r=t(4),n=t(0),c=(t(3),t(5)),i=t(7),o=t(1899),s=t(21),m=n.forwardRef((function(e,a){var t=e.classes,i=e.className,s=e.component,m=void 0===s?"tr":s,d=e.hover,u=void 0!==d&&d,p=e.selected,g=void 0!==p&&p,f=Object(r.a)(e,["classes","className","component","hover","selected"]),b=n.useContext(o.a);return n.createElement(m,Object(l.a)({ref:a,className:Object(c.a)(t.root,i,b&&{head:t.head,footer:t.footer}[b.variant],u&&t.hover,g&&t.selected),role:"tr"===m?null:"row"},f))}));a.a=Object(i.a)((function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:Object(s.d)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}}),{name:"MuiTableRow"})(m)},1985:function(e,a,t){"use strict";var l=t(1),r=t(4),n=t(0),c=(t(3),t(5)),i=t(7),o=t(1899),s={variant:"body"},m=n.forwardRef((function(e,a){var t=e.classes,i=e.className,m=e.component,d=void 0===m?"tbody":m,u=Object(r.a)(e,["classes","className","component"]);return n.createElement(o.a.Provider,{value:s},n.createElement(d,Object(l.a)({className:Object(c.a)(t.root,i),ref:a,role:"tbody"===d?null:"rowgroup"},u)))}));a.a=Object(i.a)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(m)},3535:function(e,a,t){"use strict";t.r(a);var l=t(8),r=t(156),n=t(1825),c=t(1827),i=t(782),o=t(240),s=t(1982),m=t(1985),d=t(1968),u=t(1983),p=t(1984),g=t(71),f=t(26),b=t.n(f),E=t(11),h=t(0),v=t.n(h),y=Object(i.a)((function(e){return{root:{background:"radial-gradient(".concat(Object(o.darken)(e.palette.primary.dark,.5)," 0%, ").concat(e.palette.primary.dark," 80%)")},divider:{backgroundColor:e.palette.getContrastText(e.palette.primary.dark)},seller:{backgroundColor:e.palette.primary.dark,color:e.palette.getContrastText(e.palette.primary.dark),marginRight:-88,paddingRight:66,width:480}}}));a.default=function(){var e=y(),a=Object(h.useState)(null),t=Object(l.a)(a,2),i=t[0],o=t[1],f=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2});return Object(h.useEffect)((function(){b.a.get("/api/invoices/get-invoice",{params:{id:"5725a6802d"}}).then((function(e){o(e.data)}))}),[]),v.a.createElement("div",{className:Object(E.a)(e.root,"flex-grow flex-shrink-0 p-0 sm:p-64 print:p-0")},i&&v.a.createElement(r.a,{animation:{translateY:[0,"100%"]},duration:600},v.a.createElement(n.a,{className:"mx-auto w-xl print:w-full print:p-8 print:shadow-none"},v.a.createElement(c.a,{className:"p-88 print:p-0"},v.a.createElement(g.a,{color:"textSecondary",className:"mb-32"},i.date),v.a.createElement("div",{className:"flex justify-between"},v.a.createElement("div",null,v.a.createElement("table",{className:"mb-16"},v.a.createElement("tbody",null,v.a.createElement("tr",null,v.a.createElement("td",{className:"pb-4"},v.a.createElement(g.a,{className:"font-light",variant:"h6",color:"textSecondary"},"INVOICE")),v.a.createElement("td",{className:"pb-4 px-16"},v.a.createElement(g.a,{className:"font-light",variant:"h6"},i.number))),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement(g.a,{color:"textSecondary"},"INVOICE DATE")),v.a.createElement("td",{className:"px-16"},v.a.createElement(g.a,null,i.date))),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement(g.a,{color:"textSecondary"},"DUE DATE")),v.a.createElement("td",{className:"px-16"},v.a.createElement(g.a,null,i.dueDate))))),v.a.createElement(g.a,{color:"textSecondary"},i.client.title),i.client.address&&v.a.createElement(g.a,{color:"textSecondary"},i.client.address),i.client.phone&&v.a.createElement(g.a,{color:"textSecondary"},i.client.phone),i.client.email&&v.a.createElement(g.a,{color:"textSecondary"},i.client.email),i.client.website&&v.a.createElement(g.a,{color:"textSecondary"},i.client.website)),v.a.createElement("div",{className:Object(E.a)(e.seller,"flex items-center p-16")},v.a.createElement("img",{className:"w-80",src:"assets/images/logos/fuse.svg",alt:"logo"}),v.a.createElement("div",{className:Object(E.a)(e.divider,"w-px mx-8 h-96 opacity-50")}),v.a.createElement("div",{className:"px-8"},v.a.createElement(g.a,{color:"inherit"},i.from.title),i.from.address&&v.a.createElement(g.a,{color:"inherit"},i.from.address),i.from.phone&&v.a.createElement(g.a,{color:"inherit"},i.from.phone),i.from.email&&v.a.createElement(g.a,{color:"inherit"},i.from.email),i.from.website&&v.a.createElement(g.a,{color:"inherit"},i.from.website)))),v.a.createElement("div",{className:"mt-64"},v.a.createElement(s.a,{className:"simple"},v.a.createElement(u.a,null,v.a.createElement(p.a,null,v.a.createElement(d.a,null,"SERVICE"),v.a.createElement(d.a,null,"UNIT"),v.a.createElement(d.a,{align:"right"},"UNIT PRICE"),v.a.createElement(d.a,{align:"right"},"QUANTITY"),v.a.createElement(d.a,{align:"right"},"TOTAL"))),v.a.createElement(m.a,null,i.services.map((function(e){return v.a.createElement(p.a,{key:e.id},v.a.createElement(d.a,null,v.a.createElement(g.a,{variant:"subtitle1"},e.title)),v.a.createElement(d.a,null,e.unit),v.a.createElement(d.a,{align:"right"},f.format(e.unitPrice)),v.a.createElement(d.a,{align:"right"},e.quantity),v.a.createElement(d.a,{align:"right"},f.format(e.total)))})))),v.a.createElement(s.a,{className:"simple mt-32"},v.a.createElement(m.a,null,v.a.createElement(p.a,null,v.a.createElement(d.a,null,v.a.createElement(g.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},"SUBTOTAL")),v.a.createElement(d.a,{align:"right"},v.a.createElement(g.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},f.format(i.subtotal)))),v.a.createElement(p.a,null,v.a.createElement(d.a,null,v.a.createElement(g.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},"TAX")),v.a.createElement(d.a,{align:"right"},v.a.createElement(g.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},f.format(i.tax)))),v.a.createElement(p.a,null,v.a.createElement(d.a,null,v.a.createElement(g.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},"DISCOUNT")),v.a.createElement(d.a,{align:"right"},v.a.createElement(g.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},f.format(i.discount)))),v.a.createElement(p.a,null,v.a.createElement(d.a,null,v.a.createElement(g.a,{className:"font-light",variant:"h4",color:"textSecondary"},"TOTAL")),v.a.createElement(d.a,{align:"right"},v.a.createElement(g.a,{className:"font-light",variant:"h4",color:"textSecondary"},f.format(i.total))))))),v.a.createElement("div",{className:"mt-96"},v.a.createElement(g.a,{className:"mb-24 print:mb-12",variant:"body1"},"Please pay within 15 days. Thank you for your business."),v.a.createElement("div",{className:"flex"},v.a.createElement("div",{className:"flex-shrink-0"},v.a.createElement("img",{className:"w-32",src:"assets/images/logos/fuse.svg",alt:"logo"})),v.a.createElement(g.a,{className:"font-medium mb-64 px-24",variant:"caption",color:"textSecondary"},"In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut ac congue dolor. Quisque scelerisque lacus sed feugiat fermentum. Cras aliquet facilisis pellentesque. Nunc hendrerit quam at leo commodo, a suscipit tellus dapibus. Etiam at felis volutpat est mollis lacinia. Mauris placerat sem sit amet velit mollis, in porttitor ex finibus. Proin eu nibh id libero tincidunt lacinia et eget eros.")))))))}}}]);