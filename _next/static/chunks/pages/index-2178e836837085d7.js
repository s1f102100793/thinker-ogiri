(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3120)}])},1587:function(e,t,n){"use strict";var a=n(5893),o=n(1014),s=n.n(o);t.Z=()=>{let e=window.location.pathname;return(0,a.jsxs)("div",{className:s().headerContainer,children:[(0,a.jsx)("div",{className:s().headerTop,children:(0,a.jsx)("div",{className:s().textBottomLeft,children:"ロダン大喜利"})}),(0,a.jsxs)("div",{className:s().headerBottom,children:[(0,a.jsx)("a",{href:"/",className:"".concat(s().link," ").concat("/"===e?s().active:""),children:"Home"}),(0,a.jsx)("a",{href:"/view",className:"".concat(s().link," ").concat("/view/"===e?s().active:""),children:"View"}),(0,a.jsx)("a",{href:"/create",className:"".concat(s().link," ").concat("/create/"===e?s().active:""),children:"Create"}),(0,a.jsx)("a",{href:"/outstanding",className:"".concat(s().link," ").concat("/outstanding/"===e?s().active:""),children:"Outstanding"})]})]})}},3120:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var a=n(5893),o=n(9008),s=n.n(o),c=n(7294),i=n(1587),r=n(9777);let d=()=>{let[e,t]=(0,c.useState)([]),[n,a]=(0,c.useState)([]),[o,s]=(0,c.useState)([]),i=(0,c.useCallback)(async()=>{let e=await r.x.boke.$get();Array.isArray(e)?(t(e),a(e.map(e=>e.image))):e?console.error("Expected an array of BokeModel but received a single instance."):console.error("Failed to fetch boke data")},[]);return{homeBokeData:e,setHomeBokeData:t,homeBokeImg:n,setHomeBokeImg:a,displayImages:o,setDisplayImages:s,fetchHomeboke:i}};var l=n(2729),h=n.n(l),m=()=>{let{homeBokeImg:e,displayImages:t,setDisplayImages:n,fetchHomeboke:o}=d();return(0,c.useEffect)(()=>{o()},[o]),(0,c.useEffect)(()=>{e.length>0&&n(e.slice(0,5))},[e,n]),(0,c.useEffect)(()=>{let a=setInterval(()=>{if(0===e.length)return;let a=[...t.slice(1)],o=e.indexOf(a[a.length-1])+1;e[o]?a.push(e[o]):a.push(e[0]),n(a)},5e3);return()=>clearInterval(a)},[t,e,n]),(0,a.jsxs)("div",{className:h().container,children:[(0,a.jsxs)(s(),{children:[(0,a.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,a.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,a.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400&display=swap",rel:"stylesheet"})]}),(0,a.jsx)(i.Z,{}),(0,a.jsxs)("div",{className:h().mainContent,children:[(0,a.jsx)("div",{className:h().mainImage,children:(0,a.jsx)("div",{className:h().textContainer,children:"WELCOME TO RODIN OGIRI"})}),(0,a.jsx)("div",{className:h().imageContainer,children:t.map((e,t)=>(0,a.jsx)("img",{src:e,alt:"Boke image ".concat(t),className:h().displayedImg},t))})]})]})}},9777:function(e,t,n){"use strict";n.d(t,{x:function(){return c}});var a=n(9239),o=n(7080),s=n(6154);let c=(e=>{let{baseURL:t,fetch:n}=e,a=(void 0===t?"":t).replace(/\/$/,""),s="/boke",c="/boke/selected",i="/health",r="/image",d="/session",l="/tasks",h="/tasks/di",m="POST",p="DELETE",_="PATCH";return{boke:{selected:{get:e=>n(a,c,"GET",e).text(),$get:e=>n(a,c,"GET",e).text().then(e=>e.body),post:e=>n(a,c,m,e).json(),$post:e=>n(a,c,m,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(c)},get:e=>n(a,s,"GET",e).json(),$get:e=>n(a,s,"GET",e).json().then(e=>e.body),post:e=>n(a,s,m,e).send(),$post:e=>n(a,s,m,e).send().then(e=>e.body),$path:()=>"".concat(a).concat(s)},health:{get:e=>n(a,i,"GET",e).json(),$get:e=>n(a,i,"GET",e).json().then(e=>e.body),$path:()=>"".concat(a).concat(i)},image:{get:e=>n(a,r,"GET",e).text(),$get:e=>n(a,r,"GET",e).text().then(e=>e.body),post:e=>n(a,r,m,e).json(),$post:e=>n(a,r,m,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(r)},me:{get:e=>n(a,"/me","GET",e).json(),$get:e=>n(a,"/me","GET",e).json().then(e=>e.body),$path:()=>"".concat(a).concat("/me")},session:{post:e=>n(a,d,m,e).json(),$post:e=>n(a,d,m,e).json().then(e=>e.body),delete:e=>n(a,d,p,e).json(),$delete:e=>n(a,d,p,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(d)},tasks:{_taskId:e=>{let t="".concat(l,"/").concat(e);return{patch:e=>n(a,t,_,e).json(),$patch:e=>n(a,t,_,e).json().then(e=>e.body),delete:e=>n(a,t,p,e).json(),$delete:e=>n(a,t,p,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(t)}},di:{get:e=>n(a,h,"GET",e).json(),$get:e=>n(a,h,"GET",e).json().then(e=>e.body),$path:()=>"".concat(a).concat(h)},get:e=>n(a,l,"GET",e).json(),$get:e=>n(a,l,"GET",e).json().then(e=>e.body),post:e=>n(a,l,m,e).json(),$post:e=>n(a,l,m,e).json().then(e=>e.body),patch:e=>n(a,l,_,e).json(),$patch:e=>n(a,l,_,e).json().then(e=>e.body),delete:e=>n(a,l,p,e).json(),$delete:e=>n(a,l,p,e).json().then(e=>e.body),$path:e=>"".concat(a).concat(l).concat(e&&e.query?"?".concat((0,o._K)(e.query)):"")},get:e=>n(a,"","GET",e).text(),$get:e=>n(a,"","GET",e).text().then(e=>e.body),$path:()=>"".concat(a)}})((0,a.Z)(s.Z.create({withCredentials:!0})))},1014:function(e){e.exports={headerContainer:"Header_headerContainer__4fbbd",headerTop:"Header_headerTop__PiWQz",textBottomLeft:"Header_textBottomLeft__943jk",headerBottom:"Header_headerBottom__VzkFF",link:"Header_link__p2PJz",active:"Header_active__8Eipm"}},2729:function(e){e.exports={container:"index_container___q52_",mainContent:"index_mainContent__o_EG7",mainImage:"index_mainImage__m4GqE",textContainer:"index_textContainer__lYO_m",imageContainer:"index_imageContainer__Q6Q04",displayedImg:"index_displayedImg__ev8S0"}}},function(e){e.O(0,[465,774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);