"use strict";

function create_board() {
	var board_container = {
		name: "board",
		board: [],
		tile_width: 0,
		color_key: {
			0: "#ffffff", // white (diamond)
			1: "#0000aa", // blue (sapphire) (no I don't care you can have yellow sapphires)
			2: "#00aa00", // green (emerald)
			3: "#ff55ff", // purple (amethyst)
			4: "#ffaa00", // orange (topaz)
			5: "#aa0000" // red (ruby) (it's really just a red sapphire...)
		},
		max_colors: 5
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
	}

	board_container.updateColor = function(event) {
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				var obj = board_container.board[i][j];
				if (obj.x_pos <= event.offsetX && event.offsetX <= (obj.x_pos + board_container.tile_width)
					&& obj.y_pos <= event.offsetY && event.offsetY <= (obj.y_pos + board_container.tile_width)) {
					obj.color += 1;
					if (obj.color > board_container.max_colors) {
						obj.color = 0;
					}
				}
			}
		}
	}

	return [board_container];
}