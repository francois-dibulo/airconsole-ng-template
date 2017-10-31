(function() {

  /**
   * AirConsole-Events extends the AirConsole object with on() off() and send-events
   * methods.
   * Internally it is a wrapper for the onMessage() function, which lets you
   * call multiple functions if an event triggers (like a .addEventListener).
   */

  if (!window['AirConsole']) {
    throw "AirConsole is not defined. Did you not include the API file?";
  }

  /**
   * @var {Object} events - Holds a map of events and its callbacks
   */
  AirConsole.prototype.events = {};

  /**
   * Binds event to a function. Returns id which can be used to unbind the function again.
   * @params {String} event_name - The name of the event
   * @params {Function} callback - A callback function to execute when the event triggers
   * @return {String}
   */
  AirConsole.prototype.on = function(event_name, callback) {
    if (!event_name) throw "Missing param event_name.";
    if (typeof callback !== 'function') throw "Event callback is not a function";

    var randomId = function(chars) {
      chars = chars || 15;
      return (Math.random() + 1).toString(36).substring(2, chars);
    };

    if(!this.events[event_name]) {
      this.events[event_name] = {};
    }
    var id = randomId();
    this.events[event_name][id] = callback;
    return id;
  };

  /**
   * Unbinds an event
   * @params {String} id - The id of the event (returned when binding with .on() method)
   */
  AirConsole.prototype.off = function(id) {
    if (!id) throw "Missing param id";
    var events = this.events;
    for (var evt_name in events) {
      for (var evt_id in events[evt_name]) {
        if (evt_id === id) {
          this.events[evt_name][evt_id] = null;
        }
      }
    }
  };

  /**
   * Use this to send an event to a device
   * @params {Number} to - The device id to send the event
   * @params {String} event_name - The name of the event
   * @params {mixed} params - (Optional) params to pass to the callback method
   */
  AirConsole.prototype.sendEvent = function(to, event_name, params) {
    this.message(to, {
      event_name: event_name,
      params: params
    });
  };

  /**
   * Use this to send an event to all devices
   * @params {Number} to - The device id to send the event
   * @params {String} event_name - The name of the event
   * @params {mixed} params - (Optional) params to pass to the callback method
   */
  AirConsole.prototype.broadcastEvent = function(event_name, params) {
    this.broadcast({
      event_name: event_name,
      params: params
    });
  };

  /**
   * Dispatches an event when an event is received. Call this in the onMessage function.
   * @params {Number} device - The device id which send the event
   * @params {mixed} message+d - (Optional) params to pass to the callback method
   */
  AirConsole.prototype.dispatchEvent = function(device_id, message_data) {
    var event_name = message_data.event_name;
    var params = message_data.params;
    if (event_name) {
      var evts = this.events[event_name];
      if (evts) {
        for (var id in evts) {
          var fn = evts[id];
          if (typeof fn === 'function') {
            fn(device_id, params);
          } else if (typeof fn === 'undefined') {
            throw "Failed to emit function for " + event_name;
          }
        }
      }
    }
  };

})();
;/*
 AngularJS v1.5.0-rc.2
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(Q,W,v){'use strict';function K(a){return function(){var b=arguments[0],d;d="["+(a?a+":":"")+b+"] http://errors.angularjs.org/1.5.0-rc.2/"+(a?a+"/":"")+b;for(b=1;b<arguments.length;b++){d=d+(1==b?"?":"&")+"p"+(b-1)+"=";var c=encodeURIComponent,e;e=arguments[b];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;d+=c(e)}return Error(d)}}function Ca(a){if(null==a||$a(a))return!1;if(L(a)||E(a)||C&&a instanceof
C)return!0;var b="length"in Object(a)&&a.length;return P(b)&&(0<=b&&(b-1 in a||a instanceof Array)||"function"==typeof a.item)}function n(a,b,d){var c,e;if(a)if(D(a))for(c in a)"prototype"==c||"length"==c||"name"==c||a.hasOwnProperty&&!a.hasOwnProperty(c)||b.call(d,a[c],c,a);else if(L(a)||Ca(a)){var f="object"!==typeof a;c=0;for(e=a.length;c<e;c++)(f||c in a)&&b.call(d,a[c],c,a)}else if(a.forEach&&a.forEach!==n)a.forEach(b,d,a);else if(qc(a))for(c in a)b.call(d,a[c],c,a);else if("function"===typeof a.hasOwnProperty)for(c in a)a.hasOwnProperty(c)&&
b.call(d,a[c],c,a);else for(c in a)ua.call(a,c)&&b.call(d,a[c],c,a);return a}function rc(a,b,d){for(var c=Object.keys(a).sort(),e=0;e<c.length;e++)b.call(d,a[c[e]],c[e]);return c}function sc(a){return function(b,d){a(d,b)}}function Xd(){return++qb}function Qb(a,b,d){for(var c=a.$$hashKey,e=0,f=b.length;e<f;++e){var g=b[e];if(I(g)||D(g))for(var h=Object.keys(g),k=0,l=h.length;k<l;k++){var m=h[k],r=g[m];d&&I(r)?V(r)?a[m]=new Date(r.valueOf()):ab(r)?a[m]=new RegExp(r):r.nodeName?a[m]=r.cloneNode(!0):
Rb(r)?a[m]=r.clone():(I(a[m])||(a[m]=L(r)?[]:{}),Qb(a[m],[r],!0)):a[m]=r}}c?a.$$hashKey=c:delete a.$$hashKey;return a}function T(a){return Qb(a,va.call(arguments,1),!1)}function Yd(a){return Qb(a,va.call(arguments,1),!0)}function ca(a){return parseInt(a,10)}function Sb(a,b){return T(Object.create(a),b)}function x(){}function bb(a){return a}function ba(a){return function(){return a}}function tc(a){return D(a.toString)&&a.toString!==fa}function z(a){return"undefined"===typeof a}function y(a){return"undefined"!==
typeof a}function I(a){return null!==a&&"object"===typeof a}function qc(a){return null!==a&&"object"===typeof a&&!uc(a)}function E(a){return"string"===typeof a}function P(a){return"number"===typeof a}function V(a){return"[object Date]"===fa.call(a)}function D(a){return"function"===typeof a}function ab(a){return"[object RegExp]"===fa.call(a)}function $a(a){return a&&a.window===a}function cb(a){return a&&a.$evalAsync&&a.$watch}function Na(a){return"boolean"===typeof a}function Zd(a){return a&&P(a.length)&&
$d.test(fa.call(a))}function Rb(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}function ae(a){var b={};a=a.split(",");var d;for(d=0;d<a.length;d++)b[a[d]]=!0;return b}function qa(a){return G(a.nodeName||a[0]&&a[0].nodeName)}function db(a,b){var d=a.indexOf(b);0<=d&&a.splice(d,1);return d}function Oa(a,b){function d(a,b){var d=b.$$hashKey,e;if(L(a)){e=0;for(var f=a.length;e<f;e++)b.push(c(a[e]))}else if(qc(a))for(e in a)b[e]=c(a[e]);else if(a&&"function"===typeof a.hasOwnProperty)for(e in a)a.hasOwnProperty(e)&&
(b[e]=c(a[e]));else for(e in a)ua.call(a,e)&&(b[e]=c(a[e]));d?b.$$hashKey=d:delete b.$$hashKey;return b}function c(a){if(!I(a))return a;var b=f.indexOf(a);if(-1!==b)return g[b];if($a(a)||cb(a))throw Da("cpws");var b=!1,c=e(a);c===v&&(c=L(a)?[]:Object.create(uc(a)),b=!0);f.push(a);g.push(c);return b?d(a,c):c}function e(a){switch(fa.call(a)){case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":return new a.constructor(c(a.buffer));
case "[object ArrayBuffer]":if(!a.slice){var b=new ArrayBuffer(a.byteLength);(new Uint8Array(b)).set(new Uint8Array(a));return b}return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":return new a.constructor(a.valueOf());case "[object RegExp]":return b=new RegExp(a.source,a.toString().match(/[^\/]*$/)[0]),b.lastIndex=a.lastIndex,b}if(D(a.cloneNode))return a.cloneNode(!0)}var f=[],g=[];if(b){if(Zd(b)||"[object ArrayBuffer]"===fa.call(b))throw Da("cpta");
if(a===b)throw Da("cpi");L(b)?b.length=0:n(b,function(a,c){"$$hashKey"!==c&&delete b[c]});f.push(a);g.push(b);return d(a,b)}return c(a)}function ma(a,b){if(L(a)){b=b||[];for(var d=0,c=a.length;d<c;d++)b[d]=a[d]}else if(I(a))for(d in b=b||{},a)if("$"!==d.charAt(0)||"$"!==d.charAt(1))b[d]=a[d];return b||a}function na(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d==typeof b&&"object"==d)if(L(a)){if(!L(b))return!1;if((d=a.length)==b.length){for(c=
0;c<d;c++)if(!na(a[c],b[c]))return!1;return!0}}else{if(V(a))return V(b)?na(a.getTime(),b.getTime()):!1;if(ab(a))return ab(b)?a.toString()==b.toString():!1;if(cb(a)||cb(b)||$a(a)||$a(b)||L(b)||V(b)||ab(b))return!1;d=Z();for(c in a)if("$"!==c.charAt(0)&&!D(a[c])){if(!na(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&y(b[c])&&!D(b[c]))return!1;return!0}return!1}function eb(a,b,d){return a.concat(va.call(b,d))}function vc(a,b){var d=2<arguments.length?va.call(arguments,2):[];
return!D(b)||b instanceof RegExp?b:d.length?function(){return arguments.length?b.apply(a,eb(d,arguments,0)):b.apply(a,d)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function be(a,b){var d=b;"string"===typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?d=v:$a(b)?d="$WINDOW":b&&W===b?d="$DOCUMENT":cb(b)&&(d="$SCOPE");return d}function fb(a,b){if("undefined"===typeof a)return v;P(b)||(b=b?2:null);return JSON.stringify(a,be,b)}function wc(a){return E(a)?JSON.parse(a):a}function xc(a,
b){var d=Date.parse("Jan 01, 1970 00:00:00 "+a)/6E4;return isNaN(d)?b:d}function Tb(a,b,d){d=d?-1:1;var c=xc(b,a.getTimezoneOffset());b=a;a=d*(c-a.getTimezoneOffset());b=new Date(b.getTime());b.setMinutes(b.getMinutes()+a);return b}function ra(a){a=C(a).clone();try{a.empty()}catch(b){}var d=C("<div>").append(a).html();try{return a[0].nodeType===Pa?G(d):d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+G(b)})}catch(c){return G(d)}}function yc(a){try{return decodeURIComponent(a)}catch(b){}}
function zc(a){var b={};n((a||"").split("&"),function(a){var c,e,f;a&&(e=a=a.replace(/\+/g,"%20"),c=a.indexOf("="),-1!==c&&(e=a.substring(0,c),f=a.substring(c+1)),e=yc(e),y(e)&&(f=y(f)?yc(f):!0,ua.call(b,e)?L(b[e])?b[e].push(f):b[e]=[b[e],f]:b[e]=f))});return b}function Ub(a){var b=[];n(a,function(a,c){L(a)?n(a,function(a){b.push(ga(c,!0)+(!0===a?"":"="+ga(a,!0)))}):b.push(ga(c,!0)+(!0===a?"":"="+ga(a,!0)))});return b.length?b.join("&"):""}function rb(a){return ga(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,
"=").replace(/%2B/gi,"+")}function ga(a,b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function ce(a,b){var d,c,e=Qa.length;for(c=0;c<e;++c)if(d=Qa[c]+b,E(d=a.getAttribute(d)))return d;return null}function de(a,b){var d,c,e={};n(Qa,function(b){b+="app";!d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a,c=a.getAttribute(b))});n(Qa,function(b){b+="app";var e;!d&&(e=a.querySelector("["+b.replace(":",
"\\:")+"]"))&&(d=e,c=e.getAttribute(b))});d&&(e.strictDi=null!==ce(d,"strict-di"),b(d,c?[c]:[],e))}function Ac(a,b,d){I(d)||(d={});d=T({strictDi:!1},d);var c=function(){a=C(a);if(a.injector()){var c=a[0]===W?"document":ra(a);throw Da("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}b=b||[];b.unshift(["$provide",function(b){b.value("$rootElement",a)}]);d.debugInfoEnabled&&b.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);b.unshift("ng");c=gb(b,d.strictDi);c.invoke(["$rootScope",
"$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;Q&&e.test(Q.name)&&(d.debugInfoEnabled=!0,Q.name=Q.name.replace(e,""));if(Q&&!f.test(Q.name))return c();Q.name=Q.name.replace(f,"");ha.resumeBootstrap=function(a){n(a,function(a){b.push(a)});return c()};D(ha.resumeDeferredBootstrap)&&ha.resumeDeferredBootstrap()}function ee(){Q.name="NG_ENABLE_DEBUG_INFO!"+Q.name;Q.location.reload()}
function fe(a){a=ha.element(a).injector();if(!a)throw Da("test");return a.get("$$testability")}function Bc(a,b){b=b||"_";return a.replace(ge,function(a,c){return(c?b:"")+a.toLowerCase()})}function he(){var a;if(!Cc){var b=sb();(sa=z(b)?Q.jQuery:b?Q[b]:v)&&sa.fn.on?(C=sa,T(sa.fn,{scope:Ra.scope,isolateScope:Ra.isolateScope,controller:Ra.controller,injector:Ra.injector,inheritedData:Ra.inheritedData}),a=sa.cleanData,sa.cleanData=function(b){for(var c,e=0,f;null!=(f=b[e]);e++)(c=sa._data(f,"events"))&&
c.$destroy&&sa(f).triggerHandler("$destroy");a(b)}):C=U;ha.element=C;Cc=!0}}function tb(a,b,d){if(!a)throw Da("areq",b||"?",d||"required");return a}function Sa(a,b,d){d&&L(a)&&(a=a[a.length-1]);tb(D(a),b,"not a function, got "+(a&&"object"===typeof a?a.constructor.name||"Object":typeof a));return a}function Ta(a,b){if("hasOwnProperty"===a)throw Da("badname",b);}function Dc(a,b,d){if(!b)return a;b=b.split(".");for(var c,e=a,f=b.length,g=0;g<f;g++)c=b[g],a&&(a=(e=a)[c]);return!d&&D(a)?vc(e,a):a}function ub(a){for(var b=
a[0],d=a[a.length-1],c,e=1;b!==d&&(b=b.nextSibling);e++)if(c||a[e]!==b)c||(c=C(va.call(a,0,e))),c.push(b);return c||a}function Z(){return Object.create(null)}function ie(a){function b(a,b,c){return a[b]||(a[b]=c())}var d=K("$injector"),c=K("ng");a=b(a,"angular",Object);a.$$minErr=a.$$minErr||K;return b(a,"module",function(){var a={};return function(f,g,h){if("hasOwnProperty"===f)throw c("badname","module");g&&a.hasOwnProperty(f)&&(a[f]=null);return b(a,f,function(){function a(b,d,e,f){f||(f=c);return function(){f[e||
"push"]([b,d,arguments]);return F}}function b(a,d){return function(b,e){e&&D(e)&&(e.$$moduleName=f);c.push([a,d,arguments]);return F}}if(!g)throw d("nomod",f);var c=[],e=[],s=[],H=a("$injector","invoke","push",e),F={_invokeQueue:c,_configBlocks:e,_runBlocks:s,requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide","decorator"),animation:b("$animateProvider",
"register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),component:b("$compileProvider","component"),config:H,run:function(a){s.push(a);return this}};h&&H(h);return F})}})}function je(a){T(a,{bootstrap:Ac,copy:Oa,extend:T,merge:Yd,equals:na,element:C,forEach:n,injector:gb,noop:x,bind:vc,toJson:fb,fromJson:wc,identity:bb,isUndefined:z,isDefined:y,isString:E,isFunction:D,isObject:I,isNumber:P,isElement:Rb,isArray:L,
version:ke,isDate:V,lowercase:G,uppercase:vb,callbacks:{counter:0},getTestability:fe,$$minErr:K,$$csp:Ea,reloadWithDebugInfo:ee});Vb=ie(Q);Vb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:le});a.provider("$compile",Ec).directive({a:me,input:Fc,textarea:Fc,form:ne,script:oe,select:pe,style:qe,option:re,ngBind:se,ngBindHtml:te,ngBindTemplate:ue,ngClass:ve,ngClassEven:we,ngClassOdd:xe,ngCloak:ye,ngController:ze,ngForm:Ae,ngHide:Be,ngIf:Ce,ngInclude:De,ngInit:Ee,ngNonBindable:Fe,
ngPluralize:Ge,ngRepeat:He,ngShow:Ie,ngStyle:Je,ngSwitch:Ke,ngSwitchWhen:Le,ngSwitchDefault:Me,ngOptions:Ne,ngTransclude:Oe,ngModel:Pe,ngList:Qe,ngChange:Re,pattern:Gc,ngPattern:Gc,required:Hc,ngRequired:Hc,minlength:Ic,ngMinlength:Ic,maxlength:Jc,ngMaxlength:Jc,ngValue:Se,ngModelOptions:Te}).directive({ngInclude:Ue}).directive(wb).directive(Kc);a.provider({$anchorScroll:Ve,$animate:We,$animateCss:Xe,$$animateJs:Ye,$$animateQueue:Ze,$$AnimateRunner:$e,$$animateAsyncRun:af,$browser:bf,$cacheFactory:cf,
$controller:df,$document:ef,$exceptionHandler:ff,$filter:Lc,$$forceReflow:gf,$interpolate:hf,$interval:jf,$http:kf,$httpParamSerializer:lf,$httpParamSerializerJQLike:mf,$httpBackend:nf,$xhrFactory:of,$location:pf,$log:qf,$parse:rf,$rootScope:sf,$q:tf,$$q:uf,$sce:vf,$sceDelegate:wf,$sniffer:xf,$templateCache:yf,$templateRequest:zf,$$testability:Af,$timeout:Bf,$window:Cf,$$rAF:Df,$$jqLite:Ef,$$HashMap:Ff,$$cookieReader:Gf})}])}function hb(a){return a.replace(Hf,function(a,d,c,e){return e?c.toUpperCase():
c}).replace(If,"Moz$1")}function Mc(a){a=a.nodeType;return 1===a||!a||9===a}function Nc(a,b){var d,c,e=b.createDocumentFragment(),f=[];if(Wb.test(a)){d=d||e.appendChild(b.createElement("div"));c=(Jf.exec(a)||["",""])[1].toLowerCase();c=da[c]||da._default;d.innerHTML=c[1]+a.replace(Kf,"<$1></$2>")+c[2];for(c=c[0];c--;)d=d.lastChild;f=eb(f,d.childNodes);d=e.firstChild;d.textContent=""}else f.push(b.createTextNode(a));e.textContent="";e.innerHTML="";n(f,function(a){e.appendChild(a)});return e}function Oc(a,
b){var d=a.parentNode;d&&d.replaceChild(b,a);b.appendChild(a)}function U(a){if(a instanceof U)return a;var b;E(a)&&(a=X(a),b=!0);if(!(this instanceof U)){if(b&&"<"!=a.charAt(0))throw Xb("nosel");return new U(a)}if(b){b=W;var d;a=(d=Lf.exec(a))?[b.createElement(d[1])]:(d=Nc(a,b))?d.childNodes:[]}Pc(this,a)}function Yb(a){return a.cloneNode(!0)}function xb(a,b){b||ib(a);if(a.querySelectorAll)for(var d=a.querySelectorAll("*"),c=0,e=d.length;c<e;c++)ib(d[c])}function Qc(a,b,d,c){if(y(c))throw Xb("offargs");
var e=(c=yb(a))&&c.events,f=c&&c.handle;if(f)if(b){var g=function(b){var c=e[b];y(d)&&db(c||[],d);y(d)&&c&&0<c.length||(a.removeEventListener(b,f,!1),delete e[b])};n(b.split(" "),function(a){g(a);zb[a]&&g(zb[a])})}else for(b in e)"$destroy"!==b&&a.removeEventListener(b,f,!1),delete e[b]}function ib(a,b){var d=a.ng339,c=d&&jb[d];c&&(b?delete c.data[b]:(c.handle&&(c.events.$destroy&&c.handle({},"$destroy"),Qc(a)),delete jb[d],a.ng339=v))}function yb(a,b){var d=a.ng339,d=d&&jb[d];b&&!d&&(a.ng339=d=++Mf,
d=jb[d]={events:{},data:{},handle:v});return d}function Zb(a,b,d){if(Mc(a)){var c=y(d),e=!c&&b&&!I(b),f=!b;a=(a=yb(a,!e))&&a.data;if(c)a[b]=d;else{if(f)return a;if(e)return a&&a[b];T(a,b)}}}function Ab(a,b){return a.getAttribute?-1<(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" "):!1}function Bb(a,b){b&&a.setAttribute&&n(b.split(" "),function(b){a.setAttribute("class",X((" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+X(b)+" "," ")))})}function Cb(a,
b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");n(b.split(" "),function(a){a=X(a);-1===d.indexOf(" "+a+" ")&&(d+=a+" ")});a.setAttribute("class",X(d))}}function Pc(a,b){if(b)if(b.nodeType)a[a.length++]=b;else{var d=b.length;if("number"===typeof d&&b.window!==b){if(d)for(var c=0;c<d;c++)a[a.length++]=b[c]}else a[a.length++]=b}}function Rc(a,b){return Db(a,"$"+(b||"ngController")+"Controller")}function Db(a,b,d){9==a.nodeType&&(a=a.documentElement);for(b=
L(b)?b:[b];a;){for(var c=0,e=b.length;c<e;c++)if(y(d=C.data(a,b[c])))return d;a=a.parentNode||11===a.nodeType&&a.host}}function Sc(a){for(xb(a,!0);a.firstChild;)a.removeChild(a.firstChild)}function $b(a,b){b||xb(a);var d=a.parentNode;d&&d.removeChild(a)}function Nf(a,b){b=b||Q;if("complete"===b.document.readyState)b.setTimeout(a);else C(b).on("load",a)}function Tc(a,b){var d=Eb[b.toLowerCase()];return d&&Uc[qa(a)]&&d}function Of(a,b){var d=function(c,d){c.isDefaultPrevented=function(){return c.defaultPrevented};
var f=b[d||c.type],g=f?f.length:0;if(g){if(z(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};var k=f.specialHandlerWrapper||Pf;1<g&&(f=ma(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||k(a,c,f[l])}};d.elem=a;return d}function Pf(a,b,d){d.call(a,b)}function Qf(a,b,
d){var c=b.relatedTarget;c&&(c===a||Rf.call(a,c))||d.call(a,b)}function Ef(){this.$get=function(){return T(U,{hasClass:function(a,b){a.attr&&(a=a[0]);return Ab(a,b)},addClass:function(a,b){a.attr&&(a=a[0]);return Cb(a,b)},removeClass:function(a,b){a.attr&&(a=a[0]);return Bb(a,b)}})}}function Fa(a,b){var d=a&&a.$$hashKey;if(d)return"function"===typeof d&&(d=a.$$hashKey()),d;d=typeof a;return d="function"==d||"object"==d&&null!==a?a.$$hashKey=d+":"+(b||Xd)():d+":"+a}function Ua(a,b){if(b){var d=0;this.nextUid=
function(){return++d}}n(a,this.put,this)}function Vc(a){a=a.toString().replace(Sf,"");return a.match(Tf)||a.match(Uf)}function Vf(a){return(a=Vc(a))?"function("+(a[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function gb(a,b){function d(a){return function(b,c){if(I(b))n(b,sc(a));else return a(b,c)}}function c(a,b){Ta(a,"service");if(D(b)||L(b))b=s.instantiate(b);if(!b.$get)throw Ga("pget",a);return r[a+"Provider"]=b}function e(a,b){return function(){var c=t.invoke(b,this);if(z(c))throw Ga("undef",a);
return c}}function f(a,b,d){return c(a,{$get:!1!==d?e(a,b):b})}function g(a){tb(z(a)||L(a),"modulesToLoad","not an array");var b=[],c;n(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=s.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{E(a)?(c=Vb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):D(a)?b.push(s.invoke(a)):L(a)?b.push(s.invoke(a)):Sa(a,"module")}catch(e){throw L(a)&&(a=a[a.length-1]),e.message&&e.stack&&
-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ga("modulerr",a,e.stack||e.message||e);}}});return b}function h(a,c){function d(b,e){if(a.hasOwnProperty(b)){if(a[b]===k)throw Ga("cdep",b+" <- "+l.join(" <- "));return a[b]}try{return l.unshift(b),a[b]=k,a[b]=c(b,e)}catch(f){throw a[b]===k&&delete a[b],f;}finally{l.shift()}}function e(a,c,f){var g=[];a=gb.$$annotate(a,b,f);for(var h=0,k=a.length;h<k;h++){var l=a[h];if("string"!==typeof l)throw Ga("itkn",l);g.push(c&&c.hasOwnProperty(l)?c[l]:
d(l,f))}return g}return{invoke:function(a,b,c,d){"string"===typeof c&&(d=c,c=null);c=e(a,c,d);L(a)&&(a=a[a.length-1]);d=11>=wa?!1:"function"===typeof a&&/^(?:class\s|constructor\()/.test(Function.prototype.toString.call(a));return d?(c.unshift(null),new (Function.prototype.bind.apply(a,c))):a.apply(b,c)},instantiate:function(a,b,c){var d=L(a)?a[a.length-1]:a;a=e(a,b,c);a.unshift(null);return new (Function.prototype.bind.apply(d,a))},get:d,annotate:gb.$$annotate,has:function(b){return r.hasOwnProperty(b+
"Provider")||a.hasOwnProperty(b)}}}b=!0===b;var k={},l=[],m=new Ua([],!0),r={$provide:{provider:d(c),factory:d(f),service:d(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:d(function(a,b){return f(a,ba(b),!1)}),constant:d(function(a,b){Ta(a,"constant");r[a]=b;H[a]=b}),decorator:function(a,b){var c=s.get(a+"Provider"),d=c.$get;c.$get=function(){var a=t.invoke(d,c);return t.invoke(b,null,{$delegate:a})}}}},s=r.$injector=h(r,function(a,b){ha.isString(b)&&l.push(b);
throw Ga("unpr",l.join(" <- "));}),H={},F=h(H,function(a,b){var c=s.get(a+"Provider",b);return t.invoke(c.$get,c,v,a)}),t=F;r.$injectorProvider={$get:ba(F)};var p=g(a),t=F.get("$injector");t.strictDi=b;n(p,function(a){a&&t.invoke(a)});return t}function Ve(){var a=!0;this.disableAutoScrolling=function(){a=!1};this.$get=["$window","$location","$rootScope",function(b,d,c){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===qa(a))return b=a,!0});return b}function f(a){if(a){a.scrollIntoView();
var c;c=g.yOffset;D(c)?c=c():Rb(c)?(c=c[0],c="fixed"!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):P(c)||(c=0);c&&(a=a.getBoundingClientRect().top,b.scrollBy(0,a-c))}else b.scrollTo(0,0)}function g(a){a=E(a)?a:d.hash();var b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=b.document;a&&c.$watch(function(){return d.hash()},function(a,b){a===b&&""===a||Nf(function(){c.$evalAsync(g)})});return g}]}function kb(a,b){if(!a&&!b)return"";
if(!a)return b;if(!b)return a;L(a)&&(a=a.join(" "));L(b)&&(b=b.join(" "));return a+" "+b}function Wf(a){E(a)&&(a=a.split(" "));var b=Z();n(a,function(a){a.length&&(b[a]=!0)});return b}function Ha(a){return I(a)?a:{}}function Xf(a,b,d,c){function e(a){try{a.apply(null,va.call(arguments,1))}finally{if(F--,0===F)for(;t.length;)try{t.pop()()}catch(b){d.error(b)}}}function f(){B=null;g();h()}function g(){a:{try{p=m.state;break a}catch(a){}p=void 0}p=z(p)?null:p;na(p,$)&&(p=$);$=p}function h(){if(u!==k.url()||
w!==p)u=k.url(),w=p,n(A,function(a){a(k.url(),p)})}var k=this,l=a.location,m=a.history,r=a.setTimeout,s=a.clearTimeout,H={};k.isMock=!1;var F=0,t=[];k.$$completeOutstandingRequest=e;k.$$incOutstandingRequestCount=function(){F++};k.notifyWhenNoOutstandingRequests=function(a){0===F?a():t.push(a)};var p,w,u=l.href,ka=b.find("base"),B=null;g();w=p;k.url=function(b,d,e){z(e)&&(e=null);l!==a.location&&(l=a.location);m!==a.history&&(m=a.history);if(b){var f=w===e;if(u===b&&(!c.history||f))return k;var h=
u&&Ia(u)===Ia(b);u=b;w=e;if(!c.history||h&&f){if(!h||B)B=b;d?l.replace(b):h?(d=l,e=b.indexOf("#"),e=-1===e?"":b.substr(e),d.hash=e):l.href=b;l.href!==b&&(B=b)}else m[d?"replaceState":"pushState"](e,"",b),g(),w=p;return k}return B||l.href.replace(/%27/g,"'")};k.state=function(){return p};var A=[],O=!1,$=null;k.onUrlChange=function(b){if(!O){if(c.history)C(a).on("popstate",f);C(a).on("hashchange",f);O=!0}A.push(b);return b};k.$$applicationDestroyed=function(){C(a).off("hashchange popstate",f)};k.$$checkUrlChange=
h;k.baseHref=function(){var a=ka.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};k.defer=function(a,b){var c;F++;c=r(function(){delete H[c];e(a)},b||0);H[c]=!0;return c};k.defer.cancel=function(a){return H[a]?(delete H[a],s(a),e(x),!0):!1}}function bf(){this.$get=["$window","$log","$sniffer","$document",function(a,b,d,c){return new Xf(a,c,b,d)}]}function cf(){this.$get=function(){function a(a,c){function e(a){a!=r&&(s?s==a&&(s=a.n):s=a,f(a.n,a.p),f(a,r),r=a,r.n=null)}function f(a,
b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(a in b)throw K("$cacheFactory")("iid",a);var g=0,h=T({},c,{id:a}),k=Z(),l=c&&c.capacity||Number.MAX_VALUE,m=Z(),r=null,s=null;return b[a]={put:function(a,b){if(!z(b)){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}a in k||g++;k[a]=b;g>l&&this.remove(s.key);return b}},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return k[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==r&&(r=b.p);b==s&&(s=b.n);f(b.n,b.p);delete m[a]}a in
k&&(delete k[a],g--)},removeAll:function(){k=Z();g=0;m=Z();r=s=null},destroy:function(){m=h=k=null;delete b[a]},info:function(){return T({},h,{size:g})}}}var b={};a.info=function(){var a={};n(b,function(b,e){a[e]=b.info()});return a};a.get=function(a){return b[a]};return a}}function yf(){this.$get=["$cacheFactory",function(a){return a("templates")}]}function Ec(a,b){function d(a,b,c){var d=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,e={};n(a,function(a,f){var g=a.match(d);if(!g)throw ia("iscp",b,f,a,c?"controller bindings definition":
"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f}});return e}function c(a){var b=a.charAt(0);if(!b||b!==G(b))throw ia("baddir",a);if(a!==a.trim())throw ia("baddir",a);}var e={},f=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,g=/(([\w\-]+)(?:\:([^;]+))?;?)/,h=ae("ngSrc,ngSrcset,src,srcset"),k=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,l=/^(on[a-z]+|formaction)$/;this.directive=function s(b,f){Ta(b,"directive");E(b)?(c(b),tb(f,"directiveFactory"),e.hasOwnProperty(b)||
(e[b]=[],a.factory(b+"Directive",["$injector","$exceptionHandler",function(a,c){var f=[];n(e[b],function(e,g){try{var h=a.invoke(e);D(h)?h={compile:ba(h)}:!h.compile&&h.link&&(h.compile=ba(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||b;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";var k=h,l=h,m=h.name,s={isolateScope:null,bindToController:null};I(l.scope)&&(!0===l.bindToController?(s.bindToController=d(l.scope,m,!0),s.isolateScope={}):s.isolateScope=d(l.scope,
m,!1));I(l.bindToController)&&(s.bindToController=d(l.bindToController,m,!0));if(I(s.bindToController)){var R=l.controller,S=l.controllerAs;if(!R)throw ia("noctrl",m);if(!Wc(R,S))throw ia("noident",m);}var la=k.$$bindings=s;I(la.isolateScope)&&(h.$$isolateBindings=la.isolateScope);h.$$moduleName=e.$$moduleName;f.push(h)}catch(F){c(F)}});return f}])),e[b].push(f)):n(b,sc(s));return this};this.component=function(a,b){function c(a){function e(b){return D(b)||L(b)?function(c,d){return a.invoke(b,this,
{$element:c,$attrs:d})}:b}var f=b.template||b.templateUrl?b.template:"";return{controller:d,controllerAs:Wc(b.controller)||b.controllerAs||"$ctrl",template:e(f),templateUrl:e(b.templateUrl),transclude:b.transclude,scope:{},bindToController:b.bindings||{},restrict:"E",require:b.require}}var d=b.controller||function(){};n(b,function(a,b){"$"===b.charAt(0)&&(c[b]=a)});c.$inject=["$injector"];return this.directive(a,c)};this.aHrefSanitizationWhitelist=function(a){return y(a)?(b.aHrefSanitizationWhitelist(a),
this):b.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(a){return y(a)?(b.imgSrcSanitizationWhitelist(a),this):b.imgSrcSanitizationWhitelist()};var m=!0;this.debugInfoEnabled=function(a){return y(a)?(m=a,this):m};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$sce","$animate","$$sanitizeUri",function(a,b,c,d,p,w,u,ka,B,A){function O(a,b,c){ba.innerHTML="<span "+b+">";b=ba.firstChild.attributes;var d=b[0];b.removeNamedItem(d.name);
d.value=c;a.attributes.setNamedItem(d)}function $(a,b){try{a.addClass(b)}catch(c){}}function N(a,b,c,d,e){a instanceof C||(a=C(a));for(var f=/\S+/,g=0,h=a.length;g<h;g++){var k=a[g];k.nodeType===Pa&&k.nodeValue.match(f)&&Oc(k,a[g]=W.createElement("span"))}var l=R(a,b,a,c,d,e);N.$$addScopeClass(a);var m=null;return function(b,c,d){tb(b,"scope");e&&e.needsNewScope&&(b=b.$parent.$new());d=d||{};var f=d.parentBoundTranscludeFn,g=d.transcludeControllers;d=d.futureParentElement;f&&f.$$boundTransclude&&
(f=f.$$boundTransclude);m||(m=(d=d&&d[0])?"foreignobject"!==qa(d)&&fa.call(d).match(/SVG/)?"svg":"html":"html");d="html"!==m?C(U(m,C("<div>").append(a).html())):c?Ra.clone.call(a):a;if(g)for(var h in g)d.data("$"+h+"Controller",g[h].instance);N.$$addScopeInfo(d,b);c&&c(d,b);l&&l(b,d,d,f);return d}}function R(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,m,p,s,u;if(A)for(u=Array(c.length),m=0;m<h.length;m+=3)f=h[m],u[f]=c[f];else u=c;m=0;for(p=h.length;m<p;)k=u[h[m++]],c=h[m++],f=h[m++],c?(c.scope?(l=
a.$new(),N.$$addScopeInfo(C(k),l)):l=a,s=c.transcludeOnThisElement?S(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?S(a,b):null,c(f,l,k,d,s)):f&&f(a,k.childNodes,v,e)}for(var h=[],k,l,m,p,A,s=0;s<a.length;s++){k=new ma;l=la(a[s],[],k,0===s?d:v,e);(f=l.length?y(l,a[s],k,b,c,null,[],[],f):null)&&f.scope&&N.$$addScopeClass(k.$$element);k=f&&f.terminal||!(m=a[s].childNodes)||!m.length?null:R(m,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(s,f,k),p=!0,A=
A||f;f=null}return p?g:null}function S(a,b,c){var d=function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})},e=d.$$slots=Z(),f;for(f in b.$$slots)e[f]=b.$$slots[f]?S(a,b.$$slots[f],c):null;return d}function la(a,b,c,d,e){var h=c.$attr,k;switch(a.nodeType){case 1:K(b,ta(qa(a)),"E",d,e);for(var l,m,p,s=a.attributes,A=0,u=s&&s.length;A<u;A++){var t=!1,N=!1;l=s[A];k=l.name;m=X(l.value);l=ta(k);if(p=oa.test(l))k=
k.replace(Xc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});(l=l.match(sa))&&Q(l[1])&&(t=k,N=k.substr(0,k.length-5)+"end",k=k.substr(0,k.length-6));l=ta(k.toLowerCase());h[l]=k;if(p||!c.hasOwnProperty(l))c[l]=m,Tc(a,l)&&(c[l]=!0);Y(a,b,m,l,p);K(b,l,"A",d,e,t,N)}a=a.className;I(a)&&(a=a.animVal);if(E(a)&&""!==a)for(;k=g.exec(a);)l=ta(k[2]),K(b,l,"C",d,e)&&(c[l]=X(k[3])),a=a.substr(k.index+k[0].length);break;case Pa:if(11===wa)for(;a.parentNode&&a.nextSibling&&a.nextSibling.nodeType===
Pa;)a.nodeValue+=a.nextSibling.nodeValue,a.parentNode.removeChild(a.nextSibling);P(b,a.nodeValue);break;case 8:try{if(k=f.exec(a.nodeValue))l=ta(k[1]),K(b,l,"M",d,e)&&(c[l]=X(k[2]))}catch(w){}}b.sort(ya);return b}function Va(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ia("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return C(d)}function q(a,b,c){return function(d,e,f,g,h){e=Va(e[0],
b,c);return a(d,e,f,g,h)}}function ac(a,b,c,d,e,f){if(a)return N(b,c,d,e,f);var g;return function(){g||(g=N(b,c,d,e,f),b=c=f=null);return g.apply(this,arguments)}}function y(a,b,d,e,f,g,h,l,m){function p(a,b,c,d){if(a){c&&(a=q(a,c,d));a.require=J.require;a.directiveName=K;if(R===J||J.$$isolateScope)a=ca(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=q(b,c,d));b.require=J.require;b.directiveName=K;if(R===J||J.$$isolateScope)b=ca(b,{isolateScope:!0});l.push(b)}}function s(a,b,c,d){var e;if(E(b)){var f=
b.match(k);b=b.substring(f[0].length);var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;if(!e){var h="$"+b+"Controller";e=g?c.inheritedData(h):c.data(h)}if(!e&&!f)throw ia("ctreq",b,a);}else if(L(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=s(a,b[g],c,d);else I(b)&&(e={},n(b,function(b,f){e[f]=s(a,b,c,d)}));return e||null}function A(a,b,c,d,e,f){var g=Z(),h;for(h in d){var k=d[h],l={$scope:k===R||k.$$isolateScope?e:f,$element:a,$attrs:b,$transclude:c},m=k.controller;"@"==m&&
(m=b[k.name]);l=w(m,l,!0,k.controllerAs);g[k.name]=l;x||a.data("$"+k.name+"Controller",l.instance)}return g}function u(a,c,e,f,g){function k(a,b,c,d){var e;cb(a)||(d=c,c=b,b=a,a=v);x&&(e=la);c||(c=x?B.parent():B);if(d){var f=g.$$slots[d];if(f)return f(a,b,e,c,q);if(z(f))throw ia("noslot",d,ra(B));}else return g(a,b,e,c,q)}var m,p,t,w,la,S,B,Ja;b===e?(f=d,B=d.$$element):(B=C(e),f=new ma(B,d));t=c;R?w=c.$new(!0):O&&(t=c.$parent);g&&(S=k,S.$$boundTransclude=g,S.isSlotFilled=function(a){return!!g.$$slots[a]});
H&&(la=A(B,f,S,H,w,c));R&&(N.$$addScopeInfo(B,w,!0,!($&&($===R||$===R.$$originalDirective))),N.$$addScopeClass(B,!0),w.$$isolateBindings=R.$$isolateBindings,(Ja=ha(c,f,w,w.$$isolateBindings,R))&&w.$on("$destroy",Ja));for(p in la){Ja=H[p];var F=la[p],ka=Ja.$$bindings.bindToController;F.identifier&&ka&&(m=ha(t,f,F.instance,ka,Ja));var Va=F();Va!==F.instance&&(F.instance=Va,B.data("$"+Ja.name+"Controller",Va),m&&m(),m=ha(t,f,F.instance,ka,Ja))}n(H,function(a,b){var c=a.require;a.bindToController&&!L(c)&&
I(c)&&T(la[b].instance,s(b,c,B,la))});n(la,function(a){D(a.instance.$onInit)&&a.instance.$onInit()});m=0;for(p=h.length;m<p;m++)t=h[m],ja(t,t.isolateScope?w:c,B,f,t.require&&s(t.directiveName,t.require,B,la),S);var q=c;R&&(R.template||null===R.templateUrl)&&(q=w);a&&a(q,e.childNodes,v,g);for(m=l.length-1;0<=m;m--)t=l[m],ja(t,t.isolateScope?w:c,B,f,t.require&&s(t.directiveName,t.require,B,la),S)}m=m||{};for(var t=-Number.MAX_VALUE,O=m.newScopeDirective,H=m.controllerDirectives,R=m.newIsolateScopeDirective,
$=m.templateDirective,S=m.nonTlbTranscludeDirective,B=!1,ka=!1,x=m.hasElementTranscludeDirective,ea=d.$$element=C(b),J,K,G,ya=e,Q,P=!1,Fb=!1,M,xa=0,Wa=a.length;xa<Wa;xa++){J=a[xa];var Y=J.$$start,ba=J.$$end;Y&&(ea=Va(b,Y,ba));G=v;if(t>J.priority)break;if(M=J.scope)J.templateUrl||(I(M)?(Xa("new/isolated scope",R||O,J,ea),R=J):Xa("new/isolated scope",R,J,ea)),O=O||J;K=J.name;if(!P&&(J.replace&&(J.templateUrl||J.template)||J.transclude&&!J.$$tlb)){for(M=xa+1;P=a[M++];)if(P.transclude&&!P.$$tlb||P.replace&&
(P.templateUrl||P.template)){Fb=!0;break}P=!0}!J.templateUrl&&J.controller&&(M=J.controller,H=H||Z(),Xa("'"+K+"' controller",H[K],J,ea),H[K]=J);if(M=J.transclude)if(B=!0,J.$$tlb||(Xa("transclusion",S,J,ea),S=J),"element"==M)x=!0,t=J.priority,G=ea,ea=d.$$element=C(W.createComment(" "+K+": "+d[K]+" ")),b=ea[0],aa(f,va.call(G,0),b),ya=ac(Fb,G,e,t,g&&g.name,{nonTlbTranscludeDirective:S});else{var V=Z();G=C(Yb(b)).contents();if(I(M)){G=[];var ga=Z(),da=Z();n(M,function(a,b){var c="?"===a.charAt(0);a=c?
a.substring(1):a;ga[a]=b;V[b]=null;da[b]=c});n(ea.contents(),function(a){var b=ga[ta(qa(a))];b?(da[b]=!0,V[b]=V[b]||[],V[b].push(a)):G.push(a)});n(da,function(a,b){if(!a)throw ia("reqslot",b);});for(var fa in V)V[fa]&&(V[fa]=ac(Fb,V[fa],e))}ea.empty();ya=ac(Fb,G,e,v,v,{needsNewScope:J.$$isolateScope||J.$$newScope});ya.$$slots=V}if(J.template)if(ka=!0,Xa("template",$,J,ea),$=J,M=D(J.template)?J.template(ea,d):J.template,M=pa(M),J.replace){g=J;G=Wb.test(M)?Yc(U(J.templateNamespace,X(M))):[];b=G[0];
if(1!=G.length||1!==b.nodeType)throw ia("tplrt",K,"");aa(f,ea,b);Wa={$attr:{}};M=la(b,[],Wa);var na=a.splice(xa+1,a.length-(xa+1));(R||O)&&Zc(M,R,O);a=a.concat(M).concat(na);$c(d,Wa);Wa=a.length}else ea.html(M);if(J.templateUrl)ka=!0,Xa("template",$,J,ea),$=J,J.replace&&(g=J),u=Yf(a.splice(xa,a.length-xa),ea,d,f,B&&ya,h,l,{controllerDirectives:H,newScopeDirective:O!==J&&O,newIsolateScopeDirective:R,templateDirective:$,nonTlbTranscludeDirective:S}),Wa=a.length;else if(J.compile)try{Q=J.compile(ea,
d,ya),D(Q)?p(null,Q,Y,ba):Q&&p(Q.pre,Q.post,Y,ba)}catch(oa){c(oa,ra(ea))}J.terminal&&(u.terminal=!0,t=Math.max(t,J.priority))}u.scope=O&&!0===O.scope;u.transcludeOnThisElement=B;u.templateOnThisElement=ka;u.transclude=ya;m.hasElementTranscludeDirective=x;return u}function Zc(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d]=Sb(a[d],{$$isolateScope:b,$$newScope:c})}function K(b,d,f,g,h,k,l){if(d===h)return null;h=null;if(e.hasOwnProperty(d)){var m;d=a.get(d+"Directive");for(var p=0,A=d.length;p<A;p++)try{m=
d[p],(z(g)||g>m.priority)&&-1!=m.restrict.indexOf(f)&&(k&&(m=Sb(m,{$$start:k,$$end:l})),b.push(m),h=m)}catch(t){c(t)}}return h}function Q(b){if(e.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,f=c.length;d<f;d++)if(b=c[d],b.multiElement)return!0;return!1}function $c(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;n(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});n(b,function(b,f){"class"==f?($(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+
b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function Yf(a,b,c,e,f,g,h,k){var l=[],m,p,s=b[0],A=a.shift(),u=Sb(A,{templateUrl:null,transclude:null,replace:null,$$originalDirective:A}),w=D(A.templateUrl)?A.templateUrl(b,c):A.templateUrl,N=A.templateNamespace;b.empty();d(w).then(function(d){var t,O;d=pa(d);if(A.replace){d=Wb.test(d)?Yc(U(N,X(d))):[];t=d[0];if(1!=d.length||1!==t.nodeType)throw ia("tplrt",
A.name,w);d={$attr:{}};aa(e,b,t);var H=la(t,[],d);I(A.scope)&&Zc(H,!0);a=H.concat(a);$c(c,d)}else t=s,b.html(d);a.unshift(u);m=y(a,t,c,f,b,A,g,h,k);n(e,function(a,c){a==t&&(e[c]=b[0])});for(p=R(b[0].childNodes,f);l.length;){d=l.shift();O=l.shift();var B=l.shift(),F=l.shift(),H=b[0];if(!d.$$destroyed){if(O!==s){var ka=O.className;k.hasElementTranscludeDirective&&A.replace||(H=Yb(t));aa(B,C(O),H);$(C(H),ka)}O=m.transcludeOnThisElement?S(d,m.transclude,F):F;m(p,d,H,e,O)}}l=null});return function(a,b,
c,d,e){a=e;b.$$destroyed||(l?l.push(b,c,d,a):(m.transcludeOnThisElement&&(a=S(b,m.transclude,e)),m(p,b,c,d,a)))}}function ya(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function Xa(a,b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw ia("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,ra(d));}function P(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&N.$$addBindingClass(a);
return function(a,c){var e=c.parent();b||N.$$addBindingClass(e);N.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function U(a,b){a=G(a||"html");switch(a){case "svg":case "math":var c=W.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function M(a,b){if("srcdoc"==b)return ka.HTML;var c=qa(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return ka.RESOURCE_URL}function Y(a,c,d,e,
f){var g=M(a,e);f=h[e]||f;var k=b(d,!0,g,f);if(k){if("multiple"===e&&"select"===qa(a))throw ia("selmulti",ra(a));c.push({priority:100,compile:function(){return{pre:function(a,c,h){c=h.$$observers||(h.$$observers=Z());if(l.test(e))throw ia("nodomevents");var m=h[e];m!==d&&(k=m&&b(m,!0,g,f),d=m);k&&(h[e]=k(a),(c[e]||(c[e]=[])).$$inter=!0,(h.$$observers&&h.$$observers[e].$$scope||a).$watch(k,function(a,b){"class"===e&&a!=b?h.$updateClass(a,b):h.$set(e,a)}))}}}})}}function aa(a,b,c){var d=b[0],e=b.length,
f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=W.createDocumentFragment();for(g=0;g<e;g++)a.appendChild(b[g]);C.hasData(d)&&(C.data(c,C.data(d)),C(d).off("$destroy"));C.cleanData(a.querySelectorAll("*"));for(g=1;g<e;g++)delete b[g];b[0]=c;b.length=1}function ca(a,b){return T(function(){return a.apply(null,arguments)},a,b)}function ja(a,
b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,ra(d))}}function ha(a,c,d,e,f){var g=[];n(e,function(e,h){var k=e.attrName,l=e.optional,m,A,s,t;switch(e.mode){case "@":l||ua.call(c,k)||(d[h]=c[k]=void 0);c.$observe(k,function(a){E(a)&&(d[h]=a)});c.$$observers[k].$$scope=a;m=c[k];E(m)?d[h]=b(m)(a):Na(m)&&(d[h]=m);break;case "=":if(!ua.call(c,k)){if(l)break;c[k]=void 0}if(l&&!c[k])break;A=p(c[k]);t=A.literal?na:function(a,b){return a===b||a!==a&&b!==b};s=A.assign||function(){m=d[h]=A(a);throw ia("nonassign",
c[k],k,f.name);};m=d[h]=A(a);l=function(b){t(b,d[h])||(t(b,m)?s(a,b=d[h]):d[h]=b);return m=b};l.$stateful=!0;l=e.collection?a.$watchCollection(c[k],l):a.$watch(p(c[k],l),null,A.literal);g.push(l);break;case "&":A=c.hasOwnProperty(k)?p(c[k]):x;if(A===x&&l)break;d[h]=function(b){return A(a,b)}}});return g.length&&function(){for(var a=0,b=g.length;a<b;++a)g[a]()}}var V=/^\w/,ba=W.createElement("div"),ma=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr=
{};this.$$element=a};ma.prototype={$normalize:ta,$addClass:function(a){a&&0<a.length&&B.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&B.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=ad(a,b);c&&c.length&&B.addClass(this.$$element,c);(c=ad(b,a))&&c.length&&B.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=Tc(this.$$element[0],a),g=bd[a],h=a;f?(this.$$element.prop(a,b),e=f):g&&(this[g]=b,h=g);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=
e=Bc(a,"-"));f=qa(this.$$element);if("a"===f&&("href"===a||"xlinkHref"===a)||"img"===f&&"src"===a)this[a]=b=A(b,"src"===a);else if("img"===f&&"srcset"===a){for(var f="",g=X(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(g)?k:/(,)/,g=g.split(k),k=Math.floor(g.length/2),l=0;l<k;l++)var m=2*l,f=f+A(X(g[m]),!0),f=f+(" "+X(g[m+1]));g=X(g[2*l]).split(/\s/);f+=A(X(g[0]),!0);2===g.length&&(f+=" "+X(g[1]));this[a]=b=f}!1!==d&&(null===b||z(b)?this.$$element.removeAttr(e):V.test(e)?this.$$element.attr(e,
b):O(this.$$element[0],e,b));(a=this.$$observers)&&n(a[h],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=Z()),e=d[a]||(d[a]=[]);e.push(b);u.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||z(c[a])||b(c[a])});return function(){db(e,b)}}};var ga=b.startSymbol(),da=b.endSymbol(),pa="{{"==ga&&"}}"==da?bb:function(a){return a.replace(/\{\{/g,ga).replace(/}}/g,da)},oa=/^ngAttr[A-Z]/,sa=/^(.+)Start$/;N.$$addBindingInfo=m?function(a,b){var c=
a.data("$binding")||[];L(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:x;N.$$addBindingClass=m?function(a){$(a,"ng-binding")}:x;N.$$addScopeInfo=m?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:x;N.$$addScopeClass=m?function(a,b){$(a,b?"ng-isolate-scope":"ng-scope")}:x;return N}]}function ta(a){return hb(a.replace(Xc,""))}function ad(a,b){var d="",c=a.split(/\s+/),e=b.split(/\s+/),f=0;a:for(;f<c.length;f++){for(var g=c[f],h=0;h<e.length;h++)if(g==e[h])continue a;
d+=(0<d.length?" ":"")+g}return d}function Yc(a){a=C(a);var b=a.length;if(1>=b)return a;for(;b--;)8===a[b].nodeType&&Zf.call(a,b,1);return a}function Wc(a,b){if(b&&E(b))return b;if(E(a)){var d=cd.exec(a);if(d)return d[3]}}function df(){var a={},b=!1;this.register=function(b,c){Ta(b,"controller");I(b)?T(a,b):a[b]=c};this.allowGlobals=function(){b=!0};this.$get=["$injector","$window",function(d,c){function e(a,b,c,d){if(!a||!I(a.$scope))throw K("$controller")("noscp",d,b);a.$scope[b]=c}return function(f,
g,h,k){var l,m,r;h=!0===h;k&&E(k)&&(r=k);if(E(f)){k=f.match(cd);if(!k)throw $f("ctrlfmt",f);m=k[1];r=r||k[3];f=a.hasOwnProperty(m)?a[m]:Dc(g.$scope,m,!0)||(b?Dc(c,m,!0):v);Sa(f,m,!0)}if(h)return h=(L(f)?f[f.length-1]:f).prototype,l=Object.create(h||null),r&&e(g,r,l,m||f.name),T(function(){var a=d.invoke(f,l,g,m);a!==l&&(I(a)||D(a))&&(l=a,r&&e(g,r,l,m||f.name));return l},{instance:l,identifier:r});l=d.instantiate(f,g,m);r&&e(g,r,l,m||f.name);return l}}]}function ef(){this.$get=["$window",function(a){return C(a.document)}]}
function ff(){this.$get=["$log",function(a){return function(b,d){a.error.apply(a,arguments)}}]}function bc(a){return I(a)?V(a)?a.toISOString():fb(a):a}function lf(){this.$get=function(){return function(a){if(!a)return"";var b=[];rc(a,function(a,c){null===a||z(a)||(L(a)?n(a,function(a,d){b.push(ga(c)+"="+ga(bc(a)))}):b.push(ga(c)+"="+ga(bc(a))))});return b.join("&")}}}function mf(){this.$get=function(){return function(a){function b(a,e,f){null===a||z(a)||(L(a)?n(a,function(a,c){b(a,e+"["+(I(a)?c:"")+
"]")}):I(a)&&!V(a)?rc(a,function(a,c){b(a,e+(f?"":"[")+c+(f?"":"]"))}):d.push(ga(e)+"="+ga(bc(a))))}if(!a)return"";var d=[];b(a,"",!0);return d.join("&")}}}function cc(a,b){if(E(a)){var d=a.replace(ag,"").trim();if(d){var c=b("Content-Type");(c=c&&0===c.indexOf(dd))||(c=(c=d.match(bg))&&cg[c[0]].test(d));c&&(a=wc(d))}}return a}function ed(a){var b=Z(),d;E(a)?n(a.split("\n"),function(a){d=a.indexOf(":");var e=G(X(a.substr(0,d)));a=X(a.substr(d+1));e&&(b[e]=b[e]?b[e]+", "+a:a)}):I(a)&&n(a,function(a,
d){var f=G(d),g=X(a);f&&(b[f]=b[f]?b[f]+", "+g:g)});return b}function fd(a){var b;return function(d){b||(b=ed(a));return d?(d=b[G(d)],void 0===d&&(d=null),d):b}}function gd(a,b,d,c){if(D(c))return c(a,b,d);n(c,function(c){a=c(a,b,d)});return a}function kf(){var a=this.defaults={transformResponse:[cc],transformRequest:[function(a){return I(a)&&"[object File]"!==fa.call(a)&&"[object Blob]"!==fa.call(a)&&"[object FormData]"!==fa.call(a)?fb(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},
post:ma(dc),put:ma(dc),patch:ma(dc)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer"},b=!1;this.useApplyAsync=function(a){return y(a)?(b=!!a,this):b};var d=!0;this.useLegacyPromiseExtensions=function(a){return y(a)?(d=!!a,this):d};var c=this.interceptors=[];this.$get=["$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector",function(e,f,g,h,k,l){function m(b){function c(a){var b=T({},a);b.data=gd(a.data,a.headers,a.status,f.transformResponse);
a=a.status;return 200<=a&&300>a?b:k.reject(b)}function e(a,b){var c,d={};n(a,function(a,e){D(a)?(c=a(b),null!=c&&(d[e]=c)):d[e]=a});return d}if(!I(b))throw K("$http")("badreq",b);if(!E(b.url))throw K("$http")("badreq",b.url);var f=T({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse,paramSerializer:a.paramSerializer},b);f.headers=function(b){var c=a.headers,d=T({},b.headers),f,g,h,c=T({},c.common,c[G(b.method)]);a:for(f in c){g=G(f);for(h in d)if(G(h)===g)continue a;
d[f]=c[f]}return e(d,ma(b))}(b);f.method=vb(f.method);f.paramSerializer=E(f.paramSerializer)?l.get(f.paramSerializer):f.paramSerializer;var g=[function(b){var d=b.headers,e=gd(b.data,fd(d),v,b.transformRequest);z(e)&&n(d,function(a,b){"content-type"===G(b)&&delete d[b]});z(b.withCredentials)&&!z(a.withCredentials)&&(b.withCredentials=a.withCredentials);return r(b,e).then(c,c)},v],h=k.when(f);for(n(F,function(a){(a.request||a.requestError)&&g.unshift(a.request,a.requestError);(a.response||a.responseError)&&
g.push(a.response,a.responseError)});g.length;){b=g.shift();var m=g.shift(),h=h.then(b,m)}d?(h.success=function(a){Sa(a,"fn");h.then(function(b){a(b.data,b.status,b.headers,f)});return h},h.error=function(a){Sa(a,"fn");h.then(null,function(b){a(b.data,b.status,b.headers,f)});return h}):(h.success=hd("success"),h.error=hd("error"));return h}function r(c,d){function g(a,c,d,e){function f(){l(c,a,d,e)}F&&(200<=a&&300>a?F.put(S,[a,c,ed(d),e]):F.remove(S));b?h.$applyAsync(f):(f(),h.$$phase||h.$apply())}
function l(a,b,d,e){b=-1<=b?b:0;(200<=b&&300>b?A.resolve:A.reject)({data:a,status:b,headers:fd(d),config:c,statusText:e})}function r(a){l(a.data,a.status,ma(a.headers()),a.statusText)}function B(){var a=m.pendingRequests.indexOf(c);-1!==a&&m.pendingRequests.splice(a,1)}var A=k.defer(),O=A.promise,F,N,R=c.headers,S=s(c.url,c.paramSerializer(c.params));m.pendingRequests.push(c);O.then(B,B);!c.cache&&!a.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(F=I(c.cache)?c.cache:I(a.cache)?a.cache:
H);F&&(N=F.get(S),y(N)?N&&D(N.then)?N.then(r,r):L(N)?l(N[1],N[0],ma(N[2]),N[3]):l(N,200,{},"OK"):F.put(S,O));z(N)&&((N=id(c.url)?f()[c.xsrfCookieName||a.xsrfCookieName]:v)&&(R[c.xsrfHeaderName||a.xsrfHeaderName]=N),e(c.method,S,d,g,R,c.timeout,c.withCredentials,c.responseType));return O}function s(a,b){0<b.length&&(a+=(-1==a.indexOf("?")?"?":"&")+b);return a}var H=g("$http");a.paramSerializer=E(a.paramSerializer)?l.get(a.paramSerializer):a.paramSerializer;var F=[];n(c,function(a){F.unshift(E(a)?l.get(a):
l.invoke(a))});m.pendingRequests=[];(function(a){n(arguments,function(a){m[a]=function(b,c){return m(T({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){n(arguments,function(a){m[a]=function(b,c,d){return m(T({},d||{},{method:a,url:b,data:c}))}})})("post","put","patch");m.defaults=a;return m}]}function of(){this.$get=function(){return function(){return new Q.XMLHttpRequest}}}function nf(){this.$get=["$browser","$window","$document","$xhrFactory",function(a,b,d,c){return dg(a,
c,a.defer,b.angular.callbacks,d[0])}]}function dg(a,b,d,c,e){function f(a,b,d){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,H="unknown";a&&("load"!==a.type||c[b].called||(a={type:"error"}),H=a.type,g="error"===a.type?404:200);d&&d(g,H)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,
h,k,l,m,r,s,H){function F(){w&&w();u&&u.abort()}function t(b,c,e,f,g){y(B)&&d.cancel(B);w=u=null;b(c,e,f,g);a.$$completeOutstandingRequest(x)}a.$$incOutstandingRequestCount();h=h||a.url();if("jsonp"==G(e)){var p="_"+(c.counter++).toString(36);c[p]=function(a){c[p].data=a;c[p].called=!0};var w=f(h.replace("JSON_CALLBACK","angular.callbacks."+p),p,function(a,b){t(l,a,c[p].data,"",b);c[p]=x})}else{var u=b(e,h);u.open(e,h,!0);n(m,function(a,b){y(a)&&u.setRequestHeader(b,a)});u.onload=function(){var a=
u.statusText||"",b="response"in u?u.response:u.responseText,c=1223===u.status?204:u.status;0===c&&(c=b?200:"file"==za(h).protocol?404:0);t(l,c,b,u.getAllResponseHeaders(),a)};e=function(){t(l,-1,null,null,"")};u.onerror=e;u.onabort=e;s&&(u.withCredentials=!0);if(H)try{u.responseType=H}catch(ka){if("json"!==H)throw ka;}u.send(z(k)?null:k)}if(0<r)var B=d(F,r);else r&&D(r.then)&&r.then(F)}}function hf(){var a="{{",b="}}";this.startSymbol=function(b){return b?(a=b,this):a};this.endSymbol=function(a){return a?
(b=a,this):b};this.$get=["$parse","$exceptionHandler","$sce",function(d,c,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(r,a).replace(s,b)}function h(a,b,c,d){var e;return e=a.$watch(function(a){e();return d(a)},b,c)}function k(f,k,r,p){function s(a){try{var b=a;a=r?e.getTrusted(r,b):e.valueOf(b);var d;if(p&&!y(a))d=a;else if(null==a)d="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=fb(a)}d=a}return d}catch(g){c(Ka.interr(f,g))}}if(!f.length||-1===
f.indexOf(a)){var u;k||(k=g(f),u=ba(k),u.exp=f,u.expressions=[],u.$$watchDelegate=h);return u}p=!!p;var n,B,A=0,O=[],$=[];u=f.length;for(var N=[],R=[];A<u;)if(-1!=(n=f.indexOf(a,A))&&-1!=(B=f.indexOf(b,n+l)))A!==n&&N.push(g(f.substring(A,n))),A=f.substring(n+l,B),O.push(A),$.push(d(A,s)),A=B+m,R.push(N.length),N.push("");else{A!==u&&N.push(g(f.substring(A)));break}r&&1<N.length&&Ka.throwNoconcat(f);if(!k||O.length){var S=function(a){for(var b=0,c=O.length;b<c;b++){if(p&&z(a[b]))return;N[R[b]]=a[b]}return N.join("")};
return T(function(a){var b=0,d=O.length,e=Array(d);try{for(;b<d;b++)e[b]=$[b](a);return S(e)}catch(g){c(Ka.interr(f,g))}},{exp:f,expressions:O,$$watchDelegate:function(a,b){var c;return a.$watchGroup($,function(d,e){var f=S(d);D(b)&&b.call(this,f,d!==e?c:f,a);c=f})}})}}var l=a.length,m=b.length,r=new RegExp(a.replace(/./g,f),"g"),s=new RegExp(b.replace(/./g,f),"g");k.startSymbol=function(){return a};k.endSymbol=function(){return b};return k}]}function jf(){this.$get=["$rootScope","$window","$q","$$q",
"$browser",function(a,b,d,c,e){function f(f,k,l,m){function r(){s?f.apply(null,H):f(p)}var s=4<arguments.length,H=s?va.call(arguments,4):[],F=b.setInterval,t=b.clearInterval,p=0,w=y(m)&&!m,u=(w?c:d).defer(),n=u.promise;l=y(l)?l:0;n.$$intervalId=F(function(){w?e.defer(r):a.$evalAsync(r);u.notify(p++);0<l&&p>=l&&(u.resolve(p),t(n.$$intervalId),delete g[n.$$intervalId]);w||a.$apply()},k);g[n.$$intervalId]=u;return n}var g={};f.cancel=function(a){return a&&a.$$intervalId in g?(g[a.$$intervalId].reject("canceled"),
b.clearInterval(a.$$intervalId),delete g[a.$$intervalId],!0):!1};return f}]}function ec(a){a=a.split("/");for(var b=a.length;b--;)a[b]=rb(a[b]);return a.join("/")}function jd(a,b){var d=za(a);b.$$protocol=d.protocol;b.$$host=d.hostname;b.$$port=ca(d.port)||eg[d.protocol]||null}function kd(a,b){var d="/"!==a.charAt(0);d&&(a="/"+a);var c=za(a);b.$$path=decodeURIComponent(d&&"/"===c.pathname.charAt(0)?c.pathname.substring(1):c.pathname);b.$$search=zc(c.search);b.$$hash=decodeURIComponent(c.hash);b.$$path&&
"/"!=b.$$path.charAt(0)&&(b.$$path="/"+b.$$path)}function oa(a,b){if(0===b.indexOf(a))return b.substr(a.length)}function Ia(a){var b=a.indexOf("#");return-1==b?a:a.substr(0,b)}function lb(a){return a.replace(/(#.+)|#$/,"$1")}function fc(a,b,d){this.$$html5=!0;d=d||"";jd(a,this);this.$$parse=function(a){var d=oa(b,a);if(!E(d))throw Gb("ipthprfx",a,b);kd(d,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Ub(this.$$search),d=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=
ec(this.$$path)+(a?"?"+a:"")+d;this.$$absUrl=b+this.$$url.substr(1)};this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;y(f=oa(a,c))?(g=f,g=y(f=oa(d,f))?b+(oa("/",f)||f):a+g):y(f=oa(b,c))?g=b+f:b==c+"/"&&(g=b);g&&this.$$parse(g);return!!g}}function gc(a,b,d){jd(a,this);this.$$parse=function(c){var e=oa(a,c)||oa(b,c),f;z(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",z(e)&&(a=c,this.replace())):(f=oa(d,e),z(f)&&(f=e));kd(f,this);c=this.$$path;var e=a,g=/^\/[A-Z]:(\/.*)/;
0===f.indexOf(e)&&(f=f.replace(e,""));g.exec(f)||(c=(f=g.exec(c))?f[1]:c);this.$$path=c;this.$$compose()};this.$$compose=function(){var b=Ub(this.$$search),e=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=ec(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+(this.$$url?d+this.$$url:"")};this.$$parseLinkUrl=function(b,d){return Ia(a)==Ia(b)?(this.$$parse(b),!0):!1}}function ld(a,b,d){this.$$html5=!0;gc.apply(this,arguments);this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;
var f,g;a==Ia(c)?f=c:(g=oa(b,c))?f=a+d+g:b===c+"/"&&(f=b);f&&this.$$parse(f);return!!f};this.$$compose=function(){var b=Ub(this.$$search),e=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=ec(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+d+this.$$url}}function Hb(a){return function(){return this[a]}}function md(a,b){return function(d){if(z(d))return this[a];this[a]=b(d);this.$$compose();return this}}function pf(){var a="",b={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(b){return y(b)?
(a=b,this):a};this.html5Mode=function(a){return Na(a)?(b.enabled=a,this):I(a)?(Na(a.enabled)&&(b.enabled=a.enabled),Na(a.requireBase)&&(b.requireBase=a.requireBase),Na(a.rewriteLinks)&&(b.rewriteLinks=a.rewriteLinks),this):b};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(d,c,e,f,g){function h(a,b,d){var e=l.url(),f=l.$$state;try{c.url(a,b,d),l.$$state=c.state()}catch(g){throw l.url(e),l.$$state=f,g;}}function k(a,b){d.$broadcast("$locationChangeSuccess",l.absUrl(),
a,l.$$state,b)}var l,m;m=c.baseHref();var r=c.url(),s;if(b.enabled){if(!m&&b.requireBase)throw Gb("nobase");s=r.substring(0,r.indexOf("/",r.indexOf("//")+2))+(m||"/");m=e.history?fc:ld}else s=Ia(r),m=gc;var H=s.substr(0,Ia(s).lastIndexOf("/")+1);l=new m(s,H,"#"+a);l.$$parseLinkUrl(r,r);l.$$state=c.state();var n=/^\s*(javascript|mailto):/i;f.on("click",function(a){if(b.rewriteLinks&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!=a.which&&2!=a.button){for(var e=C(a.target);"a"!==qa(e[0]);)if(e[0]===f[0]||
!(e=e.parent())[0])return;var h=e.prop("href"),k=e.attr("href")||e.attr("xlink:href");I(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=za(h.animVal).href);n.test(h)||!h||e.attr("target")||a.isDefaultPrevented()||!l.$$parseLinkUrl(h,k)||(a.preventDefault(),l.absUrl()!=c.url()&&(d.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});lb(l.absUrl())!=lb(r)&&c.url(l.absUrl(),!0);var t=!0;c.onUrlChange(function(a,b){z(oa(H,a))?g.location.href=a:(d.$evalAsync(function(){var c=l.absUrl(),e=l.$$state,
f;a=lb(a);l.$$parse(a);l.$$state=b;f=d.$broadcast("$locationChangeStart",a,c,b,e).defaultPrevented;l.absUrl()===a&&(f?(l.$$parse(c),l.$$state=e,h(c,!1,e)):(t=!1,k(c,e)))}),d.$$phase||d.$digest())});d.$watch(function(){var a=lb(c.url()),b=lb(l.absUrl()),f=c.state(),g=l.$$replace,m=a!==b||l.$$html5&&e.history&&f!==l.$$state;if(t||m)t=!1,d.$evalAsync(function(){var b=l.absUrl(),c=d.$broadcast("$locationChangeStart",b,a,l.$$state,f).defaultPrevented;l.absUrl()===b&&(c?(l.$$parse(a),l.$$state=f):(m&&h(b,
g,f===l.$$state?null:l.$$state),k(a,f)))});l.$$replace=!1});return l}]}function qf(){var a=!0,b=this;this.debugEnabled=function(b){return y(b)?(a=b,this):a};this.$get=["$window",function(d){function c(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=d.console||{},e=b[a]||b.log||x;a=!1;try{a=!!e.apply}catch(k){}return a?function(){var a=[];n(arguments,
function(b){a.push(c(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){a&&c.apply(b,arguments)}}()}}]}function Ya(a,b){if("__defineGetter__"===a||"__defineSetter__"===a||"__lookupGetter__"===a||"__lookupSetter__"===a||"__proto__"===a)throw ja("isecfld",b);return a}function fg(a){return a+""}function Aa(a,b){if(a){if(a.constructor===a)throw ja("isecfn",b);if(a.window===a)throw ja("isecwindow",
b);if(a.children&&(a.nodeName||a.prop&&a.attr&&a.find))throw ja("isecdom",b);if(a===Object)throw ja("isecobj",b);}return a}function nd(a,b){if(a){if(a.constructor===a)throw ja("isecfn",b);if(a===gg||a===hg||a===ig)throw ja("isecff",b);}}function Ib(a,b){if(a&&(a===(0).constructor||a===(!1).constructor||a==="".constructor||a==={}.constructor||a===[].constructor||a===Function.constructor))throw ja("isecaf",b);}function jg(a,b){return"undefined"!==typeof a?a:b}function od(a,b){return"undefined"===typeof a?
b:"undefined"===typeof b?a:a+b}function M(a,b){var d,c;switch(a.type){case q.Program:d=!0;n(a.body,function(a){M(a.expression,b);d=d&&a.expression.constant});a.constant=d;break;case q.Literal:a.constant=!0;a.toWatch=[];break;case q.UnaryExpression:M(a.argument,b);a.constant=a.argument.constant;a.toWatch=a.argument.toWatch;break;case q.BinaryExpression:M(a.left,b);M(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.left.toWatch.concat(a.right.toWatch);break;case q.LogicalExpression:M(a.left,
b);M(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.constant?[]:[a];break;case q.ConditionalExpression:M(a.test,b);M(a.alternate,b);M(a.consequent,b);a.constant=a.test.constant&&a.alternate.constant&&a.consequent.constant;a.toWatch=a.constant?[]:[a];break;case q.Identifier:a.constant=!1;a.toWatch=[a];break;case q.MemberExpression:M(a.object,b);a.computed&&M(a.property,b);a.constant=a.object.constant&&(!a.computed||a.property.constant);a.toWatch=[a];break;case q.CallExpression:d=
a.filter?!b(a.callee.name).$stateful:!1;c=[];n(a.arguments,function(a){M(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});a.constant=d;a.toWatch=a.filter&&!b(a.callee.name).$stateful?c:[a];break;case q.AssignmentExpression:M(a.left,b);M(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=[a];break;case q.ArrayExpression:d=!0;c=[];n(a.elements,function(a){M(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});a.constant=d;a.toWatch=c;break;case q.ObjectExpression:d=
!0;c=[];n(a.properties,function(a){M(a.value,b);d=d&&a.value.constant;a.value.constant||c.push.apply(c,a.value.toWatch)});a.constant=d;a.toWatch=c;break;case q.ThisExpression:a.constant=!1;a.toWatch=[];break;case q.LocalsExpression:a.constant=!1,a.toWatch=[]}}function pd(a){if(1==a.length){a=a[0].expression;var b=a.toWatch;return 1!==b.length?b:b[0]!==a?b:v}}function qd(a){return a.type===q.Identifier||a.type===q.MemberExpression}function rd(a){if(1===a.body.length&&qd(a.body[0].expression))return{type:q.AssignmentExpression,
left:a.body[0].expression,right:{type:q.NGValueParameter},operator:"="}}function sd(a){return 0===a.body.length||1===a.body.length&&(a.body[0].expression.type===q.Literal||a.body[0].expression.type===q.ArrayExpression||a.body[0].expression.type===q.ObjectExpression)}function td(a,b){this.astBuilder=a;this.$filter=b}function ud(a,b){this.astBuilder=a;this.$filter=b}function Jb(a){return"constructor"==a}function hc(a){return D(a.valueOf)?a.valueOf():kg.call(a)}function rf(){var a=Z(),b=Z();this.$get=
["$filter",function(d){function c(c,f,r){var u,n,B;r=r||F;switch(typeof c){case "string":B=c=c.trim();var A=r?b:a;u=A[B];if(!u){":"===c.charAt(0)&&":"===c.charAt(1)&&(n=!0,c=c.substring(2));u=r?H:s;var O=new ic(u);u=(new jc(O,d,u)).parse(c);u.constant?u.$$watchDelegate=l:n?u.$$watchDelegate=u.literal?k:h:u.inputs&&(u.$$watchDelegate=g);r&&(u=e(u));A[B]=u}return m(u,f);case "function":return m(c,f);default:return m(x,f)}}function e(a){function b(c,d,e,f){var g=F;F=!0;try{return a(c,d,e,f)}finally{F=
g}}if(!a)return a;b.$$watchDelegate=a.$$watchDelegate;b.assign=e(a.assign);b.constant=a.constant;b.literal=a.literal;for(var c=0;a.inputs&&c<a.inputs.length;++c)a.inputs[c]=e(a.inputs[c]);return b}function f(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=hc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function g(a,b,c,d,e){var g=d.inputs,h;if(1===g.length){var k=f,g=g[0];return a.$watch(function(a){var b=g(a);f(b,k)||(h=d(a,v,v,[b]),k=b&&hc(b));return h},b,c,e)}for(var l=[],m=[],r=0,
s=g.length;r<s;r++)l[r]=f,m[r]=null;return a.$watch(function(a){for(var b=!1,c=0,e=g.length;c<e;c++){var k=g[c](a);if(b||(b=!f(k,l[c])))m[c]=k,l[c]=k&&hc(k)}b&&(h=d(a,v,v,m));return h},b,c,e)}function h(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;D(b)&&b.apply(this,arguments);y(a)&&d.$$postDigest(function(){y(f)&&e()})},c)}function k(a,b,c,d){function e(a){var b=!0;n(a,function(a){y(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,
c,d){g=a;D(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function l(a,b,c,d){var e;return e=a.$watch(function(a){e();return d(a)},b,c)}function m(a,b){if(!b)return a;var c=a.$$watchDelegate,d=!1,c=c!==k&&c!==h?function(c,e,f,g){f=d&&g?g[0]:a(c,e,f,g);return b(f,c,e)}:function(c,d,e,f){e=a(c,d,e,f);c=b(e,c,d);return y(e)?c:e};a.$$watchDelegate&&a.$$watchDelegate!==g?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=g,d=!a.inputs,c.inputs=a.inputs?a.inputs:
[a]);return c}var r=Ea().noUnsafeEval,s={csp:r,expensiveChecks:!1},H={csp:r,expensiveChecks:!0},F=!1;c.$$runningExpensiveChecks=function(){return F};return c}]}function tf(){this.$get=["$rootScope","$exceptionHandler",function(a,b){return vd(function(b){a.$evalAsync(b)},b)}]}function uf(){this.$get=["$browser","$exceptionHandler",function(a,b){return vd(function(b){a.defer(b)},b)}]}function vd(a,b){function d(){this.$$state={status:0}}function c(a,b){return function(c){b.call(a,c)}}function e(c){!c.processScheduled&&
c.pending&&(c.processScheduled=!0,a(function(){var a,d,e;e=c.pending;c.processScheduled=!1;c.pending=v;for(var f=0,g=e.length;f<g;++f){d=e[f][0];a=e[f][c.status];try{D(a)?d.resolve(a(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),b(h)}}}))}function f(){this.promise=new d}var g=K("$q",TypeError);T(d.prototype,{then:function(a,b,c){if(z(a)&&z(b)&&z(c))return this;var d=new f;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&
e(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}});T(f.prototype,{resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(g("qcycle",a)):this.$$resolve(a))},$$resolve:function(a){function d(a){k||(k=!0,h.$$resolve(a))}function f(a){k||(k=!0,h.$$reject(a))}var g,h=this,k=!1;try{if(I(a)||D(a))g=a&&a.then;D(g)?(this.promise.$$state.status=-1,
g.call(a,d,f,c(this,this.notify))):(this.promise.$$state.value=a,this.promise.$$state.status=1,e(this.promise.$$state))}catch(l){f(l),b(l)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;e(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&a(function(){for(var a,e,f=0,g=d.length;f<g;f++){e=d[f][0];a=d[f][3];try{e.notify(D(a)?a(c):
c)}catch(h){b(h)}}})}});var h=function(a,b){var c=new f;b?c.resolve(a):c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{D(c)&&(d=c())}catch(e){return h(e,!1)}return d&&D(d.then)?d.then(function(){return h(a,b)},function(a){return h(a,!1)}):h(a,b)},l=function(a,b,c,d){var e=new f;e.resolve(a);return e.promise.then(b,c,d)},m=function(a){if(!D(a))throw g("norslvr",a);var b=new f;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};m.prototype=d.prototype;m.defer=function(){var a=
new f;a.resolve=c(a,a.resolve);a.reject=c(a,a.reject);a.notify=c(a,a.notify);return a};m.reject=function(a){var b=new f;b.reject(a);return b.promise};m.when=l;m.resolve=l;m.all=function(a){var b=new f,c=0,d=L(a)?[]:{};n(a,function(a,e){c++;l(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return m}function Df(){this.$get=["$window","$timeout",function(a,b){var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame,
c=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame,e=!!d,f=e?function(a){var b=d(a);return function(){c(b)}}:function(a){var c=b(a,16.66,!1);return function(){b.cancel(c)}};f.supported=e;return f}]}function sf(){function a(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++qb;this.$$ChildScope=null}b.prototype=a;return b}var b=10,d=K("$rootScope"),
c=null,e=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$exceptionHandler","$parse","$browser",function(f,g,h){function k(a){a.currentScope.$$destroyed=!0}function l(a){9===wa&&(a.$$childHead&&l(a.$$childHead),a.$$nextSibling&&l(a.$$nextSibling));a.$parent=a.$$nextSibling=a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null}function m(){this.$id=++qb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=
null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function r(a){if(w.$$phase)throw d("inprog",w.$$phase);w.$$phase=a}function s(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function H(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function q(){}function t(){for(;B.length;)try{B.shift()()}catch(a){f(a)}e=null}function p(){null===e&&(e=h.defer(function(){w.$apply(t)}))}
m.prototype={constructor:m,$new:function(b,c){var d;c=c||this;b?(d=new m,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(b||c!=this)&&d.$on("$destroy",k);return d},$watch:function(a,b,d,e){var f=g(a);if(f.$$watchDelegate)return f.$$watchDelegate(this,b,d,f,a);var h=this,k=h.$$watchers,l={fn:b,last:q,get:f,exp:e||a,eq:!!d};
c=null;D(b)||(l.fn=x);k||(k=h.$$watchers=[]);k.unshift(l);s(this,1);return function(){0<=db(k,l)&&s(h,-1);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});n(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});
f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!z(e)){if(I(e))if(Ca(e))for(f!==r&&(f=r,u=f.length=0,l++),a=e.length,u!==a&&(l++,f.length=u=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==s&&(f=s={},u=0,l++);a=0;for(b in e)ua.call(e,b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(u++,f[b]=g,l++));if(u>a)for(b in l++,f)ua.call(e,b)||(u--,delete f[b])}else f!==e&&(f=e,l++);return l}}
c.$stateful=!0;var d=this,e,f,h,k=1<b.length,l=0,m=g(a,c),r=[],s={},p=!0,u=0;return this.$watch(m,function(){p?(p=!1,b(e,e,d)):b(e,h,d);if(k)if(I(e))if(Ca(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)ua.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var a,g,k,l,m,s,p=b,n,H=[],B,y;r("$digest");h.$$checkUrlChange();this===w&&null!==e&&(h.defer.cancel(e),t());c=null;do{s=!1;for(n=this;u.length;){try{y=u.shift(),y.scope.$eval(y.expression,y.locals)}catch(z){f(z)}c=
null}a:do{if(l=n.$$watchers)for(m=l.length;m--;)try{if(a=l[m])if((g=a.get(n))!==(k=a.last)&&!(a.eq?na(g,k):"number"===typeof g&&"number"===typeof k&&isNaN(g)&&isNaN(k)))s=!0,c=a,a.last=a.eq?Oa(g,null):g,a.fn(g,k===q?g:k,n),5>p&&(B=4-p,H[B]||(H[B]=[]),H[B].push({msg:D(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):a.exp,newVal:g,oldVal:k}));else if(a===c){s=!1;break a}}catch(C){f(C)}if(!(l=n.$$watchersCount&&n.$$childHead||n!==this&&n.$$nextSibling))for(;n!==this&&!(l=n.$$nextSibling);)n=n.$parent}while(n=
l);if((s||u.length)&&!p--)throw w.$$phase=null,d("infdig",b,H);}while(s||u.length);for(w.$$phase=null;v.length;)try{v.shift()()}catch(x){f(x)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===w&&h.$$applicationDestroyed();s(this,-this.$$watchersCount);for(var b in this.$$listenerCount)H(this,this.$$listenerCount[b],b);a&&a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);
this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=x;this.$on=this.$watch=this.$watchGroup=function(){return x};this.$$listeners={};this.$$nextSibling=null;l(this)}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a,b){w.$$phase||u.length||h.defer(function(){u.length&&w.$digest()});u.push({scope:this,expression:g(a),locals:b})},
$$postDigest:function(a){v.push(a)},$apply:function(a){try{r("$apply");try{return this.$eval(a)}finally{w.$$phase=null}}catch(b){f(b)}finally{try{w.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&B.push(b);a=g(a);p()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);
-1!==d&&(c[d]=null,H(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=eb([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(r){f(r)}else d.splice(l,1),l--,m--;if(g)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,
targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=eb([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var w=new m,u=w.$$asyncQueue=[],v=w.$$postDigestQueue=
[],B=w.$$applyAsyncQueue=[];return w}]}function le(){var a=/^\s*(https?|ftp|mailto|tel|file):/,b=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(b){return y(b)?(a=b,this):a};this.imgSrcSanitizationWhitelist=function(a){return y(a)?(b=a,this):b};this.$get=function(){return function(d,c){var e=c?b:a,f;f=za(d).href;return""===f||f.match(e)?d:"unsafe:"+f}}}function lg(a){if("self"===a)return a;if(E(a)){if(-1<a.indexOf("***"))throw Ba("iwcard",a);a=wd(a).replace("\\*\\*",
".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+a+"$")}if(ab(a))return new RegExp("^"+a.source+"$");throw Ba("imatcher");}function xd(a){var b=[];y(a)&&n(a,function(a){b.push(lg(a))});return b}function wf(){this.SCE_CONTEXTS=pa;var a=["self"],b=[];this.resourceUrlWhitelist=function(b){arguments.length&&(a=xd(b));return a};this.resourceUrlBlacklist=function(a){arguments.length&&(b=xd(a));return b};this.$get=["$injector",function(d){function c(a,b){return"self"===a?id(b):!!a.exec(b.href)}function e(a){var b=
function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Ba("unsafe");};d.has("$sanitize")&&(f=d.get("$sanitize"));var g=e(),h={};h[pa.HTML]=e(g);h[pa.CSS]=e(g);h[pa.URL]=e(g);h[pa.JS]=e(g);h[pa.RESOURCE_URL]=e(h[pa.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ba("icontext",
a,b);if(null===b||z(b)||""===b)return b;if("string"!==typeof b)throw Ba("itype",a);return new c(b)},getTrusted:function(d,e){if(null===e||z(e)||""===e)return e;var g=h.hasOwnProperty(d)?h[d]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(d===pa.RESOURCE_URL){var g=za(e.toString()),r,s,n=!1;r=0;for(s=a.length;r<s;r++)if(c(a[r],g)){n=!0;break}if(n)for(r=0,s=b.length;r<s;r++)if(c(b[r],g)){n=!1;break}if(n)return e;throw Ba("insecurl",e.toString());}if(d===pa.HTML)return f(e);throw Ba("unsafe");
},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function vf(){var a=!0;this.enabled=function(b){arguments.length&&(a=!!b);return a};this.$get=["$parse","$sceDelegate",function(b,d){if(a&&8>wa)throw Ba("iequirks");var c=ma(pa);c.isEnabled=function(){return a};c.trustAs=d.trustAs;c.getTrusted=d.getTrusted;c.valueOf=d.valueOf;a||(c.trustAs=c.getTrusted=function(a,b){return b},c.valueOf=bb);c.parseAs=function(a,d){var e=b(d);return e.literal&&e.constant?e:b(d,function(b){return c.getTrusted(a,
b)})};var e=c.parseAs,f=c.getTrusted,g=c.trustAs;n(pa,function(a,b){var d=G(b);c[hb("parse_as_"+d)]=function(b){return e(a,b)};c[hb("get_trusted_"+d)]=function(b){return f(a,b)};c[hb("trust_as_"+d)]=function(b){return g(a,b)}});return c}]}function xf(){this.$get=["$window","$document",function(a,b){var d={},c=ca((/android (\d+)/.exec(G((a.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((a.navigator||{}).userAgent),f=b[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,k=f.body&&f.body.style,l=!1,m=!1;if(k){for(var r in k)if(l=
h.exec(r)){g=l[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in k&&"webkit");l=!!("transition"in k||g+"Transition"in k);m=!!("animation"in k||g+"Animation"in k);!c||l&&m||(l=E(k.webkitTransition),m=E(k.webkitAnimation))}return{history:!(!a.history||!a.history.pushState||4>c||e),hasEvent:function(a){if("input"===a&&11>=wa)return!1;if(z(d[a])){var b=f.createElement("div");d[a]="on"+a in b}return d[a]},csp:Ea(),vendorPrefix:g,transitions:l,animations:m,android:c}}]}function zf(){var a;
this.httpOptions=function(b){return b?(a=b,this):a};this.$get=["$templateCache","$http","$q","$sce",function(b,d,c,e){function f(g,h){f.totalPendingRequests++;E(g)&&b.get(g)||(g=e.getTrustedResourceUrl(g));var k=d.defaults&&d.defaults.transformResponse;L(k)?k=k.filter(function(a){return a!==cc}):k===cc&&(k=null);return d.get(g,T({cache:b,transformResponse:k},a))["finally"](function(){f.totalPendingRequests--}).then(function(a){b.put(g,a.data);return a.data},function(a){if(!h)throw ia("tpload",g,a.status,
a.statusText);return c.reject(a)})}f.totalPendingRequests=0;return f}]}function Af(){this.$get=["$rootScope","$browser","$location",function(a,b,d){return{findBindings:function(a,b,d){a=a.getElementsByClassName("ng-binding");var g=[];n(a,function(a){var c=ha.element(a).data("$binding");c&&n(c,function(c){d?(new RegExp("(^|\\s)"+wd(b)+"(\\s|\\||$)")).test(c)&&g.push(a):-1!=c.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,d){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var k=
a.querySelectorAll("["+g[h]+"model"+(d?"=":"*=")+'"'+b+'"]');if(k.length)return k}},getLocation:function(){return d.url()},setLocation:function(b){b!==d.url()&&(d.url(b),a.$digest())},whenStable:function(a){b.notifyWhenNoOutstandingRequests(a)}}}]}function Bf(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(a,b,d,c,e){function f(f,k,l){D(f)||(l=k,k=f,f=x);var m=va.call(arguments,3),r=y(l)&&!l,s=(r?c:d).defer(),n=s.promise,q;q=b.defer(function(){try{s.resolve(f.apply(null,
m))}catch(b){s.reject(b),e(b)}finally{delete g[n.$$timeoutId]}r||a.$apply()},k);n.$$timeoutId=q;g[q]=s;return n}var g={};f.cancel=function(a){return a&&a.$$timeoutId in g?(g[a.$$timeoutId].reject("canceled"),delete g[a.$$timeoutId],b.defer.cancel(a.$$timeoutId)):!1};return f}]}function za(a){wa&&(Y.setAttribute("href",a),a=Y.href);Y.setAttribute("href",a);return{href:Y.href,protocol:Y.protocol?Y.protocol.replace(/:$/,""):"",host:Y.host,search:Y.search?Y.search.replace(/^\?/,""):"",hash:Y.hash?Y.hash.replace(/^#/,
""):"",hostname:Y.hostname,port:Y.port,pathname:"/"===Y.pathname.charAt(0)?Y.pathname:"/"+Y.pathname}}function id(a){a=E(a)?za(a):a;return a.protocol===yd.protocol&&a.host===yd.host}function Cf(){this.$get=ba(Q)}function zd(a){function b(a){try{return decodeURIComponent(a)}catch(b){return a}}var d=a[0]||{},c={},e="";return function(){var a,g,h,k,l;a=d.cookie||"";if(a!==e)for(e=a,a=e.split("; "),c={},h=0;h<a.length;h++)g=a[h],k=g.indexOf("="),0<k&&(l=b(g.substring(0,k)),z(c[l])&&(c[l]=b(g.substring(k+
1))));return c}}function Gf(){this.$get=zd}function Lc(a){function b(d,c){if(I(d)){var e={};n(d,function(a,c){e[c]=b(c,a)});return e}return a.factory(d+"Filter",c)}this.register=b;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];b("currency",Ad);b("date",Bd);b("filter",mg);b("json",ng);b("limitTo",og);b("lowercase",pg);b("number",Cd);b("orderBy",Dd);b("uppercase",qg)}function mg(){return function(a,b,d){if(!Ca(a)){if(null==a)return a;throw K("filter")("notarray",a);
}var c;switch(kc(b)){case "function":break;case "boolean":case "null":case "number":case "string":c=!0;case "object":b=rg(b,d,c);break;default:return a}return Array.prototype.filter.call(a,b)}}function rg(a,b,d){var c=I(a)&&"$"in a;!0===b?b=na:D(b)||(b=function(a,b){if(z(a))return!1;if(null===a||null===b)return a===b;if(I(b)||I(a)&&!tc(a))return!1;a=G(""+a);b=G(""+b);return-1!==a.indexOf(b)});return function(e){return c&&!I(e)?La(e,a.$,b,!1):La(e,a,b,d)}}function La(a,b,d,c,e){var f=kc(a),g=kc(b);
if("string"===g&&"!"===b.charAt(0))return!La(a,b.substring(1),d,c);if(L(a))return a.some(function(a){return La(a,b,d,c)});switch(f){case "object":var h;if(c){for(h in a)if("$"!==h.charAt(0)&&La(a[h],b,d,!0))return!0;return e?!1:La(a,b,d,!1)}if("object"===g){for(h in b)if(e=b[h],!D(e)&&!z(e)&&(f="$"===h,!La(f?a:a[h],e,d,f,f)))return!1;return!0}return d(a,b);case "function":return!1;default:return d(a,b)}}function kc(a){return null===a?"null":typeof a}function Ad(a){var b=a.NUMBER_FORMATS;return function(a,
c,e){z(c)&&(c=b.CURRENCY_SYM);z(e)&&(e=b.PATTERNS[1].maxFrac);return null==a?a:Ed(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,e).replace(/\u00A4/g,c)}}function Cd(a){var b=a.NUMBER_FORMATS;return function(a,c){return null==a?a:Ed(a,b.PATTERNS[0],b.GROUP_SEP,b.DECIMAL_SEP,c)}}function sg(a){var b=0,d,c,e,f,g;-1<(c=a.indexOf(Fd))&&(a=a.replace(Fd,""));0<(e=a.search(/e/i))?(0>c&&(c=e),c+=+a.slice(e+1),a=a.substring(0,e)):0>c&&(c=a.length);for(e=0;a.charAt(e)==lc;e++);if(e==(g=a.length))d=[0],c=1;else{for(g--;a.charAt(g)==
lc;)g--;c-=e;d=[];for(f=0;e<=g;e++,f++)d[f]=+a.charAt(e)}c>Gd&&(d=d.splice(0,Gd-1),b=c-1,c=1);return{d:d,e:b,i:c}}function tg(a,b,d,c){var e=a.d,f=e.length-a.i;b=z(b)?Math.min(Math.max(d,f),c):+b;d=b+a.i;c=e[d];if(0<d)e.splice(d);else{a.i=1;e.length=d=b+1;for(var g=0;g<d;g++)e[g]=0}for(5<=c&&e[d-1]++;f<b;f++)e.push(0);if(b=e.reduceRight(function(a,b,c,d){b+=a;d[c]=b%10;return Math.floor(b/10)},0))e.unshift(b),a.i++}function Ed(a,b,d,c,e){if(!E(a)&&!P(a)||isNaN(a))return"";var f=!isFinite(a),g=!1,
h=Math.abs(a)+"",k="";if(f)k="\u221e";else{g=sg(h);tg(g,e,b.minFrac,b.maxFrac);k=g.d;h=g.i;e=g.e;f=[];for(g=k.reduce(function(a,b){return a&&!b},!0);0>h;)k.unshift(0),h++;0<h?f=k.splice(h):(f=k,k=[0]);h=[];for(k.length>b.lgSize&&h.unshift(k.splice(-b.lgSize).join(""));k.length>b.gSize;)h.unshift(k.splice(-b.gSize).join(""));k.length&&h.unshift(k.join(""));k=h.join(d);f.length&&(k+=c+f.join(""));e&&(k+="e+"+e)}return 0>a&&!g?b.negPre+k+b.negSuf:b.posPre+k+b.posSuf}function Kb(a,b,d){var c="";0>a&&
(c="-",a=-a);for(a=""+a;a.length<b;)a=lc+a;d&&(a=a.substr(a.length-b));return c+a}function aa(a,b,d,c){d=d||0;return function(e){e=e["get"+a]();if(0<d||e>-d)e+=d;0===e&&-12==d&&(e=12);return Kb(e,b,c)}}function Lb(a,b){return function(d,c){var e=d["get"+a](),f=vb(b?"SHORT"+a:a);return c[f][e]}}function Hd(a){var b=(new Date(a,0,1)).getDay();return new Date(a,0,(4>=b?5:12)-b)}function Id(a){return function(b){var d=Hd(b.getFullYear());b=+new Date(b.getFullYear(),b.getMonth(),b.getDate()+(4-b.getDay()))-
+d;b=1+Math.round(b/6048E5);return Kb(b,a)}}function mc(a,b){return 0>=a.getFullYear()?b.ERAS[0]:b.ERAS[1]}function Bd(a){function b(a){var b;if(b=a.match(d)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=ca(b[9]+b[10]),g=ca(b[9]+b[11]));h.call(a,ca(b[1]),ca(b[2])-1,ca(b[3]));f=ca(b[4]||0)-f;g=ca(b[5]||0)-g;h=ca(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));k.call(a,f,g,h,b)}return a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,d,f){var g="",h=[],k,l;d=d||"mediumDate";d=a.DATETIME_FORMATS[d]||d;E(c)&&(c=ug.test(c)?ca(c):b(c));P(c)&&(c=new Date(c));if(!V(c)||!isFinite(c.getTime()))return c;for(;d;)(l=vg.exec(d))?(h=eb(h,l,1),d=h.pop()):(h.push(d),d=null);var m=c.getTimezoneOffset();f&&(m=xc(f,c.getTimezoneOffset()),c=Tb(c,f,!0));n(h,function(b){k=wg[b];g+=k?k(c,a.DATETIME_FORMATS,m):"''"===b?"'":b.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function ng(){return function(a,b){z(b)&&(b=2);return fb(a,
b)}}function og(){return function(a,b,d){b=Infinity===Math.abs(Number(b))?Number(b):ca(b);if(isNaN(b))return a;P(a)&&(a=a.toString());if(!L(a)&&!E(a))return a;d=!d||isNaN(d)?0:ca(d);d=0>d?Math.max(0,a.length+d):d;return 0<=b?a.slice(d,d+b):0===d?a.slice(b,a.length):a.slice(Math.max(0,d+b),d)}}function Dd(a){function b(b,d){d=d?-1:1;return b.map(function(b){var c=1,h=bb;if(D(b))h=b;else if(E(b)){if("+"==b.charAt(0)||"-"==b.charAt(0))c="-"==b.charAt(0)?-1:1,b=b.substring(1);if(""!==b&&(h=a(b),h.constant))var k=
h(),h=function(a){return a[k]}}return{get:h,descending:c*d}})}function d(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}return function(a,e,f){if(null==a)return a;if(!Ca(a))throw K("orderBy")("notarray",a);L(e)||(e=[e]);0===e.length&&(e=["+"]);var g=b(e,f);g.push({get:function(){return{}},descending:f?-1:1});a=Array.prototype.map.call(a,function(a,b){return{value:a,predicateValues:g.map(function(c){var e=c.get(a);c=typeof e;if(null===e)c="string",e="null";
else if("string"===c)e=e.toLowerCase();else if("object"===c)a:{if("function"===typeof e.valueOf&&(e=e.valueOf(),d(e)))break a;if(tc(e)&&(e=e.toString(),d(e)))break a;e=b}return{value:e,type:c}})}});a.sort(function(a,b){for(var c=0,d=0,e=g.length;d<e;++d){var c=a.predicateValues[d],f=b.predicateValues[d],n=0;c.type===f.type?c.value!==f.value&&(n=c.value<f.value?-1:1):n=c.type<f.type?-1:1;if(c=n*g[d].descending)break}return c});return a=a.map(function(a){return a.value})}}function Ma(a){D(a)&&(a={link:a});
a.restrict=a.restrict||"AC";return ba(a)}function Jd(a,b,d,c,e){var f=this,g=[];f.$error={};f.$$success={};f.$pending=v;f.$name=e(b.name||b.ngForm||"")(d);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;f.$$parentForm=Mb;f.$rollbackViewValue=function(){n(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){n(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){Ta(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a);a.$$parentForm=f};f.$$renameControl=
function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];n(f.$pending,function(b,c){f.$setValidity(c,null,a)});n(f.$error,function(b,c){f.$setValidity(c,null,a)});n(f.$$success,function(b,c){f.$setValidity(c,null,a)});db(g,a);a.$$parentForm=Mb};Kd({ctrl:this,$element:a,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(db(d,c),0===d.length&&delete a[b])},$animate:c});
f.$setDirty=function(){c.removeClass(a,Za);c.addClass(a,Nb);f.$dirty=!0;f.$pristine=!1;f.$$parentForm.$setDirty()};f.$setPristine=function(){c.setClass(a,Za,Nb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;n(g,function(a){a.$setPristine()})};f.$setUntouched=function(){n(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){c.addClass(a,"ng-submitted");f.$submitted=!0;f.$$parentForm.$setSubmitted()}}function nc(a){a.$formatters.push(function(b){return a.$isEmpty(b)?b:b.toString()})}
function mb(a,b,d,c,e,f){var g=G(b[0].type);if(!e.android){var h=!1;b.on("compositionstart",function(a){h=!0});b.on("compositionend",function(){h=!1;k()})}var k=function(a){l&&(f.defer.cancel(l),l=null);if(!h){var e=b.val();a=a&&a.type;"password"===g||d.ngTrim&&"false"===d.ngTrim||(e=X(e));(c.$viewValue!==e||""===e&&c.$$hasNativeValidators)&&c.$setViewValue(e,a)}};if(e.hasEvent("input"))b.on("input",k);else{var l,m=function(a,b,c){l||(l=f.defer(function(){l=null;b&&b.value===c||k(a)}))};b.on("keydown",
function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))b.on("paste cut",m)}b.on("change",k);c.$render=function(){var a=c.$isEmpty(c.$viewValue)?"":c.$viewValue;b.val()!==a&&b.val(a)}}function Ob(a,b){return function(d,c){var e,f;if(V(d))return d;if(E(d)){'"'==d.charAt(0)&&'"'==d.charAt(d.length-1)&&(d=d.substring(1,d.length-1));if(xg.test(d))return new Date(d);a.lastIndex=0;if(e=a.exec(d))return e.shift(),f=c?{yyyy:c.getFullYear(),MM:c.getMonth()+
1,dd:c.getDate(),HH:c.getHours(),mm:c.getMinutes(),ss:c.getSeconds(),sss:c.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},n(e,function(a,c){c<b.length&&(f[b[c]]=+a)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function nb(a,b,d,c){return function(e,f,g,h,k,l,m){function r(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function s(a){return y(a)&&!V(a)?d(a)||v:a}Ld(e,f,g,h);mb(e,f,g,h,k,l);var n=h&&h.$options&&h.$options.timezone,q;h.$$parserName=
a;h.$parsers.push(function(a){return h.$isEmpty(a)?null:b.test(a)?(a=d(a,q),n&&(a=Tb(a,n)),a):v});h.$formatters.push(function(a){if(a&&!V(a))throw ob("datefmt",a);if(r(a))return(q=a)&&n&&(q=Tb(q,n,!0)),m("date")(a,c,n);q=null;return""});if(y(g.min)||g.ngMin){var t;h.$validators.min=function(a){return!r(a)||z(t)||d(a)>=t};g.$observe("min",function(a){t=s(a);h.$validate()})}if(y(g.max)||g.ngMax){var p;h.$validators.max=function(a){return!r(a)||z(p)||d(a)<=p};g.$observe("max",function(a){p=s(a);h.$validate()})}}}
function Ld(a,b,d,c){(c.$$hasNativeValidators=I(b[0].validity))&&c.$parsers.push(function(a){var c=b.prop("validity")||{};return c.badInput||c.typeMismatch?v:a})}function Md(a,b,d,c,e){if(y(c)){a=a(c);if(!a.constant)throw ob("constexpr",d,c);return a(b)}return e}function oc(a,b){a="ngClass"+a;return["$animate",function(d){function c(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){var b=[];return L(a)?(n(a,function(a){b=
b.concat(e(a))}),b):E(a)?a.split(" "):I(a)?(n(a,function(a,c){a&&(b=b.concat(c.split(" ")))}),b):a}return{restrict:"AC",link:function(f,g,h){function k(a,b){var c=g.data("$classCounts")||Z(),d=[];n(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function l(a){if(!0===b||f.$index%2===b){var l=e(a||[]);if(!m){var n=k(l,1);h.$addClass(n)}else if(!na(a,m)){var q=e(m),n=c(l,q),l=c(q,l),n=k(n,1),l=k(l,-1);n&&n.length&&d.addClass(g,n);l&&
l.length&&d.removeClass(g,l)}}m=ma(a)}var m;f.$watch(h[a],l,!0);h.$observe("class",function(b){l(f.$eval(h[a]))});"ngClass"!==a&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var l=e(f.$eval(h[a]));g===b?(g=k(l,1),h.$addClass(g)):(g=k(l,-1),h.$removeClass(g))}})}}}]}function Kd(a){function b(a,b){b&&!f[a]?(k.addClass(e,a),f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}function d(a,c){a=a?"-"+Bc(a,"-"):"";b(pb+a,!0===c);b(Nd+a,!1===c)}var c=a.ctrl,e=a.$element,f={},g=a.set,h=a.unset,k=a.$animate;
f[Nd]=!(f[pb]=e.hasClass(pb));c.$setValidity=function(a,e,f){z(e)?(c.$pending||(c.$pending={}),g(c.$pending,a,f)):(c.$pending&&h(c.$pending,a,f),Od(c.$pending)&&(c.$pending=v));Na(e)?e?(h(c.$error,a,f),g(c.$$success,a,f)):(g(c.$error,a,f),h(c.$$success,a,f)):(h(c.$error,a,f),h(c.$$success,a,f));c.$pending?(b(Pd,!0),c.$valid=c.$invalid=v,d("",null)):(b(Pd,!1),c.$valid=Od(c.$error),c.$invalid=!c.$valid,d("",c.$valid));e=c.$pending&&c.$pending[a]?v:c.$error[a]?!1:c.$$success[a]?!0:null;d(a,e);c.$$parentForm.$setValidity(a,
e,c)}}function Od(a){if(a)for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}var yg=/^\/(.+)\/([a-z]*)$/,ua=Object.prototype.hasOwnProperty,G=function(a){return E(a)?a.toLowerCase():a},vb=function(a){return E(a)?a.toUpperCase():a},wa,C,sa,va=[].slice,Zf=[].splice,zg=[].push,fa=Object.prototype.toString,uc=Object.getPrototypeOf,Da=K("ng"),ha=Q.angular||(Q.angular={}),Vb,qb=0;wa=W.documentMode;x.$inject=[];bb.$inject=[];var L=Array.isArray,$d=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,
X=function(a){return E(a)?a.trim():a},wd=function(a){return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},Ea=function(){if(!y(Ea.rules)){var a=W.querySelector("[ng-csp]")||W.querySelector("[data-ng-csp]");if(a){var b=a.getAttribute("ng-csp")||a.getAttribute("data-ng-csp");Ea.rules={noUnsafeEval:!b||-1!==b.indexOf("no-unsafe-eval"),noInlineStyle:!b||-1!==b.indexOf("no-inline-style")}}else{a=Ea;try{new Function(""),b=!1}catch(d){b=!0}a.rules={noUnsafeEval:b,noInlineStyle:!1}}}return Ea.rules},
sb=function(){if(y(sb.name_))return sb.name_;var a,b,d=Qa.length,c,e;for(b=0;b<d;++b)if(c=Qa[b],a=W.querySelector("["+c.replace(":","\\:")+"jq]")){e=a.getAttribute(c+"jq");break}return sb.name_=e},Qa=["ng-","data-ng-","ng:","x-ng-"],ge=/[A-Z]/g,Cc=!1,Pa=3,ke={full:"1.5.0-rc.2",major:1,minor:5,dot:0,codeName:"controller-requisition"};U.expando="ng339";var jb=U.cache={},Mf=1;U._data=function(a){return this.cache[a[this.expando]]||{}};var Hf=/([\:\-\_]+(.))/g,If=/^moz([A-Z])/,zb={mouseleave:"mouseout",
mouseenter:"mouseover"},Xb=K("jqLite"),Lf=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,Wb=/<|&#?\w+;/,Jf=/<([\w:-]+)/,Kf=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,da={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};da.optgroup=da.option;da.tbody=da.tfoot=da.colgroup=da.caption=da.thead;
da.th=da.td;var Rf=Node.prototype.contains||function(a){return!!(this.compareDocumentPosition(a)&16)},Ra=U.prototype={ready:function(a){function b(){d||(d=!0,a())}var d=!1;"complete"===W.readyState?setTimeout(b):(this.on("DOMContentLoaded",b),U(Q).on("load",b))},toString:function(){var a=[];n(this,function(b){a.push(""+b)});return"["+a.join(", ")+"]"},eq:function(a){return 0<=a?C(this[a]):C(this[this.length+a])},length:0,push:zg,sort:[].sort,splice:[].splice},Eb={};n("multiple selected checked disabled readOnly required open".split(" "),
function(a){Eb[G(a)]=a});var Uc={};n("input select option textarea button form details".split(" "),function(a){Uc[a]=!0});var bd={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};n({data:Zb,removeData:ib,hasData:function(a){for(var b in jb[a.ng339])return!0;return!1},cleanData:function(a){for(var b=0,d=a.length;b<d;b++)ib(a[b])}},function(a,b){U[b]=a});n({data:Zb,inheritedData:Db,scope:function(a){return C.data(a,"$scope")||Db(a.parentNode||a,["$isolateScope",
"$scope"])},isolateScope:function(a){return C.data(a,"$isolateScope")||C.data(a,"$isolateScopeNoTemplate")},controller:Rc,injector:function(a){return Db(a,"$injector")},removeAttr:function(a,b){a.removeAttribute(b)},hasClass:Ab,css:function(a,b,d){b=hb(b);if(y(d))a.style[b]=d;else return a.style[b]},attr:function(a,b,d){var c=a.nodeType;if(c!==Pa&&2!==c&&8!==c)if(c=G(b),Eb[c])if(y(d))d?(a[b]=!0,a.setAttribute(b,c)):(a[b]=!1,a.removeAttribute(c));else return a[b]||(a.attributes.getNamedItem(b)||x).specified?
c:v;else if(y(d))a.setAttribute(b,d);else if(a.getAttribute)return a=a.getAttribute(b,2),null===a?v:a},prop:function(a,b,d){if(y(d))a[b]=d;else return a[b]},text:function(){function a(a,d){if(z(d)){var c=a.nodeType;return 1===c||c===Pa?a.textContent:""}a.textContent=d}a.$dv="";return a}(),val:function(a,b){if(z(b)){if(a.multiple&&"select"===qa(a)){var d=[];n(a.options,function(a){a.selected&&d.push(a.value||a.text)});return 0===d.length?null:d}return a.value}a.value=b},html:function(a,b){if(z(b))return a.innerHTML;
xb(a,!0);a.innerHTML=b},empty:Sc},function(a,b){U.prototype[b]=function(b,c){var e,f,g=this.length;if(a!==Sc&&z(2==a.length&&a!==Ab&&a!==Rc?b:c)){if(I(b)){for(e=0;e<g;e++)if(a===Zb)a(this[e],b);else for(f in b)a(this[e],f,b[f]);return this}e=a.$dv;g=z(e)?Math.min(g,1):g;for(f=0;f<g;f++){var h=a(this[f],b,c);e=e?e+h:h}return e}for(e=0;e<g;e++)a(this[e],b,c);return this}});n({removeData:ib,on:function(a,b,d,c){if(y(c))throw Xb("onargs");if(Mc(a)){c=yb(a,!0);var e=c.events,f=c.handle;f||(f=c.handle=
Of(a,e));c=0<=b.indexOf(" ")?b.split(" "):[b];for(var g=c.length,h=function(b,c,g){var h=e[b];h||(h=e[b]=[],h.specialHandlerWrapper=c,"$destroy"===b||g||a.addEventListener(b,f,!1));h.push(d)};g--;)b=c[g],zb[b]?(h(zb[b],Qf),h(b,v,!0)):h(b)}},off:Qc,one:function(a,b,d){a=C(a);a.on(b,function e(){a.off(b,d);a.off(b,e)});a.on(b,d)},replaceWith:function(a,b){var d,c=a.parentNode;xb(a);n(new U(b),function(b){d?c.insertBefore(b,d.nextSibling):c.replaceChild(b,a);d=b})},children:function(a){var b=[];n(a.childNodes,
function(a){1===a.nodeType&&b.push(a)});return b},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,b){var d=a.nodeType;if(1===d||11===d){b=new U(b);for(var d=0,c=b.length;d<c;d++)a.appendChild(b[d])}},prepend:function(a,b){if(1===a.nodeType){var d=a.firstChild;n(new U(b),function(b){a.insertBefore(b,d)})}},wrap:function(a,b){Oc(a,C(b).eq(0).clone()[0])},remove:$b,detach:function(a){$b(a,!0)},after:function(a,b){var d=a,c=a.parentNode;b=new U(b);for(var e=0,f=b.length;e<
f;e++){var g=b[e];c.insertBefore(g,d.nextSibling);d=g}},addClass:Cb,removeClass:Bb,toggleClass:function(a,b,d){b&&n(b.split(" "),function(b){var e=d;z(e)&&(e=!Ab(a,b));(e?Cb:Bb)(a,b)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:Yb,triggerHandler:function(a,b,d){var c,e,f=b.type||b,g=yb(a);if(g=(g=g&&g.events)&&g[f])c={preventDefault:function(){this.defaultPrevented=
!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:x,type:f,target:a},b.type&&(c=T(c,b)),b=ma(g),e=d?[c].concat(d):[c],n(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,e)})}},function(a,b){U.prototype[b]=function(b,c,e){for(var f,g=0,h=this.length;g<h;g++)z(f)?(f=a(this[g],b,c,e),y(f)&&(f=C(f))):
Pc(f,a(this[g],b,c,e));return y(f)?f:this};U.prototype.bind=U.prototype.on;U.prototype.unbind=U.prototype.off});Ua.prototype={put:function(a,b){this[Fa(a,this.nextUid)]=b},get:function(a){return this[Fa(a,this.nextUid)]},remove:function(a){var b=this[a=Fa(a,this.nextUid)];delete this[a];return b}};var Ff=[function(){this.$get=[function(){return Ua}]}],Tf=/^([^\(]+?)=>/,Uf=/^[^\(]*\(\s*([^\)]*)\)/m,Ag=/,/,Bg=/^\s*(_?)(\S+?)\1\s*$/,Sf=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ga=K("$injector");gb.$$annotate=
function(a,b,d){var c;if("function"===typeof a){if(!(c=a.$inject)){c=[];if(a.length){if(b)throw E(d)&&d||(d=a.name||Vf(a)),Ga("strictdi",d);b=Vc(a);n(b[1].split(Ag),function(a){a.replace(Bg,function(a,b,d){c.push(d)})})}a.$inject=c}}else L(a)?(b=a.length-1,Sa(a[b],"fn"),c=a.slice(0,b)):Sa(a,"fn",!0);return c};var Qd=K("$animate"),Ye=function(){this.$get=function(){}},Ze=function(){var a=new Ua,b=[];this.$get=["$$AnimateRunner","$rootScope",function(d,c){function e(a,b,c){var d=!1;b&&(b=E(b)?b.split(" "):
L(b)?b:[],n(b,function(b){b&&(d=!0,a[b]=c)}));return d}function f(){n(b,function(b){var c=a.get(b);if(c){var d=Wf(b.attr("class")),e="",f="";n(c,function(a,b){a!==!!d[b]&&(a?e+=(e.length?" ":"")+b:f+=(f.length?" ":"")+b)});n(b,function(a){e&&Cb(a,e);f&&Bb(a,f)});a.remove(b)}});b.length=0}return{enabled:x,on:x,off:x,pin:x,push:function(g,h,k,l){l&&l();k=k||{};k.from&&g.css(k.from);k.to&&g.css(k.to);if(k.addClass||k.removeClass)if(h=k.addClass,l=k.removeClass,k=a.get(g)||{},h=e(k,h,!0),l=e(k,l,!1),
h||l)a.put(g,k),b.push(g),1===b.length&&c.$$postDigest(f);g=new d;g.complete();return g}}}]},We=["$provide",function(a){var b=this;this.$$registeredAnimations=Object.create(null);this.register=function(d,c){if(d&&"."!==d.charAt(0))throw Qd("notcsel",d);var e=d+"-animation";b.$$registeredAnimations[d.substr(1)]=e;a.factory(e,c)};this.classNameFilter=function(a){if(1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null)&&/(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString()))throw Qd("nongcls",
"ng-animate");return this.$$classNameFilter};this.$get=["$$animateQueue",function(a){function b(a,c,d){if(d){var h;a:{for(h=0;h<d.length;h++){var k=d[h];if(1===k.nodeType){h=k;break a}}h=void 0}!h||h.parentNode||h.previousElementSibling||(d=null)}d?d.after(a):c.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(e,f,g,h){f=f&&C(f);g=g&&C(g);f=f||g.parent();b(e,f,g);return a.push(e,"enter",Ha(h))},move:function(e,f,g,h){f=f&&C(f);g=g&&C(g);
f=f||g.parent();b(e,f,g);return a.push(e,"move",Ha(h))},leave:function(b,c){return a.push(b,"leave",Ha(c),function(){b.remove()})},addClass:function(b,c,g){g=Ha(g);g.addClass=kb(g.addclass,c);return a.push(b,"addClass",g)},removeClass:function(b,c,g){g=Ha(g);g.removeClass=kb(g.removeClass,c);return a.push(b,"removeClass",g)},setClass:function(b,c,g,h){h=Ha(h);h.addClass=kb(h.addClass,c);h.removeClass=kb(h.removeClass,g);return a.push(b,"setClass",h)},animate:function(b,c,g,h,k){k=Ha(k);k.from=k.from?
T(k.from,c):c;k.to=k.to?T(k.to,g):g;k.tempClasses=kb(k.tempClasses,h||"ng-inline-animate");return a.push(b,"animate",k)}}}]}],af=function(){this.$get=["$$rAF",function(a){function b(b){d.push(b);1<d.length||a(function(){for(var a=0;a<d.length;a++)d[a]();d=[]})}var d=[];return function(){var a=!1;b(function(){a=!0});return function(d){a?d():b(d)}}}]},$e=function(){this.$get=["$q","$sniffer","$$animateAsyncRun","$document","$timeout",function(a,b,d,c,e){function f(a){this.setHost(a);var b=d();this._doneCallbacks=
[];this._tick=function(a){var d=c[0];d&&d.hidden?e(a,0,!1):b(a)};this._state=0}f.chain=function(a,b){function c(){if(d===a.length)b(!0);else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};f.all=function(a,b){function c(f){e=e&&f;++d===a.length&&b(e)}var d=0,e=!0;n(a,function(a){a.done(c)})};f.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:x,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,
c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=
this;0===b._state&&(b._state=1,b._tick(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(n(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return f}]},Xe=function(){this.$get=["$$rAF","$q","$$AnimateRunner",function(a,b,d){return function(b,e){function f(){a(function(){g.addClass&&(b.addClass(g.addClass),g.addClass=null);g.removeClass&&(b.removeClass(g.removeClass),g.removeClass=null);g.to&&(b.css(g.to),g.to=null);h||k.complete();h=!0});return k}
var g=e||{};g.$$prepared||(g=Oa(g));g.cleanupStyles&&(g.from=g.to=null);g.from&&(b.css(g.from),g.from=null);var h,k=new d;return{start:f,end:f}}}]},ia=K("$compile");Ec.$inject=["$provide","$$sanitizeUriProvider"];var Xc=/^((?:x|data)[\:\-_])/i,$f=K("$controller"),cd=/^(\S+)(\s+as\s+([\w$]+))?$/,gf=function(){this.$get=["$document",function(a){return function(b){b?!b.nodeType&&b instanceof C&&(b=b[0]):b=a[0].body;return b.offsetWidth+1}}]},dd="application/json",dc={"Content-Type":dd+";charset=utf-8"},
bg=/^\[|^\{(?!\{)/,cg={"[":/]$/,"{":/}$/},ag=/^\)\]\}',?\n/,Cg=K("$http"),hd=function(a){return function(){throw Cg("legacy",a);}},Ka=ha.$interpolateMinErr=K("$interpolate");Ka.throwNoconcat=function(a){throw Ka("noconcat",a);};Ka.interr=function(a,b){return Ka("interr",a,b.toString())};var Dg=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,eg={http:80,https:443,ftp:21},Gb=K("$location"),Eg={$$html5:!1,$$replace:!1,absUrl:Hb("$$absUrl"),url:function(a){if(z(a))return this.$$url;var b=Dg.exec(a);(b[1]||""===a)&&
this.path(decodeURIComponent(b[1]));(b[2]||b[1]||""===a)&&this.search(b[3]||"");this.hash(b[5]||"");return this},protocol:Hb("$$protocol"),host:Hb("$$host"),port:Hb("$$port"),path:md("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,b){switch(arguments.length){case 0:return this.$$search;case 1:if(E(a)||P(a))a=a.toString(),this.$$search=zc(a);else if(I(a))a=Oa(a,{}),n(a,function(b,c){null==b&&delete a[c]}),this.$$search=a;else throw Gb("isrcharg");
break;default:z(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}this.$$compose();return this},hash:md("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};n([ld,gc,fc],function(a){a.prototype=Object.create(Eg);a.prototype.state=function(b){if(!arguments.length)return this.$$state;if(a!==fc||!this.$$html5)throw Gb("nostate");this.$$state=z(b)?null:b;return this}});var ja=K("$parse"),gg=Function.prototype.call,hg=Function.prototype.apply,
ig=Function.prototype.bind,Pb=Z();n("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Pb[a]=!0});var Fg={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},ic=function(a){this.options=a};ic.prototype={constructor:ic,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();
else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var b=a+this.peek(),d=b+this.peek(2),c=Pb[b],e=Pb[d];Pb[a]||c||e?(a=e?d:c?b:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+
a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,b,d){d=d||this.index;b=y(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,d)+"]":" "+d;throw ja("lexerr",a,b,this.text);},readNumber:function(){for(var a="",b=this.index;this.index<
this.text.length;){var d=G(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var c=this.peek();if("e"==d&&this.isExpOperator(c))a+=d;else if(this.isExpOperator(d)&&c&&this.isNumber(c)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||c&&this.isNumber(c)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:b,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var b=
this.text.charAt(this.index);if(!this.isIdent(b)&&!this.isNumber(b))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var d="",c=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),c=c+f;if(e)"u"===f?(e=this.text.substring(this.index+1,this.index+5),e.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+e+"]"),this.index+=4,d+=String.fromCharCode(parseInt(e,16))):
d+=Fg[f]||f,e=!1;else if("\\"===f)e=!0;else{if(f===a){this.index++;this.tokens.push({index:b,text:c,constant:!0,value:d});return}d+=f}this.index++}this.throwError("Unterminated quote",b)}};var q=function(a,b){this.lexer=a;this.options=b};q.Program="Program";q.ExpressionStatement="ExpressionStatement";q.AssignmentExpression="AssignmentExpression";q.ConditionalExpression="ConditionalExpression";q.LogicalExpression="LogicalExpression";q.BinaryExpression="BinaryExpression";q.UnaryExpression="UnaryExpression";
q.CallExpression="CallExpression";q.MemberExpression="MemberExpression";q.Identifier="Identifier";q.Literal="Literal";q.ArrayExpression="ArrayExpression";q.Property="Property";q.ObjectExpression="ObjectExpression";q.ThisExpression="ThisExpression";q.LocalsExpression="LocalsExpression";q.NGValueParameter="NGValueParameter";q.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},
program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:q.Program,body:a}},expressionStatement:function(){return{type:q.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();this.expect("=")&&(a={type:q.AssignmentExpression,
left:a,right:this.assignment(),operator:"="});return a},ternary:function(){var a=this.logicalOR(),b,d;return this.expect("?")&&(b=this.expression(),this.consume(":"))?(d=this.expression(),{type:q.ConditionalExpression,test:a,alternate:b,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:q.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a={type:q.LogicalExpression,
operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),b;b=this.expect("==","!=","===","!==");)a={type:q.BinaryExpression,operator:b.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),b;b=this.expect("<",">","<=",">=");)a={type:q.BinaryExpression,operator:b.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),b;b=this.expect("+","-");)a={type:q.BinaryExpression,operator:b.text,
left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),b;b=this.expect("*","/","%");)a={type:q.BinaryExpression,operator:b.text,left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:q.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():
this.constants.hasOwnProperty(this.peek().text)?a=Oa(this.constants[this.consume().text]):this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var b;b=this.expect("(","[",".");)"("===b.text?(a={type:q.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===b.text?(a={type:q.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===b.text?a={type:q.MemberExpression,
object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var b={type:q.CallExpression,callee:this.identifier(),arguments:a,filter:!0};this.expect(":");)a.push(this.expression());return b},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.expression());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:q.Identifier,
name:a.text}},constant:function(){return{type:q.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return{type:q.ArrayExpression,elements:a}},object:function(){var a=[],b;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;b={type:q.Property,kind:"init"};this.peek().constant?b.key=this.constant():this.peek().identifier?b.key=this.identifier():
this.throwError("invalid key",this.peek());this.consume(":");b.value=this.expression();a.push(b)}while(this.expect(","))}this.consume("}");return{type:q.ObjectExpression,properties:a}},throwError:function(a,b){throw ja("syntax",b.text,a,b.index+1,this.text,this.text.substring(b.index));},consume:function(a){if(0===this.tokens.length)throw ja("ueoe",this.text);var b=this.expect(a);b||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return b},peekToken:function(){if(0===this.tokens.length)throw ja("ueoe",
this.text);return this.tokens[0]},peek:function(a,b,d,c){return this.peekAhead(0,a,b,d,c)},peekAhead:function(a,b,d,c,e){if(this.tokens.length>a){a=this.tokens[a];var f=a.text;if(f===b||f===d||f===c||f===e||!(b||d||c||e))return a}return!1},expect:function(a,b,d,c){return(a=this.peek(a,b,d,c))?(this.tokens.shift(),a):!1},constants:{"true":{type:q.Literal,value:!0},"false":{type:q.Literal,value:!1},"null":{type:q.Literal,value:null},undefined:{type:q.Literal,value:v},"this":{type:q.ThisExpression},
$locals:{type:q.LocalsExpression}}};td.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.state={nextId:0,filters:{},expensiveChecks:b,fn:{vars:[],body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]};M(c,d.$filter);var e="",f;this.stage="assign";if(f=rd(c))this.state.computing="assign",e=this.nextId(),this.recurse(f,e),this.return_(e),e="fn.assign="+this.generateFunction("assign","s,v,l");f=pd(c.body);d.stage="inputs";n(f,function(a,b){var c="fn"+b;d.state[c]={vars:[],
body:[],own:{}};d.state.computing=c;var e=d.nextId();d.recurse(a,e);d.return_(e);d.state.inputs.push(c);a.watchId=b});this.state.computing="fn";this.stage="main";this.recurse(c);e='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+e+this.watchFns()+"return fn;";e=(new Function("$filter","ensureSafeMemberName","ensureSafeObject","ensureSafeFunction","getStringValue","ensureSafeAssignContext","ifDefined","plus","text",e))(this.$filter,Ya,Aa,nd,fg,
Ib,jg,od,a);this.state=this.stage=v;e.literal=sd(c);e.constant=c.constant;return e},USE:"use",STRICT:"strict",watchFns:function(){var a=[],b=this.state.inputs,d=this;n(b,function(b){a.push("var "+b+"="+d.generateFunction(b,"s"))});b.length&&a.push("fn.inputs=["+b.join(",")+"];");return a.join("")},generateFunction:function(a,b){return"function("+b+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],b=this;n(this.state.filters,function(d,c){a.push(d+"=$filter("+b.escape(c)+
")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,b,d,c,e,f){var g,h,k=this,l,m;c=c||x;if(!f&&y(a.watchId))b=b||this.nextId(),this.if_("i",this.lazyAssign(b,this.computedMember("i",a.watchId)),this.lazyRecurse(a,b,d,c,e,!0));else switch(a.type){case q.Program:n(a.body,function(b,c){k.recurse(b.expression,v,v,function(a){h=a});c!==
a.body.length-1?k.current().body.push(h,";"):k.return_(h)});break;case q.Literal:m=this.escape(a.value);this.assign(b,m);c(m);break;case q.UnaryExpression:this.recurse(a.argument,v,v,function(a){h=a});m=a.operator+"("+this.ifDefined(h,0)+")";this.assign(b,m);c(m);break;case q.BinaryExpression:this.recurse(a.left,v,v,function(a){g=a});this.recurse(a.right,v,v,function(a){h=a});m="+"===a.operator?this.plus(g,h):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(h,0):"("+g+")"+a.operator+
"("+h+")";this.assign(b,m);c(m);break;case q.LogicalExpression:b=b||this.nextId();k.recurse(a.left,b);k.if_("&&"===a.operator?b:k.not(b),k.lazyRecurse(a.right,b));c(b);break;case q.ConditionalExpression:b=b||this.nextId();k.recurse(a.test,b);k.if_(b,k.lazyRecurse(a.alternate,b),k.lazyRecurse(a.consequent,b));c(b);break;case q.Identifier:b=b||this.nextId();d&&(d.context="inputs"===k.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);Ya(a.name);
k.if_("inputs"===k.stage||k.not(k.getHasOwnProperty("l",a.name)),function(){k.if_("inputs"===k.stage||"s",function(){e&&1!==e&&k.if_(k.not(k.nonComputedMember("s",a.name)),k.lazyAssign(k.nonComputedMember("s",a.name),"{}"));k.assign(b,k.nonComputedMember("s",a.name))})},b&&k.lazyAssign(b,k.nonComputedMember("l",a.name)));(k.state.expensiveChecks||Jb(a.name))&&k.addEnsureSafeObject(b);c(b);break;case q.MemberExpression:g=d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();k.recurse(a.object,
g,v,function(){k.if_(k.notNull(g),function(){e&&1!==e&&k.addEnsureSafeAssignContext(g);if(a.computed)h=k.nextId(),k.recurse(a.property,h),k.getStringValue(h),k.addEnsureSafeMemberName(h),e&&1!==e&&k.if_(k.not(k.computedMember(g,h)),k.lazyAssign(k.computedMember(g,h),"{}")),m=k.ensureSafeObject(k.computedMember(g,h)),k.assign(b,m),d&&(d.computed=!0,d.name=h);else{Ya(a.property.name);e&&1!==e&&k.if_(k.not(k.nonComputedMember(g,a.property.name)),k.lazyAssign(k.nonComputedMember(g,a.property.name),"{}"));
m=k.nonComputedMember(g,a.property.name);if(k.state.expensiveChecks||Jb(a.property.name))m=k.ensureSafeObject(m);k.assign(b,m);d&&(d.computed=!1,d.name=a.property.name)}},function(){k.assign(b,"undefined")});c(b)},!!e);break;case q.CallExpression:b=b||this.nextId();a.filter?(h=k.filter(a.callee.name),l=[],n(a.arguments,function(a){var b=k.nextId();k.recurse(a,b);l.push(b)}),m=h+"("+l.join(",")+")",k.assign(b,m),c(b)):(h=k.nextId(),g={},l=[],k.recurse(a.callee,h,g,function(){k.if_(k.notNull(h),function(){k.addEnsureSafeFunction(h);
n(a.arguments,function(a){k.recurse(a,k.nextId(),v,function(a){l.push(k.ensureSafeObject(a))})});g.name?(k.state.expensiveChecks||k.addEnsureSafeObject(g.context),m=k.member(g.context,g.name,g.computed)+"("+l.join(",")+")"):m=h+"("+l.join(",")+")";m=k.ensureSafeObject(m);k.assign(b,m)},function(){k.assign(b,"undefined")});c(b)}));break;case q.AssignmentExpression:h=this.nextId();g={};if(!qd(a.left))throw ja("lval");this.recurse(a.left,v,g,function(){k.if_(k.notNull(g.context),function(){k.recurse(a.right,
h);k.addEnsureSafeObject(k.member(g.context,g.name,g.computed));k.addEnsureSafeAssignContext(g.context);m=k.member(g.context,g.name,g.computed)+a.operator+h;k.assign(b,m);c(b||m)})},1);break;case q.ArrayExpression:l=[];n(a.elements,function(a){k.recurse(a,k.nextId(),v,function(a){l.push(a)})});m="["+l.join(",")+"]";this.assign(b,m);c(m);break;case q.ObjectExpression:l=[];n(a.properties,function(a){k.recurse(a.value,k.nextId(),v,function(b){l.push(k.escape(a.key.type===q.Identifier?a.key.name:""+a.key.value)+
":"+b)})});m="{"+l.join(",")+"}";this.assign(b,m);c(m);break;case q.ThisExpression:this.assign(b,"s");c("s");break;case q.LocalsExpression:this.assign(b,"l");c("l");break;case q.NGValueParameter:this.assign(b,"v"),c("v")}},getHasOwnProperty:function(a,b){var d=a+"."+b,c=this.current().own;c.hasOwnProperty(d)||(c[d]=this.nextId(!1,a+"&&("+this.escape(b)+" in "+a+")"));return c[d]},assign:function(a,b){if(a)return this.current().body.push(a,"=",b,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||
(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,b){return"ifDefined("+a+","+this.escape(b)+")"},plus:function(a,b){return"plus("+a+","+b+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,b,d){if(!0===a)b();else{var c=this.current().body;c.push("if(",a,"){");b();c.push("}");d&&(c.push("else{"),d(),c.push("}"))}},not:function(a){return"!("+a+")"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,b){return a+
"."+b},computedMember:function(a,b){return a+"["+b+"]"},member:function(a,b,d){return d?this.computedMember(a,b):this.nonComputedMember(a,b)},addEnsureSafeObject:function(a){this.current().body.push(this.ensureSafeObject(a),";")},addEnsureSafeMemberName:function(a){this.current().body.push(this.ensureSafeMemberName(a),";")},addEnsureSafeFunction:function(a){this.current().body.push(this.ensureSafeFunction(a),";")},addEnsureSafeAssignContext:function(a){this.current().body.push(this.ensureSafeAssignContext(a),
";")},ensureSafeObject:function(a){return"ensureSafeObject("+a+",text)"},ensureSafeMemberName:function(a){return"ensureSafeMemberName("+a+",text)"},ensureSafeFunction:function(a){return"ensureSafeFunction("+a+",text)"},getStringValue:function(a){this.assign(a,"getStringValue("+a+")")},ensureSafeAssignContext:function(a){return"ensureSafeAssignContext("+a+",text)"},lazyRecurse:function(a,b,d,c,e,f){var g=this;return function(){g.recurse(a,b,d,c,e,f)}},lazyAssign:function(a,b){var d=this;return function(){d.assign(a,
b)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(E(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(P(a))return a.toString();if(!0===a)return"true";if(!1===a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw ja("esc");},nextId:function(a,b){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(b?"="+b:""));return d},current:function(){return this.state[this.state.computing]}};
ud.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.expression=a;this.expensiveChecks=b;M(c,d.$filter);var e,f;if(e=rd(c))f=this.recurse(e);e=pd(c.body);var g;e&&(g=[],n(e,function(a,b){var c=d.recurse(a);a.input=c;g.push(c);a.watchId=b}));var h=[];n(c.body,function(a){h.push(d.recurse(a.expression))});e=0===c.body.length?function(){}:1===c.body.length?h[0]:function(a,b){var c;n(h,function(d){c=d(a,b)});return c};f&&(e.assign=function(a,b,c){return f(a,c,b)});g&&(e.inputs=
g);e.literal=sd(c);e.constant=c.constant;return e},recurse:function(a,b,d){var c,e,f=this,g;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case q.Literal:return this.value(a.value,b);case q.UnaryExpression:return e=this.recurse(a.argument),this["unary"+a.operator](e,b);case q.BinaryExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case q.LogicalExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,
e,b);case q.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),b);case q.Identifier:return Ya(a.name,f.expression),f.identifier(a.name,f.expensiveChecks||Jb(a.name),b,d,f.expression);case q.MemberExpression:return c=this.recurse(a.object,!1,!!d),a.computed||(Ya(a.property.name,f.expression),e=a.property.name),a.computed&&(e=this.recurse(a.property)),a.computed?this.computedMember(c,e,b,d,f.expression):this.nonComputedMember(c,e,
f.expensiveChecks,b,d,f.expression);case q.CallExpression:return g=[],n(a.arguments,function(a){g.push(f.recurse(a))}),a.filter&&(e=this.$filter(a.callee.name)),a.filter||(e=this.recurse(a.callee,!0)),a.filter?function(a,c,d,f){for(var r=[],n=0;n<g.length;++n)r.push(g[n](a,c,d,f));a=e.apply(v,r,f);return b?{context:v,name:v,value:a}:a}:function(a,c,d,m){var r=e(a,c,d,m),n;if(null!=r.value){Aa(r.context,f.expression);nd(r.value,f.expression);n=[];for(var q=0;q<g.length;++q)n.push(Aa(g[q](a,c,d,m),
f.expression));n=Aa(r.value.apply(r.context,n),f.expression)}return b?{value:n}:n};case q.AssignmentExpression:return c=this.recurse(a.left,!0,1),e=this.recurse(a.right),function(a,d,g,m){var n=c(a,d,g,m);a=e(a,d,g,m);Aa(n.value,f.expression);Ib(n.context);n.context[n.name]=a;return b?{value:a}:a};case q.ArrayExpression:return g=[],n(a.elements,function(a){g.push(f.recurse(a))}),function(a,c,d,e){for(var f=[],n=0;n<g.length;++n)f.push(g[n](a,c,d,e));return b?{value:f}:f};case q.ObjectExpression:return g=
[],n(a.properties,function(a){g.push({key:a.key.type===q.Identifier?a.key.name:""+a.key.value,value:f.recurse(a.value)})}),function(a,c,d,e){for(var f={},n=0;n<g.length;++n)f[g[n].key]=g[n].value(a,c,d,e);return b?{value:f}:f};case q.ThisExpression:return function(a){return b?{value:a}:a};case q.LocalsExpression:return function(a,c){return b?{value:c}:c};case q.NGValueParameter:return function(a,c,d,e){return b?{value:d}:d}}},"unary+":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=y(d)?+d:
0;return b?{value:d}:d}},"unary-":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=y(d)?-d:0;return b?{value:d}:d}},"unary!":function(a,b){return function(d,c,e,f){d=!a(d,c,e,f);return b?{value:d}:d}},"binary+":function(a,b,d){return function(c,e,f,g){var h=a(c,e,f,g);c=b(c,e,f,g);h=od(h,c);return d?{value:h}:h}},"binary-":function(a,b,d){return function(c,e,f,g){var h=a(c,e,f,g);c=b(c,e,f,g);h=(y(h)?h:0)-(y(c)?c:0);return d?{value:h}:h}},"binary*":function(a,b,d){return function(c,e,f,g){c=
a(c,e,f,g)*b(c,e,f,g);return d?{value:c}:c}},"binary/":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)/b(c,e,f,g);return d?{value:c}:c}},"binary%":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)%b(c,e,f,g);return d?{value:c}:c}},"binary===":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)===b(c,e,f,g);return d?{value:c}:c}},"binary!==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!==b(c,e,f,g);return d?{value:c}:c}},"binary==":function(a,b,d){return function(c,e,f,g){c=a(c,
e,f,g)==b(c,e,f,g);return d?{value:c}:c}},"binary!=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!=b(c,e,f,g);return d?{value:c}:c}},"binary<":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<b(c,e,f,g);return d?{value:c}:c}},"binary>":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>b(c,e,f,g);return d?{value:c}:c}},"binary<=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<=b(c,e,f,g);return d?{value:c}:c}},"binary>=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>=
b(c,e,f,g);return d?{value:c}:c}},"binary&&":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)&&b(c,e,f,g);return d?{value:c}:c}},"binary||":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)||b(c,e,f,g);return d?{value:c}:c}},"ternary?:":function(a,b,d,c){return function(e,f,g,h){e=a(e,f,g,h)?b(e,f,g,h):d(e,f,g,h);return c?{value:e}:e}},value:function(a,b){return function(){return b?{context:v,name:v,value:a}:a}},identifier:function(a,b,d,c,e){return function(f,g,h,k){f=g&&a in g?g:f;c&&1!==
c&&f&&!f[a]&&(f[a]={});g=f?f[a]:v;b&&Aa(g,e);return d?{context:f,name:a,value:g}:g}},computedMember:function(a,b,d,c,e){return function(f,g,h,k){var l=a(f,g,h,k),m,n;null!=l&&(m=b(f,g,h,k),m+="",Ya(m,e),c&&1!==c&&(Ib(l),l&&!l[m]&&(l[m]={})),n=l[m],Aa(n,e));return d?{context:l,name:m,value:n}:n}},nonComputedMember:function(a,b,d,c,e,f){return function(g,h,k,l){g=a(g,h,k,l);e&&1!==e&&(Ib(g),g&&!g[b]&&(g[b]={}));h=null!=g?g[b]:v;(d||Jb(b))&&Aa(h,f);return c?{context:g,name:b,value:h}:h}},inputs:function(a,
b){return function(d,c,e,f){return f?f[b]:a(d,c,e)}}};var jc=function(a,b,d){this.lexer=a;this.$filter=b;this.options=d;this.ast=new q(this.lexer);this.astCompiler=d.csp?new ud(this.ast,b):new td(this.ast,b)};jc.prototype={constructor:jc,parse:function(a){return this.astCompiler.compile(a,this.options.expensiveChecks)}};var kg=Object.prototype.valueOf,Ba=K("$sce"),pa={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ia=K("$compile"),Y=W.createElement("a"),yd=za(Q.location.href);
zd.$inject=["$document"];Lc.$inject=["$provide"];var Gd=22,Fd=".",lc="0";Ad.$inject=["$locale"];Cd.$inject=["$locale"];var wg={yyyy:aa("FullYear",4),yy:aa("FullYear",2,0,!0),y:aa("FullYear",1),MMMM:Lb("Month"),MMM:Lb("Month",!0),MM:aa("Month",2,1),M:aa("Month",1,1),dd:aa("Date",2),d:aa("Date",1),HH:aa("Hours",2),H:aa("Hours",1),hh:aa("Hours",2,-12),h:aa("Hours",1,-12),mm:aa("Minutes",2),m:aa("Minutes",1),ss:aa("Seconds",2),s:aa("Seconds",1),sss:aa("Milliseconds",3),EEEE:Lb("Day"),EEE:Lb("Day",!0),
a:function(a,b){return 12>a.getHours()?b.AMPMS[0]:b.AMPMS[1]},Z:function(a,b,d){a=-1*d;return a=(0<=a?"+":"")+(Kb(Math[0<a?"floor":"ceil"](a/60),2)+Kb(Math.abs(a%60),2))},ww:Id(2),w:Id(1),G:mc,GG:mc,GGG:mc,GGGG:function(a,b){return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]}},vg=/((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,ug=/^\-?\d+$/;Bd.$inject=["$locale"];var pg=ba(G),qg=ba(vb);Dd.$inject=["$parse"];var me=ba({restrict:"E",compile:function(a,b){if(!b.href&&
!b.xlinkHref)return function(a,b){if("a"===b[0].nodeName.toLowerCase()){var e="[object SVGAnimatedString]"===fa.call(b.prop("href"))?"xlink:href":"href";b.on("click",function(a){b.attr(e)||a.preventDefault()})}}}}),wb={};n(Eb,function(a,b){function d(a,d,e){a.$watch(e[c],function(a){e.$set(b,!!a)})}if("multiple"!=a){var c=ta("ng-"+b),e=d;"checked"===a&&(e=function(a,b,e){e.ngModel!==e[c]&&d(a,b,e)});wb[c]=function(){return{restrict:"A",priority:100,link:e}}}});n(bd,function(a,b){wb[b]=function(){return{priority:100,
link:function(a,c,e){if("ngPattern"===b&&"/"==e.ngPattern.charAt(0)&&(c=e.ngPattern.match(yg))){e.$set("ngPattern",new RegExp(c[1],c[2]));return}a.$watch(e[b],function(a){e.$set(b,a)})}}}});n(["src","srcset","href"],function(a){var b=ta("ng-"+a);wb[b]=function(){return{priority:99,link:function(d,c,e){var f=a,g=a;"href"===a&&"[object SVGAnimatedString]"===fa.call(c.prop("href"))&&(g="xlinkHref",e.$attr[g]="xlink:href",f=null);e.$observe(b,function(b){b?(e.$set(g,b),wa&&f&&c.prop(f,e[g])):"href"===
a&&e.$set(g,null)})}}}});var Mb={$addControl:x,$$renameControl:function(a,b){a.$name=b},$removeControl:x,$setValidity:x,$setDirty:x,$setPristine:x,$setSubmitted:x};Jd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var Rd=function(a){return["$timeout","$parse",function(b,d){function c(a){return""===a?d('this[""]').assign:d(a).assign||x}return{name:"form",restrict:a?"EAC":"E",require:["form","^^?form"],controller:Jd,compile:function(d,f){d.addClass(Za).addClass(pb);var g=f.name?"name":
a&&f.ngForm?"ngForm":!1;return{pre:function(a,d,e,f){var n=f[0];if(!("action"in e)){var s=function(b){a.$apply(function(){n.$commitViewValue();n.$setSubmitted()});b.preventDefault()};d[0].addEventListener("submit",s,!1);d.on("$destroy",function(){b(function(){d[0].removeEventListener("submit",s,!1)},0,!1)})}(f[1]||n.$$parentForm).$addControl(n);var q=g?c(n.$name):x;g&&(q(a,n),e.$observe(g,function(b){n.$name!==b&&(q(a,v),n.$$parentForm.$$renameControl(n,b),q=c(n.$name),q(a,n))}));d.on("$destroy",
function(){n.$$parentForm.$removeControl(n);q(a,v);T(n,Mb)})}}}}}]},ne=Rd(),Ae=Rd(!0),xg=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,Gg=/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,Hg=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Ig=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,Sd=/^(\d{4})-(\d{2})-(\d{2})$/,Td=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
pc=/^(\d{4})-W(\d\d)$/,Ud=/^(\d{4})-(\d\d)$/,Vd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Wd={text:function(a,b,d,c,e,f){mb(a,b,d,c,e,f);nc(c)},date:nb("date",Sd,Ob(Sd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":nb("datetimelocal",Td,Ob(Td,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:nb("time",Vd,Ob(Vd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:nb("week",pc,function(a,b){if(V(a))return a;if(E(a)){pc.lastIndex=0;var d=pc.exec(a);if(d){var c=+d[1],e=+d[2],f=d=0,g=0,
h=0,k=Hd(c),e=7*(e-1);b&&(d=b.getHours(),f=b.getMinutes(),g=b.getSeconds(),h=b.getMilliseconds());return new Date(c,0,k.getDate()+e,d,f,g,h)}}return NaN},"yyyy-Www"),month:nb("month",Ud,Ob(Ud,["yyyy","MM"]),"yyyy-MM"),number:function(a,b,d,c,e,f){Ld(a,b,d,c);mb(a,b,d,c,e,f);c.$$parserName="number";c.$parsers.push(function(a){return c.$isEmpty(a)?null:Ig.test(a)?parseFloat(a):v});c.$formatters.push(function(a){if(!c.$isEmpty(a)){if(!P(a))throw ob("numfmt",a);a=a.toString()}return a});if(y(d.min)||
d.ngMin){var g;c.$validators.min=function(a){return c.$isEmpty(a)||z(g)||a>=g};d.$observe("min",function(a){y(a)&&!P(a)&&(a=parseFloat(a,10));g=P(a)&&!isNaN(a)?a:v;c.$validate()})}if(y(d.max)||d.ngMax){var h;c.$validators.max=function(a){return c.$isEmpty(a)||z(h)||a<=h};d.$observe("max",function(a){y(a)&&!P(a)&&(a=parseFloat(a,10));h=P(a)&&!isNaN(a)?a:v;c.$validate()})}},url:function(a,b,d,c,e,f){mb(a,b,d,c,e,f);nc(c);c.$$parserName="url";c.$validators.url=function(a,b){var d=a||b;return c.$isEmpty(d)||
Gg.test(d)}},email:function(a,b,d,c,e,f){mb(a,b,d,c,e,f);nc(c);c.$$parserName="email";c.$validators.email=function(a,b){var d=a||b;return c.$isEmpty(d)||Hg.test(d)}},radio:function(a,b,d,c){z(d.name)&&b.attr("name",++qb);b.on("click",function(a){b[0].checked&&c.$setViewValue(d.value,a&&a.type)});c.$render=function(){b[0].checked=d.value==c.$viewValue};d.$observe("value",c.$render)},checkbox:function(a,b,d,c,e,f,g,h){var k=Md(h,a,"ngTrueValue",d.ngTrueValue,!0),l=Md(h,a,"ngFalseValue",d.ngFalseValue,
!1);b.on("click",function(a){c.$setViewValue(b[0].checked,a&&a.type)});c.$render=function(){b[0].checked=c.$viewValue};c.$isEmpty=function(a){return!1===a};c.$formatters.push(function(a){return na(a,k)});c.$parsers.push(function(a){return a?k:l})},hidden:x,button:x,submit:x,reset:x,file:x},Fc=["$browser","$sniffer","$filter","$parse",function(a,b,d,c){return{restrict:"E",require:["?ngModel"],link:{pre:function(e,f,g,h){h[0]&&(Wd[G(g.type)]||Wd.text)(e,f,g,h[0],b,a,d,c)}}}}],Jg=/^(true|false|\d+)$/,
Se=function(){return{restrict:"A",priority:100,compile:function(a,b){return Jg.test(b.ngValue)?function(a,b,e){e.$set("value",a.$eval(e.ngValue))}:function(a,b,e){a.$watch(e.ngValue,function(a){e.$set("value",a)})}}}},se=["$compile",function(a){return{restrict:"AC",compile:function(b){a.$$addBindingClass(b);return function(b,c,e){a.$$addBindingInfo(c,e.ngBind);c=c[0];b.$watch(e.ngBind,function(a){c.textContent=z(a)?"":a})}}}}],ue=["$interpolate","$compile",function(a,b){return{compile:function(d){b.$$addBindingClass(d);
return function(c,d,f){c=a(d.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(d,c.expressions);d=d[0];f.$observe("ngBindTemplate",function(a){d.textContent=z(a)?"":a})}}}}],te=["$sce","$parse","$compile",function(a,b,d){return{restrict:"A",compile:function(c,e){var f=b(e.ngBindHtml),g=b(e.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(c);return function(b,c,e){d.$$addBindingInfo(c,e.ngBindHtml);b.$watch(g,function(){c.html(a.getTrustedHtml(f(b))||"")})}}}}],Re=ba({restrict:"A",
require:"ngModel",link:function(a,b,d,c){c.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),ve=oc("",!0),xe=oc("Odd",0),we=oc("Even",1),ye=Ma({compile:function(a,b){b.$set("ngCloak",v);a.removeClass("ng-cloak")}}),ze=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Kc={},Kg={blur:!0,focus:!0};n("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var b=
ta("ng-"+a);Kc[b]=["$parse","$rootScope",function(d,c){return{restrict:"A",compile:function(e,f){var g=d(f[b],null,!0);return function(b,d){d.on(a,function(d){var e=function(){g(b,{$event:d})};Kg[a]&&c.$$phase?b.$evalAsync(e):b.$apply(e)})}}}}]});var Ce=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(b,d,c,e,f){var g,h,k;b.$watch(c.ngIf,function(b){b?h||f(function(b,e){h=e;b[b.length++]=W.createComment(" end ngIf: "+
c.ngIf+" ");g={clone:b};a.enter(b,d.parent(),d)}):(k&&(k.remove(),k=null),h&&(h.$destroy(),h=null),g&&(k=ub(g.clone),a.leave(k).then(function(){k=null}),g=null))})}}}],De=["$templateRequest","$anchorScroll","$animate",function(a,b,d){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:ha.noop,compile:function(c,e){var f=e.ngInclude||e.src,g=e.onload||"",h=e.autoscroll;return function(c,e,m,n,s){var q=0,v,t,p,w=function(){t&&(t.remove(),t=null);v&&(v.$destroy(),v=null);p&&
(d.leave(p).then(function(){t=null}),t=p,p=null)};c.$watch(f,function(f){var m=function(){!y(h)||h&&!c.$eval(h)||b()},B=++q;f?(a(f,!0).then(function(a){if(!c.$$destroyed&&B===q){var b=c.$new();n.template=a;a=s(b,function(a){w();d.enter(a,null,e).then(m)});v=b;p=a;v.$emit("$includeContentLoaded",f);c.$eval(g)}},function(){c.$$destroyed||B!==q||(w(),c.$emit("$includeContentError",f))}),c.$emit("$includeContentRequested",f)):(w(),n.template=null)})}}}}],Ue=["$compile",function(a){return{restrict:"ECA",
priority:-400,require:"ngInclude",link:function(b,d,c,e){fa.call(d[0]).match(/SVG/)?(d.empty(),a(Nc(e.template,W).childNodes)(b,function(a){d.append(a)},{futureParentElement:d})):(d.html(e.template),a(d.contents())(b))}}}],Ee=Ma({priority:450,compile:function(){return{pre:function(a,b,d){a.$eval(d.ngInit)}}}}),Qe=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,b,d,c){var e=b.attr(d.$attr.ngList)||", ",f="false"!==d.ngTrim,g=f?X(e):e;c.$parsers.push(function(a){if(!z(a)){var b=
[];a&&n(a.split(g),function(a){a&&b.push(f?X(a):a)});return b}});c.$formatters.push(function(a){return L(a)?a.join(e):v});c.$isEmpty=function(a){return!a||!a.length}}}},pb="ng-valid",Nd="ng-invalid",Za="ng-pristine",Nb="ng-dirty",Pd="ng-pending",ob=K("ngModel"),Lg=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,b,d,c,e,f,g,h,k,l){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=v;this.$validators={};this.$asyncValidators=
{};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=v;this.$name=l(d.name||"",!1)(a);this.$$parentForm=Mb;var m=e(d.ngModel),r=m.assign,q=m,H=r,F=null,t,p=this;this.$$setOptions=function(a){if((p.$options=a)&&a.getterSetter){var b=e(d.ngModel+"()"),f=e(d.ngModel+"($$$p)");q=function(a){var c=m(a);D(c)&&(c=b(a));return c};H=function(a,
b){D(m(a))?f(a,{$$$p:p.$modelValue}):r(a,p.$modelValue)}}else if(!m.assign)throw ob("nonassign",d.ngModel,ra(c));};this.$render=x;this.$isEmpty=function(a){return z(a)||""===a||null===a||a!==a};this.$$updateEmptyClasses=function(a){p.$isEmpty(a)?(f.removeClass(c,"ng-not-empty"),f.addClass(c,"ng-empty")):(f.removeClass(c,"ng-empty"),f.addClass(c,"ng-not-empty"))};var w=0;Kd({ctrl:this,$element:c,set:function(a,b){a[b]=!0},unset:function(a,b){delete a[b]},$animate:f});this.$setPristine=function(){p.$dirty=
!1;p.$pristine=!0;f.removeClass(c,Nb);f.addClass(c,Za)};this.$setDirty=function(){p.$dirty=!0;p.$pristine=!1;f.removeClass(c,Za);f.addClass(c,Nb);p.$$parentForm.$setDirty()};this.$setUntouched=function(){p.$touched=!1;p.$untouched=!0;f.setClass(c,"ng-untouched","ng-touched")};this.$setTouched=function(){p.$touched=!0;p.$untouched=!1;f.setClass(c,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){g.cancel(F);p.$viewValue=p.$$lastCommittedViewValue;p.$render()};this.$validate=function(){if(!P(p.$modelValue)||
!isNaN(p.$modelValue)){var a=p.$$rawModelValue,b=p.$valid,c=p.$modelValue,d=p.$options&&p.$options.allowInvalid;p.$$runValidators(a,p.$$lastCommittedViewValue,function(e){d||b===e||(p.$modelValue=e?a:v,p.$modelValue!==c&&p.$$writeModelToScope())})}};this.$$runValidators=function(a,b,c){function d(){var c=!0;n(p.$validators,function(d,e){var g=d(a,b);c=c&&g;f(e,g)});return c?!0:(n(p.$asyncValidators,function(a,b){f(b,null)}),!1)}function e(){var c=[],d=!0;n(p.$asyncValidators,function(e,g){var h=e(a,
b);if(!h||!D(h.then))throw ob("nopromise",h);f(g,v);c.push(h.then(function(){f(g,!0)},function(a){d=!1;f(g,!1)}))});c.length?k.all(c).then(function(){g(d)},x):g(!0)}function f(a,b){h===w&&p.$setValidity(a,b)}function g(a){h===w&&c(a)}w++;var h=w;(function(){var a=p.$$parserName||"parse";if(z(t))f(a,null);else return t||(n(p.$validators,function(a,b){f(b,null)}),n(p.$asyncValidators,function(a,b){f(b,null)})),f(a,t),t;return!0})()?d()?e():g(!1):g(!1)};this.$commitViewValue=function(){var a=p.$viewValue;
g.cancel(F);if(p.$$lastCommittedViewValue!==a||""===a&&p.$$hasNativeValidators)p.$$updateEmptyClasses(a),p.$$lastCommittedViewValue=a,p.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var b=p.$$lastCommittedViewValue;if(t=z(b)?v:!0)for(var c=0;c<p.$parsers.length;c++)if(b=p.$parsers[c](b),z(b)){t=!1;break}P(p.$modelValue)&&isNaN(p.$modelValue)&&(p.$modelValue=q(a));var d=p.$modelValue,e=p.$options&&p.$options.allowInvalid;p.$$rawModelValue=b;e&&(p.$modelValue=
b,p.$modelValue!==d&&p.$$writeModelToScope());p.$$runValidators(b,p.$$lastCommittedViewValue,function(a){e||(p.$modelValue=a?b:v,p.$modelValue!==d&&p.$$writeModelToScope())})};this.$$writeModelToScope=function(){H(a,p.$modelValue);n(p.$viewChangeListeners,function(a){try{a()}catch(c){b(c)}})};this.$setViewValue=function(a,b){p.$viewValue=a;p.$options&&!p.$options.updateOnDefault||p.$$debounceViewValueCommit(b)};this.$$debounceViewValueCommit=function(b){var c=0,d=p.$options;d&&y(d.debounce)&&(d=d.debounce,
P(d)?c=d:P(d[b])?c=d[b]:P(d["default"])&&(c=d["default"]));g.cancel(F);c?F=g(function(){p.$commitViewValue()},c):h.$$phase?p.$commitViewValue():a.$apply(function(){p.$commitViewValue()})};a.$watch(function(){var b=q(a);if(b!==p.$modelValue&&(p.$modelValue===p.$modelValue||b===b)){p.$modelValue=p.$$rawModelValue=b;t=v;for(var c=p.$formatters,d=c.length,e=b;d--;)e=c[d](e);p.$viewValue!==e&&(p.$$updateEmptyClasses(e),p.$viewValue=p.$$lastCommittedViewValue=e,p.$render(),p.$$runValidators(b,e,x))}return b})}],
Pe=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Lg,priority:1,compile:function(b){b.addClass(Za).addClass("ng-untouched").addClass(pb);return{pre:function(a,b,e,f){var g=f[0];b=f[1]||g.$$parentForm;g.$$setOptions(f[2]&&f[2].$options);b.$addControl(g);e.$observe("name",function(a){g.$name!==a&&g.$$parentForm.$$renameControl(g,a)});a.$on("$destroy",function(){g.$$parentForm.$removeControl(g)})},post:function(b,c,e,f){var g=f[0];if(g.$options&&
g.$options.updateOn)c.on(g.$options.updateOn,function(a){g.$$debounceViewValueCommit(a&&a.type)});c.on("blur",function(c){g.$touched||(a.$$phase?b.$evalAsync(g.$setTouched):b.$apply(g.$setTouched))})}}}}}],Mg=/(\s+|^)default(\s+|$)/,Te=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,b){var d=this;this.$options=Oa(a.$eval(b.ngModelOptions));y(this.$options.updateOn)?(this.$options.updateOnDefault=!1,this.$options.updateOn=X(this.$options.updateOn.replace(Mg,function(){d.$options.updateOnDefault=
!0;return" "}))):this.$options.updateOnDefault=!0}]}},Fe=Ma({terminal:!0,priority:1E3}),Ng=K("ngOptions"),Og=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,Ne=["$compile","$parse",function(a,b){function d(a,c,d){function e(a,b,c,d,f){this.selectValue=a;this.viewValue=b;this.label=c;this.group=d;this.disabled=f}
function l(a){var b;if(!q&&Ca(a))b=a;else{b=[];for(var c in a)a.hasOwnProperty(c)&&"$"!==c.charAt(0)&&b.push(c)}return b}var m=a.match(Og);if(!m)throw Ng("iexp",a,ra(c));var n=m[5]||m[7],q=m[6];a=/ as /.test(m[0])&&m[1];var v=m[9];c=b(m[2]?m[1]:n);var y=a&&b(a)||c,t=v&&b(v),p=v?function(a,b){return t(d,b)}:function(a){return Fa(a)},w=function(a,b){return p(a,x(a,b))},u=b(m[2]||m[1]),z=b(m[3]||""),B=b(m[4]||""),A=b(m[8]),C={},x=q?function(a,b){C[q]=b;C[n]=a;return C}:function(a){C[n]=a;return C};return{trackBy:v,
getTrackByValue:w,getWatchables:b(A,function(a){var b=[];a=a||[];for(var c=l(a),e=c.length,f=0;f<e;f++){var g=a===c?f:c[f],k=x(a[g],g),g=p(a[g],k);b.push(g);if(m[2]||m[1])g=u(d,k),b.push(g);m[4]&&(k=B(d,k),b.push(k))}return b}),getOptions:function(){for(var a=[],b={},c=A(d)||[],f=l(c),g=f.length,m=0;m<g;m++){var n=c===f?m:f[m],r=x(c[n],n),q=y(d,r),n=p(q,r),s=u(d,r),t=z(d,r),r=B(d,r),q=new e(n,q,s,t,r);a.push(q);b[n]=q}return{items:a,selectValueMap:b,getOptionFromViewValue:function(a){return b[w(a)]},
getViewValueFromOption:function(a){return v?ha.copy(a.viewValue):a.viewValue}}}}}var c=W.createElement("option"),e=W.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","ngModel"],link:{pre:function(a,b,c,d){d[0].registerOption=x},post:function(b,g,h,k){function l(a,b){a.element=b;b.disabled=a.disabled;a.label!==b.label&&(b.label=a.label,b.textContent=a.label);a.value!==b.value&&(b.value=a.selectValue)}function m(a,b,c,d){b&&G(b.nodeName)===c?c=b:(c=d.cloneNode(!1),b?a.insertBefore(c,
b):a.appendChild(c));return c}function r(a){for(var b;a;)b=a.nextSibling,$b(a),a=b}function q(a){var b=w&&w[0],c=A&&A[0];if(b||c)for(;a&&(a===b||a===c||8===a.nodeType||"option"===qa(a)&&""===a.value);)a=a.nextSibling;return a}function v(){var a=x&&F.readValue();x=D.getOptions();var b={},d=g[0].firstChild;B&&g.prepend(w);d=q(d);x.items.forEach(function(a){var f,h;y(a.group)?(f=b[a.group],f||(f=m(g[0],d,"optgroup",e),d=f.nextSibling,f.label=a.group,f=b[a.group]={groupElement:f,currentOptionElement:f.firstChild}),
h=m(f.groupElement,f.currentOptionElement,"option",c),l(a,h),f.currentOptionElement=h.nextSibling):(h=m(g[0],d,"option",c),l(a,h),d=h.nextSibling)});Object.keys(b).forEach(function(a){r(b[a].currentOptionElement)});r(d);t.$render();if(!t.$isEmpty(a)){var f=F.readValue();(D.trackBy||p?na(a,f):a===f)||(t.$setViewValue(f),t.$render())}}var F=k[0],t=k[1],p=h.multiple,w;k=0;for(var u=g.children(),z=u.length;k<z;k++)if(""===u[k].value){w=u.eq(k);break}var B=!!w,A=C(c.cloneNode(!1));A.val("?");var x,D=d(h.ngOptions,
g,b);p?(t.$isEmpty=function(a){return!a||0===a.length},F.writeValue=function(a){x.items.forEach(function(a){a.element.selected=!1});a&&a.forEach(function(a){(a=x.getOptionFromViewValue(a))&&!a.disabled&&(a.element.selected=!0)})},F.readValue=function(){var a=g.val()||[],b=[];n(a,function(a){(a=x.selectValueMap[a])&&!a.disabled&&b.push(x.getViewValueFromOption(a))});return b},D.trackBy&&b.$watchCollection(function(){if(L(t.$viewValue))return t.$viewValue.map(function(a){return D.getTrackByValue(a)})},
function(){t.$render()})):(F.writeValue=function(a){var b=x.getOptionFromViewValue(a);b&&!b.disabled?g[0].value!==b.selectValue&&(A.remove(),B||w.remove(),g[0].value=b.selectValue,b.element.selected=!0,b.element.setAttribute("selected","selected")):null===a||B?(A.remove(),B||g.prepend(w),g.val(""),w.prop("selected",!0),w.attr("selected",!0)):(B||w.remove(),g.prepend(A),g.val("?"),A.prop("selected",!0),A.attr("selected",!0))},F.readValue=function(){var a=x.selectValueMap[g.val()];return a&&!a.disabled?
(B||w.remove(),A.remove(),x.getViewValueFromOption(a)):null},D.trackBy&&b.$watch(function(){return D.getTrackByValue(t.$viewValue)},function(){t.$render()}));B?(w.remove(),a(w)(b),w.removeClass("ng-scope")):w=C(c.cloneNode(!1));v();b.$watchCollection(D.getWatchables,v)}}}}],Ge=["$locale","$interpolate","$log",function(a,b,d){var c=/{}/g,e=/^when(Minus)?(.+)$/;return{link:function(f,g,h){function k(a){g.text(a||"")}var l=h.count,m=h.$attr.when&&g.attr(h.$attr.when),r=h.offset||0,q=f.$eval(m)||{},v=
{},y=b.startSymbol(),t=b.endSymbol(),p=y+l+"-"+r+t,w=ha.noop,u;n(h,function(a,b){var c=e.exec(b);c&&(c=(c[1]?"-":"")+G(c[2]),q[c]=g.attr(h.$attr[b]))});n(q,function(a,d){v[d]=b(a.replace(c,p))});f.$watch(l,function(b){var c=parseFloat(b),e=isNaN(c);e||c in q||(c=a.pluralCat(c-r));c===u||e&&P(u)&&isNaN(u)||(w(),e=v[c],z(e)?(null!=b&&d.debug("ngPluralize: no rule defined for '"+c+"' in "+m),w=x,k()):w=f.$watch(e,k),u=c)})}}}],He=["$parse","$animate",function(a,b){var d=K("ngRepeat"),c=function(a,b,
c,d,k,l,m){a[c]=d;k&&(a[k]=l);a.$index=b;a.$first=0===b;a.$last=b===m-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(b&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(e,f){var g=f.ngRepeat,h=W.createComment(" end ngRepeat: "+g+" "),k=g.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!k)throw d("iexp",g);var l=k[1],m=k[2],r=k[3],q=k[4],k=l.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
if(!k)throw d("iidexp",l);var y=k[3]||k[1],z=k[2];if(r&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(r)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(r)))throw d("badident",r);var t,p,w,u,x={$id:Fa};q?t=a(q):(w=function(a,b){return Fa(b)},u=function(a){return a});return function(a,e,f,k,l){t&&(p=function(b,c,d){z&&(x[z]=b);x[y]=c;x.$index=d;return t(a,x)});var q=Z();a.$watchCollection(m,function(f){var k,m,s=e[0],t,x=Z(),D,I,K,E,L,G,M;r&&(a[r]=f);if(Ca(f))L=
f,m=p||w;else for(M in m=p||u,L=[],f)ua.call(f,M)&&"$"!==M.charAt(0)&&L.push(M);D=L.length;M=Array(D);for(k=0;k<D;k++)if(I=f===L?k:L[k],K=f[I],E=m(I,K,k),q[E])G=q[E],delete q[E],x[E]=G,M[k]=G;else{if(x[E])throw n(M,function(a){a&&a.scope&&(q[a.id]=a)}),d("dupes",g,E,K);M[k]={id:E,scope:v,clone:v};x[E]=!0}for(t in q){G=q[t];E=ub(G.clone);b.leave(E);if(E[0].parentNode)for(k=0,m=E.length;k<m;k++)E[k].$$NG_REMOVED=!0;G.scope.$destroy()}for(k=0;k<D;k++)if(I=f===L?k:L[k],K=f[I],G=M[k],G.scope){t=s;do t=
t.nextSibling;while(t&&t.$$NG_REMOVED);G.clone[0]!=t&&b.move(ub(G.clone),null,C(s));s=G.clone[G.clone.length-1];c(G.scope,k,y,K,z,I,D)}else l(function(a,d){G.scope=d;var e=h.cloneNode(!1);a[a.length++]=e;b.enter(a,null,C(s));s=e;G.clone=a;x[G.id]=G;c(G.scope,k,y,K,z,I,D)});q=x})}}}}],Ie=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngShow,function(b){a[b?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Be=["$animate",function(a){return{restrict:"A",
multiElement:!0,link:function(b,d,c){b.$watch(c.ngHide,function(b){a[b?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Je=Ma(function(a,b,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&n(d,function(a,c){b.css(c,"")});a&&b.css(a)},!0)}),Ke=["$animate",function(a){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(b,d,c,e){var f=[],g=[],h=[],k=[],l=function(a,b){return function(){a.splice(b,1)}};b.$watch(c.ngSwitch||c.on,function(b){var c,
d;c=0;for(d=h.length;c<d;++c)a.cancel(h[c]);c=h.length=0;for(d=k.length;c<d;++c){var q=ub(g[c].clone);k[c].$destroy();(h[c]=a.leave(q)).then(l(h,c))}g.length=0;k.length=0;(f=e.cases["!"+b]||e.cases["?"])&&n(f,function(b){b.transclude(function(c,d){k.push(d);var e=b.element;c[c.length++]=W.createComment(" end ngSwitchWhen: ");g.push({clone:c});a.enter(c,e.parent(),e)})})})}}}],Le=Ma({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["!"+d.ngSwitchWhen]=
c.cases["!"+d.ngSwitchWhen]||[];c.cases["!"+d.ngSwitchWhen].push({transclude:e,element:b})}}),Me=Ma({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["?"]=c.cases["?"]||[];c.cases["?"].push({transclude:e,element:b})}}),Pg=K("ngTransclude"),Oe=Ma({restrict:"EAC",link:function(a,b,d,c,e){d.ngTransclude===d.$attr.ngTransclude&&(d.ngTransclude="");if(!e)throw Pg("orphan",ra(b));e(function(a){a.length&&(b.empty(),b.append(a))},null,d.ngTransclude||
d.ngTranscludeSlot)}}),oe=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,d){"text/ng-template"==d.type&&a.put(d.id,b[0].text)}}}],Qg={$setViewValue:x,$render:x},Rg=["$element","$scope","$attrs",function(a,b,d){var c=this,e=new Ua;c.ngModelCtrl=Qg;c.unknownOption=C(W.createElement("option"));c.renderUnknownOption=function(b){b="? "+Fa(b)+" ?";c.unknownOption.val(b);a.prepend(c.unknownOption);a.val(b)};b.$on("$destroy",function(){c.renderUnknownOption=x});c.removeUnknownOption=
function(){c.unknownOption.parent()&&c.unknownOption.remove()};c.readValue=function(){c.removeUnknownOption();return a.val()};c.writeValue=function(b){c.hasOption(b)?(c.removeUnknownOption(),a.val(b),""===b&&c.emptyOption.prop("selected",!0)):null==b&&c.emptyOption?(c.removeUnknownOption(),a.val("")):c.renderUnknownOption(b)};c.addOption=function(a,b){Ta(a,'"option value"');""===a&&(c.emptyOption=b);var d=e.get(a)||0;e.put(a,d+1);c.ngModelCtrl.$render();b[0].hasAttribute("selected")&&(b[0].selected=
!0)};c.removeOption=function(a){var b=e.get(a);b&&(1===b?(e.remove(a),""===a&&(c.emptyOption=v)):e.put(a,b-1))};c.hasOption=function(a){return!!e.get(a)};c.registerOption=function(a,b,d,e,l){if(e){var m;d.$observe("value",function(a){y(m)&&c.removeOption(m);m=a;c.addOption(a,b)})}else l?a.$watch(l,function(a,e){d.$set("value",a);e!==a&&c.removeOption(e);c.addOption(a,b)}):c.addOption(d.value,b);b.on("$destroy",function(){c.removeOption(d.value);c.ngModelCtrl.$render()})}}],pe=function(){return{restrict:"E",
require:["select","?ngModel"],controller:Rg,priority:1,link:{pre:function(a,b,d,c){var e=c[1];if(e){var f=c[0];f.ngModelCtrl=e;b.on("change",function(){a.$apply(function(){e.$setViewValue(f.readValue())})});if(d.multiple){f.readValue=function(){var a=[];n(b.find("option"),function(b){b.selected&&a.push(b.value)});return a};f.writeValue=function(a){var c=new Ua(a);n(b.find("option"),function(a){a.selected=y(c.get(a.value))})};var g,h=NaN;a.$watch(function(){h!==e.$viewValue||na(g,e.$viewValue)||(g=
ma(e.$viewValue),e.$render());h=e.$viewValue});e.$isEmpty=function(a){return!a||0===a.length}}}},post:function(a,b,d,c){var e=c[1];if(e){var f=c[0];e.$render=function(){f.writeValue(e.$viewValue)}}}}}},re=["$interpolate",function(a){return{restrict:"E",priority:100,compile:function(b,d){if(y(d.value))var c=a(d.value,!0);else{var e=a(b.text(),!0);e||d.$set("value",b.text())}return function(a,b,d){var k=b.parent();(k=k.data("$selectController")||k.parent().data("$selectController"))&&k.registerOption(a,
b,d,c,e)}}}}],qe=ba({restrict:"E",terminal:!1}),Hc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){c&&(d.required=!0,c.$validators.required=function(a,b){return!d.required||!c.$isEmpty(b)},d.$observe("required",function(){c.$validate()}))}}},Gc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e,f=d.ngPattern||d.pattern;d.$observe("pattern",function(a){E(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw K("ngPattern")("noregexp",
f,a,ra(b));e=a||v;c.$validate()});c.$validators.pattern=function(a,b){return c.$isEmpty(b)||z(e)||e.test(b)}}}}},Jc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=-1;d.$observe("maxlength",function(a){a=ca(a);e=isNaN(a)?-1:a;c.$validate()});c.$validators.maxlength=function(a,b){return 0>e||c.$isEmpty(b)||b.length<=e}}}}},Ic=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=0;d.$observe("minlength",function(a){e=ca(a)||0;c.$validate()});
c.$validators.minlength=function(a,b){return c.$isEmpty(b)||b.length>=e}}}}};Q.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(he(),je(ha),ha.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),
SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),STANDALONEMONTH:"January February March April May June July August September October November December".split(" "),WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",
PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",localeID:"en_US",pluralCat:function(a,c){var e=a|0,f=c;v===f&&(f=Math.min(b(a),3));Math.pow(10,f);return 1==e&&0==f?"one":"other"}})}]),C(W).ready(function(){de(W,Ac)}))})(window,document);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map
;/*
 AngularJS v1.5.0-rc.2
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(r,d,C){'use strict';function w(s,h,g){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,c,b,f,y){function k(){n&&(g.cancel(n),n=null);l&&(l.$destroy(),l=null);m&&(n=g.leave(m),n.then(function(){n=null}),m=null)}function z(){var b=s.current&&s.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),f=s.current;m=y(b,function(b){g.enter(b,null,m||c).then(function(){!d.isDefined(u)||u&&!a.$eval(u)||h()});k()});l=f.scope=b;l.$emit("$viewContentLoaded");
l.$eval(x)}else k()}var l,m,n,u=b.autoscroll,x=b.onload||"";a.$on("$routeChangeSuccess",z);z()}}}function A(d,h,g){return{restrict:"ECA",priority:-400,link:function(a,c){var b=g.current,f=b.locals;c.html(f.$template);var y=d(c.contents());if(b.controller){f.$scope=a;var k=h(b.controller,f);b.controllerAs&&(a[b.controllerAs]=k);c.data("$ngControllerController",k);c.children().data("$ngControllerController",k)}a[b.resolveAs||"$resolve"]=f;y(a)}}}r=d.module("ngRoute",["ng"]).provider("$route",function(){function s(a,
c){return d.extend(Object.create(a),c)}function h(a,d){var b=d.caseInsensitiveMatch,f={originalPath:a,regexp:a},g=f.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;g.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");f.regexp=new RegExp("^"+a+"$",b?"i":"");return f}var g={};this.when=function(a,c){var b=d.copy(c);d.isUndefined(b.reloadOnSearch)&&
(b.reloadOnSearch=!0);d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);g[a]=d.extend(b,a&&h(a,b));if(a){var f="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";g[f]=d.extend({redirectTo:a},h(f,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,c,b,f,h,k,r){function l(b){var e=
t.current;(w=(p=n())&&e&&p.$$route===e.$$route&&d.equals(p.pathParams,e.pathParams)&&!p.reloadOnSearch&&!x)||!e&&!p||a.$broadcast("$routeChangeStart",p,e).defaultPrevented&&b&&b.preventDefault()}function m(){var v=t.current,e=p;if(w)v.params=e.params,d.copy(v.params,b),a.$broadcast("$routeUpdate",v);else if(e||v)x=!1,(t.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?c.path(u(e.redirectTo,e.params)).search(e.params).replace():c.url(e.redirectTo(e.pathParams,c.path(),c.search())).replace()),f.when(e).then(function(){if(e){var a=
d.extend({},e.resolve),b,c;d.forEach(a,function(b,e){a[e]=d.isString(b)?h.get(b):h.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(c=e.templateUrl)&&(d.isFunction(c)&&(c=c(e.params)),d.isDefined(c)&&(e.loadedTemplateUrl=r.valueOf(c),b=k(c)));d.isDefined(b)&&(a.$template=b);return f.all(a)}}).then(function(c){e==t.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,v))},function(b){e==t.current&&a.$broadcast("$routeChangeError",
e,v,b)})}function n(){var a,b;d.forEach(g,function(f,g){var q;if(q=!b){var h=c.path();q=f.keys;var l={};if(f.regexp)if(h=f.regexp.exec(h)){for(var k=1,n=h.length;k<n;++k){var m=q[k-1],p=h[k];m&&p&&(l[m.name]=p)}q=l}else q=null;else q=null;q=a=q}q&&(b=s(f,{params:d.extend({},c.search(),a),pathParams:a}),b.$$route=f)});return b||g[null]&&s(g[null],{params:{},pathParams:{}})}function u(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
g=f[1];c.push(b[g]);c.push(f[2]||"");delete b[g]}});return c.join("")}var x=!1,p,w,t={routes:g,reload:function(){x=!0;a.$evalAsync(function(){l();m()})},updateParams:function(a){if(this.current&&this.current.$$route)a=d.extend({},this.current.params,a),c.path(u(this.current.$$route.originalPath,a)),c.search(a);else throw B("norout");}};a.$on("$locationChangeStart",l);a.$on("$locationChangeSuccess",m);return t}]});var B=d.$$minErr("ngRoute");r.provider("$routeParams",function(){this.$get=function(){return{}}});
r.directive("ngView",w);r.directive("ngView",A);w.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map
;(function(h,g){function K(sb,K){function ha(b){return c.preferFlash&&H&&!c.ignoreFlash&&c.flash[b]!==g&&c.flash[b]}function r(b){return function(d){var e=this._s;e&&e._a?d=b.call(this,d):(e&&e.id?c._wD(e.id+": Ignoring "+d.type):c._wD("HTML5::Ignoring "+d.type),d=null);return d}}this.setupOptions={url:sb||null,flashVersion:8,debugMode:!0,debugFlash:!1,useConsole:!0,consoleOnly:!0,waitForWindowLoad:!1,bgColor:"#ffffff",useHighPerformance:!1,flashPollingInterval:null,html5PollingInterval:null,flashLoadTimeout:1E3,
wmode:null,allowScriptAccess:"always",useFlashBlock:!1,useHTML5Audio:!0,forceUseGlobalHTML5Audio:!1,ignoreMobileRestrictions:!1,html5Test:/^(probably|maybe)$/i,preferFlash:!1,noSWFCache:!1,idPrefix:"sound"};this.defaultOptions={autoLoad:!1,autoPlay:!1,from:null,loops:1,onid3:null,onload:null,whileloading:null,onplay:null,onpause:null,onresume:null,whileplaying:null,onposition:null,onstop:null,onfailure:null,onfinish:null,multiShot:!0,multiShotEvents:!1,position:null,pan:0,stream:!0,to:null,type:null,
usePolicyFile:!1,volume:100};this.flash9Options={isMovieStar:null,usePeakData:!1,useWaveformData:!1,useEQData:!1,onbufferchange:null,ondataerror:null};this.movieStarOptions={bufferTime:3,serverURL:null,onconnect:null,duration:null};this.audioFormats={mp3:{type:['audio/mpeg; codecs="mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],required:!0},mp4:{related:["aac","m4a","m4b"],type:['audio/mp4; codecs="mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],required:!1},
ogg:{type:["audio/ogg; codecs=vorbis"],required:!1},opus:{type:["audio/ogg; codecs=opus","audio/opus"],required:!1},wav:{type:['audio/wav; codecs="1"',"audio/wav","audio/wave","audio/x-wav"],required:!1}};this.movieID="sm2-container";this.id=K||"sm2movie";this.debugID="soundmanager-debug";this.debugURLParam=/([#?&])debug=1/i;this.versionNumber="V2.97a.20150601";this.altURL=this.movieURL=this.version=null;this.enabled=this.swfLoaded=!1;this.oMC=null;this.sounds={};this.soundIDs=[];this.didFlashBlock=
this.muted=!1;this.filePattern=null;this.filePatterns={flash8:/\.mp3(\?.*)?$/i,flash9:/\.mp3(\?.*)?$/i};this.features={buffering:!1,peakData:!1,waveformData:!1,eqData:!1,movieStar:!1};this.sandbox={type:null,types:{remote:"remote (domain-based) rules",localWithFile:"local with file access (no internet access)",localWithNetwork:"local with network (internet access only, no local access)",localTrusted:"local, trusted (local+internet access)"},description:null,noRemote:null,noLocal:null};this.html5=
{usingFlash:null};this.flash={};this.ignoreFlash=this.html5Only=!1;var W,c=this,Ya=null,l=null,F,v=navigator.userAgent,ia=h.location.href.toString(),m=document,ya,Za,za,n,I=[],Aa=!0,D,X=!1,Y=!1,q=!1,y=!1,ja=!1,p,tb=0,Z,A,Ba,R,Ca,P,S,T,$a,Da,Ea,ka,z,la,Q,Fa,aa,ma,na,U,ab,Ga,bb=["log","info","warn","error"],cb,Ha,db,ba=null,Ia=null,t,Ja,V,eb,oa,pa,L,w,ca=!1,Ka=!1,fb,gb,hb,qa=0,da=null,ra,M=[],ea,u=null,ib,sa,fa,N,ta,La,jb,x,kb=Array.prototype.slice,C=!1,Ma,H,Na,lb,J,mb,Oa,ua,nb=0,Pa,Qa=v.match(/(ipad|iphone|ipod)/i),
Ra=v.match(/android/i),O=v.match(/msie/i),ub=v.match(/webkit/i),va=v.match(/safari/i)&&!v.match(/chrome/i),Sa=v.match(/opera/i),wa=v.match(/(mobile|pre\/|xoom)/i)||Qa||Ra,Ta=!ia.match(/usehtml5audio/i)&&!ia.match(/sm2\-ignorebadua/i)&&va&&!v.match(/silk/i)&&v.match(/OS X 10_6_([3-7])/i),Ua=h.console!==g&&console.log!==g,Va=m.hasFocus!==g?m.hasFocus():null,xa=va&&(m.hasFocus===g||!m.hasFocus()),ob=!xa,pb=/(mp3|mp4|mpa|m4a|m4b)/i,ga=m.location?m.location.protocol.match(/http/i):null,vb=ga?"":"http://",
qb=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,rb="mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),wb=new RegExp("\\.("+rb.join("|")+")(\\?.*)?$","i");this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;this.useAltURL=!ga;var Wa;try{Wa=Audio!==g&&(Sa&&opera!==g&&10>opera.version()?new Audio(null):new Audio).canPlayType!==g}catch(xb){Wa=!1}this.hasHTML5=Wa;this.setup=function(b){var d=!c.url;b!==g&&q&&u&&c.ok()&&(b.flashVersion!==g||
b.url!==g||b.html5Test!==g)&&L(t("setupLate"));Ba(b);if(!C)if(wa){if(!c.setupOptions.ignoreMobileRestrictions||c.setupOptions.forceUseGlobalHTML5Audio)M.push(z.globalHTML5),C=!0}else c.setupOptions.forceUseGlobalHTML5Audio&&(M.push(z.globalHTML5),C=!0);if(!Pa&&wa)if(c.setupOptions.ignoreMobileRestrictions)M.push(z.ignoreMobile);else if(c.setupOptions.useHTML5Audio&&!c.setupOptions.preferFlash||c._wD(z.mobileUA),c.setupOptions.useHTML5Audio=!0,c.setupOptions.preferFlash=!1,Qa)c.ignoreFlash=!0;else if(Ra&&
!v.match(/android\s2\.3/i)||!Ra)c._wD(z.globalHTML5),C=!0;b&&(d&&aa&&b.url!==g&&c.beginDelayedInit(),aa||b.url===g||"complete"!==m.readyState||setTimeout(Q,1));Pa=!0;return c};this.supported=this.ok=function(){return u?q&&!y:c.useHTML5Audio&&c.hasHTML5};this.getMovie=function(c){return F(c)||m[c]||h[c]};this.createSound=function(b,d){function e(){f=oa(f);c.sounds[f.id]=new W(f);c.soundIDs.push(f.id);return c.sounds[f.id]}var a,f;a=null;a="soundManager.createSound(): "+t(q?"notOK":"notReady");if(!q||
!c.ok())return L(a),!1;d!==g&&(b={id:b,url:d});f=A(b);f.url=ra(f.url);f.id===g&&(f.id=c.setupOptions.idPrefix+nb++);f.id.toString().charAt(0).match(/^[0-9]$/)&&c._wD("soundManager.createSound(): "+t("badID",f.id),2);c._wD("soundManager.createSound(): "+f.id+(f.url?" ("+f.url+")":""),1);if(w(f.id,!0))return c._wD("soundManager.createSound(): "+f.id+" exists",1),c.sounds[f.id];if(sa(f))a=e(),c.html5Only||c._wD(f.id+": Using HTML5"),a._setup_html5(f);else{if(c.html5Only)return c._wD(f.id+": No HTML5 support for this sound, and no Flash. Exiting."),
e();if(c.html5.usingFlash&&f.url&&f.url.match(/data\:/i))return c._wD(f.id+": data: URIs not supported via Flash. Exiting."),e();8<n&&(null===f.isMovieStar&&(f.isMovieStar=!!(f.serverURL||f.type&&f.type.match(qb)||f.url&&f.url.match(wb))),f.isMovieStar&&(c._wD("soundManager.createSound(): using MovieStar handling"),1<f.loops&&p("noNSLoop")));f=pa(f,"soundManager.createSound(): ");a=e();8===n?l._createSound(f.id,f.loops||1,f.usePolicyFile):(l._createSound(f.id,f.url,f.usePeakData,f.useWaveformData,
f.useEQData,f.isMovieStar,f.isMovieStar?f.bufferTime:!1,f.loops||1,f.serverURL,f.duration||null,f.autoPlay,!0,f.autoLoad,f.usePolicyFile),f.serverURL||(a.connected=!0,f.onconnect&&f.onconnect.apply(a)));f.serverURL||!f.autoLoad&&!f.autoPlay||a.load(f)}!f.serverURL&&f.autoPlay&&a.play();return a};this.destroySound=function(b,d){if(!w(b))return!1;var e=c.sounds[b],a;e.stop();e._iO={};e.unload();for(a=0;a<c.soundIDs.length;a++)if(c.soundIDs[a]===b){c.soundIDs.splice(a,1);break}d||e.destruct(!0);delete c.sounds[b];
return!0};this.load=function(b,d){return w(b)?c.sounds[b].load(d):!1};this.unload=function(b){return w(b)?c.sounds[b].unload():!1};this.onposition=this.onPosition=function(b,d,e,a){return w(b)?c.sounds[b].onposition(d,e,a):!1};this.clearOnPosition=function(b,d,e){return w(b)?c.sounds[b].clearOnPosition(d,e):!1};this.start=this.play=function(b,d){var e=null,a=d&&!(d instanceof Object);if(!q||!c.ok())return L("soundManager.play(): "+t(q?"notOK":"notReady")),!1;if(w(b,a))a&&(d={url:d});else{if(!a)return!1;
a&&(d={url:d});d&&d.url&&(c._wD('soundManager.play(): Attempting to create "'+b+'"',1),d.id=b,e=c.createSound(d).play())}null===e&&(e=c.sounds[b].play(d));return e};this.setPosition=function(b,d){return w(b)?c.sounds[b].setPosition(d):!1};this.stop=function(b){if(!w(b))return!1;c._wD("soundManager.stop("+b+")",1);return c.sounds[b].stop()};this.stopAll=function(){var b;c._wD("soundManager.stopAll()",1);for(b in c.sounds)c.sounds.hasOwnProperty(b)&&c.sounds[b].stop()};this.pause=function(b){return w(b)?
c.sounds[b].pause():!1};this.pauseAll=function(){var b;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].pause()};this.resume=function(b){return w(b)?c.sounds[b].resume():!1};this.resumeAll=function(){var b;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].resume()};this.togglePause=function(b){return w(b)?c.sounds[b].togglePause():!1};this.setPan=function(b,d){return w(b)?c.sounds[b].setPan(d):!1};this.setVolume=function(b,d){var e,a;if(b===g||isNaN(b)||d!==g)return w(b)?c.sounds[b].setVolume(d):
!1;e=0;for(a=c.soundIDs.length;e<a;e++)c.sounds[c.soundIDs[e]].setVolume(b)};this.mute=function(b){var d=0;b instanceof String&&(b=null);if(b){if(!w(b))return!1;c._wD('soundManager.mute(): Muting "'+b+'"');return c.sounds[b].mute()}c._wD("soundManager.mute(): Muting all sounds");for(d=c.soundIDs.length-1;0<=d;d--)c.sounds[c.soundIDs[d]].mute();return c.muted=!0};this.muteAll=function(){c.mute()};this.unmute=function(b){b instanceof String&&(b=null);if(b){if(!w(b))return!1;c._wD('soundManager.unmute(): Unmuting "'+
b+'"');return c.sounds[b].unmute()}c._wD("soundManager.unmute(): Unmuting all sounds");for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].unmute();c.muted=!1;return!0};this.unmuteAll=function(){c.unmute()};this.toggleMute=function(b){return w(b)?c.sounds[b].toggleMute():!1};this.getMemoryUse=function(){var c=0;l&&8!==n&&(c=parseInt(l._getMemoryUse(),10));return c};this.disable=function(b){var d;b===g&&(b=!1);if(y)return!1;y=!0;p("shutdown",1);for(d=c.soundIDs.length-1;0<=d;d--)cb(c.sounds[c.soundIDs[d]]);
Z(b);x.remove(h,"load",S);return!0};this.canPlayMIME=function(b){var d;c.hasHTML5&&(d=fa({type:b}));!d&&u&&(d=b&&c.ok()?!!(8<n&&b.match(qb)||b.match(c.mimePattern)):null);return d};this.canPlayURL=function(b){var d;c.hasHTML5&&(d=fa({url:b}));!d&&u&&(d=b&&c.ok()?!!b.match(c.filePattern):null);return d};this.canPlayLink=function(b){return b.type!==g&&b.type&&c.canPlayMIME(b.type)?!0:c.canPlayURL(b.href)};this.getSoundById=function(b,d){if(!b)return null;var e=c.sounds[b];e||d||c._wD('soundManager.getSoundById(): Sound "'+
b+'" not found.',2);return e};this.onready=function(b,d){if("function"===typeof b)q&&c._wD(t("queue","onready")),d||(d=h),Ca("onready",b,d),P();else throw t("needFunction","onready");return!0};this.ontimeout=function(b,d){if("function"===typeof b)q&&c._wD(t("queue","ontimeout")),d||(d=h),Ca("ontimeout",b,d),P({type:"ontimeout"});else throw t("needFunction","ontimeout");return!0};this._writeDebug=function(b,d){var e,a;if(!c.setupOptions.debugMode)return!1;if(Ua&&c.useConsole){if(d&&"object"===typeof d)console.log(b,
d);else if(bb[d]!==g)console[bb[d]](b);else console.log(b);if(c.consoleOnly)return!0}e=F("soundmanager-debug");if(!e)return!1;a=m.createElement("div");0===++tb%2&&(a.className="sm2-alt");d=d===g?0:parseInt(d,10);a.appendChild(m.createTextNode(b));d&&(2<=d&&(a.style.fontWeight="bold"),3===d&&(a.style.color="#ff3333"));e.insertBefore(a,e.firstChild);return!0};-1!==ia.indexOf("sm2-debug=alert")&&(this._writeDebug=function(c){h.alert(c)});this._wD=this._writeDebug;this._debug=function(){var b,d;p("currentObj",
1);b=0;for(d=c.soundIDs.length;b<d;b++)c.sounds[c.soundIDs[b]]._debug()};this.reboot=function(b,d){c.soundIDs.length&&c._wD("Destroying "+c.soundIDs.length+" SMSound object"+(1!==c.soundIDs.length?"s":"")+"...");var e,a,f;for(e=c.soundIDs.length-1;0<=e;e--)c.sounds[c.soundIDs[e]].destruct();if(l)try{O&&(Ia=l.innerHTML),ba=l.parentNode.removeChild(l)}catch(g){p("badRemove",2)}Ia=ba=u=l=null;c.enabled=aa=q=ca=Ka=X=Y=y=C=c.swfLoaded=!1;c.soundIDs=[];c.sounds={};nb=0;Pa=!1;if(b)I=[];else for(e in I)if(I.hasOwnProperty(e))for(a=
0,f=I[e].length;a<f;a++)I[e][a].fired=!1;d||c._wD("soundManager: Rebooting...");c.html5={usingFlash:null};c.flash={};c.html5Only=!1;c.ignoreFlash=!1;h.setTimeout(function(){d||c.beginDelayedInit()},20);return c};this.reset=function(){p("reset");return c.reboot(!0,!0)};this.getMoviePercent=function(){return l&&"PercentLoaded"in l?l.PercentLoaded():null};this.beginDelayedInit=function(){ja=!0;Q();setTimeout(function(){if(Ka)return!1;na();la();return Ka=!0},20);T()};this.destruct=function(){c._wD("soundManager.destruct()");
c.disable(!0)};W=function(b){var d,e,a=this,f,h,k,G,m,q,r=!1,E=[],v=0,Xa,y,u=null,z;e=d=null;this.sID=this.id=b.id;this.url=b.url;this._iO=this.instanceOptions=this.options=A(b);this.pan=this.options.pan;this.volume=this.options.volume;this.isHTML5=!1;this._a=null;z=this.url?!1:!0;this.id3={};this._debug=function(){c._wD(a.id+": Merged options:",a.options)};this.load=function(b){var d=null,e;b!==g?a._iO=A(b,a.options):(b=a.options,a._iO=b,u&&u!==a.url&&(p("manURL"),a._iO.url=a.url,a.url=null));a._iO.url||
(a._iO.url=a.url);a._iO.url=ra(a._iO.url);e=a.instanceOptions=a._iO;c._wD(a.id+": load ("+e.url+")");if(!e.url&&!a.url)return c._wD(a.id+": load(): url is unassigned. Exiting.",2),a;a.isHTML5||8!==n||a.url||e.autoPlay||c._wD(a.id+": Flash 8 load() limitation: Wait for onload() before calling play().",1);if(e.url===a.url&&0!==a.readyState&&2!==a.readyState)return p("onURL",1),3===a.readyState&&e.onload&&ua(a,function(){e.onload.apply(a,[!!a.duration])}),a;a.loaded=!1;a.readyState=1;a.playState=0;a.id3=
{};if(sa(e))d=a._setup_html5(e),d._called_load?c._wD(a.id+": Ignoring request to load again"):(a._html5_canplay=!1,a.url!==e.url&&(c._wD(p("manURL")+": "+e.url),a._a.src=e.url,a.setPosition(0)),a._a.autobuffer="auto",a._a.preload="auto",a._a._called_load=!0);else{if(c.html5Only)return c._wD(a.id+": No flash support. Exiting."),a;if(a._iO.url&&a._iO.url.match(/data\:/i))return c._wD(a.id+": data: URIs not supported via Flash. Exiting."),a;try{a.isHTML5=!1,a._iO=pa(oa(e)),a._iO.autoPlay&&(a._iO.position||
a._iO.from)&&(c._wD(a.id+": Disabling autoPlay because of non-zero offset case"),a._iO.autoPlay=!1),e=a._iO,8===n?l._load(a.id,e.url,e.stream,e.autoPlay,e.usePolicyFile):l._load(a.id,e.url,!!e.stream,!!e.autoPlay,e.loops||1,!!e.autoLoad,e.usePolicyFile)}catch(f){p("smError",2),D("onload",!1),U({type:"SMSOUND_LOAD_JS_EXCEPTION",fatal:!0})}}a.url=e.url;return a};this.unload=function(){0!==a.readyState&&(c._wD(a.id+": unload()"),a.isHTML5?(G(),a._a&&(a._a.pause(),u=ta(a._a))):8===n?l._unload(a.id,"about:blank"):
l._unload(a.id),f());return a};this.destruct=function(b){c._wD(a.id+": Destruct");a.isHTML5?(G(),a._a&&(a._a.pause(),ta(a._a),C||k(),a._a._s=null,a._a=null)):(a._iO.onfailure=null,l._destroySound(a.id));b||c.destroySound(a.id,!0)};this.start=this.play=function(b,d){var e,f,k,G,h,B=!0,B=null;e=a.id+": play(): ";d=d===g?!0:d;b||(b={});a.url&&(a._iO.url=a.url);a._iO=A(a._iO,a.options);a._iO=A(b,a._iO);a._iO.url=ra(a._iO.url);a.instanceOptions=a._iO;if(!a.isHTML5&&a._iO.serverURL&&!a.connected)return a.getAutoPlay()||
(c._wD(e+" Netstream not connected yet - setting autoPlay"),a.setAutoPlay(!0)),a;sa(a._iO)&&(a._setup_html5(a._iO),m());1!==a.playState||a.paused||((f=a._iO.multiShot)?c._wD(e+"Already playing (multi-shot)",1):(c._wD(e+"Already playing (one-shot)",1),a.isHTML5&&a.setPosition(a._iO.position),B=a));if(null!==B)return B;b.url&&b.url!==a.url&&(a.readyState||a.isHTML5||8!==n||!z?a.load(a._iO):z=!1);a.loaded?c._wD(e.substr(0,e.lastIndexOf(":"))):0===a.readyState?(c._wD(e+"Attempting to load"),a.isHTML5||
c.html5Only?a.isHTML5?a.load(a._iO):(c._wD(e+"Unsupported type. Exiting."),B=a):(a._iO.autoPlay=!0,a.load(a._iO)),a.instanceOptions=a._iO):2===a.readyState?(c._wD(e+"Could not load - exiting",2),B=a):c._wD(e+"Loading - attempting to play...");if(null!==B)return B;!a.isHTML5&&9===n&&0<a.position&&a.position===a.duration&&(c._wD(e+"Sound at end, resetting to position: 0"),b.position=0);if(a.paused&&0<=a.position&&(!a._iO.serverURL||0<a.position))c._wD(e+"Resuming from paused state",1),a.resume();else{a._iO=
A(b,a._iO);if((!a.isHTML5&&null!==a._iO.position&&0<a._iO.position||null!==a._iO.from&&0<a._iO.from||null!==a._iO.to)&&0===a.instanceCount&&0===a.playState&&!a._iO.serverURL){f=function(){a._iO=A(b,a._iO);a.play(a._iO)};a.isHTML5&&!a._html5_canplay?(c._wD(e+"Beginning load for non-zero offset case"),a.load({_oncanplay:f}),B=!1):a.isHTML5||a.loaded||a.readyState&&2===a.readyState||(c._wD(e+"Preloading for non-zero offset case"),a.load({onload:f}),B=!1);if(null!==B)return B;a._iO=y()}(!a.instanceCount||
a._iO.multiShotEvents||a.isHTML5&&a._iO.multiShot&&!C||!a.isHTML5&&8<n&&!a.getAutoPlay())&&a.instanceCount++;a._iO.onposition&&0===a.playState&&q(a);a.playState=1;a.paused=!1;a.position=a._iO.position===g||isNaN(a._iO.position)?0:a._iO.position;a.isHTML5||(a._iO=pa(oa(a._iO)));a._iO.onplay&&d&&(a._iO.onplay.apply(a),r=!0);a.setVolume(a._iO.volume,!0);a.setPan(a._iO.pan,!0);a.isHTML5?2>a.instanceCount?(m(),e=a._setup_html5(),a.setPosition(a._iO.position),e.play()):(c._wD(a.id+": Cloning Audio() for instance #"+
a.instanceCount+"..."),k=new Audio(a._iO.url),G=function(){x.remove(k,"ended",G);a._onfinish(a);ta(k);k=null},h=function(){x.remove(k,"canplay",h);try{k.currentTime=a._iO.position/1E3}catch(c){L(a.id+": multiShot play() failed to apply position of "+a._iO.position/1E3)}k.play()},x.add(k,"ended",G),a._iO.volume!==g&&(k.volume=Math.max(0,Math.min(1,a._iO.volume/100))),a.muted&&(k.muted=!0),a._iO.position?x.add(k,"canplay",h):k.play()):(B=l._start(a.id,a._iO.loops||1,9===n?a.position:a.position/1E3,
a._iO.multiShot||!1),9!==n||B||(c._wD(e+"No sound hardware, or 32-sound ceiling hit",2),a._iO.onplayerror&&a._iO.onplayerror.apply(a)))}return a};this.stop=function(b){var d=a._iO;1===a.playState&&(c._wD(a.id+": stop()"),a._onbufferchange(0),a._resetOnPosition(0),a.paused=!1,a.isHTML5||(a.playState=0),Xa(),d.to&&a.clearOnPosition(d.to),a.isHTML5?a._a&&(b=a.position,a.setPosition(0),a.position=b,a._a.pause(),a.playState=0,a._onTimer(),G()):(l._stop(a.id,b),d.serverURL&&a.unload()),a.instanceCount=
0,a._iO={},d.onstop&&d.onstop.apply(a));return a};this.setAutoPlay=function(b){c._wD(a.id+": Autoplay turned "+(b?"on":"off"));a._iO.autoPlay=b;a.isHTML5||(l._setAutoPlay(a.id,b),b&&!a.instanceCount&&1===a.readyState&&(a.instanceCount++,c._wD(a.id+": Incremented instance count to "+a.instanceCount)))};this.getAutoPlay=function(){return a._iO.autoPlay};this.setPosition=function(b){b===g&&(b=0);var d=a.isHTML5?Math.max(b,0):Math.min(a.duration||a._iO.duration,Math.max(b,0));a.position=d;b=a.position/
1E3;a._resetOnPosition(a.position);a._iO.position=d;if(!a.isHTML5)b=9===n?a.position:b,a.readyState&&2!==a.readyState&&l._setPosition(a.id,b,a.paused||!a.playState,a._iO.multiShot);else if(a._a){if(a._html5_canplay){if(a._a.currentTime!==b){c._wD(a.id+": setPosition("+b+")");try{a._a.currentTime=b,(0===a.playState||a.paused)&&a._a.pause()}catch(e){c._wD(a.id+": setPosition("+b+") failed: "+e.message,2)}}}else if(b)return c._wD(a.id+": setPosition("+b+"): Cannot seek yet, sound not ready",2),a;a.paused&&
a._onTimer(!0)}return a};this.pause=function(b){if(a.paused||0===a.playState&&1!==a.readyState)return a;c._wD(a.id+": pause()");a.paused=!0;a.isHTML5?(a._setup_html5().pause(),G()):(b||b===g)&&l._pause(a.id,a._iO.multiShot);a._iO.onpause&&a._iO.onpause.apply(a);return a};this.resume=function(){var b=a._iO;if(!a.paused)return a;c._wD(a.id+": resume()");a.paused=!1;a.playState=1;a.isHTML5?(a._setup_html5().play(),m()):(b.isMovieStar&&!b.serverURL&&a.setPosition(a.position),l._pause(a.id,b.multiShot));
!r&&b.onplay?(b.onplay.apply(a),r=!0):b.onresume&&b.onresume.apply(a);return a};this.togglePause=function(){c._wD(a.id+": togglePause()");if(0===a.playState)return a.play({position:9!==n||a.isHTML5?a.position/1E3:a.position}),a;a.paused?a.resume():a.pause();return a};this.setPan=function(c,b){c===g&&(c=0);b===g&&(b=!1);a.isHTML5||l._setPan(a.id,c);a._iO.pan=c;b||(a.pan=c,a.options.pan=c);return a};this.setVolume=function(b,d){b===g&&(b=100);d===g&&(d=!1);a.isHTML5?a._a&&(c.muted&&!a.muted&&(a.muted=
!0,a._a.muted=!0),a._a.volume=Math.max(0,Math.min(1,b/100))):l._setVolume(a.id,c.muted&&!a.muted||a.muted?0:b);a._iO.volume=b;d||(a.volume=b,a.options.volume=b);return a};this.mute=function(){a.muted=!0;a.isHTML5?a._a&&(a._a.muted=!0):l._setVolume(a.id,0);return a};this.unmute=function(){a.muted=!1;var b=a._iO.volume!==g;a.isHTML5?a._a&&(a._a.muted=!1):l._setVolume(a.id,b?a._iO.volume:a.options.volume);return a};this.toggleMute=function(){return a.muted?a.unmute():a.mute()};this.onposition=this.onPosition=
function(b,c,d){E.push({position:parseInt(b,10),method:c,scope:d!==g?d:a,fired:!1});return a};this.clearOnPosition=function(a,b){var c;a=parseInt(a,10);if(isNaN(a))return!1;for(c=0;c<E.length;c++)a!==E[c].position||b&&b!==E[c].method||(E[c].fired&&v--,E.splice(c,1))};this._processOnPosition=function(){var b,c;b=E.length;if(!b||!a.playState||v>=b)return!1;for(--b;0<=b;b--)c=E[b],!c.fired&&a.position>=c.position&&(c.fired=!0,v++,c.method.apply(c.scope,[c.position]));return!0};this._resetOnPosition=
function(a){var b,c;b=E.length;if(!b)return!1;for(--b;0<=b;b--)c=E[b],c.fired&&a<=c.position&&(c.fired=!1,v--);return!0};y=function(){var b=a._iO,d=b.from,e=b.to,f,g;g=function(){c._wD(a.id+': "To" time of '+e+" reached.");a.clearOnPosition(e,g);a.stop()};f=function(){c._wD(a.id+': Playing "from" '+d);if(null!==e&&!isNaN(e))a.onPosition(e,g)};null===d||isNaN(d)||(b.position=d,b.multiShot=!1,f());return b};q=function(){var b,c=a._iO.onposition;if(c)for(b in c)if(c.hasOwnProperty(b))a.onPosition(parseInt(b,
10),c[b])};Xa=function(){var b,c=a._iO.onposition;if(c)for(b in c)c.hasOwnProperty(b)&&a.clearOnPosition(parseInt(b,10))};m=function(){a.isHTML5&&fb(a)};G=function(){a.isHTML5&&gb(a)};f=function(b){b||(E=[],v=0);r=!1;a._hasTimer=null;a._a=null;a._html5_canplay=!1;a.bytesLoaded=null;a.bytesTotal=null;a.duration=a._iO&&a._iO.duration?a._iO.duration:null;a.durationEstimate=null;a.buffered=[];a.eqData=[];a.eqData.left=[];a.eqData.right=[];a.failures=0;a.isBuffering=!1;a.instanceOptions={};a.instanceCount=
0;a.loaded=!1;a.metadata={};a.readyState=0;a.muted=!1;a.paused=!1;a.peakData={left:0,right:0};a.waveformData={left:[],right:[]};a.playState=0;a.position=null;a.id3={}};f();this._onTimer=function(b){var c,f=!1,g={};if(a._hasTimer||b)return a._a&&(b||(0<a.playState||1===a.readyState)&&!a.paused)&&(c=a._get_html5_duration(),c!==d&&(d=c,a.duration=c,f=!0),a.durationEstimate=a.duration,c=1E3*a._a.currentTime||0,c!==e&&(e=c,f=!0),(f||b)&&a._whileplaying(c,g,g,g,g)),f};this._get_html5_duration=function(){var b=
a._iO;return(b=a._a&&a._a.duration?1E3*a._a.duration:b&&b.duration?b.duration:null)&&!isNaN(b)&&Infinity!==b?b:null};this._apply_loop=function(a,b){!a.loop&&1<b&&c._wD("Note: Native HTML5 looping is infinite.",1);a.loop=1<b?"loop":""};this._setup_html5=function(b){b=A(a._iO,b);var c=C?Ya:a._a,d=decodeURI(b.url),e;C?d===decodeURI(Ma)&&(e=!0):d===decodeURI(u)&&(e=!0);if(c){if(c._s)if(C)c._s&&c._s.playState&&!e&&c._s.stop();else if(!C&&d===decodeURI(u))return a._apply_loop(c,b.loops),c;e||(u&&f(!1),
c.src=b.url,Ma=u=a.url=b.url,c._called_load=!1)}else b.autoLoad||b.autoPlay?(a._a=new Audio(b.url),a._a.load()):a._a=Sa&&10>opera.version()?new Audio(null):new Audio,c=a._a,c._called_load=!1,C&&(Ya=c);a.isHTML5=!0;a._a=c;c._s=a;h();a._apply_loop(c,b.loops);b.autoLoad||b.autoPlay?a.load():(c.autobuffer=!1,c.preload="auto");return c};h=function(){if(a._a._added_events)return!1;var b;a._a._added_events=!0;for(b in J)J.hasOwnProperty(b)&&a._a&&a._a.addEventListener(b,J[b],!1);return!0};k=function(){var b;
c._wD(a.id+": Removing event listeners");a._a._added_events=!1;for(b in J)J.hasOwnProperty(b)&&a._a&&a._a.removeEventListener(b,J[b],!1)};this._onload=function(b){var d=!!b||!a.isHTML5&&8===n&&a.duration;b=a.id+": ";c._wD(b+(d?"onload()":"Failed to load / invalid sound?"+(a.duration?" -":" Zero-length duration reported.")+" ("+a.url+")"),d?1:2);d||a.isHTML5||(!0===c.sandbox.noRemote&&c._wD(b+t("noNet"),1),!0===c.sandbox.noLocal&&c._wD(b+t("noLocal"),1));a.loaded=d;a.readyState=d?3:2;a._onbufferchange(0);
a._iO.onload&&ua(a,function(){a._iO.onload.apply(a,[d])});return!0};this._onbufferchange=function(b){if(0===a.playState||b&&a.isBuffering||!b&&!a.isBuffering)return!1;a.isBuffering=1===b;a._iO.onbufferchange&&(c._wD(a.id+": Buffer state change: "+b),a._iO.onbufferchange.apply(a,[b]));return!0};this._onsuspend=function(){a._iO.onsuspend&&(c._wD(a.id+": Playback suspended"),a._iO.onsuspend.apply(a));return!0};this._onfailure=function(b,d,e){a.failures++;c._wD(a.id+": Failure ("+a.failures+"): "+b);
if(a._iO.onfailure&&1===a.failures)a._iO.onfailure(b,d,e);else c._wD(a.id+": Ignoring failure")};this._onwarning=function(b,c,d){if(a._iO.onwarning)a._iO.onwarning(b,c,d)};this._onfinish=function(){var b=a._iO.onfinish;a._onbufferchange(0);a._resetOnPosition(0);a.instanceCount&&(a.instanceCount--,a.instanceCount||(Xa(),a.playState=0,a.paused=!1,a.instanceCount=0,a.instanceOptions={},a._iO={},G(),a.isHTML5&&(a.position=0)),a.instanceCount&&!a._iO.multiShotEvents||!b||(c._wD(a.id+": onfinish()"),ua(a,
function(){b.apply(a)})))};this._whileloading=function(b,c,d,e){var f=a._iO;a.bytesLoaded=b;a.bytesTotal=c;a.duration=Math.floor(d);a.bufferLength=e;a.durationEstimate=a.isHTML5||f.isMovieStar?a.duration:f.duration?a.duration>f.duration?a.duration:f.duration:parseInt(a.bytesTotal/a.bytesLoaded*a.duration,10);a.isHTML5||(a.buffered=[{start:0,end:a.duration}]);(3!==a.readyState||a.isHTML5)&&f.whileloading&&f.whileloading.apply(a)};this._whileplaying=function(b,c,d,e,f){var k=a._iO;if(isNaN(b)||null===
b)return!1;a.position=Math.max(0,b);a._processOnPosition();!a.isHTML5&&8<n&&(k.usePeakData&&c!==g&&c&&(a.peakData={left:c.leftPeak,right:c.rightPeak}),k.useWaveformData&&d!==g&&d&&(a.waveformData={left:d.split(","),right:e.split(",")}),k.useEQData&&f!==g&&f&&f.leftEQ&&(b=f.leftEQ.split(","),a.eqData=b,a.eqData.left=b,f.rightEQ!==g&&f.rightEQ&&(a.eqData.right=f.rightEQ.split(","))));1===a.playState&&(a.isHTML5||8!==n||a.position||!a.isBuffering||a._onbufferchange(0),k.whileplaying&&k.whileplaying.apply(a));
return!0};this._oncaptiondata=function(b){c._wD(a.id+": Caption data received.");a.captiondata=b;a._iO.oncaptiondata&&a._iO.oncaptiondata.apply(a,[b])};this._onmetadata=function(b,d){c._wD(a.id+": Metadata received.");var e={},f,g;f=0;for(g=b.length;f<g;f++)e[b[f]]=d[f];a.metadata=e;a._iO.onmetadata&&a._iO.onmetadata.call(a,a.metadata)};this._onid3=function(b,d){c._wD(a.id+": ID3 data received.");var e=[],f,g;f=0;for(g=b.length;f<g;f++)e[b[f]]=d[f];a.id3=A(a.id3,e);a._iO.onid3&&a._iO.onid3.apply(a)};
this._onconnect=function(b){b=1===b;c._wD(a.id+": "+(b?"Connected.":"Failed to connect? - "+a.url),b?1:2);if(a.connected=b)a.failures=0,w(a.id)&&(a.getAutoPlay()?a.play(g,a.getAutoPlay()):a._iO.autoLoad&&a.load()),a._iO.onconnect&&a._iO.onconnect.apply(a,[b])};this._ondataerror=function(b){0<a.playState&&(c._wD(a.id+": Data error: "+b),a._iO.ondataerror&&a._iO.ondataerror.apply(a))};this._debug()};ma=function(){return m.body||m.getElementsByTagName("div")[0]};F=function(b){return m.getElementById(b)};
A=function(b,d){var e=b||{},a,f;a=d===g?c.defaultOptions:d;for(f in a)a.hasOwnProperty(f)&&e[f]===g&&(e[f]="object"!==typeof a[f]||null===a[f]?a[f]:A(e[f],a[f]));return e};ua=function(b,c){b.isHTML5||8!==n?c():h.setTimeout(c,0)};R={onready:1,ontimeout:1,defaultOptions:1,flash9Options:1,movieStarOptions:1};Ba=function(b,d){var e,a=!0,f=d!==g,h=c.setupOptions;if(b===g){a=[];for(e in h)h.hasOwnProperty(e)&&a.push(e);for(e in R)R.hasOwnProperty(e)&&("object"===typeof c[e]?a.push(e+": {...}"):c[e]instanceof
Function?a.push(e+": function() {...}"):a.push(e));c._wD(t("setup",a.join(", ")));return!1}for(e in b)if(b.hasOwnProperty(e))if("object"!==typeof b[e]||null===b[e]||b[e]instanceof Array||b[e]instanceof RegExp)f&&R[d]!==g?c[d][e]=b[e]:h[e]!==g?(c.setupOptions[e]=b[e],c[e]=b[e]):R[e]===g?(L(t(c[e]===g?"setupUndef":"setupError",e),2),a=!1):c[e]instanceof Function?c[e].apply(c,b[e]instanceof Array?b[e]:[b[e]]):c[e]=b[e];else if(R[e]===g)L(t(c[e]===g?"setupUndef":"setupError",e),2),a=!1;else return Ba(b[e],
e);return a};x=function(){function b(a){a=kb.call(a);var b=a.length;e?(a[1]="on"+a[1],3<b&&a.pop()):3===b&&a.push(!1);return a}function c(b,d){var g=b.shift(),h=[a[d]];if(e)g[h](b[0],b[1]);else g[h].apply(g,b)}var e=h.attachEvent,a={add:e?"attachEvent":"addEventListener",remove:e?"detachEvent":"removeEventListener"};return{add:function(){c(b(arguments),"add")},remove:function(){c(b(arguments),"remove")}}}();J={abort:r(function(){c._wD(this._s.id+": abort")}),canplay:r(function(){var b=this._s,d;if(b._html5_canplay)return!0;
b._html5_canplay=!0;c._wD(b.id+": canplay");b._onbufferchange(0);d=b._iO.position===g||isNaN(b._iO.position)?null:b._iO.position/1E3;if(this.currentTime!==d){c._wD(b.id+": canplay: Setting position to "+d);try{this.currentTime=d}catch(e){c._wD(b.id+": canplay: Setting position of "+d+" failed: "+e.message,2)}}b._iO._oncanplay&&b._iO._oncanplay()}),canplaythrough:r(function(){var b=this._s;b.loaded||(b._onbufferchange(0),b._whileloading(b.bytesLoaded,b.bytesTotal,b._get_html5_duration()),b._onload(!0))}),
durationchange:r(function(){var b=this._s,d;d=b._get_html5_duration();isNaN(d)||d===b.duration||(c._wD(this._s.id+": durationchange ("+d+")"+(b.duration?", previously "+b.duration:"")),b.durationEstimate=b.duration=d)}),ended:r(function(){var b=this._s;c._wD(b.id+": ended");b._onfinish()}),error:r(function(){c._wD(this._s.id+": HTML5 error, code "+this.error.code);this._s._onload(!1)}),loadeddata:r(function(){var b=this._s;c._wD(b.id+": loadeddata");b._loaded||va||(b.duration=b._get_html5_duration())}),
loadedmetadata:r(function(){c._wD(this._s.id+": loadedmetadata")}),loadstart:r(function(){c._wD(this._s.id+": loadstart");this._s._onbufferchange(1)}),play:r(function(){this._s._onbufferchange(0)}),playing:r(function(){c._wD(this._s.id+": playing "+String.fromCharCode(9835));this._s._onbufferchange(0)}),progress:r(function(b){var d=this._s,e,a,f;e=0;var g="progress"===b.type,k=b.target.buffered,h=b.loaded||0,m=b.total||1;d.buffered=[];if(k&&k.length){e=0;for(a=k.length;e<a;e++)d.buffered.push({start:1E3*
k.start(e),end:1E3*k.end(e)});e=1E3*(k.end(0)-k.start(0));h=Math.min(1,e/(1E3*b.target.duration));if(g&&1<k.length){f=[];a=k.length;for(e=0;e<a;e++)f.push(1E3*b.target.buffered.start(e)+"-"+1E3*b.target.buffered.end(e));c._wD(this._s.id+": progress, timeRanges: "+f.join(", "))}g&&!isNaN(h)&&c._wD(this._s.id+": progress, "+Math.floor(100*h)+"% loaded")}isNaN(h)||(d._whileloading(h,m,d._get_html5_duration()),h&&m&&h===m&&J.canplaythrough.call(this,b))}),ratechange:r(function(){c._wD(this._s.id+": ratechange")}),
suspend:r(function(b){var d=this._s;c._wD(this._s.id+": suspend");J.progress.call(this,b);d._onsuspend()}),stalled:r(function(){c._wD(this._s.id+": stalled")}),timeupdate:r(function(){this._s._onTimer()}),waiting:r(function(){var b=this._s;c._wD(this._s.id+": waiting");b._onbufferchange(1)})};sa=function(b){return b&&(b.type||b.url||b.serverURL)?b.serverURL||b.type&&ha(b.type)?!1:b.type?fa({type:b.type}):fa({url:b.url})||c.html5Only||b.url.match(/data\:/i):!1};ta=function(b){var d;b&&(d=va?"about:blank":
c.html5.canPlayType("audio/wav")?"data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==":"about:blank",b.src=d,b._called_unload!==g&&(b._called_load=!1));C&&(Ma=null);return d};fa=function(b){if(!c.useHTML5Audio||!c.hasHTML5)return!1;var d=b.url||null;b=b.type||null;var e=c.audioFormats,a;if(b&&c.html5[b]!==g)return c.html5[b]&&!ha(b);if(!N){N=[];for(a in e)e.hasOwnProperty(a)&&(N.push(a),e[a].related&&(N=N.concat(e[a].related)));N=new RegExp("\\.("+N.join("|")+
")(\\?.*)?$","i")}(a=d?d.toLowerCase().match(N):null)&&a.length?a=a[1]:b&&(d=b.indexOf(";"),a=(-1!==d?b.substr(0,d):b).substr(6));a&&c.html5[a]!==g?d=c.html5[a]&&!ha(a):(b="audio/"+a,d=c.html5.canPlayType({type:b}),d=(c.html5[a]=d)&&c.html5[b]&&!ha(b));return d};jb=function(){function b(a){var b,e=b=!1;if(!d||"function"!==typeof d.canPlayType)return b;if(a instanceof Array){k=0;for(b=a.length;k<b;k++)if(c.html5[a[k]]||d.canPlayType(a[k]).match(c.html5Test))e=!0,c.html5[a[k]]=!0,c.flash[a[k]]=!!a[k].match(pb);
b=e}else a=d&&"function"===typeof d.canPlayType?d.canPlayType(a):!1,b=!(!a||!a.match(c.html5Test));return b}if(!c.useHTML5Audio||!c.hasHTML5)return u=c.html5.usingFlash=!0,!1;var d=Audio!==g?Sa&&10>opera.version()?new Audio(null):new Audio:null,e,a,f={},h,k;h=c.audioFormats;for(e in h)if(h.hasOwnProperty(e)&&(a="audio/"+e,f[e]=b(h[e].type),f[a]=f[e],e.match(pb)?(c.flash[e]=!0,c.flash[a]=!0):(c.flash[e]=!1,c.flash[a]=!1),h[e]&&h[e].related))for(k=h[e].related.length-1;0<=k;k--)f["audio/"+h[e].related[k]]=
f[e],c.html5[h[e].related[k]]=f[e],c.flash[h[e].related[k]]=f[e];f.canPlayType=d?b:null;c.html5=A(c.html5,f);c.html5.usingFlash=ib();u=c.html5.usingFlash;return!0};z={notReady:"Unavailable - wait until onready() has fired.",notOK:"Audio support is not available.",domError:"soundManagerexception caught while appending SWF to DOM.",spcWmode:"Removing wmode, preventing known SWF loading issue(s)",swf404:"soundManager: Verify that %s is a valid path.",tryDebug:"Try soundManager.debugFlash = true for more security details (output goes to SWF.)",
checkSWF:"See SWF output for more debug info.",localFail:"soundManager: Non-HTTP page ("+m.location.protocol+" URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",waitFocus:"soundManager: Special case: Waiting for SWF to load with window focus...",waitForever:"soundManager: Waiting indefinitely for Flash (will recover if unblocked)...",
waitSWF:"soundManager: Waiting for 100% SWF load...",needFunction:"soundManager: Function object expected for %s",badID:'Sound ID "%s" should be a string, starting with a non-numeric character',currentObj:"soundManager: _debug(): Current sound objects",waitOnload:"soundManager: Waiting for window.onload()",docLoaded:"soundManager: Document already loaded",onload:"soundManager: initComplete(): calling soundManager.onload()",onloadOK:"soundManager.onload() complete",didInit:"soundManager: init(): Already called?",
secNote:"Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",badRemove:"soundManager: Failed to remove Flash node.",shutdown:"soundManager.disable(): Shutting down",queue:"soundManager: Queueing %s handler",smError:"SMSound.load(): Exception: JS-Flash communication failed, or JS error.",fbTimeout:"No flash response, applying .swf_timedout CSS...",
fbLoaded:"Flash loaded",fbHandler:"soundManager: flashBlockHandler()",manURL:"SMSound.load(): Using manually-assigned URL",onURL:"soundManager.load(): current URL already assigned.",badFV:'soundManager.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',as2loop:"Note: Setting stream:false so looping can work (flash 8 limitation)",noNSLoop:"Note: Looping not implemented for MovieStar formats",needfl9:"Note: Switching to flash 9, required for MP4 formats.",mfTimeout:"Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",
needFlash:"soundManager: Fatal error: Flash is needed to play some required formats, but is not available.",gotFocus:"soundManager: Got window focus.",policy:"Enabling usePolicyFile for data access",setup:"soundManager.setup(): allowed parameters: %s",setupError:'soundManager.setup(): "%s" cannot be assigned with this method.',setupUndef:'soundManager.setup(): Could not find option "%s"',setupLate:"soundManager.setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",
noURL:"soundManager: Flash URL required. Call soundManager.setup({url:...}) to get started.",sm2Loaded:"SoundManager 2: Ready. "+String.fromCharCode(10003),reset:"soundManager.reset(): Removing event callbacks",mobileUA:"Mobile UA detected, preferring HTML5 by default.",globalHTML5:"Using singleton HTML5 Audio() pattern for this device.",ignoreMobile:"Ignoring mobile restrictions for this device."};t=function(){var b,c,e,a;b=kb.call(arguments);c=b.shift();if((a=z&&z[c]?z[c]:"")&&b&&b.length)for(c=
0,e=b.length;c<e;c++)a=a.replace("%s",b[c]);return a};oa=function(b){8===n&&1<b.loops&&b.stream&&(p("as2loop"),b.stream=!1);return b};pa=function(b,d){b&&!b.usePolicyFile&&(b.onid3||b.usePeakData||b.useWaveformData||b.useEQData)&&(c._wD((d||"")+t("policy")),b.usePolicyFile=!0);return b};L=function(b){Ua&&console.warn!==g?console.warn(b):c._wD(b)};ya=function(){return!1};cb=function(b){for(var c in b)b.hasOwnProperty(c)&&"function"===typeof b[c]&&(b[c]=ya)};Ha=function(b){b===g&&(b=!1);(y||b)&&c.disable(b)};
db=function(b){var d=null;if(b)if(b.match(/\.swf(\?.*)?$/i)){if(d=b.substr(b.toLowerCase().lastIndexOf(".swf?")+4))return b}else b.lastIndexOf("/")!==b.length-1&&(b+="/");b=(b&&-1!==b.lastIndexOf("/")?b.substr(0,b.lastIndexOf("/")+1):"./")+c.movieURL;c.noSWFCache&&(b+="?ts="+(new Date).getTime());return b};Ea=function(){n=parseInt(c.flashVersion,10);8!==n&&9!==n&&(c._wD(t("badFV",n,8)),c.flashVersion=n=8);var b=c.debugMode||c.debugFlash?"_debug.swf":".swf";c.useHTML5Audio&&!c.html5Only&&c.audioFormats.mp4.required&&
9>n&&(c._wD(t("needfl9")),c.flashVersion=n=9);c.version=c.versionNumber+(c.html5Only?" (HTML5-only mode)":9===n?" (AS3/Flash 9)":" (AS2/Flash 8)");8<n?(c.defaultOptions=A(c.defaultOptions,c.flash9Options),c.features.buffering=!0,c.defaultOptions=A(c.defaultOptions,c.movieStarOptions),c.filePatterns.flash9=new RegExp("\\.(mp3|"+rb.join("|")+")(\\?.*)?$","i"),c.features.movieStar=!0):c.features.movieStar=!1;c.filePattern=c.filePatterns[8!==n?"flash9":"flash8"];c.movieURL=(8===n?"soundmanager2.swf":
"soundmanager2_flash9.swf").replace(".swf",b);c.features.peakData=c.features.waveformData=c.features.eqData=8<n};ab=function(b,c){if(!l)return!1;l._setPolling(b,c)};Ga=function(){c.debugURLParam.test(ia)&&(c.setupOptions.debugMode=c.debugMode=!0);if(F(c.debugID))return!1;var b,d,e,a;if(!(!c.debugMode||F(c.debugID)||Ua&&c.useConsole&&c.consoleOnly)){b=m.createElement("div");b.id=c.debugID+"-toggle";d={position:"fixed",bottom:"0px",right:"0px",width:"1.2em",height:"1.2em",lineHeight:"1.2em",margin:"2px",
textAlign:"center",border:"1px solid #999",cursor:"pointer",background:"#fff",color:"#333",zIndex:10001};b.appendChild(m.createTextNode("-"));b.onclick=eb;b.title="Toggle SM2 debug console";v.match(/msie 6/i)&&(b.style.position="absolute",b.style.cursor="hand");for(a in d)d.hasOwnProperty(a)&&(b.style[a]=d[a]);d=m.createElement("div");d.id=c.debugID;d.style.display=c.debugMode?"block":"none";if(c.debugMode&&!F(b.id)){try{e=ma(),e.appendChild(b)}catch(f){throw Error(t("domError")+" \n"+f.toString());
}e.appendChild(d)}}};w=this.getSoundById;p=function(b,d){return b?c._wD(t(b),d):""};eb=function(){var b=F(c.debugID),d=F(c.debugID+"-toggle");if(!b)return!1;Aa?(d.innerHTML="+",b.style.display="none"):(d.innerHTML="-",b.style.display="block");Aa=!Aa};D=function(b,c,e){if(h.sm2Debugger!==g)try{sm2Debugger.handleEvent(b,c,e)}catch(a){return!1}return!0};V=function(){var b=[];c.debugMode&&b.push("sm2_debug");c.debugFlash&&b.push("flash_debug");c.useHighPerformance&&b.push("high_performance");return b.join(" ")};
Ja=function(){var b=t("fbHandler"),d=c.getMoviePercent(),e={type:"FLASHBLOCK"};if(c.html5Only)return!1;c.ok()?(c.didFlashBlock&&c._wD(b+": Unblocked"),c.oMC&&(c.oMC.className=[V(),"movieContainer","swf_loaded"+(c.didFlashBlock?" swf_unblocked":"")].join(" "))):(u&&(c.oMC.className=V()+" movieContainer "+(null===d?"swf_timedout":"swf_error"),c._wD(b+": "+t("fbTimeout")+(d?" ("+t("fbLoaded")+")":""))),c.didFlashBlock=!0,P({type:"ontimeout",ignoreInit:!0,error:e}),U(e))};Ca=function(b,c,e){I[b]===g&&
(I[b]=[]);I[b].push({method:c,scope:e||null,fired:!1})};P=function(b){b||(b={type:c.ok()?"onready":"ontimeout"});if(!q&&b&&!b.ignoreInit||"ontimeout"===b.type&&(c.ok()||y&&!b.ignoreInit))return!1;var d={success:b&&b.ignoreInit?c.ok():!y},e=b&&b.type?I[b.type]||[]:[],a=[],f,d=[d],g=u&&!c.ok();b.error&&(d[0].error=b.error);b=0;for(f=e.length;b<f;b++)!0!==e[b].fired&&a.push(e[b]);if(a.length)for(b=0,f=a.length;b<f;b++)a[b].scope?a[b].method.apply(a[b].scope,d):a[b].method.apply(this,d),g||(a[b].fired=
!0);return!0};S=function(){h.setTimeout(function(){c.useFlashBlock&&Ja();P();"function"===typeof c.onload&&(p("onload",1),c.onload.apply(h),p("onloadOK",1));c.waitForWindowLoad&&x.add(h,"load",S)},1)};Na=function(){if(H!==g)return H;var b=!1,c=navigator,e=c.plugins,a,f=h.ActiveXObject;if(e&&e.length)(c=c.mimeTypes)&&c["application/x-shockwave-flash"]&&c["application/x-shockwave-flash"].enabledPlugin&&c["application/x-shockwave-flash"].enabledPlugin.description&&(b=!0);else if(f!==g&&!v.match(/MSAppHost/i)){try{a=
new f("ShockwaveFlash.ShockwaveFlash")}catch(m){a=null}b=!!a}return H=b};ib=function(){var b,d,e=c.audioFormats;Qa&&v.match(/os (1|2|3_0|3_1)\s/i)?(c.hasHTML5=!1,c.html5Only=!0,c.oMC&&(c.oMC.style.display="none")):c.useHTML5Audio&&(c.html5&&c.html5.canPlayType||(c._wD("SoundManager: No HTML5 Audio() support detected."),c.hasHTML5=!1),Ta&&c._wD("soundManager: Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - "+(H?"will use flash fallback for MP3/MP4, if available":
" would use flash fallback for MP3/MP4, but none detected."),1));if(c.useHTML5Audio&&c.hasHTML5)for(d in ea=!0,e)e.hasOwnProperty(d)&&e[d].required&&(c.html5.canPlayType(e[d].type)?c.preferFlash&&(c.flash[d]||c.flash[e[d].type])&&(b=!0):(ea=!1,b=!0));c.ignoreFlash&&(b=!1,ea=!0);c.html5Only=c.hasHTML5&&c.useHTML5Audio&&!b;return!c.html5Only};ra=function(b){var d,e,a=0;if(b instanceof Array){d=0;for(e=b.length;d<e;d++)if(b[d]instanceof Object){if(c.canPlayMIME(b[d].type)){a=d;break}}else if(c.canPlayURL(b[d])){a=
d;break}b[a].url&&(b[a]=b[a].url);b=b[a]}return b};fb=function(b){b._hasTimer||(b._hasTimer=!0,!wa&&c.html5PollingInterval&&(null===da&&0===qa&&(da=setInterval(hb,c.html5PollingInterval)),qa++))};gb=function(b){b._hasTimer&&(b._hasTimer=!1,!wa&&c.html5PollingInterval&&qa--)};hb=function(){var b;if(null!==da&&!qa)return clearInterval(da),da=null,!1;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].isHTML5&&c.sounds[c.soundIDs[b]]._hasTimer&&c.sounds[c.soundIDs[b]]._onTimer()};U=function(b){b=
b!==g?b:{};"function"===typeof c.onerror&&c.onerror.apply(h,[{type:b.type!==g?b.type:null}]);b.fatal!==g&&b.fatal&&c.disable()};lb=function(){if(!Ta||!Na())return!1;var b=c.audioFormats,d,e;for(e in b)if(b.hasOwnProperty(e)&&("mp3"===e||"mp4"===e)&&(c._wD("soundManager: Using flash fallback for "+e+" format"),c.html5[e]=!1,b[e]&&b[e].related))for(d=b[e].related.length-1;0<=d;d--)c.html5[b[e].related[d]]=!1};this._setSandboxType=function(b){var d=c.sandbox;d.type=b;d.description=d.types[d.types[b]!==
g?b:"unknown"];"localWithFile"===d.type?(d.noRemote=!0,d.noLocal=!1,p("secNote",2)):"localWithNetwork"===d.type?(d.noRemote=!1,d.noLocal=!0):"localTrusted"===d.type&&(d.noRemote=!1,d.noLocal=!1)};this._externalInterfaceOK=function(b){if(c.swfLoaded)return!1;var d;D("swf",!0);D("flashtojs",!0);c.swfLoaded=!0;xa=!1;Ta&&lb();if(!b||b.replace(/\+dev/i,"")!==c.versionNumber.replace(/\+dev/i,""))return d='soundManager: Fatal: JavaScript file build "'+c.versionNumber+'" does not match Flash SWF build "'+
b+'" at '+c.url+". Ensure both are up-to-date.",setTimeout(function(){throw Error(d);},0),!1;setTimeout(za,O?100:1)};na=function(b,d){function e(){var a=[],b,d=[];b="SoundManager "+c.version+(!c.html5Only&&c.useHTML5Audio?c.hasHTML5?" + HTML5 audio":", no HTML5 audio support":"");c.html5Only?c.html5PollingInterval&&a.push("html5PollingInterval ("+c.html5PollingInterval+"ms)"):(c.preferFlash&&a.push("preferFlash"),c.useHighPerformance&&a.push("useHighPerformance"),c.flashPollingInterval&&a.push("flashPollingInterval ("+
c.flashPollingInterval+"ms)"),c.html5PollingInterval&&a.push("html5PollingInterval ("+c.html5PollingInterval+"ms)"),c.wmode&&a.push("wmode ("+c.wmode+")"),c.debugFlash&&a.push("debugFlash"),c.useFlashBlock&&a.push("flashBlock"));a.length&&(d=d.concat([a.join(" + ")]));c._wD(b+(d.length?" + "+d.join(", "):""),1);mb()}function a(a,b){return'<param name="'+a+'" value="'+b+'" />'}if(X&&Y)return!1;if(c.html5Only)return Ea(),e(),c.oMC=F(c.movieID),za(),Y=X=!0,!1;var f=d||c.url,h=c.altURL||f,k=ma(),l=V(),
n=null,n=m.getElementsByTagName("html")[0],p,r,q,n=n&&n.dir&&n.dir.match(/rtl/i);b=b===g?c.id:b;Ea();c.url=db(ga?f:h);d=c.url;c.wmode=!c.wmode&&c.useHighPerformance?"transparent":c.wmode;null!==c.wmode&&(v.match(/msie 8/i)||!O&&!c.useHighPerformance)&&navigator.platform.match(/win32|win64/i)&&(M.push(z.spcWmode),c.wmode=null);k={name:b,id:b,src:d,quality:"high",allowScriptAccess:c.allowScriptAccess,bgcolor:c.bgColor,pluginspage:vb+"www.macromedia.com/go/getflashplayer",title:"JS/Flash audio component (SoundManager 2)",
type:"application/x-shockwave-flash",wmode:c.wmode,hasPriority:"true"};c.debugFlash&&(k.FlashVars="debug=1");c.wmode||delete k.wmode;if(O)f=m.createElement("div"),r=['<object id="'+b+'" data="'+d+'" type="'+k.type+'" title="'+k.title+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',a("movie",d),a("AllowScriptAccess",c.allowScriptAccess),a("quality",k.quality),c.wmode?a("wmode",c.wmode):"",a("bgcolor",
c.bgColor),a("hasPriority","true"),c.debugFlash?a("FlashVars",k.FlashVars):"","</object>"].join("");else for(p in f=m.createElement("embed"),k)k.hasOwnProperty(p)&&f.setAttribute(p,k[p]);Ga();l=V();if(k=ma())if(c.oMC=F(c.movieID)||m.createElement("div"),c.oMC.id)q=c.oMC.className,c.oMC.className=(q?q+" ":"movieContainer")+(l?" "+l:""),c.oMC.appendChild(f),O&&(p=c.oMC.appendChild(m.createElement("div")),p.className="sm2-object-box",p.innerHTML=r),Y=!0;else{c.oMC.id=c.movieID;c.oMC.className="movieContainer "+
l;p=l=null;c.useFlashBlock||(c.useHighPerformance?l={position:"fixed",width:"8px",height:"8px",bottom:"0px",left:"0px",overflow:"hidden"}:(l={position:"absolute",width:"6px",height:"6px",top:"-9999px",left:"-9999px"},n&&(l.left=Math.abs(parseInt(l.left,10))+"px")));ub&&(c.oMC.style.zIndex=1E4);if(!c.debugFlash)for(q in l)l.hasOwnProperty(q)&&(c.oMC.style[q]=l[q]);try{O||c.oMC.appendChild(f),k.appendChild(c.oMC),O&&(p=c.oMC.appendChild(m.createElement("div")),p.className="sm2-object-box",p.innerHTML=
r),Y=!0}catch(u){throw Error(t("domError")+" \n"+u.toString());}}X=!0;e();return!0};la=function(){if(c.html5Only)return na(),!1;if(l)return!1;if(!c.url)return p("noURL"),!1;l=c.getMovie(c.id);l||(ba?(O?c.oMC.innerHTML=Ia:c.oMC.appendChild(ba),ba=null,X=!0):na(c.id,c.url),l=c.getMovie(c.id));"function"===typeof c.oninitmovie&&setTimeout(c.oninitmovie,1);Oa();return!0};T=function(){setTimeout($a,1E3)};Da=function(){h.setTimeout(function(){L("soundManager: useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false...");
c.setup({preferFlash:!1}).reboot();c.didFlashBlock=!0;c.beginDelayedInit()},1)};$a=function(){var b,d=!1;if(!c.url||ca)return!1;ca=!0;x.remove(h,"load",T);if(H&&xa&&!Va)return p("waitFocus"),!1;q||(b=c.getMoviePercent(),0<b&&100>b&&(d=!0));setTimeout(function(){b=c.getMoviePercent();if(d)return ca=!1,c._wD(t("waitSWF")),h.setTimeout(T,1),!1;q||(c._wD("soundManager: No Flash response within expected time. Likely causes: "+(0===b?"SWF load failed, ":"")+"Flash blocked or JS-Flash security error."+(c.debugFlash?
" "+t("checkSWF"):""),2),!ga&&b&&(p("localFail",2),c.debugFlash||p("tryDebug",2)),0===b&&c._wD(t("swf404",c.url),1),D("flashtojs",!1,": Timed out"+(ga?" (Check flash security or flash blockers)":" (No plugin/missing SWF?)")));!q&&ob&&(null===b?c.useFlashBlock||0===c.flashLoadTimeout?(c.useFlashBlock&&Ja(),p("waitForever")):!c.useFlashBlock&&ea?Da():(p("waitForever"),P({type:"ontimeout",ignoreInit:!0,error:{type:"INIT_FLASHBLOCK"}})):0===c.flashLoadTimeout?p("waitForever"):!c.useFlashBlock&&ea?Da():
Ha(!0))},c.flashLoadTimeout)};ka=function(){if(Va||!xa)return x.remove(h,"focus",ka),!0;Va=ob=!0;p("gotFocus");ca=!1;T();x.remove(h,"focus",ka);return!0};Oa=function(){M.length&&(c._wD("SoundManager 2: "+M.join(" "),1),M=[])};mb=function(){Oa();var b,d=[];if(c.useHTML5Audio&&c.hasHTML5){for(b in c.audioFormats)c.audioFormats.hasOwnProperty(b)&&d.push(b+" = "+c.html5[b]+(!c.html5[b]&&u&&c.flash[b]?" (using flash)":c.preferFlash&&c.flash[b]&&u?" (preferring flash)":c.html5[b]?"":" ("+(c.audioFormats[b].required?
"required, ":"")+"and no flash support)"));c._wD("SoundManager 2 HTML5 support: "+d.join(", "),1)}};Z=function(b){if(q)return!1;if(c.html5Only)return p("sm2Loaded",1),q=!0,S(),D("onload",!0),!0;var d=!0,e;c.useFlashBlock&&c.flashLoadTimeout&&!c.getMoviePercent()||(q=!0);e={type:!H&&u?"NO_FLASH":"INIT_TIMEOUT"};c._wD("SoundManager 2 "+(y?"failed to load":"loaded")+" ("+(y?"Flash security/load error":"OK")+") "+String.fromCharCode(y?10006:10003),y?2:1);y||b?(c.useFlashBlock&&c.oMC&&(c.oMC.className=
V()+" "+(null===c.getMoviePercent()?"swf_timedout":"swf_error")),P({type:"ontimeout",error:e,ignoreInit:!0}),D("onload",!1),U(e),d=!1):D("onload",!0);y||(c.waitForWindowLoad&&!ja?(p("waitOnload"),x.add(h,"load",S)):(c.waitForWindowLoad&&ja&&p("docLoaded"),S()));return d};Za=function(){var b,d=c.setupOptions;for(b in d)d.hasOwnProperty(b)&&(c[b]===g?c[b]=d[b]:c[b]!==d[b]&&(c.setupOptions[b]=c[b]))};za=function(){if(q)return p("didInit"),!1;if(c.html5Only)return q||(x.remove(h,"load",c.beginDelayedInit),
c.enabled=!0,Z()),!0;la();try{l._externalInterfaceTest(!1),ab(!0,c.flashPollingInterval||(c.useHighPerformance?10:50)),c.debugMode||l._disableDebug(),c.enabled=!0,D("jstoflash",!0),c.html5Only||x.add(h,"unload",ya)}catch(b){return c._wD("js/flash exception: "+b.toString()),D("jstoflash",!1),U({type:"JS_TO_FLASH_EXCEPTION",fatal:!0}),Ha(!0),Z(),!1}Z();x.remove(h,"load",c.beginDelayedInit);return!0};Q=function(){if(aa)return!1;aa=!0;Za();Ga();!H&&c.hasHTML5&&(c._wD("SoundManager 2: No Flash detected"+
(c.useHTML5Audio?". Trying HTML5-only mode.":", enabling HTML5."),1),c.setup({useHTML5Audio:!0,preferFlash:!1}));jb();!H&&u&&(M.push(z.needFlash),c.setup({flashLoadTimeout:1}));m.removeEventListener&&m.removeEventListener("DOMContentLoaded",Q,!1);la();return!0};La=function(){"complete"===m.readyState&&(Q(),m.detachEvent("onreadystatechange",La));return!0};Fa=function(){ja=!0;Q();x.remove(h,"load",Fa)};Na();x.add(h,"focus",ka);x.add(h,"load",T);x.add(h,"load",Fa);m.addEventListener?m.addEventListener("DOMContentLoaded",
Q,!1):m.attachEvent?m.attachEvent("onreadystatechange",La):(D("onload",!1),U({type:"NO_DOM2_EVENTS",fatal:!0}))}if(!h||!h.document)throw Error("SoundManager requires a browser with window and document objects.");var W=null;h.SM2_DEFER!==g&&SM2_DEFER||(W=new K);"object"===typeof module&&module&&"object"===typeof module.exports?(module.exports.SoundManager=K,module.exports.soundManager=W):"function"===typeof define&&define.amd&&define(function(){return{constructor:K,getInstance:function(g){!h.soundManager&&
g instanceof Function&&(g=g(K),g instanceof K&&(h.soundManager=g));return h.soundManager}}});h.SoundManager=K;h.soundManager=W})(window);
;var Screen = {
  sounds: {
    'player_join': 'player_join.m4a',
  },
  View: {
  }
};

var Ctrl = {
  sounds: {
  },
  View: {
    GameEndWin: 'game_end_win',
    GameEndLose: 'game_end_lose'
  }
};

var Shared = {
  View: {
    Lobby: "lobby",
    Ingame: "game",
    GameEnd: "game_end"
  }
};

/**
  CONSTANTS for message exchange
*/
var AC =  {};

