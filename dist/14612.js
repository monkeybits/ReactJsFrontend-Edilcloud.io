(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[14612],{14612:function(e,t,n){"use strict";n.r(t);var a=n(51265),f=n.n(a),l=n(61432),d=n.n(l),p=n(42401),a=n(32986),E=n(94678),g=n(1737),h=n(92466),x=n(78997),N=n(89766),Z=n(13786),v=n(41533),b=n(50390),y=n(41713),w=n(88325),l=n(40962),k=n(58626),P=n(28344),_=n(52178),I=n(78709),S=n(12707),T=n(53369),A=n(58913),C=n(68164),j=n(88572),U=n(11208),R=n(43812),H=(n(96133),n(8662)),O=n(7608),D=(0,a.ZP)(function(){return n.e(26213).then(n.bind(n,26213))}),z=(0,a.ZP)(function(){return n.e(29199).then(n.bind(n,29199))}),G=(0,a.ZP)(function(){return Promise.all([n.e(10930),n.e(73430)]).then(n.bind(n,73430))}),L=(0,a.ZP)(function(){return Promise.all([n.e(60894),n.e(87161)]).then(n.bind(n,15906))}),M=(0,a.ZP)(function(){return Promise.all([n.e(63604),n.e(60894),n.e(30250),n.e(71871),n.e(55527),n.e(10971),n.e(17543)]).then(n.bind(n,48892))}),$=(0,l.Z)(function(e){return{root:{background:"#ffffff)",color:e.palette.primary.contrastText},formControl:{margin:e.spacing(1),minWidth:150},selectEmpty:{marginTop:e.spacing(2)}}}),B=[{id:"en",title:"English",flag:"us"},{id:"it",title:"Italian",flag:"tr"}];t.default=function(){var t=this,e=I.useState(!1),n=(u=d()(e,2))[0],a=u[1],l=I.useState("Terms"),r=(c=d()(l,2))[0],s=c[1],e=(0,I.useState)({clientId:"com.monkeybits.edilcloud.signin",redirectURI:"https://test.edilcloud.io",scope:"",state:"",responseType:"code id_token",responseMode:"query",nonce:"",usePopup:!0,designProp:{height:30,width:140,color:"black",border:!1,type:"sign-in",border_radius:15,scale:1,locale:"en_US"}}),l=(u=d()(e,2))[0],c=(u[1],$()),e=(0,T.$)("login").t,i=(0,A.I0)(),o=(0,k.Z)(),m=(0,T.$)().i18n,u=B.find(function(e){return e.id===m.language});return(0,I.useEffect)(function(){return function(){setTimeout(function(){document.getElementById("fuse-splash-screen").style.display="none"},2e3)}},[]),I.createElement(I.Fragment,null,I.createElement("div",{className:(0,P.Z)(c.root,"flex flex-col flex-auto flex-shrink-0 items-center justify-center p-20 sm:p-32 bg-white")},I.createElement("img",{width:"250",src:"assets/images/logos/fuse.svg"}),I.createElement("div",{className:"flex flex-col items-center justify-center w-full max-w-425"},I.createElement(p.Z,{animation:"transition.expandIn"},I.createElement(E.Z,{className:"w-full"},I.createElement(g.Z,{className:"flex flex-col items-center justify-center p-20 sm:p-32"},I.createElement(h.Z,{variant:"h6",className:"text-center font-600 mt-20 mb-4"},e("APP_HEADING")),I.createElement(h.Z,{variant:"subtitle1",className:"text-muted text-center mb-40"},e("APP_SUBHEADER")),I.createElement(x.Z,{container:!0,spacing:2},I.createElement(x.Z,{item:!0,xs:6},I.createElement(D,null)),I.createElement(x.Z,{item:!0,xs:6},I.createElement(z,null))),I.createElement("div",{className:"flex mt-12 w-160 h-36"},I.createElement(O.Z,f()({},l,{callback:function(e){console.log("data",e),e&&(0,j.k)(U.$T,{access_token:e.authorization.id_token,provider:"apple-id",photo:""},function(n){console.log("dfdsgssdfsdfres",n);var a=n.token,e=t.props;e.history,e.dispatch;new Promise(function(e,t){console.log("dfdsgsres",n),n?(_.Z.setSession(a),e(n)):t(n)}).then(function(e){}).catch(function(e){console.log("dfdsgs",e)})},function(e){console.log("dfdsgssdfsdfs",e),R.Am.error(null==e?void 0:e.error)},j.Y.POST)}}))),I.createElement("div",{className:"my-28 flex items-center justify-center or-container"},I.createElement(N.Z,{className:"w-32"}),I.createElement("span",{className:"mx-8 font-size-16 whitespace-no-wrap text-muted"},e("OR_SIGN_IN_WITH_EMAIL")),I.createElement(N.Z,{className:"w-32"})),I.createElement(M,null),I.createElement("div",{className:"flex items-center justify-center w-full pt-16"},I.createElement("span",{className:"text-custom font-600 mr-6"}," ",e("DONT_HAVE_AN_ACCOUNT_ASK"))),I.createElement("div",{className:"flex items-center  justify-center w-full "},I.createElement(Z.Z,{type:"submit",variant:"contained",size:"large",className:"w-full bg-dark-blue mx-auto mt-16 uppercase","aria-label":"Register",value:"legacy"},I.createElement(S.rU,{className:"text-white font-600 inline",to:"/pages/auth/register"},e("SIGN_UP"))))))),I.createElement("div",{className:"flex items-center justify-between mt-8 w-full text-default font-600 px-32"},I.createElement(v.Z,{className:(0,P.Z)(c.formControl,"custom-select-remove-border")},I.createElement(G,{icon:I.createElement(I.Fragment,null,I.createElement(b.Z,{id:"demo-simple-select-label"},u.title," ",I.createElement("span",{className:"arrow-icon"}," ",I.createElement(H.Z,null)," ")," ")),outsideClick:!0},B.map(function(n){return I.createElement(y.Z,{key:n.id,onClick:function(){return e=n,t=m.dir(e.id),localStorage.setItem("language",e.id),m.changeLanguage(e.id),void(t!==o.direction&&i(C.UD({direction:t})));var e,t}},I.createElement(w.Z,{primary:n.title}))}))),I.createElement("div",{className:"flex"},I.createElement("a",{href:"javascript:;",className:"text-muted mr-20"},e("HELP")),I.createElement("a",{href:"javascript:;",className:"text-muted mr-20",onClick:function(){s("Privacy"),a(!0)}},e("PRIVACY")),I.createElement("a",{href:"javascript:;",className:"text-muted",onClick:function(){a(!0),s("Terms")}},e("TERMS")))))),I.createElement(L,{open:n,setOpen:a,title:r}))}}}]);