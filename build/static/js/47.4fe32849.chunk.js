(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[47],{1891:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContextProvider=t.FrameContext=void 0;var a,o=n(0),r=(a=o)&&a.__esModule?a:{default:a};var c=void 0,l=void 0;"undefined"!==typeof document&&(c=document),"undefined"!==typeof window&&(l=window);var i=t.FrameContext=r.default.createContext({document:c,window:l}),s=i.Provider,m=i.Consumer;t.FrameContextProvider=s,t.FrameContextConsumer=m},1893:function(e,t,n){"use strict";n.d(t,"a",(function(){return L}));var a=n(8),o=n(171),r=n(1819),c=n(1825),l=n(170),i=n(1886),s=n(1887),m=n(0),d=n.n(m),u=n(13),h=n(2),p=n(91),f=n(92),b=n(155),g=n(154),y=n(1807),w=n(894),v=n(1849),k=n(1876),x=n(7),E=n(589),C=n(590),S=n(1895),j=n.n(S),F=Object(y.a)({productionPrefix:"iframe-"}),O=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={ready:!1},e.handleRef=function(t){e.contentDocument=t?t.node.contentDocument:null},e.onContentDidMount=function(){e.setState({ready:!0,jss:Object(E.a)(Object(h.a)(Object(h.a)({},Object(w.a)()),{},{plugins:[].concat(Object(u.a)(Object(w.a)().plugins),[Object(C.a)()]),insertionPoint:e.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:e.contentDocument.body})},e.onContentDidUpdate=function(){e.contentDocument.body.dir=e.props.theme.direction},e.renderHead=function(){return d.a.createElement(d.a.Fragment,null,d.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),d.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},e}return Object(f.a)(n,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.classes,a=e.theme;return d.a.createElement(j.a,{head:this.renderHead(),ref:this.handleRef,className:n.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?d.a.createElement(v.b,{jss:this.state.jss,generateClassName:F,sheetsManager:this.state.sheetsManager},d.a.createElement(k.a,{theme:a},d.a.cloneElement(t,{container:this.state.container}))):null)}}]),n}(d.a.Component),N=Object(x.a)((function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}}),{withTheme:!0})(O);function P(e){var t=Object(m.useState)(e.currentTabIndex),n=Object(a.a)(t,2),u=n[0],h=n[1],p=e.component,f=e.raw,b=e.iframe,g=e.className;return d.a.createElement(c.a,{className:g},d.a.createElement(r.a,{position:"static",color:"default",elevation:0},d.a.createElement(s.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:u,onChange:function(e,t){h(t)}},p&&d.a.createElement(i.a,{classes:{root:"min-w-64"},icon:d.a.createElement(l.a,null,"remove_red_eye")}),f&&d.a.createElement(i.a,{classes:{root:"min-w-64"},icon:d.a.createElement(l.a,null,"code")}))),d.a.createElement("div",{className:"flex justify-center"},d.a.createElement("div",{className:0===u?"flex flex-1":"hidden"},p&&(b?d.a.createElement(N,null,d.a.createElement(p,null)):d.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},d.a.createElement(p,null)))),d.a.createElement("div",{className:1===u?"flex flex-1":"hidden"},f&&d.a.createElement("div",{className:"flex flex-1"},d.a.createElement(o.a,{component:"pre",className:"language-javascript w-full"},f.default)))))}P.defaultProps={currentTabIndex:0};var L=P},1895:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContext=void 0;var a=n(1891);Object.defineProperty(t,"FrameContext",{enumerable:!0,get:function(){return a.FrameContext}}),Object.defineProperty(t,"FrameContextConsumer",{enumerable:!0,get:function(){return a.FrameContextConsumer}});var o,r=n(1896),c=(o=r)&&o.__esModule?o:{default:o};t.default=c.default},1896:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),c=d(r),l=d(n(20)),i=d(n(3)),s=n(1891),m=d(n(1897));function d(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return a.handleLoad=function(){a.forceUpdate()},a._isMounted=!1,a}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var t=this.props.contentDidMount,n=this.props.contentDidUpdate,a=e.defaultView||e.parentView,o=c.default.createElement(m.default,{contentDidMount:t,contentDidUpdate:n},c.default.createElement(s.FrameContextProvider,{value:{document:e,window:a}},c.default.createElement("div",{className:"frame-content"},this.props.children)));e.body.children.length<1&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close());var r=this.getMountTarget();return[l.default.createPortal(this.props.head,this.getDoc().head),l.default.createPortal(o,r)]}},{key:"render",value:function(){var e=this,t=a({},this.props,{children:void 0});return delete t.head,delete t.initialContent,delete t.mountTarget,delete t.contentDidMount,delete t.contentDidUpdate,c.default.createElement("iframe",a({},t,{ref:function(t){e.node=t}}),this.renderFrameContents())}}]),t}(r.Component);u.propTypes={style:i.default.object,head:i.default.node,initialContent:i.default.string,mountTarget:i.default.string,contentDidMount:i.default.func,contentDidUpdate:i.default.func,children:i.default.oneOfType([i.default.element,i.default.arrayOf(i.default.element)])},u.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=u},1897:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(0),r=(c(o),c(n(3)));function c(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var s=function(e){function t(){return l(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return o.Children.only(this.props.children)}}]),t}(o.Component);s.propTypes={children:r.default.element.isRequired,contentDidMount:r.default.func.isRequired,contentDidUpdate:r.default.func.isRequired},t.default=s},1926:function(e,t,n){"use strict";var a=n(4),o=n(1),r=n(0),c=(n(3),n(5)),l=n(7),i=[0,1,2,3,4,5,6,7,8,9,10],s=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=parseFloat(e);return"".concat(n/t).concat(String(e).replace(String(n),"")||"px")}var d=r.forwardRef((function(e,t){var n=e.alignContent,l=void 0===n?"stretch":n,i=e.alignItems,s=void 0===i?"stretch":i,m=e.classes,d=e.className,u=e.component,h=void 0===u?"div":u,p=e.container,f=void 0!==p&&p,b=e.direction,g=void 0===b?"row":b,y=e.item,w=void 0!==y&&y,v=e.justify,k=void 0===v?"flex-start":v,x=e.lg,E=void 0!==x&&x,C=e.md,S=void 0!==C&&C,j=e.sm,F=void 0!==j&&j,O=e.spacing,N=void 0===O?0:O,P=e.wrap,L=void 0===P?"wrap":P,D=e.xl,_=void 0!==D&&D,G=e.xs,M=void 0!==G&&G,B=e.zeroMinWidth,T=void 0!==B&&B,A=Object(a.a)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),R=Object(c.a)(m.root,d,f&&[m.container,0!==N&&m["spacing-xs-".concat(String(N))]],w&&m.item,T&&m.zeroMinWidth,"row"!==g&&m["direction-xs-".concat(String(g))],"wrap"!==L&&m["wrap-xs-".concat(String(L))],"stretch"!==s&&m["align-items-xs-".concat(String(s))],"stretch"!==l&&m["align-content-xs-".concat(String(l))],"flex-start"!==k&&m["justify-xs-".concat(String(k))],!1!==M&&m["grid-xs-".concat(String(M))],!1!==F&&m["grid-sm-".concat(String(F))],!1!==S&&m["grid-md-".concat(String(S))],!1!==E&&m["grid-lg-".concat(String(E))],!1!==_&&m["grid-xl-".concat(String(_))]);return r.createElement(h,Object(o.a)({className:R,ref:t},A))})),u=Object(l.a)((function(e){return Object(o.a)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var n={};return i.forEach((function(a){var o=e.spacing(a);0!==o&&(n["spacing-".concat(t,"-").concat(a)]={margin:"-".concat(m(o,2)),width:"calc(100% + ".concat(m(o),")"),"& > $item":{padding:m(o,2)}})})),n}(e,"xs"),e.breakpoints.keys.reduce((function(t,n){return function(e,t,n){var a={};s.forEach((function(e){var t="grid-".concat(n,"-").concat(e);if(!0!==e)if("auto"!==e){var o="".concat(Math.round(e/12*1e8)/1e6,"%");a[t]={flexBasis:o,flexGrow:0,maxWidth:o}}else a[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else a[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===n?Object(o.a)(e,a):e[t.breakpoints.up(n)]=a}(t,e,n),t}),{}))}),{name:"MuiGrid"})(d);t.a=u},3100:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var a=n(37),o=n(2),r=n(8),c=n(0),l=n.n(c),i=n(1875);function s(){var e=l.a.useState({checkedA:!0,checkedB:!0}),t=Object(r.a)(e,2),n=t[0],c=t[1],s=function(e){c(Object(o.a)(Object(o.a)({},n),{},Object(a.a)({},e.target.name,e.target.checked)))};return l.a.createElement("div",null,l.a.createElement(i.a,{checked:n.checkedA,onChange:s,name:"checkedA",inputProps:{"aria-label":"secondary checkbox"}}),l.a.createElement(i.a,{checked:n.checkedB,onChange:s,color:"primary",name:"checkedB",inputProps:{"aria-label":"primary checkbox"}}),l.a.createElement(i.a,{inputProps:{"aria-label":"primary checkbox"}}),l.a.createElement(i.a,{disabled:!0,inputProps:{"aria-label":"disabled checkbox"}}),l.a.createElement(i.a,{disabled:!0,checked:!0,inputProps:{"aria-label":"primary checkbox"}}),l.a.createElement(i.a,{defaultChecked:!0,color:"default",inputProps:{"aria-label":"checkbox with default color"}}))}},3101:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport Switch from '@material-ui/core/Switch';\n\nexport default function Switches() {\n  const [state, setState] = React.useState({\n    checkedA: true,\n    checkedB: true,\n  });\n\n  const handleChange = (event) => {\n    setState({ ...state, [event.target.name]: event.target.checked });\n  };\n\n  return (\n    <div>\n      <Switch\n        checked={state.checkedA}\n        onChange={handleChange}\n        name=\"checkedA\"\n        inputProps={{ 'aria-label': 'secondary checkbox' }}\n      />\n      <Switch\n        checked={state.checkedB}\n        onChange={handleChange}\n        color=\"primary\"\n        name=\"checkedB\"\n        inputProps={{ 'aria-label': 'primary checkbox' }}\n      />\n      <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />\n      <Switch disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />\n      <Switch disabled checked inputProps={{ 'aria-label': 'primary checkbox' }} />\n      <Switch\n        defaultChecked\n        color=\"default\"\n        inputProps={{ 'aria-label': 'checkbox with default color' }}\n      />\n    </div>\n  );\n}\n"},3102:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var a=n(37),o=n(2),r=n(8),c=n(0),l=n.n(c),i=n(1816),s=n(1863),m=n(1875);function d(){var e=l.a.useState({checkedA:!0,checkedB:!0}),t=Object(r.a)(e,2),n=t[0],c=t[1],d=function(e){c(Object(o.a)(Object(o.a)({},n),{},Object(a.a)({},e.target.name,e.target.checked)))};return l.a.createElement(i.a,{row:!0},l.a.createElement(s.a,{control:l.a.createElement(m.a,{checked:n.checkedA,onChange:d,name:"checkedA"}),label:"Secondary"}),l.a.createElement(s.a,{control:l.a.createElement(m.a,{checked:n.checkedB,onChange:d,name:"checkedB",color:"primary"}),label:"Primary"}),l.a.createElement(s.a,{control:l.a.createElement(m.a,null),label:"Uncontrolled"}),l.a.createElement(s.a,{disabled:!0,control:l.a.createElement(m.a,null),label:"Disabled"}),l.a.createElement(s.a,{disabled:!0,control:l.a.createElement(m.a,{checked:!0}),label:"Disabled"}))}},3103:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport FormGroup from \'@material-ui/core/FormGroup\';\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\nimport Switch from \'@material-ui/core/Switch\';\n\nexport default function SwitchLabels() {\n  const [state, setState] = React.useState({\n    checkedA: true,\n    checkedB: true,\n  });\n\n  const handleChange = (event) => {\n    setState({ ...state, [event.target.name]: event.target.checked });\n  };\n\n  return (\n    <FormGroup row>\n      <FormControlLabel\n        control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}\n        label="Secondary"\n      />\n      <FormControlLabel\n        control={\n          <Switch\n            checked={state.checkedB}\n            onChange={handleChange}\n            name="checkedB"\n            color="primary"\n          />\n        }\n        label="Primary"\n      />\n      <FormControlLabel control={<Switch />} label="Uncontrolled" />\n      <FormControlLabel disabled control={<Switch />} label="Disabled" />\n      <FormControlLabel disabled control={<Switch checked />} label="Disabled" />\n    </FormGroup>\n  );\n}\n'},3104:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return p}));var a=n(37),o=n(2),r=n(8),c=n(0),l=n.n(c),i=n(1815),s=n(571),m=n(1816),d=n(1863),u=n(587),h=n(1875);function p(){var e=l.a.useState({gilad:!0,jason:!1,antoine:!0}),t=Object(r.a)(e,2),n=t[0],c=t[1],p=function(e){c(Object(o.a)(Object(o.a)({},n),{},Object(a.a)({},e.target.name,e.target.checked)))};return l.a.createElement(s.a,{component:"fieldset"},l.a.createElement(i.a,{component:"legend"},"Assign responsibility"),l.a.createElement(m.a,null,l.a.createElement(d.a,{control:l.a.createElement(h.a,{checked:n.gilad,onChange:p,name:"gilad"}),label:"Gilad Gray"}),l.a.createElement(d.a,{control:l.a.createElement(h.a,{checked:n.jason,onChange:p,name:"jason"}),label:"Jason Killian"}),l.a.createElement(d.a,{control:l.a.createElement(h.a,{checked:n.antoine,onChange:p,name:"antoine"}),label:"Antoine Llorca"})),l.a.createElement(u.a,null,"Be careful"))}},3105:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport FormLabel from \'@material-ui/core/FormLabel\';\nimport FormControl from \'@material-ui/core/FormControl\';\nimport FormGroup from \'@material-ui/core/FormGroup\';\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\nimport FormHelperText from \'@material-ui/core/FormHelperText\';\nimport Switch from \'@material-ui/core/Switch\';\n\nexport default function SwitchesGroup() {\n  const [state, setState] = React.useState({\n    gilad: true,\n    jason: false,\n    antoine: true,\n  });\n\n  const handleChange = (event) => {\n    setState({ ...state, [event.target.name]: event.target.checked });\n  };\n\n  return (\n    <FormControl component="fieldset">\n      <FormLabel component="legend">Assign responsibility</FormLabel>\n      <FormGroup>\n        <FormControlLabel\n          control={<Switch checked={state.gilad} onChange={handleChange} name="gilad" />}\n          label="Gilad Gray"\n        />\n        <FormControlLabel\n          control={<Switch checked={state.jason} onChange={handleChange} name="jason" />}\n          label="Jason Killian"\n        />\n        <FormControlLabel\n          control={<Switch checked={state.antoine} onChange={handleChange} name="antoine" />}\n          label="Antoine Llorca"\n        />\n      </FormGroup>\n      <FormHelperText>Be careful</FormHelperText>\n    </FormControl>\n  );\n}\n'},3106:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return w}));var a=n(37),o=n(2),r=n(8),c=n(191),l=n(0),i=n.n(l),s=n(7),m=n(706),d=n(1816),u=n(1863),h=n(1875),p=n(1926),f=n(71),b=Object(s.a)({switchBase:{color:m.a[300],"&$checked":{color:m.a[500]},"&$checked + $track":{backgroundColor:m.a[500]}},checked:{},track:{}})(h.a),g=Object(s.a)((function(e){return{root:{width:42,height:26,padding:0,margin:e.spacing(1)},switchBase:{padding:1,"&$checked":{transform:"translateX(16px)",color:e.palette.common.white,"& + $track":{backgroundColor:"#52d869",opacity:1,border:"none"}},"&$focusVisible $thumb":{color:"#52d869",border:"6px solid #fff"}},thumb:{width:24,height:24},track:{borderRadius:13,border:"1px solid ".concat(e.palette.grey[400]),backgroundColor:e.palette.grey[50],opacity:1,transition:e.transitions.create(["background-color","border"])},checked:{},focusVisible:{}}}))((function(e){var t=e.classes,n=Object(c.a)(e,["classes"]);return i.a.createElement(h.a,Object.assign({focusVisibleClassName:t.focusVisible,disableRipple:!0,classes:{root:t.root,switchBase:t.switchBase,thumb:t.thumb,track:t.track,checked:t.checked}},n))})),y=Object(s.a)((function(e){return{root:{width:28,height:16,padding:0,display:"flex"},switchBase:{padding:2,color:e.palette.grey[500],"&$checked":{transform:"translateX(12px)",color:e.palette.common.white,"& + $track":{opacity:1,backgroundColor:e.palette.primary.main,borderColor:e.palette.primary.main}}},thumb:{width:12,height:12,boxShadow:"none"},track:{border:"1px solid ".concat(e.palette.grey[500]),borderRadius:8,opacity:1,backgroundColor:e.palette.common.white},checked:{}}}))(h.a);function w(){var e=i.a.useState({checkedA:!0,checkedB:!0,checkedC:!0}),t=Object(r.a)(e,2),n=t[0],c=t[1],l=function(e){c(Object(o.a)(Object(o.a)({},n),{},Object(a.a)({},e.target.name,e.target.checked)))};return i.a.createElement(d.a,null,i.a.createElement(u.a,{control:i.a.createElement(b,{checked:n.checkedA,onChange:l,name:"checkedA"}),label:"Custom color"}),i.a.createElement(u.a,{control:i.a.createElement(g,{checked:n.checkedB,onChange:l,name:"checkedB"}),label:"iOS style"}),i.a.createElement(f.a,{component:"div"},i.a.createElement(p.a,{component:"label",container:!0,alignItems:"center",spacing:1},i.a.createElement(p.a,{item:!0},"Off"),i.a.createElement(p.a,{item:!0},i.a.createElement(y,{checked:n.checkedC,onChange:l,name:"checkedC"})),i.a.createElement(p.a,{item:!0},"On"))))}},3107:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { withStyles } from '@material-ui/core/styles';\nimport { purple } from '@material-ui/core/colors';\nimport FormGroup from '@material-ui/core/FormGroup';\nimport FormControlLabel from '@material-ui/core/FormControlLabel';\nimport Switch from '@material-ui/core/Switch';\nimport Grid from '@material-ui/core/Grid';\nimport Typography from '@material-ui/core/Typography';\n\nconst PurpleSwitch = withStyles({\n  switchBase: {\n    color: purple[300],\n    '&$checked': {\n      color: purple[500],\n    },\n    '&$checked + $track': {\n      backgroundColor: purple[500],\n    },\n  },\n  checked: {},\n  track: {},\n})(Switch);\n\nconst IOSSwitch = withStyles((theme) => ({\n  root: {\n    width: 42,\n    height: 26,\n    padding: 0,\n    margin: theme.spacing(1),\n  },\n  switchBase: {\n    padding: 1,\n    '&$checked': {\n      transform: 'translateX(16px)',\n      color: theme.palette.common.white,\n      '& + $track': {\n        backgroundColor: '#52d869',\n        opacity: 1,\n        border: 'none',\n      },\n    },\n    '&$focusVisible $thumb': {\n      color: '#52d869',\n      border: '6px solid #fff',\n    },\n  },\n  thumb: {\n    width: 24,\n    height: 24,\n  },\n  track: {\n    borderRadius: 26 / 2,\n    border: `1px solid ${theme.palette.grey[400]}`,\n    backgroundColor: theme.palette.grey[50],\n    opacity: 1,\n    transition: theme.transitions.create(['background-color', 'border']),\n  },\n  checked: {},\n  focusVisible: {},\n}))(({ classes, ...props }) => {\n  return (\n    <Switch\n      focusVisibleClassName={classes.focusVisible}\n      disableRipple\n      classes={{\n        root: classes.root,\n        switchBase: classes.switchBase,\n        thumb: classes.thumb,\n        track: classes.track,\n        checked: classes.checked,\n      }}\n      {...props}\n    />\n  );\n});\n\nconst AntSwitch = withStyles((theme) => ({\n  root: {\n    width: 28,\n    height: 16,\n    padding: 0,\n    display: 'flex',\n  },\n  switchBase: {\n    padding: 2,\n    color: theme.palette.grey[500],\n    '&$checked': {\n      transform: 'translateX(12px)',\n      color: theme.palette.common.white,\n      '& + $track': {\n        opacity: 1,\n        backgroundColor: theme.palette.primary.main,\n        borderColor: theme.palette.primary.main,\n      },\n    },\n  },\n  thumb: {\n    width: 12,\n    height: 12,\n    boxShadow: 'none',\n  },\n  track: {\n    border: `1px solid ${theme.palette.grey[500]}`,\n    borderRadius: 16 / 2,\n    opacity: 1,\n    backgroundColor: theme.palette.common.white,\n  },\n  checked: {},\n}))(Switch);\n\nexport default function CustomizedSwitches() {\n  const [state, setState] = React.useState({\n    checkedA: true,\n    checkedB: true,\n    checkedC: true,\n  });\n\n  const handleChange = (event) => {\n    setState({ ...state, [event.target.name]: event.target.checked });\n  };\n\n  return (\n    <FormGroup>\n      <FormControlLabel\n        control={<PurpleSwitch checked={state.checkedA} onChange={handleChange} name=\"checkedA\" />}\n        label=\"Custom color\"\n      />\n      <FormControlLabel\n        control={<IOSSwitch checked={state.checkedB} onChange={handleChange} name=\"checkedB\" />}\n        label=\"iOS style\"\n      />\n      <Typography component=\"div\">\n        <Grid component=\"label\" container alignItems=\"center\" spacing={1}>\n          <Grid item>Off</Grid>\n          <Grid item>\n            <AntSwitch checked={state.checkedC} onChange={handleChange} name=\"checkedC\" />\n          </Grid>\n          <Grid item>On</Grid>\n        </Grid>\n      </Typography>\n    </FormGroup>\n  );\n}\n"},3108:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var a=n(8),o=n(0),r=n.n(o),c=n(1875),l=n(1816),i=n(1863);function s(){var e=r.a.useState(!1),t=Object(a.a)(e,2),n=t[0],o=t[1],s=function(){o((function(e){return!e}))};return r.a.createElement(l.a,null,r.a.createElement(i.a,{control:r.a.createElement(c.a,{size:"small",checked:n,onChange:s}),label:"Small"}),r.a.createElement(i.a,{control:r.a.createElement(c.a,{checked:n,onChange:s}),label:"Normal"}))}},3109:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport Switch from '@material-ui/core/Switch';\nimport FormGroup from '@material-ui/core/FormGroup';\nimport FormControlLabel from '@material-ui/core/FormControlLabel';\n\nexport default function SwitchesSize() {\n  const [checked, setChecked] = React.useState(false);\n\n  const toggleChecked = () => {\n    setChecked((prev) => !prev);\n  };\n\n  return (\n    <FormGroup>\n      <FormControlLabel\n        control={<Switch size=\"small\" checked={checked} onChange={toggleChecked} />}\n        label=\"Small\"\n      />\n      <FormControlLabel\n        control={<Switch checked={checked} onChange={toggleChecked} />}\n        label=\"Normal\"\n      />\n    </FormGroup>\n  );\n}\n"},3110:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var a=n(0),o=n.n(a),r=n(1875),c=n(1816),l=n(1863),i=n(571);function s(){return o.a.createElement(i.a,{component:"fieldset"},o.a.createElement(c.a,{"aria-label":"position",row:!0},o.a.createElement(l.a,{value:"top",control:o.a.createElement(r.a,{color:"primary"}),label:"Top",labelPlacement:"top"}),o.a.createElement(l.a,{value:"start",control:o.a.createElement(r.a,{color:"primary"}),label:"Start",labelPlacement:"start"}),o.a.createElement(l.a,{value:"bottom",control:o.a.createElement(r.a,{color:"primary"}),label:"Bottom",labelPlacement:"bottom"}),o.a.createElement(l.a,{value:"end",control:o.a.createElement(r.a,{color:"primary"}),label:"End",labelPlacement:"end"})))}},3111:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport Switch from \'@material-ui/core/Switch\';\nimport FormGroup from \'@material-ui/core/FormGroup\';\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\nimport FormControl from \'@material-ui/core/FormControl\';\n\nexport default function FormControlLabelPosition() {\n  return (\n    <FormControl component="fieldset">\n      <FormGroup aria-label="position" row>\n        <FormControlLabel\n          value="top"\n          control={<Switch color="primary" />}\n          label="Top"\n          labelPlacement="top"\n        />\n        <FormControlLabel\n          value="start"\n          control={<Switch color="primary" />}\n          label="Start"\n          labelPlacement="start"\n        />\n        <FormControlLabel\n          value="bottom"\n          control={<Switch color="primary" />}\n          label="Bottom"\n          labelPlacement="bottom"\n        />\n        <FormControlLabel\n          value="end"\n          control={<Switch color="primary" />}\n          label="End"\n          labelPlacement="end"\n        />\n      </FormGroup>\n    </FormControl>\n  );\n}\n'},3493:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(1893),c=n(171),l=n(237),i=n(143),s=n(170),m=n(71),d=n(782),u=Object(d.a)((function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}}));t.default=function(e){var t=u();return o.a.createElement(l.a,{classes:{root:t.layoutRoot},header:o.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},o.a.createElement("div",{className:"flex flex-col"},o.a.createElement("div",{className:"flex items-center mb-16"},o.a.createElement(s.a,{className:"text-18",color:"action"},"home"),o.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),o.a.createElement(m.a,{color:"textSecondary"},"Documentation"),o.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),o.a.createElement(m.a,{color:"textSecondary"},"Material UI Components")),o.a.createElement(m.a,{variant:"h6"},"Switch")),o.a.createElement(i.a,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/switches",target:"_blank",role:"button"},o.a.createElement(s.a,null,"link"),o.a.createElement("span",{className:"mx-4"},"Reference"))),content:o.a.createElement("div",{className:"p-24 max-w-2xl"},o.a.createElement(m.a,{className:"text-44 mt-32 mb-8",component:"h1"},"Switch"),o.a.createElement(m.a,{className:"description"},"Switches toggle the state of a single setting on or off."),o.a.createElement(m.a,{className:"mb-16",component:"div"},o.a.createElement("a",{href:"https://material.io/design/components/selection-controls.html#switches"},"Switches")," are the preferred way to adjust settings on mobile. The option that the switch controls, as well as the state it\u2019s in, should be made clear from the corresponding inline label."),o.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Basic switches"),o.a.createElement(m.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(3100).default,raw:n(3101)})),o.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Switch with FormControlLabel"),o.a.createElement(m.a,{className:"mb-16",component:"div"},o.a.createElement("code",null,"Switch")," can be provided with a description thanks to the ",o.a.createElement("code",null,"FormControlLabel")," component."),o.a.createElement(m.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(3102).default,raw:n(3103)})),o.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Switches with FormGroup"),o.a.createElement(m.a,{className:"mb-16",component:"div"},o.a.createElement("code",null,"FormGroup")," is a helpful wrapper used to group selection controls components that provides an easier API. However, you are encouraged you to use ",o.a.createElement("a",{href:"/components/checkboxes/"},"Checkboxes")," instead if multiple related controls are required. (See: ",o.a.createElement("a",{href:"#when-to-use"},"When to use"),")."),o.a.createElement(m.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(3104).default,raw:n(3105)})),o.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Customized switches"),o.a.createElement(m.a,{className:"mb-16",component:"div"},"Here are some examples of customizing the component. You can learn more about this in the",o.a.createElement("a",{href:"/customization/components/"},"overrides documentation page"),"."),o.a.createElement(m.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(3106).default,raw:n(3107)})),o.a.createElement(m.a,{className:"mb-16",component:"div"},"\ud83c\udfa8 If you are looking for inspiration, you can check ",o.a.createElement("a",{href:"https://mui-treasury.com/styles/switch"},"MUI Treasury's customization examples"),"."),o.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Sizes"),o.a.createElement(m.a,{className:"mb-16",component:"div"},"Fancy smaller switches? Use the ",o.a.createElement("code",null,"size")," property."),o.a.createElement(m.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(3108).default,raw:n(3109)})),o.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Label placement"),o.a.createElement(m.a,{className:"mb-16",component:"div"},"You can change the placement of the label:"),o.a.createElement(m.a,{className:"mb-16",component:"div"},o.a.createElement(r.a,{className:"my-24",iframe:!1,component:n(3110).default,raw:n(3111)})),o.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"When to use"),o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{href:"https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8"},"Checkboxes vs. Switches"))),o.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Accessibility"),o.a.createElement("ul",null,o.a.createElement("li",null,"It will render an element with the ",o.a.createElement("code",null,"checkbox")," role not ",o.a.createElement("code",null,"switch")," role since this role isn't widely supported yet. Please test first if assistive technology of your target audience supports this role properly. Then you can change the role with",o.a.createElement("code",null,"<Switch inputProps={{ role: 'switch' }}>")),o.a.createElement("li",null,"All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the ",o.a.createElement("code",null,"<label>")," element (",o.a.createElement("a",{href:"/api/form-control-label/"},"FormControlLabel"),")."),o.a.createElement("li",null,"When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. ",o.a.createElement("code",null,"aria-label"),", ",o.a.createElement("code",null,"aria-labelledby"),", ",o.a.createElement("code",null,"title"),") via the ",o.a.createElement("code",null,"inputProps")," property.")),o.a.createElement(c.a,{component:"pre",className:"language-jsx"}," \n<Switch value=\"checkedA\" inputProps={{ 'aria-label': 'Switch A' }} />\n"))})}}}]);