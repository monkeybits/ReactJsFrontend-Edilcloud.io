(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[37958],{66256:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var t=n(51265),a=n.n(t),t=n(56156),r=n.n(t),t=n(16526),t=n.n(t),l=n(78709),s=n(3640);n(20683);function i(t,e){var n,a=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,n)),a}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach(function(e){r()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var o={animation:"transition.fadeIn",stagger:50,duration:200,display:null,visibility:"visible",delay:0},m={stagger:50,duration:200,display:null,visibility:"visible",delay:0};function u(e){return l.createElement(s.VelocityTransitionGroup,a()({},e,{enter:c(c({},o),e.enter),leave:c(c({},m),e.leave)}))}u.propTypes={children:t().any},u.defaultProps={enter:o,leave:m,easing:[.4,0,.2,1],runOnMount:!0,enterHideStyle:{visibility:"visible"},enterShowStyle:{visibility:"hidden"}};var p=l.memo(u)},37958:function(e,t,n){"use strict";n.r(t);var a=n(78709),r=n(66256),l=n(23377),s=n(96282),i=n(92466);t.default=function(){return a.createElement(l.Z,{header:a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},a.createElement("div",{className:"flex flex-col"},a.createElement("div",{className:"flex items-center mb-16"},a.createElement(s.Z,{className:"text-18",color:"action"},"home"),a.createElement(s.Z,{className:"text-16",color:"action"},"chevron_right"),a.createElement(i.Z,{color:"textSecondary"},"User Interface")),a.createElement(i.Z,{variant:"h6"},"Helper Classes"))),content:a.createElement("div",{className:"p-24 max-w-2xl"},a.createElement(r.Z,{enter:{animation:"transition.slideUpBigIn"}},a.createElement("div",null,a.createElement(i.Z,{className:"mb-8",variant:"h5"},"Styling in Material-UI"),a.createElement(i.Z,{className:"mb-16",component:"p"},"Fuse React developed based on Material-UI as ui library.",a.createElement("a",{className:"mx-4",href:"https://material-ui-next.com/customization/css-in-js",target:"_blank",rel:"noopener noreferrer"},"Material-UI's styling solution"),"uses JSS at its core. Therefore the Fuse React supports",a.createElement("a",{className:"mx-4",href:"http://cssinjs.org/",target:"_blank",rel:"noopener noreferrer"},"JSS (CSSinJS library)"))),a.createElement("div",null,a.createElement(i.Z,{className:"mt-32 mb-8",variant:"h5"},"Helper Classes with TailwindCSS"),a.createElement(i.Z,{className:"mb-16",component:"p"},"We are accepting JSS advantages but we can't leave ",a.createElement("b",null,"helper classes")," for fast development, ease of use, globally access etc. So we have used both in components."),a.createElement(i.Z,{className:"mb-16",component:"p"},"We are using",a.createElement("a",{className:"mx-4",href:"https://tailwindcss.com",target:"_blank",rel:"noopener noreferrer"},"TailwindCSS"),"as an engine for generating helper classes. It's not an UI kit and it's customizable. You can find the config file of Tailwind with named \"",a.createElement("b",null,"tailwind.js"),'" under the root of Fuse React.'))))})}}}]);