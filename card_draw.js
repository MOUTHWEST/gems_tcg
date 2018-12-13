function draw_cards(){
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
				for(let i = 0; i < 3; i++)
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
	
	return [activecard];
}