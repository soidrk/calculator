(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1880],{2985:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/recommendations",function(){return n(4865)}])},4865:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o});var i=n(4848),s=n(6540);function o(){let[e,t]=(0,s.useState)([]),[n,o]=(0,s.useState)(""),[r,l]=(0,s.useState)(""),[c,d]=(0,s.useState)(""),[m,h]=(0,s.useState)(!1);async function p(){let e=await fetch("/api/recommendations");t(await e.json())}async function u(){n.trim()&&r.trim()&&(await fetch("/api/recommendations",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:n,content:r})})).ok&&(await p(),o(""),l(""))}return(0,s.useEffect)(()=>{p()},[]),(0,i.jsxs)("div",{style:{maxWidth:"800px",margin:"20px auto",fontFamily:"sans-serif"},children:[(0,i.jsx)("h2",{children:"Recommendations Forum"}),(0,i.jsxs)("div",{style:{marginBottom:"1em"},children:[(0,i.jsx)("p",{children:"Post your recommendations or feature requests. You can also reply to posts."}),!m&&(0,i.jsxs)("div",{children:[(0,i.jsx)("input",{type:"text",value:c,onChange:e=>d(e.target.value),placeholder:"Enter owner code for admin...",style:{marginRight:"0.5em"}}),(0,i.jsx)("button",{onClick:function(){"ownerpermis"===c&&h(!0),d("")},children:"Submit"})]}),m&&(0,i.jsx)("p",{style:{color:"green"},children:"Owner mode enabled!"})]}),(0,i.jsxs)("div",{style:{border:"1px solid #ccc",padding:"10px",marginBottom:"1em"},children:[(0,i.jsx)("h3",{children:"Create a New Recommendation"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{children:"Title:"}),(0,i.jsx)("input",{type:"text",style:{width:"100%",marginBottom:"0.5em"},value:n,onChange:e=>o(e.target.value)})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{children:"Content:"}),(0,i.jsx)("textarea",{rows:3,style:{width:"100%",marginBottom:"0.5em"},value:r,onChange:e=>l(e.target.value)})]}),(0,i.jsx)("button",{onClick:u,children:"Post Recommendation"})]}),(0,i.jsxs)("div",{children:[0===e.length&&(0,i.jsx)("p",{children:"No recommendations yet. Be the first to post!"}),e.map(e=>(0,i.jsx)(a,{recommendation:e,isOwner:m,refresh:p},e.id))]})]})}function a(e){let{recommendation:t,isOwner:n,refresh:o}=e,[a,r]=(0,s.useState)("");async function l(){a.trim()&&(await fetch("/api/recommendations/".concat(t.id,"/reply"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:a})}),r(""),o())}async function c(e){await fetch("/api/recommendations/".concat(t.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e})}),o()}async function d(){await fetch("/api/recommendations/".concat(t.id),{method:"DELETE"}),o()}return(0,i.jsxs)("div",{style:{border:"1px solid #ddd",padding:"10px",marginBottom:"1em"},children:[(0,i.jsxs)("h4",{children:[t.title," ",(0,i.jsxs)("span",{style:{fontSize:"0.8em",color:"#999"},children:["(",t.status,")"]})]}),(0,i.jsx)("p",{style:{whiteSpace:"pre-wrap"},children:t.content}),n&&(0,i.jsxs)("div",{style:{marginBottom:"0.5em"},children:[(0,i.jsx)("button",{onClick:()=>c("accepted"),style:{marginRight:"0.5em"},children:"Accept"}),(0,i.jsx)("button",{onClick:()=>c("declined"),style:{marginRight:"0.5em"},children:"Decline"}),(0,i.jsx)("button",{onClick:d,children:"Delete"})]}),(0,i.jsxs)("div",{style:{marginLeft:"1em",borderLeft:"2px solid #eee",paddingLeft:"1em"},children:[(0,i.jsx)("h5",{children:"Replies:"}),0===t.replies.length&&(0,i.jsx)("p",{style:{fontStyle:"italic",color:"#666"},children:"No replies yet."}),t.replies.map(e=>(0,i.jsx)("div",{style:{marginBottom:"0.5em"},children:(0,i.jsx)("p",{style:{margin:0},children:e.content})},e.id))]}),(0,i.jsxs)("div",{style:{marginTop:"0.5em"},children:[(0,i.jsx)("textarea",{rows:2,style:{width:"100%",marginBottom:"0.5em"},placeholder:"Write a reply...",value:a,onChange:e=>r(e.target.value)}),(0,i.jsx)("button",{onClick:l,children:"Post Reply"})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[636,6593,8792],()=>t(2985)),_N_E=e.O()}]);