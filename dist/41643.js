(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[41643],{41643:function(e,t,n){"use strict";n.r(t);var a=n(61432),p=n.n(a),Z=n(35923),a=n(32986),v=n(70888),h=n(82186),k=n(92571),C=n(48258),b=n(96282),w=n(92466),N=n(41713),x=n(73772),_=n(88325),g=n(78709),y=n(58913),F=n(89673),P=(0,a.ZP)(function(){return Promise.all([n.e(10930),n.e(25872)]).then(n.bind(n,73430))});t.default=function(t){var n=(0,y.I0)(),a=(0,y.v9)(function(e){return e.scrumboardApp.board}),e=(0,g.useState)(null),l=(s=p()(e,2))[0],r=s[1],e=(0,g.useState)(!1),i=(s=p()(e,2))[0],c=s[1],m=(e=(0,Z.cI)({title:t.list.name})).form,s=e.handleChange,u=e.resetForm,o=e.setForm;function f(){c(!0)}function E(){c(!1)}function d(){return""!==m.title}return(0,g.useEffect)(function(){i||u()},[i,u]),(0,g.useEffect)(function(){i&&l&&r(null)},[l,i]),(0,g.useEffect)(function(){o({title:t.list.name})},[t.list.name,o]),g.createElement("div",t.handleProps,g.createElement("div",{className:"flex items-center justify-between h-64 px-8"},g.createElement("div",{className:"flex items-center min-w-0 px-12"},i?g.createElement(v.Z,{onClickAway:E},g.createElement("form",{className:"flex w-full",onSubmit:function(e){e.preventDefault(),d()&&(n(F.Rr(a.id,t.list.id,m.title)),E())}},g.createElement(h.Z,{name:"title",value:m.title,onChange:s,variant:"outlined",margin:"none",autoFocus:!0,InputProps:{endAdornment:g.createElement(k.Z,{position:"end"},g.createElement(C.Z,{type:"submit",disabled:!d()},g.createElement(b.Z,null,"check")))}}))):g.createElement(w.Z,{className:"text-16 font-600 cursor-pointer",onClick:f},t.list.name)),g.createElement("div",{className:""},g.createElement(P,{icon:g.createElement(g.Fragment,null,g.createElement(C.Z,{"aria-owns":l?"actions-menu":null,"aria-haspopup":"true",onClick:function(e){r(e.currentTarget)},variant:"outlined",size:"small"},g.createElement(b.Z,{className:"text-20"},"more_vert"))),outsideClick:!0},g.createElement(N.Z,{onClick:function(){n(F.J_(a.id,t.list.id))}},g.createElement(x.Z,{className:"min-w-40"},g.createElement(b.Z,null,"delete")),g.createElement(_.Z,{primary:"Remove List"})),g.createElement(N.Z,{onClick:f},g.createElement(x.Z,{className:"min-w-40"},g.createElement(b.Z,null,"edit")),g.createElement(_.Z,{primary:"Rename List"}))))))}}}]);