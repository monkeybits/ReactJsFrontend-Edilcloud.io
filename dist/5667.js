(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[5667],{47442:function(e,t,n){"use strict";n.d(t,{Z:function(){return D}});var r=n(61432),o=n.n(r),i=n(78709),a=n(32986),c=n(94678),l=n(84403),m=n(20103),u=n(82707),h=n(96282),s=n(16526),t=n.n(s),r=n(79545),f=n.n(r),s=n(82853),d=n.n(s),r=n(82147),p=n.n(r),s=n(40734),v=n.n(s),r=n(38050),y=n.n(r),s=n(3056),E=n.n(s),r=n(71470),Z=n.n(r),s=n(56156),g=n.n(s),r=n(77035),b=n(26895),A=n(75964),T=n(96450),s=n(6274),k=n(66015),N=n(7202),w=n(34948);function S(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function x(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?S(Object(n),!0).forEach(function(e){g()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function C(n){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var e,t=Z()(n);return t=r?(e=Z()(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments),E()(this,t)}}var R=(0,r.Z)({productionPrefix:"iframe-"}),r=function(e){y()(s,e);var a=C(s);function s(){var t;d()(this,s);for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return t=a.call.apply(a,[this].concat(n)),g()(v()(t),"state",{ready:!1}),g()(v()(t),"handleRef",function(e){t.contentDocument=e?e.node.contentDocument:null}),g()(v()(t),"onContentDidMount",function(){t.setState({ready:!0,jss:(0,k.Ue)(x(x({},(0,b.Z)()),{},{plugins:[].concat(f()((0,b.Z)().plugins),[(0,N.Z)()]),insertionPoint:t.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:t.contentDocument.body})}),g()(v()(t),"onContentDidUpdate",function(){t.contentDocument.body.dir=t.props.theme.direction}),g()(v()(t),"renderHead",function(){return i.createElement(i.Fragment,null,i.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Poppins, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),i.createElement("noscript",{id:"jss-demo-insertion-point"}))}),t}return p()(s,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.classes,e=e.theme;return i.createElement(w.ZP,{head:this.renderHead(),ref:this.handleRef,className:n.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?i.createElement(A.ZP,{jss:this.state.jss,generateClassName:R,sheetsManager:this.state.sheetsManager},i.createElement(T.Z,{theme:e},i.cloneElement(t,{container:this.state.container}))):null)}}]),s}(i.Component);r.propTypes={children:t().node.isRequired,classes:t().object.isRequired,theme:t().object.isRequired};var O=(0,s.Z)(function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}},{withTheme:!0})(r),I=(0,a.ZP)(function(){return Promise.resolve().then(n.bind(n,22482))}),t={raw:t().object,currentTabIndex:t().number};function j(e){var t=(0,i.useState)(e.currentTabIndex),n=o()(t,2),r=n[0],a=n[1],s=e.component,t=e.raw,n=e.iframe,e=e.className;return i.createElement(c.Z,{className:e},i.createElement(l.Z,{position:"static",color:"default",elevation:0},i.createElement(m.Z,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:r,onChange:function(e,t){a(t)}},s&&i.createElement(u.Z,{classes:{root:"min-w-64"},icon:i.createElement(h.Z,null,"remove_red_eye")}),t&&i.createElement(u.Z,{classes:{root:"min-w-64"},icon:i.createElement(h.Z,null,"code")}))),i.createElement("div",{className:"flex justify-center"},i.createElement("div",{className:0===r?"flex flex-1":"hidden"},s&&(n?i.createElement(O,null,i.createElement(s,null)):i.createElement("div",{className:"p-24 flex flex-1 justify-center"},i.createElement(s,null)))),i.createElement("div",{className:1===r?"flex flex-1":"hidden"},t&&i.createElement("div",{className:"flex flex-1"},i.createElement(I,{component:"pre",className:"language-javascript w-full"},t.default)))))}j.propTypes=t,j.defaultProps={currentTabIndex:0};var D=j},77271:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(78709),t=n(40962),a=n(80312),s=n(13786),o=(0,t.Z)(function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}});function i(){var e=o();return r.createElement("div",{className:e.root},r.createElement(a.Z,{onClose:function(){}},"This is a success alert — check it out!"),r.createElement(a.Z,{action:r.createElement(s.Z,{color:"inherit",size:"small"},"UNDO")},"This is a success alert — check it out!"))}},72634:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(78709),t=n(40962),a=n(80312),s=(0,t.Z)(function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}});function o(){var e=s();return r.createElement("div",{className:e.root},r.createElement(a.Z,{severity:"success",color:"info"},"This is a success alert — check it out!"))}},21359:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(78709),t=n(40962),a=n(80312),s=n(20614),o=(0,t.Z)(function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}});function i(){var e=o();return r.createElement("div",{className:e.root},r.createElement(a.Z,{severity:"error"},r.createElement(s.Z,null,"Error"),"This is an error alert — ",r.createElement("strong",null,"check it out!")),r.createElement(a.Z,{severity:"warning"},r.createElement(s.Z,null,"Warning"),"This is a warning alert — ",r.createElement("strong",null,"check it out!")),r.createElement(a.Z,{severity:"info"},r.createElement(s.Z,null,"Info"),"This is an info alert — ",r.createElement("strong",null,"check it out!")),r.createElement(a.Z,{severity:"success"},r.createElement(s.Z,null,"Success"),"This is a success alert — ",r.createElement("strong",null,"check it out!")))}},70755:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(78709),t=n(40962),a=n(80312),s=(0,t.Z)(function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}});function o(){var e=s();return r.createElement("div",{className:e.root},r.createElement(a.Z,{variant:"filled",severity:"error"},"This is an error alert — check it out!"),r.createElement(a.Z,{variant:"filled",severity:"warning"},"This is a warning alert — check it out!"),r.createElement(a.Z,{variant:"filled",severity:"info"},"This is an info alert — check it out!"),r.createElement(a.Z,{variant:"filled",severity:"success"},"This is a success alert — check it out!"))}},29946:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(78709),t=n(40962),a=n(80312),s=n(92473),o=n(70973),i=(0,t.Z)(function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}});function c(){var e=i();return r.createElement("div",{className:e.root},r.createElement(a.Z,{icon:r.createElement(s.Z,{fontSize:"inherit"}),severity:"success"},"This is a success alert — check it out!"),r.createElement(a.Z,{iconMapping:{success:r.createElement(o.Z,{fontSize:"inherit"})}},"This is a success alert — check it out!"),r.createElement(a.Z,{icon:!1,severity:"success"},"This is a success alert — check it out!"))}},12724:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(78709),t=n(40962),a=n(80312),s=(0,t.Z)(function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}});function o(){var e=s();return r.createElement("div",{className:e.root},r.createElement(a.Z,{variant:"outlined",severity:"error"},"This is an error alert — check it out!"),r.createElement(a.Z,{variant:"outlined",severity:"warning"},"This is a warning alert — check it out!"),r.createElement(a.Z,{variant:"outlined",severity:"info"},"This is an info alert — check it out!"),r.createElement(a.Z,{variant:"outlined",severity:"success"},"This is a success alert — check it out!"))}},31943:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(78709),t=n(40962),a=n(80312),s=(0,t.Z)(function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}});function o(){var e=s();return r.createElement("div",{className:e.root},r.createElement(a.Z,{severity:"error"},"This is an error alert — check it out!"),r.createElement(a.Z,{severity:"warning"},"This is a warning alert — check it out!"),r.createElement(a.Z,{severity:"info"},"This is an info alert — check it out!"),r.createElement(a.Z,{severity:"success"},"This is a success alert — check it out!"))}},33381:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var t=n(61432),a=n.n(t),s=n(78709),t=n(40962),o=n(80312),i=n(48258),c=n(53742),l=n(13786),m=n(35965),u=(0,t.Z)(function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}});function r(){var e=u(),t=s.useState(!0),n=a()(t,2),t=n[0],r=n[1];return s.createElement("div",{className:e.root},s.createElement(c.Z,{in:t},s.createElement(o.Z,{action:s.createElement(i.Z,{"aria-label":"close",color:"inherit",size:"small",onClick:function(){r(!1)}},s.createElement(m.Z,{fontSize:"inherit"}))},"Close me!")),s.createElement(l.Z,{disabled:t,variant:"outlined",onClick:function(){r(!0)}},"Re-open"))}},5667:function(e,t,n){"use strict";n.r(t);var r=n(78709),a=n(47442),s=(n(22482),n(23377)),o=n(13786),i=n(96282),c=n(92466),l=(0,n(40962).Z)(function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}});t.default=function(e){var t=l();return r.createElement(s.Z,{classes:{root:t.layoutRoot},header:r.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},r.createElement("div",{className:"flex flex-col"},r.createElement("div",{className:"flex items-center mb-16"},r.createElement(i.Z,{className:"text-18",color:"action"},"home"),r.createElement(i.Z,{className:"text-16",color:"action"},"chevron_right"),r.createElement(c.Z,{color:"textSecondary"},"Documentation"),r.createElement(i.Z,{className:"text-16",color:"action"},"chevron_right"),r.createElement(c.Z,{color:"textSecondary"},"Material UI Components")),r.createElement(c.Z,{variant:"h6"},"Alert")),r.createElement(o.Z,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/alert",target:"_blank",role:"button"},r.createElement(i.Z,null,"link"),r.createElement("span",{className:"mx-4"},"Reference"))),content:r.createElement("div",{className:"p-24 max-w-2xl"},r.createElement(c.Z,{className:"text-44 mt-32 mb-8",component:"h1"},"Alert"),r.createElement(c.Z,{className:"description"},"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task."),r.createElement(c.Z,{className:"mb-16",component:"div"},r.createElement("strong",null,"Note:")," This component is not documented in the ",r.createElement("a",{href:"https://material.io/"},"Material Design guidelines"),", but Material-UI supports it."),r.createElement(c.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Simple alerts"),r.createElement(c.Z,{className:"mb-16",component:"div"},"The alert offers four severity levels that set a distinctive icon and color."),r.createElement(c.Z,{className:"mb-16",component:"div"},r.createElement(a.Z,{className:"my-24",iframe:!1,component:n(31943).Z,raw:n(60460)})),r.createElement(c.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Description"),r.createElement(c.Z,{className:"mb-16",component:"div"},"You can use the ",r.createElement("code",null,"AlertTitle")," component to display a formatted title above the content."),r.createElement(c.Z,{className:"mb-16",component:"div"},r.createElement(a.Z,{className:"my-24",iframe:!1,component:n(21359).Z,raw:n(79261)})),r.createElement(c.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Actions"),r.createElement(c.Z,{className:"mb-16",component:"div"},"An alert can have an action, such as a close or undo button. It is rendered after the message, at the end of the alert."),r.createElement(c.Z,{className:"mb-16",component:"div"},"If an ",r.createElement("code",null,"onClose")," callback is provided and no ",r.createElement("code",null,"action")," prop is set, a close icon is displayed. The ",r.createElement("code",null,"action")," prop can be used to provide an alternative action, for example using a Button or IconButton."),r.createElement(c.Z,{className:"mb-16",component:"div"},r.createElement(a.Z,{className:"my-24",iframe:!1,component:n(77271).Z,raw:n(25388)})),r.createElement(c.Z,{className:"text-24 mt-32 mb-8",component:"h3"},"Transition"),r.createElement(c.Z,{className:"mb-16",component:"div"},"You can use a ",r.createElement("a",{href:"/components/transitions/"},"transition component")," such as ",r.createElement("code",null,"Collapse")," to transition the appearance of the alert."),r.createElement(c.Z,{className:"mb-16",component:"div"},r.createElement(a.Z,{className:"my-24",iframe:!1,component:n(33381).Z,raw:n(72291)})),r.createElement(c.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Icons"),r.createElement(c.Z,{className:"mb-16",component:"div"},"The ",r.createElement("code",null,"icon")," prop allows you to add an icon to the beginning of the alert component. This will override the default icon for the specified severity."),r.createElement(c.Z,{className:"mb-16",component:"div"},"You can change the default severity to icon mapping with the ",r.createElement("code",null,"iconMapping")," prop. This can be defined globally using ",r.createElement("a",{href:"/customization/globals/#default-props"},"theme customization"),"."),r.createElement(c.Z,{className:"mb-16",component:"div"},"Setting the icon prop to false will remove the icon altogether."),r.createElement(c.Z,{className:"mb-16",component:"div"},r.createElement(a.Z,{className:"my-24",iframe:!1,component:n(29946).Z,raw:n(51771)})),r.createElement(c.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Variants"),r.createElement(c.Z,{className:"mb-16",component:"div"},"Two additional variants are available – outlined, and filled:"),r.createElement(c.Z,{className:"text-24 mt-32 mb-8",component:"h3"},"Outlined"),r.createElement(c.Z,{className:"mb-16",component:"div"},r.createElement(a.Z,{className:"my-24",iframe:!1,component:n(12724).Z,raw:n(98600)})),r.createElement(c.Z,{className:"text-24 mt-32 mb-8",component:"h3"},"Filled"),r.createElement(c.Z,{className:"mb-16",component:"div"},r.createElement(a.Z,{className:"my-24",iframe:!1,component:n(70755).Z,raw:n(67714)})),r.createElement(c.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Toast"),r.createElement(c.Z,{className:"mb-16",component:"div"},"You can use the Snackbar to ",r.createElement("a",{href:"/components/snackbars/#customized-snackbars"},"display a toast")," with the Alert."),r.createElement(c.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Color"),r.createElement(c.Z,{className:"mb-16",component:"div"},"The ",r.createElement("code",null,"color")," prop will override the default color for the specified severity."),r.createElement(c.Z,{className:"mb-16",component:"div"},r.createElement(a.Z,{className:"my-24",iframe:!1,component:n(72634).Z,raw:n(26141)})),r.createElement(c.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Accessibility"),r.createElement(c.Z,{className:"mb-16",component:"div"},"(WAI-ARIA: ",r.createElement("a",{href:"https://www.w3.org/TR/wai-aria-practices/#alert"},"https://www.w3.org/TR/wai-aria-practices/#alert"),")"),r.createElement(c.Z,{className:"mb-16",component:"div"},"When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads."),r.createElement(c.Z,{className:"mb-16",component:"div"},"Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text."),r.createElement(c.Z,{className:"mb-16",component:"div"},"Actions must have a tab index of 0 so that they can be reached by keyboard-only users."))})}},25388:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Alert from '@material-ui/lab/Alert';\nimport Button from '@material-ui/core/Button';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: '100%',\n    '& > * + *': {\n      marginTop: theme.spacing(2),\n    },\n  },\n}));\n\nexport default function ActionAlerts() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>\n      <Alert\n        action={\n          <Button color=\"inherit\" size=\"small\">\n            UNDO\n          </Button>\n        }\n      >\n        This is a success alert — check it out!\n      </Alert>\n    </div>\n  );\n}\n"},26141:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Alert from '@material-ui/lab/Alert';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: '100%',\n    '& > * + *': {\n      marginTop: theme.spacing(2),\n    },\n  },\n}));\n\nexport default function ColorAlerts() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Alert severity=\"success\" color=\"info\">\n        This is a success alert — check it out!\n      </Alert>\n    </div>\n  );\n}\n"},79261:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport { Alert, AlertTitle } from '@material-ui/lab';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: '100%',\n    '& > * + *': {\n      marginTop: theme.spacing(2),\n    },\n  },\n}));\n\nexport default function DescriptionAlerts() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Alert severity=\"error\">\n        <AlertTitle>Error</AlertTitle>\n        This is an error alert — <strong>check it out!</strong>\n      </Alert>\n      <Alert severity=\"warning\">\n        <AlertTitle>Warning</AlertTitle>\n        This is a warning alert — <strong>check it out!</strong>\n      </Alert>\n      <Alert severity=\"info\">\n        <AlertTitle>Info</AlertTitle>\n        This is an info alert — <strong>check it out!</strong>\n      </Alert>\n      <Alert severity=\"success\">\n        <AlertTitle>Success</AlertTitle>\n        This is a success alert — <strong>check it out!</strong>\n      </Alert>\n    </div>\n  );\n}\n"},67714:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport Alert from \'@material-ui/lab/Alert\';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: \'100%\',\n    \'& > * + *\': {\n      marginTop: theme.spacing(2),\n    },\n  },\n}));\n\nexport default function SimpleAlerts() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Alert variant="filled" severity="error">\n        This is an error alert — check it out!\n      </Alert>\n      <Alert variant="filled" severity="warning">\n        This is a warning alert — check it out!\n      </Alert>\n      <Alert variant="filled" severity="info">\n        This is an info alert — check it out!\n      </Alert>\n      <Alert variant="filled" severity="success">\n        This is a success alert — check it out!\n      </Alert>\n    </div>\n  );\n}\n'},51771:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Alert from '@material-ui/lab/Alert';\nimport CheckIcon from '@material-ui/icons/Check';\nimport CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: '100%',\n    '& > * + *': {\n      marginTop: theme.spacing(2),\n    },\n  },\n}));\n\nexport default function IconAlerts() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Alert icon={<CheckIcon fontSize=\"inherit\" />} severity=\"success\">\n        This is a success alert — check it out!\n      </Alert>\n      <Alert iconMapping={{ success: <CheckCircleOutlineIcon fontSize=\"inherit\" /> }}>\n        This is a success alert — check it out!\n      </Alert>\n      <Alert icon={false} severity=\"success\">\n        This is a success alert — check it out!\n      </Alert>\n    </div>\n  );\n}\n"},98600:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport Alert from \'@material-ui/lab/Alert\';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: \'100%\',\n    \'& > * + *\': {\n      marginTop: theme.spacing(2),\n    },\n  },\n}));\n\nexport default function SimpleAlerts() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Alert variant="outlined" severity="error">\n        This is an error alert — check it out!\n      </Alert>\n      <Alert variant="outlined" severity="warning">\n        This is a warning alert — check it out!\n      </Alert>\n      <Alert variant="outlined" severity="info">\n        This is an info alert — check it out!\n      </Alert>\n      <Alert variant="outlined" severity="success">\n        This is a success alert — check it out!\n      </Alert>\n    </div>\n  );\n}\n'},60460:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Alert from '@material-ui/lab/Alert';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: '100%',\n    '& > * + *': {\n      marginTop: theme.spacing(2),\n    },\n  },\n}));\n\nexport default function SimpleAlerts() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <Alert severity=\"error\">This is an error alert — check it out!</Alert>\n      <Alert severity=\"warning\">This is a warning alert — check it out!</Alert>\n      <Alert severity=\"info\">This is an info alert — check it out!</Alert>\n      <Alert severity=\"success\">This is a success alert — check it out!</Alert>\n    </div>\n  );\n}\n"},72291:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport Alert from '@material-ui/lab/Alert';\nimport IconButton from '@material-ui/core/IconButton';\nimport Collapse from '@material-ui/core/Collapse';\nimport Button from '@material-ui/core/Button';\nimport CloseIcon from '@material-ui/icons/Close';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: '100%',\n    '& > * + *': {\n      marginTop: theme.spacing(2),\n    },\n  },\n}));\n\nexport default function TransitionAlerts() {\n  const classes = useStyles();\n  const [open, setOpen] = React.useState(true);\n\n  return (\n    <div className={classes.root}>\n      <Collapse in={open}>\n        <Alert\n          action={\n            <IconButton\n              aria-label=\"close\"\n              color=\"inherit\"\n              size=\"small\"\n              onClick={() => {\n                setOpen(false);\n              }}\n            >\n              <CloseIcon fontSize=\"inherit\" />\n            </IconButton>\n          }\n        >\n          Close me!\n        </Alert>\n      </Collapse>\n      <Button\n        disabled={open}\n        variant=\"outlined\"\n        onClick={() => {\n          setOpen(true);\n        }}\n      >\n        Re-open\n      </Button>\n    </div>\n  );\n}\n"}}]);