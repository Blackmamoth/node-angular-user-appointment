(()=>{"use strict";var o,l,e,m={},g={};function t(e){var f=g[e];if(void 0!==f)return f.exports;var o=g[e]={exports:{}};return m[e].call(o.exports,o,o.exports,t),o.exports}t.m=m,e=[],t.O=(f,o,l,i)=>{if(!o){var a=1/0;for(n=0;n<e.length;n++){for(var[o,l,i]=e[n],d=!0,r=0;r<o.length;r++)(!1&i||a>=i)&&Object.keys(t.O).every(b=>t.O[b](o[r]))?o.splice(r--,1):(d=!1,i<a&&(a=i));if(d){e.splice(n--,1);var u=l();void 0!==u&&(f=u)}}return f}i=i||0;for(var n=e.length;n>0&&e[n-1][2]>i;n--)e[n]=e[n-1];e[n]=[o,l,i]},t.n=e=>{var f=e&&e.__esModule?()=>e.default:()=>e;return t.d(f,{a:f}),f},t.d=(e,f)=>{for(var o in f)t.o(f,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:f[o]})},t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce((f,o)=>(t.f[o](e,f),f),[])),t.u=e=>(592===e?"common":e)+"."+{235:"3e13164c36d82b5c",335:"ff85a17d9331a02e",384:"0a32f2553239a317",430:"0b2184d23ba133c0",574:"cb9bb7177c7aec98",592:"f0d34625ec4474b8",724:"e7a380904276a2ae",728:"104ccd0cc91082f4",962:"bb976cad00f7330e",969:"b19a33f8d489bc29"}[e]+".js",t.miniCssF=e=>e+".36fd0bc6c73efe0c.css",t.o=(e,f)=>Object.prototype.hasOwnProperty.call(e,f),(()=>{var e={},f="demo2:";t.l=(o,l,i,n)=>{if(e[o])e[o].push(l);else{var a,d;if(void 0!==i)for(var r=document.getElementsByTagName("script"),u=0;u<r.length;u++){var s=r[u];if(s.getAttribute("src")==o||s.getAttribute("data-webpack")==f+i){a=s;break}}a||(d=!0,(a=document.createElement("script")).type="module",a.charset="utf-8",a.timeout=120,t.nc&&a.setAttribute("nonce",t.nc),a.setAttribute("data-webpack",f+i),a.src=t.tu(o)),e[o]=[l];var c=(v,b)=>{a.onerror=a.onload=null,clearTimeout(p);var y=e[o];if(delete e[o],a.parentNode&&a.parentNode.removeChild(a),y&&y.forEach(h=>h(b)),v)return v(b)},p=setTimeout(c.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=c.bind(null,a.onerror),a.onload=c.bind(null,a.onload),d&&document.head.appendChild(a)}}})(),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;t.tt=()=>(void 0===e&&(e={createScriptURL:f=>f},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e)})(),t.tu=e=>t.tt().createScriptURL(e),t.p="",o=i=>new Promise((n,a)=>{var d=t.miniCssF(i),r=t.p+d;if(((i,n)=>{for(var a=document.getElementsByTagName("link"),d=0;d<a.length;d++){var u=(r=a[d]).getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(u===i||u===n))return r}var s=document.getElementsByTagName("style");for(d=0;d<s.length;d++){var r;if((u=(r=s[d]).getAttribute("data-href"))===i||u===n)return r}})(d,r))return n();((i,n,a,d)=>{var r=document.createElement("link");r.rel="stylesheet",r.type="text/css",r.onerror=r.onload=s=>{if(r.onerror=r.onload=null,"load"===s.type)a();else{var c=s&&("load"===s.type?"missing":s.type),p=s&&s.target&&s.target.href||n,v=new Error("Loading CSS chunk "+i+" failed.\n("+p+")");v.code="CSS_CHUNK_LOAD_FAILED",v.type=c,v.request=p,r.parentNode.removeChild(r),d(v)}},r.href=n,document.head.appendChild(r)})(i,r,n,a)}),l={666:0},t.f.miniCss=(i,n)=>{l[i]?n.push(l[i]):0!==l[i]&&{235:1}[i]&&n.push(l[i]=o(i).then(()=>{l[i]=0},d=>{throw delete l[i],d}))},(()=>{var e={666:0};t.f.j=(l,i)=>{var n=t.o(e,l)?e[l]:void 0;if(0!==n)if(n)i.push(n[2]);else if(666!=l){var a=new Promise((s,c)=>n=e[l]=[s,c]);i.push(n[2]=a);var d=t.p+t.u(l),r=new Error;t.l(d,s=>{if(t.o(e,l)&&(0!==(n=e[l])&&(e[l]=void 0),n)){var c=s&&("load"===s.type?"missing":s.type),p=s&&s.target&&s.target.src;r.message="Loading chunk "+l+" failed.\n("+c+": "+p+")",r.name="ChunkLoadError",r.type=c,r.request=p,n[1](r)}},"chunk-"+l,l)}else e[l]=0},t.O.j=l=>0===e[l];var f=(l,i)=>{var r,u,[n,a,d]=i,s=0;if(n.some(p=>0!==e[p])){for(r in a)t.o(a,r)&&(t.m[r]=a[r]);if(d)var c=d(t)}for(l&&l(i);s<n.length;s++)t.o(e,u=n[s])&&e[u]&&e[u][0](),e[u]=0;return t.O(c)},o=self.webpackChunkdemo2=self.webpackChunkdemo2||[];o.forEach(f.bind(null,0)),o.push=f.bind(null,o.push.bind(o))})()})();