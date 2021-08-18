const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const automeme = new Schema({

	automeme_enabled: {
		type: Boolean,
		default: false,
	},
	automeme_channel: {
		type: String,
		default: 'null',
	}
});

module.exports = mongoose.model('automeme', automeme);
