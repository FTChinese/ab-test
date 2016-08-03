/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var docCookies = {
	  getItem: function (sKey) {
	    if (!sKey) { return null; }
	    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	  },
	  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
	    var sExpires = "";
	    if (vEnd) {
	      switch (vEnd.constructor) {
	        case Number:
	          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	          break;
	        case String:
	          sExpires = "; expires=" + vEnd;
	          break;
	        case Date:
	          sExpires = "; expires=" + vEnd.toUTCString();
	          break;
	      }
	    }
	    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	    return true;
	  },
	  removeItem: function (sKey, sPath, sDomain) {
	    if (!this.hasItem(sKey)) { return false; }
	    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
	    return true;
	  },
	  hasItem: function (sKey) {
	    if (!sKey) { return false; }
	    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	  },
	  keys: function () {
	    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
	    return aKeys;
	  }
	};
	
	function getRandomIntInclusive(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function createElement(name, attributes) {
		var node = document.createElement(name);
		if (attributes) {
			for (var attr in attributes) {
				if (attributes.hasOwnProperty(attr)) {
					node.setAttribute(attr, attributes[attr]);
				}
			}
		}
	
		for (var i = 2; i < arguments.length; i++) {
			var child = arguments[i];
			if (typeof child == 'string') {
				child = document.createTextNode(child);
			}
			node.appendChild(child);
		}
		return node;
	}
	function createBarrier(id, commonClass, message) {
		var registerElt = createElement('a', {
			'href': 'http://user.ftchinese.com/register/?ccode=1B110427',
			'class': 'o-register'
		}, '免费注册');
		var loginElt = createElement('a', {
			'href': 'http://user.ftchinese.com/login',
			'class': 'o-login'
		}, '登录');
	
		var actionWrapper = createElement('div', {
			'class': 'o-barrier__action'
		}, registerElt, loginElt);
		var messageElt = createElement('p', {
			'class': 'o-barrier__message'
		}, '亲爱的读者，您在30天内连续阅读了8篇以上文章，如果您喜欢FT中文网，我们诚邀您登录访问或免费注册为FT中文网的会员。');
		var closeElt = createElement('button', {
			'class': 'o-barrier__close'
		}, '阅读完本文以后再注册或登录');
	
		var barrierWrapper = createElement('div', {
			'class': 'o-barrier__wrapper'
		}, messageElt, actionWrapper, closeElt);
	
		var barrierElt = createElement('div', {
			'class': 'o-barrier',
			'id': id
		}, barrierWrapper);
	
		return barrierElt;
	}
	
	function recordAction(type, category) {
		try {
			ga('send', 'event', 'Barrier ' + type, category, window.FTStoryid);
		} catch(err) {
			console.log('send', 'event', type, category)
		}
	}
	
	function barrierOnButtom(elm) {
		var oldClassName = elm.className;
		if (oldClassName.indexOf('--bottom') === -1) {
			elm.className = oldClassName + ' ' + oldClassName + '--bottom';
			var msgElm = elm.querySelector('.o-barrier__message');
			msgElm.innerHTML = '欢迎来到FT中文网，我们诚邀您登录访问或免费注册为FT中文网会员。';
			return false
		}
		return true;
	}
	
	function abTest() {
		const rand = getRandomIntInclusive(0, 0);
		console.log('rand number: ', rand);
	
		const barrierNew = createBarrier('barrier-new');
	
		document.body.appendChild(barrierNew);
	
		const oBarrierInstances = [
			{
				elt: barrierNew,
				type: 'Barrier Page New',
				events: {
					'o-barrier': function(e, type) {
						// e.currentTarget.style.display = 'none';
						if (!barrierOnButtom(e.currentTarget)) {
							recordAction(type, 'Click Close BG');
						}
					},
	
					'o-barrier__close': function(e, type) {
						// e.currentTarget.style.display = 'none';
						if (!barrierOnButtom(e.currentTarget)) {
							recordAction(type, 'Click Close Button');
						}
					},
	
					'o-register': function(e, type) {
						e.preventDefault();
						if (barrierOnButtom(e.currentTarget)) {
							recordAction(type + ' bottom', 'Register');
						} else {
							recordAction(type, 'Register');
						}
					},
	
					'o-login': function(e, type) {
						e.preventDefault();
						if (barrierOnButtom(e.currentTarget)) {
							recordAction(type + ' bottom', 'Log In');
						} else {
							recordAction(type, 'Log In');
						}
					}			
				}
			},
			{
				elt: document.getElementById('overlay-login'),
				type: 'Barrier Page',
				events: {
					'register': function(e, type) {
						recordAction(type, 'Register');
					},
	
					'findPassword': function(e, type) {
						recordAction(type, 'Find Password');
					},
	
					'logIn': function(e, type) {
						// e.preventDefault();
						recordAction(type, 'Log In');
					},
	
					'overlay-close': function(e, type) {
						// closeOverlay(e.currentTarget.id);
						recordAction(type, 'Click Close Button');
					},
	
					'overlay-bg': function(e, type) {
						// closeOverlay(e.currentTarget.id);
						recordAction(type, 'Click Close BG');
					}
				}
			}
		];
	
		const barrierType = oBarrierInstances[rand].type;
		const barrierElt = oBarrierInstances[rand].elt;
		const barrierEvents = oBarrierInstances[rand].events;
	
		if (rand === 0) {
			barrierElt.style.display = 'block';
			try {
				ga('send', 'event', barrierType, 'Pop Out', window.FTStoryid, {'nonInteraction':1});
			} catch(err) {
				console.log('send', 'event', barrierType,  'Pop Out');
			}
	
			barrierElt.onclick = function(e) {
				const eventKey = e.target.className;
				console.log('clicked element className: ', eventKey);
	
				if (barrierEvents[eventKey]) {
					barrierEvents[eventKey](e, barrierType);
				}
			};	
		} else if (rand === 1) {
			// showOverlay('overlay-login');
			barrierElt.style.display = 'block';
			const msgElt = document.getElementById('login-reason');
			msgElt.innerHTML = '亲爱的读者，您在' + historyDays + '天内连续阅读了' + maxStory + '篇以上文章，如果您喜欢FT中文网，我们诚邀您登录访问或<a href="http://user.ftchinese.com/register/?ccode=1B110427" class=highlight>免费注册</a>为FT中文网的会员。';
				try {
			
			ga('send', 'event', barrierType, 'Pop Out', window.FTStoryid, {'nonInteraction':1});
			} catch(err) {
				console.log('send', 'event', barrierType,  'Pop Out');
			}
	
			barrierElt.onclick = function(e) {
				e.preventDefault();
				const target = e.target
				const className = target.className;
				const tagName = target.tagName.toLowerCase();
				var eventKey = '';
	
				if (tagName === 'a') {
	
					if (target.href.indexOf('register') !== -1) {
						target.href = 'http://user.ftchinese.com/register/?ccode=1B110427'
						eventKey = 'register';
					} else if (target.href.indexOf('findpassword') !== -1) {
						eventKey = 'findPassword';
					}
				} else {
					eventKey = className;
				}
	
				console.log(eventKey);
	
				if (barrierEvents[eventKey]) {
					barrierEvents[eventKey](e, barrierType);
				}
			};
	
			barrierElt.getElementsByTagName('form')[0].onsubmit = function(e) {
				const eventKey = 'logIn';
	
				if (barrierEvents[eventKey]) {
					barrierEvents[eventKey](e, barrierType);
				}
			}
		}	
	}
	/*************/
	const maxStory = 0;
	const storyId = '123456789';
	const storyIdLength = 9;
	const historyDays = 30;
	const currentTime = Math.round(new Date().getTime() / 1000);
	console.log('currentTime', currentTime);
	
	var viewStartTime = docCookies.getItem('viewstart') || '';
	var viewHistory = docCookies.getItem('viewhistory') || '';
	var userName = docCookies.getItem('USER_NAME') || '';
	
	console.log('viewStartTime', viewStartTime);
	console.log(document.cookie);
	
	if (!viewStartTime) {
		docCookies.setItem('viewstart', currentTime);
	} else {
		var timeElapsed = currentTime - parseInt(viewStartTime, 10);
		if (timeElapsed >= historyDays * 24 * 60 * 60) {
			docCookies.removeItem('viewstart');
			docCookies.removeItem('viewhistory');
			viewHistory = '';
		}
	}
	
	if (viewHistory.indexOf(storyId) < 0 && userName === '') {
		viewHistory += storyId;
		if (viewHistory.length > maxStory * storyIdLength) {
			abTest();
		} else {
			docCookies.setItem('viewhistory', viewHistory);
		}
	}
	/*********/
	
	
	
		
	
	// if (rand === 0) {
	// 	const barrierType = oBarrierInstances[rand].type;
	
	// 	barrierElt.style.display = 'block';
	// 	try {
	// 		ga('send', 'event', 'Barrier Page', 'Pop Out', window.FTStoryid, {'nonInteraction':1});
	// 	} catch(err) {
	// 		console.log('send', 'event', 'Barrier New',  'Pop Out');
	// 	}
	
	// 	barrierElt.onclick = function(e) {
	// 		const targetClassName = e.target.className;
	
	// 		if (oBarrierEvents[targetClassName]) {
	// 			oBarrierEvents[targetClassName](e, barrierType);
	// 		}
	// 	};	
	// } else if (rand === 1) {
	// 	const overLayLogin = document.querySelector('#overlay-login');
	// 	// overLayLogin.classList.add('on');
	// 	overLayLogin.style.display = 'block';
	// 	document.getElementById('login-reason').innerHTML = '亲爱的读者，您在 30 天内连续阅读了 8 篇以上文章，如果您喜欢FT中文网，我们诚邀您登录访问或<a href="http://user.ftchinese.com/register/?ccode=1B110427" class=highlight>免费注册</a>为FT中文网的会员。';
	// 	// ga('send', 'event', 'Barrier Page', 'Pop Out', window.FTStoryid, {'nonInteraction':1});
	// 	console.log('popout');
	// 	var ele = document.getElementById('overlay-login');
	// 	var form = ele.getElementsByTagName('form')[0];
	// 	form.onsubmit = function (e) {
	// 		// ga('send', 'event', 'Barrier Page', 'Log In', window.FTStoryid);
	// 		console.log('submit');
	// 		e.preventDefault()
	// 	};
	// 	var register = ele.getElementsByTagName('a');
	// 	for (var i=0; i<register.length; i++) {
			
	// 		register[i].onclick = function(e) {
	// 			console.log('click regeter');
	// 			e.preventDefault();
	// 		};
	
	// 		// if (register[i].href.indexOf('register')>=0) {
	// 		// 	register[i].href = 'http://user.ftchinese.com/register/?ccode=1B110427';
	// 		// }
	// 	}
	// 	var closeButton = ele.querySelector('.overlay-close');
	// 	closeButton.onclick = function () {
	// 		// ga('send', 'event', 'Barrier Page', 'Click Close Button', window.FTStoryid);
	// 		console.log('close button')
	// 	};
	// 	var overlayBG = ele.querySelector('.overlay-bg');
	// 	overlayBG.onclick = function () {
	// 		// ga('send', 'event', 'Barrier Page', 'Click Close BG', window.FTStoryid);
	// 		console.log('click close bg')
	// 	};
	// }
	/**********/
	


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map