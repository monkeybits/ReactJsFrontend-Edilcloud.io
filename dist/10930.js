(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[10930],{10930:function(e,t,n){"use strict";function f(e){e=e.getBoundingClientRect();return{width:e.width,height:e.height,top:e.top,right:e.right,bottom:e.bottom,left:e.left,x:e.left,y:e.top}}function m(e){if("[object Window]"===e.toString())return e;e=e.ownerDocument;return e&&e.defaultView||window}function p(e){e=m(e);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function l(e){return e instanceof m(e).Element||e instanceof Element}function d(e){return e instanceof m(e).HTMLElement||e instanceof HTMLElement}function s(e){return e?(e.nodeName||"").toLowerCase():null}function v(e){return((l(e)?e.ownerDocument:e.document)||window.document).documentElement}function h(e){return f(v(e)).left+p(e).scrollLeft}function g(e){return m(e).getComputedStyle(e)}function c(e){var t=g(e),n=t.overflow,e=t.overflowX,t=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+t+e)}function b(e,t,n){void 0===n&&(n=!1);var r=v(t),o=f(e),i=d(t),a={scrollLeft:0,scrollTop:0},e={x:0,y:0};return!i&&(i||n)||("body"===s(t)&&!c(r)||(a=(n=t)!==m(n)&&d(n)?{scrollLeft:n.scrollLeft,scrollTop:n.scrollTop}:p(n)),d(t)?((e=f(t)).x+=t.clientLeft,e.y+=t.clientTop):r&&(e.x=h(r))),{x:o.left+a.scrollLeft-e.x,y:o.top+a.scrollTop-e.y,width:o.width,height:o.height}}function E(e){return{x:e.offsetLeft,y:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight}}function a(e){return"html"===s(e)?e:e.assignedSlot||e.parentNode||e.host||v(e)}function y(e,t){void 0===t&&(t=[]);var n=function e(t){return 0<=["html","body","#document"].indexOf(s(t))?t.ownerDocument.body:d(t)&&c(t)?t:e(a(t))}(e),r="body"===s(n),e=m(n),n=r?[e].concat(e.visualViewport||[],c(n)?n:[]):n,t=t.concat(n);return r?t:t.concat(y(a(n)))}function r(e){if(!d(e)||"fixed"===g(e).position)return null;var t=e.offsetParent;if(t){e=v(t);if("body"===s(t)&&"static"===g(t).position&&"static"!==g(e).position)return e}return t}function j(e){for(var t=m(e),n=r(e);n&&0<=["table","td","th"].indexOf(s(n))&&"static"===g(n).position;)n=r(n);return(!n||"body"!==s(n)||"static"!==g(n).position)&&(n||function(e){for(var t=a(e);d(t)&&["html","body"].indexOf(s(t))<0;){var n=g(t);if("none"!==n.transform||"none"!==n.perspective||n.willChange&&"auto"!==n.willChange)return t;t=t.parentNode}return null}(e))||t}n.d(t,{ZP:function(){return ft}});var D="top",L="bottom",k="right",C="left",M="auto",P=[D,L,k,C],R="start",u="end",O="clippingParents",w="viewport",x="popper",T="reference",S=P.reduce(function(e,t){return e.concat([t+"-"+R,t+"-"+u])},[]),H=[].concat(P,[M]).reduce(function(e,t){return e.concat([t,t+"-"+R,t+"-"+u])},[]),A=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function V(e){var n=new Map,r=new Set,o=[];return e.forEach(function(e){n.set(e.name,e)}),e.forEach(function(e){r.has(e.name)||!function t(e){r.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach(function(e){r.has(e)||(e=n.get(e))&&t(e)}),o.push(e)}(e)}),o}var B={placement:"bottom",modifiers:[],strategy:"absolute"};function W(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(e){return!(e&&"function"==typeof e.getBoundingClientRect)})}function o(e){var t=(e=void 0===e?{}:e).defaultModifiers,f=void 0===t?[]:t,e=e.defaultOptions,d=void 0===e?B:e;return function(r,o,t){void 0===t&&(t=d);var n,i,a={placement:"bottom",orderedModifiers:[],options:Object.assign(Object.assign({},B),d),modifiersData:{},elements:{reference:r,popper:o},attributes:{},styles:{}},s=[],c=!1,u={state:a,setOptions:function(e){p(),a.options=Object.assign(Object.assign(Object.assign({},d),a.options),e),a.scrollParents={reference:l(r)?y(r):r.contextElement?y(r.contextElement):[],popper:y(o)};var n,t,e=(e=[].concat(f,a.options.modifiers),t=e.reduce(function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign(Object.assign(Object.assign({},n),t),{},{options:Object.assign(Object.assign({},n.options),t.options),data:Object.assign(Object.assign({},n.data),t.data)}):t,e},{}),e=Object.keys(t).map(function(e){return t[e]}),n=V(e),A.reduce(function(e,t){return e.concat(n.filter(function(e){return e.phase===t}))},[]));return a.orderedModifiers=e.filter(function(e){return e.enabled}),a.orderedModifiers.forEach(function(e){var t=e.name,n=e.options,e=e.effect;"function"==typeof e&&(n=e({state:a,name:t,instance:u,options:void 0===n?{}:n}),s.push(n||function(){}))}),u.update()},forceUpdate:function(){if(!c){var e=a.elements,t=e.reference,e=e.popper;if(W(t,e)){a.rects={reference:b(t,j(e),"fixed"===a.options.strategy),popper:E(e)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach(function(e){return a.modifiersData[e.name]=Object.assign({},e.data)});for(var n,r,o,i=0;i<a.orderedModifiers.length;i++)0,!0!==a.reset?(n=(o=a.orderedModifiers[i]).fn,r=o.options,o=o.name,"function"==typeof n&&(a=n({state:a,options:void 0===r?{}:r,name:o,instance:u})||a)):(a.reset=!1,i=-1)}}},update:(n=function(){return new Promise(function(e){u.forceUpdate(),e(a)})},function(){return i=i||new Promise(function(e){Promise.resolve().then(function(){i=void 0,e(n())})})}),destroy:function(){p(),c=!0}};return W(r,o)&&u.setOptions(t).then(function(e){!c&&t.onFirstUpdate&&t.onFirstUpdate(e)}),u;function p(){s.forEach(function(e){return e()}),s=[]}}}var _={passive:!0};function N(e){return e.split("-")[0]}function I(e){return e.split("-")[1]}function q(e){return 0<=["top","bottom"].indexOf(e)?"x":"y"}function U(e){var t,n=e.reference,r=e.element,o=e.placement,e=o?N(o):null,o=o?I(o):null,i=n.x+n.width/2-r.width/2,a=n.y+n.height/2-r.height/2;switch(e){case D:t={x:i,y:n.y-r.height};break;case L:t={x:i,y:n.y+n.height};break;case k:t={x:n.x+n.width,y:a};break;case C:t={x:n.x-r.width,y:a};break;default:t={x:n.x,y:n.y}}var s=e?q(e):null;if(null!=s){var c="y"===s?"height":"width";switch(o){case R:t[s]=t[s]-(n[c]/2-r[c]/2);break;case u:t[s]=t[s]+(n[c]/2-r[c]/2)}}return t}var $={top:"auto",right:"auto",bottom:"auto",left:"auto"};function i(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.offsets,a=e.position,s=e.gpuAcceleration,c=e.adaptive,u=e.roundOffsets?(t=(l=i).x,d=l.y,l=window.devicePixelRatio||1,{x:Math.round(t*l)/l||0,y:Math.round(d*l)/l||0}):i,p=u.x,f=void 0===p?0:p,e=u.y,t=void 0===e?0:e,d=i.hasOwnProperty("x"),l=i.hasOwnProperty("y"),p=C,u=D,e=window;c&&((i=j(n))===m(n)&&(i=v(n)),o===D&&(u=L,t-=i.clientHeight-r.height,t*=s?1:-1),o===C&&(p=k,f-=i.clientWidth-r.width,f*=s?1:-1));var c=Object.assign({position:a},c&&$);return s?Object.assign(Object.assign({},c),{},((s={})[u]=l?"0":"",s[p]=d?"0":"",s.transform=(e.devicePixelRatio||1)<2?"translate("+f+"px, "+t+"px)":"translate3d("+f+"px, "+t+"px, 0)",s)):Object.assign(Object.assign({},c),{},((c={})[u]=l?t+"px":"",c[p]=d?f+"px":"",c.transform="",c))}var F={left:"right",right:"left",bottom:"top",top:"bottom"};function z(e){return e.replace(/left|right|bottom|top/g,function(e){return F[e]})}var X={start:"end",end:"start"};function Y(e){return e.replace(/start|end/g,function(e){return X[e]})}function J(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&((n=n)instanceof m(n).ShadowRoot||n instanceof ShadowRoot)){var r=t;do{if(r&&e.isSameNode(r))return!0}while(r=r.parentNode||r.host)}return!1}function Z(e){return Object.assign(Object.assign({},e),{},{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function G(e,t){return t===w?Z((i=m(o=e),a=v(o),s=i.visualViewport,c=a.clientWidth,u=a.clientHeight,a=i=0,s&&(c=s.width,u=s.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(i=s.offsetLeft,a=s.offsetTop)),{width:c,height:u,x:i+h(o),y:a})):d(t)?((r=f(n=t)).top=r.top+n.clientTop,r.left=r.left+n.clientLeft,r.bottom=r.top+n.clientHeight,r.right=r.left+n.clientWidth,r.width=n.clientWidth,r.height=n.clientHeight,r.x=r.left,r.y=r.top,r):Z((o=v(e),a=v(o),t=p(o),n=o.ownerDocument.body,r=Math.max(a.scrollWidth,a.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),e=Math.max(a.scrollHeight,a.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),o=-t.scrollLeft+h(o),t=-t.scrollTop,"rtl"===g(n||a).direction&&(o+=Math.max(a.clientWidth,n?n.clientWidth:0)-r),{width:r,height:e,x:o,y:t}));var n,r,o,i,a,s,c,u}function K(n,e,t){var r,o,i,e="clippingParents"===e?(o=y(a(r=n)),l(i=0<=["absolute","fixed"].indexOf(g(r).position)&&d(r)?j(r):r)?o.filter(function(e){return l(e)&&J(e,i)&&"body"!==s(e)}):[]):[].concat(e),e=[].concat(e,[t]),t=e[0],t=e.reduce(function(e,t){t=G(n,t);return e.top=Math.max(t.top,e.top),e.right=Math.min(t.right,e.right),e.bottom=Math.min(t.bottom,e.bottom),e.left=Math.max(t.left,e.left),e},G(n,t));return t.width=t.right-t.left,t.height=t.bottom-t.top,t.x=t.left,t.y=t.top,t}function Q(){return{top:0,right:0,bottom:0,left:0}}function ee(e){return Object.assign(Object.assign({},Q()),e)}function te(n,e){return e.reduce(function(e,t){return e[t]=n,e},{})}function ne(e,t){var r,n=(t=void 0===t?{}:t).placement,o=void 0===n?e.placement:n,i=t.boundary,a=void 0===i?O:i,s=t.rootBoundary,c=void 0===s?w:s,u=t.elementContext,n=void 0===u?x:u,i=t.altBoundary,s=void 0!==i&&i,u=t.padding,i=void 0===u?0:u,t=ee("number"!=typeof i?i:te(i,P)),u=e.elements.reference,i=e.rects.popper,s=e.elements[s?n===x?T:x:n],a=K(l(s)?s:s.contextElement||v(e.elements.popper),a,c),c=f(u),u=U({reference:c,element:i,strategy:"absolute",placement:o}),u=Z(Object.assign(Object.assign({},i),u)),c=n===x?u:c,p={top:a.top-c.top+t.top,bottom:c.bottom-a.bottom+t.bottom,left:a.left-c.left+t.left,right:c.right-a.right+t.right},e=e.modifiersData.offset;return n===x&&e&&(r=e[o],Object.keys(p).forEach(function(e){var t=0<=[k,L].indexOf(e)?1:-1,n=0<=[D,L].indexOf(e)?"y":"x";p[e]+=r[n]*t})),p}function re(e,t,n){return Math.max(e,Math.min(t,n))}function oe(e,t,n){return{top:e.top-t.height-(n=void 0===n?{x:0,y:0}:n).y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ie(t){return[D,k,L,C].some(function(e){return 0<=t[e]})}var ae=o({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=void 0===(e=r.scroll)||e,i=void 0===(r=r.resize)||r,a=m(t.elements.popper),s=[].concat(t.scrollParents.reference,t.scrollParents.popper);return o&&s.forEach(function(e){e.addEventListener("scroll",n.update,_)}),i&&a.addEventListener("resize",n.update,_),function(){o&&s.forEach(function(e){e.removeEventListener("scroll",n.update,_)}),i&&a.removeEventListener("resize",n.update,_)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,e=e.name;t.modifiersData[e]=U({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,e=void 0===(r=n.gpuAcceleration)||r,r=void 0===(r=n.adaptive)||r,n=void 0===(n=n.roundOffsets)||n,e={placement:N(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:e};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign(Object.assign({},t.styles.popper),i(Object.assign(Object.assign({},e),{},{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:r,roundOffsets:n})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign(Object.assign({},t.styles.arrow),i(Object.assign(Object.assign({},e),{},{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:n})))),t.attributes.popper=Object.assign(Object.assign({},t.attributes.popper),{},{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var o=e.state;Object.keys(o.elements).forEach(function(e){var t=o.styles[e]||{},n=o.attributes[e]||{},r=o.elements[e];d(r)&&s(r)&&(Object.assign(r.style,t),Object.keys(n).forEach(function(e){var t=n[e];!1===t?r.removeAttribute(e):r.setAttribute(e,!0===t?"":t)}))})},effect:function(e){var r=e.state,o={popper:{position:r.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(r.elements.popper.style,o.popper),r.elements.arrow&&Object.assign(r.elements.arrow.style,o.arrow),function(){Object.keys(r.elements).forEach(function(e){var t=r.elements[e],n=r.attributes[e]||{},e=Object.keys((r.styles.hasOwnProperty(e)?r.styles:o)[e]).reduce(function(e,t){return e[t]="",e},{});d(t)&&s(t)&&(Object.assign(t.style,e),Object.keys(n).forEach(function(e){t.removeAttribute(e)}))})}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var a=e.state,t=e.options,n=e.name,s=void 0===(r=t.offset)?[0,0]:r,e=H.reduce(function(e,t){var n,r,o,i;return e[t]=(n=t,r=a.rects,o=s,i=N(n),t=0<=[C,D].indexOf(i)?-1:1,o=(o=(n="function"==typeof o?o(Object.assign(Object.assign({},r),{},{placement:n})):o)[0])||0,n=((n=n[1])||0)*t,0<=[C,k].indexOf(i)?{x:n,y:o}:{x:o,y:n}),e},{}),r=(t=e[a.placement]).x,t=t.y;null!=a.modifiersData.popperOffsets&&(a.modifiersData.popperOffsets.x+=r,a.modifiersData.popperOffsets.y+=t),a.modifiersData[n]=e}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var f=e.state,t=e.options,n=e.name;if(!f.modifiersData[n]._skip){for(var r=t.mainAxis,o=void 0===r||r,e=t.altAxis,i=void 0===e||e,r=t.fallbackPlacements,d=t.padding,l=t.boundary,m=t.rootBoundary,a=t.altBoundary,e=t.flipVariations,v=void 0===e||e,h=t.allowedAutoPlacements,e=f.options.placement,t=N(e),t=r||(t===e||!v?[z(e)]:function(e){if(N(e)===M)return[];var t=z(e);return[Y(e),t,Y(t)]}(e)),s=[e].concat(t).reduce(function(e,t){return e.concat(N(t)===M?(n=f,o=(r=void 0===(r={placement:t,boundary:l,rootBoundary:m,padding:d,flipVariations:v,allowedAutoPlacements:h})?{}:r).placement,i=r.boundary,a=r.rootBoundary,s=r.padding,e=r.flipVariations,c=void 0===(r=r.allowedAutoPlacements)?H:r,u=I(o),o=u?e?S:S.filter(function(e){return I(e)===u}):P,p=(e=0===(e=o.filter(function(e){return 0<=c.indexOf(e)})).length?o:e).reduce(function(e,t){return e[t]=ne(n,{placement:t,boundary:i,rootBoundary:a,padding:s})[N(t)],e},{}),Object.keys(p).sort(function(e,t){return p[e]-p[t]})):t);var n,r,o,i,a,s,c,u,p},[]),c=f.rects.reference,u=f.rects.popper,p=new Map,g=!0,b=s[0],y=0;y<s.length;y++){var O=s[y],w=N(O),x=I(O)===R,E=0<=[D,L].indexOf(w),j=E?"width":"height",T=ne(f,{placement:O,boundary:l,rootBoundary:m,altBoundary:a,padding:d}),E=E?x?k:C:x?L:D;c[j]>u[j]&&(E=z(E));x=z(E),j=[];if(o&&j.push(T[w]<=0),i&&j.push(T[E]<=0,T[x]<=0),j.every(function(e){return e})){b=O,g=!1;break}p.set(O,j)}if(g)for(var A=v?3:1;0<A;A--)if("break"===function(t){var e=s.find(function(e){e=p.get(e);if(e)return e.slice(0,t).every(function(e){return e})});if(e)return b=e,"break"}(A))break;f.placement!==b&&(f.modifiersData[n]._skip=!0,f.placement=b,f.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=void 0===(O=n.mainAxis)||O,i=void 0!==(w=n.altAxis)&&w,a=n.boundary,s=n.rootBoundary,c=n.altBoundary,u=n.padding,p=void 0===(x=n.tether)||x,f=n.tetherOffset,d=void 0===f?0:f,l=ne(t,{boundary:a,rootBoundary:s,padding:u,altBoundary:c}),m=N(t.placement),v=I(t.placement),h=!v,g=q(m),b="x"===g?"y":"x",y=t.modifiersData.popperOffsets,e=t.rects.reference,O=t.rects.popper,w="function"==typeof d?d(Object.assign(Object.assign({},t.rects),{},{placement:t.placement})):d,x={x:0,y:0};y&&(o&&(n="y"===g?"height":"width",f=y[g],s=y[g]+l[a="y"===g?D:C],c=y[g]-l[u="y"===g?L:k],m=p?-O[n]/2:0,d=(v===R?e:O)[n],o=v===R?-O[n]:-e[n],v=t.elements.arrow,O=p&&v?E(v):{width:0,height:0},a=(v=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Q())[a],u=v[u],O=re(0,e[n],O[n]),a=h?e[n]/2-m-O-a-w:d-O-a-w,O=h?-e[n]/2+m+O+u+w:o+O+u+w,w=(u=t.elements.arrow&&j(t.elements.arrow))?"y"===g?u.clientTop||0:u.clientLeft||0:0,u=t.modifiersData.offset?t.modifiersData.offset[t.placement][g]:0,w=y[g]+a-u-w,u=y[g]+O-u,c=re(p?Math.min(s,w):s,f,p?Math.max(c,u):c),y[g]=c,x[g]=c-f),i&&(g=re((i=y[b])+l["x"===g?D:C],i,i-l["x"===g?L:k]),y[b]=g,x[b]=g-i),t.modifiersData[r]=x)},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n,r,o=e.state,i=e.name,a=o.elements.arrow,s=o.modifiersData.popperOffsets,c=N(o.placement),u=q(c),p=0<=[C,k].indexOf(c)?"height":"width";a&&s&&(t=o.modifiersData[i+"#persistent"].padding,n=E(a),r="y"===u?D:C,e="y"===u?L:k,c=o.rects.reference[p]+o.rects.reference[u]-s[u]-o.rects.popper[p],s=s[u]-o.rects.reference[u],a=(a=j(a))?"y"===u?a.clientHeight||0:a.clientWidth||0:0,r=t[r],e=a-n[p]-t[e],e=re(r,s=a/2-n[p]/2+(c/2-s/2),e),o.modifiersData[i]=((i={})[u]=e,i.centerOffset=e-s,i))},effect:function(e){var t=e.state,n=e.options,r=e.name,e=void 0===(e=n.element)?"[data-popper-arrow]":e,n=void 0===(n=n.padding)?0:n;null!=e&&("string"!=typeof e||(e=t.elements.popper.querySelector(e)))&&J(t.elements.popper,e)&&(t.elements.arrow=e,t.modifiersData[r+"#persistent"]={padding:ee("number"!=typeof n?n:te(n,P))})},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=ne(t,{elementContext:"reference"}),e=ne(t,{altBoundary:!0}),r=oe(a,r),e=oe(e,o,i),o=ie(r),i=ie(e);t.modifiersData[n]={referenceClippingOffsets:r,popperEscapeOffsets:e,isReferenceHidden:o,hasPopperEscaped:i},t.attributes.popper=Object.assign(Object.assign({},t.attributes.popper),{},{"data-popper-reference-hidden":o,"data-popper-escaped":i})}}]}),se="tippy-content",ce="tippy-backdrop",ue="tippy-arrow",pe="tippy-svg-arrow",fe={passive:!0,capture:!0};function de(e,t,n){if(Array.isArray(e)){var r=e[t];return null==r?Array.isArray(n)?n[t]:n:r}return e}function le(e,t){e={}.toString.call(e);return 0===e.indexOf("[object")&&-1<e.indexOf(t+"]")}function me(e,t){return"function"==typeof e?e.apply(void 0,t):e}function ve(t,n){return 0===n?t:function(e){clearTimeout(r),r=setTimeout(function(){t(e)},n)};var r}function he(e,t){var n=Object.assign({},e);return t.forEach(function(e){delete n[e]}),n}function ge(e){return[].concat(e)}function be(e,t){-1===e.indexOf(t)&&e.push(t)}function ye(e){return e.split("-")[0]}function Oe(e){return[].slice.call(e)}function we(){return document.createElement("div")}function xe(t){return["Element","Fragment"].some(function(e){return le(t,e)})}function Ee(e){return le(e,"MouseEvent")}function je(e){return e&&e._tippy&&e._tippy.reference===e}function Te(e){return xe(e)?[e]:le(e,"NodeList")?Oe(e):Array.isArray(e)?e:Oe(document.querySelectorAll(e))}function Ae(e,t){e.forEach(function(e){e&&(e.style.transitionDuration=t+"ms")})}function De(e,t){e.forEach(function(e){e&&e.setAttribute("data-state",t)})}function Le(e){e=ge(e)[0];return e&&e.ownerDocument||document}function ke(t,e,n){var r=e+"EventListener";["transitionend","webkitTransitionEnd"].forEach(function(e){t[r](e,n)})}var Ce={isTouch:!1},Me=0;function Pe(){Ce.isTouch||(Ce.isTouch=!0,window.performance&&document.addEventListener("mousemove",Re))}function Re(){var e=performance.now();e-Me<20&&(Ce.isTouch=!1,document.removeEventListener("mousemove",Re)),Me=e}function Se(){var e,t=document.activeElement;je(t)&&(e=t._tippy,t.blur&&!e.state.isVisible&&t.blur())}var He="undefined"!=typeof window&&"undefined"!=typeof document?navigator.userAgent:"",Ve=/MSIE |Trident\//.test(He);var Be={animateFill:!1,followCursor:!1,inlinePositioning:!1,sticky:!1},We=Object.assign({appendTo:function(){return document.body},aria:{content:"auto",expanded:"auto"},delay:0,duration:[300,250],getReferenceClientRect:null,hideOnClick:!0,ignoreAttributes:!1,interactive:!1,interactiveBorder:2,interactiveDebounce:0,moveTransition:"",offset:[0,10],onAfterUpdate:function(){},onBeforeUpdate:function(){},onCreate:function(){},onDestroy:function(){},onHidden:function(){},onHide:function(){},onMount:function(){},onShow:function(){},onShown:function(){},onTrigger:function(){},onUntrigger:function(){},onClickOutside:function(){},placement:"top",plugins:[],popperOptions:{},render:null,showOnCreate:!1,touch:!0,trigger:"mouseenter focus",triggerTarget:null},Be,{},{allowHTML:!1,animation:"fade",arrow:!0,content:"",inertia:!1,maxWidth:350,role:"tooltip",theme:"",zIndex:9999}),_e=Object.keys(We);function Ne(r){var e=(r.plugins||[]).reduce(function(e,t){var n=t.name,t=t.defaultValue;return n&&(e[n]=void 0!==r[n]?r[n]:t),e},{});return Object.assign({},r,{},e)}function Ie(e,t){var o,n,n=Object.assign({},t,{content:me(t.content,[e])},t.ignoreAttributes?{}:(o=e,((n=t.plugins)?Object.keys(Ne(Object.assign({},We,{plugins:n}))):_e).reduce(function(t,n){var r=(o.getAttribute("data-tippy-"+n)||"").trim();if(!r)return t;if("content"===n)t[n]=r;else try{t[n]=JSON.parse(r)}catch(e){t[n]=r}return t},{})));return n.aria=Object.assign({},We.aria,{},n.aria),n.aria={expanded:"auto"===n.aria.expanded?t.interactive:n.aria.expanded,content:"auto"===n.aria.content?t.interactive?null:"describedby":n.aria.content},n}var qe=function(){return"innerHTML"};function Ue(e,t){e[qe()]=t}function $e(e){var t=we();return!0===e?t.className=ue:(t.className=pe,xe(e)?t.appendChild(e):Ue(t,e)),t}function Fe(e,t){xe(t.content)?(Ue(e,""),e.appendChild(t.content)):"function"!=typeof t.content&&(t.allowHTML?Ue(e,t.content):e.textContent=t.content)}function ze(e){var t=e.firstElementChild,e=Oe(t.children);return{box:t,content:e.find(function(e){return e.classList.contains(se)}),arrow:e.find(function(e){return e.classList.contains(ue)||e.classList.contains(pe)}),backdrop:e.find(function(e){return e.classList.contains(ce)})}}function Xe(i){var a=we(),e=we();e.className="tippy-box",e.setAttribute("data-state","hidden"),e.setAttribute("tabindex","-1");var t=we();function n(e,t){var n=ze(a),r=n.box,o=n.content,n=n.arrow;t.theme?r.setAttribute("data-theme",t.theme):r.removeAttribute("data-theme"),"string"==typeof t.animation?r.setAttribute("data-animation",t.animation):r.removeAttribute("data-animation"),t.inertia?r.setAttribute("data-inertia",""):r.removeAttribute("data-inertia"),r.style.maxWidth="number"==typeof t.maxWidth?t.maxWidth+"px":t.maxWidth,t.role?r.setAttribute("role",t.role):r.removeAttribute("role"),e.content===t.content&&e.allowHTML===t.allowHTML||Fe(o,i.props),t.arrow?n?e.arrow!==t.arrow&&(r.removeChild(n),r.appendChild($e(t.arrow))):r.appendChild($e(t.arrow)):n&&r.removeChild(n)}return t.className=se,t.setAttribute("data-state","hidden"),Fe(t,i.props),a.appendChild(e),e.appendChild(t),n(i.props,i.props),{popper:a,onUpdate:n}}Xe.$$tippy=!0;var Ye=1,Je=[],Ze=[];function Ge(a,e){var n,r,t,o,i,s,c,u,p,f=Ie(a,Object.assign({},We,{},Ne((n=e,Object.keys(n).reduce(function(e,t){return void 0!==n[t]&&(e[t]=n[t]),e},{}))))),d=!1,l=!1,m=!1,v=!1,h=[],g=ve(z,f.interactiveDebounce),b=Ye++,e=(p=f.plugins).filter(function(e,t){return p.indexOf(e)===t}),y={id:b,reference:a,popper:we(),popperInstance:null,props:f,state:{isEnabled:!0,isVisible:!1,isDestroyed:!1,isMounted:!1,isShown:!1},plugins:e,clearDelayTimeouts:function(){clearTimeout(r),clearTimeout(t),cancelAnimationFrame(o)},setProps:function(e){0;var t,n;y.state.isDestroyed||(P("onBeforeUpdate",[y,e]),$(),t=y.props,n=Ie(a,Object.assign({},y.props,{},e,{ignoreAttributes:!0})),y.props=n,U(),t.interactiveDebounce!==n.interactiveDebounce&&(H(),g=ve(z,n.interactiveDebounce)),t.triggerTarget&&!n.triggerTarget?ge(t.triggerTarget).forEach(function(e){e.removeAttribute("aria-expanded")}):n.triggerTarget&&a.removeAttribute("aria-expanded"),S(),M(),w&&w(t,n),y.popperInstance&&(Z(),K().forEach(function(e){requestAnimationFrame(e._tippy.popperInstance.forceUpdate)})),P("onAfterUpdate",[y,e]))},setContent:function(e){y.setProps({content:e})},show:function(){0;var e=y.state.isVisible,t=y.state.isDestroyed,n=!y.state.isEnabled,r=Ce.isTouch&&!y.props.touch,o=de(y.props.duration,0,We.duration);e||t||n||r||D().hasAttribute("disabled")||(P("onShow",[y],!1),!1!==y.props.onShow(y)&&(y.state.isVisible=!0,A()&&(O.style.visibility="visible"),M(),_(),y.state.isMounted||(O.style.transition="none"),A()&&(n=k(),r=n.box,n=n.content,Ae([r,n],0)),c=function(){var e,t;y.state.isVisible&&!v&&(v=!0,O.offsetHeight,O.style.transition=y.props.moveTransition,A()&&y.props.animation&&(Ae([e=(t=k()).box,t=t.content],o),De([e,t],"visible")),R(),S(),be(Ze,y),y.state.isMounted=!0,P("onMount",[y]),y.props.animation&&A()&&I(o,function(){y.state.isShown=!0,P("onShown",[y])}))},function(){var e=y.props.appendTo,t=D();t=y.props.interactive&&e===We.appendTo||"parent"===e?t.parentNode:me(e,[t]);t.contains(O)||t.appendChild(O);Z(),0}()))},hide:function(){0;var e=!y.state.isVisible,t=y.state.isDestroyed,n=!y.state.isEnabled,r=de(y.props.duration,1,We.duration);e||t||n||(P("onHide",[y],!1),!1!==y.props.onHide(y)&&(y.state.isVisible=!1,y.state.isShown=!1,d=v=!1,A()&&(O.style.visibility="hidden"),H(),N(),M(),A()&&(t=k(),n=t.box,t=t.content,y.props.animation&&(Ae([n,t],r),De([n,t],"hidden"))),R(),S(),y.props.animation?A()&&function(e,t){I(e,function(){!y.state.isVisible&&O.parentNode&&O.parentNode.contains(O)&&t()})}(r,y.unmount):y.unmount()))},hideWithInteractivity:function(e){0;L().addEventListener("mousemove",g),be(Je,g),g(e)},enable:function(){y.state.isEnabled=!0},disable:function(){y.hide(),y.state.isEnabled=!1},unmount:function(){0;y.state.isVisible&&y.hide();y.state.isMounted&&(G(),K().forEach(function(e){e._tippy.unmount()}),O.parentNode&&O.parentNode.removeChild(O),Ze=Ze.filter(function(e){return e!==y}),y.state.isMounted=!1,P("onHidden",[y]))},destroy:function(){0;y.state.isDestroyed||(y.clearDelayTimeouts(),y.unmount(),$(),delete a._tippy,y.state.isDestroyed=!0,P("onDestroy",[y]))}};if(!f.render)return y;var b=f.render(y),O=b.popper,w=b.onUpdate;O.setAttribute("data-tippy-root",""),O.id="tippy-"+y.id,y.popper=O,a._tippy=y,O._tippy=y;var x=e.map(function(e){return e.fn(y)}),E=a.hasAttribute("aria-expanded");return U(),S(),M(),P("onCreate",[y]),f.showOnCreate&&Q(),O.addEventListener("mouseenter",function(){y.props.interactive&&y.state.isVisible&&y.clearDelayTimeouts()}),O.addEventListener("mouseleave",function(e){y.props.interactive&&0<=y.props.trigger.indexOf("mouseenter")&&(L().addEventListener("mousemove",g),g(e))}),y;function j(){var e=y.props.touch;return Array.isArray(e)?e:[e,0]}function T(){return"hold"===j()[0]}function A(){var e;return null!=(e=y.props.render)&&e.$$tippy}function D(){return u||a}function L(){var e=D().parentNode;return e?Le(e):document}function k(){return ze(O)}function C(e){return y.state.isMounted&&!y.state.isVisible||Ce.isTouch||i&&"focus"===i.type?0:de(y.props.delay,e?0:1,We.delay)}function M(){O.style.pointerEvents=y.props.interactive&&y.state.isVisible?"":"none",O.style.zIndex=""+y.props.zIndex}function P(t,n,e){void 0===e&&(e=!0),x.forEach(function(e){e[t]&&e[t].apply(void 0,n)}),e&&(e=y.props)[t].apply(e,n)}function R(){var n,r,e=y.props.aria;e.content&&(n="aria-"+e.content,r=O.id,ge(y.props.triggerTarget||a).forEach(function(e){var t=e.getAttribute(n);y.state.isVisible?e.setAttribute(n,t?t+" "+r:r):(t=t&&t.replace(r,"").trim())?e.setAttribute(n,t):e.removeAttribute(n)}))}function S(){!E&&y.props.aria.expanded&&ge(y.props.triggerTarget||a).forEach(function(e){y.props.interactive?e.setAttribute("aria-expanded",y.state.isVisible&&e===D()?"true":"false"):e.removeAttribute("aria-expanded")})}function H(){L().removeEventListener("mousemove",g),Je=Je.filter(function(e){return e!==g})}function V(e){if(!(Ce.isTouch&&(m||"mousedown"===e.type)||y.props.interactive&&O.contains(e.target))){if(D().contains(e.target)){if(Ce.isTouch)return;if(y.state.isVisible&&0<=y.props.trigger.indexOf("click"))return}else P("onClickOutside",[y,e]);!0===y.props.hideOnClick&&(y.clearDelayTimeouts(),y.hide(),l=!0,setTimeout(function(){l=!1}),y.state.isMounted||N())}}function B(){m=!0}function W(){m=!1}function _(){var e=L();e.addEventListener("mousedown",V,!0),e.addEventListener("touchend",V,fe),e.addEventListener("touchstart",W,fe),e.addEventListener("touchmove",B,fe)}function N(){var e=L();e.removeEventListener("mousedown",V,!0),e.removeEventListener("touchend",V,fe),e.removeEventListener("touchstart",W,fe),e.removeEventListener("touchmove",B,fe)}function I(e,t){var n=k().box;function r(e){e.target===n&&(ke(n,"remove",r),t())}if(0===e)return t();ke(n,"remove",s),ke(n,"add",r),s=r}function q(t,n,r){void 0===r&&(r=!1),ge(y.props.triggerTarget||a).forEach(function(e){e.addEventListener(t,n,r),h.push({node:e,eventType:t,handler:n,options:r})})}function U(){T()&&(q("touchstart",F,{passive:!0}),q("touchend",X,{passive:!0})),y.props.trigger.split(/\s+/).filter(Boolean).forEach(function(e){if("manual"!==e)switch(q(e,F),e){case"mouseenter":q("mouseleave",X);break;case"focus":q(Ve?"focusout":"blur",Y);break;case"focusin":q("focusout",Y)}})}function $(){h.forEach(function(e){var t=e.node,n=e.eventType,r=e.handler,e=e.options;t.removeEventListener(n,r,e)}),h=[]}function F(t){var e,n=!1;!y.state.isEnabled||J(t)||l||(e="focus"===(null==i?void 0:i.type),u=(i=t).currentTarget,S(),!y.state.isVisible&&Ee(t)&&Je.forEach(function(e){return e(t)}),"click"===t.type&&(y.props.trigger.indexOf("mouseenter")<0||d)&&!1!==y.props.hideOnClick&&y.state.isVisible?n=!0:Q(t),"click"===t.type&&(d=!n),n&&!e&&ee(t))}function z(e){var s,c,t=e.target,t=D().contains(t)||O.contains(t);"mousemove"===e.type&&t||(t=K().concat(O).map(function(e){var t=null==(t=e._tippy.popperInstance)?void 0:t.state;return t?{popperRect:e.getBoundingClientRect(),popperState:t,props:f}:null}).filter(Boolean),s=e.clientX,c=e.clientY,t.every(function(e){var t=e.popperRect,n=e.popperState,r=e.props.interactiveBorder,o=ye(n.placement),i=n.modifiersData.offset;if(!i)return!0;var a="bottom"===o?i.top.y:0,e="top"===o?i.bottom.y:0,n="right"===o?i.left.x:0,i="left"===o?i.right.x:0,a=t.top-c+a>r,e=c-t.bottom-e>r,n=t.left-s+n>r,r=s-t.right-i>r;return a||e||n||r})&&(H(),ee(e)))}function X(e){J(e)||0<=y.props.trigger.indexOf("click")&&d||(y.props.interactive?y.hideWithInteractivity(e):ee(e))}function Y(e){y.props.trigger.indexOf("focusin")<0&&e.target!==D()||y.props.interactive&&e.relatedTarget&&O.contains(e.relatedTarget)||ee(e)}function J(e){return!!Ce.isTouch&&T()!==0<=e.type.indexOf("touch")}function Z(){G();var e=y.props,t=e.popperOptions,n=e.placement,r=e.offset,o=e.getReferenceClientRect,i=e.moveTransition,e=A()?ze(O).arrow:null,o=o?{getBoundingClientRect:o,contextElement:o.contextElement||D()}:a,i=[{name:"offset",options:{offset:r}},{name:"preventOverflow",options:{padding:{top:2,bottom:2,left:5,right:5}}},{name:"flip",options:{padding:5}},{name:"computeStyles",options:{adaptive:!i}},{name:"$$tippy",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:function(e){var t,n=e.state;A()&&(t=k().box,["placement","reference-hidden","escaped"].forEach(function(e){"placement"===e?t.setAttribute("data-placement",n.placement):n.attributes.popper["data-popper-"+e]?t.setAttribute("data-"+e,""):t.removeAttribute("data-"+e)}),n.attributes.popper={})}}];A()&&e&&i.push({name:"arrow",options:{element:e,padding:3}}),i.push.apply(i,(null==t?void 0:t.modifiers)||[]),y.popperInstance=ae(o,O,Object.assign({},t,{placement:n,onFirstUpdate:c,modifiers:i}))}function G(){y.popperInstance&&(y.popperInstance.destroy(),y.popperInstance=null)}function K(){return Oe(O.querySelectorAll("[data-tippy-root]"))}function Q(e){y.clearDelayTimeouts(),e&&P("onTrigger",[y,e]),_();var t=C(!0),n=j(),e=n[0],n=n[1];(t=Ce.isTouch&&"hold"===e&&n?n:t)?r=setTimeout(function(){y.show()},t):y.show()}function ee(e){y.clearDelayTimeouts(),P("onUntrigger",[y,e]),y.state.isVisible?0<=y.props.trigger.indexOf("mouseenter")&&0<=y.props.trigger.indexOf("click")&&0<=["mouseleave","mousemove"].indexOf(e.type)&&d||((e=C(!1))?t=setTimeout(function(){y.state.isVisible&&y.hide()},e):o=requestAnimationFrame(function(){y.hide()})):N()}}function Ke(e,t){var n=We.plugins.concat((t=void 0===t?{}:t).plugins||[]);document.addEventListener("touchstart",Pe,fe),window.addEventListener("blur",Se);var r=Object.assign({},t,{plugins:n}),n=Te(e).reduce(function(e,t){t=t&&Ge(t,r);return t&&e.push(t),e},[]);return xe(e)?n[0]:n}Ke.defaultProps=We,Ke.setDefaultProps=function(t){Object.keys(t).forEach(function(e){We[e]=t[e]})},Ke.currentInput=Ce;t=function(e,t){var o,i=e,a=[],s=(t=void 0===t?{}:t).overrides,n=[];function r(){a=i.map(function(e){return e.reference})}function c(t){i.forEach(function(e){t?e.enable():e.disable()})}function u(r){return i.map(function(t){var n=t.setProps;return t.setProps=function(e){n(e),t.reference===o&&r.setProps(e)},function(){t.setProps=n}})}c(!1),r();var e={fn:function(){return{onDestroy:function(){c(!0)},onTrigger:function(e,t){var n=t.currentTarget,r=a.indexOf(n);n!==o&&(o=n,t=(s||[]).concat("content").reduce(function(e,t){return e[t]=i[r].props[t],e},{}),e.setProps(Object.assign({},t,{getReferenceClientRect:"function"==typeof t.getReferenceClientRect?t.getReferenceClientRect:function(){return n.getBoundingClientRect()}})))}}}},p=Ke(we(),Object.assign({},he(t,["overrides"]),{plugins:[e].concat(t.plugins||[]),triggerTarget:a})),f=p.setProps;return p.setProps=function(e){s=e.overrides||s,f(e)},p.setInstances=function(e){c(!0),n.forEach(function(e){return e()}),i=e,c(!1),r(),u(p),p.setProps({triggerTarget:a})},n=u(p),p};Ke.setDefaultProps({render:Xe});var He=Ke,Qe=n(78709),et=n(91169);function tt(e,t){if(null==e)return{};for(var n,r={},o=Object.keys(e),i=0;i<o.length;i++)n=o[i],0<=t.indexOf(n)||(r[n]=e[n]);return r}var nt="undefined"!=typeof window&&"undefined"!=typeof document;function rt(e,t){e&&("function"==typeof e&&e(t),{}.hasOwnProperty.call(e,"current")&&(e.current=t))}function ot(){return nt&&document.createElement("div")}function it(e,t){return Object.assign({},t,{popperOptions:Object.assign({},e.popperOptions,t.popperOptions,{modifiers:[].concat(((null==(e=e.popperOptions)?void 0:e.modifiers)||[]).filter(function(e){return 0<=e.name.indexOf("tippy")}),(null==(t=t.popperOptions)?void 0:t.modifiers)||[])})})}var at=nt?Qe.useLayoutEffect:Qe.useEffect;function st(e){var t=(0,Qe.useRef)();return t.current||(t.current="function"==typeof e?e():e),t.current}function ct(t,n,e){e.split(/\s+/).forEach(function(e){e&&t.classList[n](e)})}var ut={name:"className",defaultValue:"",fn:function(t){function e(){var e;return!(null==(e=t.props.render)||!e.$$tippy)}var n=t.popper.firstElementChild;function r(){t.props.className&&!e()||ct(n,"add",t.props.className)}return{onCreate:r,onBeforeUpdate:function(){e()&&ct(n,"remove",t.props.className)},onAfterUpdate:r}}};function pt(w){return function(e){var t=e.children,n=e.content,r=e.visible,o=e.singleton,i=e.render,a=e.reference,s=e.disabled,c=void 0!==s&&s,u=void 0===(l=e.ignoreAttributes)||l,p=(e.__source,e.__self,tt(e,["children","content","visible","singleton","render","reference","disabled","ignoreAttributes","__source","__self"])),f=void 0!==r,d=void 0!==o,l=(s=(0,Qe.useState)(!1))[0],m=s[1],v=(e=(0,Qe.useState)({}))[0],h=e[1],e=(s=(0,Qe.useState)())[0],g=s[1],b=st(function(){return{container:ot(),renders:1}}),y=Object.assign({ignoreAttributes:u},p,{content:b.container});f&&(y.trigger="manual",y.hideOnClick=!1),d&&(c=!0);var O=y,p=y.plugins||[];return i&&(O=Object.assign({},y,{plugins:d?[].concat(p,[{fn:function(){return{onTrigger:function(e,t){var n=o.data.children.find(function(e){return e.instance.reference===t.currentTarget}).content;g(n)}}}}]):p,render:function(){return{popper:b.container}}})),p=[a].concat(t?[t.type]:[]),at(function(){var e=a;a&&a.hasOwnProperty("current")&&(e=a.current);var t=w(e||b.ref||ot(),Object.assign({},O,{plugins:[ut].concat(y.plugins||[])}));return b.instance=t,c&&t.disable(),r&&t.show(),d&&o.hook({instance:t,content:n,props:O}),m(!0),function(){t.destroy(),null!=o&&o.cleanup(t)}},p),at(function(){var e;1!==b.renders?((e=b.instance).setProps(it(e.props,O)),c?e.disable():e.enable(),f&&(r?e.show():e.hide()),d&&o.hook({instance:e,content:n,props:O})):b.renders++}),at(function(){var e;i&&(e=b.instance).setProps({popperOptions:Object.assign({},e.props.popperOptions,{modifiers:[].concat((null==(e=e.props.popperOptions)?void 0:e.modifiers)||[],[{name:"$$tippyReact",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:function(e){var t=e.state,e=null==(e=t.modifiersData)?void 0:e.hide;v.placement===t.placement&&v.referenceHidden===(null==e?void 0:e.isReferenceHidden)&&v.escaped===(null==e?void 0:e.hasPopperEscaped)||h({placement:t.placement,referenceHidden:null==e?void 0:e.isReferenceHidden,escaped:null==e?void 0:e.hasPopperEscaped}),t.attributes.popper={}}}])})})},[v.placement,v.referenceHidden,v.escaped].concat(p)),Qe.createElement(Qe.Fragment,null,t?(0,Qe.cloneElement)(t,{ref:function(e){b.ref=e,rt(t.ref,e)}}):null,l&&(0,et.createPortal)(i?i((l={"data-placement":(p=v).placement},p.referenceHidden&&(l["data-reference-hidden"]=""),p.escaped&&(l["data-escaped"]=""),l),e,b.instance):n,b.container))}}var ft=function(r,o){return(0,Qe.forwardRef)(function(e,t){var n=e.children,e=tt(e,["children"]);return Qe.createElement(r,Object.assign({},o,e),n?(0,Qe.cloneElement)(n,{ref:function(e){rt(t,e),rt(n.ref,e)}}):null)})}(pt(He))}}]);