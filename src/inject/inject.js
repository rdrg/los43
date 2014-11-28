
var links = [
	'https://twitter.com/hashtag/yamecanse',
	'https://secure.avaaz.org/es/petition/Enrique_Pena_Nieto_presidente_de_Mexico_Presentacion_ya_de_los_43_estudiantes_de_Ayotzinapa_desaparecidos/?pv=0',
	'http://es.wikipedia.org/wiki/Desaparici%C3%B3n_forzada_en_Iguala_de_2014',
	'https://ayotzinapasomostodos.wordpress.com/2014/10/17/carta-abierta-desde-el-extranjero-ayotzinapasomostodos/',
	'http://ayotzinapasomostodos.com/'
]


var filterHtml = function(html) {
	var start = 0;
	while (true) {
		var idx = html.indexOf('43', start);
		var ok = false;
		var handsOff = false;

		if (idx == -1 || start >= html.length) {
			break;
		}else{
			var checkStr = html.substr(0, idx);
			var atagIdx = checkStr.lastIndexOf('<a');
			var anyTagIdx = checkStr.lastIndexOf('<');
			var endAnyTagIdx = checkStr.lastIndexOf('>');
			var scriptTagIdx = checkStr.lastIndexOf('<script');
			var endScriptTagIdx = checkStr.lastIndexOf('</script');

			if ((anyTagIdx >= 0 && endAnyTagIdx == -1) || (anyTagIdx >= 0 && anyTagIdx > endAnyTagIdx)) {
				handsOff = true;
				start = idx + 2;
			} else if (scriptTagIdx > endScriptTagIdx) {
				handsOff = true;
				start = idx + 2;
			} else if (atagIdx == -1) {
				ok = true;
			} else {
				var endatagIdx =  checkStr.lastIndexOf('</a');
				if (endatagIdx != -1 && endatagIdx > atagIdx) {
					ok = true;
				}
			}

			if (!handsOff && ok) {
				var link = '<a href="'+links[Math.floor(Math.random()*links.length)]+'">43&#8224;</a>';
				html = html.substring(0, idx) + link + html.substring(idx+2);
				start = idx + link.length;
				//console.log("43: add link");
			}else if ( !handsOff ) {
				html = html.substring(0, idx+2) + '&#8224;'+html.substring(idx+2);
				start = idx + 9;
				//console.log("43: add cross");
			}
		}
	}
	return html;
};

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		setTimeout(function () {
			console.log('43: process');
			$('p:contains("43"),h1:contains("43"),h2:contains("43"),h3:contains("43"),h4:contains("43"),h5:contains("43"),div:contains("43"),span:contains("43"),li:contains("43")').each(function(){
				var html = $(this).html();
				html = filterHtml(html);
				$(this).html(html);
			});
		}, 3000)
	}
	}, 10);
});

