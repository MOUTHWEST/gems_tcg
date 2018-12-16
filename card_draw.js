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
		let mygrid = 'R_R|_*_|_*_|R_R';
		
		ctx.fillStyle = 'rgb(75,50,40)'
		ctx.fillRect(100-edgewidth/2,100-edgewidth/2,300+edgewidth,300+edgewidth);
		
		gridrows = card.cost.split('|');
		g_h = gridrows.length;
		g_w = gridrows[0].length;
		sqsize = 60;
		//prop_h = g_h*300.0/Math.max(g_h,g_w);
		//prop_w = g_w*300.0/Math.max(g_h,g_w);
		prop_h = g_h*sqsize;
		prop_w = g_w*sqsize;
		//sqsize = prop_h/g_h;
		ctx.fillStyle = 'rgb(75,50,40)';
		ctx.fillRect(250-prop_w/2,250-prop_h/2,prop_w,prop_h);
		
		let cmap = {
			'R': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.red[x].join(',') + ')'}),
			'O': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.orange[x].join(',') + ')'}),
			'G': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.green[x].join(',') + ')'}),
			'B': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.blue[x].join(',') + ')'}),
			'W': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.white[x].join(',') + ')'}),
			'K': [0,0,0,0,0].map(function(x){return 'rgb(' + colorlist.black[x].join(',') + ')'}),
			'*': ['rgb(255,100,100)','rgb(0,150,0)','rgb(128,128,255)','rgb(180,180,0)','rgb(210,210,230)'],
			//'*': [1,2,1,2,0].map(function(x){return 'rgb(' + colorlist.multi[x].join(',') + ')'}),
			//'*': ['rgb(110,110,110)','rgb(110,110,110)','rgb(110,110,110)','rgb(110,110,110)','rgb(180,180,180)'],
			'_': ['rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,0)'],
		};
		
		//console.log(cmap.V);
		for(let i = 0; i < gridrows.length; i++){
			for(let j = 0; j < gridrows[0].length; j++){
				//console.log(gridrows[i][j][0]);
				ctx.fillStyle = cmap[gridrows[i][j]][0];
				ctx.fillRect(sqsize*j + 250-prop_w/2, sqsize*i + 250-prop_h/2, sqsize/2, sqsize/2);
				ctx.fillStyle = cmap[gridrows[i][j]][1];
				ctx.fillRect(sqsize*(j+.5) + 250-prop_w/2, sqsize*i + 250-prop_h/2, sqsize/2, sqsize/2);
				ctx.fillStyle = cmap[gridrows[i][j]][2];
				ctx.fillRect(sqsize*(j+.5) + 250-prop_w/2, sqsize*(i+.5) + 250-prop_h/2, sqsize/2, sqsize/2);
				ctx.fillStyle = cmap[gridrows[i][j]][3];
				ctx.fillRect(sqsize*j + 250-prop_w/2, sqsize*(i+.5) + 250-prop_h/2, sqsize/2, sqsize/2);
				ctx.fillStyle = cmap[gridrows[i][j]][4];
				ctx.fillRect(sqsize*(j+.2) + 250-prop_w/2, sqsize*(i+.2) + 250-prop_h/2, sqsize*.6, sqsize*.6);
			}
		}
		ctx.fillStyle = 'rgb(75,50,40)';
		for(let i = 0; i <= gridrows.length; i++)
			ctx.fillRect(250-prop_w/2, 250-edgewidth/2-prop_h/2 + i*sqsize, prop_w, edgewidth);
		for(let j = 0; j <= gridrows[0].length; j++)
			ctx.fillRect(250-edgewidth/2-prop_w/2 + j*sqsize, 250-prop_h/2, edgewidth, prop_h);
		
		//draw description
		ctx.fillStyle = 'rgba(0,0,0,.7)';
		ctx.fillRect(20,420,460,260);
		ctx.font = '40px sans-serif';
		ctx.fillStyle = 'white';
		let mystring = 'Lorem ipsum dolor sit amet. This is a very long string, designed to experiment with word-wrapping customization implemented in the card-side algorithm. This text may run off the card, but the goal is to see that word wrapping does work.';
		function wrapText(context, text, x, y, maxWidth, lineHeight) {
			let words = text.split(' ');
			let line = '';

			for(let n = 0; n < words.length; n++) {
				let testLine = line + words[n];
				let metrics = context.measureText(testLine);
				let testWidth = metrics.width;
				if (testWidth > maxWidth && n > 0) {
					context.fillText(testLine, x, y, maxWidth);
					line = '';
					y += lineHeight;
				} else {
					line = testLine + ' ';
				}
			}
			context.fillText(line, x, y, maxWidth);
		}
		wrapText(ctx,card.desc,25,455,450,40);
		
		let imagedata = ctx.getImageData(0,0,500,700);
		
		let img = new Image(500,700);
		
		//let cnv2 = document.createElement('canvas');
		cnv2.width = 500;
		cnv2.height = 700;
		let ctx2 = cnv2.getContext('2d');
		ctx2.putImageData(imagedata,0,0);
		let imguri = cnv2.toDataURL('image/png');
		img.src = imguri;
		
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,500,700);
		return img;
	}
	
	let testreader = {name:'reader'};
	testreader.init = function(dict){
		this.images = {};
		for(let card in Object.keys(cardlist)){
			//console.log(cardlist[card]);
			this.images[card] = save_card(cardlist[card],dict['ctx']);
		}
		this.toshow = Object.keys(cardlist).length;
		this.cl = this.toshow;
	};
	testreader.draw = function(dict){
		let w = 1;
		let h = 0;
		let tw = 900.0;
		let th = 720.0;
		while(w*h < this.toshow){
			w += 1;
			//let cw = tw/w;
			//let ch = cw*1.4;
			h = Math.floor(th*w/(tw*1.4));
			//console.log(h);
		}
		//console.log(w,h);
		for(let card = 0; card < this.toshow; card++){
			dict['ctx'].drawImage(this.images[card%this.cl],
							(tw/w)*(card%w),
							(th/h)*Math.floor(card/w),
							tw/w,
							tw*1.4/w);
		}
	};
	testreader.update = function(dict){
		if(dict['keys'].hasOwnProperty(37) && dict['keys'][37] == 0){
			if(this.toshow > 1)
				this.toshow--;
		}
		if(dict['keys'].hasOwnProperty(39) && dict['keys'][39] == 0){
			this.toshow++;
		}
	};
		
	
	
	let card1 = {
		name:'card1',
		title:'Red Garnet Shard',
		color:'red',
		cost:'R|R',
		desc:'Move any stone on the board one block away from you.',
	};
	card1.init = function(dict){
		this.image = save_card(this,dict['ctx']);
	};
	card1.draw = function(dict){
		dict['ctx'].drawImage(this.image,20,40,200,280);
	}
	
	let card2 = {
		name:'card2',
		title:'Almandine Charm',
		color:'red',
		cost:'RR|**|RR',
		desc:'Return a card in your discard pile to your hand.',
	};
	card2.init = function(dict){
		this.image = save_card(this,dict['ctx']);
	};
	card2.draw = function(dict){
		dict['ctx'].drawImage(this.image,240,40,200,280);
	}
	
	let card3 = {
		name:'card3',
		title:'Ruby Necklace',
		color:'red',
		cost:'R_R|R_R',
		desc:'Move any stone on the board either left or right by one block.',
	};
	card3.init = function(dict){
		this.image = save_card(this,dict['ctx']);
	};
	card3.draw = function(dict){
		dict['ctx'].drawImage(this.image,460,40,200,280);
	}
	
	let card4 = {
		name:'card4',
		title:'Burning Agate',
		color:'red',
		cost:'_R_|*R*|_R_',
		desc:'Remove any stone from the board, then discard this card.',
	};
	card4.init = function(dict){
		this.image = save_card(this,dict['ctx']);
	};
	card4.draw = function(dict){
		dict['ctx'].drawImage(this.image,680,40,200,280);
	}
	
	let card5 = {
		name:'card5',
		title:'Blue Topaz Shard',
		color:'blue',
		cost:'B|B',
		desc:'Move a BLUE stone directly behind another BLUE stone on the board.',
	};
	card5.init = function(dict){
		this.image = save_card(this,dict['ctx']);
	};
	card5.draw = function(dict){
		dict['ctx'].drawImage(this.image,20,360,200,280);
	}
	
	let card6 = {
		name:'card6',
		title:'Iolite Charm',
		color:'blue',
		cost:'***|BBB',
		desc:'Remove a BLUE stone used to cast this card, then draw a card.',
	};
	card6.init = function(dict){
		this.image = save_card(this,dict['ctx']);
	};
	card6.draw = function(dict){
		dict['ctx'].drawImage(this.image,240,360,200,280);
	}
	
	let card7 = {
		name:'card7',
		title:'Sapphire Slicer',
		color:'blue',
		cost:'B*|*B|B*',
		desc:'Discard two of your cards on the table, then remove any stone from the board.',
	};
	card7.init = function(dict){
		this.image = save_card(this,dict['ctx']);
	};
	card7.draw = function(dict){
		dict['ctx'].drawImage(this.image,460,360,200,280);
	}
	
	let card8 = {
		name:'card8',
		title:'Waning Moonstone',
		color:'blue',
		cost:'B_B|_*_|B_B',
		desc:'Shuffle two cards from your discard pile into your deck, then discard this card.',
	};
	card8.init = function(dict){
		this.image = save_card(this,dict['ctx']);
	};
	card8.draw = function(dict){
		dict['ctx'].drawImage(this.image,680,360,200,280);
	}
	
	let card9 = {
		name:'card9',
		title:'Kyanite Flash',
		color:'blue',
		cost:'_B_|***|_B_',
		desc:'Remove the three any-color stones used to cast this card from the board.',
	};
	card9.init = function(dict){
		this.image = save_card(this,dict['ctx']);
	};
	card9.draw = function(dict){
		dict['ctx'].drawImage(this.image,225,45,450,630);
	}
	
	// OUTDATED
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
	
	return [testreader/*,card1,card2,card3,card4,card5,card6,card7,card8*/];
}