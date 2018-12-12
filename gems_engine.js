function startGame() {
	gameArea.start();
	console.log("ready");
}

let gameArea = {
	canvas : document.getElementById("myc"),
	objects : [],
	time : 0,
	msrefresh : 20,
	
	update : function() {
		let delta = new Date() - gameArea.time * gameArea.msrefresh;
		if(delta >= gameArea.msrefresh){
			gameArea.time = Math.floor(new Date()/gameArea.msrefresh);
			let ctx = gameArea.context;
			ctx.clearRect(0, 0, gameArea.canvas.width,gameArea.canvas.height);
			gameArea.objects.forEach(function(obj){
				if(obj.update != undefined)
					obj.update();
			});
			gameArea.objects.forEach(function(obj){
				if(obj.draw != undefined)
					obj.draw(ctx);
			});
		}
		window.requestAnimationFrame(gameArea.update);
	},
	
	start : function(){
		this.canvas.width = 900;
		this.canvas.height = 720;
		this.context = this.canvas.getContext("2d");
		
		window.requestAnimationFrame(gameArea.update);
		
		document.onkeydown = function(e) {
			switch (e.keyCode) {

			}
		}
		
		this.canvas.addEventListener('mousedown', function(event){
			let x = event.offsetX;
			let y = event.offsetY;
		}, false);
		
		this.canvas.addEventListener('mouseup', function(event){
			let x = event.offsetX;
			let y = event.offsetY;
		}, false);
		
		this.canvas.addEventListener('mousemove', function(event){
			let x = event.offsetX;
			let y = event.offsetY;
		}, false);
	}
};