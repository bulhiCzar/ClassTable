(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{2:function(t,e,n){t.exports={blockContentForm:"BlockContentItem_blockContentForm__XLTHm",blockContentFormInput:"BlockContentItem_blockContentFormInput__1xtKG",blockContentFormSubmit:"BlockContentItem_blockContentFormSubmit__7yusu",blockContentRadio:"BlockContentItem_blockContentRadio__3gkXq",blockContentRadioItem:"BlockContentItem_blockContentRadioItem__jShvx",blockContentRadioActive:"BlockContentItem_blockContentRadioActive__2YJLX",mt:"BlockContentItem_mt__3smFY",activeInput:"BlockContentItem_activeInput__3UsTb",blockContentFormInputDiv:"BlockContentItem_blockContentFormInputDiv__327w7",divclass:"BlockContentItem_divclass__1HCiG",oneclass:"BlockContentItem_oneclass__3IB55",twoclass:"BlockContentItem_twoclass__cNR20"}},26:function(t,e,n){},27:function(t,e,n){},36:function(t,e,n){"use strict";n.r(e);var c=n(1),o=n(0),a=n.n(o),s=n(4),i=n.n(s),l=(n(26),n(27),n(8)),r=n(6),u=n.n(r),b=n(9),m=n.n(b),p=function(t){var e=function(t){if(t.target.firstChild){var e=t.pageX-t.target.offsetLeft,n=t.pageY-t.target.offsetTop;t.target.firstChild.setAttribute("style","top: ".concat(n,"px; left: ").concat(e,"px"))}};return"\u0412\u0445\u043e\u0434"===t.text?Object(c.jsxs)("div",{className:"".concat(m.a.blockSwitchItem," ").concat(t.switchBtn?m.a.blockSwitchItemActive:void 0),onMouseEnter:e,onMouseOut:e,onClick:function(){t.setSwitchBtn(!0)},children:[Object(c.jsx)("span",{}),Object(c.jsx)("p",{children:t.text})]}):Object(c.jsxs)("div",{className:"".concat(m.a.blockSwitchItem," ").concat(t.switchBtn?void 0:m.a.blockSwitchItemActive),onMouseEnter:e,onMouseOut:e,onClick:function(){t.setSwitchBtn(!1)},children:[Object(c.jsx)("span",{}),Object(c.jsx)("p",{children:t.text})]})},d=n(5),h=n.n(d),j=n(11),k=n(12),C=n(10),v=n(2),_=n.n(v),x=n(13),O=function(t){var e=Object(o.useState)(!1),n=Object(l.a)(e,2),a=n[0],s=n[1],i=Object(o.useState)({login:"",password:"",email:"",teacher:""}),r=Object(l.a)(i,2),u=r[0],b=r[1],m={request:Object(o.useCallback)(function(){var t=Object(j.a)(h.a.mark((function t(e){var n,c,o,a,s,i=arguments;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=i.length>1&&void 0!==i[1]?i[1]:"GET",c=i.length>2?i[2]:void 0,o=i.length>3?i[3]:void 0,t.prev=3,c=JSON.stringify(c),o={"Content-Type":"application/json"},t.next=8,fetch(e,{method:n,body:c,headers:o});case 8:return a=t.sent,t.next=11,a.json();case 11:return s=t.sent,t.abrupt("return",s);case 15:throw t.prev=15,t.t0=t.catch(3),t.t0;case 18:case"end":return t.stop()}}),t,null,[[3,15]])})));return function(e){return t.apply(this,arguments)}}(),[])}.request,p=function(t){var e=Object(x.useToasts)().addToast;return{setToast:function(t){console.log(t),e(t.content,{content:t.m,appearance:t.type,autoDismiss:!0})}}}().setToast,d=function(t){console.log(t.target.name),b(Object(C.a)(Object(C.a)({},u),{},Object(k.a)({},t.target.name,t.target.value))),console.log(u)},v=function(){var t=Object(j.a)(h.a.mark((function t(e){var n,c,o;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.preventDefault(),n={login:u.login,password:u.password},"login"!==e.target.dataset.info){t.next=9;break}return t.next=5,m("https://classtable.herokuapp.com/api/auth/login","POST",n);case 5:c=t.sent,p(c),t.next=15;break;case 9:if("register"!==e.target.dataset.info){t.next=15;break}return n=Object(C.a)(Object(C.a)({},n),{},{email:u.email,teacher:u.teacher,role:a}),t.next=13,m("https://classtable.herokuapp.com/api/auth/register","POST",n);case 13:o=t.sent,p(o);case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return t.switchBtn?Object(c.jsx)("div",{className:_.a.blockContentItem,children:Object(c.jsxs)("form",{onSubmit:v,"data-info":"login",className:_.a.blockContentForm,children:[Object(c.jsx)("input",{type:"text",placeholder:"Login",name:"login",onChange:d,value:u.login,className:_.a.blockContentFormInput}),Object(c.jsx)("input",{type:"password",placeholder:"Password",name:"password",onChange:d,value:u.password,className:_.a.blockContentFormInput}),Object(c.jsx)("input",{type:"submit",value:"\u0412\u043e\u0439\u0442\u0438",className:_.a.blockContentFormSubmit+" "+_.a.mt})]})}):Object(c.jsx)("div",{className:_.a.blockContentItem,children:Object(c.jsxs)("form",{onSubmit:v,"data-info":"register",className:_.a.blockContentForm,children:[Object(c.jsx)("input",{type:"text",placeholder:"Login",name:"login",className:_.a.blockContentFormInput,onChange:d,value:u.login}),Object(c.jsx)("input",{type:"email",placeholder:"Email",name:"email",onChange:d,value:u.email,className:_.a.blockContentFormInput}),Object(c.jsx)("input",{type:"password",placeholder:"Password",name:"password",onChange:d,value:u.password,className:_.a.blockContentFormInput}),Object(c.jsxs)("div",{className:_.a.blockContentRadio,children:[Object(c.jsx)("div",{className:"".concat(_.a.blockContentRadioItem," ").concat(a?null:_.a.blockContentRadioActive),onClick:function(){s(!1)},children:"\u042f \u0423\u0447\u0435\u043d\u0438\u043a"}),Object(c.jsx)("div",{className:"".concat(_.a.blockContentRadioItem," ").concat(a?_.a.blockContentRadioActive:null),onClick:function(){s(!0)},children:"\u042f \u0423\u0447\u0438\u0442\u0435\u043b\u044c"})]}),Object(c.jsx)("div",{className:"".concat(_.a.divclass," ").concat(_.a.oneclass," ").concat(a?null:_.a.twoclass),children:Object(c.jsx)("input",{type:"text",placeholder:"\u0412\u0430\u0448 \u0443\u0447\u0438\u0442\u0435\u043b\u044c",name:"teacher",onChange:d,value:u.teacher,className:"".concat(_.a.blockContentFormInput," ").concat(_.a.blockContentFormInputDiv)})}),Object(c.jsx)("input",{type:"submit",value:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f",className:_.a.blockContentFormSubmit})]})})},f=function(){var t=Object(o.useState)(!0),e=Object(l.a)(t,2),n=e[0],a=e[1];return Object(c.jsx)("div",{className:u.a.wrapper,children:Object(c.jsx)("div",{className:u.a.block__wrapper,children:Object(c.jsxs)("div",{className:u.a.block,children:[Object(c.jsx)("div",{className:u.a.blockSwitch,children:["\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f","\u0412\u0445\u043e\u0434"].map((function(t){return Object(c.jsx)(p,{text:t,setSwitchBtn:a,switchBtn:n})}))}),Object(c.jsx)("div",{className:u.a.blockContent,children:Object(c.jsx)(O,{switchBtn:n})})]})})})};var g=function(){return Object(c.jsx)(x.ToastProvider,{children:Object(c.jsx)("div",{className:"wrapper_app",children:Object(c.jsx)(f,{})})})},w=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,37)).then((function(e){var n=e.getCLS,c=e.getFID,o=e.getFCP,a=e.getLCP,s=e.getTTFB;n(t),c(t),o(t),a(t),s(t)}))};i.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(g,{})}),document.getElementById("root")),w()},6:function(t,e,n){t.exports={wrapper:"AuthPage_wrapper__3snTh",block__wrapper:"AuthPage_block__wrapper__3CjBi",block:"AuthPage_block__19XNb",blockSwitch:"AuthPage_blockSwitch__xVUgH"}},9:function(t,e,n){t.exports={blockSwitchItem:"SwitchItem_blockSwitchItem__iChdE",blockSwitchItemActive:"SwitchItem_blockSwitchItemActive__be33s"}}},[[36,1,2]]]);
//# sourceMappingURL=main.d3372919.chunk.js.map