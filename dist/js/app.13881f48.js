(function(){"use strict";var t={5290:function(t,e,a){var r={};a.r(r);var s=a(9963),n=a(6252);function o(t,e,a,r,s,o){const i=(0,n.up)("TheHeader"),u=(0,n.up)("TheMain"),c=(0,n.up)("TheFooter");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(i),(0,n.Wm)(u),(0,n.Wm)(c)],64)}const i={class:"header"},u=(0,n._)("h1",{class:"header__title"}," Illiada shows info about asteroids ",-1);function c(t,e,a,r,s,o){const c=(0,n.up)("ElButton");return(0,n.wg)(),(0,n.iD)("header",i,[u,s.isChangeTitleButtonVisible?((0,n.wg)(),(0,n.j4)(c,{key:0,onClick:o.setTitle},{default:(0,n.w5)((()=>[(0,n.Uk)("❤")])),_:1},8,["onClick"])):(0,n.kq)("",!0)])}var d=a(281),h={name:"TheHeader",components:{ElButton:d.mi},data(){return{isChangeTitleButtonVisible:!0}},methods:{setTitle(){document.title="NeoWs",this.isChangeTitleButtonVisible=!1}}},l=a(3744);const m=(0,l.Z)(h,[["render",c]]);var f=m;const b={class:"main"},p={class:"main__content"};function g(t,e,a,r,s,o){const i=(0,n.up)("NearOrbitalObjectsList");return(0,n.wg)(),(0,n.iD)("main",b,[(0,n._)("section",p,[(0,n.Wm)(i)])])}var v=a.p+"img/icone-chargement-grise.a565b8cf.png";const O={key:0,class:"loader"},y=(0,n._)("img",{class:"loader__image",src:v,alt:"loader"},null,-1),z=[y],_={key:1};function w(t,e,a,r,s,o){const i=(0,n.up)("NearOrbitalObject");return(0,n.wg)(),(0,n.iD)(n.HY,null,[s.isLoaderActive?((0,n.wg)(),(0,n.iD)("div",O,z)):(0,n.kq)("",!0),s.theMostObjArr.length?((0,n.wg)(),(0,n.iD)("section",_,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.theMostObjArr.slice(0,5),(t=>((0,n.wg)(),(0,n.j4)(i,{key:t.date,date:t.date,biggest:t.biggestObject,closest:t.closestObject,fastest:t.fastestObject,hazardousAmount:t.hazardousAmount,isHazardous:o.isHazardous(t)},null,8,["date","biggest","closest","fastest","hazardousAmount","isHazardous"])))),128))])):(0,n.kq)("",!0)],64)}a(7658);var j=a(3577);const A={class:"card-header"},D={class:"box-card__list"};function M(t,e,a,r,s,o){const i=(0,n.up)("ElCard");return(0,n.wg)(),(0,n.j4)(i,{class:(0,j.C_)(["box-card",{"box-card--red":a.isHazardous}])},{header:(0,n.w5)((()=>[(0,n._)("div",A,[(0,n._)("span",null,"The top list of "+(0,j.zw)(a.date),1)])])),default:(0,n.w5)((()=>[(0,n._)("ul",D,[(0,n._)("li",null," Biggest name "+(0,j.zw)(a.biggest.name)+", radius is "+(0,j.zw)(+a.biggest.estimatedDiameterMax.toFixed(3))+" km ",1),(0,n._)("li",null," Closest name "+(0,j.zw)(a.closest.name)+", distance to Earth is "+(0,j.zw)(Math.round(a.closest.missDistance))+" km ",1),(0,n._)("li",null," Fastest name "+(0,j.zw)(a.fastest.name)+", its speed is "+(0,j.zw)(Math.round(a.fastest.relativeVelocity))+" km/h ",1),(0,n._)("li",null," It's "+(0,j.zw)(a.hazardousAmount)+" hazardous object(s) ",1)])])),_:1},8,["class"])}var T=a(32),k={name:"NearOrbitalObject",components:{ElCard:T.Kf},props:["biggest","closest","fastest","hazardousAmount","date","isHazardous"]};const H=(0,l.Z)(k,[["render",M]]);var x=H,N=a(6154);function C(t){return t<10?"0"+t:t.toString()}function E(t,e){const a=t.split("-");switch(e){case"day":return a[2];case"month":return a[1];case"year":return a[0];default:break}}async function S(){let t=1;const e=new Date,a=[];do{const e=L(t),{startDate:r,endDate:s,apiKey:n}=e,o=await N.Z.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${r}&end_date=${s}&api_key=`+n),i=o.data.near_earth_objects,u=[];for(const t in i){for(const e in i[t]){const a=i[t],r={id:a[e].id,isPotentiallyHazardousAsteroid:a[e].is_potentially_hazardous_asteroid,name:a[e].name,estimatedDiameterMax:a[e].estimated_diameter.kilometers.estimated_diameter_max,missDistance:a[e].close_approach_data[0].miss_distance.kilometers,relativeVelocity:a[e].close_approach_data[0].relative_velocity.kilometers_per_hour};u.push({...r})}a.push({date:t,nearObjects:[...u]}),u.length=0}t++}while(t<=+e.getDate());return I(a)}function L(t=1){const e=new Date,a=e.getFullYear(),r=C(e.getMonth()),s=C(t),n=C(t);return{startDate:`${a}-${r}-${n}`,endDate:`${a}-${r}-${s}`,apiKey:"PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx"}}function I(t){const e=[];return t.forEach((t=>{let a=t.nearObjects[0],r=t.nearObjects[0],s=t.nearObjects[0],n=0;t.nearObjects.forEach((t=>{+a.estimatedDiameterMax<+t.estimatedDiameterMax&&(a=t),+r.missDistance>+t.missDistance&&(r=t),+s.relativeVelocity<+t.relativeVelocity&&(s=t),t.isPotentiallyHazardousAsteroid&&n++}));const o=t.date.replace(+E(t.date,"month"),+E(t.date,"month")+1);e.push({biggestObject:a,closestObject:r,fastestObject:s,hazardousAmount:n,date:o}),n=0})),e}var R={name:"NearOrbitalObjectsList",components:{NearOrbitalObject:x},data(){return{isLoaderActive:!0,indexOfTimeoutRun:0,theMostObjArr:[],fetchedMutatedArray:[],hazardousHighestNumber:0,hazardousSecondNumber:0,hazardousHigherNumberDate:"",delay:2e3}},methods:{setIntervalMethod(){if(this.indexOfTimeoutRun=1,this.fetchedMutatedArray.length>1){const t=setInterval((()=>{this.theMostObjArr.unshift(this.fetchedMutatedArray[this.indexOfTimeoutRun]),this.indexOfTimeoutRun++,this.indexOfTimeoutRun===this.fetchedMutatedArray.length&&clearInterval(t)}),this.delay)}},potentiallyHazardousObjects(t){t.forEach((t=>{this.hazardousHighestNumber<t.hazardousAmount&&(this.hazardousHighestNumber=t.hazardousAmount,this.hazardousHigherNumberDate=t.date)})),t.forEach((t=>{this.hazardousSecondNumber<=t.hazardousAmount&&t.date!==this.hazardousHigherNumberDate&&t.hazardousAmount>0&&(this.hazardousSecondNumber=t.hazardousAmount)}))},isHazardous(t){return this.hazardousHighestNumber===t.hazardousAmount&&t.hazardousAmount>0||this.hazardousSecondNumber===t.hazardousAmount&&t.hazardousAmount>0}},watch:{theMostObjArr:{handler(t){this.hazardousHighestNumber=0,this.hazardousSecondNumber=0,t.length===this.fetchedMutatedArray.length&&setTimeout((()=>{const e=t.pop();t.length=0,t.push(e),this.setIntervalMethod()}),this.delay),this.potentiallyHazardousObjects(t.slice(0,5))},deep:!0}},async created(){try{this.isLoaderActive=!0;const t=await S();this.fetchedMutatedArray=[...t].sort(((t,e)=>t.date.localeCompare(e.date))),this.theMostObjArr.push(this.fetchedMutatedArray[0]),this.setIntervalMethod(),this.isLoaderActive=!1}catch(t){throw new Error(t)}}};"function"===typeof r["default"]&&(0,r["default"])(R);const $=(0,l.Z)(R,[["render",w]]);var F=$,P={name:"TheMain",components:{NearOrbitalObjectsList:F}};const V=(0,l.Z)(P,[["render",g]]);var Z=V;const B={class:"footer"};function W(t,e,a,r,s,o){return(0,n.wg)(),(0,n.iD)("footer",B," © Copyright info, 2023 ")}var K={name:"TheFooter"};const Y=(0,l.Z)(K,[["render",W]]);var q=Y,X={name:"App",components:{TheHeader:f,TheMain:Z,TheFooter:q}};const G=(0,l.Z)(X,[["render",o]]);var Q=G;a(4415);const U=(0,s.ri)(Q),J=[d.mi,T.Kf];J.forEach((t=>{U.component(t.name,t)})),U.mount("#app")}},e={};function a(r){var s=e[r];if(void 0!==s)return s.exports;var n=e[r]={exports:{}};return t[r].call(n.exports,n,n.exports,a),n.exports}a.m=t,function(){var t=[];a.O=function(e,r,s,n){if(!r){var o=1/0;for(d=0;d<t.length;d++){r=t[d][0],s=t[d][1],n=t[d][2];for(var i=!0,u=0;u<r.length;u++)(!1&n||o>=n)&&Object.keys(a.O).every((function(t){return a.O[t](r[u])}))?r.splice(u--,1):(i=!1,n<o&&(o=n));if(i){t.splice(d--,1);var c=s();void 0!==c&&(e=c)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[r,s,n]}}(),function(){a.d=function(t,e){for(var r in e)a.o(e,r)&&!a.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){a.p="/neows-information-app/"}(),function(){var t={143:0};a.O.j=function(e){return 0===t[e]};var e=function(e,r){var s,n,o=r[0],i=r[1],u=r[2],c=0;if(o.some((function(e){return 0!==t[e]}))){for(s in i)a.o(i,s)&&(a.m[s]=i[s]);if(u)var d=u(a)}for(e&&e(r);c<o.length;c++)n=o[c],a.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return a.O(d)},r=self["webpackChunkneows_information_app"]=self["webpackChunkneows_information_app"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=a.O(void 0,[998],(function(){return a(5290)}));r=a.O(r)})();
//# sourceMappingURL=app.13881f48.js.map