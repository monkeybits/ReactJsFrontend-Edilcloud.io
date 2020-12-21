(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[5],{1934:function(e,t,a){"use strict";var n=a(235);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),i=(0,n(a(329)).default)(r.default.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank");t.default=i},1935:function(e,t,a){"use strict";var n=a(235);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),i=(0,n(a(329)).default)(r.default.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox");t.default=i},2004:function(e,t,a){"use strict";a.d(t,"a",(function(){return C}));var n=a(91),r=a(92),i=a(155),l=a(154),o=a(191),c=a(0),s=a.n(c),d=a(7),p=a(143),m=a(1805),u=a(1822),v=a(1823),b=a(1824),f=a(187),h=a(441),g=a.n(h),E=a(71),j=a(2051),O=a.n(j),x=(a(2052),Object(d.a)((function(e){return{root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}}))((function(e){var t=e.children,a=e.classes,n=e.onClose,r=Object(o.a)(e,["children","classes","onClose"]);return s.a.createElement(u.a,Object.assign({disableTypography:!0,className:a.root},r),s.a.createElement(E.a,{variant:"h6"},t),n?s.a.createElement(f.a,{"aria-label":"close",className:a.closeButton,onClick:n},s.a.createElement(g.a,null)):null)}))),y=Object(d.a)((function(e){return{root:{padding:e.spacing(2)}}}))(v.a),L=Object(d.a)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(b.a),C=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,i=new Array(r),l=0;l<r;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).handleCrop=function(){var t=(new Date).getTime()+".png";e.cropper.getCroppedCanvas().toBlob((function(a){e.blobToFile(a,t)}))},e}return Object(r.a)(a,[{key:"blobToFile",value:function(e,t){return e.lastModifiedDate=new Date,e.name=t,this.props.onCrop(e),this.props.onHide(),e}},{key:"render",value:function(){var e=this;return s.a.createElement(m.a,{onClose:this.props.onHide,"aria-labelledby":"customized-dialog-title",open:this.props.viewCroper},s.a.createElement(x,{id:"customized-dialog-title",onClose:this.props.onHide},"Crop Image"),s.a.createElement(y,{dividers:!0},s.a.createElement(O.a,{ref:function(t){e.cropper=t},src:this.props.image,style:{height:300,width:"100%"},aspectRatio:1,guides:!1})),s.a.createElement(L,null,s.a.createElement(p.a,{variant:"contained",color:"primary",onClick:this.handleCrop,c:!0},"Crop")))}}]),a}(s.a.Component)},2099:function(e,t,a){"use strict";var n=a(1),r=a(4),i=a(0),l=(a(3),a(5)),o=a(7),c=a(186),s=a(2100),d=i.createElement(s.a,null),p=i.forwardRef((function(e,t){var a=e.activeStep,o=void 0===a?0:a,s=e.alternativeLabel,p=void 0!==s&&s,m=e.children,u=e.classes,v=e.className,b=e.connector,f=void 0===b?d:b,h=e.nonLinear,g=void 0!==h&&h,E=e.orientation,j=void 0===E?"horizontal":E,O=Object(r.a)(e,["activeStep","alternativeLabel","children","classes","className","connector","nonLinear","orientation"]),x=i.isValidElement(f)?i.cloneElement(f,{orientation:j}):null,y=i.Children.toArray(m),L=y.map((function(e,t){var a={index:t,active:!1,completed:!1,disabled:!1};return o===t?a.active=!0:!g&&o>t?a.completed=!0:!g&&o<t&&(a.disabled=!0),i.cloneElement(e,Object(n.a)({alternativeLabel:p,connector:x,last:t+1===y.length,orientation:j},a,e.props))}));return i.createElement(c.a,Object(n.a)({square:!0,elevation:0,className:Object(l.a)(u.root,u[j],v,p&&u.alternativeLabel),ref:t},O),L)}));t.a=Object(o.a)({root:{display:"flex",padding:24},horizontal:{flexDirection:"row",alignItems:"center"},vertical:{flexDirection:"column"},alternativeLabel:{alignItems:"flex-start"}},{name:"MuiStepper"})(p)},2100:function(e,t,a){"use strict";var n=a(1),r=a(4),i=a(0),l=(a(3),a(5)),o=a(7),c=i.forwardRef((function(e,t){var a=e.active,o=e.alternativeLabel,c=void 0!==o&&o,s=e.classes,d=e.className,p=e.completed,m=e.disabled,u=(e.index,e.orientation),v=void 0===u?"horizontal":u,b=Object(r.a)(e,["active","alternativeLabel","classes","className","completed","disabled","index","orientation"]);return i.createElement("div",Object(n.a)({className:Object(l.a)(s.root,s[v],d,c&&s.alternativeLabel,a&&s.active,p&&s.completed,m&&s.disabled),ref:t},b),i.createElement("span",{className:Object(l.a)(s.line,{horizontal:s.lineHorizontal,vertical:s.lineVertical}[v])}))}));t.a=Object(o.a)((function(e){return{root:{flex:"1 1 auto"},horizontal:{},vertical:{marginLeft:12,padding:"0 0 8px"},alternativeLabel:{position:"absolute",top:12,left:"calc(-50% + 20px)",right:"calc(50% + 20px)"},active:{},completed:{},disabled:{},line:{display:"block",borderColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},lineHorizontal:{borderTopStyle:"solid",borderTopWidth:1},lineVertical:{borderLeftStyle:"solid",borderLeftWidth:1,minHeight:24}}}),{name:"MuiStepConnector"})(c)},2101:function(e,t,a){"use strict";var n=a(1),r=a(4),i=a(0),l=(a(116),a(3),a(5)),o=a(7),c=i.forwardRef((function(e,t){var a=e.active,o=void 0!==a&&a,c=e.alternativeLabel,s=e.children,d=e.classes,p=e.className,m=e.completed,u=void 0!==m&&m,v=e.connector,b=e.disabled,f=void 0!==b&&b,h=e.expanded,g=void 0!==h&&h,E=e.index,j=e.last,O=e.orientation,x=Object(r.a)(e,["active","alternativeLabel","children","classes","className","completed","connector","disabled","expanded","index","last","orientation"]),y=v?i.cloneElement(v,{orientation:O,alternativeLabel:c,index:E,active:o,completed:u,disabled:f}):null,L=i.createElement("div",Object(n.a)({className:Object(l.a)(d.root,d[O],p,c&&d.alternativeLabel,u&&d.completed),ref:t},x),y&&c&&0!==E?y:null,i.Children.map(s,(function(e){return i.isValidElement(e)?i.cloneElement(e,Object(n.a)({active:o,alternativeLabel:c,completed:u,disabled:f,expanded:g,last:j,icon:E+1,orientation:O},e.props)):null})));return y&&!c&&0!==E?i.createElement(i.Fragment,null,y,L):L}));t.a=Object(o.a)({root:{},horizontal:{paddingLeft:8,paddingRight:8},vertical:{},alternativeLabel:{flex:1,position:"relative"},completed:{}},{name:"MuiStep"})(c)},2102:function(e,t,a){"use strict";var n=a(1),r=a(4),i=a(0),l=(a(3),a(5)),o=a(7),c=a(71),s=a(2138),d=i.forwardRef((function(e,t){var a=e.active,o=void 0!==a&&a,d=e.alternativeLabel,p=void 0!==d&&d,m=e.children,u=e.classes,v=e.className,b=e.completed,f=void 0!==b&&b,h=e.disabled,g=void 0!==h&&h,E=e.error,j=void 0!==E&&E,O=(e.expanded,e.icon),x=(e.last,e.optional),y=e.orientation,L=void 0===y?"horizontal":y,C=e.StepIconComponent,N=e.StepIconProps,z=Object(r.a)(e,["active","alternativeLabel","children","classes","className","completed","disabled","error","expanded","icon","last","optional","orientation","StepIconComponent","StepIconProps"]),S=C;return O&&!S&&(S=s.a),i.createElement("span",Object(n.a)({className:Object(l.a)(u.root,u[L],v,g&&u.disabled,p&&u.alternativeLabel,j&&u.error),ref:t},z),O||S?i.createElement("span",{className:Object(l.a)(u.iconContainer,p&&u.alternativeLabel)},i.createElement(S,Object(n.a)({completed:f,active:o,error:j,icon:O},N))):null,i.createElement("span",{className:u.labelContainer},m?i.createElement(c.a,{variant:"body2",component:"span",display:"block",className:Object(l.a)(u.label,p&&u.alternativeLabel,f&&u.completed,o&&u.active,j&&u.error)},m):null,x))}));d.muiName="StepLabel",t.a=Object(o.a)((function(e){return{root:{display:"flex",alignItems:"center","&$alternativeLabel":{flexDirection:"column"},"&$disabled":{cursor:"default"}},horizontal:{},vertical:{},label:{color:e.palette.text.secondary,"&$active":{color:e.palette.text.primary,fontWeight:500},"&$completed":{color:e.palette.text.primary,fontWeight:500},"&$alternativeLabel":{textAlign:"center",marginTop:16},"&$error":{color:e.palette.error.main}},active:{},completed:{},error:{},disabled:{},iconContainer:{flexShrink:0,display:"flex",paddingRight:8,"&$alternativeLabel":{paddingRight:0}},alternativeLabel:{},labelContainer:{width:"100%"}}}),{name:"MuiStepLabel"})(d)},2138:function(e,t,a){"use strict";var n=a(0),r=(a(3),a(5)),i=a(82),l=Object(i.a)(n.createElement("path",{d:"M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"}),"CheckCircle"),o=Object(i.a)(n.createElement("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}),"Warning"),c=a(7),s=a(429),d=n.createElement("circle",{cx:"12",cy:"12",r:"12"}),p=n.forwardRef((function(e,t){var a=e.completed,i=void 0!==a&&a,c=e.icon,p=e.active,m=void 0!==p&&p,u=e.error,v=void 0!==u&&u,b=e.classes;if("number"===typeof c||"string"===typeof c){var f=Object(r.a)(b.root,m&&b.active,v&&b.error,i&&b.completed);return v?n.createElement(o,{className:f,ref:t}):i?n.createElement(l,{className:f,ref:t}):n.createElement(s.a,{className:f,ref:t},d,n.createElement("text",{className:b.text,x:"12",y:"16",textAnchor:"middle"},c))}return c}));t.a=Object(c.a)((function(e){return{root:{display:"block",color:e.palette.text.disabled,"&$completed":{color:e.palette.primary.main},"&$active":{color:e.palette.primary.main},"&$error":{color:e.palette.error.main}},text:{fill:e.palette.primary.contrastText,fontSize:e.typography.caption.fontSize,fontFamily:e.typography.fontFamily},active:{},completed:{},error:{}}}),{name:"MuiStepIcon"})(p)},2253:function(e,t,a){"use strict";var n=a(1),r=a(4),i=a(0),l=(a(3),a(5)),o=a(1820),c=a(7),s=i.forwardRef((function(e,t){var a=e.active,c=(e.alternativeLabel,e.children),s=e.classes,d=e.className,p=(e.completed,e.expanded),m=e.last,u=(e.optional,e.orientation,e.TransitionComponent),v=void 0===u?o.a:u,b=e.transitionDuration,f=void 0===b?"auto":b,h=e.TransitionProps,g=Object(r.a)(e,["active","alternativeLabel","children","classes","className","completed","expanded","last","optional","orientation","TransitionComponent","transitionDuration","TransitionProps"]);var E=f;return"auto"!==f||v.muiSupportAuto||(E=void 0),i.createElement("div",Object(n.a)({className:Object(l.a)(s.root,d,m&&s.last),ref:t},g),i.createElement(v,Object(n.a)({in:a||p,className:s.transition,timeout:E,unmountOnExit:!0},h),c))}));t.a=Object(c.a)((function(e){return{root:{marginTop:8,marginLeft:12,paddingLeft:20,paddingRight:8,borderLeft:"1px solid ".concat("light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600])},last:{borderLeft:"none"},transition:{}}}),{name:"MuiStepContent"})(s)},2374:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(8),r=a(0),i=a.n(r),l=a(170),o=a(143),c=a(2004);function s(e){var t=e.setFile,a=e.file,s=e.remove,d=Object(r.useState)(null),p=Object(n.a)(d,2),m=p[0],u=p[1],v=Object(r.useState)(!1),b=Object(n.a)(v,2),f=b[0],h=b[1];return f?i.a.createElement(c.a,{image:m,viewCroper:f,onCrop:function(e){var a=new FileReader;a.onloadend=function(){t({fileData:e,imagePreviewUrl:a.result})},a.readAsDataURL(e)},onHide:function(){return h(!1)}}):(null===a||void 0===a?void 0:a.imagePreviewUrl)?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"flex justify-center"},i.a.createElement("img",{className:"profile-img",src:a.imagePreviewUrl,alt:"profile"})),i.a.createElement("div",{className:"text-center mt-10"},i.a.createElement(o.a,{variant:"contained",onClick:s},"Remove"))):i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"flex justify-center mt-16 mb-20"},i.a.createElement("img",{className:"profile-img",src:"/assets/images/avatars/profile-img.png",alt:"profile"})),i.a.createElement("div",{className:"flex justify-center mt-16 mb-20"},i.a.createElement("input",{id:"add_user",hidden:!0,type:"file",onChange:function(e){u(URL.createObjectURL(e.currentTarget.files[0])),h(!0)}}),i.a.createElement("label",{htmlFor:"add_user",className:"text-2xl cursor-pointer"},i.a.createElement(l.a,{fontSize:"inherit",className:"align-middle"},"add_circle")," ","Upload photo")))}}}]);