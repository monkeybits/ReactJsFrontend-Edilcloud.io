(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[51877],{47442:function(e,t,n){"use strict";n.d(t,{Z:function(){return P}});var a=n(61432),l=n.n(a),i=n(78709),o=n(32986),c=n(94678),s=n(84403),m=n(20103),u=n(82707),d=n(96282),r=n(16526),t=n.n(r),a=n(79545),p=n.n(a),r=n(82853),f=n.n(r),a=n(82147),h=n.n(a),r=n(40734),b=n.n(r),a=n(38050),g=n.n(a),r=n(3056),y=n.n(r),a=n(71470),v=n.n(a),r=n(56156),E=n.n(r),a=n(77035),B=n(26895),Z=n(75964),N=n(96450),r=n(6274),S=n(66015),x=n(7202),w=n(34948);function I(t,e){var n,a=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,n)),a}function k(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?I(Object(n),!0).forEach(function(e){E()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function C(n){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var e,t=v()(n);return t=a?(e=v()(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments),y()(this,t)}}var D=(0,a.Z)({productionPrefix:"iframe-"}),a=function(e){g()(r,e);var o=C(r);function r(){var t;f()(this,r);for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return t=o.call.apply(o,[this].concat(n)),E()(b()(t),"state",{ready:!1}),E()(b()(t),"handleRef",function(e){t.contentDocument=e?e.node.contentDocument:null}),E()(b()(t),"onContentDidMount",function(){t.setState({ready:!0,jss:(0,S.Ue)(k(k({},(0,B.Z)()),{},{plugins:[].concat(p()((0,B.Z)().plugins),[(0,x.Z)()]),insertionPoint:t.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:t.contentDocument.body})}),E()(b()(t),"onContentDidUpdate",function(){t.contentDocument.body.dir=t.props.theme.direction}),E()(b()(t),"renderHead",function(){return i.createElement(i.Fragment,null,i.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Poppins, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),i.createElement("noscript",{id:"jss-demo-insertion-point"}))}),t}return h()(r,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.classes,e=e.theme;return i.createElement(w.ZP,{head:this.renderHead(),ref:this.handleRef,className:n.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?i.createElement(Z.ZP,{jss:this.state.jss,generateClassName:D,sheetsManager:this.state.sheetsManager},i.createElement(N.Z,{theme:e},i.cloneElement(t,{container:this.state.container}))):null)}}]),r}(i.Component);a.propTypes={children:t().node.isRequired,classes:t().object.isRequired,theme:t().object.isRequired};var T=(0,r.Z)(function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}},{withTheme:!0})(a),z=(0,o.ZP)(function(){return Promise.resolve().then(n.bind(n,22482))}),t={raw:t().object,currentTabIndex:t().number};function j(e){var t=(0,i.useState)(e.currentTabIndex),n=l()(t,2),a=n[0],o=n[1],r=e.component,t=e.raw,n=e.iframe,e=e.className;return i.createElement(c.Z,{className:e},i.createElement(s.Z,{position:"static",color:"default",elevation:0},i.createElement(m.Z,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:a,onChange:function(e,t){o(t)}},r&&i.createElement(u.Z,{classes:{root:"min-w-64"},icon:i.createElement(d.Z,null,"remove_red_eye")}),t&&i.createElement(u.Z,{classes:{root:"min-w-64"},icon:i.createElement(d.Z,null,"code")}))),i.createElement("div",{className:"flex justify-center"},i.createElement("div",{className:0===a?"flex flex-1":"hidden"},r&&(n?i.createElement(T,null,i.createElement(r,null)):i.createElement("div",{className:"p-24 flex flex-1 justify-center"},i.createElement(r,null)))),i.createElement("div",{className:1===a?"flex flex-1":"hidden"},t&&i.createElement("div",{className:"flex flex-1"},i.createElement(z,{component:"pre",className:"language-javascript w-full"},t.default)))))}j.propTypes=t,j.defaultProps={currentTabIndex:0};var P=j},80449:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var t=n(56156),a=n.n(t),o=n(78709),t=n(40962),r=n(85552),l=n(92466),i=[{url:"/material-ui-static/images/grid-list/breakfast.jpg",title:"Breakfast",width:"40%"},{url:"/material-ui-static/images/grid-list/burgers.jpg",title:"Burgers",width:"30%"},{url:"/material-ui-static/images/grid-list/camera.jpg",title:"Camera",width:"30%"}],c=(0,t.Z)(function(e){var t;return{root:{display:"flex",flexWrap:"wrap",minWidth:300,width:"100%"},image:(t={position:"relative",height:200},a()(t,e.breakpoints.down("xs"),{width:"100% !important",height:100}),a()(t,"&:hover, &$focusVisible",{zIndex:1,"& $imageBackdrop":{opacity:.15},"& $imageMarked":{opacity:0},"& $imageTitle":{border:"4px solid currentColor"}}),t),focusVisible:{},imageButton:{position:"absolute",left:0,right:0,top:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",color:e.palette.common.white},imageSrc:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundSize:"cover",backgroundPosition:"center 40%"},imageBackdrop:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:e.palette.common.black,opacity:.4,transition:e.transitions.create("opacity")},imageTitle:{position:"relative",padding:"".concat(e.spacing(2),"px ").concat(e.spacing(4),"px ").concat(e.spacing(1)+6,"px")},imageMarked:{height:3,width:18,backgroundColor:e.palette.common.white,position:"absolute",bottom:-2,left:"calc(50% - 9px)",transition:e.transitions.create("opacity")}}});function s(){var t=c();return o.createElement("div",{className:t.root},i.map(function(e){return o.createElement(r.Z,{focusRipple:!0,key:e.title,className:t.image,focusVisibleClassName:t.focusVisible,style:{width:e.width}},o.createElement("span",{className:t.imageSrc,style:{backgroundImage:"url(".concat(e.url,")")}}),o.createElement("span",{className:t.imageBackdrop}),o.createElement("span",{className:t.imageButton},o.createElement(l.Z,{component:"span",variant:"subtitle1",color:"inherit",className:t.imageTitle},e.title,o.createElement("span",{className:t.imageMarked}))))}))}},24272:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var a=n(78709),t=n(40962),o=n(13786),r=n(48258),l=n(91813),i=n(28157),c=(0,t.Z)(function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)}}});function s(){var e=c();return a.createElement("div",null,a.createElement("div",null,a.createElement(o.Z,{size:"small",className:e.margin},"Small"),a.createElement(o.Z,{size:"medium",className:e.margin},"Medium"),a.createElement(o.Z,{size:"large",className:e.margin},"Large")),a.createElement("div",null,a.createElement(o.Z,{variant:"outlined",size:"small",color:"primary",className:e.margin},"Small"),a.createElement(o.Z,{variant:"outlined",size:"medium",color:"primary",className:e.margin},"Medium"),a.createElement(o.Z,{variant:"outlined",size:"large",color:"primary",className:e.margin},"Large")),a.createElement("div",null,a.createElement(o.Z,{variant:"contained",size:"small",color:"primary",className:e.margin},"Small"),a.createElement(o.Z,{variant:"contained",size:"medium",color:"primary",className:e.margin},"Medium"),a.createElement(o.Z,{variant:"contained",size:"large",color:"primary",className:e.margin},"Large")),a.createElement("div",null,a.createElement(r.Z,{"aria-label":"delete",className:e.margin,size:"small"},a.createElement(i.Z,{fontSize:"inherit"})),a.createElement(r.Z,{"aria-label":"delete",className:e.margin},a.createElement(l.Z,{fontSize:"small"})),a.createElement(r.Z,{"aria-label":"delete",className:e.margin},a.createElement(l.Z,null)),a.createElement(r.Z,{"aria-label":"delete",className:e.margin},a.createElement(l.Z,{fontSize:"large"}))))}},26894:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var a=n(78709),t=n(40962),o=n(13786),r=(0,t.Z)(function(e){return{root:{"& > *":{margin:e.spacing(1)}}}});function l(){var e=r();return a.createElement("div",{className:e.root},a.createElement(o.Z,{variant:"contained"},"Default"),a.createElement(o.Z,{variant:"contained",color:"primary"},"Primary"),a.createElement(o.Z,{variant:"contained",color:"secondary"},"Secondary"),a.createElement(o.Z,{variant:"contained",disabled:!0},"Disabled"),a.createElement(o.Z,{variant:"contained",color:"primary",href:"#contained-buttons"},"Link"))}},49150:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var a=n(78709),o=n(6274),r=n(40962),t=n(33360),l=n(96450),i=n(13786),c=n(62032),n=n(68403),s=(0,o.Z)({root:{boxShadow:"none",textTransform:"none",fontSize:16,padding:"6px 12px",border:"1px solid",lineHeight:1.5,backgroundColor:"#0063cc",borderColor:"#0063cc",fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),"&:hover":{backgroundColor:"#0069d9",borderColor:"#0062cc",boxShadow:"none"},"&:active":{boxShadow:"none",backgroundColor:"#0062cc",borderColor:"#005cbf"},"&:focus":{boxShadow:"0 0 0 0.2rem rgba(0,123,255,.5)"}}})(i.Z),m=(0,o.Z)(function(e){return{root:{color:e.palette.getContrastText(c.Z[500]),backgroundColor:c.Z[500],"&:hover":{backgroundColor:c.Z[700]}}}})(i.Z),u=(0,r.Z)(function(e){return{margin:{margin:e.spacing(1)}}}),d=(0,t.Z)({palette:{primary:n.Z}});function p(){var e=u();return a.createElement("div",null,a.createElement(m,{variant:"contained",color:"primary",className:e.margin},"Custom CSS"),a.createElement(l.Z,{theme:d},a.createElement(i.Z,{variant:"contained",color:"primary",className:e.margin},"Theme Provider")),a.createElement(s,{variant:"contained",color:"primary",disableRipple:!0,className:e.margin},"Bootstrap"))}},78405:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var a=n(78709),o=n(13786);function r(){return a.createElement(o.Z,{variant:"contained",color:"primary",disableElevation:!0},"Disable elevation")}},80261:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var a=n(78709),t=n(40962),o=n(48258),r=n(91813),l=n(72891),i=n(41e3),c=(0,t.Z)(function(e){return{root:{"& > *":{margin:e.spacing(1)}}}});function s(){var e=c();return a.createElement("div",{className:e.root},a.createElement(o.Z,{"aria-label":"delete"},a.createElement(r.Z,null)),a.createElement(o.Z,{"aria-label":"delete",disabled:!0,color:"primary"},a.createElement(r.Z,null)),a.createElement(o.Z,{color:"secondary","aria-label":"add an alarm"},a.createElement(l.Z,null)),a.createElement(o.Z,{color:"primary","aria-label":"add to shopping cart"},a.createElement(i.Z,null)))}},56817:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var a=n(78709),o=n(13786),t=n(40962),r=n(91813),l=n(13357),i=n(6010),c=n(96282),s=n(54263),m=(0,t.Z)(function(e){return{button:{margin:e.spacing(1)}}});function u(){var e=m();return a.createElement("div",null,a.createElement(o.Z,{variant:"contained",color:"secondary",className:e.button,startIcon:a.createElement(r.Z,null)},"Delete"),a.createElement(o.Z,{variant:"contained",color:"primary",className:e.button,endIcon:a.createElement(c.Z,null,"send")},"Send"),a.createElement(o.Z,{variant:"contained",color:"default",className:e.button,startIcon:a.createElement(l.Z,null)},"Upload"),a.createElement(o.Z,{variant:"contained",disabled:!0,color:"secondary",className:e.button,startIcon:a.createElement(i.Z,null)},"Talk"),a.createElement(o.Z,{variant:"contained",color:"primary",size:"small",className:e.button,startIcon:a.createElement(s.Z,null)},"Save"),a.createElement(o.Z,{variant:"contained",color:"primary",size:"large",className:e.button,startIcon:a.createElement(s.Z,null)},"Save"))}},26796:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var a=n(78709),t=n(40962),o=n(13786),r=(0,t.Z)(function(e){return{root:{"& > *":{margin:e.spacing(1)}}}});function l(){var e=r();return a.createElement("div",{className:e.root},a.createElement(o.Z,{variant:"outlined"},"Default"),a.createElement(o.Z,{variant:"outlined",color:"primary"},"Primary"),a.createElement(o.Z,{variant:"outlined",color:"secondary"},"Secondary"),a.createElement(o.Z,{variant:"outlined",disabled:!0},"Disabled"),a.createElement(o.Z,{variant:"outlined",color:"primary",href:"#outlined-buttons"},"Link"))}},17686:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var a=n(78709),t=n(40962),o=n(13786),r=(0,t.Z)(function(e){return{root:{"& > *":{margin:e.spacing(1)}}}});function l(){var e=r();return a.createElement("div",{className:e.root},a.createElement(o.Z,null,"Default"),a.createElement(o.Z,{color:"primary"},"Primary"),a.createElement(o.Z,{color:"secondary"},"Secondary"),a.createElement(o.Z,{disabled:!0},"Disabled"),a.createElement(o.Z,{href:"#text-buttons",color:"primary"},"Link"))}},70466:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var a=n(78709),t=n(40962),o=n(13786),r=n(48258),l=n(57248),i=(0,t.Z)(function(e){return{root:{"& > *":{margin:e.spacing(1)}},input:{display:"none"}}});function c(){var e=i();return a.createElement("div",{className:e.root},a.createElement("input",{accept:"image/*",className:e.input,id:"contained-button-file",multiple:!0,type:"file"}),a.createElement("label",{htmlFor:"contained-button-file"},a.createElement(o.Z,{variant:"contained",color:"primary",component:"span"},"Upload")),a.createElement("input",{accept:"image/*",className:e.input,id:"icon-button-file",type:"file"}),a.createElement("label",{htmlFor:"icon-button-file"},a.createElement(r.Z,{color:"primary","aria-label":"upload picture",component:"span"},a.createElement(l.Z,null))))}},51877:function(e,t,n){"use strict";n.r(t);var a=n(78709),o=n(47442),r=n(22482),l=n(23377),i=n(13786),c=n(96282),s=n(92466),m=(0,n(40962).Z)(function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}});t.default=function(e){var t=m();return a.createElement(l.Z,{classes:{root:t.layoutRoot},header:a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},a.createElement("div",{className:"flex flex-col"},a.createElement("div",{className:"flex items-center mb-16"},a.createElement(c.Z,{className:"text-18",color:"action"},"home"),a.createElement(c.Z,{className:"text-16",color:"action"},"chevron_right"),a.createElement(s.Z,{color:"textSecondary"},"Documentation"),a.createElement(c.Z,{className:"text-16",color:"action"},"chevron_right"),a.createElement(s.Z,{color:"textSecondary"},"Material UI Components")),a.createElement(s.Z,{variant:"h6"},"Button")),a.createElement(i.Z,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/buttons",target:"_blank",role:"button"},a.createElement(c.Z,null,"link"),a.createElement("span",{className:"mx-4"},"Reference"))),content:a.createElement("div",{className:"p-24 max-w-2xl"},a.createElement(s.Z,{className:"text-44 mt-32 mb-8",component:"h1"},"Button"),a.createElement(s.Z,{className:"description"},"Buttons allow users to take actions, and make choices, with a single tap."),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement("a",{href:"https://material.io/design/components/buttons.html"},"Buttons")," communicate actions that users can take. They are typically placed throughout your UI, in places like:"),a.createElement("ul",null,a.createElement("li",null,"Dialogs"),a.createElement("li",null,"Modal windows"),a.createElement("li",null,"Forms"),a.createElement("li",null,"Cards"),a.createElement("li",null,"Toolbars")),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Contained Buttons"),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement("a",{href:"https://material.io/design/components/buttons.html#contained-button"},"Contained buttons"),"are high-emphasis, distinguished by their use of elevation and fill. They contain actions that are primary to your app."),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement(o.Z,{className:"my-24",iframe:!1,component:n(26894).Z,raw:n(49278)})),a.createElement(s.Z,{className:"mb-16",component:"div"},"You can remove the elevation with the ",a.createElement("code",null,"disableElevation")," prop."),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement(o.Z,{className:"my-24",iframe:!1,component:n(78405).Z,raw:n(70757)})),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Text Buttons"),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement("a",{href:"https://material.io/design/components/buttons.html#text-button"},"Text buttons"),"are typically used for less-pronounced actions, including those located:"),a.createElement("ul",null,a.createElement("li",null,"In dialogs"),a.createElement("li",null,"In cards")),a.createElement(s.Z,{className:"mb-16",component:"div"},"In cards, text buttons help maintain an emphasis on card content."),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement(o.Z,{className:"my-24",iframe:!1,component:n(17686).Z,raw:n(63323)})),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Outlined Buttons"),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement("a",{href:"https://material.io/design/components/buttons.html#outlined-button"},"Outlined buttons"),"are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app."),a.createElement(s.Z,{className:"mb-16",component:"div"},"Outlined buttons are also a lower emphasis alternative to contained buttons, or a higher emphasis alternative to text buttons."),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement(o.Z,{className:"my-24",iframe:!1,component:n(26796).Z,raw:n(24101)})),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Upload button"),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement(o.Z,{className:"my-24",iframe:!1,component:n(70466).Z,raw:n(80597)})),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Sizes"),a.createElement(s.Z,{className:"mb-16",component:"div"},"Fancy larger or smaller buttons? Use the ",a.createElement("code",null,"size")," property."),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement(o.Z,{className:"my-24",iframe:!1,component:n(24272).Z,raw:n(80055)})),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Buttons with icons and label"),a.createElement(s.Z,{className:"mb-16",component:"div"},"Sometimes you might want to have icons for certain button to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon."),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement(o.Z,{className:"my-24",iframe:!1,component:n(56817).Z,raw:n(62909)})),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Icon Buttons"),a.createElement(s.Z,{className:"mb-16",component:"div"},"Icon buttons are commonly found in app bars and toolbars."),a.createElement(s.Z,{className:"mb-16",component:"div"},"Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item."),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement(o.Z,{className:"my-24",iframe:!1,component:n(80261).Z,raw:n(76365)})),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Customized buttons"),a.createElement(s.Z,{className:"mb-16",component:"div"},"Here are some examples of customizing the component. You can learn more about this in the",a.createElement("a",{href:"/customization/components/"},"overrides documentation page"),"."),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement(o.Z,{className:"my-24",iframe:!1,component:n(49150).Z,raw:n(28506)})),a.createElement(s.Z,{className:"mb-16",component:"div"},"🎨 If you are looking for inspiration, you can check ",a.createElement("a",{href:"https://mui-treasury.com/styles/button"},"MUI Treasury's customization examples"),"."),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Complex Buttons"),a.createElement(s.Z,{className:"mb-16",component:"div"},"The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the ",a.createElement("code",null,"ButtonBase"),". You can take advantage of this lower level component to build custom interactions."),a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement(o.Z,{className:"my-24",iframe:!1,component:n(80449).Z,raw:n(1485)})),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Third-party routing library"),a.createElement(s.Z,{className:"mb-16",component:"div"},"One common use case is to use the button to trigger navigation to a new page. The ",a.createElement("code",null,"ButtonBase")," component provides a property to handle this use case: ",a.createElement("code",null,"component"),". However for certain focus polyfills ",a.createElement("code",null,"ButtonBase")," requires the DOM node of the provided component. This is achieved by attaching a ref to the component and expecting that the component forwards this ref to the underlying DOM node. Given that many of the interactive components rely on ",a.createElement("code",null,"ButtonBase"),", you should be able to take advantage of it everywhere."),a.createElement(s.Z,{className:"mb-16",component:"div"},"Here is an ",a.createElement("a",{href:"/guides/composition/#button"},"integration example with react-router"),"."),a.createElement(s.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Limitations"),a.createElement(s.Z,{className:"text-24 mt-32 mb-8",component:"h3"},"Cursor not-allowed"),a.createElement(s.Z,{className:"mb-16",component:"div"},"The ButtonBase component sets ",a.createElement("code",null,"pointer-events: none;")," on disabled buttons, which prevents the appearance of a disabled cursor."),a.createElement(s.Z,{className:"mb-16",component:"div"},"If you wish to use ",a.createElement("code",null,"not-allowed"),", you have two options:"),a.createElement("ol",null,a.createElement("li",null,a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement("strong",null,"CSS only"),". You can remove the pointer events style on the disabled state of the ",a.createElement("code",null,"<button>")," element:"),a.createElement(r.default,{component:"pre",className:"language-css"}," \n.MuiButtonBase-root:disabled {\n cursor: not-allowed;\n pointer-events: auto;\n}\n"),a.createElement(s.Z,{className:"mb-16",component:"div"},"However:"),a.createElement("ul",null,a.createElement("li",null,"You should add ",a.createElement("code",null,"pointer-events: none;")," back when you need to display ",a.createElement("a",{href:"/components/tooltips/#disabled-elements"},"tooltips on disabled elements"),"."),a.createElement("li",null,"The cursor won't change if you render something other than a button element, for instance, a link ",a.createElement("code",null,"<a>")," element."))),a.createElement("li",null,a.createElement(s.Z,{className:"mb-16",component:"div"},a.createElement("strong",null,"DOM change"),". You can wrap the button:"),a.createElement(r.default,{component:"pre",className:"language-jsx"}," \n<span style={{ cursor: 'not-allowed' }}>\n <Button component={Link} disabled>\n   disabled\n </Button>\n</span>\n"),a.createElement(s.Z,{className:"mb-16",component:"div"},"This has the advantage of supporting any element, for instance, a link ",a.createElement("code",null,"<a>")," element."))))})}},1485:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport ButtonBase from '@material-ui/core/ButtonBase';\nimport Typography from '@material-ui/core/Typography';\n\nconst images = [\n  {\n    url: '/material-ui-static/images/grid-list/breakfast.jpg',\n    title: 'Breakfast',\n    width: '40%',\n  },\n  {\n    url: '/material-ui-static/images/grid-list/burgers.jpg',\n    title: 'Burgers',\n    width: '30%',\n  },\n  {\n    url: '/material-ui-static/images/grid-list/camera.jpg',\n    title: 'Camera',\n    width: '30%',\n  },\n];\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    display: 'flex',\n    flexWrap: 'wrap',\n    minWidth: 300,\n    width: '100%',\n  },\n  image: {\n    position: 'relative',\n    height: 200,\n    [theme.breakpoints.down('xs')]: {\n      width: '100% !important', // Overrides inline-style\n      height: 100,\n    },\n    '&:hover, &$focusVisible': {\n      zIndex: 1,\n      '& $imageBackdrop': {\n        opacity: 0.15,\n      },\n      '& $imageMarked': {\n        opacity: 0,\n      },\n      '& $imageTitle': {\n        border: '4px solid currentColor',\n      },\n    },\n  },\n  focusVisible: {},\n  imageButton: {\n    position: 'absolute',\n    left: 0,\n    right: 0,\n    top: 0,\n    bottom: 0,\n    display: 'flex',\n    alignItems: 'center',\n    justifyContent: 'center',\n    color: theme.palette.common.white,\n  },\n  imageSrc: {\n    position: 'absolute',\n    left: 0,\n    right: 0,\n    top: 0,\n    bottom: 0,\n    backgroundSize: 'cover',\n    backgroundPosition: 'center 40%',\n  },\n  imageBackdrop: {\n    position: 'absolute',\n    left: 0,\n    right: 0,\n    top: 0,\n    bottom: 0,\n    backgroundColor: theme.palette.common.black,\n    opacity: 0.4,\n    transition: theme.transitions.create('opacity'),\n  },\n  imageTitle: {\n    position: 'relative',\n    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,\n  },\n  imageMarked: {\n    height: 3,\n    width: 18,\n    backgroundColor: theme.palette.common.white,\n    position: 'absolute',\n    bottom: -2,\n    left: 'calc(50% - 9px)',\n    transition: theme.transitions.create('opacity'),\n  },\n}));\n\nexport default function ButtonBases() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      {images.map((image) => (\n        <ButtonBase\n          focusRipple\n          key={image.title}\n          className={classes.image}\n          focusVisibleClassName={classes.focusVisible}\n          style={{\n            width: image.width,\n          }}\n        >\n          <span\n            className={classes.imageSrc}\n            style={{\n              backgroundImage: `url(${image.url})`,\n            }}\n          />\n          <span className={classes.imageBackdrop} />\n          <span className={classes.imageButton}>\n            <Typography\n              component=\"span\"\n              variant=\"subtitle1\"\n              color=\"inherit\"\n              className={classes.imageTitle}\n            >\n              {image.title}\n              <span className={classes.imageMarked} />\n            </Typography>\n          </span>\n        </ButtonBase>\n      ))}\n    </div>\n  );\n}\n"},80055:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport Button from \'@material-ui/core/Button\';\nimport IconButton from \'@material-ui/core/IconButton\';\nimport DeleteIcon from \'@material-ui/icons/Delete\';\nimport ArrowDownwardIcon from \'@material-ui/icons/ArrowDownward\';\n\nconst useStyles = makeStyles((theme) => ({\n  margin: {\n    margin: theme.spacing(1),\n  },\n  extendedIcon: {\n    marginRight: theme.spacing(1),\n  },\n}));\n\nexport default function ButtonSizes() {\n  const classes = useStyles();\n\n  return (\n    <div>\n      <div>\n        <Button size="small" className={classes.margin}>\n          Small\n        </Button>\n        <Button size="medium" className={classes.margin}>\n          Medium\n        </Button>\n        <Button size="large" className={classes.margin}>\n          Large\n        </Button>\n      </div>\n      <div>\n        <Button variant="outlined" size="small" color="primary" className={classes.margin}>\n          Small\n        </Button>\n        <Button variant="outlined" size="medium" color="primary" className={classes.margin}>\n          Medium\n        </Button>\n        <Button variant="outlined" size="large" color="primary" className={classes.margin}>\n          Large\n        </Button>\n      </div>\n      <div>\n        <Button variant="contained" size="small" color="primary" className={classes.margin}>\n          Small\n        </Button>\n        <Button variant="contained" size="medium" color="primary" className={classes.margin}>\n          Medium\n        </Button>\n        <Button variant="contained" size="large" color="primary" className={classes.margin}>\n          Large\n        </Button>\n      </div>\n      <div>\n        <IconButton aria-label="delete" className={classes.margin} size="small">\n          <ArrowDownwardIcon fontSize="inherit" />\n        </IconButton>\n        <IconButton aria-label="delete" className={classes.margin}>\n          <DeleteIcon fontSize="small" />\n        </IconButton>\n        <IconButton aria-label="delete" className={classes.margin}>\n          <DeleteIcon />\n        </IconButton>\n        <IconButton aria-label="delete" className={classes.margin}>\n          <DeleteIcon fontSize="large" />\n        </IconButton>\n      </div>\n    </div>\n  );\n}\n'},49278:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport Button from \'@material-ui/core/Button\';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    \'& > *\': {\n      margin: theme.spacing(1),\n    },\n  },\n}));\n\nexport default function ContainedButtons() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Button variant="contained">Default</Button>\n      <Button variant="contained" color="primary">\n        Primary\n      </Button>\n      <Button variant="contained" color="secondary">\n        Secondary\n      </Button>\n      <Button variant="contained" disabled>\n        Disabled\n      </Button>\n      <Button variant="contained" color="primary" href="#contained-buttons">\n        Link\n      </Button>\n    </div>\n  );\n}\n'},28506:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';\nimport Button from '@material-ui/core/Button';\nimport { green, purple } from '@material-ui/core/colors';\n\nconst BootstrapButton = withStyles({\n  root: {\n    boxShadow: 'none',\n    textTransform: 'none',\n    fontSize: 16,\n    padding: '6px 12px',\n    border: '1px solid',\n    lineHeight: 1.5,\n    backgroundColor: '#0063cc',\n    borderColor: '#0063cc',\n    fontFamily: [\n      '-apple-system',\n      'BlinkMacSystemFont',\n      '\"Segoe UI\"',\n      'Roboto',\n      '\"Helvetica Neue\"',\n      'Arial',\n      'sans-serif',\n      '\"Apple Color Emoji\"',\n      '\"Segoe UI Emoji\"',\n      '\"Segoe UI Symbol\"',\n    ].join(','),\n    '&:hover': {\n      backgroundColor: '#0069d9',\n      borderColor: '#0062cc',\n      boxShadow: 'none',\n    },\n    '&:active': {\n      boxShadow: 'none',\n      backgroundColor: '#0062cc',\n      borderColor: '#005cbf',\n    },\n    '&:focus': {\n      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',\n    },\n  },\n})(Button);\n\nconst ColorButton = withStyles((theme) => ({\n  root: {\n    color: theme.palette.getContrastText(purple[500]),\n    backgroundColor: purple[500],\n    '&:hover': {\n      backgroundColor: purple[700],\n    },\n  },\n}))(Button);\n\nconst useStyles = makeStyles((theme) => ({\n  margin: {\n    margin: theme.spacing(1),\n  },\n}));\n\nconst theme = createMuiTheme({\n  palette: {\n    primary: green,\n  },\n});\n\nexport default function CustomizedButtons() {\n  const classes = useStyles();\n\n  return (\n    <div>\n      <ColorButton variant=\"contained\" color=\"primary\" className={classes.margin}>\n        Custom CSS\n      </ColorButton>\n      <ThemeProvider theme={theme}>\n        <Button variant=\"contained\" color=\"primary\" className={classes.margin}>\n          Theme Provider\n        </Button>\n      </ThemeProvider>\n      <BootstrapButton variant=\"contained\" color=\"primary\" disableRipple className={classes.margin}>\n        Bootstrap\n      </BootstrapButton>\n    </div>\n  );\n}\n"},70757:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport Button from '@material-ui/core/Button';\n\nexport default function DisableElevation() {\n  return (\n    <Button variant=\"contained\" color=\"primary\" disableElevation>\n      Disable elevation\n    </Button>\n  );\n}\n"},76365:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport IconButton from '@material-ui/core/IconButton';\nimport DeleteIcon from '@material-ui/icons/Delete';\nimport AlarmIcon from '@material-ui/icons/Alarm';\nimport AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    '& > *': {\n      margin: theme.spacing(1),\n    },\n  },\n}));\n\nexport default function IconButtons() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <IconButton aria-label=\"delete\">\n        <DeleteIcon />\n      </IconButton>\n      <IconButton aria-label=\"delete\" disabled color=\"primary\">\n        <DeleteIcon />\n      </IconButton>\n      <IconButton color=\"secondary\" aria-label=\"add an alarm\">\n        <AlarmIcon />\n      </IconButton>\n      <IconButton color=\"primary\" aria-label=\"add to shopping cart\">\n        <AddShoppingCartIcon />\n      </IconButton>\n    </div>\n  );\n}\n"},62909:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport Button from \'@material-ui/core/Button\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport DeleteIcon from \'@material-ui/icons/Delete\';\nimport CloudUploadIcon from \'@material-ui/icons/CloudUpload\';\nimport KeyboardVoiceIcon from \'@material-ui/icons/KeyboardVoice\';\nimport Icon from \'@material-ui/core/Icon\';\nimport SaveIcon from \'@material-ui/icons/Save\';\n\nconst useStyles = makeStyles((theme) => ({\n  button: {\n    margin: theme.spacing(1),\n  },\n}));\n\nexport default function IconLabelButtons() {\n  const classes = useStyles();\n\n  return (\n    <div>\n      <Button\n        variant="contained"\n        color="secondary"\n        className={classes.button}\n        startIcon={<DeleteIcon />}\n      >\n        Delete\n      </Button>\n      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}\n      <Button\n        variant="contained"\n        color="primary"\n        className={classes.button}\n        endIcon={<Icon>send</Icon>}\n      >\n        Send\n      </Button>\n      <Button\n        variant="contained"\n        color="default"\n        className={classes.button}\n        startIcon={<CloudUploadIcon />}\n      >\n        Upload\n      </Button>\n      <Button\n        variant="contained"\n        disabled\n        color="secondary"\n        className={classes.button}\n        startIcon={<KeyboardVoiceIcon />}\n      >\n        Talk\n      </Button>\n      <Button\n        variant="contained"\n        color="primary"\n        size="small"\n        className={classes.button}\n        startIcon={<SaveIcon />}\n      >\n        Save\n      </Button>\n      <Button\n        variant="contained"\n        color="primary"\n        size="large"\n        className={classes.button}\n        startIcon={<SaveIcon />}\n      >\n        Save\n      </Button>\n    </div>\n  );\n}\n'},24101:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport Button from \'@material-ui/core/Button\';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    \'& > *\': {\n      margin: theme.spacing(1),\n    },\n  },\n}));\n\nexport default function OutlinedButtons() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Button variant="outlined">Default</Button>\n      <Button variant="outlined" color="primary">\n        Primary\n      </Button>\n      <Button variant="outlined" color="secondary">\n        Secondary\n      </Button>\n      <Button variant="outlined" disabled>\n        Disabled\n      </Button>\n      <Button variant="outlined" color="primary" href="#outlined-buttons">\n        Link\n      </Button>\n    </div>\n  );\n}\n'},63323:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Button from '@material-ui/core/Button';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    '& > *': {\n      margin: theme.spacing(1),\n    },\n  },\n}));\n\nexport default function TextButtons() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Button>Default</Button>\n      <Button color=\"primary\">Primary</Button>\n      <Button color=\"secondary\">Secondary</Button>\n      <Button disabled>Disabled</Button>\n      <Button href=\"#text-buttons\" color=\"primary\">\n        Link\n      </Button>\n    </div>\n  );\n}\n"},80597:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport Button from \'@material-ui/core/Button\';\nimport IconButton from \'@material-ui/core/IconButton\';\nimport PhotoCamera from \'@material-ui/icons/PhotoCamera\';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    \'& > *\': {\n      margin: theme.spacing(1),\n    },\n  },\n  input: {\n    display: \'none\',\n  },\n}));\n\nexport default function UploadButtons() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <input\n        accept="image/*"\n        className={classes.input}\n        id="contained-button-file"\n        multiple\n        type="file"\n      />\n      <label htmlFor="contained-button-file">\n        <Button variant="contained" color="primary" component="span">\n          Upload\n        </Button>\n      </label>\n      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />\n      <label htmlFor="icon-button-file">\n        <IconButton color="primary" aria-label="upload picture" component="span">\n          <PhotoCamera />\n        </IconButton>\n      </label>\n    </div>\n  );\n}\n'}}]);