var seq = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function fillRandomSquare() {
	var unPlayed = [];
	$('.square').each(function(){
		if(parseInt($(this).attr("data-value"))==0){
			unPlayed.push($(this).attr("data-node"))
		}
	});
	var datanode = unPlayed[Math.floor(Math.random() * unPlayed.length)];
	$('[data-node="'+datanode+'"').addClass("disabled fa-circle-o").removeClass("active").attr("data-value","-1");
	}
function identifyPotentialWinner () {
	for (var i in seq){
		var sum=0;
		for (var j in seq[i]) {
			sum+=parseInt($('[data-node="'+seq[i][j]+'"').attr("data-value"));
		}
		if(sum==2) {
			return i;
		}
	}
	return 0;
}
function identifyPotentialAIWinner () {
	for (var i in seq){
		var sum=0;
		for (var j in seq[i]) {
			sum+=parseInt($('[data-node="'+seq[i][j]+'"').attr("data-value"));
		}
		if(sum==-2) {
			return i;
		}
	}
	return 0;
}
function identifyWinner () {
	for (var i in seq){
		var sum=0;
		for (var j in seq[i]) {
			sum+=parseInt($('[data-node="'+seq[i][j]+'"').attr("data-value"));
		}
		if(sum==3) {
			for (var j in seq[i]) {
				$('[data-node="'+seq[i][j]+'"').addClass("winner");
			}
			$('.square').each(function(){
				$(this).addClass("disabled").removeClass("active");
				
			});
		}
	}
	return 0;
}
function identifyAIWinner () {
	for (var i in seq){
		var sum=0;
		for (var j in seq[i]) {
			sum+=parseInt($('[data-node="'+seq[i][j]+'"').attr("data-value"));
		}
		if(sum == -3) {
			for (var j in seq[i]) {
				$('[data-node="'+seq[i][j]+'"').addClass("winner");
			}
			$('.square').each(function(){
				$(this).addClass("disabled").removeClass("active");
				
			});
		}
	}
}
function resetBoard(){
	$('.square').each(function(){
		$(this).addClass("active").removeClass("winner disabled fa-circle-o fa-times").attr("data-value",0);
		
	});
}
$(document).ready(function(){
	$('.wrapper').on('click', '.active', function(){
		$(this).addClass("disabled fa-times").removeClass("active").attr("data-value","1");
		if(!identifyWinner()) {
			if(identifyPotentialAIWinner()){
				var i = identifyPotentialAIWinner();
				for (var j in seq[i]) {
					$('[data-node="'+seq[i][j]+'"').addClass("winner");
					if($('[data-node="'+seq[i][j]+'"').hasClass("active")){
						$('[data-node="'+seq[i][j]+'"').addClass("disabled fa-circle-o").removeClass("active").attr("data-value","-1");
						setTimeout(identifyAIWinner,100);
					}
				}
			}
			else if(identifyPotentialWinner()){
				var i = identifyPotentialWinner();
				for (var j in seq[i]) {
					if($('[data-node="'+seq[i][j]+'"').hasClass("active")){
						$('[data-node="'+seq[i][j]+'"').addClass("disabled fa-circle-o").removeClass("active").attr("data-value","-1");
					}
				}
			}
			else {
				fillRandomSquare();
			}
		}
		else {
			
		}
	});
	$('button').click(function(){
		resetBoard();
	});
});