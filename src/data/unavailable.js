const {resolve} = require('path');
const {existsSync, writeFileSync} = require('fs');

module.exports = new class unavailable {
	constructor() {
		if (existsSync(resolve('cache', 'unavailable.json'))) {
			this.types = require('../../cache/unavailable.json');
		} else {
			this.types = {};
		}
	}

	exists(type, id) {
		return this.types[type] && this.types[type].includes(id);
	}

	add(type, id) {
		if (!this.types[type]) this.types[type] = [];
		if (!this.exists(type, id)) {
			this.types[type].push(id);
			this.save();
		}
	}

	save() {
		writeFileSync(resolve('cache', 'unavailable.json'), JSON.stringify(this.types, null, '\t'));
	}
}();
