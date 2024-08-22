"use strict";(()=>{var et=Object.defineProperty;var it=(i,t,e)=>t in i?et(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var v=(i,t,e)=>(it(i,typeof t!="symbol"?t+"":t,e),e);var nt=()=>typeof document<"u";function st(){return navigator.userAgentData?.platform??navigator.platform}var ot=i=>nt()&&i.test(st());var q=()=>ot(/iP(hone|ad|od)|iOS/);var ft=1e3/60;var I="data-zag-scroll-lock";function X(i,t){if(!i)return;let e=i.style.cssText;return Object.assign(i.style,t),()=>{i.style.cssText=e}}function rt(i,t,e){if(!i)return;let n=i.style.getPropertyValue(t);return i.style.setProperty(t,e),()=>{n?i.style.setProperty(t,n):i.style.removeProperty(t)}}function lt(i){let t=i.getBoundingClientRect().left;return Math.round(t)+i.scrollLeft?"paddingLeft":"paddingRight"}function k(i){let t=i??document,e=t.defaultView??window,{documentElement:n,body:s}=t;if(s.hasAttribute(I))return;s.setAttribute(I,"");let r=e.innerWidth-n.clientWidth,c=()=>rt(n,"--scrollbar-width",`${r}px`),u=lt(n),a=()=>X(s,{overflow:"hidden",[u]:`${r}px`}),g=()=>{let{scrollX:y,scrollY:l,visualViewport:d}=e,w=d?.offsetLeft??0,x=d?.offsetTop??0,L=X(s,{position:"fixed",overflow:"hidden",top:`${-(l-Math.floor(x))}px`,left:`${-(y-Math.floor(w))}px`,right:"0",[u]:`${r}px`});return()=>{L?.(),e.scrollTo({left:y,top:l,behavior:"instant"})}},h=[c(),q()?g():a()];return()=>{h.forEach(y=>y?.()),s.removeAttribute(I)}}function Y(i,t,e){return Math.max(i,Math.min(t,e))}var H=class{advance(t){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=t;let n=Y(0,this.currentTime/this.duration,1);e=n>=1;let s=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=function(s,o,r,c){return function(a,g,h){return(1-h)*a+h*g}(s,o,1-Math.exp(-r*c))}(this.value,this.to,60*this.lerp,t),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:n,duration:s,easing:o,onStart:r,onUpdate:c}){this.from=this.value=t,this.to=e,this.lerp=n,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,r?.(),this.onUpdate=c}},P=class{constructor({wrapper:t,content:e,autoResize:n=!0,debounce:s=250}={}){v(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});v(this,"onWrapperResize",()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});v(this,"onContentResize",()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=t,this.content=e,n&&(this.debouncedResize=function(r,c){let u;return function(){let a=arguments,g=this;clearTimeout(u),u=setTimeout(function(){r.apply(g,a)},c)}}(this.resize,s),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},M=class{constructor(){this.events={}}emit(t,...e){let n=this.events[t]||[];for(let s=0,o=n.length;s<o;s++)n[s](...e)}on(t,e){return this.events[t]?.push(e)||(this.events[t]=[e]),()=>{this.events[t]=this.events[t]?.filter(n=>e!==n)}}off(t,e){this.events[t]=this.events[t]?.filter(n=>e!==n)}destroy(){this.events={}}},U=100/6,F=class{constructor(t,{wheelMultiplier:e=1,touchMultiplier:n=1}){v(this,"onTouchStart",t=>{let{clientX:e,clientY:n}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})});v(this,"onTouchMove",t=>{let{clientX:e,clientY:n}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.touchMultiplier,o=-(n-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=e,this.touchStart.y=n,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})});v(this,"onTouchEnd",t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})});v(this,"onWheel",t=>{let{deltaX:e,deltaY:n,deltaMode:s}=t;e*=s===1?U:s===2?this.windowWidth:1,n*=s===1?U:s===2?this.windowHeight:1,e*=this.wheelMultiplier,n*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:n,event:t})});v(this,"onWindowResize",()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight});this.element=t,this.wheelMultiplier=e,this.touchMultiplier=n,this.touchStart={x:null,y:null},this.emitter=new M,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}},R=class{constructor({wrapper:t=window,content:e=document.documentElement,wheelEventsTarget:n=t,eventsTarget:s=n,smoothWheel:o=!0,syncTouch:r=!1,syncTouchLerp:c=.075,touchInertiaMultiplier:u=35,duration:a,easing:g=p=>Math.min(1,1.001-Math.pow(2,-10*p)),lerp:h=.1,infinite:y=!1,orientation:l="vertical",gestureOrientation:d="vertical",touchMultiplier:w=1,wheelMultiplier:x=1,autoResize:L=!0,prevent:G=!1,__experimental__naiveDimensions:Z=!1}={}){this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.direction=0,this.onVirtualScroll=({deltaX:p,deltaY:b,event:f})=>{if(f.ctrlKey)return;let S=f.type.includes("touch"),B=f.type.includes("wheel");if(this.isTouching=f.type==="touchstart"||f.type==="touchmove",this.options.syncTouch&&S&&f.type==="touchstart"&&!this.isStopped&&!this.isLocked)return void this.reset();let J=p===0&&b===0,Q=this.options.gestureOrientation==="vertical"&&b===0||this.options.gestureOrientation==="horizontal"&&p===0;if(J||Q)return;let A=f.composedPath();A=A.slice(0,A.indexOf(this.rootElement));let N=this.options.prevent;if(A.find(m=>{var O,D,V,C,W;return m instanceof Element&&((typeof N=="function"?N?.(m):N)||((O=m.hasAttribute)===null||O===void 0?void 0:O.call(m,"data-lenis-prevent"))||S&&((D=m.hasAttribute)===null||D===void 0?void 0:D.call(m,"data-lenis-prevent-touch"))||B&&((V=m.hasAttribute)===null||V===void 0?void 0:V.call(m,"data-lenis-prevent-wheel"))||((C=m.classList)===null||C===void 0?void 0:C.contains("lenis"))&&!(!((W=m.classList)===null||W===void 0)&&W.contains("lenis-stopped")))}))return;if(this.isStopped||this.isLocked)return void f.preventDefault();if(!(this.options.syncTouch&&S||this.options.smoothWheel&&B))return this.isScrolling="native",void this.animate.stop();f.preventDefault();let E=b;this.options.gestureOrientation==="both"?E=Math.abs(b)>Math.abs(p)?b:p:this.options.gestureOrientation==="horizontal"&&(E=p);let tt=S&&this.options.syncTouch,K=S&&f.type==="touchend"&&Math.abs(E)>5;K&&(E=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+E,Object.assign({programmatic:!1},tt?{lerp:K?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(clearTimeout(this.__resetVelocityTimeout),delete this.__resetVelocityTimeout,this.__preventNextNativeScrollEvent)delete this.__preventNextNativeScrollEvent;else if(this.isScrolling===!1||this.isScrolling==="native"){let p=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-p,this.direction=Math.sign(this.animatedScroll-p),this.isScrolling="native",this.emit(),this.velocity!==0&&(this.__resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}},window.lenisVersion="1.1.3",t&&t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:e,wheelEventsTarget:n,eventsTarget:s,smoothWheel:o,syncTouch:r,syncTouchLerp:c,touchInertiaMultiplier:u,duration:a,easing:g,lerp:h,infinite:y,gestureOrientation:d,orientation:l,touchMultiplier:w,wheelMultiplier:x,autoResize:L,prevent:G,__experimental__naiveDimensions:Z},this.animate=new H,this.emitter=new M,this.dimensions=new P({wrapper:t,content:e,autoResize:L}),this.updateClassName(),this.userData={},this.time=0,this.velocity=this.lastVelocity=0,this.isLocked=!1,this.isStopped=!1,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new F(s,{touchMultiplier:w,wheelMultiplier:x}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName()}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(t){let e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(t,{offset:e=0,immediate:n=!1,lock:s=!1,duration:o=this.options.duration,easing:r=this.options.easing,lerp:c=this.options.lerp,onStart:u,onComplete:a,force:g=!1,programmatic:h=!0,userData:y={}}={}){if(!this.isStopped&&!this.isLocked||g){if(typeof t=="string"&&["top","left","start"].includes(t))t=0;else if(typeof t=="string"&&["bottom","right","end"].includes(t))t=this.limit;else{let l;if(typeof t=="string"?l=document.querySelector(t):t instanceof HTMLElement&&t?.nodeType&&(l=t),l){if(this.options.wrapper!==window){let w=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?w.left:w.top}let d=l.getBoundingClientRect();t=(this.isHorizontal?d.left:d.top)+this.animatedScroll}}if(typeof t=="number"&&(t+=e,t=Math.round(t),this.options.infinite?h&&(this.targetScroll=this.animatedScroll=this.scroll):t=Y(0,t,this.limit),t!==this.targetScroll)){if(this.userData=y,n)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),a?.(this),void(this.userData={});h||(this.targetScroll=t),this.animate.fromTo(this.animatedScroll,t,{duration:o,easing:r,lerp:c,onStart:()=>{s&&(this.isLocked=!0),this.isScrolling="smooth",u?.(this)},onUpdate:(l,d)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=l-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=l,this.setScroll(this.scroll),h&&(this.targetScroll=l),d||this.emit(),d&&(this.reset(),this.emit(),a?.(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this.__preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextNativeScrollEvent})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?function(e,n){return(e%n+n)%n}(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.updateClassName())}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.updateClassName())}get isLocked(){return this.__isLocked}set isLocked(t){this.__isLocked!==t&&(this.__isLocked=t,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isScrolling==="smooth"&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};var _={revealType:"[data-reveal-type]",revealParent:"[data-reveal-parent]",toggleScroll:"[data-toggle-scroll]",startScroll:"[data-start-scroll]",stopScroll:"[data-stop-scroll]",resetAnimation:"[data-reset-animation]"},at=["chars","words","lines"],bt=new Set(at),ct=["from-top","from-bottom","from-left-bottom","fade-from-bottom-left"],St=new Set(ct),ut=["power1","power1.in","power1.out","power1.inOut","power2","power2.in","power2.out","power2.inOut","power3","power3.in","power3.out","power3.inOut","power4","power4.in","power4.out","power4.inOut","back","back.in","back.out","back.inOut","bounce","bounce.in","bounce.out","bounce.inOut","circ","circ.in","circ.out","circ.inOut","elastic","elastic.in","elastic.out","elastic.inOut","expo","expo.in","expo.out","expo.inOut","sine","sine.in","sine.out","sine.inOut"],Et=new Set(ut);var T=new R({lerp:.1,wheelMultiplier:.7,gestureOrientation:"vertical"});function $(i){T.raf(i),requestAnimationFrame($)}requestAnimationFrame($);var j=[...document.querySelectorAll(_.toggleScroll)],ht=[...document.querySelectorAll(_.startScroll)],dt=[...document.querySelectorAll(_.stopScroll)],z;for(let i=0;i<j.length;i++){let t=j[i];t.addEventListener("click",()=>{if(t.classList.contains("stop-scroll")){z?.(),T.start(),t.classList.remove("stop-scroll");return}z=k(),T.stop(),t.classList.add("stop-scroll")})}for(let i of ht)i.addEventListener("click",()=>{T.start(),z?.()});for(let i of dt)i.addEventListener("click",()=>{T.stop(),z=k()});})();
