(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(9178)}])},6964:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var o=n(5893),a=n(7294),s=n(9777);let c=()=>{let[e,t]=(0,a.useState)([]),[n,o]=(0,a.useState)([]),c=(0,a.useCallback)(async()=>{let e=await s.x.boke.$get();Array.isArray(e)?(t(e),o(e.map(e=>e.image))):e?console.error("Expected an array of BokeModel but received a single instance."):console.error("Failed to fetch boke data")},[]);return{homeBokeData:e,setHomeBokeData:t,homeBokeImg:n,setHomeBokeImg:o,fetchHomeboke:c}};var i=n(1985),r=n.n(i),l=e=>{let{customStyle:t}=e,{homeBokeImg:n,fetchHomeboke:s}=c(),[i,l]=(0,a.useState)([]);return(0,a.useEffect)(()=>{s()},[s]),(0,a.useEffect)(()=>{n.length>0&&l(n.slice(0,5))},[n]),(0,a.useEffect)(()=>{let e=setInterval(()=>{if(0===n.length)return;let e=[...i.slice(1)],t=n.indexOf(e[e.length-1])+1;n[t]?e.push(n[t]):e.push(n[0]),l(e)},5e3);return()=>clearInterval(e)},[i,n]),(0,o.jsx)("div",{className:"".concat(r().imageContainer," ").concat(t),children:i.map((e,t)=>(0,o.jsx)("img",{src:e,alt:"Boke image ".concat(t),className:r().displayedImg},t))})}},1191:function(e,t,n){"use strict";var o=n(5893),a=n(3024),s=n(9417),c=n(2489),i=n(5295),r=n.n(i);t.Z=()=>{let e=window.location.pathname;return(0,o.jsxs)("div",{className:r().footer,children:[(0,o.jsx)("div",{className:r().footerTop,children:(0,o.jsx)("div",{className:r().textTopLeft,children:"Thinker"})}),(0,o.jsxs)("div",{className:r().column,children:[(0,o.jsx)("a",{href:"https://twitter.com/mctabetai_0905",target:"_blank",rel:"noopener noreferrer",children:(0,o.jsx)(c.G,{icon:a.mim,size:"2x",style:{color:"#fff"}})}),(0,o.jsx)("a",{href:"https://github.com/s1f102100793/thinker-ogiri",target:"_blank",rel:"noopener noreferrer",children:(0,o.jsx)(c.G,{icon:a.M0L,size:"2x",style:{color:"#fff"}})})]}),(0,o.jsxs)("div",{className:r().column,children:[" ",(0,o.jsx)("a",{href:"/",className:"".concat(r().link," ").concat("/"===e?r().active:""),children:"Home"}),(0,o.jsx)("a",{href:"/view",className:"".concat(r().link," ").concat("/view/"===e?r().active:""),children:"View"}),(0,o.jsx)("a",{href:"/create",className:"".concat(r().link," ").concat("/create/"===e?r().active:""),children:"Create"}),(0,o.jsx)("a",{href:"/outstanding",className:"".concat(r().link," ").concat("/outstanding/"===e?r().active:""),children:"Outstanding"})]}),(0,o.jsx)("div",{className:r().rightColumn,children:(0,o.jsx)("button",{className:r().topButton,onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},children:(0,o.jsx)(c.G,{icon:s.nIL,size:"3x",style:{color:"#434343"}})})})]})}},1587:function(e,t,n){"use strict";var o=n(5893),a=n(1014),s=n.n(a);t.Z=()=>{let e=window.location.pathname;return(0,o.jsxs)("div",{className:s().headerContainer,children:[(0,o.jsx)("div",{className:s().headerTop,children:(0,o.jsx)("div",{className:s().textBottomLeft,children:"Thinker"})}),(0,o.jsxs)("div",{className:s().headerBottom,children:[(0,o.jsx)("a",{href:"/",className:"".concat(s().link," ").concat("/"===e?s().active:""),children:"Home"}),(0,o.jsx)("a",{href:"/view",className:"".concat(s().link," ").concat("/view/"===e?s().active:""),children:"View"}),(0,o.jsx)("a",{href:"/create",className:"".concat(s().link," ").concat("/create/"===e?s().active:""),children:"Create"}),(0,o.jsx)("a",{href:"/outstanding",className:"".concat(s().link," ").concat("/outstanding/"===e?s().active:""),children:"Outstanding"})]})]})}},9178:function(e,t,n){"use strict";n.r(t);var o=n(5893),a=n(9008),s=n.n(a),c=n(6964),i=n(1191),r=n(1587),l=n(2729),d=n.n(l);t.default=()=>(0,o.jsxs)("div",{className:d().container,children:[(0,o.jsxs)(s(),{children:[(0,o.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,o.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,o.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400&display=swap",rel:"stylesheet"})]}),(0,o.jsx)(r.Z,{}),(0,o.jsxs)("div",{className:d().mainContent,children:[(0,o.jsxs)("div",{className:d().mainImage,children:[(0,o.jsx)("div",{className:d().imageContainer}),(0,o.jsx)("div",{className:d().textContainer,children:"WELCOME TO THINKER"})]}),(0,o.jsx)(c.Z,{})]}),(0,o.jsx)(i.Z,{})]})},9777:function(e,t,n){"use strict";n.d(t,{x:function(){return c}});var o=n(9239),a=n(7080),s=n(6154);let c=(e=>{let{baseURL:t,fetch:n}=e,o=(void 0===t?"":t).replace(/\/$/,""),s="/boke",c="/boke/selected",i="/health",r="/image",l="/session",d="/tasks",h="/tasks/di",m="POST",_="DELETE",p="PATCH";return{boke:{selected:{get:e=>n(o,c,"GET",e).text(),$get:e=>n(o,c,"GET",e).text().then(e=>e.body),post:e=>n(o,c,m,e).json(),$post:e=>n(o,c,m,e).json().then(e=>e.body),$path:()=>"".concat(o).concat(c)},get:e=>n(o,s,"GET",e).json(),$get:e=>n(o,s,"GET",e).json().then(e=>e.body),post:e=>n(o,s,m,e).send(),$post:e=>n(o,s,m,e).send().then(e=>e.body),$path:()=>"".concat(o).concat(s)},health:{get:e=>n(o,i,"GET",e).json(),$get:e=>n(o,i,"GET",e).json().then(e=>e.body),$path:()=>"".concat(o).concat(i)},image:{get:e=>n(o,r,"GET",e).text(),$get:e=>n(o,r,"GET",e).text().then(e=>e.body),post:e=>n(o,r,m,e).json(),$post:e=>n(o,r,m,e).json().then(e=>e.body),$path:()=>"".concat(o).concat(r)},me:{get:e=>n(o,"/me","GET",e).json(),$get:e=>n(o,"/me","GET",e).json().then(e=>e.body),$path:()=>"".concat(o).concat("/me")},session:{post:e=>n(o,l,m,e).json(),$post:e=>n(o,l,m,e).json().then(e=>e.body),delete:e=>n(o,l,_,e).json(),$delete:e=>n(o,l,_,e).json().then(e=>e.body),$path:()=>"".concat(o).concat(l)},tasks:{_taskId:e=>{let t="".concat(d,"/").concat(e);return{patch:e=>n(o,t,p,e).json(),$patch:e=>n(o,t,p,e).json().then(e=>e.body),delete:e=>n(o,t,_,e).json(),$delete:e=>n(o,t,_,e).json().then(e=>e.body),$path:()=>"".concat(o).concat(t)}},di:{get:e=>n(o,h,"GET",e).json(),$get:e=>n(o,h,"GET",e).json().then(e=>e.body),$path:()=>"".concat(o).concat(h)},get:e=>n(o,d,"GET",e).json(),$get:e=>n(o,d,"GET",e).json().then(e=>e.body),post:e=>n(o,d,m,e).json(),$post:e=>n(o,d,m,e).json().then(e=>e.body),patch:e=>n(o,d,p,e).json(),$patch:e=>n(o,d,p,e).json().then(e=>e.body),delete:e=>n(o,d,_,e).json(),$delete:e=>n(o,d,_,e).json().then(e=>e.body),$path:e=>"".concat(o).concat(d).concat(e&&e.query?"?".concat((0,a._K)(e.query)):"")},get:e=>n(o,"","GET",e).text(),$get:e=>n(o,"","GET",e).text().then(e=>e.body),$path:()=>"".concat(o)}})((0,o.Z)(s.Z.create({withCredentials:!0})))},1985:function(e){e.exports={imageContainer:"BokeImageCarousel_imageContainer__wG3MY",displayedImg:"BokeImageCarousel_displayedImg__UXjRD"}},5295:function(e){e.exports={footer:"Footer_footer__Oesrt",footerTop:"Footer_footerTop__4bvWX",textTopLeft:"Footer_textTopLeft__2i8dZ",column:"Footer_column__0I52p",rightColumn:"Footer_rightColumn__AzjlM",topButton:"Footer_topButton__g43Dn",link:"Footer_link__tl2WU",active:"Footer_active__fgXPJ"}},1014:function(e){e.exports={headerContainer:"Header_headerContainer__4fbbd",headerTop:"Header_headerTop__PiWQz",textBottomLeft:"Header_textBottomLeft__943jk",headerBottom:"Header_headerBottom__VzkFF",link:"Header_link__p2PJz",active:"Header_active__8Eipm"}},2729:function(e){e.exports={container:"index_container___q52_",mainContent:"index_mainContent__o_EG7",mainImage:"index_mainImage__m4GqE",imageContainer:"index_imageContainer__Q6Q04",textContainer:"index_textContainer__lYO_m"}}},function(e){e.O(0,[948,976,911,774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);