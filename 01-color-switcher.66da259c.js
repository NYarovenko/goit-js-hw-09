!function(){var t,e=document.querySelector("body"),n=document.querySelector("button[data-start]"),a=document.querySelector("button[data-stop]");a.disabled=!0,n.addEventListener("click",(function(){n.disabled=!0,a.disabled=!1,t=setInterval((function(){return e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),a.addEventListener("click",(function(){clearInterval(t),n.disabled=!1,a.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.66da259c.js.map