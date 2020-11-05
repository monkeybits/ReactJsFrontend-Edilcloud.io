(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[12],{3457:function(e,t,a){"use strict";a.r(t);var n=a(139),r=a.n(n),l=a(202),c=a(12),o=a(2),i=a(8),u=a(0),m=a.n(u),s=a(199),p=a(958),b=a(2102),d=a(2104),f=a(2105),h=a(2263),v=a(149),g=a(196),j=a(74),E=a(6),y=a(54),O=a(121),x=a(15),C=a(162),k=a(7),N=a(252),w=a(1828),T=a(3),_=a(1849),S=a(285),A=Object(p.a)((function(e){return{root:{background:"radial-gradient(".concat(Object(N.darken)(e.palette.primary.dark,.5)," 0%, ").concat(e.palette.primary.dark," 80%)"),color:e.palette.primary.contrastText}}}));Object(k.a)({root:{color:S.a[400],"&$checked":{color:S.a[600]}},checked:{}})((function(e){return m.a.createElement(_.a,Object.assign({color:"default"},e))}));var W=function(e){var t=e.form,a=e.handleChangeAfterRemoveError,n=e.error,r=a;return A(),m.a.createElement("form",{name:"registerForm",className:"flex flex-col justify-center w-full"},m.a.createElement(w.a,{error:n.name.length,helperText:!!n.name.length&&n.name[0],className:"mb-8",label:"Company Name",autoFocus:!0,type:"text",name:"name",value:t.name,onChange:r,variant:"outlined",required:!0,fullWidth:!0}),m.a.createElement(w.a,{className:"mb-8",label:"Description",autoFocus:!0,type:"text",name:"desc",value:t.desc,onChange:r,variant:"outlined",required:!0,fullWidth:!0}),m.a.createElement(w.a,{className:"mb-8",label:"Company Email",type:"email",name:"email",value:t.email,onChange:r,variant:"outlined",required:!0,fullWidth:!0}),m.a.createElement(w.a,{className:"mb-8",label:"VAT Number",type:"text",name:"vat_number",value:t.vat_number,onChange:r,variant:"outlined",required:!0,fullWidth:!0}),m.a.createElement(w.a,{className:"mb-8",label:"Website Url",type:"text",name:"url",value:t.url,onChange:r,variant:"outlined",required:!0,fullWidth:!0}),m.a.createElement(w.a,{className:"mb-8",label:"Telephone number",type:"text",name:"phone",value:t.phone,onChange:r,variant:"outlined",required:!0,fullWidth:!0}))},F=a(897),q=a(3460),z=a(1893),D=a.n(z),L=a(1894),I=a.n(L),J=m.a.createElement(D.a,{fontSize:"small"}),P=m.a.createElement(I.a,{fontSize:"small"});function R(e){var t=e.optionList;return m.a.createElement(q.a,{multiple:!0,id:"company-category",options:t,disableCloseOnSelect:!0,getOptionLabel:function(e){return e.title},renderOption:function(e,t){var a=t.selected;return m.a.createElement("div",null,e.mainTitle&&m.a.createElement(j.a,{className:"h2 mb-8 ml-12"},e.mainTitle),m.a.createElement("div",null,m.a.createElement(F.a,{icon:J,checkedIcon:P,style:{marginRight:8},checked:a}),e.title))},renderInput:function(e){return m.a.createElement(w.a,Object.assign({},e,{variant:"outlined",label:"Company Categories"}))}})}var U=a(2300),B=a(11),G=a(14),H=a(1790),M=a(1792),Q=a(53),V=Object(p.a)((function(e){return{root:{width:"100%",background:"radial-gradient(".concat(Object(N.darken)(e.palette.primary.dark,.5)," 0%, ").concat(e.palette.primary.dark," 80%)"),color:e.palette.primary.contrastText},button:{marginTop:e.spacing(1),width:"190px"},actionsContainer:{marginBottom:e.spacing(2)},resetContainer:{padding:e.spacing(3)}}}));t.default=Object(y.l)(Object(E.b)((function(e){return{user:e.auth.user.data}}))((function(e){e.user,e.history;var t=Object(s.c)({name:"",desc:"",email:"",vat_number:"",url:"",phone:""}),a=t.form,n=t.handleChange,p=(t.resetForm,t.setForm),k=Object(E.d)((function(e){return e.chatApp.company})),N=Object(E.c)(),w=m.a.useState([]),_=Object(i.a)(w,2),S=_[0],A=_[1],F=m.a.useState([]),q=Object(i.a)(F,2),z=q[0],D=q[1],L=m.a.useState(!1),I=Object(i.a)(L,2),J=I[0],P=I[1],$=Object(y.h)(),K=V(),X=m.a.useState(0),Y=Object(i.a)(X,2),Z=Y[0],ee=Y[1],te=["Company Details","Company Categories","Company Logo"],ae=m.a.useState("English"),ne=Object(i.a)(ae,2),re=(ne[0],ne[1],m.a.useState(null)),le=Object(i.a)(re,2),ce=le[0],oe=le[1],ie=m.a.useState({name:[],slug:[],url:[],email:[],vat_number:[],phone:[]}),ue=Object(i.a)(ie,2),me=ue[0],se=ue[1];Object(u.useEffect)((function(){Object(B.b)(x.Mb,{},(function(e){var t=e;if(Array.isArray(e)){var a=[];t.map((function(e,n){Object(B.b)(Object(x.Nb)(e.code),{},(function(r){Array.isArray(r)&&(r.map((function(t,a){r[a]=Object(o.a)(Object(o.a)({},r[a]),{},{mainTitle:0==a?e.name:void 0,title:r[a].name})})),a=[].concat(Object(c.a)(a),Object(c.a)(r)),D(Object(c.a)(a))),t[n]=Object(o.a)(Object(o.a)({},t[n]),{},{subCategory:r});A(t)}),(function(e){return console.log({listErr:e})}),B.a.GET,Object(G.c)())}))}}),(function(e){return console.log(e)}),B.a.GET,Object(G.c)())}),[]),Object(u.useEffect)((function(){N(Q.v())}),[]),Object(u.useEffect)((function(){$&&(console.log({routeHistory:$}),"/edit-company"==$.location.pathname&&(P(!0),console.log({company:k}),oe({imagePreviewUrl:k.logo}),p({id:k.id,name:k.name,desc:k.description,email:k.email,vat_number:k.vat_number,url:k.url,phone:k.phone})))}),[$,k]);var pe=function(){ee((function(e){return e+1})),2==Z&&de()},be=function(){ee((function(e){return e-1}))},de=function(){var e=Object(l.a)(r.a.mark((function e(){var t,n,l,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=new FormData,e.t0=a.name,e.t1=a.name.split(" ").join("_"),e.t2=a.desc,e.t3=a.url,e.t4=a.vat_number,e.t5=a.email,e.t6=a.phone,!ce||!ce.fileData){e.next=14;break}return e.next=11,Object(G.b)(ce.fileData);case 11:e.t7=e.sent,e.next=15;break;case 14:e.t7=void 0;case 15:for(c in e.t8=e.t7,n={name:e.t0,slug:e.t1,description:e.t2,url:e.t3,vat_number:e.t4,email:e.t5,phone:e.t6,logo:e.t8},l=localStorage.getItem("jwt_access_token"),n)n[c]&&t.append(c,n[c]);(J?O.a.put(Object(x.Rb)(k.id),t,{headers:{"Content-Type":"multipart/form-data",Authorization:"JWT ".concat(l)}}):O.a.post(x.Qb,t,{headers:{"Content-Type":"multipart/form-data",Authorization:"JWT ".concat(l)}})).then((function(e){J?(console.log("routeHistorynextPath",$.location.state.nextPath),$.push($.location.state.nextPath)):$.push("/apps/companies")})).catch((function(e){var t=e.response.data,a=t.name,n=t.url,r=t.email,l=t.vat_number,c=t.phone;se({name:a||[],url:n||[],email:r||[],vat_number:l||[],phone:c||[]}),ee(0)}));case 21:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),fe=function(e){se({name:[],slug:[],url:[],email:[],vat_number:[],phone:[]}),n(e)};return m.a.createElement("div",{className:Object(T.default)(K.root,"flex flex-col flex-auto flex-shrink-0 items-center justify-center p-20 md:p-40")},m.a.createElement("div",{className:"flex flex-col items-center justify-center w-full"},m.a.createElement(C.a,{animation:"transition.expandIn"},m.a.createElement(H.a,{className:"w-full max-w-512"},m.a.createElement(M.a,{className:"flex flex-col items-center justify-center"},m.a.createElement(b.a,{activeStep:Z,orientation:"vertical"},te.map((function(e,t){return m.a.createElement(d.a,{key:e},m.a.createElement(f.a,null,e),m.a.createElement(h.a,null,m.a.createElement(j.a,null,function(e,t){switch(e){case 0:return m.a.createElement(W,t);case 1:return m.a.createElement(R,t);case 2:return m.a.createElement(U.a,t);default:return"Unknown step"}}(t,0==t?{form:a,handleChangeAfterRemoveError:fe,error:me}:1==t?{typologyList:S,optionList:z}:{setFile:oe,file:ce,remove:function(){return oe(null)}})),m.a.createElement("div",{className:Object(T.default)(K.actionsContainer,"text-center custom-btn-group mt-12")},m.a.createElement("div",null,m.a.createElement(v.a,{variant:"contained",size:"large",className:Object(T.default)(K.button,"mr-8"),disabled:0===Z,onClick:be},"Back"),m.a.createElement(v.a,{size:"large",variant:"contained",color:"primary",className:K.button,onClick:pe},Z===te.length-1?"Finish":"Next")))))}))),Z===te.length&&m.a.createElement(g.a,{square:!0,elevation:0,className:K.resetContainer},m.a.createElement(j.a,null,"All steps completed - you're finished")))))))})))}}]);