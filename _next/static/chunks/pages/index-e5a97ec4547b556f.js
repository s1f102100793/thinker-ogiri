(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(4907)}])},4907:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var a=n(5893),o=n(7294),c=n(1014),s=n.n(c),r=()=>{let e=window.location.pathname;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:s().headerTop,children:(0,a.jsx)("div",{className:s().textBottomLeft,children:"考える像大喜利"})}),(0,a.jsxs)("div",{className:s().headerBottom,children:[(0,a.jsx)("a",{href:"/",className:"".concat(s().link," ").concat("/"===e?s().active:""),children:"Home"}),(0,a.jsx)("a",{href:"/create",className:"".concat(s().link," ").concat("/create"===e?s().active:""),children:"Create"}),(0,a.jsx)("a",{href:"/view",className:"".concat(s().link," ").concat("/view"===e?s().active:""),children:"View"}),(0,a.jsx)("a",{href:"/outstanding",className:"".concat(s().link," ").concat("/outstanding"===e?s().active:""),children:"Outstanding"})]})]})},i=n(9239),d=n(7080),h=n(6154);let l=(e=>{let{baseURL:t,fetch:n}=e,a=(void 0===t?"":t).replace(/\/$/,""),o="/health",c="/image",s="/session",r="/tasks",i="/tasks/di",h="POST",l="DELETE",j="PATCH";return{health:{get:e=>n(a,o,"GET",e).json(),$get:e=>n(a,o,"GET",e).json().then(e=>e.body),$path:()=>"".concat(a).concat(o)},image:{get:e=>n(a,c,"GET",e).text(),$get:e=>n(a,c,"GET",e).text().then(e=>e.body),post:e=>n(a,c,h,e).json(),$post:e=>n(a,c,h,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(c)},me:{get:e=>n(a,"/me","GET",e).json(),$get:e=>n(a,"/me","GET",e).json().then(e=>e.body),$path:()=>"".concat(a).concat("/me")},session:{post:e=>n(a,s,h,e).json(),$post:e=>n(a,s,h,e).json().then(e=>e.body),delete:e=>n(a,s,l,e).json(),$delete:e=>n(a,s,l,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(s)},tasks:{_taskId:e=>{let t="".concat(r,"/").concat(e);return{patch:e=>n(a,t,j,e).json(),$patch:e=>n(a,t,j,e).json().then(e=>e.body),delete:e=>n(a,t,l,e).json(),$delete:e=>n(a,t,l,e).json().then(e=>e.body),$path:()=>"".concat(a).concat(t)}},di:{get:e=>n(a,i,"GET",e).json(),$get:e=>n(a,i,"GET",e).json().then(e=>e.body),$path:()=>"".concat(a).concat(i)},get:e=>n(a,r,"GET",e).json(),$get:e=>n(a,r,"GET",e).json().then(e=>e.body),post:e=>n(a,r,h,e).json(),$post:e=>n(a,r,h,e).json().then(e=>e.body),patch:e=>n(a,r,j,e).json(),$patch:e=>n(a,r,j,e).json().then(e=>e.body),delete:e=>n(a,r,l,e).json(),$delete:e=>n(a,r,l,e).json().then(e=>e.body),$path:e=>"".concat(a).concat(r).concat(e&&e.query?"?".concat((0,d._K)(e.query)):"")},get:e=>n(a,"","GET",e).text(),$get:e=>n(a,"","GET",e).text().then(e=>e.body),$path:()=>"".concat(a)}})((0,i.Z)(h.Z.create({withCredentials:!0})));var j=n(2729),_=n.n(j),p=()=>{let[e,t]=(0,o.useState)(""),n=async()=>{try{var e;let n=await l.image.$post();if(!n){console.error("API response is null");return}console.log(n),(null===(e=n.data[0])||void 0===e?void 0:e.b64_json)&&t(n.data[0].b64_json)}catch(e){console.error("API error:",e)}};return(0,a.jsxs)("div",{className:_().container,children:[(0,a.jsx)(r,{}),(0,a.jsx)("button",{onClick:n,children:"作る"}),e&&(0,a.jsx)("div",{className:"generated-image-area",children:(0,a.jsx)("figure",{children:(0,a.jsx)("img",{src:"data:image/png;base64,".concat(e),alt:"Generated Data"})})})]})}},1014:function(e){e.exports={headerTop:"Header_headerTop__PiWQz",textBottomLeft:"Header_textBottomLeft__943jk",headerBottom:"Header_headerBottom__VzkFF",link:"Header_link__p2PJz",active:"Header_active__8Eipm"}},2729:function(e){e.exports={container:"index_container___q52_"}}},function(e){e.O(0,[911,774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);