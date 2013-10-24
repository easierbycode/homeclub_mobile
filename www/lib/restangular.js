/**
 * Restful Resources service for AngularJS apps
 * @version v1.1.6 - 2013-10-24
 * @link https://github.com/mgonto/restangular
 * @author Martin Gontovnikas <martin@gonto.com.ar>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
!function(){var a=angular.module("restangular",[]);a.provider("Restangular",function(){var a={};a.init=function(a,b){function c(a,b,c,d){var e={};return _.each(_.keys(d),function(f){var g=d[f];g.params=_.extend({},g.params,a.defaultRequestParams[g.method.toLowerCase()]),_.isEmpty(g.params)&&delete g.params,e[f]=a.isSafe(g.method)?function(){return b(_.extend(g,{url:c}))}:function(a){return b(_.extend(g,{url:c,data:a}))}}),e}var d=["get","head","options","trace"];b.isSafe=function(a){return _.contains(d,a.toLowerCase())};var e=/^https?:\/\//i;b.isAbsoluteUrl=function(a){return a&&e.test(a)},b.baseUrl=_.isUndefined(b.baseUrl)?"":b.baseUrl,a.setBaseUrl=function(a){return b.baseUrl=/\/$/.test(a)?a.substring(0,a.length-1):a,this},b.extraFields=b.extraFields||[],a.setExtraFields=function(a){return b.extraFields=a,this},b.defaultHttpFields=b.defaultHttpFields||{},a.setDefaultHttpFields=function(a){return b.defaultHttpFields=a,this},b.withHttpDefaults=function(a){return _.defaults(a,b.defaultHttpFields)},b.encodeIds=_.isUndefined(b.encodeIds)?!0:b.encodeIds,a.setEncodeIds=function(a){b.encodeIds=a},b.defaultRequestParams=b.defaultRequestParams||{get:{},post:{},put:{},remove:{},common:{}},a.setDefaultRequestParams=function(a,c){var d=[],e=c||a;return _.isUndefined(c)?d.push("common"):_.isArray(a)?d=a:d.push(a),_.each(d,function(a){b.defaultRequestParams[a]=e}),this},a.requestParams=b.defaultRequestParams,b.defaultHeaders=b.defaultHeaders||{},a.setDefaultHeaders=function(c){return b.defaultHeaders=c,a.defaultHeaders=b.defaultHeaders,this},a.defaultHeaders=b.defaultHeaders,b.methodOverriders=b.methodOverriders||[],a.setMethodOverriders=function(a){var c=_.extend([],a);return b.isOverridenMethod("delete",c)&&c.push("remove"),b.methodOverriders=c,this},b.isOverridenMethod=function(a,c){var d=c||b.methodOverriders;return!_.isUndefined(_.find(d,function(b){return b.toLowerCase()===a.toLowerCase()}))},b.urlCreator=b.urlCreator||"path",a.setUrlCreator=function(a){if(!_.has(b.urlCreatorFactory,a))throw new Error("URL Path selected isn't valid");return b.urlCreator=a,this},b.restangularFields=b.restangularFields||{id:"id",route:"route",parentResource:"parentResource",restangularCollection:"restangularCollection",cannonicalId:"__cannonicalId",etag:"restangularEtag",selfLink:"href",get:"get",getList:"getList",put:"put",post:"post",remove:"remove",head:"head",trace:"trace",options:"options",patch:"patch",getRestangularUrl:"getRestangularUrl",putElement:"putElement",addRestangularMethod:"addRestangularMethod",getParentList:"getParentList",clone:"clone",ids:"ids"},a.setRestangularFields=function(a){return b.restangularFields=_.extend(b.restangularFields,a),this},b.setFieldToElem=function(a,b,c){var d=a.split("."),e=b;return _.each(_.initial(d),function(a){e[a]={},e=e[a]}),e[_.last(d)]=c,this},b.getFieldFromElem=function(a,b){var c=a.split("."),d=angular.copy(b);return _.each(c,function(a){d&&(d=d[a])}),d},b.setIdToElem=function(a,c){return b.setFieldToElem(b.restangularFields.id,a,c),this},b.getIdFromElem=function(a){return b.getFieldFromElem(b.restangularFields.id,a)},b.isValidId=function(a){return""!==a&&!_.isUndefined(a)&&!_.isNull(a)},b.setUrlToElem=function(a,c){return b.setFieldToElem(b.restangularFields.selfLink,a,c),this},b.getUrlFromElem=function(a){return b.getFieldFromElem(b.restangularFields.selfLink,a)},b.useCannonicalId=_.isUndefined(b.useCannonicalId)?!1:b.useCannonicalId,a.setUseCannonicalId=function(a){return b.useCannonicalId=a,this},b.getCannonicalIdFromElem=function(a){var c=a[b.restangularFields.cannonicalId],d=b.isValidId(c)?c:b.getIdFromElem(a);return d},b.responseExtractor=b.responseExtractor||function(a){return a},a.setResponseExtractor=function(a){return b.responseExtractor=a,this},a.setResponseInterceptor=a.setResponseExtractor,b.fullRequestInterceptor=b.fullRequestInterceptor||function(a,b,c,d,e,f){return{element:a,headers:e,params:f}},a.setRequestInterceptor=function(a){return b.fullRequestInterceptor=function(b,c,d,e,f,g){return{headers:f,params:g,element:a(b,c,d,e)}},this},a.setFullRequestInterceptor=function(a){return b.fullRequestInterceptor=a,this},b.errorInterceptor=b.errorInterceptor||function(){},a.setErrorInterceptor=function(a){return b.errorInterceptor=a,this},b.onBeforeElemRestangularized=b.onBeforeElemRestangularized||function(a){return a},a.setOnBeforeElemRestangularized=function(a){return b.onBeforeElemRestangularized=a,this},b.onElemRestangularized=b.onElemRestangularized||function(a){return a},a.setOnElemRestangularized=function(a){return b.onElemRestangularized=a,this},a.setListTypeIsArray=function(){},b.shouldSaveParent=b.shouldSaveParent||function(){return!0},a.setParentless=function(a){return _.isArray(a)?b.shouldSaveParent=function(b){return!_.contains(a,b)}:_.isBoolean(a)&&(b.shouldSaveParent=function(){return!a}),this},b.suffix=_.isUndefined(b.suffix)?null:b.suffix,a.setRequestSuffix=function(a){return b.suffix=a,this},b.transformers=b.transformers||{},a.addElementTransformer=function(a,c,d){var e=null,f=null;2===arguments.length?f=c:(f=d,e=c);var g=b.transformers[a];g||(g=b.transformers[a]=[]),g.push(function(a,b){return _.isNull(e)||a==e?f(b):b})},a.extendCollection=function(b,c){return a.addElementTransformer(b,!0,c)},a.extendModel=function(b,c){return a.addElementTransformer(b,!1,c)},b.transformElem=function(a,c,d,e){var f=b.transformers[d],g=a;return f&&_.each(f,function(a){g=a(c,g)}),b.onElemRestangularized(g,c,d,e)},b.fullResponse=_.isUndefined(b.fullResponse)?!1:b.fullResponse,a.setFullResponse=function(a){return b.fullResponse=a,this},b.urlCreatorFactory={};var f=function(){};f.prototype.setConfig=function(a){return this.config=a,this},f.prototype.parentsArray=function(a){for(var b=[];a;)b.push(a),a=a[this.config.restangularFields.parentResource];return b.reverse()},f.prototype.resource=function(a,d,e,f,g,h,i){var j=_.defaults(f||{},this.config.defaultRequestParams.common),k=_.defaults(e||{},this.config.defaultHeaders);h&&(b.isSafe(i)?k["If-None-Match"]=h:k["If-Match"]=h);var l=this.base(a);return l+=g?"/"+g:"",l+=this.config.suffix||"",c(this.config,d,l,{getList:this.config.withHttpDefaults({method:"GET",params:j,headers:k}),get:this.config.withHttpDefaults({method:"GET",params:j,headers:k}),put:this.config.withHttpDefaults({method:"PUT",params:j,headers:k}),post:this.config.withHttpDefaults({method:"POST",params:j,headers:k}),remove:this.config.withHttpDefaults({method:"DELETE",params:j,headers:k}),head:this.config.withHttpDefaults({method:"HEAD",params:j,headers:k}),trace:this.config.withHttpDefaults({method:"TRACE",params:j,headers:k}),options:this.config.withHttpDefaults({method:"OPTIONS",params:j,headers:k}),patch:this.config.withHttpDefaults({method:"PATCH",params:j,headers:k})})};var g=function(){};g.prototype=new f,g.prototype.base=function(a){var c=this;return _.reduce(this.parentsArray(a),function(a,d){var e,f=c.config.getUrlFromElem(d);if(f){if(c.config.isAbsoluteUrl(f))return f;e=f}else if(e=d[c.config.restangularFields.route],d[c.config.restangularFields.restangularCollection]){var g=d[c.config.restangularFields.ids];g&&(e+="/"+g.join(","))}else{var h;h=c.config.useCannonicalId?c.config.getCannonicalIdFromElem(d):c.config.getIdFromElem(d),b.isValidId(h)&&(e+="/"+(c.config.encodeIds?encodeURIComponent(h):h))}return a+"/"+e},this.config.baseUrl)},g.prototype.fetchUrl=function(a,b){var c=this.base(a);return b&&(c+="/"+b),c},b.urlCreatorFactory.path=g};var b={};a.init(this,b),this.$get=["$http","$q",function(c,d){function e(f){function g(a,b,c){if(b[f.restangularFields.route]=c,b[f.restangularFields.getRestangularUrl]=_.bind(M.fetchUrl,M,b),b[f.restangularFields.addRestangularMethod]=_.bind(J,b),b[f.restangularFields.clone]=_.bind(s,b,b),b.one=_.bind(h,b,b),b.all=_.bind(i,b,b),b.several=_.bind(j,b,b),b.oneUrl=_.bind(k,b,b),b.allUrl=_.bind(l,b,b),a&&f.shouldSaveParent(c)){var d=f.getIdFromElem(a),e=f.getUrlFromElem(a),g=_.union(_.values(_.pick(f.restangularFields,["route","parentResource"])),f.extraFields),m=_.pick(a,g);f.isValidId(d)&&f.setIdToElem(m,d),f.isValidId(e)&&f.setUrlToElem(m,e),b[f.restangularFields.parentResource]=m}else b[f.restangularFields.parentResource]=null;return b}function h(a,b,c){var d={};return f.setIdToElem(d,c),t(a,d,b)}function i(a,b){return u(a,[],b,!0)}function j(a,b){var c=[];return c[f.restangularFields.ids]=Array.prototype.splice.call(arguments,2),u(a,c,b,!0)}function k(a,b,c){var d={};return f.setUrlToElem(d,c),t(a,d,b)}function l(a,b,c){var d={};return f.setUrlToElem(d,c),u(a,d,b,!0)}function m(a,b){return a.call=_.bind(n,a),a.get=_.bind(o,a),a[f.restangularFields.restangularCollection]=b,b&&(a.push=_.bind(n,a,"push")),a}function n(a){var b=d.defer(),c=arguments;return this.then(function(d){var e=Array.prototype.slice.call(c,1),f=d[a];f.apply(d,e),b.resolve(d)}),m(b.promise,this[f.restangularFields.restangularCollection])}function o(a){var b=d.defer();return this.then(function(c){b.resolve(c[a])}),m(b.promise,this[f.restangularFields.restangularCollection])}function p(a,b,c){return f.fullResponse?a.resolve(_.extend(b,{data:c})):(a.resolve(c),void 0)}function q(a){return _.omit(a,_.values(_.omit(f.restangularFields,"id")))}function r(a){a.customOperation=_.bind(I,a),_.each(["put","post","get","delete"],function(b){_.each(["do","custom"],function(c){var d,e="delete"===b?"remove":b,f=c+b.toUpperCase();d="put"!==e&&"post"!==e?I:function(a,b,c,d,e){return _.bind(I,this)(a,c,d,e,b)},a[f]=_.bind(d,a,e)})}),a.customGETLIST=_.bind(y,a),a.doGETLIST=a.customGETLIST}function s(a){var b=angular.copy(a);return t(b[f.restangularFields.parentResource],b,b[f.restangularFields.route])}function t(a,b,c,d){var e=f.onBeforeElemRestangularized(b,!1,c),h=g(a,e,c);return f.useCannonicalId&&(h[f.restangularFields.cannonicalId]=f.getIdFromElem(h)),d&&(h[f.restangularFields.getParentList]=function(){return d}),h[f.restangularFields.restangularCollection]=!1,h[f.restangularFields.get]=_.bind(A,h),h[f.restangularFields.getList]=_.bind(y,h),h[f.restangularFields.put]=_.bind(C,h),h[f.restangularFields.post]=_.bind(D,h),h[f.restangularFields.remove]=_.bind(B,h),h[f.restangularFields.head]=_.bind(E,h),h[f.restangularFields.trace]=_.bind(F,h),h[f.restangularFields.options]=_.bind(G,h),h[f.restangularFields.patch]=_.bind(H,h),r(h),f.transformElem(h,!1,c,L)}function u(a,b,c){var d=f.onBeforeElemRestangularized(b,!0,c),e=g(a,d,c);return e[f.restangularFields.restangularCollection]=!0,e[f.restangularFields.post]=_.bind(D,e,null),e[f.restangularFields.head]=_.bind(E,e),e[f.restangularFields.trace]=_.bind(F,e),e[f.restangularFields.putElement]=_.bind(w,e),e[f.restangularFields.options]=_.bind(G,e),e[f.restangularFields.patch]=_.bind(H,e),e[f.restangularFields.get]=_.bind(v,e),e[f.restangularFields.getList]=_.bind(y,e,null),r(e),f.transformElem(e,!0,c,L)}function v(a,b,c){return this.customGET(a.toString(),b,c)}function w(a,b,c){var e=this,f=this[a],g=d.defer();return f.put(b,c).then(function(b){var c=s(e);c[a]=b,g.resolve(c)},function(a){g.reject(a)}),m(g.promise,!0)}function x(a,b,c,d,e,g){var h=f.responseExtractor(a,b,c,d,e,g),i=e.headers("ETag");return h&&i&&(h[f.restangularFields.etag]=i),h}function y(a,b,e){var g=this,h=d.defer(),i="getList",j=M.fetchUrl(this,a),k=a||g[f.restangularFields.route],l=f.fullRequestInterceptor(null,i,k,j,e||{},b||{});return M.resource(this,c,l.headers,l.params,a,this[f.restangularFields.etag],i).getList().then(function(b){var c=b.data,d=x(c,i,k,j,b,h),e=_.map(d,function(b){return g[f.restangularFields.restangularCollection]?t(g[f.restangularFields.parentResource],b,g[f.restangularFields.route],d):t(g,b,a,d)});e=_.extend(d,e),g[f.restangularFields.restangularCollection]?p(h,b,u(g[f.restangularFields.parentResource],e,g[f.restangularFields.route])):p(h,b,u(g,e,a))},function(a){f.errorInterceptor(a)!==!1&&h.reject(a)}),m(h.promise,!0)}function z(a,b,e,g,h){var i=this,j=d.defer(),k=e||{},l=b||this[f.restangularFields.route],n=M.fetchUrl(this,b),o=g||this,r=o[f.restangularFields.etag];_.isObject(o)&&(o=q(o));var s=f.fullRequestInterceptor(o,a,l,n,h||{},k||{}),u=function(c){var d=c.data,e=x(d,a,l,n,c,j);e?"post"!==a||i[f.restangularFields.restangularCollection]?p(j,c,t(i[f.restangularFields.parentResource],e,i[f.restangularFields.route])):p(j,c,t(i,e,b)):p(j,c,void 0)},v=function(a){f.errorInterceptor(a)!==!1&&j.reject(a)},w=a,y=_.extend({},s.headers),z=f.isOverridenMethod(a);return z&&(w="post",y=_.extend(y,{"X-HTTP-Method-Override":"remove"===a?"DELETE":a})),f.isSafe(a)?z?M.resource(this,c,y,s.params,b,r,w)[w]({}).then(u,v):M.resource(this,c,y,s.params,b,r,w)[w]().then(u,v):M.resource(this,c,y,s.params,b,r,w)[w](s.element).then(u,v),m(j.promise)}function A(a,b){return _.bind(z,this)("get",void 0,a,void 0,b)}function B(a,b){return _.bind(z,this)("remove",void 0,a,void 0,b)}function C(a,b){return _.bind(z,this)("put",void 0,a,void 0,b)}function D(a,b,c,d){return _.bind(z,this)("post",a,c,b,d)}function E(a,b){return _.bind(z,this)("head",void 0,a,void 0,b)}function F(a,b){return _.bind(z,this)("trace",void 0,a,void 0,b)}function G(a,b){return _.bind(z,this)("options",void 0,a,void 0,b)}function H(a,b,c){return _.bind(z,this)("patch",void 0,b,a,c)}function I(a,b,c,d,e){return _.bind(z,this)(a,b,c,e,d)}function J(a,b,c,d,e,g){var h;h="getList"===b?_.bind(y,this,c):_.bind(I,this,b,c);var i=function(a,b,c){var f=_.defaults({params:a,headers:b,elem:c},{params:d,headers:e,elem:g});return h(f.params,f.headers,f.elem)};this[a]=f.isSafe(b)?i:function(a,b,c){return i(b,c,a)}}function K(c){var d=angular.copy(b);return a.init(d,d),c(d),e(d)}var L={},M=new f.urlCreatorFactory[f.urlCreator];return M.setConfig(f),a.init(L,f),L.copy=_.bind(s,L),L.withConfig=_.bind(K,L),L.one=_.bind(h,L,null),L.all=_.bind(i,L,null),L.several=_.bind(j,L,null),L.oneUrl=_.bind(k,L,null),L.allUrl=_.bind(l,L,null),L.restangularizeElement=_.bind(t,L),L.restangularizeCollection=_.bind(u,L),L}return e(b)}]})}();