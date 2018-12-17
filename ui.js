"use strict";

function create_ui_controller() {
	var ui_controller = {}

	ui_controller.init = function(dict) {
		this.height = dict["cnv"].height;
		this.width = dict["cnv"].width;
	}

	return ui_controller;
}