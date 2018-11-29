'use strict'

const { fetch } = require('fetch-ponyfill')({ Promise: require('pinkie-promise') })
const xml2js = require('xml-js').xml2js
const merge = require('lodash.merge')
const isNumber = require('lodash.isnumber')
const isNull = require('lodash.isnull')
const toMarkdown = require('to-markdown')

const endpoint = 'http://whc.unesco.org/en/list/xml/'
// todo: language?

const parseElement = (e) => {
	const o = {}
	if (e.elements) {
		o[e.name] = e.elements[0].text
	} else o[e.name] = null
	return o
}

const parseRow = (row) => {
	const elements = row.elements.map(parseElement)
	return merge({}, ...elements)
}

const transformCriteria = (c) =>
	c.substr(1, c.length - 2)
		.split(')(')

let transformText = (x) => x

const transformRow = (r) => ({
	category: r.category,
	criteria: transformCriteria(r.criteria_txt),
	dates: {
		inscription: +r.date_inscribed,
		other: r.secondary_dates ? (r.secondary_dates || '').split(',').map((y) => +y) : []
	},
	extension: +r.extension,
	danger: r.danger,
	description: {
		historical: transformText(r.historical_description || '') || null,
		long: transformText(r.long_description || '') || null,
		short: transformText(r.short_description || '' || null)
	},
	justification: transformText(r.justification || '') || null,
	location: r.location,
	coordinates: (!isNull(r.latitude) && isNumber(+r.latitude) && !isNull(r.longitude) && isNumber(+r.longitude)) ? {
		longitude: +r.longitude,
		latitude: +r.latitude
	} : null,
	url: r.http_url,
	id: +r.id_number,
	image: r.image_url,
	countries: {
		iso: (r.iso_code || '').split(','),
		names: (r.states || '').split(',')
	},
	region: r.region,
	revision: +r.revision,
	site: r.site,
	transBoundary: +r.transboundary !== 0,
	uniqueNumber: +r.unique_number // whatever this is
})

const heritage = (opt = {}) => {
	if (opt.markdown) transformText = toMarkdown
	return fetch(endpoint, { method: 'get' })
		.then((res) => res.text())
		.then(xml2js) // parse XML
		.then((res) => res.elements[0].elements) // select main tag
		.then((rows) => rows.map(parseRow)) // parse data
		.then((rows) => rows.map(transformRow))
}

module.exports = heritage
