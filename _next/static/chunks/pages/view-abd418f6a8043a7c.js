(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[891],{2092:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/view",function(){return n(9619)}])},1587:function(e,t,n){"use strict";var o=n(5893),c=n(1014),a=n.n(c);t.Z=()=>{let e=window.location.pathname;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:a().headerTop,children:(0,o.jsx)("div",{className:a().textBottomLeft,children:"ロダン大喜利"})}),(0,o.jsxs)("div",{className:a().headerBottom,children:[(0,o.jsx)("a",{href:"/",className:"".concat(a().link," ").concat("/"===e?a().active:""),children:"Home"}),(0,o.jsx)("a",{href:"/create",className:"".concat(a().link," ").concat("/create/"===e?a().active:""),children:"Create"}),(0,o.jsx)("a",{href:"/view",className:"".concat(a().link," ").concat("/view/"===e?a().active:""),children:"View"}),(0,o.jsx)("a",{href:"/outstanding",className:"".concat(a().link," ").concat("/outstanding/"===e?a().active:""),children:"Outstanding"})]})]})}},9619:function(e,t,n){"use strict";n.r(t);var o=n(5893),c=n(3024),a=n(2489),s=n(9008),l=n.n(s),i=n(7294),r=n(1587),d=n(9777),h=n(2513),_=n.n(h);t.default=()=>{let[e,t]=(0,i.useState)([]),n=async()=>{let e=await d.x.boke.$get();e?(console.log(e),t(e)):console.error("Failed to fetch boke data")},[s,h]=(0,i.useState)(null),m=e=>{h(e)};function u(e){let t=Math.floor((new Date().getTime()-e.getTime())/1e3),n=Math.floor(t/31536e3);return n>1?"".concat(n," 年前"):(n=Math.floor(t/2592e3))>1?"".concat(n," 月前"):(n=Math.floor(t/86400))>1?"".concat(n," 日前"):(n=Math.floor(t/3600))>1?"".concat(n," 時間前"):(n=Math.floor(t/60))>1?"".concat(n," 分前"):"".concat(Math.floor(t)," 秒前")}return(0,i.useEffect)(()=>{console.log("useEffect"),n()},[]),(0,o.jsxs)("div",{className:_().container,children:[(0,o.jsxs)(l(),{children:[(0,o.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,o.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,o.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400&display=swap",rel:"stylesheet"})]}),(0,o.jsx)(r.Z,{}),(0,o.jsx)("div",{className:_().contentWrapper,children:null!==s?(0,o.jsxs)("div",{className:_().fullScreenBoke,children:[(0,o.jsx)("div",{className:_().fullScreenBokeLeft,children:(0,o.jsx)("img",{className:_().fullScreenImage,src:s.image,alt:"Boke ".concat(s.bokeId)})}),(0,o.jsxs)("div",{className:_().fullScreenBokeRight,children:[(0,o.jsx)("p",{className:_().fullScreenText,children:s.text}),(0,o.jsxs)("div",{className:_().middleErea,children:[(0,o.jsxs)("p",{className:_().middleEreaLikeCount,children:["★",s.like]}),(0,o.jsx)("p",{className:_().fullScreenTime,children:u(new Date(s.createdAt))}),(0,o.jsx)("div",{className:_().twitterShare,children:(0,o.jsx)(a.G,{icon:c.mim,size:"xs",style:{color:"#000"}})})]}),(0,o.jsx)("button",{className:_().closeButton,onClick:()=>{h(null)},children:"閉じる"})]})]}):e.length>0&&(0,o.jsx)("div",{className:_().bokeList,children:e.map(e=>(0,o.jsxs)("div",{className:_().bokeItem,onClick:()=>m(e),children:[(0,o.jsx)("img",{src:e.image,alt:"Boke ".concat(e.bokeId)}),(0,o.jsxs)("div",{className:_().bokeDetails,children:[(0,o.jsxs)("p",{children:[(0,o.jsxs)("span",{className:_().likeCount,children:["★",e.like]})," ",e.text]}),(0,o.jsx)("p",{children:u(new Date(e.createdAt))}),(0,o.jsx)("div",{className:_().socialShare,children:(0,o.jsx)("a",{href:"https://twitter.com/intent/tweet?text=".concat(e.text),target:"_blank",rel:"noopener noreferrer",children:(0,o.jsx)(a.G,{icon:c.mim,size:"2xs",style:{color:"#000"}})})})]})]},e.bokeId))})})]})}},9777:function(e,t,n){"use strict";n.d(t,{x:function(){return s}});var o=n(9239),c=n(7080),a=n(6154);let s=(e=>{let{baseURL:t,fetch:n}=e,o=(void 0===t?"":t).replace(/\/$/,""),a="/boke",s="/health",l="/image",i="/session",r="/tasks",d="/tasks/di",h="POST",_="DELETE",m="PATCH";return{boke:{get:e=>n(o,a,"GET",e).json(),$get:e=>n(o,a,"GET",e).json().then(e=>e.body),post:e=>n(o,a,h,e).send(),$post:e=>n(o,a,h,e).send().then(e=>e.body),$path:()=>"".concat(o).concat(a)},health:{get:e=>n(o,s,"GET",e).json(),$get:e=>n(o,s,"GET",e).json().then(e=>e.body),$path:()=>"".concat(o).concat(s)},image:{get:e=>n(o,l,"GET",e).text(),$get:e=>n(o,l,"GET",e).text().then(e=>e.body),post:e=>n(o,l,h,e).json(),$post:e=>n(o,l,h,e).json().then(e=>e.body),$path:()=>"".concat(o).concat(l)},me:{get:e=>n(o,"/me","GET",e).json(),$get:e=>n(o,"/me","GET",e).json().then(e=>e.body),$path:()=>"".concat(o).concat("/me")},session:{post:e=>n(o,i,h,e).json(),$post:e=>n(o,i,h,e).json().then(e=>e.body),delete:e=>n(o,i,_,e).json(),$delete:e=>n(o,i,_,e).json().then(e=>e.body),$path:()=>"".concat(o).concat(i)},tasks:{_taskId:e=>{let t="".concat(r,"/").concat(e);return{patch:e=>n(o,t,m,e).json(),$patch:e=>n(o,t,m,e).json().then(e=>e.body),delete:e=>n(o,t,_,e).json(),$delete:e=>n(o,t,_,e).json().then(e=>e.body),$path:()=>"".concat(o).concat(t)}},di:{get:e=>n(o,d,"GET",e).json(),$get:e=>n(o,d,"GET",e).json().then(e=>e.body),$path:()=>"".concat(o).concat(d)},get:e=>n(o,r,"GET",e).json(),$get:e=>n(o,r,"GET",e).json().then(e=>e.body),post:e=>n(o,r,h,e).json(),$post:e=>n(o,r,h,e).json().then(e=>e.body),patch:e=>n(o,r,m,e).json(),$patch:e=>n(o,r,m,e).json().then(e=>e.body),delete:e=>n(o,r,_,e).json(),$delete:e=>n(o,r,_,e).json().then(e=>e.body),$path:e=>"".concat(o).concat(r).concat(e&&e.query?"?".concat((0,c._K)(e.query)):"")},get:e=>n(o,"","GET",e).text(),$get:e=>n(o,"","GET",e).text().then(e=>e.body),$path:()=>"".concat(o)}})((0,o.Z)(a.Z.create({withCredentials:!0})))},1014:function(e){e.exports={headerTop:"Header_headerTop__PiWQz",textBottomLeft:"Header_textBottomLeft__943jk",headerBottom:"Header_headerBottom__VzkFF",link:"Header_link__p2PJz",active:"Header_active__8Eipm"}},2513:function(e){e.exports={container:"view_container__3syd9",contentWrapper:"view_contentWrapper__4tYFJ",bokeList:"view_bokeList__KCKDc",bokeItem:"view_bokeItem__bj8jG",text:"view_text__oZgNG",bokeDetails:"view_bokeDetails__JlqCv",likeCount:"view_likeCount__YUG_C",socialShare:"view_socialShare__Ztcnq",rating:"view_rating__lq5oi",fullScreenBoke:"view_fullScreenBoke__UhuEC",fullScreenBokeLeft:"view_fullScreenBokeLeft__zoBya",fullScreenImage:"view_fullScreenImage__1WX7A",fullScreenBokeRight:"view_fullScreenBokeRight__MPqF1",fullScreenText:"view_fullScreenText__JYp8C",middleErea:"view_middleErea__Mlsfb",middleEreaLikeCount:"view_middleEreaLikeCount__u6iUb",fullScreenTime:"view_fullScreenTime__HLh7i",twitterShare:"view_twitterShare__XPyRF",closeButton:"view_closeButton__9zce_"}}},function(e){e.O(0,[948,465,603,774,888,179],function(){return e(e.s=2092)}),_N_E=e.O()}]);