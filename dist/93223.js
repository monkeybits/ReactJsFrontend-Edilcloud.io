(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[93223,10991],{10991:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return n}});var t=r(61432),a=r.n(t),t=r(82853),o=r.n(t),t=r(82147),l=r.n(t),t=r(40734),c=r.n(t),t=r(38050),i=r.n(t),t=r(3056),s=r.n(t),t=r(71470),m=r.n(t),t=r(56156),u=r.n(t),f=r(48258),d=r(96282),p=r(78709),t=r(78279),b=r.n(t);function g(r){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var e,t=m()(r);return t=n?(e=m()(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments),s()(this,t)}}var h=new(r(86351))({bitRate:320}),n=function(e){i()(n,e);var t=g(n);function n(e){var r;return o()(this,n),r=t.call(this,e),u()(c()(r),"startRecording",function(){h.start().then(function(){r.setState({record:!0})}).catch(function(e){console.error(e)})}),u()(c()(r),"stopRecording",function(){r.setState({record:!1}),h.stop().getMp3().then(function(e){var t=a()(e,2),e=t[0],t=t[1],t=new File(e,"Record ".concat(b()().format("ll"),".mp3"),{type:t.type,lastModified:Date.now()});r.props.afterRecordComplete(t)}).catch(function(e){alert("We could not retrieve your message")})}),u()(c()(r),"sendDirectToChat",function(){r.state.record&&(r.setState({record:!1}),h.stop().getMp3().then(function(e){var t=a()(e,2),e=t[0],t=t[1],t=new File(e,"Record ".concat(b()().format("ll"),".mp3"),{type:t.type,lastModified:Date.now()});r.props.sendDirectToChat(t)}).catch(function(e){alert("We could not retrieve your message")}))}),r.state={record:!1},r}return l()(n,[{key:"render",value:function(){return p.createElement("div",null,this.state.record?p.createElement(p.Fragment,null,p.createElement("div",{className:"sound-icon"},p.createElement("div",{className:"sound-wave"},p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}),p.createElement("i",{className:"bar"}))),p.createElement("div",{className:"blink"}),p.createElement(f.Z,{key:"close","aria-label":"Close",color:"inherit",onClick:this.stopRecording},p.createElement(d.Z,null,"mic"))):p.createElement(f.Z,{key:"close","aria-label":"Close",color:"inherit",onClick:this.startRecording},p.createElement(d.Z,null," mic_off")))}}]),n}(p.Component)},93223:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return a}});var n=r(79545),m=r.n(n),t=r(68357),u=r.n(t),n=r(61432),f=r.n(n),t=r(28129),d=r.n(t),p=r(78709),b=r(86926),g=r(82186),h=r(48258),v=r(96282),n=r(40962),E=r(28344),x=r(58913),y=r(3089),R=r(10991),N=r(72131),t=r(32986),o=r(92466),l=r(13786),c=r(41713),i=r(62475),s=r(79337),w=(0,t.ZP)(function(){return Promise.all([r.e(10930),r.e(25872)]).then(r.bind(r,73430))});var k=function(t){var e=(0,p.useState)(null),r=(e=f()(e,2))[0],n=e[1];function a(e){return p.createElement("div",{className:"flex my-8 px-8",key:t.item.id},p.createElement("div",{className:"flex items-center justify-center min-w-128 w-128 h-128 relative"},p.createElement(b.Z,{className:"rounded-4 overflow-hidden",elevation:1},e,p.createElement(v.Z,{className:"text-20 image-close cursor-pointer",onClick:t.onRemove},"close"))))}switch(t.item.fileType){case"image":return p.createElement("div",{className:"flex my-8 px-8",key:t.item.id},p.createElement("div",{className:"flex items-center justify-center min-w-128 w-128 h-128 relative"},p.createElement(b.Z,{className:"rounded-4 overflow-hidden relative",elevation:1},p.createElement("img",{className:"block h-128 w-128 object-cover",src:t.item.imgPath,alt:"attachment"}),p.createElement(v.Z,{className:"text-20 image-close cursor-pointer",onClick:t.onRemove},"close"))));case"audio":return a(p.createElement(i.G,{icon:s.FM,style:{color:"brown",fontSize:"6.4rem"}}));case"video":return a(p.createElement(i.G,{icon:s.hv,style:{color:"red",fontSize:"6.4rem"}}));case"application":return".xlsx"==t.item.extension||".xls"==t.item.extension?a(p.createElement(i.G,{icon:s.ic,style:{color:"green",fontSize:"6.4rem"}})):a(p.createElement(i.G,{icon:s.gM,style:{color:"red",fontSize:"6.4rem"}}));case"link":return p.createElement("div",{className:"flex my-8 px-8",key:t.item.id},p.createElement(b.Z,{className:"min-w-128 w-128 h-128 flex items-center justify-center rounded-4 overflow-hidden",elevation:1},p.createElement(o.Z,{className:"font-600"},"LINK")),p.createElement("div",{className:"flex flex-auto flex-col justify-center items-start min-w-0 px-16"},p.createElement(o.Z,{className:"text-16 font-600 truncate w-full"},t.item.url),p.createElement(o.Z,{className:"truncate w-full mb-12",color:"textSecondary"},t.item.time),p.createElement(w,{icon:p.createElement(p.Fragment,null,p.createElement(l.Z,{"aria-owns":r?"actions-menu":null,"aria-haspopup":"true",onClick:function(e){n(e.currentTarget)},variant:"outlined",size:"small"},"Actions",p.createElement(v.Z,{className:"text-20"},"arrow_drop_down"))),outsideClick:!0},p.createElement(c.Z,{onClick:function(){n(null),t.removeAttachment(t.item.id)}},"Remove Attachment"))));default:return p.createElement(i.G,{icon:s.gM,style:{color:"red",fontSize:"6.4rem"}})}},C=(0,n.Z)(function(e){return{messageRow:{position:"relative",display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-end",padding:"0 16px 4px 16px",flex:"0 0 auto","&.contact":{"& $bubble":{backgroundColor:"#fff",color:"#1E2129",boxShadow:"0 1px 3px #00000029",borderTopLeftRadius:5,borderBottomLeftRadius:5,borderTopRightRadius:20,borderBottomRightRadius:20,marginBottom:8,"& $time":{marginLeft:12}},"&.first-of-group":{"& $bubble":{borderTopLeftRadius:20}},"&.last-of-group":{"& $bubble":{borderBottomLeftRadius:20}}},"&.me":{paddingLeft:40,"& $avatar":{order:2,margin:"0 0 0 16px"},"& $bubble":{marginLeft:"auto",backgroundColor:"#4c54af1f",color:"#1E2129",borderTopLeftRadius:20,borderBottomLeftRadius:20,borderTopRightRadius:5,borderBottomRightRadius:5,marginBottom:8,"& $time":{justifyContent:"flex-end",right:0,marginLeft:6}},"&.first-of-group":{"& $bubble":{borderTopRightRadius:20}},"&.last-of-group":{"& $bubble":{borderBottomRightRadius:20}}},"&.contact + .me, &.me + .contact":{marginTop:10},"&.first-of-group":{"& $bubble":{borderTopLeftRadius:20,paddingTop:13}},"&.last-of-group":{"& $bubble":{borderBottomLeftRadius:20,paddingBottom:13,"& $time":{display:"flex"}}}},avatar:{position:"absolute",left:-32,margin:0},bubble:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",padding:12,maxWidth:"100%"},message:{whiteSpace:"pre-wrap",lineHeight:1.2},time:{position:"relative",width:"100%",fontSize:11,marginTop:8,whiteSpace:"nowrap"},bottom:{background:e.palette.background.default,borderTop:"1px solid rgba(0, 0, 0, 0.13)"},inputWrapper:{borderRadius:24}}});function a(){var n=(0,x.I0)(),a=(0,x.v9)(function(e){return e.chatPanel.user}),e=C(),t=(0,p.useState)(""),t=f()(t,2),o=t[0],l=t[1],t=(0,p.useState)(null),t=f()(t,2),c=t[0],i=t[1],r=(0,p.useRef)(null),s=(0,p.useRef)(null),t=function(){var t=u()(d().mark(function e(t){var r,n,a,o;return d().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=t.currentTarget.files,n=[],a=0;case 3:if(!(a<r.length)){e.next=26;break}if(o=null===(o=r[a].type)||void 0===o?void 0:o.split("/"),e.t0=[],e.t1=m()(n),"image"==o[0])return e.next=10,(0,y.y6)(r[a]);e.next=13;break;case 10:e.t2=e.sent,e.next=14;break;case 13:e.t2=r[a];case 14:e.t3=e.t2,e.t4=URL.createObjectURL(r[a]),e.t5=o[0],e.t6=".".concat(o[1]),e.t7=o.join("/"),e.t8={file:e.t3,imgPath:e.t4,fileType:e.t5,extension:e.t6,type:e.t7},e.t9=[e.t8],n=e.t0.concat.call(e.t0,e.t1,e.t9),i(n);case 23:a++,e.next=3;break;case 26:case"end":return e.stop()}},e)}));return function(e){return t.apply(this,arguments)}}();return p.createElement("form",{onSubmit:function(e){e.preventDefault(),s.current&&s.current.sendDirectToChat(),""===o&&!c||n(N.sU(o,l,a,c,i))},className:(0,E.Z)(e.bottom,"py-16 px-8")},p.createElement("div",{className:"multiple-images flex flex-row overflow-x-auto"},c&&c.map(function(e,r){return p.createElement(k,{item:e,card:{},onRemove:function(){return i(function(e){return e.filter(function(e,t){return t!=r})})},key:e.id})})),p.createElement(b.Z,{className:(0,E.Z)(e.inputWrapper,"flex items-center relative")},p.createElement(g.Z,{autoFocus:!1,id:"message-input",className:"flex-1",InputProps:{disableUnderline:!0,classes:{root:"flex flex-grow flex-shrink-0 mx-16 ltr:mr-10 rtl:ml-48 my-8",input:""},placeholder:"Type your message"},InputLabelProps:{shrink:!1,className:e.bootstrapFormLabel},onChange:function(e){l(e.target.value)},value:o}),p.createElement(R.default,{afterRecordComplete:function(e){var t=null===(r=e.type)||void 0===r?void 0:r.split("/"),r=c||[],r=[{file:e,imgPath:URL.createObjectURL(e),fileType:t[0],extension:".".concat(t[1]),type:t.join("/")}].concat(m()(r));i(r)},ref:s,sendDirectToChat:function(e){var t=null===(r=e.type)||void 0===r?void 0:r.split("/"),r=c||[],r=[{file:e,imgPath:URL.createObjectURL(e),fileType:t[0],extension:".".concat(t[1]),type:t.join("/")}].concat(m()(r));n(N.sU(o,l,a,r,i))}}),p.createElement("input",{hidden:!0,multiple:!0,type:"file",ref:r,onChange:t}),p.createElement(h.Z,{className:"image mr-48",onClick:function(){return r.current.click()},"aria-label":"Add photo"},p.createElement(v.Z,null,"photo")),p.createElement(h.Z,{className:"absolute ltr:right-0 rtl:left-0 top-0",type:"submit"},p.createElement(v.Z,{className:"text-24",color:"action"},"send"))))}}}]);