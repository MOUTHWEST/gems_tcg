"use strict";

function create_ui_controller() {
	var ui_controller = {}

	ui_controller.init = function(dict) {
		this.height = dict["cnv"].height;
		this.width = dict["cnv"].width;

		this.boardHeight = 0.3 * this.height;
		this.boardWidth = 0.3 * this.width;
	}

	return ui_controller;
}