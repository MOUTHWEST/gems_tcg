"use strict";

function create_board() {
	var board_container = {
		board: [],
		palette: [],
		tile_width: 0,
		palette_width: 0,
		color_key: {
			0: "#bfbfbf", // background
			1: "#ffffff", // white (pearl)
			2: "#0f52ba ", // blue (sapphire) (no I don't care you can have yellow sapphires)
			3: "#50c878", // green (emerald)
			4: "#9966cc", // purple (amethyst)
			5: "#ffc87c", // orange (topaz)
			6: "#e0115f" // red (ruby) (it's really just a red sapphire...)
		},
		max_colors: 6,
		selected_color: 0
	};

	board_container.init = function(dict) {
		for (var i = 0; i < 5; i++) {
			board_container.board.push([]);
			for (var j = 0; j < 5; j++) {
				board_container.board[i].push({
					color: 0,
					x_pos: 0,
					y_pos: 0
				});
			}
		}

		for (var i = 0; i < Object.keys(board_container.color_key).length; i++) {
			board_container.palette.push({
				color: i,
				x_pos: 0,
				y_pos: 0
			});
		}
	}

	board_container.draw = function(dict) {
		// The dict contains the key DOM elements
		// cnv = canvas, ctx = context
		var ctx = dict['ctx'];

		var width = gameArea.objects.ui.boardHeight;
		var height = gameArea.objects.ui.boardWidth;

		var padding_width = (width - height) / 2;

		// Dimensions for tiles and borders
		var board_border = height / 6 * 0.3;
		var tile_border = height / 6 * 0.1;
		var tile_width = height / 6 - 2 * tile_border;

		var boardAreaHeight = height - 2 * board_border;

		// Initialise x pos to corner of board square (and save that position so we can return to it)
		var initial_x_pos = board_border + padding_width;
		var y_pos = board_border;
		var x_pos = initial_x_pos;

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				// Fill the border, which is just a grey square
				ctx.fillStyle = "#aaaaaa";
				ctx.fillRect(x_pos, y_pos, tile_width + 2 * tile_border, tile_width + 2 * tile_border);

				// Selects colour to use from that tile and fills
				ctx.fillStyle = board_container.color_key[board_container.board[i][j].color];
				ctx.fillRect(x_pos + tile_border, y_pos + tile_border, tile_width, tile_width);

				// Stores the x,y location of the tile
				board_container.board[i][j].x_pos = x_pos + tile_border;
				board_container.board[i][j].y_pos = y_pos + tile_border;

				// Adjust x_pos to start of next square
				x_pos += tile_width + 3 * tile_border;
			}

			// Go back to start of the row and move one space down
			y_pos += tile_width + 3 * tile_border;
			x_pos = initial_x_pos;
		}

		board_container.tile_width = tile_width;

		// var palette_width = padding_width / 2;
		// var palette_border = tile_border / 3
		
		// var palette_vertical_spacing = determine_spacing(boardAreaHeight, palette_width, palette_border, board_container.max_colors + 1);

		// x_pos = width - (padding_width);
		// y_pos = board_border;

		// for (var i = 0; i <= board_container.max_colors; i++) {
		// 	y_pos += palette_vertical_spacing;

		// 	ctx.fillStyle = "#666666"
		// 	ctx.fillRect(x_pos, y_pos, palette_width + 2 * palette_border, palette_width + 2 * palette_border);

		// 	ctx.fillStyle = board_container.color_key[i];
		// 	ctx.fillRect(x_pos + palette_border, y_pos + palette_border, palette_width, palette_width);

		// 	board_container.palette[i].x_pos = x_pos
		// 	board_container.palette[i].y_pos = y_pos

		// 	y_pos += palette_width + 2 * palette_border;
		// }
	}

	board_container.updateColor = function(event) {
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				var obj = board_container.board[i][j];
				if (obj.x_pos <= event.offsetX && event.offsetX <= (obj.x_pos + board_container.tile_width)
				&& obj.y_pos <= event.offsetY && event.offsetY <= (obj.y_pos + board_container.tile_width)) {
					obj.color = board_container.selected_color;

					var data = {
						type: "update",
						component: "tile",
						data: {
							x: i,
							y: j,
							color: obj.color,
						}
					}

					data = JSON.stringify(data);

					gameArea.socket.send(data);
					
				}
			}
		}
		for (var i = 0; i <= board_container.max_colors; i++) {
			var obj = board_container.palette[i];
			if (obj.x_pos <= event.offsetX && event.offsetX <= (obj.x_pos + board_container.palette_width)) {
				console.log("X region hit")
			}
			if (obj.y_pos <= event.offsetY && event.offsetY <= (obj.y_pos + board_container.palette_width)) {
				console.log("Y region hit")
				board_container.selected_color = board_container.palette[i].color;
				console.log(board_container.selected_color);
			}
		}
	}

	return board_container;
}

function determine_spacing(area_width, tile_width, border_width, tile_count) {
	var spacing = area_width;
	spacing -= tile_count * tile_width;
	spacing -= border_width * tile_count * 2;
	spacing /= tile_count + 1;

	return spacing;
}