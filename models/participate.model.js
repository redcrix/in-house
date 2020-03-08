var mongoose = require('mongoose');
var participateSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    competition_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'competition'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    competition_fee_false: { type: Boolean, default: false},
    result: { type: Boolean, default: false}
},{
    timestamps: true
});

module.exports = mongoose.model('participate', participateSchema);