(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[80719],{35923:function(e,t,n){"use strict";n.d(t,{Nr:function(){return a},KW:function(){return d},cI:function(){return r},KS:function(){return c},rf:function(){return l}});var t=n(56156),u=n.n(t),t=n(61432),o=n.n(t),s=n(65129),m=n(78709);function f(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}var r=function(e,t){var n=(0,m.useState)(e),r=(i=o()(n,2))[0],a=i[1],c=(0,m.useCallback)(function(t){t.persist(),a(function(e){return s.Z.setIn(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach(function(e){u()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}({},e),t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value)})},[]),l=(0,m.useCallback)(function(){s.Z.isEqual(e,r)||a(e)},[r,e]),n=(0,m.useCallback)(function(t,n){a(function(e){return s.Z.setIn(e,t,n)})},[]),i=(0,m.useCallback)(function(e){e&&e.preventDefault(),t&&t()},[t]);return{form:r,handleChange:c,handleSubmit:i,resetForm:l,setForm:a,setInForm:n}};var a=function(e,t,n){return(0,m.useRef)(s.Z.debounce(e,t,n)).current};var c=function(t,n){var r=(0,m.useRef)(t);(0,m.useEffect)(function(){r.current=t},[t]),(0,m.useEffect)(function(){var e;return n&&t&&"function"==typeof t&&(e=setTimeout(r.current,n||0)),function(){e&&clearTimeout(e)}},[t,n])};var l=function(e,t){var n=(0,m.useRef)(!0);(0,m.useEffect)(n.current?function(){n.current=!1}:e,t)},t=(n(45559),n(89962)),i=n.n(t);function p(e){var t=m.useRef();return i()(e,t.current)||(t.current=e),t.current}var d=function(e,t){m.useEffect(e,p(t))}},80719:function(e,t,n){"use strict";n.r(t);var r=n(61432),m=n.n(r),f=n(42401),a=n(32986),p=n(35923),d=n(94678),g=n(1737),v=n(92466),E=n(82186),b=n(92571),h=n(96282),y=n(13786),x=n(41533),Z=n(50390),j=n(41713),N=n(88325),c=n(40962),w=n(58626),O=n(28344),k=n(78709),P=n(12707),r=n(55110),C=n(88572),I=n(11208),S=n(68164),D=(n(96133),n(8662)),F=n(53369),R=n(58913),T=(0,a.ZP)(function(){return Promise.all([n.e(10930),n.e(73430)]).then(n.bind(n,73430))}),_=(0,c.Z)(function(e){return{root:{background:"#ffffff)",color:e.palette.primary.contrastText},formControl:{margin:e.spacing(1),minWidth:150},selectEmpty:{marginTop:e.spacing(2)}}}),W=[{id:"en",title:"English",flag:"us"},{id:"it",title:"Italian",flag:"tr"}];t.default=(0,r.EN)(function(e){var t=e.history,n=_(),r=(0,F.$)().i18n,a=((0,F.$)("login").t,(0,R.I0)()),c=W.find(function(e){return e.id===r.language}),l=(0,w.Z)(),i=(0,k.useState)({email:[]}),i=(e=m()(i,2))[0],u=e[1],o=(e=(0,p.cI)({email:""})).form,s=e.handleChange;return e.resetForm,k.createElement("div",{className:(0,O.Z)(n.root,"flex flex-col flex-auto flex-shrink-0 items-center justify-center p-20 sm:p-32 bg-white")},k.createElement("div",{className:"flex flex-col items-center justify-center w-full max-w-425"},k.createElement(f.Z,{animation:"transition.expandIn"},k.createElement(d.Z,{className:"w-full"},k.createElement(g.Z,{className:"flex flex-col items-center justify-center p-20 sm:p-32"},k.createElement("img",{width:"200",src:"assets/images/logos/fuse.svg",alt:"logo"}),k.createElement(v.Z,{variant:"h5",className:"text-center font-600 mt-20 mb-28"},"Recupera la tua Password"),k.createElement("form",{name:"recoverForm",noValidate:!0,className:"flex flex-col justify-center w-full",onSubmit:function(e){e.preventDefault(),(0,C.k)(I.lP,{email:o.email},function(e){t.push("/pages/auth/mail-confirm",{email:o.email})},function(e){e=e.email;u({email:e})},C.Y.POST)}},k.createElement(E.Z,{error:i.email.length,className:"mb-4",label:"Email",autoFocus:!0,type:"email",name:"email",value:o.email,onChange:function(e){u({email:[]}),s(e)},InputProps:{endAdornment:k.createElement(b.Z,{position:"end"},k.createElement(h.Z,{className:"text-20",color:"action"},"mail"))},variant:"outlined",required:!0,fullWidth:!0}),k.createElement(y.Z,{variant:"contained",color:"primary",size:"large",className:"w-full mx-auto mt-16 uppercase","aria-label":"Reset",disabled:!(0<o.email.length),type:"submit"},"Invia Mail")),k.createElement("div",{className:"flex flex-col items-center justify-center pt-24"},k.createElement(P.rU,{className:"text-primary font-600",to:"/pages/auth/login"},"Ritorna al login"))))),k.createElement("div",{className:"flex items-center justify-between mt-8 w-full text-default font-600 px-32"},k.createElement(x.Z,{className:(0,O.Z)(n.formControl,"custom-select-remove-border")},k.createElement(T,{icon:k.createElement(k.Fragment,null,k.createElement(Z.Z,{id:"demo-simple-select-label"},c.title," ",k.createElement("span",{className:"arrow-icon"}," ",k.createElement(D.Z,null)," ")," ")),outsideClick:!0},W.map(function(n){return k.createElement(j.Z,{key:n.id,onClick:function(){return e=n,t=r.dir(e.id),localStorage.setItem("language",e.id),r.changeLanguage(e.id),void(t!==l.direction&&a(S.UD({direction:t})));var e,t}},k.createElement(N.Z,{primary:n.title}))}))),k.createElement("div",{className:"flex"},k.createElement("a",{href:"javascript:;",className:"text-muted mr-20"},"Help"),k.createElement("a",{href:"javascript:;",className:"text-muted mr-20"},"Privacy"),k.createElement("a",{href:"javascript:;",className:"text-muted"},"Terms")))))})}}]);