import{D as f,U as x}from"./zi9jb3lN.js";function b(o,n,a){f(()=>{var e=x(()=>n(o,a==null?void 0:a())||{});if(e!=null&&e.destroy)return()=>e.destroy()})}let t=null,s=[],r=0;function u(){if(!t||!d())return;const o=d(),n=s[r];o.src=n.src,o.alt=n.alt;const a=t.querySelector(".zoom-caption");a&&(a.textContent=n.alt);const e=t.querySelector(".zoom-counter");e&&(e.textContent=s.length>1?`${r+1} / ${s.length}`:"");const i=t.querySelector(".zoom-prev"),m=t.querySelector(".zoom-next");i&&(i.disabled=r===0),m&&(m.disabled=r===s.length-1)}function d(){return(t==null?void 0:t.querySelector(".zoom-img"))??null}function l(o){const n=r+o;n<0||n>=s.length||(r=n,u())}function c(){t&&(t.remove(),t=null,s=[],document.removeEventListener("keydown",p),document.body.style.overflow="")}function p(o){o.key==="Escape"?c():o.key==="ArrowRight"?l(1):o.key==="ArrowLeft"&&l(-1)}function z(o,n){t&&c(),s=o,r=n,t=document.createElement("div"),t.className="zoom-overlay",t.innerHTML=`
		<button type="button" class="zoom-close" aria-label="Close viewer">×</button>
		${s.length>1?'<button type="button" class="zoom-nav zoom-prev" aria-label="Previous image">←</button>':""}
		<div class="zoom-stage">
			<img class="zoom-img" alt="" />
			<p class="zoom-caption"></p>
			<p class="zoom-counter"></p>
		</div>
		${s.length>1?'<button type="button" class="zoom-nav zoom-next" aria-label="Next image">→</button>':""}
	`,document.body.appendChild(t),document.body.style.overflow="hidden",u(),requestAnimationFrame(()=>t==null?void 0:t.classList.add("open")),t.addEventListener("click",a=>{const e=a.target;e.closest(".zoom-prev")?l(-1):e.closest(".zoom-next")?l(1):(e.closest(".zoom-close")||!e.closest(".zoom-stage"))&&c()}),t.addEventListener("wheel",c,{passive:!0}),document.addEventListener("keydown",p)}function h(o,n,a){o.classList.add("zoomable");const e=i=>{i.preventDefault(),z(n,a)};return o.addEventListener("click",e),()=>{o.classList.remove("zoomable"),o.removeEventListener("click",e)}}function y(o){const n=[],a=[];return o.querySelectorAll("img").forEach(e=>{if(e.closest("a"))return;const i=n.length;n.push({src:e.currentSrc||e.src,alt:e.alt}),a.push(h(e,n,i))}),{destroy(){a.forEach(e=>e())}}}if(typeof document<"u"&&!document.getElementById("zoomable-styles")){const o=document.createElement("style");o.id="zoomable-styles",o.textContent=`
		img.zoomable { cursor: zoom-in; transition: opacity 0.15s ease; }
		img.zoomable:hover { opacity: 0.92; }
		.zoom-overlay {
			position: fixed; inset: 0; z-index: 9999;
			display: flex; align-items: center; justify-content: center;
			padding: 24px 56px;
			background: rgba(12, 12, 12, 0);
			cursor: zoom-out;
			opacity: 0;
			transition: opacity 0.2s ease, background 0.2s ease;
		}
		.zoom-overlay.open { opacity: 1; background: rgba(12, 12, 12, 0.9); }
		.zoom-stage {
			display: flex; flex-direction: column; align-items: center;
			max-width: 100%; max-height: 100%;
			cursor: default;
		}
		.zoom-stage img {
			display: block;
			max-width: 100%;
			max-height: calc(100vh - 140px);
			width: auto; height: auto;
			border-radius: 8px;
			box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
			transform: scale(0.96);
			transition: transform 0.2s ease;
		}
		.zoom-overlay.open .zoom-stage img { transform: scale(1); }
		.zoom-caption {
			margin: 12px 0 0;
			max-width: 720px;
			text-align: center;
			font-size: 13px;
			line-height: 1.5;
			color: #d8d8d8;
		}
		.zoom-counter {
			margin: 4px 0 0;
			font-size: 11.5px;
			color: #9a9a9a;
		}
		.zoom-close, .zoom-nav {
			position: absolute;
			width: 40px; height: 40px;
			border: 1px solid rgba(255, 255, 255, 0.25);
			border-radius: 999px;
			background: rgba(255, 255, 255, 0.08);
			color: #fff;
			font-size: 17px;
			line-height: 1;
			cursor: pointer;
			transition: background 0.15s ease;
		}
		.zoom-close:hover, .zoom-nav:hover { background: rgba(255, 255, 255, 0.2); }
		.zoom-close { top: 20px; right: 20px; }
		.zoom-nav { top: 50%; transform: translateY(-50%); }
		.zoom-prev { left: 16px; }
		.zoom-next { right: 16px; }
		.zoom-nav:disabled { opacity: 0.25; cursor: default; }
		@media (max-width: 620px) {
			.zoom-overlay { padding: 16px 12px; }
			.zoom-stage img { max-height: calc(100vh - 120px); }
			.zoom-nav { width: 34px; height: 34px; }
		}
	`,document.head.appendChild(o)}export{b as a,y as z};
