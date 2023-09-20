(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[417],{5619:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/create",function(){return o(1153)}])},6964:function(e,t,o){"use strict";o.d(t,{Z:function(){return i}});var n=o(5893),a=o(7294),s=o(9777);let c=()=>{let[e,t]=(0,a.useState)([]),[o,n]=(0,a.useState)([]),c=(0,a.useCallback)(async()=>{let e=await s.x.boke.$get();Array.isArray(e)?(t(e),n(e.map(e=>e.image))):e?console.error("Expected an array of BokeModel but received a single instance."):console.error("Failed to fetch boke data")},[]);return{homeBokeData:e,setHomeBokeData:t,homeBokeImg:o,setHomeBokeImg:n,fetchHomeboke:c}};var r=o(1985),l=o.n(r),i=e=>{let{customStyle:t}=e,{homeBokeImg:o,fetchHomeboke:s}=c(),[r,i]=(0,a.useState)([]);return(0,a.useEffect)(()=>{s()},[s]),(0,a.useEffect)(()=>{o.length>0&&i(o.slice(0,5))},[o]),(0,a.useEffect)(()=>{let e=setInterval(()=>{if(0===o.length)return;let e=[...r.slice(1)],t=o.indexOf(e[e.length-1])+1;o[t]?e.push(o[t]):e.push(o[0]),i(e)},5e3);return()=>clearInterval(e)},[r,o]),(0,n.jsx)("div",{className:"".concat(l().imageContainer," ").concat(t),children:r.map((e,t)=>(0,n.jsx)("img",{src:e,alt:"Boke image ".concat(t),className:l().displayedImg},t))})}},1587:function(e,t,o){"use strict";var n=o(5893),a=o(1014),s=o.n(a);t.Z=()=>{let e=window.location.pathname;return(0,n.jsxs)("div",{className:s().headerContainer,children:[(0,n.jsx)("div",{className:s().headerTop,children:(0,n.jsx)("div",{className:s().textBottomLeft,children:"ロダン大喜利"})}),(0,n.jsxs)("div",{className:s().headerBottom,children:[(0,n.jsx)("a",{href:"/",className:"".concat(s().link," ").concat("/"===e?s().active:""),children:"Home"}),(0,n.jsx)("a",{href:"/view",className:"".concat(s().link," ").concat("/view/"===e?s().active:""),children:"View"}),(0,n.jsx)("a",{href:"/create",className:"".concat(s().link," ").concat("/create/"===e?s().active:""),children:"Create"}),(0,n.jsx)("a",{href:"/outstanding",className:"".concat(s().link," ").concat("/outstanding/"===e?s().active:""),children:"Outstanding"})]})]})}},1153:function(e,t,o){"use strict";o.r(t);var n=o(5893),a=o(221),s=o(9008),c=o.n(s),r=o(7294),l=o(6964),i=o(1587),d=o(9777),h=o(195),u=o.n(h);t.default=()=>{let[e,t]=(0,r.useState)(""),[o,s]=(0,r.useState)(""),h={maxSizeMB:1,maxWidthOrHeight:1920,useWebWorker:!0},g=async()=>{try{var e,o;let n=await d.x.image.$post();if(!n){console.error("API response is null");return}console.log(null===(e=n.data[0])||void 0===e?void 0:e.b64_json),(null===(o=n.data[0])||void 0===o?void 0:o.b64_json)&&t(n.data[0].b64_json)}catch(e){console.error("API error:",e)}};async function m(e){console.log("Starting compressImage function...");let t=function(e){let t=";base64,";console.log("BASE64_MARKER",t);let o=e.split(t);console.log("parts",o);let n=o[0].split(":")[1]||"image/png";console.log("Content Type:",n);let a=atob(o[1]);console.log("Raw:",a);let s=a.length,c=new Uint8Array(s);for(let e=0;e<s;++e)c[e]=a.charCodeAt(e);return new Blob([c],{type:n})}("data:image/png;base64,".concat(e));console.log("Blob:",t);let o=(t.lastModifiedDate=new Date,t.name="compressed_image.png",t),n=await (0,a.Z)(o,h);console.log("Compressed Blob:",n);let s=new FileReader;return new Promise((e,t)=>{s.onload=t=>{var o;return e(null===(o=t.target)||void 0===o?void 0:o.result)},s.onerror=e=>t(Error("Failed to read blob as DataURL")),s.readAsDataURL(n)})}let p=async()=>{console.log("Starting newSubmitBoke function...");try{console.log("Compressing image..."),console.log("Image data:",e);let n=await m(e);console.log("Image compressed successfully."),console.log("Sending compressed image data..."),await d.x.boke.post({body:{bokeId:void 0,userId:"gouta",text:o,image:n,like:0}}),console.log("Data sent successfully."),t(""),s("")}catch(e){console.error("Error in newSubmitBoke:",e)}};return(0,n.jsxs)("div",{className:u().container,children:[(0,n.jsxs)(c(),{children:[(0,n.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,n.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,n.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400&display=swap",rel:"stylesheet"})]}),(0,n.jsx)(i.Z,{}),(0,n.jsxs)("div",{className:u().content,children:[e?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:u().imageContainer,children:(0,n.jsx)("img",{src:"data:image/png;base64,".concat(e),alt:"Generated Data",width:300,height:300})}),(0,n.jsx)("input",{type:"text",className:u().textBox,value:o,onChange:e=>s(e.target.value),placeholder:"ぼけの言葉を入力"}),(0,n.jsx)("button",{className:u().submitButton,onClick:p,children:"投稿する"})]}):(0,n.jsx)("button",{className:u().bokeButton,onClick:g,children:"ぼける"}),(0,n.jsx)(l.Z,{customStyle:u().someCustomStyleForThisPage})]})]})}},9777:function(e,t,o){"use strict";o.d(t,{x:function(){return c}});var n=o(9239),a=o(7080),s=o(6154);let c=(e=>{let{baseURL:t,fetch:o}=e,n=(void 0===t?"":t).replace(/\/$/,""),s="/boke",c="/boke/selected",r="/health",l="/image",i="/session",d="/tasks",h="/tasks/di",u="POST",g="DELETE",m="PATCH";return{boke:{selected:{get:e=>o(n,c,"GET",e).text(),$get:e=>o(n,c,"GET",e).text().then(e=>e.body),post:e=>o(n,c,u,e).json(),$post:e=>o(n,c,u,e).json().then(e=>e.body),$path:()=>"".concat(n).concat(c)},get:e=>o(n,s,"GET",e).json(),$get:e=>o(n,s,"GET",e).json().then(e=>e.body),post:e=>o(n,s,u,e).send(),$post:e=>o(n,s,u,e).send().then(e=>e.body),$path:()=>"".concat(n).concat(s)},health:{get:e=>o(n,r,"GET",e).json(),$get:e=>o(n,r,"GET",e).json().then(e=>e.body),$path:()=>"".concat(n).concat(r)},image:{get:e=>o(n,l,"GET",e).text(),$get:e=>o(n,l,"GET",e).text().then(e=>e.body),post:e=>o(n,l,u,e).json(),$post:e=>o(n,l,u,e).json().then(e=>e.body),$path:()=>"".concat(n).concat(l)},me:{get:e=>o(n,"/me","GET",e).json(),$get:e=>o(n,"/me","GET",e).json().then(e=>e.body),$path:()=>"".concat(n).concat("/me")},session:{post:e=>o(n,i,u,e).json(),$post:e=>o(n,i,u,e).json().then(e=>e.body),delete:e=>o(n,i,g,e).json(),$delete:e=>o(n,i,g,e).json().then(e=>e.body),$path:()=>"".concat(n).concat(i)},tasks:{_taskId:e=>{let t="".concat(d,"/").concat(e);return{patch:e=>o(n,t,m,e).json(),$patch:e=>o(n,t,m,e).json().then(e=>e.body),delete:e=>o(n,t,g,e).json(),$delete:e=>o(n,t,g,e).json().then(e=>e.body),$path:()=>"".concat(n).concat(t)}},di:{get:e=>o(n,h,"GET",e).json(),$get:e=>o(n,h,"GET",e).json().then(e=>e.body),$path:()=>"".concat(n).concat(h)},get:e=>o(n,d,"GET",e).json(),$get:e=>o(n,d,"GET",e).json().then(e=>e.body),post:e=>o(n,d,u,e).json(),$post:e=>o(n,d,u,e).json().then(e=>e.body),patch:e=>o(n,d,m,e).json(),$patch:e=>o(n,d,m,e).json().then(e=>e.body),delete:e=>o(n,d,g,e).json(),$delete:e=>o(n,d,g,e).json().then(e=>e.body),$path:e=>"".concat(n).concat(d).concat(e&&e.query?"?".concat((0,a._K)(e.query)):"")},get:e=>o(n,"","GET",e).text(),$get:e=>o(n,"","GET",e).text().then(e=>e.body),$path:()=>"".concat(n)}})((0,n.Z)(s.Z.create({withCredentials:!0})))},1985:function(e){e.exports={imageContainer:"BokeImageCarousel_imageContainer__wG3MY",displayedImg:"BokeImageCarousel_displayedImg__UXjRD"}},1014:function(e){e.exports={headerContainer:"Header_headerContainer__4fbbd",headerTop:"Header_headerTop__PiWQz",textBottomLeft:"Header_textBottomLeft__943jk",headerBottom:"Header_headerBottom__VzkFF",link:"Header_link__p2PJz",active:"Header_active__8Eipm"}},195:function(e){e.exports={container:"create_container__X_Yqv",content:"create_content__6AfH7",bokeButton:"create_bokeButton__s5WQF",someCustomStyleForThisPage:"create_someCustomStyleForThisPage__wLaGs",imageContainer:"create_imageContainer__eAZyS",textBox:"create_textBox__yZYkI",submitButton:"create_submitButton__0sdRv"}}},function(e){e.O(0,[465,221,774,888,179],function(){return e(e.s=5619)}),_N_E=e.O()}]);