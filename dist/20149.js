(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[20149],{25957:function(n,t,r){"use strict";r.d(t,{tq:function(){return a},Mp:function(){return h},$g:function(){return O},MY:function(){return y},p5:function(){return R},ci:function(){return e},pF:function(){return s},Hz:function(){return f},Fs:function(){return p},oi:function(){return c},XM:function(){return d},MH:function(){return P},ZH:function(){return B},x_:function(){return E},i8:function(){return D},TF:function(){return A},iS:function(){return U},Kx:function(){return j},Jm:function(){return l},fQ:function(){return I},a9:function(){return T},L0:function(){return F},qi:function(){return C},bE:function(){return L},xh:function(){return S},wP:function(){return m},WY:function(){return v},MJ:function(){return G},iD:function(){return g},bZ:function(){return b},ic:function(){return Z},Pr:function(){return N},Qc:function(){return M},iM:function(){return w},H$:function(){return k}});r(31806);var o=r(88572),u=r(11208),i=r(3089),e="[FILE MANAGER APP] GET ALL FILES",a="[FILE MANAGER APP] DELETE FILE",c="[FILE MANAGER APP] GET PHOTOS",d="[FILE MANAGER APP] GET VIDEOS",s="[FILE MANAGER APP] GET DOCUMENTS",f="[FILE MANAGER APP] GET FOLDERS",p="[FILE MANAGER APP] GET FOLDERS PATHS",l="[FILE MANAGER APP] UPDATE SPECIFIC FOLDER",A="[FILE MANAGER APP] SET SEARCH TEXT",P="[FILE MANAGER APP] HANDLE UPLOAD LOADING",E="[FILE MANAGER APP] RESET FILES",O="[FILE MANAGER APP] FILE MOVE OPEN DIALOG",h="[FILE MANAGER APP] FILE MOVE CLOSE DIALOG",R="[FILE MANAGER APP] FILE RENAME OPEN DIALOG",y="[FILE MANAGER APP] FILE RENAME CLOSE DIALOG",D="[FILE MANAGER APP] SET FOLDER PATH";function b(n){return{type:R,payload:n}}function g(n){return{type:O,payload:n}}function I(){return{type:h}}function L(r){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){return""};return function(n,t){n(m(r,e)),n(v(r,e)),n(C(r,e)),n(S(r,e)),n(F(r,e))}}function m(r){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){return""};return e({loadingPhotos:!0}),function(t,n){(0,o.k)((0,u.Nx)(r),{},function(n){e({loadingPhotos:!1}),t({type:c,payload:n})},function(n){e({loadingPhotos:!1})},o.Y.GET,(0,i.XW)())}}function v(r){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){return""};return e({loadingVideos:!0}),function(t,n){(0,o.k)((0,u.k4)(r),{},function(n){e({loadingVideos:!1}),t({type:d,payload:n})},function(n){e({loadingVideos:!1})},o.Y.GET,(0,i.XW)())}}function C(r){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){return""};return function(t,n){e({loadingDocuments:!0}),(0,o.k)((0,u.zn)(r),{},function(n){e({loadingDocuments:!1}),t({type:s,payload:n})},function(n){e({loadingDocuments:!1})},o.Y.GET,(0,i.XW)())}}function S(r){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){return""};return e({loadingFolders:!0}),function(t,n){(0,o.k)((0,u.UN)(r),{},function(n){e({loadingFolders:!1}),t({type:f,payload:n})},function(n){e({loadingFolders:!1})},o.Y.GET,(0,i.XW)())}}function M(n,t){return{type:D,payload:n,currentFiles:t}}function T(n){var r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:function(){return""};return e({loadingFolders:!0}),function(t,n){n=n().fileManagerApp.files.folderPath,n=n[n.length-1];n&&(0,o.k)((0,u.cX)(n.mainId||n.id),{},function(n){e({loadingFolders:!1}),t({type:l,payload:n,updatedFolderValues:r})},function(n){e({loadingFolders:!1})},o.Y.GET,(0,i.XW)())}}function F(r){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){return""};return e({loadingFolders:!0}),function(t,n){(0,o.k)((0,u.Ou)(r),{},function(n){e({loadingFolders:!1}),t({type:p,payload:n})},function(n){e({loadingFolders:!1})},o.Y.GET,(0,i.XW)())}}function G(n){return{type:P,payload:n}}function N(n){return{type:e,payload:n}}var U="[FILE MANAGER APP] SET SELECTED ITEM",B="[FILE MANAGER APP] POP FOLDER PATH",j="[FILE MANAGER APP] UPDATE FOLDER PATH";function w(n){return{type:U,payload:n}}function k(n){return{type:j,payload:n}}function Z(n){return{type:B,payload:n}}},89673:function(n,t,r){"use strict";r.d(t,{py:function(){return S},Ek:function(){return T},BQ:function(){return M},gN:function(){return L},j6:function(){return $},Q3:function(){return U},TU:function(){return b},gA:function(){return D},rQ:function(){return p},F$:function(){return A},Pg:function(){return J},z5:function(){return N},yn:function(){return C},kX:function(){return v},fj:function(){return nn},qB:function(){return G},QM:function(){return I},Nu:function(){return F},Zf:function(){return m},A:function(){return l},eh:function(){return K},jc:function(){return X},xn:function(){return z},T2:function(){return rn},qZ:function(){return Y},hr:function(){return _},L1:function(){return W},SZ:function(){return B},r5:function(){return E},mS:function(){return Z},Bl:function(){return H},V:function(){return tn},lk:function(){return Q},yJ:function(){return on},J_:function(){return x},vJ:function(){return q},Rr:function(){return V},aO:function(){return k},aD:function(){return w},iH:function(){return j},L9:function(){return P},OV:function(){return en}});var e=r(49073),o=r(35970),a=r(65129),u=r(80282),t=r(31806),i=r.n(t),t=r(82853),c=r.n(t),d=function n(t){c()(this,n);t=t||{};this.id=t.id||e.Z.generateGUID(),this.name=t.name||"",this.description=t.description||"",this.idAttachmentCover=t.idAttachmentCover||"",this.idMembers=t.idMembers||[],this.idLabels=t.idLabels||[],this.attachments=t.attachments||[],this.subscribed=t.subscribed||!0,this.checklists=t.checklists||[],this.checkItems=t.checkItems||0,this.checkItemsChecked=t.checkItemsChecked||0,this.comments=t.comments||[],this.activities=t.activities||[],this.due=t.due||""},s=function n(t){c()(this,n);t=t||{};this.id=t.id||e.Z.generateGUID(),this.name=t.name||"",this.idCards=[]},f=r(25957),p="[SCRUMBOARD APP] GET BOARDS",l="[SCRUMBOARD APP] RESET BOARDS",A="[SCRUMBOARD APP] NEW BOARD";function P(n){return{type:f.x_}}function E(n){return function(n){o.Z.push({pathname:"/create-company"})}}function O(n,t,r){return n=Array.from(n),t=n.splice(t,1),t=h()(t,1)[0],n.splice(r,0,t),n}var t=r(61432),h=r.n(t),R=O,y=function(n,t,r){var e=a.Z.find(n,{id:t.droppableId}),o=a.Z.find(n,{id:r.droppableId}),u=e.idCards[t.index];if(t.droppableId!==r.droppableId)return e.idCards.splice(t.index,1),o.idCards.splice(r.index,0,u),n.map(function(n){return n.id===t.droppableId?e:n.id===r.droppableId?o:n});var i=O(e.idCards,t.index,r.index);return n.map(function(n){return n.id===t.droppableId&&(n.idCards=i),n})},D="[SCRUMBOARD APP] GET BOARD",b="[SCRUMBOARD APP] DELETE BOARD",g="[SCRUMBOARD APP] COPY BOARD",I="[SCRUMBOARD APP] RENAME BOARD",L="[SCRUMBOARD APP] CHANGE BOARD SETTINGS",m="[SCRUMBOARD APP] RESET BOARD",v="[SCRUMBOARD APP] ORDER LIST",C="[SCRUMBOARD APP] ORDER CARD",S="[SCRUMBOARD APP] ADD CARD",M="[SCRUMBOARD APP] ADD LIST",T="[SCRUMBOARD APP] ADD LABEL",F="[SCRUMBOARD APP] RENAME LIST",G="[SCRUMBOARD APP] REMOVE LIST",N="[SCRUMBOARD APP] OPEN UPGRADE PLAN DIALOG",U="[SCRUMBOARD APP] CLOSE UPGRADE PLAN DIALOG";function B(n){var r=i().get("/api/scrumboard-app/board",{params:n});return function(t){return r.then(function(n){return t({type:D,payload:n.data})},function(n){t((0,u.PV)({message:n.response.data,autoHideDuration:2e3,anchorOrigin:{vertical:"top",horizontal:"right"}})),o.Z.push({pathname:"/apps/companies"})})}}function j(){return{type:m}}function w(e){return function(t,n){var r=n().scrumboardApp.board,n=r.lists,n=R(n,e.source.index,e.destination.index);return i().post("/api/scrumboard-app/list/order",{boardId:r.id,lists:n}).then(function(n){t((0,u.PV)({message:"List Order Saved",autoHideDuration:2e3,anchorOrigin:{vertical:"top",horizontal:"right"}}))}),t({type:v,payload:n})}}function k(e){return function(t,n){var r=n().scrumboardApp.board,n=r.lists,n=y(n,e.source,e.destination);return i().post("/api/scrumboard-app/card/order",{boardId:r.id,lists:n}).then(function(n){t((0,u.PV)({message:"Card Order Saved",autoHideDuration:2e3,anchorOrigin:{vertical:"top",horizontal:"right"}}))}),t({type:C,payload:n})}}function Z(n,t,r){var r=new d({name:r}),e=i().post("/api/scrumboard-app/card/new",{boardId:n,listId:t,data:r});return function(r){return new Promise(function(t,n){e.then(function(n){return t(n.data),r({type:S,payload:n.data})})})}}function H(n,t){var t=new s({name:t}),r=i().post("/api/scrumboard-app/list/new",{boardId:n,data:t});return function(t){return r.then(function(n){return t({type:M,payload:n.data})})}}function V(n,r,e){var o=i().post("/api/scrumboard-app/list/rename",{boardId:n,listId:r,listTitle:e});return function(t){return o.then(function(n){return t({type:F,listId:r,listTitle:e})})}}function x(n,r){var e=i().post("/api/scrumboard-app/list/remove",{boardId:n,listId:r});return function(t){return e.then(function(n){return t({type:G,listId:r})})}}function X(t){return function(n){return n({type:T,payload:t})}}function Q(){return{type:N}}function Y(){return{type:U}}function z(e){return function(t,n){var r=n().scrumboardApp.board,n=a.Z.merge(r.settings,e);return i().post("/api/scrumboard-app/board/settings/update",{boardId:r.id,settings:n}).then(function(n){return t({type:L,payload:n.data})})}}function W(n){var r=i().post("/api/scrumboard-app/board/delete",{boardId:n});return function(t){return r.then(function(n){return o.Z.push({pathname:"/apps/companies"}),t({type:b})})}}function _(n){a.Z.merge(n,{id:e.Z.generateGUID(),name:"".concat(n.name," (Copied)"),uri:"".concat(n.uri,"-copied")});return function(n){return n(E()),{type:g}}}function q(n,r){var e=i().post("/api/scrumboard-app/board/rename",{boardId:n,boardTitle:r});return function(t){return e.then(function(n){return t({type:I,boardTitle:r})})}}var J="[SCRUMBOARD APP] OPEN CARD DIALOG",$="[SCRUMBOARD APP] CLOSE CARD DIALOG",K="[SCRUMBOARD APP] UPDATE CARD",nn="[SCRUMBOARD APP] REMOVE CARD";function tn(n){return{type:J,payload:n}}function rn(){return{type:$}}function en(n,r){return function(t){return i().post("/api/scrumboard-app/card/update",{boardId:n,card:r}).then(function(n){return t((0,u.PV)({message:"Card Saved",autoHideDuration:2e3,anchorOrigin:{vertical:"top",horizontal:"right"}})),t({type:K,payload:r})})}}function on(r,e){return function(t){return i().post("/api/scrumboard-app/card/remove",{boardId:r,cardId:e}).then(function(n){return t({type:nn,boardId:r,cardId:e})})}}},55753:function(n,t,r){"use strict";r.d(t,{Z:function(){return P}});var e=r(28348),t=r(79545),o=r.n(t),t=r(56156),u=r.n(t),i=r(65129),a=r(89673);function c(t,n){var r,e=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),e.push.apply(e,r)),e}function d(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?c(Object(r),!0).forEach(function(n){u()(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}var s={isOpenUpgradePlan:!1},f=[];function p(t,n){var r,e=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),e.push.apply(e,r)),e}function l(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?p(Object(r),!0).forEach(function(n){u()(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}var A={dialogOpen:!1,data:null},P=(0,e.UY)({boards:function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:f,t=1<arguments.length?arguments[1]:void 0;switch(t.type){case a.rQ:return function(n,r,t){var e=2<arguments.length&&void 0!==t?t:"ASC";return n.sort(function(n,t){return"ASC"===e?n[r].toLocaleLowerCase()>t[r].toLocaleLowerCase()?1:n[r].toLocaleLowerCase()<t[r].toLocaleLowerCase()?-1:0:n[r].toLocaleLowerCase()>t[r].toLocaleLowerCase()?-1:n[r].toLocaleLowerCase()<t[r].toLocaleLowerCase()?1:0})}(function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[];return[].concat(o()(t),o()(n)).reduce(function(n,t){return n.find(function(n){return n.name===t.name})?n:n.concat([t])},[])}([].concat(o()(n),o()(t.payload))),"name");case a.F$:return[].concat(o()(n),[t.board]);case a.A:return[];default:return n}},board:function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:s,t=1<arguments.length?arguments[1]:void 0;switch(t.type){case a.gA:return d({},t.payload);case a.Zf:return s;case a.kX:case a.yn:case a.BQ:return d(d({},n),{},{lists:t.payload});case a.py:return d({},t.payload);case a.Ek:return d(d({},n),{},{labels:[].concat(o()(n.labels),[t.payload])});case a.eh:return d(d({},n),{},{cards:n.cards.map(function(n){return n.id===t.payload.id?t.payload:n})});case a.fj:return d(d({},n),{},{cards:i.Z.reject(n.cards,{id:t.cardId}),lists:n.lists.map(function(n){return i.Z.set(n,"idCards",i.Z.reject(n.idCards,function(n){return n===t.cardId})),n})});case a.Nu:return d(d({},n),{},{lists:n.lists.map(function(n){return n.id===t.listId&&(n.name=t.listTitle),n})});case a.qB:return d(d({},n),{},{lists:i.Z.reject(n.lists,{id:t.listId})});case a.gN:return d(d({},n),{},{settings:t.payload});case a.TU:return s;case a.QM:return d(d({},n),{},{name:t.boardTitle});case a.z5:return d(d({},n),{},{isOpenUpgradePlan:!0});case a.Q3:return d(d({},n),{},{isOpenUpgradePlan:!1});default:return n}},card:function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:A,t=1<arguments.length?arguments[1]:void 0;switch(t.type){case a.Pg:return{dialogOpen:!0,data:t.payload};case a.eh:return l(l({},n),{},{data:t.payload});case a.fj:case a.j6:return A;default:return n}}})},97692:function(n,t,r){"use strict";var e=r(43715),o=r(78709);t.Z=function(n,r){return function(t){return(0,e.f)(n,r),function(n){return o.createElement(t,n)}}}}}]);