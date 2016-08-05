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
function createBarrier() {
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
		'class': 'o-barrier'
	}, barrierWrapper);

	return barrierElt;
}

function recordAction(type, category) {
	try {
		ga('send', 'event', type, category, window.FTStoryid);
	} catch(err) {
		console.log('send', 'event', type, category)
	}
}

function barrierOnBottom(className) {
	if (className.indexOf('--bottom') === -1) {
		return false
	}
	return true;
}

function goToBottom(elm) {
	var oldClassName = elm.className;
	if (!barrierOnBottom(oldClassName)) {
		elm.className = oldClassName + ' ' + oldClassName + '--bottom';
		var msgElm = elm.querySelector('.o-barrier__message');
		msgElm.innerHTML = '欢迎来到FT中文网，我们诚邀您登录访问或免费注册为FT中文网会员。';		
	}
}

var barrierEvents = {
	'o-barrier': function(e, type, rand) {
		if ((!barrierOnBottom(e.currentTarget.className)) && rand === 0) {
			goToBottom(e.currentTarget);
			recordAction(type, 'Click Close BG');
		}
	},

	'o-barrier__close': function(e, type) {
		if (!barrierOnBottom(e.currentTarget.className)) {
			goToBottom(e.currentTarget);
			recordAction(type, 'Click Close Button');
		}
	},

	'o-register': function(e, type) {
		if (barrierOnBottom(e.currentTarget.className)) {
			type = type + ' bottom';
		}
		recordAction(type, 'Register');
	},

	'o-login': function(e, type) {
		if (barrierOnBottom(e.currentTarget.className)) {
			type = type + ' bottom';
		}
		recordAction(type, 'Log In');
	}			
}

function abTest() {
	const rand = getRandomIntInclusive(0, 1);
	console.log('rand number: ', rand);
	const barrierTypes = ['Barrier Page 003', 'Barrier Page 004'];

	const barrierElt = createBarrier();
	document.body.appendChild(barrierElt);
	const barrierType = barrierTypes[rand];

	barrierElt.style.display = 'block';

	try {
		ga('send', 'event', barrierType, 'Pop Out', window.FTStoryid, {'nonInteraction':1});
	} catch(err) {
		console.log('send', 'event', barrierType,  'Pop Out');
	}

	barrierElt.onclick = function(e) {
		e.preventDefault();
		console.log('clicked element className: ', eventKey);

		const eventKey = e.target.className;

		if (barrierEvents[eventKey]) {
			barrierEvents[eventKey](e, barrierType, rand);
		}
	};	
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

// function Barrier(id) {
// 	var oBarrier = this;
// 	var rootEl = createBarrier();

// 	function init() {
// 		oBarrier.rootEl = rootEl
// 		oBarrier.msgEl = this.rootEl.querySelector('.o-barrier__message');
// 		oBarrier.id = id;
// 		oBarrier.type = 'Barrier Page 00' + id;
// 	}

// 	function changeMsg(msg) {
// 		oBarrier.msgEl.textContent = msg;
// 	}

// 	function recordAction(type, category) {
// 		try {
// 			ga('send', 'event', this.type, category, window.FTStoryid);
// 		} catch(err) {
// 			console.log('send', 'event', type, category)
// 		}
// 	}
// }

// Barrier.init(len) {
// 	var rand = getRandomIntInclusive();

// 	var barrierInstances = [];
// 	len = len ? len : 2;
// 	for (var i = 0; i < len; i++) {
// 		barrierInstances.push(new Barrier(3 + i));
// 	}

// 	var barrier = barrierInstances[rand];
// }

	

