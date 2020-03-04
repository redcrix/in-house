var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
    item_name: String,
    item_category: String,
    item_price: String,
    item_details: String,
    item_competition: {type: Boolean, default: false} 
},{
    timestamps: true
});

module.exports = mongoose.model('product', productSchema);