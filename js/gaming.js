	var cv = document.getElementById('canvas');
	WebFontConfig = {
    google: { families: [ 'Sansita+One::latin', 'Ubuntu::latin', 'Kanit::latin', 'Fira+Sans::latin' ] }
	};
	(function(){
	var wf = document.createElement("script");
	wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js';
	wf.async = 'true';
	document.head.appendChild(wf);
	})();

	function Game(canvas,w,h){
		var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;


		var Logo,MainNumber,AllNUmbers,StarButton,
			Main_number,Numbers,Score,ButtonsGameOver =[];
		//canvas size
 		canvas.width = w;
		canvas.height = h;

		var ctx = canvas.getContext("2d");
		var state = 'init';
		var level = 1;
		var rows = 10;
		
		var unit = function(U){
			return U*(canvas.width/rows);
		}
		
		var textColor = {
			yellow:"#FFFF00",
			white:"#fff"
		}
		var colors =[
			{h:"#006000",m:"#009B00",s:"#00CF0F"},
			{h:"#A504A5",m:"#AE12B2",s:"#FF00EE"},
			{h:"#003399",m:"#005BB5",s:"#0068FF"},
			{h:"#310389",m:"#4C0BB2",s:"#6C0CEA"},
			{h:"#89032D",m:"#A80530",s:"#E80F42"},
			{h:"#9B4607",m:"#C65A10",s:"#E57010"}
		];
		var color = randomNum(0,colors.length-1);
		canvas.style.backgroundColor = colors[color].h;

		function font(z){
			return(unit(z))+"px Fira sans";
		}
		function randomNum(min,max){

			return Math.floor(Math.random() * (max - min + 1)) + min;

		}
		function logo(){
			this.centerX = unit(5);
			this.centerY = unit(4);
			this.radius = unit(2)
			this.font = font(1);
			this.count = 0;
			this.kill = false;
			this.draw = function(){
				//circulo grande
				this.count++
				if(this.count > 170){
					this.centerY-=20	
				}
				if(this.centerY < (-1*this.radius*3)){
						state = 'start';
						this.kill = true;
				}
				ctx.beginPath();
				ctx.arc(this.centerX, this.centerY,this.radius, 0, ((this.count*2)/150) * Math.PI, false);
				ctx.strokeStyle = textColor.yellow;
				ctx.lineWidth = 10;
				ctx.stroke();
				ctx.closePath();


				// circulos orizontales
				ctx.beginPath();
				ctx.arc(this.centerX - unit(1) , this.centerY,(this.radius/4), 0, 2 * Math.PI, false);
				ctx.fillStyle = textColor.yellow.color;
				ctx.fill();
				ctx.closePath();

				ctx.beginPath();
				ctx.arc(this.centerX + unit(1) , this.centerY,(this.radius/4), 0, 2 * Math.PI, false);
				ctx.fillStyle = textColor.yellow;
				ctx.fill();
				ctx.closePath();

				ctx.beginPath();
				ctx.arc(this.centerX , this.centerY - unit(1) ,(this.radius/4), 0, 2 * Math.PI, false);
				ctx.fillStyle = textColor.yellow;
				ctx.fill();
				ctx.closePath();

				ctx.beginPath();
				ctx.arc(this.centerX , this.centerY + unit(1),(this.radius/4), 0, 2 * Math.PI, false);
				ctx.fillStyle = textColor.yellow;
				ctx.fill();
				ctx.closePath();
			
				ctx.font = this.font;
				ctx.fillStyle = textColor.yellow;
				ctx.textAlign = "center";
				ctx.fillText("sumisup",this.centerX,this.centerY+ unit(3));




			}
		}
		function starButton(){
			this.centerX = unit(5);
			this.centerY = unit(7);
			this.radius = unit(2)
			this.fontsize = 1;
			this.font = "20px Kanit"
			this.animate = false;
			this.count = 0;
			this.kill = false;
			this.draw  = function(){
				ctx.beginPath();
				ctx.arc(this.centerX, this.centerY,this.radius, 0, 2 * Math.PI, false);
				ctx.fillStyle = colors[color].m;
				ctx.fill();
				ctx.closePath();
				if(this.animate == true){
					this.count+=20;
					this.font = font(this.fontsize-=0.2);
					ctx.beginPath();
					ctx.arc(this.centerX, this.centerY,this.count, 0, 2 * Math.PI, false);
					ctx.fillStyle = colors[color].s;
					ctx.fill();
					ctx.closePath();
					if(this.count > this.centerX*4 ){
						this.kill = true;
						state = 'game'
						canvas.style.backgroundColor = colors[color].s
					}
				}

				ctx.font = this.font;
				ctx.fillStyle = textColor.white;
				ctx.textAlign = "center";
				ctx.fillText("Start",this.centerX,this.centerY);


			}
		}





		function MainNumber(value){
		 	this.radius = canvas.width/9;
			this.centerX = canvas.width/2;
			this.centerY = canvas.height/8;
			this.value = value;
			this.adittion = 0;
			this.aditionSum = 0;
			this.state ="init";
			this.draw = function(){

				ctx.beginPath();
				ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
				ctx.strokeStyle = colors[color].m;
				ctx.lineWidth = 14;
				ctx.stroke();
				ctx.closePath();
			//middel
				ctx.beginPath();
				//console.log(this.aditionSum,this.adittion)
				if(this.aditionSum < this.adittion){
					this.aditionSum+=0.5;
					ctx.arc(this.centerX, this.centerY, this.radius, 0, (2 * this.aditionSum) / this.value * Math.PI, false);
				}else{
					ctx.arc(this.centerX, this.centerY, this.radius, 0, (2 * this.aditionSum) / this.value * Math.PI, false);
				}
				if(this.adittion== this.value){
					LevelUp()
				}else if(this.adittion > this.value){
					GameOver();
				}
				if(this.state == 'gameover'){
					this.centerY-=10;
					if(this.centerY < this.radius*-1){
						state = 'share'
					}
				}
				ctx.lineWidth = 14;
				ctx.strokeStyle = textColor.yellow;
				ctx.stroke();
				ctx.closePath();
			//top

				ctx.beginPath();
				ctx.arc(this.centerX-this.radius, this.centerY-this.radius-this.radius/4, this.radius/2, 0, 2 * Math.PI, false);
				ctx.fillStyle = colors[color].m;
				ctx.fill();
				ctx.closePath();
				
				ctx.font = "20px Arial";
				ctx.fillStyle = textColor.yellow;
				ctx.textAlign = "center";
				ctx.fillText(this.adittion,this.centerX-this.radius,this.centerY-this.radius);

				ctx.font = "30px Arial";
				ctx.fillStyle = textColor.yellow;
				ctx.textAlign = "center";
				ctx.fillText(this.value,this.centerX,this.centerY+parseInt(this.radius/3));
			}
		}

		function number(radius,centerX,centerY,value,speed){
			this.radius = radius;
			this.centerX =centerX;
			this.centerY =centerY;
			this.value = value;
			this.speed = speed;
			this.state = "static";
			this.draw = function(){
				if(this.state == 'static'){

					if(this.centerX > this.radius*-2){
						this.centerX-= this.speed;
					}else{
						this.centerX  = canvas.width+parseInt(this.radius*2);	
						this.centerY  = randomNum(canvas.height-this.radius*4,this.radius*4);
						this.value = Math.round(randomNum(1,Main_number.value)/2)
						this.speed = randomNum(1,5);		
					}
				}
				if(this.state == 'touched'){
					if(this.centerX < Main_number.centerX){
						this.centerX+=20;
					}else if(this.centerX > Main_number.centerX){
						this.centerX-=20;
					}
					if(this.centerY < 0){
						Main_number.adittion = Main_number.adittion + this.value;
						this.state = "static"
						this.centerX  = canvas.width+parseInt(this.radius*2);	
						this.centerY  = randomNum(canvas.height-this.radius*4,this.radius*4);
						this.value = Math.round(randomNum(1,Main_number.value)/2)
						this.speed = randomNum(1,5);	
					}
					this.centerY-=20;
				}
				if(this.state =='gameover'){
					this.centerY+=10
				}
				ctx.beginPath();
				ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
				ctx.fillStyle = colors[color].h;
				ctx.fill();
				
				ctx.font = font(1)
				ctx.fillStyle = textColor.yellow;
				ctx.textAlign = "center";
				ctx.fillText(this.value,this.centerX,this.centerY+parseInt(this.radius/2));
				ctx.closePath();
			}
		}
		function drawNumbers(){
			Numbers =[];
			var radius = canvas.height/20;
			var centerX =canvas.width/10*13;
			var centerY =canvas.height/10*8;
			var value = 1;
			for(var i = 0; i < 5;i++){
				centerY = randomNum(radius*4,canvas.height-radius*4);
				var num = new number(radius,centerX+(i*radius*2.5),centerY,Math.round(randomNum(Main_number.value,1)/2),randomNum(1,5))
				Numbers.push(num);
			}

		}
		function score(){
			this.centerX = unit(5);
			this.centerY = unit(4);
			this.radius = unit(2)
			this.value = 0;
			this.adittion = 0;
			this.aditionSum = 0;
			this.state ="init";
			this.time = 4000;
			this.extrapoints = 0;
			this.score = function(){
				this.time--;
				this.value = Math.round((level*100)+this.extrapoints);

			}
			this.timepoint = function(){
				this.extrapoints +=Math.round(this.time/100)
			}

			this.draw=function(){

			ctx.beginPath();
			ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
			ctx.fillStyle = colors[color].h;
			ctx.fill();
			ctx.closePath();

			// begin custom shape
			ctx.beginPath();
			ctx.arc(this.centerX, this.centerY-unit(1/2), this.radius/2, 0, 2/2 * Math.PI, false);
			ctx.rect(this.centerX-(unit(2/3)/2),this.centerY, unit(2/3), unit(2/3));
			ctx.rect(this.centerX-(unit(1)/2),this.centerY+unit(2/3), unit(1), unit(1/5));
			ctx.fillStyle = textColor.yellow;
			ctx.fill();
			ctx.closePath();



				ctx.font = unit(1);
				ctx.fillStyle = textColor.yellow;
				ctx.textAlign = "center";
				ctx.fillText(this.value,this.centerX,this.centerY+ unit(3));

			}
		}
		function buttonEnd(c,icon){
			var X = canvas.width/2;
			this.radius = canvas.width/12;
			this.centerX = X+(c*(this.radius*3));
			this.centerY = canvas.height/8 * 6;
			this.icon = icon;
			
			this.draw = function(){
				ctx.beginPath();
				ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
				ctx.fillStyle = colors[color].h;
				ctx.fill();
				ctx.closePath();

				switch(this.icon){
					case 'start':
						ctx.beginPath();
						ctx.rect(this.centerX+this.radius/4,this.centerY-this.radius/4*2,this.radius/3,this.radius/3);
						ctx.fillStyle = textColor.yellow;
						ctx.fill();
						ctx.closePath();

						ctx.beginPath();
						ctx.rect(this.centerX+this.radius/4,this.centerY + this.radius/4,this.radius/3,this.radius/3);
						ctx.fillStyle = textColor.yellow;
						ctx.fill();
						ctx.closePath();

						ctx.beginPath();
						ctx.rect(this.centerX-this.radius/4*2,this.centerY-this.radius/4*2,this.radius/3,this.radius/3);
						ctx.fillStyle = textColor.yellow;
						ctx.fill();
						ctx.closePath();

						ctx.beginPath();
						ctx.rect(this.centerX-this.radius/4*2,this.centerY + this.radius/4,this.radius/3,this.radius/3);
						ctx.fillStyle = textColor.yellow;
						ctx.fill();
						ctx.closePath();

						break;	
					case 'game':


						ctx.beginPath();
						ctx.arc(this.centerX, this.centerY, this.radius/2, 180, 5 * Math.PI, false);
						ctx.fillStyle = textColor.yellow
						ctx.lineWidth = 2
						ctx.stroke();
						ctx.closePath();
						
						ctx.beginPath();
						ctx.moveTo(this.centerX - this.radius/2 , this.centerY - this.radius/8)
						ctx.lineTo(this.centerX - this.radius/2 - this.radius/8 , this.centerY+this.radius/8)
						ctx.lineTo(this.centerX - this.radius/2 + this.radius/8 , this.centerY+this.radius/8)
						ctx.lineTo(this.centerX - this.radius/2 , this.centerY - this.radius/8)
						ctx.fillStyle = textColor.yellow
						ctx.fill();
						ctx.lineWidth = 2;
						ctx.stroke()
						ctx.closePath();
						break;	
					case 'share':
						ctx.beginPath();
						ctx.arc(this.centerX+((this.radius/10)*4), this.centerY-((this.radius/10)*4), this.radius/7, 0, 2 * Math.PI, false);
						ctx.fillStyle = textColor.yellow;
						ctx.fill();
						ctx.closePath();


						ctx.beginPath();
						ctx.arc(this.centerX-((this.radius/10)*4), this.centerY, this.radius/7, 0, 2 * Math.PI, false);
						ctx.fillStyle = textColor.yellow;
						ctx.fill();
						ctx.closePath();

						ctx.beginPath();	
						ctx.arc(this.centerX+((this.radius/10)*4), this.centerY+((this.radius/10)*4),this.radius/7, 0, 2 * Math.PI, false);
						ctx.fillStyle = textColor.yellow;
						ctx.fill();
						ctx.closePath();

						ctx.beginPath();
						ctx.moveTo(this.centerX+((this.radius/10)*4),this.centerY-((this.radius/10)*4));
						ctx.lineTo(this.centerX-((this.radius/10)*4),this.centerY);
						ctx.lineTo(this.centerX+((this.radius/10)*4),this.centerY+((this.radius/10)*4));
						ctx.lineWidth = 2;
						ctx.strokeStyle = textColor.yellow;
						ctx.stroke();
						ctx.closePath();

					break;	
				}
				
		
			}

		}
		function drawButtonsEnd(){
			var icons =['start','game','share']
			var i = -1;
			icons.forEach(function(icon){
				var button = new buttonEnd(i,icon)
				console.log(icon)
				ButtonsGameOver.push(button);
				i++;

			})
		}
		function LevelUp(){
			
			level++;
			Score.timepoint();
			drawNumbers();
			color = randomNum(0,colors.length-1);
			Main_number = new MainNumber(randomNum(1,(level*10)))
			canvas.style.backgroundColor= colors[color].s

		}
		function GameOver(){
			Numbers.forEach(function(num){
				num.state = 'gameover';
			})
			Main_number.state ='gameover';
		}
		function initGame(){
			Score = new score();
			Logo = new logo();
			StarButton = new starButton();
			Main_number = new MainNumber(randomNum(2,2));
			drawNumbers();
			drawButtonsEnd();
			canvas.style.backgroundColor = colors[color].h
		}
		initGame();
		(function DrawGame(){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			switch(state){
				case 'init':
					Logo.draw();
					break;
				case 'start':
					StarButton.draw();
					break;
				case 'game':
					Main_number.draw();
					Numbers.forEach(function(num){
						num.draw();
					});
					Score.score();
					break;
				case 'share':
					Score.draw();
					ButtonsGameOver.forEach(function(button){
						button.draw();
					});
					break;
			}
			requestAnimationFrame(DrawGame)
			
		})()


		function trueTouch(element,e,result){
			var x = e.pageX
			var y = e.pageY
			if (y > element.centerY - element.radius && y < element.centerY + element.radius 
			&& x > element.centerX - element.radius && x < element.centerX + element.radius) {
				result(true);
			}else{
				result(false);
			}
		}
		canvas.addEventListener('click',function(e){
			switch(state){
				case 'start':
				trueTouch(StarButton,e,function(result){
					StarButton.animate = result;
				})
				break;
				case 'game':
				Numbers.forEach(function(num){
					trueTouch(num,e,function(result){
						if(result){
							num.state ='touched'
						}
					})
				})
				break;
				case 'share':
				ButtonsGameOver.forEach(function(button){
					trueTouch(button,e,function(result){
						if(result){
							state = button.icon;
							initGame();
						}
					})
				})

			}
		},false)
	} 

var game = new Game(cv,300,600);
