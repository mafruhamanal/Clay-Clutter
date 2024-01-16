const mongoose = require('mongoose') // it's mongoose that lets us create models and schemas!

const Schema = mongoose.Schema

const ceramicSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    dimensions: {
        type: String,
        required: true
    },

    weight: {
        type: Number,
    },

    user_id: {
        type: String,
        required: true
    }
}, { timestamps : true })

// model applies the schema to a model

module.exports = mongoose.model("Ceramic", ceramicSchema)
