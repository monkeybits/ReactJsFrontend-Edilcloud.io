(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[69763,23814],{54034:function(e,t,n){"use strict";var d=n(97439),f=n(24612),m=n(84818),p=n(78709),i=n(16526),g=n(30367),i=n(6274),v=n(86926),h=n(54059),b=n(29796),n=p.forwardRef(function(e,t){var n=e.activeStep,i=void 0===n?0:n,o=e.backButton,r=e.classes,a=e.className,l=e.LinearProgressProps,c=e.nextButton,s=e.position,u=void 0===s?"bottom":s,n=e.steps,s=e.variant,s=void 0===s?"dots":s,e=(0,m.Z)(e,["activeStep","backButton","classes","className","LinearProgressProps","nextButton","position","steps","variant"]);return p.createElement(v.Z,(0,d.Z)({square:!0,elevation:0,className:(0,g.Z)(r.root,r["position".concat((0,h.Z)(u))],a),ref:t},e),o,"text"===s&&p.createElement(p.Fragment,null,i+1," / ",n),"dots"===s&&p.createElement("div",{className:r.dots},(0,f.Z)(new Array(n)).map(function(e,t){return p.createElement("div",{key:t,className:(0,g.Z)(r.dot,t===i&&r.dotActive)})})),"progress"===s&&p.createElement(b.Z,(0,d.Z)({className:r.progress,variant:"determinate",value:Math.ceil(i/(n-1)*100)},l)),c)});t.Z=(0,i.Z)(function(e){return{root:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",background:e.palette.background.default,padding:8},positionBottom:{position:"fixed",bottom:0,left:0,right:0,zIndex:e.zIndex.mobileStepper},positionTop:{position:"fixed",top:0,left:0,right:0,zIndex:e.zIndex.mobileStepper},positionStatic:{},dots:{display:"flex",flexDirection:"row"},dot:{backgroundColor:e.palette.action.disabled,borderRadius:"50%",width:8,height:8,margin:"0 2px"},dotActive:{backgroundColor:e.palette.primary.main},progress:{width:"50%"}}},{name:"MuiMobileStepper"})(n)},61904:function(e,t,n){"use strict";var i=n(78709),n=n(24770);t.Z=(0,n.Z)(i.createElement("path",{d:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"}),"KeyboardArrowLeft")},39493:function(e,t,n){"use strict";var i=n(78709),n=n(24770);t.Z=(0,n.Z)(i.createElement("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"}),"KeyboardArrowRight")},24770:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var i=n(97439),o=n(78709),r=n(68610);function a(n,e){var t=o.memo(o.forwardRef(function(e,t){return o.createElement(r.Z,(0,i.Z)({ref:t},e),n)}));return t.muiName=r.Z.muiName,t}},2772:function(e,t,n){"use strict";n.d(t,{Y2:function(){return i},Q7:function(){return o},I_:function(){return r},_:function(){return a},L2:function(){return l},GC:function(){return c},zn:function(){return s},aA:function(){return u},yn:function(){return d}});var i="/assets/fileIcons/audio-icon@2x.png",o="/assets/fileIcons/video-icon@2x.png",r="/assets/fileIcons/image-icon@2x.png",a="/assets/fileIcons/zip-icon@2x.png",l="/assets/fileIcons/excel-icon@2x.png",c="/assets/fileIcons/doc-icon@2x.png",s="/assets/fileIcons/pdf-icon@2x.png",u="/assets/fileIcons/generic-icon@2x.png",d="/assets/fileIcons/slides-icon@2x.png"},69763:function(e,t,n){"use strict";n.r(t);var i=n(68357),j=n.n(i),i=n(61432),O=n.n(i),i=n(56156),o=n.n(i),i=n(79545),z=n.n(i),i=n(28129),_=n.n(i),A=n(94678),B=n(38932),T=n(84403),D=n(48258),F=n(96282),L=n(41713),M=n(73772),R=n(92466),U=n(13786),W=n(65087),G=n(78709),Y=n(88572),X=n(11208),H=n(3089),K=n(58913),q=n(10588),Q=n(49073),V=n(53369),$=n(23814);n(90);function r(t,e){var n,i=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),i.push.apply(i,n)),i}function J(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach(function(e){o()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var ee=(0,n(32986).ZP)(function(){return Promise.all([n.e(10930),n.e(25872)]).then(n.bind(n,73430))});n(95679);t.default=function(e){var t=e.isTask,n=e.taskId,i=(e.postId,e.setIsEditPost),o=e.currnetPost,r=e.setPost,a=(0,V.$)("todo_project").t,l=((0,K.I0)(),G.useState()),c=O()(l,2)[1],s=(G.useCallback(function(){return c({})},[]),(0,K.v9)(function(e){return e.auth.user.data.company})),u=(0,G.useState)({}),d=((p=O()(u,2))[0],p[1]),f=(0,G.useState)({posts:[]}),u=(l=O()(f,2))[0],m=l[1],p=(0,G.useState)({}),l=((f=O()(p,2))[0],f[1],(0,G.useState)("")),g=(p=O()(l,2))[0],v=p[1],f=(0,G.useState)(null),h=(l=O()(f,2))[0],b=l[1],p=(0,G.useState)(!1),l=((f=O()(p,2))[0],f[1],(0,G.useState)(!1)),f=(p=O()(l,2))[0],x=p[1],l=(0,G.useState)(!1),E=(p=O()(l,2))[0],y=p[1],l=(0,G.useState)({files:[]}),Z=((p=O()(l,2))[0],p[1]),p=null===(l=(0,K.v9)(function(e){return e.notificationPanel}).notificationData)||void 0===l?void 0:l.notification,l=(document.getElementById("post".concat(null==p?void 0:p.object_id)),(0,G.useState)({fileData:void 0,imagePreviewUrl:void 0})),k=((p=O()(l,2))[0],p[1]),w=(0,G.useRef)(null),P=(0,K.v9)(function(e){var t;return(null!==(t=e.todoAppNote)&&void 0!==t&&(null!==(t=t.todos)&&void 0!==t&&t.todoDialog)?e.todoAppNote:e.todoApp).todos.todoDialog}),N=(0,H.Fc)(),l=[{icon:"public",name:"Public",handler:function(){y(!0)}},{icon:"lock",name:"Private",handler:function(e){y(!1)}}];(0,G.useEffect)(function(){v(e.currnetPost.text)},[e.currnetPost.text]),(0,G.useEffect)(function(){s&&d(J({},s))},[s]),(0,G.useEffect)(function(){var e;null!==(e=P.data)&&void 0!==e&&(null!==(e=e.todo)&&void 0!==e&&e.id)&&I()},[P.data]),(0,G.useEffect)(function(){t&&(C(),I())},[t]);var S,I=function(){var e;(0,Y.k)(t?(0,X.ri)(n):(0,X._j)(null===(e=P.data.todo)||void 0===e?void 0:e.id),{},function(t){m(function(e){return J(J({},e),{},{posts:t.results})});var e,e=(e=t.results,Array.isArray(e)&&e.length?(console.log({timeline:e}),e.reduce(function(e,t){return{media_set:[].concat(z()(e.media_set),z()(t.media_set)).map(function(e,t){return J(J({},e),{},{index:t})})}},{media_set:[]})):{media_set:[]});Z({files:e.media_set})},function(e){return console.log(e)},Y.Y.GET,(0,H.XW)())},p=function(){var t=j()(_().mark(function e(t){var n,i,o,r,a,l;return _().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.currentTarget.files,i=t.currentTarget.files[0],console.log("File size ".concat(i.size/1024/1024," MB")),console.log("File Index 0",i),"image"==(null===(o=i.type)||void 0===o?void 0:o.split("/")[0]))return e.next=7,(0,q.Z)(i,{maxSizeMB:.1,maxWidthOrHeight:1024,useWebWorker:!0});e.next=15;break;case 7:o=e.sent,console.log("without compressedFile(blob)",o),console.log("compressedFile into the file",new File([o],o.name)),console.log("compressedFile instanceof Blob",o instanceof Blob),console.log("compressedFile size ".concat(o.size/1024/1024," MB")),k({fileData:new File([o],o.name)}),e.next=16;break;case 15:k({fileData:i});case 16:r=[],a=0;case 18:if(!(a<n.length)){e.next=42;break}if(l=null===(l=n[a].type)||void 0===l?void 0:l.split("/"),console.log({fileType:l}),e.t0=[],e.t1=z()(r),"image"==l[0])return e.next=26,(0,H.y6)(n[a]);e.next=29;break;case 26:e.t2=e.sent,e.next=30;break;case 29:e.t2=n[a];case 30:e.t3=e.t2,e.t4=URL.createObjectURL(n[a]),e.t5=l[0],e.t6=".".concat(l[1]),e.t7=l.join("/"),e.t8={file:e.t3,imgPath:e.t4,fileType:e.t5,extension:e.t6,type:e.t7},e.t9=[e.t8],r=e.t0.concat.call(e.t0,e.t1,e.t9),b(r);case 39:a++,e.next=18;break;case 42:case"end":return e.stop()}},e)}));return function(e){return t.apply(this,arguments)}}(),C=function(){(0,Y.k)((0,X.t7)(n),{},function(t){return m(function(e){return J(J({},e),{},{sharedPosts:t.results})})},function(e){return console.log(e)},Y.Y.GET,(0,H.XW)())};return u?G.createElement("div",{className:"md:flex max-w-2xl"},G.createElement("div",{className:"flex flex-col flex-1"},G.createElement("div",null,G.createElement(A.Z,{className:"w-full overflow-hidden post-form mb-20 post-card-clx"},G.createElement(B.Z,{id:"addPost",className:"p-16 w-full write-post",classes:{root:"text-14"},placeholder:a("WRITE_SOMETHING"),multiline:!0,rows:"3",margin:"none",disableUnderline:!0,value:g,onChange:function(e){return v(e.target.value)}}),h&&G.createElement($.default,{images:h,replaceUrl:function(e,t){h[t]=J(J({},h[t]),{},{imgPath:e,file:Q.Z.dataURItoFile(e)}),b(h)}}),G.createElement(T.Z,{className:"card-footer flex flex-row border-t-1 items-center justify-between pt-8 pb-6 pr-12 pl-10",position:"static",color:"default",elevation:0},G.createElement("div",{className:"add-photo-image flex"},G.createElement(D.Z,{onClick:function(){return w.current.click()},"aria-label":"Add photo",className:"p-8"},G.createElement(F.Z,null,"photo")),G.createElement("input",{hidden:!0,multiple:!0,type:"file",accept:"image/*, video/*",ref:w,onChange:p}),"w"!==(null==N||null===(S=N.extra)||void 0===S?void 0:S.profile.role)&&G.createElement("div",{className:"inline"},G.createElement(ee,{icon:G.createElement(G.Fragment,null,G.createElement(D.Z,{"aria-label":"Change status"},G.createElement(F.Z,null,"visibility"))),outsideClick:!0},l.map(function(e){return G.createElement(L.Z,{key:e.name,selected:"Pyxis"===e.name,onClick:e.handler},G.createElement(M.Z,null,G.createElement(F.Z,null,e.icon)),G.createElement(R.Z,{variant:"inherit"}," ",a(e.name)))})))),G.createElement("div",null,G.createElement(U.Z,{className:"mr-4",onClick:function(){x(!0),(0,Y.k)((0,X.yg)(o.id),J(J({},o),{},{text:g,is_public:E}),function(t){r(function(e){return J(J({},e),t)}),i(!1),x(!1)},function(e){x(!1),console.log(e)},Y.Y.PUT,(0,H.XW)())},variant:"contained",color:"primary",size:"large","aria-label":"post"},a("SAVE")," ",f&&G.createElement(W.Z,{size:20,color:"secondary",className:"ml-20"})),G.createElement(U.Z,{onClick:function(){return i(!1)},color:"secondary",size:"large","aria-label":"post"},a("CANCEL")))))))):null}},23814:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var i=n(61432),s=n.n(i),u=n(78709),t=n(40962),d=n(58626),f=n(13786),m=n(54034),p=n(61904),g=n(39493),v=n(28344),h=n(2772),i=n(32986),b=(0,i.ZP)(function(){return Promise.all([n.e(60894),n.e(34100),n.e(26457)]).then(n.bind(n,26457))}),x=(0,i.ZP)(function(){return Promise.all([n.e(7311),n.e(21066)]).then(n.bind(n,21066))}),E=(0,t.Z)(function(e){return{root:{width:"70%",flexGrow:1,margin:4},header:{display:"flex",alignItems:"center",height:50,paddingLeft:e.spacing(4),backgroundColor:e.palette.background.default},img:{height:255,maxWidth:400,overflow:"hidden",display:"block",width:"100%"}}});function o(n){var e=E(),t=(0,d.Z)(),i=u.useState(0),o=s()(i,2),r=o[0],a=o[1],i=u.useState(!1),o=s()(i,2),i=o[0],l=o[1],o=u.useState({height:400,width:400}),o=s()(o,2),c=(o[0],o[1]),o=n.images.length;return u.createElement("div",{className:(0,v.Z)(e.root,"d-block mx-auto nomargin")},u.createElement(b,{imgSrc:n.images[r].imgPath,open:i,onClose:function(){return l(!1)},replaceUrl:function(e){return n.replaceUrl(e,r)}}),!n.hideModify&&u.createElement("div",{className:"flex justify-end items-end"},u.createElement(f.Z,{size:"small",variant:"contained",color:"primary",className:"mb-16 mr-12",onClick:function(){var e,t;e=n.images[r].imgPath,(t=new Image).onload=function(){var e=this.height,t=this.width;c({height:e,width:t}),l(!0)},t.src=e}},"Modify")),"image"==n.images[r].fileType?u.createElement("img",{className:"object-cover h-288 w-full",src:n.images[r].imgPath}):"video"==n.images[r].fileType?u.createElement(x,{width:"100%",height:"100%",video_url:n.images[r].imgPath}):u.createElement("img",{src:h.aA}),u.createElement(m.Z,{steps:o,position:"static",variant:"text",activeStep:r,className:"my-10",nextButton:u.createElement("div",null,r!==o-1&&u.createElement(f.Z,{size:"small",onClick:function(){a(function(e){return e+1})}},"Next","rtl"===t.direction?u.createElement(p.Z,null):u.createElement(g.Z,null))),backButton:u.createElement("div",null,0!==r&&u.createElement(f.Z,{size:"small",onClick:function(){a(function(e){return e-1})}},"rtl"===t.direction?u.createElement(g.Z,null):u.createElement(p.Z,null),"Back"))}))}}}]);