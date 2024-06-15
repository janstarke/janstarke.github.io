"use strict";(self.webpackChunkjanstarke_blog=self.webpackChunkjanstarke_blog||[]).push([[2551],{1865:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>l,frontMatter:()=>r,metadata:()=>i,toc:()=>p});var s=a(5893),n=a(1151);const r={layout:"post",title:"Pairing based cryptography in Rust",date:new Date("2021-02-13T00:00:00.000Z"),categories:"rust crypto",authors:["jasa"]},o=void 0,i={permalink:"/blog/2021/02/13/Pairing_based_cryptography_in_Rust",source:"@site/blog/2021-02-13-Pairing_based_cryptography_in_Rust.mdx",title:"Pairing based cryptography in Rust",description:"Because I was was fed up with catching memory issues in the legacy PBC code, I decided to reimplement the PBC library using Rust. You can watch my progress at https://github.com/teeshop/pbc4rust.",date:"2021-02-13T00:00:00.000Z",tags:[],readingTime:.775,hasTruncateMarker:!1,authors:[{name:"Jan Starke",title:"Senior Forensic Analyst",url:"https://github.com/janstarke",imageURL:"https://github.com/janstarke.png",key:"jasa"}],frontMatter:{layout:"post",title:"Pairing based cryptography in Rust",date:"2021-02-13T00:00:00.000Z",categories:"rust crypto",authors:["jasa"]},unlisted:!1,prevItem:{title:"DoSing TLS endpoints",permalink:"/blog/2021/03/25/DoSing-TLS-endpoints"},nextItem:{title:"Using Pairing-based cryptography in Java",permalink:"/blog/2021/02/05/Using_pairing_based_cryptography_in_Java"}},c={authorsImageUrls:[void 0]},p=[];function u(t){const e={a:"a",code:"code",p:"p",pre:"pre",...(0,n.a)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(e.p,{children:["Because I was was fed up with catching memory issues in the legacy PBC code, I decided to reimplement the PBC library using Rust. You can watch my progress at ",(0,s.jsx)(e.a,{href:"https://github.com/teeshop/pbc4rust",children:"https://github.com/teeshop/pbc4rust"}),"."]}),"\n",(0,s.jsx)(e.p,{children:"By the way, I like the concept of traits. This enables me to rely on the rules of universal algebra. So, my first unit tests look like this:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-rust",children:"#[test]\nfn test_z_add_zero() {\n    let a: Z = Z::from(12345 as i32);\n    assert_eq!(&a + &Z::zero(), a);\n    assert_eq!(&Z::zero() + &a, a);\n}\n\n#[test]\nfn test_z_add_commutativity() {\n    let a: Z = Z::from(12345 as i32);\n    let c: Z = Z::from(6789 as i32);\n    assert_eq!(&a + &c, &c + &a);\n}\n\n#[test]\nfn test_z_add_associativity() {\n    let a: Z = Z::from(1234 as i32);\n    let b: Z = Z::from(3456 as i32);\n    let c: Z = Z::from(91 as i32);\n    let d: Z = Z::from(1234 + 3456 + 91 as i32);\n    assert_eq!(&a + &(&b + &c), d);\n    assert_eq!(&(&a + &b) + &c, d);\n}\n"})})]})}function l(t={}){const{wrapper:e}={...(0,n.a)(),...t.components};return e?(0,s.jsx)(e,{...t,children:(0,s.jsx)(u,{...t})}):u(t)}},1151:(t,e,a)=>{a.d(e,{Z:()=>i,a:()=>o});var s=a(7294);const n={},r=s.createContext(n);function o(t){const e=s.useContext(r);return s.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function i(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(n):t.components||n:o(t.components),s.createElement(r.Provider,{value:e},t.children)}}}]);