AC.State = {
  Idle: 'idle',
  Ingame: 'ingame'
};

AC.Action = {
};

AC.Event = {
};


/**
  Angular JS setup
*/
var Config = {
  // @const {String} APP_NAME - The name of the angular module
  APP_NAME: 'airApp',
  // @var {Object} dependencies - Dictionary of the angular dependency modules
  dependencies: {
    controllers: 'airAppControllers',
    services: 'airAppServices',
    directives: 'airAppDirectives',
    filters: 'airAppFilters'
  },

  /**
   * @desc Returns list of dependencies
   * @return {Array}
   */
  getDependencies: function() {
    var dependencies = [];
    for(var depenceny in this.dependencies) {
      dependencies.push(this.dependencies[depenceny]);
    }
    dependencies.push('ngRoute');
    return dependencies;
  }
};

var AirApp = AirApp || {
  app: null,
  services: null,
  controllers: null,
  directives: null
};

/**
 * Provide shortcut and to avoid long module code.
 * Instead use it like:
 *   AirApp.controllers.controller('YourCtrl', ['$scope', function ($scope) { ... }]);
 */
AirApp.controllers = angular.module(Config.dependencies.controllers, []);
AirApp.services = angular.module(Config.dependencies.services, []);
AirApp.directives = angular.module(Config.dependencies.directives, []);
AirApp.filters = angular.module(Config.dependencies.filters, []);
;var VIEW_PATH = "views/screen/";
AirApp.app = angular.module(Config.APP_NAME, Config.getDependencies());

