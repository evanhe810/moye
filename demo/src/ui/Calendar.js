/*! 2014 Baidu Inc. All Rights Reserved */
define("Calendar",["require","./lib","./Control","./Popup"],function(require){function t(t){return(t>9?"":"0")+t}var e=require("./lib"),i=require("./Control"),a=require("./Popup"),s="yyyy-MM-dd",r={},n={onClick:function(t){var i=t.event;if(i){for(var a=e.getTarget(i),s=a.tagName,r=this.target;"A"!==s&&a!==this.main;)a=a.parentNode,s=a.tagName;switch(s){case"A":e.preventDefault(i);var h=this.options.prefix,o=h+"-pre",l=h+"-next",f=h+"-disabled",u=e.hasClass,d=e.stopPropagation;if(u(a,o))n.showPreMonth.call(this),d(i);else if(u(a,l))n.showNextMonth.call(this),d(i);else if(!u(a,f))a.getAttribute("data-date")&&n.pick.call(this,a);break;default:if(r)r.select()}this.fire("click",t)}},onBeforeShow:function(t){this.fire("beforeShow",t);var e=this.popup,i=this.target,a=i.value;if(a)a=this.from(a),this.value=this.format(a);if(!e.content)this.date=this.from(a||this.value),n.build.call(this);var s=this.lastDate||"",r=this.lastTarget,h=n.getYYYYMM.call(this,this.date),o=n.getYYYYMM.call(this,a);if(s&&s!==this.format(a)||h!==o)if(this.date=this.from(a||this.value),s=s&&n.getYYYYMM.call(this,s),s!==o||h!==o)n.build.call(this);else n.updateStatus.call(this);else if(a!==s||i!==r)n.updateStatus.call(this)},onHide:function(){this.fire("hide")},showPreMonth:function(){var t=this.date;t.setDate(0),n.build.call(this,t)},showNextMonth:function(){var t=this.date;t.setDate(1),t.setMonth(t.getMonth()+1),n.build.call(this,t)},updateStatus:function(){var t=this.options,e=t.prefix,i=t.process,a=t.first,r=new Date,n=this.target.value&&this.format(this.from(this.value),s),h=this.format(r,s),o=this.range,l="",f="9999-12-31";if(o)l=o.begin&&this.format(o.begin,s)||l,f=o.end&&this.format(o.end,s)||f;var u,d,c,g,p,m,v,y,M,Y=e+"-pre-month",w=e+"-next-month",b=e+"-disabled",D=e+"-today",x=e+"-checked",k=e+"-weekend",S=this.main.getElementsByTagName("p");for(u=0,d=S.length;d>u;u++)for(p=S[u].getElementsByTagName("a"),c=0;g=p[c];c++){if(m=[],v=g.getAttribute("data-date"),y=g.className,M=!0,o&&(l>v||v>f))m.push(b),M=!1;var N=c%7;if(6===N||a&&5===N||!a&&0===N)m.push(k);if(~y.indexOf(Y))m.push(Y);else if(~y.indexOf(w))m.push(w);else{if(v===h)m.push(D);if(M&&v===n)m.push(x)}if(i)i.call(this,g,m,v,M);g.className=m.join(" ")}},getYYYYMM:function(t){return"string"==typeof t?t:this.format(this.from(t),"yyyyMM")},build:function(t){var e=this.options,i=[];t=t||this.date;for(var a,s=t.getFullYear(),r=t.getMonth(),h=0,o=e.monthes;o>h;h++)a=new Date(s,r+h,1),i.push(n.buildMonth.call(this,a));var l=e.prefix;i.push('<a href="#" class="'+l+'-pre"></a>'),i.push('<a href="#" class="'+l+'-next"></a>');var f=this.popup;f.content=i.join(""),f.render(),n.updateStatus.call(this),n.updatePrevNextStatus.call(this,t)},buildMonth:function(e){var i=e.getFullYear(),a=e.getMonth()+1,s=e.getDate(),n=e.getDay(),h=r[this.cacheKey],o=i+t(a);if(h[o])return h[o];var l=7,f=6,u="-",d=this.options,c=d.prefix,g=['<div class="'+c+'-month">'],p={year:i,month:a,prefix:c},m=d.lang.title.replace(/\{([^\}]+)\}/g,function(t,e){return p[e]||""});g.push("<h3>"+m+"</h3>");var v,y,M,Y=d.first,w=this.days;for(g.push('<ul class="c-clearfix">'),v=0,y=w.length;y>v;v++)M=v===l-1||Y&&v===l-2||!Y&&v===Y?' class="'+c+'-weekend"':"",g.push("<li"+M+">"+w[v]+"</li>");g.push("</ul>"),g.push('<p class="c-clearfix">');var b,D,x,k,S=0,N=(l+n+1-s%l)%l;if(y=N-Y,y>0){for(e.setDate(0),b=e.getFullYear(),D=e.getMonth()+1,x=e.getDate(),k=[b,t(D),""].join(u),M=c+"-pre-month",v=x-y+1;x>=v;v++)S%=l,g.push('<a href="#" hidefocus class="'+M+'" data-date="'+k+t(v)+'" data-week="'+S+'">'+v+"</a>"),S++;e.setDate(x+1)}for(e.setDate(1),e.setMonth(a),e.setDate(0),k=[i,t(a),""].join(u),v=1,y=e.getDate();y>=v;v++)S%=l,g.push('<a href="#" hidefocus  data-date="'+k+t(v)+'" data-week="'+S+'">'+v+"</a>"),S++;for(e.setDate(y+1),b=e.getFullYear(),D=e.getMonth()+1,k=[b,t(D),""].join(u),M=c+"-next-month",y=l*f-(y+Math.max(0,N-Y)),v=1;y>=v;v++)S%=l,g.push('<a href="#" hidefocus class="'+M+'" data-date="'+k+t(v)+'" data-week="'+S+'">'+v+"</a>"),S++;return g.push("</p>"),g.push("</div>"),h[o]=g.join(""),h[o]},updatePrevNextStatus:function(t){var i=this.options,a=i.prefix,s=this.range,r=e.q(a+"-pre",this.main)[0],h=e.q(a+"-next",this.main)[0];if(t=t||this.date||this.from(this.value),r)e[!s||!s.begin||n.getYYYYMM.call(this,s.begin)<n.getYYYYMM.call(this,t)?"show":"hide"](r);var o=new Date(t.getFullYear(),t.getMonth()+i.monthes-1,1);if(h)e[!s||!s.end||n.getYYYYMM.call(this,s.end)>n.getYYYYMM.call(this,o)?"show":"hide"](h)},pick:function(t){var e=t.getAttribute("data-date"),i=t.getAttribute("data-week"),a=this.target,r=this.from(e,s);if(e=this.format(r),this.lastDate=e,a)if(a.type)a.value=e,a.focus();else a.innerHTML=e;this.fire("pick",{value:e,week:this.options.lang.week+this.days[i],date:r}),this.hide()}},h=i.extend({type:"Calendar",options:{disabled:!1,main:"",prefix:"ecl-ui-cal",target:"",triggers:"",dateFormat:"",range:null,value:"",process:null,monthes:2,first:0,lang:{week:"周",days:"日,一,二,三,四,五,六",title:"{year}年{month}日"}},init:function(t){this.bindEvents(n),this._disabled=t.disabled,this.dateFormat=t.dateFormat||h.DATE_FORMAT||s,this.days=t.lang.days.split(","),this.value=this.format(this.from(t.value));var e=this.cacheKey=t.first+"-"+t.lang.title;r[e]=r[e]||{},this.setRange(t.range||h.RANGE)},from:function(t,i){if(i=i||this.dateFormat,e.isString(t)){if(!t)return new Date;i=i.split(/[^yMdW]+/i),t=t.split(/\D+/);for(var a={},s=0,r=i.length;r>s;s++)if(i[s]&&t[s]&&(i[s].length>1&&t[s].length===i[s].length||1===i[s].length))a[i[s].toLowerCase()]=t[s];var n=a.yyyy||a.y||(a.yy<50?"20":"19")+a.yy,h=0|(a.m||a.mm),o=0|(a.d||a.dd);return new Date(0|n,h-1,o)}return t},format:function(i,a){if(a=(a||this.dateFormat).toLowerCase(),e.isString(i))i=this.from(i);var s=this.options,r=s.first,n=i.getFullYear(),h=i.getMonth()+1,o=i.getDate(),l=i.getDay();if(r)l=(l-1+7)%7;l=this.days[l];var f={yyyy:n,yy:n%100,y:n,mm:t(h),m:h,dd:t(o),d:o,w:l,ww:s.lang.week+l};return a.replace(/y+|M+|d+|W+/gi,function(t){return f[t]||""})},render:function(){var t=this.options;if(!this.rendered){this.rendered=!0;var i=this.popup=new a(this.srcOptions);this.addChild(i);var s=this._bound;if(i.on("click",s.onClick),i.on("hide",s.onHide),i.on("beforeShow",s.onBeforeShow),this.main=i.main,e.addClass(this.main,"c-clearfix"),t.target)this.setTarget(e.g(t.target))}return this},setTarget:function(t){if(!t||1!==t.nodeType)throw new Error("target 为 null 或非 Element 节点");if(this.target=t,this.popup)this.popup.target=t},show:function(t){this.popup.show(),this.fire("show",{target:t})},hide:function(){this.popup.hide()},checkValidity:function(){return this.validate()},getValue:function(){var t=this.date,e=this.target;return this.format(t||e&&e.value||this.value)},getValueAsDate:function(){return this.from(this.getValue())},setRange:function(t){if(t){var i=t.begin,a=t.end;if(i&&e.isString(i))t.begin=this.from(i);if(a&&e.isString(a))t.end=this.from(a);this.range=t,n.updatePrevNextStatus.call(this)}},setValue:function(t){this.date=this.from(t),this.value=this.format(this.date),n.build.call(this)},validate:function(){var t=this.target.value;if(t){var e=this.from(t);if(this.format(e)===t){var i=this.range,a="",r="9999-12-31";if(i)return a=i.begin&&this.format(i.begin,s)||a,r=i.end&&this.format(i.end,s)||r,t=this.format(e,s),t>=a&&r>=t;else return!0}}return!1}});return h.DATE_FORMAT=s,h.RANGE=null,h});