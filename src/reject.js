/* finalReject v0.1 | http://github.com/codefucker/finalReject/
 * © Anatoly Lunev | toliklunev.ru | toliklunev@gmail.com
 * Licensed under the MIT License */


var script = document.getElementsByTagName('script');
script = script[script.length - 1];

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
	var text = script.getAttribute('data-text');
	
	// var head = document.head || document.getElementsByTagName('head')[0];
	// var style = document.createElement('style');

	// style.type = 'text/css';
	
	// var css = '#reject{font-family:Verdana, serif;display:block;background:#FFF;position:fixed !important;position:absolute;top:0;left:0;right:0;width:100%;z-index:10000;filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=70)}#reject *{margin:0;padding:0;border:0;outline:0}#reject .info{padding:5px 0;z-index:1}#reject .info .close{display:none;background-image:url("c.jpg");position:absolute;top:20px;right:20px;width:29px;height:30px;cursor:pointer}#reject .info .close:hover{background-position:0 bottom}#reject .info p{text-align:center;font-size:13px;line-height:15px}#reject .info p span{color:#333;border-bottom:1px dashed}#reject .info div{display:none;width:900px;max-width:100%;margin:10px auto 0}#reject .info table{border-collapse:collapse;border-spacing:0;width:100%;table-layout:fixed}#reject .info table td{text-align:center}#reject .info td a{display:block;color:#009CF5;font-size:13px;line-height:15px}#reject .info td a:hover{color:#F33}#reject .info td a ins{background:url("bs.jpg");display:block;width:50px;height:50px;margin:0 auto;cursor:pointer}#reject .info td a.firefox ins{background-position:0 -50px}#reject .info td a.opera ins{background-position:0 -100px}#reject .info td a.ie ins{background-position:0 -150px}#reject:hover,#reject.opened{filter:none}#reject:hover .info div,#reject.opened .info div{display:block}#reject:hover .info p span,#reject.opened .info p span{border-bottom-color:#FFF}#reject.opened{position:fixed !important;position:static;background:url("bg.png");height:100%}#reject.opened .info{border:3px solid #000;background:#FFF;position:absolute;left:0;top:0;left:50%;top:50%;padding:30px 30px 50px;margin:-161px 0 0 -400px;width:740px;height:242px;box-sizing:content-box}#reject.opened .info .close{display:block}#reject.opened .info div{width:auto}#reject.opened .info td a{font-size:17px;line-height:20px;font-weight:bold}#reject.opened .info td a ins{background:url("b.jpg");width:128px;height:128px}#reject.opened .info td a.firefox ins{background-position:0 -128px}#reject.opened .info td a.opera ins{background-position:0 -256px}#reject.opened .info td a.ie ins{background-position:0 -384px}#reject.opened .info p{text-align:left;font-size:20px;line-height:22px;margin-right:30px;margin-bottom:40px}';
	
	// if (style.styleSheet){
	// 	style.styleSheet.cssText = css;
	// }
	
	// else {
	// 	style.appendChild(document.createTextNode(css));
	// };
	
	// head.appendChild(style);
	
	if(!text){
		text = 'К сожалению, браузер, которым вы пользуйтесь, устарел, и не может нормально отображать сайт. Пожалуйста, скачайте любой из следующих браузеров:';
	};

	reject.id = 'reject';
	reject.innerHTML = '<div class="info"><p><span>' + text + '</span></p><div><table><tbody><tr><td><a href="https://www.google.com/chrome/" target="_blank" class="chrome"><ins></ins><span>Chrome</span></a></td><td><a href="http://www.mozilla.org/firefox" target="_blank" class="firefox"><ins></ins><span>Firefox</span></a></td><td><a href="http://www.opera.com/download/" target="_blank" class="opera"><ins></ins><span>Opera</span></a></td><td><a href="http://ie.microsoft.com/" target="_blank" class="ie"><ins></ins><span>Internet Explorer</span></a></td></tr></tbody></table></div><a href="#" id="reject_close" class="close"></a></div>';

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