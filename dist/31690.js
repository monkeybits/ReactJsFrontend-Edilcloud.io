(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[31690],{96450:function(e,t,n){"use strict";var r=n(97439),i=n(78709),o=(n(16526),n(39863)),d=n(9665),l=n(17602);t.Z=function(e){var t=e.children,n=e.theme,a=(0,d.Z)();return e=i.useMemo(function(){var e,t,e=null===a?n:(e=a,"function"!=typeof(t=n)?(0,r.Z)((0,r.Z)({},e),t):t(e));return null!=e&&(e[l.Z]=null!==a),e},[n,a]),i.createElement(o.Z.Provider,{value:e},t)}},31690:function(e,t,n){"use strict";n.r(t);var a=n(56156),r=n.n(a),s=n(78709),i=n(32986),u=n(58913),c=n(27349),p=n(45781),a=n(40962),f=n(96450),h=n(68164),m=n(28344),b=(0,i.ZP)(function(){return n.e(13250).then(n.bind(n,13250))}),v=(0,i.ZP)(function(){return Promise.all([n.e(33395),n.e(64297),n.e(67978)]).then(n.bind(n,75503))}),o=260,g=(0,a.Z)(function(e){return{wrapper:r()({display:"flex",flexDirection:"column",zIndex:4},e.breakpoints.up("lg"),{width:o,minWidth:o}),wrapperFolded:r()({},e.breakpoints.up("lg"),{width:64,minWidth:64}),navbar:{display:"flex",overflow:"hidden",flexDirection:"column",flex:"1 1 auto",width:o,minWidth:o,height:"100%",zIndex:4,transition:e.transitions.create(["width","min-width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.shorter}),boxShadow:e.shadows[3]},left:{left:0},right:{right:0},folded:{position:"absolute",width:64,minWidth:64,top:0,bottom:0},foldedAndOpened:{width:o,minWidth:o},navbarContent:{flex:"1 1 auto"},foldedAndClosed:{"& $navbarContent":{"& .logo-icon":{width:32,height:32},"& .logo-text":{opacity:0},"& .react-badge":{opacity:0},"& .list-item-text, & .arrow-icon, & .item-badge":{opacity:0},"& .list-subheader .list-subheader-text":{opacity:0},"& .list-subheader:before":{content:'""',display:"block",position:"absolute",minWidth:16,borderTop:"2px solid",opacity:.2},"& .collapse-children":{display:"none"},"& .user":{"& .username, & .email":{opacity:0},"& .avatar":{width:40,height:40,top:32,padding:0}},"& .list-item.active":{marginLeft:12,width:40,padding:12,borderRadius:20,"&.square":{borderRadius:0,marginLeft:0,paddingLeft:24,width:"100%"}}}}}});function d(e){var t=(0,u.I0)(),n=(0,u.v9)(function(e){return e.fuse.settings.current.layout.config}),a=(0,u.v9)(function(e){return e.fuse.settings.navbarTheme}),r=(0,u.v9)(function(e){return e.fuse.navbar}),i=g(),o=n.navbar.folded,d=o&&!r.foldedOpen,l=o&&r.foldedOpen;return s.createElement(s.Fragment,null,s.createElement(f.Z,{theme:a},s.createElement("div",{id:"fuse-navbar",className:(0,m.Z)(i.wrapper,o&&i.wrapperFolded)},s.createElement(c.Z,{mdDown:!0},s.createElement("div",{className:(0,m.Z)(i.navbar,i[n.navbar.position],o&&i.folded,l&&i.foldedAndOpened,d&&i.foldedAndClosed),onMouseEnter:function(){return d&&t(h.tW())},onMouseLeave:function(){return l&&t(h.NU())},style:{backgroundColor:a.palette.background.default}},s.createElement(b,{className:i.navbarContent}))),s.createElement(c.Z,{lgUp:!0},s.createElement(p.ZP,{anchor:n.navbar.position,variant:"temporary",open:r.mobileOpen,classes:{paper:i.navbar},onClose:function(){return t(h.Tq())},ModalProps:{keepMounted:!0}},s.createElement(b,{className:i.navbarContent}))))),n.navbar.display&&!n.toolbar.display&&s.createElement(c.Z,{lgUp:!0},s.createElement(v,null)))}t.default=s.memo(d)}}]);