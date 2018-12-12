function startGame() {
	gameArea.start();
	console.log("ready");
}

let gameArea = {
	canvas : document.getElementById("myc"),
	objects : [],
	time : 0,
	msrefresh : 20,
	keys : {},
	
	update : function() {
		let delta = new Date() - gameArea.time * gameArea.msrefresh;
		if(delta >= gameArea.msrefresh){
			gameArea.time = Math.floor(new Date()/gameArea.msrefresh);
			let dict = {
				cnv: gameArea.canvas,
				ctx: gameArea.context,
				obj: gameArea.objects,
				kys: gameArea.keys,
			};
			gameArea.context.clearRect(0, 0, gameArea.canvas.width,gameArea.canvas.height);
			gameArea.objects.forEach(function(obj){
				if(obj.livetime == undefined){
					if(obj.init != undefined)
						obj.init(dict);
					obj.livetime = 0;
				}
				if(obj.update != undefined)
					obj.update(dict);
				if(obj.draw != undefined)
					obj.draw(dict);
				obj.livetime += 1;
			});
			Object.keys(gameArea.keys).forEach(function(key) {
				//console.log(key)
				if(key in gameArea.keys){
					gameArea.keys[key] += 1;
				}
			});
		}
		window.requestAnimationFrame(gameArea.update);
	},
	
	start : function(){
		this.canvas.width = 900;
		this.canvas.height = 720;
		this.context = this.canvas.getContext("2d");
		
		this.objects = draw_cards();
		window.requestAnimationFrame(gameArea.update);
		
		document.onkeydown = function(e) {
			if(e.keyCode != 116)
				e.preventDefault();
			if(! (e.keyCode in gameArea.keys)){
				gameArea.keys[e.keyCode] = 0;
			}
		}
		
		document.onkeyup = function(e) {
			if(gameArea.keys.hasOwnProperty(e.keyCode)){
				delete gameArea.keys[e.keyCode];
			}
		}
		
		this.canvas.addEventListener('mousedown', function(e){
			e.preventDefault();
			let x = e.offsetX;
			let y = e.offsetY;
		}, false);
		
		this.canvas.addEventListener('mouseup', function(e){
			let x = e.offsetX;
			let y = e.offsetY;
		}, false);
		
		this.canvas.addEventListener('mousemove', function(e){
			let x = e.offsetX;
			let y = e.offsetY;
		}, false);
	}
};