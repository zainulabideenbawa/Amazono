const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    name: {type: String, unique: true, lowercase: true},
    created: {ype: Date, default: Date.now}
})

module.exports = mongoose.model('category', categorySchema)