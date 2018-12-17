"use strict";
function draw_cards(){
	
	
	let cardlisting = {name:'cardlisting'};
	cardlisting.init = function(dict){
		this.toshow = Object.keys(cardlist).length;
		this.cl = this.toshow;
		this.tw = 1280.0;
		this.th = 720.0;
		this.ox = 0;
		this.oy = 0;
	};
	cardlisting.draw = function(dict){
		let w = 1;
		let h = 0;
		let tw = this.tw;
		let th = this.th;
		while(w*h < this.toshow){
			w += 1;
			h = Math.floor(th*w/(tw*1.4));
		}
		for(let card = 0; card < this.toshow; card++){
			dict['ctx'].drawImage(cardimages.images[card%this.cl],
							this.ox + (tw/w)*(card%w + .05),
							this.oy + (th/h)*(Math.floor(card/w) + .05),
							tw/w * .9,
							tw*1.4/w * .9);
		}
	};
	cardlisting.update = function(dict){
		if(dict['keys'].hasOwnProperty(37) && dict['keys'][37] == 0){
			if(this.toshow > 1)
				this.toshow -= 1;
		}
		if(dict['keys'].hasOwnProperty(39) && dict['keys'][39] == 0){
			this.toshow += 1;
		}
	};
		
	let deck = {name:'deck'};
	deck.init = function(dict){
		this.cardcounts = {};
		for(let i = 1; i <= 60; i++)
			this.cardcounts[i] = i;
		this.ox = 800;
		this.oy = 10;
		this.th = 700;
		this.tw = this.th*47.0/70;
	};
	deck.draw = function(dict){
		//dict['ctx'].fillStyle = 'rgb(66,66,66)';
		//dict['ctx'].fillRect(this.ox,this.oy,this.tw,this.th);
		let uniquecards = Object.keys(this.cardcounts).map(function(x){return 1*x;});
		uniquecards = uniquecards.sort((a,b)=>a-b);
		let m_h = Math.max(Math.min(this.th/uniquecards.length,44), this.th/20);
		let m_w = m_h * 50.0/11;
		let fsize = m_h*20.0/44;
		dict['ctx'].font = fsize + 'px sans-serif';
		dict['ctx'].fillStyle = 'white';
		for(let i = 0; i < uniquecards.length; i++){
			dict['ctx'].drawImage(cardimages.mini[uniquecards[i]%9],
							this.ox + (Math.floor(i/20)*m_w),
							this.oy + m_h*(i%20+.05),
							m_w-50,
							m_h*.9);
			if(this.cardcounts[uniquecards[i]] > 1)
				dict['ctx'].fillText(' x '+this.cardcounts[uniquecards[i]],
									this.ox + m_w - 50 + Math.floor(i/20)*m_w,
									this.oy+m_h*30.0/44 + (i%20)*m_h);
		}
	};
	
	return [cardlisting/*,deck*/];
}