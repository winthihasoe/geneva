import{j as i,y as h}from"./app-BiAKKDm0.js";import{A as a}from"./AgeCalculator-D2fv0StB.js";import{d as s}from"./dayjs.min-CkoPK6Tq.js";import{B as f}from"./Box-D_9raCmS.js";import{T as x,a as j,b as p,c as d,d as o,e as g}from"./TableRow-BNRB8fhH.js";import{P as b}from"./Paper-sNW63b8L.js";import{T as l}from"./Typography-CAGx2LiI.js";import{B as m}from"./Button-BOpSC6Gn.js";const y=({lastActiveAt:r})=>{const e=s(),t=s(r),c=e.diff(t,"hour")<2;return i.jsx(f,{sx:{position:"relative",width:17,height:17,border:"2px solid",borderColor:"#fff",borderRadius:"50%",bgcolor:c?"#3dc13c":"#f13637",marginRight:1},children:i.jsx("style",{children:`
        @keyframes ripple {
            0% {
                width: 10px;
                height: 10px;
                opacity: 1;
            }
            70% {
                width: 24px;
                height: 24px;
                opacity: 0.3;  // Smooth fading
            }
            100% {
                width: 24px;
                height: 24px;
                opacity: 0;  // Fully transparent at end
            }
        }
        `})})};function N({resumes:r}){return console.log(r),i.jsx(x,{component:b,children:i.jsxs(j,{"aria-label":"CV table",children:[i.jsx(p,{sx:{bgcolor:"primary.main"},children:i.jsxs(d,{children:[i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Full Name (MDW)"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Age"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Gender"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Height"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Weight"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Level"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Status"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Operate"})})]})}),i.jsx(g,{children:r.map((e,t)=>{var n;return i.jsxs(d,{children:[i.jsx(o,{children:i.jsx("strong",{children:e.full_name||"N/A"})}),i.jsx(o,{children:i.jsx(a,{date:e.date_of_birth})}),i.jsx(o,{children:i.jsx(l,{fontSize:13,color:"grey.600",children:e.gender||"N/A"})}),i.jsxs(o,{children:[e.height?parseFloat(e.height).toFixed(1):"N/A"," ","cm"]}),i.jsxs(o,{children:[e.weight?parseFloat(e.weight).toFixed(1):"N/A"," ","kg"]}),i.jsx(o,{children:i.jsx(l,{fontSize:13,color:"primary",children:e.level||"N/A"})}),i.jsx(o,{children:i.jsx(y,{lastActiveAt:(n=e.user)==null?void 0:n.last_active_at})}),i.jsx(o,{children:i.jsx(m,{variant:"outlined",size:"small",onClick:()=>h.get(route("admin.cv.single",e.id)),children:"Detail"})})]},t)})})]})})}export{N as A};
