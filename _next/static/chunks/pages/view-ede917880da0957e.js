(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[891],{2092:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/view",function(){return n(9619)}])},1587:function(e,t,n){"use strict";var a=n(5893),o=n(1014),s=n.n(o);t.Z=()=>{let e=window.location.pathname;return(0,a.jsxs)("div",{className:s().headerContainer,children:[(0,a.jsx)("div",{className:s().headerTop,children:(0,a.jsx)("div",{className:s().textBottomLeft,children:"ロダン大喜利"})}),(0,a.jsxs)("div",{className:s().headerBottom,children:[(0,a.jsx)("a",{href:"/",className:"".concat(s().link," ").concat("/"===e?s().active:""),children:"Home"}),(0,a.jsx)("a",{href:"/view",className:"".concat(s().link," ").concat("/view/"===e?s().active:""),children:"View"}),(0,a.jsx)("a",{href:"/create",className:"".concat(s().link," ").concat("/create/"===e?s().active:""),children:"Create"}),(0,a.jsx)("a",{href:"/outstanding",className:"".concat(s().link," ").concat("/outstanding/"===e?s().active:""),children:"Outstanding"})]})]})}},9619:function(e,t,n){"use strict";n.r(t);var a=n(5893),o=n(9008),s=n.n(o),c=n(1163),i=n(7294),r=n(1587),d=n(9777),l=n(2513),h=n.n(l);t.default=()=>{let e=(0,c.useRouter)(),[t,n]=(0,i.useState)([]),o=async()=>{let e=await d.x.boke.$get({});Array.isArray(e)&&n(e)},[l,p]=(0,i.useState)("like"),_=e=>{let a=[...t];switch(e){case"like":a.sort((e,t)=>t.like-e.like);break;case"createdAt":a.sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime());break;case"random":a=a.sort(()=>Math.random()-.5)}n(a),p(e)},j=(t,n)=>{if(m.current){let e=m.current.clientWidth,t=n*e*.33;x(t),k(n)}e.push("/view/".concat(t.bokeId,"?order=").concat(l))},m=(0,i.useRef)(null),[u,k]=(0,i.useState)(0),[b,x]=(0,i.useState)(0);return(0,i.useEffect)(()=>{let e=e=>{if(e.preventDefault(),m.current){let n=m.current.clientWidth,a=.33*n,o=u*a;e.deltaY>0&&u<t.length-1?(k(e=>e+1),o+=a):e.deltaY<0&&u>0&&(k(e=>e-1),o-=a),x(o)}};return window.addEventListener("wheel",e,{passive:!1}),()=>{window.removeEventListener("wheel",e)}},[t.length,u]),(0,i.useEffect)(()=>{o()},[]),(0,a.jsxs)("div",{className:h().container,children:[(0,a.jsxs)(s(),{children:[(0,a.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,a.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,a.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400&display=swap",rel:"stylesheet"})]}),(0,a.jsx)(r.Z,{}),(0,a.jsxs)("div",{className:h().buttonList,children:[(0,a.jsx)("button",{onClick:()=>_("like"),children:"Like"}),(0,a.jsx)("button",{onClick:()=>_("createdAt"),children:"CreatedAt"}),(0,a.jsx)("button",{onClick:()=>_("random"),children:"Random"})]}),(0,a.jsx)("div",{className:h().contentWrapper,ref:m,children:(0,a.jsxs)("div",{className:h().bokeList,style:{transform:"translateX(-".concat(b,"px)")},children:[(0,a.jsx)("div",{className:h().initialMargin}),t.map((e,t)=>(0,a.jsxs)("div",{className:"".concat(h().bokeItem," ").concat(t===u?h().centerItem:""),onClick:()=>j(e,t),children:[(0,a.jsx)("div",{className:h().imageBorder,children:(0,a.jsx)("img",{src:e.image,alt:"Boke ".concat(e.bokeId)})}),(0,a.jsxs)("div",{className:h().description,children:[(0,a.jsx)("div",{className:h().textWrapper,children:e.text}),(0,a.jsx)("div",{className:h().likeWrapper,children:e.like})]})]},e.bokeId))]})})]})}},9777:function(e,t,n){"use strict";n.d(t,{x:function(){return c}});var a=n(9239),o=n(7080),s=n(6154);let c=(e=>{let{baseURL:t,fetch:n}=e,a=(void 0===t?"":t).replace(/\/$/,""),s="/boke",c="/boke/selected",i="/health",r="/image",d="/session",l="/tasks",h="/tasks/di",p="POST",_="DELETE",j="PATCH";return{boke:{selected:{get:e=>n(a,c,"GET",e).text(),$get:e=>n(a,c,"GET",e).text().then(e=>e.body),post:e=>n(a,c,p,e).json(),$post:e=>n(a,c,p,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(c)},get:e=>n(a,s,"GET",e).json(),$get:e=>n(a,s,"GET",e).json().then(e=>e.body),post:e=>n(a,s,p,e).send(),$post:e=>n(a,s,p,e).send().then(e=>e.body),$path:()=>"".concat(a).concat(s)},health:{get:e=>n(a,i,"GET",e).json(),$get:e=>n(a,i,"GET",e).json().then(e=>e.body),$path:()=>"".concat(a).concat(i)},image:{get:e=>n(a,r,"GET",e).text(),$get:e=>n(a,r,"GET",e).text().then(e=>e.body),post:e=>n(a,r,p,e).json(),$post:e=>n(a,r,p,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(r)},me:{get:e=>n(a,"/me","GET",e).json(),$get:e=>n(a,"/me","GET",e).json().then(e=>e.body),$path:()=>"".concat(a).concat("/me")},session:{post:e=>n(a,d,p,e).json(),$post:e=>n(a,d,p,e).json().then(e=>e.body),delete:e=>n(a,d,_,e).json(),$delete:e=>n(a,d,_,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(d)},tasks:{_taskId:e=>{let t="".concat(l,"/").concat(e);return{patch:e=>n(a,t,j,e).json(),$patch:e=>n(a,t,j,e).json().then(e=>e.body),delete:e=>n(a,t,_,e).json(),$delete:e=>n(a,t,_,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(t)}},di:{get:e=>n(a,h,"GET",e).json(),$get:e=>n(a,h,"GET",e).json().then(e=>e.body),$path:()=>"".concat(a).concat(h)},get:e=>n(a,l,"GET",e).json(),$get:e=>n(a,l,"GET",e).json().then(e=>e.body),post:e=>n(a,l,p,e).json(),$post:e=>n(a,l,p,e).json().then(e=>e.body),patch:e=>n(a,l,j,e).json(),$patch:e=>n(a,l,j,e).json().then(e=>e.body),delete:e=>n(a,l,_,e).json(),$delete:e=>n(a,l,_,e).json().then(e=>e.body),$path:e=>"".concat(a).concat(l).concat(e&&e.query?"?".concat((0,o._K)(e.query)):"")},get:e=>n(a,"","GET",e).text(),$get:e=>n(a,"","GET",e).text().then(e=>e.body),$path:()=>"".concat(a)}})((0,a.Z)(s.Z.create({withCredentials:!0})))},1014:function(e){e.exports={headerContainer:"Header_headerContainer__4fbbd",headerTop:"Header_headerTop__PiWQz",textBottomLeft:"Header_textBottomLeft__943jk",headerBottom:"Header_headerBottom__VzkFF",link:"Header_link__p2PJz",active:"Header_active__8Eipm"}},2513:function(e){e.exports={container:"view_container__3syd9",buttonList:"view_buttonList__dcXFK",contentWrapper:"view_contentWrapper__4tYFJ",bokeList:"view_bokeList__KCKDc",initialMargin:"view_initialMargin__caPb8",bokeItem:"view_bokeItem__bj8jG",centerItem:"view_centerItem__sRWbh",imageBorder:"view_imageBorder__D3O0p",description:"view_description___xy2q",textWrapper:"view_textWrapper__wBUI2",likeWrapper:"view_likeWrapper__MhV9c"}}},function(e){e.O(0,[465,774,888,179],function(){return e(e.s=2092)}),_N_E=e.O()}]);