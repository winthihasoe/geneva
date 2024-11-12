import{j as i,y as c}from"./app-QD3O8TAM.js";import{A as h}from"./AgeCalculator-nw6mVi7O.js";import{d as n}from"./dayjs.min-BtImy8Tu.js";import{B as a}from"./Box-Cv49wZ14.js";import{T as f,a as x,b as j,c as s,d as o,e as p}from"./TableRow-CFcEsNv1.js";import{P as g}from"./Paper-DbEyy21H.js";import{T as l}from"./Typography-DKLuvGpp.js";import{B as b}from"./Button-5u7tx7jG.js";const m=({lastActiveAt:r})=>{const e=n(),t=n(r),d=e.diff(t,"hour")<2;return i.jsx(a,{sx:{position:"relative",width:17,height:17,border:"2px solid",borderColor:"#fff",borderRadius:"50%",bgcolor:d?"#3dc13c":"#f13637",marginRight:1},children:i.jsx("style",{children:`
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
        `})})};function N({resumes:r}){return console.log(r),i.jsx(f,{component:g,children:i.jsxs(x,{"aria-label":"CV table",children:[i.jsx(j,{sx:{bgcolor:"primary.main"},children:i.jsxs(s,{children:[i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Full Name (MDW)"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Age"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Gender"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Height"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Weight"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Level"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Status"})}),i.jsx(o,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Operate"})})]})}),i.jsx(p,{children:r.map((e,t)=>i.jsxs(s,{children:[i.jsx(o,{children:i.jsx("strong",{children:e.full_name||"N/A"})}),i.jsx(o,{children:i.jsx(h,{date:e.date_of_birth})}),i.jsx(o,{children:i.jsx(l,{fontSize:13,color:"grey.600",children:e.gender||"N/A"})}),i.jsxs(o,{children:[e.height?parseFloat(e.height).toFixed(1):"N/A"," ","cm"]}),i.jsxs(o,{children:[e.weight?parseFloat(e.weight).toFixed(1):"N/A"," ","kg"]}),i.jsx(o,{children:i.jsx(l,{fontSize:13,color:"primary",children:e.level||"N/A"})}),i.jsx(o,{children:i.jsx(m,{lastActiveAt:e.user.last_active_at})}),i.jsx(o,{children:i.jsx(b,{variant:"outlined",size:"small",onClick:()=>c.get(route("admin.cv.single",e.id)),children:"Detail"})})]},t))})]})})}export{N as A};
