var cardlist = {};

cardlist = {
	0:{title:'Red Garnet Shard',
		color:'red',
		cost:'R|R',
		desc:'Move any stone on the board one block away from you.',},
	1:{title:'Almandine Charm',
		color:'red',
		cost:'RR|**|RR',
		desc:'Return a card in your discard pile to your hand.',},
	2:{title:'Ruby Necklace',
		color:'red',
		cost:'R_R|R_R',
		desc:'Move any stone on the board either left or right by one block.',},
	3:{title:'Burning Agate',
		color:'red',
		cost:'_R_|*R*|_R_',
		desc:'Remove any stone from the board, then discard this card.',},
	4:{title:'Blue Topaz Shard',
		color:'blue',
		cost:'B|B',
		desc:'Place a blue stone behind an existing blue stone on the board.',},
	5:{title:'Iolite Charm',
		color:'blue',
		cost:'***|BBB',
		desc:'Remove a blue stone used to cast this card, then draw a card.',},
	6:{title:'Sapphire Slicer',
		color:'blue',
		cost:'B*|*B|B*',
		desc:'Discard two of your cards on the table, then remove any stone from the board.',},
	7:{title:'Waning Moonstone',
		color:'blue',
		cost:'B_B|_*_|B_B',
		desc:'Shuffle two cards from your discard pile into your deck, then discard this card.',},
	8:{title:'Kyanite Flash',
		color:'blue',
		cost:'_B_|***|_B_',
		desc:'Remove the three any-color stones used to cast this card from the board.',},
};

function save_card(card){
	let cnv2 = document.createElement('canvas');
	let cnv3 = document.createElement('canvas');
	let ctx = cnv3.getContext('2d');
	
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
	
	//ctx.fillStyle = 'black';
	//ctx.fillRect(0,0,500,700);
	
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


var cardimages = {images:{}, mini:{}};
for(let card in Object.keys(cardlist)){
	cardimages.images[card] = save_card(cardlist[card])[0];
	cardimages.mini[card] = save_card(cardlist[card])[1];
};
console.log(cardimages);