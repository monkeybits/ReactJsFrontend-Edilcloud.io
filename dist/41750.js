(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[41750],{25710:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var b=a(97439),y=a(84818),E=a(78709),Z=(a(16526),a(30367)),t=a(6274),x=(0,a(23763).Z)(E.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var a=E.forwardRef(function(e,t){var a,r,n,l=e.alt,s=e.children,o=e.classes,c=e.className,i=e.component,m=void 0===i?"div":i,d=e.imgProps,u=e.sizes,f=e.src,h=e.srcSet,p=e.variant,g=void 0===p?"circle":p,v=(0,y.Z)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),i=null,e=(a=(p={src:f,srcSet:h}).src,r=p.srcSet,e=E.useState(!1),p=e[0],n=e[1],E.useEffect(function(){if(a||r){n(!1);var e=!0,t=new Image;return t.src=a,t.srcSet=r,t.onload=function(){e&&n("loaded")},t.onerror=function(){e&&n("error")},function(){e=!1}}},[a,r]),p),p=f||h,e=p&&"error"!==e,i=e?E.createElement("img",(0,b.Z)({alt:l,src:f,srcSet:h,sizes:u,className:o.img},d)):null!=s?s:p&&l?l[0]:E.createElement(x,{className:o.fallback});return E.createElement(m,(0,b.Z)({className:(0,Z.Z)(o.root,o.system,o[g],c,!e&&o.colorDefault),ref:t},v),i)}),r=(0,t.Z)(function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}},{name:"MuiAvatar"})(a)},41750:function(e,t,a){"use strict";a.r(t);var r=a(61432),n=a.n(r),l=a(56156),s=a.n(l),o=a(78709),r=a(32986),c=a(42401),i=a(23377),m=a(25710),d=a(92466),u=a(13786),f=a(20103),h=a(82707),l=a(40962),p=(0,r.ZP)(function(){return a.e(27362).then(a.bind(a,27362))}),g=(0,r.ZP)(function(){return a.e(23962).then(a.bind(a,23962))}),v=(0,r.ZP)(function(){return Promise.all([a.e(63604),a.e(72164)]).then(a.bind(a,21288))}),b=(0,l.Z)(function(e){return{layoutHeader:s()({height:320,minHeight:320},e.breakpoints.down("md"),{height:240,minHeight:240})}});t.default=function(){var e=b(),t=(0,o.useState)(0),a=n()(t,2),t=a[0],r=a[1];return o.createElement(i.Z,{classes:{header:e.layoutHeader,toolbar:"px-16 sm:px-24"},header:o.createElement("div",{className:"p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end"},o.createElement("div",{className:"flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start"},o.createElement(c.Z,{animation:"transition.expandIn",delay:300},o.createElement(m.Z,{className:"w-96 h-96",src:"assets/images/avatars/Velazquez.jpg"})),o.createElement(c.Z,{animation:"transition.slideLeftIn",delay:300},o.createElement(d.Z,{className:"md:mx-24",variant:"h4",color:"inherit"},"John Doe"))),o.createElement("div",{className:"flex items-center justify-end"},o.createElement(u.Z,{className:"mx-8 normal-case",variant:"contained",color:"secondary","aria-label":"Follow"},"Follow"),o.createElement(u.Z,{className:"normal-case",variant:"contained",color:"primary","aria-label":"Send Message"},"Send Message"))),contentToolbar:o.createElement(f.Z,{value:t,onChange:function(e,t){r(t)},indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"off",classes:{root:"h-64 w-full border-b-1"}},o.createElement(h.Z,{classes:{root:"h-64"},label:"Timeline"}),o.createElement(h.Z,{classes:{root:"h-64"},label:"About"}),o.createElement(h.Z,{classes:{root:"h-64"},label:"Photos & Videos"})),content:o.createElement("div",{className:"p-16 sm:p-24"},0===t&&o.createElement(v,null),1===t&&o.createElement(p,null),2===t&&o.createElement(g,null))})}}}]);