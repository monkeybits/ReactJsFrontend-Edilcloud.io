(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[59],{1853:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContextProvider=t.FrameContext=void 0;var n,r=a(0),o=(n=r)&&n.__esModule?n:{default:n};var s=void 0,l=void 0;"undefined"!==typeof document&&(s=document),"undefined"!==typeof window&&(l=window);var i=t.FrameContext=o.default.createContext({document:s,window:l}),c=i.Provider,d=i.Consumer;t.FrameContextProvider=c,t.FrameContextConsumer=d},1855:function(e,t,a){"use strict";a.d(t,"a",(function(){return D}));var n=a(8),r=a(179),o=a(1783),s=a(1790),l=a(113),i=a(1847),c=a(1848),d=a(0),u=a.n(d),m=a(12),p=a(2),f=a(96),h=a(97),b=a(161),g=a(160),v=a(1771),y=a(919),N=a(1812),x=a(1837),w=a(7),E=a(224),j=a(602),O=a(1856),C=a.n(O),T=Object(v.a)({productionPrefix:"iframe-"}),M=function(e){Object(b.a)(a,e);var t=Object(g.a)(a);function a(){var e;Object(f.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={ready:!1},e.handleRef=function(t){e.contentDocument=t?t.node.contentDocument:null},e.onContentDidMount=function(){e.setState({ready:!0,jss:Object(E.b)(Object(p.a)(Object(p.a)({},Object(y.a)()),{},{plugins:[].concat(Object(m.a)(Object(y.a)().plugins),[Object(j.a)()]),insertionPoint:e.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:e.contentDocument.body})},e.onContentDidUpdate=function(){e.contentDocument.body.dir=e.props.theme.direction},e.renderHead=function(){return u.a.createElement(u.a.Fragment,null,u.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),u.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},e}return Object(h.a)(a,[{key:"render",value:function(){var e=this.props,t=e.children,a=e.classes,n=e.theme;return u.a.createElement(C.a,{head:this.renderHead(),ref:this.handleRef,className:a.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?u.a.createElement(N.b,{jss:this.state.jss,generateClassName:T,sheetsManager:this.state.sheetsManager},u.a.createElement(x.a,{theme:n},u.a.cloneElement(t,{container:this.state.container}))):null)}}]),a}(u.a.Component),P=Object(w.a)((function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}}),{withTheme:!0})(M);function _(e){var t=Object(d.useState)(e.currentTabIndex),a=Object(n.a)(t,2),m=a[0],p=a[1],f=e.component,h=e.raw,b=e.iframe,g=e.className;return u.a.createElement(s.a,{className:g},u.a.createElement(o.a,{position:"static",color:"default",elevation:0},u.a.createElement(c.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:m,onChange:function(e,t){p(t)}},f&&u.a.createElement(i.a,{classes:{root:"min-w-64"},icon:u.a.createElement(l.a,null,"remove_red_eye")}),h&&u.a.createElement(i.a,{classes:{root:"min-w-64"},icon:u.a.createElement(l.a,null,"code")}))),u.a.createElement("div",{className:"flex justify-center"},u.a.createElement("div",{className:0===m?"flex flex-1":"hidden"},f&&(b?u.a.createElement(P,null,u.a.createElement(f,null)):u.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},u.a.createElement(f,null)))),u.a.createElement("div",{className:1===m?"flex flex-1":"hidden"},h&&u.a.createElement("div",{className:"flex flex-1"},u.a.createElement(r.a,{component:"pre",className:"language-javascript w-full"},h.default)))))}_.defaultProps={currentTabIndex:0};var D=_},1856:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContext=void 0;var n=a(1853);Object.defineProperty(t,"FrameContext",{enumerable:!0,get:function(){return n.FrameContext}}),Object.defineProperty(t,"FrameContextConsumer",{enumerable:!0,get:function(){return n.FrameContextConsumer}});var r,o=a(1857),s=(r=o)&&r.__esModule?r:{default:r};t.default=s.default},1857:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(0),s=u(o),l=u(a(25)),i=u(a(4)),c=a(1853),d=u(a(1858));function u(e){return e&&e.__esModule?e:{default:e}}var m=function(e){function t(e,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,a));return n.handleLoad=function(){n.forceUpdate()},n._isMounted=!1,n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var t=this.props.contentDidMount,a=this.props.contentDidUpdate,n=e.defaultView||e.parentView,r=s.default.createElement(d.default,{contentDidMount:t,contentDidUpdate:a},s.default.createElement(c.FrameContextProvider,{value:{document:e,window:n}},s.default.createElement("div",{className:"frame-content"},this.props.children)));e.body.children.length<1&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close());var o=this.getMountTarget();return[l.default.createPortal(this.props.head,this.getDoc().head),l.default.createPortal(r,o)]}},{key:"render",value:function(){var e=this,t=n({},this.props,{children:void 0});return delete t.head,delete t.initialContent,delete t.mountTarget,delete t.contentDidMount,delete t.contentDidUpdate,s.default.createElement("iframe",n({},t,{ref:function(t){e.node=t}}),this.renderFrameContents())}}]),t}(o.Component);m.propTypes={style:i.default.object,head:i.default.node,initialContent:i.default.string,mountTarget:i.default.string,contentDidMount:i.default.func,contentDidUpdate:i.default.func,children:i.default.oneOfType([i.default.element,i.default.arrayOf(i.default.element)])},m.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=m},1858:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=a(0),o=(s(r),s(a(4)));function s(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var c=function(e){function t(){return l(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),n(t,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return r.Children.only(this.props.children)}}]),t}(r.Component);c.propTypes={children:o.default.element.isRequired,contentDidMount:o.default.func.isRequired,contentDidUpdate:o.default.func.isRequired},t.default=c},1860:function(e,t,a){"use strict";var n=a(0),r=n.createContext();t.a=r},1872:function(e,t,a){"use strict";var n=a(0),r=n.createContext();t.a=r},1926:function(e,t,a){"use strict";var n=a(5),r=a(1),o=a(0),s=(a(4),a(3)),l=a(7),i=a(13),c=a(20),d=a(1872),u=a(1860),m=o.forwardRef((function(e,t){var a,l,c=e.align,m=void 0===c?"inherit":c,p=e.classes,f=e.className,h=e.component,b=e.padding,g=e.scope,v=e.size,y=e.sortDirection,N=e.variant,x=Object(n.a)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),w=o.useContext(d.a),E=o.useContext(u.a),j=E&&"head"===E.variant;h?(l=h,a=j?"columnheader":"cell"):l=j?"th":"td";var O=g;!O&&j&&(O="col");var C=b||(w&&w.padding?w.padding:"default"),T=v||(w&&w.size?w.size:"medium"),M=N||E&&E.variant,P=null;return y&&(P="asc"===y?"ascending":"descending"),o.createElement(l,Object(r.a)({ref:t,className:Object(s.default)(p.root,p[M],f,"inherit"!==m&&p["align".concat(Object(i.a)(m))],"default"!==C&&p["padding".concat(Object(i.a)(C))],"medium"!==T&&p["size".concat(Object(i.a)(T))],"head"===M&&w&&w.stickyHeader&&p.stickyHeader),"aria-sort":P,role:a,scope:O},x))}));t.a=Object(l.a)((function(e){return{root:Object(r.a)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?Object(c.i)(Object(c.d)(e.palette.divider,1),.88):Object(c.a)(Object(c.d)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}}),{name:"MuiTableCell"})(m)},1937:function(e,t,a){"use strict";var n=a(5),r=a(1),o=a(0),s=(a(4),a(3)),l=a(7),i=a(1872),c=o.forwardRef((function(e,t){var a=e.classes,l=e.className,c=e.component,d=void 0===c?"table":c,u=e.padding,m=void 0===u?"default":u,p=e.size,f=void 0===p?"medium":p,h=e.stickyHeader,b=void 0!==h&&h,g=Object(n.a)(e,["classes","className","component","padding","size","stickyHeader"]),v=o.useMemo((function(){return{padding:m,size:f,stickyHeader:b}}),[m,f,b]);return o.createElement(i.a.Provider,{value:v},o.createElement(d,Object(r.a)({role:"table"===d?null:"table",ref:t,className:Object(s.default)(a.root,l,b&&a.stickyHeader)},g)))}));t.a=Object(l.a)((function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":Object(r.a)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}}),{name:"MuiTable"})(c)},1938:function(e,t,a){"use strict";var n=a(1),r=a(5),o=a(0),s=(a(4),a(3)),l=a(7),i=a(1860),c={variant:"head"},d=o.forwardRef((function(e,t){var a=e.classes,l=e.className,d=e.component,u=void 0===d?"thead":d,m=Object(r.a)(e,["classes","className","component"]);return o.createElement(i.a.Provider,{value:c},o.createElement(u,Object(n.a)({className:Object(s.default)(a.root,l),ref:t,role:"thead"===u?null:"rowgroup"},m)))}));t.a=Object(l.a)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(d)},1939:function(e,t,a){"use strict";var n=a(1),r=a(5),o=a(0),s=(a(4),a(3)),l=a(7),i=a(1860),c=a(20),d=o.forwardRef((function(e,t){var a=e.classes,l=e.className,c=e.component,d=void 0===c?"tr":c,u=e.hover,m=void 0!==u&&u,p=e.selected,f=void 0!==p&&p,h=Object(r.a)(e,["classes","className","component","hover","selected"]),b=o.useContext(i.a);return o.createElement(d,Object(n.a)({ref:t,className:Object(s.default)(a.root,l,b&&{head:a.head,footer:a.footer}[b.variant],m&&a.hover,f&&a.selected),role:"tr"===d?null:"row"},h))}));t.a=Object(l.a)((function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:Object(c.d)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}}),{name:"MuiTableRow"})(d)},1940:function(e,t,a){"use strict";var n=a(1),r=a(5),o=a(0),s=(a(4),a(3)),l=a(7),i=a(1860),c={variant:"body"},d=o.forwardRef((function(e,t){var a=e.classes,l=e.className,d=e.component,u=void 0===d?"tbody":d,m=Object(r.a)(e,["classes","className","component"]);return o.createElement(i.a.Provider,{value:c},o.createElement(u,Object(n.a)({className:Object(s.default)(a.root,l),ref:t,role:"tbody"===u?null:"rowgroup"},m)))}));t.a=Object(l.a)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(d)},3248:function(e,t,a){"use strict";a.r(t),t.default="import React from 'react';\nimport MaUTable from '@material-ui/core/Table';\nimport TableBody from '@material-ui/core/TableBody';\nimport TableCell from '@material-ui/core/TableCell';\nimport TableHead from '@material-ui/core/TableHead';\nimport TableRow from '@material-ui/core/TableRow';\nimport { useTable } from 'react-table';\nimport sampleData from './sampleData';\n\nfunction Table({ columns, data }) {\n\t// Use the state and functions returned from useTable to build your UI\n\tconst { getTableProps, headerGroups, rows, prepareRow } = useTable({\n\t\tcolumns,\n\t\tdata\n\t});\n\n\t// Render the UI for your table\n\treturn (\n\t\t<MaUTable {...getTableProps()}>\n\t\t\t<TableHead>\n\t\t\t\t{headerGroups.map(headerGroup => (\n\t\t\t\t\t<TableRow {...headerGroup.getHeaderGroupProps()}>\n\t\t\t\t\t\t{headerGroup.headers.map(column => (\n\t\t\t\t\t\t\t<TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>\n\t\t\t\t\t\t))}\n\t\t\t\t\t</TableRow>\n\t\t\t\t))}\n\t\t\t</TableHead>\n\t\t\t<TableBody>\n\t\t\t\t{rows.map((row, i) => {\n\t\t\t\t\tprepareRow(row);\n\t\t\t\t\treturn (\n\t\t\t\t\t\t<TableRow {...row.getRowProps()}>\n\t\t\t\t\t\t\t{row.cells.map(cell => {\n\t\t\t\t\t\t\t\treturn <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;\n\t\t\t\t\t\t\t})}\n\t\t\t\t\t\t</TableRow>\n\t\t\t\t\t);\n\t\t\t\t})}\n\t\t\t</TableBody>\n\t\t</MaUTable>\n\t);\n}\n\nfunction App() {\n\tconst columns = React.useMemo(\n\t\t() => [\n\t\t\t{\n\t\t\t\tHeader: 'Name',\n\t\t\t\tcolumns: [\n\t\t\t\t\t{\n\t\t\t\t\t\tHeader: 'First Name',\n\t\t\t\t\t\taccessor: 'firstName'\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tHeader: 'Last Name',\n\t\t\t\t\t\taccessor: 'lastName'\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t},\n\t\t\t{\n\t\t\t\tHeader: 'Info',\n\t\t\t\tcolumns: [\n\t\t\t\t\t{\n\t\t\t\t\t\tHeader: 'Age',\n\t\t\t\t\t\taccessor: 'age'\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tHeader: 'Visits',\n\t\t\t\t\t\taccessor: 'visits'\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tHeader: 'Status',\n\t\t\t\t\t\taccessor: 'status'\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tHeader: 'Profile Progress',\n\t\t\t\t\t\taccessor: 'progress'\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t],\n\t\t[]\n\t);\n\n\tconst data = React.useMemo(() => sampleData, []);\n\n\treturn <Table columns={columns} data={data} />;\n}\n\nexport default App;\n"},3290:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(1937),s=a(1940),l=a(1926),i=a(1938),c=a(1939),d=a(2073),u=[{firstName:"dad",lastName:"teaching",age:8,visits:63,progress:96,status:"relationship"},{firstName:"crush",lastName:"player",age:4,visits:87,progress:33,status:"single"},{firstName:"quartz",lastName:"box",age:22,visits:10,progress:87,status:"single"},{firstName:"stage",lastName:"wine",age:14,visits:78,progress:83,status:"complicated"},{firstName:"whistle",lastName:"swing",age:22,visits:84,progress:55,status:"single"},{firstName:"thing",lastName:"wife",age:24,visits:79,progress:74,status:"complicated"},{firstName:"instrument",lastName:"record",age:27,visits:31,progress:66,status:"complicated"},{firstName:"passion",lastName:"drop",age:13,visits:73,progress:79,status:"relationship"},{firstName:"bears",lastName:"toothpaste",age:20,visits:34,progress:10,status:"relationship"},{firstName:"limit",lastName:"chairs",age:19,visits:79,progress:38,status:"single"},{firstName:"kite",lastName:"fact",age:11,visits:12,progress:79,status:"relationship"},{firstName:"brother",lastName:"underwear",age:25,visits:67,progress:48,status:"complicated"},{firstName:"butter",lastName:"north",age:29,visits:17,progress:29,status:"relationship"},{firstName:"housing",lastName:"society",age:0,visits:68,progress:84,status:"single"},{firstName:"skate",lastName:"attraction",age:9,visits:89,progress:89,status:"single"},{firstName:"banana",lastName:"rabbits",age:18,visits:67,progress:62,status:"single"},{firstName:"word",lastName:"volleyball",age:28,visits:19,progress:86,status:"single"},{firstName:"balls",lastName:"nest",age:23,visits:74,progress:38,status:"single"},{firstName:"physics",lastName:"method",age:2,visits:40,progress:87,status:"relationship"},{firstName:"book",lastName:"recommendation",age:12,visits:73,progress:81,status:"relationship"}];function m(e){var t=e.columns,a=e.data,n=Object(d.useTable)({columns:t,data:a}),u=n.getTableProps,m=n.headerGroups,p=n.rows,f=n.prepareRow;return r.a.createElement(o.a,u(),r.a.createElement(i.a,null,m.map((function(e){return r.a.createElement(c.a,e.getHeaderGroupProps(),e.headers.map((function(e){return r.a.createElement(l.a,e.getHeaderProps(),e.render("Header"))})))}))),r.a.createElement(s.a,null,p.map((function(e,t){return f(e),r.a.createElement(c.a,e.getRowProps(),e.cells.map((function(e){return r.a.createElement(l.a,e.getCellProps(),e.render("Cell"))})))}))))}t.default=function(){var e=r.a.useMemo((function(){return[{Header:"Name",columns:[{Header:"First Name",accessor:"firstName"},{Header:"Last Name",accessor:"lastName"}]},{Header:"Info",columns:[{Header:"Age",accessor:"age"},{Header:"Visits",accessor:"visits"},{Header:"Status",accessor:"status"},{Header:"Profile Progress",accessor:"progress"}]}]}),[]),t=r.a.useMemo((function(){return u}),[]);return r.a.createElement(m,{columns:e,data:t})}},3377:function(e,t,a){"use strict";a.r(t);var n=a(1855),r=a(249),o=a(149),s=a(113),l=a(74),i=a(0),c=a.n(i),d=a(35);t.default=function(){return c.a.createElement(r.a,{header:c.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},c.a.createElement("div",{className:"flex flex-col"},c.a.createElement("div",{className:"flex items-center mb-16"},c.a.createElement(s.a,{className:"text-18",color:"action"},"home"),c.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),c.a.createElement(l.a,{color:"textSecondary"},"Documentation"),c.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),c.a.createElement(l.a,{color:"textSecondary"},"3rd Party Components"),c.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),c.a.createElement(l.a,{color:"textSecondary"},"Data Tables")),c.a.createElement(l.a,{variant:"h6"},"React Table")),c.a.createElement(o.a,{className:"normal-case",variant:"contained",component:"a",href:"https://github.com/react-tools/react-table",target:"_blank",role:"button"},c.a.createElement(s.a,null,"link"),c.a.createElement("span",{className:"mx-4"},"Reference"))),content:c.a.createElement("div",{className:"p-24 max-w-2xl"},c.a.createElement(l.a,{className:"mb-16",component:"p"},c.a.createElement("code",null,"react-table")," is a lightweight, fast and extendable datagrid built for React."),c.a.createElement("hr",null),c.a.createElement(l.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Example Usage"),c.a.createElement(n.a,{className:"mb-64",component:a(3290).default,raw:a(3248)}),c.a.createElement(l.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Enhanced examples"),c.a.createElement(l.a,{className:"mt-32 mb-8",component:"p"},"Checkout for enhanced examples at"," ",c.a.createElement("a",{href:"https://github.com/tannerlinsley/react-table/blob/master/docs/examples.md",target:"_blank",rel:"noopener noreferrer"},"react-table docs")),c.a.createElement(l.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Demos"),c.a.createElement("ul",null,c.a.createElement("li",{className:"mb-8"},c.a.createElement(d.a,{to:"/apps/contacts"},"Contacts App"))))})}}}]);