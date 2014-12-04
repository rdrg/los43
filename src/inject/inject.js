
var links = [
	'https://twitter.com/hashtag/yamecanse',
	'https://secure.avaaz.org/es/petition/Enrique_Pena_Nieto_presidente_de_Mexico_Presentacion_ya_de_los_43_estudiantes_de_Ayotzinapa_desaparecidos/?pv=0',
	'http://es.wikipedia.org/wiki/Desaparici%C3%B3n_forzada_en_Iguala_de_2014',
	'https://ayotzinapasomostodos.wordpress.com/2014/10/17/carta-abierta-desde-el-extranjero-ayotzinapasomostodos/',
	'http://ayotzinapasomostodos.com/'
]

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		setTimeout(function () {
			//console.log('43: process');
			$("div,p,h1,h2,h3,h4,h5,h6,ul,ol,em,span,a").contents().filter( function () { return (this.nodeType == 3 && this.textContent.match(/43/));}).each(function (i, txtNode) {
			    var insideLink = !!$(this).closest('a').size();
			    if (insideLink) {
			        txtNode.textContent = txtNode.textContent.replace(/43/g, "43†");
			    }else{
			        var newNode = document.createElement("span");
			        
			        $(newNode).html(txtNode.textContent.replace(/43/g, function () {
			            return '<a href="'+links[Math.floor(Math.random()*links.length)]+'">43&#8224;</a>';
			        }));
			        var pnode = txtNode.parentNode;
			        pnode.replaceChild(newNode, txtNode);
			    }
			} );
		}, 3000)
	}
	}, 10);
});
