(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[69],{1893:function(e,n,a){"use strict";a.d(n,"a",(function(){return M}));var t=a(8),o=a(171),l=a(1819),i=a(1825),r=a(170),s=a(1886),c=a(1887),p=a(0),m=a.n(p),d=a(13),u=a(2),h=a(91),E=a(92),x=a(155),g=a(154),y=a(1807),f=a(894),b=a(1849),P=a(1876),v=a(7),S=a(589),N=a(590),T=a(1895),w=a.n(T),I=Object(y.a)({productionPrefix:"iframe-"}),D=function(e){Object(x.a)(a,e);var n=Object(g.a)(a);function a(){var e;Object(h.a)(this,a);for(var t=arguments.length,o=new Array(t),l=0;l<t;l++)o[l]=arguments[l];return(e=n.call.apply(n,[this].concat(o))).state={ready:!1},e.handleRef=function(n){e.contentDocument=n?n.node.contentDocument:null},e.onContentDidMount=function(){e.setState({ready:!0,jss:Object(S.a)(Object(u.a)(Object(u.a)({},Object(f.a)()),{},{plugins:[].concat(Object(d.a)(Object(f.a)().plugins),[Object(N.a)()]),insertionPoint:e.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:e.contentDocument.body})},e.onContentDidUpdate=function(){e.contentDocument.body.dir=e.props.theme.direction},e.renderHead=function(){return m.a.createElement(m.a.Fragment,null,m.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),m.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},e}return Object(E.a)(a,[{key:"render",value:function(){var e=this.props,n=e.children,a=e.classes,t=e.theme;return m.a.createElement(w.a,{head:this.renderHead(),ref:this.handleRef,className:a.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?m.a.createElement(b.b,{jss:this.state.jss,generateClassName:I,sheetsManager:this.state.sheetsManager},m.a.createElement(P.a,{theme:t},m.a.cloneElement(n,{container:this.state.container}))):null)}}]),a}(m.a.Component),C=Object(v.a)((function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}}),{withTheme:!0})(D);function k(e){var n=Object(p.useState)(e.currentTabIndex),a=Object(t.a)(n,2),d=a[0],u=a[1],h=e.component,E=e.raw,x=e.iframe,g=e.className;return m.a.createElement(i.a,{className:g},m.a.createElement(l.a,{position:"static",color:"default",elevation:0},m.a.createElement(c.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:d,onChange:function(e,n){u(n)}},h&&m.a.createElement(s.a,{classes:{root:"min-w-64"},icon:m.a.createElement(r.a,null,"remove_red_eye")}),E&&m.a.createElement(s.a,{classes:{root:"min-w-64"},icon:m.a.createElement(r.a,null,"code")}))),m.a.createElement("div",{className:"flex justify-center"},m.a.createElement("div",{className:0===d?"flex flex-1":"hidden"},h&&(x?m.a.createElement(C,null,m.a.createElement(h,null)):m.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},m.a.createElement(h,null)))),m.a.createElement("div",{className:1===d?"flex flex-1":"hidden"},E&&m.a.createElement("div",{className:"flex flex-1"},m.a.createElement(o.a,{component:"pre",className:"language-javascript w-full"},E.default)))))}k.defaultProps={currentTabIndex:0};var M=k},2814:function(e,n,a){"use strict";a.r(n),a.d(n,"default",(function(){return u}));var t=a(0),o=a.n(t),l=a(782),i=a(2154),r=a(2155),s=a(2156),c=a(71),p=a(445),m=a.n(p),d=Object(l.a)((function(e){return{root:{width:"100%"},heading:{fontSize:e.typography.pxToRem(15),fontWeight:e.typography.fontWeightRegular}}}));function u(){var e=d();return o.a.createElement("div",{className:e.root},o.a.createElement(i.a,null,o.a.createElement(r.a,{expandIcon:o.a.createElement(m.a,null),"aria-controls":"panel1a-content",id:"panel1a-header"},o.a.createElement(c.a,{className:e.heading},"Expansion Panel 1")),o.a.createElement(s.a,null,o.a.createElement(c.a,null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."))),o.a.createElement(i.a,null,o.a.createElement(r.a,{expandIcon:o.a.createElement(m.a,null),"aria-controls":"panel2a-content",id:"panel2a-header"},o.a.createElement(c.a,{className:e.heading},"Expansion Panel 2")),o.a.createElement(s.a,null,o.a.createElement(c.a,null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."))),o.a.createElement(i.a,{disabled:!0},o.a.createElement(r.a,{expandIcon:o.a.createElement(m.a,null),"aria-controls":"panel3a-content",id:"panel3a-header"},o.a.createElement(c.a,{className:e.heading},"Disabled Expansion Panel"))))}},2815:function(e,n,a){"use strict";a.r(n),n.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport ExpansionPanel from '@material-ui/core/ExpansionPanel';\nimport ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';\nimport ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';\nimport Typography from '@material-ui/core/Typography';\nimport ExpandMoreIcon from '@material-ui/icons/ExpandMore';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: '100%',\n  },\n  heading: {\n    fontSize: theme.typography.pxToRem(15),\n    fontWeight: theme.typography.fontWeightRegular,\n  },\n}));\n\nexport default function SimpleExpansionPanel() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <ExpansionPanel>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-controls=\"panel1a-content\"\n          id=\"panel1a-header\"\n        >\n          <Typography className={classes.heading}>Expansion Panel 1</Typography>\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,\n            sit amet blandit leo lobortis eget.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n      <ExpansionPanel>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-controls=\"panel2a-content\"\n          id=\"panel2a-header\"\n        >\n          <Typography className={classes.heading}>Expansion Panel 2</Typography>\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,\n            sit amet blandit leo lobortis eget.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n      <ExpansionPanel disabled>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-controls=\"panel3a-content\"\n          id=\"panel3a-header\"\n        >\n          <Typography className={classes.heading}>Disabled Expansion Panel</Typography>\n        </ExpansionPanelSummary>\n      </ExpansionPanel>\n    </div>\n  );\n}\n"},2816:function(e,n,a){"use strict";a.r(n),a.d(n,"default",(function(){return h}));var t=a(8),o=a(0),l=a.n(o),i=a(782),r=a(2154),s=a(2156),c=a(2155),p=a(71),m=a(445),d=a.n(m),u=Object(i.a)((function(e){return{root:{width:"100%"},heading:{fontSize:e.typography.pxToRem(15),flexBasis:"33.33%",flexShrink:0},secondaryHeading:{fontSize:e.typography.pxToRem(15),color:e.palette.text.secondary}}}));function h(){var e=u(),n=l.a.useState(!1),a=Object(t.a)(n,2),o=a[0],i=a[1],m=function(e){return function(n,a){i(!!a&&e)}};return l.a.createElement("div",{className:e.root},l.a.createElement(r.a,{expanded:"panel1"===o,onChange:m("panel1")},l.a.createElement(c.a,{expandIcon:l.a.createElement(d.a,null),"aria-controls":"panel1bh-content",id:"panel1bh-header"},l.a.createElement(p.a,{className:e.heading},"General settings"),l.a.createElement(p.a,{className:e.secondaryHeading},"I am an expansion panel")),l.a.createElement(s.a,null,l.a.createElement(p.a,null,"Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam."))),l.a.createElement(r.a,{expanded:"panel2"===o,onChange:m("panel2")},l.a.createElement(c.a,{expandIcon:l.a.createElement(d.a,null),"aria-controls":"panel2bh-content",id:"panel2bh-header"},l.a.createElement(p.a,{className:e.heading},"Users"),l.a.createElement(p.a,{className:e.secondaryHeading},"You are currently not an owner")),l.a.createElement(s.a,null,l.a.createElement(p.a,null,"Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet."))),l.a.createElement(r.a,{expanded:"panel3"===o,onChange:m("panel3")},l.a.createElement(c.a,{expandIcon:l.a.createElement(d.a,null),"aria-controls":"panel3bh-content",id:"panel3bh-header"},l.a.createElement(p.a,{className:e.heading},"Advanced settings"),l.a.createElement(p.a,{className:e.secondaryHeading},"Filtering has been entirely disabled for whole web server")),l.a.createElement(s.a,null,l.a.createElement(p.a,null,"Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue."))),l.a.createElement(r.a,{expanded:"panel4"===o,onChange:m("panel4")},l.a.createElement(c.a,{expandIcon:l.a.createElement(d.a,null),"aria-controls":"panel4bh-content",id:"panel4bh-header"},l.a.createElement(p.a,{className:e.heading},"Personal data")),l.a.createElement(s.a,null,l.a.createElement(p.a,null,"Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue."))))}},2817:function(e,n,a){"use strict";a.r(n),n.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport ExpansionPanel from '@material-ui/core/ExpansionPanel';\nimport ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';\nimport ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';\nimport Typography from '@material-ui/core/Typography';\nimport ExpandMoreIcon from '@material-ui/icons/ExpandMore';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: '100%',\n  },\n  heading: {\n    fontSize: theme.typography.pxToRem(15),\n    flexBasis: '33.33%',\n    flexShrink: 0,\n  },\n  secondaryHeading: {\n    fontSize: theme.typography.pxToRem(15),\n    color: theme.palette.text.secondary,\n  },\n}));\n\nexport default function ControlledExpansionPanels() {\n  const classes = useStyles();\n  const [expanded, setExpanded] = React.useState(false);\n\n  const handleChange = (panel) => (event, isExpanded) => {\n    setExpanded(isExpanded ? panel : false);\n  };\n\n  return (\n    <div className={classes.root}>\n      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-controls=\"panel1bh-content\"\n          id=\"panel1bh-header\"\n        >\n          <Typography className={classes.heading}>General settings</Typography>\n          <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography>\n            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget\n            maximus est, id dignissim quam.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-controls=\"panel2bh-content\"\n          id=\"panel2bh-header\"\n        >\n          <Typography className={classes.heading}>Users</Typography>\n          <Typography className={classes.secondaryHeading}>\n            You are currently not an owner\n          </Typography>\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography>\n            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar\n            diam eros in elit. Pellentesque convallis laoreet laoreet.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n      <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-controls=\"panel3bh-content\"\n          id=\"panel3bh-header\"\n        >\n          <Typography className={classes.heading}>Advanced settings</Typography>\n          <Typography className={classes.secondaryHeading}>\n            Filtering has been entirely disabled for whole web server\n          </Typography>\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography>\n            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,\n            vitae egestas augue. Duis vel est augue.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-controls=\"panel4bh-content\"\n          id=\"panel4bh-header\"\n        >\n          <Typography className={classes.heading}>Personal data</Typography>\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography>\n            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,\n            vitae egestas augue. Duis vel est augue.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n    </div>\n  );\n}\n"},2818:function(e,n,a){"use strict";a.r(n),a.d(n,"default",(function(){return h}));var t=a(8),o=a(0),l=a.n(o),i=a(7),r=a(2154),s=a(2155),c=a(2156),p=a(71),m=Object(i.a)({root:{border:"1px solid rgba(0, 0, 0, .125)",boxShadow:"none","&:not(:last-child)":{borderBottom:0},"&:before":{display:"none"},"&$expanded":{margin:"auto"}},expanded:{}})(r.a),d=Object(i.a)({root:{backgroundColor:"rgba(0, 0, 0, .03)",borderBottom:"1px solid rgba(0, 0, 0, .125)",marginBottom:-1,minHeight:56,"&$expanded":{minHeight:56}},content:{"&$expanded":{margin:"12px 0"}},expanded:{}})(s.a),u=Object(i.a)((function(e){return{root:{padding:e.spacing(2)}}}))(c.a);function h(){var e=l.a.useState("panel1"),n=Object(t.a)(e,2),a=n[0],o=n[1],i=function(e){return function(n,a){o(!!a&&e)}};return l.a.createElement("div",null,l.a.createElement(m,{square:!0,expanded:"panel1"===a,onChange:i("panel1")},l.a.createElement(d,{"aria-controls":"panel1d-content",id:"panel1d-header"},l.a.createElement(p.a,null,"Collapsible Group Item #1")),l.a.createElement(u,null,l.a.createElement(p.a,null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."))),l.a.createElement(m,{square:!0,expanded:"panel2"===a,onChange:i("panel2")},l.a.createElement(d,{"aria-controls":"panel2d-content",id:"panel2d-header"},l.a.createElement(p.a,null,"Collapsible Group Item #2")),l.a.createElement(u,null,l.a.createElement(p.a,null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."))),l.a.createElement(m,{square:!0,expanded:"panel3"===a,onChange:i("panel3")},l.a.createElement(d,{"aria-controls":"panel3d-content",id:"panel3d-header"},l.a.createElement(p.a,null,"Collapsible Group Item #3")),l.a.createElement(u,null,l.a.createElement(p.a,null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."))))}},2819:function(e,n,a){"use strict";a.r(n),n.default="import React from 'react';\nimport { withStyles } from '@material-ui/core/styles';\nimport MuiExpansionPanel from '@material-ui/core/ExpansionPanel';\nimport MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';\nimport MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';\nimport Typography from '@material-ui/core/Typography';\n\nconst ExpansionPanel = withStyles({\n  root: {\n    border: '1px solid rgba(0, 0, 0, .125)',\n    boxShadow: 'none',\n    '&:not(:last-child)': {\n      borderBottom: 0,\n    },\n    '&:before': {\n      display: 'none',\n    },\n    '&$expanded': {\n      margin: 'auto',\n    },\n  },\n  expanded: {},\n})(MuiExpansionPanel);\n\nconst ExpansionPanelSummary = withStyles({\n  root: {\n    backgroundColor: 'rgba(0, 0, 0, .03)',\n    borderBottom: '1px solid rgba(0, 0, 0, .125)',\n    marginBottom: -1,\n    minHeight: 56,\n    '&$expanded': {\n      minHeight: 56,\n    },\n  },\n  content: {\n    '&$expanded': {\n      margin: '12px 0',\n    },\n  },\n  expanded: {},\n})(MuiExpansionPanelSummary);\n\nconst ExpansionPanelDetails = withStyles((theme) => ({\n  root: {\n    padding: theme.spacing(2),\n  },\n}))(MuiExpansionPanelDetails);\n\nexport default function CustomizedExpansionPanels() {\n  const [expanded, setExpanded] = React.useState('panel1');\n\n  const handleChange = (panel) => (event, newExpanded) => {\n    setExpanded(newExpanded ? panel : false);\n  };\n\n  return (\n    <div>\n      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>\n        <ExpansionPanelSummary aria-controls=\"panel1d-content\" id=\"panel1d-header\">\n          <Typography>Collapsible Group Item #1</Typography>\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,\n            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing\n            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>\n        <ExpansionPanelSummary aria-controls=\"panel2d-content\" id=\"panel2d-header\">\n          <Typography>Collapsible Group Item #2</Typography>\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,\n            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing\n            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n      <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>\n        <ExpansionPanelSummary aria-controls=\"panel3d-content\" id=\"panel3d-header\">\n          <Typography>Collapsible Group Item #3</Typography>\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,\n            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing\n            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n    </div>\n  );\n}\n"},2820:function(e,n,a){"use strict";a.r(n),a.d(n,"default",(function(){return E}));var t=a(0),o=a.n(t),l=a(782),i=a(2154),r=a(2155),s=a(2156),c=a(1867),p=a(1863),m=a(71),d=a(445),u=a.n(d),h=Object(l.a)({root:{width:"100%"}});function E(){var e=h();return o.a.createElement("div",{className:e.root},o.a.createElement(i.a,null,o.a.createElement(r.a,{expandIcon:o.a.createElement(u.a,null),"aria-label":"Expand","aria-controls":"additional-actions1-content",id:"additional-actions1-header"},o.a.createElement(p.a,{"aria-label":"Acknowledge",onClick:function(e){return e.stopPropagation()},onFocus:function(e){return e.stopPropagation()},control:o.a.createElement(c.a,null),label:"I acknowledge that I should stop the click event propagation"})),o.a.createElement(s.a,null,o.a.createElement(m.a,{color:"textSecondary"},"The click event of the nested action will propagate up and expand the panel unless you explicitly stop it."))),o.a.createElement(i.a,null,o.a.createElement(r.a,{expandIcon:o.a.createElement(u.a,null),"aria-label":"Expand","aria-controls":"additional-actions2-content",id:"additional-actions2-header"},o.a.createElement(p.a,{"aria-label":"Acknowledge",onClick:function(e){return e.stopPropagation()},onFocus:function(e){return e.stopPropagation()},control:o.a.createElement(c.a,null),label:"I acknowledge that I should stop the focus event propagation"})),o.a.createElement(s.a,null,o.a.createElement(m.a,{color:"textSecondary"},"The focus event of the nested action will propagate up and also focus the expansion panel unless you explicitly stop it."))),o.a.createElement(i.a,null,o.a.createElement(r.a,{expandIcon:o.a.createElement(u.a,null),"aria-label":"Expand","aria-controls":"additional-actions3-content",id:"additional-actions3-header"},o.a.createElement(p.a,{"aria-label":"Acknowledge",onClick:function(e){return e.stopPropagation()},onFocus:function(e){return e.stopPropagation()},control:o.a.createElement(c.a,null),label:"I acknowledge that I should provide an aria-label on each action that I add"})),o.a.createElement(s.a,null,o.a.createElement(m.a,{color:"textSecondary"},"If you forget to put an aria-label on the nested action, the label of the action will also be included in the label of the parent button that controls the panel expansion."))))}},2821:function(e,n,a){"use strict";a.r(n),n.default='import React from \'react\';\nimport { makeStyles } from \'@material-ui/core/styles\';\nimport ExpansionPanel from \'@material-ui/core/ExpansionPanel\';\nimport ExpansionPanelSummary from \'@material-ui/core/ExpansionPanelSummary\';\nimport ExpansionPanelDetails from \'@material-ui/core/ExpansionPanelDetails\';\nimport Checkbox from \'@material-ui/core/Checkbox\';\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\nimport Typography from \'@material-ui/core/Typography\';\nimport ExpandMoreIcon from \'@material-ui/icons/ExpandMore\';\n\nconst useStyles = makeStyles({\n  root: {\n    width: \'100%\',\n  },\n});\n\nexport default function ActionsInExpansionPanelSummary() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <ExpansionPanel>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-label="Expand"\n          aria-controls="additional-actions1-content"\n          id="additional-actions1-header"\n        >\n          <FormControlLabel\n            aria-label="Acknowledge"\n            onClick={(event) => event.stopPropagation()}\n            onFocus={(event) => event.stopPropagation()}\n            control={<Checkbox />}\n            label="I acknowledge that I should stop the click event propagation"\n          />\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography color="textSecondary">\n            The click event of the nested action will propagate up and expand the panel unless you\n            explicitly stop it.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n      <ExpansionPanel>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-label="Expand"\n          aria-controls="additional-actions2-content"\n          id="additional-actions2-header"\n        >\n          <FormControlLabel\n            aria-label="Acknowledge"\n            onClick={(event) => event.stopPropagation()}\n            onFocus={(event) => event.stopPropagation()}\n            control={<Checkbox />}\n            label="I acknowledge that I should stop the focus event propagation"\n          />\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography color="textSecondary">\n            The focus event of the nested action will propagate up and also focus the expansion\n            panel unless you explicitly stop it.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n      <ExpansionPanel>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-label="Expand"\n          aria-controls="additional-actions3-content"\n          id="additional-actions3-header"\n        >\n          <FormControlLabel\n            aria-label="Acknowledge"\n            onClick={(event) => event.stopPropagation()}\n            onFocus={(event) => event.stopPropagation()}\n            control={<Checkbox />}\n            label="I acknowledge that I should provide an aria-label on each action that I add"\n          />\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails>\n          <Typography color="textSecondary">\n            If you forget to put an aria-label on the nested action, the label of the action will\n            also be included in the label of the parent button that controls the panel expansion.\n          </Typography>\n        </ExpansionPanelDetails>\n      </ExpansionPanel>\n    </div>\n  );\n}\n'},2822:function(e,n,a){"use strict";a.r(n),a.d(n,"default",(function(){return y}));var t=a(0),o=a.n(t),l=a(782),i=a(11),r=a(2154),s=a(2156),c=a(2155),p=a(2823),m=a(71),d=a(445),u=a.n(d),h=a(1869),E=a(143),x=a(1879),g=Object(l.a)((function(e){return{root:{width:"100%"},heading:{fontSize:e.typography.pxToRem(15)},secondaryHeading:{fontSize:e.typography.pxToRem(15),color:e.palette.text.secondary},icon:{verticalAlign:"bottom",height:20,width:20},details:{alignItems:"center"},column:{flexBasis:"33.33%"},helper:{borderLeft:"2px solid ".concat(e.palette.divider),padding:e.spacing(1,2)},link:{color:e.palette.primary.main,textDecoration:"none","&:hover":{textDecoration:"underline"}}}}));function y(){var e=g();return o.a.createElement("div",{className:e.root},o.a.createElement(r.a,{defaultExpanded:!0},o.a.createElement(c.a,{expandIcon:o.a.createElement(u.a,null),"aria-controls":"panel1c-content",id:"panel1c-header"},o.a.createElement("div",{className:e.column},o.a.createElement(m.a,{className:e.heading},"Location")),o.a.createElement("div",{className:e.column},o.a.createElement(m.a,{className:e.secondaryHeading},"Select trip destination"))),o.a.createElement(s.a,{className:e.details},o.a.createElement("div",{className:e.column}),o.a.createElement("div",{className:e.column},o.a.createElement(h.a,{label:"Barbados",onDelete:function(){}})),o.a.createElement("div",{className:Object(i.a)(e.column,e.helper)},o.a.createElement(m.a,{variant:"caption"},"Select your destination of choice",o.a.createElement("br",null),o.a.createElement("a",{href:"#secondary-heading-and-columns",className:e.link},"Learn more")))),o.a.createElement(x.a,null),o.a.createElement(p.a,null,o.a.createElement(E.a,{size:"small"},"Cancel"),o.a.createElement(E.a,{size:"small",color:"primary"},"Save"))))}},2824:function(e,n,a){"use strict";a.r(n),n.default="import React from 'react';\nimport { makeStyles } from '@material-ui/core/styles';\nimport clsx from 'clsx';\nimport ExpansionPanel from '@material-ui/core/ExpansionPanel';\nimport ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';\nimport ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';\nimport ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';\nimport Typography from '@material-ui/core/Typography';\nimport ExpandMoreIcon from '@material-ui/icons/ExpandMore';\nimport Chip from '@material-ui/core/Chip';\nimport Button from '@material-ui/core/Button';\nimport Divider from '@material-ui/core/Divider';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    width: '100%',\n  },\n  heading: {\n    fontSize: theme.typography.pxToRem(15),\n  },\n  secondaryHeading: {\n    fontSize: theme.typography.pxToRem(15),\n    color: theme.palette.text.secondary,\n  },\n  icon: {\n    verticalAlign: 'bottom',\n    height: 20,\n    width: 20,\n  },\n  details: {\n    alignItems: 'center',\n  },\n  column: {\n    flexBasis: '33.33%',\n  },\n  helper: {\n    borderLeft: `2px solid ${theme.palette.divider}`,\n    padding: theme.spacing(1, 2),\n  },\n  link: {\n    color: theme.palette.primary.main,\n    textDecoration: 'none',\n    '&:hover': {\n      textDecoration: 'underline',\n    },\n  },\n}));\n\nexport default function DetailedExpansionPanel() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <ExpansionPanel defaultExpanded>\n        <ExpansionPanelSummary\n          expandIcon={<ExpandMoreIcon />}\n          aria-controls=\"panel1c-content\"\n          id=\"panel1c-header\"\n        >\n          <div className={classes.column}>\n            <Typography className={classes.heading}>Location</Typography>\n          </div>\n          <div className={classes.column}>\n            <Typography className={classes.secondaryHeading}>Select trip destination</Typography>\n          </div>\n        </ExpansionPanelSummary>\n        <ExpansionPanelDetails className={classes.details}>\n          <div className={classes.column} />\n          <div className={classes.column}>\n            <Chip label=\"Barbados\" onDelete={() => {}} />\n          </div>\n          <div className={clsx(classes.column, classes.helper)}>\n            <Typography variant=\"caption\">\n              Select your destination of choice\n              <br />\n              <a href=\"#secondary-heading-and-columns\" className={classes.link}>\n                Learn more\n              </a>\n            </Typography>\n          </div>\n        </ExpansionPanelDetails>\n        <Divider />\n        <ExpansionPanelActions>\n          <Button size=\"small\">Cancel</Button>\n          <Button size=\"small\" color=\"primary\">\n            Save\n          </Button>\n        </ExpansionPanelActions>\n      </ExpansionPanel>\n    </div>\n  );\n}\n"},3470:function(e,n,a){"use strict";a.r(n);var t=a(0),o=a.n(t),l=a(1893),i=a(171),r=a(237),s=a(143),c=a(170),p=a(71),m=a(782),d=Object(m.a)((function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}}));n.default=function(e){var n=d();return o.a.createElement(r.a,{classes:{root:n.layoutRoot},header:o.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},o.a.createElement("div",{className:"flex flex-col"},o.a.createElement("div",{className:"flex items-center mb-16"},o.a.createElement(c.a,{className:"text-18",color:"action"},"home"),o.a.createElement(c.a,{className:"text-16",color:"action"},"chevron_right"),o.a.createElement(p.a,{color:"textSecondary"},"Documentation"),o.a.createElement(c.a,{className:"text-16",color:"action"},"chevron_right"),o.a.createElement(p.a,{color:"textSecondary"},"Material UI Components")),o.a.createElement(p.a,{variant:"h6"},"Expansion Panel")),o.a.createElement(s.a,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/expansion-panels",target:"_blank",role:"button"},o.a.createElement(c.a,null,"link"),o.a.createElement("span",{className:"mx-4"},"Reference"))),content:o.a.createElement("div",{className:"p-24 max-w-2xl"},o.a.createElement(p.a,{className:"text-44 mt-32 mb-8",component:"h1"},"Expansion Panel"),o.a.createElement(p.a,{className:"description"},"Expansion panels contain creation flows and allow lightweight editing of an element."),o.a.createElement(p.a,{className:"mb-16",component:"div"},o.a.createElement("a",{href:"https://material.io/archive/guidelines/components/expansion-panels.html"},"An expansion panel")," is a lightweight container that may either stand alone or be connected to a larger surface, such as a card."),o.a.createElement("blockquote",null,o.a.createElement(p.a,{className:"mb-16",component:"div"},o.a.createElement("strong",null,"Note:")," Expansion panels are no longer documented in the ",o.a.createElement("a",{href:"https://material.io/"},"Material Design guidelines"),", but Material-UI will continue to support them.")),o.a.createElement(p.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Simple Expansion Panel"),o.a.createElement(p.a,{className:"mb-16",component:"div"},o.a.createElement(l.a,{className:"my-24",iframe:!1,component:a(2814).default,raw:a(2815)})),o.a.createElement(p.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Controlled Accordion"),o.a.createElement(p.a,{className:"mb-16",component:"div"},"Extend the default panel behavior to create an accordion with the ",o.a.createElement("code",null,"ExpansionPanel")," component."),o.a.createElement(p.a,{className:"mb-16",component:"div"},o.a.createElement(l.a,{className:"my-24",iframe:!1,component:a(2816).default,raw:a(2817)})),o.a.createElement(p.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Customized expansion panels"),o.a.createElement(p.a,{className:"mb-16",component:"div"},"Here is an example of customizing the component. You can learn more about this in the",o.a.createElement("a",{href:"/customization/components/"},"overrides documentation page"),"."),o.a.createElement(p.a,{className:"mb-16",component:"div"},o.a.createElement(l.a,{className:"my-24",iframe:!1,component:a(2818).default,raw:a(2819)})),o.a.createElement(p.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Additional actions"),o.a.createElement(p.a,{className:"mb-16",component:"div"},"In order to put an action such as a ",o.a.createElement("code",null,"Checkbox")," or a button inside of the ",o.a.createElement("code",null,"ExpansionPanelSummary"),", you need to stop the propagation of the focus and click events to prevent the panel from expanding/collapsing when using the action. You should also provide an ",o.a.createElement("code",null,"aria-label")," for the action, otherwise the label of the nested action will be included in the label of the parent button that controls the panel expansion."),o.a.createElement(p.a,{className:"mb-16",component:"div"},o.a.createElement(l.a,{className:"my-24",iframe:!1,component:a(2820).default,raw:a(2821)})),o.a.createElement(p.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Performance"),o.a.createElement(p.a,{className:"mb-16",component:"div"},"The content of ExpansionPanels is mounted by default even if the panel is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the",o.a.createElement("code",null,"unmountOnExit")," in ",o.a.createElement("code",null,"TransitionProps"),":"),o.a.createElement(i.a,{component:"pre",className:"language-jsx"}," \n<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />\n"),o.a.createElement(p.a,{className:"mb-16",component:"div"},"As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies."),o.a.createElement(p.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Secondary heading and Columns"),o.a.createElement(p.a,{className:"mb-16",component:"div"},"Multiple columns can be used to structure the content, and a helper text may be added to the panel to assist the user."),o.a.createElement(p.a,{className:"mb-16",component:"div"},o.a.createElement(l.a,{className:"my-24",iframe:!1,component:a(2822).default,raw:a(2824)})),o.a.createElement(p.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Accessibility"),o.a.createElement(p.a,{className:"mb-16",component:"div"},"(WAI-ARIA: ",o.a.createElement("a",{href:"https://www.w3.org/TR/wai-aria-practices/#accordion"},"https://www.w3.org/TR/wai-aria-practices/#accordion"),")"),o.a.createElement(p.a,{className:"mb-16",component:"div"},"For optimal accessibility we recommend setting ",o.a.createElement("code",null,"id")," and ",o.a.createElement("code",null,"aria-controls")," on the",o.a.createElement("code",null,"ExpansionPanelSummary"),". The ",o.a.createElement("code",null,"ExpansionPanel")," will derive the necessary ",o.a.createElement("code",null,"aria-labelledby"),"and ",o.a.createElement("code",null,"id")," for the content region of the panel."))})}}}]);