AirApp.app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: VIEW_PATH + 'splash_view.html'
      }).
      when('/lobby', {
        templateUrl: VIEW_PATH + '_lobby_view.html',
        controller: 'LobbyCtrl'
      }).
      when('/game', {
        templateUrl: VIEW_PATH + 'game/_game_view.html',
        controller: 'GameCtrl'
      }).
      when('/end', {
        templateUrl: VIEW_PATH + '_end_view.html',
        controller: 'GameEndCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

window.onload = function() {
  AirApp.app.run(function($rootScope) {});
}
;AirApp.services.factory('AirConsoleService', ['SoundService', function (SoundService) {
  var airconsole = null;
  return {
    airconsole: airconsole,
    Event: {
      Ready: 'ac.ready',
      Connect: 'ac.connect',
      Disconnect: 'ac.disconnect',
      DeviceStateChange: 'ac.device_state_change',
      ProfileChange: 'ac.profile_change',
      Premium: "ac.on_premium",
      OnAdComplete: "ac.on_ad_complete",
      OnPersistentDataLoaded: 'ac.on_persistent_data_loaded'
    },
    connect_code: null,

    updateCustomData: function(custom_data) {
      this.airconsole.setCustomDeviceState(custom_data);
    },

    getScreenCustomData: function() {
      return this.airconsole.getCustomDeviceState(AirConsole.SCREEN);
    },

    onReady: function() {},

    instance: function() {
      return this.airconsole;
    },

    showAd: function() {
      this.airconsole.showAd();
    },

    onAdShow: function() {
      SoundService.stopAll();
    },

    createInstance: function(opts) {
      var self = this;
      opts = opts || {};
      airconsole = new AirConsole(opts);

      airconsole.onReady = function(connect_code) {
        self.connect_code = connect_code;
        self.onReady();
      };

      airconsole.onConnect = function(device_id) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.Connect,
          params: {
            device_id: device_id
          }
        });
      };

      airconsole.onDisconnect = function(device_id) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.Disconnect,
          params: {
            device_id: device_id
          }
        });
      };

      airconsole.onMessage = function(device_id, data) {
        // Put this into your onMessage function to listen for events
        this.dispatchEvent(device_id, data);
      };

      airconsole.onCustomDeviceStateChange = function(device_id, custom_data) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.DeviceStateChange,
          params: custom_data
        });
      };

      airconsole.onDeviceProfileChange = function(device_id, data) {
        var profile_data = self.getDeviceData(device_id);
        this.dispatchEvent(device_id, {
          event_name: self.Event.ProfileChange,
          params: profile_data
        });
      };

      airconsole.onPremium = function(device_id) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.Premium,
          params: {
            device_id: device_id
          }
        });
      };

      airconsole.onAdShow = this.onAdShow.bind(this);

      airconsole.onAdComplete = function(ad_was_shown) {
        this.dispatchEvent(AirConsole.SCREEN, {
          event_name: self.Event.OnAdComplete,
          params: null
        });
      };

      airconsole.onPersistentDataLoaded = function(data) {
        var device_id = this.getDeviceId();
        this.dispatchEvent(device_id, {
          event_name: self.Event.OnPersistentDataLoaded,
          params: {
            device_id: device_id,
            data: data
          }
        });
      };

      this.airconsole = airconsole;
    },

    on: function(evt, fn) {
      return this.airconsole.on(evt, fn);
    },

    off: function(event_id) {
      this.airconsole.off(event_id);
    },

    isMasterPlayer: function(device_id) {
      device_id = device_id || this.airconsole.getDeviceId();
      return this.airconsole.getMasterControllerDeviceId() === device_id;
    },

    getMasterPlayer: function() {
      var master_id = this.airconsole.getMasterControllerDeviceId();
      return {
        name: this.airconsole.getNickname(master_id),
        picture: this.airconsole.getProfilePicture(master_id)
      };
    },

    hasPremiumDevice: function() {
      return this.airconsole.getPremiumDeviceIds().length > 0;
    },

    getDeviceData: function(device_id) {
      device_id = device_id || this.airconsole.getDeviceId();
      var name = this.airconsole.getNickname(device_id);
      var picture = this.airconsole.getProfilePicture(device_id);
      var data = {
        uid: this.airconsole.getUID(device_id),
        device_id: device_id,
        name: name,
        img: picture,
        is_master: this.isMasterPlayer(device_id),
        is_premium: this.airconsole.isPremium(device_id)
      };
      return data;
    },

    isScreen: function() {
      return this.airconsole.getDeviceId() === AirConsole.SCREEN;
    },

    getConnectUrl: function() {
      var code = this.connect_code;
      code = code.replace(/\s/gi, "");
      return "https://www.airconsole.com/#!code=" + code;
    }

  };
}]);
;AirApp.services.factory('DeviceSelectService', ['$http', '$q', 'SelectService',
    function ($http, $q, SelectService) {

  var service = angular.merge({}, SelectService);
  service.KEY = "device_select";

  service.list = [
    { name: "A" },
    { name: "B" },
    { name: "C" }
  ];

  service.init = function() {
    this.init_.apply(this);
  };

  return service;
}]);
;AirApp.services.factory('PlayerService', ['AirConsoleService', 'SoundService', function (AirConsoleService, SoundService) {
  var service = {
    players: [],
    players_map: {},
    Event: {
      AddPlayer: 'ps.add_player',
      RemovePlayer: 'ps.remove_player',
      ProfileChange: 'ps.player_profile_change',
    },
    STORAGE_LAST_VISIT_KEY: "ps.player_last_visit_ts",
    DATA_PLAYER_MAP_KEY: "ps.player_map_key"
  };

  var airconsole = null;

  // ======================================================
  // SHARED
  // ======================================================

  var player_colors = [
    '#f3a31d', '#e54450', '#774e9a', '#774e9a',
    '#6bc245', '#ecdefa', '#ffed1b', '#1a9567',
    '#77bbff', '#ff9900', '#99ee00', '#f4359e',
    '#651067', '#b82e2e', '#329262', '#9c5935',
    '#3b3eee', '#fb9a99', '#ccbb22', '#cab2d6',
    '#aaffaa', '#b91383', '#008800', '#660000',
    '#ff0000', '#ffff00', '#00ff00', '#0000ff',
    '#743411', '#111177', '#b77322', '#66aa00',
    '#00aac6', '#a9c413', '#9e8400', '#5574a6',
    '#777777', '#999999', '#bbbbbb', '#eeeeee'
  ];

  service.init = function() {

    airconsole = AirConsoleService.instance();

    // ======================================================
    // SCREEN
    // ======================================================
    if (AirConsoleService.isScreen()) {

      service.updatePlayersMap = function() {
        airconsole.setCustomDeviceStateProperty(service.DATA_PLAYER_MAP_KEY, this.players_map);
      };

      service.addPlayer = function(device_id) {
        if (this.getPlayerByDeviceId(device_id) !== null) return;
        var color = player_colors[device_id] || player_colors[0];
        var player = AirConsoleService.getDeviceData(device_id);
        player.color = color;
        player.stats = {
          score: 0,
          // Map => uid: {total, correct}
          map: {}
        };

        var screen_data = AirConsoleService.getScreenCustomData();
        if (screen_data && screen_data.current_state) {
          player.is_active_round = screen_data.current_state !== AC.State.Ingame;
        }
        this.players.push(player);
        this.players_map[device_id] = player;

        airconsole.requestPersistentData([player.uid]);

        this.updatePlayersMap();
        return player;
      };

      service.removePlayer = function(device_id) {
        var index = this.getPlayerByDeviceId(device_id, true);
        if (index !== null) {
          this.players.splice(index, 1);
          delete this.players_map[device_id];
        } else {
          throw "Could not remove player with device_id " + device_id;
        }
        this.updatePlayersMap();
      };

      service.getPlayer = function(device_id) {
        return this.players_map[device_id];
      };

      service.getPlayerByDeviceId = function(id, as_index) {
        var player = null;
        for (var i = 0; i < this.players.length; i++) {
          if (this.players[i].device_id === id) {
            player = as_index ? i : this.players[i];
            break;
          }
        }
        return player;
      };

      service.getPlayers = function() {
        return this.players;
      };

      service.saveLastVisit = function() {
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          airconsole.storePersistentData(service.STORAGE_LAST_VISIT_KEY, +new Date(), player.uid);
        }
      };

      service.getLastVisit = function() {
        var ts = null;
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          if (player.last_visit_ts) {
            if (!ts || (ts && ts < player.last_visit_ts)) {
              ts = player.last_visit_ts;
            }
          }
        }
        return ts;
      };

      airconsole.on(AirConsoleService.Event.OnPersistentDataLoaded,
        function(device_id, params) {
          var user_data = params.data;
          var storage_key = service.STORAGE_LAST_VISIT_KEY;
          if (user_data) {
            for (var i = 0; i < service.players.length; i++) {
              var uid = service.players[i].uid;
              if (user_data[uid]) {
                // Save last visited timestamp if available
                if (user_data[uid][storage_key]) {
                  service.players[i].last_visit_ts = user_data[uid][storage_key];
                }
              }
            }
          }
      });

      airconsole.on(AirConsoleService.Event.Connect, function(device_id, params) {
        var player = service.addPlayer(device_id);
        airconsole.dispatchEvent(device_id, {
          event_name: service.Event.AddPlayer,
          params: {
            player: player
          }
        });
      });

      airconsole.on(AirConsoleService.Event.Disconnect, function(device_id, params) {
        service.removePlayer(device_id);
        airconsole.dispatchEvent(device_id, {
          event_name: service.Event.RemovePlayer,
          params: {
            device_id: device_id
          }
        });
      });

      airconsole.on(AirConsoleService.Event.ProfileChange, function(device_id, device_data) {
        if (device_data) {
          var player = service.getPlayerByDeviceId(device_id);
          if (player) {
            player.name = device_data.name;
            player.img = device_data.img;
          }
        }

        airconsole.dispatchEvent(device_id, {
          event_name: service.Event.ProfileChange,
          params: {
            device_id: device_id,
            player: player
          }
        });
      });

      service.updatePlayersMap();

    // ======================================================
    // CTRL
    // ======================================================
    } else {

    }

  }

  return service;
}]);
;AirApp.services.factory('SelectService', ['AirConsoleService',
    function (AirConsoleService) {

  var Track = {
    Screen: "screen",
    Ctrl: "ctrl"
  };

  var service = {
    KEY: "select_key",
    list: [],
    track_by: "screen",
    selections: {},
    Event: {
      OnIndexChanged: "select.index_changed"
    },
    airconsole: null,
    track_map: {},
  };

  service.track = function(key, cb) {
    if (!this.track_map[device_id]) {
      this.track_map[device_id] = {};
    }
    this.track_map[device_id][key] = cb;
  };

  service.onSelectionChanged = function(device_id, index) {
    this.selections[device_id] = index;
    if (this.track_by === Track.Screen) {
      this.selections[AirConsole.SCREEN] = index;
    }
    if (AirConsoleService.isScreen()) {

    }
  };

  service.init_ = function() {
    var is_screen = AirConsoleService.isScreen();
    this.airconsole = AirConsoleService.instance();

    this.selections[this.airconsole.getDeviceId()] = 0;

    this.airconsole.on(this.Event.OnIndexChanged, function(device_id, index) {
      this.onSelectionChanged(device_id, index);
    }.bind(this));

  };

  service.getList = function() {
    return this.list;
  };

  service.setIndex = function(index) {
    this.selections[this.airconsole.getDeviceId()] = index;
    if (!AirConsoleService.isScreen()) {
      this.airconsole.sendEvent(AirConsole.SCREEN, this.Event.OnIndexChanged, index);
    }
  };

  service.selectNext = function() {
    var next = this.getSelectedIndex() + 1;
    if (next > this.list.length - 1) {
      next = 0;
    }
    this.setIndex(next);
  };

  service.selectPrev = function() {
    var prev = this.getSelectedIndex() - 1;
    if (prev < 0) {
      prev = this.list.length - 1;
    }
    this.setIndex(prev);
  };

  service.getSelectedItem = function() {
    return this.list[this.getSelectedIndex()];
  };

  service.getSelectedIndex = function() {
    if (!this.airconsole) return 0;
    return this.selections[this.airconsole.getDeviceId()] || 0;
  };

  service.isSelectedItem = function(index) {
    return this.getSelectedIndex() === index;
  };

  return service;
}]);
;AirApp.services.factory('SoundService', [function () {

  var BASE_URL = 'assets/sounds/';

  return {

    load: function(sounds) {
      soundManager.setup({
        debugMode: false,
        onready: function() {
          for (var key in sounds) {
            var sound_file = sounds[key];
            soundManager.createSound({url: BASE_URL + sound_file, id: key});
          }
        }
      });
    },

    play: function(key, opts) {
      opts = opts || {};
      if (opts.mute) {
        this.stopAll();
      }
      soundManager.play(key, opts);
    },

    stopAll: function() {
      soundManager.stopAll();
    },

    /*
      SoundService.play("end_game", {
        mute: true,
        onfinish: function() {
          SoundService.play("happy_game_show", { mute: true });
        }
      });
    */
    playQueue: function(list, opts, random) {
      var self = this;
      if (!list) return;
      if (random) {
        shuffleArray(list);
      }
      opts = opts || {};

      var playTrack = function playTrack(id) {
        var play_opts = {};
        play_opts = angular.copy(opts, play_opts);
        play_opts.onfinish = function() {
          var next_id = list.pop();
          list.unshift(next_id);
          playTrack(next_id);
        }

        self.play(id, play_opts);
      };

      playTrack(list[0]);
    }

  };

}]);
;AirApp.services.factory('TrackPropertyService', ['AirConsoleService',
    function (AirConsoleService) {

  var airconsole = null;
  var service = {
    properties: {}
  };

  service.init = function() {
    airconsole = AirConsoleService.instance();
    airconsole.on(AirConsoleService.Event.DeviceStateChange, function(device_id, data) {
      for (var key in data) {
        if (this.properties[key]) {
          for (var i = 0; i < this.properties[key].length; i++) {
            this.properties[key][i](device_id, data[key]);
          }
        }
      }
    });
  };

  service.set = function(prop, value) {
    airconsole.setCustomDeviceStateProperty(prop, value);
  };

  service.track = function(prop, cb) {
    if (!this.properties[prop]) {
      this.properties[prop] = [];
    }
    this.properties[prop].push(cb);
  };

  return service;

}]);
;AirApp.services.factory('ViewService', ['AirConsoleService', function (AirConsoleService) {
  var service = {
    ctrl: {},
    screen: {},
    Event: {
      OnPathChange: "view_service.on_path_change"
    }
  };

  // ======================================================
  // SHARED
  // ======================================================
  var airconsole = null;

  service.screen.current_view = null;
  service.ctrl.current_view = null;

  service.onPath = function(path) {};

  // ======================================================
  // SCREEN
  // ======================================================
  service.init = function() {

    airconsole = AirConsoleService.instance();
    airconsole.on(service.Event.OnPathChange, function(from, params) {
      service.onPath(params.view, params);
    });

    service.deviceGo = function(device_id, path, params) {
      airconsole.sendEvent(device_id, service.Event.OnPathChange, {
        view: path,
        params: params
      });
    };

    if (AirConsoleService.isScreen()) {

      // A device connects
      airconsole.on(AirConsoleService.Event.Connect, function(from, params) {
        // var view_to_show = service.screen.current_view;

        // Redirects
        // if (view_to_show === 'game') {
        //   view_to_show = 'game_running'
        // }

        // airconsole.sendEvent(from, service.Event.OnPathChange, {
        //   view: view_to_show
        // });
      });

      service.screen.go = function(path, ctrl_too, params) {
        if (ctrl_too) {
          airconsole.broadcastEvent(service.Event.OnPathChange, {
            view: path,
            params: params
          });
        }
        service.screen.current_view = path;
        service.onPath(path, params, true);
      };

    // ======================================================
    // CTRL
    // ======================================================
    } else {

      service.ctrl.go = function(path, all_devices, params) {
        if (all_devices) {
          airconsole.broadcastEvent(service.Event.OnPathChange, {
            view: path,
            params: params
          });
        }
        service.ctrl.current_view = path;
        service.onPath(path, params, true);
      };

      service.ctrl.screenGo = function(path, params) {
        this.deviceGo(AirConsole.SCREEN, path, params);
      };

    }
  }

  return service;
}]);
;/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function isMobile() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) +min);
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseQuery(qstr) {
  var query = {};
  var a = qstr.substr(1).split('&');
  for (var i = 0; i < a.length; i++) {
      var b = a[i].split('=');
      query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  }
  return query;
}
;AirApp.controllers.controller('GameCtrl',
  ['$scope', 'AirConsoleService',
  function ($scope, AirConsoleService) {

  $scope.init = function() {
    $scope.custom_data.current_state = AC.State.Ingame;
    $scope.updateCustomData();
  };

}]);
;AirApp.controllers.controller('GameEndCtrl',
    ['$injector', '$scope', '$routeParams', 'AirConsoleService', 'SoundService', 'PlayerService', 'ViewService',
    function ($injector, $scope, $routeParams, AirConsoleService, SoundService, PlayerService, ViewService) {

  var evts = {};

  $scope.init = function() {
    $scope.custom_data.current_state = AC.State.Idle;
    $scope.updateCustomData();
  };

  $scope.$on("$destroy", function() {
    for (var id in evts) {
      $scope.airconsole.off(evts[id]);
    }
  });

}]);

