(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(2051)}])},2051:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return l}});var a=n(5893),o=n(7294),c=n(9239),s=n(7080),i=n(6154);let d=(t=>{let{baseURL:e,fetch:n}=t,a=(void 0===e?"":e).replace(/\/$/,""),o="/health",c="/image",i="/session",d="/tasks",r="/tasks/di",h="POST",l="DELETE",j="PATCH";return{health:{get:t=>n(a,o,"GET",t).json(),$get:t=>n(a,o,"GET",t).json().then(t=>t.body),$path:()=>"".concat(a).concat(o)},image:{get:t=>n(a,c,"GET",t).text(),$get:t=>n(a,c,"GET",t).text().then(t=>t.body),post:t=>n(a,c,h,t).json(),$post:t=>n(a,c,h,t).json().then(t=>t.body),$path:()=>"".concat(a).concat(c)},me:{get:t=>n(a,"/me","GET",t).json(),$get:t=>n(a,"/me","GET",t).json().then(t=>t.body),$path:()=>"".concat(a).concat("/me")},session:{post:t=>n(a,i,h,t).json(),$post:t=>n(a,i,h,t).json().then(t=>t.body),delete:t=>n(a,i,l,t).json(),$delete:t=>n(a,i,l,t).json().then(t=>t.body),$path:()=>"".concat(a).concat(i)},tasks:{_taskId:t=>{let e="".concat(d,"/").concat(t);return{patch:t=>n(a,e,j,t).json(),$patch:t=>n(a,e,j,t).json().then(t=>t.body),delete:t=>n(a,e,l,t).json(),$delete:t=>n(a,e,l,t).json().then(t=>t.body),$path:()=>"".concat(a).concat(e)}},di:{get:t=>n(a,r,"GET",t).json(),$get:t=>n(a,r,"GET",t).json().then(t=>t.body),$path:()=>"".concat(a).concat(r)},get:t=>n(a,d,"GET",t).json(),$get:t=>n(a,d,"GET",t).json().then(t=>t.body),post:t=>n(a,d,h,t).json(),$post:t=>n(a,d,h,t).json().then(t=>t.body),patch:t=>n(a,d,j,t).json(),$patch:t=>n(a,d,j,t).json().then(t=>t.body),delete:t=>n(a,d,l,t).json(),$delete:t=>n(a,d,l,t).json().then(t=>t.body),$path:t=>"".concat(a).concat(d).concat(t&&t.query?"?".concat((0,s._K)(t.query)):"")},get:t=>n(a,"","GET",t).text(),$get:t=>n(a,"","GET",t).text().then(t=>t.body),$path:()=>"".concat(a)}})((0,c.Z)(i.Z.create({withCredentials:!0})));var r=n(2729),h=n.n(r),l=()=>{let[t,e]=(0,o.useState)(""),n=window.location.pathname,c=async()=>{try{let t=await d.image.$post();console.log(t),t.data[0].b64_json&&e(t.data[0].b64_json)}catch(t){console.error("API error:",t)}};return(0,a.jsxs)("div",{className:h().container,children:[(0,a.jsx)("div",{className:h().headerTop,children:(0,a.jsx)("div",{className:h().textBottomLeft,children:"考える像大喜利"})}),(0,a.jsxs)("div",{className:h().headerBottom,children:[(0,a.jsx)("a",{href:"/",className:"".concat(h().link," ").concat("/"===n?h().active:""),children:"Home"}),(0,a.jsx)("a",{href:"/create",className:"".concat(h().link," ").concat("/create"===n?h().active:""),children:"Create"}),(0,a.jsx)("a",{href:"/view",className:"".concat(h().link," ").concat("/view"===n?h().active:""),children:"View"}),(0,a.jsx)("a",{href:"/outstanding",className:"".concat(h().link," ").concat("/outstanding"===n?h().active:""),children:"Outstanding"})]}),(0,a.jsx)("button",{onClick:c,children:"作る"}),t&&(0,a.jsx)("div",{className:"generated-image-area",children:(0,a.jsx)("figure",{children:(0,a.jsx)("img",{src:"data:image/png;base64,".concat(t),alt:"Generated Data"})})})]})}},2729:function(t){t.exports={container:"index_container___q52_",headerTop:"index_headerTop__Vpc_q",textBottomLeft:"index_textBottomLeft__hQ6Lt",headerBottom:"index_headerBottom__eldbw",link:"index_link__ipPbc",active:"index_active__s6fVP"}}},function(t){t.O(0,[911,774,888,179],function(){return t(t.s=9208)}),_N_E=t.O()}]);