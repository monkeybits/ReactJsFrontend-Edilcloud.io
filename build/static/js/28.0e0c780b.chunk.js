(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[28],{1835:function(e,t,n){"use strict";var a=n(235);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(0)),r=(0,a(n(329)).default)(o.default.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.default=r},1891:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContextProvider=t.FrameContext=void 0;var a,o=n(0),r=(a=o)&&a.__esModule?a:{default:a};var l=void 0,c=void 0;"undefined"!==typeof document&&(l=document),"undefined"!==typeof window&&(c=window);var i=t.FrameContext=r.default.createContext({document:l,window:c}),s=i.Provider,m=i.Consumer;t.FrameContextProvider=s,t.FrameContextConsumer=m},1893:function(e,t,n){"use strict";n.d(t,"a",(function(){return _}));var a=n(8),o=n(171),r=n(1819),l=n(1825),c=n(170),i=n(1886),s=n(1887),m=n(0),d=n.n(m),u=n(13),f=n(2),p=n(91),g=n(92),h=n(155),v=n(154),b=n(1807),y=n(894),E=n(1849),C=n(1876),O=n(7),x=n(589),B=n(590),N=n(1895),j=n.n(N),w=Object(b.a)({productionPrefix:"iframe-"}),M=function(e){Object(h.a)(n,e);var t=Object(v.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={ready:!1},e.handleRef=function(t){e.contentDocument=t?t.node.contentDocument:null},e.onContentDidMount=function(){e.setState({ready:!0,jss:Object(x.a)(Object(f.a)(Object(f.a)({},Object(y.a)()),{},{plugins:[].concat(Object(u.a)(Object(y.a)().plugins),[Object(B.a)()]),insertionPoint:e.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:e.contentDocument.body})},e.onContentDidUpdate=function(){e.contentDocument.body.dir=e.props.theme.direction},e.renderHead=function(){return d.a.createElement(d.a.Fragment,null,d.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),d.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},e}return Object(g.a)(n,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.classes,a=e.theme;return d.a.createElement(j.a,{head:this.renderHead(),ref:this.handleRef,className:n.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?d.a.createElement(E.b,{jss:this.state.jss,generateClassName:w,sheetsManager:this.state.sheetsManager},d.a.createElement(C.a,{theme:a},d.a.cloneElement(t,{container:this.state.container}))):null)}}]),n}(d.a.Component),S=Object(O.a)((function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}}),{withTheme:!0})(M);function R(e){var t=Object(m.useState)(e.currentTabIndex),n=Object(a.a)(t,2),u=n[0],f=n[1],p=e.component,g=e.raw,h=e.iframe,v=e.className;return d.a.createElement(l.a,{className:v},d.a.createElement(r.a,{position:"static",color:"default",elevation:0},d.a.createElement(s.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:u,onChange:function(e,t){f(t)}},p&&d.a.createElement(i.a,{classes:{root:"min-w-64"},icon:d.a.createElement(c.a,null,"remove_red_eye")}),g&&d.a.createElement(i.a,{classes:{root:"min-w-64"},icon:d.a.createElement(c.a,null,"code")}))),d.a.createElement("div",{className:"flex justify-center"},d.a.createElement("div",{className:0===u?"flex flex-1":"hidden"},p&&(h?d.a.createElement(S,null,d.a.createElement(p,null)):d.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},d.a.createElement(p,null)))),d.a.createElement("div",{className:1===u?"flex flex-1":"hidden"},g&&d.a.createElement("div",{className:"flex flex-1"},d.a.createElement(o.a,{component:"pre",className:"language-javascript w-full"},g.default)))))}R.defaultProps={currentTabIndex:0};var _=R},1895:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContext=void 0;var a=n(1891);Object.defineProperty(t,"FrameContext",{enumerable:!0,get:function(){return a.FrameContext}}),Object.defineProperty(t,"FrameContextConsumer",{enumerable:!0,get:function(){return a.FrameContextConsumer}});var o,r=n(1896),l=(o=r)&&o.__esModule?o:{default:o};t.default=l.default},1896:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),l=d(r),c=d(n(20)),i=d(n(3)),s=n(1891),m=d(n(1897));function d(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return a.handleLoad=function(){a.forceUpdate()},a._isMounted=!1,a}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var t=this.props.contentDidMount,n=this.props.contentDidUpdate,a=e.defaultView||e.parentView,o=l.default.createElement(m.default,{contentDidMount:t,contentDidUpdate:n},l.default.createElement(s.FrameContextProvider,{value:{document:e,window:a}},l.default.createElement("div",{className:"frame-content"},this.props.children)));e.body.children.length<1&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close());var r=this.getMountTarget();return[c.default.createPortal(this.props.head,this.getDoc().head),c.default.createPortal(o,r)]}},{key:"render",value:function(){var e=this,t=a({},this.props,{children:void 0});return delete t.head,delete t.initialContent,delete t.mountTarget,delete t.contentDidMount,delete t.contentDidUpdate,l.default.createElement("iframe",a({},t,{ref:function(t){e.node=t}}),this.renderFrameContents())}}]),t}(r.Component);u.propTypes={style:i.default.object,head:i.default.node,initialContent:i.default.string,mountTarget:i.default.string,contentDidMount:i.default.func,contentDidUpdate:i.default.func,children:i.default.oneOfType([i.default.element,i.default.arrayOf(i.default.element)])},u.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=u},1897:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(0),r=(l(o),l(n(3)));function l(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var s=function(e){function t(){return c(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return o.Children.only(this.props.children)}}]),t}(o.Component);s.propTypes={children:r.default.element.isRequired,contentDidMount:r.default.func.isRequired,contentDidUpdate:r.default.func.isRequired},t.default=s},1922:function(e,t,n){"use strict";var a=n(235);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(0)),r=(0,a(n(329)).default)(o.default.createElement("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"}),"Mail");t.default=r},1994:function(e,t,n){"use strict";var a=n(191),o=n(0),r=n(604),l=o.forwardRef((function(e,t){var n=e.code,l=e.language,c=Object(a.a)(e,["code","language"]);return o.createElement(r.a,Object.assign({component:"pre",className:"language-".concat(l||"jsx"),ref:t},c),n)}));t.a=l},2038:function(e,t,n){"use strict";var a=n(1),o=n(4),r=n(0),l=(n(3),n(5)),c=n(7),i=n(14),s=r.forwardRef((function(e,t){var n=e.anchorOrigin,c=void 0===n?{vertical:"top",horizontal:"right"}:n,s=e.badgeContent,m=e.children,d=e.classes,u=e.className,f=e.color,p=void 0===f?"default":f,g=e.component,h=void 0===g?"span":g,v=e.invisible,b=e.max,y=void 0===b?99:b,E=e.overlap,C=void 0===E?"rectangle":E,O=e.showZero,x=void 0!==O&&O,B=e.variant,N=void 0===B?"standard":B,j=Object(o.a)(e,["anchorOrigin","badgeContent","children","classes","className","color","component","invisible","max","overlap","showZero","variant"]),w=v;null==v&&(0===s&&!x||null==s&&"dot"!==N)&&(w=!0);var M="";return"dot"!==N&&(M=s>y?"".concat(y,"+"):s),r.createElement(h,Object(a.a)({className:Object(l.a)(d.root,u),ref:t},j),m,r.createElement("span",{className:Object(l.a)(d.badge,d["".concat(c.horizontal).concat(Object(i.a)(c.vertical),"}")],d["anchorOrigin".concat(Object(i.a)(c.vertical)).concat(Object(i.a)(c.horizontal)).concat(Object(i.a)(C))],"default"!==p&&d["color".concat(Object(i.a)(p))],w&&d.invisible,"dot"===N&&d.dot)},M))}));t.a=Object(c.a)((function(e){return{root:{position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0},badge:{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(12),minWidth:20,lineHeight:1,padding:"0 6px",height:20,borderRadius:10,zIndex:1,transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.enteringScreen})},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},colorError:{backgroundColor:e.palette.error.main,color:e.palette.error.contrastText},dot:{borderRadius:4,height:8,minWidth:8,padding:0},anchorOriginTopRightRectangle:{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%","&$invisible":{transform:"scale(0) translate(50%, -50%)"}},anchorOriginBottomRightRectangle:{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%","&$invisible":{transform:"scale(0) translate(50%, 50%)"}},anchorOriginTopLeftRectangle:{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%","&$invisible":{transform:"scale(0) translate(-50%, -50%)"}},anchorOriginBottomLeftRectangle:{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%","&$invisible":{transform:"scale(0) translate(-50%, 50%)"}},anchorOriginTopRightCircle:{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%","&$invisible":{transform:"scale(0) translate(50%, -50%)"}},anchorOriginBottomRightCircle:{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%","&$invisible":{transform:"scale(0) translate(50%, 50%)"}},anchorOriginTopLeftCircle:{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%","&$invisible":{transform:"scale(0) translate(-50%, -50%)"}},anchorOriginBottomLeftCircle:{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%","&$invisible":{transform:"scale(0) translate(-50%, 50%)"}},invisible:{transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.leavingScreen})}}}),{name:"MuiBadge"})(s)},2627:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return m}));var a=n(0),o=n.n(a),r=n(782),l=n(2038),c=n(1922),i=n.n(c),s=Object(r.a)((function(e){return{root:{"& > *":{margin:e.spacing(1)}}}}));function m(){var e=s();return o.a.createElement("div",{className:e.root},o.a.createElement(l.a,{badgeContent:4,color:"primary"},o.a.createElement(i.a,null)),o.a.createElement(l.a,{badgeContent:4,color:"secondary"},o.a.createElement(i.a,null)),o.a.createElement(l.a,{badgeContent:4,color:"error"},o.a.createElement(i.a,null)))}},2628:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Badge from '@material-ui/core/Badge';\nimport MailIcon from '@material-ui/icons/Mail';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    '& > *': {\n      margin: theme.spacing(1),\n    },\n  },\n}));\n\nexport default function SimpleBadge() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Badge badgeContent={4} color=\"primary\">\n        <MailIcon />\n      </Badge>\n      <Badge badgeContent={4} color=\"secondary\">\n        <MailIcon />\n      </Badge>\n      <Badge badgeContent={4} color=\"error\">\n        <MailIcon />\n      </Badge>\n    </div>\n  );\n}\n"},2629:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var a=n(0),o=n.n(a),r=n(2038),l=n(7),c=n(187),i=n(2630),s=n.n(i),m=Object(l.a)((function(e){return{badge:{right:-3,top:13,border:"2px solid ".concat(e.palette.background.paper),padding:"0 4px"}}}))(r.a);function d(){return o.a.createElement(c.a,{"aria-label":"cart"},o.a.createElement(m,{badgeContent:4,color:"secondary"},o.a.createElement(s.a,null)))}},2630:function(e,t,n){"use strict";var a=n(235);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(0)),r=(0,a(n(329)).default)(o.default.createElement("path",{d:"M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"}),"ShoppingCart");t.default=r},2631:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport Badge from '@material-ui/core/Badge';\nimport { withStyles } from '@material-ui/core/styles';\nimport IconButton from '@material-ui/core/IconButton';\nimport ShoppingCartIcon from '@material-ui/icons/ShoppingCart';\n\nconst StyledBadge = withStyles((theme) => ({\n  badge: {\n    right: -3,\n    top: 13,\n    border: `2px solid ${theme.palette.background.paper}`,\n    padding: '0 4px',\n  },\n}))(Badge);\n\nexport default function CustomizedBadges() {\n  return (\n    <IconButton aria-label=\"cart\">\n      <StyledBadge badgeContent={4} color=\"secondary\">\n        <ShoppingCartIcon />\n      </StyledBadge>\n    </IconButton>\n  );\n}\n"},2632:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return y}));var a=n(8),o=n(0),r=n.n(o),l=n(782),c=n(2038),i=n(1880),s=n(143),m=n(1835),d=n.n(m),u=n(2633),f=n.n(u),p=n(1922),g=n.n(p),h=n(1875),v=n(1863),b=Object(l.a)((function(e){return{root:{display:"flex",flexDirection:"column","& > *":{marginBottom:e.spacing(2)},"& .MuiBadge-root":{marginRight:e.spacing(4)}}}}));function y(){var e=b(),t=r.a.useState(1),n=Object(a.a)(t,2),o=n[0],l=n[1],m=r.a.useState(!1),u=Object(a.a)(m,2),p=u[0],y=u[1];return r.a.createElement("div",{className:e.root},r.a.createElement("div",null,r.a.createElement(c.a,{color:"secondary",badgeContent:o},r.a.createElement(g.a,null)),r.a.createElement(i.a,null,r.a.createElement(s.a,{"aria-label":"reduce",onClick:function(){l(Math.max(o-1,0))}},r.a.createElement(f.a,{fontSize:"small"})),r.a.createElement(s.a,{"aria-label":"increase",onClick:function(){l(o+1)}},r.a.createElement(d.a,{fontSize:"small"})))),r.a.createElement("div",null,r.a.createElement(c.a,{color:"secondary",variant:"dot",invisible:p},r.a.createElement(g.a,null)),r.a.createElement(v.a,{control:r.a.createElement(h.a,{color:"primary",checked:!p,onChange:function(){y(!p)}}),label:"Show Badge"})))}},2633:function(e,t,n){"use strict";var a=n(235);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(0)),r=(0,a(n(329)).default)(o.default.createElement("path",{d:"M19 13H5v-2h14v2z"}),"Remove");t.default=r},2634:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Badge from '@material-ui/core/Badge';\nimport ButtonGroup from '@material-ui/core/ButtonGroup';\nimport Button from '@material-ui/core/Button';\nimport AddIcon from '@material-ui/icons/Add';\nimport RemoveIcon from '@material-ui/icons/Remove';\nimport MailIcon from '@material-ui/icons/Mail';\nimport Switch from '@material-ui/core/Switch';\nimport FormControlLabel from '@material-ui/core/FormControlLabel';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    display: 'flex',\n    flexDirection: 'column',\n    '& > *': {\n      marginBottom: theme.spacing(2),\n    },\n    '& .MuiBadge-root': {\n      marginRight: theme.spacing(4),\n    },\n  },\n}));\n\nexport default function BadgeVisibility() {\n  const classes = useStyles();\n  const [count, setCount] = React.useState(1);\n  const [invisible, setInvisible] = React.useState(false);\n\n  const handleBadgeVisibility = () => {\n    setInvisible(!invisible);\n  };\n\n  return (\n    <div className={classes.root}>\n      <div>\n        <Badge color=\"secondary\" badgeContent={count}>\n          <MailIcon />\n        </Badge>\n        <ButtonGroup>\n          <Button\n            aria-label=\"reduce\"\n            onClick={() => {\n              setCount(Math.max(count - 1, 0));\n            }}\n          >\n            <RemoveIcon fontSize=\"small\" />\n          </Button>\n          <Button\n            aria-label=\"increase\"\n            onClick={() => {\n              setCount(count + 1);\n            }}\n          >\n            <AddIcon fontSize=\"small\" />\n          </Button>\n        </ButtonGroup>\n      </div>\n      <div>\n        <Badge color=\"secondary\" variant=\"dot\" invisible={invisible}>\n          <MailIcon />\n        </Badge>\n        <FormControlLabel\n          control={<Switch color=\"primary\" checked={!invisible} onChange={handleBadgeVisibility} />}\n          label=\"Show Badge\"\n        />\n      </div>\n    </div>\n  );\n}\n"},2635:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return m}));var a=n(0),o=n.n(a),r=n(782),l=n(2038),c=n(1922),i=n.n(c),s=Object(r.a)((function(e){return{root:{"& > *":{margin:e.spacing(1)}}}}));function m(){var e=s();return o.a.createElement("div",{className:e.root},o.a.createElement(l.a,{color:"secondary",badgeContent:0},o.a.createElement(i.a,null)),o.a.createElement(l.a,{color:"secondary",badgeContent:0,showZero:!0},o.a.createElement(i.a,null)))}},2636:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Badge from '@material-ui/core/Badge';\nimport MailIcon from '@material-ui/icons/Mail';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    '& > *': {\n      margin: theme.spacing(1),\n    },\n  },\n}));\n\nexport default function ShowZeroBadge() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Badge color=\"secondary\" badgeContent={0}>\n        <MailIcon />\n      </Badge>\n      <Badge color=\"secondary\" badgeContent={0} showZero>\n        <MailIcon />\n      </Badge>\n    </div>\n  );\n}\n"},2637:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var a=n(0),o=n.n(a),r=n(782),l=n(2038),c=n(1922),i=n.n(c),s=Object(r.a)((function(e){return{root:{"& > *":{margin:e.spacing(2)}}}})),m={color:"secondary",children:o.a.createElement(i.a,null)};function d(){var e=s();return o.a.createElement("div",{className:e.root},o.a.createElement(l.a,Object.assign({badgeContent:99},m)),o.a.createElement(l.a,Object.assign({badgeContent:100},m)),o.a.createElement(l.a,Object.assign({badgeContent:1e3,max:999},m)))}},2638:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Badge from '@material-ui/core/Badge';\nimport MailIcon from '@material-ui/icons/Mail';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    '& > *': {\n      margin: theme.spacing(2),\n    },\n  },\n}));\n\nconst defaultProps = {\n  color: 'secondary',\n  children: <MailIcon />,\n};\n\nexport default function BadgeMax() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Badge badgeContent={99} {...defaultProps} />\n      <Badge badgeContent={100} {...defaultProps} />\n      <Badge badgeContent={1000} max={999} {...defaultProps} />\n    </div>\n  );\n}\n"},2639:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var a=n(0),o=n.n(a),r=n(782),l=n(2038),c=n(1922),i=n.n(c),s=n(71),m=Object(r.a)((function(e){return{root:{"& > *":{margin:e.spacing(1)}}}}));function d(){var e=m();return o.a.createElement("div",{className:e.root},o.a.createElement(l.a,{color:"secondary",variant:"dot"},o.a.createElement(i.a,null)),o.a.createElement(l.a,{color:"secondary",variant:"dot"},o.a.createElement(s.a,null,"Typography")))}},2640:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Badge from '@material-ui/core/Badge';\nimport MailIcon from '@material-ui/icons/Mail';\nimport Typography from '@material-ui/core/Typography';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    '& > *': {\n      margin: theme.spacing(1),\n    },\n  },\n}));\n\nexport default function DotBadge() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Badge color=\"secondary\" variant=\"dot\">\n        <MailIcon />\n      </Badge>\n      <Badge color=\"secondary\" variant=\"dot\">\n        <Typography>Typography</Typography>\n      </Badge>\n    </div>\n  );\n}\n"},2641:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var a=n(0),o=n.n(a),r=n(11),l=n(782),c=n(2038),i=Object(l.a)((function(e){return{root:{"& > *":{margin:e.spacing(1)}},shape:{backgroundColor:e.palette.primary.main,width:40,height:40},shapeCircle:{borderRadius:"50%"}}}));function s(){var e=i(),t=o.a.createElement("div",{className:e.shape}),n=o.a.createElement("div",{className:Object(r.a)(e.shape,e.shapeCircle)});return o.a.createElement("div",{className:e.root},o.a.createElement(c.a,{color:"secondary",badgeContent:" "},t),o.a.createElement(c.a,{color:"secondary",badgeContent:" ",variant:"dot"},t),o.a.createElement(c.a,{color:"secondary",overlap:"circle",badgeContent:" "},n),o.a.createElement(c.a,{color:"secondary",overlap:"circle",badgeContent:" ",variant:"dot"},n))}},2642:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport clsx from \'clsx\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport Badge from \'@material-ui/core/Badge\';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    \'& > *\': {\n      margin: theme.spacing(1),\n    },\n  },\n  shape: {\n    backgroundColor: theme.palette.primary.main,\n    width: 40,\n    height: 40,\n  },\n  shapeCircle: {\n    borderRadius: \'50%\',\n  },\n}));\n\nexport default function BadgeOverlap() {\n  const classes = useStyles();\n\n  const rectangle = <div className={classes.shape} />;\n  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;\n\n  return (\n    <div className={classes.root}>\n      <Badge color="secondary" badgeContent=" ">\n        {rectangle}\n      </Badge>\n      <Badge color="secondary" badgeContent=" " variant="dot">\n        {rectangle}\n      </Badge>\n      <Badge color="secondary" overlap="circle" badgeContent=" ">\n        {circle}\n      </Badge>\n      <Badge color="secondary" overlap="circle" badgeContent=" " variant="dot">\n        {circle}\n      </Badge>\n    </div>\n  );\n}\n'},2643:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return v}));var a=n(8),o=n(0),r=n.n(o),l=n(2038),c=n(571),i=n(1863),s=n(1815),m=n(1888),d=n(1862),u=n(782),f=n(1922),p=n.n(f),g=n(1994),h=Object(u.a)((function(e){return{root:{width:"100%"},formControl:{margin:e.spacing(3)},row:{display:"flex",justifyContent:"center"},margin:{margin:e.spacing(2)}}}));function v(){var e=h(),t=r.a.useState("right"),n=Object(a.a)(t,2),o=n[0],u=n[1],f=r.a.useState("top"),v=Object(a.a)(f,2),b=v[0],y=v[1],E="\n<Badge\n  anchorOrigin={{\n    vertical: '".concat(b,"',\n    horizontal: '").concat(o,"',\n  }}\n>\n");return r.a.createElement("div",{className:e.root},r.a.createElement("div",{className:e.row},r.a.createElement(c.a,{component:"fieldset",className:e.formControl},r.a.createElement(s.a,{component:"legend"},"Vertical"),r.a.createElement(d.a,{name:"vertical",value:b,onChange:function(e){y(e.target.value)}},r.a.createElement(i.a,{value:"top",control:r.a.createElement(m.a,null),label:"Top"}),r.a.createElement(i.a,{value:"bottom",control:r.a.createElement(m.a,null),label:"Bottom"}))),r.a.createElement(c.a,{component:"fieldset",className:e.formControl},r.a.createElement(s.a,{component:"legend"},"Horizontal"),r.a.createElement(d.a,{name:"horizontal",value:o,onChange:function(e){u(e.target.value)}},r.a.createElement(i.a,{value:"right",control:r.a.createElement(m.a,null),label:"Right"}),r.a.createElement(i.a,{value:"left",control:r.a.createElement(m.a,null),label:"Left"})))),r.a.createElement("div",{className:e.row},r.a.createElement(l.a,{color:"secondary",variant:"dot",badgeContent:1,anchorOrigin:{horizontal:o,vertical:b},className:e.margin},r.a.createElement(p.a,null)),r.a.createElement(l.a,{color:"secondary",badgeContent:1,anchorOrigin:{horizontal:o,vertical:b},className:e.margin},r.a.createElement(p.a,null)),r.a.createElement(l.a,{color:"secondary",badgeContent:12,anchorOrigin:{horizontal:o,vertical:b},className:e.margin},r.a.createElement(p.a,null)),r.a.createElement(l.a,{color:"secondary",badgeContent:123,anchorOrigin:{horizontal:o,vertical:b},className:e.margin},r.a.createElement(p.a,null)),r.a.createElement(l.a,{color:"secondary",max:999,badgeContent:1337,anchorOrigin:{horizontal:o,vertical:b},className:e.margin},r.a.createElement(p.a,null))),r.a.createElement(g.a,{code:E,language:"jsx"}))}},2644:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport Badge from \'@material-ui/core/Badge\';\nimport FormControl from \'@material-ui/core/FormControl\';\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\nimport FormLabel from \'@material-ui/core/FormLabel\';\nimport Radio from \'@material-ui/core/Radio\';\nimport RadioGroup from \'@material-ui/core/RadioGroup\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport MailIcon from \'@material-ui/icons/Mail\';\nimport HighlightedCode from \'app/main/documentation/material-ui-components/utils/HighlightedCode\';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: \'100%\',\n  },\n  formControl: {\n    margin: theme.spacing(3),\n  },\n  row: {\n    display: \'flex\',\n    justifyContent: \'center\',\n  },\n  margin: {\n    margin: theme.spacing(2),\n  },\n}));\n\nexport default function BadgeAlignment() {\n  const classes = useStyles();\n  const [horizontal, setHorizontal] = React.useState(\'right\');\n  const [vertical, setVertical] = React.useState(\'top\');\n\n  const handleHorizontalChange = (event) => {\n    setHorizontal(event.target.value);\n  };\n\n  const handleVerticalChange = (event) => {\n    setVertical(event.target.value);\n  };\n\n  const jsx = `\n<Badge\n  anchorOrigin={{\n    vertical: \'${vertical}\',\n    horizontal: \'${horizontal}\',\n  }}\n>\n`;\n\n  return (\n    <div className={classes.root}>\n      <div className={classes.row}>\n        <FormControl component="fieldset" className={classes.formControl}>\n          <FormLabel component="legend">Vertical</FormLabel>\n          <RadioGroup name="vertical" value={vertical} onChange={handleVerticalChange}>\n            <FormControlLabel value="top" control={<Radio />} label="Top" />\n            <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />\n          </RadioGroup>\n        </FormControl>\n        <FormControl component="fieldset" className={classes.formControl}>\n          <FormLabel component="legend">Horizontal</FormLabel>\n          <RadioGroup name="horizontal" value={horizontal} onChange={handleHorizontalChange}>\n            <FormControlLabel value="right" control={<Radio />} label="Right" />\n            <FormControlLabel value="left" control={<Radio />} label="Left" />\n          </RadioGroup>\n        </FormControl>\n      </div>\n      <div className={classes.row}>\n        <Badge\n          color="secondary"\n          variant="dot"\n          badgeContent={1}\n          anchorOrigin={{\n            horizontal,\n            vertical,\n          }}\n          className={classes.margin}\n        >\n          <MailIcon />\n        </Badge>\n        <Badge\n          color="secondary"\n          badgeContent={1}\n          anchorOrigin={{\n            horizontal,\n            vertical,\n          }}\n          className={classes.margin}\n        >\n          <MailIcon />\n        </Badge>\n        <Badge\n          color="secondary"\n          badgeContent={12}\n          anchorOrigin={{\n            horizontal,\n            vertical,\n          }}\n          className={classes.margin}\n        >\n          <MailIcon />\n        </Badge>\n        <Badge\n          color="secondary"\n          badgeContent={123}\n          anchorOrigin={{\n            horizontal,\n            vertical,\n          }}\n          className={classes.margin}\n        >\n          <MailIcon />\n        </Badge>\n        <Badge\n          color="secondary"\n          max={999}\n          badgeContent={1337}\n          anchorOrigin={{\n            horizontal,\n            vertical,\n          }}\n          className={classes.margin}\n        >\n          <MailIcon />\n        </Badge>\n      </div>\n      <HighlightedCode code={jsx} language="jsx" />\n    </div>\n  );\n}\n'},3455:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(1893),l=(n(171),n(237)),c=n(143),i=n(170),s=n(71),m=n(782),d=Object(m.a)((function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}}));t.default=function(e){var t=d();return o.a.createElement(l.a,{classes:{root:t.layoutRoot},header:o.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},o.a.createElement("div",{className:"flex flex-col"},o.a.createElement("div",{className:"flex items-center mb-16"},o.a.createElement(i.a,{className:"text-18",color:"action"},"home"),o.a.createElement(i.a,{className:"text-16",color:"action"},"chevron_right"),o.a.createElement(s.a,{color:"textSecondary"},"Documentation"),o.a.createElement(i.a,{className:"text-16",color:"action"},"chevron_right"),o.a.createElement(s.a,{color:"textSecondary"},"Material UI Components")),o.a.createElement(s.a,{variant:"h6"},"Badge")),o.a.createElement(c.a,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/badges",target:"_blank",role:"button"},o.a.createElement(i.a,null,"link"),o.a.createElement("span",{className:"mx-4"},"Reference"))),content:o.a.createElement("div",{className:"p-24 max-w-2xl"},o.a.createElement(s.a,{className:"text-44 mt-32 mb-8",component:"h1"},"Badge"),o.a.createElement(s.a,{className:"description"},"Badge generates a small badge to the top-right of its child(ren)."),o.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Basic badges"),o.a.createElement(s.a,{className:"mb-16",component:"div"},"Examples of badges containing text, using primary and secondary colors. The badge is applied to its children."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(2627).default,raw:n(2628)})),o.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Customized badges"),o.a.createElement(s.a,{className:"mb-16",component:"div"},"Here is an example of customizing the component. You can learn more about this in the ",o.a.createElement("a",{href:"/customization/components/"},"overrides documentation page"),"."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(2629).default,raw:n(2631)})),o.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Badge visibility"),o.a.createElement(s.a,{className:"mb-16",component:"div"},"The visibility of badges can be controlled using the ",o.a.createElement("code",null,"invisible")," property."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(2632).default,raw:n(2634)})),o.a.createElement(s.a,{className:"mb-16",component:"div"},"The badge auto hides with badgeContent is zero. You can override this with the ",o.a.createElement("code",null,"showZero")," property."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(2635).default,raw:n(2636)})),o.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Maximum value"),o.a.createElement(s.a,{className:"mb-16",component:"div"},"You can use the ",o.a.createElement("code",null,"max")," property to cap the value of the badge content."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(2637).default,raw:n(2638)})),o.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Dot badge"),o.a.createElement(s.a,{className:"mb-16",component:"div"},"The ",o.a.createElement("code",null,"dot")," property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(2639).default,raw:n(2640)})),o.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Badge overlap"),o.a.createElement(s.a,{className:"mb-16",component:"div"},"You can use the ",o.a.createElement("code",null,"overlap")," property to place the badge relative to the corner of the wrapped element."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(2641).default,raw:n(2642)})),o.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Badge alignment"),o.a.createElement(s.a,{className:"mb-16",component:"div"},"You can use the ",o.a.createElement("code",null,"anchorOrigin")," prop to move the badge to any corner of the wrapped element."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(2643).default,raw:n(2644)})))})}}}]);