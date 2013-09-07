/**
 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(e,t){typeof define=="function"&&define.amd?define(t):typeof module=="object"?module.exports=t():e.Plunder=t()})(this,function(){var e,t,n;(function(r){function d(e,t){return h.call(e,t)}function v(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function m(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function g(e){return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(e){if(d(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!d(a,e)&&!d(c,e))throw new Error("No "+e);return a[e]}function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1],i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:E(e)}}},i=function(e,t,n,i){var s,l,h,p,v,g=[],w;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")g[v]=u.require(e);else if(l==="exports")g[v]=u.exports(e),w=!0;else if(l==="module")s=g[v]=u.module(e);else if(d(a,l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,m(i,!0),y(l),{}),g[v]=a[l]}}h=n.apply(a[e],g);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!w)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):b(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s)},s.config=function(e){return l=e,l.deps&&s(l.deps,l.callback),s},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}})();var r={}.hasOwnProperty;n("Util",[],function(){var e,t,n,i,s,o,u;s=function(e){return e===(e|0)},e={rand:function(t,n,r){var i,o,u,a,f;return r==null&&(r=!1),f=!r,o=e.isNumber(n)?t:0,i=e.isNumber(n)?n:t,u=i-o,a=Math.random()*u+o,s(o)&&s(i)&&f?Math.floor(a):a},coin:function(){return this.rand(0,2)===0},degreesToRadians:function(e){return e*Math.PI/180},radiansToDegrees:function(e){return e*180/Math.PI},isUndefined:function(e){return typeof e=="undefined"},isPrimitive:function(e){return e===!0||e===!1||this.isString(e)||this.isNumber(e)},areSameTypes:function(e,t){return this.isArray(e)?this.isArray(t):this.isArray(t)?!1:typeof e==typeof t},extend:function(e,t){var n,i;if(e!=null)for(n in t){if(!r.call(t,n))continue;i=t[n],e[n]=i}return e},clone:function(e){return!e||this.isPrimitive(e)?e:this.isArray(e)?e.slice(0):this.extend({},e)},toArray:function(e){return e==null?[]:this.isArray(e)?e:[e]},last:function(e){return e&&e[e.length-1]},first:function(e){return e&&e[0]},isEmpty:function(e){return e&&e.length===0},any:function(e){return e&&e.length>0}},e.isArray=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},t=function(e){return function(t){return Object.prototype.toString.call(t)==="[object "+e+"]"}},u=["Arguments","Function","String","Number","Date","RegExp"];for(i=0,o=u.length;i<o;i++)n=u[i],e["is"+n]=t(n);return e}),n("Bezier",["./Util"],function(e){var t;return t=function(){function t(t){e.extend(this,t),this.reset()}return t.prototype.reset=function(){return this._elapsed=0,this.done=this._elapsed>=this.duration,this._targetsInitted=!1},t.prototype.reverse=function(){return new t({targets:this.targets,points:this._reversePoints(this.points),duration:this.duration})},t.prototype._reversePoints=function(t){return t=e.clone(t),this._swap(t,0,3),this._swap(t,1,2),t},t.prototype._swap=function(e,t,n){var r;return r=e[t],e[t]=e[n],e[n]=r},t.prototype._initTargets=function(){var e,t,n,r;r=this.targets;for(t=0,n=r.length;t<n;t++)e=r[t],e.x=this.points[0].x,e.y=this.points[0].y;return this._targetsInitted=!0},t.prototype.update=function(e){var t,n,r,i,s;if(this.done||this.disabled)return;this._targetsInitted||this._initTargets(),this._elapsed+=e;if(this._elapsed>this.duration)return this._elapsed=this.duration,this.done=!0;i=this.targets,s=[];for(n=0,r=i.length;n<r;n++)t=i[n],s.push(this._move(t));return s},t.prototype._move=function(e){var t,n,r,i;return t=this._elapsed/this.duration,i=this._computeBezier(0,t),n=i.x,r=i.y,e.x=n,e.y=r},t.prototype._computeBezier=function(e,t){var n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b;return a=t,i=this.points[e],s=this.points[e+1],o=this.points[e+2],u=this.points[e+3],n=1-a,r=n*n*n,f=a*a*a,c=r*i.x,h=3*a*n*n*s.x,p=3*a*a*n*o.x,d=f*u.x,l=c+h+p+d,m=r*i.y,g=3*a*n*n*s.y,y=3*a*a*n*o.y,b=f*u.y,v=m+g+y+b,{x:l,y:v}},t}()}),n("Easie",[],function(){var e;return e=function(){function e(){}return e.backIn=function(e,t,n,r,i){return i==null&&(i=1.70158),n*(e/=r)*e*((i+1)*e-i)+t},e.backOut=function(e,t,n,r,i){return i==null&&(i=1.70158),n*((e=e/r-1)*e*((i+1)*e+i)+1)+t},e.backInOut=function(e,t,n,r,i){return i==null&&(i=1.70158),(e/=r/2)<1?n/2*e*e*(((i*=1.525)+1)*e-i)+t:n/2*((e-=2)*e*(((i*=1.525)+1)*e+i)+2)+t},e.bounceOut=function(e,t,n,r){return(e/=r)<1/2.75?n*7.5625*e*e+t:e<2/2.75?n*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?n*(7.5625*(e-=2.25/2.75)*e+.9375)+t:n*(7.5625*(e-=2.625/2.75)*e+.984375)+t},e.bounceIn=function(t,n,r,i){return r-e.bounceOut(i-t,0,r,i)+n},e.bounceInOut=function(t,n,r,i){return t<i/2?e.bounceIn(t*2,0,r,i)*.5+n:e.bounceOut(t*2-i,0,r,i)*.5+r*.5+n},e.circIn=function(e,t,n,r){return-n*(Math.sqrt(1-(e/=r)*e)-1)+t},e.circOut=function(e,t,n,r){return n*Math.sqrt(1-(e=e/r-1)*e)+t},e.circInOut=function(e,t,n,r){return(e/=r/2)<1?-n/2*(Math.sqrt(1-e*e)-1)+t:n/2*(Math.sqrt(1-(e-=2)*e)+1)+t},e.cubicIn=function(e,t,n,r){return n*(e/=r)*e*e+t},e.cubicOut=function(e,t,n,r){return n*((e=e/r-1)*e*e+1)+t},e.cubicInOut=function(e,t,n,r){return(e/=r/2)<1?n/2*e*e*e+t:n/2*((e-=2)*e*e+2)+t},e.elasticOut=function(e,t,n,r,i,s){var o;return i==null&&(i=null),s==null&&(s=null),e===0?t:(e/=r)===1?t+n:(s==null&&(s=r*.3),i==null||i<Math.abs(n)?(i=n,o=s/4):o=s/(2*Math.PI)*Math.asin(n/i),i*Math.pow(2,-10*e)*Math.sin((e*r-o)*2*Math.PI/s)+n+t)},e.elasticIn=function(e,t,n,r,i,s){var o;return i==null&&(i=null),s==null&&(s=null),e===0?t:(e/=r)===1?t+n:(s==null&&(s=r*.3),i==null||i<Math.abs(n)?(i=n,o=s/4):o=s/(2*Math.PI)*Math.asin(n/i),e-=1,-(i*Math.pow(2,10*e))*Math.sin((e*r-o)*2*Math.PI/s)+t)},e.elasticInOut=function(e,t,n,r,i,s){var o;return i==null&&(i=null),s==null&&(s=null),e===0?t:(e/=r/2)===2?t+n:(s==null&&(s=r*.3*1.5),i==null||i<Math.abs(n)?(i=n,o=s/4):o=s/(2*Math.PI)*Math.asin(n/i),e<1?-0.5*i*Math.pow(2,10*(e-=1))*Math.sin((e*r-o)*(2*Math.PI/s))+t:i*Math.pow(2,-10*(e-=1))*Math.sin((e*r-o)*2*Math.PI/s)+n+t)},e.expoIn=function(e,t,n,r){return e===0?t:n*Math.pow(2,10*(e/r-1))+t},e.expoOut=function(e,t,n,r){return e===r?t+n:n*(-Math.pow(2,-10*e/r)+1)+t},e.expoInOut=function(e,t,n,r){return e===0?t:e===r?t+n:(e/=r/2)<1?n/2*Math.pow(2,10*(e-1))+t:n/2*(-Math.pow(2,-10*(e-1))+2)+t},e.linearNone=function(e,t,n,r){return n*e/r+t},e.linearIn=function(t,n,r,i){return e.linearNone(t,n,r,i)},e.linearOut=function(t,n,r,i){return e.linearNone(t,n,r,i)},e.linearInOut=function(t,n,r,i){return e.linearNone(t,n,r,i)},e.linear=function(t,n,r,i){return e.linearNone(t,n,r,i)},e.quadIn=function(e,t,n,r){return n*(e/=r)*e+t},e.quadOut=function(e,t,n,r){return-n*(e/=r)*(e-2)+t},e.quadInOut=function(e,t,n,r){return(e/=r/2)<1?n/2*e*e+t:-n/2*((e-=1)*(e-2)-1)+t},e.quartIn=function(e,t,n,r){return n*(e/=r)*e*e*e+t},e.quartOut=function(e,t,n,r){return-n*((e=e/r-1)*e*e*e-1)+t},e.quartInOut=function(e,t,n,r){return(e/=r/2)<1?n/2*e*e*e*e+t:-n/2*((e-=2)*e*e*e-2)+t},e.quintIn=function(e,t,n,r){return n*(e/=r)*e*e*e*e+t},e.quintOut=function(e,t,n,r){return n*((e=e/r-1)*e*e*e*e+1)+t},e.quintInOut=function(e,t,n,r){return(e/=r/2)<1?n/2*e*e*e*e*e+t:n/2*((e-=2)*e*e*e*e+2)+t},e.sineIn=function(e,t,n,r){return-n*Math.cos(e/r*(Math.PI/2))+n+t},e.sineOut=function(e,t,n,r){return n*Math.sin(e/r*(Math.PI/2))+t},e.sineInOut=function(e,t,n,r){return-n/2*(Math.cos(Math.PI*e/r)-1)+t},e}()}),n("Accessor",["./Util"],function(e){var t;return t=function(){function t(e,t){this.obj=e,this.paths=t.split(".")}return t.prototype.get=function(){var e,t,n,r,i;e=this.obj,i=this.paths;for(n=0,r=i.length;n<r;n++)t=i[n],e=e[t];return e},t.prototype.set=function(t){var n,r,i,s,o;r=this.obj;for(n=i=0,o=this.paths.length-1;i<o;n=i+=1)r[s=this.paths[n]]==null&&(r[s]={}),r=r[this.paths[n]];return r[e.last(this.paths)]=t},t}()}),n("Tween",["./Easie","./Util","./Accessor"],function(e,t,n){var r,i;return i=0,r=function(){function r(n){this.id=i++,t.extend(this,n),this._saveProperty="_plunder_tween_save_"+this.id,this._accessorProp="__accessorProp"+this.id,this.easeFunc=e[this.easing||"linear"]||e.linear,this.reset()}return r.prototype.reset=function(){return this._elapsed=0,this.done=this._elapsed>=this.duration,this._targetsInitted=!1},r.prototype.reverse=function(){return new r({property:this.property,targets:this.targets,from:this.to,to:this.from,easing:this.easing,duration:this.duration})},r.prototype.update=function(e){var t,n,r,i;if(this.done||this.disabled)return;this._targetsInitted||this._initTargets(),this._elapsed+=e;if(this._elapsed>=this.duration)this._elapsed=this.duration,this.done=!0;else{i=this.targets;for(n=0,r=i.length;n<r;n++)t=i[n],this._tween(t)}if(this.done)return this._finish()},r.prototype._initTargets=function(){var e,r,i,s,o,u,a;u=this.targets;for(s=0,o=u.length;s<o;s++){r=u[s],r[this._accessorProp]=new n(r,this.property),e=this._get(r),r[this._saveProperty]=t.isArray(e)?e.slice(0):e,i=(a=this.from)!=null?a:e;if(e!=null&&(!t.areSameTypes(i,e)||!t.areSameTypes(i,this.to)))throw new Error("Tween: mismatched types between from/to and targets current value");t.isArray(i)&&(i=i.slice(0)),this._set(r,i)}return this._targetsInitted=!0},r.prototype._finish=function(){var e,t,n,r,i,s;i=this.targets,s=[];for(n=0,r=i.length;n<r;n++)t=i[n],e=this.restoreAfter?t[this._saveProperty]:this.to,this._set(t,e),s.push(this._del(t));return s},r.prototype._tween=function(e){var n,r,i,s,o,u,a,f,l;r=this._get(e),i=(f=this.from)!=null?f:e[this._saveProperty];if(t.isArray(r)){l=[];for(s=u=0,a=r.length;u<a;s=++u)n=r[s],l.push(r[s]=this._tweenValue(this._elapsed,i[s],this.to[s],this.duration));return l}if(t.isNumber(r))return o=this._tweenValue(this._elapsed,i,this.to,this.duration),this._set(e,o);throw new Error("Tween can only operate on numbers or arrays of numbers")},r.prototype._tweenValue=function(e,t,n,r){return this.easeFunc(e,t,n-t,r)},r.prototype._get=function(e){return e[this._accessorProp].get()},r.prototype._set=function(e,t){return e[this._accessorProp].set(t)},r.prototype._del=function(e){return delete e[this._saveProperty],delete e[this._accessorProp]},r}()}),n("Wait",["./Util"],function(e){var t;return t=function(){function t(t){e.extend(this,t);if(this.min!=null&&this.max!=null&&this.min>this.max)throw new Error("Wait: min must be less than max");this._specifiedDuration=this.duration,this.reset()}return t.prototype.reverse=function(){return new t({duration:this.duration})},t.prototype.reset=function(){return this.duration=this._specifiedDuration||e.rand(this.min,this.max),this._elapsed=0,this.done=this._elapsed>=this.duration},t.prototype.update=function(e){if(this.done)return;return this._elapsed+=e,this.done=this._elapsed>=this.duration},t}()});var i=[].slice;n("Repeat",["./Util"],function(e){var t;return t=function(){function e(e,t){this.count=e,this.children=t!=null?t:[],this._currentChild=0,this._curCount=0}return e.prototype.reset=function(){var e,t,n,r,i;this.done=!1,this._currentChild=0,this._curCount=0,r=this.children,i=[];for(t=0,n=r.length;t<n;t++)e=r[t],i.push(e.reset());return i},e.prototype.reverse=function(){var t,n;return n=function(){var e,n,r,i;r=this.children,i=[];for(e=0,n=r.length;e<n;e++)t=r[e],i.push(t.reverse());return i}.call(this),new e(this.count,n.reverse())},e.prototype.update=function(){var e,t,n,r,s,o,u;e=1<=arguments.length?i.call(arguments,0):[],this.done=this._curCount>=this.count;if(this.done)return;n=this.children[this._currentChild],n.update.apply(n,e);if(n.done){++this._currentChild;if(this._currentChild>=this.children.length){this._currentChild=0,++this._curCount,this.done=this._curCount>=this.count;if(!this.done){o=this.children,u=[];for(r=0,s=o.length;r<s;r++)t=o[r],u.push(t.reset());return u}}}},e}()});var i=[].slice;return n("Together",[],function(){var e;return e=function(){function e(e){this.children=e!=null?e:[]}return e.prototype.reset=function(){var e,t,n,r,i;this.done=!1,r=this.children,i=[];for(t=0,n=r.length;t<n;t++)e=r[t],i.push(e.reset());return i},e.prototype.reverse=function(){var t,n;return n=function(){var e,n,r,i;r=this.children,i=[];for(e=0,n=r.length;e<n;e++)t=r[e],i.push(t.reverse());return i}.call(this),new e(n)},e.prototype.update=function(){var e,t,n,r,s,o;e=1<=arguments.length?i.call(arguments,0):[];if(this.done)return;n=!1,o=this.children;for(r=0,s=o.length;r<s;r++)t=o[r],t.update.apply(t,e),t.done||(n=!0);return this.done=!n},e}()}),n("Invoke",["./Util"],function(e){var t;return t=function(){function t(t){e.extend(this,t),this.reset()}return t.prototype.reset=function(){return this.done=!1},t.prototype.reverse=function(){return new t({func:this.func,context:this.context})},t.prototype.update=function(){if(this.done)return;return this.func.call(this.context),this.done=!0},t}()}),n("Timeline",["./Util","./Bezier","./Tween","./Wait","./Repeat","./Together","./Invoke"],function(e,t,n,r,i,s,o){var u;return u=function(){function u(e){this.owner=e;if(!this.owner)throw new Error("Timeline requires an owner");this._buildStack=[],this._childConfigStack=[]}return u.prototype._getTargets=function(t){var n,r;return n=(r=t.target)!=null?r:this.owner,e.toArray(n)},u.prototype._mergeConfig=function(t){return e.any(this._childConfigStack)?e.extend(e.clone(e.last(this._childConfigStack)),t):t},u.prototype._addParentAnimation=function(t,n,r,i){var s,o,u;return e.isFunction(t)?s=t:(o=t,s=n),u=new r(i),o&&this._childConfigStack.push(o),this._buildStack.push(u),s(this),this._buildStack.pop(),o&&this._childConfigStack.pop(),this._pushAnimation(u)},u.prototype._addAnimation=function(e,t){var n;return n=new e(this._mergeConfig(t)),n.targets=this._getTargets(n),this._pushAnimation(n)},u.prototype._pushAnimation=function(e){return this._buildStack.length===0?this.owner.addPlunderAnimation(e):this._buildStack[this._buildStack.length-1].children.push(e),e},u.prototype._fade=function(t,r,i){return e.isNumber(t)&&(t={duration:t}),t.property="alpha",t.from=r,t.to=i,this._addAnimation(n,t)},u.prototype.reverse=function(e){return this._pushAnimation(e.reverse())},u.prototype.setProperty=function(e){return e==null&&(e={}),e.duration=0,e.from=e.to=e.value,this.tween(e)},u.prototype.bezier=function(e){return e==null&&(e={}),this._addAnimation(t,e)},u.prototype.tween=function(e){return e==null&&(e={}),this._addAnimation(n,e)},u.prototype.fadeIn=function(e){return e==null&&(e={}),this._fade(e,0,1)},u.prototype.fadeOut=function(e){return e==null&&(e={}),this._fade(e,1,0)},u.prototype.scale=function(e){return e==null&&(e={}),e.property="scale",this.tween(e)},u.prototype.color=function(e){return e==null&&(e={}),e.property="color",this.tween(e)},u.prototype.rotate=function(e){return e==null&&(e={}),e.property="angle",this.tween(e)},u.prototype.move=function(t){var n,r,i,s;return n=e.clone(t),n.easing=(i=t.easingX)!=null?i:t.easing,n.from=t.from.x,n.to=t.to.x,n.property="x",r=e.clone(t),r.easing=(s=t.easingY)!=null?s:t.easing,r.from=t.from.y,r.to=t.to.y,r.property="y",this.together(function(e){return e.tween(n),e.tween(r)})},u.prototype.together=function(e,t){return this._addParentAnimation(e,t,s)},u.prototype.sequence=function(e,t){return this.repeat(1,e,t)},u.prototype.forever=function(e,t){return this.repeat(Infinity,e,t)},u.prototype.repeat=function(e,t,n){return this._addParentAnimation(t,n,i,e)},u.prototype.wait=function(e){return this.waitBetween(e,e)},u.prototype.waitBetween=function(e,t){return this._addAnimation(r,{min:e,max:t})},u.prototype.invoke=function(e,t){return this._addAnimation(o,{func:e,context:t})},u.prototype.stop=function(){return this.owner.clearPlunderAnimations()},u}()}),n("main",["./Timeline","./Util","./Bezier","./Easie","./Invoke","./Repeat","./Together","./Tween","./Wait"],function(e,t,n,r,i,s,o,u,a){return{Timeline:e,Util:t,Bezier:n,Easie:r,Invoke:i,Repeat:s,Together:o,Tween:u,Wait:a}}),t("main")});