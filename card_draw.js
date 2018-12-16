function draw_cards(){
	
	function save_card(card,ctx){
		let cnv2 = document.createElement('canvas');
		
		//draw bkgd
		let colorlist = {
			red: [[255,0,0],[120,0,0],[255,60,60]],
			pink: [[255,160,160],[200,60,120],[255,190,190]],
			white: [[240,240,240],[150,150,170],[255,255,255]],
			silver: [[130,130,130],[70,70,70],[200,200,170]],
			black: [[10,10,30],[0,0,0],[60,30,20]],
			bronze: [[130,100,50],[80,30,30],[180,130,60]],
			orange: [[200,130,20],[130,80,0],[255,100,70]],
			yellow: [[230,200,0],[140,160,0],[255,255,0]],
			green: [[50,200,30],[0,120,30],[60,255,60]],
			aqua: [[120,240,240],[60,200,160],[180,200,255]],
			blue: [[50,50,255],[30,0,100],[100,140,255]],
			violet: [[160,40,200],[120,20,180],[255,100,200]],
			multi: [[200,255,255],[250,150,150],[225,255,128]],
		};
		
		let edgewidth = 10;
		
		ctx.fillStyle = 'rgb(' + colorlist[card.color][0].join(',') + ')';
		ctx.fillRect(0,0,500,700);
		for(let i = 0; i < 500; i += 20){
			for(let j = 0; j < 700; j += 20){
				let c = 'rgba(' + colorlist[card.color][1].join(',');
				if(Math.random() > .5)
					c = 'rgba(' + colorlist[card.color][2].join(',');;
				ctx.fillStyle = c + ',' + Math.random() + ')';
				ctx.fillRect(i,j,20,20);
			}
		}
		ctx.fillStyle = 'rgba(128,128,128,.5)';
		ctx.fillRect(0,0,500,700);
		
		//draw title
		ctx.fillStyle = 'rgba(0,0,0,.7)';
		ctx.fillRect(20,20,460,70);
		ctx.font = '60px sans-serif';
		ctx.fillStyle = 'white';
		ctx.fillText(card.title,25,75,450);
		
		//draw grid
		ctx.fillStyle = 'rgb(75,50,40)'
		ctx.fillRect(100-edgewidth/2,130-edgewidth/2,300+edgewidth,300+edgewidth);
		
		let gridrows = card.cost.split('|');
		let g_h = gridrows.length;
		let g_w = gridrows[0].length;
		let sqsize = 60;
		let prop_h = g_h*sqsize;
		let prop_w = g_w*sqsize;
		
		let cmap = {
			'R': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.red[x].join(',') + ')'}),
			'O': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.orange[x].join(',') + ')'}),
			'G': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.green[x].join(',') + ')'}),
			'B': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.blue[x].join(',') + ')'}),
			'W': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.white[x].join(',') + ')'}),
			'K': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.black[x].join(',') + ')'}),
			'*': ['rgb(255,100,100)','rgb(0,150,0)','rgb(128,128,255)','rgb(180,180,0)','rgb(210,210,230)'],
			'_': ['rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,0)'],
		};
		
		let cx = 250;
		let cy = 280;
		for(let i = 0; i < gridrows.length; i++){
			for(let j = 0; j < gridrows[0].length; j++){
				for(let k = 0; k < 5; k++){
					ctx.fillStyle = cmap[gridrows[i][j]][k];
					switch(k){
						case 0:	ctx.fillRect(sqsize*j + cx-prop_w/2, sqsize*i + cy-prop_h/2, sqsize/2, sqsize/2); break;
						case 1: ctx.fillRect(sqsize*(j+.5) + cx-prop_w/2, sqsize*i + cy-prop_h/2, sqsize/2, sqsize/2); break;
						case 2:	ctx.fillRect(sqsize*(j+.5) + cx-prop_w/2, sqsize*(i+.5) + cy-prop_h/2, sqsize/2, sqsize/2); break;
						case 3: ctx.fillRect(sqsize*j + cx-prop_w/2, sqsize*(i+.5) + cy-prop_h/2, sqsize/2, sqsize/2); break;
						case 4: ctx.fillRect(sqsize*(j+.2) + cx-prop_w/2, sqsize*(i+.2) + cy-prop_h/2, sqsize*.6, sqsize*.6); break;
					}
				}
			}
		}
		ctx.fillStyle = 'rgb(75,50,40)';
		for(let i = 0; i <= gridrows.length; i++)
			ctx.fillRect(cx-prop_w/2, cy-edgewidth/2-prop_h/2 + i*sqsize, prop_w, edgewidth);
		for(let j = 0; j <= gridrows[0].length; j++)
			ctx.fillRect(cx-edgewidth/2-prop_w/2 + j*sqsize, cy-prop_h/2, edgewidth, prop_h);
		
		//draw description
		ctx.fillStyle = 'rgba(0,0,0,.7)';
		ctx.fillRect(20,450,460,230);
		ctx.font = '40px sans-serif';
		ctx.fillStyle = 'white';
		
		let maxwidth = 450;
		let x = 25;
		let y = 485;
		let words = card.desc.split(' ');
		let linepart = '';
		for(let n = 0; n < words.length; n++){
			let textline = linepart + words[n];
			if(ctx.measureText(textline).width > maxwidth && n > 0){
				ctx.fillText(textline,x,y,maxwidth);
				linepart = '';
				y += 40;
			} else {
				linepart = textline + ' ';
			}
		}
		ctx.fillText(linepart,x,y,maxwidth);
		
		//save image
		let imagedata = ctx.getImageData(0,0,500,700);
		let img = new Image(500,700);
		
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,500,700);
		
		cnv2.width = 500;
		cnv2.height = 700;
		let ctx2 = cnv2.getContext('2d');
		ctx2.putImageData(imagedata,0,0);
		let imguri = cnv2.toDataURL('image/png');
		img.src = imguri;
		
		cnv2.height = 110;
		ctx2.putImageData(imagedata,0,0);
		let imguri2 = cnv2.toDataURL('image/png');
		let img2 = new Image(500,110);
		img2.src = imguri2;
		
		return [img,img2];
	}
	
	let cardlisting = {name:'cardlisting'};
	cardlisting.init = function(dict){
		/*this.images = {};
		this.mini = {};
		for(let card in Object.keys(cardlist)){
			this.images[card] = save_card(cardlist[card],dict['ctx'])[0];
			this.mini[card] = save_card(cardlist[card],dict['ctx'])[1];
		}*/
		this.toshow = Object.keys(cardlist).length;
		this.cl = this.toshow;
	};
	cardlisting.draw = function(dict){
		let w = 1;
		let h = 0;
		let tw = 1280.0;
		let th = 720.0;
		while(w*h < this.toshow){
			w += 1;
			h = Math.floor(th*w/(tw*1.4));
		}
		for(let card = 0; card < this.toshow; card++){
			dict['ctx'].drawImage(cardimages.images[card%this.cl],
							(tw/w)*(card%w + .05),
							(th/h)*(Math.floor(card/w) + .05),
							tw/w * .9,
							tw*1.4/w * .9);
		}
	};
	cardlisting.update = function(dict){
		if(dict['keys'].hasOwnProperty(37) && dict['keys'][37] == 0){
			if(this.toshow > 1)
				this.toshow--;
		}
		if(dict['keys'].hasOwnProperty(39) && dict['keys'][39] == 0){
			this.toshow += 100;
		}
	};
		
	// OUTDATED
	/*
	let activecard = {name:'activecard'};
	activecard.init = function(dict){
        this.colordict = ['red','pink','white','gray','black','bronze','orange','yellow','green','aqua','blue','violet','multi'];
		this.color = 0;
		this.colorlist = {
			red: [[255,0,0],[120,0,0],[255,30,30]],
			pink: [[255,160,160],[200,60,120],[255,190,190]],
			white: [[240,240,240],[150,150,170],[255,255,255]],
			gray: [[130,130,130],[70,70,70],[200,200,170]],
			black: [[10,10,30],[0,0,0],[60,30,20]],
			bronze: [[130,100,50],[80,30,30],[180,130,60]],
			orange: [[200,130,20],[130,80,0],[255,100,70]],
			yellow: [[230,200,0],[140,160,0],[255,255,0]],
			green: [[50,200,30],[0,120,30],[60,255,60]],
			aqua: [[120,240,240],[60,200,160],[180,200,255]],
			blue: [[50,50,255],[30,0,100],[100,140,255]],
			violet: [[160,40,200],[120,20,180],[255,100,200]],
			multi: [[200,255,255],[250,150,150],[225,255,128]],
		};
        this.colors = this.colorlist[this.colordict[this.color]];
		this.baseseed = 100;
		this.draw_card_round = function(x,y,w,ctx){
			//dims: 10 * 14
			let fillet_ratio = 0.1;
			let r = w * fillet_ratio;
			let h = w * 1.4;
			let q = Math.PI/2;
			ctx.beginPath();
			ctx.arc(x+r, y+r, r, 2*q, 3*q);
			ctx.lineTo(x+w-r, y);
			ctx.arc(x+w-r, y+r, r, 3*q, 4*q);
			ctx.lineTo(x+w, y+h-r);
			ctx.arc(x+w-r, y+h-r, r, 0, q);
			ctx.lineTo(x+r, y+h)
			ctx.arc(x+r, y+h-r, r, q, 2*q);
			ctx.closePath();
			ctx.fillStyle = this.rgba_builder([...this.colors[0],1]);
			ctx.fill();
		}
		this.rgba_builder = function(rgba){
			return 'rgba(' + rgba.join(',') + ')';
		}
		this.draw_card_square = function(x,y,w,ctx){
			let h = w * 1.4;
			ctx.fillStyle = this.rgba_builder([...this.colors[0],1]);
			ctx.fillRect(x,y,w,h);

			this.random = function(s){
				v = s[0]++;
				for(let i = 0; i < 2; i++)
					v = (9*v)%1337 + (v*v)%1337 + Math.floor(v*9.0/1.2);
				return (v%1337)/1337.0;
			}
			seed = [this.baseseed];
			ctx.fillStyle = this.rgba_builder([...this.colors[1],this.random(seed)/4]);
			for(let i = 0; i < 500; i++){
				let r = this.random(seed) * this.random(seed) * w * 0.25;
				let xx = this.random(seed) * w + x;
				let yy = this.random(seed) * h + y;
				ctx.beginPath();
				ctx.arc(xx,yy,r,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
			for(let i = x; i < x+w; i+=1+5*this.random(seed)){
				for(let j = y; j < y+h; j+=1+3*this.random(seed)){
					ctx.fillStyle = this.rgba_builder([...this.colors[2],this.random(seed)/4]);
					if(this.random(seed) > 0.7)
						ctx.fillRect(i,j,1+this.random(seed)*15,1+this.random(seed)*15);
				}
			}
		}
		this.draw_card_square(500,100,300,dict['ctx']);
		this.bkgd = dict['ctx'].getImageData(500,100,300,300*1.4);
	}
	activecard.update = function(dict){
        
        //make these specialized on_press events
		if(dict['keys'].hasOwnProperty(39) && dict['keys'][39] == 0){
			this.baseseed += 1;
			this.draw_card_square(500,100,300,dict['ctx']);
			this.bkgd = dict['ctx'].getImageData(500,100,300,300*1.4);
		}
        if(dict['keys'].hasOwnProperty(37) && dict['keys'][37] == 0){
			this.baseseed -= 1;
			this.draw_card_square(500,100,300,dict['ctx']);
			this.bkgd = dict['ctx'].getImageData(500,100,300,300*1.4);
		}
        if(dict['keys'].hasOwnProperty(38) && dict['keys'][38] == 0){
            this.color = (this.color+1)%this.colordict.length;
            this.colors = this.colorlist[this.colordict[this.color]];
            this.draw_card_square(500,100,300,dict['ctx']);
			this.bkgd = dict['ctx'].getImageData(500,100,300,300*1.4);
        }
        if(dict['keys'].hasOwnProperty(40) && dict['keys'][40] == 0){
            this.color = (this.color+this.colordict.length-1)%this.colordict.length;
            this.colors = this.colorlist[this.colordict[this.color]];
            this.draw_card_square(500,100,300,dict['ctx']);
			this.bkgd = dict['ctx'].getImageData(500,100,300,300*1.4);
        }  
	}
	activecard.draw = function(dict){
		//draw card rectangle
		this.draw_card_round(100,100,300,dict['ctx']);
		//this.draw_card_square(500,100,300,dict['ctx']);
		dict['ctx'].putImageData(this.bkgd,500,100);
		dict['ctx'].fillStyle = 'white';
		dict['ctx'].font = '100px monospace';
		dict['ctx'].fillText(this.baseseed, 630,600);
	}
	*/
	return [cardlisting/*,card1,card2,card3,card4,card5,card6,card7,card8*/];
}