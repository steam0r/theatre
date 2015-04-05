Emitter = require 'utila/lib/events/Emitter'

module.exports = class Model
	@type: 'local'

	constructor: ->

		@events = new Emitter

		# How the size and the position of the editor is defined
		@dims =

			# Offset from each corner of the window. Currently only
			# supports offseting from left/right/bottom
			type: "offset"

			left: 10
			right: 10
			bottom: 10
			height: 300