(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[97795],{97795:function(e,t,a){"use strict";a.r(t);var n=a(56156),o=a(79545),k=a.n(o),r=a(61432),w=a.n(r),l=a(51265),i=(a(20305),a(16526)),n=a.n(i),o=a(32986),D=(a(92505),a(35923)),r=(a(65129),a(1644),a(92466),a(40962)),l=a(6274),c=a(12303),_=a(96282),C=a(48258),y=a(80896),i=a(78279),E=a.n(i),N=a(78709),S=a(58913),A=a(55110),Z=a(90),I=a(3089),T=a(53369),F=a(35965);var j=(0,o.ZP)(function(){return Promise.resolve().then(a.bind(a,4330))});n().node,n().any.isRequired,n().any.isRequired;(0,r.Z)(function(e){return{root:{flexGrow:1,minHeight:"100%",backgroundColor:e.palette.background.paper}}});r="0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)",(0,l.Z)({root:{color:"#3880ff",height:2,padding:"15px 0"},thumb:{height:28,width:28,backgroundColor:"#fff",boxShadow:r,marginTop:-14,marginLeft:-14,"&:focus, &:hover, &$active":{boxShadow:"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)","@media (hover: none)":{boxShadow:r}}},active:{},valueLabel:{left:"calc(-50% + 12px)",top:-22,"& *":{background:"transparent",color:"#000"}},track:{height:2},rail:{height:2,opacity:.5,backgroundColor:"#bfbfbf"},mark:{backgroundColor:"#bfbfbf",height:8,width:1,marginTop:-3},markActive:{opacity:1,backgroundColor:"currentColor"}})(c.Z);t.default=function(e){function t(e){return"".concat(e.first_name," ").concat(e.last_name)}(0,T.$)("dashboard").t;var a=(0,S.I0)(),n=((0,S.v9)(function(e){return e.todoAppNote.todos.upload}),(0,S.v9)(function(e){return e.todoAppNote.todos.taskContentDialog}),(0,S.v9)(function(e){return null===(e=e.todoAppNote.todos.taskContentDialog)||void 0===e?void 0:e.data})),o=(0,S.v9)(function(e){return e.todoAppNote.todos.openDrawingContent}),r=(0,S.v9)(function(e){return e.contactsApp.contacts.approvedCompanies}),l=(0,N.useState)([]),i=((p=w()(l,2))[0],p[1]),l=(0,N.useState)([]),l=((p=w()(l,2))[0],p[1],(0,N.useState)([])),c=((p=w()(l,2))[0],p[1]),l=(0,N.useState)(0),d=((p=w()(l,2))[0],p[1]),l=(0,N.useState)(!1),s=((p=w()(l,2))[0],p[1],(0,A.UO)()),u=(0,S.v9)(function(e){e=e.chatApp;return null==e?void 0:e.company}),l=null==n?void 0:n.project,p=(0,N.useState)({startDate:new Date,endDate:void 0}),m=((p=w()(p,2))[0],p[1]),p=N.useState(0),f=((p=w()(p,2))[0],p[1]);function v(){var e;return null==b||null===(e=b.extra)||void 0===e?void 0:e.profile.role}(0,N.useEffect)(function(){var e;console.log("openDrawingContent?????????????????????????",o),o&&(f(1),"wrapped-tab-".concat(e=1),"wrapped-tabpanel-".concat(e))},[o]),(0,N.useEffect)(function(){var e;r&&r.length&&n&&(e=k()(r).filter(function(e){var t,a;return(null===(e=e.profile)||void 0===e||null===(t=e.company)||void 0===t?void 0:t.id)==(null==n||null===(a=n.assigned_company)||void 0===a?void 0:a.id)}).map(function(e){var t,a;return{data:e,value:null===(t=e.profile)||void 0===t||null===(a=t.company)||void 0===a?void 0:a.name,label:N.createElement("span",{className:"flex items-center"},N.createElement(_.Z,{className:"list-item-icon mx-6 text-20",style:{color:null===(a=e.profile.company)||void 0===a?void 0:a.color_project},color:"action"},"label")," ",e.profile.company.name)}}),c(e)),n&&(console.log({taskContentData:n,date_start:n.date_start}),n.isGantt&&1==n.parent?(m({startDate:new Date(n.datetime_start),endDate:new Date(n.datetime_end)}),d(n.progress),i(n.workers.map(function(e){return{data:e,value:t(e),label:N.createElement("span",{className:"flex items-center"},t(e))}})),x()):(m({startDate:new Date(n.date_start),endDate:new Date(n.date_end)}),d(n.progress),c([{data:n.assigned_company}])))},[r,n]),(0,N.useEffect)(function(){f(0)},[n]);var g,b=(0,I.Fc)(),h=(p=(0,D.cI)({name:1==(null==n?void 0:n.parent)?null==n?void 0:n.title:null==n?void 0:n.name,description:1==(null==n?void 0:n.parent)?null==n?void 0:n.description:null==n?void 0:n.note})).form;p.handleChange,p.setForm,p.setInForm,h&&h.due&&E()(h.due).format(E().HTML5_FMT.DATE),console.log({getIsDisabled:(null==n||null===(g=n.assigned_company)||void 0===g?void 0:g.id)!=u.id||"w"==v()||"m"==v(),projectDetail:l,companyDetail:u.id,getRole:v()});var x=function(e){console.log(s.id,n,e)};return N.createElement("div",{className:"w-full custom-task-content mt-20"},N.createElement("div",{className:"absolute right-m-12"},N.createElement(C.Z,{onClick:function(e){return a(Z.ue())},edge:"start",color:"inherit","aria-label":"close",className:"close-icon"},N.createElement(F.Z,null))),N.createElement(y.Z,{id:"dialog-content",className:"p-0"},N.createElement("div",{className:"sm:mx-12"},N.createElement(j,{taskId:null==n?void 0:n.id,attachments:null==n?void 0:n.media_set}))))}}}]);