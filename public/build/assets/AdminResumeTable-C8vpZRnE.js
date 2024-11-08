import{j as i,y as c}from"./app-Dl1AIzhJ.js";import{d as n,A as h}from"./AgeCalculator-BwuAc0CA.js";import{B as a}from"./Box-BFte2teP.js";import{T as f,a as x,b as j,c as s,d as e,e as g}from"./TableRow-B6ZtW1zW.js";import{P as p}from"./Modal-OivEk8zH.js";import{T as l}from"./Typography-DT8I5n2R.js";import{B as b}from"./Button-jHX_c_8F.js";const m=({lastActiveAt:r})=>{const o=n(),t=n(r),d=o.diff(t,"hour")<2;return i.jsx(a,{sx:{position:"relative",width:17,height:17,border:"2px solid",borderColor:"#fff",borderRadius:"50%",bgcolor:d?"#3dc13c":"#f13637",marginRight:1},children:i.jsx("style",{children:`
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
        `})})};function F({resumes:r}){return console.log(r),i.jsx(f,{component:p,children:i.jsxs(x,{"aria-label":"CV table",children:[i.jsx(j,{sx:{bgcolor:"primary.main"},children:i.jsxs(s,{children:[i.jsx(e,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Full Name (MDW)"})}),i.jsx(e,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Age"})}),i.jsx(e,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Gender"})}),i.jsx(e,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Height"})}),i.jsx(e,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Weight"})}),i.jsx(e,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Level"})}),i.jsx(e,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Status"})}),i.jsx(e,{children:i.jsx(l,{fontWeight:"bold",color:"#fff",children:"Operate"})})]})}),i.jsx(g,{children:r.map((o,t)=>i.jsxs(s,{children:[i.jsx(e,{children:i.jsx("strong",{children:o.full_name||"N/A"})}),i.jsx(e,{children:i.jsx(h,{date:o.date_of_birth})}),i.jsx(e,{children:i.jsx(l,{fontSize:13,color:"grey.600",children:o.gender||"N/A"})}),i.jsxs(e,{children:[o.height?parseFloat(o.height).toFixed(1):"N/A"," ","cm"]}),i.jsxs(e,{children:[o.weight?parseFloat(o.weight).toFixed(1):"N/A"," ","kg"]}),i.jsx(e,{children:i.jsx(l,{fontSize:13,color:"primary",children:o.level||"N/A"})}),i.jsx(e,{children:i.jsx(m,{lastActiveAt:o.user.last_active_at})}),i.jsx(e,{children:i.jsx(b,{variant:"outlined",size:"small",onClick:()=>c.get(route("admin.cv.single",o.id)),children:"Detail"})})]},t))})]})})}export{F as A};
