(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[78018],{61904:function(e,t,n){"use strict";var i=n(78709),n=n(24770);t.Z=(0,n.Z)(i.createElement("path",{d:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"}),"KeyboardArrowLeft")},39493:function(e,t,n){"use strict";var i=n(78709),n=n(24770);t.Z=(0,n.Z)(i.createElement("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"}),"KeyboardArrowRight")},24770:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var i=n(97439),a=n(78709),r=n(68610);function l(n,e){var t=a.memo(a.forwardRef(function(e,t){return a.createElement(r.Z,(0,i.Z)({ref:t},e),n)}));return t.muiName=r.Z.muiName,t}},78018:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var i=n(61432),s=n.n(i),d=n(78709),a=n(40962),f=n(58626),g=n(54034),h=n(13786),p=n(61904),v=n(39493),Z=n(28344),r=n(97070),t=n(66126),i=n(32986),E=(0,i.ZP)(function(){return Promise.all([n.e(7311),n.e(21066)]).then(n.bind(n,21066))}),b=(0,i.ZP)(function(){return Promise.all([n.e(60894),n.e(57945)]).then(n.bind(n,18084))}),k=(0,t.bH)(r.Z),w=(0,a.Z)(function(e){return{root:{width:"70%",flexGrow:1,margin:4},header:{display:"flex",alignItems:"center",height:50,paddingLeft:e.spacing(4),backgroundColor:e.palette.background.default},img:{height:300,maxWidth:400,overflow:"hidden",display:"block",width:"100%"}}});function l(a){var e=w(),t=(0,f.Z)(),n=(0,d.useState)(0),i=s()(n,2),r=i[0],l=i[1],u=(0,d.useState)(!1),n=s()(u,2),i=(n[0],n[1],(0,d.useState)({height:400,width:400})),u=s()(i,2),c=(u[0],u[1],a.media),n=(0,d.useState)(!1),i=s()(n,2),u=i[0],o=i[1],n=(0,d.useState)(0),i=s()(n,2),n=i[0],m=i[1],i=a.images.length;if(0===a.images.length)return null;return d.createElement("div",{className:(0,Z.Z)(e.root,"d-block mx-auto nomargin")},d.createElement(k,{axis:"rtl"===t.direction?"x-reverse":"x",index:r,onChangeIndex:function(e){l(e)},enableMouseEvents:!0},a.images.map(function(e,n){var t,i;return d.createElement("div",{key:e.label},Math.abs(r-n)<=2&&null!==(t=a.images[r])&&void 0!==t&&t.type?d.createElement(d.Fragment,null,"image"==(null===(t=a.images[r])||void 0===t||null===(i=t.type)||void 0===i?void 0:i.split("/")[0])?d.createElement("img",{className:"object-cover h-288 w-full",src:a.images[r].media_url,onClick:function(){var t,e;t=n,(e=c.filter(function(e){return e.id===a.images[t].id})[0])&&(o(!0),m(e.index))}}):d.createElement(E,{width:"100%",height:"100%",video_url:a.images[r].media_url})):null)})),!a.hideNavigation&&i&&1<i&&d.createElement(g.Z,{steps:i,position:"static",variant:"text",activeStep:r,className:"my-10",nextButton:d.createElement("div",null,r!==i-1&&d.createElement(h.Z,{size:"small",onClick:function(){l(function(e){return e+1})},disabled:r===i-1},"Next","rtl"===t.direction?d.createElement(p.Z,null):d.createElement(v.Z,null))),backButton:d.createElement("div",null,0!==r&&d.createElement(h.Z,{size:"small",onClick:function(){l(function(e){return e-1})},disabled:0===r},"rtl"===t.direction?d.createElement(v.Z,null):d.createElement(p.Z,null),"Back"))}),!!a.media&&d.createElement(b,{isOpenViewFile:u,imagesArray:a.media,activtStep:n,closeViewFile:function(){return o(!1)},nameSpace:"todo_project"}))}}}]);