;AirApp.controllers.controller('LobbyCtrl',
  ['$injector', '$scope', 'SoundService', 'PlayerService', 'AirConsoleService', 'DeviceSelectService',
  function ($injector, $scope, SoundService, PlayerService, AirConsoleService, DeviceSelectService) {

  $scope.items = [];

  $scope.isSelectedItem = function(index) {
    return DeviceSelectService.isSelectedItem(index);
  };

  $scope.init = function() {
    $scope.items = DeviceSelectService.getList();

    $scope.airconsole.on(DeviceSelectService.Event.OnIndexChanged, function(device_id, index) {
      $scope.update();
    });
  };

  $scope.$on("$destroy", function() {

  });

}]);
;AirApp.controllers.controller('MainCtrl',
    ['$injector', '$scope', '$location', '$timeout', '$routeParams', 'AirConsoleService', 'SoundService', 'PlayerService', 'ViewService', 'DeviceSelectService',
    function ($injector, $scope, $location, $timeout, $routeParams, AirConsoleService, SoundService, PlayerService, ViewService, DeviceSelectService) {

  $scope.custom_data = {
    is_developer: false,
    is_low_performance: false,
    current_state: AC.State.Idle
  };
  $scope.airconsole = null;

  // =====================================================================================

  var setDeveloperMode = function() {
    var state = $scope.airconsole.devices[0].url.indexOf('10.0.1') > -1;
    $scope.custom_data.is_developer = state;
  };

  var setLowPerformanceState = function() {
    if (window.navigator.userAgent.match(/iPhone|Android|iPad/gi) !== null) {
      $scope.custom_data.is_low_performance = true;
    }
  };

  // =====================================================================================

  $scope.navigate = function(view) {
    $location.path('/' + view);
    $scope.update();
  };

  // =====================================================================================

  $scope.updateCustomData = function() {
    AirConsoleService.updateCustomData($scope.custom_data);
  };

  $scope.update = function() {
    $scope.$apply();
  };

  var bindEvents = function() {

    // $scope.airconsole.on(AC.Action.SelectService, function(device_id, service) {
    // });

  };

  // =====================================================================================

  $scope.resetAll = function() {
    $scope.custom_data.current_state = AC.State.Idle;
    $scope.updateCustomData();
  };

  $scope.init = function() {

    AirConsoleService.onReady = function() {
      $scope.airconsole = AirConsoleService.instance();
      bindEvents();
      setDeveloperMode();
      setLowPerformanceState();

      ViewService.init();
      ViewService.onPath = function(path, params, from_same_device) {
        if ($location.path() !== path) {
          $location.path('/' + path);
          if (!from_same_device) {
            $scope.$apply();
          }
        }
      };

      PlayerService.init();
      SoundService.load(Screen.sounds);

      DeviceSelectService.init();

      //
      ViewService.screen.go(Shared.View.Lobby, true);
      $scope.updateCustomData();
    };

    AirConsoleService.createInstance();

  };

}]);
; AirApp.services.factory('GameService', ['$http', '$q', 'PlayerService', 'AirConsoleService',
    function ($http, $q, PlayerService, AirConsoleService) {

  var service = {};
  var airconsole = null;

  service.init = function() {
    airconsole = AirConsoleService.instance();
  };

  return service;
}]);
