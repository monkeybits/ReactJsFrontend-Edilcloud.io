(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[39260],{45201:function(e,t,a){"use strict";var n=a(97439),i=a(84818),o=a(78709),l=a(16526),c=a(30367),l=a(6274),s=a(32754),m={variant:"body"},d="tbody",a=o.forwardRef(function(e,t){var a=e.classes,l=e.className,r=e.component,r=void 0===r?d:r,e=(0,i.Z)(e,["classes","className","component"]);return o.createElement(s.Z.Provider,{value:m},o.createElement(r,(0,n.Z)({className:(0,c.Z)(a.root,l),ref:t,role:r===d?null:"rowgroup"},e)))});t.Z=(0,l.Z)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(a)},55572:function(e,t,a){"use strict";var Z=a(84818),E=a(97439),h=a(78709),l=a(16526),v=a(30367),l=a(6274),y=a(54059),r=a(70621),x=a(68847),b=a(32754),a=h.forwardRef(function(e,t){var a,l,r=e.align,n=void 0===r?"inherit":r,i=e.classes,o=e.className,c=e.component,s=e.padding,m=e.scope,d=e.size,u=e.sortDirection,p=e.variant,g=(0,Z.Z)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),f=h.useContext(x.Z),r=h.useContext(b.Z),e=r&&"head"===r.variant;c?(l=c,a=e?"columnheader":"cell"):l=e?"th":"td";c=m;!m&&e&&(c="col");s=s||(f&&f.padding?f.padding:"default"),d=d||(f&&f.size?f.size:"medium"),r=p||r&&r.variant,u=u?"asc"===u?"ascending":"descending":null;return h.createElement(l,(0,E.Z)({ref:t,className:(0,v.Z)(i.root,i[r],o,"inherit"!==n&&i["align".concat((0,y.Z)(n))],"default"!==s&&i["padding".concat((0,y.Z)(s))],"medium"!==d&&i["size".concat((0,y.Z)(d))],"head"===r&&f&&f.stickyHeader&&i.stickyHeader),"aria-sort":u,role:a,scope:c},g))});t.Z=(0,l.Z)(function(e){return{root:(0,E.Z)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?(0,r.$n)((0,r.U1)(e.palette.divider,1),.88):(0,r._j)((0,r.U1)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}},{name:"MuiTableCell"})(a)},19684:function(e,t,a){"use strict";var n=a(97439),i=a(84818),o=a(78709),l=a(16526),c=a(30367),l=a(6274),s=a(32754),m={variant:"head"},a=o.forwardRef(function(e,t){var a=e.classes,l=e.className,r=e.component,r=void 0===r?"thead":r,e=(0,i.Z)(e,["classes","className","component"]);return o.createElement(s.Z.Provider,{value:m},o.createElement(r,(0,n.Z)({className:(0,c.Z)(a.root,l),ref:t,role:"thead"===r?null:"rowgroup"},e)))});t.Z=(0,l.Z)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(a)},24918:function(e,t,a){"use strict";var c=a(97439),s=a(84818),m=a(78709),l=a(16526),d=a(30367),l=a(6274),u=a(32754),r=a(70621),a=m.forwardRef(function(e,t){var a=e.classes,l=e.className,r=e.component,n=void 0===r?"tr":r,i=e.hover,o=void 0!==i&&i,r=e.selected,i=void 0!==r&&r,r=(0,s.Z)(e,["classes","className","component","hover","selected"]),e=m.useContext(u.Z);return m.createElement(n,(0,c.Z)({ref:t,className:(0,d.Z)(a.root,l,e&&{head:a.head,footer:a.footer}[e.variant],o&&a.hover,i&&a.selected),role:"tr"===n?null:"row"},r))});t.Z=(0,l.Z)(function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:(0,r.U1)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}},{name:"MuiTableRow"})(a)},52108:function(e,t,a){"use strict";var s=a(84818),m=a(97439),d=a(78709),l=a(16526),u=a(30367),l=a(6274),p=a(68847),a=d.forwardRef(function(e,t){var a=e.classes,l=e.className,r=e.component,n=void 0===r?"table":r,r=e.padding,i=void 0===r?"default":r,r=e.size,o=void 0===r?"medium":r,r=e.stickyHeader,c=void 0!==r&&r,r=(0,s.Z)(e,["classes","className","component","padding","size","stickyHeader"]),e=d.useMemo(function(){return{padding:i,size:o,stickyHeader:c}},[i,o,c]);return d.createElement(p.Z.Provider,{value:e},d.createElement(n,(0,m.Z)({role:"table"===n?null:"table",ref:t,className:(0,u.Z)(a.root,l,c&&a.stickyHeader)},r)))});t.Z=(0,l.Z)(function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":(0,m.Z)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}},{name:"MuiTable"})(a)},68847:function(e,t,a){"use strict";a=a(78709);t.Z=a.createContext()},32754:function(e,t,a){"use strict";a=a(78709);t.Z=a.createContext()},39260:function(e,t,a){"use strict";a.r(t);var l=a(61432),n=a.n(l),i=a(78709),o=a(42401),c=a(94678),s=a(1737),m=a(92466),d=a(52108),u=a(19684),p=a(24918),g=a(55572),f=a(45201),r=a(40962),l=a(31806),Z=a.n(l),E=a(28344),h=(0,r.Z)(function(e){return{root:{background:"#ffffff)"},divider:{backgroundColor:e.palette.getContrastText(e.palette.primary.dark)},seller:{backgroundColor:e.palette.primary.dark,color:e.palette.getContrastText(e.palette.primary.dark),marginRight:-88,paddingRight:66,width:480}}});t.default=function(){var e=h(),t=(0,i.useState)(null),a=n()(t,2),t=a[0],l=a[1],r=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2});return(0,i.useEffect)(function(){Z().get("/api/invoices/get-invoice",{params:{id:"5725a6802d"}}).then(function(e){l(e.data)})},[]),i.createElement("div",{className:(0,E.Z)(e.root,"flex-grow flex-shrink-0 p-0 sm:p-64 print:p-0")},t&&i.createElement(o.Z,{animation:{translateY:[0,"100%"]},duration:600},i.createElement(c.Z,{className:"mx-auto w-xl print:w-full print:p-8 print:shadow-none"},i.createElement(s.Z,{className:"p-88 print:p-0"},i.createElement(m.Z,{color:"textSecondary",className:"mb-32"},t.date),i.createElement("div",{className:"flex justify-between"},i.createElement("div",null,i.createElement("table",{className:"mb-16"},i.createElement("tbody",null,i.createElement("tr",null,i.createElement("td",{className:"pb-4"},i.createElement(m.Z,{className:"font-light",variant:"h6",color:"textSecondary"},"INVOICE")),i.createElement("td",{className:"pb-4 px-16"},i.createElement(m.Z,{className:"font-light",variant:"h6"},t.number))),i.createElement("tr",null,i.createElement("td",null,i.createElement(m.Z,{color:"textSecondary"},"INVOICE DATE")),i.createElement("td",{className:"px-16"},i.createElement(m.Z,null,t.date))),i.createElement("tr",null,i.createElement("td",null,i.createElement(m.Z,{color:"textSecondary"},"DUE DATE")),i.createElement("td",{className:"px-16"},i.createElement(m.Z,null,t.dueDate))))),i.createElement(m.Z,{color:"textSecondary"},t.client.title),t.client.address&&i.createElement(m.Z,{color:"textSecondary"},t.client.address),t.client.phone&&i.createElement(m.Z,{color:"textSecondary"},t.client.phone),t.client.email&&i.createElement(m.Z,{color:"textSecondary"},t.client.email),t.client.website&&i.createElement(m.Z,{color:"textSecondary"},t.client.website)),i.createElement("div",{className:(0,E.Z)(e.seller,"flex items-center p-16")},i.createElement("img",{className:"w-80",src:"assets/images/logos/fuse.svg",alt:"logo"}),i.createElement("div",{className:(0,E.Z)(e.divider,"w-px mx-8 h-96 opacity-50")}),i.createElement("div",{className:"px-8"},i.createElement(m.Z,{color:"inherit"},t.from.title),t.from.address&&i.createElement(m.Z,{color:"inherit"},t.from.address),t.from.phone&&i.createElement(m.Z,{color:"inherit"},t.from.phone),t.from.email&&i.createElement(m.Z,{color:"inherit"},t.from.email),t.from.website&&i.createElement(m.Z,{color:"inherit"},t.from.website)))),i.createElement("div",{className:"mt-64"},i.createElement(d.Z,{className:"simple"},i.createElement(u.Z,null,i.createElement(p.Z,null,i.createElement(g.Z,null,"SERVICE"),i.createElement(g.Z,null,"UNIT"),i.createElement(g.Z,{align:"right"},"UNIT PRICE"),i.createElement(g.Z,{align:"right"},"QUANTITY"),i.createElement(g.Z,{align:"right"},"TOTAL"))),i.createElement(f.Z,null,t.services.map(function(e){return i.createElement(p.Z,{key:e.id},i.createElement(g.Z,null,i.createElement(m.Z,{variant:"subtitle1"},e.title)),i.createElement(g.Z,null,e.unit),i.createElement(g.Z,{align:"right"},r.format(e.unitPrice)),i.createElement(g.Z,{align:"right"},e.quantity),i.createElement(g.Z,{align:"right"},r.format(e.total)))}))),i.createElement(d.Z,{className:"simple mt-32"},i.createElement(f.Z,null,i.createElement(p.Z,null,i.createElement(g.Z,null,i.createElement(m.Z,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},"SUBTOTAL")),i.createElement(g.Z,{align:"right"},i.createElement(m.Z,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},r.format(t.subtotal)))),i.createElement(p.Z,null,i.createElement(g.Z,null,i.createElement(m.Z,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},"TAX")),i.createElement(g.Z,{align:"right"},i.createElement(m.Z,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},r.format(t.tax)))),i.createElement(p.Z,null,i.createElement(g.Z,null,i.createElement(m.Z,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},"DISCOUNT")),i.createElement(g.Z,{align:"right"},i.createElement(m.Z,{className:"font-medium",variant:"subtitle1",color:"textSecondary"},r.format(t.discount)))),i.createElement(p.Z,null,i.createElement(g.Z,null,i.createElement(m.Z,{className:"font-light",variant:"h4",color:"textSecondary"},"TOTAL")),i.createElement(g.Z,{align:"right"},i.createElement(m.Z,{className:"font-light",variant:"h4",color:"textSecondary"},r.format(t.total))))))),i.createElement("div",{className:"mt-96"},i.createElement(m.Z,{className:"mb-24 print:mb-12",variant:"body1"},"Please pay within 15 days. Thank you for your business."),i.createElement("div",{className:"flex"},i.createElement("div",{className:"flex-shrink-0"},i.createElement("img",{className:"w-32",src:"assets/images/logos/fuse.svg",alt:"logo"})),i.createElement(m.Z,{className:"font-medium mb-64 px-24",variant:"caption",color:"textSecondary"},"In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut ac congue dolor. Quisque scelerisque lacus sed feugiat fermentum. Cras aliquet facilisis pellentesque. Nunc hendrerit quam at leo commodo, a suscipit tellus dapibus. Etiam at felis volutpat est mollis lacinia. Mauris placerat sem sit amet velit mollis, in porttitor ex finibus. Proin eu nibh id libero tincidunt lacinia et eget eros.")))))))}}}]);