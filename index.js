'use strict'

const _get = require('lodash/get')

const genericSort = ({ list = [], label = '', func, asc = true }) => {
	const compare = (a, b) => {
		if (typeof a === 'string' && typeof b === 'string') {
			return asc ? a.localeCompare(b) : b.localeCompare(a)
		}
		if (asc) return a > b ? 1 : -1
		if (!asc) return a > b ? -1 : 1
	}

	return list.sort((a, b) => {
		if (func && label) {
			const formatA = func(_get(a, label))
			const formatB = func(_get(b, label))
			return compare(formatA, formatB)
		}
		if (!func && label) {
			const formatA = _get(a, label)
			const formatB = _get(b, label)
			return compare(formatA, formatB)
		}

		if (label) {
			return compare(_get(a, label), _get(b, label))
		}
		return compare(a, b)
	})
}

module.exports = genericSort