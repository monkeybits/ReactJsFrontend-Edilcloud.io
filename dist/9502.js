(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[9502],{35923:function(e,t,r){"use strict";r.d(t,{Nr:function(){return a},KW:function(){return d},cI:function(){return n},KS:function(){return c},rf:function(){return s}});var t=r(56156),o=r.n(t),t=r(61432),u=r.n(t),i=r(65129),f=r(78709);function m(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)),n}var n=function(e,t){var r=(0,f.useState)(e),n=(l=u()(r,2))[0],a=l[1],c=(0,f.useCallback)(function(t){t.persist(),a(function(e){return i.Z.setIn(function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?m(Object(r),!0).forEach(function(e){o()(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}({},e),t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value)})},[]),s=(0,f.useCallback)(function(){i.Z.isEqual(e,n)||a(e)},[n,e]),r=(0,f.useCallback)(function(t,r){a(function(e){return i.Z.setIn(e,t,r)})},[]),l=(0,f.useCallback)(function(e){e&&e.preventDefault(),t&&t()},[t]);return{form:n,handleChange:c,handleSubmit:l,resetForm:s,setForm:a,setInForm:r}};var a=function(e,t,r){return(0,f.useRef)(i.Z.debounce(e,t,r)).current};var c=function(t,r){var n=(0,f.useRef)(t);(0,f.useEffect)(function(){n.current=t},[t]),(0,f.useEffect)(function(){var e;return r&&t&&"function"==typeof t&&(e=setTimeout(n.current,r||0)),function(){e&&clearTimeout(e)}},[t,r])};var s=function(e,t){var r=(0,f.useRef)(!0);(0,f.useEffect)(r.current?function(){r.current=!1}:e,t)},t=(r(45559),r(89962)),l=r.n(t);function p(e){var t=f.useRef();return l()(e,t.current)||(t.current=e),t.current}var d=function(e,t){f.useEffect(e,p(t))}},9502:function(e,t,r){"use strict";r.r(t);var c=r(42401),s=r(35923),l=r(94678),o=r(1737),u=r(25710),i=r(96282),f=r(92466),m=r(82186),p=r(13786),n=r(40962),d=r(28344),b=r(78709),v=r(12707),y=(0,n.Z)(function(e){return{root:{background:"#ffffff)",color:e.palette.primary.contrastText}}});t.default=function(){var e=y(),t=(0,s.cI)({password:""}),r=t.form,n=t.handleChange,a=t.resetForm;return b.createElement("div",{className:(0,d.Z)(e.root,"flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")},b.createElement("div",{className:"flex flex-col items-center justify-center w-full"},b.createElement(c.Z,{animation:"transition.expandIn"},b.createElement(l.Z,{className:"w-full max-w-sm"},b.createElement(o.Z,{className:"flex flex-col items-center justify-center p-32"},b.createElement("div",{className:"min-w-full flex flex-col items-center justify-center sm:flex-row sm:justify-start sm:items-center -mx-8"},b.createElement("div",{className:"relative mx-8"},b.createElement(u.Z,{className:"w-72 h-72",src:"assets/images/avatars/katherine.jpg"}),b.createElement(i.Z,{className:"text-32 absolute right-0 bottom-0",color:"error"},"lock")),b.createElement("div",{className:"mx-8"},b.createElement(f.Z,{variant:"h6",className:"mb-8"},"YOUR SESSION IS LOCKED"),b.createElement(f.Z,{color:"textSecondary"},"Due to inactivity, your session is locked. Enter your password to continue."))),b.createElement("form",{name:"lockForm",noValidate:!0,className:"flex flex-col justify-center w-full mt-32",onSubmit:function(e){e.preventDefault(),a()}},b.createElement(m.Z,{className:"mb-16",label:"Username",name:"name",value:"Katherine",variant:"outlined",fullWidth:!0,disabled:!0}),b.createElement(m.Z,{className:"mb-16",label:"Password",type:"password",name:"password",value:r.password,onChange:n,variant:"outlined",required:!0,fullWidth:!0}),b.createElement(p.Z,{variant:"contained",color:"primary",className:"w-224 mx-auto mt-16","aria-label":"Reset",disabled:!(0<r.password.length),type:"submit"},"UNLOCK")),b.createElement("div",{className:"flex flex-col items-center justify-center pt-32 pb-24"},b.createElement(v.rU,{className:"font-medium",to:"/pages/auth/login"},"Are you not Katherine?")))))))}}}]);