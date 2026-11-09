import{D as c,U as l}from"./zi9jb3lN.js";function f(e,t,n){c(()=>{var r=l(()=>t(e,n==null?void 0:n())||{});if(r!=null&&r.destroy)return()=>r.destroy()})}let o=null,a=null;function s(){o&&(o.remove(),o=null,a=null,document.removeEventListener("keydown",i),document.body.style.overflow="")}function i(e){e.key==="Escape"&&s()}function d(e,t){o&&s(),o=document.createElement("div"),o.className="zoom-overlay",a=document.createElement("img"),a.src=e,a.alt=t,o.appendChild(a),document.body.appendChild(o),document.body.style.overflow="hidden",requestAnimationFrame(()=>o==null?void 0:o.classList.add("open")),o.addEventListener("click",s),o.addEventListener("wheel",s,{passive:!0}),document.addEventListener("keydown",i)}function m(e){if(e.closest("a"))return;e.classList.add("zoomable");const t=n=>{n.preventDefault(),d(e.currentSrc||e.src,e.alt)};return e.addEventListener("click",t),{destroy(){e.classList.remove("zoomable"),e.removeEventListener("click",t),o&&s()}}}function y(e){const t=[];return e.querySelectorAll("img").forEach(n=>{const r=m(n);r&&t.push(r.destroy)}),{destroy(){t.forEach(n=>n())}}}if(typeof document<"u"&&!document.getElementById("zoomable-styles")){const e=document.createElement("style");e.id="zoomable-styles",e.textContent=`
		img.zoomable { cursor: zoom-in; }
		.zoom-overlay {
			position: fixed; inset: 0; z-index: 9999;
			display: flex; align-items: center; justify-content: center;
			padding: 24px;
			background: rgba(12, 12, 12, 0);
			cursor: zoom-out;
			opacity: 0;
			transition: opacity 0.2s ease, background 0.2s ease;
		}
		.zoom-overlay.open { opacity: 1; background: rgba(12, 12, 12, 0.88); }
		.zoom-overlay img {
			max-width: 100%;
			max-height: 100%;
			width: auto; height: auto;
			border-radius: 8px;
			box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
			transform: scale(0.96);
			transition: transform 0.2s ease;
		}
		.zoom-overlay.open img { transform: scale(1); }
	`,document.head.appendChild(e)}export{f as a,y as z};
