(function(){
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;
var canvas = document.getElementById("canvas"),
	centerSpan = document.getElementById("center"),
	ctx = canvas.getContext("2d");
	canvas.width =window.innerHeight;
	centerSpan.style.height = window.innerHeight+ "px";
	canvas.height =window.innerHeight;
		//window.innerHeight-16;
var GameStatus ='init';
var Numbers =[];
function randomNum(max,min){
	 return Math.floor(Math.random() * (max - min + 1)) + min;
}
function number(radius,centerX,centerY,value,speed){
	this.radius = radius;
	this.centerX =centerX;
	this.centerY =centerY;
	this.value = value;
	this.speed = speed;
	this.state = "static";
}

number.prototype.update =function(){
	if(this.state == 'static'){

		if(this.centerX > this.radius*-2){
			this.centerX-= this.speed;
		}else{
			this.centerX  = canvas.width+parseInt(this.radius*2);	
			this.centerY  = randomNum(canvas.height-this.radius*4,this.radius*4);
			this.value = Math.round(randomNum(Main_number.value,1)/2)
			this.speed = randomNum(5,1);		
		}
	}if(this.state == 'touched'){
		if(this.centerX < Main_number.centerX){
			this.centerX+=20;
		}else if(this.centerX > Main_number.centerX){
			this.centerX-=20;
		}
		if(this.centerY < 0){
			this.state = "static"
			this.centerX  = canvas.width+parseInt(this.radius*2);	
			this.centerY  = randomNum(canvas.height-this.radius*4,this.radius*4);
			this.value = randomNum(Main_number.value,1);
			this.speed = randomNum(5,1);	
		}
		this.centerY-=20;
	}
	ctx.beginPath();
	ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#A504A5';
	ctx.fill();
	ctx.font = "30px Arial";
	ctx.fillStyle = "#FFFF00";
	ctx.textAlign = "center";
	ctx.fillText(this.value,this.centerX,this.centerY+parseInt(this.radius/2));
	ctx.lineWidth = 0;
	ctx.strokeStyle = '#A504A5';
	ctx.stroke();
}

function MainNumber(value){
 	this.radius = canvas.width/9;
	this.centerX = canvas.width/2;
	this.centerY = canvas.height/8;
	this.value = value;
	this.adittion = 0;
	this.aditionSum = 0
}
MainNumber.prototype.update = function(){
//background
	ctx.beginPath();
	ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#A504A5';
	ctx.fill();
	ctx.strokeStyle = '#AE12B2';
	ctx.lineWidth = 14;
	ctx.stroke();
//middel
	ctx.beginPath();
	//console.log(this.aditionSum,this.adittion)
	if(this.aditionSum < this.adittion){
		this.aditionSum+=0.5;
		ctx.arc(this.centerX, this.centerY, this.radius, 0, (2 * this.aditionSum) / Main_number.value * Math.PI, false);
	}else{
		ctx.arc(this.centerX, this.centerY, this.radius, 0, (2 * this.aditionSum) / Main_number.value * Math.PI, false);
	}
	ctx.fillStyle = '#A504A5';
	ctx.fill();
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#FFFF00';
	ctx.stroke();
//top
	ctx.beginPath();
	ctx.arc(this.centerX, this.centerY, this.radius-10, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#FF00EE';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#FF00EE';
	ctx.lineWidth = 10;
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(this.centerX-this.radius, this.centerY-this.radius-this.radius/4, this.radius/3, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#A504A5';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#A504A5';
	ctx.lineWidth = 10;
	ctx.stroke();
	
	ctx.font = "20px Arial";
	ctx.fillStyle = "#FFFF00";
	ctx.textAlign = "center";
	ctx.fillText(this.adittion,this.centerX-this.radius,this.centerY-this.radius);

	ctx.font = "30px Arial";
	ctx.fillStyle = "#FFFF00";
	ctx.textAlign = "center";
	ctx.fillText(this.value,this.centerX,this.centerY+parseInt(this.radius/3));
}
function drawPug(){
	return new Pug();
}
function startGame(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	Main_number.update();
	//console.log("mainnumber",Main_number)
	// PugPlus.Update();
	Numbers.forEach(function(num){
		num.update();
	})
	requestAnimationFrame(startGame);
}
// function eventJump(){
// 	// if(PugPlus.state=='static'){
// 		PugPlus.Update('preJump');
// 	// }
// }
canvas.addEventListener('click',function(e){
		var x = event.pageX - canvas.offsetLeft,
	    	y = event.pageY - canvas.offsetTop,
	    	elem = 0
		switch(GameStatus){
			case 'start':	
			Numbers.forEach(function(element) {
				//console.log(element)
				//console.log(y,x,element.posX,element.posY,element.Height,element.Width )
				if (y > element.centerY - element.radius && y < element.centerY + element.radius 
				&& x > element.centerX - element.radius && x < element.centerX + element.radius) {
					// Monedas.splice(i,1)
					Main_number.adittion = Main_number.adittion + element.value;
					//console.log('clicked an element',element);
					if(Main_number.adittion == Main_number.value){
						alert("Felicidades Ganaste :)");
						Main_number = new MainNumber(randomNum(99,2));
					}else if(Main_number.adittion > Main_number.value){
						alert("ouch te pasaste del numero :(");
						Main_number = new MainNumber(randomNum(99,2));
					}else{
						console.log(Main_number.adittion)
					}

					Numbers[elem].state = 'touched';
				}
			elem++
			});
		}
	},false)

function drawNums(){
	var radius = canvas.height/20;
	var centerX =canvas.width/10*13;
	var centerY =canvas.height/10*8;
	var value = 1;
 for(var i = 0; i < 5;i++){
	centerY = randomNum(canvas.height-radius*4,radius*4);
	var num = new number(radius,centerX+(i*radius*2.5),centerY,Math.round(randomNum(Main_number.value,1)/2),randomNum(5,1))
	Numbers.push(num);

	// console.log(num);
 }
}


// var Main_number = new MainNumber(randomNum(99,2));
// drawNums();
// startGame();
})();
