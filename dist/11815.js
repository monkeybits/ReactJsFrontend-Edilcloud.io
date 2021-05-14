(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[11815],{89766:function(e,t,a){"use strict";var u=a(97439),d=a(84818),p=a(78709),l=a(16526),f=a(30367),l=a(6274),n=a(70621),a=p.forwardRef(function(e,t){var a=e.absolute,l=void 0!==a&&a,n=e.classes,r=e.className,s=e.component,c=void 0===s?"hr":s,i=e.flexItem,m=void 0!==i&&i,o=e.light,a=void 0!==o&&o,s=e.orientation,i=void 0===s?"horizontal":s,o=e.role,s=void 0===o?"hr"!==c?"separator":void 0:o,o=e.variant,o=void 0===o?"fullWidth":o,e=(0,d.Z)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return p.createElement(c,(0,u.Z)({className:(0,f.Z)(n.root,r,"fullWidth"!==o&&n[o],l&&n.absolute,m&&n.flexItem,a&&n.light,"vertical"===i&&n.vertical),role:s,ref:t},e))});t.Z=(0,l.Z)(function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:(0,n.U1)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}},{name:"MuiDivider"})(a)},66256:function(e,t,a){"use strict";a.d(t,{Z:function(){return d}});var t=a(51265),l=a.n(t),t=a(56156),n=a.n(t),t=a(16526),t=a.n(t),r=a(78709),s=a(3640);a(20683);function c(t,e){var a,l=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),l.push.apply(l,a)),l}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach(function(e){n()(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var m={animation:"transition.fadeIn",stagger:50,duration:200,display:null,visibility:"visible",delay:0},o={stagger:50,duration:200,display:null,visibility:"visible",delay:0};function u(e){return r.createElement(s.VelocityTransitionGroup,l()({},e,{enter:i(i({},m),e.enter),leave:i(i({},o),e.leave)}))}u.propTypes={children:t().any},u.defaultProps={enter:m,leave:o,easing:[.4,0,.2,1],runOnMount:!0,enterHideStyle:{visibility:"visible"},enterShowStyle:{visibility:"hidden"}};var d=r.memo(u)},11815:function(e,t,a){"use strict";a.r(t);var l=a(78709),n=a(42401),r=a(66256),s=a(92466),c=a(94678),i=a(1737),m=a(89766),o=a(13786),u=a(40962),d=a(28344),p=(0,u.Z)(function(e){return{header:{height:600,background:"linear-gradient(to right, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),color:e.palette.primary.contrastText},cardHeader:{backgroundColor:e.palette.primary[800],color:e.palette.getContrastText(e.palette.primary[800])}}});t.default=function(){var e=p();return l.createElement("div",null,l.createElement("div",{className:(0,d.Z)(e.header,"flex")},l.createElement("div",{className:"p-24 w-full max-w-2xl mx-auto"},l.createElement("div",{className:"text-center my-128 mx-24"},l.createElement(n.Z,{animation:"transition.slideUpIn",duration:400,delay:100},l.createElement(s.Z,{variant:"h2",color:"inherit",className:"font-light"},"Simple Pricing!")),l.createElement(n.Z,{duration:400,delay:600},l.createElement(s.Z,{variant:"subtitle1",color:"inherit",className:"opacity-75 mt-16 mx-auto max-w-512"},"The most advanced customer support tools with a simple and affordable pricing. And you can always try for 30 days, free!"))))),l.createElement("div",{className:"-mt-192"},l.createElement("div",{className:"w-full max-w-2xl mx-auto"},l.createElement(r.Z,{enter:{animation:"transition.slideUpBigIn"},className:"flex items-center justify-center flex-wrap"},l.createElement("div",{className:"w-full max-w-320 sm:w-1/3 p-12"},l.createElement(c.Z,{square:!0},l.createElement("div",{className:(0,d.Z)(e.cardHeader,"px-24 py-16")},l.createElement(s.Z,{variant:"subtitle1",color:"inherit"},"BASIC")),l.createElement(i.Z,{className:"p-32"},l.createElement("div",{className:"flex justify-center"},l.createElement(s.Z,{variant:"h5",color:"textSecondary"},"$"),l.createElement("div",{className:"flex items-end"},l.createElement(s.Z,{className:"text-72 mx-4 font-light leading-none"},"4"),l.createElement(s.Z,{variant:"subtitle1",color:"textSecondary"},"/ month"))),l.createElement(m.Z,{className:"my-32"}),l.createElement("div",{className:"flex flex-col"},l.createElement(s.Z,{variant:"subtitle1",className:""},l.createElement("span",{className:"font-bold mx-4"},"10"),"Projects"),l.createElement(s.Z,{variant:"subtitle1",className:""},l.createElement("span",{className:"font-bold mx-4"},"10"),"Pages"),l.createElement(s.Z,{variant:"subtitle1",className:""},l.createElement("span",{className:"font-bold mx-4"},"100"),"Mb Disk Space"))),l.createElement("div",{className:"flex justify-center pb-32"},l.createElement(o.Z,{variant:"contained",color:"secondary",className:"w-128"},"BUY NOW")))),l.createElement("div",{className:"w-full max-w-320 sm:w-1/3 p-12"},l.createElement(c.Z,{raised:!0,square:!0},l.createElement("div",{className:(0,d.Z)(e.cardHeader,"flex items-center justify-between px-24 py-16")},l.createElement(s.Z,{variant:"subtitle1",color:"inherit"},"STANDART"),l.createElement(s.Z,{variant:"caption",color:"inherit"},"Save 15%")),l.createElement(i.Z,{className:"p-32"},l.createElement("div",{className:"flex justify-center"},l.createElement(s.Z,{variant:"h5",color:"textSecondary"},"$"),l.createElement("div",{className:"flex items-end"},l.createElement(s.Z,{className:"text-72 mx-4 font-light leading-none"},"8"),l.createElement(s.Z,{variant:"subtitle1",color:"textSecondary"},"/ month"))),l.createElement(m.Z,{className:"my-32"}),l.createElement("div",{className:"flex flex-col"},l.createElement(s.Z,{variant:"subtitle1",className:""},l.createElement("span",{className:"font-bold mx-4"},"20"),"Projects"),l.createElement(s.Z,{variant:"subtitle1",className:""},l.createElement("span",{className:"font-bold mx-4"},"20"),"Pages"),l.createElement(s.Z,{variant:"subtitle1",className:""},l.createElement("span",{className:"font-bold mx-4"},"200"),"Mb Disk Space"))),l.createElement("div",{className:"flex justify-center pb-32"},l.createElement(o.Z,{variant:"contained",color:"secondary",className:"w-128"},"BUY NOW")))),l.createElement("div",{className:"w-full max-w-320 sm:w-1/3 p-12"},l.createElement(c.Z,{square:!0},l.createElement("div",{className:(0,d.Z)(e.cardHeader,"px-24 py-16")},l.createElement(s.Z,{variant:"subtitle1",color:"inherit"},"ADVANCED")),l.createElement(i.Z,{className:"p-32"},l.createElement("div",{className:"flex justify-center"},l.createElement(s.Z,{variant:"h5",color:"textSecondary",className:"font-medium"},"$"),l.createElement("div",{className:"flex items-end"},l.createElement(s.Z,{className:"text-72 mx-4 font-light leading-none"},"12"),l.createElement(s.Z,{variant:"subtitle1",color:"textSecondary"},"/ month"))),l.createElement(m.Z,{className:"my-32"}),l.createElement("div",{className:"flex flex-col"},l.createElement(s.Z,{variant:"subtitle1",className:""},l.createElement("span",{className:"font-bold mx-4"},"40"),"Projects"),l.createElement(s.Z,{variant:"subtitle1",className:""},l.createElement("span",{className:"font-bold mx-4"},"40"),"Pages"),l.createElement(s.Z,{variant:"subtitle1",className:""},l.createElement("span",{className:"font-bold mx-4"},"500"),"Mb Disk Space"))),l.createElement("div",{className:"flex justify-center pb-32"},l.createElement(o.Z,{variant:"contained",color:"secondary",className:"w-128"},"BUY NOW"))))),l.createElement("div",{className:"flex flex-col items-center py-96 text-center sm:ltr:text-left sm:rtl:text-right max-w-xl mx-auto"},l.createElement(s.Z,{variant:"h4",className:"pb-32 font-light"},"Frequently Asked Questions"),l.createElement("div",{className:"flex flex-wrap w-full"},l.createElement("div",{className:"w-full sm:w-1/2 p-24"},l.createElement(s.Z,{className:"text-20 mb-8"},"How does free trial work?"),l.createElement(s.Z,{className:"text-16",color:"textSecondary"},"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a diam nec augue tincidunt accumsan. In dignissim laoreet ipsum eu interdum.")),l.createElement("div",{className:"w-full sm:w-1/2 p-24"},l.createElement(s.Z,{className:"text-20 mb-8"},"Can I cancel any time?"),l.createElement(s.Z,{className:"text-16",color:"textSecondary"},"Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus blandit quis. Sed quis neque tellus. Donec maximus ipsum in malesuada hendrerit.")),l.createElement("div",{className:"w-full sm:w-1/2 p-24"},l.createElement(s.Z,{className:"text-20 mb-8"},"What happens after my trial ended?"),l.createElement(s.Z,{className:"text-16",color:"textSecondary"},"Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus blandit quis. Sed quis neque tellus. Donec maximus ipsum in malesuada hendrerit.")),l.createElement("div",{className:"w-full sm:w-1/2 p-24"},l.createElement(s.Z,{className:"text-20 mb-8"},"Can I have a discount?"),l.createElement(s.Z,{className:"text-16",color:"textSecondary"},"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a diam nec augue tincidunt accumsan. In dignissim laoreet ipsum eu interdum.")))))))}}}]);