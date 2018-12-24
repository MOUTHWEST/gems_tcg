"use strict";

function create_ui_controller() {
	var ui_controller = {}

	ui_controller.init = function(dict) {
		this.height = dict["cnv"].height;
		this.width = dict["cnv"].width;

		this.boardWidth = 0.5 * this.width;
		this.boardHeight = 0.8 * this.height;

		this.board_initial_x = 50;
		this.board_initial_y = 50;

		this.paletteWidth = 0.5 * this.width;
		this.paletteHeight = 0.1 * this.height;

		this.palette_initial_x = this.board_initial_x;
		this.palette_initial_y = this.board_initial_y + this.boardHeight;
	}

	return ui_controller;
}