var mongoose = require('mongoose');
var competitionSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    total_members_allowed: String,
    already_members_in: String,
    last_registration_date: Date,
    last_registration_status: { type: Boolean, default: true},
    fees: String,
    competition_status: { type: Boolean, default: true},
    result: { type: String, default: 'not decided'}
},{
    timestemps: true
});

module.exports = mongoose.model('competition', competitionSchema);