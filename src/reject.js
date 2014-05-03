/* finalReject v0.1 | http://codefucker.github.io/finalReject/
 * © Anatoly Lunev | toliklunev.ru | toliklunev@gmail.com
 * Licensed under the MIT License */

;function bindReady(handler){

	var called = false

	function ready(){
		if (called) return
		called = true
		handler()
	}

	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded', function(){
			ready()
		}, false)
	}

	else if(document.attachEvent){

		if(document.documentElement.doScroll && window == window.top){

			function tryScroll(){
				if(called) return
				if(!document.body) return
				try{
					document.documentElement.doScroll('left')
					ready()
				}catch(e){
					setTimeout(tryScroll, 0)
				}
			}
			tryScroll()
		}

		document.attachEvent('onreadystatechange', function(){

			if(document.readyState === 'complete'){
				ready()
			}
		})
	}
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, expires, path, domain, secure){
	expires instanceof Date ? expires = expires.toGMTString() : typeof(expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
	var r = [name + "=" + escape(value)], s, i;

	for(i in s = {expires: expires, path: path, domain: domain}){
		s[i] && r.push(i + "=" + s[i]);
	}

	return secure && r.push("secure"), document.cookie = r.join(";"), true;
}

bindReady(function(){
	var reject = document.createElement('DIV');

	reject.id = 'reject';
	reject.innerHTML = '<div class="info"><p><span>К сожалению, браузер, которым вы пользуйтесь, устарел, и не может нормально отображать сайт. Пожалуйста, скачайте любой из следующих браузеров:</span></p><div><table><tbody><tr><td><a href="https://www.google.com/chrome/" target="_blank" class="chrome"><ins></ins><span>Chrome</span></a></td><td><a href="http://www.mozilla.org/firefox" target="_blank" class="firefox"><ins></ins><span>Firefox</span></a></td><td><a href="http://www.opera.com/download/" target="_blank" class="opera"><ins></ins><span>Opera</span></a></td><td><a href="http://ie.microsoft.com/" target="_blank" class="ie"><ins></ins><span>Internet Explorer</span></a></td></tr></tbody></table></div><a href="#" id="reject_close" class="close"></a></div>';

	reject.onclick = function(){
		reject.className = 'opened';
	};

	var links = reject.getElementsByTagName('a');

	for(var i = links.length - 1; i >= 0; i--) {
		links[i].onclick = function(e){
		
			if(e && e.stopPropagation){
				e.stopPropagation();
			}

			else{
				e = window.event;
				e.cancelBubble = true;
			}

			reject.className = '';
			setCookie('reject_closed', true);

			if(this.href.slice(-1) == '#'){
				return false;
			}
		};
	};	

	if(getCookie('reject_closed') === undefined){
		reject.className = 'opened';
	}

	document.body.insertBefore(reject, document.body.childNodes[0]);
});