(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[49],{1853:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.FrameContextConsumer=n.FrameContextProvider=n.FrameContext=void 0;var a,o=t(0),r=(a=o)&&a.__esModule?a:{default:a};var i=void 0,l=void 0;"undefined"!==typeof document&&(i=document),"undefined"!==typeof window&&(l=window);var c=n.FrameContext=r.default.createContext({document:i,window:l}),s=c.Provider,d=c.Consumer;n.FrameContextProvider=s,n.FrameContextConsumer=d},1855:function(e,n,t){"use strict";t.d(n,"a",(function(){return M}));var a=t(8),o=t(179),r=t(1783),i=t(1790),l=t(113),c=t(1847),s=t(1848),d=t(0),m=t.n(d),u=t(12),f=t(2),p=t(96),b=t(97),h=t(161),v=t(160),y=t(1771),g=t(919),E=t(1812),x=t(1837),N=t(7),O=t(224),j=t(602),w=t(1856),C=t.n(w),T=Object(y.a)({productionPrefix:"iframe-"}),F=function(e){Object(h.a)(t,e);var n=Object(v.a)(t);function t(){var e;Object(p.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=n.call.apply(n,[this].concat(o))).state={ready:!1},e.handleRef=function(n){e.contentDocument=n?n.node.contentDocument:null},e.onContentDidMount=function(){e.setState({ready:!0,jss:Object(O.b)(Object(f.a)(Object(f.a)({},Object(g.a)()),{},{plugins:[].concat(Object(u.a)(Object(g.a)().plugins),[Object(j.a)()]),insertionPoint:e.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:e.contentDocument.body})},e.onContentDidUpdate=function(){e.contentDocument.body.dir=e.props.theme.direction},e.renderHead=function(){return m.a.createElement(m.a.Fragment,null,m.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),m.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},e}return Object(b.a)(t,[{key:"render",value:function(){var e=this.props,n=e.children,t=e.classes,a=e.theme;return m.a.createElement(C.a,{head:this.renderHead(),ref:this.handleRef,className:t.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?m.a.createElement(E.b,{jss:this.state.jss,generateClassName:T,sheetsManager:this.state.sheetsManager},m.a.createElement(x.a,{theme:a},m.a.cloneElement(n,{container:this.state.container}))):null)}}]),t}(m.a.Component),I=Object(N.a)((function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}}),{withTheme:!0})(F);function _(e){var n=Object(d.useState)(e.currentTabIndex),t=Object(a.a)(n,2),u=t[0],f=t[1],p=e.component,b=e.raw,h=e.iframe,v=e.className;return m.a.createElement(i.a,{className:v},m.a.createElement(r.a,{position:"static",color:"default",elevation:0},m.a.createElement(s.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:u,onChange:function(e,n){f(n)}},p&&m.a.createElement(c.a,{classes:{root:"min-w-64"},icon:m.a.createElement(l.a,null,"remove_red_eye")}),b&&m.a.createElement(c.a,{classes:{root:"min-w-64"},icon:m.a.createElement(l.a,null,"code")}))),m.a.createElement("div",{className:"flex justify-center"},m.a.createElement("div",{className:0===u?"flex flex-1":"hidden"},p&&(h?m.a.createElement(I,null,m.a.createElement(p,null)):m.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},m.a.createElement(p,null)))),m.a.createElement("div",{className:1===u?"flex flex-1":"hidden"},b&&m.a.createElement("div",{className:"flex flex-1"},m.a.createElement(o.a,{component:"pre",className:"language-javascript w-full"},b.default)))))}_.defaultProps={currentTabIndex:0};var M=_},1856:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.FrameContextConsumer=n.FrameContext=void 0;var a=t(1853);Object.defineProperty(n,"FrameContext",{enumerable:!0,get:function(){return a.FrameContext}}),Object.defineProperty(n,"FrameContextConsumer",{enumerable:!0,get:function(){return a.FrameContextConsumer}});var o,r=t(1857),i=(o=r)&&o.__esModule?o:{default:o};n.default=i.default},1857:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},o=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),r=t(0),i=m(r),l=m(t(25)),c=m(t(4)),s=t(1853),d=m(t(1858));function m(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function n(e,t){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);var a=function(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e,t));return a.handleLoad=function(){a.forceUpdate()},a._isMounted=!1,a}return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,e),o(n,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var n=this.props.contentDidMount,t=this.props.contentDidUpdate,a=e.defaultView||e.parentView,o=i.default.createElement(d.default,{contentDidMount:n,contentDidUpdate:t},i.default.createElement(s.FrameContextProvider,{value:{document:e,window:a}},i.default.createElement("div",{className:"frame-content"},this.props.children)));e.body.children.length<1&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close());var r=this.getMountTarget();return[l.default.createPortal(this.props.head,this.getDoc().head),l.default.createPortal(o,r)]}},{key:"render",value:function(){var e=this,n=a({},this.props,{children:void 0});return delete n.head,delete n.initialContent,delete n.mountTarget,delete n.contentDidMount,delete n.contentDidUpdate,i.default.createElement("iframe",a({},n,{ref:function(n){e.node=n}}),this.renderFrameContents())}}]),n}(r.Component);u.propTypes={style:c.default.object,head:c.default.node,initialContent:c.default.string,mountTarget:c.default.string,contentDidMount:c.default.func,contentDidUpdate:c.default.func,children:c.default.oneOfType([c.default.element,c.default.arrayOf(c.default.element)])},u.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},n.default=u},1858:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),o=t(0),r=(i(o),i(t(4)));function i(e){return e&&e.__esModule?e:{default:e}}function l(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function c(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}var s=function(e){function n(){return l(this,n),c(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,e),a(n,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return o.Children.only(this.props.children)}}]),n}(o.Component);s.propTypes={children:r.default.element.isRequired,contentDidMount:r.default.func.isRequired,contentDidUpdate:r.default.func.isRequired},n.default=s},1876:function(e,n,t){"use strict";var a=t(247);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t(0)),r=(0,a(t(343)).default)(o.default.createElement("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}),"Favorite");n.default=r},1905:function(e,n,t){"use strict";var a=t(247);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t(0)),r=(0,a(t(343)).default)(o.default.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");n.default=r},1986:function(e,n,t){"use strict";var a=t(247);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t(0)),r=(0,a(t(343)).default)(o.default.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");n.default=r},1987:function(e,n,t){"use strict";var a=t(1),o=t(84),r=t(5),i=t(0),l=(t(4),t(341)),c=t(89),s=t(64),d=t(110),m=t(30),u={entering:{transform:"none"},entered:{transform:"none"}},f={enter:c.b.enteringScreen,exit:c.b.leavingScreen},p=i.forwardRef((function(e,n){var t=e.children,c=e.disableStrictModeCompat,p=void 0!==c&&c,b=e.in,h=e.onEnter,v=e.onEntered,y=e.onEntering,g=e.onExit,E=e.onExited,x=e.onExiting,N=e.style,O=e.timeout,j=void 0===O?f:O,w=e.TransitionComponent,C=void 0===w?l.a:w,T=Object(r.a)(e,["children","disableStrictModeCompat","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"]),F=Object(s.a)(),I=F.unstable_strictMode&&!p,_=i.useRef(null),M=Object(m.a)(t.ref,n),P=Object(m.a)(I?_:void 0,M),D=function(e){return function(n,t){if(e){var a=I?[_.current,n]:[n,t],r=Object(o.a)(a,2),i=r[0],l=r[1];void 0===l?e(i):e(i,l)}}},k=D(y),S=D((function(e,n){Object(d.b)(e);var t=Object(d.a)({style:N,timeout:j},{mode:"enter"});e.style.webkitTransition=F.transitions.create("transform",t),e.style.transition=F.transitions.create("transform",t),h&&h(e,n)})),A=D(v),R=D(x),U=D((function(e){var n=Object(d.a)({style:N,timeout:j},{mode:"exit"});e.style.webkitTransition=F.transitions.create("transform",n),e.style.transition=F.transitions.create("transform",n),g&&g(e)})),z=D(E);return i.createElement(C,Object(a.a)({appear:!0,in:b,nodeRef:I?_:void 0,onEnter:S,onEntered:A,onEntering:k,onExit:U,onExited:z,onExiting:R,timeout:j},T),(function(e,n){return i.cloneElement(t,Object(a.a)({style:Object(a.a)({transform:"scale(0)",visibility:"exited"!==e||b?void 0:"hidden"},u[e],N,t.props.style),ref:P},n))}))}));n.a=p},2048:function(e,n,t){"use strict";var a=t(247);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t(0)),r=(0,a(t(343)).default)(o.default.createElement("path",{d:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");n.default=r},2259:function(e,n,t){"use strict";var a=t(247);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t(0)),r=(0,a(t(343)).default)(o.default.createElement("path",{d:"M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"}),"Navigation");n.default=r},2672:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return h}));var a=t(0),o=t.n(a),r=t(958),i=t(1838),l=t(1905),c=t.n(l),s=t(1986),d=t.n(s),m=t(1876),u=t.n(m),f=t(2259),p=t.n(f),b=Object(r.a)((function(e){return{root:{"& > *":{margin:e.spacing(1)}},extendedIcon:{marginRight:e.spacing(1)}}}));function h(){var e=b();return o.a.createElement("div",{className:e.root},o.a.createElement(i.a,{color:"primary","aria-label":"add"},o.a.createElement(c.a,null)),o.a.createElement(i.a,{color:"secondary","aria-label":"edit"},o.a.createElement(d.a,null)),o.a.createElement(i.a,{variant:"extended"},o.a.createElement(p.a,{className:e.extendedIcon}),"Navigate"),o.a.createElement(i.a,{disabled:!0,"aria-label":"like"},o.a.createElement(u.a,null)))}},2673:function(e,n,t){"use strict";t.r(n),n.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Fab from '@material-ui/core/Fab';\nimport AddIcon from '@material-ui/icons/Add';\nimport EditIcon from '@material-ui/icons/Edit';\nimport FavoriteIcon from '@material-ui/icons/Favorite';\nimport NavigationIcon from '@material-ui/icons/Navigation';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    '& > *': {\n      margin: theme.spacing(1),\n    },\n  },\n  extendedIcon: {\n    marginRight: theme.spacing(1),\n  },\n}));\n\nexport default function FloatingActionButtons() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Fab color=\"primary\" aria-label=\"add\">\n        <AddIcon />\n      </Fab>\n      <Fab color=\"secondary\" aria-label=\"edit\">\n        <EditIcon />\n      </Fab>\n      <Fab variant=\"extended\">\n        <NavigationIcon className={classes.extendedIcon} />\n        Navigate\n      </Fab>\n      <Fab disabled aria-label=\"like\">\n        <FavoriteIcon />\n      </Fab>\n    </div>\n  );\n}\n"},2674:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return u}));var a=t(0),o=t.n(a),r=t(958),i=t(1838),l=t(1905),c=t.n(l),s=t(2259),d=t.n(s),m=Object(r.a)((function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)}}}));function u(){var e=m();return o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement(i.a,{size:"small",color:"secondary","aria-label":"add",className:e.margin},o.a.createElement(c.a,null)),o.a.createElement(i.a,{size:"medium",color:"secondary","aria-label":"add",className:e.margin},o.a.createElement(c.a,null)),o.a.createElement(i.a,{color:"secondary","aria-label":"add",className:e.margin},o.a.createElement(c.a,null))),o.a.createElement("div",null,o.a.createElement(i.a,{variant:"extended",size:"small",color:"primary","aria-label":"add",className:e.margin},o.a.createElement(d.a,{className:e.extendedIcon}),"Extended"),o.a.createElement(i.a,{variant:"extended",size:"medium",color:"primary","aria-label":"add",className:e.margin},o.a.createElement(d.a,{className:e.extendedIcon}),"Extended"),o.a.createElement(i.a,{variant:"extended",color:"primary","aria-label":"add",className:e.margin},o.a.createElement(d.a,{className:e.extendedIcon}),"Extended")))}},2675:function(e,n,t){"use strict";t.r(n),n.default='import React from \'react\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport Fab from \'@material-ui/core/Fab\';\nimport AddIcon from \'@material-ui/icons/Add\';\nimport NavigationIcon from \'@material-ui/icons/Navigation\';\n\nconst useStyles = makeStyles((theme) => ({\n  margin: {\n    margin: theme.spacing(1),\n  },\n  extendedIcon: {\n    marginRight: theme.spacing(1),\n  },\n}));\n\nexport default function FloatingActionButtonSize() {\n  const classes = useStyles();\n\n  return (\n    <div>\n      <div>\n        <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>\n          <AddIcon />\n        </Fab>\n        <Fab size="medium" color="secondary" aria-label="add" className={classes.margin}>\n          <AddIcon />\n        </Fab>\n        <Fab color="secondary" aria-label="add" className={classes.margin}>\n          <AddIcon />\n        </Fab>\n      </div>\n      <div>\n        <Fab\n          variant="extended"\n          size="small"\n          color="primary"\n          aria-label="add"\n          className={classes.margin}\n        >\n          <NavigationIcon className={classes.extendedIcon} />\n          Extended\n        </Fab>\n        <Fab\n          variant="extended"\n          size="medium"\n          color="primary"\n          aria-label="add"\n          className={classes.margin}\n        >\n          <NavigationIcon className={classes.extendedIcon} />\n          Extended\n        </Fab>\n        <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>\n          <NavigationIcon className={classes.extendedIcon} />\n          Extended\n        </Fab>\n      </div>\n    </div>\n  );\n}\n'},2676:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return I}));var a=t(8),o=t(200),r=t(0),i=t.n(r),l=t(3),c=t(618),s=t.n(c),d=t(958),m=t(64),u=t(1783),f=t(1848),p=t(1847),b=t(74),h=t(1987),v=t(1838),y=t(1905),g=t.n(y),E=t(1986),x=t.n(E),N=t(2048),O=t.n(N),j=t(285),w=t(1823);function C(e){var n=e.children,t=e.value,a=e.index,r=Object(o.a)(e,["children","value","index"]);return i.a.createElement(b.a,Object.assign({component:"div",role:"tabpanel",hidden:t!==a,id:"action-tabpanel-".concat(a),"aria-labelledby":"action-tab-".concat(a)},r),t===a&&i.a.createElement(w.a,{p:3},n))}function T(e){return{id:"action-tab-".concat(e),"aria-controls":"action-tabpanel-".concat(e)}}var F=Object(d.a)((function(e){return{root:{backgroundColor:e.palette.background.paper,width:500,position:"relative",minHeight:200},fab:{position:"absolute",bottom:e.spacing(2),right:e.spacing(2)},fabGreen:{color:e.palette.common.white,backgroundColor:j.a[500],"&:hover":{backgroundColor:j.a[600]}}}}));function I(){var e=F(),n=Object(m.a)(),t=i.a.useState(0),o=Object(a.a)(t,2),r=o[0],c=o[1],d={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},b=[{color:"primary",className:e.fab,icon:i.a.createElement(g.a,null),label:"Add"},{color:"secondary",className:e.fab,icon:i.a.createElement(x.a,null),label:"Edit"},{color:"inherit",className:Object(l.default)(e.fab,e.fabGreen),icon:i.a.createElement(O.a,null),label:"Expand"}];return i.a.createElement("div",{className:e.root},i.a.createElement(u.a,{position:"static",color:"default"},i.a.createElement(f.a,{value:r,onChange:function(e,n){c(n)},indicatorColor:"primary",textColor:"primary",variant:"fullWidth","aria-label":"action tabs example"},i.a.createElement(p.a,Object.assign({label:"Item One"},T(0))),i.a.createElement(p.a,Object.assign({label:"Item Two"},T(1))),i.a.createElement(p.a,Object.assign({label:"Item Three"},T(2))))),i.a.createElement(s.a,{axis:"rtl"===n.direction?"x-reverse":"x",index:r,onChangeIndex:function(e){c(e)}},i.a.createElement(C,{value:r,index:0,dir:n.direction},"Item One"),i.a.createElement(C,{value:r,index:1,dir:n.direction},"Item Two"),i.a.createElement(C,{value:r,index:2,dir:n.direction},"Item Three")),b.map((function(e,n){return i.a.createElement(h.a,{key:e.color,in:r===n,timeout:d,style:{transitionDelay:"".concat(r===n?d.exit:0,"ms")},unmountOnExit:!0},i.a.createElement(v.a,{"aria-label":e.label,className:e.className,color:e.color},e.icon))})))}},2677:function(e,n,t){"use strict";t.r(n),n.default="import React from 'react';\nimport PropTypes from 'prop-types';\nimport clsx from 'clsx';\nimport SwipeableViews from 'react-swipeable-views';\nimport { makeStyles, useTheme } from '@material-ui/core/styles';\nimport AppBar from '@material-ui/core/AppBar';\nimport Tabs from '@material-ui/core/Tabs';\nimport Tab from '@material-ui/core/Tab';\nimport Typography from '@material-ui/core/Typography';\nimport Zoom from '@material-ui/core/Zoom';\nimport Fab from '@material-ui/core/Fab';\nimport AddIcon from '@material-ui/icons/Add';\nimport EditIcon from '@material-ui/icons/Edit';\nimport UpIcon from '@material-ui/icons/KeyboardArrowUp';\nimport { green } from '@material-ui/core/colors';\nimport Box from '@material-ui/core/Box';\n\nfunction TabPanel(props) {\n  const { children, value, index, ...other } = props;\n\n  return (\n    <Typography\n      component=\"div\"\n      role=\"tabpanel\"\n      hidden={value !== index}\n      id={`action-tabpanel-${index}`}\n      aria-labelledby={`action-tab-${index}`}\n      {...other}\n    >\n      {value === index && <Box p={3}>{children}</Box>}\n    </Typography>\n  );\n}\n\nTabPanel.propTypes = {\n  children: PropTypes.node,\n  index: PropTypes.any.isRequired,\n  value: PropTypes.any.isRequired,\n};\n\nfunction a11yProps(index) {\n  return {\n    id: `action-tab-${index}`,\n    'aria-controls': `action-tabpanel-${index}`,\n  };\n}\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    backgroundColor: theme.palette.background.paper,\n    width: 500,\n    position: 'relative',\n    minHeight: 200,\n  },\n  fab: {\n    position: 'absolute',\n    bottom: theme.spacing(2),\n    right: theme.spacing(2),\n  },\n  fabGreen: {\n    color: theme.palette.common.white,\n    backgroundColor: green[500],\n    '&:hover': {\n      backgroundColor: green[600],\n    },\n  },\n}));\n\nexport default function FloatingActionButtonZoom() {\n  const classes = useStyles();\n  const theme = useTheme();\n  const [value, setValue] = React.useState(0);\n\n  const handleChange = (event, newValue) => {\n    setValue(newValue);\n  };\n\n  const handleChangeIndex = (index) => {\n    setValue(index);\n  };\n\n  const transitionDuration = {\n    enter: theme.transitions.duration.enteringScreen,\n    exit: theme.transitions.duration.leavingScreen,\n  };\n\n  const fabs = [\n    {\n      color: 'primary',\n      className: classes.fab,\n      icon: <AddIcon />,\n      label: 'Add',\n    },\n    {\n      color: 'secondary',\n      className: classes.fab,\n      icon: <EditIcon />,\n      label: 'Edit',\n    },\n    {\n      color: 'inherit',\n      className: clsx(classes.fab, classes.fabGreen),\n      icon: <UpIcon />,\n      label: 'Expand',\n    },\n  ];\n\n  return (\n    <div className={classes.root}>\n      <AppBar position=\"static\" color=\"default\">\n        <Tabs\n          value={value}\n          onChange={handleChange}\n          indicatorColor=\"primary\"\n          textColor=\"primary\"\n          variant=\"fullWidth\"\n          aria-label=\"action tabs example\"\n        >\n          <Tab label=\"Item One\" {...a11yProps(0)} />\n          <Tab label=\"Item Two\" {...a11yProps(1)} />\n          <Tab label=\"Item Three\" {...a11yProps(2)} />\n        </Tabs>\n      </AppBar>\n      <SwipeableViews\n        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}\n        index={value}\n        onChangeIndex={handleChangeIndex}\n      >\n        <TabPanel value={value} index={0} dir={theme.direction}>\n          Item One\n        </TabPanel>\n        <TabPanel value={value} index={1} dir={theme.direction}>\n          Item Two\n        </TabPanel>\n        <TabPanel value={value} index={2} dir={theme.direction}>\n          Item Three\n        </TabPanel>\n      </SwipeableViews>\n      {fabs.map((fab, index) => (\n        <Zoom\n          key={fab.color}\n          in={value === index}\n          timeout={transitionDuration}\n          style={{\n            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,\n          }}\n          unmountOnExit\n        >\n          <Fab aria-label={fab.label} className={fab.className} color={fab.color}>\n            {fab.icon}\n          </Fab>\n        </Zoom>\n      ))}\n    </div>\n  );\n}\n"},3343:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(1855),i=(t(179),t(249)),l=t(149),c=t(113),s=t(74),d=t(958),m=Object(d.a)((function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}}));n.default=function(e){var n=m();return o.a.createElement(i.a,{classes:{root:n.layoutRoot},header:o.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},o.a.createElement("div",{className:"flex flex-col"},o.a.createElement("div",{className:"flex items-center mb-16"},o.a.createElement(c.a,{className:"text-18",color:"action"},"home"),o.a.createElement(c.a,{className:"text-16",color:"action"},"chevron_right"),o.a.createElement(s.a,{color:"textSecondary"},"Documentation"),o.a.createElement(c.a,{className:"text-16",color:"action"},"chevron_right"),o.a.createElement(s.a,{color:"textSecondary"},"Material UI Components")),o.a.createElement(s.a,{variant:"h6"},"Floating action button")),o.a.createElement(l.a,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/floating-action-button",target:"_blank",role:"button"},o.a.createElement(c.a,null,"link"),o.a.createElement("span",{className:"mx-4"},"Reference"))),content:o.a.createElement("div",{className:"p-24 max-w-2xl"},o.a.createElement(s.a,{className:"text-44 mt-32 mb-8",component:"h1"},"Floating action button"),o.a.createElement(s.a,{className:"description"},"A floating action button (FAB) performs the primary, or most common, action on a screen."),o.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Floating Action Button"),o.a.createElement(s.a,{className:"mb-16",component:"div"},"A ",o.a.createElement("a",{href:"https://material.io/design/components/buttons-floating-action-button.html"},"floating action button"),"appears in front of all screen content, typically as a circular shape with an icon in its center. FABs come in two types: regular, and extended."),o.a.createElement(s.a,{className:"mb-16",component:"div"},"Only use a FAB if it is the most suitable way to present a screen\u2019s primary action."),o.a.createElement(s.a,{className:"mb-16",component:"div"},"Only one floating action button is recommended per screen to represent the most common action."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:t(2672).default,raw:t(2673)})),o.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Size"),o.a.createElement(s.a,{className:"mb-16",component:"div"},"Use the ",o.a.createElement("code",null,"size")," prop for larger or smaller floating action buttons."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:t(2674).default,raw:t(2675)})),o.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Animation"),o.a.createElement(s.a,{className:"mb-16",component:"div"},"The floating action button animates onto the screen as an expanding piece of material, by default."),o.a.createElement(s.a,{className:"mb-16",component:"div"},"A floating action button that spans multiple lateral screens (such as tabbed screens) should briefly disappear, then reappear if its action changes."),o.a.createElement(s.a,{className:"mb-16",component:"div"},"The Zoom transition can be used to achieve this. Note that since both the exiting and entering animations are triggered at the same time, we use ",o.a.createElement("code",null,"enterDelay")," to allow the outgoing Floating Action Button's animation to finish before the new one enters."),o.a.createElement(s.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:t(2676).default,raw:t(2677)})))})}}}]);