function create_palette(dict) {
	var palette_container = {
		buttons: []
	}

	palette_container.init = function(dict) {
		this.colors_amount = gameArea.objects.board.max_colors;

		for (let i = 0; i < this.colors; i++) {
			this.buttons[i] = {
				x_pos: 0,
				y_pos: 0,
				color: 0
			}
		}
	}

	palette_container.draw = function(dict) {
		// The dict contains the key DOM elements
		// cnv = canvas, ctx = context
		var ctx = dict['ctx'];

		var width = gameArea.objects.ui.paletteWidth;
		var height = gameArea.objects.ui.paletteHeight;

		var draw_from_x = gameArea.objects.ui.palette_initial_x;
		var draw_from_y = gameArea.objects.ui.palette_initial_y;

		// Indicates area occupied by the board
		ctx.fillStyle = "#fff4ba";
		ctx.fillRect(draw_from_x, draw_from_y, width, height);

		var border = height * 0.1;
		var tile_width = height * 0.5;

		var horizontal_spacing = determine_spacing(width, tile_width, border, this.colors_amount);
		var vertical_spacing = height * 0.15;

		var x_pos = draw_from_x;
		var y_pos = draw_from_y + vertical_spacing;

		for (let i = 0; i < colors; i++) {
			x_pos += horizontal_spacing;

			ctx.fillStyle = "#666666";
			ctx.fillRect(x_pos, y_pos, tile_width + 2 * border, tile_width + 2 * border);

			ctx.fillStyle = gameArea.objects.board.color_key[i];
			ctx.fillRect(x_pos + border, y_pos + border, tile_width, tile_width);

			x_pos += tile_width + 2 * border;
		}
	}

	return palette_container;
}