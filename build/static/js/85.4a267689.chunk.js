(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[85],{1853:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FrameContextConsumer=e.FrameContextProvider=e.FrameContext=void 0;var a,r=n(0),o=(a=r)&&a.__esModule?a:{default:a};var l=void 0,i=void 0;"undefined"!==typeof document&&(l=document),"undefined"!==typeof window&&(i=window);var c=e.FrameContext=o.default.createContext({document:l,window:i}),s=c.Provider,u=c.Consumer;e.FrameContextProvider=s,e.FrameContextConsumer=u},1855:function(t,e,n){"use strict";n.d(e,"a",(function(){return S}));var a=n(8),r=n(179),o=n(1783),l=n(1790),i=n(113),c=n(1847),s=n(1848),u=n(0),d=n.n(u),m=n(12),p=n(2),f=n(96),h=n(97),b=n(161),v=n(160),y=n(1771),g=n(919),C=n(1812),E=n(1837),x=n(7),w=n(224),j=n(602),O=n(1856),_=n.n(O),N=Object(y.a)({productionPrefix:"iframe-"}),P=function(t){Object(b.a)(n,t);var e=Object(v.a)(n);function n(){var t;Object(f.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))).state={ready:!1},t.handleRef=function(e){t.contentDocument=e?e.node.contentDocument:null},t.onContentDidMount=function(){t.setState({ready:!0,jss:Object(w.b)(Object(p.a)(Object(p.a)({},Object(g.a)()),{},{plugins:[].concat(Object(m.a)(Object(g.a)().plugins),[Object(j.a)()]),insertionPoint:t.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:t.contentDocument.body})},t.onContentDidUpdate=function(){t.contentDocument.body.dir=t.props.theme.direction},t.renderHead=function(){return d.a.createElement(d.a.Fragment,null,d.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),d.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},t}return Object(h.a)(n,[{key:"render",value:function(){var t=this.props,e=t.children,n=t.classes,a=t.theme;return d.a.createElement(_.a,{head:this.renderHead(),ref:this.handleRef,className:n.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?d.a.createElement(C.b,{jss:this.state.jss,generateClassName:N,sheetsManager:this.state.sheetsManager},d.a.createElement(E.a,{theme:a},d.a.cloneElement(e,{container:this.state.container}))):null)}}]),n}(d.a.Component),M=Object(x.a)((function(t){return{root:{backgroundColor:t.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:t.shadows[1]}}}),{withTheme:!0})(P);function D(t){var e=Object(u.useState)(t.currentTabIndex),n=Object(a.a)(e,2),m=n[0],p=n[1],f=t.component,h=t.raw,b=t.iframe,v=t.className;return d.a.createElement(l.a,{className:v},d.a.createElement(o.a,{position:"static",color:"default",elevation:0},d.a.createElement(s.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:m,onChange:function(t,e){p(e)}},f&&d.a.createElement(c.a,{classes:{root:"min-w-64"},icon:d.a.createElement(i.a,null,"remove_red_eye")}),h&&d.a.createElement(c.a,{classes:{root:"min-w-64"},icon:d.a.createElement(i.a,null,"code")}))),d.a.createElement("div",{className:"flex justify-center"},d.a.createElement("div",{className:0===m?"flex flex-1":"hidden"},f&&(b?d.a.createElement(M,null,d.a.createElement(f,null)):d.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},d.a.createElement(f,null)))),d.a.createElement("div",{className:1===m?"flex flex-1":"hidden"},h&&d.a.createElement("div",{className:"flex flex-1"},d.a.createElement(r.a,{component:"pre",className:"language-javascript w-full"},h.default)))))}D.defaultProps={currentTabIndex:0};var S=D},1856:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FrameContextConsumer=e.FrameContext=void 0;var a=n(1853);Object.defineProperty(e,"FrameContext",{enumerable:!0,get:function(){return a.FrameContext}}),Object.defineProperty(e,"FrameContextConsumer",{enumerable:!0,get:function(){return a.FrameContextConsumer}});var r,o=n(1857),l=(r=o)&&r.__esModule?r:{default:r};e.default=l.default},1857:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}(),o=n(0),l=d(o),i=d(n(25)),c=d(n(4)),s=n(1853),u=d(n(1858));function d(t){return t&&t.__esModule?t:{default:t}}var m=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var a=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return a.handleLoad=function(){a.forceUpdate()},a._isMounted=!1,a}return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),r(e,[{key:"componentDidMount",value:function(){this._isMounted=!0;var t=this.getDoc();t&&"complete"===t.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var t=this.getDoc();return this.props.mountTarget?t.querySelector(this.props.mountTarget):t.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var t=this.getDoc();if(!t)return null;var e=this.props.contentDidMount,n=this.props.contentDidUpdate,a=t.defaultView||t.parentView,r=l.default.createElement(u.default,{contentDidMount:e,contentDidUpdate:n},l.default.createElement(s.FrameContextProvider,{value:{document:t,window:a}},l.default.createElement("div",{className:"frame-content"},this.props.children)));t.body.children.length<1&&(t.open("text/html","replace"),t.write(this.props.initialContent),t.close());var o=this.getMountTarget();return[i.default.createPortal(this.props.head,this.getDoc().head),i.default.createPortal(r,o)]}},{key:"render",value:function(){var t=this,e=a({},this.props,{children:void 0});return delete e.head,delete e.initialContent,delete e.mountTarget,delete e.contentDidMount,delete e.contentDidUpdate,l.default.createElement("iframe",a({},e,{ref:function(e){t.node=e}}),this.renderFrameContents())}}]),e}(o.Component);m.propTypes={style:c.default.object,head:c.default.node,initialContent:c.default.string,mountTarget:c.default.string,contentDidMount:c.default.func,contentDidUpdate:c.default.func,children:c.default.oneOfType([c.default.element,c.default.arrayOf(c.default.element)])},m.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},e.default=m},1858:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}(),r=n(0),o=(l(r),l(n(4)));function l(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}var s=function(t){function e(){return i(this,e),c(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),a(e,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return r.Children.only(this.props.children)}}]),e}(r.Component);s.propTypes={children:o.default.element.isRequired,contentDidMount:o.default.func.isRequired,contentDidUpdate:o.default.func.isRequired},e.default=s},2370:function(t,e,n){"use strict";n.r(e);var a=n(8),r=n(613),o=n(74),l=n(0),i=n.n(l),c=["Sea","Sky","Forest","Aerial","Art"].map((function(t){return{value:t,label:t}}));e.default=function(){var t=Object(l.useState)([{value:"nature",label:"Nature"},{value:"city",label:"City"},{value:"landscape",label:"Landscape"}]),e=Object(a.a)(t,2),n=e[0],s=e[1];function u(t){s(t)}return i.a.createElement("div",{className:"w-full max-w-sm pt-64 pb-224"},i.a.createElement(o.a,{className:"text-24 mt-24 mb-8",component:"h2"},"Standart"),i.a.createElement(r.a,{className:"w-full my-16",value:n,onChange:u,placeholder:"Select multiple tags",textFieldProps:{label:"Tags",InputLabelProps:{shrink:!0},variant:"standard"},options:c,isMulti:!0}),i.a.createElement(o.a,{className:"text-24 mt-24 mb-8",component:"h2"},"Outlined"),i.a.createElement(r.a,{className:"w-full my-16",value:n,onChange:u,placeholder:"Select multiple tags",textFieldProps:{label:"Tags",InputLabelProps:{shrink:!0},variant:"outlined"},options:c,isMulti:!0}),i.a.createElement(o.a,{className:"text-24 mt-24 mb-8",component:"h2"},"Filled"),i.a.createElement(r.a,{className:"w-full my-16",value:n,onChange:u,placeholder:"Select multiple tags",textFieldProps:{label:"Tags",InputLabelProps:{shrink:!0},variant:"filled"},options:c,isMulti:!0}))}},2371:function(t,e,n){"use strict";n.r(e),e.default="import FuseChipSelect from '@fuse/core/FuseChipSelect';\nimport Typography from '@material-ui/core/Typography';\nimport React, { useState } from 'react';\n\nconst suggestions = ['Sea', 'Sky', 'Forest', 'Aerial', 'Art'].map(item => ({\n\tvalue: item,\n\tlabel: item\n}));\n\nfunction SimpleExample() {\n\tconst [tags, setTags] = useState([\n\t\t{\n\t\t\tvalue: 'nature',\n\t\t\tlabel: 'Nature'\n\t\t},\n\t\t{\n\t\t\tvalue: 'city',\n\t\t\tlabel: 'City'\n\t\t},\n\t\t{\n\t\t\tvalue: 'landscape',\n\t\t\tlabel: 'Landscape'\n\t\t}\n\t]);\n\n\tfunction handleChipChange(value) {\n\t\tsetTags(value);\n\t}\n\n\treturn (\n\t\t<div className=\"w-full max-w-sm pt-64 pb-224\">\n\t\t\t<Typography className=\"text-24 mt-24 mb-8\" component=\"h2\">\n\t\t\t\tStandart\n\t\t\t</Typography>\n\n\t\t\t<FuseChipSelect\n\t\t\t\tclassName=\"w-full my-16\"\n\t\t\t\tvalue={tags}\n\t\t\t\tonChange={handleChipChange}\n\t\t\t\tplaceholder=\"Select multiple tags\"\n\t\t\t\ttextFieldProps={{\n\t\t\t\t\tlabel: 'Tags',\n\t\t\t\t\tInputLabelProps: {\n\t\t\t\t\t\tshrink: true\n\t\t\t\t\t},\n\t\t\t\t\tvariant: 'standard'\n\t\t\t\t}}\n\t\t\t\toptions={suggestions}\n\t\t\t\tisMulti\n\t\t\t/>\n\n\t\t\t<Typography className=\"text-24 mt-24 mb-8\" component=\"h2\">\n\t\t\t\tOutlined\n\t\t\t</Typography>\n\n\t\t\t<FuseChipSelect\n\t\t\t\tclassName=\"w-full my-16\"\n\t\t\t\tvalue={tags}\n\t\t\t\tonChange={handleChipChange}\n\t\t\t\tplaceholder=\"Select multiple tags\"\n\t\t\t\ttextFieldProps={{\n\t\t\t\t\tlabel: 'Tags',\n\t\t\t\t\tInputLabelProps: {\n\t\t\t\t\t\tshrink: true\n\t\t\t\t\t},\n\t\t\t\t\tvariant: 'outlined'\n\t\t\t\t}}\n\t\t\t\toptions={suggestions}\n\t\t\t\tisMulti\n\t\t\t/>\n\n\t\t\t<Typography className=\"text-24 mt-24 mb-8\" component=\"h2\">\n\t\t\t\tFilled\n\t\t\t</Typography>\n\n\t\t\t<FuseChipSelect\n\t\t\t\tclassName=\"w-full my-16\"\n\t\t\t\tvalue={tags}\n\t\t\t\tonChange={handleChipChange}\n\t\t\t\tplaceholder=\"Select multiple tags\"\n\t\t\t\ttextFieldProps={{\n\t\t\t\t\tlabel: 'Tags',\n\t\t\t\t\tInputLabelProps: {\n\t\t\t\t\t\tshrink: true\n\t\t\t\t\t},\n\t\t\t\t\tvariant: 'filled'\n\t\t\t\t}}\n\t\t\t\toptions={suggestions}\n\t\t\t\tisMulti\n\t\t\t/>\n\t\t</div>\n\t);\n}\n\nexport default SimpleExample;\n"},3319:function(t,e,n){"use strict";n.r(e);var a=n(1855),r=n(249),o=n(113),l=n(74),i=n(0),c=n.n(i),s=n(35);e.default=function(){return c.a.createElement(r.a,{header:c.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},c.a.createElement("div",{className:"flex flex-col"},c.a.createElement("div",{className:"flex items-center mb-16"},c.a.createElement(o.a,{className:"text-18",color:"action"},"home"),c.a.createElement(o.a,{className:"text-16",color:"action"},"chevron_right"),c.a.createElement(l.a,{color:"textSecondary"},"Documentation"),c.a.createElement(o.a,{className:"text-16",color:"action"},"chevron_right"),c.a.createElement(l.a,{color:"textSecondary"},"Fuse Components")),c.a.createElement(l.a,{variant:"h6"},"FuseChipSelect"))),content:c.a.createElement("div",{className:"p-24 max-w-2xl"},c.a.createElement(l.a,{className:"mb-16",component:"p"},c.a.createElement("code",null,"FuseChipSelect")," is a multiple chip select component which uses react-select and material-ui Chip."),c.a.createElement("hr",null),c.a.createElement(l.a,{className:"mt-32 mb-8",variant:"h5"},"Example Usages"),c.a.createElement(a.a,{className:"mb-64",component:n(2370).default,raw:n(2371)}),c.a.createElement(l.a,{className:"mt-32 mb-8",variant:"h5"},"Demos"),c.a.createElement("ul",null,c.a.createElement("li",{className:"mb-8"},c.a.createElement(s.a,{to:"/apps/e-commerce/products/1"},"E-Commerce Product Page"))))})}}}]);