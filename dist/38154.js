(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[38154],{35923:function(e,t,n){"use strict";n.d(t,{Nr:function(){return a},KW:function(){return d},cI:function(){return r},KS:function(){return o},rf:function(){return c}});var t=n(56156),i=n.n(t),t=n(61432),l=n.n(t),s=n(65129),f=n(78709);function m(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}var r=function(e,t){var n=(0,f.useState)(e),r=(u=l()(n,2))[0],a=u[1],o=(0,f.useCallback)(function(t){t.persist(),a(function(e){return s.Z.setIn(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach(function(e){i()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}({},e),t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value)})},[]),c=(0,f.useCallback)(function(){s.Z.isEqual(e,r)||a(e)},[r,e]),n=(0,f.useCallback)(function(t,n){a(function(e){return s.Z.setIn(e,t,n)})},[]),u=(0,f.useCallback)(function(e){e&&e.preventDefault(),t&&t()},[t]);return{form:r,handleChange:o,handleSubmit:u,resetForm:c,setForm:a,setInForm:n}};var a=function(e,t,n){return(0,f.useRef)(s.Z.debounce(e,t,n)).current};var o=function(t,n){var r=(0,f.useRef)(t);(0,f.useEffect)(function(){r.current=t},[t]),(0,f.useEffect)(function(){var e;return n&&t&&"function"==typeof t&&(e=setTimeout(r.current,n||0)),function(){e&&clearTimeout(e)}},[t,n])};var c=function(e,t){var n=(0,f.useRef)(!0);(0,f.useEffect)(n.current?function(){n.current=!1}:e,t)},t=(n(45559),n(89962)),u=n.n(t);function p(e){var t=f.useRef();return u()(e,t.current)||(t.current=e),t.current}var d=function(e,t){f.useEffect(e,p(t))}},38154:function(e,t,n){"use strict";n.r(t);var r=n(68357),S=n.n(r),a=n(79545),_=n.n(a),r=n(56156),o=n.n(r),a=n(61432),T=n.n(a),r=n(51265),N=n.n(r),a=n(28129),A=n.n(a),D=n(78709),I=n(35923),r=n(32986),a=n(40962),F=n(94678),M=n(1737),L=n(4248),R=n(15201),W=n(97272),z=n(4510),B=n(92466),G=n(13786),H=n(86926),U=n(1644),Y=n(65087),J=n(58913),K=n(55110),X=n(11208),q=n(88572),$=n(3089),Q=n(28344),V=n(42401),ee=n(47055),te=n(53369),ne=n(10846);function c(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function re(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach(function(e){o()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var ae=(0,r.ZP)(function(){return Promise.all([n.e(60894),n.e(21284),n.e(5956)]).then(n.bind(n,11048))}),oe=((0,r.ZP)(function(){return Promise.all([n.e(63604),n.e(60894),n.e(30250),n.e(71871),n.e(33395),n.e(19199),n.e(38606),n.e(13566),n.e(42577)]).then(n.bind(n,42577))}),(0,r.ZP)(function(){return Promise.all([n.e(63604),n.e(60894),n.e(30250),n.e(71871),n.e(48754),n.e(65646)]).then(n.bind(n,65646))})),ce=(0,a.Z)(function(e){return{root:{width:"100%",background:"#ffffff)",color:e.palette.primary.contrastText},button:{marginTop:e.spacing(1),width:"190px"},actionsContainer:{marginBottom:e.spacing(2)},resetContainer:{padding:e.spacing(3)},progBox:{position:"absolute",top:"10px",right:0,width:"50px"}}});t.default=(0,K.EN)((0,J.$j)(function(e){return{user:e.auth.user.data}})(function(e){e.user,e.history;var n=(0,te.$)("company_create").t,t=(0,K.TH)(),o=(p=(0,I.cI)({name:"",desc:"",email:"",vat_number:"",url:"",phone:""})).form,r=p.handleChange,a=(p.resetForm,p.setForm),c=(0,J.v9)(function(e){return e.chatApp.company}),u=(0,J.I0)(),e=D.useState([]),i=(p=T()(e,2))[0],l=p[1],e=D.useState([]),s=(p=T()(e,2))[0],f=p[1],e=D.useState(0),e=(p=T()(e,2))[0],m=p[1],p=D.useState(!1),d=(p=T()(p,2))[0],h=p[1],p=D.useState(!1),b=((p=T()(p,2))[0],p[1],(0,K.k6)()),g=ce(),p=D.useState(0),v=(p=T()(p,2))[0],y=p[1],E=["COMPANY_DETAILS","COMPANY_LOGO"],p=D.useState("English"),p=((p=T()(p,2))[0],p[1],D.useState(null)),O=(p=T()(p,2))[0],P=p[1],p=D.useState({name:[],slug:[],url:[],email:[],vat_number:[],phone:[]}),j=(p=T()(p,2))[0],Z=p[1];function x(){y(function(e){return e+1}),1==v&&C()}function w(){y(function(e){return e-1})}function k(e){Z({name:[],slug:[],url:[],email:[],vat_number:[],phone:[]}),r(e)}(0,D.useEffect)(function(){(0,q.k)(X.n5,{},function(e){var t,a=e;Array.isArray(e)&&(t=[],a.map(function(r,e){(0,q.k)((0,X.ul)(r.code),{},function(n){Array.isArray(n)&&(n.map(function(e,t){n[t]=re(re({},n[t]),{},{mainTitle:0==t?r.name:void 0,title:n[t].name})}),t=[].concat(_()(t),_()(n)),f(_()(t))),a[e]=re(re({},a[e]),{},{subCategory:n});l(a)},function(e){return console.log({listErr:e})},q.Y.GET,(0,$.XW)())}))},function(e){return console.log(e)},q.Y.GET,(0,$.XW)())},[]),(0,D.useEffect)(function(){u(ee.tJ())},[]),(0,D.useEffect)(function(){b&&(console.log({routeHistory:b}),"/apps/settings"!=b.location.pathname&&"/edit-company"!=b.location.pathname||(h(!0),console.log({company:c}),P({imagePreviewUrl:c.logo}),a({id:c.id,name:c.name,desc:c.description,email:c.email,vat_number:c.vat_number,url:c.url,phone:c.phone})))},[b,c]);var C=function(){var e=S()(A().mark(function e(){var t,n,r,a;return A().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=new FormData,e.t0=o.name,e.t1=o.name.split(" ").join("_"),e.t2=o.desc,e.t3=o.url,e.t4=o.vat_number,e.t5=o.email,e.t6=o.phone,O&&O.fileData)return e.next=11,(0,$.y6)(O.fileData);e.next=14;break;case 11:e.t7=e.sent,e.next=15;break;case 14:e.t7=void 0;case 15:for(a in e.t8=e.t7,n={name:e.t0,slug:e.t1,description:e.t2,url:e.t3,vat_number:e.t4,email:e.t5,phone:e.t6,logo:e.t8},r=localStorage.getItem("jwt_access_token"),n)n[a]&&t.append(a,n[a]);(d?ne.Z.put((0,X.pd)(c.id),t,{headers:{"Content-Type":"multipart/form-data",Authorization:"JWT ".concat(r)},onUploadProgress:function(e){e=Math.round(100*e.loaded/e.total);m(e)}}):ne.Z.post(X.Mt,t,{headers:{"Content-Type":"multipart/form-data",Authorization:"JWT ".concat(r)},onUploadProgress:function(e){e=Math.round(100*e.loaded/e.total);m(e)}})).then(function(e){m(0),d?(console.log("routeHistorynextPath",b.location.state.nextPath),b.push(b.location.state.nextPath)):b.push("/apps/companies")}).catch(function(e){m(0);var t=e.response.data,n=t.name,r=t.url,a=t.email,e=t.vat_number,t=t.phone;Z({name:n||[],url:r||[],email:a||[],vat_number:e||[],phone:t||[]}),y(0)});case 21:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),t="/create-company"===t.pathname||"/edit-company"===t.pathname;return D.createElement("div",{className:(0,Q.Z)(g.root,"flex flex-col flex-auto flex-shrink-0 ".concat(t?"items-center justify-center p-20 md:p-40":""))},D.createElement("div",{className:"flex flex-col w-full ".concat(t?"items-center justify-center":"")},D.createElement(V.Z,{animation:"transition.expandIn"},D.createElement(F.Z,{className:"".concat(t?"w-full max-w-512":"")},D.createElement(M.Z,{className:"flex flex-col ".concat(t?"items-center justify-center":"")},D.createElement(L.Z,{activeStep:v,orientation:"vertical"},E.map(function(e,t){return D.createElement(R.Z,{key:e},D.createElement(W.Z,null,n(e)),D.createElement(z.Z,null,D.createElement(B.Z,null,function(e,t){switch(e){case 0:return D.createElement(oe,t);case 1:return D.createElement(ae,N()({isCompany:!0},t));default:return"Unknown step"}}(t,0==t?{form:o,handleChangeAfterRemoveError:k,error:j}:1==t?{setFile:P,file:O,remove:function(){return P(null)}}:{typologyList:i,optionList:s})),D.createElement("div",{className:(0,Q.Z)(g.actionsContainer,"text-center custom-btn-group mt-12")},D.createElement("div",null,D.createElement(G.Z,{variant:"contained",size:"large",className:(0,Q.Z)(g.button,"mr-8"),disabled:0===v,onClick:w},n("BACK")),D.createElement(G.Z,{size:"large",variant:"contained",color:"primary",className:g.button,onClick:x},v===E.length-1?n("FINISH"):n("NEXT"))))))})),D.createElement(D.Fragment,null,D.createElement(H.Z,{square:!0,elevation:0,className:g.resetContainer},D.createElement(B.Z,null,n("STEP_COMPLETE_MESSAGE")),0<e&&D.createElement(U.Z,{position:"relative",display:"inline-flex",className:g.progBox},D.createElement(Y.Z,{variant:"static",color:"primary",value:e}),D.createElement(U.Z,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},D.createElement(B.Z,{variant:"caption",component:"div",color:"textInfo"},"".concat(Math.round(e),"%")))))))))))}))}}]);