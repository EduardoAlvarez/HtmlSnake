$(document).ready(function(){



	var position = 'right';
	var gameover = false;
	var go = $("<div class='gameover'>Game Over <div class='action'>Tentar Novamente</div></div>");
	var pane = $(".pane");
	var snakePai = $('.snake#1');
	var comida = $('.food');
	var lastPos;
	var score = 0;
	var best = 0;
	var score_place = $(".score-value");
	var best_place = $(".best-value");

	putGrass();

	$(window).keydown(function(e) {
		switch (e.keyCode) {
		case 37:
            if(position != 'right'){
                position = 'left';
            }
			break;
		case 38:
			if(position != 'down'){
                position = 'up';
            }
			break;
		case 39:
            if(position != 'left'){
			 position = 'right';
            }
			break;
		case 40:
            if(position != 'up'){
                position = 'down';
            }
			break;
		}
	});
	setInterval(function(){

		if(gameover == true){
			return;
		}
		var cobras = $('.snake');
		var comida = $('.food');
		movimento(snakePai , cobras);
		circular(snakePai);
		comer(cobras , snakePai);
		inserirComida(comida);

	}, 150);
    var lastSnakePos = 1;
    var lastSnakeEl = $();
	function movimento(snakePai , cobras){

		var oldSnakeTop = snakePai.css('top');
		var oldSnakeLeft = snakePai.css('left');
		snakePai.removeClass('left right up down');
		switch (position) {
			case 'right':
				if(lastPos != 'left'){
					snakePai.css({left: '+=10'});
					lastPos = position;
					snakePai.addClass(position);
				}else{
					snakePai.css({left: '-=10'});
				}
			break;
			case 'left':
				if(lastPos != 'right'){
					snakePai.css({left: '-=10'});
					lastPos = position;
					snakePai.addClass(position);
				}else{
					snakePai.css({left: '+=10'});
				}
			break;
			case 'up':
				if(lastPos != 'down'){
					snakePai.css({top: '-=10'});
					lastPos = position;
					snakePai.addClass(position);
				}else{
					snakePai.css({top: '+=10'});
				}
			break;
			case 'down':
				if(lastPos != 'up'){
					snakePai.css({top: '+=10'});
					lastPos = position;
					snakePai.addClass(position);
				}else{
					snakePai.css({top: '-=10'});
				}
			break;
		}



		cobras.each(function(){

			if($(this).attr('pos') != snakePai.attr('pos') ){
				if($(this).css("top") == snakePai.css("top") &&
					$(this).css("left") == snakePai.css("left")
				){
					gameover = true;
					pane.append(go);
					go.find(".action").click(function(){
						restart(cobras);
						return;
					});
				}

			}
		})
		lastSnakeEl.css('top',oldSnakeTop);
		lastSnakeEl.css('left',oldSnakeLeft);
		//get next last snake piece
		if( (lastSnakePos+1) > cobras.length && cobras.length > 1){
        lastSnakePos = parseInt($(cobras[1]).attr('pos'));
        lastSnakeEl = $(cobras[1]);
    }else{
        lastSnakePos = lastSnakePos+1;
        lastSnakeEl = $(cobras[lastSnakePos-1]);
    }

	}
	function circular(snakePai){
		if(snakePai.position().top < 0){
			snakePai.css('top' , pane.height()-10);
		}
		if(snakePai.position().top > pane.height()-10){
			snakePai.css('top' , '0px');
		}
		if(snakePai.position().left < 0){
			snakePai.css('left' , pane.width()-10);
		}
		if(snakePai.position().left > pane.width()-10){
			snakePai.css('left' , '0px');
		}
	}
	function comer(cobras , snakePai){
		if(
			cobras.css('top') == $(".food").css('top') &&
			cobras.css('left') == $(".food").css('left')
		){
			$('.food').remove();
			var snake = snakePai.clone();
			snake.attr('id' , cobras.size() + 1);
			snake.attr('pos' , cobras.size() + 1);
			pane.append(snake);
			score = score+1;
			score_place.html(score);
			if(best < score){
				best = score;
				best_place.html(best);
			}
		}
	}
	function inserirComida(comida){
		if(comida.size() == 0){
			var food = $("<div class='food' ></div>");
			food.css('top' , 10 * Math.round(Math.random() * (pane.height()-10)/10));
			food.css('left' , 10 * Math.round(Math.random() * (pane.width()-10)/10));
			pane.append(food);
		}
	}

	function restart(cobras){
		pane.find('.gameover').remove();
		pane.find('.food').remove();
		cobras.remove();
		position = 'right';
		pane.append(snakePai);
		inserirComida(comida);
		snakePai.css('top',0);
		snakePai.css('left',0);
		gameover = false;
		score = 0;
		score_place.html(score);
	}

	function putGrass(){
		var grass = $("<div class='grass' ></div>");
		for(var i = 0 ; i < 5 ; i++){
			grass.css('top' , 10 * Math.round(Math.random() * (pane.height()-10)/10));
			grass.css('left' , 10 * Math.round(Math.random() * (pane.width()-10)/10));
			pane.append(grass.clone());
		}
	}

});
