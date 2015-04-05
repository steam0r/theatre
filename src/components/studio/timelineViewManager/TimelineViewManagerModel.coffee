pluck = require 'utila/lib/array/pluck'
append = require 'utila/lib/array/append'
Emitter = require 'utila/lib/events/Emitter'

module.exports = class TimelineViewManagerModel
	constructor: ->
		@_idsList = []
		@_idsMap = {}

		@_state = {listOfTimelineViewNumbers: @_idsList}

		@events = new Emitter

	setState: (state) ->
		return unless Array.isArray state.listOfTimelineViewNumbers

		@set state.listOfTimelineViewNumbers

	getState: ->
		@_state

	getIDs: ->
		@_idsList.concat()

	append: (id) ->
		if @_idsMap[id] is true
			throw Error "TimelineView with ID '#{id}' already exists"

		@_idsList.push id
		@_idsMap[id] = true

		@_reportChange()

		this

	removeByID: (id) ->
		if @_idsMap[id] isnt true
			throw Error "TimelineView with ID '#{id}' isn't in the list"

		pluck @_idsList, id
		@_idsList[id] = false

		@_reportChange()

		this

	set: (newList) ->
		@_idsList.length = 0
		append @_idsList, newList

		@_idsMap = {}
		for id in newList
			@_idsMap[id] = true

		@_reportChange()

		return

	_reportChange: ->
		@events.emit 'IDs:didChange'
		@events.emit 'state:didChange'