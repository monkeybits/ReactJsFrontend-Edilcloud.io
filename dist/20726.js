(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[20726],{35923:function(e,t,n){"use strict";n.d(t,{Nr:function(){return a},KW:function(){return b},cI:function(){return r},KS:function(){return c},rf:function(){return u}});var t=n(56156),l=n.n(t),t=n(61432),i=n.n(t),s=n(65129),f=n(78709);function p(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}var r=function(e,t){var n=(0,f.useState)(e),r=(o=i()(n,2))[0],a=o[1],c=(0,f.useCallback)(function(t){t.persist(),a(function(e){return s.Z.setIn(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(Object(n),!0).forEach(function(e){l()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}({},e),t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value)})},[]),u=(0,f.useCallback)(function(){s.Z.isEqual(e,r)||a(e)},[r,e]),n=(0,f.useCallback)(function(t,n){a(function(e){return s.Z.setIn(e,t,n)})},[]),o=(0,f.useCallback)(function(e){e&&e.preventDefault(),t&&t()},[t]);return{form:r,handleChange:c,handleSubmit:o,resetForm:u,setForm:a,setInForm:n}};var a=function(e,t,n){return(0,f.useRef)(s.Z.debounce(e,t,n)).current};var c=function(t,n){var r=(0,f.useRef)(t);(0,f.useEffect)(function(){r.current=t},[t]),(0,f.useEffect)(function(){var e;return n&&t&&"function"==typeof t&&(e=setTimeout(r.current,n||0)),function(){e&&clearTimeout(e)}},[t,n])};var u=function(e,t){var n=(0,f.useRef)(!0);(0,f.useEffect)(n.current?function(){n.current=!1}:e,t)},t=(n(45559),n(89962)),o=n.n(t);function m(e){var t=f.useRef();return o()(e,t.current)||(t.current=e),t.current}var b=function(e,t){f.useEffect(e,m(t))}},20726:function(e,t,n){"use strict";n.r(t);var r=n(51265),p=n.n(r),r=n(56156),a=n.n(r),m=n(35923),b=n(895),d=n(99904),y=n(84403),v=n(95272),O=n(92466),E=n(80896),h=n(82186),D=n(556),g=n(55964),w=n(19462),j=n(13786),Z=n(48258),P=n(96282),C=n(54685),r=n(78279),k=n.n(r),Y=n(78709),x=n(58913),I=n(59429);function c(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function N(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach(function(e){a()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var S={id:b.Z.generateGUID(),title:"",allDay:!0,start:k()(new Date,"MM/DD/YYYY"),end:k()(new Date,"MM/DD/YYYY"),desc:""};t.default=function(e){var t=(0,x.I0)(),n=(0,x.v9)(function(e){return e.calendarApp.events.eventDialog}),r=(l=(0,m.cI)(S)).form,a=l.handleChange,c=l.setForm,u=l.setInForm,o=k()(r.start,"MM/DD/YYYY"),l=k()(r.end,"MM/DD/YYYY"),i=(0,Y.useCallback)(function(){"edit"===n.type&&n.data&&c(N({},n.data)),"new"===n.type&&c(N(N(N({},S),n.data),{},{id:b.Z.generateGUID()}))},[n.data,n.type,c]);function s(){return"edit"===n.type?t(I.jr()):t(I.Vm())}function f(){return 0<r.title.length}return(0,Y.useEffect)(function(){n.props.open&&i()},[n.props.open,i]),Y.createElement(d.Z,p()({},n.props,{onClose:s,fullWidth:!0,maxWidth:"xs",component:"form"}),Y.createElement(y.Z,{position:"static"},Y.createElement(v.Z,{className:"flex w-full"},Y.createElement(O.Z,{variant:"subtitle1",color:"inherit"},"new"===n.type?"New Event":"Edit Event"))),Y.createElement("form",{noValidate:!0,onSubmit:function(e){e.preventDefault(),"new"===n.type?t(I.vP(r)):t(I.eJ(r)),s()}},Y.createElement(E.Z,{classes:{root:"p-16 pb-0 sm:p-24 sm:pb-0"}},Y.createElement(h.Z,{id:"title",label:"Title",className:"mt-8 mb-16",InputLabelProps:{shrink:!0},name:"title",value:r.title,onChange:a,variant:"outlined",autoFocus:!0,required:!0,fullWidth:!0}),Y.createElement(D.Z,{className:"mt-8 mb-16",label:"All Day",control:Y.createElement(g.Z,{checked:r.allDay,id:"allDay",name:"allDay",onChange:a})}),Y.createElement(C.x,{label:"Start",inputVariant:"outlined",value:o,onChange:function(e){return u("start",e)},className:"mt-8 mb-16 w-full",maxDate:l}),Y.createElement(C.x,{label:"End",inputVariant:"outlined",value:l,onChange:function(e){return u("end",e)},className:"mt-8 mb-16 w-full",minDate:o}),Y.createElement(h.Z,{className:"mt-8 mb-16",id:"desc",label:"Description",type:"text",name:"desc",value:r.desc,onChange:a,multiline:!0,rows:5,variant:"outlined",fullWidth:!0})),"new"===n.type?Y.createElement(w.Z,{className:"justify-between px-8 sm:px-16"},Y.createElement(j.Z,{variant:"contained",color:"primary",type:"submit",disabled:!f()},"Add")):Y.createElement(w.Z,{className:"justify-between px-8 sm:px-16"},Y.createElement(j.Z,{variant:"contained",color:"primary",type:"submit",disabled:!f()},"Save"),Y.createElement(Z.Z,{onClick:function(){t(I.xC(r.id)),s()}},Y.createElement(P.Z,null,"delete")))))}}}]);