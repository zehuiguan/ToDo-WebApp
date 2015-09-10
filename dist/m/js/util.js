define(function(){var a=function(a){return"[object Array]"===Object.prototype.toString.call(a)},b=function(a){return"function"==typeof a},c=function(a){var b;if("[object Array]"===Object.prototype.toString.call(a))b=[];else{if(a instanceof Date)return new Date(a.getTime());if("function"==typeof a||a instanceof RegExp)return;b={}}for(var c in a)a.hasOwnProperty(c)&&("object"==typeof a[c]?b[c]=arguments.callee(a[c]):b[c]=a[c]);return b},d=function(a){var b=[];for(var c in a)-1==b.indexOf(a[c])&&b.push(a[c]);return b},e=function(a){for(var b=0,c=a.length;c>b&&(" "==a.charAt(b)||"	"==a.charAt(b));b++);for(var d=a.length;d>0&&(" "==a.charAt(b)||"	"==a.charAt(b));d++);return a.slice(b,d+1)},f=function(a){return a.replace(/(^\s+)|(\s+$)/g,"")},g=function(a,b){for(var c in a)b(a[c],c)},h=function(a){return Object.keys(a).length},k=function(a){var b=/^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;return b.test(a)},l=function(a){var b=/^(\+\d{1,4})?\d{7,11}$/;return b.test(a)},m=function(a,b){var c=a.className;-1==c.indexOf(b)&&(a.className=""===c?b:c+" "+b)},n=function(a,b){var c=a.className,d=new RegExp("\\b"+b+"\\b");a.className=f(c.replace(d,""))},o=function(a,b){return a.parentNode===b.parentNode},p=function(a){var b=document.documentElement.scrollTop,c=document.documentElement.scrollLeft,d={};if(a.getBoundingClientRect){if("number"!=typeof arguments.callee.offset){var e=document.createElement("div");e.style.cssText="position:absolute;left:0;top:0;",document.body.appendChild(e),arguments.callee.offset=-e.getBoundingClientRect().top-b,document.body.removeChild(e),e=null}var f=a.getBoundingClientRect(),g=arguments.callee.offset;d.x=f.left+g,d.y=f.top+g}else{var h=getElementLeft(a),i=getElementTop(a);d.x=h-c,d.y=i-b}return d},q=function(a){if(!a)return null;if(a==document)return document;if(a=a.trim(),-1!==a.indexOf(" ")){var b=a.split(/\s+/),c=r(b[0]),d=null,e=null,f=[];for(d=1;d<b.length;d++)for(e=0;e<c.length;e++)f.push(r(b[d],c[e]));return f[0][0]}return r(a,document)[0]},r=function(a,b){var c=a[0],d=null,e=a.substr(1),f=null,g=[];switch(b=b||document,c){case"#":g.push(document.getElementById(e));break;case".":for(d=b.getElementsByTagName("*"),i=0;i<d.length;i++)if(f=d[i].getAttribute("class"),null!==f){var h=f.split(/\s+/);for(j=0;j<h.length;j++)e===h[j]&&g.push(d[i])}break;case"[":if(-1==e.search("="))for(d=b.getElementsByTagName("*"),i=0;i<d.length;i++)null!==d[i].getAttribute(a.slice(1,-1))&&g.push(d[i]);else{d=b.getElementsByTagName("*");var k=/\[(\w+)\s*\=\s*(\w+)\]/,l=a.match(k),m=l[1],n=l[2];for(i=0;i<d.length;i++)d[i].getAttribute(m)==n&&g.push(d[i])}break;default:g=b.getElementsByTagName(a)}return g},s=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c},t=function(a,b,c){console.log("removeEvent"),a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent("on"+b,c):a["on"+b]=null},u=function(a,b){s(a,"click",b),console.log("addClickEvent")},v=function(a,b){s(a,"keyup",function(a){13==a.keyCode&&b()})},w=function(a,b,c,d){s(a,c,function(c){c=c||window.event;var e=c.target||c.srcElement;e.tagName.toLowerCase()===b&&a!==e&&d.call(e,c)})},x=function(){var a={ie:0,gecko:0,webkit:0,khtml:0,opera:0,ver:null},b={ie:0,firefox:0,safari:0,konq:0,opera:0,chrome:0,ver:null},c=navigator.userAgent;if(window.opera)a.ver=b.ver=window.opera.version(),a.opera=b.opera=parseFloat(a.ver);else if(/AppleWebKit\/(\S+)/.test(c))if(a.ver=RegExp.$1,a.webkit=parseFloat(a.ver),/Chrome\/(\S+)/.test(c))b.ver=RegExp.$1,b.chrome=parseFloat(b.ver);else if(/Version\/(\S+)/.test(c))b.ver=RegExp.$1,b.safari=parseFloat(b.ver);else{var d=1;d=a.webkit<100?1:a.webkit<312?1.2:a.webkit<412?1.3:2,b.safari=b.ver=d}else/KHTML\/(\S+)/.test(c)||/Konqueror\/([^;]+)/.test(c)?(a.ver=b.ver=RegExp.$1,a.khtml=b.konq=parseFloat(a.ver)):/rv:([^\)]+)\) Gecko\/\d{8}/.test(c)?(a.ver=RegExp.$1,a.gecko=parseFloat(a.ver),/Firefox\/(\S+)/.test(c)&&(b.ver=RegExp.$1,b.firefox=parseFloat(b.ver))):(/MSIE ([^;]+)/.test(c)||/rv:([\d.]+)/.test(c))&&(a.ver=b.ver=RegExp.$1,a.ie=b.ie=parseFloat(a.ver));return a.engine.ie?client.engine.ver:void 0},y=function(a,b,c){var d=new Date;d.setDate(d.getDate()+c),document.cookie=a+"="+escape(b)+(null===c?"":";expires="+d.toGmtString())},z=function(a){var b,c;return document.cookie.length>0&&(b=document.cookie.indexOf(a+"="),-1!=b)?(b=b+a.length+1,c=document.cookie.indexOf(";",b),-1==c&&(c=document.cookie.length),unescape(document.cookie.substring(b,c))):""},A=function(a,b){var c=null;c=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),b.type||(b.type="GET"),b.type=b.type.toUpperCase();var d=Math.random();if("object"==typeof b.data){var e="";for(var f in b.data)e+=f+"="+b.data[f]+"&";b.data=e.replace(/&$/,"")}"GET"==b.type?(b.data?c.open("GET",a+"?"+b.data,!0):c.open("GET",a+"?t="+d,!0),c.send()):"POST"==b.type&&(c.open("POST",a,!0),c.setRequestHeader("Content-type","application/x-www-form-urlencoded"),c.send(b.data)),c.onreadystatechange=function(){4==c.readyState&&200==c.status?b.onsuccess(responseText,c):4==c.readyState&&404==c.status&&b.onfail()}},B=function(a){return a=a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")};return{isArray:a,isFunction:b,cloneObject:c,uniqArray:d,simpleTrim:e,trim:f,each:g,getObjectLength:h,isEmail:k,isMobilePhone:l,addClass:m,removeClass:n,isSiblingNode:o,getPosition:p,$:q,myQuery:r,addEvent:s,removeEvent:t,addClickEvent:u,addEnterEvent:v,delegateEvent:w,isIE:x,setCookie:y,getCookie:z,ajax:A,changeCode:B}});