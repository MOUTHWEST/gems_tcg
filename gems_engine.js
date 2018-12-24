function startGame() {
	gameArea.start();
	console.log("ready");
}

var gameArea = {
	canvas : document.getElementById("myc"),
	objects : [],
	time : 0,
	msrefresh : 20, // 20ms per frame at best
	keys : {},
	
	update : function() {
		// This is run once every {msrefresh} milliseconds, if possible*
		//   *requestAnimationFrame only runs when active window, all other code finishes, etc.
		let delta = new Date() - gameArea.time * gameArea.msrefresh;
		if(delta >= gameArea.msrefresh){
			gameArea.time = Math.floor(new Date()/gameArea.msrefresh);

			let dict = {
				// add more here as seen fit
				cnv: gameArea.canvas,
				ctx: gameArea.context,
				obj: gameArea.objects,
				keys: gameArea.keys,
			};

			// gameArea.context.clearRect(0, 0, gameArea.canvas.width,gameArea.canvas.height);

			// for (var key in gameArea.objects) {
			// 	// skip loop if the property is from prototype
			// 	if (!gameArea.objects.hasOwnProperty(key)) continue;

			// 	var obj = gameArea.objects[key];
			// 	for (var prop in obj) {
			// 		// skip loop if the property is from prototype
			// 		if(!obj.hasOwnProperty(prop)) continue;

			// 		// your code
			// 		if(obj.livetime == undefined){
			// 			if(obj.init != undefined)
			// 				obj.init(dict);
			// 			obj.livetime = 0;
			// 		}
			// 		if(obj.update != undefined)
			// 			obj.update(dict);
			// 		if(obj.draw != undefined)
			// 			obj.draw(dict);
			// 		obj.livetime += 1;
			// 	}
			// }

			Object.keys(gameArea.keys).forEach(function(key) {
				//increment held keys' times
				if(key in gameArea.keys){
					gameArea.keys[key] += 1;
				}
			});
		}
		window.requestAnimationFrame(gameArea.update);
	},
	
	start : function(){
		this.canvas.width = document.body.clientWidth
		this.canvas.height = document.body.clientHeight
		this.context = this.canvas.getContext("2d");
		
		// Load initial stage objects here
		this.objects = {
			"ui": create_ui_controller(),
			"board": create_board(),
			"palette": create_palette()
		};

		this.socket = initialiseWebSocket();
		
		window.requestAnimationFrame(gameArea.update);
		
		document.onkeydown = function(e) {
			if (!(e.keyCode in gameArea.keys)){
				gameArea.keys[e.keyCode] = 0;
			}
		}
		
		document.onkeyup = function(e) {
			if (gameArea.keys.hasOwnProperty(e.keyCode)){
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

		this.canvas.addEventListener('click', function(e){
			gameArea.objects["board"].updateColor(e)
		}, false);
	}
};