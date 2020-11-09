(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[151],{3446:function(e,t,a){"use strict";a.r(t);var n=a(8),c=a(131),i=a(171),r=a(237),s=a(170),l=a(892),m=a(893),o=a(71),u=a(0),p=a.n(u),f=["List Item 1","List Item 2","List Item 3","List Item 4","List Item 5","List Item 6","List Item 7","List Item 8","List Item 9","List Item 10","List Item 11","List Item 12","List Item 13","List Item 14","List Item 15"];t.default=function(){var e=Object(u.useState)(f),t=Object(n.a)(e,2),a=t[0],E=t[1],d=Object(u.useRef)();return Object(u.useEffect)((function(){return d.current=setInterval((function(){E(0!==a.length?[]:f)}),2e3),function(){clearInterval(d.current)}})),p.a.createElement(r.a,{header:p.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},p.a.createElement("div",{className:"flex flex-col"},p.a.createElement("div",{className:"flex items-center mb-16"},p.a.createElement(s.a,{className:"text-18",color:"action"},"home"),p.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),p.a.createElement(o.a,{color:"textSecondary"},"Documentation"),p.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),p.a.createElement(o.a,{color:"textSecondary"},"Fuse Components")),p.a.createElement(o.a,{variant:"h6"},"FuseAnimateGroup"))),content:p.a.createElement("div",{className:"p-24 max-w-2xl"},p.a.createElement(o.a,{className:"mb-16",component:"p"},p.a.createElement("code",null,"FuseAnimateGroup")," is a container component which uses",p.a.createElement("code",null,"VelocityTransitionGroup")," of ",p.a.createElement("code",null,"velocity-react"),"library. Delegates to the React TransitionGroup addon."),p.a.createElement(o.a,{className:"mt-32 mb-8",variant:"h5"},"Sample Usage"),p.a.createElement("div",{className:"flex flex-wrap p-48 items-start"},p.a.createElement("div",{className:"flex w-full sm:w-1/2 p-24 justify-center"},p.a.createElement(l.a,null,p.a.createElement(c.a,{enter:{animation:"transition.slideUpBigIn"},leave:{animation:"transition.slideUpBigOut"}},a.map((function(e,t){return p.a.createElement(m.a,{key:t},e)}))))),p.a.createElement("div",{className:"flex w-full sm:w-1/2 p-24 justify-center"},p.a.createElement(i.a,{component:"pre",className:"language-jsx"},'\n                                     <List>\n                                        <FuseAnimateGroup\n                                            enter={{\n                                                animation: "transition.slideUpBigIn"\n                                            }}\n                                            leave={{\n                                                animation: "transition.slideUpBigOut"\n                                            }}\n                                        >\n                                            {\n                                                list.map((item) => (\n                                                        <ListItem key={item}>\n                                                            {item}\n                                                        </ListItem>\n                                                    )\n                                                )\n                                            }\n                                        </FuseAnimateGroup>\n                                    </List>\n                                    '))),p.a.createElement(o.a,{className:"mb-16",component:"p"},"For more information checkout the",p.a.createElement("a",{href:"https://github.com/google-fabric/velocity-react",target:"_blank",rel:"noopener noreferrer",className:"ml-8 font-bold"},"velocity-react"),"."))})}}}]);