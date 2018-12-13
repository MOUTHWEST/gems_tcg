function create_board() {
	let board_container = {
		name: "board",
		board: []
	};

	board_container.init = function(dict) {
		for (i = 0; i < 5; i++) {
			board_container.board.push([]);
			for (j = 0; j < 5; j++) {
				board_container.board[i].push(0);
			}
		}
		console.log("init");
	}

	board_container.draw = function(dict) {
		cnv = dict['cnv'];
		ctx = dict['ctx'];

		width = cnv.width;
		height = cnv.height;

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

		draw_unit = smallest_width / 6; // for lack of a better name
		outer_borders = draw_unit * 0.3;
		inner_borders = draw_unit * 0.1;

		if (padding_location = "left") {
			x_pos = outer_borders + padding_width
			y_pos = outer_borders
		} else if (padding_location = "top") {
			x_pos = outer_borders + padding_width
			y_pos = outer_borders
		}

		ctx.fillStyle = 'white';

		initial_x_pos = x_pos;

		for (i = 0; i < 5; i++) {
			for (j = 0; j < 5; j++) {
				ctx.fillRect(x_pos, y_pos, draw_unit, draw_unit);
				x_pos += draw_unit + inner_borders;
			}
			y_pos += draw_unit + inner_borders;
			x_pos = initial_x_pos;
		}
	}

	return [board_container];
}