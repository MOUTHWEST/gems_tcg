"use strict";

function create_board() {
	var board_container = {
		name: "board",
		board: [],
		palette: [],
		tile_width: 0,
		palette_width: 0,
		color_key: {
			0: "#ffffff", // background
			1: "#bfbfbf", // light grey (pearl)
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
		var cnv = dict['cnv'];
		var ctx = dict['ctx'];

		var width = cnv.width;
		var height = cnv.height;

		var smallest_width;
		var padding_width;
		var padding_location;

		if (height < width) {
			smallest_width = height;
			padding_width = (width - smallest_width) / 2;
			padding_location = "left";
		} else if (width < height) {
			smallest_width = width;
			padding_width = (width - smallest_width) / 2;
			padding_location = "top";
		} else {
			padding_location = "none"
		}

		var draw_unit = smallest_width / 6; // for lack of a better name
		var outer_borders = draw_unit * 0.3;
		var inner_borders = draw_unit * 0.1;

		var x_pos;
		var y_pos;
		var initial_x_pos;
		var initial_y_pos;

		if (padding_location = "left") {
			x_pos = outer_borders + padding_width
			y_pos = outer_borders
		} else if (padding_location = "top") {
			x_pos = outer_borders + padding_width
			y_pos = outer_borders
		}

		initial_x_pos = x_pos;
		initial_y_pos = y_pos;

		ctx.fillStyle = "#aaaaaa";

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				ctx.fillRect(x_pos, y_pos, draw_unit, draw_unit);
				x_pos += draw_unit + inner_borders;
			}
			y_pos += draw_unit + inner_borders;
			x_pos = initial_x_pos;
		}

		y_pos = initial_y_pos

		var inner_draw_unit = draw_unit - (2 * inner_borders)

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				ctx.fillStyle = board_container.color_key[board_container.board[i][j].color];
				ctx.fillRect(x_pos + inner_borders, y_pos + inner_borders, inner_draw_unit, inner_draw_unit);
				board_container.board[i][j].x_pos = x_pos
				board_container.board[i][j].y_pos = y_pos
				x_pos += draw_unit + inner_borders;
			}
			y_pos += draw_unit + inner_borders;
			x_pos = initial_x_pos;
		}

		board_container.tile_width = inner_draw_unit;

		var palette_width = padding_width / 2;
		
		var palette_vertical_spacing = height - (2 * outer_borders);
		palette_vertical_spacing -= (board_container.max_colors + 1) * palette_width;
		palette_vertical_spacing /= board_container.max_colors + 2;

		var palette_border = inner_borders / 3

		x_pos = width - (padding_width);
		y_pos = outer_borders;

		for (var i = 0; i <= board_container.max_colors; i++) {
			y_pos += palette_vertical_spacing;

			ctx.fillStyle = "#666666"
			ctx.fillRect(x_pos, y_pos - palette_border, palette_width + 2 * palette_border, palette_width + 2 * palette_border);

			ctx.fillStyle = board_container.color_key[i];
			ctx.fillRect(x_pos + palette_border, y_pos, palette_width, palette_width);

			board_container.palette[i].x_pos = x_pos
			board_container.palette[i].y_pos = y_pos

			y_pos += palette_width;
		}

		board_container.palette_width = palette_width;
	}

	board_container.updateColor = function(event) {
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				var obj = board_container.board[i][j];
				if (obj.x_pos <= event.offsetX && event.offsetX <= (obj.x_pos + board_container.tile_width)
					&& obj.y_pos <= event.offsetY && event.offsetY <= (obj.y_pos + board_container.tile_width)) {
					obj.color = board_container.selected_color;
				}
			}
		}
		for (var i = 0; i <= board_container.max_colors; i++) {
			var obj = board_container.palette[i];
			if (obj.x_pos <= event.offsetX && event.offsetX <= (obj.x_pos + board_container.palette_width)
				&& obj.y_pos <= event.offsetY && event.offsetY <= (obj.y_pos + board_container.palette_width)) {
				board_container.selected_color = board_container.palette[i].color;
			}
		}

		var board_data = JSON.stringify(board_container.board);

		gameArea.socket.send(board_data);
	}

	return board_container;
}