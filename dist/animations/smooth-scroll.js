"use strict";(()=>{var Z=Object.defineProperty;var J=(n,t,e)=>t in n?Z(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var v=(n,t,e)=>(J(n,typeof t!="symbol"?t+"":t,e),e);var Q=()=>typeof document<"u";function tt(){return navigator.userAgentData?.platform??navigator.platform}var et=n=>Q()&&n.test(tt());var B=()=>et(/iP(hone|ad|od)|iOS/);var ct=1e3/60;var C="data-zag-scroll-lock";function K(n,t){if(!n)return;let e=n.style.cssText;return Object.assign(n.style,t),()=>{n.style.cssText=e}}function it(n,t,e){if(!n)return;let i=n.style.getPropertyValue(t);return n.style.setProperty(t,e),()=>{i?n.style.setProperty(t,i):n.style.removeProperty(t)}}function nt(n){let t=n.getBoundingClientRect().left;return Math.round(t)+n.scrollLeft?"paddingLeft":"paddingRight"}function W(n){let t=n??document,e=t.defaultView??window,{documentElement:i,body:s}=t;if(s.hasAttribute(C))return;s.setAttribute(C,"");let r=e.innerWidth-i.clientWidth,o=()=>it(i,"--scrollbar-width",`${r}px`),a=nt(i),u=()=>K(s,{overflow:"hidden",[a]:`${r}px`}),g=()=>{let{scrollX:y,scrollY:c,visualViewport:d}=e,w=d?.offsetLeft??0,T=d?.offsetTop??0,x=K(s,{position:"fixed",overflow:"hidden",top:`${-(c-Math.floor(T))}px`,left:`${-(y-Math.floor(w))}px`,right:"0",[a]:`${r}px`});return()=>{x?.(),e.scrollTo({left:y,top:c,behavior:"instant"})}},h=[o(),B()?g():u()];return()=>{h.forEach(y=>y?.()),s.removeAttribute(C)}}function X(n,t,e){return Math.max(n,Math.min(t,e))}var I=class{advance(t){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=t;let i=X(0,this.currentTime/this.duration,1);e=i>=1;let s=e?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=function(s,l,r,o){return function(u,g,h){return(1-h)*u+h*g}(s,l,1-Math.exp(-r*o))}(this.value,this.to,60*this.lerp,t),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i,duration:s,easing:l,onStart:r,onUpdate:o}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=l,this.currentTime=0,this.isRunning=!0,r?.(),this.onUpdate=o}},k=class{constructor({wrapper:t,content:e,autoResize:i=!0,debounce:s=250}={}){v(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});v(this,"onWrapperResize",()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});v(this,"onContentResize",()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=t,this.content=e,i&&(this.debouncedResize=function(r,o){let a;return function(){let u=arguments,g=this;clearTimeout(a),a=setTimeout(function(){r.apply(g,u)},o)}}(this.resize,s),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},N=class{constructor(){this.events={}}emit(t,...e){let i=this.events[t]||[];for(let s=0,l=i.length;s<l;s++)i[s](...e)}on(t,e){return this.events[t]?.push(e)||(this.events[t]=[e]),()=>{this.events[t]=this.events[t]?.filter(i=>e!==i)}}off(t,e){this.events[t]=this.events[t]?.filter(i=>e!==i)}destroy(){this.events={}}},q=100/6,H=class{constructor(t,{wheelMultiplier:e=1,touchMultiplier:i=1}){v(this,"onTouchStart",t=>{let{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})});v(this,"onTouchMove",t=>{let{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.touchMultiplier,l=-(i-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:s,y:l},this.emitter.emit("scroll",{deltaX:s,deltaY:l,event:t})});v(this,"onTouchEnd",t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})});v(this,"onWheel",t=>{let{deltaX:e,deltaY:i,deltaMode:s}=t;e*=s===1?q:s===2?this.windowWidth:1,i*=s===1?q:s===2?this.windowHeight:1,e*=this.wheelMultiplier,i*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:t})});v(this,"onWindowResize",()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight});this.element=t,this.wheelMultiplier=e,this.touchMultiplier=i,this.touchStart={x:null,y:null},this.emitter=new N,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}},M=class{constructor({wrapper:t=window,content:e=document.documentElement,wheelEventsTarget:i=t,eventsTarget:s=i,smoothWheel:l=!0,syncTouch:r=!1,syncTouchLerp:o=.075,touchInertiaMultiplier:a=35,duration:u,easing:g=p=>Math.min(1,1.001-Math.pow(2,-10*p)),lerp:h=.1,infinite:y=!1,orientation:c="vertical",gestureOrientation:d="vertical",touchMultiplier:w=1,wheelMultiplier:T=1,autoResize:x=!0,prevent:U=!1,__experimental__naiveDimensions:Y=!1}={}){this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.direction=0,this.onVirtualScroll=({deltaX:p,deltaY:b,event:f})=>{if(f.ctrlKey)return;let S=f.type.includes("touch"),P=f.type.includes("wheel");if(this.isTouching=f.type==="touchstart"||f.type==="touchmove",this.options.syncTouch&&S&&f.type==="touchstart"&&!this.isStopped&&!this.isLocked)return void this.reset();let j=p===0&&b===0,$=this.options.gestureOrientation==="vertical"&&b===0||this.options.gestureOrientation==="horizontal"&&p===0;if(j||$)return;let L=f.composedPath();L=L.slice(0,L.indexOf(this.rootElement));let A=this.options.prevent;if(L.find(m=>{var _,z,O,D,V;return m instanceof Element&&((typeof A=="function"?A?.(m):A)||((_=m.hasAttribute)===null||_===void 0?void 0:_.call(m,"data-lenis-prevent"))||S&&((z=m.hasAttribute)===null||z===void 0?void 0:z.call(m,"data-lenis-prevent-touch"))||P&&((O=m.hasAttribute)===null||O===void 0?void 0:O.call(m,"data-lenis-prevent-wheel"))||((D=m.classList)===null||D===void 0?void 0:D.contains("lenis"))&&!(!((V=m.classList)===null||V===void 0)&&V.contains("lenis-stopped")))}))return;if(this.isStopped||this.isLocked)return void f.preventDefault();if(!(this.options.syncTouch&&S||this.options.smoothWheel&&P))return this.isScrolling="native",void this.animate.stop();f.preventDefault();let E=b;this.options.gestureOrientation==="both"?E=Math.abs(b)>Math.abs(p)?b:p:this.options.gestureOrientation==="horizontal"&&(E=p);let G=S&&this.options.syncTouch,F=S&&f.type==="touchend"&&Math.abs(E)>5;F&&(E=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+E,Object.assign({programmatic:!1},G?{lerp:F?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(clearTimeout(this.__resetVelocityTimeout),delete this.__resetVelocityTimeout,this.__preventNextNativeScrollEvent)delete this.__preventNextNativeScrollEvent;else if(this.isScrolling===!1||this.isScrolling==="native"){let p=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-p,this.direction=Math.sign(this.animatedScroll-p),this.isScrolling="native",this.emit(),this.velocity!==0&&(this.__resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}},window.lenisVersion="1.1.3",t&&t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:e,wheelEventsTarget:i,eventsTarget:s,smoothWheel:l,syncTouch:r,syncTouchLerp:o,touchInertiaMultiplier:a,duration:u,easing:g,lerp:h,infinite:y,gestureOrientation:d,orientation:c,touchMultiplier:w,wheelMultiplier:T,autoResize:x,prevent:U,__experimental__naiveDimensions:Y},this.animate=new I,this.emitter=new N,this.dimensions=new k({wrapper:t,content:e,autoResize:x}),this.updateClassName(),this.userData={},this.time=0,this.velocity=this.lastVelocity=0,this.isLocked=!1,this.isStopped=!1,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new H(s,{touchMultiplier:w,wheelMultiplier:T}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName()}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(t){let e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(t,{offset:e=0,immediate:i=!1,lock:s=!1,duration:l=this.options.duration,easing:r=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:u,force:g=!1,programmatic:h=!0,userData:y={}}={}){if(!this.isStopped&&!this.isLocked||g){if(typeof t=="string"&&["top","left","start"].includes(t))t=0;else if(typeof t=="string"&&["bottom","right","end"].includes(t))t=this.limit;else{let c;if(typeof t=="string"?c=document.querySelector(t):t instanceof HTMLElement&&t?.nodeType&&(c=t),c){if(this.options.wrapper!==window){let w=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?w.left:w.top}let d=c.getBoundingClientRect();t=(this.isHorizontal?d.left:d.top)+this.animatedScroll}}if(typeof t=="number"&&(t+=e,t=Math.round(t),this.options.infinite?h&&(this.targetScroll=this.animatedScroll=this.scroll):t=X(0,t,this.limit),t!==this.targetScroll)){if(this.userData=y,i)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),u?.(this),void(this.userData={});h||(this.targetScroll=t),this.animate.fromTo(this.animatedScroll,t,{duration:l,easing:r,lerp:o,onStart:()=>{s&&(this.isLocked=!0),this.isScrolling="smooth",a?.(this)},onUpdate:(c,d)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=c-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=c,this.setScroll(this.scroll),h&&(this.targetScroll=c),d||this.emit(),d&&(this.reset(),this.emit(),u?.(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this.__preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextNativeScrollEvent})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?function(e,i){return(e%i+i)%i}(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.updateClassName())}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.updateClassName())}get isLocked(){return this.__isLocked}set isLocked(t){this.__isLocked!==t&&(this.__isLocked=t,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isScrolling==="smooth"&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};var R={revealType:"[data-reveal-type]",revealParent:"[data-reveal-parent]",toggleScroll:"[data-toggle-scroll]",startScroll:"[data-start-scroll]",stopScroll:"[data-stop-scroll]",resetAnimation:"[data-reset-animation]"},st=["chars","words","lines"],mt=new Set(st),ot=["from-top","from-bottom","from-left-bottom","fade-from-bottom-left"],gt=new Set(ot),rt=["power1","power1.in","power1.out","power1.inOut","power2","power2.in","power2.out","power2.inOut","power3","power3.in","power3.out","power3.inOut","power4","power4.in","power4.out","power4.inOut","back","back.in","back.out","back.inOut","bounce","bounce.in","bounce.out","bounce.inOut","circ","circ.in","circ.out","circ.inOut","elastic","elastic.in","elastic.out","elastic.inOut","expo","expo.in","expo.out","expo.inOut","sine","sine.in","sine.out","sine.inOut"],vt=new Set(rt);var lt=()=>{if(document.body.dataset.noSmoothScroll!==void 0)return;let n=()=>new M({lerp:.1,wheelMultiplier:.7,gestureOrientation:"vertical"}),t=n();function e(o){t.raf(o),requestAnimationFrame(e)}requestAnimationFrame(e);let i=[...document.querySelectorAll(R.toggleScroll)],s=[...document.querySelectorAll(R.startScroll)],l=[...document.querySelectorAll(R.stopScroll)],r;for(let o=0;o<i.length;o++){let a=i[o];a.addEventListener("click",()=>{if(a.classList.contains("stop-scroll")){r?.(),t=n(),a.classList.remove("stop-scroll");return}r=W(),t.destroy(),a.classList.add("stop-scroll")})}for(let o of s)o.addEventListener("click",()=>{t=n(),r?.()});for(let o of l)o.addEventListener("click",()=>{t.destroy(),r=W()})};lt();})();
