import{j as e,y as a}from"./app-CtKnWD82.js";import{A as f}from"./AgeCalculator-biJwn8o_.js";import{d as c}from"./dayjs.min-1G-GFU2b.js";import{B as d}from"./Box-BOvmemB3.js";import{T as x,a as j,b as g,c as s,d as i,e as p}from"./TableRow-D-YY9ndo.js";import{P as b}from"./Paper-vPOMgmFi.js";import{T as t}from"./Typography-BG9yfDLA.js";const m=({lastActiveAt:r})=>{const o=c(),l=c(r),h=o.diff(l,"hour")<2;return e.jsx(d,{sx:{position:"relative",width:17,height:17,border:"2px solid",borderColor:"#fff",borderRadius:"50%",bgcolor:h?"#3dc13c":"#f13637",marginRight:1},children:e.jsx("style",{children:`
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
        `})})};function u({resumes:r}){return e.jsx(x,{component:b,children:e.jsxs(j,{"aria-label":"CV table",children:[e.jsx(g,{sx:{bgcolor:"primary.main"},children:e.jsxs(s,{children:[e.jsx(i,{children:e.jsx(t,{fontWeight:"bold",color:"#fff",children:"Name"})}),e.jsx(i,{children:e.jsx(t,{fontWeight:"bold",color:"#fff",children:"Age"})}),e.jsx(i,{children:e.jsx(t,{fontWeight:"bold",color:"#fff",children:"Gender"})}),e.jsx(i,{children:e.jsx(t,{fontWeight:"bold",color:"#fff",children:"Height"})}),e.jsx(i,{children:e.jsx(t,{fontWeight:"bold",color:"#fff",children:"Weight"})}),e.jsx(i,{children:e.jsx(t,{fontWeight:"bold",color:"#fff",children:"Level"})}),e.jsx(i,{children:e.jsx(t,{textAlign:"center",fontWeight:"bold",color:"#fff",children:"Contact"})}),e.jsx(i,{children:e.jsx(t,{fontWeight:"bold",color:"#fff",children:"Status"})})]})}),e.jsx(p,{children:r.map((o,l)=>{var n;return e.jsxs(s,{onClick:()=>a.get(route("admin.cv.single",o.id)),sx:{cursor:"pointer"},children:[e.jsx(i,{children:e.jsx(t,{fontSize:13,fontWeight:"bold",children:o.full_name||"N/A"})}),e.jsx(i,{children:e.jsx(f,{date:o.date_of_birth})}),e.jsx(i,{children:e.jsx(t,{fontSize:13,color:"grey.600",children:o.gender||"N/A"})}),e.jsxs(i,{children:[o.height?parseFloat(o.height).toFixed(1):"N/A"," ","cm"]}),e.jsxs(i,{children:[o.weight?parseFloat(o.weight).toFixed(1):"N/A"," ","kg"]}),e.jsx(i,{children:e.jsx(t,{fontSize:13,color:"primary",children:o.level||"N/A"})}),e.jsx(i,{children:e.jsx(t,{fontSize:13,color:"primary",textAlign:"center",children:o.emergency_contact||"N/A"})}),e.jsx(i,{children:e.jsx(d,{display:"flex",justifyContent:"center",children:e.jsx(m,{lastActiveAt:(n=o.user)==null?void 0:n.last_active_at})})})]},l)})})]})})}export{u as A};
