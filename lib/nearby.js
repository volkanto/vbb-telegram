'use strict'

const so     = require('so')

const _      = require('./index')
const render = require('./render')



const nearby = so(function* (ctx, msg) {
	const state = yield ctx.get('state')

	if (state === 'location') {
		if (!msg.location) return ctx.message(`\
	Please send a location, other stuff is not supported yet.`)
		const lat  = msg.location.latitude
		const long = msg.location.longitude
		yield ctx.message(render.nearby(yield _.closest(lat, long, 3)))
		yield ctx.done()
	}

	else {
		yield ctx.set('state', 'location')
		yield ctx.requestLocation(`Please share your location with me.`, 'send location')
	}
})

module.exports = nearby