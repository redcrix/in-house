var mongoose = require('mongoose');
var participate = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    competition_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'copmetition'
    }
});

module.exports = mongoose.model('participate', competitionSchema);