(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[79718,12420],{29155:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var s=n(45991);function r(e){return(0,s.Z)(e)}},83168:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}});var t=n(45559),a=n.n(t);function s(){for(var e,t,n=0,s="";n<arguments.length;)(e=arguments[n++])&&(t=function e(t){var n,s,r="";if("string"==typeof t||"number"==typeof t)r+=t;else if("object"===a()(t))if(Array.isArray(t))for(n=0;n<t.length;n++)t[n]&&(s=e(t[n]))&&(r&&(r+=" "),r+=s);else for(n in t)t[n]&&(r&&(r+=" "),r+=n);return r}(e))&&(s&&(s+=" "),s+=t);return s}},96450:function(e,t,n){"use strict";var r=n(97439),a=n(78709),o=(n(16526),n(39863)),i=n(9665),l=n(17602);t.Z=function(e){var t=e.children,n=e.theme,s=(0,i.Z)();return e=a.useMemo(function(){var e,t,e=null===s?n:(e=s,"function"!=typeof(t=n)?(0,r.Z)((0,r.Z)({},e),t):t(e));return null!=e&&(e[l.Z]=null!==s),e},[n,s]),a.createElement(o.Z.Provider,{value:e},t)}},45991:function(e,t,n){"use strict";function s(e){return e}n.d(t,{Z:function(){return s}})},77759:function(e,t,n){"use strict";function s(e,t){var n,s;e.classList?e.classList.add(t):(s=t,((n=e).classList?s&&n.classList.contains(s):-1!==(" "+(n.className.baseVal||n.className)+" ").indexOf(" "+s+" "))||("string"==typeof e.className?e.className=e.className+" "+t:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+t)))}n.d(t,{Z:function(){return s}})},72060:function(e,t,n){"use strict";function s(e,t){return e.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function r(e,t){e.classList?e.classList.remove(t):"string"==typeof e.className?e.className=s(e.className,t):e.setAttribute("class",s(e.className&&e.className.baseVal||"",t))}n.d(t,{Z:function(){return r}})},96402:function(e,t,n){"use strict";function a(t,e){return t&&e&&e.split(" ").forEach(function(e){return(0,s.Z)(t,e)})}var r=n(97439),o=n(79736),i=n(2898),l=(n(16526),n(77759)),s=n(72060),c=n(78709),u=n(30765),n=function(s){function e(){for(var r,e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(r=s.call.apply(s,[this].concat(t))||this).appliedClasses={appear:{},enter:{},exit:{}},r.onEnter=function(e,t){var n=r.resolveArguments(e,t),s=n[0],n=n[1];r.removeClasses(s,"exit"),r.addClass(s,n?"appear":"enter","base"),r.props.onEnter&&r.props.onEnter(e,t)},r.onEntering=function(e,t){var n=r.resolveArguments(e,t),s=n[0],n=n[1];r.addClass(s,n?"appear":"enter","active"),r.props.onEntering&&r.props.onEntering(e,t)},r.onEntered=function(e,t){var n=r.resolveArguments(e,t),s=n[0],n=n[1]?"appear":"enter";r.removeClasses(s,n),r.addClass(s,n,"done"),r.props.onEntered&&r.props.onEntered(e,t)},r.onExit=function(e){var t=r.resolveArguments(e)[0];r.removeClasses(t,"appear"),r.removeClasses(t,"enter"),r.addClass(t,"exit","base"),r.props.onExit&&r.props.onExit(e)},r.onExiting=function(e){var t=r.resolveArguments(e)[0];r.addClass(t,"exit","active"),r.props.onExiting&&r.props.onExiting(e)},r.onExited=function(e){var t=r.resolveArguments(e)[0];r.removeClasses(t,"exit"),r.addClass(t,"exit","done"),r.props.onExited&&r.props.onExited(e)},r.resolveArguments=function(e,t){return r.props.nodeRef?[r.props.nodeRef.current,e]:[e,t]},r.getClassNames=function(e){var t=r.props.classNames,n="string"==typeof t,s=n?(n&&t?t+"-":"")+e:t[e];return{baseClassName:s,activeClassName:n?s+"-active":t[e+"Active"],doneClassName:n?s+"-done":t[e+"Done"]}},r}(0,i.Z)(e,s);var t=e.prototype;return t.addClass=function(e,t,n){var s,r=this.getClassNames(t)[n+"ClassName"],a=this.getClassNames("enter").doneClassName;"appear"===t&&"done"===n&&a&&(r+=" "+a),"active"===n&&e&&e.scrollTop,r&&(this.appliedClasses[t][n]=r,r=r,(s=e)&&r&&r.split(" ").forEach(function(e){return(0,l.Z)(s,e)}))},t.removeClasses=function(e,t){var n=this.appliedClasses[t],s=n.base,r=n.active,n=n.done;this.appliedClasses[t]={},s&&a(e,s),r&&a(e,r),n&&a(e,n)},t.render=function(){var e=this.props,e=(e.classNames,(0,o.Z)(e,["classNames"]));return c.createElement(u.ZP,(0,r.Z)({},e,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},e}(c.Component);n.defaultProps={classNames:""},n.propTypes={},t.Z=n},69796:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var s=n(51265),r=n.n(s),a=n(78709),o=n(40962),i=n(6274),t=n(70621),l=n(1644),c=n(92466),s=n(29796),u=n(66066);function p(e){var t=f();return a.createElement(l.Z,{display:"flex",alignItems:"center",className:t.progressBox},a.createElement(l.Z,{width:"100%",mr:1},a.createElement(d,r()({variant:"determinate"},e,{value:100}))),a.createElement(l.Z,{className:t.root},a.createElement(c.Z,null,e.label," ","".concat(Math.round(e.value),"%"))))}p.defaultProps={label:"Processing uploading file"};var f=(0,o.Z)({root:{position:"absolute",zIndex:"50",textAlign:"center",width:"100%",color:" white"},progressBox:{width:"300px",margin:"0 auto",position:"relative",top:"-20px"}}),d=(0,i.Z)({root:{height:36,width:300,backgroundColor:(0,t.$n)("#53b987",0),animation:"$myEffect 2s linear infinite",borderRadius:20,backgroundImage:"-webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent), color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent) )",backgroundSize:"50px 50px"},bar:{width:"100%",backgroundColor:"transparent"},"@keyframes myEffect":{"0%":{backgroundPosition:"0px 0px"},"100%":{backgroundPosition:"50px 50px"}}})(s.Z);function m(e){var t=e.progress,n=e.label,e=(0,u.useStyles)();return a.createElement("div",{className:e.root},a.createElement(p,{color:"secondary",label:n,value:t}))}}}]);