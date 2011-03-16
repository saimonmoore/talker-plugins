//Heavily edited by myself. Originally from https://gist.github.com/238834/e2d0a6ca427fdf02d55ced1fdfb8ed37b2cd8a62
(function(){

plugin.onMessageInsertion = function(event){
	var lastRow = Talker.getLastRow();
	if (!lastRow.length) return;
	var lastP = lastRow.find('div.line');
	if (!lastP.length) return;
	if (lastP.find('iframe.talkerapp-plugin-gist-embed').length) return;
	var gistLink = lastP.find('a[href^=https://gist.github.com]:first');
	if (!gistLink.length) return;
	var gistUrl = gistLink.attr('href');
	var url = gistUrl.split('#');
	var realUrl = url[0];
	var jsonUrl = realUrl + '.json';
	$.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_callback=?&_render=json&_id=29053b7ff74d5086a97cb14ad3ba0aba&url='+encodeURIComponent(jsonUrl), function(data){
		if (!data || !data.value) return;
    var gist = data.value.items[0].div;
    $(gist).appendTo(lastP);
  });
}
})();

