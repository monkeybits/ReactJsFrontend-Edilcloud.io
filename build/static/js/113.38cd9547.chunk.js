(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[113],{1696:function(e,a,t){"use strict";t.d(a,"a",(function(){return E}));var n=t(36),r=t(48),i=t(884),o=t(11),l=t(0),c=t.n(l),s=t(1669),d=t(6);var u=function(e){var a=Object(d.d)((function(e){return e.fuse.settings.mainThemeDark}));return c.a.createElement("div",{className:e.classes.header},e.header&&c.a.createElement(s.a,{theme:a},e.header))},m=t(8),p=t(1637),h=t(1661);var f=function(e){var a=Object(d.d)((function(e){return e.fuse.settings.mainThemeDark})),t=e.classes;return c.a.createElement(c.a.Fragment,null,e.header&&c.a.createElement(s.a,{theme:a},c.a.createElement("div",{className:Object(o.a)(t.sidebarHeader,e.variant)},e.header)),e.content&&c.a.createElement(r.a,{className:t.sidebarContent,enable:e.innerScroll},e.content))};var b=c.a.forwardRef((function(e,a){var t=Object(l.useState)(!1),n=Object(m.a)(t,2),r=n[0],i=n[1],s=e.classes;Object(l.useImperativeHandle)(a,(function(){return{toggleSidebar:d}}));var d=function(){i(!r)};return c.a.createElement(c.a.Fragment,null,c.a.createElement(h.a,{lgUp:"permanent"===e.variant},c.a.createElement(p.a,{variant:"temporary",anchor:e.position,open:r,onClose:function(e){return d()},classes:{root:Object(o.a)(s.sidebarWrapper,e.variant),paper:Object(o.a)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)},ModalProps:{keepMounted:!0},container:e.rootRef.current,BackdropProps:{classes:{root:s.backdrop}},style:{position:"absolute"}},c.a.createElement(f,e))),"permanent"===e.variant&&c.a.createElement(h.a,{mdDown:!0},c.a.createElement(p.a,{variant:"permanent",className:Object(o.a)(s.sidebarWrapper,e.variant),open:r,classes:{paper:Object(o.a)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)}},c.a.createElement(f,e))))})),g=Object(i.a)((function(e){return{root:{display:"flex",flexDirection:"row",minHeight:"100%",position:"relative",flex:"1 0 auto",height:"auto",backgroundColor:e.palette.background.default},innerScroll:{flex:"1 1 auto",height:"100%"},topBg:{position:"absolute",left:0,right:0,top:0,height:200,background:"linear-gradient(to right, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),backgroundSize:"cover",pointerEvents:"none"},contentWrapper:Object(n.a)({display:"flex",flexDirection:"column",padding:"0 3.2rem",flex:"1 1 100%",zIndex:2,maxWidth:"100%",minWidth:0,minHeight:0},e.breakpoints.down("xs"),{padding:"0 1.6rem"}),header:{height:136,minHeight:136,maxHeight:136,display:"flex",color:e.palette.primary.contrastText},headerSidebarToggleButton:{color:e.palette.primary.contrastText},contentCard:{display:"flex",flex:"1 1 100%",flexDirection:"column",backgroundColor:e.palette.background.paper,boxShadow:e.shadows[1],minHeight:0,borderRadius:"8px 8px 0 0"},toolbar:{height:64,minHeight:64,display:"flex",alignItems:"center",borderBottom:"1px solid ".concat(e.palette.divider)},content:{flex:"1 1 auto",height:"100%",overflow:"auto","-webkit-overflow-scrolling":"touch"},sidebarWrapper:{position:"absolute",backgroundColor:"transparent",zIndex:5,overflow:"hidden","&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{zIndex:1,position:"relative"})},sidebar:{position:"absolute","&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent",position:"relative",border:"none",overflow:"hidden"}),width:240,height:"100%"},leftSidebar:{},rightSidebar:{},sidebarHeader:{height:200,minHeight:200,color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark,"&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent"})},sidebarContent:Object(n.a)({display:"flex",flex:"1 1 auto",flexDirection:"column",backgroundColor:e.palette.background.default,color:e.palette.text.primary},e.breakpoints.up("lg"),{overflow:"auto","-webkit-overflow-scrolling":"touch"}),backdrop:{position:"absolute"}}})),v=c.a.forwardRef((function(e,a){var t=Object(l.useRef)(null),n=Object(l.useRef)(null),i=Object(l.useRef)(null),s=g(e),d=e.rightSidebarHeader||e.rightSidebarContent,m=e.leftSidebarHeader||e.leftSidebarContent;return c.a.useImperativeHandle(a,(function(){return{rootRef:i,toggleLeftSidebar:function(){t.current.toggleSidebar()},toggleRightSidebar:function(){n.current.toggleSidebar()}}})),c.a.createElement("div",{className:Object(o.a)(s.root,e.innerScroll&&s.innerScroll),ref:i},c.a.createElement("div",{className:s.topBg}),c.a.createElement("div",{className:"flex container w-full"},m&&c.a.createElement(b,{position:"left",header:e.leftSidebarHeader,content:e.leftSidebarContent,variant:e.leftSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:s,ref:t,rootRef:i}),c.a.createElement("div",{className:Object(o.a)(s.contentWrapper,m&&(void 0===e.leftSidebarVariant||"permanent"===e.leftSidebarVariant)&&"lg:ltr:pl-0 lg:rtl:pr-0",d&&(void 0===e.rightSidebarVariant||"permanent"===e.rightSidebarVariant)&&"lg:pr-0")},c.a.createElement(u,{header:e.header,classes:s}),c.a.createElement("div",{className:Object(o.a)(s.contentCard,e.innerScroll&&"inner-scroll")},e.contentToolbar&&c.a.createElement("div",{className:s.toolbar},e.contentToolbar),e.content&&c.a.createElement(r.a,{className:s.content,enable:e.innerScroll,scrollToTopOnRouteChange:e.innerScroll},e.content))),d&&c.a.createElement(b,{position:"right",header:e.rightSidebarHeader,content:e.rightSidebarContent,variant:e.rightSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:s,ref:n,rootRef:i})))}));v.defaultProps={};var E=c.a.memo(v)},1706:function(e,a,t){"use strict";t.d(a,"d",(function(){return i})),t.d(a,"h",(function(){return o})),t.d(a,"l",(function(){return l})),t.d(a,"p",(function(){return c})),t.d(a,"c",(function(){return u})),t.d(a,"f",(function(){return m})),t.d(a,"k",(function(){return p})),t.d(a,"n",(function(){return h})),t.d(a,"m",(function(){return f})),t.d(a,"b",(function(){return b})),t.d(a,"g",(function(){return g})),t.d(a,"j",(function(){return v})),t.d(a,"o",(function(){return E})),t.d(a,"a",(function(){return x})),t.d(a,"e",(function(){return y})),t.d(a,"i",(function(){return O}));var n=t(26),r=t.n(n),i="[E-COMMERCE APP] GET PRODUCTS",o="[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT";function l(){var e=r.a.get("/api/e-commerce-app/products");return function(a){return e.then((function(e){return a({type:i,payload:e.data})}))}}function c(e){return{type:o,searchText:e.target.value}}var s=t(32),d=t(63),u="[E-COMMERCE APP] GET PRODUCT",m="[E-COMMERCE APP] SAVE PRODUCT";function p(e){var a=r.a.get("/api/e-commerce-app/product",{params:e});return function(e){return a.then((function(a){return e({type:u,payload:a.data})}))}}function h(e){var a=r.a.post("/api/e-commerce-app/product/save",e);return function(e){return a.then((function(a){return e(Object(d.G)({message:"Product Saved"})),e({type:m,payload:a.data})}))}}function f(){var e={id:s.a.generateGUID(),name:"",handle:"",description:"",categories:[],tags:[],images:[],priceTaxExcl:0,priceTaxIncl:0,taxRate:0,comparedPrice:0,quantity:0,sku:"",width:"",height:"",depth:"",weight:"",extraShippingFee:0,active:!0};return{type:u,payload:e}}var b="[E-COMMERCE APP] GET ORDERS",g="[E-COMMERCE APP] SET ORDERS SEARCH TEXT";function v(){var e=r.a.get("/api/e-commerce-app/orders");return function(a){return e.then((function(e){return a({type:b,payload:e.data})}))}}function E(e){return{type:g,searchText:e.target.value}}var x="[E-COMMERCE APP] GET ORDER",y="[E-COMMERCE APP] SAVE ORDER";function O(e){var a=r.a.get("/api/e-commerce-app/order",{params:e});return function(e){return a.then((function(a){return e({type:x,payload:a.data})}))}}},1804:function(e,a,t){"use strict";var n=t(76),r=t(2),i=t(1706),o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case i.a:case i.e:return Object(r.a)({},a.payload);default:return e}},l={data:[],searchText:""},c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case i.b:return Object(r.a)(Object(r.a)({},e),{},{data:a.payload});case i.g:return Object(r.a)(Object(r.a)({},e),{},{searchText:a.searchText});default:return e}},s={data:null},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case i.c:case i.f:return Object(r.a)(Object(r.a)({},e),{},{data:a.payload});default:return e}},u={data:[],searchText:""},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case i.d:return Object(r.a)(Object(r.a)({},e),{},{data:a.payload});case i.h:return Object(r.a)(Object(r.a)({},e),{},{searchText:a.searchText});default:return e}},p=Object(n.d)({products:m,product:d,orders:c,order:o});a.a=p},3134:function(e,a,t){"use strict";t.r(a);var n=t(12),r=t(2),i=t(8),o=t(155),l=t(568),c=t(824),s=t(1696),d=t(188),u=t(32),m=t(10),p=t(143),h=t(269),f=t(129),b=t(278),g=t(884),v=t(62),E=t(1679),x=t(1680),y=t(1660),O=t(71),S=t(323),w=t(11),C=t(0),j=t.n(C),I=t(6),N=t(52),T=t(35),P=t(1706),R=t(1804),k=Object(g.a)((function(e){return{productImageFeaturedStar:{position:"absolute",top:0,right:0,color:h.a[400],opacity:0},productImageUpload:{transitionProperty:"box-shadow",transitionDuration:e.transitions.duration.short,transitionTimingFunction:e.transitions.easing.easeInOut},productImageItem:{transitionProperty:"box-shadow",transitionDuration:e.transitions.duration.short,transitionTimingFunction:e.transitions.easing.easeInOut,"&:hover":{"& $productImageFeaturedStar":{opacity:.8}},"&.featured":{pointerEvents:"none",boxShadow:e.shadows[3],"& $productImageFeaturedStar":{opacity:1},"&:hover $productImageFeaturedStar":{opacity:1}}}}}));a.default=Object(S.a)("eCommerceApp",R.a)((function(e){var a=Object(I.c)(),t=Object(I.d)((function(e){return e.eCommerceApp.product})),h=Object(v.a)(),g=k(e),S=Object(C.useState)(0),R=Object(i.a)(S,2),D=R[0],F=R[1],W=Object(d.c)(null),A=W.form,M=W.handleChange,H=W.setForm,U=Object(N.j)();function B(e,a){H(m.a.set(Object(r.a)({},A),a,e.map((function(e){return e.value}))))}function V(e){H(m.a.set(Object(r.a)({},A),"featuredImageId",e))}return Object(d.b)((function(){!function(){var e=U.productId;a("new"===e?P.m():P.k(U))}()}),[a,U]),Object(C.useEffect)((function(){(t.data&&!A||t.data&&A&&t.data.id!==A.id)&&H(t.data)}),[A,t.data,H]),(!t.data||t.data&&U.productId!==t.data.id)&&"new"!==U.productId?j.a.createElement(c.a,null):j.a.createElement(s.a,{classes:{toolbar:"p-0",header:"min-h-72 h-72 sm:h-136 sm:min-h-136"},header:A&&j.a.createElement("div",{className:"flex flex-1 w-full items-center justify-between"},j.a.createElement("div",{className:"flex flex-col items-start max-w-full"},j.a.createElement(o.a,{animation:"transition.slideRightIn",delay:300},j.a.createElement(O.a,{className:"normal-case flex items-center sm:mb-12",component:T.a,role:"button",to:"/apps/e-commerce/products",color:"inherit"},j.a.createElement(f.a,{className:"text-20"},"ltr"===h.direction?"arrow_back":"arrow_forward"),j.a.createElement("span",{className:"mx-4"},"Products"))),j.a.createElement("div",{className:"flex items-center max-w-full"},j.a.createElement(o.a,{animation:"transition.expandIn",delay:300},A.images.length>0&&A.featuredImageId?j.a.createElement("img",{className:"w-32 sm:w-48 rounded",src:m.a.find(A.images,{id:A.featuredImageId}).url,alt:A.name}):j.a.createElement("img",{className:"w-32 sm:w-48 rounded",src:"assets/images/ecommerce/product-image-placeholder.png",alt:A.name})),j.a.createElement("div",{className:"flex flex-col min-w-0 mx-8 sm:mc-16"},j.a.createElement(o.a,{animation:"transition.slideLeftIn",delay:300},j.a.createElement(O.a,{className:"text-16 sm:text-20 truncate"},A.name?A.name:"New Product")),j.a.createElement(o.a,{animation:"transition.slideLeftIn",delay:300},j.a.createElement(O.a,{variant:"caption"},"Product Detail"))))),j.a.createElement(o.a,{animation:"transition.slideRightIn",delay:300},j.a.createElement(p.a,{className:"whitespace-no-wrap normal-case",variant:"contained",color:"secondary",disabled:!(A.name.length>0&&!m.a.isEqual(t.data,A)),onClick:function(){return a(P.n(A))}},"Save"))),contentToolbar:j.a.createElement(x.a,{value:D,onChange:function(e,a){F(a)},indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"auto",classes:{root:"w-full h-64"}},j.a.createElement(E.a,{className:"h-64 normal-case",label:"Basic Info"}),j.a.createElement(E.a,{className:"h-64 normal-case",label:"Product Images"}),j.a.createElement(E.a,{className:"h-64 normal-case",label:"Pricing"}),j.a.createElement(E.a,{className:"h-64 normal-case",label:"Inventory"}),j.a.createElement(E.a,{className:"h-64 normal-case",label:"Shipping"})),content:A&&j.a.createElement("div",{className:"p-16 sm:p-24 max-w-2xl"},0===D&&j.a.createElement("div",null,j.a.createElement(y.a,{className:"mt-8 mb-16",error:""===A.name,required:!0,label:"Name",autoFocus:!0,id:"name",name:"name",value:A.name,onChange:M,variant:"outlined",fullWidth:!0}),j.a.createElement(y.a,{className:"mt-8 mb-16",id:"description",name:"description",onChange:M,label:"Description",type:"text",value:A.description,multiline:!0,rows:5,variant:"outlined",fullWidth:!0}),j.a.createElement(l.a,{className:"mt-8 mb-24",value:A.categories.map((function(e){return{value:e,label:e}})),onChange:function(e){return B(e,"categories")},placeholder:"Select multiple categories",textFieldProps:{label:"Categories",InputLabelProps:{shrink:!0},variant:"outlined"},isMulti:!0}),j.a.createElement(l.a,{className:"mt-8 mb-16",value:A.tags.map((function(e){return{value:e,label:e}})),onChange:function(e){return B(e,"tags")},placeholder:"Select multiple tags",textFieldProps:{label:"Tags",InputLabelProps:{shrink:!0},variant:"outlined"},isMulti:!0})),1===D&&j.a.createElement("div",null,j.a.createElement("div",{className:"flex justify-center sm:justify-start flex-wrap -mx-8"},j.a.createElement("label",{htmlFor:"button-file",className:Object(w.a)(g.productImageUpload,"flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5")},j.a.createElement("input",{accept:"image/*",className:"hidden",id:"button-file",type:"file",onChange:function(e){var a=e.target.files[0];if(a){var t=new FileReader;t.readAsBinaryString(a),t.onload=function(){H(m.a.set(Object(r.a)({},A),"images",[{id:u.a.generateGUID(),url:"data:".concat(a.type,";base64,").concat(btoa(t.result)),type:"image"}].concat(Object(n.a)(A.images))))},t.onerror=function(){console.log("error on load image")}}}}),j.a.createElement(f.a,{fontSize:"large",color:"action"},"cloud_upload")),A.images.map((function(e){return j.a.createElement("div",{onClick:function(){return V(e.id)},onKeyDown:function(){return V(e.id)},role:"button",tabIndex:0,className:Object(w.a)(g.productImageItem,"flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",e.id===A.featuredImageId&&"featured"),key:e.id},j.a.createElement(f.a,{className:g.productImageFeaturedStar},"star"),j.a.createElement("img",{className:"max-w-none w-auto h-full",src:e.url,alt:"product"}))})))),2===D&&j.a.createElement("div",null,j.a.createElement(y.a,{className:"mt-8 mb-16",label:"Tax Excluded Price",id:"priceTaxExcl",name:"priceTaxExcl",value:A.priceTaxExcl,onChange:M,InputProps:{startAdornment:j.a.createElement(b.a,{position:"start"},"$")},type:"number",variant:"outlined",autoFocus:!0,fullWidth:!0}),j.a.createElement(y.a,{className:"mt-8 mb-16",label:"Tax Included Price",id:"priceTaxIncl",name:"priceTaxIncl",value:A.priceTaxIncl,onChange:M,InputProps:{startAdornment:j.a.createElement(b.a,{position:"start"},"$")},type:"number",variant:"outlined",fullWidth:!0}),j.a.createElement(y.a,{className:"mt-8 mb-16",label:"Tax Rate",id:"taxRate",name:"taxRate",value:A.taxRate,onChange:M,InputProps:{startAdornment:j.a.createElement(b.a,{position:"start"},"$")},type:"number",variant:"outlined",fullWidth:!0}),j.a.createElement(y.a,{className:"mt-8 mb-16",label:"Compared Price",id:"comparedPrice",name:"comparedPrice",value:A.comparedPrice,onChange:M,InputProps:{startAdornment:j.a.createElement(b.a,{position:"start"},"$")},type:"number",variant:"outlined",fullWidth:!0,helperText:"Add a compare price to show next to the real price"})),3===D&&j.a.createElement("div",null,j.a.createElement(y.a,{className:"mt-8 mb-16",required:!0,label:"SKU",autoFocus:!0,id:"sku",name:"sku",value:A.sku,onChange:M,variant:"outlined",fullWidth:!0}),j.a.createElement(y.a,{className:"mt-8 mb-16",label:"Quantity",id:"quantity",name:"quantity",value:A.quantity,onChange:M,variant:"outlined",type:"number",fullWidth:!0})),4===D&&j.a.createElement("div",null,j.a.createElement("div",{className:"flex -mx-4"},j.a.createElement(y.a,{className:"mt-8 mb-16 mx-4",label:"Width",autoFocus:!0,id:"width",name:"width",value:A.width,onChange:M,variant:"outlined",fullWidth:!0}),j.a.createElement(y.a,{className:"mt-8 mb-16 mx-4",label:"Height",id:"height",name:"height",value:A.height,onChange:M,variant:"outlined",fullWidth:!0}),j.a.createElement(y.a,{className:"mt-8 mb-16 mx-4",label:"Depth",id:"depth",name:"depth",value:A.depth,onChange:M,variant:"outlined",fullWidth:!0})),j.a.createElement(y.a,{className:"mt-8 mb-16",label:"Weight",id:"weight",name:"weight",value:A.weight,onChange:M,variant:"outlined",fullWidth:!0}),j.a.createElement(y.a,{className:"mt-8 mb-16",label:"Extra Shipping Fee",id:"extraShippingFee",name:"extraShippingFee",value:A.extraShippingFee,onChange:M,variant:"outlined",InputProps:{startAdornment:j.a.createElement(b.a,{position:"start"},"$")},fullWidth:!0}))),innerScroll:!0})}))}}]);